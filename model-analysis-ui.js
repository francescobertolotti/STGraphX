/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 * Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.
 */

(function initModelAnalysisUiModule(globalScope, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }
  globalScope.STGraphXModelAnalysisUi = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function createModelAnalysisUiExports() {
  function createModelAnalysisUiHelpers(options = {}) {
    const t = typeof options.t === "function" ? options.t : (key) => key;
    const modelAnalysisModal = options.modelAnalysisModal || null;
    const modelAnalysisSummary = options.modelAnalysisSummary || null;
    const modelAnalysisContent = options.modelAnalysisContent || null;
    const modelAnalysisChecksModal = options.modelAnalysisChecksModal || null;
    const modelAnalysisChecksContent = options.modelAnalysisChecksContent || null;
    const analyzeModelStaticIssues = typeof options.analyzeModelStaticIssues === "function"
      ? options.analyzeModelStaticIssues
      : () => [];
    const setStatusKey = typeof options.setStatusKey === "function" ? options.setStatusKey : () => {};
    const onFocusIssueTarget = typeof options.onFocusIssueTarget === "function" ? options.onFocusIssueTarget : () => {};

    function modelAnalysisCheckEntries() {
      return [
        { severity: "error", nameKey: "analysis.issue.invalidTimeConfig", descKey: "analysis.checks.invalidTimeConfig" },
        { severity: "warning", nameKey: "analysis.issue.invalidDelay", descKey: "analysis.checks.invalidDelay" },
        { severity: "error", nameKey: "analysis.issue.danglingEdge", descKey: "analysis.checks.danglingEdge" },
        { severity: "warning", nameKey: "analysis.issue.duplicateEdge", descKey: "analysis.checks.duplicateEdge" },
        { severity: "warning", nameKey: "analysis.issue.selfLoop", descKey: "analysis.checks.selfLoop" },
        { severity: "error", nameKey: "analysis.issue.algebraicCycle", descKey: "analysis.checks.algebraicCycle" },
        { severity: "error", nameKey: "analysis.issue.initialDefinitionCycle", descKey: "analysis.checks.initialDefinitionCycle" },
        { severity: "warning", nameKey: "analysis.issue.missingIncomingEdge", descKey: "analysis.checks.missingIncomingEdge" },
        { severity: "warning", nameKey: "analysis.issue.unusedEdge", descKey: "analysis.checks.unusedEdge" },
        { severity: "info", nameKey: "analysis.issue.unusedNode", descKey: "analysis.checks.unusedNode" },
        { severity: "error", nameKey: "analysis.issue.invalidSubmodelBinding", descKey: "analysis.checks.invalidSubmodelBinding" },
        { severity: "warning", nameKey: "analysis.issue.unknownSubmodelBinding", descKey: "analysis.checks.unknownSubmodelBinding" },
        { severity: "warning", nameKey: "analysis.issue.widgetNoSource", descKey: "analysis.checks.widgetNoSource" },
        { severity: "error", nameKey: "analysis.issue.widgetMissingSource", descKey: "analysis.checks.widgetMissingSource" },
        { severity: "warning", nameKey: "analysis.issue.widgetSourceNotOutput", descKey: "analysis.checks.widgetSourceNotOutput" },
        { severity: "error", nameKey: "analysis.issue.widgetSourceNotBindable", descKey: "analysis.checks.widgetSourceNotBindable" },
        { severity: "warning", nameKey: "analysis.issue.tableNoColumns", descKey: "analysis.checks.tableNoColumns" },
        { severity: "error", nameKey: "analysis.issue.tableMissingColumn", descKey: "analysis.checks.tableMissingColumn" },
        { severity: "warning", nameKey: "analysis.issue.tableColumnNotOutput", descKey: "analysis.checks.tableColumnNotOutput" },
        { severity: "warning", nameKey: "analysis.issue.chartNoPairs", descKey: "analysis.checks.chartNoPairs" },
        { severity: "error", nameKey: "analysis.issue.chartMissingSeriesSource", descKey: "analysis.checks.chartMissingSeriesSource" },
        { severity: "warning", nameKey: "analysis.issue.chartSeriesNotOutput", descKey: "analysis.checks.chartSeriesNotOutput" },
        { severity: "warning", nameKey: "analysis.issue.stateShapeMismatch", descKey: "analysis.checks.stateShapeMismatch" },
      ];
    }

    function renderModelAnalysisChecksHelp() {
      if (!modelAnalysisChecksContent) {
        return;
      }
      modelAnalysisChecksContent.innerHTML = "";
      const groups = new Map();
      modelAnalysisCheckEntries().forEach((entry) => {
        if (!groups.has(entry.severity)) {
          groups.set(entry.severity, []);
        }
        groups.get(entry.severity).push(entry);
      });
      ["error", "warning", "info"].forEach((severity) => {
        const entries = groups.get(severity) || [];
        if (!entries.length) {
          return;
        }
        const section = document.createElement("section");
        section.className = "model-analysis-checks-group";
        const title = document.createElement("h4");
        title.className = "model-analysis-checks-group-title";
        title.textContent = t(`analysis.section.${severity}`);
        section.appendChild(title);
        entries.forEach((entry) => {
          const item = document.createElement("div");
          item.className = `model-analysis-check-item ${severity}`;
          const badge = document.createElement("span");
          badge.className = "model-analysis-check-badge";
          badge.textContent = t(`analysis.badge.${severity}`);
          const text = document.createElement("div");
          text.className = "model-analysis-check-text";
          const name = document.createElement("div");
          name.className = "model-analysis-check-name";
          name.textContent = t(entry.nameKey, {
            reason: "…",
            from: "A",
            to: "B",
            name: "X",
            target: "B",
            source: "A",
            input: "in1",
            path: "A -> B -> C",
            current: "vettore",
            next: "matrice",
          });
          const desc = document.createElement("div");
          desc.className = "model-analysis-check-desc";
          desc.textContent = t(entry.descKey);
          text.appendChild(name);
          text.appendChild(desc);
          item.appendChild(badge);
          item.appendChild(text);
          section.appendChild(item);
        });
        modelAnalysisChecksContent.appendChild(section);
      });
    }

    function openModelAnalysisChecksHelp() {
      if (!modelAnalysisChecksModal) {
        return;
      }
      renderModelAnalysisChecksHelp();
      modelAnalysisChecksModal.classList.remove("hidden");
    }

    function closeModelAnalysisChecksHelp() {
      if (!modelAnalysisChecksModal) {
        return;
      }
      modelAnalysisChecksModal.classList.add("hidden");
    }

    function analysisIssueTargetLabel(issue) {
      const target = issue?.target;
      if (!target) {
        return "";
      }
      if (target.type === "node") {
        return t("analysis.target.node", { name: target.name || "?" });
      }
      if (target.type === "edge") {
        return t("analysis.target.edge", { name: target.name || "?" });
      }
      if (target.type === "widget") {
        return t("analysis.target.widget", { name: target.name || "?" });
      }
      return t("analysis.target.model");
    }

    function renderModelAnalysisReport(issues) {
      if (!modelAnalysisSummary || !modelAnalysisContent) {
        return;
      }
      const safeIssues = Array.isArray(issues) ? issues : [];
      const counts = {
        total: safeIssues.length,
        error: safeIssues.filter((issue) => issue.severity === "error").length,
        warning: safeIssues.filter((issue) => issue.severity === "warning").length,
        info: safeIssues.filter((issue) => issue.severity === "info").length,
      };

      modelAnalysisSummary.innerHTML = "";
      [
        ["total", t("analysis.summary.total", { count: counts.total })],
        ["error", t("analysis.summary.errors", { count: counts.error })],
        ["warning", t("analysis.summary.warnings", { count: counts.warning })],
        ["info", t("analysis.summary.info", { count: counts.info })],
      ].forEach(([kind, text]) => {
        const pill = document.createElement("div");
        pill.className = `model-analysis-pill ${kind}`;
        pill.textContent = text;
        modelAnalysisSummary.appendChild(pill);
      });

      modelAnalysisContent.innerHTML = "";
      if (safeIssues.length === 0) {
        const empty = document.createElement("div");
        empty.className = "model-analysis-empty";
        empty.textContent = t("analysis.empty");
        modelAnalysisContent.appendChild(empty);
        return;
      }

      ["error", "warning", "info"].forEach((severity) => {
        const items = safeIssues.filter((issue) => issue.severity === severity);
        if (items.length === 0) {
          return;
        }
        const section = document.createElement("section");
        section.className = "model-analysis-section";
        const title = document.createElement("h4");
        title.className = "model-analysis-section-title";
        title.textContent = t(`analysis.section.${severity}`);
        section.appendChild(title);
        const list = document.createElement("div");
        list.className = "model-analysis-list";
        items.forEach((issue) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = `model-analysis-item ${severity}`;
          const badge = document.createElement("span");
          badge.className = "model-analysis-badge";
          badge.textContent = t(`analysis.badge.${severity}`);
          const message = document.createElement("div");
          message.className = "model-analysis-message";
          message.textContent = issue.message;
          const target = document.createElement("div");
          target.className = "model-analysis-target";
          target.textContent = analysisIssueTargetLabel(issue);
          button.appendChild(badge);
          button.appendChild(message);
          button.appendChild(target);
          button.addEventListener("click", () => {
            onFocusIssueTarget(issue);
          });
          list.appendChild(button);
        });
        section.appendChild(list);
        modelAnalysisContent.appendChild(section);
      });
    }

    function openModelAnalysis() {
      if (!modelAnalysisModal) {
        return;
      }
      const issues = analyzeModelStaticIssues();
      renderModelAnalysisReport(issues);
      modelAnalysisModal.classList.remove("hidden");
      const errors = issues.filter((issue) => issue.severity === "error").length;
      const warnings = issues.filter((issue) => issue.severity === "warning").length;
      setStatusKey("status.modelAnalyzed", {
        count: issues.length,
        errors,
        warnings,
      }, errors > 0 ? "error" : (warnings > 0 ? "warning" : "info"));
    }

    function closeModelAnalysis() {
      if (!modelAnalysisModal) {
        return;
      }
      modelAnalysisModal.classList.add("hidden");
    }

    return {
      analysisIssueTargetLabel,
      closeModelAnalysis,
      closeModelAnalysisChecksHelp,
      modelAnalysisCheckEntries,
      openModelAnalysis,
      openModelAnalysisChecksHelp,
      renderModelAnalysisChecksHelp,
      renderModelAnalysisReport,
    };
  }

  return {
    createModelAnalysisUiHelpers,
  };
});
