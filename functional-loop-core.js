/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Francesco Bertolotti.
 */

(function initFunctionalLoopCoreModule(globalScope, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }
  globalScope.DSGraphFunctionalLoopCore = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function createFunctionalLoopCoreExports() {
  const RELATION_TYPES = new Set(["+", "-", "1", "0"]);

  function normalizeRelationType(value, fallback = "1") {
    const raw = String(value ?? "").trim().toLowerCase();
    if (!raw) return fallback;
    if (["+", "positive", "positivo"].includes(raw)) return "+";
    if (["-", "negative", "negativo"].includes(raw)) return "-";
    if (["1", "nonmonotonic", "non-monotonic", "non monotonic", "nonmonotona", "non-monotona", "non monotona", "unknown", "unknown sign", "indeterminate"].includes(raw)) return "1";
    if (["0", "none", "no relation", "nessuna relazione", "nessuno"].includes(raw)) return "0";
    return fallback;
  }

  function validateRelationType(value) {
    const raw = String(value ?? "").trim().toLowerCase();
    if (!raw) return { ok: true, value: "1", defaulted: true };
    const normalized = normalizeRelationType(raw, "");
    return {
      ok: RELATION_TYPES.has(normalized),
      value: RELATION_TYPES.has(normalized) ? normalized : "1",
      defaulted: false,
    };
  }

  function edgeRelationType(edge) {
    return normalizeRelationType(edge?.relationType, "1");
  }

  function relationIsMonotonic(relationType) {
    return relationType === "+" || relationType === "-";
  }

  function relationSign(relationType) {
    if (relationType === "+") return 1;
    if (relationType === "-") return -1;
    return 0;
  }

  function stableId(value) {
    return String(value ?? "");
  }

  function compareIds(left, right) {
    const a = stableId(left);
    const b = stableId(right);
    return a.localeCompare(b, undefined, { numeric: true });
  }

  function canonicalCycleKey(edges) {
    const ids = (edges || []).map((edge) => stableId(edge?.id));
    if (ids.length === 0) return "";
    let best = null;
    for (let offset = 0; offset < ids.length; offset += 1) {
      const rotated = ids.slice(offset).concat(ids.slice(0, offset)).join("|");
      if (best == null || rotated < best) best = rotated;
    }
    return best;
  }

  function buildAnalyzableGraph(model = {}) {
    const nodes = Array.isArray(model?.nodes) ? model.nodes : [];
    const nodeById = new Map();
    nodes.forEach((node) => {
      if (node && node.id != null && !nodeById.has(node.id)) {
        nodeById.set(node.id, node);
      }
    });

    const invalidEdges = [];
    const nonMonotonicEdges = [];
    const ignoredEdges = [];
    const edges = [];
    (Array.isArray(model?.edges) ? model.edges : []).forEach((edge, index) => {
      if (!edge || edge.from == null || edge.to == null || !nodeById.has(edge.from) || !nodeById.has(edge.to)) {
        ignoredEdges.push(edge);
        return;
      }
      const validation = validateRelationType(edge.relationType);
      const relationType = validation.value;
      if (!validation.ok) invalidEdges.push(edge);
      if (relationType === "0") {
        ignoredEdges.push(edge);
        return;
      }
      const normalized = { ...edge, id: edge.id ?? `edge-${index}`, relationType };
      edges.push(normalized);
      if (!relationIsMonotonic(relationType)) nonMonotonicEdges.push(normalized);
    });

    const adjacency = new Map([...nodeById.keys()].map((id) => [id, []]));
    const reverseAdjacency = new Map([...nodeById.keys()].map((id) => [id, []]));
    edges.forEach((edge) => {
      adjacency.get(edge.from).push(edge);
      reverseAdjacency.get(edge.to).push(edge);
    });
    adjacency.forEach((list) => list.sort((a, b) => compareIds(a.to, b.to) || compareIds(a.id, b.id)));

    return {
      nodeById,
      nodeIds: [...nodeById.keys()].sort(compareIds),
      edges,
      adjacency,
      reverseAdjacency,
      invalidEdges,
      nonMonotonicEdges,
      ignoredEdges,
    };
  }

  function classifyLoop(edgePath) {
    const edges = Array.isArray(edgePath) ? edgePath : [];
    const indeterminateEdges = edges.filter((edge) => !relationIsMonotonic(edge.relationType));
    if (indeterminateEdges.length > 0) {
      return {
        sign: 0,
        classification: "indeterminate",
        indeterminateEdges,
      };
    }
    const sign = edges.reduce((product, edge) => product * relationSign(edge.relationType), 1);
    return {
      sign,
      classification: sign > 0 ? "reinforcing" : "balancing",
      indeterminateEdges: [],
    };
  }

  function enumerateSimpleCycles(model, options = {}) {
    const graph = options.graph || buildAnalyzableGraph(model);
    const requestedLimit = Number(options.maxCycles);
    const maxCycles = Number.isFinite(requestedLimit) ? Math.max(1, Math.floor(requestedLimit)) : 500;
    const requestedSearchLimit = Number(options.maxSearchSteps);
    const maxSearchSteps = Number.isFinite(requestedSearchLimit)
      ? Math.max(1000, Math.floor(requestedSearchLimit))
      : Math.max(10000, Math.min(100000, maxCycles * 400));
    const rank = new Map(graph.nodeIds.map((id, index) => [id, index]));
    const seen = new Set();
    const cycles = [];
    let truncated = false;
    let truncationReason = null;
    let searchSteps = 0;

    const registerCycle = (nodePath, edgePath) => {
      const key = canonicalCycleKey(edgePath);
      if (!key || seen.has(key)) return;
      seen.add(key);
      if (cycles.length >= maxCycles) {
        truncated = true;
        truncationReason = "cycleLimit";
        return;
      }
      const classification = classifyLoop(edgePath);
      cycles.push({
        id: `L${cycles.length + 1}`,
        nodeIds: nodePath.slice(),
        edgeIds: edgePath.map((edge) => edge.id),
        edges: edgePath.slice(),
        length: edgePath.length,
        sign: classification.sign,
        classification: classification.classification,
        indeterminateEdgeIds: classification.indeterminateEdges.map((edge) => edge.id),
      });
    };

    for (const startId of graph.nodeIds) {
      if (truncated) break;
      const startRank = rank.get(startId);
      const visited = new Set([startId]);
      const nodePath = [startId];
      const edgePath = [];
      const visit = (currentId) => {
        if (truncated) return;
        const outgoing = graph.adjacency.get(currentId) || [];
        for (const edge of outgoing) {
          if (truncated) return;
          searchSteps += 1;
          if (searchSteps > maxSearchSteps) {
            truncated = true;
            truncationReason = "searchLimit";
            return;
          }
          const nextId = edge.to;
          if (nextId === startId) {
            registerCycle(nodePath, edgePath.concat(edge));
            continue;
          }
          if (visited.has(nextId) || rank.get(nextId) < startRank) continue;
          visited.add(nextId);
          nodePath.push(nextId);
          edgePath.push(edge);
          visit(nextId);
          edgePath.pop();
          nodePath.pop();
          visited.delete(nextId);
        }
      };
      visit(startId);
    }
    return { cycles, truncated, truncationReason, graph };
  }

  function reachableNodeIds(startId, adjacency, nextField = "to") {
    const found = new Set();
    const queue = [startId];
    while (queue.length) {
      const current = queue.shift();
      (adjacency.get(current) || []).forEach((edge) => {
        const nextId = edge[nextField];
        if (!found.has(nextId) && nextId !== startId) {
          found.add(nextId);
          queue.push(nextId);
        }
      });
    }
    return found;
  }

  function directBetweenness(graph, limit = 80) {
    const nodeIds = graph.nodeIds;
    if (nodeIds.length > limit) return null;
    const centrality = new Map(nodeIds.map((id) => [id, 0]));
    nodeIds.forEach((source) => {
      const stack = [];
      const predecessors = new Map(nodeIds.map((id) => [id, []]));
      const sigma = new Map(nodeIds.map((id) => [id, 0]));
      const distance = new Map(nodeIds.map((id) => [id, -1]));
      sigma.set(source, 1);
      distance.set(source, 0);
      const queue = [source];
      while (queue.length) {
        const current = queue.shift();
        stack.push(current);
        (graph.adjacency.get(current) || []).forEach((edge) => {
          const target = edge.to;
          if (distance.get(target) < 0) {
            queue.push(target);
            distance.set(target, distance.get(current) + 1);
          }
          if (distance.get(target) === distance.get(current) + 1) {
            sigma.set(target, sigma.get(target) + sigma.get(current));
            predecessors.get(target).push(current);
          }
        });
      }
      const dependency = new Map(nodeIds.map((id) => [id, 0]));
      while (stack.length) {
        const target = stack.pop();
        predecessors.get(target).forEach((sourceId) => {
          const sourcePaths = sigma.get(sourceId);
          const targetPaths = sigma.get(target);
          if (targetPaths > 0) {
            dependency.set(sourceId, dependency.get(sourceId) + (sourcePaths / targetPaths) * (1 + dependency.get(target)));
          }
        });
        if (target !== source) centrality.set(target, centrality.get(target) + dependency.get(target));
      }
    });
    return centrality;
  }

  function signedInfluenceFrom(startId, graph, maxDepth = 4) {
    const requestedDepth = Number(maxDepth);
    const depthLimit = Number.isFinite(requestedDepth) ? Math.max(1, Math.floor(requestedDepth)) : 4;
    const targets = new Map();
    const ensureTarget = (id) => {
      if (!targets.has(id)) {
        targets.set(id, { nodeId: id, positive: 0, negative: 0, indeterminate: 0, conflict: false });
      }
      return targets.get(id);
    };
    const visit = (currentId, depth, sign, indeterminate, visited) => {
      if (depth >= depthLimit) return;
      (graph.adjacency.get(currentId) || []).forEach((edge) => {
        const nextId = edge.to;
        if (visited.has(nextId)) return;
        const nextIndeterminate = indeterminate || !relationIsMonotonic(edge.relationType);
        const nextSign = nextIndeterminate ? 0 : sign * relationSign(edge.relationType);
        const target = ensureTarget(nextId);
        if (nextIndeterminate) target.indeterminate += 1;
        else if (nextSign > 0) target.positive += 1;
        else target.negative += 1;
        const nextVisited = new Set(visited);
        nextVisited.add(nextId);
        visit(nextId, depth + 1, nextSign, nextIndeterminate, nextVisited);
      });
    };
    visit(startId, 0, 1, false, new Set([startId]));
    targets.forEach((entry) => { entry.conflict = entry.positive > 0 && entry.negative > 0; });
    return [...targets.values()].sort((a, b) => compareIds(a.nodeId, b.nodeId));
  }

  function calculateNodeIndicators(graph, cycles, options = {}) {
    const betweenness = directBetweenness(graph, options.maxBetweennessNodes ?? 80);
    const depth = options.maxDepth ?? 4;
    return graph.nodeIds.map((nodeId) => {
      const associatedLoops = cycles.filter((loop) => loop.nodeIds.includes(nodeId));
      const counts = { reinforcing: 0, balancing: 0, indeterminate: 0 };
      associatedLoops.forEach((loop) => { counts[loop.classification] += 1; });
      const outgoing = graph.adjacency.get(nodeId) || [];
      const reachable = reachableNodeIds(nodeId, graph.adjacency);
      const canReach = reachableNodeIds(nodeId, graph.reverseAdjacency, "from");
      const influence = signedInfluenceFrom(nodeId, graph, depth);
      const leverageScore = (associatedLoops.length * 3) + reachable.size + canReach.size + (betweenness ? betweenness.get(nodeId) || 0 : 0);
      return {
        nodeId,
        name: String(graph.nodeById.get(nodeId)?.name ?? nodeId),
        totalLoops: associatedLoops.length,
        reinforcingLoops: counts.reinforcing,
        balancingLoops: counts.balancing,
        indeterminateLoops: counts.indeterminate,
        averageLoopLength: associatedLoops.length
          ? associatedLoops.reduce((sum, loop) => sum + loop.length, 0) / associatedLoops.length
          : 0,
        loopIds: associatedLoops.map((loop) => loop.id),
        outDegree: outgoing.length,
        reachableCount: reachable.size,
        canReachCount: canReach.size,
        betweenness: betweenness ? betweenness.get(nodeId) || 0 : null,
        signedInfluence: influence,
        leverageScore,
      };
    }).sort((left, right) => right.totalLoops - left.totalLoops || right.leverageScore - left.leverageScore || left.name.localeCompare(right.name));
  }

  function analyzeFunctionalLoops(model, options = {}) {
    const graph = buildAnalyzableGraph(model);
    const enumerated = enumerateSimpleCycles(model, { ...options, graph });
    const cycles = enumerated.cycles.map((loop) => ({
      ...loop,
      nodeNames: loop.nodeIds.map((id) => String(graph.nodeById.get(id)?.name ?? id)),
      edgeDescriptions: loop.edges.map((edge) => ({
        id: edge.id,
        from: edge.from,
        to: edge.to,
        fromName: String(graph.nodeById.get(edge.from)?.name ?? edge.from),
        toName: String(graph.nodeById.get(edge.to)?.name ?? edge.to),
        relationType: edge.relationType,
      })),
    }));
    const nodes = calculateNodeIndicators(graph, cycles, options);
    const counts = {
      nodes: graph.nodeIds.length,
      edges: graph.edges.length,
      loops: cycles.length,
      reinforcing: cycles.filter((loop) => loop.classification === "reinforcing").length,
      balancing: cycles.filter((loop) => loop.classification === "balancing").length,
      indeterminate: cycles.filter((loop) => loop.classification === "indeterminate").length,
    };
    return {
      graph,
      cycles,
      nodes,
      leverage: nodes.slice().sort((left, right) => right.leverageScore - left.leverageScore || left.name.localeCompare(right.name)),
      counts,
      truncated: enumerated.truncated,
      truncationReason: enumerated.truncationReason,
      maxCycles: Number.isFinite(Number(options.maxCycles)) ? Math.max(1, Math.floor(Number(options.maxCycles))) : 500,
      maxDepth: Number.isFinite(Number(options.maxDepth)) ? Math.max(1, Math.floor(Number(options.maxDepth))) : 4,
      validation: {
        emptyGraph: graph.nodeIds.length === 0,
        invalidRelationEdges: graph.invalidEdges,
        nonMonotonicEdges: graph.nonMonotonicEdges,
        ignoredZeroEdges: graph.ignoredEdges.filter((edge) => normalizeRelationType(edge?.relationType, "1") === "0"),
        noCycles: cycles.length === 0,
      },
    };
  }

  function escapeCsv(value) {
    const text = String(value ?? "");
    return /[",\n\r]/u.test(text) ? `"${text.replace(/"/gu, '""')}"` : text;
  }

  function exportFunctionalLoopCsv(result = {}) {
    const rows = [];
    const add = (values) => rows.push(values.map(escapeCsv).join(","));
    add(["Functional Loop Diagram"]);
    add(["Nodes", result?.counts?.nodes ?? 0, "Edges", result?.counts?.edges ?? 0, "Loops", result?.counts?.loops ?? 0]);
    add([]);
    add(["Loops"]);
    add(["ID", "Classification", "Sign", "Length", "Nodes", "Edges", "Indeterminate edges"]);
    (result.cycles || []).forEach((loop) => add([
      loop.id,
      loop.classification,
      loop.sign,
      loop.length,
      (loop.nodeNames || []).join(" -> "),
      (loop.edgeDescriptions || []).map((edge) => `${edge.fromName} -> ${edge.toName} (${edge.relationType})`).join(" | "),
      (loop.indeterminateEdgeIds || []).join(" | "),
    ]));
    add([]);
    add(["Variables"]);
    add(["Variable", "Loop count", "Reinforcing", "Balancing", "Indeterminate", "Average loop length", "Out-degree", "Reachable", "Can reach", "Betweenness", "Leverage score", "Loop IDs"]);
    (result.nodes || []).forEach((node) => add([
      node.name,
      node.totalLoops,
      node.reinforcingLoops,
      node.balancingLoops,
      node.indeterminateLoops,
      node.averageLoopLength,
      node.outDegree,
      node.reachableCount,
      node.canReachCount,
      node.betweenness == null ? "" : node.betweenness,
      node.leverageScore,
      (node.loopIds || []).join(" | "),
    ]));
    return `${rows.join("\r\n")}\r\n`;
  }

  return {
    RELATION_TYPES,
    analyzeFunctionalLoops,
    buildAnalyzableGraph,
    canonicalCycleKey,
    calculateNodeIndicators,
    classifyLoop,
    edgeRelationType,
    enumerateSimpleCycles,
    exportFunctionalLoopCsv,
    normalizeRelationType,
    relationIsMonotonic,
    relationSign,
    signedInfluenceFrom,
    validateRelationType,
  };
});
