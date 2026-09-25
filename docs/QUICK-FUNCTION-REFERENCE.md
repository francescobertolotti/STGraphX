# DSGraph - Quick Function Reference

Generated automatically da `i18n-inline.js` e `graph-functions.js` (release 2026.09.19).

Regenerate with `npm run docs:functions`.

## Attribution

DSGraph is a modified version of STGraphX, originally created by Luca Mari.

Original work:
Copyright (c) 2026 Luca Mari

Modifications and additional features:
Copyright (c) 2026 Francesco Bertolotti

DSGraph is distributed under the Mozilla Public License, version 2.0.

Luca Mari and the original STGraphX project are not necessarily responsible, maintainers, or endorsers of DSGraph.

List of functions, system variables, and utilities available in expressions.

## Available variables

### `$0`

`$0, $1, ...`

In array(...), current value of the first axis ($0), second axis ($1), and so on.

---

### `$i0`

`$i0, $i1, ...`

In array(...), zero-based index of the first axis ($i0), second axis ($i1), and so on.

---

### `dt`

`dt`

Execution time step.

---

### `t0`

`t0`

Execution start time.

---

### `t1`

`t1`

Execution end time.

---

### `this`

`this`

'this' is the current full value of the state node. In scalar mode it is a single value; in vector mode it is the whole vector.

---

### `time`

`time`

Current execution time.

## General functions

### `getModelProperty`

`getModelProperty(name, fallback)`

A custom model property.

**Examples**
- `getModelProperty("title", "untitled")`

---

### `getProperty`

`getProperty(name, fallback)`

A custom property from the current node.

**Examples**
- `getProperty("unit", "")`

---

### `if`

`if(condition, value[, condition, value, ...], defaultValue)`

Value associated with the first true condition, evaluated in order, or defaultValue. Evaluation is lazy and works element by element with vector or matrix conditions.

**Examples**
- `if(x > 0, x, 0)`
- `if(x < 0, -1, x == 0, 0, 1)`

---

### `integral`

`integral(x)`

Integrates x over time. With Euler it is equivalent to this + x * dt; with RK4 it automatically uses fourth-order Runge-Kutta on integral(...) calls present in state transitions.

**Examples**
- `integral(flow)`

---

### `map`

`map(expr, array)`

Element-by-element transformation of a vector or matrix. Inside expr, $value is the current value and $0, $1, ... are local indices.

**Examples**
- `map($value*2, [1,2,3])`
- `map($0+$value, [10,20,30])`
- `map($0+$1, [[1,2],[3,4]])`

---

### `range`

`range(stop) | range(start, stop[, step])`

A numeric sequence with exclusive end value.

**Examples**
- `range(4) -> [0,1,2,3]`

---

### `readData`

`readData(path)`

Matrix of numeric and/or textual values read from a CSV file. Available only in parameters. To link a file without including it in JSON, use File > Manage data links: its path and link identifier are saved with the model and looked up automatically when it is reopened. Then type `readData("` and choose the suggested CSV. Every CSV row must have the same number of columns.

**Examples**
- `readData("data/values.csv")`

---

### `reduce`

`reduce(op|fn, vector[, init]) | reduce(op|fn, matrix, axis[, init])`

Progressive reduction of a vector or matrix. For matrices axis=0 reduces columns, axis=1 reduces rows.

**Examples**
- `reduce(+, [1,2,3])`
- `reduce(max, [3,7,2])`
- `reduce(+, [[1,2],[3,4]], 0)`

---

### `setModelProperty`

`setModelProperty(name, value)`

Assignment of a custom model property, returning the assigned value.

**Examples**
- `setModelProperty("title", "Experiment")`

---

### `setProperty`

`setProperty(name, value)`

Assignment of a custom property on the current node, returning the assigned value.

**Examples**
- `setProperty("unit", "kg")`

## Array and matrix functions

### `append`

`append(vector, value|vector) | append(value, vector) | append(matrix, rowVector)`

Appends or prepends an element to a vector, concatenates two vectors, or appends a row to a matrix.

**Examples**
- `append([1,2], 3)`
- `append(1, [2,3])`
- `append([1,2], [3,4])`
- `append([[1,2],[3,4]], [5,6])`

---

### `appendRow`

`appendRow(matrix, row)`

A copy of the matrix with a new row appended at the end. For agent matrices it adds a new agent.

**Examples**
- `appendRow(agents, [3,1])`

---

### `argmax`

`argmax(vector|matrix)`

The index of the first maximum value. For a vector it returns an index; for a matrix it returns [row, column]. In a tie it selects the first element in row and column order.

**Examples**
- `argmax([2,7,4]) -> 1`

---

### `argmin`

`argmin(vector|matrix)`

The index of the first minimum value. For a vector it returns an index; for a matrix it returns [row, column]. In a tie it selects the first element in row and column order.

**Examples**
- `argmin([2,-1,4]) -> 1`

---

### `array`

`array(axis0[, axis1, ...], expr)`

Array obtained by evaluating expr for every combination of axes. An axis can be an integer n (values 0,...,n-1) or a vector of values. $0, $1, ... are axis values; $i0, $i1, ... are their indices.

**Examples**
- `array(range(-2,3), $0^2)`

---

### `col`

`col(matrix, j)`

Column j from the matrix as a vector.

**Examples**
- `col(agents, ENERGY)`

---

### `coords`

`coords(matrix[, value])`

The [row, column] coordinates of non-zero cells in a matrix, or only of the cells equal to value if provided.

**Examples**
- `coords([[0,1,0],[2,0,3]]) -> [[0,1],[1,0],[1,2]]`
- `coords([[0,1,0],[2,0,3]], 2) -> [[1,0]]`

---

### `filter`

`filter(cond, array[, mode])`

Selection from a vector or matrix. With omitted mode or 'elements' it keeps the elements for which the condition is true. With mode='rows' it filters matrix rows, where $value is the current row and $0 its index. With mode='cols' it filters matrix columns, where $value is the current column and $0 its index.

**Examples**
- `filter($value>0, [-2,0,3])`
- `filter($0===$1, [[1,2],[3,4]])`
- `filter(grid[$value]==1, coordinates, 'rows')`

---

### `flatten`

`flatten(matrix)`

Turns a matrix into a vector by concatenating its rows.

**Examples**
- `flatten([[1,2],[3,4]]) -> [1,2,3,4]`

---

### `grid`

`grid(rows, cols[, [nRows, nCols][, collisions[, value]]])`

A spatial matrix from non-negative integer coordinates. rows gives the rows, cols gives the columns. If you provide [nRows, nCols], the resulting matrix has fixed size and raises an error if any coordinate falls outside the bounds. collisions can be 'error', 'first', or 'sum': the first raises an error on coincident coordinates, the second keeps the first occurrence value, the third sums coincident values. If value is omitted it uses 1; if it is scalar it uses that value in every occupied cell; if it is a vector it uses value[i] in the cell at row rows[i] and column cols[i].

**Examples**
- `grid([1,1], [0,2]) -> [[0,0,0],[1,0,1]]`
- `grid([1,1], [0,2], [4,5])`
- `grid([1,1], [0,0], 'sum') -> [[0],[2]]`
- `grid([1,1], [0,2], [4,5], 'error', [1,2])`

---

### `indicesWhere`

`indicesWhere(array) | indicesWhere(cond, array)`

Indices of truthy elements or of elements matching the condition. For a vector it returns a vector of indices; for a matrix it returns a vector of [row,col] pairs.

**Examples**
- `indicesWhere([0,1,0,1]) -> [1,3]`
- `indicesWhere($value>0, [-2,0,3]) -> [2]`
- `indicesWhere($0===$1, [[1,2],[3,4]]) -> [[0,0],[1,1]]`

---

### `intersection`

`intersection(vectorA, vectorB)`

The elements present in both vectors, without duplicates and preserving the order of the first vector.

**Examples**
- `intersection([1,2,2,3], [2,3,4]) -> [2,3]`

---

### `ncols`

`ncols(matrix)`

The number of matrix columns. For an agent population it matches the number of properties.

**Examples**
- `ncols(agents)`

---

### `neighbors`

`neighbors(matrix, row, col[, diagonals[, toroidal]])`

The values of cells neighboring the selected one. With diagonals=true it uses the Moore neighborhood, with diagonals=false only up, down, left, and right. With toroidal=true space wraps around the borders.

**Examples**
- `neighbors([[1,2,3],[4,5,6],[7,8,9]], 1, 1) -> [1,2,3,4,6,7,8,9]`
- `neighbors([[1,2,3],[4,5,6],[7,8,9]], 1, 1, false) -> [2,4,6,8]`
- `neighbors([[1,2,3],[4,5,6],[7,8,9]], 0, 0, false, true) -> [2,4,3,7]`

---

### `nrows`

`nrows(matrix)`

The number of matrix rows. For an agent population it matches the number of agents.

**Examples**
- `nrows(agents)`

---

### `removeAt`

`removeAt(vector, index) | removeAt(matrix, index[, axis])`

A copy without the selected vector element or without the selected matrix row or column. For matrices axis=0 removes a row, axis=1 a column.

**Examples**
- `removeAt([1,2,3], 1) -> [1,3]`
- `removeAt([[1,2],[3,4]], 0) -> [[3,4]]`
- `removeAt([[1,2],[3,4]], 1, 1) -> [[1],[3]]`

---

### `removeRow`

`removeRow(matrix, i)`

A copy of the matrix without row i. For agent matrices it removes agent i.

**Examples**
- `removeRow(agents, 2)`

---

### `row`

`row(matrix, i)`

Row i from the matrix. If the matrix represents agents, it returns the property vector of agent i.

**Examples**
- `row(agents, 0)`

---

### `set`

`set(vector)`

Vector without duplicates, preserving first appearance order.

**Examples**
- `set([3,1,3,2,1]) -> [3,1,2]`

---

### `setAt`

`setAt(vector, index, value) | setAt(matrix, [row,col], value) | setAt(matrix, row, rowVector)`

A copy with the element or row replaced.

**Examples**
- `setAt([1,2,3], 1, 9) -> [1,9,3]`
- `setAt([[1,2],[3,4]], [1,0], 8) -> [[1,2],[8,4]]`

---

### `setCol`

`setCol(matrix, j, vector)`

A copy of the matrix with column j replaced by the vector values. The vector must provide one value for each row.

**Examples**
- `setCol(agents, ENERGY, newEnergy)`

---

### `setRow`

`setRow(matrix, i, row)`

A copy of the matrix with row i replaced by row.

**Examples**
- `setRow(agents, 3, [10,1,4,7])`

---

### `shuffle`

`shuffle(vector|matrix)`

A copy of the vector with its elements randomly shuffled or a copy of the matrix with its rows randomly shuffled.

**Examples**
- `shuffle([1,2,3,4])`
- `shuffle([[1,2],[3,4],[5,6]])`

---

### `size`

`size(array[, axis])`

The size of a vector or matrix. For a vector it returns the length; for a matrix it returns [rows, columns]. With axis=0 or axis=1 it returns a single dimension.

**Examples**
- `size([1,2,3]) -> 3`
- `size([[1,2],[3,4]]) -> [2,2]`
- `size([[1,2],[3,4]], 1) -> 2`

---

### `sort`

`sort(vector)`

A copy of the vector sorted in ascending order.

**Examples**
- `sort([3,1,2]) -> [1,2,3]`

---

### `sum`

`sum(array[, axis])`

Sum of the elements of a vector or matrix. For a matrix without axis it returns the overall sum; with axis=0 it returns column sums, with axis=1 row sums.

**Examples**
- `sum([1,2,3]) -> 6`
- `sum([[1,2],[3,4]]) -> 10`
- `sum([[1,2],[3,4]], 0) -> [4,6]`

---

### `union`

`union(vectorA, vectorB)`

Union of two vectors, without duplicates and preserving first appearance order.

**Examples**
- `union([1,2], [2,3]) -> [1,2,3]`

## Statistical and probabilistic functions

### `average`

`average(array[, axis])`

Arithmetic mean of a vector or matrix. For a matrix without axis it returns the overall mean; with axis=0 it returns column means, with axis=1 row means.

**Examples**
- `average([1,2,3]) -> 2`
- `average([[1,2],[3,4]]) -> 2.5`
- `average([[1,2],[3,4]], 0) -> [2,3]`

---

### `bernoulli`

`bernoulli([p], x, mode)`

Bernoulli distribution; p defaults to 0.5. If x is omitted it samples 0 or 1. With mode=0 it computes the probability mass, with mode=1 the cdf, with mode=2 the discrete quantile.

**Examples**
- `bernoulli()`
- `bernoulli([0.3], 1, 0)`

---

### `binomial`

`binomial([n, p], x, mode)`

Binomial distribution with n trials and success probability p; n defaults to 1 and p to 0.5. If x is omitted it samples a value. With mode=0 it computes the probability mass, with mode=1 the cdf, with mode=2 the discrete quantile.

**Examples**
- `binomial()`
- `binomial([10,0.2], 3, 0)`

---

### `choice`

`choice(vector|matrix)`

Randomly picks one element from a non-empty vector or one row from a non-empty matrix.

**Examples**
- `choice([10,20,30])`
- `choice([[1,2],[3,4]])`

---

### `count`

`count(array[, axis]) | count(cond, array[, axis])`

Counts truthy elements or elements matching the condition, using $value and local indices $0, $1, ... as in filter().

**Examples**
- `count([1,0,1]) -> 2`
- `count($value>0, [-2,0,3]) -> 1`
- `count($value==1, [[1,0],[1,1]], 1) -> [1,2]`

---

### `exponential`

`exponential([params], x, mode)`

Exponential distribution; rate defaults to 1. If x is omitted it samples a value. With mode=0 it computes the pdf, with mode=1 the cdf, with mode=2 the icdf.

**Examples**
- `exponential()`
- `exponential([2])`
- `exponential([2], 1.5, 0)`
- `exponential([2], 0.9, 2)`

---

### `gaussian`

`gaussian([mu, sigma], x, mode)`

Normal distribution; mu defaults to 0 and sigma to 1. If x is omitted it samples a value. With mode=0 it computes the pdf, with mode=1 the cdf, with mode=2 the icdf.

**Examples**
- `gaussian()`
- `gaussian([0,1])`
- `gaussian([0,1], 0, 0)`
- `gaussian([0,1], 0.95, 2)`

---

### `poisson`

`poisson([rate], x, mode)`

Poisson distribution with rate; rate defaults to 1. If x is omitted it samples a value. With mode=0 it computes the probability mass, with mode=1 the cdf, with mode=2 the discrete quantile.

**Examples**
- `poisson()`
- `poisson([4], 2, 0)`

---

### `rand`

`rand([max]) | rand(min, max)`

Uniform random number. With no arguments it returns a value between 0 and 1; with one argument between 0 and max; with two arguments between min and max.

**Examples**
- `rand()`
- `rand(10)`
- `rand(-1, 1)`

---

### `randInt`

`randInt(max) | randInt(min, max)`

Uniform random integer, with inclusive upper bound. With one argument it returns an integer between 0 and max; with two arguments between min and max.

**Examples**
- `randInt(5)`
- `randInt(2, 7)`

---

### `stdev`

`stdev(array[, axis])`

Standard deviation of a vector or matrix. For a matrix without axis it returns the overall standard deviation; with axis=0 it returns column standard deviations, with axis=1 row standard deviations.

**Examples**
- `stdev([1,2,3])`

---

### `uniform`

`uniform([min, max], x, mode)`

Uniform distribution; min defaults to 0 and max to 1. If x is omitted it samples a value. With mode=0 it computes the pdf, with mode=1 the cdf, with mode=2 the icdf.

**Examples**
- `uniform()`
- `uniform([0,10], 3, 1)`
- `uniform([0,10], 0.25, 2)`

## Math functions

### `abs`

`abs(x)`

Absolute value.

**Examples**
- `abs(-3) -> 3`

---

### `acos`

`acos(x)`

Arc cosine.

**Examples**
- `acos(1) -> 0`

---

### `and`

`a and b`

Boolean operator equivalent to &&.

**Examples**
- `a and b`

---

### `asin`

`asin(x)`

Arc sine.

**Examples**
- `asin(0) -> 0`

---

### `atan`

`atan(x)`

Arc tangent.

**Examples**
- `atan(0) -> 0`

---

### `atan2`

`atan2(y, x)`

Two-argument arc tangent (y, x).

**Examples**
- `atan2(0, 1) -> 0`

---

### `ceil`

`ceil(x)`

Round up.

**Examples**
- `ceil(1.2) -> 2`

---

### `cos`

`cos(x)`

Trigonometric cosine.

**Examples**
- `cos(0) -> 1`

---

### `cosh`

`cosh(x)`

Hyperbolic cosine.

**Examples**
- `cosh(0) -> 1`

---

### `exp`

`exp(x)`

Natural exponential e^x.

**Examples**
- `exp(0) -> 1`

---

### `floor`

`floor(x)`

Round down.

**Examples**
- `floor(1.8) -> 1`

---

### `int`

`int(x)`

Remove the fractional part.

**Examples**
- `int(-1.8) -> -1`

---

### `log`

`log(x)`

Natural logarithm.

**Examples**
- `log(1) -> 0`

---

### `log10`

`log10(x)`

Base-10 logarithm.

**Examples**
- `log10(100) -> 2`

---

### `log2`

`log2(x)`

Base-2 logarithm.

**Examples**
- `log2(8) -> 3`

---

### `logBase`

`logBase(b, x)`

Logarithm of `x` with base `b`.

**Examples**
- `logBase(2, 8) -> 3`

---

### `max`

`max(x1, x2, ...)`

Maximum of the provided values.

**Examples**
- `max(2, 7, 4) -> 7`

---

### `min`

`min(x1, x2, ...)`

Minimum of the provided values.

**Examples**
- `min(2, 7, 4) -> 2`

---

### `not`

`not x`

Boolean operator equivalent to !.

**Examples**
- `not x`

---

### `or`

`a or b`

Boolean operator equivalent to ||.

**Examples**
- `a or b`

---

### `piecewise`

`piecewise(cx, cy, x)`

Signal defined by control points with linear interpolation. cx and cy are numeric vectors of the same length, with at least two items; cx must be strictly increasing. x can be a scalar, vector, or matrix. Outside the cx interval it returns the nearest endpoint value.

**Examples**
- `piecewise([0,2,5], [0,10,4], time)`

---

### `pos`

`pos(x)`

Positive part of x: x if positive, otherwise 0. It also operates element by element on vectors and matrices.

**Examples**
- `pos(-2) -> 0`

---

### `pow`

`pow(base, exp)`

Power: base raised to exponent.

**Examples**
- `pow(2, 3) -> 8`

---

### `round`

`round(x)`

Round to the nearest integer.

**Examples**
- `round(1.6) -> 2`

---

### `sign`

`sign(x)`

Sign of the number: -1, 0, or 1.

**Examples**
- `sign(-4) -> -1`

---

### `sin`

`sin(x)`

Trigonometric sine.

**Examples**
- `sin(0) -> 0`

---

### `sinh`

`sinh(x)`

Hyperbolic sine.

**Examples**
- `sinh(0) -> 0`

---

### `spline`

`spline(cx, cy, x)`

Signal defined by control points with a natural cubic spline. cx and cy are numeric vectors of the same length, with at least two items; cx must be strictly increasing. x can be a scalar, vector, or matrix. Outside the cx interval it returns the nearest endpoint value.

**Examples**
- `spline([0,2,5], [0,10,4], time)`

---

### `sqrt`

`sqrt(x)`

Square root.

**Examples**
- `sqrt(9) -> 3`

---

### `tan`

`tan(x)`

Trigonometric tangent.

**Examples**
- `tan(0) -> 0`

---

### `tanh`

`tanh(x)`

Hyperbolic tangent.

**Examples**
- `tanh(0) -> 0`

---

### `trunc`

`trunc(x)`

Remove the fractional part.

**Examples**
- `trunc(-1.8) -> -1`

## Agent functions and variables

### `$i`

`$i`

Row index of the current agent or cell. In scalar execution it is 0; in vector execution it identifies the local component; in matrix agent-based contexts it is the current row.

---

### `$j`

`$j`

Column index of the current agent or cell in matrix agent-based contexts. It is not available for non-matrix structures.

---

### `agentIndicesWhere`

`agentIndicesWhere(cond, agents)`

The indices of agents for which the condition is true. Inside the condition self is the current agent row and $i its index.

**Examples**
- `agentIndicesWhere(self[STATE] == 1, agents)`

---

### `agents`

`agents(fieldNames[, rowsOrCount])`

Creates an agent matrix with a property schema. fieldNames is a vector of field names; the second argument can be an optional matrix of initial agents or a number of agents to initialize with zeros.

**Examples**
- `agents(["ID","STATE","X","Y"])`
- `agents(["ID","STATE"], [[1,0],[2,1]])`
- `agents(["X","Y","VX","VY"], 10)`

---

### `agentSpace`

`agentSpace(agents, xCol, yCol[, idCol][, [rows, cols][, neighborhood[, toroidal[, radius]]]])`

A spatial index for an agent population with non-negative integer coordinates in columns xCol and yCol. If you provide idCol, space cells store that property values instead of row indices. neighborhood can be 'moore' or 'vonNeumann'.

**Examples**
- `agentSpace(agents, X, Y)`

---

### `allNeighborCounts`

`allNeighborCounts(agents, space)`

A vector with the neighbor count of every agent.

**Examples**
- `allNeighborCounts(agents, space)`

---

### `filterAgents`

`filterAgents(cond, agents)`

The sub-population of agents satisfying the condition. Inside the condition self is the current agent row and $i its index.

**Examples**
- `filterAgents(self[ENERGY] > 0, agents)`

---

### `mapAgents`

`mapAgents(expr, agents)`

Row-by-row transformation of all agents. expr must return a new row with the same length for each agent. Inside expr self is the current agent row and $i its index.

**Examples**
- `mapAgents(setAt(self, ENERGY, self[ENERGY] + 1), agents)`

---

### `neighborCountOf`

`neighborCountOf(agents, space, i)`

How many neighbors agent i has in the given space.

**Examples**
- `neighborCountOf(agents, space, 0)`

---

### `neighborsOf`

`neighborsOf(agents, space, i)`

The references of agents neighboring the agent at row i, using the space built with agentSpace(...). If agentSpace uses idCol, the returned references are those identifier values; otherwise they are row indices. It excludes the agent itself.

**Examples**
- `neighborsOf(agents, space, 0)`

---

### `self`

`self`

Current local node value. In scalar execution it matches the node value; in vector execution it refers to the current agent component; in matrix agent-based contexts it matches the current cell value.

---

### `spaceMatrix`

`spaceMatrix(space)`

The matrix of agent counts per cell from an agentSpace(...) value. Useful when you want to treat space as a generic matrix.

**Examples**
- `spaceMatrix(agentSpace(agents, X, Y))`
