/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Francesco Bertolotti.
 */

(function initSensitivityAnalysisCore(globalScope, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }
  globalScope.STGraphXSensitivityAnalysisCore = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function createSensitivityAnalysisCoreExports() {
  function createSensitivityAnalysisCore(deps = {}) {
    const cloneRuntimeModel = deps.cloneRuntimeModel;
    const initializeStateNodesForModel = deps.initializeStateNodesForModel;
    const promotePendingStateNodesForModel = deps.promotePendingStateNodesForModel;
    const evaluateModelAtTimeRecursive = deps.evaluateModelAtTimeRecursive;

    if (typeof cloneRuntimeModel !== "function"
      || typeof initializeStateNodesForModel !== "function"
      || typeof promotePendingStateNodesForModel !== "function"
      || typeof evaluateModelAtTimeRecursive !== "function") {
      throw new Error("STGraphXSensitivityAnalysisCore requires runtime evaluation dependencies");
    }

    function isSensitivityInput(node) {
      return node?.shape === "diamond" || (node?.shape === "ellipse" && node.input === true);
    }

    function sensitivityInputs(model) {
      return (model?.nodes || []).filter(isSensitivityInput);
    }

    function sensitivityOutputs(model) {
      return (model?.nodes || []).filter((node) => node?.output === true);
    }

    function sampleValues(min, max, samples) {
      const count = Math.round(Number(samples));
      const start = Number(min);
      const end = Number(max);
      if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isInteger(count) || count < 2 || end <= start) {
        return null;
      }
      return Array.from({ length: count }, (_, index) => start + ((end - start) * index) / (count - 1));
    }

    function sensitivityCsv(rows, inputName, outputName) {
      const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
      const header = [inputName, outputName, "error"].map(escape).join(",");
      const body = (rows || []).map((row) => [
        row?.inputValue,
        row?.error ? "" : row?.outputValue,
        row?.error || "",
      ].map(escape).join(","));
      return [header, ...body].join("\n");
    }

    function runSample(model, inputName, outputName, inputValue) {
      const input = (model.nodes || []).find((node) => node?.name === inputName);
      const output = (model.nodes || []).find((node) => node?.name === outputName);
      if (!input || !output) {
        return { inputValue, outputValue: null, error: "selection" };
      }
      input.externalValueEnabled = true;
      input.externalValue = inputValue;
      input.computedValue = inputValue;
      input.computedError = "";

      const execution = model.execution || {};
      const t0 = Number(execution.t0);
      const dt = Number(execution.dt);
      const t1 = Number(execution.t1);
      const maxSteps = 100000;
      const epsilon = Math.max(1e-12, Math.abs(dt) * 1e-9);
      try {
        initializeStateNodesForModel(model, t0, execution);
        let timeValue = t0;
        for (let step = 0; step < maxSteps; step += 1) {
          if (timeValue > t1 + epsilon) {
            break;
          }
          if (step > 0) {
            promotePendingStateNodesForModel(model);
          }
          evaluateModelAtTimeRecursive(model, timeValue, { rootExecution: execution, stack: [] });
          execution.currentTime = timeValue;
          if (timeValue >= t1 - epsilon) {
            break;
          }
          timeValue += dt;
        }
      } catch (_err) {
        return { inputValue, outputValue: null, error: "runtime" };
      }

      if (output.computedError) {
        return { inputValue, outputValue: null, error: output.computedError };
      }
      if (!Number.isFinite(Number(output.computedValue))) {
        return { inputValue, outputValue: null, error: "nonNumeric" };
      }
      return { inputValue, outputValue: Number(output.computedValue), error: "" };
    }

    function runSensitivity(model, options = {}) {
      const inputName = String(options.inputName || "");
      const outputName = String(options.outputName || "");
      const values = sampleValues(options.min, options.max, options.samples);
      const input = sensitivityInputs(model).find((node) => node.name === inputName);
      const output = sensitivityOutputs(model).find((node) => node.name === outputName);
      const execution = model?.execution || {};
      if (!input || !output) return { ok: false, error: "selection", rows: [] };
      if (!values) return { ok: false, error: "range", rows: [] };
      if (!Number.isFinite(Number(execution.t0)) || !Number.isFinite(Number(execution.dt)) || !Number.isFinite(Number(execution.t1))
        || Number(execution.dt) <= 0 || Number(execution.t1) <= Number(execution.t0)) {
        return { ok: false, error: "time", rows: [] };
      }
      return {
        ok: true,
        rows: values.map((inputValue) => runSample(cloneRuntimeModel(model), inputName, outputName, inputValue)),
      };
    }

    return { isSensitivityInput, sensitivityInputs, sensitivityOutputs, sampleValues, sensitivityCsv, runSensitivity };
  }

  return { createSensitivityAnalysisCore };
});
