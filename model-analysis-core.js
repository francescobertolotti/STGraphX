/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 * Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.
 */

(function initModelAnalysisCoreModule(globalScope, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }
  globalScope.STGraphXModelAnalysisCore = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function createModelAnalysisCoreExports() {
  function createModelAnalysisCoreHelpers(options = {}) {
    const t = typeof options.t === "function" ? options.t : (key) => key;
    const getGraph = typeof options.getGraph === "function" ? options.getGraph : () => ({ nodes: [], edges: [], widgets: [], execution: {} });
    const isSubmodelNode = typeof options.isSubmodelNode === "function" ? options.isSubmodelNode : () => false;
    const isStateNode = typeof options.isStateNode === "function" ? options.isStateNode : () => false;
    const isAlgebraicNode = typeof options.isAlgebraicNode === "function" ? options.isAlgebraicNode : () => false;
    const accessibleAgentFieldAliasNames = typeof options.accessibleAgentFieldAliasNames === "function"
      ? options.accessibleAgentFieldAliasNames
      : () => [];
    const buildNodeNameMap = typeof options.buildNodeNameMap === "function" ? options.buildNodeNameMap : () => new Map();
    const getNodeById = typeof options.getNodeById === "function" ? options.getNodeById : () => null;
    const getModelNodeById = typeof options.getModelNodeById === "function" ? options.getModelNodeById : () => null;
    const globalParameterNodesForModel = typeof options.globalParameterNodesForModel === "function"
      ? options.globalParameterNodesForModel
      : () => [];
    const isGlobalParameterNode = typeof options.isGlobalParameterNode === "function" ? options.isGlobalParameterNode : () => false;
    const validateNodeDefinition = typeof options.validateNodeDefinition === "function"
      ? options.validateNodeDefinition
      : () => ({ ok: true });
    const nodeDefinitionIssueText = typeof options.nodeDefinitionIssueText === "function"
      ? options.nodeDefinitionIssueText
      : () => "";
    const localizeExpressionErrorMessage = typeof options.localizeExpressionErrorMessage === "function"
      ? options.localizeExpressionErrorMessage
      : (message) => String(message ?? "");
    const localFunctionsForSemantics = typeof options.localFunctionsForSemantics === "function"
      ? options.localFunctionsForSemantics
      : () => [];
    const semantics = options.semantics || null;
    const nodePropertyAccessForContext = typeof options.nodePropertyAccessForContext === "function"
      ? options.nodePropertyAccessForContext
      : () => ({});
    const addTensorValues = typeof options.addTensorValues === "function" ? options.addTensorValues : (_a, b) => b;
    const scaleTensorValue = typeof options.scaleTensorValue === "function" ? options.scaleTensorValue : (value) => value;
    const getExpressionPreviewInitializationState = typeof options.getExpressionPreviewInitializationState === "function"
      ? options.getExpressionPreviewInitializationState
      : () => null;
    const describeExpressionPreviewShape = typeof options.describeExpressionPreviewShape === "function"
      ? options.describeExpressionPreviewShape
      : () => "";
    const canBindButtonToNode = typeof options.canBindButtonToNode === "function" ? options.canBindButtonToNode : () => false;
    const canBindSliderToNode = typeof options.canBindSliderToNode === "function" ? options.canBindSliderToNode : () => false;
    const widgetDisplayName = typeof options.widgetDisplayName === "function" ? options.widgetDisplayName : (widget) => String(widget?.type || "?");

    function collectExpressionIdentifierReferences(expression) {
      const src = String(expression ?? "");
      const refs = new Set();
      const skipped = new Set(["true", "false", "null", "this", "self", "__self", "$i", "$j", "$value", "time", "t0", "t1", "dt"]);
      let i = 0;
      let mode = "code";
      while (i < src.length) {
        const ch = src[i];
        if (mode === "code") {
          if (ch === "'" || ch === '"' || ch === "`") {
            mode = ch;
            i += 1;
            continue;
          }
          if (/[A-Za-z_$]/u.test(ch)) {
            let j = i + 1;
            while (j < src.length && /[A-Za-z0-9_$]/u.test(src[j])) {
              j += 1;
            }
            const token = src.slice(i, j);
            const prev = i > 0 ? src[i - 1] : "";
            let k = j;
            while (k < src.length && /\s/u.test(src[k])) {
              k += 1;
            }
            const isFunctionCall = src[k] === "(";
            if (
              prev !== "."
              && !isFunctionCall
              && !skipped.has(token)
              && !/^\$[0-9]+$/u.test(token)
            ) {
              refs.add(token);
            }
            i = j;
            continue;
          }
          i += 1;
          continue;
        }
        if (ch === "\\") {
          i += 2;
          continue;
        }
        if (ch === mode) {
          mode = "code";
        }
        i += 1;
      }
      return refs;
    }

    function incomingEdgesForNode(nodeId, model = getGraph()) {
      return (model?.edges || []).filter((edge) => edge.to === nodeId);
    }

    function outgoingEdgesForNode(nodeId, model = getGraph()) {
      return (model?.edges || []).filter((edge) => edge.from === nodeId);
    }

    function pureTimeConfigIssue(execution = getGraph()?.execution) {
      const t0 = Number(execution?.t0);
      const dt = Number(execution?.dt);
      const t1 = Number(execution?.t1);
      if (!Number.isFinite(t0) || !Number.isFinite(dt) || !Number.isFinite(t1)) {
        return t("error.timeInvalid");
      }
      if (dt < 0) {
        return t("error.timeStepNegative");
      }
      if (t1 <= t0) {
        return t("error.timeEndAfterStart");
      }
      if (dt === 0) {
        return t("error.timeStepZero");
      }
      return "";
    }

    function pureTimedDelayIssue(execution = getGraph()?.execution) {
      const delay = Number(execution?.delayMs);
      if (!Number.isFinite(delay) || delay <= 0) {
        return t("error.timeDelayInvalid");
      }
      return "";
    }

    function expressionReferencesForAnalysis(node, fieldKey = "value") {
      if (!node || isSubmodelNode(node)) {
        return new Set();
      }
      const expr = fieldKey === "initial"
        ? String(node.initialStateExpression ?? "")
        : String(node.valueExpression ?? "");
      const refs = collectExpressionIdentifierReferences(expr);
      accessibleAgentFieldAliasNames(node, fieldKey).forEach((name) => {
        refs.delete(name);
      });
      return refs;
    }

    function submodelBindingReferences(node) {
      const refs = new Map();
      Object.entries(node?.inputBindings || {}).forEach(([inputName, expr]) => {
        refs.set(String(inputName || "").trim(), collectExpressionIdentifierReferences(String(expr ?? "")));
      });
      return refs;
    }

    function nodeIsImplicitlyReferenced(targetNode, model = getGraph()) {
      if (!targetNode) {
        return false;
      }
      const targetName = String(targetNode.name ?? "").trim();
      if (!targetName) {
        return false;
      }
      return (model?.nodes || []).some((node) => {
        if (!node || node.id === targetNode.id) {
          return false;
        }
        if (expressionReferencesForAnalysis(node, "value").has(targetName)) {
          return true;
        }
        if (isStateNode(node) && expressionReferencesForAnalysis(node, "initial").has(targetName)) {
          return true;
        }
        if (isSubmodelNode(node)) {
          for (const refs of submodelBindingReferences(node).values()) {
            if (refs.has(targetName)) {
              return true;
            }
          }
        }
        return false;
      });
    }

    function detectNonStateCycles(model = getGraph()) {
      const nodeById = new Map();
      const adjacency = new Map();
      (model?.nodes || [])
        .filter((node) => isAlgebraicNode(node) || isSubmodelNode(node))
        .forEach((node) => {
          nodeById.set(node.id, node);
          adjacency.set(node.id, []);
        });
      (model?.edges || []).forEach((edge) => {
        if (adjacency.has(edge.from) && adjacency.has(edge.to)) {
          adjacency.get(edge.from).push(edge.to);
        }
      });

      const visited = new Set();
      const stack = [];
      const inStack = new Set();
      const found = new Map();

      const visit = (nodeId) => {
        visited.add(nodeId);
        stack.push(nodeId);
        inStack.add(nodeId);
        (adjacency.get(nodeId) || []).forEach((nextId) => {
          if (!visited.has(nextId)) {
            visit(nextId);
            return;
          }
          if (inStack.has(nextId)) {
            const start = stack.indexOf(nextId);
            const cycleIds = start >= 0 ? stack.slice(start) : [nextId];
            const key = cycleIds.slice().sort((a, b) => a - b).join(",");
            if (!found.has(key)) {
              found.set(key, cycleIds);
            }
          }
        });
        stack.pop();
        inStack.delete(nodeId);
      };

      [...adjacency.keys()].forEach((nodeId) => {
        if (!visited.has(nodeId)) {
          visit(nodeId);
        }
      });

      return [...found.values()].map((cycleIds) => ({
        ids: cycleIds,
        names: cycleIds.map((id) => nodeById.get(id)?.name || String(id)),
      }));
    }

    function detectInitialDefinitionCycles(model = getGraph()) {
      const nodeById = new Map();
      const adjacency = new Map();
      (model?.nodes || [])
        .filter((node) => isStateNode(node) || isAlgebraicNode(node))
        .forEach((node) => {
          nodeById.set(node.id, node);
          adjacency.set(node.id, []);
        });
      (model?.edges || []).forEach((edge) => {
        const source = nodeById.get(edge.from);
        const target = nodeById.get(edge.to);
        if (!source || !target) return;
        const references = expressionReferencesForAnalysis(target, isStateNode(target) ? "initial" : "value");
        if (references.has(source.name)) adjacency.get(source.id).push(target.id);
      });

      const visited = new Set();
      const stack = [];
      const inStack = new Set();
      const found = new Map();
      const visit = (nodeId) => {
        visited.add(nodeId);
        stack.push(nodeId);
        inStack.add(nodeId);
        (adjacency.get(nodeId) || []).forEach((nextId) => {
          if (!visited.has(nextId)) {
            visit(nextId);
            return;
          }
          if (inStack.has(nextId)) {
            const start = stack.indexOf(nextId);
            const cycleIds = start >= 0 ? stack.slice(start) : [nextId];
            const key = cycleIds.slice().sort((a, b) => a - b).join(",");
            if (!found.has(key)) found.set(key, cycleIds);
          }
        });
        stack.pop();
        inStack.delete(nodeId);
      };
      [...adjacency.keys()].forEach((nodeId) => {
        if (!visited.has(nodeId)) visit(nodeId);
      });
      return [...found.values()].map((cycleIds) => ({
        ids: cycleIds,
        names: cycleIds.map((id) => nodeById.get(id)?.name || String(id)),
      }));
    }

    function stateTransitionPreviewForAnalysis(node, previewState) {
      const graph = getGraph();
      if (!node || !isStateNode(node) || !previewState?.model || !semantics) {
        return null;
      }
      const runtimeNode = getModelNodeById(previewState.model, node.id);
      if (!runtimeNode) {
        return null;
      }
      if (runtimeNode.computedError) {
        return { ok: false, current: { ok: false, reason: runtimeNode.computedError } };
      }
      const currentValueResult = { ok: true, value: runtimeNode.computedValue };
      const context = {
        ...previewState.globals,
        ...nodePropertyAccessForContext(runtimeNode),
        __self: currentValueResult.value,
      };
      globalParameterNodesForModel(previewState.model, runtimeNode.id).forEach((depNode) => {
        if (!depNode.computedError) {
          context[depNode.name] = depNode.computedValue;
        }
      });
      incomingEdgesForNode(runtimeNode.id, previewState.model)
        .map((edge) => getModelNodeById(previewState.model, edge.from))
        .filter(Boolean)
        .forEach((depNode) => {
          if (!depNode.computedError) {
            context[depNode.name] = depNode.computedValue;
          }
        });
      const source = String(runtimeNode.valueExpression ?? "");
      const nextValueResult = source.includes("integral(")
        ? (() => {
            const derivativeList = semantics.evaluateIntegralDerivativeList(source, context, {
              allowThisAlias: true,
              localFunctions: localFunctionsForSemantics(previewState.model),
            });
            if (!derivativeList.ok) {
              return derivativeList;
            }
            const dt = Number(previewState.model?.execution?.dt ?? graph.execution.dt);
            const integralValues = (derivativeList.value || [])
              .map((derivativeValue) => addTensorValues(currentValueResult.value, scaleTensorValue(derivativeValue, dt)));
            return semantics.evaluateStateTransitionExpressionWithIntegralValues(
              source,
              context,
              integralValues,
              { allowThisAlias: true, localFunctions: localFunctionsForSemantics(previewState.model) },
            );
          })()
        : semantics.evaluateValueExpression(source, context, {
            allowThisAlias: true,
            allowIntegral: true,
            localFunctions: localFunctionsForSemantics(previewState.model),
          });
      return {
        ok: Boolean(currentValueResult.ok && nextValueResult.ok),
        current: currentValueResult,
        next: nextValueResult,
      };
    }

    function pushAnalysisIssue(issues, severity, key, vars, target = null) {
      issues.push({
        severity,
        message: t(key, vars || null),
        key,
        target,
      });
    }

    function analyzeModelStaticIssues() {
      const graph = getGraph();
      const issues = [];
      const timeIssue = pureTimeConfigIssue(graph.execution);
      if (timeIssue) {
        pushAnalysisIssue(issues, "error", "analysis.issue.invalidTimeConfig", { reason: timeIssue }, { type: "model" });
      }
      const delayIssue = pureTimedDelayIssue(graph.execution);
      if (delayIssue) {
        pushAnalysisIssue(issues, "warning", "analysis.issue.invalidDelay", { reason: delayIssue }, { type: "model" });
      }

      const nodeMap = buildNodeNameMap();
      graph.edges.forEach((edge) => {
        const fromNode = getNodeById(edge.from);
        const toNode = getNodeById(edge.to);
        if (fromNode && toNode) {
          return;
        }
        pushAnalysisIssue(
          issues,
          "error",
          "analysis.issue.danglingEdge",
          { name: `${fromNode?.name || edge.from} -> ${toNode?.name || edge.to}` },
          { type: "edge", id: edge.id, name: `${fromNode?.name || edge.from} -> ${toNode?.name || edge.to}` },
        );
      });
      const edgeGroups = new Map();
      graph.edges.forEach((edge) => {
        const fromNode = getNodeById(edge.from);
        const toNode = getNodeById(edge.to);
        const signature = [edge.from, edge.to].join("|");
        if (!edgeGroups.has(signature)) {
          edgeGroups.set(signature, []);
        }
        edgeGroups.get(signature).push({ edge, fromNode, toNode });
      });
      edgeGroups.forEach((entries) => {
        if (entries.length < 2) {
          return;
        }
        entries.forEach(({ edge, fromNode, toNode }) => {
          pushAnalysisIssue(
            issues,
            "warning",
            "analysis.issue.duplicateEdge",
            { name: `${fromNode?.name || edge.from} -> ${toNode?.name || edge.to}` },
            { type: "edge", id: edge.id, name: `${fromNode?.name || edge.from} -> ${toNode?.name || edge.to}` },
          );
        });
      });
      graph.edges.forEach((edge) => {
        if (edge.from !== edge.to) {
          return;
        }
        const node = getNodeById(edge.from);
        pushAnalysisIssue(
          issues,
          "warning",
          "analysis.issue.selfLoop",
          { name: `${node?.name || edge.from} -> ${node?.name || edge.from}` },
          { type: "edge", id: edge.id, name: `${node?.name || edge.from} -> ${node?.name || edge.from}` },
        );
      });
      detectNonStateCycles(graph).forEach((cycle) => {
        pushAnalysisIssue(
          issues,
          "error",
          "analysis.issue.algebraicCycle",
          { path: [...cycle.names, cycle.names[0]].join(" -> ") },
          { type: "node", id: cycle.ids[0], name: cycle.names[0] },
        );
      });
      detectInitialDefinitionCycles(graph).forEach((cycle) => {
        pushAnalysisIssue(
          issues,
          "error",
          "analysis.issue.initialDefinitionCycle",
          { path: [...cycle.names, cycle.names[0]].join(" -> ") },
          { type: "node", id: cycle.ids[0], name: cycle.names[0] },
        );
      });

      graph.nodes.forEach((node) => {
        const definitionIssue = validateNodeDefinition(node);
        if (!definitionIssue.ok) {
          issues.push({
            severity: "error",
            message: nodeDefinitionIssueText(definitionIssue),
            target: { type: "node", id: node.id, name: node.name },
          });
        }
      });

      graph.nodes.forEach((node) => {
        if (isSubmodelNode(node)) {
          const incomingEdges = incomingEdgesForNode(node.id, graph);
          const incomingNameToEdges = new Map();
          incomingEdges.forEach((edge) => {
            const fromNode = getNodeById(edge.from);
            if (!fromNode) {
              return;
            }
            const list = incomingNameToEdges.get(fromNode.name) || [];
            list.push(edge);
            incomingNameToEdges.set(fromNode.name, list);
          });
          const availableInputs = new Set(
            Array.isArray(node.interfaceCache?.inputs)
              ? node.interfaceCache.inputs.map((value) => String(value).trim()).filter(Boolean)
              : [],
          );
          const bindingRefs = submodelBindingReferences(node);
          Object.entries(node.inputBindings || {}).forEach(([inputName, expr]) => {
            const normalizedInput = String(inputName || "").trim();
            const source = String(expr ?? "");
            if (!source.trim()) {
              return;
            }
            if (availableInputs.size > 0 && normalizedInput && !availableInputs.has(normalizedInput)) {
              pushAnalysisIssue(
                issues,
                "warning",
                "analysis.issue.unknownSubmodelBinding",
                { name: node.name, input: normalizedInput },
                { type: "node", id: node.id, name: node.name },
              );
            }
            const extraNames = [...incomingNameToEdges.keys()];
            globalParameterNodesForModel(graph, node.id).forEach((depNode) => {
              extraNames.push(depNode.name);
            });
            const validation = semantics.validateExpressionSyntax(source, extraNames, {
              localFunctions: localFunctionsForSemantics(graph),
            });
            if (!validation.ok) {
              pushAnalysisIssue(
                issues,
                "error",
                "analysis.issue.invalidSubmodelBinding",
                { name: node.name, input: normalizedInput, reason: localizeExpressionErrorMessage(validation.message || "") },
                { type: "node", id: node.id, name: node.name },
              );
            }
          });
          bindingRefs.forEach((refs) => {
            refs.forEach((name) => {
              const depNode = nodeMap.get(name);
              if (!depNode || depNode.id === node.id) {
                return;
              }
              if (!incomingNameToEdges.has(name) && !isGlobalParameterNode(depNode)) {
                pushAnalysisIssue(
                  issues,
                  "warning",
                  "analysis.issue.missingIncomingEdge",
                  { target: node.name, source: name },
                  { type: "node", id: node.id, name: node.name },
                );
              }
            });
          });
          return;
        }
        const incomingEdges = incomingEdgesForNode(node.id, graph);
        const incomingNameToEdges = new Map();
        incomingEdges.forEach((edge) => {
          const fromNode = getNodeById(edge.from);
          if (!fromNode) {
            return;
          }
          const list = incomingNameToEdges.get(fromNode.name) || [];
          list.push(edge);
          incomingNameToEdges.set(fromNode.name, list);
        });

        const valueRefs = expressionReferencesForAnalysis(node, "value");
        const initialRefs = isStateNode(node) ? expressionReferencesForAnalysis(node, "initial") : new Set();

        valueRefs.forEach((name) => {
          const depNode = nodeMap.get(name);
          if (!depNode || depNode.id === node.id) {
            return;
          }
          if (!incomingNameToEdges.has(name) && !isGlobalParameterNode(depNode)) {
            pushAnalysisIssue(
              issues,
              "warning",
              "analysis.issue.missingIncomingEdge",
              { target: node.name, source: name },
              { type: "node", id: node.id, name: node.name },
            );
          }
        });

        initialRefs.forEach((name) => {
          const depNode = nodeMap.get(name);
          if (!depNode || depNode.id === node.id) {
            return;
          }
          if (!incomingNameToEdges.has(name) && !isGlobalParameterNode(depNode)) {
            pushAnalysisIssue(
              issues,
              "warning",
              "analysis.issue.missingIncomingEdge",
              { target: node.name, source: name },
              { type: "node", id: node.id, name: node.name },
            );
          }
        });

        incomingNameToEdges.forEach((edgesForName, sourceName) => {
          const sourceNode = nodeMap.get(sourceName);
          if (!sourceNode) {
            return;
          }
          const usedInValue = valueRefs.has(sourceName);
          const usedInInitial = isStateNode(node) && initialRefs.has(sourceName);
          if (usedInValue || usedInInitial) {
            return;
          }
          edgesForName.forEach((edge) => {
            pushAnalysisIssue(
              issues,
              "warning",
              "analysis.issue.unusedEdge",
              { from: sourceName, to: node.name },
              { type: "edge", id: edge.id, name: `${sourceName} -> ${node.name}` },
            );
          });
        });
      });

      graph.nodes.forEach((node) => {
        const hasOutgoingEdges = graph.edges.some((edge) => edge.from === node.id);
        const usedByTable = graph.widgets.some((widget) => widget.type === "table" && Array.isArray(widget.columns) && widget.columns.includes(node.name));
        const usedByChart = graph.widgets.some((widget) => widget.type === "xychart"
          && Array.isArray(widget.xyPairs)
          && widget.xyPairs.some((pair) => pair?.xSource === node.name || pair?.ySource === node.name));
        const usedBySourceWidget = graph.widgets.some((widget) => widget.source === node.name);
        const usedImplicitly = nodeIsImplicitlyReferenced(node, graph);
        const observed = Boolean(node.output || hasOutgoingEdges || usedByTable || usedByChart || usedBySourceWidget || usedImplicitly);
        if (!observed) {
          pushAnalysisIssue(
            issues,
            "info",
            "analysis.issue.unusedNode",
            { name: node.name },
            { type: "node", id: node.id, name: node.name },
          );
        }
      });

      graph.widgets.forEach((widget) => {
        const widgetName = widgetDisplayName(widget);
        if (widget.type === "slider" || widget.type === "button" || widget.type === "select") {
          if (!widget.source) {
            pushAnalysisIssue(issues, "warning", "analysis.issue.widgetNoSource", { name: widgetName }, { type: "widget", id: widget.id, name: widgetName });
            return;
          }
          const sourceNode = nodeMap.get(widget.source);
          if (!sourceNode) {
            pushAnalysisIssue(issues, "error", "analysis.issue.widgetMissingSource", { name: widgetName, source: widget.source }, { type: "widget", id: widget.id, name: widgetName });
            return;
          }
          const bindable = widget.type === "button" ? canBindButtonToNode(sourceNode) : canBindSliderToNode(sourceNode);
          if (!bindable) {
            pushAnalysisIssue(issues, "error", "analysis.issue.widgetSourceNotBindable", { name: widgetName, source: widget.source }, { type: "widget", id: widget.id, name: widgetName });
          }
          return;
        }

        if (widget.type === "matrix" || widget.type === "led" || widget.type === "text") {
          if (!widget.source) {
            pushAnalysisIssue(issues, "warning", "analysis.issue.widgetNoSource", { name: widgetName }, { type: "widget", id: widget.id, name: widgetName });
            return;
          }
          const sourceNode = nodeMap.get(widget.source);
          if (!sourceNode) {
            pushAnalysisIssue(issues, "error", "analysis.issue.widgetMissingSource", { name: widgetName, source: widget.source }, { type: "widget", id: widget.id, name: widgetName });
            return;
          }
          if (!sourceNode.output) {
            pushAnalysisIssue(issues, "warning", "analysis.issue.widgetSourceNotOutput", { name: widgetName, source: widget.source }, { type: "widget", id: widget.id, name: widgetName });
          }
          return;
        }

        if (widget.type === "table") {
          if (!Array.isArray(widget.columns) || widget.columns.length === 0) {
            pushAnalysisIssue(issues, "warning", "analysis.issue.tableNoColumns", { name: widgetName }, { type: "widget", id: widget.id, name: widgetName });
            return;
          }
          widget.columns.forEach((columnName) => {
            if (columnName === "time") {
              return;
            }
            const sourceNode = nodeMap.get(columnName);
            if (!sourceNode) {
              pushAnalysisIssue(issues, "error", "analysis.issue.tableMissingColumn", { name: widgetName, source: columnName }, { type: "widget", id: widget.id, name: widgetName });
              return;
            }
            if (!sourceNode.output) {
              pushAnalysisIssue(issues, "warning", "analysis.issue.tableColumnNotOutput", { name: widgetName, source: columnName }, { type: "widget", id: widget.id, name: widgetName });
            }
          });
          return;
        }

        if (widget.type === "xychart") {
          if (!Array.isArray(widget.xyPairs) || widget.xyPairs.length === 0) {
            pushAnalysisIssue(issues, "warning", "analysis.issue.chartNoPairs", { name: widgetName }, { type: "widget", id: widget.id, name: widgetName });
            return;
          }
          widget.xyPairs.forEach((pair) => {
            [pair?.xSource, pair?.ySource].forEach((sourceName) => {
              if (!sourceName || sourceName === "time") {
                return;
              }
              const sourceNode = nodeMap.get(sourceName);
              if (!sourceNode) {
                pushAnalysisIssue(issues, "error", "analysis.issue.chartMissingSeriesSource", { name: widgetName, source: sourceName }, { type: "widget", id: widget.id, name: widgetName });
                return;
              }
              if (!sourceNode.output) {
                pushAnalysisIssue(issues, "warning", "analysis.issue.chartSeriesNotOutput", { name: widgetName, source: sourceName }, { type: "widget", id: widget.id, name: widgetName });
              }
            });
          });
        }
      });

      const previewState = getExpressionPreviewInitializationState();
      graph.nodes
        .filter((node) => isStateNode(node))
        .forEach((node) => {
          const preview = stateTransitionPreviewForAnalysis(node, previewState);
          if (!preview?.current?.ok || !preview?.next?.ok) {
            return;
          }
          const currentShape = describeExpressionPreviewShape(preview.current.value);
          const nextShape = describeExpressionPreviewShape(preview.next.value);
          if (currentShape && nextShape && currentShape !== nextShape) {
            pushAnalysisIssue(
              issues,
              "warning",
              "analysis.issue.stateShapeMismatch",
              { name: node.name, current: currentShape, next: nextShape },
              { type: "node", id: node.id, name: node.name },
            );
          }
        });

      return issues;
    }

    return {
      analyzeModelStaticIssues,
      collectExpressionIdentifierReferences,
      detectInitialDefinitionCycles,
      detectNonStateCycles,
      expressionReferencesForAnalysis,
      incomingEdgesForNode,
      nodeIsImplicitlyReferenced,
      outgoingEdgesForNode,
      pureTimeConfigIssue,
      pureTimedDelayIssue,
      stateTransitionPreviewForAnalysis,
      submodelBindingReferences,
    };
  }

  return {
    createModelAnalysisCoreHelpers,
  };
});
