/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 */

(function initRuntimeCore(global) {
  function createRuntimeCore(deps = {}) {
    const {
      t,
      semantics,
      normalizeExecutionConfig,
      deserializeNodeType,
      normalizeNodeDescriptionProperty,
      normalizeNodeFormulaNotesProperty,
      sanitizeLocalFunctionDefinition,
      clamp,
      deepClone,
      localFunctionsForSemantics,
      globalParameterNodesForModel,
      referencedGlobalParameterNodesForTarget,
      isStateNode,
      getModelNodeById,
      isSubmodelNode,
      normalizeSubmodelPath,
      normalizeReadDataPath,
      parseModelPropertyStoredValue,
      serializeModelPropertyStoredValue,
      parseNodePropertyStoredValue,
      serializeNodePropertyStoredValue,
      submodelBindingReferences,
      getSubmodelTemplate,
      applyRuntimeModelInputOverrides,
    } = deps;

    if (!t || !semantics) {
      throw new Error("STGraphXRuntimeCore requires translation and semantics dependencies");
    }

    function buildRuntimeModelFromData(data, options = {}) {
      if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) {
        throw new Error(t("error.invalidJson"));
      }
      const execCfg = normalizeExecutionConfig(data.execution);
      const nodes = data.nodes
        .filter((n) => Number.isInteger(n.id))
        .map((n) => {
          if (!["state", "algebraic", "parameter", "submodel"].includes(n.type)) {
            throw new Error(t("error.invalidJson"));
          }
          const shape = deserializeNodeType(n.type);
          const node = {
            id: n.id,
            name: typeof n.name === "string" ? n.name : t("node.defaultName", { id: n.id }),
            input: shape === "ellipse" ? Boolean(n.input) : false,
            output: Boolean(n.output),
            global: shape === "diamond" ? Boolean(n.global) : false,
            shape,
            x: Number.isFinite(Number(n.x)) ? Number(n.x) : 200,
            y: Number.isFinite(Number(n.y)) ? Number(n.y) : 200,
            width: clamp(Number(n.width) || 120, 40, 500),
            height: clamp(Number(n.height) || 70, 30, 500),
            valueExpression: shape === "rect"
              ? String(n.stateTransition ?? "")
              : String(n.valueExpression ?? ""),
            initialStateExpression: shape === "rect"
              ? String(n.initialState ?? "")
              : "",
            modelPath: shape === "submodel" ? String(n.modelPath ?? "") : "",
            inputBindings: shape === "submodel" && n.inputBindings && typeof n.inputBindings === "object"
              ? Object.fromEntries(
                Object.entries(n.inputBindings)
                  .map(([key, value]) => [String(key), String(value ?? "")])
                  .filter(([key]) => key.trim()),
              )
              : {},
            interfaceCache: shape === "submodel" && n.interfaceCache && typeof n.interfaceCache === "object"
              ? {
                inputs: Array.isArray(n.interfaceCache.inputs) ? n.interfaceCache.inputs.map((value) => String(value)) : [],
                outputs: Array.isArray(n.interfaceCache.outputs) ? n.interfaceCache.outputs.map((value) => String(value)) : [],
              }
              : { inputs: [], outputs: [] },
            submodelError: "",
            computedValue: null,
            computedError: "",
            pendingStateValue: null,
            pendingStateError: "",
            externalValueEnabled: false,
            externalValue: null,
            properties: Array.isArray(n.properties)
              ? n.properties.map((p) => ({ key: String(p?.key ?? ""), value: String(p?.value ?? "") }))
              : [],
          };
          normalizeNodeDescriptionProperty(node);
          normalizeNodeFormulaNotesProperty(node);
          return node;
        });
      const nodesWithValidNames = semantics.sanitizeNodeNames(nodes, "n");
      const nodeIds = new Set(nodesWithValidNames.map((node) => node.id));
      const edges = data.edges
        .filter((e) => Number.isInteger(e.id) && nodeIds.has(e.from) && nodeIds.has(e.to) && e.from !== e.to)
        .map((e) => ({
          id: e.id,
          from: e.from,
          to: e.to,
          controlPoints: Array.isArray(e.controlPoints)
            ? e.controlPoints.filter((cp) => Number.isFinite(cp?.x) && Number.isFinite(cp?.y)).map((cp) => ({ x: cp.x, y: cp.y }))
            : [],
          label: String(e?.label?.text ?? "").trim() ? {
            text: String(e.label.text).trim(),
            x: Number.isFinite(Number(e.label.x)) ? Number(e.label.x) : 0,
            y: Number.isFinite(Number(e.label.y)) ? Number(e.label.y) : 0,
            rotation: Number.isFinite(Number(e.label.rotation)) ? Number(e.label.rotation) : 0,
            transparent: Boolean(e.label.transparent),
          } : null,
        }));

      return {
        modelTitle: String(data?.modelTitle ?? ""),
        properties: Array.isArray(data?.modelProperties)
          ? data.modelProperties.map((p) => ({ key: String(p?.key ?? ""), value: String(p?.value ?? "") }))
          : [],
        localFunctions: Array.isArray(data?.localFunctions)
          ? data.localFunctions.map((definition) => sanitizeLocalFunctionDefinition(definition))
          : [],
        externalData: Array.isArray(data?.externalData)
          ? data.externalData.map((entry) => ({ id: String(entry?.id ?? ""), path: String(entry?.path ?? ""), type: "csv" })).filter((entry) => entry.path)
          : [],
        debug: {
          watches: Array.isArray(data?.debug?.watches) ? data.debug.watches.map((name) => String(name ?? "")) : [],
          breakpointEnabled: Boolean(data?.debug?.breakpointEnabled),
          breakpointExpression: String(data?.debug?.breakpointExpression ?? ""),
        },
        nodes: nodesWithValidNames,
        edges,
        widgets: [],
        execution: {
          t0: execCfg.t0,
          dt: execCfg.dt,
          t1: execCfg.t1,
          delayMs: execCfg.delayMs,
          decimals: execCfg.decimals,
          integrator: execCfg.integrator,
          strictDefinitions: execCfg.strictDefinitions,
          currentTime: null,
        },
        __directoryPath: String(options.directoryPath ?? ""),
        __readDataCache: Object.create(null),
      };
    }

    function cloneRuntimeModel(template) {
      return deepClone(template);
    }

    function readDataFromModelCache(model, relativePath) {
      const normalizedPath = normalizeReadDataPath(relativePath);
      if (!normalizedPath) {
        throw new Error("readData path is invalid");
      }
      const cache = model?.__readDataCache && typeof model.__readDataCache === "object"
        ? model.__readDataCache
        : null;
      if (!cache || !Object.prototype.hasOwnProperty.call(cache, normalizedPath)) {
        throw new Error(`readData file is unavailable: ${normalizedPath}`);
      }
      return cache[normalizedPath];
    }

    function buildExecutionGlobalsForModel(model, rootExecution, timeValue) {
      return {
        time: timeValue,
        t0: Number(rootExecution.t0),
        t1: Number(rootExecution.t1),
        dt: Number(rootExecution.dt),
        getModelProperty: (key, fallback = null) => {
          const name = String(key ?? "");
          const found = model.properties.find((prop) => String(prop?.key ?? "") === name);
          return found ? parseModelPropertyStoredValue(found.value) : fallback;
        },
        setModelProperty: (key, value) => {
          const name = String(key ?? "");
          const stored = serializeModelPropertyStoredValue(value);
          const found = model.properties.find((prop) => String(prop?.key ?? "") === name);
          if (found) {
            found.value = stored;
          } else {
            model.properties.push({ key: name, value: stored });
          }
          return value;
        },
        readData: (path) => readDataFromModelCache(model, path),
      };
    }

    function nodePropertyAccessForContext(node) {
      return {
        getProperty: (key, fallback = null) => {
          const found = node.properties.find((prop) => String(prop?.key ?? "") === String(key ?? ""));
          return found ? parseNodePropertyStoredValue(found.value) : fallback;
        },
        setProperty: (key, value) => {
          const name = String(key ?? "");
          const stored = serializeNodePropertyStoredValue(value);
          const found = node.properties.find((prop) => String(prop?.key ?? "") === name);
          if (found) {
            found.value = stored;
          } else {
            node.properties.push({ key: name, value: stored });
          }
          return value;
        },
      };
    }

    function evaluateParameterNodesForModel(model, timeValue, rootExecution) {
      const globals = buildExecutionGlobalsForModel(model, rootExecution, timeValue);
      const parameterNodes = (model?.nodes || []).filter((node) => node?.shape === "diamond");
      const pending = new Set();
      const resolved = new Set();

      parameterNodes.forEach((node) => {
        node.pendingStateValue = null;
        node.pendingStateError = "";
        if (node.externalValueEnabled) {
          node.computedValue = node.externalValue;
          node.computedError = "";
          resolved.add(node.id);
          return;
        }
        pending.add(node.id);
      });

      while (pending.size > 0) {
        let progressed = false;
        for (const nodeId of [...pending]) {
          const node = getModelNodeById(model, nodeId);
          if (!node) {
            pending.delete(nodeId);
            continue;
          }
          const context = {
            ...globals,
            ...nodePropertyAccessForContext(node),
          };
          let blockedByDependency = false;
          referencedGlobalParameterNodesForTarget(model, node, "value").forEach((depNode) => {
            if (!resolved.has(depNode.id)) {
              blockedByDependency = true;
              return;
            }
            if (!depNode.computedError) {
              context[depNode.name] = depNode.computedValue;
            }
          });
          if (blockedByDependency) {
            continue;
          }
          (model.edges || [])
            .filter((edge) => edge.to === node.id)
            .forEach((edge) => {
              const fromNode = getModelNodeById(model, edge.from);
              if (!fromNode || fromNode.shape !== "diamond") {
                return;
              }
              if (!resolved.has(fromNode.id)) {
                blockedByDependency = true;
                return;
              }
              context[fromNode.name] = fromNode.computedValue;
            });
          if (blockedByDependency) {
            continue;
          }

          const expr = String(node.valueExpression ?? "0");
          const result = semantics.evaluateValueExpression(expr, context, {
            localFunctions: localFunctionsForSemantics(model),
          });
          if (result.ok) {
            node.computedValue = result.value;
            node.computedError = "";
          } else {
            node.computedValue = null;
            node.computedError = result.reason || "runtime";
          }
          pending.delete(nodeId);
          resolved.add(nodeId);
          progressed = true;
        }

        if (progressed) {
          continue;
        }

        pending.forEach((nodeId) => {
          const node = getModelNodeById(model, nodeId);
          if (!node) {
            return;
          }
          node.computedValue = null;
          node.computedError = "dependency";
        });
        break;
      }
    }

    function buildInitialStateContextForModel(model, node, timeValue, rootExecution, referencedNames = null) {
      const context = {
        ...buildExecutionGlobalsForModel(model, rootExecution, timeValue),
        ...nodePropertyAccessForContext(node),
      };
      globalParameterNodesForModel(model, node.id).forEach((depNode) => {
        if ((!referencedNames || referencedNames.has(depNode.name)) && !depNode.computedError) {
          context[depNode.name] = depNode.computedValue;
        }
      });
      (model.edges || [])
        .filter((edge) => edge.to === node.id)
        .forEach((edge) => {
          const fromNode = getModelNodeById(model, edge.from);
          if (!fromNode || (referencedNames && !referencedNames.has(fromNode.name)) || fromNode.computedError) {
            return;
          }
          context[fromNode.name] = fromNode.computedValue;
        });
      return context;
    }

    function initializeStateNodesForModel(model, timeValue, rootExecution) {
      evaluateParameterNodesForModel(model, timeValue, rootExecution);
      const initialNodes = (model.nodes || []).filter((node) =>
        isStateNode(node) || (node.shape === "ellipse" && !node.externalValueEnabled));
      const pending = new Set();
      const resolved = new Set((model.nodes || [])
        .filter((node) => node.shape === "diamond" || (node.shape === "ellipse" && node.externalValueEnabled))
        .map((node) => node.id));

      (model.nodes || []).forEach((node) => {
        node.pendingStateValue = null;
        node.pendingStateError = "";
        if (node.shape === "ellipse" && node.externalValueEnabled) {
          node.computedValue = node.externalValue;
          node.computedError = "";
          return;
        }
        if (isStateNode(node) || node.shape === "ellipse") {
          node.computedValue = null;
          node.computedError = "";
        }
      });
      initialNodes.forEach((node) => pending.add(node.id));

      while (pending.size > 0) {
        let progressed = false;
        for (const nodeId of [...pending]) {
          const node = getModelNodeById(model, nodeId);
          if (!node) {
            pending.delete(nodeId);
            continue;
          }
          const expression = isStateNode(node)
            ? String(node.initialStateExpression ?? "0")
            : String(node.valueExpression ?? "");
          const references = semantics.collectIdentifierReferences(expression);
          let blockedByDependency = false;
          let dependencyFailed = false;

          globalParameterNodesForModel(model, node.id).forEach((depNode) => {
            if (!references.has(depNode.name)) return;
            if (!resolved.has(depNode.id)) blockedByDependency = true;
            else if (depNode.computedError) dependencyFailed = true;
          });
          (model.edges || [])
            .filter((edge) => edge.to === node.id)
            .forEach((edge) => {
              const fromNode = getModelNodeById(model, edge.from);
              if (!fromNode || !references.has(fromNode.name)) return;
              if (!resolved.has(fromNode.id)) blockedByDependency = true;
              else if (fromNode.computedError) dependencyFailed = true;
            });
          if (blockedByDependency) continue;
          if (dependencyFailed) {
            node.computedValue = null;
            node.computedError = "dependency";
          } else {
            const result = semantics.evaluateValueExpression(
              expression,
              buildInitialStateContextForModel(model, node, timeValue, rootExecution, references),
              { localFunctions: localFunctionsForSemantics(model) },
            );
            node.computedValue = result.ok ? result.value : null;
            node.computedError = result.ok ? "" : result.reason || "runtime";
          }
          pending.delete(nodeId);
          resolved.add(nodeId);
          progressed = true;
        }
        if (progressed) continue;
        pending.forEach((nodeId) => {
          const node = getModelNodeById(model, nodeId);
          if (node) {
            node.computedValue = null;
            node.computedError = "dependency";
          }
        });
        break;
      }
    }

    function promotePendingStateNodesForModel(model) {
      model.nodes.forEach((node) => {
        if (!isStateNode(node)) {
          return;
        }
        if (node.pendingStateError) {
          node.computedValue = null;
          node.computedError = node.pendingStateError;
          node.pendingStateValue = null;
          node.pendingStateError = "";
          return;
        }
        if (node.pendingStateValue !== null && node.pendingStateValue !== undefined) {
          node.computedValue = node.pendingStateValue;
          node.computedError = "";
          node.pendingStateValue = null;
          node.pendingStateError = "";
        }
      });
    }

    function clearRuntimeSubmodelState(model) {
      (model?.nodes || []).forEach((node) => {
        node.__runtimeSubmodel = null;
        node.__runtimeSubmodelPath = "";
      });
    }

    function scaleTensorValue(value, factor) {
      if (Array.isArray(value)) {
        return value.map((item) => scaleTensorValue(item, factor));
      }
      return Number(value) * factor;
    }

    function combineTensorValues(left, right, scalarFn) {
      if (Array.isArray(left) && Array.isArray(right)) {
        if (left.length !== right.length) {
          throw new Error("tensor shape mismatch");
        }
        return left.map((item, idx) => combineTensorValues(item, right[idx], scalarFn));
      }
      if (Array.isArray(left) || Array.isArray(right)) {
        throw new Error("tensor shape mismatch");
      }
      return scalarFn(Number(left), Number(right));
    }

    function addTensorValues(left, right) {
      return combineTensorValues(left, right, (a, b) => a + b);
    }

    function rk4IntegratedValue(currentValue, k1, k2, k3, k4, dt) {
      const weighted = addTensorValues(
        addTensorValues(k1, scaleTensorValue(k2, 2)),
        addTensorValues(scaleTensorValue(k3, 2), k4),
      );
      return addTensorValues(currentValue, scaleTensorValue(weighted, dt / 6));
    }

    function extractSuccessfulResultMap(entries) {
      const out = new Map();
      entries.forEach((entry) => {
        if (entry?.result?.ok) {
          out.set(entry.id, entry.result.value);
        }
      });
      return out;
    }

    function extractSuccessfulAlgebraicValueMap(entries) {
      const out = new Map();
      entries.forEach((entry) => {
        if (entry?.result?.ok) {
          out.set(entry.id, entry.result.value);
        }
      });
      return out;
    }

    function firstFailedEntry(entries, nodeIds = null) {
      const allowed = nodeIds instanceof Set ? nodeIds : null;
      for (const entry of entries) {
        if (allowed && !allowed.has(entry.id)) {
          continue;
        }
        if (!entry?.result?.ok) {
          return entry;
        }
      }
      return null;
    }

    function collectRk4IntegralStateAnalysesForModel(model) {
      const analyses = new Map();
      (model?.nodes || []).forEach((node) => {
        if (!isStateNode(node)) {
          return;
        }
        const analysis = semantics.analyzeStateTransitionExpression(node.valueExpression);
        if (analysis.ok && analysis.usesIntegral && analysis.integralCount > 0) {
          analyses.set(node.id, analysis);
        }
      });
      return analyses;
    }

    function buildCurrentStateMapForModel(model, stateValueOverrides = null) {
      const out = new Map();
      (model?.nodes || []).forEach((node) => {
        if (!isStateNode(node)) {
          return;
        }
        out.set(
          node.id,
          stateValueOverrides instanceof Map && stateValueOverrides.has(node.id)
            ? stateValueOverrides.get(node.id)
            : node.computedValue,
        );
      });
      return out;
    }

    function buildStageIntegralValuesMap(currentStateMap, derivativeListMap, factor) {
      const out = new Map();
      for (const [nodeId, derivativeList] of derivativeListMap.entries()) {
        const currentValue = currentStateMap.get(nodeId);
        if (!Array.isArray(derivativeList)) {
          continue;
        }
        out.set(
          nodeId,
          derivativeList.map((derivativeValue) => addTensorValues(currentValue, scaleTensorValue(derivativeValue, factor))),
        );
      }
      return out;
    }

    function ensureSubmodelRuntimeModel(node) {
      const normalizedPath = normalizeSubmodelPath(node?.modelPath);
      if (!normalizedPath) {
        return null;
      }
      const template = getSubmodelTemplate(normalizedPath);
      if (!template) {
        return null;
      }
      if (!node.__runtimeSubmodel || node.__runtimeSubmodelPath !== normalizedPath) {
        node.__runtimeSubmodel = cloneRuntimeModel(template);
        node.__runtimeSubmodelPath = normalizedPath;
      }
      return node.__runtimeSubmodel;
    }

    function buildSubmodelInputOverrides(model, node, parentContext) {
      const overrides = new Map();

      Object.entries(node.inputBindings || {}).forEach(([inputName, expr]) => {
        const name = String(inputName || "").trim();
        if (!name) {
          return;
        }
        const result = semantics.evaluateValueExpression(String(expr ?? ""), parentContext, {
          localFunctions: localFunctionsForSemantics(model),
        });
        if (!result.ok) {
          throw new Error(result.message || result.reason || "runtime");
        }
        overrides.set(name, result.value);
      });

      return overrides;
    }

    function createSubmodelNodeEvaluator(model, timeValue, env, options = {}) {
      const applyResults = options.applyResults !== false;
      return function submodelNodeEvaluator(runtimeNode, context) {
        if (!isSubmodelNode(runtimeNode)) {
          return null;
        }
        const normalizedPath = normalizeSubmodelPath(runtimeNode.modelPath);
        if (!normalizedPath) {
          return { ok: false, reason: "runtime", message: "missing submodel path" };
        }
        if (!getSubmodelTemplate(normalizedPath)) {
          return { ok: false, reason: "runtime", message: "submodel is not loaded" };
        }
        if (env.stack.includes(normalizedPath)) {
          return { ok: false, reason: "runtime", message: "recursive submodel reference" };
        }
        try {
          const effectiveContext = { ...context };
          const bindingRefs = submodelBindingReferences(runtimeNode);
          globalParameterNodesForModel(model, runtimeNode.id).forEach((depNode) => {
            const used = [...bindingRefs.values()].some((refs) => refs.has(depNode.name));
            if (used && !depNode.computedError) {
              effectiveContext[depNode.name] = depNode.computedValue;
            }
          });
          const inputOverrides = buildSubmodelInputOverrides(model, runtimeNode, effectiveContext);
          const runtimeChildModel = ensureSubmodelRuntimeModel(runtimeNode);
          if (!runtimeChildModel) {
            return { ok: false, reason: "runtime", message: "submodel is not loaded" };
          }
          const childModel = applyResults ? runtimeChildModel : cloneRuntimeModel(runtimeChildModel);
          applyRuntimeModelInputOverrides(childModel, inputOverrides);
          let childResult;
          if (childModel.execution.currentTime == null || childModel.execution.currentTime !== timeValue) {
            if (childModel.execution.currentTime == null) {
              initializeStateNodesForModel(childModel, timeValue, env.rootExecution);
            } else {
              promotePendingStateNodesForModel(childModel);
            }
          }
          childResult = evaluateModelAtTimeRecursive(
            childModel,
            timeValue,
            {
              rootExecution: env.rootExecution,
              stack: [...env.stack, normalizedPath],
            },
            { applyResults },
          );
          childModel.execution.currentTime = timeValue;
          if (childResult.errorCount > 0) {
            return {
              ok: false,
              reason: childResult.firstErrorReason || "runtime",
              message: childResult.firstErrorNode || "submodel",
            };
          }
          const outputs = {};
          childModel.nodes.forEach((childNode) => {
            if (childNode.output) {
              outputs[childNode.name] = childNode.computedValue;
            }
          });
          return { ok: true, kind: "object", value: outputs };
        } catch (err) {
          return { ok: false, reason: "runtime", message: String(err?.message || "runtime") };
        }
      };
    }

    function evaluateTransitionResultsWithIntegralValuesForModel(
      model,
      timeValue,
      env,
      executionPlan,
      integralStateIds,
      integralValuesMap,
      algebraicValueMap,
      stateValueOverrides = null,
    ) {
      const globals = buildExecutionGlobalsForModel(model, env.rootExecution, timeValue);
      const results = new Map();
      (model?.nodes || []).forEach((node) => {
        if (!integralStateIds.has(node.id)) {
          return;
        }
        const context = {
          ...globals,
          __self: stateValueOverrides instanceof Map && stateValueOverrides.has(node.id)
            ? stateValueOverrides.get(node.id)
            : node.computedValue,
          getProperty: (key, fallback = null) => {
            const found = node.properties.find((prop) => String(prop?.key ?? "") === String(key ?? ""));
            return found ? parseNodePropertyStoredValue(found.value) : fallback;
          },
          setProperty: (key, value) => {
            const name = String(key ?? "");
            const stored = serializeNodePropertyStoredValue(value);
            const found = node.properties.find((prop) => String(prop?.key ?? "") === name);
            if (found) {
              found.value = stored;
            } else {
              node.properties.push({ key: name, value: stored });
            }
            return value;
          },
        };
        globalParameterNodesForModel(model, node.id).forEach((depNode) => {
          if (!depNode.computedError) {
            context[depNode.name] = depNode.computedValue;
          }
        });
        (executionPlan.incoming.get(node.id) || []).forEach((fromId) => {
          const fromNode = getModelNodeById(model, fromId);
          if (!fromNode) {
            return;
          }
          if (isStateNode(fromNode)) {
            context[fromNode.name] = stateValueOverrides instanceof Map && stateValueOverrides.has(fromId)
              ? stateValueOverrides.get(fromId)
              : fromNode.computedValue;
            return;
          }
          if (algebraicValueMap.has(fromId)) {
            context[fromNode.name] = algebraicValueMap.get(fromId);
          }
        });
        results.set(
          node.id,
          semantics.evaluateStateTransitionExpressionWithIntegralValues(
            node.valueExpression,
            context,
            integralValuesMap.get(node.id) || [],
            { allowThisAlias: true, localFunctions: localFunctionsForSemantics(model) },
          ),
        );
      });
      return results;
    }

    function evaluateModelAtTimeRecursive(model, timeValue, env, options = {}) {
      const executionGlobals = buildExecutionGlobalsForModel(model, env.rootExecution, timeValue);
      const executionPlan = semantics.prepareStatefulExecutionPlan(model.nodes, model.edges);
      const stateValueOverrides = options.stateValueOverrides instanceof Map ? options.stateValueOverrides : null;
      const rk4Analyses = String(env.rootExecution?.integrator ?? "euler") === "rk4"
        ? collectRk4IntegralStateAnalysesForModel(model)
        : new Map();
      const integralStateNodeIds = new Set(rk4Analyses.keys());
      const evalResults = semantics.evaluateStatefulGraphStep(
        model.nodes,
        model.edges,
        executionGlobals,
        executionPlan,
        {
          stateValueOverrides: stateValueOverrides || undefined,
          localFunctions: localFunctionsForSemantics(model),
          derivativeStateNodeIds: integralStateNodeIds.size > 0 ? integralStateNodeIds : undefined,
          customNodeEvaluator: createSubmodelNodeEvaluator(model, timeValue, env, {
            applyResults: options.applyResults !== false,
          }),
        },
      );
      const algebraicValueMap = extractSuccessfulAlgebraicValueMap(evalResults.algebraic);

      let rk4Results = null;
      if (integralStateNodeIds.size > 0) {
        const stage1Failure = firstFailedEntry(evalResults.stateTransitions, integralStateNodeIds);
        if (!stage1Failure) {
          const currentStateMap = buildCurrentStateMapForModel(model, stateValueOverrides);
          const k1 = extractSuccessfulResultMap(evalResults.stateTransitions);
          const dt = Number(env.rootExecution.dt);
          const stage2IntegralValues = buildStageIntegralValuesMap(currentStateMap, k1, dt / 2);
          const stage2TransitionValues = evaluateTransitionResultsWithIntegralValuesForModel(
            model,
            timeValue + dt / 2,
            env,
            executionPlan,
            integralStateNodeIds,
            stage2IntegralValues,
            algebraicValueMap,
            stateValueOverrides,
          );
          const stage2StateOverrides = new Map(
            [...integralStateNodeIds].map((nodeId) => [nodeId, stage2TransitionValues.get(nodeId)?.value ?? currentStateMap.get(nodeId)]),
          );
          const stage2 = semantics.evaluateStatefulGraphStep(
            model.nodes,
            model.edges,
            buildExecutionGlobalsForModel(model, env.rootExecution, timeValue + dt / 2),
            executionPlan,
            {
              derivativeStateNodeIds: integralStateNodeIds,
              stateValueOverrides: stage2StateOverrides,
              localFunctions: localFunctionsForSemantics(model),
              customNodeEvaluator: createSubmodelNodeEvaluator(model, timeValue + dt / 2, env, { applyResults: false }),
            },
          );
          const stage2Failure = firstFailedEntry(stage2.stateTransitions, integralStateNodeIds);
          if (!stage2Failure) {
            const stage2AlgebraicValueMap = extractSuccessfulAlgebraicValueMap(stage2.algebraic);
            const k2 = extractSuccessfulResultMap(stage2.stateTransitions);
            const stage3IntegralValues = buildStageIntegralValuesMap(currentStateMap, k2, dt / 2);
            const stage3TransitionValues = evaluateTransitionResultsWithIntegralValuesForModel(
              model,
              timeValue + dt / 2,
              env,
              executionPlan,
              integralStateNodeIds,
              stage3IntegralValues,
              stage2AlgebraicValueMap,
              stage2StateOverrides,
            );
            const stage3StateOverrides = new Map(
              [...integralStateNodeIds].map((nodeId) => [nodeId, stage3TransitionValues.get(nodeId)?.value ?? currentStateMap.get(nodeId)]),
            );
            const stage3 = semantics.evaluateStatefulGraphStep(
              model.nodes,
              model.edges,
              buildExecutionGlobalsForModel(model, env.rootExecution, timeValue + dt / 2),
              executionPlan,
              {
                derivativeStateNodeIds: integralStateNodeIds,
                stateValueOverrides: stage3StateOverrides,
                localFunctions: localFunctionsForSemantics(model),
                customNodeEvaluator: createSubmodelNodeEvaluator(model, timeValue + dt / 2, env, { applyResults: false }),
              },
            );
            const stage3Failure = firstFailedEntry(stage3.stateTransitions, integralStateNodeIds);
            if (!stage3Failure) {
              const stage3AlgebraicValueMap = extractSuccessfulAlgebraicValueMap(stage3.algebraic);
              const k3 = extractSuccessfulResultMap(stage3.stateTransitions);
              const stage4IntegralValues = buildStageIntegralValuesMap(currentStateMap, k3, dt);
              const stage4TransitionValues = evaluateTransitionResultsWithIntegralValuesForModel(
                model,
                timeValue + dt,
                env,
                executionPlan,
                integralStateNodeIds,
                stage4IntegralValues,
                stage3AlgebraicValueMap,
                stage3StateOverrides,
              );
              const stage4StateOverrides = new Map(
                [...integralStateNodeIds].map((nodeId) => [nodeId, stage4TransitionValues.get(nodeId)?.value ?? currentStateMap.get(nodeId)]),
              );
              const stage4 = semantics.evaluateStatefulGraphStep(
                model.nodes,
                model.edges,
                buildExecutionGlobalsForModel(model, env.rootExecution, timeValue + dt),
                executionPlan,
                {
                  derivativeStateNodeIds: integralStateNodeIds,
                  stateValueOverrides: stage4StateOverrides,
                  localFunctions: localFunctionsForSemantics(model),
                  customNodeEvaluator: createSubmodelNodeEvaluator(model, timeValue + dt, env, { applyResults: false }),
                },
              );
              const stage4Failure = firstFailedEntry(stage4.stateTransitions, integralStateNodeIds);
              if (!stage4Failure) {
                const k4 = extractSuccessfulResultMap(stage4.stateTransitions);
                rk4Results = new Map();
                integralStateNodeIds.forEach((nodeId) => {
                  const k1List = k1.get(nodeId) || [];
                  const k2List = k2.get(nodeId) || [];
                  const k3List = k3.get(nodeId) || [];
                  const k4List = k4.get(nodeId) || [];
                  const integratedValues = k1List.map((_, idx) => rk4IntegratedValue(
                    currentStateMap.get(nodeId),
                    k1List[idx],
                    k2List[idx],
                    k3List[idx],
                    k4List[idx],
                    dt,
                  ));
                  rk4Results.set(
                    nodeId,
                    evaluateTransitionResultsWithIntegralValuesForModel(
                      model,
                      timeValue,
                      env,
                      executionPlan,
                      new Set([nodeId]),
                      new Map([[nodeId, integratedValues]]),
                      algebraicValueMap,
                      stateValueOverrides,
                    ).get(nodeId) || { ok: false, reason: "dependency" },
                  );
                });
              } else {
                rk4Results = new Map(stage4.stateTransitions.map((entry) => [entry.id, entry.result]));
              }
            } else {
              rk4Results = new Map(stage3.stateTransitions.map((entry) => [entry.id, entry.result]));
            }
          } else {
            rk4Results = new Map(stage2.stateTransitions.map((entry) => [entry.id, entry.result]));
          }
        } else {
          rk4Results = new Map(evalResults.stateTransitions.map((entry) => [entry.id, entry.result]));
        }
      }

      let successCount = 0;
      let errorCount = 0;
      let firstErrorNode = null;
      let firstErrorReason = null;

      evalResults.algebraic.forEach((entry) => {
        const node = getModelNodeById(model, entry.id);
        if (!node) {
          return;
        }
        if (entry.result.ok) {
          node.computedValue = entry.result.value;
          node.computedError = "";
          successCount += 1;
        } else {
          node.computedValue = null;
          node.computedError = entry.result.reason || "runtime";
          errorCount += 1;
          if (!firstErrorNode) {
            firstErrorNode = node.name;
            firstErrorReason = node.computedError;
          }
        }
      });

      evalResults.stateTransitions.forEach((entry) => {
        const node = getModelNodeById(model, entry.id);
        if (!node) {
          return;
        }
        const result = integralStateNodeIds.has(entry.id) && rk4Results
          ? (rk4Results.get(entry.id) || { ok: false, reason: "dependency" })
          : entry.result;
        if (result.ok) {
          node.pendingStateValue = result.value;
          node.pendingStateError = "";
          successCount += 1;
        } else {
          node.pendingStateValue = null;
          node.pendingStateError = result.reason || "runtime";
          errorCount += 1;
          if (!firstErrorNode) {
            firstErrorNode = node.name;
            firstErrorReason = node.pendingStateError;
          }
        }
      });

      return { successCount, errorCount, firstErrorNode, firstErrorReason };
    }

    return {
      addTensorValues,
      buildCurrentStateMapForModel,
      buildExecutionGlobalsForModel,
      buildInitialStateContextForModel,
      buildRuntimeModelFromData,
      buildStageIntegralValuesMap,
      clearRuntimeSubmodelState,
      cloneRuntimeModel,
      collectRk4IntegralStateAnalysesForModel,
      combineTensorValues,
      createSubmodelNodeEvaluator,
      evaluateModelAtTimeRecursive,
      evaluateParameterNodesForModel,
      evaluateTransitionResultsWithIntegralValuesForModel,
      extractSuccessfulAlgebraicValueMap,
      extractSuccessfulResultMap,
      firstFailedEntry,
      initializeStateNodesForModel,
      promotePendingStateNodesForModel,
      readDataFromModelCache,
      rk4IntegratedValue,
      scaleTensorValue,
    };
  }

  global.STGraphXRuntimeCore = {
    createRuntimeCore,
  };
})(globalThis);
