/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Francesco Bertolotti.
 */

"use strict";

const assert = require("assert");
const { createSensitivityAnalysisCore } = require("../sensitivity-analysis-core.js");

const core = createSensitivityAnalysisCore({
  cloneRuntimeModel: (model) => JSON.parse(JSON.stringify(model)),
  initializeStateNodesForModel: () => {},
  promotePendingStateNodesForModel: () => {},
  evaluateModelAtTimeRecursive: (model, timeValue) => {
    const input = model.nodes.find((node) => node.name === "gain");
    const output = model.nodes.find((node) => node.name === "result");
    output.computedValue = Number(input.externalValue) * timeValue;
    output.computedError = "";
    return { successCount: 2, errorCount: 0 };
  },
});

const model = {
  execution: { t0: 0, dt: 1, t1: 2 },
  nodes: [
    { name: "gain", shape: "diamond", output: false },
    { name: "result", shape: "ellipse", output: true },
  ],
};

const result = core.runSensitivity(model, {
  inputName: "gain",
  outputName: "result",
  min: 0,
  max: 2,
  samples: 3,
});
assert.equal(result.ok, true);
assert.deepEqual(result.rows.map((row) => row.inputValue), [0, 1, 2]);
assert.deepEqual(result.rows.map((row) => row.outputValue), [0, 2, 4]);
assert.equal(core.runSensitivity(model, { inputName: "gain", outputName: "result", min: 2, max: 0, samples: 3 }).error, "range");
assert.equal(core.sensitivityCsv(result.rows, "gain", "result"), '"gain","result","error"\n"0","0",""\n"1","2",""\n"2","4",""');
console.log("sensitivity-analysis-core.test.js: ok");
