"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "graph-functions.js"), "utf8"), context, { filename: "graph-functions.js" });
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "semantic.js"), "utf8"), context, { filename: "semantic.js" });
const scope = context.window.GraphFunctions.createMathScope();

assert.equal(scope.pos(-3), 0);
assert.equal(scope.pos(0), 0);
assert.equal(scope.pos(2.5), 2.5);
assert.deepEqual(scope.pos([-2, 0, 4]), [0, 0, 4]);
assert.deepEqual(scope.pos([[-1, 2], [0, -3]]), [[0, 2], [0, 0]]);
assert.equal(scope.logBase(2, 8), 3);
assert.ok(Math.abs(scope.logBase(10, 100) - 2) < 1e-12);
assert.deepEqual(scope.logBase(2, [1, 2, 8]), [0, 1, 3]);
assert.ok(Math.abs(context.window.GraphSemantics.evaluateValueExpression("logBase(3, 9)").value - 2) < 1e-12);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("logBase(2, [1, 2, 4])").value.join(","), "0,1,2");
assert.equal(scope.argmin([3, -2, -2, 5]), 1);
assert.equal(scope.argmax([3, 8, 8, 5]), 1);
assert.deepEqual(scope.argmin([[3, -2, 4], [-2, 5, 0]]), [0, 1]);
assert.deepEqual(scope.argmax([[3, 9, 4], [9, 5, 0]]), [0, 1]);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("argmax([1,7,4])").value, 1);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("argmin([[3,2],[1,1]])").value, [1, 0]);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("argmin([])").ok, false);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("if(1, 4, missingValue)").value, 4);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("if(0, missingValue, 1, 5, missingValue)").value, 5);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("if(0, 1, 0, 2, 3)").value, 3);
assert.deepEqual(scope.__if([0, 1, 0], 1, [1, 0, 0], 2, 3), [2, 1, 3]);
assert.deepEqual(
  context.window.GraphSemantics.evaluateValueExpression("if(x < 0, -1, x == 0, 0, 1)", { x: [-2, 0, 3] }).value,
  [-1, 0, 1],
);
assert.deepEqual(
  context.window.GraphSemantics.evaluateValueExpression("if([1,0,0], [10,missingValue,missingValue], [0,1,0], [missingValue,20,missingValue], [missingValue,missingValue,30])").value,
  [10, 20, 30],
);
assert.deepEqual(
  context.window.GraphSemantics.evaluateValueExpression("if([[1,0],[0,1]], [[1,missingValue],[missingValue,4]], [[missingValue,2],[3,missingValue]])").value,
  [[1, 2], [3, 4]],
);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("if(1, 2)").ok, false);
assert.ok(Math.abs(scope.bernoulli([0.3], 1, 0) - 0.3) < 1e-12);
assert.ok(Math.abs(scope.bernoulli([0.3], 0, 1) - 0.7) < 1e-12);
assert.ok(Math.abs(scope.binomial([4, 0.5], 2, 0) - 0.375) < 1e-12);
assert.ok(Math.abs(scope.binomial([4, 0.5], 2, 1) - 0.6875) < 1e-12);
assert.equal(scope.binomial([4, 0.5], 0.7, 2), 3);
assert.ok(Math.abs(scope.poisson([2], 3, 0) - 0.18044704431548356) < 1e-12);
assert.ok(Math.abs(scope.poisson([2], 3, 1) - 0.8571234604985472) < 1e-12);
assert.equal(scope.poisson([2], 0.5, 2), 2);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("poisson([2], 3, 0)").ok, true);
assert.equal(scope.piecewise([0, 2, 5], [0, 10, 4], 1), 5);
assert.deepEqual(scope.piecewise([0, 2, 5], [0, 10, 4], [-1, 2, 3.5, 8]), [0, 10, 7, 4]);
assert.ok(Math.abs(scope.spline([0, 1, 2], [0, 1, 0], 0.5) - 0.6875) < 1e-12);
assert.deepEqual(scope.spline([0, 1, 2], [0, 1, 0], [-1, 2.5]), [0, 0]);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("piecewise([0,2], [1,5], 1)").value, 3);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("pos([-2, 0, 4])").value, [0, 0, 4]);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("range(1, 6)").value, [1, 2, 3, 4, 5]);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("size(range(1, 6))").value, 5);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("array(2, 2, $0+$1)").value, [[0, 1], [1, 2]]);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("array(range(-2, 3), $0)").value, [-2, -1, 0, 1, 2]);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("array(range(-2, 3), $i0)").value, [0, 1, 2, 3, 4]);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("array(2, range(10, 13), [$0, $1, $i0, $i1])").value, [
  [[0, 10, 0, 0], [0, 11, 0, 1], [0, 12, 0, 2]],
  [[1, 10, 1, 0], [1, 11, 1, 1], [1, 12, 1, 2]],
]);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("array([2,4], $0)").value, [2, 4]);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("[1,2,3,4][[0,2]]").value, [1, 3]);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("[1,2,3,4][[-1,0,-1]]").value, [4, 1, 4]);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("[[1,2,3],[4,5,6],[7,8,9]][[0,2]]").value, 3);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("[[1,2,3],[4,5,6],[7,8,9]][[0,2], :]").value, [[1, 2, 3], [7, 8, 9]]);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("[[1,2,3],[4,5,6],[7,8,9]][:, [0,2]]").value, [[1, 3], [4, 6], [7, 9]]);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("[[1,2,3],[4,5,6],[7,8,9]][[[0,1],[2,0]]]").value, [2, 7]);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("[1,2][[0,3]]").ok, false);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("array([[1,2]], $0)").ok, false);
assert.equal(context.window.GraphSemantics.validateExpressionSyntax("array(range(-2, 3), $i0)").ok, true);
assert.equal(context.window.GraphSemantics.validateExpressionSyntax("$i0").ok, false);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("append(1, [2,3])").value, [1, 2, 3]);
assert.deepEqual(context.window.GraphSemantics.evaluateValueExpression("append(1, [])").value, [1]);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("append(1, [[2,3]])").ok, false);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("-2^2").value, -4);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("(-2)^2").value, 4);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("2^-2").value, 0.25);
assert.equal(context.window.GraphSemantics.evaluateValueExpression("2^3^2").value, 512);
assert.equal(
  context.window.GraphSemantics.evaluateValueExpression("exp(-(2-5)^2/(2*3^2))").value,
  Math.exp(-0.5),
);
assert.equal(context.window.GraphSemantics.isFunctionName("pos"), true);
console.log("graph-functions.test.js: ok");
