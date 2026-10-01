/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Francesco Bertolotti.
 */

(function initFunctionalLoopUiModule(globalScope, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }
  globalScope.DSGraphFunctionalLoopUi = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function createFunctionalLoopUiExports() {
  function createFunctionalLoopUiHelpers(options = {}) {
    const t = typeof options.t === "function" ? options.t : (key) => key;
    const modal = options.modal || null;
    const content = options.content || null;
    const summary = options.summary || null;
    const validation = options.validation || null;
    const maxCyclesInput = options.maxCyclesInput || null;
    const maxDepthInput = options.maxDepthInput || null;
    const runAnalysis = typeof options.runAnalysis === "function" ? options.runAnalysis : () => null;
    const onFocusLoop = typeof options.onFocusLoop === "function" ? options.onFocusLoop : () => {};
    const onFocusNode = typeof options.onFocusNode === "function" ? options.onFocusNode : () => {};
    const onExport = typeof options.onExport === "function" ? options.onExport : () => {};
    const setStatusKey = typeof options.setStatusKey === "function" ? options.setStatusKey : () => {};
    let result = null;
    let filter = "all";

    function intValue(input, fallback, min, max) {
      const number = Number(input?.value);
      if (!Number.isFinite(number)) return fallback;
      return Math.max(min, Math.min(max, Math.floor(number)));
    }

    function classificationText(value) {
      return t(`functionalLoops.classification.${value}`);
    }

    function relationText(value) {
      return t(`functionalLoops.relation.${value}`);
    }

    function createElement(name, className = "", text = null) {
      const el = document.createElement(name);
      if (className) el.className = className;
      if (text != null) el.textContent = text;
      return el;
    }

    function appendCell(row, value, className = "") {
      const cell = createElement("td", className, value);
      row.appendChild(cell);
      return cell;
    }

    function appendHead(row, key) {
      row.appendChild(createElement("th", "", t(key)));
    }

    function renderValidation() {
      if (!validation) return;
      validation.innerHTML = "";
      if (!result) {
        validation.appendChild(createElement("div", "functional-loop-validation neutral", t("functionalLoops.validation.ready")));
        return;
      }
      const entries = [];
      if (result.validation.emptyGraph) entries.push(["warning", "functionalLoops.validation.empty"]);
      if (result.validation.invalidRelationEdges.length) entries.push(["warning", "functionalLoops.validation.invalid", { count: result.validation.invalidRelationEdges.length }]);
      else if (!result.validation.emptyGraph) entries.push(["success", "functionalLoops.validation.classified"]);
      if (result.validation.nonMonotonicEdges.length) entries.push(["neutral", "functionalLoops.validation.nonMonotonic", { count: result.validation.nonMonotonicEdges.length }]);
      if (result.validation.noCycles && !result.validation.emptyGraph) entries.push(["neutral", "functionalLoops.validation.noCycles"]);
      if (!result.validation.emptyGraph) entries.push(["success", "functionalLoops.validation.complete"]);
      if (result.truncated) {
        entries.push([
          "warning",
          result.truncationReason === "searchLimit"
            ? "functionalLoops.validation.searchTruncated"
            : "functionalLoops.validation.truncated",
          { count: result.maxCycles },
        ]);
      }
      entries.forEach(([kind, key, params]) => validation.appendChild(createElement("div", `functional-loop-validation ${kind}`, t(key, params))));
    }

    function renderSummary() {
      if (!summary) return;
      summary.innerHTML = "";
      if (!result) return;
      [
        ["plain", "functionalLoops.summary.nodes", result.counts.nodes],
        ["plain", "functionalLoops.summary.edges", result.counts.edges],
        ["plain", "functionalLoops.summary.loops", result.counts.loops],
        ["reinforcing", "functionalLoops.summary.reinforcing", result.counts.reinforcing],
        ["balancing", "functionalLoops.summary.balancing", result.counts.balancing],
        ["indeterminate", "functionalLoops.summary.indeterminate", result.counts.indeterminate],
      ].forEach(([kind, key, count]) => summary.appendChild(createElement("div", `functional-loop-pill ${kind}`, t(key, { count }))));
    }

    function edgeDescription(loop) {
      return loop.edgeDescriptions.map((edge) => `${edge.fromName} → ${edge.toName} (${relationText(edge.relationType)})`).join(" · ");
    }

    function renderLoopTable(section) {
      const head = createElement("div", "functional-loop-section-head");
      head.appendChild(createElement("h4", "", t("functionalLoops.loops.title")));
      const filterLabel = createElement("label", "functional-loop-filter");
      filterLabel.appendChild(document.createTextNode(t("functionalLoops.loops.filter")));
      const select = document.createElement("select");
      ["all", "reinforcing", "balancing", "indeterminate"].forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name === "all" ? t("functionalLoops.filter.all") : classificationText(name);
        option.selected = filter === name;
        select.appendChild(option);
      });
      select.addEventListener("change", () => {
        filter = select.value;
        render();
      });
      filterLabel.appendChild(select);
      head.appendChild(filterLabel);
      section.appendChild(head);
      const filtered = result.cycles.filter((loop) => filter === "all" || loop.classification === filter);
      if (!filtered.length) {
        section.appendChild(createElement("div", "functional-loop-empty", t("functionalLoops.loops.empty")));
        return;
      }
      const wrap = createElement("div", "functional-loop-table-wrap");
      const table = createElement("table", "functional-loop-table");
      const header = document.createElement("tr");
      ["functionalLoops.table.id", "functionalLoops.table.nodes", "functionalLoops.table.edges", "functionalLoops.table.length", "functionalLoops.table.sign", "functionalLoops.table.classification"].forEach((key) => appendHead(header, key));
      table.appendChild(document.createElement("thead")).appendChild(header);
      const body = document.createElement("tbody");
      filtered.forEach((loop) => {
        const row = document.createElement("tr");
        row.tabIndex = 0;
        row.className = `functional-loop-row ${loop.classification}`;
        row.setAttribute("role", "button");
        row.setAttribute("aria-label", t("functionalLoops.focusLoop", { id: loop.id }));
        const focus = () => onFocusLoop(loop);
        row.addEventListener("click", focus);
        row.addEventListener("keydown", (evt) => {
          if (evt.key === "Enter" || evt.key === " ") {
            evt.preventDefault();
            focus();
          }
        });
        appendCell(row, loop.id, "functional-loop-id");
        appendCell(row, loop.nodeNames.join(" → "));
        appendCell(row, edgeDescription(loop));
        appendCell(row, String(loop.length));
        appendCell(row, loop.sign > 0 ? "+1" : (loop.sign < 0 ? "−1" : "0"));
        appendCell(row, `${loop.classification === "reinforcing" ? "R" : (loop.classification === "balancing" ? "B" : "N")} · ${classificationText(loop.classification)}`);
        body.appendChild(row);
      });
      table.appendChild(body);
      wrap.appendChild(table);
      section.appendChild(wrap);
    }

    function signedInfluenceText(node) {
      const values = node.signedInfluence || [];
      if (!values.length) return t("functionalLoops.influence.none");
      return values.map((entry) => {
        const name = result.graph.nodeById.get(entry.nodeId)?.name || entry.nodeId;
        const conflict = entry.conflict ? ` · ${t("functionalLoops.influence.conflict")}` : "";
        return `${name}: +${entry.positive} −${entry.negative} ?${entry.indeterminate}${conflict}`;
      }).join("\n");
    }

    function renderNodeTable(section) {
      section.appendChild(createElement("h4", "", t("functionalLoops.variables.title")));
      const wrap = createElement("div", "functional-loop-table-wrap");
      const table = createElement("table", "functional-loop-table functional-loop-node-table");
      const header = document.createElement("tr");
      ["functionalLoops.table.variable", "functionalLoops.table.loops", "functionalLoops.table.reinforcing", "functionalLoops.table.balancing", "functionalLoops.table.indeterminate", "functionalLoops.table.averageLength", "functionalLoops.table.loopIds", "functionalLoops.table.outDegree", "functionalLoops.table.reachable", "functionalLoops.table.canReach", "functionalLoops.table.betweenness", "functionalLoops.table.influence"].forEach((key) => appendHead(header, key));
      table.appendChild(document.createElement("thead")).appendChild(header);
      const body = document.createElement("tbody");
      result.nodes.forEach((node) => {
        const row = document.createElement("tr");
        row.tabIndex = 0;
        row.setAttribute("role", "button");
        row.setAttribute("aria-label", t("functionalLoops.focusNode", { name: node.name }));
        const focus = () => onFocusNode(node);
        row.addEventListener("click", focus);
        row.addEventListener("keydown", (evt) => {
          if (evt.key === "Enter" || evt.key === " ") {
            evt.preventDefault();
            focus();
          }
        });
        appendCell(row, node.name, "functional-loop-node-name");
        appendCell(row, String(node.totalLoops));
        appendCell(row, String(node.reinforcingLoops));
        appendCell(row, String(node.balancingLoops));
        appendCell(row, String(node.indeterminateLoops));
        appendCell(row, node.averageLoopLength ? node.averageLoopLength.toFixed(1) : "—");
        appendCell(row, node.loopIds.length ? node.loopIds.join(", ") : "—");
        appendCell(row, String(node.outDegree));
        appendCell(row, String(node.reachableCount));
        appendCell(row, String(node.canReachCount));
        appendCell(row, node.betweenness == null ? t("functionalLoops.betweenness.skipped") : node.betweenness.toFixed(2));
        const influenceCell = appendCell(row, "", "functional-loop-influence");
        const details = document.createElement("details");
        const detailsTitle = document.createElement("summary");
        detailsTitle.textContent = t("functionalLoops.influence.details");
        const pre = createElement("pre", "", signedInfluenceText(node));
        details.append(detailsTitle, pre);
        influenceCell.appendChild(details);
        body.appendChild(row);
      });
      table.appendChild(body);
      wrap.appendChild(table);
      section.appendChild(wrap);
    }

    function renderLeverage(section) {
      section.appendChild(createElement("h4", "", t("functionalLoops.leverage.title")));
      section.appendChild(createElement("p", "functional-loop-help", t("functionalLoops.leverage.help")));
      const list = createElement("ol", "functional-loop-leverage-list");
      result.leverage.slice(0, 10).forEach((node) => {
        const item = document.createElement("li");
        const button = createElement("button", "functional-loop-leverage-button", `${node.name} — ${node.leverageScore.toFixed(2)}`);
        button.type = "button";
        button.addEventListener("click", () => onFocusNode(node));
        item.appendChild(button);
        item.appendChild(document.createTextNode(` (${t("functionalLoops.leverage.detail", { loops: node.totalLoops, reachable: node.reachableCount, canReach: node.canReachCount })})`));
        list.appendChild(item);
      });
      section.appendChild(list);
    }

    function render() {
      renderValidation();
      renderSummary();
      if (!content) return;
      content.innerHTML = "";
      if (!result) {
        content.appendChild(createElement("div", "functional-loop-empty", t("functionalLoops.empty")));
        return;
      }
      const loops = createElement("section", "functional-loop-section");
      renderLoopTable(loops);
      content.appendChild(loops);
      const variables = createElement("section", "functional-loop-section");
      renderNodeTable(variables);
      content.appendChild(variables);
      const leverage = createElement("section", "functional-loop-section");
      renderLeverage(leverage);
      content.appendChild(leverage);
    }

    function execute() {
      const maxCycles = intValue(maxCyclesInput, 500, 1, 5000);
      const maxDepth = intValue(maxDepthInput, 4, 1, 12);
      if (maxCyclesInput) maxCyclesInput.value = String(maxCycles);
      if (maxDepthInput) maxDepthInput.value = String(maxDepth);
      result = runAnalysis({ maxCycles, maxDepth });
      filter = "all";
      render();
      if (result) {
        setStatusKey("status.functionalLoopsComplete", { count: result.counts.loops }, result.validation.emptyGraph ? "warning" : "info");
      }
      return result;
    }

    function openFunctionalLoopDiagram() {
      if (!modal) return;
      modal.classList.remove("hidden");
      execute();
    }

    function closeFunctionalLoopDiagram() {
      modal?.classList.add("hidden");
    }

    function exportResults() {
      if (!result) return;
      onExport(result);
    }

    return {
      closeFunctionalLoopDiagram,
      execute,
      exportResults,
      getResult: () => result,
      openFunctionalLoopDiagram,
      render,
    };
  }

  return { createFunctionalLoopUiHelpers };
});
