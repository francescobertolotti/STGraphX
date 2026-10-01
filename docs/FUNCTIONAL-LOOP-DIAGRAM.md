<!--
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Copyright (c) 2026 Francesco Bertolotti.
-->

# Functional Loop Diagram

The **Functional Loop Diagram** is a qualitative, structural analysis of the directed graph already in the model. Open it with **Run > Run Functional Loop Diagram**. It needs no equations, quantitative data, or timed simulation, and does not change the graph: it only reads its nodes, edges, and functional relationship types.

## Preparing the graph

Select an edge and choose its **Functional relationship type** in the Properties panel:

- `+` — direct: increasing the source tends to increase the target;
- `−` — inverse: increasing the source tends to decrease the target;
- `1` — non-monotonic or unspecified: a dependency exists, but a sign cannot be assigned rigorously;
- `0` — no relationship: removes the edge, so it is neither saved nor analyzed.

Every new edge defaults to `1`. It does not mean numeric `+1`; it denotes a functionally indeterminate relationship for sign analysis. Older models stay compatible: their edges without an explicit field default to `1`.

For a `+` or `−` relationship, DSGraph automatically shows the sign above the edge when the **Label** field is empty. A custom label replaces that automatic sign, and its position, rotation, and background remain under the user's control.

## Results

**Run analysis** calculates five result groups.

1. **Functional loops.** All simple directed cycles are listed up to a configurable limit. Equivalent rotations are deduplicated; the engine handles self-loops and parallel edges.
2. **Classification.** A loop containing only `+` and `−` has a sign product of `+1` — R, reinforcing, with an even number of negative edges — or `−1` — B, balancing, with an odd number. A loop containing `1` has product `0` and is N, neutral or indeterminate. It remains visible and counted but is not counted as R or B; the indeterminate edges are listed.
3. **Variable participation.** Every variable reports total, R, B, and N loop participation, average loop length, and its associated loop IDs. The table is ordered by descending total participation.
4. **Functional reach.** The report includes out-degree, reachable nodes, nodes that can reach the variable, and direct betweenness centrality. Betweenness is skipped above 80 nodes to keep the interface responsive.
5. **Signed influence.** Simple paths are explored up to the selected depth (default: 4). Each reached node separately reports positive, negative, and indeterminate signals, and identifies positive/negative conflicts.

The leverage-point ranking has an explicit structural score: `3 × loop participation + reachable nodes + nodes that can reach the variable + betweenness`. It orders structurally relevant points; it is not a quantitative prediction.

Rows in the loop and variable tables, and the ranking, can be clicked to highlight the corresponding nodes and edges in the diagram. CSV export includes the summary, loops, and node indicators.

## Four-node example

With nodes `A`, `B`, `C`, and `D`, use:

- `A → B (+)`, `B → A (+)`: `A → B → A` is **R**;
- `A → C (+)`, `C → A (−)`: `A → C → A` is **B**;
- `B → D (1)`, `D → B (+)`: `B → D → B` is **N**.

The final loop remains shown and counted but belongs to neither R nor B because the sign of `B → D` is unknown. A `D → A (0)` edge does not enter the analyzed graph.

## Limits and technical notes

The feature analyzes declared structure and functional signs. It does not calculate magnitudes, time, delays, or dynamic stability. Simulating temporal evolution still requires equations, parameters, initial conditions and, where needed, delays. Very cyclic graphs can reach the enumeration limit, in which case DSGraph clearly reports truncation. Non-monotonic or uncertain relationships are never forced to positive or negative signs, so loops and paths that use them remain indeterminate.

The no-dependency implementation is in `functional-loop-core.js`, with separate routines for relation validation, cycle enumeration and deduplication, loop signs and classification, node metrics, and CSV export. Automated tests cover reinforcing, balancing, and indeterminate loops, `0` edges, self-loops, parallel edges, and truncated enumeration.
