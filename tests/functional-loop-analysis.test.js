/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Francesco Bertolotti.
 */

const assert = require("node:assert/strict");
const functionalLoops = require("../functional-loop-core.js");

const model = {
  nodes: [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
    { id: 4, name: "D" },
  ],
  edges: [
    { id: 1, from: 1, to: 2, relationType: "+" },
    { id: 2, from: 2, to: 1, relationType: "+" },
    { id: 3, from: 1, to: 3, relationType: "+" },
    { id: 4, from: 3, to: 1, relationType: "-" },
    { id: 5, from: 2, to: 4, relationType: "1" },
    { id: 6, from: 4, to: 2, relationType: "+" },
    { id: 7, from: 4, to: 1, relationType: "0" },
  ],
};

const report = functionalLoops.analyzeFunctionalLoops(model, { maxCycles: 20, maxDepth: 4 });
assert.equal(report.counts.nodes, 4);
assert.equal(report.counts.edges, 6, "an edge classified as 0 must not enter the analyzed graph");
assert.equal(report.counts.loops, 3);
assert.equal(report.counts.reinforcing, 1);
assert.equal(report.counts.balancing, 1);
assert.equal(report.counts.indeterminate, 1);

const reinforcing = report.cycles.find((loop) => loop.classification === "reinforcing");
const balancing = report.cycles.find((loop) => loop.classification === "balancing");
const indeterminate = report.cycles.find((loop) => loop.classification === "indeterminate");
assert.equal(reinforcing.sign, 1);
assert.equal(balancing.sign, -1);
assert.equal(indeterminate.sign, 0);
assert.deepEqual(indeterminate.indeterminateEdgeIds, [5]);

const nodeA = report.nodes.find((node) => node.nodeId === 1);
assert.equal(nodeA.totalLoops, 2);
assert.equal(nodeA.reinforcingLoops, 1);
assert.equal(nodeA.balancingLoops, 1);
assert.equal(nodeA.canReachCount, 3);

const truncated = functionalLoops.enumerateSimpleCycles(model, { maxCycles: 1 });
assert.equal(truncated.cycles.length, 1);
assert.equal(truncated.truncated, true);

const noCycle = functionalLoops.analyzeFunctionalLoops({
  nodes: [{ id: 1, name: "Origin" }, { id: 2, name: "Destination" }],
  edges: [{ id: 1, from: 1, to: 2, relationType: "+" }],
});
assert.equal(noCycle.counts.loops, 0);
assert.equal(noCycle.validation.noCycles, true);
assert.equal(noCycle.nodes.find((node) => node.nodeId === 1).outDegree, 1);

const multiEdgeAndSelfLoop = functionalLoops.analyzeFunctionalLoops({
  nodes: [{ id: 1, name: "A" }, { id: 2, name: "B" }],
  edges: [
    { id: "a-plus", from: 1, to: 2, relationType: "+" },
    { id: "a-minus", from: 1, to: 2, relationType: "-" },
    { id: "back", from: 2, to: 1, relationType: "+" },
    { id: "self", from: 2, to: 2, relationType: "-" },
  ],
});
assert.equal(multiEdgeAndSelfLoop.counts.loops, 3, "parallel edges and self-loops must remain distinct cycles");
assert.equal(multiEdgeAndSelfLoop.counts.reinforcing, 1);
assert.equal(multiEdgeAndSelfLoop.counts.balancing, 2);

assert.equal(functionalLoops.normalizeRelationType("non monotona"), "1");
assert.equal(functionalLoops.normalizeRelationType("nessuna relazione"), "0");
assert.equal(functionalLoops.validateRelationType("?").ok, false);
assert.match(functionalLoops.exportFunctionalLoopCsv(report), /Functional Loop Diagram/);

console.log("functional-loop-analysis.test.js: ok");
