/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 * Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.
 */

const svg = document.getElementById("graphCanvas");
const graphViewport = document.getElementById("graphViewport");
const sidebar = document.getElementById("sidebar");
const statusText = document.getElementById("statusText");
const fileStatusText = document.getElementById("fileStatusText");
const menuTimeText = document.getElementById("menuTimeText");
const topMenuBar = document.getElementById("topMenuBar");
const workspaceTabBar = document.getElementById("workspaceTabBar");
const newTabBtn = document.getElementById("newTabBtn");
const sidebarCollapseBtn = document.getElementById("sidebarCollapseBtn");
const sidebarExpandBtn = document.getElementById("sidebarExpandBtn");
const tabletSidebarToggle = document.getElementById("tabletSidebarToggle");
const tabletQuickbar = document.getElementById("tabletQuickbar");
const tabletFitBtn = document.getElementById("tabletFitBtn");
const tabletModeBtn = document.getElementById("tabletModeBtn");
const tabletRunBtn = document.getElementById("tabletRunBtn");
const tabletStepBtn = document.getElementById("tabletStepBtn");
const tabletTimedBtn = document.getElementById("tabletTimedBtn");
const tabletResetBtn = document.getElementById("tabletResetBtn");
const tabletSidebarBackdrop = document.getElementById("tabletSidebarBackdrop");
const tabletSidebarHeader = document.getElementById("tabletSidebarHeader");
const tabletSidebarExpandBtn = document.getElementById("tabletSidebarExpandBtn");
const tabletSidebarCloseBtn = document.getElementById("tabletSidebarCloseBtn");
const menuRoots = Array.from(document.querySelectorAll(".menu-root"));
const menuTitles = Array.from(document.querySelectorAll(".menu-title"));
const menuCommands = Array.from(document.querySelectorAll(".menu-command"));
const addRectNodeItem = document.getElementById("addRectNodeItem");
const addEllipseNodeItem = document.getElementById("addEllipseNodeItem");
const addDiamondNodeItem = document.getElementById("addDiamondNodeItem");
const addSubmodelNodeItem = document.getElementById("addSubmodelNodeItem");
const addTextItem = document.getElementById("addTextItem");
const addButtonWidgetItem = document.getElementById("addButtonWidgetItem");
const addSelectWidgetItem = document.getElementById("addSelectWidgetItem");
const addSliderWidgetItem = document.getElementById("addSliderWidgetItem");
const addLedWidgetItem = document.getElementById("addLedWidgetItem");
const addTextWidgetItem = document.getElementById("addTextWidgetItem");
const addMatrixWidgetItem = document.getElementById("addMatrixWidgetItem");
const addTableWidgetItem = document.getElementById("addTableWidgetItem");
const addXYChartWidgetItem = document.getElementById("addXYChartWidgetItem");
const addBarPlotWidgetItem = document.getElementById("addBarPlotWidgetItem");
const qualitativeGraphBuilderItem = document.getElementById("qualitativeGraphBuilderItem");
const fitContentItem = document.getElementById("fitContentItem");
const zoomInItem = document.getElementById("zoomInItem");
const zoomOutItem = document.getElementById("zoomOutItem");
const zoomResetItem = document.getElementById("zoomResetItem");
const toggleGraphItem = document.getElementById("toggleGraphItem");
const toggleWidgetsItem = document.getElementById("toggleWidgetsItem");
const viewOptionsItem = document.getElementById("viewOptionsItem");
const toggleGraphBtn = document.getElementById("toggleGraphBtn");
const toggleWidgetsBtn = document.getElementById("toggleWidgetsBtn");
const runEvalBtn = document.getElementById("runEvalBtn");
const runStepBtn = document.getElementById("runStepBtn");
const runTimedToggleBtn = document.getElementById("runTimedToggleBtn");
const runResetBtn = document.getElementById("runResetBtn");
const functionalLoopDiagramBtn = document.getElementById("functionalLoopDiagramBtn");
const analyzeModelBtn = document.getElementById("analyzeModelBtn");
const watchDebuggerBtn = document.getElementById("watchDebuggerBtn");
const topRunEvalBtn = document.getElementById("topRunEvalBtn");
const topRunStepBtn = document.getElementById("topRunStepBtn");
const topRunTimedBtn = document.getElementById("topRunTimedBtn");
const topRunResetBtn = document.getElementById("topRunResetBtn");
const selectAllBtn = document.getElementById("selectAllBtn");
const cutBtn = document.getElementById("cutBtn");
const copyBtn = document.getElementById("copyBtn");
const pasteBtn = document.getElementById("pasteBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const deleteBtn = document.getElementById("deleteBtn");
const deleteBtnLabel = deleteBtn?.querySelector("[data-i18n='menu.edit.delete']") || deleteBtn?.querySelector("span");
const newGraphBtn = document.getElementById("newGraphBtn");
const saveJsonBtn = document.getElementById("saveJsonBtn");
const saveAsJsonBtn = document.getElementById("saveAsJsonBtn");
const closeModelBtn = document.getElementById("closeModelBtn");
const exportCsvBtn = document.getElementById("exportCsvBtn");
const manageDataLinksBtn = document.getElementById("manageDataLinksBtn");
const loadJsonBtn = document.getElementById("loadJsonBtn");
const recentModelsMenuRoot = document.getElementById("recentModelsMenuRoot");
const recentModelsSep = document.getElementById("recentModelsSep");
const recentModelsSection = document.getElementById("recentModelsSection");
const clearRecentModelsBtn = document.getElementById("clearRecentModelsBtn");
const recentModelsMenuBtn = document.getElementById("recentModelsMenuBtn");
const loadJsonInput = document.getElementById("loadJsonInput");
const snapToGridInput = document.getElementById("snapToGridInput");
const showGridInput = document.getElementById("showGridInput");
const highlightNodeEdgesInput = document.getElementById("highlightNodeEdgesInput");
const showNodeValuesInput = document.getElementById("showNodeValuesInput");
const showEdgeValuesInput = document.getElementById("showEdgeValuesInput");
const gridSizeInput = document.getElementById("gridSizeInput");
const tooltipDelayInput = document.getElementById("tooltipDelayInput");
const interfaceLanguageInput = document.getElementById("interfaceLanguageInput");
const interfaceThemeInput = document.getElementById("interfaceThemeInput");
const minimalistNightModeInput = document.getElementById("minimalistNightModeInput");
const minimalistNightModeRow = document.getElementById("minimalistNightModeRow");
const strictDefinitionsInput = document.getElementById("strictDefinitionsInput");

const noSelection = document.getElementById("noSelection");
const globalPanel = document.getElementById("globalPanel");
const nodePanel = document.getElementById("nodePanel");
const edgePanel = document.getElementById("edgePanel");
const widgetPanel = document.getElementById("widgetPanel");
const widgetPanelTitle = document.getElementById("widgetPanelTitle");
const modelTitleInput = document.getElementById("modelTitleInput");
const timeStartInput = document.getElementById("timeStartInput");
const timeStepInput = document.getElementById("timeStepInput");
const timeEndInput = document.getElementById("timeEndInput");
const timeDelayInput = document.getElementById("timeDelayInput");
const renderEveryStepsInput = document.getElementById("renderEveryStepsInput");
const decimalDigitsInput = document.getElementById("decimalDigitsInput");
const integratorInput = document.getElementById("integratorInput");
const timeCurrentOutput = document.getElementById("timeCurrentOutput");
const modelPropsList = document.getElementById("modelPropsList");
const addModelPropBtn = document.getElementById("addModelPropBtn");
const editLocalFunctionsBtn = document.getElementById("editLocalFunctionsBtn");
const zoomRangeInput = document.getElementById("zoomRangeInput");
const zoomRangeValue = document.getElementById("zoomRangeValue");
const runFullModelBtn = document.getElementById("runFullModelBtn");
const manualStepBtn = document.getElementById("manualStepBtn");
const timedToggleBtn = document.getElementById("timedToggleBtn");
const resetExecBtn = document.getElementById("resetExecBtn");

const nodeNameInput = document.getElementById("nodeNameInput");
const nodeShapeInput = document.getElementById("nodeShapeInput");
const nodeInputInput = document.getElementById("nodeInputInput");
const nodeInputLabel = nodeInputInput?.closest("label");
const nodeOutputInput = document.getElementById("nodeOutputInput");
const nodeGlobalInput = document.getElementById("nodeGlobalInput");
const nodeGlobalLabel = nodeGlobalInput?.closest("label");
const nodeValueExprLabel = document.getElementById("nodeValueExprLabel");
const nodeValueExprRow = document.getElementById("nodeValueExprRow");
const nodeValueExprInput = document.getElementById("nodeValueExprInput");
const editNodeValueExprBtn = document.getElementById("editNodeValueExprBtn");
const nodeValueExprStatus = document.getElementById("nodeValueExprStatus");
const nodeWidgetBindingInfo = document.getElementById("nodeWidgetBindingInfo");
const nodeModelPathLabel = document.getElementById("nodeModelPathLabel");
const nodeModelPathInput = document.getElementById("nodeModelPathInput");
const submodelActionRow = document.getElementById("submodelActionRow");
const loadSubmodelBtn = document.getElementById("loadSubmodelBtn");
const showSubmodelBtn = document.getElementById("showSubmodelBtn");
const nodeSubmodelInfo = document.getElementById("nodeSubmodelInfo");
const nodeSubmodelBindings = document.getElementById("nodeSubmodelBindings");
const nodeInitialStateLabel = document.getElementById("nodeInitialStateLabel");
const nodeInitialStateRow = document.getElementById("nodeInitialStateRow");
const nodeInitialStateInput = document.getElementById("nodeInitialStateInput");
const nodeInitialStateStatus = document.getElementById("nodeInitialStateStatus");
const nodeValueOutput = document.getElementById("nodeValueOutput");
const nodeNameLabel = document.querySelector('label[for="nodeNameInput"]');
const nodeValueOutputLabel = document.querySelector('label[for="nodeValueOutput"]');
const nodeFillColorInput = document.getElementById("nodeFillColorInput");
const nodeStrokeColorInput = document.getElementById("nodeStrokeColorInput");
const resetNodeColorsBtn = document.getElementById("resetNodeColorsBtn");
const propsList = document.getElementById("propsList");
const addPropBtn = document.getElementById("addPropBtn");
const nodeIdentitySection = nodeNameInput?.closest(".panel-section");
const nodeFormulaSection = nodeModelPathInput?.closest(".panel-section");
const nodeValueSection = nodeValueOutput?.closest(".panel-section");
const nodeColorSection = nodeFillColorInput?.closest(".panel-section");
const nodePropsSection = propsList?.closest(".panel-section");
const nodePropsTitle = nodePropsSection?.querySelector("h4");

const edgeInfo = document.getElementById("edgeInfo");
const textPanel = document.getElementById("textPanel");
const textWidthInput = document.getElementById("textWidthInput");
const textHeightInput = document.getElementById("textHeightInput");
const textFillColorInput = document.getElementById("textFillColorInput");
const textStrokeColorInput = document.getElementById("textStrokeColorInput");
const textHtmlInput = document.getElementById("textHtmlInput");
const textEditorModal = document.getElementById("textEditorModal");
const textEditorCard = textEditorModal?.querySelector(".text-editor-card");
const textEditorInput = document.getElementById("textEditorInput");
const textEditorToolbar = document.getElementById("textEditorToolbar");
const textEditorCloseBtn = document.getElementById("textEditorCloseBtn");
const textEditorDismissBtn = document.getElementById("textEditorDismissBtn");
const widgetConfig = document.getElementById("widgetConfig");
const contextMenu = document.getElementById("contextMenu");
const canvasContent = document.getElementById("canvasContent");
const widgetLayer = document.getElementById("widgetLayer");
const expressionEditorModal = document.getElementById("expressionEditorModal");
const expressionEditorTitle = document.getElementById("expressionEditorTitle");
const expressionEditorViewTabs = document.getElementById("expressionEditorViewTabs");
const expressionEditorViewEditorBtn = document.getElementById("expressionEditorViewEditorBtn");
const expressionEditorViewNotesBtn = document.getElementById("expressionEditorViewNotesBtn");
const expressionEditorViewHelpBtn = document.getElementById("expressionEditorViewHelpBtn");
const expressionStateInitialBlock = document.getElementById("expressionStateInitialBlock");
const expressionStateInitialHighlight = document.getElementById("expressionStateInitialHighlight");
const expressionStateInitialInput = document.getElementById("expressionStateInitialInput");
const expressionStateInitialStatus = document.getElementById("expressionStateInitialStatus");
const expressionStateTransitionHead = document.getElementById("expressionStateTransitionHead");
const expressionStateTransitionLabel = document.getElementById("expressionStateTransitionLabel");
const expressionStateTransitionStatus = document.getElementById("expressionStateTransitionStatus");
const expressionEditorTextarea = document.getElementById("expressionEditorTextarea");
const expressionNodeOptions = document.getElementById("expressionNodeOptions");
const expressionNodeNameInput = document.getElementById("expressionNodeName");
const expressionNodeShapeInput = document.getElementById("expressionNodeShape");
const expressionNodeInputInput = document.getElementById("expressionNodeInput");
const expressionNodeInputLabel = document.getElementById("expressionNodeInputLabel");
const expressionNodeOutputInput = document.getElementById("expressionNodeOutput");
const expressionNodeOutputLabel = document.getElementById("expressionNodeOutputLabel");
const expressionNodeGlobalInput = document.getElementById("expressionNodeGlobal");
const expressionNodeGlobalLabel = document.getElementById("expressionNodeGlobalLabel");
const expressionEditorHighlight = document.getElementById("expressionEditorHighlight");
const expressionEditorSurface = document.querySelector(".expression-editor-surface");
const expressionEditorCard = expressionEditorModal?.querySelector(".expression-editor-card");
const expressionEditorMain = expressionEditorModal?.querySelector(".expression-editor-main");
const expressionEditorCore = document.getElementById("expressionEditorCore");
const expressionMainDocs = document.getElementById("expressionMainDocs");
const expressionSymbolsFilter = document.getElementById("expressionSymbolsFilter");
const expressionSidebar = document.getElementById("expressionSidebar");
const expressionHelp = document.getElementById("expressionHelp");
const expressionHelpCopyBtn = document.getElementById("expressionHelpCopyBtn");
const expressionPreviewBox = document.getElementById("expressionPreviewBox");
const expressionPreviewLabel = document.getElementById("expressionPreviewLabel");
const expressionPreviewValue = document.getElementById("expressionPreviewValue");
const expressionDescriptionBox = document.getElementById("expressionDescriptionBox");
const expressionDescriptionInput = document.getElementById("expressionDescriptionInput");
const expressionFormulaNotesBox = document.getElementById("expressionFormulaNotesBox");
const expressionFormulaNotesInput = document.getElementById("expressionFormulaNotesInput");
const expressionLibrary = document.getElementById("expressionLibrary");
const expressionEditorHint = document.getElementById("expressionEditorHint");
const expressionWidgetBindingInfo = document.getElementById("expressionWidgetBindingInfo");
const expressionEditorStatus = document.getElementById("expressionEditorStatus");
const expressionStatusCopyBtn = document.getElementById("expressionStatusCopyBtn");
const expressionEditorCloseBtn = document.getElementById("expressionEditorCloseBtn");
const expressionEditorCancelBtn = document.getElementById("expressionEditorCancelBtn");
const expressionEditorApplyBtn = document.getElementById("expressionEditorApplyBtn");
const expressionEditorResizeHandle = document.getElementById("expressionEditorResizeHandle");
const functionsHelpBtn = document.getElementById("functionsHelpBtn");
const eightTupleBtn = document.getElementById("eightTupleBtn");
const examplesHelpBtn = document.getElementById("examplesHelpBtn");
const aboutAppBtn = document.getElementById("aboutAppBtn");
const functionsHelpModal = document.getElementById("functionsHelpModal");
const functionsHelpCloseBtn = document.getElementById("functionsHelpCloseBtn");
const functionsHelpDismissBtn = document.getElementById("functionsHelpDismissBtn");
const functionsHelpContent = document.getElementById("functionsHelpContent");
const functionsHelpSearch = document.getElementById("functionsHelpSearch");
const functionsHelpTypeFilter = document.getElementById("functionsHelpTypeFilter");
const dataLinksModal = document.getElementById("dataLinksModal");
const dataLinksCloseBtn = document.getElementById("dataLinksCloseBtn");
const dataLinksDismissBtn = document.getElementById("dataLinksDismissBtn");
const dataLinksList = document.getElementById("dataLinksList");
const addLinkedDataBtn = document.getElementById("addLinkedDataBtn");
const qualitativeGraphWizardModal = document.getElementById("qualitativeGraphWizardModal");
const qualitativeGraphCloseBtn = document.getElementById("qualitativeGraphCloseBtn");
const qualitativeGraphSteps = document.getElementById("qualitativeGraphSteps");
const qualitativeGraphContent = document.getElementById("qualitativeGraphContent");
const qualitativeGraphBackBtn = document.getElementById("qualitativeGraphBackBtn");
const qualitativeGraphCancelBtn = document.getElementById("qualitativeGraphCancelBtn");
const qualitativeGraphNextBtn = document.getElementById("qualitativeGraphNextBtn");
const eightTupleModal = document.getElementById("eightTupleModal");
const eightTupleCloseBtn = document.getElementById("eightTupleCloseBtn");
const eightTupleDismissBtn = document.getElementById("eightTupleDismissBtn");
const eightTupleCopyBtn = document.getElementById("eightTupleCopyBtn");
const eightTupleExportBtn = document.getElementById("eightTupleExportBtn");
const eightTupleContent = document.getElementById("eightTupleContent");
const examplesHelpModal = document.getElementById("examplesHelpModal");
const examplesHelpCloseBtn = document.getElementById("examplesHelpCloseBtn");
const examplesHelpDismissBtn = document.getElementById("examplesHelpDismissBtn");
const examplesHelpTitle = document.getElementById("examplesHelpTitle");
const examplesHelpIntro = document.getElementById("examplesHelpIntro");
const examplesHelpContent = document.getElementById("examplesHelpContent");
const aboutAppModal = document.getElementById("aboutAppModal");
const aboutAppCloseBtn = document.getElementById("aboutAppCloseBtn");
const aboutAppDismissBtn = document.getElementById("aboutAppDismissBtn");
const aboutAppVersionValue = document.getElementById("aboutAppVersionValue");
const aboutAppAuthorValue = document.getElementById("aboutAppAuthorValue");
const aboutAppLicenseValue = document.getElementById("aboutAppLicenseValue");
const aboutAppCopyrightValue = document.getElementById("aboutAppCopyrightValue");
const modelAnalysisModal = document.getElementById("modelAnalysisModal");
const modelAnalysisCloseBtn = document.getElementById("modelAnalysisCloseBtn");
const modelAnalysisDismissBtn = document.getElementById("modelAnalysisDismissBtn");
const modelAnalysisChecksBtn = document.getElementById("modelAnalysisChecksBtn");
const modelAnalysisSummary = document.getElementById("modelAnalysisSummary");
const modelAnalysisContent = document.getElementById("modelAnalysisContent");
const modelAnalysisChecksModal = document.getElementById("modelAnalysisChecksModal");
const modelAnalysisChecksCloseBtn = document.getElementById("modelAnalysisChecksCloseBtn");
const modelAnalysisChecksDismissBtn = document.getElementById("modelAnalysisChecksDismissBtn");
const modelAnalysisChecksContent = document.getElementById("modelAnalysisChecksContent");
const functionalLoopModal = document.getElementById("functionalLoopModal");
const functionalLoopCloseBtn = document.getElementById("functionalLoopCloseBtn");
const functionalLoopDismissBtn = document.getElementById("functionalLoopDismissBtn");
const functionalLoopRunBtn = document.getElementById("functionalLoopRunBtn");
const functionalLoopExportBtn = document.getElementById("functionalLoopExportBtn");
const functionalLoopMaxCyclesInput = document.getElementById("functionalLoopMaxCyclesInput");
const functionalLoopMaxDepthInput = document.getElementById("functionalLoopMaxDepthInput");
const functionalLoopValidation = document.getElementById("functionalLoopValidation");
const functionalLoopSummary = document.getElementById("functionalLoopSummary");
const functionalLoopContent = document.getElementById("functionalLoopContent");
const watchDebuggerModal = document.getElementById("watchDebuggerModal");
const watchDebuggerCloseBtn = document.getElementById("watchDebuggerCloseBtn");
const watchDebuggerDismissBtn = document.getElementById("watchDebuggerDismissBtn");
const watchDebuggerSummary = document.getElementById("watchDebuggerSummary");
const watchAddSelectedBtn = document.getElementById("watchAddSelectedBtn");
const watchBreakpointEnabledInput = document.getElementById("watchBreakpointEnabledInput");
const watchBreakpointInput = document.getElementById("watchBreakpointInput");
const watchBreakpointStatus = document.getElementById("watchBreakpointStatus");
const watchDebuggerList = document.getElementById("watchDebuggerList");
const localFunctionsModal = document.getElementById("localFunctionsModal");
const localFunctionsCloseBtn = document.getElementById("localFunctionsCloseBtn");
const localFunctionsCancelBtn = document.getElementById("localFunctionsCancelBtn");
const localFunctionsApplyBtn = document.getElementById("localFunctionsApplyBtn");
const localFunctionsAddBtn = document.getElementById("localFunctionsAddBtn");
const localFunctionsList = document.getElementById("localFunctionsList");
const localFunctionsStatus = document.getElementById("localFunctionsStatus");
const managePresentationGroupsItem = document.getElementById("managePresentationGroupsItem");
const manageDashboardItem = document.getElementById("manageDashboardItem");
const presentationGroupsModal = document.getElementById("presentationGroupsModal");
const presentationGroupsCloseBtn = document.getElementById("presentationGroupsCloseBtn");
const presentationGroupsDismissBtn = document.getElementById("presentationGroupsDismissBtn");
const viewOptionsModal = document.getElementById("viewOptionsModal");
const viewOptionsCloseBtn = document.getElementById("viewOptionsCloseBtn");
const viewOptionsDismissBtn = document.getElementById("viewOptionsDismissBtn");
const dashboardRenameModal = document.getElementById("dashboardRenameModal");
const dashboardRenameInput = document.getElementById("dashboardRenameInput");
const dashboardRenameCloseBtn = document.getElementById("dashboardRenameCloseBtn");
const dashboardRenameCancelBtn = document.getElementById("dashboardRenameCancelBtn");
const dashboardRenameApplyBtn = document.getElementById("dashboardRenameApplyBtn");
const presentationGroupNameInput = document.getElementById("presentationGroupNameInput");
const presentationGroupCreateBtn = document.getElementById("presentationGroupCreateBtn");
const presentationGroupsStatus = document.getElementById("presentationGroupsStatus");
const presentationGroupsList = document.getElementById("presentationGroupsList");
const expressionEditorSwitchModal = document.getElementById("expressionEditorSwitchModal");
const expressionEditorSwitchCloseBtn = document.getElementById("expressionEditorSwitchCloseBtn");
const expressionEditorSwitchCancelBtn = document.getElementById("expressionEditorSwitchCancelBtn");
const expressionEditorSwitchDiscardBtn = document.getElementById("expressionEditorSwitchDiscardBtn");
const expressionEditorSwitchApplyBtn = document.getElementById("expressionEditorSwitchApplyBtn");
const appTooltip = document.getElementById("appTooltip");

window.__stgraphxBootError = null;
window.addEventListener("error", (event) => {
  const message = event?.error?.stack || event?.message || "Unknown error";
  window.__stgraphxBootError = String(message);
  if (statusText && !statusText.textContent) {
    statusText.textContent = String(message);
  }
});
window.addEventListener("unhandledrejection", (event) => {
  const reason = event?.reason?.stack || event?.reason?.message || event?.reason || "Unhandled promise rejection";
  window.__stgraphxBootError = String(reason);
  if (statusText && !statusText.textContent) {
    statusText.textContent = String(reason);
  }
});

const {
  addCanvasText,
  addLedWidget,
  addButtonWidget,
  addSelectWidget,
  addTextWidget,
  addSliderWidget,
  addMatrixWidget,
  addTableWidget,
  addXYChartWidget,
  addBarPlotWidget,
  getNodeByName,
  getModelNodeById,
  buildNodeNameMap,
  defaultChartSeriesColor,
  normalizeChartPointMode,
  normalizeChartSeriesToggle,
  normalizeChartLineStyle,
  applyWidgetDrivenNodeValues,
  applyRuntimeModelInputOverrides,
  updateTableWidgetsFromComputedValues,
  updateXYWidgetsFromComputedValues,
  clearAllXYChartPoints,
  clearAllTableWidgetRows,
  refreshRuntimeView,
  refreshWidgetFrame,
  startEdgeCreateFromNode,
  startEdgeCreateFromMouse,
  updateEdgeCreateFromClient,
  finishEdgeCreateFromClient,
  addControlPointAt,
  removeControlPoint,
  removeSelected,
  nodeIdAtGraphPoint,
  openBackgroundContextMenu,
  openNodeContextMenu,
  openTextContextMenu,
  openEdgeContextMenu,
  marqueeRect,
  nodesInRect,
  normalizeNodeDescriptionProperty,
  getNodeDescription,
  normalizeNodeFormulaNotesProperty,
  getNodeFormulaNotes,
  buildNodeTooltipText,
  canvasTextDisplayHtml,
  wrapTextSelection,
  insertTextHtmlSnippet,
  renderPropertiesEditor,
  renderWidgets,
  refreshWidgetConfigPanel,
  copyTextToClipboard,
} = globalThis.Widgets || {};

const SVG_NS = "http://www.w3.org/2000/svg";
const MAX_HISTORY = 100;
const BASE_CANVAS_WIDTH = 1200;
const BASE_CANVAS_HEIGHT = 800;
const MIN_GRAPH_WIDTH = BASE_CANVAS_WIDTH / 2;
const MIN_GRAPH_HEIGHT = BASE_CANVAS_HEIGHT / 2;
const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3;
const SUPPORTED_LANGS = new Set(["it", "en"]);
const CHART_SERIES_PALETTE = ["#0e7ac4", "#e67e22", "#27ae60", "#8e44ad", "#c0392b", "#16a085"];
const RECENT_MODELS_STORAGE_KEY = "stgraphx.recentModels.v1";
const MODEL_CLIPBOARD_STORAGE_KEY = "stgraphx.modelClipboard.v1";
const UI_THEME_STORAGE_KEY = "dsgraph.uiTheme.v1";
const UI_MINIMALIST_NIGHT_MODE_STORAGE_KEY = "dsgraph.minimalistNightMode.v1";
const MODEL_CLIPBOARD_PREFIX = "STGraphX clipboard v1\n";
const MAX_RECENT_MODELS = 8;
const SUBMODEL_DEFERRED_RESOLUTION = "__submodel_deferred_resolution__";
const NODE_FILL_COLOR_PRESETS = [
  { key: "default", value: "" },
  { key: "blue", value: "#dff2ff" },
  { key: "green", value: "#dff6ec" },
  { key: "yellow", value: "#fff7d8" },
  { key: "orange", value: "#ffe8d6" },
  { key: "red", value: "#ffe1e6" },
  { key: "violet", value: "#eee3ff" },
  { key: "gray", value: "#eef2f6" },
];

const NODE_STROKE_COLOR_PRESETS = [
  { key: "default", value: "" },
  { key: "blue", value: "#156fb8" },
  { key: "green", value: "#1f8a5a" },
  { key: "yellow", value: "#b48710" },
  { key: "orange", value: "#c56416" },
  { key: "red", value: "#c43a52" },
  { key: "violet", value: "#6e49b8" },
  { key: "gray", value: "#586978" },
];

const TEXT_FILL_COLOR_PRESETS = [
  { key: "default", value: "" },
  { key: "blue", value: "#eef6ff" },
  { key: "green", value: "#edf9f2" },
  { key: "yellow", value: "#fff9e7" },
  { key: "orange", value: "#fff0e4" },
  { key: "red", value: "#fff0f2" },
  { key: "violet", value: "#f3eeff" },
  { key: "gray", value: "#f3f6f9" },
];

const TEXT_STROKE_COLOR_PRESETS = [
  { key: "default", value: "" },
  { key: "blue", value: "#2f78c4" },
  { key: "green", value: "#2d9564" },
  { key: "yellow", value: "#bc8c19" },
  { key: "orange", value: "#ca6a1d" },
  { key: "red", value: "#c44b61" },
  { key: "violet", value: "#7a58c1" },
  { key: "gray", value: "#6b7b8a" },
];

function normalizeTableColumnName(column) {
  if (typeof column === "string") {
    return column;
  }
  if (column && typeof column === "object") {
    if (typeof column.source === "string") {
      return column.source;
    }
    if (typeof column.name === "string") {
      return column.name;
    }
    if (typeof column.label === "string") {
      return column.label;
    }
  }
  return String(column ?? "");
}

function normalizeTableColumnOptions(options) {
  if (!options || typeof options !== "object") {
    return {};
  }
  return Object.fromEntries(Object.entries(options).map(([name, value]) => [String(name), {
    label: String(value?.label ?? "").trim(),
    align: ["left", "center", "right"].includes(String(value?.align ?? "")) ? String(value.align) : "",
    decimalDigits: Number.isInteger(Number(value?.decimalDigits)) && Number(value.decimalDigits) >= 0 && Number(value.decimalDigits) <= 12
      ? Number(value.decimalDigits)
      : null,
  }]));
}

const graphFunctionHelpers = globalThis.GraphFunctions?.helpers || {};
const recentModelsStore = globalThis.STGraphXRecentModels?.createRecentModelsStore({
  storageKey: RECENT_MODELS_STORAGE_KEY,
  maxEntries: MAX_RECENT_MODELS,
  getHandlePath: extractFileHandlePath,
  supportsPaths: supportsRecentModelPaths,
  createHandleFromPath(filePath) {
    const electronHandle = createElectronPathFileHandle(filePath);
    if (electronHandle) {
      return electronHandle;
    }
    const createHandle = window.STGraphXPlatform?.createFileHandleFromPath;
    return typeof createHandle === "function" ? createHandle(filePath) : null;
  },
  unnamedLabel: () => t("file.unnamed"),
});
const linkedDataHandleStore = globalThis.STGraphXRecentModels?.createIndexedDbHandleStore?.("dsgraph.linkedData.v1") || null;

if (!recentModelsStore) {
  throw new Error("STGraphX recent models helpers are unavailable");
}

const modelSessionHelpers = globalThis.STGraphXModelSession?.createModelSessionHelpers({
  deriveDirectoryHandleFromFileHandle,
  hasPlatformApi,
  getPlatform: () => window.STGraphXPlatform,
  normalizeSubmodelPath,
  basenameOfSubmodelPath,
  buildRuntimeModelFromData,
  showSaveFilePickerCompat,
  normalizeJsonFilename,
  normalizeCsvFilename,
});

if (!modelSessionHelpers) {
  throw new Error("STGraphX model session helpers are unavailable");
}

const modelPersistenceHelpers = globalThis.STGraphXModelPersistence?.createModelPersistenceHelpers();

if (!modelPersistenceHelpers) {
  throw new Error("STGraphX model persistence helpers are unavailable");
}

const modelLoadingHelpers = globalThis.STGraphXModelLoading?.createModelLoadingHelpers({
  deriveDirectoryHandleFromFileHandle,
  loadGraphFromJsonText,
  rememberRecentModel,
  preloadSubmodelsAfterLoad,
  maybeSelectModelDirectoryForSubmodels,
  prepareSelectedJsonEntries,
  resolveRecentModelHandle,
  resolveRecentModelDirectoryHandle,
  supportsOpenFilePicker,
  showOpenFilePickerCompat,
  notifyMissingRecentModelEntry,
  isLoadCancelledError: (err) => err && (err.name === "AbortError" || String(err.message || "") === t("error.loadCancelled")),
  beforeOpenInNewTab() {
    saveActiveWorkspaceTabState();
    const tabToReplace = currentWorkspaceTab();
    const replaceInitialEmptyTabId = isInitialEmptyWorkspaceTab(tabToReplace) ? tabToReplace.id : null;
    closeDocumentTransientUi();
    const previousActiveTabId = workspace.activeTabId;
    workspace.activeTabId = null;
    return { previousActiveTabId, replaceInitialEmptyTabId };
  },
  afterOpenInNewTab(checkpoint) {
    createWorkspaceTabFromCurrentState({ activate: true });
    if (checkpoint?.replaceInitialEmptyTabId != null) {
      workspace.tabs = workspace.tabs.filter((tab) => tab.id !== checkpoint.replaceInitialEmptyTabId);
    }
    refreshWorkspaceTabBar();
  },
  onOpenPreparedStart() {
    submodelTemplateCache.clear();
    submodelFileHandleCache.clear();
    submodelSourceCache.clear();
  },
  onOpenPreparedFailure(checkpoint) {
    workspace.activeTabId = checkpoint?.previousActiveTabId ?? workspace.activeTabId ?? null;
    refreshWorkspaceTabBar();
  },
});

if (!modelLoadingHelpers) {
  throw new Error("STGraphX model loading helpers are unavailable");
}

const submodelSupportHelpers = globalThis.STGraphXSubmodelSupport?.createSubmodelSupportHelpers({
  normalizeSubmodelPath,
  basenameOfSubmodelPath,
  parseSelectedJsonEntry,
  buildRuntimeModelFromData,
  descriptionPropertyKeys,
  supportsOpenFilePicker,
  showOpenFilePickerCompat,
  pickSubmodelFilesWithInput,
  getCurrentModelDirectoryHandle: () => currentModelDirectoryHandle,
  deriveDirectoryHandleFromCurrentFile: () => deriveDirectoryHandleFromFileHandle(currentFileHandle),
  setCurrentModelDirectoryHandle: (handle) => {
    currentModelDirectoryHandle = handle || null;
  },
  ensureCurrentModelDirectoryHandle,
  supportsDirectoryInputSelection,
  supportsDirectoryPicker,
  confirmSelectModelFolder: () => window.confirm(t("confirm.selectModelFolder")),
  onModelFolderSelected: () => setStatusKey("status.modelFolderSelected"),
  hasCachedSubmodel: (name) => Boolean(name && (submodelSourceCache.has(name) || submodelTemplateCache.has(name))),
  cacheSubmodel: (baseName, payload) => {
    submodelSourceCache.set(baseName, payload.text);
    if (payload.fileHandle) {
      submodelFileHandleCache.set(baseName, payload.fileHandle);
    }
    if (payload.template) {
      submodelTemplateCache.set(baseName, payload.template);
    }
  },
  invalidJsonMessage: () => t("error.invalidJson"),
});

if (!submodelSupportHelpers) {
  throw new Error("STGraphX submodel support helpers are unavailable");
}

const submodelResolutionHelpers = globalThis.STGraphXSubmodelResolution?.createSubmodelResolutionHelpers({
  normalizeSubmodelPath,
  basenameOfSubmodelPath,
  buildRuntimeModelFromData,
  extractSubmodelInterfaceFromData: (data) => submodelSupportHelpers.extractSubmodelInterfaceFromData(data),
  supportsDirectoryInputSelection,
  supportsDirectoryPicker,
  ensureCurrentModelDirectoryHandle,
  supportsOpenFilePicker,
  showOpenFilePickerCompat,
  pickSubmodelFileWithInput,
  t,
  getCurrentModelDirectoryHandle: () => currentModelDirectoryHandle,
  getCachedSubmodelHandle: (name) => submodelFileHandleCache.get(name),
  deleteCachedSubmodelHandle: (name) => submodelFileHandleCache.delete(name),
  getCachedSubmodelSource: (name) => submodelSourceCache.get(name),
  hasCachedSubmodelSource: (name) => submodelSourceCache.has(name),
  cacheResolvedSubmodel: (name, payload) => {
    submodelSourceCache.set(name, payload.text);
    if (payload.fileHandle) {
      submodelFileHandleCache.set(name, payload.fileHandle);
    }
  },
  hasSubmodelTemplate: (name) => submodelTemplateCache.has(name),
  getSubmodelTemplate: (name) => submodelTemplateCache.get(name),
  setSubmodelTemplate: (name, template) => submodelTemplateCache.set(name, template),
  isSubmodelNode,
  deferredResolutionToken: SUBMODEL_DEFERRED_RESOLUTION,
});

if (!submodelResolutionHelpers) {
  throw new Error("STGraphX submodel resolution helpers are unavailable");
}

function appendUniqueNames(target, names) {
  (names || []).forEach((name) => {
    const normalized = String(name ?? "").trim();
    if (normalized && !target.includes(normalized)) {
      target.push(normalized);
    }
  });
}

function declaredAgentFieldNamesForNode(node) {
  if (!node) {
    return [];
  }
  const out = [];
  appendUniqueNames(out, graphFunctionHelpers.getAgentFieldNames?.(node.computedValue));
  if (isStateNode(node)) {
    appendUniqueNames(out, semantics.extractAgentFieldNamesFromExpression?.(node.initialStateExpression));
  }
  appendUniqueNames(out, semantics.extractAgentFieldNamesFromExpression?.(node.valueExpression));
  return out;
}

function accessibleAgentFieldAliasNames(node, fieldKey = "value") {
  if (!node) {
    return [];
  }
  const out = [];
  appendUniqueNames(out, declaredAgentFieldNamesForNode(node));
  globalParameterNodesForModel(graph, node.id).forEach((depNode) => {
    appendUniqueNames(out, declaredAgentFieldNamesForNode(depNode));
  });
  graph.edges
    .filter((edge) => edge.to === node.id)
    .map((edge) => getNodeById(edge.from))
    .filter(Boolean)
    .filter((depNode) => fieldKey !== "initial" || !isSubmodelNode(depNode))
    .forEach((depNode) => {
      appendUniqueNames(out, declaredAgentFieldNamesForNode(depNode));
    });
  return out;
}

function accessibleAgentFieldAliasEntries(node, fieldKey = "value") {
  const seen = new Set();
  const out = [];
  const addFromNode = (sourceNode) => {
    declaredAgentFieldNamesForNode(sourceNode).forEach((name, index) => {
      if (seen.has(name)) {
        return;
      }
      seen.add(name);
      out.push({
        name,
        index,
        source: sourceNode?.name || "",
      });
    });
  };
  if (!node) {
    return out;
  }
  addFromNode(node);
  globalParameterNodesForModel(graph, node.id).forEach(addFromNode);
  graph.edges
    .filter((edge) => edge.to === node.id)
    .map((edge) => getNodeById(edge.from))
    .filter(Boolean)
    .filter((depNode) => fieldKey !== "initial" || !isSubmodelNode(depNode))
    .forEach(addFromNode);
  return out;
}

function parseAutoNullableNumber(value) {
  if (value == null) {
    return null;
  }
  if (typeof value === "string") {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed || trimmed === "auto") {
      return null;
    }
  }
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function serializeAutoNullableNumber(value) {
  if (value == null) {
    return "auto";
  }
  if (typeof value === "string") {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed || trimmed === "auto") {
      return "auto";
    }
  }
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : "auto";
}

function serializeModelClipboardPayload(payload) {
  return `${MODEL_CLIPBOARD_PREFIX}${JSON.stringify({
    type: "stgraphx-model-clipboard",
    version: 1,
    payload,
  })}`;
}

function parseModelClipboardPayload(raw) {
  const text = String(raw ?? "");
  if (!text.startsWith(MODEL_CLIPBOARD_PREFIX)) {
    return null;
  }
  try {
    const parsed = JSON.parse(text.slice(MODEL_CLIPBOARD_PREFIX.length));
    const payload = parsed?.payload;
    if (
      parsed?.type !== "stgraphx-model-clipboard"
      || parsed?.version !== 1
      || !payload
      || !Array.isArray(payload.nodes)
      || !Array.isArray(payload.edges)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function persistSharedModelClipboard(raw) {
  try {
    window.localStorage.setItem(MODEL_CLIPBOARD_STORAGE_KEY, raw);
  } catch {}
  try {
    void Promise.resolve(globalThis.STGraphXPlatform?.writeClipboardText?.(raw)).catch(() => {});
  } catch {}
}

function readStoredModelClipboardRaw() {
  try {
    const stored = window.localStorage.getItem(MODEL_CLIPBOARD_STORAGE_KEY);
    if (parseModelClipboardPayload(stored)) {
      return String(stored);
    }
  } catch {}
  return "";
}

async function readSharedModelClipboardRaw() {
  try {
    const platformText = await Promise.resolve(globalThis.STGraphXPlatform?.readClipboardText?.());
    if (parseModelClipboardPayload(platformText)) {
      return String(platformText);
    }
  } catch {}
  return readStoredModelClipboardRaw();
}

async function syncClipboardFromSharedSource() {
  const raw = await readSharedModelClipboardRaw();
  if (!raw) {
    return false;
  }
  if (raw === clipboard.signature && clipboard.data) {
    return true;
  }
  const payload = parseModelClipboardPayload(raw);
  if (!payload || !Array.isArray(payload.nodes) || payload.nodes.length === 0) {
    return false;
  }
  clipboard.data = deepClone(payload);
  clipboard.pasteCount = 0;
  clipboard.signature = raw;
  return true;
}

let nodeCounter = 1;
let edgeCounter = 1;
let widgetCounter = 1;
let textItemCounter = 1;
let presentationGroupCounter = 1;
let currentLang = "en";
let i18n = {};
let lastSavedSnapshot = "";
let currentFileHandle = null;
let currentFileName = "";
let currentModelDirectoryHandle = null;
const workspace = {
  tabs: [],
  activeTabId: null,
  nextTabId: 1,
};
const submodelTemplateCache = new Map();
const submodelFileHandleCache = new Map();
const submodelSourceCache = new Map();
const linkedReadDataFileHandles = new Map();
const READ_DATA_CALL_PATTERN = /\breadData\s*\(/;
const READ_DATA_LITERAL_CALL_PATTERN = /\breadData\s*\(\s*(['"])((?:\\.|(?!\1).)*)\1\s*\)/g;
function descriptionPropertyKey() {
  return currentLang === "it" ? "descrizione" : "description";
}

function descriptionPropertyKeys() {
  return new Set(["descrizione", "description"]);
}

function formulaNotesPropertyKey() {
  return currentLang === "it" ? "note formula" : "formula notes";
}

function formulaNotesPropertyKeys() {
  return new Set(["note formula", "formula notes"]);
}

function commitDebugConfigChange(mutator) {
  const beforeState = exportGraphData();
  mutator();
  sanitizeDebugConfig(graph);
  const afterState = exportGraphData();
  if (JSON.stringify(beforeState) !== JSON.stringify(afterState)) {
    pushUndoState(beforeState);
    history.redo = [];
    dirtySinceLastSave = true;
    updateFileStatusLabel(true);
    updateHistoryButtons();
  }
  render();
}

let dirtySinceLastSave = false;
let fileStatusRefreshTimer = null;

const graph = {
  modelTitle: "",
  properties: [],
  localFunctions: [],
  externalData: [],
  nodes: [],
  edges: [],
  textItems: [],
  widgets: [],
  presentationGroups: [],
  dashboard: null,
  debug: {
    watches: [],
    breakpointEnabled: false,
    breakpointExpression: "",
  },
  __simulationHistory: [],
  __directoryPath: "",
  __readDataCache: Object.create(null),
  execution: {
    t0: 0,
    dt: 1,
    t1: 10,
    delayMs: 100,
    renderEverySteps: 1,
    decimals: 3,
    integrator: "euler",
    strictDefinitions: true,
    currentTime: null,
  },
};

const qualitativeGraphWizard = {
  step: 1,
  variables: [""],
  matrix: [],
  stateNames: new Set(),
  inputNames: new Set(),
  parameterNames: new Set(),
};

const ui = {
  selected: null,
  selectedNodes: new Set(),
  selectedControlPoint: null,
  lastControlPointTap: null,
  drag: null,
  resize: null,
  edgeCreate: null,
  edgeCreateHoverId: null,
  edgeCreateLastPoint: null,
  controlPointDrag: null,
  edgeLabelDrag: null,
  edgeLabelRotate: null,
  marquee: null,
  snapToGrid: true,
  showGrid: false,
  highlightNodeEdges: false,
  showNodeValues: false,
  showEdgeValues: false,
  gridSize: 20,
  tooltipDelayMs: 300,
  visualTheme: "legacy",
  minimalistNightMode: false,
  zoom: 1,
  nodeNameEditStart: null,
  timedRunHandle: null,
  timedStepRunning: false,
  timedRunStartedAt: 0,
  timedStepLastActivityAt: 0,
  submodelsPrepared: false,
  widgetDrag: null,
  widgetResize: null,
  dashboardDrag: null,
  dashboardResize: null,
  dashboardTabClickTimer: null,
  dashboardTabClickPageId: null,
  dashboardDropState: null,
  dashboardRenamePageId: null,
  sliderInteraction: null,
  showGraph: true,
  showWidgets: true,
  expressionEditor: null,
  expressionEditorView: "editor",
  modalDrag: null,
  modalResize: null,
  tooltipTarget: null,
  tooltipPointer: null,
  tooltipShowTimer: null,
  tooltipHideTimer: null,
  executionPlan: null,
  activeChartPairByWidgetId: new Map(),
  sidebarNodeId: null,
  lastNodeActivate: null,
  lastTextActivate: null,
  textDrag: null,
  textResize: null,
  expressionPreviewTimer: null,
  expressionEditorPendingSelectionAction: null,
  expressionPreviewInitCache: null,
  analysisFocus: null,
  functionalLoopFocus: null,
  watchPreviousSnapshot: new Map(),
  breakpointLastResult: null,
  localFunctionsEditor: null,
  sidebarCollapsed: false,
  tabletSidebarOpen: false,
  tabletSidebarExpanded: false,
  tabletSidebarDrag: null,
  tabletCanvasMode: "edit",
  touchViewportGesture: null,
  touchHold: null,
  lastMenuTouchAt: 0,
};

const submodelOrchestrationHelpers = globalThis.STGraphXSubmodelOrchestration?.createSubmodelOrchestrationHelpers({
  graph,
  ui,
  t,
  isSubmodelNode,
  normalizeSubmodelPath,
  loadSubmodelTemplateByPath,
  loadSubmodelInterfaceByPath,
  resolveSubmodelFileByPath,
  isDeferredSubmodelResolutionError,
  getNodeDescription,
  emptySubmodelInterfaceCache,
  normalizeSubmodelInterfaceCache,
  sanitizeSubmodelBindings,
  sanitizeAllEdgesForNode,
  refreshSidebar,
  render,
  setStatusKey,
  invalidateExecutionPlan,
  scheduleFileStatusRefresh,
  deriveDirectoryHandleFromFileHandle,
  loadGraphFromJsonText,
  preloadSubmodelsAfterLoadRef: () => preloadSubmodelsAfterLoad(),
  beforeOpenSubmodelInNewTab() {
    const previousActiveTabId = workspace.activeTabId;
    saveActiveWorkspaceTabState();
    closeDocumentTransientUi();
    workspace.activeTabId = null;
    return { previousActiveTabId };
  },
  afterOpenSubmodelInNewTab(node, checkpoint) {
    createWorkspaceTabFromCurrentState({
      activate: true,
      meta: {
        kind: "submodel",
        parentTabId: checkpoint?.previousActiveTabId ?? null,
        parentNodeName: String(node?.name || ""),
        parentTitle: checkpoint?.previousActiveTabId != null
          ? displayFileNameFromContext(getWorkspaceTabById(checkpoint.previousActiveTabId)?.state?.context)
          : "",
      },
    });
    refreshWorkspaceTabBar();
  },
  onOpenSubmodelInNewTabFailure(checkpoint) {
    workspace.activeTabId = workspace.activeTabId || checkpoint?.previousActiveTabId || null;
    refreshWorkspaceTabBar();
  },
});

if (!submodelOrchestrationHelpers) {
  throw new Error("STGraphX submodel orchestration helpers are unavailable");
}

const helpContentHelpers = globalThis.STGraphXHelpContent?.createHelpContentHelpers({
  t,
  hasPlatformApi,
  getCurrentLang: () => currentLang,
  openPreparedJsonEntryInNewTab,
  setStatus,
  setStatusKey,
  closeTopMenus,
  normalizeJsonFilename,
  copyTextToClipboard,
  supportsSaveFilePicker,
  showSaveFilePickerCompat,
  writeTextToFileHandle,
  getGraph: () => graph,
  getCurrentFileName: () => currentFileName,
  getCurrentModelTitle: () => graph?.modelTitle || "",
  getNodeDescription,
  isStateNode,
  isAlgebraicNode,
  isSubmodelNode,
  examplesHelpModal,
  examplesHelpTitle,
  examplesHelpIntro,
  examplesHelpContent,
  eightTupleModal,
  eightTupleContent,
  eightTupleCopyBtn,
  eightTupleExportBtn,
  aboutAppModal,
  aboutAppVersionValue,
  aboutAppAuthorValue,
  aboutAppLicenseValue,
  aboutAppCopyrightValue,
});

if (!helpContentHelpers) {
  throw new Error("STGraphX help content helpers are unavailable");
}

const modelAnalysisUiHelpers = globalThis.STGraphXModelAnalysisUi?.createModelAnalysisUiHelpers({
  t,
  modelAnalysisModal,
  modelAnalysisSummary,
  modelAnalysisContent,
  modelAnalysisChecksModal,
  modelAnalysisChecksContent,
  analyzeModelStaticIssues,
  setStatusKey,
  onFocusIssueTarget: focusAnalysisIssueTarget,
});

if (!modelAnalysisUiHelpers) {
  throw new Error("STGraphX model analysis UI helpers are unavailable");
}

const watchDebuggerUiHelpers = globalThis.STGraphXWatchDebuggerUi?.createWatchDebuggerUiHelpers({
  t,
  watchDebuggerModal,
  watchDebuggerSummary,
  watchBreakpointEnabledInput,
  watchBreakpointInput,
  watchBreakpointStatus,
  watchAddSelectedBtn,
  watchDebuggerList,
  isEditingUiLocked,
  getDebugConfig: () => sanitizeDebugConfig(graph),
  getSelectedWatchableNode: () => selectedWatchableNode(),
  validateBreakpointExpressionText,
  getBreakpointExpressionSource: () => breakpointExpressionSource(),
  getBreakpointLastResult: () => ui.breakpointLastResult,
  formatNumberValue,
  showExpressionStatus,
  hideExpressionStatus,
  localizeExpressionErrorMessage,
  formatErrorReason: evalReasonText,
  summarizeValue: summarizeExpressionPreviewValue,
  getWatchEntries: () => {
    const debug = sanitizeDebugConfig(graph);
    return debug.watches
      .map((name) => {
        const node = getNodeByName(name);
        if (!node) {
          return null;
        }
        const previous = ui.watchPreviousSnapshot instanceof Map ? ui.watchPreviousSnapshot.get(name) : null;
        return {
          name,
          currentValue: node.computedValue,
          currentError: node.computedError,
          previousSummary: previous?.summary ?? "—",
          isState: isStateNode(node),
          nextValue: node.pendingStateValue,
          nextError: node.pendingStateError,
        };
      })
      .filter(Boolean);
  },
  onRemoveWatch: (name) => {
    commitDebugConfigChange(() => {
      ensureDebugConfig(graph).watches = ensureDebugConfig(graph).watches.filter((entry) => entry !== name);
    });
    watchDebuggerUiHelpers.renderWatchDebugger();
  },
});

if (!watchDebuggerUiHelpers) {
  throw new Error("STGraphX watch debugger UI helpers are unavailable");
}

const history = {
  undo: [],
  redo: [],
  transactionStart: null,
};

const clipboard = {
  data: null,
  pasteCount: 0,
  signature: "",
};

const defs = document.createElementNS(SVG_NS, "defs");
function createArrowMarker(id, color) {
  const marker = document.createElementNS(SVG_NS, "marker");
  marker.setAttribute("id", id);
  marker.setAttribute("viewBox", "0 0 10 10");
  marker.setAttribute("refX", "9");
  marker.setAttribute("refY", "5");
  marker.setAttribute("markerWidth", "8");
  marker.setAttribute("markerHeight", "8");
  marker.setAttribute("orient", "auto-start-reverse");
  const arrowPath = document.createElementNS(SVG_NS, "path");
  arrowPath.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
  arrowPath.setAttribute("fill", color);
  marker.appendChild(arrowPath);
  defs.appendChild(marker);
}
createArrowMarker("arrow", "#3b4e61");
createArrowMarker("arrow-selected", "#2563eb");
createArrowMarker("arrow-incoming", "#d17b16");
createArrowMarker("arrow-outgoing", "#0d8c8c");
createArrowMarker("arrow-both", "#8b5fbf");
svg.appendChild(defs);

const edgesLayer = document.createElementNS(SVG_NS, "g");
const presentationGroupsLayer = document.createElementNS(SVG_NS, "g");
const dashboardLayer = document.createElementNS(SVG_NS, "g");
const previewLayer = document.createElementNS(SVG_NS, "g");
const marqueeLayer = document.createElementNS(SVG_NS, "g");
const nodesLayer = document.createElementNS(SVG_NS, "g");
const textLayer = document.createElementNS(SVG_NS, "g");
const controlsLayer = document.createElementNS(SVG_NS, "g");
svg.appendChild(edgesLayer);
svg.insertBefore(presentationGroupsLayer, edgesLayer);
svg.appendChild(previewLayer);
svg.appendChild(nodesLayer);
svg.appendChild(dashboardLayer);
svg.appendChild(textLayer);
svg.appendChild(controlsLayer);
svg.appendChild(marqueeLayer);
const semantics = window.GraphSemantics;

const runtimeShared = globalThis.STGraphXRuntimeShared?.createRuntimeShared({
  getCurrentLang: () => currentLang,
});

if (!runtimeShared) {
  throw new Error("STGraphX runtime shared helpers are unavailable");
}

function clamp(val, min, max) {
  return runtimeShared.clamp(val, min, max);
}

function svgPoint(evt) {
  const pt = svg.createSVGPoint();
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function svgPointFromClient(clientX, clientY) {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function worldDeltaFromClientDelta(deltaClientX, deltaClientY) {
  const vb = svg.viewBox.baseVal;
  const width = Math.max(1, svg.clientWidth || Math.round((vb?.width || BASE_CANVAS_WIDTH) * ui.zoom));
  const height = Math.max(1, svg.clientHeight || Math.round((vb?.height || BASE_CANVAS_HEIGHT) * ui.zoom));
  const scaleX = (vb?.width || BASE_CANVAS_WIDTH) / width;
  const scaleY = (vb?.height || BASE_CANVAS_HEIGHT) / height;
  return {
    x: deltaClientX * scaleX,
    y: deltaClientY * scaleY,
  };
}

function isTypingTarget(target = document.activeElement) {
  if (!target || !(target instanceof HTMLElement)) {
    return false;
  }
  if (target.isContentEditable) {
    return true;
  }
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

function snap(value) {
  if (!ui.snapToGrid) {
    return value;
  }
  return Math.round(value / ui.gridSize) * ui.gridSize;
}

function snapPoint(p) {
  return { x: snap(p.x), y: snap(p.y) };
}

function updateCanvasGridAppearance() {
  if (!canvasContent || !svg) {
    return;
  }
  const vb = svg.viewBox?.baseVal;
  const viewX = Number(vb?.x) || 0;
  const viewY = Number(vb?.y) || 0;
  const stepPx = Math.max(1, ui.gridSize * ui.zoom);
  const offsetX = -((viewX * ui.zoom) % stepPx);
  const offsetY = -((viewY * ui.zoom) % stepPx);
  canvasContent.style.setProperty("--canvas-grid-step", `${stepPx}px`);
  canvasContent.style.setProperty("--canvas-grid-offset-x", `${offsetX}px`);
  canvasContent.style.setProperty("--canvas-grid-offset-y", `${offsetY}px`);
  canvasContent.classList.toggle("grid-hidden", !ui.showGrid);
  if (showGridInput) {
    showGridInput.checked = ui.showGrid;
  }
  if (highlightNodeEdgesInput) {
    highlightNodeEdgesInput.checked = ui.highlightNodeEdges === true;
  }
  if (showNodeValuesInput) {
    showNodeValuesInput.checked = ui.showNodeValues === true;
  }
  if (showEdgeValuesInput) {
    showEdgeValuesInput.checked = ui.showEdgeValues === true;
  }
  if (gridSizeInput && document.activeElement !== gridSizeInput) {
    gridSizeInput.value = String(ui.gridSize);
  }
  if (tooltipDelayInput && document.activeElement !== tooltipDelayInput) {
    tooltipDelayInput.value = String(normalizeTooltipDelayMs(ui.tooltipDelayMs));
  }
}

function deepClone(obj) {
  return runtimeShared.deepClone(obj);
}

function normalizeColorString(value) {
  return /^#[0-9a-fA-F]{6}$/.test(String(value ?? "")) ? String(value) : "";
}

function defaultNodeFillColor() {
  return "#fcfdff";
}

function defaultNodeStrokeColor() {
  return "#2f4a62";
}

function sanitizeNodeVisualOptions(node) {
  node.fillColor = normalizeColorString(node.fillColor);
  node.strokeColor = normalizeColorString(node.strokeColor);
}

function populateNodeColorSelect(selectEl, presets) {
  if (!selectEl) {
    return;
  }
  const currentValue = String(selectEl.value ?? "");
  selectEl.innerHTML = "";
  presets.forEach((preset) => {
    const opt = document.createElement("option");
    opt.value = preset.value;
    opt.textContent = t(`color.${preset.key}`);
    selectEl.appendChild(opt);
  });
  selectEl.value = presets.some((preset) => preset.value === currentValue) ? currentValue : "";
}

function sanitizeTextItem(item) {
  item.html = String(item?.html ?? "");
  item.x = Number.isFinite(Number(item?.x)) ? Number(item.x) : 120;
  item.y = Number.isFinite(Number(item?.y)) ? Number(item.y) : 120;
  item.width = clamp(Number(item?.width) || 220, 40, 1200);
  item.height = clamp(Number(item?.height) || 80, 24, 1200);
  item.fillColor = normalizeColorString(item?.fillColor);
  item.strokeColor = normalizeColorString(item?.strokeColor);
  item.dashboardPageId = normalizeDashboardPageId(item?.dashboardPageId);
}

function sanitizeRichTextHtml(rawHtml) {
  const template = document.createElement("template");
  template.innerHTML = String(rawHtml ?? "");
  const allowedTags = new Set([
    "B", "STRONG", "I", "EM", "U", "BR",
    "P", "DIV", "SPAN",
    "H1", "H2", "H3", "H4", "H5", "H6",
    "UL", "OL", "LI", "SUP", "SUB",
  ]);
  const allowedStyles = new Set([
    "color",
    "background-color",
    "font-size",
    "font-weight",
    "font-style",
    "text-decoration",
    "text-align",
    "line-height",
  ]);

  const sanitizeStyle = (value) => {
    return String(value || "")
      .split(";")
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((chunk) => {
        const [prop, ...rest] = chunk.split(":");
        const key = String(prop || "").trim().toLowerCase();
        if (!allowedStyles.has(key)) {
          return "";
        }
        const val = rest.join(":").trim();
        return val ? `${key}: ${val}` : "";
      })
      .filter(Boolean)
      .join("; ");
  };

  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = child.tagName.toUpperCase();
        if (!allowedTags.has(tag)) {
          const fragment = document.createDocumentFragment();
          while (child.firstChild) {
            fragment.appendChild(child.firstChild);
          }
          child.replaceWith(fragment);
          walk(node);
          return;
        }
        [...child.attributes].forEach((attr) => {
          if (attr.name.toLowerCase() !== "style") {
            child.removeAttribute(attr.name);
          }
        });
        const style = sanitizeStyle(child.getAttribute("style"));
        if (style) {
          child.setAttribute("style", style);
        } else {
          child.removeAttribute("style");
        }
        walk(child);
      } else if (child.nodeType === Node.COMMENT_NODE) {
        child.remove();
      }
    });
  };

  walk(template.content);
  return template.innerHTML.trim();
}

function hasPlatformApi(name) {
  return typeof window.STGraphXPlatform?.[name] === "function";
}

function electronFileBridge() {
  const bridge = window.STGraphXElectronFiles;
  return bridge && typeof bridge === "object" ? bridge : null;
}

function nativePathName(filePath) {
  const normalized = String(filePath || "").replace(/\\/g, "/").replace(/\/+$/u, "");
  const slash = normalized.lastIndexOf("/");
  return slash >= 0 ? normalized.slice(slash + 1) : normalized;
}

function nativePathDirectory(filePath) {
  const normalized = String(filePath || "").replace(/\\/g, "/").replace(/\/+$/u, "");
  const slash = normalized.lastIndexOf("/");
  return slash >= 0 ? (normalized.slice(0, slash) || "/") : "";
}

function joinNativeRelativePath(directoryPath, relativePath) {
  const relative = String(relativePath || "").replace(/\\/g, "/").replace(/^\/+|\/+$/gu, "");
  if (!relative || relative.split("/").some((part) => !part || part === "." || part === "..")) {
    const err = new Error("Invalid relative model path");
    err.name = "NotFoundError";
    throw err;
  }
  return `${String(directoryPath || "").replace(/\/+$/u, "")}/${relative}`;
}

function createElectronPathDirectoryHandle(directoryPath) {
  const bridge = electronFileBridge();
  if (!bridge || !directoryPath) {
    return null;
  }
  return {
    kind: "directory",
    name: nativePathName(directoryPath),
    path: directoryPath,
    async getFileHandle(relativePath) {
      return createElectronPathFileHandle(joinNativeRelativePath(directoryPath, relativePath));
    },
  };
}

function createElectronPathFileHandle(filePath) {
  const bridge = electronFileBridge();
  const directoryPath = nativePathDirectory(filePath);
  if (!bridge || !filePath || typeof bridge.readTextFile !== "function") {
    return null;
  }
  return {
    kind: "file",
    name: nativePathName(filePath),
    path: filePath,
    async getPath() {
      return filePath;
    },
    async getParentDirectoryPath() {
      return directoryPath;
    },
    async getParentDirectoryHandle() {
      return createElectronPathDirectoryHandle(directoryPath);
    },
    async getFile() {
      return {
        name: nativePathName(filePath),
        path: filePath,
        text: () => bridge.readTextFile(filePath),
      };
    },
    async createWritable() {
      let buffer = "";
      return {
        async write(data) {
          buffer = typeof data === "string" ? data : String(data ?? "");
        },
        async close() {
          if (typeof bridge.writeTextFile !== "function") {
            throw new Error("Electron file write bridge unavailable");
          }
          await bridge.writeTextFile(filePath, buffer);
        },
      };
    },
  };
}

function widgetMinDimensions(widget) {
  switch (String(widget?.type || "")) {
    case "led":
      return { width: 120, height: 78 };
    case "button":
      return { width: 120, height: 76 };
    case "select":
      return { width: 120, height: 82 };
    case "slider":
      return { width: 220, height: 82 };
    case "text":
      return { width: 120, height: 82 };
    case "matrix":
      return { width: 180, height: 130 };
    case "table":
      return { width: 120, height: 96 };
    case "xychart":
    case "barplot":
      return { width: 244, height: 152 };
    default:
      return { width: 160, height: 84 };
  }
}

function supportsOpenFilePicker() {
  return typeof electronFileBridge()?.showOpenFilePaths === "function"
    || hasPlatformApi("showOpenFilePicker")
    || typeof window.showOpenFilePicker === "function";
}

function supportsSaveFilePicker() {
  return typeof electronFileBridge()?.showSaveFilePath === "function"
    || hasPlatformApi("showSaveFilePicker")
    || typeof window.showSaveFilePicker === "function";
}

function supportsDirectoryPicker() {
  return hasPlatformApi("showDirectoryPicker") || typeof window.showDirectoryPicker === "function";
}

async function showOpenFilePickerCompat(options) {
  const electronBridge = electronFileBridge();
  if (typeof electronBridge?.showOpenFilePaths === "function") {
    const paths = await electronBridge.showOpenFilePaths(options);
    return paths.map((filePath) => createElectronPathFileHandle(String(filePath))).filter(Boolean);
  }
  if (hasPlatformApi("showOpenFilePicker")) {
    return window.STGraphXPlatform.showOpenFilePicker(options);
  }
  if (typeof window.showOpenFilePicker === "function") {
    return window.showOpenFilePicker(options);
  }
  throw new Error("Open file picker not supported");
}

async function showSaveFilePickerCompat(options) {
  const electronBridge = electronFileBridge();
  if (typeof electronBridge?.showSaveFilePath === "function") {
    const filePath = await electronBridge.showSaveFilePath(options);
    if (!filePath) {
      const err = new Error("Aborted");
      err.name = "AbortError";
      throw err;
    }
    return createElectronPathFileHandle(filePath);
  }
  if (hasPlatformApi("showSaveFilePicker")) {
    return window.STGraphXPlatform.showSaveFilePicker(options);
  }
  if (typeof window.showSaveFilePicker === "function") {
    return window.showSaveFilePicker(options);
  }
  throw new Error("Save file picker not supported");
}

async function showDirectoryPickerCompat(options) {
  if (hasPlatformApi("showDirectoryPicker")) {
    return window.STGraphXPlatform.showDirectoryPicker(options);
  }
  if (typeof window.showDirectoryPicker === "function") {
    return window.showDirectoryPicker(options);
  }
  throw new Error(t("error.submodelDirectoryUnsupported"));
}

function bundledI18nMessages(lang) {
  const bundles = window.STGraphXI18nBundles || {};
  const fallback = bundles.en && typeof bundles.en === "object" ? bundles.en : null;
  const raw = bundles?.[lang];
  if (raw && typeof raw === "object") {
    return fallback && raw !== fallback ? { ...fallback, ...raw } : { ...raw };
  }
  return fallback ? { ...fallback } : null;
}

function normalizeSupportedLanguage(raw) {
  const value = String(raw ?? "").trim().toLowerCase();
  const base = value.split("-")[0];
  if (SUPPORTED_LANGS.has(value)) {
    return value;
  }
  if (SUPPORTED_LANGS.has(base)) {
    return base;
  }
  return "";
}

async function resolveLangFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const urlLanguage = normalizeSupportedLanguage(params.get("lang"));
  if (urlLanguage) {
    return urlLanguage;
  }
  try {
    const startupLanguage = await Promise.resolve(globalThis.STGraphXPlatform?.getStartupLanguage?.());
    const platformLanguage = normalizeSupportedLanguage(startupLanguage);
    if (platformLanguage) {
      return platformLanguage;
    }
  } catch {}
  return "en";
}

function fillTemplate(template, vars = {}) {
  return String(template).replace(/\{([a-zA-Z0-9_]+)\}/g, (_, name) => {
    if (Object.prototype.hasOwnProperty.call(vars, name)) {
      return String(vars[name]);
    }
    return `{${name}}`;
  });
}

function t(key, vars = null) {
  const value = i18n[key] ?? key;
  return vars ? fillTemplate(value, vars) : value;
}

function applicationWindowTitle() {
  const releaseDate = String(window.STGraphXAppMeta?.releaseDate ?? "").trim();
  return releaseDate ? `DSGraph ${releaseDate}` : "DSGraph";
}

function setTooltipText(el, text) {
  if (!el) {
    return;
  }
  const value = String(text ?? "").trim();
  const isSvgElement = typeof SVGElement !== "undefined" && el instanceof SVGElement;
  const existingSvgTitle = isSvgElement
    ? Array.from(el.children || []).find((child) => child.tagName?.toLowerCase?.() === "title" && child.getAttribute("data-generated-tooltip") === "1")
    : null;
  el.removeAttribute("title");
  if (existingSvgTitle) {
    existingSvgTitle.remove();
  }
  if (!value) {
    el.removeAttribute("data-tooltip");
    return;
  }
  el.setAttribute("data-tooltip", value);
}

function normalizeTooltipDelayMs(value) {
  const numeric = Math.round(Number(value));
  return [0, 150, 300, 600, 1000].includes(numeric) ? numeric : 300;
}

function normalizeVisualTheme(value) {
  return String(value ?? "").trim().toLowerCase() === "minimalist" ? "minimalist" : "legacy";
}

// Interface appearance is intentionally stored locally: opening a model must
// never change the visual preferences of the person viewing it.
function restoreVisualThemePreferences() {
  try {
    ui.visualTheme = normalizeVisualTheme(window.localStorage.getItem(UI_THEME_STORAGE_KEY));
    ui.minimalistNightMode = window.localStorage.getItem(UI_MINIMALIST_NIGHT_MODE_STORAGE_KEY) === "true";
  } catch {
    ui.visualTheme = "legacy";
    ui.minimalistNightMode = false;
  }
}

function persistVisualThemePreferences() {
  try {
    window.localStorage.setItem(UI_THEME_STORAGE_KEY, normalizeVisualTheme(ui.visualTheme));
    window.localStorage.setItem(UI_MINIMALIST_NIGHT_MODE_STORAGE_KEY, String(Boolean(ui.minimalistNightMode)));
  } catch {}
}

function syncVisualThemeControls() {
  const minimalistActive = normalizeVisualTheme(ui.visualTheme) === "minimalist";
  if (interfaceThemeInput) {
    interfaceThemeInput.value = minimalistActive ? "minimalist" : "legacy";
  }
  if (minimalistNightModeInput) {
    minimalistNightModeInput.checked = Boolean(ui.minimalistNightMode);
    minimalistNightModeInput.disabled = !minimalistActive;
  }
  if (minimalistNightModeRow) {
    minimalistNightModeRow.hidden = !minimalistActive;
  }
}

function applyVisualTheme() {
  const minimalistActive = normalizeVisualTheme(ui.visualTheme) === "minimalist";
  const nightModeActive = minimalistActive && Boolean(ui.minimalistNightMode);
  document.body.classList.toggle("ui-theme-minimalist", minimalistActive);
  document.body.classList.toggle("ui-minimalist-night", nightModeActive);
  document.documentElement.style.colorScheme = nightModeActive ? "dark" : "light";
  syncVisualThemeControls();
}

function cancelTooltipTimers() {
  if (ui.tooltipShowTimer != null) {
    window.clearTimeout(ui.tooltipShowTimer);
    ui.tooltipShowTimer = null;
  }
  if (ui.tooltipHideTimer != null) {
    window.clearTimeout(ui.tooltipHideTimer);
    ui.tooltipHideTimer = null;
  }
}

function activeTooltipTarget(target) {
  if (!target || !(target instanceof Element)) {
    return null;
  }
  return target.closest("[data-node-tooltip], [data-tooltip]");
}

function nodeTooltipTarget(target) {
  if (!target || !(target instanceof Element)) {
    return null;
  }
  return target.closest("[data-node-tooltip][data-node-id]");
}

function hideAppTooltip() {
  cancelTooltipTimers();
  if (!appTooltip) {
    return;
  }
  appTooltip.classList.add("hidden");
  appTooltip.setAttribute("aria-hidden", "true");
  ui.tooltipTarget = null;
  ui.tooltipPointer = null;
}

function scheduleHideAppTooltip(delay = 90) {
  if (!appTooltip) {
    return;
  }
  if (ui.tooltipHideTimer != null) {
    window.clearTimeout(ui.tooltipHideTimer);
  }
  ui.tooltipHideTimer = window.setTimeout(() => {
    ui.tooltipHideTimer = null;
    hideAppTooltip();
  }, delay);
}

function positionAppTooltip(clientX, clientY) {
  if (!appTooltip || appTooltip.classList.contains("hidden")) {
    return;
  }
  const margin = 12;
  const rect = appTooltip.getBoundingClientRect();
  let left = clientX + 14;
  let top = clientY + 18;
  if (left + rect.width > window.innerWidth - margin) {
    left = window.innerWidth - rect.width - margin;
  }
  if (top + rect.height > window.innerHeight - margin) {
    top = clientY - rect.height - 14;
  }
  if (left < margin) {
    left = margin;
  }
  if (top < margin) {
    top = margin;
  }
  appTooltip.style.left = `${Math.round(left)}px`;
  appTooltip.style.top = `${Math.round(top)}px`;
}

function showAppTooltip(target, clientX, clientY) {
  cancelTooltipTimers();
  if (!appTooltip || !target) {
    return;
  }
  const { text, tone } = tooltipInfoForTarget(target);
  if (!text) {
    hideAppTooltip();
    return;
  }
  applyTooltipState(text, tone);
  appTooltip.classList.remove("hidden");
  appTooltip.setAttribute("aria-hidden", "false");
  ui.tooltipTarget = target;
  ui.tooltipPointer = { x: clientX, y: clientY };
  positionAppTooltip(clientX, clientY);
}

function scheduleShowAppTooltip(target, clientX, clientY, delay = 280) {
  cancelTooltipTimers();
  if (!target) {
    return;
  }
  if (ui.tooltipDelayMs <= 0) {
    hideAppTooltip();
    return;
  }
  ui.tooltipShowTimer = window.setTimeout(() => {
    ui.tooltipShowTimer = null;
    showAppTooltip(target, clientX, clientY);
  }, normalizeTooltipDelayMs(delay));
}

function tooltipInfoForTarget(target) {
  if (!target) {
    return { text: "", tone: "" };
  }
  const nodeEl = nodeTooltipTarget(target);
  if (nodeEl) {
    const node = getNodeById(String(nodeEl.getAttribute("data-node-id") || ""));
    return buildNodeTooltipText(node);
  }
  return { text: String(target.dataset.tooltip || "").trim(), tone: "" };
}

function applyTooltipState(text, tone = "") {
  if (!appTooltip) {
    return;
  }
  appTooltip.textContent = text;
  appTooltip.classList.remove("value", "error");
  if (tone) {
    appTooltip.classList.add(tone);
  }
}

function showNodeTooltip(node, target, clientX, clientY) {
  cancelTooltipTimers();
  if (!appTooltip || !target || !node) {
    return;
  }
  const { text, tone } = buildNodeTooltipText(node);
  if (!text) {
    hideAppTooltip();
    return;
  }
  setTooltipText(target, text);
  applyTooltipState(text, tone);
  appTooltip.classList.remove("hidden");
  appTooltip.setAttribute("aria-hidden", "false");
  ui.tooltipTarget = target;
  ui.tooltipPointer = { x: clientX, y: clientY };
  positionAppTooltip(clientX, clientY);
}

function refreshNodeTooltipElement(target) {
  const nodeEl = nodeTooltipTarget(target);
  if (!nodeEl) {
    return;
  }
  const node = getNodeById(String(nodeEl.getAttribute("data-node-id") || ""));
  if (!node) {
    return;
  }
  setTooltipText(nodeEl, buildNodeTooltipText(node).text);
}

function refreshRenderedNodeTooltipElements() {
  const renderedNodes = document.querySelectorAll(".node[data-node-id]");
  renderedNodes.forEach((nodeEl) => {
    const node = getNodeById(String(nodeEl.getAttribute("data-node-id") || ""));
    if (!node) {
      return;
    }
    setTooltipText(nodeEl, buildNodeTooltipText(node).text);
  });
}

function refreshActiveTooltip() {
  if (!appTooltip || appTooltip.classList.contains("hidden") || !ui.tooltipTarget) {
    return;
  }
  const nodeId = nodeTooltipTarget(ui.tooltipTarget)?.getAttribute?.("data-node-id");
  let target = ui.tooltipTarget;
  if (nodeId) {
    target = document.querySelector(`.node[data-node-id="${CSS.escape(String(nodeId))}"]`) || target;
    ui.tooltipTarget = target;
  }
  refreshNodeTooltipElement(target);
  const { text, tone } = tooltipInfoForTarget(target);
  if (!text) {
    hideAppTooltip();
    return;
  }
  applyTooltipState(text, tone);
  const point = ui.tooltipPointer || { x: 24, y: 24 };
  positionAppTooltip(point.x, point.y);
}

function nodeExpressionTooltipKey(node) {
  if (!node) {
    return "tooltip.node.expressionBehavior";
  }
  if (node.shape === "diamond") {
    return "tooltip.node.expressionValue";
  }
  if (isStateNode(node)) {
    return "tooltip.node.expressionState";
  }
  return "tooltip.node.expressionBehavior";
}

function updateNodeExpressionTooltips(node = selectedNodeForSidebar()) {
  const key = nodeExpressionTooltipKey(node);
  const text = t(key);
  setTooltipText(nodeValueExprLabel, text);
  setTooltipText(nodeValueExprInput, text);
}

function hideExpressionStatus(statusEl) {
  if (!statusEl) {
    return;
  }
  statusEl.textContent = "";
  statusEl.classList.add("hidden");
  statusEl.classList.remove("ok", "error");
  if (statusEl === expressionEditorStatus && expressionStatusCopyBtn) {
    expressionStatusCopyBtn.classList.add("hidden");
  }
}

function showExpressionStatus(statusEl, syntaxResult, showOk = true) {
  if (!statusEl) {
    return;
  }
  if (!syntaxResult || syntaxResult.empty) {
    hideExpressionStatus(statusEl);
    return;
  }
  statusEl.classList.remove("hidden", "ok", "error");
  if (syntaxResult.ok) {
    if (!showOk) {
      hideExpressionStatus(statusEl);
      return;
    }
    statusEl.classList.add("ok");
    statusEl.textContent = t("expr.syntaxOk");
    if (statusEl === expressionEditorStatus && expressionStatusCopyBtn) {
      expressionStatusCopyBtn.classList.remove("hidden");
    }
    return;
  }
  statusEl.classList.add("error");
  statusEl.textContent = t("expr.syntaxError", {
    message: localizeExpressionErrorMessage(syntaxResult.message || t("error.evalReason.syntax")),
  });
  if (statusEl === expressionEditorStatus && expressionStatusCopyBtn) {
    expressionStatusCopyBtn.classList.remove("hidden");
  }
}

function localizeExpressionErrorMessage(message) {
  const raw = String(message ?? "").trim();
  if (!raw) {
    return t("error.evalReason.syntax");
  }
  const lower = raw.toLowerCase();
  if (["syntax", "syntaxerror"].includes(lower)) {
    return t("error.evalReason.syntax");
  }
  if (["runtime", "runtimeerror"].includes(lower)) {
    return t("error.evalReason.runtime");
  }
  if (["reference", "referenceerror"].includes(lower)) {
    return t("error.evalReason.reference");
  }
  if (["dependency"].includes(lower)) {
    return t("error.evalReason.dependency");
  }
  if (["type", "typeerror"].includes(lower)) {
    return t("error.evalReason.type");
  }
  if (lower === "readdata is only available in parameters") {
    return t("expr.error.readDataOnlyParameters");
  }
  if (lower === "readdata expects a string literal path") {
    return t("expr.error.readDataLiteralPath");
  }
  if (lower === "readdata path is invalid") {
    return t("expr.error.readDataPathInvalid");
  }
  if (lower === "readdata requires access to the model folder") {
    return t("expr.error.readDataModelFolderUnavailable");
  }
  const readDataUnavailableMatch = raw.match(/^readData file is unavailable: (.+)$/i);
  if (readDataUnavailableMatch) {
    return t("expr.error.readDataFileUnavailable", { path: readDataUnavailableMatch[1] });
  }
  if (lower === "readdata csv is empty") {
    return t("expr.error.readDataCsvEmpty");
  }
  if (lower === "readdata csv must be rectangular") {
    return t("expr.error.readDataCsvRectangular");
  }
  if (lower === "readdata csv contains an unterminated quoted field") {
    return t("expr.error.readDataCsvQuotedField");
  }
  const readDataNumericCellMatch = raw.match(/^readData CSV cell is not numeric at \[(\d+), (\d+)\]$/i);
  if (readDataNumericCellMatch) {
    return t("expr.error.readDataCsvNumericCell", {
      row: readDataNumericCellMatch[1],
      col: readDataNumericCellMatch[2],
    });
  }
  if (lower === "'this' is only available in state transitions") {
    return t("expr.error.thisOnlyState");
  }
  if (lower === "'integral' is only available in state transitions") {
    return t("expr.error.integralOnlyState");
  }
  if (lower.includes("missing ) after argument list") || lower.includes("missing ) in parenthetical")) {
    return t("expr.error.missingCloseParen");
  }
  if (lower.includes("missing ] after element list")) {
    return t("expr.error.missingCloseBracket");
  }
  if (lower.includes("missing } after property list")) {
    return t("expr.error.missingCloseBrace");
  }
  if (lower.includes("unexpected end of input")) {
    return t("expr.error.unexpectedEnd");
  }
  if (lower.includes("unexpected token")) {
    return t("expr.error.unexpectedToken");
  }
  if (lower.includes("invalid or unexpected token")) {
    return t("expr.error.invalidToken");
  }
  if (lower.includes("unterminated string") || lower.includes("string literal contains an unescaped line break")) {
    return t("expr.error.unterminatedString");
  }
  if (lower.includes("missing : after property id")) {
    return t("expr.error.objectColon");
  }
  if (lower === "invalid number") {
    return t("expr.error.invalidNumber");
  }
  if (lower === "empty index") {
    return t("expr.error.emptyIndex");
  }
  if (lower === "empty index after ','") {
    return t("expr.error.emptyIndexAfterComma");
  }
  if (lower === "expected property name after '.'") {
    return t("expr.error.expectedPropertyAfterDot");
  }
  const notDefinedMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) is not defined$/);
  if (notDefinedMatch) {
    return t("expr.error.notDefined", { name: notDefinedMatch[1] });
  }
  const notCallableMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) is not callable$/);
  if (notCallableMatch) {
    return t("expr.error.notCallable", { name: notCallableMatch[1] });
  }
  const unavailableFunctionMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) is unavailable$/i);
  if (unavailableFunctionMatch) {
    return t("expr.error.functionUnavailable", { name: unavailableFunctionMatch[1] });
  }
  const expectsMatrixMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects a matrix$/i);
  if (expectsMatrixMatch) {
    return t("expr.error.expectsMatrix", { name: expectsMatrixMatch[1] });
  }
  const expectsRectMatrixMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects a rectangular matrix$/i);
  if (expectsRectMatrixMatch) {
    return t("expr.error.expectsRectangularMatrix", { name: expectsRectMatrixMatch[1] });
  }
  const expectsVectorMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects a non-empty vector$/i);
  if (expectsVectorMatch) {
    return t("expr.error.expectsNonEmptyVector", { name: expectsVectorMatch[1] });
  }
  const expectsVectorOrMatrixMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects a non-empty vector or matrix$/i);
  if (expectsVectorOrMatrixMatch) {
    return t("expr.error.expectsNonEmptyVectorOrMatrix", { name: expectsVectorOrMatrixMatch[1] });
  }
  const expectsVectorGenericMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects a vector$/i);
  if (expectsVectorGenericMatch) {
    return t("expr.error.expectsVector", { name: expectsVectorGenericMatch[1] });
  }
  const expectsOptionBoolMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects ([A-Za-z_$][A-Za-z0-9_$]*) to be true, false, 1, or 0$/i);
  if (expectsOptionBoolMatch) {
    return t("expr.error.expectsBooleanFlag", { name: expectsOptionBoolMatch[1], option: expectsOptionBoolMatch[2] });
  }
  const expectsFiniteMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) must be finite$/i);
  if (expectsFiniteMatch) {
    return t("expr.error.mustBeFinite", { name: expectsFiniteMatch[1] });
  }
  const expectsNArgsMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects exactly (\d+) arguments?$/i);
  if (expectsNArgsMatch) {
    return t("expr.error.expectsExactlyArgs", { name: expectsNArgsMatch[1], count: expectsNArgsMatch[2] });
  }
  const expectsRangeArgsMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects (\d+) to (\d+) arguments?$/i);
  if (expectsRangeArgsMatch) {
    return t("expr.error.expectsArgRange", { name: expectsRangeArgsMatch[1], min: expectsRangeArgsMatch[2], max: expectsRangeArgsMatch[3] });
  }
  const finiteBoundsMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects finite numeric bounds$/i);
  if (finiteBoundsMatch) {
    return t("expr.error.finiteNumericBounds", { name: finiteBoundsMatch[1] });
  }
  if (lower === "mode must be 0 (pdf), 1 (cdf), or 2 (icdf)") {
    return t("expr.error.distributionMode");
  }
  if (lower === "randint expects min <= max") {
    return t("expr.error.randIntBounds");
  }
  if (lower === "reduce on matrices requires an axis argument") {
    return t("expr.error.reduceMatrixAxis");
  }
  if (lower === "reduce expects an operator or function as first argument") {
    return t("expr.error.reduceOperator");
  }
  const expectsOptionsArgsMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects (.+) arguments?$/i);
  if (expectsOptionsArgsMatch) {
    return t("expr.error.expectsArgsDescription", { name: expectsOptionsArgsMatch[1], description: expectsOptionsArgsMatch[2] });
  }
  if (lower === "probability must be in (0, 1)") {
    return t("expr.error.probabilityOpen01");
  }
  if (lower === "probability must be in [0, 1]") {
    return t("expr.error.probabilityClosed01");
  }
  if (lower === "probability must be in [0, 1)") {
    return t("expr.error.probabilityHalfOpen01");
  }
  if (lower === "sigma must be > 0") {
    return t("expr.error.sigmaPositive");
  }
  if (lower === "rate must be > 0") {
    return t("expr.error.ratePositive");
  }
  if (lower === "max must be > min") {
    return t("expr.error.maxGreaterThanMin");
  }
  if (lower === "dt must be finite") {
    return t("expr.error.dtFinite");
  }
  if (lower === "range bounds must be finite numbers") {
    return t("expr.error.rangeBoundsFinite");
  }
  if (lower === "range step must be a non-zero finite number") {
    return t("expr.error.rangeStepNonZeroFinite");
  }
  if (lower === "range step does not reach the end value") {
    return t("expr.error.rangeStepNotReachEnd");
  }
  if (lower === "range is too large") {
    return t("expr.error.rangeTooLarge");
  }
  if (lower === "array is too large") {
    return t("expr.error.arrayTooLarge");
  }
  if (lower === "array requires at least one dimension") {
    return t("expr.error.arrayNeedsDimension");
  }
  if (lower === "array expects at least one axis and an expression") {
    return t("expr.error.arrayNeedsAxisExpression");
  }
  const arrayDimMatch = raw.match(/^array dimension (\d+) must be a non-negative integer$/i);
  if (arrayDimMatch) {
    return t("expr.error.arrayDimensionNonNegative", { index: arrayDimMatch[1] });
  }
  const arrayAxisMatch = raw.match(/^array axis (\d+) must be a non-negative integer or a vector$/i);
  if (arrayAxisMatch) {
    return t("expr.error.arrayAxisIntegerOrVector", { index: arrayAxisMatch[1] });
  }
  if (lower === "array is a special expression form" || lower === "map is a special expression form" || lower === "filter is a special expression form" || lower === "reduce is a special expression form" || lower === "append is a special expression form") {
    return t("expr.error.specialForm");
  }
  if (lower === "getproperty is only available in node expressions") {
    return t("expr.error.getPropertyOnlyNode");
  }
  if (lower === "setproperty is only available in node expressions") {
    return t("expr.error.setPropertyOnlyNode");
  }
  if (lower === "getmodelproperty is unavailable") {
    return t("expr.error.getModelPropertyUnavailable");
  }
  if (lower === "setmodelproperty is unavailable") {
    return t("expr.error.setModelPropertyUnavailable");
  }
  if (lower === "integral is only available in state node expressions") {
    return t("expr.error.integralOnlyStateNode");
  }
  if (lower === "empty integral expression") {
    return t("expr.error.emptyIntegralExpression");
  }
  if (lower === "integral derivative is unavailable") {
    return t("expr.error.integralDerivativeUnavailable");
  }
  if (lower === "integral value is unavailable") {
    return t("expr.error.integralValueUnavailable");
  }
  if (lower === "integral requires matching numeric state and derivative") {
    return t("expr.error.integralStateDerivativeMismatch");
  }
  if (lower === "operator arguments must have matching shapes" || lower === "function arguments must have matching shapes" || lower === "if arguments must have matching shapes" || lower === "tensor shape mismatch") {
    return t("expr.error.matchingShapes");
  }
  if (lower === "if expects an odd number of arguments: condition, value pairs, and a default value") {
    return t("expr.error.ifOddArgs");
  }
  if (lower === "slice bounds must be integers") {
    return t("expr.error.sliceBoundsIntegers");
  }
  if (lower === "slice step must be a non-zero integer") {
    return t("expr.error.sliceStepNonZeroInteger");
  }
  if (lower === "indexing requires an array or matrix" || lower === "slicing requires an array or matrix") {
    return t("expr.error.indexingArrayOrMatrix");
  }
  if (lower === "matrix index must be a pair of integers") {
    return t("expr.error.matrixIndexPair");
  }
  if (lower === "matrix index requires a matrix target") {
    return t("expr.error.matrixIndexMatrixTarget");
  }
  if (lower === "matrix row index out of range") {
    return t("expr.error.matrixRowOutOfRange");
  }
  if (lower === "matrix column index out of range") {
    return t("expr.error.matrixColOutOfRange");
  }
  if (lower === "array index must be an integer or a [row, col] pair") {
    return t("expr.error.arrayIndexIntegerOrPair");
  }
  if (lower === "array index must be an integer or a vector of integers") {
    return t("expr.error.arrayIndexIntegerOrVector");
  }
  if (lower === "array index must be an integer") {
    return t("expr.error.arrayIndexInteger");
  }
  if (lower === "array index out of range") {
    return t("expr.error.arrayIndexOutOfRange");
  }
  if (lower === "member access requires an object or array") {
    return t("expr.error.memberAccessObjectOrArray");
  }
  if (lower === "missing reduce operator") {
    return t("expr.error.missingReduceOperator");
  }
  if (lower === "invalid reducer") {
    return t("expr.error.invalidReducer");
  }
  const reducerCallableMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) is not callable$/i);
  if (reducerCallableMatch) {
    return t("expr.error.notCallable", { name: reducerCallableMatch[1] });
  }
  if (lower === "reduce expects a vector or matrix" || lower === "sum expects a vector or matrix" || lower === "count expects a vector or matrix" || lower === "indiceswhere expects a vector or matrix" || lower === "size expects a vector or matrix" || lower === "average expects a vector or matrix" || lower === "stdev expects a vector or matrix") {
    const fn = raw.split(" ")[0];
    return t("expr.error.expectsVectorOrMatrix", { name: fn });
  }
  if (lower === "flatten expects a matrix" || lower === "neighbors expects a matrix") {
    const fn = raw.split(" ")[0];
    return t("expr.error.expectsMatrix", { name: fn });
  }
  if (lower === "sum expects a rectangular numeric matrix" || lower === "average expects a rectangular numeric matrix" || lower === "stdev expects a rectangular numeric matrix") {
    const fn = raw.split(" ")[0];
    return t("expr.error.expectsRectangularNumericMatrix", { name: fn });
  }
  if (lower === "count expects a rectangular matrix" || lower === "indiceswhere expects a rectangular matrix" || lower === "removeat expects a rectangular matrix" || lower === "setat expects a rectangular matrix" || lower === "size expects a rectangular matrix" || lower === "neighbors expects a rectangular matrix") {
    const fn = raw.split(" ")[0];
    return t("expr.error.expectsRectangularMatrix", { name: fn });
  }
  if (lower === "sum axis for matrices must be 0 or 1" || lower === "count axis for matrices must be 0 or 1" || lower === "size axis for matrices must be 0 or 1" || lower === "average axis for matrices must be 0 or 1" || lower === "stdev axis for matrices must be 0 or 1" || lower === "removeat axis for matrices must be 0 or 1" || lower === "reduce matrix axis must be 0 or 1") {
    const fn = raw.split(" ")[0];
    return t("expr.error.axisZeroOrOne", { name: fn });
  }
  if (lower === "size axis for vectors must be 0") {
    return t("expr.error.vectorAxisZero", { name: "size" });
  }
  if (lower === "reduce axis requires a matrix") {
    return t("expr.error.axisRequiresMatrix", { name: "reduce" });
  }
  if (lower === "reduce requires a non-empty vector when no initial value is provided") {
    return t("expr.error.reduceNeedsNonEmptyVector");
  }
  if (
    lower === "append expects a vector or matrix as first argument"
    || lower === "append requires a vector or matrix as first argument"
    || lower === "append expects a vector or matrix as first argument, or a scalar followed by a vector"
  ) {
    return t("expr.error.appendArguments");
  }
  if (lower === "append on matrices expects a vector row as second argument") {
    return t("expr.error.appendSecondArgVectorRow");
  }
  if (lower === "append requires a rectangular matrix") {
    return t("expr.error.expectsRectangularMatrix", { name: "append" });
  }
  if (lower === "appended row length does not match matrix column count") {
    return t("expr.error.appendRowLength");
  }
  if (lower === "set expects a vector") {
    return t("expr.error.expectsVector", { name: "set" });
  }
  if (lower === "union expects two vectors" || lower === "intersection expects two vectors") {
    const fn = raw.split(" ")[0];
    return t("expr.error.expectsTwoVectors", { name: fn });
  }
  if (lower === "setat expects a vector or matrix" || lower === "removeat expects a vector or matrix") {
    const fn = raw.split(" ")[0];
    return t("expr.error.expectsVectorOrMatrix", { name: fn });
  }
  if (lower === "setat expects [row, col] for matrix cell replacement") {
    return t("expr.error.setAtPair");
  }
  if (lower === "setat expects a row vector with matching length") {
    return t("expr.error.setAtRowVectorLength");
  }
  if (lower === "setrow expects a row vector with matching length") {
    return t("expr.error.setRowLength");
  }
  if (lower === "appendrow expects a row vector with matching length") {
    return t("expr.error.appendRowLength");
  }
  if (lower === "setcol expects a vector with one value per matrix row") {
    return t("expr.error.setColLength");
  }
  if (lower === "removeat does not accept axis for vectors") {
    return t("expr.error.removeAtAxisVector");
  }
  const integerIndicesMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects integer indices$/i);
  if (integerIndicesMatch) {
    return t("expr.error.integerIndices", { name: integerIndicesMatch[1] });
  }
  const indexRangeMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) index out of range$/i);
  if (indexRangeMatch) {
    return t("expr.error.indexOutOfRange", { name: indexRangeMatch[1] });
  }
  if (lower === "average expects a non-empty vector" || lower === "stdev expects a non-empty vector") {
    const fn = raw.split(" ")[0];
    return t("expr.error.expectsNonEmptyVector", { name: fn });
  }
  if (lower === "average expects a non-empty matrix") {
    return t("expr.error.averageNonEmptyMatrix");
  }
  if (lower === "average expects non-empty matrix rows") {
    return t("expr.error.averageNonEmptyRows");
  }
  if (lower === "grid collision mode must be 'error', 'first', or 'sum'") {
    return t("expr.error.gridCollisionMode");
  }
  if (lower === "grid explicit size expects [rows, cols]") {
    return t("expr.error.gridExplicitSizePair");
  }
  if (lower === "grid explicit size expects non-negative integer dimensions") {
    return t("expr.error.gridExplicitSizeNonNegative");
  }
  if (lower === "grid coordinates exceed explicit matrix size") {
    return t("expr.error.gridExplicitSizeTooSmall");
  }
  if (lower === "grid expects row and column vectors with the same length") {
    return t("expr.error.gridRowColSameLength");
  }
  if (lower === "grid expects type vector with the same length as row and column vectors") {
    return t("expr.error.gridTypeSameLength");
  }
  if (lower === "grid expects non-negative integer coordinates") {
    return t("expr.error.gridNonNegativeCoords");
  }
  const gridCollisionMatch = raw.match(/^grid collision at \[(\d+), (\d+)\]$/i);
  if (gridCollisionMatch) {
    return t("expr.error.gridCollisionAt", { row: gridCollisionMatch[1], col: gridCollisionMatch[2] });
  }
  if (lower === "grid sum mode expects numeric values on coincident coordinates") {
    return t("expr.error.gridSumNumeric");
  }
  if (lower === "agents expects at least one field name") {
    return t("expr.error.agentsNeedsFields");
  }
  if (lower === "agents expects rows as a matrix") {
    return t("expr.error.agentsRowsMatrix");
  }
  if (lower === "agents row count must be a non-negative integer") {
    return t("expr.error.agentsRowCount");
  }
  if (lower === "agents rows must match the number of field names") {
    return t("expr.error.agentsRowsLength");
  }
  const agentFieldInvalidMatch = raw.match(/^agents field name '([^']+)' is invalid$/i);
  if (agentFieldInvalidMatch) {
    return t("expr.error.agentsFieldInvalid", { name: agentFieldInvalidMatch[1] });
  }
  const agentFieldReservedMatch = raw.match(/^agents field name '([^']+)' is reserved$/i);
  if (agentFieldReservedMatch) {
    return t("expr.error.agentsFieldReserved", { name: agentFieldReservedMatch[1] });
  }
  const agentFieldDuplicatedMatch = raw.match(/^agents field name '([^']+)' is duplicated$/i);
  if (agentFieldDuplicatedMatch) {
    return t("expr.error.agentsFieldDuplicated", { name: agentFieldDuplicatedMatch[1] });
  }
  const agentFieldUnknownMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) field name '([^']+)' is unknown$/i);
  if (agentFieldUnknownMatch) {
    return t("expr.error.agentFieldUnknown", { fn: agentFieldUnknownMatch[1], name: agentFieldUnknownMatch[2] });
  }
  if (lower === "filter mode must be 'elements', 'rows', or 'cols'") {
    return t("expr.error.filterMode");
  }
  if (lower === "agentspace explicit size expects [rows, cols]") {
    return t("expr.error.agentSpaceSizePair");
  }
  if (lower === "agentspace explicit size expects non-negative integer dimensions") {
    return t("expr.error.agentSpaceSizeNonNegative");
  }
  if (lower === "agentspace neighborhood must be 'moore' or 'vonneumann'") {
    return t("expr.error.agentSpaceNeighborhood");
  }
  if (lower === "agentspace radius must be a positive integer") {
    return t("expr.error.agentSpaceRadius");
  }
  if (lower === "agentspace expects non-negative integer coordinates") {
    return t("expr.error.agentSpaceCoords");
  }
  if (lower === "agentspace coordinates exceed explicit matrix size") {
    return t("expr.error.agentSpaceTooSmall");
  }
  if (lower === "agentspace identifier column expects scalar identifiers") {
    return t("expr.error.agentSpaceIdScalar");
  }
  if (lower === "agentspace identifier values must be unique") {
    return t("expr.error.agentSpaceIdUnique");
  }
  const agentSpaceExpectedMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects an agentspace$/i);
  if (agentSpaceExpectedMatch) {
    return t("expr.error.agentSpaceExpected", { name: agentSpaceExpectedMatch[1] });
  }
  const agentSpacePopulationMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects agents and space built from the same population$/i);
  if (agentSpacePopulationMatch) {
    return t("expr.error.agentSpacePopulationMismatch", { name: agentSpacePopulationMatch[1] });
  }
  const agentsMatrixMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects a matrix of agents$/i);
  if (agentsMatrixMatch) {
    return t("expr.error.agentsMatrixExpected", { name: agentsMatrixMatch[1] });
  }
  const agentsRectMatrixMatch = raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*) expects a rectangular agent matrix$/i);
  if (agentsRectMatrixMatch) {
    return t("expr.error.agentsMatrixRectangular", { name: agentsRectMatrixMatch[1] });
  }
  if (lower === "mapagents expects each transformed agent to be a row vector with matching length") {
    return t("expr.error.mapAgentsRowLength");
  }
  if (lower === "filter mode 'rows' or 'cols' requires a matrix") {
    return t("expr.error.filterRowsColsMatrix");
  }
  if (lower === "filter mode 'rows' or 'cols' requires a rectangular matrix") {
    return t("expr.error.filterRowsColsRectMatrix");
  }
  if (lower === "map expects a vector or matrix") {
    return t("expr.error.expectsVectorOrMatrix", { name: "map" });
  }
  if (lower === "count conditional form expects a vector or matrix") {
    return t("expr.error.expectsVectorOrMatrix", { name: "count" });
  }
  if (lower === "indiceswhere conditional form expects a vector or matrix") {
    return t("expr.error.expectsVectorOrMatrix", { name: "indicesWhere" });
  }
  if (lower === "unsupported reducer operator +" || lower.startsWith("unsupported reducer operator ")) {
    return t("expr.error.unsupportedReducerOperator", { op: raw.replace(/^Unsupported reducer operator\s*/i, "") });
  }
  if (lower.startsWith("unsupported operator ")) {
    return t("expr.error.unsupportedOperator", { op: raw.replace(/^Unsupported operator\s*/i, "") });
  }
  if (lower.startsWith("unsupported ast node ")) {
    return t("expr.error.unsupportedAstNode", { kind: raw.replace(/^Unsupported AST node\s*/i, "") });
  }
  if (lower.startsWith("local function recursion is not allowed:")) {
    return t("localFunctions.error.runtimeRecursion", {
      name: raw.replace(/^local function recursion is not allowed:\s*/i, ""),
    });
  }
  const expectedTokenMatch = raw.match(/^Expected '(.+)'$/i);
  if (expectedTokenMatch) {
    return t("expr.error.expectedToken", { token: expectedTokenMatch[1] });
  }
  if (lower === "open file picker not supported") {
    return t("expr.error.openPickerUnsupported");
  }
  if (lower === "save file picker not supported") {
    return t("expr.error.savePickerUnsupported");
  }
  if (lower.startsWith("duplicate input binding for ")) {
    return t("expr.error.duplicateInputBinding", { name: raw.replace(/^duplicate input binding for /i, "") });
  }
  if (lower === "missing submodel path") {
    return t("error.submodelMissingPath");
  }
  if (lower === "submodel is not loaded") {
    return t("expr.error.submodelNotLoaded");
  }
  if (lower === "recursive submodel reference") {
    return t("error.submodelRecursiveReference");
  }
  return raw;
}

function validateExpressionDraft(value, fieldKey = null) {
  const text = String(value ?? "");
  const modalNode = ui.expressionEditor?.nodeId ? getNodeById(ui.expressionEditor.nodeId) : null;
  const node = modalNode || selectedNodeForSidebar();
  const modalMeta = ui.expressionEditor ? expressionEditorMeta() : null;
  const meta = fieldKey
    ? expressionFieldMeta(fieldKey, node)
    : (modalMeta || null);
  if (!text.trim()) {
    if (graph.execution.strictDefinitions && meta && node) {
      if (meta.key === "initial" && isStateNode(node)) {
        return { ok: false, empty: true, message: nodeDefinitionIssueText({ reason: "missingInitialState" }) };
      }
      if (meta.key === "value") {
        if (isStateNode(node)) {
          return { ok: false, empty: true, message: nodeDefinitionIssueText({ reason: "missingTransition" }) };
        }
        if (node.shape === "diamond") {
          return { ok: false, empty: true, message: nodeDefinitionIssueText({ reason: "missingValue" }) };
        }
        if (!hasInputWidgetBinding(node)) {
          return { ok: false, empty: true, message: nodeDefinitionIssueText({ reason: "missingBehavior" }) };
        }
      }
    }
    return { ok: true, empty: true };
  }
  const allowStateTransitionOnly = Boolean(meta && meta.key === "value" && node && isStateNode(node));
  const readDataUsage = validateReadDataExpressionUsage(text, {
    allowReadData: Boolean(node && node.shape === "diamond"),
  });
  if (!readDataUsage.ok) {
    return { ok: false, empty: false, message: localizeExpressionErrorMessage(readDataUsage.message || "") };
  }
  const extraNames = [];
  if (node) {
    globalParameterNodesForModel(graph, node.id)
      .forEach((depNode) => {
        extraNames.push(depNode.name);
      });
    graph.edges
      .filter((edge) => edge.to === node.id)
      .map((edge) => getNodeById(edge.from))
      .filter(Boolean)
      .filter((depNode) => (meta?.key !== "initial") || !isSubmodelNode(depNode))
      .forEach((depNode) => {
        extraNames.push(depNode.name);
      });
    accessibleAgentFieldAliasNames(node, meta?.key || "value").forEach((name) => {
      extraNames.push(name);
    });
  }
  const result = semantics.validateExpressionSyntax(text, extraNames, {
    allowThisAlias: allowStateTransitionOnly,
    allowIntegral: allowStateTransitionOnly,
    localFunctions: localFunctionsForSemantics(graph),
  });
  return result.ok
    ? { ok: true, empty: false }
    : { ok: false, empty: false, message: localizeExpressionErrorMessage(result.message || t("error.evalReason.syntax")) };
}

function updateExpressionFieldState(inputEl, statusEl, value, showOk = false, fieldKey = null) {
  if (!inputEl) {
    return { ok: true, empty: true };
  }
  const syntaxResult = validateExpressionDraft(value, fieldKey);
  inputEl.classList.toggle("invalid", !syntaxResult.ok);
  showExpressionStatus(statusEl, syntaxResult, showOk);
  return syntaxResult;
}

function validateNodeDefinition(node) {
  if (!node) {
    return { ok: true };
  }
  const validateExpr = (value, fieldKey, options = {}) => {
    const readDataUsage = validateReadDataExpressionUsage(value, {
      allowReadData: node?.shape === "diamond",
    });
    if (!readDataUsage.ok) {
      return { ok: false, reason: "runtime", message: readDataUsage.message || "" };
    }
    const extraNames = [];
    globalParameterNodesForModel(graph, node.id)
      .forEach((depNode) => {
        extraNames.push(depNode.name);
      });
    graph.edges
      .filter((edge) => edge.to === node.id)
      .map((edge) => getNodeById(edge.from))
      .filter(Boolean)
      .filter((depNode) => fieldKey !== "initial" || !isSubmodelNode(depNode))
      .forEach((depNode) => {
        extraNames.push(depNode.name);
      });
    accessibleAgentFieldAliasNames(node, fieldKey || "value").forEach((name) => {
      extraNames.push(name);
    });
    return semantics.validateExpressionSyntax(String(value ?? ""), extraNames, {
      ...options,
      localFunctions: localFunctionsForSemantics(graph),
    });
  };
  const valueExpr = String(node.valueExpression ?? "");
  const initialExpr = String(node.initialStateExpression ?? "");

  if (isSubmodelNode(node)) {
    if (!String(node.modelPath ?? "").trim()) {
      return { ok: false, reason: "missingSubmodelPath" };
    }
    if (String(node.submodelError ?? "").trim()) {
      return { ok: false, reason: "invalidSubmodelPath", message: String(node.submodelError ?? "") };
    }
    return { ok: true };
  }

  if (isStateNode(node)) {
    if (!valueExpr.trim()) {
      return { ok: false, reason: "missingTransition" };
    }
    const transitionResult = validateExpr(valueExpr, "value", { allowThisAlias: true, allowIntegral: true });
    if (!transitionResult.ok) {
      return { ok: false, reason: "invalidTransition", message: transitionResult.message || "" };
    }
    if (!initialExpr.trim()) {
      return { ok: false, reason: "missingInitialState" };
    }
    const initialResult = validateExpr(initialExpr, "initial");
    if (!initialResult.ok) {
      return { ok: false, reason: "invalidInitialState", message: initialResult.message || "" };
    }
    return { ok: true };
  }

  if (hasInputWidgetBinding(node)) {
    return { ok: true };
  }
  if (!valueExpr.trim()) {
    return { ok: false, reason: node.shape === "diamond" ? "missingValue" : "missingBehavior" };
  }
  const result = validateExpr(valueExpr, "value");
  if (!result.ok) {
    return { ok: false, reason: node.shape === "diamond" ? "invalidValue" : "invalidBehavior", message: result.message || "" };
  }
  return { ok: true };
}

function invalidDefinedNodes() {
  return graph.nodes
    .map((node) => ({ node, issue: validateNodeDefinition(node) }))
    .filter((entry) => !entry.issue.ok);
}

function nodeDefinitionIssueText(issue) {
  if (!issue || issue.ok) {
    return "";
  }
  if (issue.reason === "missingBehavior") {
    return t("error.nodeDefinition.missingBehavior");
  }
  if (issue.reason === "invalidBehavior") {
    return t("error.nodeDefinition.invalidBehavior", { reason: localizeExpressionErrorMessage(issue.message || "") });
  }
  if (issue.reason === "missingValue") {
    return t("error.nodeDefinition.missingValue");
  }
  if (issue.reason === "invalidValue") {
    return t("error.nodeDefinition.invalidValue", { reason: localizeExpressionErrorMessage(issue.message || "") });
  }
  if (issue.reason === "missingTransition") {
    return t("error.nodeDefinition.missingTransition");
  }
  if (issue.reason === "invalidTransition") {
    return t("error.nodeDefinition.invalidTransition", { reason: localizeExpressionErrorMessage(issue.message || "") });
  }
  if (issue.reason === "missingInitialState") {
    return t("error.nodeDefinition.missingInitialState");
  }
  if (issue.reason === "invalidInitialState") {
    return t("error.nodeDefinition.invalidInitialState", { reason: localizeExpressionErrorMessage(issue.message || "") });
  }
  if (issue.reason === "missingSubmodelPath") {
    return t("error.nodeDefinition.missingSubmodelPath");
  }
  if (issue.reason === "invalidSubmodelPath") {
    return t("error.nodeDefinition.invalidSubmodelPath", { reason: issue.message || "" });
  }
  return t("error.evalReason.runtime");
}

const localFunctionsCoreHelpers = globalThis.STGraphXLocalFunctionsCore?.createLocalFunctionsCoreHelpers({
  t,
  getGraph: () => graph,
  sanitizeDefinition: (definition) => runtimeShared.sanitizeLocalFunctionDefinition(definition),
  semantics,
  localizeExpressionErrorMessage,
});

if (!localFunctionsCoreHelpers) {
  throw new Error("STGraphX local functions core helpers are unavailable");
}

function ensureLocalFunctions(model = graph) {
  return localFunctionsCoreHelpers.ensureLocalFunctions(model);
}

function sanitizeLocalFunctionName(name) {
  return localFunctionsCoreHelpers.sanitizeLocalFunctionName(name);
}

function sanitizeLocalFunctionParams(params) {
  return localFunctionsCoreHelpers.sanitizeLocalFunctionParams(params);
}

function sanitizeLocalFunctionDefinition(definition = {}) {
  return localFunctionsCoreHelpers.sanitizeLocalFunctionDefinition(definition);
}

function sanitizeLocalFunctions(model = graph) {
  return localFunctionsCoreHelpers.sanitizeLocalFunctions(model);
}

function localFunctionMapForModel(model = graph) {
  return localFunctionsCoreHelpers.localFunctionMapForModel(model);
}

function localFunctionNamesForModel(model = graph) {
  return localFunctionsCoreHelpers.localFunctionNamesForModel(model);
}

function localFunctionSignature(definition) {
  return localFunctionsCoreHelpers.localFunctionSignature(definition);
}

function validateLocalFunctions(definitions, options = {}) {
  return localFunctionsCoreHelpers.validateLocalFunctions(definitions, options);
}

function localFunctionsForSemantics(model = graph) {
  return sanitizeLocalFunctions(model);
}

function collectExpressionIdentifierReferences(expression) {
  return modelAnalysisCoreHelpers.collectExpressionIdentifierReferences(expression);
}

function incomingEdgesForNode(nodeId, model = graph) {
  return modelAnalysisCoreHelpers.incomingEdgesForNode(nodeId, model);
}

function outgoingEdgesForNode(nodeId, model = graph) {
  return modelAnalysisCoreHelpers.outgoingEdgesForNode(nodeId, model);
}

function pureTimeConfigIssue(execution = graph.execution) {
  return modelAnalysisCoreHelpers.pureTimeConfigIssue(execution);
}

function pureTimedDelayIssue(execution = graph.execution) {
  return modelAnalysisCoreHelpers.pureTimedDelayIssue(execution);
}

function expressionReferencesForAnalysis(node, fieldKey = "value") {
  return modelAnalysisCoreHelpers.expressionReferencesForAnalysis(node, fieldKey);
}

function nodeIsImplicitlyReferenced(targetNode, model = graph) {
  return modelAnalysisCoreHelpers.nodeIsImplicitlyReferenced(targetNode, model);
}

function submodelBindingReferences(node) {
  return modelAnalysisCoreHelpers.submodelBindingReferences(node);
}

function detectNonStateCycles(model = graph) {
  return modelAnalysisCoreHelpers.detectNonStateCycles(model);
}

function stateTransitionPreviewForAnalysis(node, previewState) {
  return modelAnalysisCoreHelpers.stateTransitionPreviewForAnalysis(node, previewState);
}

function widgetDisplayName(widget) {
  if (!widget) {
    return t("analysis.target.widget", { name: "?" });
  }
  const typeLabel = widget.type === "xychart"
    ? t("panel.widgetChart")
    : widget.type === "table"
      ? t("panel.widgetTable")
      : widget.type === "matrix"
        ? t("panel.widgetMatrix")
        : widget.type === "slider"
          ? t("panel.widgetSlider")
          : widget.type === "button"
            ? t("panel.widgetButton")
            : widget.type === "select"
              ? t("panel.widgetSelect")
              : widget.type === "led"
                ? t("panel.widgetLed")
                : widget.type === "text"
                  ? t("panel.widgetText")
                  : widget.type;
  const suffix = widget.customTitle ? `: ${widget.customTitle}` : ` #${widget.id}`;
  return `${typeLabel}${suffix}`;
}

const modelAnalysisCoreHelpers = globalThis.STGraphXModelAnalysisCore?.createModelAnalysisCoreHelpers({
  t,
  getGraph: () => graph,
  isSubmodelNode,
  isStateNode,
  isAlgebraicNode,
  accessibleAgentFieldAliasNames,
  buildNodeNameMap,
  getNodeById,
  getModelNodeById,
  globalParameterNodesForModel,
  isGlobalParameterNode,
  validateNodeDefinition,
  nodeDefinitionIssueText,
  localizeExpressionErrorMessage,
  localFunctionsForSemantics,
  semantics,
  nodePropertyAccessForContext,
  addTensorValues,
  scaleTensorValue,
  getExpressionPreviewInitializationState,
  describeExpressionPreviewShape,
  canBindButtonToNode,
  canBindSliderToNode,
  widgetDisplayName,
});

if (!modelAnalysisCoreHelpers) {
  throw new Error("STGraphX model analysis core helpers are unavailable");
}

const functionalLoopCore = globalThis.DSGraphFunctionalLoopCore;
if (!functionalLoopCore) {
  throw new Error("DSGraph functional loop core helpers are unavailable");
}

function normalizeEdgeRelationType(value) {
  return functionalLoopCore.normalizeRelationType(value, "1");
}

function focusFunctionalLoop(loop) {
  if (!loop) return;
  setFunctionalLoopFocus({ nodeIds: loop.nodeIds, edgeIds: loop.edgeIds });
  setNodeSelection(loop.nodeIds || [], false);
  render();
}

function focusFunctionalLoopNode(node) {
  if (!node) return;
  const result = functionalLoopUiHelpers?.getResult?.();
  const linkedLoops = (result?.cycles || []).filter((loop) => (node.loopIds || []).includes(loop.id));
  const nodeIds = new Set([node.nodeId]);
  const edgeIds = new Set();
  linkedLoops.forEach((loop) => {
    loop.nodeIds.forEach((id) => nodeIds.add(id));
    loop.edgeIds.forEach((id) => edgeIds.add(id));
  });
  setFunctionalLoopFocus({ nodeIds, edgeIds });
  selectSingleNode(node.nodeId);
  render();
}

function exportFunctionalLoopResults(result) {
  const csv = functionalLoopCore.exportFunctionalLoopCsv(result);
  downloadTextFile("functional-loop-diagram.csv", csv, "text/csv;charset=utf-8");
  setStatusKey("status.functionalLoopsExported");
}

const functionalLoopUiHelpers = globalThis.DSGraphFunctionalLoopUi?.createFunctionalLoopUiHelpers({
  t,
  modal: functionalLoopModal,
  content: functionalLoopContent,
  summary: functionalLoopSummary,
  validation: functionalLoopValidation,
  maxCyclesInput: functionalLoopMaxCyclesInput,
  maxDepthInput: functionalLoopMaxDepthInput,
  runAnalysis: (options) => functionalLoopCore.analyzeFunctionalLoops(graph, options),
  onFocusLoop: focusFunctionalLoop,
  onFocusNode: focusFunctionalLoopNode,
  onExport: exportFunctionalLoopResults,
  setStatusKey,
});

if (!functionalLoopUiHelpers) {
  throw new Error("DSGraph functional loop UI helpers are unavailable");
}

const watchDebuggerCoreHelpers = globalThis.STGraphXWatchDebuggerCore?.createWatchDebuggerCoreHelpers({
  t,
  getGraph: () => graph,
  getNodeByName,
  isStateNode,
  buildExecutionGlobals,
  localFunctionsForSemantics,
  semantics,
  localizeExpressionErrorMessage,
  summarizeWatchValue: (value, error) => formatWatchValue(value, error),
});

if (!watchDebuggerCoreHelpers) {
  throw new Error("STGraphX watch debugger core helpers are unavailable");
}

function ensureDebugConfig(model = graph) {
  return watchDebuggerCoreHelpers.ensureDebugConfig(model);
}

function sanitizeDebugConfig(model = graph) {
  return watchDebuggerCoreHelpers.sanitizeDebugConfig(model);
}

function isAnalysisFocusActive(targetType, targetId) {
  const focus = ui.analysisFocus;
  if (!focus || focus.type !== targetType || focus.id !== targetId) {
    return false;
  }
  if (focus.expiresAt <= Date.now()) {
    ui.analysisFocus = null;
    return false;
  }
  return true;
}

function setAnalysisFocus(target) {
  if (!target?.type || target.id == null) {
    ui.analysisFocus = null;
    return;
  }
  ui.analysisFocus = {
    type: target.type,
    id: target.id,
    expiresAt: Date.now() + 1800,
  };
  window.setTimeout(() => {
    if (!ui.analysisFocus) {
      return;
    }
    if (ui.analysisFocus.type === target.type && ui.analysisFocus.id === target.id && ui.analysisFocus.expiresAt <= Date.now()) {
      ui.analysisFocus = null;
      render();
    }
  }, 1850);
}

function isFunctionalLoopFocusActive(targetType, targetId) {
  const focus = ui.functionalLoopFocus;
  if (!focus || focus.expiresAt <= Date.now()) {
    if (focus) ui.functionalLoopFocus = null;
    return false;
  }
  const ids = targetType === "node" ? focus.nodeIds : focus.edgeIds;
  return ids instanceof Set && ids.has(targetId);
}

function setFunctionalLoopFocus({ nodeIds = [], edgeIds = [] } = {}) {
  const focus = {
    nodeIds: new Set(nodeIds),
    edgeIds: new Set(edgeIds),
    expiresAt: Date.now() + 3500,
  };
  ui.functionalLoopFocus = focus;
  window.setTimeout(() => {
    if (ui.functionalLoopFocus === focus && focus.expiresAt <= Date.now()) {
      ui.functionalLoopFocus = null;
      render();
    }
  }, 3550);
}

function analyzeModelStaticIssues() {
  return modelAnalysisCoreHelpers.analyzeModelStaticIssues();
}

function enforceStrictDefinitionsIfNeeded() {
  if (!graph.execution.strictDefinitions) {
    return true;
  }
  const invalidNodes = invalidDefinedNodes();
  if (!invalidNodes.length) {
    return true;
  }
  invalidNodes.forEach(({ node }) => {
    node.computedValue = null;
    node.computedError = "";
    node.pendingStateValue = null;
    node.pendingStateError = "";
  });
  const first = invalidNodes[0];
  setStatusKey("error.strictDefinitionsBlocked", {
    count: invalidNodes.length,
    node: first.node.name,
    reason: nodeDefinitionIssueText(first.issue),
  });
  render();
  return false;
}

function clearStrictInvalidNodeValues() {
  if (!graph.execution.strictDefinitions) {
    return;
  }
  invalidDefinedNodes().forEach(({ node }) => {
    node.computedValue = null;
    node.computedError = "";
    node.pendingStateValue = null;
    node.pendingStateError = "";
  });
}

function hasStrictExecutionBlock() {
  return Boolean(graph.execution.strictDefinitions && invalidDefinedNodes().length > 0);
}

function selectedNodeForSidebar() {
  if (ui.selectedNodes.size !== 1) {
    return null;
  }
  const nodeId = [...ui.selectedNodes][0];
  return getNodeById(nodeId) || null;
}

function expressionFieldMeta(fieldKey, node = selectedNodeForSidebar()) {
  if (!node) {
    return null;
  }
  if (fieldKey === "value") {
    const title = node.shape === "diamond"
      ? t("label.value")
      : (isStateNode(node) ? t("label.stateTransition") : t("label.behaviorFunction"));
    return {
      key: "value",
      title,
      value: String(node.valueExpression ?? ""),
      setValue: (nextValue) => {
        node.valueExpression = String(nextValue ?? "");
      },
      inputEl: nodeValueExprInput,
      statusEl: nodeValueExprStatus,
    };
  }
  if (fieldKey === "initial" && isStateNode(node)) {
    return {
      key: "initial",
      title: t("label.initialState"),
      value: String(node.initialStateExpression ?? ""),
      setValue: (nextValue) => {
        node.initialStateExpression = String(nextValue ?? "");
      },
      inputEl: nodeInitialStateInput,
      statusEl: nodeInitialStateStatus,
    };
  }
  return null;
}

function expressionEditorNodeTypeLabel(node) {
  if (!node) {
    return "";
  }
  if (node.shape === "diamond") {
    return t("expr.editor.nodeType.parameter");
  }
  if (isStateNode(node)) {
    return t("expr.editor.nodeType.state");
  }
  return t("expr.editor.nodeType.algebraic");
}

function expressionEditorBaseTitleForNode(node) {
  if (!node) {
    return "";
  }
  return t("expr.editor.nodeTitle", {
    name: String(node.name ?? ""),
    type: expressionEditorNodeTypeLabel(node),
  });
}

function expressionEditorMainFieldLabel(node) {
  if (!node) {
    return "";
  }
  if (isStateNode(node)) {
    return t("label.stateTransition");
  }
  return node.shape === "diamond" ? t("label.value") : t("label.behaviorFunction");
}

function syncExpressionEditorHeadLabel(node) {
  if (!expressionStateTransitionLabel) {
    return;
  }
  expressionStateTransitionLabel.textContent = expressionEditorMainFieldLabel(node);
}

function expressionEditorMeta() {
  if (!ui.expressionEditor) {
    return null;
  }
  const node = getNodeById(ui.expressionEditor.nodeId);
  return expressionFieldMeta(currentExpressionEditorFieldKey(), node);
}

function currentExpressionEditorFieldKey() {
  if (!ui.expressionEditor) {
    return "value";
  }
  if (ui.expressionEditor.activeEditor === "initial" && !expressionStateInitialBlock?.classList.contains("hidden")) {
    return "initial";
  }
  return ui.expressionEditor.fieldKey;
}

function activeExpressionEditorInput() {
  return currentExpressionEditorFieldKey() === "initial" ? expressionStateInitialInput : expressionEditorTextarea;
}

function activeExpressionEditorHighlight() {
  return currentExpressionEditorFieldKey() === "initial" ? expressionStateInitialHighlight : expressionEditorHighlight;
}

function setActiveExpressionEditor(editorKey) {
  if (!ui.expressionEditor) {
    return;
  }
  ui.expressionEditor.activeEditor = editorKey === "initial" ? "initial" : "main";
  renderExpressionHighlight();
  renderExpressionAutocomplete();
}

function effectiveExpressionEditorFieldForNode(node, preferredFieldKey) {
  if (!node) {
    return null;
  }
  if (expressionFieldMeta(preferredFieldKey, node)) {
    return preferredFieldKey;
  }
  if (preferredFieldKey !== "value" && expressionFieldMeta("value", node)) {
    return "value";
  }
  return null;
}

function syncExpressionEditorToSelectedNode() {
  if (!ui.expressionEditor || ui.expressionEditor.fieldKey === "__custom__" || !expressionEditorTextarea || !expressionEditorTitle) {
    return;
  }
  const selectedNode = selectedNodeForSidebar();
  if (!selectedNode) {
    return;
  }
  const nextFieldKey = effectiveExpressionEditorFieldForNode(selectedNode, ui.expressionEditor.fieldKey);
  if (!nextFieldKey) {
    return;
  }
  if (ui.expressionEditor.nodeId === selectedNode.id && ui.expressionEditor.fieldKey === nextFieldKey) {
    return;
  }
  const meta = expressionFieldMeta(nextFieldKey, selectedNode);
  if (!meta) {
    return;
  }
  ui.expressionEditor.nodeId = selectedNode.id;
  ui.expressionEditor.fieldKey = meta.key;
  ui.expressionEditor.baseTitle = expressionEditorBaseTitleForNode(selectedNode);
  ui.expressionEditor.initialValue = meta.value;
  ui.expressionEditor.secondaryInitialValue = isStateNode(selectedNode)
    ? String(selectedNode.initialStateExpression ?? "")
    : "";
  ui.expressionEditor.syntaxOk = true;
  expressionEditorTitle.textContent = ui.expressionEditor.baseTitle;
  expressionEditorTextarea.value = meta.value;
  if (expressionStateInitialInput) {
    expressionStateInitialInput.value = isStateNode(selectedNode) ? String(selectedNode.initialStateExpression ?? "") : "";
  }
  if (expressionDescriptionInput) {
    expressionDescriptionInput.value = getNodeDescription(selectedNode);
  }
  if (expressionFormulaNotesInput) {
    expressionFormulaNotesInput.value = getNodeFormulaNotes(selectedNode);
  }
  syncExpressionEditorFormulaNotes();
  refreshExpressionEditorValidation();
}

function syncExpressionEditorFormulaNotes() {
  const node = ui.expressionEditor?.nodeId ? getNodeById(ui.expressionEditor.nodeId) : null;
  const visible = Boolean(node && ui.expressionEditor?.fieldKey !== "__custom__");
  const stateVisible = Boolean(visible && node && isStateNode(node));
  const widgetControlled = Boolean(visible && isWidgetControlledExpressionNode(node));
  if (!stateVisible && ui.expressionEditor) {
    ui.expressionEditor.activeEditor = "main";
  }
  expressionStateInitialBlock?.classList.toggle("hidden", !stateVisible);
  expressionStateTransitionHead?.classList.toggle("hidden", !visible);
  if (expressionWidgetBindingInfo) {
    expressionWidgetBindingInfo.classList.toggle("hidden", !widgetControlled);
    expressionWidgetBindingInfo.classList.remove("ok", "error");
    expressionWidgetBindingInfo.textContent = widgetControlled ? t("node.widgetControlled") : "";
  }
  if (expressionEditorTextarea) {
    setExplicitControlDisabled(
      expressionEditorTextarea,
      isEditingUiLocked() || (visible && widgetControlled),
    );
  }
  syncExpressionEditorHeadLabel(node);
  if (expressionStateInitialInput) {
    expressionStateInitialInput.value = stateVisible ? String(node.initialStateExpression ?? "") : "";
    expressionStateInitialInput.disabled = !stateVisible || isEditingUiLocked();
  }
  hideExpressionStatus(expressionStateInitialStatus);
  hideExpressionStatus(expressionStateTransitionStatus);
  expressionDescriptionBox?.classList.toggle("hidden", !visible);
  expressionFormulaNotesBox?.classList.toggle("hidden", !visible);
  if (expressionDescriptionInput) {
    expressionDescriptionInput.value = visible ? getNodeDescription(node) : "";
    expressionDescriptionInput.disabled = !visible || isEditingUiLocked();
  }
  if (expressionFormulaNotesInput) {
    expressionFormulaNotesInput.value = visible ? getNodeFormulaNotes(node) : "";
    expressionFormulaNotesInput.disabled = !visible || isEditingUiLocked();
  }
  expressionEditorCard?.classList.toggle("state-node-editor", stateVisible);
  expressionEditorMain?.classList.toggle("state-node-editor", stateVisible);
  syncExpressionEditorNodeOptions(node, visible);
}

function syncExpressionEditorNodeOptions(node, visible) {
  expressionNodeOptions?.classList.toggle("hidden", !visible);
  if (!visible || !node) {
    return;
  }
  if (expressionNodeShapeInput) {
    const shapes = ["rect", "ellipse", "diamond", "submodel"];
    if (expressionNodeShapeInput.options.length !== shapes.length) {
      expressionNodeShapeInput.innerHTML = "";
      shapes.forEach((shape) => {
        const option = document.createElement("option");
        option.value = shape;
        option.textContent = t(`shape.${shape}`);
        expressionNodeShapeInput.appendChild(option);
      });
    }
    expressionNodeShapeInput.value = node.shape;
    expressionNodeShapeInput.disabled = isEditingUiLocked();
  }
  if (expressionNodeNameInput) {
    expressionNodeNameInput.value = node.name;
    expressionNodeNameInput.classList.remove("invalid");
    expressionNodeNameInput.disabled = isEditingUiLocked();
  }
  syncExpressionEditorNodeOptionAvailability(node, node.shape);
  if (expressionNodeInputInput) {
    expressionNodeInputInput.checked = Boolean(node.input);
  }
  if (expressionNodeOutputInput) {
    expressionNodeOutputInput.checked = Boolean(node.output);
  }
  if (expressionNodeGlobalInput) {
    expressionNodeGlobalInput.checked = Boolean(node.global);
  }
}

function syncExpressionEditorNodeOptionAvailability(node, shape) {
  const isSubmodel = shape === "submodel";
  const canBeInput = shape === "ellipse" && Boolean(node) && !nodeHasIncomingEdges(node.id);
  const canBeGlobal = shape === "diamond";
  expressionNodeInputLabel?.classList.toggle("hidden", !canBeInput);
  expressionNodeOutputLabel?.classList.toggle("hidden", isSubmodel);
  expressionNodeGlobalLabel?.classList.toggle("hidden", !canBeGlobal);
  if (expressionNodeInputInput) {
    expressionNodeInputInput.disabled = isEditingUiLocked() || !canBeInput;
    if (!canBeInput) {
      expressionNodeInputInput.checked = false;
    }
  }
  if (expressionNodeOutputInput) {
    expressionNodeOutputInput.disabled = isEditingUiLocked() || isSubmodel;
  }
  if (expressionNodeGlobalInput) {
    expressionNodeGlobalInput.disabled = isEditingUiLocked() || !canBeGlobal;
  }
}

function expressionDocMap() {
  const docs = window.GraphFunctions?.expressionDocs || globalThis.GraphFunctions?.expressionDocs;
  if (!docs) {
    return {};
  }
  const out = {};
  const appendEntries = (entries) => {
    Object.entries(entries || {}).forEach(([name, entry]) => {
      out[name] = {
        ...entry,
        name,
        description: t(entry.descriptionKey),
      };
    });
  };
  appendEntries(docs.variables);
  appendEntries(docs.functions);
  return out;
}

function globalHelpEntries() {
  const docs = expressionDocMap();
  return Object.keys(docs).map((name) => ({ name, ...docs[name] }));
}

function helpGroupLabel(kind) {
  if (kind === "agent") {
    return t("help.group.agent");
  }
  if (kind === "variable") {
    return t("help.group.variables");
  }
  if (kind === "array") {
    return t("help.group.array");
  }
  if (kind === "probability") {
    return t("help.group.probability");
  }
  if (kind === "math") {
    return t("help.group.math");
  }
  return t("help.group.functions");
}

function renderFunctionsHelp() {
  if (!functionsHelpContent) {
    return;
  }
  functionsHelpContent.innerHTML = "";
  const filter = String(functionsHelpSearch?.value || "").trim().toLocaleLowerCase();
  const typeFilter = String(functionsHelpTypeFilter?.value || "").trim();
  const groups = new Map();
  globalHelpEntries().filter((entry) => {
    const kind = entry.helpSection || entry.kind || "function";
    return (!filter || entry.name.toLocaleLowerCase().includes(filter))
      && (!typeFilter || kind === typeFilter);
  }).forEach((entry) => {
    const key = entry.helpSection || entry.kind || "function";
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(entry);
  });

  let visibleEntries = 0;
  ["variable", "function", "array", "probability", "math", "agent"].forEach((kind) => {
    const entries = (groups.get(kind) || []).slice().sort((left, right) => left.name.localeCompare(right.name));
    if (!entries || !entries.length) {
      return;
    }
    visibleEntries += entries.length;
    const group = document.createElement("section");
    group.className = "help-group";
    const title = document.createElement("h4");
    title.className = "help-group-title";
    title.textContent = helpGroupLabel(kind);
    group.appendChild(title);

    entries.forEach((entry) => {
      const item = document.createElement("div");
      item.className = "help-item";
      const name = document.createElement("div");
      name.className = "help-item-name";
      name.textContent = entry.name;
      const signature = document.createElement("code");
      signature.className = "help-item-signature";
      signature.textContent = entry.signature || entry.name;
      const desc = document.createElement("div");
      desc.className = "help-item-desc";
      const description = normalizedExpressionHelpDescription(entry);
      const exampleMatch = description.match(/\s+(?:Esempio|Esempi|Example|Examples):\s*([\s\S]+)$/i);
      const bodyText = exampleMatch ? description.slice(0, exampleMatch.index).trim() : description;
      const examplesText = exampleMatch ? exampleMatch[1].trim() : "";
      appendExpressionHelpInlineText(desc, bodyText);
      item.appendChild(name);
      item.appendChild(signature);
      item.appendChild(desc);
      if (examplesText) {
        const examples = document.createElement("div");
        examples.className = "help-item-examples";
        const label = document.createElement("span");
        label.textContent = t("expr.help.examples");
        examples.appendChild(label);
        examplesText.split(/\s*;\s*/).filter(Boolean).forEach((example) => {
          const code = document.createElement("code");
          code.textContent = expressionHelpExampleCode(example);
          examples.appendChild(code);
        });
        item.appendChild(examples);
      }
      group.appendChild(item);
    });
    functionsHelpContent.appendChild(group);
  });
  if (!visibleEntries) {
    const empty = document.createElement("p");
    empty.className = "functions-help-empty";
    empty.textContent = t("help.searchEmpty");
    functionsHelpContent.appendChild(empty);
  }
}

function renderExpressionLibrary() {
  if (!expressionLibrary) {
    return;
  }
  const entries = expressionCatalogForEditor();
  const manualFilter = String(expressionSymbolsFilter?.value || "").trim().toLowerCase();
  const autoFilter = String(ui.expressionEditor?.autoFilter || "").trim().toLowerCase();
  const filter = manualFilter || autoFilter;
  const selectedName = String(ui.expressionEditor?.librarySelectedName || "").trim();
  const filteredEntries = entries
    .filter((entry) => {
      // Model inputs remain available while the caret filter narrows the
      // general catalog, so they can always be inserted immediately.
      if (entry.linkedNode || entry.globalNode) {
        return true;
      }
      if (!filter) {
        return true;
      }
      return entry.name.toLowerCase().includes(filter);
    })
    .sort((left, right) => {
      const linkedDelta = Number(Boolean(right.linkedNode)) - Number(Boolean(left.linkedNode));
      if (linkedDelta) {
        return linkedDelta;
      }
      const leftName = left.name.toLowerCase();
      const rightName = right.name.toLowerCase();
      const leftStarts = filter ? leftName.startsWith(filter) : false;
      const rightStarts = filter ? rightName.startsWith(filter) : false;
      if (leftStarts !== rightStarts) {
        return leftStarts ? -1 : 1;
      }
      const kindDelta = expressionEntryKindOrder(left.kind) - expressionEntryKindOrder(right.kind);
      return kindDelta || left.name.localeCompare(right.name);
    });
  if (!selectedName && filteredEntries.length > 0 && ui.expressionEditor) {
    ui.expressionEditor.librarySelectedName = filteredEntries[0].name;
  } else if (selectedName && !filteredEntries.some((entry) => entry.name === selectedName) && ui.expressionEditor) {
    ui.expressionEditor.librarySelectedName = filteredEntries[0]?.name || "";
  }
  const effectiveSelectedName = String(ui.expressionEditor?.librarySelectedName || "").trim();

  expressionLibrary.innerHTML = "";
  expressionSidebar?.classList.remove("hidden");
  if (ui.expressionEditor?.readDataCompletion) {
    const context = document.createElement("div");
    context.className = "expression-linked-data-context";
    const title = document.createElement("strong");
    title.textContent = t("expr.help.linkedDataCompletionTitle");
    const hint = document.createElement("span");
    hint.textContent = t("expr.help.linkedDataCompletionHint");
    context.append(title, hint);
    expressionLibrary.appendChild(context);
  }
  const groups = new Map();
  filteredEntries.forEach((entry) => {
    const key = entry.linkedNode || entry.globalNode ? "linkedNode" : (entry.kind || "function");
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(entry);
  });
  const visibleEntries = [];
  Array.from(groups.keys())
    .sort((left, right) => expressionEntryKindOrder(left) - expressionEntryKindOrder(right))
    .forEach((kind) => {
      const group = document.createElement("section");
      group.className = "expression-library-group";
      group.classList.toggle("expression-library-linked-group", kind === "linkedNode");
      const title = document.createElement("h4");
      title.className = "expression-library-title";
      title.textContent = t(`expr.help.kind.${kind}`);
      const list = document.createElement("div");
      list.className = "expression-library-list";
      groups.get(kind)
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((entry) => {
          visibleEntries.push(entry);
          const item = document.createElement("div");
          item.className = "expression-library-item";
          item.classList.toggle("active", entry.name === effectiveSelectedName);
          item.dataset.entryName = entry.name;
          item.tabIndex = 0;
          const name = document.createElement("div");
          name.className = "expression-library-name";
          if (entry.kind === "externalData") {
            item.classList.add("expression-library-data-item");
            name.textContent = entry.signature || `readData(\"${entry.name}\")`;
            const hint = document.createElement("div");
            hint.className = "expression-library-data-hint";
            hint.textContent = t("expr.help.linkedDataInsertHint");
            item.append(name, hint);
          } else if (filter) {
            const lowerName = entry.name.toLowerCase();
            const idx = lowerName.indexOf(filter);
            if (idx >= 0) {
              const before = entry.name.slice(0, idx);
              const match = entry.name.slice(idx, idx + filter.length);
              const after = entry.name.slice(idx + filter.length);
              if (before) {
                name.appendChild(document.createTextNode(before));
              }
              const mark = document.createElement("mark");
              mark.textContent = match;
              name.appendChild(mark);
              if (after) {
                name.appendChild(document.createTextNode(after));
              }
            } else {
              name.textContent = entry.name;
            }
          } else {
            name.textContent = entry.name;
          }
          if (entry.kind !== "externalData") {
            item.appendChild(name);
          }
          const selectEntry = () => {
            setSelectedLibraryEntry(entry.name, entry);
          };
          const activate = () => {
            selectEntry();
            insertSelectedLibraryEntry();
          };
          item.addEventListener("mousedown", (evt) => {
            evt.preventDefault();
          });
          item.addEventListener("click", (evt) => {
            if (evt.shiftKey) {
              selectEntry();
              insertExpressionAtCursor("\n");
              refreshExpressionEditorValidation();
              return;
            }
            if (evt.detail >= 2) {
              activate();
              return;
            }
            selectEntry();
          });
          item.addEventListener("keydown", (evt) => {
            if (evt.key === "Enter") {
              evt.preventDefault();
              activate();
            } else if (evt.key === " ") {
              evt.preventDefault();
              selectEntry();
            }
          });
          item.addEventListener("focus", () => {
            selectEntry();
          });
          list.appendChild(item);
        });
      group.appendChild(title);
      group.appendChild(list);
      expressionLibrary.appendChild(group);
    });
  expressionLibrary.classList.remove("hidden");
  if (!groups.size) {
    const empty = document.createElement("div");
    empty.className = "empty-props";
    empty.textContent = t("text.noMatches");
    expressionLibrary.appendChild(empty);
    return;
  }
  if (effectiveSelectedName) {
    window.requestAnimationFrame(() => {
      const active = expressionLibrary.querySelector(`.expression-library-item[data-entry-name="${CSS.escape(effectiveSelectedName)}"]`);
      active?.scrollIntoView({ block: "nearest" });
    });
  }
}

function setSelectedLibraryEntry(name, entry = null) {
  if (!ui.expressionEditor || !expressionLibrary) {
    return;
  }
  const nextName = String(name || "").trim();
  if (!nextName) {
    return;
  }
  ui.expressionEditor.librarySelectedName = nextName;
  const resolvedEntry = entry || expressionCatalogForEditor().find((item) => item.name === nextName) || null;
  if (resolvedEntry) {
    setExpressionHelp(resolvedEntry);
  }
  expressionLibrary.querySelectorAll(".expression-library-item.active").forEach((item) => {
    item.classList.remove("active");
  });
  const active = expressionLibrary.querySelector(`.expression-library-item[data-entry-name="${CSS.escape(nextName)}"]`);
  if (active) {
    active.classList.add("active");
    active.scrollIntoView({ block: "nearest" });
  }
}

function openFunctionsHelp() {
  if (!functionsHelpModal) {
    return;
  }
  renderFunctionsHelp();
  functionsHelpModal.classList.remove("hidden");
  window.setTimeout(() => functionsHelpSearch?.focus(), 0);
}

function closeFunctionsHelp() {
  if (!functionsHelpModal) {
    return;
  }
  functionsHelpModal.classList.add("hidden");
}

function openExamplesHelp() {
  helpContentHelpers.openExamplesHelp();
}

function closeExamplesHelp() {
  helpContentHelpers.closeExamplesHelp();
}

function openEightTuple() {
  helpContentHelpers.openEightTuple();
}

function closeEightTuple() {
  helpContentHelpers.closeEightTuple();
}

async function copyEightTupleText() {
  return helpContentHelpers.copyEightTupleText();
}

async function exportEightTupleMarkdown() {
  return helpContentHelpers.exportEightTupleMarkdown();
}

function openAboutApp() {
  helpContentHelpers.openAboutApp();
}

function closeAboutApp() {
  helpContentHelpers.closeAboutApp();
}

function closeModelAnalysis() {
  modelAnalysisUiHelpers.closeModelAnalysis();
}

function openFunctionalLoopDiagram() {
  functionalLoopUiHelpers.openFunctionalLoopDiagram();
}

function closeFunctionalLoopDiagram() {
  functionalLoopUiHelpers.closeFunctionalLoopDiagram();
}

function runFunctionalLoopDiagram() {
  functionalLoopUiHelpers.execute();
}

function exportFunctionalLoopDiagram() {
  functionalLoopUiHelpers.exportResults();
}

function showLocalFunctionsStatus(message = "", isError = false) {
  if (!localFunctionsStatus) {
    return;
  }
  const text = String(message ?? "").trim();
  if (!text) {
    localFunctionsStatus.textContent = "";
    localFunctionsStatus.classList.add("hidden");
    localFunctionsStatus.classList.remove("error");
    return;
  }
  localFunctionsStatus.textContent = text;
  localFunctionsStatus.classList.remove("hidden");
  localFunctionsStatus.classList.toggle("error", isError);
}

function localFunctionsDraft() {
  if (!ui.localFunctionsEditor) {
    ui.localFunctionsEditor = {
      draft: sanitizeLocalFunctions(graph).map((definition) => ({ ...definition, params: definition.params.slice() })),
    };
  }
  return ui.localFunctionsEditor.draft;
}

function renderLocalFunctionsEditor() {
  if (!localFunctionsList) {
    return;
  }
  const draft = localFunctionsDraft();
  const frozen = isEditingUiLocked();
  localFunctionsList.innerHTML = "";
  if (!draft.length) {
    const empty = document.createElement("div");
    empty.className = "local-function-empty";
    empty.textContent = t("localFunctions.empty");
    localFunctionsList.appendChild(empty);
    return;
  }
  draft.forEach((definition, index) => {
    const item = document.createElement("section");
    item.className = "local-function-item";

    const top = document.createElement("div");
    top.className = "local-function-top";

    const nameRow = document.createElement("label");
    nameRow.className = "local-function-row";
    const nameLabel = document.createElement("span");
    nameLabel.textContent = t("localFunctions.name");
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = definition.name;
    nameInput.disabled = frozen;
    nameInput.addEventListener("input", () => {
      definition.name = String(nameInput.value ?? "");
      showLocalFunctionsStatus();
    });
    nameRow.appendChild(nameLabel);
    nameRow.appendChild(nameInput);

    const paramsRow = document.createElement("label");
    paramsRow.className = "local-function-row";
    const paramsLabel = document.createElement("span");
    paramsLabel.textContent = t("localFunctions.params");
    const paramsInput = document.createElement("input");
    paramsInput.type = "text";
    paramsInput.value = definition.params.join(", ");
    paramsInput.disabled = frozen;
    paramsInput.addEventListener("input", () => {
      definition.params = sanitizeLocalFunctionParams(paramsInput.value);
      showLocalFunctionsStatus();
    });
    paramsRow.appendChild(paramsLabel);
    paramsRow.appendChild(paramsInput);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "small-btn";
    removeBtn.textContent = t("action.remove");
    removeBtn.disabled = frozen;
    removeBtn.addEventListener("click", () => {
      draft.splice(index, 1);
      renderLocalFunctionsEditor();
      showLocalFunctionsStatus();
    });

    top.appendChild(nameRow);
    top.appendChild(paramsRow);
    top.appendChild(removeBtn);

    const fields = document.createElement("div");
    fields.className = "local-function-fields";

    const exprRow = document.createElement("label");
    exprRow.className = "local-function-row";
    const exprLabel = document.createElement("span");
    exprLabel.textContent = t("localFunctions.expression");
    const exprInput = document.createElement("textarea");
    exprInput.rows = 3;
    exprInput.spellcheck = false;
    exprInput.value = definition.expression;
    exprInput.disabled = frozen;
    exprInput.addEventListener("input", () => {
      definition.expression = String(exprInput.value ?? "");
      showLocalFunctionsStatus();
    });
    exprRow.appendChild(exprLabel);
    exprRow.appendChild(exprInput);

    const descRow = document.createElement("label");
    descRow.className = "local-function-row";
    const descLabel = document.createElement("span");
    descLabel.textContent = t("localFunctions.description");
    const descInput = document.createElement("textarea");
    descInput.rows = 2;
    descInput.value = definition.description;
    descInput.disabled = frozen;
    descInput.addEventListener("input", () => {
      definition.description = String(descInput.value ?? "");
      showLocalFunctionsStatus();
    });
    descRow.appendChild(descLabel);
    descRow.appendChild(descInput);

    fields.appendChild(exprRow);
    fields.appendChild(descRow);
    item.appendChild(top);
    item.appendChild(fields);
    localFunctionsList.appendChild(item);
  });
}

function openLocalFunctionsEditor() {
  if (!localFunctionsModal) {
    return;
  }
  updateEditingLockUi();
  ui.localFunctionsEditor = {
    draft: sanitizeLocalFunctions(graph).map((definition) => ({ ...definition, params: definition.params.slice() })),
  };
  renderLocalFunctionsEditor();
  showLocalFunctionsStatus();
  localFunctionsModal.classList.remove("hidden");
}

function closeLocalFunctionsEditor() {
  if (!localFunctionsModal) {
    return;
  }
  localFunctionsModal.classList.add("hidden");
  ui.localFunctionsEditor = null;
  showLocalFunctionsStatus();
}

function commitLocalFunctionsEditor() {
  const draft = localFunctionsDraft();
  const validation = validateLocalFunctions(draft, { model: graph });
  if (!validation.ok) {
    showLocalFunctionsStatus(validation.message || t("error.evalReason.runtime"), true);
    return false;
  }
  runAction(() => {
    graph.localFunctions = validation.definitions.map((definition) => ({
      ...definition,
      params: definition.params.slice(),
    }));
  });
  renderExpressionLibrary();
  closeLocalFunctionsEditor();
  setStatus(t("localFunctions.updated"));
  return true;
}

function setPresentationGroupsStatus(message = "", isError = false) {
  if (!presentationGroupsStatus) {
    return;
  }
  presentationGroupsStatus.textContent = String(message || "");
  presentationGroupsStatus.classList.toggle("hidden", !message);
  presentationGroupsStatus.classList.toggle("error", Boolean(message && isError));
  presentationGroupsStatus.classList.toggle("ok", Boolean(message && !isError));
}

function presentationGroupNameIsAvailable(name, excludeId = null) {
  const normalized = String(name || "").trim().toLocaleLowerCase();
  return Boolean(normalized) && !graph.presentationGroups.some((group) => (
    group.id !== excludeId && group.name.toLocaleLowerCase() === normalized
  ));
}

function renderPresentationGroupsEditor() {
  if (!presentationGroupsList) {
    return;
  }
  syncPresentationGroups();
  presentationGroupsList.innerHTML = "";
  if (!graph.presentationGroups.length) {
    const empty = document.createElement("p");
    empty.className = "presentation-group-empty";
    empty.textContent = t("presentationGroups.empty");
    presentationGroupsList.appendChild(empty);
    return;
  }
  graph.presentationGroups.forEach((group) => {
    const item = document.createElement("div");
    item.className = "presentation-group-item";

    const visibleLabel = document.createElement("label");
    visibleLabel.className = "menu-check compact-bool";
    const visibleInput = document.createElement("input");
    visibleInput.type = "checkbox";
    visibleInput.checked = group.visible !== false;
    const visibleText = document.createElement("span");
    visibleText.textContent = t("presentationGroups.visible");
    visibleInput.addEventListener("change", () => {
      commitPresentationGroupsChange(() => {
        const target = graph.presentationGroups.find((candidate) => candidate.id === group.id);
        if (target) {
          target.visible = visibleInput.checked;
        }
      });
      renderPresentationGroupsEditor();
    });
    visibleLabel.append(visibleInput, visibleText);

    const frameLabel = document.createElement("label");
    frameLabel.className = "menu-check compact-bool";
    const frameInput = document.createElement("input");
    frameInput.type = "checkbox";
    frameInput.checked = group.visible !== false && group.showFrame !== false;
    frameInput.disabled = group.visible === false;
    const frameText = document.createElement("span");
    frameText.textContent = t("presentationGroups.showFrame");
    frameInput.addEventListener("change", () => {
      commitPresentationGroupsChange(() => {
        const target = graph.presentationGroups.find((candidate) => candidate.id === group.id);
        if (target) {
          target.showFrame = frameInput.checked;
        }
      });
      renderPresentationGroupsEditor();
    });
    frameLabel.append(frameInput, frameText);

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.maxLength = 80;
    nameInput.value = group.name;
    nameInput.addEventListener("change", () => {
      const name = String(nameInput.value || "").trim();
      if (!name) {
        nameInput.value = group.name;
        setPresentationGroupsStatus(t("presentationGroups.error.nameRequired"), true);
        return;
      }
      if (!presentationGroupNameIsAvailable(name, group.id)) {
        nameInput.value = group.name;
        setPresentationGroupsStatus(t("presentationGroups.error.nameDuplicate"), true);
        return;
      }
      commitPresentationGroupsChange(() => {
        const target = graph.presentationGroups.find((candidate) => candidate.id === group.id);
        if (target) {
          target.name = name;
        }
      });
      setPresentationGroupsStatus();
    });

    const members = document.createElement("span");
    members.className = "presentation-group-members";
    members.textContent = t("presentationGroups.members", { count: group.nodeIds.length });

    const selectBtn = document.createElement("button");
    selectBtn.type = "button";
    selectBtn.className = "small-btn";
    selectBtn.textContent = t("presentationGroups.selectNodes");
    selectBtn.disabled = group.nodeIds.length === 0;
    selectBtn.addEventListener("click", () => {
      setNodeSelection(group.nodeIds);
      render();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "small-btn danger";
    deleteBtn.textContent = t("action.delete");
    deleteBtn.addEventListener("click", () => {
      commitPresentationGroupsChange(() => {
        graph.presentationGroups = graph.presentationGroups.filter((candidate) => candidate.id !== group.id);
      });
      setPresentationGroupsStatus();
      renderPresentationGroupsEditor();
    });

    item.append(visibleLabel, frameLabel, nameInput, members, selectBtn, deleteBtn);
    presentationGroupsList.appendChild(item);
  });
}

function openPresentationGroupsEditor() {
  if (!presentationGroupsModal) {
    return;
  }
  setPresentationGroupsStatus();
  if (presentationGroupNameInput) {
    presentationGroupNameInput.value = "";
  }
  renderPresentationGroupsEditor();
  presentationGroupsModal.classList.remove("hidden");
  presentationGroupNameInput?.focus();
}

function closePresentationGroupsEditor() {
  presentationGroupsModal?.classList.add("hidden");
  setPresentationGroupsStatus();
}

function syncViewOptionsInputs() {
  if (snapToGridInput) {
    snapToGridInput.checked = ui.snapToGrid === true;
  }
  if (showGridInput) {
    showGridInput.checked = ui.showGrid === true;
  }
  if (highlightNodeEdgesInput) {
    highlightNodeEdgesInput.checked = ui.highlightNodeEdges === true;
  }
  if (showNodeValuesInput) {
    showNodeValuesInput.checked = ui.showNodeValues === true;
  }
  if (showEdgeValuesInput) {
    showEdgeValuesInput.checked = ui.showEdgeValues === true;
  }
  if (gridSizeInput) {
    gridSizeInput.value = String(ui.gridSize);
  }
  if (tooltipDelayInput) {
    tooltipDelayInput.value = String(normalizeTooltipDelayMs(ui.tooltipDelayMs));
  }
  if (interfaceLanguageInput) {
    interfaceLanguageInput.value = currentLang;
  }
  syncVisualThemeControls();
  if (decimalDigitsInput) {
    decimalDigitsInput.value = String(clampDisplayDecimals(graph.execution.decimals));
  }
  if (strictDefinitionsInput) {
    strictDefinitionsInput.checked = Boolean(graph.execution.strictDefinitions);
  }
}

function openViewOptions() {
  if (!viewOptionsModal) {
    return;
  }
  closeTopMenus();
  syncViewOptionsInputs();
  viewOptionsModal.classList.remove("hidden");
  snapToGridInput?.focus();
}

function closeViewOptions() {
  viewOptionsModal?.classList.add("hidden");
}

function createPresentationGroupFromSelection() {
  const nodeIds = [...ui.selectedNodes];
  if (!nodeIds.length) {
    setPresentationGroupsStatus(t("presentationGroups.error.selectionRequired"), true);
    return;
  }
  const name = String(presentationGroupNameInput?.value || "").trim();
  if (!name) {
    setPresentationGroupsStatus(t("presentationGroups.error.nameRequired"), true);
    presentationGroupNameInput?.focus();
    return;
  }
  if (!presentationGroupNameIsAvailable(name)) {
    setPresentationGroupsStatus(t("presentationGroups.error.nameDuplicate"), true);
    presentationGroupNameInput?.focus();
    return;
  }
  commitPresentationGroupsChange(() => {
    graph.presentationGroups.push({
      id: presentationGroupCounter++,
      name,
      nodeIds,
      visible: true,
      showFrame: true,
    });
  });
  presentationGroupNameInput.value = "";
  setPresentationGroupsStatus();
  renderPresentationGroupsEditor();
}

function dashboardSuggestedItemPosition(item, pageId) {
  const dashboard = graph.dashboard;
  const contentWidth = Math.max(80, dashboard.width - 32);
  const items = [...graph.widgets, ...graph.textItems]
    .filter((candidate) => candidate !== item && normalizeDashboardPageId(candidate.dashboardPageId) === pageId);
  let x = 16;
  let y = 16;
  let rowHeight = 0;
  items.forEach((candidate) => {
    const width = Math.min(Number(candidate.width) || 220, contentWidth);
    const height = Number(candidate.height) || 80;
    if (x + width > contentWidth && x > 16) {
      x = 16;
      y += rowHeight + 16;
      rowHeight = 0;
    }
    x += width + 16;
    rowHeight = Math.max(rowHeight, height);
  });
  const width = Math.min(Number(item.width) || 220, contentWidth);
  if (x + width > contentWidth && x > 16) {
    x = 16;
    y += rowHeight + 16;
  }
  return { x, y };
}

function constrainDashboardItemPosition(item) {
  if (normalizeDashboardPageId(item?.dashboardPageId) == null || !graph.dashboard) {
    return;
  }
  const maxX = Math.max(16, graph.dashboard.width - 16 - (Number(item.width) || 0));
  const maxY = Math.max(16, graph.dashboard.height - 92 - (Number(item.height) || 0));
  item.x = clamp(Number(item.x) || 16, 16, maxX);
  item.y = clamp(Number(item.y) || 16, 16, maxY);
}

function addDashboardPage() {
  commitDashboardChange(() => {
    const dashboard = graph.dashboard;
    const id = dashboard.nextPageId++;
    dashboard.pages.push({ id, title: `${t("dashboard.defaultPage")} ${dashboard.pages.length + 1}` });
    dashboard.activePageId = id;
  });
}

function removeDashboardPage(pageId) {
  if (!graph.dashboard || graph.dashboard.pages.length < 2) return;
  commitDashboardChange(() => {
    const dashboard = graph.dashboard;
    const replacement = dashboard.pages.find((page) => page.id !== pageId);
    [...graph.widgets, ...graph.textItems].forEach((item) => {
      if (normalizeDashboardPageId(item.dashboardPageId) !== pageId) return;
      item.dashboardPageId = replacement.id;
      const position = dashboardSuggestedItemPosition(item, replacement.id);
      item.x = position.x;
      item.y = position.y;
    });
    dashboard.pages = dashboard.pages.filter((page) => page.id !== pageId);
    if (dashboard.activePageId === pageId) dashboard.activePageId = replacement.id;
  });
}

function renameDashboardPage(pageId) {
  const page = graph.dashboard?.pages.find((candidate) => candidate.id === pageId);
  if (!page || !dashboardRenameModal || !dashboardRenameInput) return;
  ui.dashboardRenamePageId = pageId;
  dashboardRenameInput.value = page.title;
  dashboardRenameModal.classList.remove("hidden");
  window.setTimeout(() => {
    dashboardRenameInput.focus();
    dashboardRenameInput.select();
  }, 0);
}

function closeDashboardPageRenameEditor() {
  dashboardRenameModal?.classList.add("hidden");
  ui.dashboardRenamePageId = null;
}

function applyDashboardPageRename() {
  const pageId = ui.dashboardRenamePageId;
  const page = graph.dashboard?.pages.find((candidate) => candidate.id === pageId);
  if (!page) {
    closeDashboardPageRenameEditor();
    return;
  }
  const title = String(dashboardRenameInput?.value ?? "").trim() || t("dashboard.defaultPage");
  if (title !== page.title) {
    commitDashboardChange(() => {
      const target = graph.dashboard.pages.find((candidate) => candidate.id === pageId);
      if (target) target.title = title;
    });
  }
  closeDashboardPageRenameEditor();
}

function dropItemIntoActiveDashboardPage(item) {
  const dashboard = graph.dashboard;
  if (!dashboard || dashboard.visible === false) return false;
  const position = dashboardItemPosition(item);
  const centerX = position.x + (Number(item.width) || 0) / 2;
  const centerY = position.y + (Number(item.height) || 0) / 2;
  const inside = centerX >= dashboard.x + 8
    && centerX <= dashboard.x + dashboard.width - 8
    && centerY >= dashboard.y + 70
    && centerY <= dashboard.y + dashboard.height - 8;
  const currentPageId = normalizeDashboardPageId(item.dashboardPageId);
  if (!inside) {
    // Keep the visual position when an item is released outside the dashboard.
    if (currentPageId == null) return false;
    item.dashboardPageId = null;
    item.x = position.x;
    item.y = position.y;
    return true;
  }
  if (currentPageId === dashboard.activePageId) return false;
  const origin = dashboardContentOrigin(dashboard);
  item.dashboardPageId = dashboard.activePageId;
  item.x = position.x - origin.x;
  item.y = position.y - origin.y;
  constrainDashboardItemPosition(item);
  return true;
}

function dashboardDropStateForItem(item) {
  const dashboard = graph.dashboard;
  if (!dashboard || dashboard.visible === false) return null;
  const position = dashboardItemPosition(item);
  const centerX = position.x + (Number(item.width) || 0) / 2;
  const centerY = position.y + (Number(item.height) || 0) / 2;
  const inside = centerX >= dashboard.x + 8
    && centerX <= dashboard.x + dashboard.width - 8
    && centerY >= dashboard.y + 70
    && centerY <= dashboard.y + dashboard.height - 8;
  const pageId = normalizeDashboardPageId(item.dashboardPageId);
  if (pageId == null && inside) return "enter";
  if (pageId != null && !inside) return "leave";
  return null;
}

function updateDashboardDropState(item) {
  const state = dashboardDropStateForItem(item);
  if (ui.dashboardDropState === state) return;
  ui.dashboardDropState = state;
  const frame = dashboardLayer.querySelector(".dashboard-frame");
  if (frame) {
    frame.classList.toggle("dashboard-drop-enter", state === "enter");
    frame.classList.toggle("dashboard-drop-leave", state === "leave");
  }
}

function selectedWatchableNode() {
  if (ui.selectedNodes.size !== 1) {
    return null;
  }
  const nodeId = [...ui.selectedNodes][0];
  return getNodeById(nodeId) || null;
}

function formatWatchValue(value, error = "") {
  return watchDebuggerUiHelpers.formatWatchValue(value, error);
}

function captureWatchSnapshot() {
  ui.watchPreviousSnapshot = watchDebuggerCoreHelpers.captureWatchSnapshot();
}

function breakpointExpressionSource() {
  if (watchBreakpointInput && document.activeElement === watchBreakpointInput) {
    return String(watchBreakpointInput.value ?? "");
  }
  return String(ensureDebugConfig(graph).breakpointExpression ?? "");
}

function validateBreakpointExpressionText(source = breakpointExpressionSource()) {
  return watchDebuggerCoreHelpers.validateBreakpointExpressionText(source);
}

function evaluateBreakpointConditionAtTime(timeValue) {
  return watchDebuggerCoreHelpers.evaluateBreakpointConditionAtTime(timeValue);
}

function ensureBreakpointReadyForExecution() {
  const debug = sanitizeDebugConfig(graph);
  if (!debug.breakpointEnabled) {
    return true;
  }
  const expression = String(debug.breakpointExpression ?? "").trim();
  if (!expression) {
    setStatus(t("watch.breakpointEmpty"), true);
    openWatchDebugger();
    return false;
  }
  const validation = validateBreakpointExpressionText(expression);
  if (!validation.ok) {
    setStatus(t("error.breakpointInvalid", { reason: localizeExpressionErrorMessage(validation.message || "") }), true);
    openWatchDebugger();
    return false;
  }
  return true;
}

function renderWatchDebugger() {
  return watchDebuggerUiHelpers.renderWatchDebugger();
}

function openWatchDebugger() {
  return watchDebuggerUiHelpers.openWatchDebugger();
}

function closeWatchDebugger() {
  return watchDebuggerUiHelpers.closeWatchDebugger();
}

function modelAnalysisCheckEntries() {
  return modelAnalysisUiHelpers.modelAnalysisCheckEntries();
}

function renderModelAnalysisChecksHelp() {
  return modelAnalysisUiHelpers.renderModelAnalysisChecksHelp();
}

function openModelAnalysisChecksHelp() {
  return modelAnalysisUiHelpers.openModelAnalysisChecksHelp();
}

function closeModelAnalysisChecksHelp() {
  return modelAnalysisUiHelpers.closeModelAnalysisChecksHelp();
}

function analysisIssueTargetLabel(issue) {
  return modelAnalysisUiHelpers.analysisIssueTargetLabel(issue);
}

function focusAnalysisIssueTarget(issue) {
  const target = issue?.target;
  if (!target) {
    return;
  }
  setAnalysisFocus(target);
  if (target.type === "node" && target.id != null) {
    selectSingleNode(target.id);
    render();
    return;
  }
  if (target.type === "edge" && target.id != null) {
    selectEdge(target.id);
    render();
    return;
  }
  if (target.type === "widget" && target.id != null) {
    selectWidget(target.id);
    render();
  }
}

function renderModelAnalysisReport(issues) {
  return modelAnalysisUiHelpers.renderModelAnalysisReport(issues);
}

function openModelAnalysis() {
  return modelAnalysisUiHelpers.openModelAnalysis();
}

function expressionEditorHasUnsavedChanges() {
  return Boolean(
    ui.expressionEditor
    && ui.expressionEditor.fieldKey !== "__custom__"
    && (
      (expressionEditorTextarea && expressionEditorTextarea.value !== String(ui.expressionEditor.initialValue ?? ""))
      || (
        expressionStateInitialInput
        && !expressionStateInitialBlock?.classList.contains("hidden")
        && expressionStateInitialInput.value !== String(ui.expressionEditor.secondaryInitialValue ?? "")
      )
    ),
  );
}

function openExpressionEditorSwitchModal() {
  if (!expressionEditorSwitchModal) {
    return;
  }
  expressionEditorSwitchModal.classList.remove("hidden");
  if (expressionEditorSwitchApplyBtn) {
    expressionEditorSwitchApplyBtn.disabled = !Boolean(ui.expressionEditor?.syntaxOk);
  }
  (expressionEditorSwitchApplyBtn && !expressionEditorSwitchApplyBtn.disabled
    ? expressionEditorSwitchApplyBtn
    : expressionEditorSwitchCancelBtn)?.focus();
}

function closeExpressionEditorSwitchModal() {
  if (!expressionEditorSwitchModal) {
    return;
  }
  expressionEditorSwitchModal.classList.add("hidden");
  ui.expressionEditorPendingSelectionAction = null;
  expressionEditorTextarea?.focus();
}

function currentExpressionEditorSelectionKey() {
  if (!ui.expressionEditor || ui.expressionEditor.fieldKey === "__custom__" || !ui.expressionEditor.nodeId) {
    return "";
  }
  return `node:${ui.expressionEditor.nodeId}`;
}

function requestExpressionEditorSelectionChange(action, nextSelectionKey = "") {
  if (typeof action !== "function") {
    return false;
  }
  if (nextSelectionKey && nextSelectionKey === currentExpressionEditorSelectionKey()) {
    action();
    return true;
  }
  if (!expressionEditorHasUnsavedChanges()) {
    action();
    return true;
  }
  ui.expressionEditorPendingSelectionAction = action;
  openExpressionEditorSwitchModal();
  return false;
}

function runPendingExpressionEditorSelectionAction() {
  const action = ui.expressionEditorPendingSelectionAction;
  closeExpressionEditorSwitchModal();
  if (typeof action === "function") {
    action();
  }
}

function expressionCatalogForEditor() {
  const meta = expressionEditorMeta();
  if (!meta) {
    return [];
  }
  const docs = expressionDocMap();
  const node = getNodeById(ui.expressionEditor.nodeId);
  const allowStateAliases = Boolean(meta.key === "value" && node && isStateNode(node));
  const out = [];
  const seen = new Set();
  const pushEntry = (name, entry) => {
    if (!name) {
      return;
    }
    if (seen.has(name)) {
      if (entry?.linkedNode || entry?.globalNode) {
        const existing = out.find((item) => item.name === name);
        if (existing) {
          existing.linkedNode = existing.linkedNode || Boolean(entry.linkedNode);
          existing.globalNode = existing.globalNode || Boolean(entry.globalNode);
        }
      }
      return;
    }
    seen.add(name);
    out.push({ name, ...entry });
  };

  Object.entries(docs).forEach(([name, entry]) => {
    if (name === "integral" && !allowStateAliases) {
      return;
    }
    if (name === "this" && !allowStateAliases) {
      return;
    }
    pushEntry(name, entry);
  });

  localFunctionsForSemantics(graph).forEach((definition) => {
    pushEntry(definition.name, {
      kind: "local",
      signature: localFunctionSignature(definition),
      description: definition.description || t("localFunctions.editor.defaultDescription"),
      insertText: `${definition.name}(${definition.params.join(", ")})`,
      cursorOffset: `${definition.name}(${definition.params.join(", ")})`.length,
    });
  });

  graph.externalData.forEach((entry) => {
    const path = normalizeReadDataPath(entry?.path);
    if (!path) return;
    pushEntry(path, {
      kind: "externalData",
      signature: `readData(\"${path}\")`,
      description: t("expr.help.linkedData", { path }),
      insertText: `readData(\"${path}\")`,
      cursorOffset: `readData(\"${path}\")`.length,
    });
  });

  if (node) {
    pushEntry("self", {
      kind: "variable",
      signature: "self",
      description: t("expr.help.self"),
      insertText: "self",
      cursorOffset: 4,
    });
    pushEntry("$j", {
      kind: "variable",
      signature: "$j",
      description: t("expr.help.agentColumnIndex"),
      insertText: "$j",
      cursorOffset: 2,
    });
    accessibleAgentFieldAliasEntries(node, meta?.key || "value").forEach((entry) => {
      pushEntry(entry.name, {
        kind: "agentField",
        signature: entry.name,
        description: t("expr.help.agentFieldAlias", { name: entry.name, index: entry.index }),
        insertText: entry.name,
        cursorOffset: entry.name.length,
      });
    });
  }

  if ((meta.key === "value" || meta.key === "initial") && node) {
    globalParameterNodesForModel(graph, node.id)
      .forEach((depNode) => {
        const nodeDescription = getNodeDescription(depNode);
        pushEntry(depNode.name, {
          kind: "variable",
          globalNode: true,
          signature: depNode.name,
          description: nodeDescription || depNode.name,
          insertText: depNode.name,
          cursorOffset: depNode.name.length,
        });
      });
    graph.edges
      .filter((edge) => edge.to === node.id)
      .map((edge) => getNodeById(edge.from))
      .filter(Boolean)
      .filter((depNode) => meta.key !== "initial" || !isSubmodelNode(depNode))
      .forEach((depNode) => {
        const nodeDescription = getNodeDescription(depNode);
        pushEntry(depNode.name, {
          kind: "variable",
          linkedNode: true,
          signature: depNode.name,
          description: nodeDescription || depNode.name,
          insertText: depNode.name,
          cursorOffset: depNode.name.length,
        });
        if (meta.key === "value" && isSubmodelNode(depNode)) {
          const outputs = Array.isArray(depNode.interfaceCache?.outputs)
            ? depNode.interfaceCache.outputs.map((value) => String(value).trim()).filter(Boolean)
            : [];
          outputs.forEach((outputName) => {
            const qualifiedName = `${depNode.name}.${outputName}`;
            pushEntry(qualifiedName, {
              kind: "variable",
              linkedNode: true,
              signature: qualifiedName,
              description: nodeDescription
                ? `${nodeDescription} · ${t("text.submodelOutputEntry", { node: depNode.name, output: outputName })}`
                : t("text.submodelOutputEntry", { node: depNode.name, output: outputName }),
              insertText: qualifiedName,
              cursorOffset: qualifiedName.length,
            });
          });
        }
      });
  }

  return out.sort((a, b) => {
    const linkedDelta = Number(Boolean(b.linkedNode)) - Number(Boolean(a.linkedNode));
    return linkedDelta || a.name.localeCompare(b.name);
  });
}

function expressionEntryKindOrder(kind) {
  switch (kind) {
    case "linkedNode":
      return -1;
    case "variable":
      return 0;
    case "function":
      return 1;
    case "local":
      return 2;
    case "array":
      return 3;
    case "probability":
      return 4;
    case "property":
      return 5;
    case "math":
      return 6;
    case "node":
      return 7;
    case "agentField":
      return 8;
    case "agent":
      return 9;
    case "externalData":
      return 10;
    default:
      return 99;
  }
}

function identifierPrefixAtCaret(text, caret) {
  const src = String(text ?? "");
  const pos = Math.max(0, Math.min(caret, src.length));
  let start = pos;
  while (start > 0 && /[A-Za-z0-9_$]/.test(src[start - 1])) {
    start -= 1;
  }
  const prefix = src.slice(start, pos);
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(prefix) ? { start, end: pos, prefix } : null;
}

function identifierAtCaret(text, caret) {
  const src = String(text ?? "");
  const pos = Math.max(0, Math.min(caret, src.length));
  let start = pos;
  while (start > 0 && /[A-Za-z0-9_$]/.test(src[start - 1])) {
    start -= 1;
  }
  let end = pos;
  while (end < src.length && /[A-Za-z0-9_$]/.test(src[end])) {
    end += 1;
  }
  const name = src.slice(start, end);
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : "";
}

function escapeHtml(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function expressionTokenClass(name, entryMap) {
  if (name === "true" || name === "false" || name === "null") {
    return "expression-token-keyword";
  }
  if (/^\$(?:i)?[0-9]+$/u.test(name) || name === "$value") {
    return "expression-token-variable";
  }
  const entry = entryMap.get(name);
  if (!entry) {
    return "";
  }
  if (entry.kind === "variable") {
    return entry.name?.includes(".") ? "expression-token-node" : "expression-token-variable";
  }
  if (entry.kind === "agentField") {
    return "expression-token-variable";
  }
  return "expression-token-function";
}

function expressionBracketStateMap(text, caret) {
  const src = String(text ?? "");
  const stack = [];
  const pairs = new Map();
  const unmatched = new Set();
  const openingFor = { ")": "(", "]": "[", "}": "{" };
  const closingFor = { "(": ")", "[": "]", "{": "}" };

  let inString = false;
  let stringQuote = "";
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    const prev = src[i - 1];
    if (inString) {
      if (ch === stringQuote && prev !== "\\") {
        inString = false;
        stringQuote = "";
      }
      continue;
    }
    if (ch === "\"" || ch === "'") {
      inString = true;
      stringQuote = ch;
      continue;
    }
    if (closingFor[ch]) {
      stack.push({ ch, index: i });
      continue;
    }
    if (openingFor[ch]) {
      const last = stack.pop();
      if (last && last.ch === openingFor[ch]) {
        pairs.set(last.index, i);
        pairs.set(i, last.index);
      } else {
        unmatched.add(i);
        if (last) {
          unmatched.add(last.index);
        }
      }
    }
  }
  stack.forEach((item) => unmatched.add(item.index));

  const candidateIndexes = [];
  if (caret > 0) {
    candidateIndexes.push(caret - 1);
  }
  if (caret < src.length) {
    candidateIndexes.push(caret);
  }
  const active = new Set();
  for (const idx of candidateIndexes) {
    const ch = src[idx];
    if (!"()[]{}".includes(ch)) {
      continue;
    }
    active.add(idx);
    if (pairs.has(idx)) {
      active.add(pairs.get(idx));
    }
    break;
  }
  return { active, unmatched };
}

function renderExpressionHighlightFor(inputEl, highlightEl) {
  if (!highlightEl || !inputEl) {
    return;
  }
  syncExpressionSurfaceSize(inputEl, highlightEl);
  const text = inputEl.value || "";
  const caret = inputEl.selectionStart ?? 0;
  const bracketState = expressionBracketStateMap(text, caret);
  const catalogMap = new Map(expressionCatalogForEditor().map((entry) => [entry.name, entry]));
  let out = "";
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    if (ch === "\n") {
      out += "\n";
      i += 1;
      continue;
    }

    if (/\s/u.test(ch)) {
      let j = i + 1;
      while (j < text.length && /\s/u.test(text[j]) && text[j] !== "\n") {
        j += 1;
      }
      out += escapeHtml(text.slice(i, j));
      i = j;
      continue;
    }

    if (ch === "\"" || ch === "'") {
      let j = i + 1;
      while (j < text.length) {
        if (text[j] === ch && text[j - 1] !== "\\") {
          j += 1;
          break;
        }
        j += 1;
      }
      out += `<span class="expression-token-string">${escapeHtml(text.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    if (/[0-9]/u.test(ch) || (ch === "." && /[0-9]/u.test(text[i + 1] || ""))) {
      let j = i + 1;
      while (j < text.length && /[0-9._eE]/u.test(text[j])) {
        j += 1;
      }
      out += `<span class="expression-token-number">${escapeHtml(text.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    if (/[A-Za-z_$]/u.test(ch)) {
      let j = i + 1;
      while (j < text.length && /[A-Za-z0-9_$]/u.test(text[j])) {
        j += 1;
      }
      const name = text.slice(i, j);
      const cls = expressionTokenClass(name, catalogMap);
      out += cls ? `<span class="${cls}">${escapeHtml(name)}</span>` : escapeHtml(name);
      i = j;
      continue;
    }

    if ("()[]{}".includes(ch)) {
      const classes = ["expression-token-bracket"];
      if (bracketState.unmatched.has(i)) {
        classes.push("expression-token-bracket-unmatched");
      } else if (bracketState.active.has(i)) {
        classes.push("expression-token-bracket-active");
      }
      out += `<span class="${classes.join(" ")}">${escapeHtml(ch)}</span>`;
      i += 1;
      continue;
    }

    if (/[+\-*/%=!<>?:&,.;|^~]/u.test(ch)) {
      out += `<span class="expression-token-operator">${escapeHtml(ch)}</span>`;
      i += 1;
      continue;
    }

    out += escapeHtml(ch);
    i += 1;
  }

  highlightEl.innerHTML = `${out || " "}\n`;
  highlightEl.classList.toggle("invalid", inputEl.classList.contains("invalid"));
  highlightEl.scrollTop = inputEl.scrollTop;
  highlightEl.scrollLeft = inputEl.scrollLeft;
}

function syncExpressionSurfaceSize(inputEl, highlightEl) {
  if (!inputEl) {
    return;
  }
  const surfaceEl = inputEl.closest(".expression-editor-surface");
  const renderedHeight = inputEl.offsetHeight || inputEl.clientHeight || 0;
  if (surfaceEl && renderedHeight > 0) {
    surfaceEl.style.height = `${renderedHeight}px`;
  }
  if (highlightEl && renderedHeight > 0) {
    highlightEl.style.height = `${renderedHeight}px`;
  }
}

function renderExpressionHighlight() {
  renderExpressionHighlightFor(activeExpressionEditorInput(), activeExpressionEditorHighlight());
}

function appendExpressionHelpInlineText(container, text) {
  const formulaPattern = /(\$[A-Za-z0-9_]+|\b(?:axis|mode)\s*=\s*[-A-Za-z0-9_.]+|\b[A-Za-z_][A-Za-z0-9_]*\([^()\n]*\)|\[[^\]\n]*\])/g;
  const source = String(text ?? "");
  const appendAutomaticFormatting = (fragment) => {
    let lastIndex = 0;
    fragment.replace(formulaPattern, (match, _unused, offset) => {
      if (offset > lastIndex) {
        container.append(document.createTextNode(fragment.slice(lastIndex, offset)));
      }
      const code = document.createElement("code");
      code.textContent = match;
      container.append(code);
      lastIndex = offset + match.length;
      return match;
    });
    if (lastIndex < fragment.length) {
      container.append(document.createTextNode(fragment.slice(lastIndex)));
    }
  };

  let cursor = 0;
  const explicitFormulaPattern = /`([^`\r\n]+)`/g;
  for (const match of source.matchAll(explicitFormulaPattern)) {
    appendAutomaticFormatting(source.slice(cursor, match.index));
    const code = document.createElement("code");
    code.textContent = match[1];
    container.append(code);
    cursor = match.index + match[0].length;
  }
  appendAutomaticFormatting(source.slice(cursor));
}

function expressionHelpExampleCode(example) {
  const text = String(example ?? "").trim();
  const terminatedCode = text.match(/^`([\s\S]*)`\.$/);
  if (terminatedCode) return terminatedCode[1];
  const code = text.match(/^`([\s\S]*)`$/);
  return code ? code[1] : text.replace(/\.$/, "");
}

function normalizedExpressionHelpDescription(entry) {
  const name = String(entry?.name ?? "");
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return String(entry?.description ?? "")
    .replace(new RegExp(`^\\s*${escapedName}\\s*\\([^\\n]*?\\)\\s*:\\s*`, "i"), "")
    .replace(/\basse\s*=/g, "axis=")
    .trim();
}

function setExpressionHelp(entry = null) {
  if (!expressionHelp) {
    return;
  }
  if (!entry) {
    expressionHelp.textContent = t("expr.help.empty");
    expressionHelpCopyBtn?.classList.add("hidden");
    return;
  }
  const kindKey = `expr.help.kind.${entry.kind || "function"}`;
  const kindLabel = t(kindKey);
  const description = normalizedExpressionHelpDescription(entry);
  const exampleMatch = description.match(/\s+(?:Esempio|Esempi|Example|Examples):\s*([\s\S]+)$/i);
  const bodyText = exampleMatch ? description.slice(0, exampleMatch.index).trim() : description;
  const examplesText = exampleMatch ? exampleMatch[1].trim() : "";
  expressionHelp.replaceChildren();

  const title = document.createElement("div");
  title.className = "expression-help-entry-title";
  title.textContent = `${entry.name} (${kindLabel})`;
  expressionHelp.append(title);

  if (entry.signature) {
    const signature = document.createElement("code");
    signature.className = "expression-help-signature";
    signature.textContent = entry.signature;
    expressionHelp.append(signature);
  }
  if (bodyText) {
    const body = document.createElement("p");
    body.className = "expression-help-description";
    appendExpressionHelpInlineText(body, bodyText);
    expressionHelp.append(body);
  }
  if (examplesText) {
    const examples = document.createElement("div");
    examples.className = "expression-help-examples";
    const label = document.createElement("span");
    label.textContent = t("expr.help.examples");
    examples.append(label);
    examplesText.split(/\s*;\s*/).filter(Boolean).forEach((example) => {
      const code = document.createElement("code");
      code.textContent = expressionHelpExampleCode(example);
      examples.append(code);
    });
    expressionHelp.append(examples);
  }
  expressionHelpCopyBtn?.classList.remove("hidden");
}

function setExpressionEntryTooltip(entry = null) {
  const preview = expressionValuePreviewForEntry(entry);
  const lines = [];
  if (entry?.name) {
    lines.push(entry.name);
  }
  if (preview?.text) {
    lines.push(`${t("expr.preview.title")}: ${preview.text}`);
  }
  if (preview?.typeLabel) {
    lines.push(`${t("expr.preview.type")}: ${preview.typeLabel}`);
  }
  const tooltipText = lines.join("\n");
  [
    expressionEditorTextarea,
    expressionEditorHighlight,
    expressionStateInitialInput,
    expressionStateInitialHighlight,
  ].forEach((el) => setTooltipText(el, tooltipText));
}

async function copyExpressionAuxText(sourceEl, emptyKey = "expr.copy.empty") {
  const content = String(sourceEl?.innerText || sourceEl?.textContent || "").trim();
  if (!content) {
    setStatusKey(emptyKey);
    return;
  }
  const ok = await copyTextToClipboard(content);
  if (ok) {
    setStatusKey("status.clipboardTextCopied");
    return;
  }
  setStatusKey("error.clipboardTextCopyFailed");
}

function expressionValuePreviewForEntry(entry) {
  if (!entry) {
    return null;
  }
  const previewState = getExpressionPreviewInitializationState();
  const { context: baseContext, node } = buildExpressionPreviewBaseContext(previewState);

  if (entry.kind === "variable") {
    if (entry.name === "$i" || entry.name === "$j") {
      return {
        text: "0",
        typeLabel: t("expr.preview.type.scalar"),
        error: false,
      };
    }
    if (entry.name === "this" && node && isStateNode(node)) {
      const currentValueResult = resolveStatePreviewCurrentValue(node, previewState);
      if (!currentValueResult.ok) {
        return { text: currentValueResult.message || t("expr.preview.unavailableState"), error: true };
      }
      return {
        text: summarizeExpressionPreviewValue(currentValueResult.value),
        typeLabel: describeExpressionPreviewShape(currentValueResult.value),
        error: false,
      };
    }
    if (entry.name === "self" && node) {
      let selfValue = node.computedValue;
      if (selfValue == null && isStateNode(node)) {
        const currentValueResult = resolveStatePreviewCurrentValue(node, previewState);
        if (currentValueResult.ok) {
          selfValue = currentValueResult.value;
        }
      }
      if (selfValue == null) {
        return { text: t("expr.preview.unavailableState"), error: true };
      }
      if (Array.isArray(selfValue)) {
        const localSelfValue = Array.isArray(selfValue[0]) ? selfValue[0][0] : selfValue[0];
        return {
          text: summarizeExpressionPreviewValue(localSelfValue),
          typeLabel: describeExpressionPreviewShape(localSelfValue),
          error: false,
        };
      }
      return {
        text: summarizeExpressionPreviewValue(selfValue),
        typeLabel: describeExpressionPreviewShape(selfValue),
        error: false,
      };
    }
    if (Object.prototype.hasOwnProperty.call(baseContext, entry.name)) {
      return {
        text: summarizeExpressionPreviewValue(baseContext[entry.name]),
        typeLabel: describeExpressionPreviewShape(baseContext[entry.name]),
        error: false,
      };
    }
    const agentFieldAliases = graphFunctionHelpers.collectAgentFieldAliasesFromContext?.(baseContext) || {};
    if (Object.prototype.hasOwnProperty.call(agentFieldAliases, entry.name)) {
      return {
        text: summarizeExpressionPreviewValue(agentFieldAliases[entry.name]),
        typeLabel: describeExpressionPreviewShape(agentFieldAliases[entry.name]),
        error: false,
      };
    }
    return null;
  }
  return null;
}

function renderExpressionAutocomplete() {
  const inputEl = activeExpressionEditorInput();
  if (!inputEl) {
    return;
  }
  if (!ui.expressionEditor) {
    setExpressionHelp(null);
    return;
  }

  const caret = inputEl.selectionStart ?? 0;
  const tokenInfo = identifierPrefixAtCaret(inputEl.value, caret);
  const exactToken = identifierAtCaret(inputEl.value, caret);
  const allEntries = expressionCatalogForEditor();
  ui.expressionEditor.catalog = allEntries;
  const linkedArgument = linkedReadDataArgumentAtCaret(inputEl.value, caret);
  if (linkedArgument) {
    ui.expressionEditor.readDataCompletion = true;
    const prefixLower = linkedArgument.prefix.toLowerCase();
    const entries = allEntries.filter((entry) => entry.kind === "externalData" && entry.name.toLowerCase().startsWith(prefixLower));
    ui.expressionEditor.autoFilter = linkedArgument.prefix;
    ui.expressionEditor.completion = entries.length ? {
      tokenStart: linkedArgument.start,
      tokenEnd: caret,
      entries: entries.slice(0, 8),
      activeIndex: 0,
    } : null;
    const helpEntry = ui.expressionEditor.completion?.entries[0] || null;
    if (helpEntry) ui.expressionEditor.librarySelectedName = helpEntry.name;
    setExpressionHelp(helpEntry);
    setExpressionEntryTooltip(helpEntry);
    renderExpressionLibrary();
    return;
  }
  ui.expressionEditor.readDataCompletion = false;
  ui.expressionEditor.autoFilter = tokenInfo?.prefix || exactToken || "";

  let helpEntry = null;
  if (tokenInfo && tokenInfo.prefix.length > 0) {
    const prefixLower = tokenInfo.prefix.toLowerCase();
    const suggestions = allEntries
      .filter((entry) => entry.name.toLowerCase().startsWith(prefixLower) && entry.name !== tokenInfo.prefix)
      .sort((left, right) => {
        const kindDelta = expressionEntryKindOrder(left.kind) - expressionEntryKindOrder(right.kind);
        return kindDelta || left.name.localeCompare(right.name);
      });
    ui.expressionEditor.completion = {
      tokenStart: tokenInfo.start,
      tokenEnd: tokenInfo.end,
      entries: suggestions.slice(0, 8),
      activeIndex: 0,
    };
    if (ui.expressionEditor.completion.entries.length > 0) {
      if (!exactToken) {
        helpEntry = ui.expressionEditor.completion.entries[ui.expressionEditor.completion.activeIndex] || null;
      }
    } else {
      ui.expressionEditor.completion = null;
    }
  } else {
    ui.expressionEditor.completion = null;
  }

  if (!helpEntry) {
    if (exactToken) {
      helpEntry = allEntries.find((entry) => entry.name === exactToken) || null;
    }
  }
  const preferred = exactToken
    ? (allEntries.find((entry) => entry.name === exactToken) || null)
    : (ui.expressionEditor.completion?.entries?.[ui.expressionEditor.completion.activeIndex] || null);
  if (preferred && ui.expressionEditor.librarySelectedName !== preferred.name) {
    ui.expressionEditor.librarySelectedName = preferred.name;
  }
  if (!helpEntry && ui.expressionEditor?.librarySelectedName) {
    helpEntry = allEntries.find((entry) => entry.name === ui.expressionEditor.librarySelectedName) || null;
  }
  setExpressionHelp(helpEntry);
  setExpressionEntryTooltip(helpEntry);
  renderExpressionLibrary();
}

function insertSelectedLibraryEntry() {
  const inputEl = activeExpressionEditorInput();
  if (!ui.expressionEditor || !inputEl) {
    return false;
  }
  const selectedName = String(ui.expressionEditor.librarySelectedName || "").trim();
  if (!selectedName) {
    return false;
  }
  const entry = expressionCatalogForEditor().find((item) => item.name === selectedName);
  if (!entry) {
    return false;
  }
  const caret = inputEl.selectionStart ?? 0;
  const linkedArgument = entry.kind === "externalData" ? linkedReadDataArgumentAtCaret(inputEl.value, caret) : null;
  const replacement = linkedArgument ? entry.name : (entry.insertText || entry.name);
  const tokenInfo = identifierPrefixAtCaret(inputEl.value, caret);
  const tokenAtCaret = identifierAtCaret(inputEl.value, caret);
  if (linkedArgument) {
    const before = inputEl.value.slice(0, linkedArgument.start);
    const after = inputEl.value.slice(caret);
    inputEl.value = `${before}${replacement}${after}`;
    const nextCaret = linkedArgument.start + replacement.length;
    inputEl.focus();
    inputEl.setSelectionRange(nextCaret, nextCaret);
  } else if (tokenInfo && (tokenInfo.prefix || tokenAtCaret)) {
    const tokenEnd = tokenInfo.end + Math.max(0, tokenAtCaret.length - tokenInfo.prefix.length);
    const before = inputEl.value.slice(0, tokenInfo.start);
    const after = inputEl.value.slice(tokenEnd);
    inputEl.value = `${before}${replacement}${after}`;
    const nextCaret = tokenInfo.start + (entry.cursorOffset ?? replacement.length);
    inputEl.focus();
    inputEl.setSelectionRange(nextCaret, nextCaret);
  } else {
    insertExpressionSnippet(replacement, entry.cursorOffset ?? replacement.length);
  }
  refreshExpressionEditorValidation();
  return true;
}

function insertExpressionSnippet(snippet, cursorOffset = null) {
  const inputEl = activeExpressionEditorInput();
  if (!inputEl) {
    return false;
  }
  const value = inputEl.value;
  const start = inputEl.selectionStart ?? 0;
  const end = inputEl.selectionEnd ?? start;
  const text = String(snippet ?? "");
  inputEl.value = `${value.slice(0, start)}${text}${value.slice(end)}`;
  const caret = start + (cursorOffset == null ? text.length : cursorOffset);
  inputEl.focus();
  inputEl.setSelectionRange(caret, caret);
  refreshExpressionEditorValidation();
  return true;
}

function visibleLibraryEntryNames() {
  if (!expressionLibrary) {
    return [];
  }
  return Array.from(expressionLibrary.querySelectorAll(".expression-library-item[data-entry-name]"))
    .map((item) => String(item.dataset.entryName || "").trim())
    .filter(Boolean);
}

function moveLibrarySelection(direction) {
  if (!ui.expressionEditor) {
    return false;
  }
  const names = visibleLibraryEntryNames();
  if (!names.length) {
    return false;
  }
  const current = String(ui.expressionEditor.librarySelectedName || "").trim();
  const currentIndex = Math.max(0, names.indexOf(current));
  const nextIndex = (currentIndex + direction + names.length) % names.length;
  setSelectedLibraryEntry(names[nextIndex]);
  return true;
}

function resetExpressionEditorCardPosition() {
  const card = expressionEditorModal?.querySelector(".expression-editor-card");
  if (!card) {
    return;
  }
  card.style.width = "";
  card.style.height = "";
  card.style.left = "50%";
  card.style.top = "50%";
  card.style.transform = "translate(-50%, -50%)";
}

function isTabletExpressionEditorMode() {
  return document.body.classList.contains("tablet-sidebar-layout")
    || window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

function setExpressionEditorView(view, options = {}) {
  const nextView = view === "notes" || view === "help" ? view : "editor";
  ui.expressionEditorView = nextView;
  const card = expressionEditorCard;
  if (card) {
    card.classList.toggle("expression-view-editor", nextView === "editor");
    card.classList.toggle("expression-view-notes", nextView === "notes");
    card.classList.toggle("expression-view-help", nextView === "help");
  }
  const viewButtons = [
    [expressionEditorViewEditorBtn, "editor"],
    [expressionEditorViewNotesBtn, "notes"],
    [expressionEditorViewHelpBtn, "help"],
  ];
  viewButtons.forEach(([btn, btnView]) => {
    if (!btn) {
      return;
    }
    const active = btnView === nextView;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
    btn.tabIndex = active ? 0 : -1;
  });
  if (options.focus !== false && isTabletExpressionEditorMode()) {
    if (nextView === "help") {
      expressionSymbolsFilter?.focus();
    } else if (nextView === "notes") {
      (expressionDescriptionInput || expressionFormulaNotesInput)?.focus();
    } else if (ui.expressionEditor?.activeEditor === "initial" && !expressionStateInitialBlock?.classList.contains("hidden")) {
      expressionStateInitialInput?.focus();
    } else {
      expressionEditorTextarea?.focus();
    }
  }
}

function clearExpressionPreviewTimer() {
  if (ui.expressionPreviewTimer != null) {
    window.clearTimeout(ui.expressionPreviewTimer);
    ui.expressionPreviewTimer = null;
  }
}

function invalidateExpressionPreviewInitializationCache() {
  ui.expressionPreviewInitCache = null;
}

function setExpressionPreviewState(text, tone = "") {
  if (!expressionPreviewBox || !expressionPreviewValue) {
    return;
  }
  expressionPreviewValue.textContent = String(text ?? "");
  expressionPreviewBox.classList.toggle("error", tone === "error");
}

expressionPreviewLabel?.addEventListener("click", () => {
  const collapsed = expressionPreviewBox?.classList.toggle("collapsed") ?? true;
  expressionPreviewLabel.setAttribute("aria-expanded", String(!collapsed));
});

function expressionPreviewNode() {
  if (!ui.expressionEditor) {
    return null;
  }
  if (ui.expressionEditor.nodeId) {
    return getNodeById(ui.expressionEditor.nodeId);
  }
  return selectedNodeForSidebar();
}

function createExpressionPreviewRuntimeModel() {
  const model = cloneRuntimeModel({
    modelTitle: graph.modelTitle,
    properties: graph.properties,
    nodes: graph.nodes,
    edges: graph.edges,
    execution: normalizeExecutionConfig(graph.execution),
    __directoryPath: String(graph.__directoryPath ?? ""),
    __readDataCache: graph.__readDataCache || Object.create(null),
  });
  clearRuntimeSubmodelState(model);
  model.execution.currentTime = null;
  return model;
}

function getExpressionPreviewInitializationState() {
  const snapshotKey = currentSnapshot();
  if (ui.expressionPreviewInitCache?.snapshotKey === snapshotKey) {
    return ui.expressionPreviewInitCache.value;
  }
  const model = createExpressionPreviewRuntimeModel();
  const timeValue = Number(model.execution.t0);
  initializeStateNodesForModel(model, timeValue, model.execution);
  evaluateModelAtTimeRecursive(
    model,
    timeValue,
    { rootExecution: model.execution, stack: [] },
  );
  model.execution.currentTime = timeValue;
  const value = {
    model,
    timeValue,
    globals: buildExecutionGlobalsForModel(model, model.execution, timeValue),
    nodeMap: new Map(model.nodes.map((item) => [item.id, item])),
  };
  ui.expressionPreviewInitCache = { snapshotKey, value };
  return value;
}

function expressionPreviewNodeFromState(previewState) {
  const node = expressionPreviewNode();
  if (!node || !previewState?.nodeMap) {
    return null;
  }
  return previewState.nodeMap.get(node.id) || null;
}

function buildExpressionPreviewBaseContext(previewState, meta = null) {
  const context = { ...(previewState?.globals || {}) };
  const node = expressionPreviewNodeFromState(previewState);
  if (!node || !previewState?.model) {
    return { context, node };
  }
  Object.assign(context, nodePropertyAccessForContext(node));
  globalParameterNodesForModel(previewState.model, node.id).forEach((depNode) => {
    if (!depNode.computedError) {
      context[depNode.name] = depNode.computedValue;
    }
  });
  previewState.model.edges
    .filter((edge) => edge.to === node.id)
    .map((edge) => getModelNodeById(previewState.model, edge.from))
    .filter(Boolean)
    .filter((depNode) => (meta?.key !== "initial") || !isSubmodelNode(depNode))
    .forEach((depNode) => {
      if (!depNode.computedError) {
        context[depNode.name] = depNode.computedValue;
      }
    });
  return { context, node };
}

function evaluateInitialStatePreviewValue(node, globals, model = graph) {
  if (!node || !isStateNode(node)) {
    return { ok: false };
  }
  const context = {
    ...globals,
    ...nodePropertyAccessForContext(node),
  };
  globalParameterNodesForModel(model, node.id).forEach((depNode) => {
    if (!depNode.computedError) {
      context[depNode.name] = depNode.computedValue;
    }
  });
  (model?.edges || [])
    .filter((edge) => edge.to === node.id)
    .map((edge) => getModelNodeById(model, edge.from))
    .filter((depNode) => depNode && !isSubmodelNode(depNode))
    .forEach((depNode) => {
      if (!depNode.computedError) {
        context[depNode.name] = depNode.computedValue;
      }
    });
  const source = (
    ui.expressionEditor
    && ui.expressionEditor.nodeId === node.id
    && !expressionStateInitialBlock?.classList.contains("hidden")
    && expressionStateInitialInput
  )
    ? String(expressionStateInitialInput.value ?? "")
    : String(node.initialStateExpression ?? "");
  return semantics.evaluateValueExpression(source, context, {
    localFunctions: localFunctionsForSemantics(model),
  });
}

function resolveStatePreviewCurrentValue(node, previewState) {
  if (!node || !isStateNode(node)) {
    return { ok: false };
  }
  const initialPreview = evaluateInitialStatePreviewValue(node, previewState.globals, previewState.model);
  if (initialPreview.ok) {
    return initialPreview;
  }
  if (node.computedValue != null) {
    return { ok: true, value: node.computedValue };
  }
  return { ok: false, message: initialPreview.message || t("expr.preview.unavailableState") };
}

function buildExpressionPreviewEvaluation() {
  if (!ui.expressionEditor || !expressionEditorTextarea) {
    return null;
  }
  const source = String(expressionEditorTextarea.value ?? "");
  if (!source.trim()) {
    return { ok: true, empty: true, value: null };
  }
  const editorNode = ui.expressionEditor.nodeId ? getNodeById(ui.expressionEditor.nodeId) : null;
  const meta = (editorNode && isStateNode(editorNode))
    ? expressionFieldMeta("value", editorNode)
    : expressionEditorMeta();
  const previewState = getExpressionPreviewInitializationState();
  const { context, node } = buildExpressionPreviewBaseContext(previewState, meta);

  const isStateTransition = Boolean(meta?.key === "value" && node && isStateNode(node));
  if (isStateTransition) {
    const currentValueResult = resolveStatePreviewCurrentValue(node, previewState);
    if (!currentValueResult.ok) {
      return { ok: false, reason: "runtime", message: currentValueResult.message || t("expr.preview.unavailableState") };
    }
    const selfValue = currentValueResult.value;
    context.__self = selfValue;
    if (String(source).includes("integral(")) {
        const derivativeList = semantics.evaluateIntegralDerivativeList(source, context, {
          allowThisAlias: true,
          localFunctions: localFunctionsForSemantics(graph),
        });
      if (!derivativeList.ok) {
        return {
          ...derivativeList,
          stateTransition: true,
          currentValue: selfValue,
        };
      }
      const dt = Number(graph.execution.dt);
      const integralValues = (derivativeList.value || []).map((derivativeValue) => addTensorValues(selfValue, scaleTensorValue(derivativeValue, dt)));
      const nextValueResult = semantics.evaluateStateTransitionExpressionWithIntegralValues(
        source,
        context,
        integralValues,
        { allowThisAlias: true, localFunctions: localFunctionsForSemantics(graph) },
      );
      return {
        ...nextValueResult,
        stateTransition: true,
        currentValue: selfValue,
        nextValue: nextValueResult.ok ? nextValueResult.value : null,
      };
    }
    const nextValueResult = semantics.evaluateValueExpression(source, context, {
      allowThisAlias: true,
      allowIntegral: true,
      localFunctions: localFunctionsForSemantics(graph),
    });
    return {
      ...nextValueResult,
      stateTransition: true,
      currentValue: selfValue,
      nextValue: nextValueResult.ok ? nextValueResult.value : null,
    };
  }
  return semantics.evaluateValueExpression(source, context, {
    localFunctions: localFunctionsForSemantics(graph),
  });
}

function refreshExpressionPreviewNow() {
  clearExpressionPreviewTimer();
  if (!expressionPreviewBox || !expressionPreviewValue) {
    return;
  }
  const result = buildExpressionPreviewEvaluation();
  if (!result || result.empty) {
    setExpressionPreviewState(t("expr.preview.empty"));
    return;
  }
  if (result.stateTransition) {
    const formatStatePreviewBlock = (label, value) => {
      const shape = describeExpressionPreviewShape(value);
      const summary = summarizeExpressionPreviewValue(value);
      const lines = [`${label} (${shape}):`];
      let redundantSummary = summary === shape;
      if (Array.isArray(value) && !redundantSummary) {
        const isMatrix =
          value.length > 0 &&
          value.every((row) => Array.isArray(row)) &&
          value.every((row) => row.length === value[0].length);
        if (isMatrix) {
          redundantSummary = summary === t("text.matrixSummary", { rows: value.length, cols: value[0]?.length ?? 0 });
        } else if (value.every((item) => !Array.isArray(item))) {
          redundantSummary = summary === t("text.vectorSummary", { size: value.length });
        }
      }
      if (!redundantSummary) {
        lines.push(summary);
      }
      return lines;
    };
    const formatStateErrorBlock = (label, message) => [
      `${label}:`,
      t("expr.preview.error", { message }),
    ];
    const currentBlock = formatStatePreviewBlock(t("expr.preview.currentValue"), result.currentValue);
    if (!result.ok) {
      const msg = result.message ? localizeExpressionErrorMessage(result.message) : t(`error.evalReason.${result.reason || "runtime"}`);
      const nextBlock = formatStateErrorBlock(t("expr.preview.nextValue"), msg);
      setExpressionPreviewState(`${currentBlock.join("\n")}\n\n${nextBlock.join("\n")}`, "error");
      return;
    }
    const nextBlock = formatStatePreviewBlock(t("expr.preview.nextValue"), result.nextValue);
    setExpressionPreviewState(`${currentBlock.join("\n")}\n\n${nextBlock.join("\n")}`);
    return;
  }
  if (!result.ok) {
    const msg = result.message ? localizeExpressionErrorMessage(result.message) : t(`error.evalReason.${result.reason || "runtime"}`);
    setExpressionPreviewState(t("expr.preview.error", { message: msg }), "error");
    return;
  }
  setExpressionPreviewState(`${t("expr.preview.type")}: ${describeExpressionPreviewShape(result.value)}\n${summarizeExpressionPreviewValue(result.value)}`);
}

function scheduleExpressionPreviewRefresh(delay = 180) {
  clearExpressionPreviewTimer();
  if (!ui.expressionEditor) {
    setExpressionPreviewState(t("expr.preview.empty"));
    return;
  }
  setExpressionPreviewState(t("expr.preview.pending"));
  ui.expressionPreviewTimer = window.setTimeout(() => {
    ui.expressionPreviewTimer = null;
    refreshExpressionPreviewNow();
  }, delay);
}

function closeExpressionEditor() {
  if (!expressionEditorModal) {
    return;
  }
  expressionEditorModal.classList.add("hidden");
  closeExpressionEditorSwitchModal();
  ui.expressionEditor = null;
  invalidateExpressionPreviewInitializationCache();
  ui.modalDrag = null;
  if (expressionEditorTextarea) {
    expressionEditorTextarea.value = "";
    expressionEditorTextarea.classList.remove("invalid");
  }
  if (expressionStateInitialInput) {
    expressionStateInitialInput.value = "";
    expressionStateInitialInput.classList.remove("invalid");
  }
  if (expressionEditorHighlight) {
    expressionEditorHighlight.innerHTML = "";
    expressionEditorHighlight.classList.remove("invalid");
  }
  expressionEditorSurface?.classList.remove("invalid");
  hideExpressionStatus(expressionStateTransitionStatus);
  if (expressionLibrary) {
    expressionLibrary.innerHTML = "";
    expressionLibrary.classList.add("hidden");
  }
  if (expressionSymbolsFilter) {
    expressionSymbolsFilter.value = "";
  }
  expressionSidebar?.classList.remove("hidden");
  setExpressionEditorView("editor", { focus: false });
  setExpressionHelp(null);
  hideExpressionStatus(expressionEditorStatus);
  hideExpressionStatus(expressionStateInitialStatus);
  clearExpressionPreviewTimer();
  setExpressionPreviewState(t("expr.preview.empty"));
  syncExpressionEditorFormulaNotes();
  ui.modalResize = null;
  resetExpressionEditorCardPosition();
}

function refreshExpressionEditorValidation() {
  if (!ui.expressionEditor || !expressionEditorTextarea || !expressionEditorApplyBtn) {
    return { ok: true, empty: true };
  }
  if (expressionEditorTitle) {
    const dirtyMain = expressionEditorTextarea.value !== String(ui.expressionEditor.initialValue ?? "");
    const dirtyInitial = Boolean(
      expressionStateInitialInput
      && !expressionStateInitialBlock?.classList.contains("hidden")
      && expressionStateInitialInput.value !== String(ui.expressionEditor.secondaryInitialValue ?? ""),
    );
    const dirty = dirtyMain || dirtyInitial;
    expressionEditorTitle.textContent = `${ui.expressionEditor.baseTitle}${dirty ? " *" : ""}`;
  }
  const mainFieldKey = ui.expressionEditor.fieldKey === "__custom__" ? null : "value";
  const syntaxResult = validateExpressionDraft(expressionEditorTextarea.value, mainFieldKey);
  expressionEditorTextarea.classList.toggle("invalid", !syntaxResult.ok);
  showExpressionStatus(expressionEditorStatus, syntaxResult, false);
  expressionEditorSurface?.classList.toggle("invalid", !syntaxResult.ok);
  let initialSyntaxOk = true;
  if (expressionStateInitialInput && !expressionStateInitialBlock?.classList.contains("hidden")) {
    const initialResult = updateExpressionFieldState(
      expressionStateInitialInput,
      expressionStateInitialStatus,
      expressionStateInitialInput.value,
      true,
      "initial",
    );
    initialSyntaxOk = initialResult.ok;
  } else {
    hideExpressionStatus(expressionStateInitialStatus);
  }
  expressionEditorApplyBtn.disabled = !syntaxResult.ok || !initialSyntaxOk;
  if (expressionEditorSwitchApplyBtn && expressionEditorSwitchModal && !expressionEditorSwitchModal.classList.contains("hidden")) {
    expressionEditorSwitchApplyBtn.disabled = !syntaxResult.ok || !initialSyntaxOk;
  }
  ui.expressionEditor.syntaxOk = syntaxResult.ok && initialSyntaxOk;
  renderExpressionHighlight();
  if (expressionStateInitialInput && expressionStateInitialHighlight && !expressionStateInitialBlock?.classList.contains("hidden")) {
    renderExpressionHighlightFor(expressionStateInitialInput, expressionStateInitialHighlight);
  }
  renderExpressionAutocomplete();
  scheduleExpressionPreviewRefresh(syntaxResult.ok ? 180 : 0);
  showExpressionStatus(
    expressionStateTransitionStatus,
    syntaxResult,
    true,
  );
  return syntaxResult;
}

function lineRangeAroundSelection(textarea) {
  const start = textarea.selectionStart ?? 0;
  const end = textarea.selectionEnd ?? start;
  const value = textarea.value;
  const lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
  let lineEnd = value.indexOf("\n", end);
  if (lineEnd < 0) {
    lineEnd = value.length;
  }
  return { start, end, lineStart, lineEnd };
}

function indentExpressionSelection(textarea, outdent = false) {
  if (!textarea) {
    return;
  }
  const { start, end, lineStart, lineEnd } = lineRangeAroundSelection(textarea);
  const value = textarea.value;
  const block = value.slice(lineStart, lineEnd);
  const lines = block.split("\n");
  let removedBeforeStart = 0;
  let removedTotal = 0;
  const nextLines = lines.map((line, idx) => {
    if (!outdent) {
      return `  ${line}`;
    }
    let removed = 0;
    if (line.startsWith("  ")) {
      removed = 2;
    } else if (line.startsWith("\t")) {
      removed = 1;
    } else if (line.startsWith(" ")) {
      removed = 1;
    }
    if (idx === 0) {
      removedBeforeStart = removed;
    }
    removedTotal += removed;
    return line.slice(removed);
  });
  const replacement = nextLines.join("\n");
  textarea.value = `${value.slice(0, lineStart)}${replacement}${value.slice(lineEnd)}`;
  if (start === end && !outdent) {
    const caret = start + 2;
    textarea.setSelectionRange(caret, caret);
  } else {
    const nextStart = Math.max(lineStart, start + (outdent ? -removedBeforeStart : 2));
    const delta = outdent ? -removedTotal : (2 * lines.length);
    const nextEnd = Math.max(nextStart, end + delta);
    textarea.setSelectionRange(nextStart, nextEnd);
  }
}

function insertExpressionNewlineWithIndent(textarea) {
  if (!textarea) {
    return;
  }
  const start = textarea.selectionStart ?? 0;
  const end = textarea.selectionEnd ?? start;
  const value = textarea.value;
  const lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
  const currentLine = value.slice(lineStart, start);
  const indent = (currentLine.match(/^[ \t]*/) || [""])[0];
  const extraIndent = /[(\[{]$/.test(currentLine.trimEnd()) ? "  " : "";
  const insertion = `\n${indent}${extraIndent}`;
  textarea.value = `${value.slice(0, start)}${insertion}${value.slice(end)}`;
  const caret = start + insertion.length;
  textarea.setSelectionRange(caret, caret);
}

function openExpressionEditor(fieldKey) {
  const node = selectedNodeForSidebar();
  const meta = expressionFieldMeta(fieldKey, node);
  if (!node || !meta || !expressionEditorModal || !expressionEditorTextarea || !expressionEditorTitle) {
    return;
  }
  if (isEditingUiLocked()) {
    return;
  }
  ui.expressionEditor = {
    nodeId: node.id,
    fieldKey: isStateNode(node) ? "value" : meta.key,
    syntaxOk: true,
    baseTitle: expressionEditorBaseTitleForNode(node),
    initialValue: isStateNode(node) ? String(node.valueExpression ?? "") : meta.value,
    secondaryInitialValue: isStateNode(node) ? String(node.initialStateExpression ?? "") : "",
    librarySelectedName: "",
    preferredFocus: fieldKey === "initial" ? "initial" : "main",
    activeEditor: fieldKey === "initial" ? "initial" : "main",
  };
  if (!isStateNode(node)) {
    expressionStateInitialBlock?.classList.add("hidden");
    expressionStateTransitionHead?.classList.add("hidden");
  }
  expressionEditorTitle.textContent = ui.expressionEditor.baseTitle;
  expressionEditorTextarea.value = String(ui.expressionEditor.initialValue ?? "");
  expressionPreviewBox?.classList.add("collapsed");
  expressionPreviewLabel?.setAttribute("aria-expanded", "false");
  expressionEditorModal.classList.remove("hidden");
  resetExpressionEditorCardPosition();
  setExpressionEditorView("editor", { focus: false });
  syncExpressionEditorFormulaNotes();
  setActiveExpressionEditor(isStateNode(node) && fieldKey === "initial" ? "initial" : "main");
  refreshExpressionEditorValidation();
  if (isStateNode(node) && fieldKey === "initial" && expressionStateInitialInput) {
    expressionStateInitialInput.focus();
    expressionStateInitialInput.select();
  } else {
    expressionEditorTextarea.focus();
    expressionEditorTextarea.select();
  }
}

function openNodePrimaryEditor(node) {
  if (!node || isEditingUiLocked()) {
    return;
  }
  if (isSubmodelNode(node)) {
    void openSubmodelNodeInNewTab(node);
    return;
  }
  if (ui.expressionEditor && !expressionEditorModal?.classList.contains("hidden")) {
    selectSingleNode(node.id);
    return;
  }
  selectSingleNode(node.id);
  openExpressionEditor("value");
}

function openCustomExpressionEditor(title, initialValue, onApply) {
  if (!expressionEditorModal || !expressionEditorTextarea || !expressionEditorTitle) {
    return;
  }
  if (isEditingUiLocked()) {
    return;
  }
  ui.expressionEditor = {
    nodeId: null,
    fieldKey: "__custom__",
    syntaxOk: true,
    baseTitle: String(title ?? ""),
    initialValue: String(initialValue ?? ""),
    onApplyCustom: typeof onApply === "function" ? onApply : null,
    librarySelectedName: "",
  };
  expressionStateInitialBlock?.classList.add("hidden");
  expressionStateTransitionHead?.classList.add("hidden");
  expressionPreviewBox?.classList.add("collapsed");
  expressionPreviewLabel?.setAttribute("aria-expanded", "false");
  expressionEditorTitle.textContent = String(title ?? "");
  expressionEditorTextarea.value = String(initialValue ?? "");
  expressionEditorModal.classList.remove("hidden");
  resetExpressionEditorCardPosition();
  setExpressionEditorView("editor", { focus: false });
  syncExpressionEditorFormulaNotes();
  refreshExpressionEditorValidation();
  expressionEditorTextarea.focus();
  expressionEditorTextarea.select();
}

function commitExpressionEditorValue(closeAfter = true) {
  if (!ui.expressionEditor || !ui.expressionEditor.syntaxOk || isEditingUiLocked()) {
    return false;
  }
  if (ui.expressionEditor.fieldKey === "__custom__") {
    const nextValue = expressionEditorTextarea ? expressionEditorTextarea.value : "";
    if (typeof ui.expressionEditor.onApplyCustom === "function") {
      ui.expressionEditor.onApplyCustom(nextValue);
    }
    if (closeAfter) {
      closeExpressionEditor();
    } else {
      ui.expressionEditor.initialValue = nextValue;
      refreshExpressionEditorValidation();
    }
    return true;
  }
  const node = getNodeById(ui.expressionEditor.nodeId);
  const meta = expressionFieldMeta(ui.expressionEditor.fieldKey, node);
  if (!node || !meta || !expressionEditorTextarea) {
    if (closeAfter) {
      closeExpressionEditor();
    }
    return false;
  }
  const nextValue = expressionEditorTextarea.value;
  const nextInitialValue = expressionStateInitialInput && !expressionStateInitialBlock?.classList.contains("hidden")
    ? expressionStateInitialInput.value
    : null;
  const nextShape = ["rect", "ellipse", "diamond", "submodel"].includes(expressionNodeShapeInput?.value)
    ? expressionNodeShapeInput.value
    : node.shape;
  const nameAttempt = semantics.validateNodeName(graph.nodes, expressionNodeNameInput?.value ?? node.name, node.id);
  if (!nameAttempt.ok) {
    expressionNodeNameInput?.classList.add("invalid");
    if (nameAttempt.reason === "duplicate") {
      setStatusKey("error.duplicateNodeName");
    } else if (nameAttempt.reason === "function") {
      setStatusKey("error.functionNodeName");
    } else if (nameAttempt.reason === "reserved") {
      setStatusKey("error.reservedNodeName");
    } else {
      setStatusKey("error.invalidNodeName");
    }
    return false;
  }
  const nextName = nameAttempt.name;
  const nextInput = nextShape === "ellipse" && !nodeHasIncomingEdges(node.id) && Boolean(expressionNodeInputInput?.checked);
  const nextOutput = nextShape === "submodel" ? false : Boolean(expressionNodeOutputInput?.checked);
  const nextGlobal = nextShape === "diamond" && Boolean(expressionNodeGlobalInput?.checked);
  const expressionChanged = (
    nextValue !== meta.value
    || (nextInitialValue != null && nextInitialValue !== String(node.initialStateExpression ?? ""))
  );
  const shapeChanged = nextShape !== node.shape;
  const outputChanged = nextOutput !== Boolean(node.output);
  runAction(() => {
    if (shapeChanged) {
      applyNodeShape(node, nextShape);
    }
    if (!isSubmodelNode(node)) {
      node.valueExpression = String(nextValue ?? "");
    }
    if (nextInitialValue != null && isStateNode(node)) {
      node.initialStateExpression = String(nextInitialValue ?? "");
    }
    const oldName = node.name;
    const wasInput = Boolean(node.input);
    const wasOutput = Boolean(node.output);
    node.name = nextName;
    propagateNodeRenameInExpressions(oldName, node.name);
    node.input = nextInput;
    node.output = nextOutput;
    node.global = nextGlobal;
    if (wasInput && !node.input) {
      removeNodeFromInputWidgetBindings(node.name);
    }
    if ((wasOutput && !node.output) || (outputChanged && !nextOutput)) {
      removeNodeFromAllWidgetDisplays(node.name);
    }
  });
  if (expressionChanged || shapeChanged) {
    resetExecutionAfterEquationChange();
  }
  if (meta.inputEl && document.activeElement !== meta.inputEl) {
    meta.inputEl.value = nextValue;
  }
  updateExpressionFieldState(meta.inputEl, meta.statusEl, nextValue, false, meta.key);
  if (nextInitialValue != null) {
    if (nodeInitialStateInput && document.activeElement !== nodeInitialStateInput) {
      nodeInitialStateInput.value = nextInitialValue;
    }
    updateExpressionFieldState(nodeInitialStateInput, nodeInitialStateStatus, nextInitialValue, false, "initial");
  }
  if (closeAfter) {
    closeExpressionEditor();
  } else {
    ui.expressionEditor.initialValue = nextValue;
    if (nextInitialValue != null) {
      ui.expressionEditor.secondaryInitialValue = nextInitialValue;
    }
    ui.expressionEditor.baseTitle = expressionEditorBaseTitleForNode(node);
    refreshExpressionEditorValidation();
  }
  return true;
}

function applyExpressionEditor() {
  commitExpressionEditorValue(true);
}

function isFirefoxBrowser() {
  return /firefox/i.test(navigator.userAgent || "");
}

function applyI18nToDom() {
  document.documentElement.lang = currentLang;
  populateNodeColorSelect(nodeFillColorInput, NODE_FILL_COLOR_PRESETS);
  populateNodeColorSelect(nodeStrokeColorInput, NODE_STROKE_COLOR_PRESETS);
  populateNodeColorSelect(textFillColorInput, TEXT_FILL_COLOR_PRESETS);
  populateNodeColorSelect(textStrokeColorInput, TEXT_STROKE_COLOR_PRESETS);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) {
      return;
    }
    const text = t(key);
    if (el.tagName === "TITLE") {
      document.title = applicationWindowTitle();
    } else {
      el.textContent = text;
    }
  });
  document.querySelectorAll("[data-title-i18n]").forEach((el) => {
    const key = el.getAttribute("data-title-i18n");
    if (!key) {
      return;
    }
    setTooltipText(el, t(key));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (!key || !("placeholder" in el)) {
      return;
    }
    el.placeholder = t(key);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria-label");
    if (!key) {
      return;
    }
    el.setAttribute("aria-label", t(key));
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    if (!key) {
      return;
    }
    el.setAttribute("alt", t(key));
  });
  renderRecentModelsMenu();
  updateFileStatusLabel(dirtySinceLastSave);
}

function applyI18nTooltipsToSubtree(root) {
  if (!root || !(root instanceof Element)) {
    return;
  }
  root.querySelectorAll("[data-title-i18n]").forEach((el) => {
    const key = el.getAttribute("data-title-i18n");
    if (!key) {
      return;
    }
    setTooltipText(el, t(key));
  });
}

function applyInterfaceLanguage(rawLanguage, refreshUi = false) {
  currentLang = normalizeSupportedLanguage(rawLanguage) || "en";
  const bundledCurrent = bundledI18nMessages(currentLang);
  if (bundledCurrent) {
    i18n = bundledCurrent;
  } else if (currentLang !== "en") {
    currentLang = "en";
    i18n = bundledI18nMessages("en") || {};
  } else {
    i18n = {};
  }
  applyI18nToDom();
  updateDesktopSidebarUi();
  if (!expressionEditorModal?.classList.contains("hidden")) {
    refreshExpressionEditorValidation();
  }
  if (!functionsHelpModal?.classList.contains("hidden")) {
    renderFunctionsHelp();
  }
  if (!presentationGroupsModal?.classList.contains("hidden")) {
    renderPresentationGroupsEditor();
  }
  if (!localFunctionsModal?.classList.contains("hidden")) {
    renderLocalFunctionsEditor();
  }
  if (!watchDebuggerModal?.classList.contains("hidden")) {
    renderWatchDebugger();
  }
  refreshWorkspaceTabBar();
  if (refreshUi) {
    syncViewOptionsInputs();
    refreshSidebar();
    render();
  }
}

async function loadI18n() {
  applyInterfaceLanguage(await resolveLangFromUrl());
}

function setStatus(text, severity = "info") {
  const normalizedSeverity = severity === true
    ? "error"
    : (severity === "warning" || severity === "error" ? severity : "info");
  const isNotice = normalizedSeverity === "warning" || normalizedSeverity === "error";
  const message = String(text ?? "");
  statusText.textContent = message;
  statusText.classList.toggle("is-visible", isNotice && Boolean(message));
  statusText.classList.toggle("warning", normalizedSeverity === "warning");
  statusText.classList.toggle("error", normalizedSeverity === "error");
  refreshActiveTooltip();
  const activeTab = currentWorkspaceTab();
  if (activeTab?.state?.context) {
    activeTab.state.context.statusMessage = message;
  }
  syncSubmodelWorkspaceTabsFromActiveParent();
}

function hideStatusNotice() {
  statusText.classList.remove("is-visible", "warning", "error");
}

statusText?.addEventListener("click", hideStatusNotice);

function setStatusKey(key, vars = null, severity = null) {
  const inferredSeverity = severity || (String(key).startsWith("error.") ? "error" : "info");
  setStatus(t(key, vars), inferredSeverity);
}

function displayFileName() {
  return currentFileName || t("file.unnamed");
}

function isCompactTabletLayout() {
  const narrowViewport = window.matchMedia("(max-width: 1100px)").matches;
  const coarsePrimaryPointer = window.matchMedia("(pointer: coarse)").matches;
  const noPrimaryHover = window.matchMedia("(hover: none)").matches;
  const touchPrimaryDevice = coarsePrimaryPointer && noPrimaryHover;
  return narrowViewport || touchPrimaryDevice;
}

function isTabletCanvasPanMode() {
  return isCompactTabletLayout() && ui.tabletCanvasMode === "pan";
}

function isCompactTouchPointerEvent(evt) {
  return isCompactTabletLayout() && evt?.pointerType === "touch";
}

function isBackgroundTouchCanvasTarget(target) {
  return !target?.closest?.(".node, .value-widget, .canvas-text-item, .edge, .control-point, .resize-handle, input, select, button, textarea, .menu-bar, .sidebar, .context-menu, .modal-backdrop, .modal-card");
}

function clearTouchViewportGesture() {
  ui.touchViewportGesture = null;
}

function ensureTouchViewportGesture() {
  if (!ui.touchViewportGesture) {
    ui.touchViewportGesture = {
      pointers: new Map(),
      mode: null,
      startClientX: 0,
      startClientY: 0,
      startScrollLeft: 0,
      startScrollTop: 0,
      startZoom: ui.zoom,
      startDistance: 0,
      lastDistance: 0,
      lastMidClientX: 0,
      lastMidClientY: 0,
      target: null,
    };
  }
  return ui.touchViewportGesture;
}

function touchGestureDistance(a, b) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function touchGestureMidpoint(a, b) {
  return {
    x: (a.clientX + b.clientX) / 2,
    y: (a.clientY + b.clientY) / 2,
  };
}

function refreshTouchViewportGestureMode() {
  const gesture = ui.touchViewportGesture;
  if (!gesture) {
    return;
  }
  const points = [...gesture.pointers.values()];
  if (points.length >= 2) {
    const [a, b] = points;
    const mid = touchGestureMidpoint(a, b);
    const dist = touchGestureDistance(a, b);
    gesture.mode = "pinch";
    gesture.startZoom = ui.zoom;
    gesture.startDistance = Math.max(1, dist);
    gesture.lastDistance = Math.max(1, dist);
    gesture.lastMidClientX = mid.x;
    gesture.lastMidClientY = mid.y;
    return;
  }
  if (points.length === 1) {
    const [point] = points;
    gesture.mode = "pan";
    gesture.startClientX = point.clientX;
    gesture.startClientY = point.clientY;
    gesture.startScrollLeft = graphViewport.scrollLeft;
    gesture.startScrollTop = graphViewport.scrollTop;
    return;
  }
  clearTouchViewportGesture();
}

function updateTabletCanvasModeUi() {
  const panMode = isTabletCanvasPanMode();
  document.body.classList.toggle("tablet-canvas-pan", panMode);
  if (tabletModeBtn) {
    tabletModeBtn.textContent = panMode ? "✋" : "✎";
    tabletModeBtn.classList.toggle("active", panMode);
    setTooltipText(tabletModeBtn, t(panMode ? "action.tabletCanvasPan" : "action.tabletCanvasEdit"));
  }
}

function updateTabletSidebarHeaderUi() {
  const expanded = isCompactTabletLayout() && ui.tabletSidebarExpanded;
  document.body.classList.toggle("tablet-sidebar-expanded", expanded);
  if (tabletSidebarExpandBtn) {
    tabletSidebarExpandBtn.textContent = expanded ? "▾" : "▴";
    tabletSidebarExpandBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
    tabletSidebarExpandBtn.title = expanded ? "Riduci pannello" : "Espandi pannello";
  }
  if (tabletSidebarCloseBtn) {
    tabletSidebarCloseBtn.title = t("action.close");
  }
}

function updateDesktopSidebarUi() {
  const collapsed = !isCompactTabletLayout() && ui.sidebarCollapsed;
  document.body.classList.toggle("sidebar-collapsed", collapsed);
  if (sidebar) {
    sidebar.inert = collapsed;
    sidebar.setAttribute("aria-hidden", collapsed ? "true" : "false");
  }
  if (sidebarCollapseBtn) {
    sidebarCollapseBtn.setAttribute("aria-expanded", collapsed ? "false" : "true");
    sidebarCollapseBtn.setAttribute("aria-label", t("sidebar.collapse"));
    sidebarCollapseBtn.title = t("sidebar.collapse");
  }
  if (sidebarExpandBtn) {
    sidebarExpandBtn.setAttribute("aria-expanded", collapsed ? "false" : "true");
    sidebarExpandBtn.setAttribute("aria-label", t("sidebar.expand"));
    sidebarExpandBtn.title = t("sidebar.expand");
  }
}

function setSidebarCollapsed(collapsed) {
  ui.sidebarCollapsed = Boolean(collapsed);
  updateDesktopSidebarUi();
  window.requestAnimationFrame(() => updateCanvasSize());
}

function setTabletCanvasMode(mode) {
  ui.tabletCanvasMode = mode === "pan" ? "pan" : "edit";
  updateTabletCanvasModeUi();
}

function clearTouchHold() {
  if (ui.touchHold?.timerId != null) {
    window.clearTimeout(ui.touchHold.timerId);
  }
  ui.touchHold = null;
}

function startTouchHold(evt, onTrigger, moveTolerance = 12, delayMs = 520) {
  if (!isCompactTouchPointerEvent(evt) || typeof onTrigger !== "function") {
    return false;
  }
  clearTouchHold();
  const hold = {
    pointerId: evt.pointerId,
    startClientX: evt.clientX,
    startClientY: evt.clientY,
    lastClientX: evt.clientX,
    lastClientY: evt.clientY,
    moveTolerance,
    triggered: false,
    onTrigger,
    timerId: window.setTimeout(() => {
      if (!ui.touchHold || ui.touchHold !== hold) {
        return;
      }
      hold.triggered = true;
      hold.onTrigger({
        clientX: hold.lastClientX,
        clientY: hold.lastClientY,
        pointerId: hold.pointerId,
      });
      clearTouchHold();
    }, delayMs),
  };
  ui.touchHold = hold;
  return true;
}

function applyResponsiveUiState() {
  const compact = isCompactTabletLayout();
  const open = compact && ui.tabletSidebarOpen;
  document.body.classList.toggle("tablet-sidebar-layout", compact);
  document.body.classList.toggle("tablet-sidebar-open", open);
  document.body.classList.toggle("tablet-sidebar-expanded", compact && open && ui.tabletSidebarExpanded);
  if (tabletSidebarBackdrop) {
    tabletSidebarBackdrop.classList.toggle("hidden", !open);
  }
  if (tabletSidebarToggle) {
    tabletSidebarToggle.classList.toggle("active", open);
    tabletSidebarToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (tabletSidebarHeader) {
    tabletSidebarHeader.classList.toggle("hidden", !compact);
  }
  updateDesktopSidebarUi();
  updateTabletSidebarHeaderUi();
  updateTabletCanvasModeUi();
}

function setTabletSidebarOpen(open) {
  ui.tabletSidebarOpen = Boolean(open);
  if (!ui.tabletSidebarOpen) {
    ui.tabletSidebarExpanded = false;
  }
  applyResponsiveUiState();
}

function setTabletSidebarExpanded(expanded) {
  ui.tabletSidebarExpanded = Boolean(expanded);
  if (ui.tabletSidebarExpanded && !ui.tabletSidebarOpen) {
    ui.tabletSidebarOpen = true;
  }
  applyResponsiveUiState();
}

function bindModalDragHandle(modalRoot, cardSelector) {
  if (!modalRoot) {
    return;
  }
  const modalHead = modalRoot.querySelector(".modal-head");
  const modalCard = modalRoot.querySelector(cardSelector);
  if (!modalHead || !modalCard) {
    return;
  }
  modalHead.addEventListener("pointerdown", (evt) => {
    if (evt.target.closest("button")) {
      return;
    }
    if (isCompactTouchPointerEvent(evt)) {
      return;
    }
    const rect = modalCard.getBoundingClientRect();
    modalCard.style.transform = "none";
    modalCard.style.left = `${rect.left}px`;
    modalCard.style.top = `${rect.top}px`;
    ui.modalDrag = {
      pointerId: evt.pointerId,
      offsetX: evt.clientX - rect.left,
      offsetY: evt.clientY - rect.top,
      card: modalCard,
    };
    evt.currentTarget?.setPointerCapture?.(evt.pointerId);
  });
}

function revealSidebarForCompactLayout() {
  if (isCompactTabletLayout()) {
    setTabletSidebarOpen(true);
  }
}

function displayFileNameFromContext(context) {
  const fileName = String(context?.currentFileName || "").trim();
  if (fileName) {
    return fileName.replace(/\.json$/i, "");
  }
  const modelTitle = String(context?.data?.modelTitle || "").trim();
  return modelTitle || t("file.unnamed");
}

function workspaceTabMetaText(tab) {
  const meta = tab?.meta;
  if (!meta || meta.kind !== "submodel") {
    return "";
  }
  const parentTab = meta.parentTabId != null ? getWorkspaceTabById(meta.parentTabId) : null;
  const parentLabel = parentTab
    ? displayFileNameFromContext(parentTab.state?.context)
    : String(meta.parentTitle || "").trim();
  const nodeName = String(meta.parentNodeName || "").trim();
  if (!nodeName && !parentLabel) {
    return "";
  }
  return t("tab.meta.submodel", {
    node: nodeName || t("text.unnamed"),
    parent: parentLabel || t("file.unnamed"),
  });
}

function getWorkspaceTabById(tabId) {
  return workspace.tabs.find((tab) => tab.id === tabId) || null;
}

function currentWorkspaceTab() {
  return getWorkspaceTabById(workspace.activeTabId);
}

function collectWorkspaceDescendantTabIds(tabId) {
  const descendants = [];
  const visit = (parentId) => {
    workspace.tabs
      .filter((tab) => tab?.meta?.parentTabId === parentId)
      .forEach((childTab) => {
        descendants.push(childTab.id);
        visit(childTab.id);
      });
  };
  visit(tabId);
  return descendants;
}

function workspaceContextHasUnsavedChanges(context) {
  if (!context) {
    return false;
  }
  try {
    return JSON.stringify(context.data) !== String(context.lastSavedSnapshot || "");
  } catch (_err) {
    return Boolean(context.dirtySinceLastSave);
  }
}

function isInitialEmptyWorkspaceTab(tab) {
  const context = tab?.state?.context;
  const data = context?.data;
  if (
    workspace.tabs.length !== 1
    || !context
    || !data
    || tab?.meta
    || context.currentFileHandle
    || String(context.currentFileName || "").trim()
    || workspaceContextHasUnsavedChanges(context)
  ) {
    return false;
  }
  return (
    !String(data.modelTitle || "").trim()
    && !data.dashboard
    && [
      data.nodes,
      data.edges,
      data.textItems,
      data.widgets,
      data.modelProperties,
      data.localFunctions,
      data.presentationGroups,
    ].every((items) => !Array.isArray(items) || items.length === 0)
  );
}

function cloneRuntimeNodeState(node) {
  if (!node) {
    return null;
  }
  return {
    id: Number(node.id),
    computedValue: deepClone(node.computedValue),
    computedError: String(node.computedError || ""),
    pendingStateValue: deepClone(node.pendingStateValue),
    pendingStateError: String(node.pendingStateError || ""),
    submodelError: String(node.submodelError || ""),
    runtimeSubmodelPath: String(node.__runtimeSubmodelPath || ""),
    runtimeSubmodel: node.__runtimeSubmodel ? cloneRuntimeModel(node.__runtimeSubmodel) : null,
  };
}

function cloneRuntimeWidgetState(widget) {
  if (!widget) {
    return null;
  }
  const state = {
    id: Number(widget.id),
    type: String(widget.type || ""),
  };
  if (widget.type === "slider") {
    state.value = Number(widget.value);
  }
  if (widget.type === "button") {
    state.value = Boolean(widget.value);
  }
  if (widget.type === "select") {
    state.value = Number(widget.value);
  }
  if (widget.type === "table") {
    state.rows = Array.isArray(widget.rows) ? deepClone(widget.rows) : [];
  }
  if (widget.type === "matrix") {
    state.lastMatrixValue = Array.isArray(widget.lastMatrixValue) ? deepClone(widget.lastMatrixValue) : null;
  }
  if (widget.type === "xychart") {
    state.xyPairs = Array.isArray(widget.xyPairs)
      ? widget.xyPairs.map((pair) => ({
        xSource: String(pair?.xSource ?? "time"),
        ySource: String(pair?.ySource ?? ""),
        points: Array.isArray(pair?.points) ? deepClone(pair.points) : [],
        seriesData: Array.isArray(pair?.seriesData) ? deepClone(pair.seriesData) : [],
        instantSeriesData: Array.isArray(pair?.instantSeriesData) ? deepClone(pair.instantSeriesData) : [],
      }))
      : [];
  }
  return state;
}

function cloneEmptyRuntimeNodeStateFromDataNode(node) {
  return {
    id: Number(node?.id),
    computedValue: null,
    computedError: "",
    pendingStateValue: null,
    pendingStateError: "",
    submodelError: "",
    runtimeSubmodelPath: "",
    runtimeSubmodel: null,
  };
}

function buildNodeMapFromRuntimeNodes(nodes = []) {
  return new Map((Array.isArray(nodes) ? nodes : []).map((node) => [String(node?.name ?? ""), node]));
}

function buildChartPairSeriesDefinitionsForSync(pair, xValue, yValue) {
  const finiteScalar = (value) => typeof value === "number" && Number.isFinite(value);
  const finiteVector = (value) => Array.isArray(value) && value.every((item) => finiteScalar(item));
  if (finiteScalar(xValue) && finiteScalar(yValue)) {
    return [{ label: `${pair.xSource} -> ${pair.ySource}`, point: { x: xValue, y: yValue } }];
  }
  if (finiteScalar(xValue) && finiteVector(yValue)) {
    return yValue.map((item) => ({
      label: `${pair.xSource} -> ${pair.ySource}`,
      point: { x: xValue, y: item },
    }));
  }
  if (finiteVector(xValue) && finiteVector(yValue) && xValue.length === yValue.length) {
    return xValue.map((xItem, idx) => ({
      label: `${pair.xSource} -> ${pair.ySource}`,
      point: { x: xItem, y: yValue[idx] },
    }));
  }
  return [];
}

function buildChartPairInstantSeriesDefinitionsForSync(pair, xValue, yValue) {
  const finiteScalar = (value) => typeof value === "number" && Number.isFinite(value);
  const finiteVector = (value) => Array.isArray(value) && value.every((item) => finiteScalar(item));
  if (finiteScalar(xValue) && finiteVector(yValue)) {
    return [{
      label: `${pair.xSource} -> ${pair.ySource}`,
      points: yValue.map((item) => ({ x: xValue, y: item })),
    }];
  }
  if (finiteVector(xValue) && finiteVector(yValue) && xValue.length === yValue.length) {
    return [{
      label: `${pair.xSource} -> ${pair.ySource}`,
      points: xValue.map((xItem, idx) => ({ x: xItem, y: yValue[idx] })),
    }];
  }
  return [];
}

function buildSubmodelSimulationHistory(prevHistory, runtimeModel) {
  const currentTime = Number(runtimeModel?.execution?.currentTime);
  if (!Number.isFinite(currentTime)) {
    return [];
  }
  const outputNodes = (runtimeModel?.nodes || []).filter((node) => node.output);
  if (!outputNodes.length) {
    return [];
  }
  const history = Array.isArray(prevHistory) ? deepClone(prevHistory) : [];
  const lastTime = history.length ? Number(history[history.length - 1]?.time) : null;
  if (lastTime != null && Math.abs(lastTime - currentTime) < 1e-12) {
    return history;
  }
  history.push({
    time: currentTime,
    values: Object.fromEntries(outputNodes.map((node) => [
      node.name,
      {
        value: cloneSimulationOutputValue(node.computedValue),
        error: String(node.computedError || ""),
      },
    ])),
  });
  return history;
}

function buildSyncedWidgetRuntimeStates(widgetDefs, runtimeNodes, timeValue, previousStates = []) {
  const nodeMap = buildNodeMapFromRuntimeNodes(runtimeNodes);
  const previousById = new Map((Array.isArray(previousStates) ? previousStates : []).map((state) => [Number(state?.id), state]));
  return (Array.isArray(widgetDefs) ? widgetDefs : []).map((widget) => {
    const prev = previousById.get(Number(widget?.id)) || null;
    if (widget?.type === "table") {
      const state = cloneRuntimeWidgetState(widget) || { id: Number(widget?.id), type: "table", rows: [] };
      state.rows = Array.isArray(prev?.rows) ? deepClone(prev.rows) : [];
      state.lastSyncedTime = Number(prev?.lastSyncedTime);
      if (widget.showHistory && Number.isFinite(timeValue) && state.lastSyncedTime !== timeValue) {
        const displayedCols = widget.outputOnly
          ? (Array.isArray(widget.columns) ? widget.columns.filter((name) => name === "time" || nodeMap.get(name)?.output) : [])
          : (Array.isArray(widget.columns) ? widget.columns.slice() : []);
        const values = {};
        displayedCols.forEach((colName) => {
          if (colName === "time") {
            values.time = { value: timeValue };
            return;
          }
          const node = nodeMap.get(colName);
          if (!node) {
            values[colName] = { value: null };
          } else if (node.computedError) {
            values[colName] = { error: node.computedError };
          } else {
            values[colName] = { value: cloneSimulationOutputValue(node.computedValue) };
          }
        });
        state.rows.push({ values });
        state.lastSyncedTime = timeValue;
      }
      return state;
    }
    if (widget?.type === "xychart") {
      const state = cloneRuntimeWidgetState(widget) || { id: Number(widget?.id), type: "xychart", xyPairs: [] };
      const prevPairs = new Map((Array.isArray(prev?.xyPairs) ? prev.xyPairs : []).map((pair) => [
        `${String(pair?.xSource ?? "time")}__${String(pair?.ySource ?? "")}`,
        pair,
      ]));
      state.xyPairs = (Array.isArray(widget.xyPairs) ? widget.xyPairs : []).map((pair) => {
        const pairKey = `${String(pair?.xSource ?? "time")}__${String(pair?.ySource ?? "")}`;
        const prevPair = prevPairs.get(pairKey) || null;
        const nextPair = {
          xSource: String(pair?.xSource ?? "time"),
          ySource: String(pair?.ySource ?? ""),
          points: Array.isArray(prevPair?.points) ? deepClone(prevPair.points) : [],
          seriesData: Array.isArray(prevPair?.seriesData) ? deepClone(prevPair.seriesData) : [],
          instantSeriesData: [],
          lastSyncedTime: Number(prevPair?.lastSyncedTime),
        };
        const xAllowed = !widget.outputOnly || nextPair.xSource === "time" || nodeMap.get(nextPair.xSource)?.output;
        const yAllowed = !widget.outputOnly || nextPair.ySource === "time" || nodeMap.get(nextPair.ySource)?.output;
        const xNode = nextPair.xSource === "time" ? null : nodeMap.get(nextPair.xSource);
        const yNode = nextPair.ySource === "time" ? null : nodeMap.get(nextPair.ySource);
        if (!xAllowed || !yAllowed || (xNode && xNode.computedError) || (yNode && yNode.computedError)) {
          nextPair.instantSeriesData = Array.isArray(prevPair?.instantSeriesData) ? deepClone(prevPair.instantSeriesData) : [];
          return nextPair;
        }
        const xVal = nextPair.xSource === "time" ? timeValue : xNode?.computedValue;
        const yVal = nextPair.ySource === "time" ? timeValue : yNode?.computedValue;
        nextPair.instantSeriesData = pair?.showInstantProfile
          ? buildChartPairInstantSeriesDefinitionsForSync(nextPair, xVal, yVal)
          : [];
        if (pair?.showTimeSeries !== false && Number.isFinite(timeValue) && nextPair.lastSyncedTime !== timeValue) {
          const defs = buildChartPairSeriesDefinitionsForSync(nextPair, xVal, yVal);
          defs.forEach((seriesDef, idx) => {
            if (!nextPair.seriesData[idx] || nextPair.seriesData[idx].label !== seriesDef.label) {
              nextPair.seriesData[idx] = { label: seriesDef.label, points: [] };
            }
            nextPair.seriesData[idx].points.push(seriesDef.point);
          });
          if (nextPair.seriesData.length > defs.length) {
            nextPair.seriesData = nextPair.seriesData.slice(0, defs.length);
          }
          nextPair.lastSyncedTime = timeValue;
        } else if (pair?.showTimeSeries === false) {
          nextPair.seriesData = [];
        }
        return nextPair;
      });
      return state;
    }
    if (widget?.type === "matrix") {
      const state = cloneRuntimeWidgetState(widget) || { id: Number(widget?.id), type: "matrix", lastMatrixValue: null };
      const sourceNode = nodeMap.get(String(widget?.source ?? ""));
      state.lastMatrixValue = Array.isArray(sourceNode?.computedValue) ? deepClone(sourceNode.computedValue) : state.lastMatrixValue;
      return state;
    }
    return cloneRuntimeWidgetState(widget);
  }).filter(Boolean);
}

function syncSubmodelWorkspaceTabsFromActiveParent() {
  const parentTabId = workspace.activeTabId;
  if (parentTabId == null) {
    return;
  }
  workspace.tabs.forEach((tab) => {
    if (tab?.meta?.kind !== "submodel" || tab.meta.parentTabId !== parentTabId) {
      return;
    }
    const parentNode = graph.nodes.find((node) => isSubmodelNode(node) && node.name === tab.meta.parentNodeName);
    const runtimeModel = parentNode?.__runtimeSubmodel;
    if (!runtimeModel) {
      return;
    }
    const previousRuntimeState = tab.state?.runtimeState || {};
    const currentTime = Number(runtimeModel.execution?.currentTime);
    const previousTime = Number(previousRuntimeState.executionCurrentTime);
    const restartDetected =
      Number.isFinite(currentTime)
      && Number.isFinite(previousTime)
      && currentTime < previousTime - Math.max(1e-12, Math.abs(currentTime) * 1e-9);
    const widgetPrevStates = restartDetected ? [] : (previousRuntimeState.widgetStates || []);
    const historyPrev = restartDetected ? [] : (previousRuntimeState.simulationHistory || []);
    tab.state.runtimeState = {
      executionCurrentTime: runtimeModel.execution?.currentTime == null ? null : deepClone(runtimeModel.execution.currentTime),
      simulationHistory: buildSubmodelSimulationHistory(historyPrev, runtimeModel),
      readDataCache: deepClone(runtimeModel.__readDataCache || Object.create(null)),
      nodeStates: (runtimeModel.nodes || []).map((node) => cloneRuntimeNodeState(node)),
      widgetStates: buildSyncedWidgetRuntimeStates(tab.state?.context?.data?.widgets || [], runtimeModel.nodes || [], currentTime, widgetPrevStates),
    };
    tab.state.context.statusMessage = String(statusText?.textContent || "");
    if (tab.state.context?.data?.execution) {
      tab.state.context.data.execution.currentTime = runtimeModel.execution?.currentTime == null ? null : deepClone(runtimeModel.execution.currentTime);
    }
  });
}

function captureRuntimeStateSnapshot() {
  return {
    executionCurrentTime: graph.execution.currentTime == null ? null : deepClone(graph.execution.currentTime),
    simulationHistory: deepClone(graph.__simulationHistory || []),
    readDataCache: deepClone(graph.__readDataCache || Object.create(null)),
    nodeStates: graph.nodes.map((node) => cloneRuntimeNodeState(node)),
    widgetStates: graph.widgets.map((widget) => cloneRuntimeWidgetState(widget)),
  };
}

function applyRuntimeStateSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== "object") {
    return;
  }
  graph.execution.currentTime = snapshot.executionCurrentTime == null ? null : deepClone(snapshot.executionCurrentTime);
  graph.__simulationHistory = Array.isArray(snapshot.simulationHistory) ? deepClone(snapshot.simulationHistory) : [];
  graph.__readDataCache = snapshot.readDataCache && typeof snapshot.readDataCache === "object"
    ? deepClone(snapshot.readDataCache)
    : Object.create(null);
  const nodeStateById = new Map(
    Array.isArray(snapshot.nodeStates)
      ? snapshot.nodeStates.map((entry) => [Number(entry?.id), entry])
      : [],
  );
  const widgetStateById = new Map(
    Array.isArray(snapshot.widgetStates)
      ? snapshot.widgetStates.map((entry) => [Number(entry?.id), entry])
      : [],
  );
  graph.nodes.forEach((node) => {
    const saved = nodeStateById.get(Number(node.id));
    node.computedValue = saved ? deepClone(saved.computedValue) : null;
    node.computedError = saved ? String(saved.computedError || "") : "";
    node.pendingStateValue = saved ? deepClone(saved.pendingStateValue) : null;
    node.pendingStateError = saved ? String(saved.pendingStateError || "") : "";
    node.submodelError = saved ? String(saved.submodelError || "") : "";
    node.__runtimeSubmodelPath = saved ? String(saved.runtimeSubmodelPath || "") : "";
    node.__runtimeSubmodel = saved?.runtimeSubmodel ? cloneRuntimeModel(saved.runtimeSubmodel) : null;
  });
  graph.widgets.forEach((widget) => {
    const saved = widgetStateById.get(Number(widget.id));
    if (!saved) {
      if (widget.type === "table") {
        widget.rows = [];
      } else if (widget.type === "matrix") {
        widget.lastMatrixValue = null;
      } else if (widget.type === "xychart" && Array.isArray(widget.xyPairs)) {
        widget.xyPairs.forEach((pair) => {
          pair.points = [];
          pair.seriesData = [];
          pair.instantSeriesData = [];
        });
      }
      return;
    }
    if (widget.type === "slider") {
      widget.value = Number(saved.value);
    } else if (widget.type === "button") {
      widget.value = Boolean(saved.value);
    } else if (widget.type === "select") {
      widget.value = Number(saved.value);
    }
    if (widget.type === "table") {
      widget.rows = Array.isArray(saved.rows) ? deepClone(saved.rows) : [];
    } else if (widget.type === "matrix") {
      widget.lastMatrixValue = Array.isArray(saved.lastMatrixValue) ? deepClone(saved.lastMatrixValue) : null;
    } else if (widget.type === "xychart" && Array.isArray(widget.xyPairs)) {
      const savedPairs = Array.isArray(saved.xyPairs) ? saved.xyPairs : [];
      const savedPairByKey = new Map(
        savedPairs.map((pair) => [`${String(pair?.xSource ?? "time")}__${String(pair?.ySource ?? "")}`, pair]),
      );
      widget.xyPairs.forEach((pair) => {
        const pairKey = `${String(pair?.xSource ?? "time")}__${String(pair?.ySource ?? "")}`;
        const savedPair = savedPairByKey.get(pairKey);
        pair.points = Array.isArray(savedPair?.points) ? deepClone(savedPair.points) : [];
        pair.seriesData = Array.isArray(savedPair?.seriesData) ? deepClone(savedPair.seriesData) : [];
        pair.instantSeriesData = Array.isArray(savedPair?.instantSeriesData) ? deepClone(savedPair.instantSeriesData) : [];
      });
    }
  });
}

function captureWorkspaceTabState() {
  return {
    context: captureCurrentModelContext(),
    runtimeState: captureRuntimeStateSnapshot(),
  };
}

function restoreWorkspaceTabState(state) {
  if (!state?.context) {
    return;
  }
  restoreModelContext(state.context);
  applyRuntimeStateSnapshot(state.runtimeState);
  render();
}

function saveActiveWorkspaceTabState() {
  const tab = currentWorkspaceTab();
  if (!tab) {
    return;
  }
  tab.state = captureWorkspaceTabState();
  refreshWorkspaceTabBar();
}

function createWorkspaceTabFromCurrentState(options = {}) {
  const tab = {
    id: workspace.nextTabId++,
    state: captureWorkspaceTabState(),
    meta: options.meta ? deepClone(options.meta) : null,
  };
  workspace.tabs.push(tab);
  if (options.activate !== false) {
    workspace.activeTabId = tab.id;
  }
  refreshWorkspaceTabBar();
  return tab;
}

function refreshWorkspaceTabBar() {
  if (!workspaceTabBar) {
    return;
  }
  workspaceTabBar.innerHTML = "";
  workspace.tabs.forEach((tab) => {
    const item = document.createElement("div");
    item.className = `workspace-tab${tab.id === workspace.activeTabId ? " active" : ""}${workspaceContextHasUnsavedChanges(tab.state?.context) ? " workspace-tab-dirty" : ""}`;
    const tabTitle = displayFileNameFromContext(tab.state?.context);
    const tabMeta = workspaceTabMetaText(tab);
    item.title = tabMeta ? `${tabTitle}\n${tabMeta}` : tabTitle;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "workspace-tab-btn";
    button.dataset.tabId = String(tab.id);
    button.title = item.title;

    const textWrap = document.createElement("span");
    textWrap.className = "workspace-tab-text";

    const label = document.createElement("span");
    label.className = "workspace-tab-label";
    label.textContent = tabTitle;
    textWrap.appendChild(label);
    if (tabMeta) {
      const meta = document.createElement("span");
      meta.className = "workspace-tab-meta";
      meta.textContent = tabMeta;
      textWrap.appendChild(meta);
    }
    button.appendChild(textWrap);
    item.appendChild(button);

    const close = document.createElement("button");
    close.type = "button";
    close.className = "workspace-tab-close";
    close.dataset.tabCloseId = String(tab.id);
    close.textContent = "×";
    close.setAttribute("aria-label", t("action.closeTab"));
    close.title = t("action.closeTab");
    item.appendChild(close);

    workspaceTabBar.appendChild(item);
  });
}

function closeDocumentTransientUi() {
  closeTopMenus();
  hideContextMenu();
  closeExpressionEditor();
  closeTextEditor();
  closeFunctionsHelp();
  closeAboutApp();
  closeModelAnalysis();
  closeModelAnalysisChecksHelp();
  closeFunctionalLoopDiagram();
  closeWatchDebugger();
  closeLocalFunctionsEditor();
  closePresentationGroupsEditor();
}

function switchWorkspaceTab(tabId) {
  if (tabId === workspace.activeTabId) {
    return true;
  }
  const nextTab = getWorkspaceTabById(tabId);
  if (!nextTab) {
    return false;
  }
  saveActiveWorkspaceTabState();
  closeDocumentTransientUi();
  workspace.activeTabId = nextTab.id;
  restoreWorkspaceTabState(nextTab.state);
  refreshWorkspaceTabBar();
  return true;
}

async function ensureWorkspaceTabSavedBeforeClose(tabId) {
  const tab = getWorkspaceTabById(tabId);
  if (!tab || !workspaceContextHasUnsavedChanges(tab.state?.context)) {
    return true;
  }
  const shouldSave = window.confirm(t("confirm.closeTab.save"));
  if (!shouldSave) {
    return true;
  }
  if (workspace.activeTabId !== tabId) {
    switchWorkspaceTab(tabId);
  }
  return saveGraphJson(false);
}

async function ensureWorkspaceTabsSavedBeforeClose(tabIds) {
  const uniqueIds = [...new Set((Array.isArray(tabIds) ? tabIds : []).map((id) => Number(id)).filter(Number.isFinite))];
  for (const id of uniqueIds) {
    const saved = await ensureWorkspaceTabSavedBeforeClose(id);
    if (!saved) {
      return false;
    }
  }
  return true;
}

async function closeWorkspaceTab(tabId) {
  const tab = getWorkspaceTabById(tabId);
  if (!tab) {
    return false;
  }
  saveActiveWorkspaceTabState();
  const descendantIds = collectWorkspaceDescendantTabIds(tabId);
  const tabsToClose = [tabId, ...descendantIds];
  const originalTabIds = workspace.tabs.map((entry) => entry.id);
  const originalCloseIndex = originalTabIds.indexOf(tabId);
  const saved = await ensureWorkspaceTabsSavedBeforeClose(tabsToClose);
  if (!saved) {
    return false;
  }
  const activeTabWillClose = tabsToClose.includes(workspace.activeTabId);
  workspace.tabs = workspace.tabs.filter((entry) => !tabsToClose.includes(entry.id));
  if (workspace.tabs.length === 0) {
    resetGraphToEmptyModel();
    createWorkspaceTabFromCurrentState({ activate: true });
    setStatusKey("status.newGraph");
    render();
    window.requestAnimationFrame(() => {
      markSavedSnapshot();
    });
    return true;
  }
  if (!activeTabWillClose) {
    refreshWorkspaceTabBar();
    return true;
  }
  const remainingIds = new Set(workspace.tabs.map((entry) => entry.id));
  const rightCandidate = originalTabIds.slice(originalCloseIndex + 1).find((id) => remainingIds.has(id));
  const leftCandidate = originalTabIds.slice(0, Math.max(0, originalCloseIndex)).reverse().find((id) => remainingIds.has(id));
  const nextTabId = rightCandidate || leftCandidate || workspace.tabs[0]?.id || null;
  if (nextTabId == null) {
    return false;
  }
  const nextTab = getWorkspaceTabById(nextTabId) || workspace.tabs[0];
  workspace.activeTabId = nextTab.id;
  restoreWorkspaceTabState(nextTab.state);
  // Restoring a parent tab also restores a snapshot without live submodels.
  // Rebuild its t0 preview so nodes fed by a submodel are immediately valid.
  await preloadSubmodelsAfterLoad();
  refreshWorkspaceTabBar();
  setStatusKey("status.tabClosed");
  return true;
}

async function closeActiveWorkspaceTab() {
  const activeTab = currentWorkspaceTab();
  if (!activeTab) {
    return false;
  }
  return closeWorkspaceTab(activeTab.id);
}

async function saveAllWorkspaceTabsBeforeClose() {
  saveActiveWorkspaceTabState();
  const unsavedTabs = workspace.tabs.filter((tab) => workspaceContextHasUnsavedChanges(tab.state?.context));
  for (const tab of unsavedTabs) {
    switchWorkspaceTab(tab.id);
    const saved = await saveGraphJson(false);
    if (!saved) {
      return false;
    }
  }
  return true;
}

window.__stgraphxGetClosePromptData = function __stgraphxGetClosePromptData() {
  saveActiveWorkspaceTabState();
  const unsavedCount = workspace.tabs.filter((tab) => workspaceContextHasUnsavedChanges(tab.state?.context)).length;
  return {
    hasUnsaved: unsavedCount > 0,
    message: t("confirm.closeApp.save"),
    detail: t("confirm.closeApp.detail", { name: unsavedCount > 1 ? `${displayFileName()} (+${unsavedCount - 1})` : displayFileName() }),
    buttons: [t("action.save"), t("action.discard"), t("action.cancel")],
  };
};

window.__stgraphxSaveBeforeClose = async function __stgraphxSaveBeforeClose() {
  return saveAllWorkspaceTabsBeforeClose();
};

function updateFileStatusLabel(dirty = dirtySinceLastSave) {
  if (!fileStatusText) {
    return;
  }
  const key = dirty ? "file.status.dirty" : "file.status.clean";
  fileStatusText.textContent = t(key, { name: displayFileName() });
  if (saveJsonBtn) {
    saveJsonBtn.disabled = !dirty;
  }
  const activeTab = currentWorkspaceTab();
  if (activeTab?.state?.context) {
    activeTab.state.context.currentFileName = currentFileName;
    activeTab.state.context.lastSavedSnapshot = lastSavedSnapshot;
    activeTab.state.context.dirtySinceLastSave = dirty;
    activeTab.state.context.data = exportGraphData();
  }
  refreshWorkspaceTabBar();
}

function scheduleFileStatusRefresh() {
  hideStatusNotice();
  if (fileStatusRefreshTimer != null) {
    return;
  }
  fileStatusRefreshTimer = window.setTimeout(() => {
    fileStatusRefreshTimer = null;
    dirtySinceLastSave = hasUnsavedChanges();
    updateFileStatusLabel(dirtySinceLastSave);
  }, 120);
}

function evalReasonText(reason) {
  return t(`error.evalReason.${reason || "runtime"}`);
}

function clampDisplayDecimals(value) {
  return clamp(Math.round(Number(value) || 0), 0, 12);
}

function formatNumberValue(value) {
  if (!Number.isFinite(value)) {
    return "-";
  }
  const decimals = clampDisplayDecimals(graph.execution.decimals);
  let text = value.toFixed(decimals);
  if (decimals > 0) {
    text = text.replace(/(\.\d*?[1-9])0+$/u, "$1").replace(/\.0+$/u, "");
  }
  if (text === "-0") {
    return "0";
  }
  return text;
}

function formatExecutionDuration(ms) {
  const value = Number(ms);
  if (!Number.isFinite(value) || value < 0) {
    return "-";
  }
  if (value < 1000) {
    return `${Math.round(value)} ms`;
  }
  return `${formatNumberValue(value / 1000)} s`;
}

function isAgentSpaceValue(value) {
  return Boolean(
    value
    && typeof value === "object"
    && value.kind === "agentSpace"
    && Number.isInteger(Number(value.rowCount))
    && Number.isInteger(Number(value.colCount))
  );
}

function formatAgentSpaceSummary(value) {
  return t("text.agentSpaceSummary", {
    rows: Number(value?.rowCount) || 0,
    cols: Number(value?.colCount) || 0,
    agents: Number(value?.agentCount) || 0,
  });
}

function formatComputedValue(value) {
  if (value === null || value === undefined) {
    return "-";
  }
  if (typeof value === "number") {
    return formatNumberValue(value);
  }
  if (isAgentSpaceValue(value)) {
    return formatAgentSpaceSummary(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => formatComputedValue(item)).join(", ")}]`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value);
    try {
      return `{${entries.map(([key, item]) => `${key}: ${formatComputedValue(item)}`).join(", ")}}`;
    } catch (_err) {
      return String(value);
    }
  }
  return String(value);
}

function summarizeTooltipValue(value) {
  if (isAgentSpaceValue(value)) {
    return formatAgentSpaceSummary(value);
  }
  if (Array.isArray(value)) {
    const isMatrix =
      value.length > 0 &&
      value.every((row) => Array.isArray(row)) &&
      value.every((row) => row.length === value[0].length);
    if (isMatrix) {
      const rows = value.length;
      const cols = value[0]?.length ?? 0;
      if ((rows * cols) > 16) {
        return t("text.matrixSummary", { rows, cols });
      }
    } else if (value.every((item) => !Array.isArray(item)) && value.length > 8) {
      return t("text.vectorSummary", { size: value.length });
    }
  }
  return formatComputedValue(value);
}

function summarizeNodeRuntimeValue(node) {
  if (node?.computedError) {
    return { text: t("text.nodeValueError"), error: true };
  }
  const value = node?.computedValue;
  if (isAgentSpaceValue(value)) {
    return { text: formatAgentSpaceSummary(value), error: false };
  }
  if (Array.isArray(value)) {
    const isMatrix = value.length > 0
      && value.every((row) => Array.isArray(row))
      && value.every((row) => row.length === value[0].length);
    if (isMatrix) {
      return { text: `[${value.length},${value[0]?.length ?? 0}]`, error: false };
    }
    return { text: `[${value.length}]`, error: false };
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    const visibleKeys = keys.slice(0, 3).join(", ");
    return { text: keys.length > 3 ? `{${visibleKeys}, ...}` : `{${visibleKeys}}`, error: false };
  }
  return { text: formatComputedValue(value), error: false };
}

function summarizeExpressionPreviewValue(value) {
  if (isAgentSpaceValue(value)) {
    return formatAgentSpaceSummary(value);
  }
  if (Array.isArray(value)) {
    const isMatrix =
      value.length > 0 &&
      value.every((row) => Array.isArray(row)) &&
      value.every((row) => row.length === value[0].length);
    if (isMatrix) {
      const rows = value.length;
      const cols = value[0]?.length ?? 0;
      if ((rows * cols) > 25) {
        return t("text.matrixSummary", { rows, cols });
      }
    } else if (value.every((item) => !Array.isArray(item)) && value.length > 12) {
      return t("text.vectorSummary", { size: value.length });
    }
  }
  return formatComputedValue(value);
}

function describeExpressionPreviewShape(value) {
  if (value === null || value === undefined) {
    return t("expr.preview.shape.empty");
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return t("expr.preview.shape.scalar");
  }
  if (typeof value === "string") {
    return t("expr.preview.shape.text");
  }
  if (Array.isArray(value)) {
    const isMatrix =
      value.length > 0 &&
      value.every((row) => Array.isArray(row)) &&
      value.every((row) => row.length === value[0].length);
    if (isMatrix) {
      return t("expr.preview.shape.matrix", { rows: value.length, cols: value[0]?.length ?? 0 });
    }
    if (value.every((item) => !Array.isArray(item))) {
      return t("expr.preview.shape.vector", { size: value.length });
    }
    return t("expr.preview.shape.array");
  }
  if (isAgentSpaceValue(value)) {
    return t("expr.preview.shape.agentSpace", {
      rows: Number(value?.rowCount) || 0,
      cols: Number(value?.colCount) || 0,
    });
  }
  if (typeof value === "object") {
    return t("expr.preview.shape.object");
  }
  return t("expr.preview.shape.scalar");
}

function normalizeExecutionConfig(raw) {
  return runtimeShared.normalizeExecutionConfig(raw);
}

function propagateNodeRenameInExpressions(oldName, newName) {
  if (!oldName || !newName || oldName === newName) {
    return;
  }
  graph.nodes.forEach((node) => {
    node.valueExpression = semantics.replaceIdentifierInExpression(
      node.valueExpression,
      oldName,
      newName,
    );
    node.initialStateExpression = semantics.replaceIdentifierInExpression(
      node.initialStateExpression,
      oldName,
      newName,
    );
  });
  graph.widgets.forEach((widget) => {
    if (widget.type === "table" && Array.isArray(widget.columns)) {
      widget.columns = widget.columns.map((name) => (name === oldName ? newName : name));
    }
    if (widget.type === "matrix" && widget.source === oldName) {
      widget.source = newName;
    }
    if (widget.type === "text" && widget.source === oldName) {
      widget.source = newName;
    }
    if (widget.type === "led" && widget.source === oldName) {
      widget.source = newName;
    }
    if (widget.type === "xychart") {
      if (Array.isArray(widget.xyPairs)) {
        widget.xyPairs = widget.xyPairs.map((pair) => ({
          ...pair,
          xSource: pair.xSource === oldName ? newName : pair.xSource,
          ySource: pair.ySource === oldName ? newName : pair.ySource,
        }));
      }
    }
    if ((widget.type === "slider" || widget.type === "button" || widget.type === "select") && widget.source === oldName) {
      widget.source = newName;
    }
  });
}

function removeNodeFromAllWidgetDisplays(nodeName) {
  if (!nodeName) {
    return;
  }
  graph.widgets.forEach((widget) => {
    if (widget.type === "table" && Array.isArray(widget.columns)) {
      widget.columns = widget.columns.filter((name) => name !== nodeName);
    }
    if (widget.type === "matrix" && widget.source === nodeName) {
      widget.source = "";
    }
    if (widget.type === "text" && widget.source === nodeName) {
      widget.source = "";
    }
    if (widget.type === "led" && widget.source === nodeName) {
      widget.source = "";
    }
    if (widget.type === "xychart") {
      if (Array.isArray(widget.xyPairs)) {
        widget.xyPairs = widget.xyPairs.filter((pair) => pair.xSource !== nodeName && pair.ySource !== nodeName);
      }
    }
  });
}

function removeNodeFromInputWidgetBindings(nodeName) {
  if (!nodeName) {
    return;
  }
  graph.widgets.forEach((widget) => {
    if ((widget.type === "slider" || widget.type === "button" || widget.type === "select") && widget.source === nodeName) {
      widget.source = "";
    }
  });
}

function clampZoom(value) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

function isStateNode(node) {
  return node?.shape === "rect";
}

function isAlgebraicNode(node) {
  return node?.shape === "ellipse";
}

function isSubmodelNode(node) {
  return node?.shape === "submodel";
}

function nodeHasIncomingEdges(nodeId) {
  return graph.edges.some((edge) => edge.to === nodeId);
}

function canMarkNodeAsInput(node) {
  return isAlgebraicNode(node) && !nodeHasIncomingEdges(node.id);
}

function canMarkNodeAsGlobal(node) {
  return Boolean(node && node.shape === "diamond");
}

function isGlobalParameterNode(node) {
  return Boolean(node && node.shape === "diamond" && node.global);
}

function nodeHasRuntimeError(node) {
  return Boolean(
    node
    && (
      String(node.computedError || "").trim()
      || String(node.pendingStateError || "").trim()
    ),
  );
}

function globalParameterNodesForModel(model = graph, excludeId = null) {
  return (model?.nodes || []).filter((node) => isGlobalParameterNode(node) && node.id !== excludeId);
}

function globalParameterNameSetForModel(model = graph, excludeId = null) {
  return new Set(globalParameterNodesForModel(model, excludeId).map((node) => String(node.name ?? "")).filter(Boolean));
}

function referencedGlobalParameterNodesForTarget(model, targetNode, fieldKey = "value") {
  if (!targetNode) {
    return [];
  }
  const refs = fieldKey === "initial"
    ? expressionReferencesForAnalysis(targetNode, "initial")
    : expressionReferencesForAnalysis(targetNode, "value");
  return globalParameterNodesForModel(model, targetNode.id)
    .filter((node) => refs.has(String(node.name ?? "")));
}

function canBindButtonToNode(node) {
  return Boolean(node && (node.shape === "diamond" || node.input));
}

function canBindSliderToNode(node) {
  return Boolean(node && (node.shape === "diamond" || node.input));
}

function normalizeSubmodelPath(value) {
  return runtimeShared.normalizeSubmodelPath(value);
}

function expressionUsesReadData(expression) {
  return READ_DATA_CALL_PATTERN.test(String(expression ?? ""));
}

function decodeExpressionStringLiteral(quote, body) {
  const raw = String(body ?? "");
  return raw.replace(/\\([\\'"nrt])/g, (_match, escaped) => {
    if (escaped === "n") {
      return "\n";
    }
    if (escaped === "r") {
      return "\r";
    }
    if (escaped === "t") {
      return "\t";
    }
    return escaped;
  });
}

function extractReadDataPaths(expression) {
  const text = String(expression ?? "");
  const paths = [];
  READ_DATA_LITERAL_CALL_PATTERN.lastIndex = 0;
  let match = READ_DATA_LITERAL_CALL_PATTERN.exec(text);
  while (match) {
    paths.push(decodeExpressionStringLiteral(match[1], match[2]));
    match = READ_DATA_LITERAL_CALL_PATTERN.exec(text);
  }
  return paths;
}

function linkedReadDataArgumentAtCaret(text, caret) {
  const before = String(text ?? "").slice(0, Math.max(0, Number(caret) || 0));
  const match = before.match(/\breadData\s*\(\s*(["'])([^"']*)$/u);
  return match ? { start: before.length - match[2].length, prefix: match[2] } : null;
}

function normalizeReadDataPath(value) {
  return runtimeShared.normalizeReadDataPath(value);
}

function createLinkedDataId() {
  if (typeof crypto?.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `linked-data-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeExternalDataEntries(entries) {
  return Array.isArray(entries)
    ? entries.map((entry) => ({
      id: String(entry?.id || createLinkedDataId()),
      path: normalizeReadDataPath(entry?.path),
      type: "csv",
    })).filter((entry) => entry.path)
    : [];
}

function validateReadDataExpressionUsage(expression, options = {}) {
  const text = String(expression ?? "");
  if (!expressionUsesReadData(text)) {
    return { ok: true };
  }
  if (!options.allowReadData) {
    return { ok: false, message: "readData is only available in parameters" };
  }
  const callCount = (text.match(/\breadData\s*\(/g) || []).length;
  const paths = extractReadDataPaths(text);
  if (paths.length !== callCount) {
    return { ok: false, message: "readData expects a string literal path" };
  }
  const invalidPath = paths.find((path) => !normalizeReadDataPath(path));
  if (invalidPath !== undefined) {
    return { ok: false, message: "readData path is invalid" };
  }
  return { ok: true };
}

function splitCsvLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;
  for (let idx = 0; idx < line.length; idx += 1) {
    const ch = line[idx];
    if (ch === '"') {
      if (inQuotes && line[idx + 1] === '"') {
        current += '"';
        idx += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === "," && !inQuotes) {
      fields.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  if (inQuotes) {
    throw new Error("readData CSV contains an unterminated quoted field");
  }
  fields.push(current);
  return fields;
}

function parseCsvMatrix(text, sourcePath = "") {
  const normalizedText = String(text ?? "").replace(/^\uFEFF/, "");
  const lines = normalizedText
    .split(/\r?\n/)
    .map((line) => line.replace(/\r$/, ""))
    .filter((line) => line.trim().length > 0);
  if (!lines.length) {
    throw new Error("readData CSV is empty");
  }
  const matrix = lines.map((line, rowIndex) => splitCsvLine(line).map((cell, colIndex) => {
    const trimmed = String(cell ?? "").trim();
    if (!trimmed) {
      return "";
    }
    const value = Number(trimmed);
    if (Number.isFinite(value)) {
      return value;
    }
    return trimmed;
  }));
  const width = matrix[0].length;
  if (!width) {
    throw new Error("readData CSV is empty");
  }
  if (matrix.some((row) => row.length !== width)) {
    throw new Error("readData CSV must be rectangular");
  }
  return matrix;
}

function pickLinkedCsvFilesWithInput() {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,text/csv";
    input.multiple = true;
    input.style.position = "fixed";
    input.style.left = "-9999px";
    input.addEventListener("change", () => {
      const files = Array.from(input.files || []);
      input.remove();
      files.length ? resolve(files.map(createPseudoFileHandle)) : reject(new Error("Aborted"));
    }, { once: true });
    document.body.appendChild(input);
    input.click();
  });
}

async function persistLinkedDataHandle(id, handle, file) {
  if (!id || !linkedDataHandleStore || !handle) {
    return;
  }
  try {
    await linkedDataHandleStore.put(id, handle);
  } catch (_err) {
    // Legacy input fallbacks do not provide clonable handles. Persisting the
    // selected File still permits restoring this link in the same browser.
    try {
      await linkedDataHandleStore.put(id, file);
    } catch (_ignored) {
      // Native desktop paths and the model-folder lookup remain available.
    }
  }
}

async function linkExternalCsvFiles() {
  let handles;
  try {
    handles = supportsOpenFilePicker()
      ? await showOpenFilePickerCompat({ multiple: true, types: [{ description: "CSV", accept: { "text/csv": [".csv"] } }] })
      : await pickLinkedCsvFilesWithInput();
  } catch (err) {
    if (err?.name !== "AbortError") setStatusKey("status.readError");
    return false;
  }
  let changed = false;
  for (const handle of handles || []) {
    const file = await handle.getFile();
    const path = normalizeReadDataPath(file.name);
    if (!path || !/\.csv$/iu.test(path)) continue;
    try {
      parseCsvMatrix(await file.text(), path);
    } catch (err) {
      setStatus(localizeExpressionErrorMessage(err?.message || ""), true);
      continue;
    }
    const previous = graph.externalData.find((entry) => entry.path === path) || null;
    const id = String(previous?.id || createLinkedDataId());
    await persistLinkedDataHandle(id, handle, file);
    linkedReadDataFileHandles.set(path, handle);
    graph.externalData = graph.externalData.filter((entry) => entry.path !== path);
    graph.externalData.push({ id, path, type: "csv" });
    changed = true;
  }
  if (changed) {
    dirtySinceLastSave = true;
    invalidateExpressionPreviewInitializationCache();
    render();
  }
  return changed;
}

function removeLinkedData(path) {
  const normalizedPath = normalizeReadDataPath(path);
  if (!normalizedPath || !graph.externalData.some((entry) => entry.path === normalizedPath)) {
    return;
  }
  const removed = graph.externalData.find((entry) => entry.path === normalizedPath) || null;
  graph.externalData = graph.externalData.filter((entry) => entry.path !== normalizedPath);
  linkedReadDataFileHandles.delete(normalizedPath);
  if (removed?.id) {
    linkedDataHandleStore?.remove?.(removed.id).catch?.(() => {});
  }
  graph.__readDataCache = Object.create(null);
  dirtySinceLastSave = true;
  invalidateExpressionPreviewInitializationCache();
  render();
  renderDataLinksDialog();
}

function renderDataLinksDialog() {
  if (!dataLinksList) {
    return;
  }
  dataLinksList.innerHTML = "";
  const entries = Array.isArray(graph.externalData) ? graph.externalData : [];
  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "data-links-empty";
    empty.textContent = t("dataLinks.empty");
    dataLinksList.appendChild(empty);
    return;
  }
  for (const entry of entries) {
    const path = normalizeReadDataPath(entry?.path);
    if (!path) {
      continue;
    }
    const row = document.createElement("div");
    row.className = "data-link-row";
    const details = document.createElement("div");
    details.className = "data-link-details";
    const name = document.createElement("code");
    name.textContent = path;
    const status = document.createElement("span");
    const available = linkedReadDataFileHandles.has(path);
    status.className = `data-link-status ${available ? "available" : "unavailable"}`;
    status.textContent = t(available ? "dataLinks.available" : "dataLinks.relinkRequired");
    details.append(name, status);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "small-btn data-link-remove";
    remove.textContent = t("dataLinks.remove");
    remove.addEventListener("click", () => removeLinkedData(path));
    row.append(details, remove);
    dataLinksList.appendChild(row);
  }
}

async function openDataLinksDialog() {
  if (!dataLinksModal) {
    return;
  }
  await resolveLinkedReadDataFilesAfterLoad(graph, currentModelDirectoryHandle);
  renderDataLinksDialog();
  dataLinksModal.classList.remove("hidden");
}

function closeDataLinksDialog() {
  dataLinksModal?.classList.add("hidden");
}

function submodelInterfaceSummary(node) {
  const inputs = Array.isArray(node?.interfaceCache?.inputs) ? node.interfaceCache.inputs : [];
  const outputs = Array.isArray(node?.interfaceCache?.outputs) ? node.interfaceCache.outputs : [];
  return t("text.submodelInterfaceSummary", {
    inputs: inputs.length ? inputs.join(", ") : "-",
    outputs: outputs.length ? outputs.join(", ") : "-",
  });
}

function canShowSubmodelNode(node) {
  if (!node || !isSubmodelNode(node)) {
    return false;
  }
  const normalizedPath = normalizeSubmodelPath(node.modelPath);
  if (!normalizedPath) {
    return false;
  }
  return Boolean(
    currentModelDirectoryHandle ||
    submodelTemplateCache.has(normalizedPath) ||
    submodelSourceCache.has(normalizedPath),
  );
}

async function chooseSubmodelFileForNode(node) {
  if (!node || !isSubmodelNode(node)) {
    return false;
  }
  let entry = null;
  if (supportsOpenFilePicker()) {
    const handles = await showOpenFilePickerCompat({
      multiple: false,
      types: [{
        description: "JSON",
        accept: { "application/json": [".json"] },
      }],
    });
    entry = handles?.[0] || null;
  } else {
    entry = await pickSubmodelFileWithInput();
  }
  if (!entry) {
    throw new Error(t("error.loadCancelled"));
  }
  const item = await parseSelectedJsonEntry(entry);
  const normalizedPath = normalizeSubmodelPath(item?.name);
  if (!normalizedPath) {
    throw new Error(t("error.submodelPathInvalid"));
  }
  node.modelPath = normalizedPath;
  node.interfaceCache = emptySubmodelInterfaceCache();
  node.submodelError = "";
  node.__runtimeSubmodel = null;
  node.__runtimeSubmodelPath = "";
  submodelSourceCache.set(normalizedPath, item.text);
  if (item.fileHandle) {
    submodelFileHandleCache.set(normalizedPath, item.fileHandle);
  }
  try {
    const data = JSON.parse(item.text);
    submodelTemplateCache.set(normalizedPath, buildRuntimeModelFromData(data, {
      directoryPath: String(item.directoryHandle?.path ?? ""),
    }));
  } catch (_err) {
    // Parsing/semantic errors are surfaced by the normal refresh path below.
  }
  sanitizeSubmodelBindings(node);
  sanitizeAllEdgesForNode(node.id);
  invalidateExecutionPlan();
  ui.submodelsPrepared = false;
  scheduleFileStatusRefresh();
  return true;
}

function sanitizeSubmodelBindings(node) {
  if (!node || !isSubmodelNode(node)) {
    return;
  }
  const allowedInputs = new Set(
    Array.isArray(node.interfaceCache?.inputs)
      ? node.interfaceCache.inputs.map((value) => String(value).trim()).filter(Boolean)
      : [],
  );
  const source = node.inputBindings && typeof node.inputBindings === "object" ? node.inputBindings : {};
  if (allowedInputs.size === 0) {
    node.inputBindings = Object.fromEntries(
      Object.entries(source)
        .map(([key, value]) => [String(key || "").trim(), String(value ?? "").trim()])
        .filter(([key, value]) => key && value),
    );
    return;
  }
  const next = {};
  Object.entries(source).forEach(([key, value]) => {
    const inputName = String(key || "").trim();
    if (!inputName || !allowedInputs.has(inputName)) {
      return;
    }
    const binding = String(value ?? "").trim();
    if (binding) {
      next[inputName] = binding;
    }
  });
  node.inputBindings = next;
}

function sanitizeAllEdgesForNode(nodeId) {
  void nodeId;
}

function emptySubmodelInterfaceCache() {
  return { inputs: [], outputs: [], inputDetails: {} };
}

function normalizeSubmodelInterfaceCache(cache) {
  const source = cache && typeof cache === "object" ? cache : {};
  const inputs = Array.isArray(source.inputs) ? source.inputs.map((value) => String(value)) : [];
  const outputs = Array.isArray(source.outputs) ? source.outputs.map((value) => String(value)) : [];
  const inputDetails = {};
  if (source.inputDetails && typeof source.inputDetails === "object") {
    Object.entries(source.inputDetails).forEach(([name, detail]) => {
      const key = String(name ?? "").trim();
      if (!key) {
        return;
      }
      inputDetails[key] = {
        description: String(detail?.description ?? "").trim(),
      };
    });
  }
  return { inputs, outputs, inputDetails };
}

function submodelInputHelpText(node, inputName) {
  const key = String(inputName ?? "").trim();
  if (!key) {
    return "";
  }
  return String(node?.interfaceCache?.inputDetails?.[key]?.description ?? "").trim();
}

function getSubmodelBindingSourceChoices(node) {
  if (!node || !isSubmodelNode(node)) {
    return [];
  }
  const names = new Set();
  incomingEdgesForNode(node.id).forEach((edge) => {
    const fromNode = getNodeById(edge.from);
    const name = String(fromNode?.name ?? "").trim();
    if (name) {
      names.add(name);
    }
  });
  return [...names].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

function renderSubmodelBindingsEditor(node) {
  if (!nodeSubmodelBindings) {
    return;
  }
  nodeSubmodelBindings.innerHTML = "";
  if (!node || !isSubmodelNode(node)) {
    nodeSubmodelBindings.classList.add("hidden");
    return;
  }
  sanitizeSubmodelBindings(node);
  nodeSubmodelBindings.classList.remove("hidden");

  const note = document.createElement("div");
  note.className = "submodel-bindings-note";
  note.textContent = t("text.submodelBindingDefault");
  nodeSubmodelBindings.appendChild(note);

  const inputs = Array.isArray(node.interfaceCache?.inputs)
    ? node.interfaceCache.inputs.map((value) => String(value).trim()).filter(Boolean)
    : [];
  if (!inputs.length) {
    const empty = document.createElement("div");
    empty.className = "empty-props";
    empty.textContent = t("text.submodelNoInputs");
    nodeSubmodelBindings.appendChild(empty);
    return;
  }

  const sourceChoices = getSubmodelBindingSourceChoices(node);
  inputs.forEach((inputName) => {
    const row = document.createElement("div");
    row.className = "submodel-binding-row";
    const label = document.createElement("label");
    const inputId = `submodel-binding-${node.id}-${inputName.replace(/[^a-zA-Z0-9_-]+/g, "_")}`;
    label.htmlFor = inputId;
    label.textContent = inputName;
    const helpText = submodelInputHelpText(node, inputName);
    if (helpText) {
      setTooltipText(label, helpText);
    }
    const select = document.createElement("select");
    select.id = inputId;
    select.setAttribute("data-title-i18n", "tooltip.node.submodelBinding");
    const currentValue = String(node.inputBindings?.[inputName] ?? "").trim();
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = t("widget.noneOption");
    select.appendChild(emptyOption);
    sourceChoices.forEach((sourceName) => {
      const option = document.createElement("option");
      option.value = sourceName;
      option.textContent = sourceName;
      select.appendChild(option);
    });
    if (currentValue && !sourceChoices.includes(currentValue)) {
      const missingOption = document.createElement("option");
      missingOption.value = currentValue;
      missingOption.textContent = currentValue;
      select.appendChild(missingOption);
    }
    select.value = currentValue;
    select.addEventListener("change", () => {
      beginTransaction();
      const expr = String(select.value ?? "").trim();
      if (!node.inputBindings || typeof node.inputBindings !== "object") {
        node.inputBindings = {};
      }
      if (expr) {
        node.inputBindings[inputName] = expr;
      } else {
        delete node.inputBindings[inputName];
      }
      dirtySinceLastSave = true;
      updateFileStatusLabel(true);
      scheduleFileStatusRefresh();
      commitTransaction();
    });
    row.appendChild(label);
    row.appendChild(select);
    nodeSubmodelBindings.appendChild(row);
  });

  applyI18nTooltipsToSubtree(nodeSubmodelBindings);
}

function hasExternalValue(node) {
  return Boolean(node?.externalValueEnabled);
}

function hasSliderBinding(node) {
  return Boolean(node && graph.widgets.some((widget) => widget.type === "slider" && widget.source === node.name));
}

function hasButtonBinding(node) {
  return Boolean(node && graph.widgets.some((widget) => widget.type === "button" && widget.source === node.name));
}

function hasSelectBinding(node) {
  return Boolean(node && graph.widgets.some((widget) => widget.type === "select" && widget.source === node.name));
}

function hasInputWidgetBinding(node) {
  return hasSliderBinding(node) || hasButtonBinding(node) || hasSelectBinding(node);
}

function isWidgetControlledExpressionNode(node) {
  return Boolean(node && !isStateNode(node) && !isSubmodelNode(node) && hasInputWidgetBinding(node));
}

function normalizeInputNodeFlags() {
  graph.nodes.forEach((node) => {
    if (!canMarkNodeAsInput(node)) {
      node.input = false;
    }
    if (!canMarkNodeAsGlobal(node)) {
      node.global = false;
    }
  });
}

function inputWidgetBoundNodeNameSet(excludeWidgetId = null) {
  const bound = new Set();
  graph.widgets.forEach((widget) => {
    if (!widget || (excludeWidgetId != null && Number(widget.id) === Number(excludeWidgetId))) {
      return;
    }
    if (widget.type !== "slider" && widget.type !== "button" && widget.type !== "select") {
      return;
    }
    const source = String(widget.source ?? "").trim();
    if (source) {
      bound.add(source);
    }
  });
  return bound;
}

function bindableInputNodeNames(predicate, excludeWidgetId = null, preserveName = "") {
  const blocked = inputWidgetBoundNodeNameSet(excludeWidgetId);
  const keepName = String(preserveName ?? "").trim();
  if (keepName) {
    blocked.delete(keepName);
  }
  return graph.nodes
    .filter((node) => predicate(node) && !blocked.has(String(node.name ?? "")))
    .map((node) => node.name)
    .sort((left, right) => String(left).localeCompare(String(right), undefined, { numeric: true, sensitivity: "base" }));
}

function buttonBindableNodeNames(excludeWidgetId = null, preserveName = "") {
  return bindableInputNodeNames((node) => canBindButtonToNode(node), excludeWidgetId, preserveName);
}

function selectBindableNodeNames(excludeWidgetId = null, preserveName = "") {
  return bindableInputNodeNames((node) => canBindSliderToNode(node), excludeWidgetId, preserveName);
}

function sliderBindableNodeNames(excludeWidgetId = null, preserveName = "") {
  return bindableInputNodeNames((node) => canBindSliderToNode(node), excludeWidgetId, preserveName);
}

function selectedNodesList() {
  return [...ui.selectedNodes]
    .map((id) => getNodeById(id))
    .filter(Boolean);
}

function normalizePresentationGroupName(value, fallbackIndex = 1) {
  const name = String(value ?? "").trim().replace(/\s+/g, " ");
  return name || `${t("presentationGroups.defaultName")} ${fallbackIndex}`;
}

function sanitizePresentationGroups(rawGroups, nodes = graph.nodes) {
  const validNodeIds = new Set((Array.isArray(nodes) ? nodes : []).map((node) => node.id));
  const usedIds = new Set();
  const usedNames = new Set();
  const groups = [];
  (Array.isArray(rawGroups) ? rawGroups : []).forEach((rawGroup, index) => {
    let id = Number(rawGroup?.id);
    if (!Number.isInteger(id) || id < 1 || usedIds.has(id)) {
      id = index + 1;
      while (usedIds.has(id)) {
        id += 1;
      }
    }
    usedIds.add(id);
    const baseName = normalizePresentationGroupName(rawGroup?.name, groups.length + 1);
    let name = baseName;
    let suffix = 2;
    while (usedNames.has(name.toLocaleLowerCase())) {
      name = `${baseName} (${suffix})`;
      suffix += 1;
    }
    usedNames.add(name.toLocaleLowerCase());
    const nodeIds = [...new Set(Array.isArray(rawGroup?.nodeIds) ? rawGroup.nodeIds : [])]
      .filter((nodeId) => validNodeIds.has(nodeId));
    groups.push({
      id,
      name,
      nodeIds,
      visible: rawGroup?.visible !== false,
      showFrame: rawGroup?.showFrame !== false,
    });
  });
  return groups;
}

function syncPresentationGroups() {
  graph.presentationGroups = sanitizePresentationGroups(graph.presentationGroups);
  const maxId = graph.presentationGroups.reduce((max, group) => Math.max(max, group.id), 0);
  presentationGroupCounter = Math.max(presentationGroupCounter, maxId + 1);
}

function visiblePresentationNodeIds() {
  const memberships = new Map();
  graph.presentationGroups.forEach((group) => {
    group.nodeIds.forEach((nodeId) => {
      const item = memberships.get(nodeId) || [];
      item.push(group);
      memberships.set(nodeId, item);
    });
  });
  return new Set(graph.nodes
    .filter((node) => {
      const groups = memberships.get(node.id);
      return !groups || groups.some((group) => group.visible);
    })
    .map((node) => node.id));
}

function presentationGroupBounds(group) {
  const nodes = group.nodeIds.map((id) => getNodeById(id)).filter(Boolean);
  if (!nodes.length) {
    return null;
  }
  const padding = 22;
  const minX = Math.min(...nodes.map((node) => node.x - node.width / 2)) - padding;
  const minY = Math.min(...nodes.map((node) => node.y - node.height / 2)) - padding;
  const maxX = Math.max(...nodes.map((node) => node.x + node.width / 2)) + padding;
  const maxY = Math.max(...nodes.map((node) => node.y + node.height / 2)) + padding;
  return { minX, minY, width: maxX - minX, height: maxY - minY };
}

function defaultDashboard() {
  return {
    visible: true,
    x: 80,
    y: 80,
    width: 760,
    height: 520,
    activePageId: 1,
    nextPageId: 2,
    pages: [{ id: 1, title: t("dashboard.defaultPage") }],
  };
}

function normalizeDashboardPageId(value) {
  const pageId = Number(value);
  return Number.isInteger(pageId) && pageId > 0 ? pageId : null;
}

function sanitizeDashboard(rawDashboard) {
  if (!rawDashboard || typeof rawDashboard !== "object") {
    return null;
  }
  const usedIds = new Set();
  const pages = (Array.isArray(rawDashboard.pages) ? rawDashboard.pages : [])
    .map((rawPage, index) => {
      let id = Number(rawPage?.id);
      if (!Number.isInteger(id) || id < 1 || usedIds.has(id)) {
        id = index + 1;
        while (usedIds.has(id)) id += 1;
      }
      usedIds.add(id);
      return {
        id,
        title: String(rawPage?.title ?? "").trim() || `${t("dashboard.defaultPage")} ${index + 1}`,
      };
    });
  if (!pages.length) {
    pages.push({ id: 1, title: t("dashboard.defaultPage") });
  }
  const activePageId = Number(rawDashboard.activePageId);
  const pageIds = new Set(pages.map((page) => page.id));
  const maxPageId = Math.max(...pages.map((page) => page.id));
  return {
    visible: rawDashboard.visible !== false,
    x: Number.isFinite(Number(rawDashboard.x)) ? Number(rawDashboard.x) : 80,
    y: Number.isFinite(Number(rawDashboard.y)) ? Number(rawDashboard.y) : 80,
    width: clamp(Number(rawDashboard.width) || 760, 320, 1600),
    height: clamp(Number(rawDashboard.height) || 520, 220, 1200),
    activePageId: pageIds.has(activePageId) ? activePageId : pages[0].id,
    nextPageId: Math.max(Number(rawDashboard.nextPageId) || 0, maxPageId + 1),
    pages,
  };
}

function syncDashboard() {
  graph.dashboard = sanitizeDashboard(graph.dashboard);
  if (!graph.dashboard) {
    graph.widgets.forEach((widget) => { widget.dashboardPageId = null; });
    graph.textItems.forEach((item) => { item.dashboardPageId = null; });
    return;
  }
  const pageIds = new Set(graph.dashboard.pages.map((page) => page.id));
  [...graph.widgets, ...graph.textItems].forEach((item) => {
    const pageId = normalizeDashboardPageId(item?.dashboardPageId);
    item.dashboardPageId = pageIds.has(pageId) ? pageId : null;
  });
}

function dashboardContentOrigin(dashboard = graph.dashboard) {
  return { x: Number(dashboard?.x || 0) + 16, y: Number(dashboard?.y || 0) + 76 };
}

function isDashboardItemVisible(item) {
  const pageId = normalizeDashboardPageId(item?.dashboardPageId);
  if (pageId == null) return true;
  return Boolean(graph.dashboard && graph.dashboard.visible !== false && graph.dashboard.activePageId === pageId);
}

function dashboardItemPosition(item) {
  if (normalizeDashboardPageId(item?.dashboardPageId) == null) {
    return { x: item.x, y: item.y };
  }
  const origin = dashboardContentOrigin();
  return { x: origin.x + item.x, y: origin.y + item.y };
}

function commitDashboardChange(mutator) {
  const beforeState = exportGraphData();
  mutator();
  syncDashboard();
  const afterState = exportGraphData();
  if (JSON.stringify(beforeState) !== JSON.stringify(afterState)) {
    pushUndoState(beforeState);
    history.redo = [];
    dirtySinceLastSave = true;
    updateFileStatusLabel(true);
    updateHistoryButtons();
  }
  render();
}

function commitPresentationGroupsChange(mutator) {
  const beforeState = exportGraphData();
  mutator();
  syncPresentationGroups();
  const afterState = exportGraphData();
  if (JSON.stringify(beforeState) !== JSON.stringify(afterState)) {
    pushUndoState(beforeState);
    history.redo = [];
    dirtySinceLastSave = true;
    updateFileStatusLabel(true);
    updateHistoryButtons();
  }
  render();
}

function serializeNodeType(shape) {
  return runtimeShared.serializeNodeType(shape);
}

function deserializeNodeType(type) {
  return runtimeShared.deserializeNodeType(type);
}

function graphBounds() {
  let maxX = -Infinity;
  let maxY = -Infinity;

  const visibleNodeIds = visiblePresentationNodeIds();
  graph.nodes.filter((node) => visibleNodeIds.has(node.id)).forEach((node) => {
    maxX = Math.max(maxX, node.x + node.width / 2);
    maxY = Math.max(maxY, node.y + node.height / 2);
  });

  graph.edges.filter((edge) => visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to)).forEach((edge) => {
    (edge.controlPoints || []).forEach((cp) => {
      maxX = Math.max(maxX, cp.x);
      maxY = Math.max(maxY, cp.y);
    });
    const label = normalizeEdgeLabel(edge.label);
    if (label) {
      const halfWidth = Math.max(24, label.text.length * 3.8);
      maxX = Math.max(maxX, label.x + halfWidth);
      maxY = Math.max(maxY, label.y + 8);
    }
  });

  graph.widgets.forEach((widget) => {
    if (!isDashboardItemVisible(widget)) return;
    const position = dashboardItemPosition(widget);
    const width = Number(widget.width) || 0;
    const height = Number(widget.minimized ? 36 : widget.height) || 0;
    maxX = Math.max(maxX, position.x + width);
    maxY = Math.max(maxY, position.y + height);
  });

  graph.textItems.forEach((item) => {
    if (!isDashboardItemVisible(item)) return;
    const position = dashboardItemPosition(item);
    maxX = Math.max(maxX, position.x + item.width);
    maxY = Math.max(maxY, position.y + item.height);
  });

  if (graph.dashboard && graph.dashboard.visible !== false) {
    maxX = Math.max(maxX, graph.dashboard.x + graph.dashboard.width);
    maxY = Math.max(maxY, graph.dashboard.y + graph.dashboard.height);
  }

  if (!Number.isFinite(maxX) || !Number.isFinite(maxY)) {
    maxX = 0;
    maxY = 0;
  }

  // Keep the canvas origin fixed so an object can stay at the top-left corner.
  // Only the right and bottom boundaries grow with the model contents.
  const minX = 0;
  const minY = 0;
  const margin = 180;
  maxX += margin;
  maxY += margin;

  return {
    minX,
    minY,
    width: Math.max(MIN_GRAPH_WIDTH, maxX),
    height: Math.max(MIN_GRAPH_HEIGHT, maxY),
  };
}

function updateCanvasSize(anchorClientX = null, anchorClientY = null, force = false) {
  if (!force && (ui.drag || ui.resize || ui.controlPointDrag || ui.edgeLabelDrag || ui.edgeLabelRotate || ui.edgeCreate || ui.marquee || ui.textDrag || ui.textResize || ui.dashboardDrag || ui.dashboardResize)) {
    return;
  }

  const rect = graphViewport.getBoundingClientRect();
  const ax = anchorClientX ?? rect.left;
  const ay = anchorClientY ?? rect.top;
  const localX = Math.max(0, Math.min(rect.width, ax - rect.left));
  const localY = Math.max(0, Math.min(rect.height, ay - rect.top));

  const oldVB = svg.viewBox.baseVal;
  const oldView = {
    x: oldVB?.x ?? 0,
    y: oldVB?.y ?? 0,
    width: oldVB?.width || BASE_CANVAS_WIDTH,
    height: oldVB?.height || BASE_CANVAS_HEIGHT,
  };

  const oldPixelWidth = svg.clientWidth || Math.round(oldView.width * ui.zoom);
  const oldPixelHeight = svg.clientHeight || Math.round(oldView.height * ui.zoom);
  const oldContentX = graphViewport.scrollLeft + localX;
  const oldContentY = graphViewport.scrollTop + localY;
  const worldX = oldView.x + (oldContentX / Math.max(1, oldPixelWidth)) * oldView.width;
  const worldY = oldView.y + (oldContentY / Math.max(1, oldPixelHeight)) * oldView.height;

  const bounds = graphBounds();
  const zoomedWidth = Math.round(bounds.width * ui.zoom);
  const zoomedHeight = Math.round(bounds.height * ui.zoom);
  const targetWidth = Math.max(1, zoomedWidth);
  const targetHeight = Math.max(1, zoomedHeight);

  const currentWidth = parseInt(svg.style.width, 10) || svg.clientWidth;
  const currentHeight = parseInt(svg.style.height, 10) || svg.clientHeight;
  const sameView =
    Math.abs(oldView.x - bounds.minX) < 0.001 &&
    Math.abs(oldView.y - bounds.minY) < 0.001 &&
    Math.abs(oldView.width - bounds.width) < 0.001 &&
    Math.abs(oldView.height - bounds.height) < 0.001;
  const sameSize = currentWidth === targetWidth && currentHeight === targetHeight;
  if (!force && sameView && sameSize) {
    return;
  }

  svg.setAttribute("viewBox", `${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`);

  svg.style.width = `${targetWidth}px`;
  svg.style.height = `${targetHeight}px`;

  const newContentX = ((worldX - bounds.minX) / bounds.width) * targetWidth;
  const newContentY = ((worldY - bounds.minY) / bounds.height) * targetHeight;
  graphViewport.scrollLeft = newContentX - localX;
  graphViewport.scrollTop = newContentY - localY;
  updateCanvasGridAppearance();
}

function updateZoomButtons() {
  zoomInItem.disabled = ui.zoom >= MAX_ZOOM;
  zoomOutItem.disabled = ui.zoom <= MIN_ZOOM;
  zoomResetItem.disabled = Math.abs(ui.zoom - 1) < 0.001;
  if (zoomRangeInput && document.activeElement !== zoomRangeInput) {
    zoomRangeInput.value = String(Math.round(ui.zoom * 100));
  }
  if (zoomRangeValue) {
    zoomRangeValue.textContent = `${Math.round(ui.zoom * 100)}%`;
  }
}

function applyCanvasVisibility() {
  svg.style.display = "block";
  presentationGroupsLayer.style.display = ui.showGraph ? "" : "none";
  dashboardLayer.style.display = ui.showWidgets && graph.dashboard && graph.dashboard.visible !== false ? "" : "none";
  edgesLayer.style.display = ui.showGraph ? "" : "none";
  previewLayer.style.display = ui.showGraph ? "" : "none";
  nodesLayer.style.display = ui.showGraph ? "" : "none";
  controlsLayer.style.display = ui.showGraph ? "" : "none";
  marqueeLayer.style.display = ui.showGraph ? "" : "none";
  widgetLayer.style.display = ui.showWidgets ? "" : "none";
  textLayer.style.display = ui.showWidgets ? "" : "none";
  const graphLabel = ui.showGraph ? t("view.btn.hideGraph") : t("view.btn.showGraph");
  const widgetsLabel = ui.showWidgets ? t("view.btn.hideWidgets") : t("view.btn.showWidgets");
  if (toggleGraphBtn) {
    toggleGraphBtn.textContent = graphLabel;
  }
  if (toggleWidgetsBtn) {
    toggleWidgetsBtn.textContent = widgetsLabel;
  }
  if (toggleGraphItem) {
    toggleGraphItem.textContent = graphLabel;
  }
  if (toggleWidgetsItem) {
    toggleWidgetsItem.textContent = widgetsLabel;
  }
  if (manageDashboardItem) {
    manageDashboardItem.textContent = !graph.dashboard
      ? t("dashboard.create")
      : (graph.dashboard.visible === false ? t("dashboard.show") : t("dashboard.hide"));
  }
  updateCanvasGridAppearance();
}

function setTimedRunButtonIcon(button, isRunning) {
  if (!button) {
    return;
  }
  if (isRunning) {
    button.textContent = "⏸";
    return;
  }
  button.innerHTML = '<span class="timed-start-icon" aria-hidden="true"><span class="timed-start-play">▶</span><span class="timed-start-clock">⏱</span></span>';
}

function updateModelRunButtons() {
  if (topRunEvalBtn) {
    setTooltipText(topRunEvalBtn, `${t("menu.run.execute")} (F7)`);
    topRunEvalBtn.disabled = false;
  }
  if (tabletRunBtn) {
    setTooltipText(tabletRunBtn, t("menu.run.execute"));
    tabletRunBtn.disabled = false;
  }
  if (topRunStepBtn) {
    setTooltipText(topRunStepBtn, `${t("menu.run.step")} (F8)`);
    topRunStepBtn.disabled = false;
  }
  if (tabletStepBtn) {
    setTooltipText(tabletStepBtn, t("menu.run.step"));
    tabletStepBtn.disabled = false;
  }
  if (topRunTimedBtn) {
    const timedKey = ui.timedRunHandle == null ? "action.timedStart" : "action.timedStop";
    setTimedRunButtonIcon(topRunTimedBtn, ui.timedRunHandle != null);
    setTooltipText(topRunTimedBtn, `${t(timedKey)} (F9)`);
    topRunTimedBtn.disabled = false;
    topRunTimedBtn.classList.toggle("active", ui.timedRunHandle != null);
  }
  if (tabletTimedBtn) {
    const timedKey = ui.timedRunHandle == null ? "action.timedStart" : "action.timedStop";
    setTimedRunButtonIcon(tabletTimedBtn, ui.timedRunHandle != null);
    setTooltipText(tabletTimedBtn, t(timedKey));
    tabletTimedBtn.disabled = false;
    tabletTimedBtn.classList.toggle("active", ui.timedRunHandle != null);
  }
  if (topRunResetBtn) {
    setTooltipText(topRunResetBtn, `${t("menu.run.reset")} (F10)`);
  }
  if (tabletResetBtn) {
    setTooltipText(tabletResetBtn, t("menu.run.reset"));
  }
  if (tabletFitBtn) {
    setTooltipText(tabletFitBtn, t("menu.view.fit"));
  }
  updateTabletCanvasModeUi();
  if (runFullModelBtn) {
    setTooltipText(runFullModelBtn, `${t("menu.run.execute")} (F7)`);
    runFullModelBtn.disabled = false;
  }
  if (manualStepBtn) {
    setTooltipText(manualStepBtn, `${t("menu.run.step")} (F8)`);
    manualStepBtn.disabled = false;
  }
  if (timedToggleBtn) {
    const timedKey = ui.timedRunHandle == null ? "action.timedStart" : "action.timedStop";
    setTimedRunButtonIcon(timedToggleBtn, ui.timedRunHandle != null);
    setTooltipText(timedToggleBtn, `${t(timedKey)} (F9)`);
    timedToggleBtn.disabled = false;
  }
  if (resetExecBtn) {
    setTooltipText(resetExecBtn, `${t("menu.run.reset")} (F10)`);
  }
  if (runEvalBtn) {
    runEvalBtn.disabled = false;
  }
  if (runStepBtn) {
    runStepBtn.disabled = false;
  }
  if (runTimedToggleBtn) {
    runTimedToggleBtn.disabled = false;
  }
}

function updateDeleteActionLabel() {
  if (!deleteBtnLabel) {
    return;
  }
  deleteBtnLabel.textContent = t("menu.edit.delete");
}

function selectAllNodes() {
  if (graph.nodes.length === 0) {
    return;
  }
  setNodeSelection(graph.nodes.map((n) => n.id), false);
  render();
}

function toggleGraphVisibility() {
  ui.showGraph = !ui.showGraph;
  applyCanvasVisibility();
}

function toggleWidgetsVisibility() {
  ui.showWidgets = !ui.showWidgets;
  applyCanvasVisibility();
}

function applyZoom(nextZoom, anchorClientX = null, anchorClientY = null) {
  const targetZoom = clampZoom(nextZoom);
  if (Math.abs(targetZoom - ui.zoom) < 0.0001) {
    return;
  }

  ui.zoom = targetZoom;
  updateCanvasSize(anchorClientX, anchorClientY, true);
  renderWidgets();

  updateZoomButtons();
  refreshSidebar();
  scheduleFileStatusRefresh();
  setStatusKey("status.zoom", { value: Math.round(ui.zoom * 100) });
}

function handleCompactTouchViewportPointerDown(evt) {
  if (!isCompactTouchPointerEvent(evt) || !isBackgroundTouchCanvasTarget(evt.target)) {
    return;
  }
  const gesture = ensureTouchViewportGesture();
  gesture.target = graphViewport;
  gesture.pointers.set(evt.pointerId, {
    clientX: evt.clientX,
    clientY: evt.clientY,
  });
  refreshTouchViewportGestureMode();
  evt.preventDefault();
}

function handleCompactTouchViewportPointerMove(evt) {
  const gesture = ui.touchViewportGesture;
  if (!gesture || gesture.target !== graphViewport || !gesture.pointers.has(evt.pointerId)) {
    return false;
  }
  gesture.pointers.set(evt.pointerId, {
    clientX: evt.clientX,
    clientY: evt.clientY,
  });
  const points = [...gesture.pointers.values()];
  if (gesture.mode === "pinch" && points.length >= 2) {
    const [a, b] = points;
    const mid = touchGestureMidpoint(a, b);
    const dist = Math.max(1, touchGestureDistance(a, b));
    const factor = dist / Math.max(1, gesture.lastDistance || dist);
    if (Number.isFinite(factor) && factor > 0) {
      applyZoom(ui.zoom * factor, mid.x, mid.y);
    }
    graphViewport.scrollLeft -= (mid.x - gesture.lastMidClientX);
    graphViewport.scrollTop -= (mid.y - gesture.lastMidClientY);
    gesture.lastDistance = dist;
    gesture.lastMidClientX = mid.x;
    gesture.lastMidClientY = mid.y;
    evt.preventDefault();
    return true;
  }
  if (gesture.mode === "pan" && points.length === 1) {
    const point = points[0];
    graphViewport.scrollLeft = gesture.startScrollLeft - (point.clientX - gesture.startClientX);
    graphViewport.scrollTop = gesture.startScrollTop - (point.clientY - gesture.startClientY);
    evt.preventDefault();
    return true;
  }
  return false;
}

function handleCompactTouchViewportPointerEnd(evt) {
  const gesture = ui.touchViewportGesture;
  if (!gesture || !gesture.pointers.has(evt.pointerId)) {
    return false;
  }
  gesture.pointers.delete(evt.pointerId);
  if (gesture.pointers.size === 0) {
    clearTouchViewportGesture();
  } else {
    refreshTouchViewportGestureMode();
  }
  return true;
}

function fitToContent() {
  const rect = graphViewport.getBoundingClientRect();
  if (rect.width < 10 || rect.height < 10) {
    return;
  }

  const bounds = graphBounds();
  const zx = rect.width / Math.max(1, bounds.width);
  const zy = rect.height / Math.max(1, bounds.height);
  ui.zoom = clampZoom(Math.min(zx, zy));
  updateCanvasSize(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
  renderWidgets();

  graphViewport.scrollLeft = Math.max(0, (svg.clientWidth - rect.width) / 2);
  graphViewport.scrollTop = Math.max(0, (svg.clientHeight - rect.height) / 2);

  updateZoomButtons();
  scheduleFileStatusRefresh();
  setStatusKey("status.fit", { value: Math.round(ui.zoom * 100) });
}

function closeTopMenus() {
  menuRoots.forEach((root) => {
    root.classList.remove("open");
    const panel = root.querySelector(".menu-panel");
    if (panel) {
      panel.style.position = "";
      panel.style.left = "";
      panel.style.right = "";
      panel.style.top = "";
      panel.style.maxHeight = "";
      panel.style.width = "";
    }
  });
  document.querySelectorAll(".menu-submenu.open").forEach((item) => item.classList.remove("open"));
}

function positionCompactTopMenu(root) {
  if (!root || !isCompactTabletLayout()) {
    return;
  }
  const panel = root.querySelector(".menu-panel");
  const title = root.querySelector(".menu-title");
  if (!panel || !title) {
    return;
  }
  const titleRect = title.getBoundingClientRect();
  const viewportPadding = 8;
  const desiredWidth = Math.min(380, Math.max(240, window.innerWidth - viewportPadding * 2));
  const maxLeft = Math.max(viewportPadding, window.innerWidth - desiredWidth - viewportPadding);
  const left = Math.round(Math.min(Math.max(titleRect.left, viewportPadding), maxLeft));
  const top = Math.round(titleRect.bottom + 4);
  panel.style.position = "fixed";
  panel.style.left = `${left}px`;
  panel.style.right = "auto";
  panel.style.top = `${top}px`;
  panel.style.width = `${desiredWidth}px`;
  panel.style.maxHeight = `${Math.max(180, window.innerHeight - top - 12)}px`;
}

function toggleTopMenu(root) {
  const wasOpen = root.classList.contains("open");
  closeTopMenus();
  if (!wasOpen) {
    root.classList.add("open");
    positionCompactTopMenu(root);
  }
}

function hideContextMenu() {
  contextMenu.classList.add("hidden");
  contextMenu.innerHTML = "";
}

function showContextMenu(clientX, clientY, items) {
  closeTopMenus();
  contextMenu.innerHTML = "";
  items.forEach((item) => {
    if (item?.title) {
      const title = document.createElement("div");
      title.className = "context-menu-title";
      title.textContent = item.label;
      contextMenu.appendChild(title);
      return;
    }
    if (item?.separator) {
      const sep = document.createElement("hr");
      sep.className = "context-menu-sep";
      contextMenu.appendChild(sep);
      return;
    }
    const btn = document.createElement("button");
    btn.type = "button";
    if (item.icon) {
      const label = document.createElement("span");
      label.className = "context-menu-command-label";
      const icon = document.createElement("span");
      icon.className = "context-menu-item-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = item.icon;
      const text = document.createElement("span");
      text.textContent = item.label;
      label.append(icon, text);
      btn.appendChild(label);
    } else {
      btn.textContent = item.label;
    }
    btn.disabled = Boolean(item.disabled);
    btn.addEventListener("click", () => {
      hideContextMenu();
      item.action();
    });
    contextMenu.appendChild(btn);
  });

  contextMenu.classList.remove("hidden");
  const rect = contextMenu.getBoundingClientRect();
  const left = Math.min(clientX, window.innerWidth - rect.width - 8);
  const top = Math.min(clientY, window.innerHeight - rect.height - 8);
  contextMenu.style.left = `${Math.max(8, left)}px`;
  contextMenu.style.top = `${Math.max(8, top)}px`;
}

function getNodeById(id) {
  return graph.nodes.find((n) => n.id === id);
}

function getEdgeById(id) {
  return graph.edges.find((e) => e.id === id);
}

function getWidgetById(id) {
  return graph.widgets.find((w) => w.id === id);
}

function nodeExists(id) {
  return graph.nodes.some((n) => n.id === id);
}

function textItemExists(id) {
  return graph.textItems.some((item) => item.id === id);
}

function getTextItemById(id) {
  return graph.textItems.find((item) => item.id === id) || null;
}

function clearAllSelection() {
  requestExpressionEditorSelectionChange(() => {
    ui.selected = null;
    ui.selectedNodes.clear();
    ui.selectedControlPoint = null;
    ui.lastControlPointTap = null;
    refreshSidebar();
  }, "");
}

function syncNodeSelectionFocus() {
  if (ui.selected?.type === "widget") {
    const widget = getWidgetById(ui.selected.id);
    if (!widget) {
      ui.selected = null;
    }
    ui.selectedNodes.clear();
    return;
  }

  ui.selectedNodes = new Set([...ui.selectedNodes].filter(nodeExists));

  if (ui.selected?.type === "edge") {
    ui.selectedNodes.clear();
    return;
  }

  if (ui.selected?.type === "edgeLabel") {
    const edge = getEdgeById(ui.selected.id);
    if (!edge?.label?.text) {
      ui.selected = null;
    }
    ui.selectedNodes.clear();
    return;
  }

  if (ui.selected?.type === "text") {
    const item = getTextItemById(ui.selected.id);
    if (!item) {
      ui.selected = null;
    }
    ui.selectedNodes.clear();
    return;
  }

  if (ui.selectedNodes.size === 1) {
    const id = [...ui.selectedNodes][0];
    ui.selected = { type: "node", id };
  } else {
    if (ui.selected?.type === "node") {
      ui.selected = null;
    }
  }
}

function selectEdge(id) {
  requestExpressionEditorSelectionChange(() => {
    ui.selected = { type: "edge", id };
    ui.selectedNodes.clear();
    ui.selectedControlPoint = null;
    refreshSidebar();
  }, `edge:${id}`);
}

function selectEdgeLabel(id) {
  requestExpressionEditorSelectionChange(() => {
    ui.selected = { type: "edgeLabel", id };
    ui.selectedNodes.clear();
    ui.selectedControlPoint = null;
    refreshSidebar();
  }, `edgeLabel:${id}`);
}

function normalizeEdgeLabel(label) {
  const text = String(label?.text ?? "").trim();
  if (!text) return null;
  const x = Number(label?.x);
  const y = Number(label?.y);
  return {
    text,
    x: Number.isFinite(x) ? x : 0,
    y: Number.isFinite(y) ? y : 0,
    rotation: Number.isFinite(Number(label?.rotation)) ? Number(label.rotation) : 0,
    transparent: Boolean(label?.transparent),
  };
}

function defaultEdgeLabel(edge, text = "") {
  const points = buildEdgeGeometry(edge)?.points || [];
  const start = points[0] || { x: 0, y: 0 };
  const end = points[points.length - 1] || start;
  return {
    text: String(text).trim(),
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2 - 18,
    rotation: 0,
    transparent: false,
  };
}

function selectWidget(id) {
  requestExpressionEditorSelectionChange(() => {
    ui.selected = { type: "widget", id };
    ui.selectedNodes.clear();
    ui.selectedControlPoint = null;
    refreshSidebar();
  }, `widget:${id}`);
}

function selectTextItem(id) {
  requestExpressionEditorSelectionChange(() => {
    ui.selected = { type: "text", id };
    ui.selectedNodes.clear();
    ui.selectedControlPoint = null;
    refreshSidebar();
  }, `text:${id}`);
}

function isTextEditorOpen() {
  return Boolean(textEditorModal && !textEditorModal.classList.contains("hidden"));
}

function syncSelectedTextInputs(item = null) {
  const target = item || (ui.selected?.type === "text" ? getTextItemById(ui.selected.id) : null);
  if (!target) {
    return;
  }
  const value = String(target.html ?? "");
  if (textHtmlInput && document.activeElement !== textHtmlInput) {
    textHtmlInput.value = value;
  }
  if (textEditorInput && document.activeElement !== textEditorInput) {
    textEditorInput.value = value;
  }
}

function closeTextEditor() {
  if (!textEditorModal) {
    return;
  }
  textEditorModal.classList.add("hidden");
}

function openTextEditor() {
  const item = ui.selected?.type === "text" ? getTextItemById(ui.selected.id) : null;
  if (!item || !textEditorModal) {
    return;
  }
  syncSelectedTextInputs(item);
  textEditorModal.classList.remove("hidden");
  window.requestAnimationFrame(() => {
    textEditorInput?.focus();
  });
}

function selectSingleNode(id) {
  requestExpressionEditorSelectionChange(() => {
    ui.selected = { type: "node", id };
    ui.selectedNodes = new Set([id]);
    ui.selectedControlPoint = null;
    refreshSidebar();
  }, `node:${id}`);
}

function addNodeToSelection(id) {
  if (ui.selectedNodes.has(id)) {
    return;
  }
  requestExpressionEditorSelectionChange(() => {
    ui.selectedNodes.add(id);
    ui.selectedControlPoint = null;
    ui.selected = null;
    syncNodeSelectionFocus();
    refreshSidebar();
  }, "");
}

function setNodeSelection(ids, additive = false) {
  const nextIds = new Set(additive ? [...ui.selectedNodes] : []);
  ids.forEach((id) => nextIds.add(id));
  const nextSelectionKey = nextIds.size === 1 ? `node:${[...nextIds][0]}` : "";
  requestExpressionEditorSelectionChange(() => {
    if (!additive) {
      ui.selectedNodes.clear();
    }
    ids.forEach((id) => ui.selectedNodes.add(id));
    ui.selected = null;
    ui.selectedControlPoint = null;
    syncNodeSelectionFocus();
    refreshSidebar();
  }, nextSelectionKey);
}

function exportGraphData() {
  syncPresentationGroups();
  syncDashboard();
  return {
    version: 1,
    modelTitle: String(graph.modelTitle ?? ""),
    externalData: graph.externalData.map((entry) => ({
      id: String(entry.id || ""),
      path: String(entry.path),
      type: "csv",
    })),
    localFunctions: sanitizeLocalFunctions(graph).map((definition) => ({
      name: definition.name,
      params: definition.params.slice(),
      expression: definition.expression,
      description: definition.description,
    })),
    view: {
      zoom: clampZoom(Number(ui.zoom) || 1),
      showGrid: ui.showGrid === true,
      highlightNodeEdges: ui.highlightNodeEdges === true,
      showNodeValues: ui.showNodeValues === true,
      showEdgeValues: ui.showEdgeValues === true,
      gridSize: clamp(Number(ui.gridSize) || 20, 5, 100),
      tooltipDelayMs: normalizeTooltipDelayMs(ui.tooltipDelayMs),
      scrollLeft: Math.max(0, Number(graphViewport?.scrollLeft) || 0),
      scrollTop: Math.max(0, Number(graphViewport?.scrollTop) || 0),
    },
    debug: {
      watches: sanitizeDebugConfig(graph).watches.slice(),
      breakpointEnabled: Boolean(ensureDebugConfig(graph).breakpointEnabled),
      breakpointExpression: String(ensureDebugConfig(graph).breakpointExpression ?? ""),
    },
    modelProperties: graph.properties.map((p) => ({ key: String(p.key), value: String(p.value) })),
    nodeCounter,
    edgeCounter,
    widgetCounter,
    textItemCounter,
    presentationGroupCounter,
    presentationGroups: graph.presentationGroups.map((group) => ({
      id: group.id,
      name: group.name,
      nodeIds: group.nodeIds.slice(),
      visible: group.visible !== false,
      showFrame: group.showFrame !== false,
    })),
    dashboard: graph.dashboard ? {
      visible: graph.dashboard.visible !== false,
      x: graph.dashboard.x,
      y: graph.dashboard.y,
      width: graph.dashboard.width,
      height: graph.dashboard.height,
      activePageId: graph.dashboard.activePageId,
      nextPageId: graph.dashboard.nextPageId,
      pages: graph.dashboard.pages.map((page) => ({ id: page.id, title: page.title })),
    } : null,
    execution: {
      t0: graph.execution.t0,
      dt: graph.execution.dt,
      t1: graph.execution.t1,
      delayMs: graph.execution.delayMs,
      renderEverySteps: graph.execution.renderEverySteps,
      decimals: clampDisplayDecimals(graph.execution.decimals),
      integrator: String(graph.execution.integrator ?? "euler"),
      strictDefinitions: Boolean(graph.execution.strictDefinitions),
    },
    nodes: graph.nodes.map((n) => {
      normalizeNodeDescriptionProperty(n);
      normalizeNodeFormulaNotesProperty(n);
      const type = serializeNodeType(n.shape);
      const out = {
        id: n.id,
        name: n.name,
        output: Boolean(n.output),
        global: Boolean(n.global),
        type,
        x: n.x,
        y: n.y,
        width: n.width,
        height: n.height,
        fillColor: String(n.fillColor ?? ""),
        strokeColor: String(n.strokeColor ?? ""),
        properties: n.properties.map((p) => ({ key: String(p.key), value: String(p.value) })),
      };
      if (type === "algebraic") {
        out.input = Boolean(n.input);
      }
      if (type === "algebraic") {
        out.valueExpression = String(n.valueExpression ?? "");
      } else if (type === "state") {
        out.stateTransition = String(n.valueExpression ?? "");
        out.initialState = String(n.initialStateExpression ?? "");
      } else if (type === "submodel") {
        out.modelPath = String(n.modelPath ?? "");
        out.inputBindings = n.inputBindings && typeof n.inputBindings === "object"
          ? Object.fromEntries(
            Object.entries(n.inputBindings)
              .map(([key, value]) => [String(key), String(value ?? "")])
              .filter(([key]) => key.trim()),
          )
          : {};
        out.interfaceCache = normalizeSubmodelInterfaceCache(n.interfaceCache);
      } else {
        out.valueExpression = String(n.valueExpression ?? "");
      }
      return out;
    }),
    edges: graph.edges.map((e) => ({
      id: e.id,
      from: e.from,
      to: e.to,
      relationType: normalizeEdgeRelationType(e.relationType),
      controlPoints: (e.controlPoints || []).map((cp) => ({ x: cp.x, y: cp.y })),
      label: normalizeEdgeLabel(e.label),
    })),
    textItems: graph.textItems.map((item) => ({
      id: item.id,
      x: item.x,
      y: item.y,
      width: item.width,
      height: item.height,
      fillColor: String(item.fillColor ?? ""),
      strokeColor: String(item.strokeColor ?? ""),
      dashboardPageId: normalizeDashboardPageId(item.dashboardPageId),
      html: String(item.html ?? ""),
    })),
    widgets: graph.widgets.map((w) => ({
      id: w.id,
      type: w.type,
      customTitle: String(w.customTitle ?? ""),
      x: w.x,
      y: w.y,
      width: w.width,
      height: w.height,
      dashboardPageId: normalizeDashboardPageId(w.dashboardPageId),
      minimized: Boolean(w.minimized),
      showTitleBar: w.showTitleBar !== false,
      fontSize: Number.isFinite(Number(w.fontSize))
        ? clamp(Math.round(Number(w.fontSize)), 8, 32)
        : (Number.isFinite(Number(w.tableFontSize)) ? clamp(Math.round(Number(w.tableFontSize)), 8, 32) : 13),
      outputOnly: Boolean(w.outputOnly),
      showHistory: Boolean(w.showHistory),
      expandNonScalarValues: Boolean(w.expandNonScalarValues),
      tableTextAlign: ["left", "center", "right"].includes(String(w.tableTextAlign ?? "")) ? String(w.tableTextAlign) : "left",
      tableDecimalDigits: Number.isInteger(Number(w.tableDecimalDigits)) && Number(w.tableDecimalDigits) >= 0 && Number(w.tableDecimalDigits) <= 12
        ? Number(w.tableDecimalDigits)
        : null,
      tableScrolling: w.tableScrolling === "first" ? "first" : "last",
      xMin: serializeAutoNullableNumber(w.xMin),
      xMax: serializeAutoNullableNumber(w.xMax),
      yMin: serializeAutoNullableNumber(w.yMin),
      yMax: serializeAutoNullableNumber(w.yMax),
      xAxisLabel: String(w.xAxisLabel ?? "").trim().slice(0, 120),
      yAxisLabel: String(w.yAxisLabel ?? "").trim().slice(0, 120),
      showGrid: w.showGrid !== false,
      legendPosition: ["none", "top-right", "top-left", "bottom-right", "bottom-left"].includes(String(w.legendPosition ?? ""))
        ? String(w.legendPosition)
        : "top-right",
      barWidth: Number.isFinite(Number(w.barWidth)) ? clamp(Number(w.barWidth), 0.1, 1) : 0.8,
      showXTicks: w.showXTicks !== false,
      xTickLabels: Array.isArray(w.xTickLabels) ? w.xTickLabels.map((entry) => ({ value: Number(entry?.value), label: String(entry?.label ?? "") })).filter((entry) => Number.isFinite(entry.value)) : [],
      source: String(w.source ?? ""),
      showNumericValues: w.showNumericValues !== false,
      showIndices: w.showIndices !== false,
      autoFitCells: w.autoFitCells !== false,
      cellSize: Number.isFinite(Number(w.cellSize)) ? clamp(Number(w.cellSize), 2, 96) : 28,
      valueMin: serializeAutoNullableNumber(w.valueMin),
      valueMax: serializeAutoNullableNumber(w.valueMax),
      displayRows: Number.isInteger(Number(w.displayRows)) && Number(w.displayRows) > 0 ? Number(w.displayRows) : null,
      displayCols: Number.isInteger(Number(w.displayCols)) && Number(w.displayCols) > 0 ? Number(w.displayCols) : null,
      colorScheme: ["blue", "heat", "grayscale", "diverging", "none"].includes(String(w.colorScheme ?? ""))
        ? String(w.colorScheme)
        : "blue",
      viewMode: ["grid", "surface"].includes(String(w.viewMode ?? "")) ? String(w.viewMode) : "grid",
      surfaceStyle: ["solid", "wireframe"].includes(String(w.surfaceStyle ?? "")) ? String(w.surfaceStyle) : "solid",
      surfaceAzimuth: Number.isFinite(Number(w.surfaceAzimuth)) ? clamp(Number(w.surfaceAzimuth), -180, 180) : 45,
      surfaceElevation: Number.isFinite(Number(w.surfaceElevation)) ? clamp(Number(w.surfaceElevation), 5, 85) : 32,
      surfaceHeightScale: Number.isFinite(Number(w.surfaceHeightScale)) ? clamp(Number(w.surfaceHeightScale), 0.1, 10) : 1,
      min: Number.isFinite(Number(w.min)) ? Number(w.min) : 0,
      max: Number.isFinite(Number(w.max)) ? Number(w.max) : 100,
      step: Number.isFinite(Number(w.step)) ? Number(w.step) : 1,
      value: w.type === "button"
        ? Boolean(w.initialValue ?? w.value)
        : (Number.isFinite(Number(w.value)) ? Number(w.value) : 0),
      initialValue: w.type === "button" ? Boolean(w.initialValue ?? w.value) : undefined,
      buttonMode: w.type === "button" && w.buttonMode === "momentary" ? "momentary" : "toggle",
      falseLabel: String(w.falseLabel ?? ""),
      trueLabel: String(w.trueLabel ?? ""),
      options: Array.isArray(w.options)
        ? w.options.map((option) => ({
          label: String(option?.label ?? ""),
          value: Number.isFinite(Number(option?.value)) ? Number(option.value) : 0,
        }))
        : [],
      mappings: Array.isArray(w.mappings)
        ? w.mappings.map((mapping) => ({
          value: Number.isFinite(Number(mapping?.value)) ? Number(mapping.value) : 0,
          label: String(mapping?.label ?? ""),
        }))
        : [],
      columns: Array.isArray(w.columns) ? w.columns.map(normalizeTableColumnName) : [],
      tableColumnOptions: normalizeTableColumnOptions(w.tableColumnOptions),
      xyPairs: Array.isArray(w.xyPairs)
        ? w.xyPairs.map((pair, idx) => ({
          xSource: String(pair.xSource ?? "time"),
          ySource: String(pair.ySource ?? ""),
          visualizedLabel: String(pair.visualizedLabel ?? "").trim().slice(0, 120),
          showTimeSeries: normalizeChartSeriesToggle(pair?.showTimeSeries, pair?.seriesMode !== "instant"),
          showInstantProfile: normalizeChartSeriesToggle(pair?.showInstantProfile, pair?.seriesMode === "instant" ? true : false),
          color: /^#[0-9a-fA-F]{6}$/.test(String(pair?.color ?? "")) ? String(pair.color) : defaultChartSeriesColor(idx),
          pointColor: /^#[0-9a-fA-F]{6}$/.test(String(pair?.pointColor ?? "")) ? String(pair.pointColor) : (/^#[0-9a-fA-F]{6}$/.test(String(pair?.color ?? "")) ? String(pair.color) : defaultChartSeriesColor(idx)),
          showLine: pair?.showLine !== false,
          lineWidth: Number.isFinite(Number(pair?.lineWidth)) ? clamp(Number(pair.lineWidth), 1, 8) : 2.2,
          lineStyle: normalizeChartLineStyle(pair?.lineStyle),
          pointMode: normalizeChartPointMode(pair?.pointMode, pair?.showPoints),
          pointSize: Number.isFinite(Number(pair?.pointSize)) ? clamp(Number(pair.pointSize), 1, 12) : 2.4,
        }))
        : [],
    })),
  };
}

function currentSnapshot() {
  return JSON.stringify(exportGraphData());
}

function captureCurrentModelContext(nodeName = "") {
  return {
    data: exportGraphData(),
    currentFileHandle,
    currentFileName,
    currentModelDirectoryHandle,
    lastSavedSnapshot,
    dirtySinceLastSave,
    statusMessage: String(statusText?.textContent || ""),
    history: {
      undo: deepClone(history.undo),
      redo: deepClone(history.redo),
    },
    view: {
      zoom: ui.zoom,
      showGrid: ui.showGrid,
      highlightNodeEdges: ui.highlightNodeEdges,
      showNodeValues: ui.showNodeValues,
      showEdgeValues: ui.showEdgeValues,
      gridSize: ui.gridSize,
      tooltipDelayMs: normalizeTooltipDelayMs(ui.tooltipDelayMs),
      scrollLeft: graphViewport.scrollLeft,
      scrollTop: graphViewport.scrollTop,
    },
    nodeName: String(nodeName || ""),
  };
}

function restoreModelContext(context) {
  if (!context) {
    return;
  }
  stopTimedExecution(false);
  applyGraphData(context.data);
  currentFileHandle = context.currentFileHandle || null;
  currentFileName = context.currentFileName || "";
  currentModelDirectoryHandle = context.currentModelDirectoryHandle || null;
  lastSavedSnapshot = String(context.lastSavedSnapshot || "");
  dirtySinceLastSave = Boolean(context.dirtySinceLastSave);
  history.undo = Array.isArray(context.history?.undo) ? deepClone(context.history.undo) : [];
  history.redo = Array.isArray(context.history?.redo) ? deepClone(context.history.redo) : [];
  history.transactionStart = null;
  clearAllSelection();
  ui.zoom = clampZoom(Number(context.view?.zoom) || 1);
  ui.showGrid = context.view?.showGrid === true;
  ui.highlightNodeEdges = context.view?.highlightNodeEdges === true;
  ui.showNodeValues = context.view?.showNodeValues === true;
  ui.showEdgeValues = context.view?.showEdgeValues === true;
  ui.gridSize = clamp(Number(context.view?.gridSize) || ui.gridSize || 20, 5, 100);
  ui.tooltipDelayMs = normalizeTooltipDelayMs(context.view?.tooltipDelayMs);
  setStatus(String(context.statusMessage || t("status.ready")));
  updateHistoryButtons();
  updateFileStatusLabel(dirtySinceLastSave);
  render();
  window.requestAnimationFrame(() => {
    graphViewport.scrollLeft = Number(context.view?.scrollLeft) || 0;
    graphViewport.scrollTop = Number(context.view?.scrollTop) || 0;
  });
}

function markSavedSnapshot() {
  lastSavedSnapshot = currentSnapshot();
  dirtySinceLastSave = false;
  updateFileStatusLabel(false);
}

function hasUnsavedChanges() {
  return currentSnapshot() !== lastSavedSnapshot;
}

function applyGraphData(data, { deferReadDataInitialization = false } = {}) {
  stopTimedExecution(false);
  clearRuntimeSubmodelState();
  ui.submodelsPrepared = false;
  ui.localFunctionsEditor = null;
  const execCfg = normalizeExecutionConfig(data.execution);
  const savedView = data?.view && typeof data.view === "object" ? data.view : null;
  linkedReadDataFileHandles.clear();
  graph.modelTitle = String(data?.modelTitle ?? "");
  graph.externalData = normalizeExternalDataEntries(data?.externalData);
  graph.properties = Array.isArray(data?.modelProperties)
    ? data.modelProperties.map((p) => ({ key: String(p?.key ?? ""), value: String(p?.value ?? "") }))
    : [];
  graph.localFunctions = Array.isArray(data?.localFunctions)
    ? data.localFunctions.map((definition) => sanitizeLocalFunctionDefinition(definition))
    : [];
  graph.presentationGroups = sanitizePresentationGroups(data?.presentationGroups, data?.nodes);
  graph.dashboard = sanitizeDashboard(data?.dashboard);
  graph.debug = {
    watches: Array.isArray(data?.debug?.watches) ? data.debug.watches.map((name) => String(name ?? "")) : [],
    breakpointEnabled: Boolean(data?.debug?.breakpointEnabled),
    breakpointExpression: String(data?.debug?.breakpointExpression ?? ""),
  };
  graph.execution = {
    t0: execCfg.t0,
    dt: execCfg.dt,
    t1: execCfg.t1,
    delayMs: execCfg.delayMs,
    renderEverySteps: execCfg.renderEverySteps,
    decimals: execCfg.decimals,
    integrator: execCfg.integrator,
    strictDefinitions: execCfg.strictDefinitions,
    currentTime: null,
  };

  graph.nodes = data.nodes.map((n) => {
    const shape = deserializeNodeType(n.type);
    const node = {
      id: n.id,
      name: n.name,
      input: shape === "ellipse" ? Boolean(n.input) : false,
      output: Boolean(n.output),
      global: shape === "diamond" ? Boolean(n.global) : false,
      shape,
      x: n.x,
      y: n.y,
      width: n.width,
      height: n.height,
      fillColor: normalizeColorString(n.fillColor),
      strokeColor: normalizeColorString(n.strokeColor),
      valueExpression: shape === "rect"
        ? String(n.stateTransition ?? "")
        : String(n.valueExpression ?? ""),
      initialStateExpression: shape === "rect"
        ? String(n.initialState ?? "")
        : String(n.initialStateExpression ?? ""),
      modelPath: shape === "submodel" ? String(n.modelPath ?? "") : "",
      inputBindings: shape === "submodel" && n.inputBindings && typeof n.inputBindings === "object"
        ? Object.fromEntries(
          Object.entries(n.inputBindings)
            .map(([key, value]) => [String(key), String(value ?? "")])
            .filter(([key]) => key.trim()),
        )
        : {},
      interfaceCache: shape === "submodel"
        ? normalizeSubmodelInterfaceCache(n.interfaceCache)
        : emptySubmodelInterfaceCache(),
      submodelError: "",
      computedValue: null,
      computedError: "",
      pendingStateValue: null,
      pendingStateError: "",
      properties: n.properties.map((p) => ({ key: p.key, value: p.value })),
    };
    normalizeNodeDescriptionProperty(node);
    normalizeNodeFormulaNotesProperty(node);
    sanitizeNodeVisualOptions(node);
    return node;
  });
  graph.edges = data.edges
    .filter((e) => normalizeEdgeRelationType(e?.relationType) !== "0")
    .map((e) => ({
      id: e.id,
      from: e.from,
      to: e.to,
      relationType: normalizeEdgeRelationType(e.relationType),
      controlPoints: (e.controlPoints || []).map((cp) => ({ x: cp.x, y: cp.y })),
      label: normalizeEdgeLabel(e.label),
    }));
  graph.textItems = Array.isArray(data.textItems)
    ? data.textItems.map((item) => {
      const out = {
        id: item.id,
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.height,
        fillColor: normalizeColorString(item.fillColor),
        strokeColor: normalizeColorString(item.strokeColor),
        dashboardPageId: item.dashboardPageId,
        html: String(item.html ?? ""),
      };
      sanitizeTextItem(out);
      return out;
    })
    : [];
  graph.widgets = Array.isArray(data.widgets)
    ? data.widgets
      .filter((w) => Number.isInteger(w.id) && (w.type === "table" || w.type === "xychart" || w.type === "barplot" || w.type === "slider" || w.type === "matrix" || w.type === "button" || w.type === "led" || w.type === "select" || w.type === "text"))
      .map((w) => ({
        id: w.id,
        type: w.type,
        customTitle: String(w.customTitle ?? ""),
        x: Number.isFinite(Number(w.x)) ? Number(w.x) : 40,
        y: Number.isFinite(Number(w.y)) ? Number(w.y) : 40,
        width: clamp(Number(w.width) || 320, widgetMinDimensions(w).width, 1200),
        height: clamp(Number(w.height) || 160, widgetMinDimensions(w).height, 900),
        dashboardPageId: normalizeDashboardPageId(w.dashboardPageId),
        minimized: Boolean(w.minimized),
        showTitleBar: w.showTitleBar !== false,
        fontSize: Number.isFinite(Number(w.fontSize))
          ? clamp(Math.round(Number(w.fontSize)), 8, 32)
          : (Number.isFinite(Number(w.tableFontSize)) ? clamp(Math.round(Number(w.tableFontSize)), 8, 32) : 13),
        outputOnly: Boolean(w.outputOnly),
        showHistory: Boolean(w.showHistory),
        expandNonScalarValues: Boolean(w.expandNonScalarValues) && !Boolean(w.showHistory),
        tableTextAlign: ["left", "center", "right"].includes(String(w.tableTextAlign ?? "")) ? String(w.tableTextAlign) : "left",
        tableDecimalDigits: Number.isInteger(Number(w.tableDecimalDigits)) && Number(w.tableDecimalDigits) >= 0 && Number(w.tableDecimalDigits) <= 12
          ? Number(w.tableDecimalDigits)
          : null,
        tableScrolling: w.tableScrolling === "first" ? "first" : "last",
        xMin: parseAutoNullableNumber(w.xMin),
        xMax: parseAutoNullableNumber(w.xMax),
        yMin: parseAutoNullableNumber(w.yMin),
        yMax: parseAutoNullableNumber(w.yMax),
        xAxisLabel: String(w.xAxisLabel ?? "").trim().slice(0, 120),
        yAxisLabel: String(w.yAxisLabel ?? "").trim().slice(0, 120),
        showGrid: w.showGrid !== false,
        legendPosition: ["none", "top-right", "top-left", "bottom-right", "bottom-left"].includes(String(w.legendPosition ?? ""))
          ? String(w.legendPosition)
          : "top-right",
        barWidth: Number.isFinite(Number(w.barWidth)) ? clamp(Number(w.barWidth), 0.1, 1) : 0.8,
        showXTicks: w.showXTicks !== false,
        xTickLabels: Array.isArray(w.xTickLabels) ? w.xTickLabels.map((entry) => ({ value: Number(entry?.value), label: String(entry?.label ?? "") })).filter((entry) => Number.isFinite(entry.value)) : [],
        source: String(w.source ?? ""),
        showNumericValues: w.showNumericValues !== false,
        showIndices: w.showIndices !== false,
        autoFitCells: w.autoFitCells !== false,
        cellSize: Number.isFinite(Number(w.cellSize)) ? clamp(Number(w.cellSize), 2, 96) : 28,
        valueMin: parseAutoNullableNumber(w.valueMin),
        valueMax: parseAutoNullableNumber(w.valueMax),
        displayRows: Number.isInteger(Number(w.displayRows)) && Number(w.displayRows) > 0 ? Number(w.displayRows) : null,
        displayCols: Number.isInteger(Number(w.displayCols)) && Number(w.displayCols) > 0 ? Number(w.displayCols) : null,
        colorScheme: ["blue", "heat", "grayscale", "diverging", "none"].includes(String(w.colorScheme ?? ""))
          ? String(w.colorScheme)
          : "blue",
        viewMode: ["grid", "surface"].includes(String(w.viewMode ?? "")) ? String(w.viewMode) : "grid",
        surfaceStyle: ["solid", "wireframe"].includes(String(w.surfaceStyle ?? "")) ? String(w.surfaceStyle) : "solid",
        surfaceAzimuth: Number.isFinite(Number(w.surfaceAzimuth)) ? clamp(Number(w.surfaceAzimuth), -180, 180) : 45,
        surfaceElevation: Number.isFinite(Number(w.surfaceElevation)) ? clamp(Number(w.surfaceElevation), 5, 85) : 32,
        surfaceHeightScale: Number.isFinite(Number(w.surfaceHeightScale)) ? clamp(Number(w.surfaceHeightScale), 0.1, 10) : 1,
        min: Number.isFinite(Number(w.min)) ? Number(w.min) : 0,
        max: Number.isFinite(Number(w.max)) ? Number(w.max) : 100,
        step: Number.isFinite(Number(w.step)) ? Number(w.step) : 1,
        value: w.type === "button"
          ? (w.initialValue === true || w.initialValue === "true" || w.initialValue === 1 || w.initialValue === "1"
            || ((w.initialValue == null) && (w.value === true || w.value === "true" || w.value === 1 || w.value === "1")))
          : (Number.isFinite(Number(w.value)) ? Number(w.value) : 0),
        initialValue: w.type === "button"
          ? (w.initialValue === true || w.initialValue === "true" || w.initialValue === 1 || w.initialValue === "1"
            || ((w.initialValue == null) && (w.value === true || w.value === "true" || w.value === 1 || w.value === "1")))
          : undefined,
        buttonMode: w.type === "button" && w.buttonMode === "momentary" ? "momentary" : "toggle",
        falseLabel: String(w.falseLabel ?? ""),
        trueLabel: String(w.trueLabel ?? ""),
        options: Array.isArray(w.options)
          ? w.options.map((option) => ({
            label: String(option?.label ?? ""),
            value: Number.isFinite(Number(option?.value)) ? Number(option.value) : 0,
          }))
          : [],
        mappings: Array.isArray(w.mappings)
          ? w.mappings.map((mapping) => ({
            value: Number.isFinite(Number(mapping?.value)) ? Number(mapping.value) : 0,
            label: String(mapping?.label ?? ""),
          }))
          : [],
        rows: [],
        columns: Array.isArray(w.columns) ? w.columns.map(normalizeTableColumnName) : [],
        tableColumnOptions: normalizeTableColumnOptions(w.tableColumnOptions),
        xyPairs: Array.isArray(w.xyPairs)
          ? w.xyPairs.map((pair, idx) => ({
            xSource: String(pair.xSource ?? "time"),
            ySource: String(pair.ySource ?? ""),
            visualizedLabel: String(pair.visualizedLabel ?? "").trim().slice(0, 120),
            showTimeSeries: normalizeChartSeriesToggle(pair?.showTimeSeries, pair?.seriesMode !== "instant"),
            showInstantProfile: normalizeChartSeriesToggle(pair?.showInstantProfile, pair?.seriesMode === "instant" ? true : false),
            color: /^#[0-9a-fA-F]{6}$/.test(String(pair?.color ?? "")) ? String(pair.color) : defaultChartSeriesColor(idx),
            pointColor: /^#[0-9a-fA-F]{6}$/.test(String(pair?.pointColor ?? "")) ? String(pair.pointColor) : (/^#[0-9a-fA-F]{6}$/.test(String(pair?.color ?? "")) ? String(pair.color) : defaultChartSeriesColor(idx)),
            showLine: pair?.showLine !== false,
            lineWidth: Number.isFinite(Number(pair?.lineWidth)) ? clamp(Number(pair.lineWidth), 1, 8) : 2.2,
            lineStyle: normalizeChartLineStyle(pair?.lineStyle),
            pointMode: normalizeChartPointMode(pair?.pointMode, pair?.showPoints),
            pointSize: Number.isFinite(Number(pair?.pointSize)) ? clamp(Number(pair.pointSize), 1, 12) : 2.4,
            points: [],
          }))
          : (() => {
            const legacyX = String(w.xSource ?? w.xNode ?? "time");
            const legacyYNodes = Array.isArray(w.yNodes)
              ? w.yNodes.map((n) => String(n))
              : (w.yNode ? [String(w.yNode)] : []);
            return legacyYNodes.map((yNode, idx) => ({
              xSource: legacyX,
              ySource: yNode,
              showTimeSeries: true,
              showInstantProfile: false,
              color: defaultChartSeriesColor(idx),
              showLine: true,
              lineWidth: 2.2,
              lineStyle: "solid",
              pointMode: "all",
              pointSize: 2.4,
              points: [],
            }));
          })(),
      }))
    : [];
  syncDashboard();
  clearSimulationOutputHistory();
  sanitizeDebugConfig(graph);
  sanitizeLocalFunctions(graph);
  ui.watchPreviousSnapshot = new Map();
  ui.breakpointLastResult = null;

  nodeCounter = Number(data.nodeCounter) || 1;
  edgeCounter = Number(data.edgeCounter) || 1;
  widgetCounter = Number(data.widgetCounter) || 1;
  textItemCounter = Number(data.textItemCounter) || 1;
  presentationGroupCounter = Math.max(
    Number(data.presentationGroupCounter) || 1,
    graph.presentationGroups.reduce((max, group) => Math.max(max, group.id + 1), 1),
  );
  ui.zoom = clampZoom(Number(savedView?.zoom) || 1);
  ui.showGrid = savedView?.showGrid === true;
  ui.highlightNodeEdges = savedView?.highlightNodeEdges === true;
  ui.showNodeValues = savedView?.showNodeValues === true;
  ui.showEdgeValues = savedView?.showEdgeValues === true;
  ui.gridSize = clamp(Number(savedView?.gridSize) || ui.gridSize || 20, 5, 100);
  ui.tooltipDelayMs = normalizeTooltipDelayMs(savedView?.tooltipDelayMs);
  normalizeInputNodeFlags();
  // readData files are restored asynchronously after a model is loaded.
  // Do not evaluate their parameter expressions against an empty cache first:
  // that would briefly mark otherwise valid nodes as runtime errors.
  if (!deferReadDataInitialization || !graph.externalData.length) {
    initializeStateNodes(graph.execution.t0);
  }

  ui.drag = null;
  ui.resize = null;
  ui.edgeCreate = null;
  ui.edgeCreateHoverId = null;
  ui.edgeCreateLastPoint = null;
  ui.controlPointDrag = null;
  ui.marquee = null;
  ui.widgetDrag = null;
  ui.widgetResize = null;
  ui.textDrag = null;
  ui.textResize = null;
  invalidateExecutionPlan();
  clearAllSelection();
  window.requestAnimationFrame(() => {
    graphViewport.scrollLeft = Math.max(0, Number(savedView?.scrollLeft) || 0);
    graphViewport.scrollTop = Math.max(0, Number(savedView?.scrollTop) || 0);
  });
}

function pushUndoState(state) {
  history.undo.push(deepClone(state));
  if (history.undo.length > MAX_HISTORY) {
    history.undo.shift();
  }
}

function invalidateExecutionPlan() {
  ui.executionPlan = null;
  ui.submodelsPrepared = false;
}

function beginTransaction() {
  if (!history.transactionStart) {
    history.transactionStart = exportGraphData();
  }
}

function commitTransaction() {
  if (!history.transactionStart) {
    return;
  }

  const before = JSON.stringify(history.transactionStart);
  const afterState = exportGraphData();
  const after = JSON.stringify(afterState);
  if (before !== after) {
    pushUndoState(history.transactionStart);
    history.redo = [];
    dirtySinceLastSave = true;
    invalidateExecutionPlan();
    updateFileStatusLabel(true);
  }
  history.transactionStart = null;
  updateHistoryButtons();
}

function cancelTransaction() {
  history.transactionStart = null;
}

function runAction(mutator) {
  beginTransaction();
  mutator();
  commitTransaction();
  render();
}

function runWidgetAction(mutator) {
  return runAction(mutator);
}

function resetExecutionAfterEquationChange() {
  // An equation changes the model itself, unlike a value supplied by an input
  // widget. Do not continue a stateful execution with values computed from the
  // previous definition.
  if (graph.execution.currentTime == null || ui.equationResetInProgress) {
    return;
  }
  ui.equationResetInProgress = true;
  Promise.resolve(resetExecution()).finally(() => {
    ui.equationResetInProgress = false;
  });
}

function updateHistoryButtons() {
  const frozen = isEditingUiLocked();
  const hasPasteData = Boolean(clipboard.data || readStoredModelClipboardRaw() || hasPlatformApi("readClipboardText"));
  undoBtn.disabled = frozen || history.undo.length === 0;
  redoBtn.disabled = frozen || history.redo.length === 0;
  pasteBtn.disabled = frozen || !hasPasteData;
}

function hasClipboardSelection() {
  return ui.selectedNodes.size > 0;
}

function hasAnySelection() {
  return Boolean(
    ui.selectedNodes.size > 0 ||
    ui.selectedControlPoint ||
    ui.selected?.type === "edge" ||
    ui.selected?.type === "widget" ||
    ui.selected?.type === "text",
  );
}

function updateEditActionButtons() {
  const frozen = isEditingUiLocked();
  if (selectAllBtn) {
    selectAllBtn.disabled = graph.nodes.length === 0;
  }
  if (cutBtn) {
    cutBtn.disabled = frozen || !hasClipboardSelection();
  }
  if (copyBtn) {
    copyBtn.disabled = !hasClipboardSelection();
  }
  if (deleteBtn) {
    deleteBtn.disabled = frozen || !hasAnySelection();
  }
}

function isExecutionFrozen() {
  if (ui.timedRunHandle != null || ui.timedStepRunning) {
    return true;
  }
  if (graph.execution.currentTime == null) {
    return false;
  }
  const t0 = Number(graph.execution.t0);
  const dt = Number(graph.execution.dt);
  const t1 = Number(graph.execution.t1);
  if (!Number.isFinite(t0) || !Number.isFinite(dt) || !Number.isFinite(t1) || dt === 0) {
    return false;
  }
  if ((dt > 0 && t0 > t1) || (dt < 0 && t0 < t1)) {
    return false;
  }
  return !isExecutionEnded({ t0, dt, t1 });
}

function clearTimedExecutionStateSilently() {
  if (ui.timedRunHandle != null) {
    window.clearInterval(ui.timedRunHandle);
  }
  ui.timedRunHandle = null;
  ui.timedStepRunning = false;
  ui.timedRunStartedAt = 0;
  ui.timedStepLastActivityAt = 0;
}

function staleTimedExecutionThresholdMs() {
  const delayMs = Number(graph.execution.delayMs);
  if (Number.isFinite(delayMs) && delayMs > 0) {
    return Math.max(4000, delayMs * 3);
  }
  return 4000;
}

function hasStaleTimedExecutionLock(now = Date.now()) {
  if (ui.timedRunHandle == null || ui.timedStepRunning) {
    return false;
  }
  const lastActivity = Math.max(Number(ui.timedStepLastActivityAt) || 0, Number(ui.timedRunStartedAt) || 0);
  if (lastActivity <= 0) {
    return false;
  }
  return now - lastActivity > staleTimedExecutionThresholdMs();
}

function ensureEditingUiUnlockedIfIdle() {
  if (!hasStaleTimedExecutionLock()) {
    return false;
  }
  clearTimedExecutionStateSilently();
  updateEditingLockUi();
  render();
  return true;
}

function isEditingUiLocked() {
  if (ui.timedRunHandle == null && ui.timedStepRunning) {
    ui.timedStepRunning = false;
  }
  if (hasStaleTimedExecutionLock()) {
    clearTimedExecutionStateSilently();
  }
  return ui.timedRunHandle != null || ui.timedStepRunning;
}

function setControlsDisabled(root, disabled, allowedControls = []) {
  if (!root) {
    return;
  }
  const allowed = new Set((allowedControls || []).filter(Boolean));
  root.querySelectorAll("input, select, textarea, button").forEach((control) => {
    if (allowed.has(control)) {
      return;
    }
    if (disabled) {
      if (!control.disabled) {
        control.dataset.executionDisabled = "1";
        control.disabled = true;
      }
      return;
    }
    if (control.dataset.executionDisabled === "1") {
      control.disabled = false;
      delete control.dataset.executionDisabled;
    }
  });
}

function setExplicitControlDisabled(control, disabled) {
  if (!control) {
    return;
  }
  control.disabled = Boolean(disabled);
  if (!disabled && control.dataset.executionDisabled === "1") {
    delete control.dataset.executionDisabled;
  }
}

function releaseExecutionDisabledControls(root = document) {
  if (!root || typeof root.querySelectorAll !== "function") {
    return;
  }
  root.querySelectorAll("[data-execution-disabled='1']").forEach((control) => {
    control.disabled = false;
    delete control.dataset.executionDisabled;
  });
}

function updateEditingLockUi() {
  const frozen = isEditingUiLocked();
  // A manual step is still an execution session, even though editing remains
  // available. Keep the same visual cue used while a timed run is active.
  const executionActive = isExecutionFrozen();
  sidebar?.classList.toggle("execution-frozen", executionActive);
  [globalPanel, nodePanel, textPanel, edgePanel, widgetPanel].forEach((panel) => {
    panel?.classList.toggle("execution-frozen", executionActive);
  });
  [
    addRectNodeItem,
    addEllipseNodeItem,
    addDiamondNodeItem,
    addSubmodelNodeItem,
    addTextItem,
    addButtonWidgetItem,
    addSelectWidgetItem,
    addSliderWidgetItem,
    addLedWidgetItem,
    addTextWidgetItem,
    addMatrixWidgetItem,
    addTableWidgetItem,
    addXYChartWidgetItem,
  ].forEach((btn) => {
    if (btn) {
      btn.disabled = frozen;
    }
  });

  setControlsDisabled(globalPanel, frozen, [runFullModelBtn, manualStepBtn, timedToggleBtn, resetExecBtn]);
  setControlsDisabled(nodePanel, frozen);
  setControlsDisabled(textPanel, frozen);
  setControlsDisabled(edgePanel, frozen);
  setControlsDisabled(widgetPanel, frozen);
  setControlsDisabled(watchDebuggerModal, frozen, [watchDebuggerCloseBtn, watchDebuggerDismissBtn]);
  setControlsDisabled(localFunctionsModal, frozen, [localFunctionsCloseBtn, localFunctionsCancelBtn, localFunctionsApplyBtn]);
  setControlsDisabled(textEditorModal, frozen, [textEditorCloseBtn, textEditorDismissBtn]);

  [
    modelTitleInput,
    timeStartInput,
    timeStepInput,
    timeEndInput,
    timeDelayInput,
    renderEveryStepsInput,
    decimalDigitsInput,
    nodeNameInput,
    expressionNodeNameInput,
    expressionNodeShapeInput,
    expressionNodeInputInput,
    expressionNodeOutputInput,
    expressionNodeGlobalInput,
    nodeInitialStateInput,
    nodeModelPathInput,
    textWidthInput,
    textHeightInput,
    textHtmlInput,
    textEditorInput,
  ].forEach((control) => {
    setExplicitControlDisabled(control, frozen);
  });

  setExplicitControlDisabled(
    nodeValueExprInput,
    frozen || isWidgetControlledExpressionNode(selectedNodeForSidebar()),
  );
  setExplicitControlDisabled(
    editNodeValueExprBtn,
    frozen || isWidgetControlledExpressionNode(selectedNodeForSidebar()),
  );

  if (expressionEditorTextarea) {
    const editorNode = ui.expressionEditor?.nodeId ? getNodeById(ui.expressionEditor.nodeId) : null;
    setExplicitControlDisabled(expressionEditorTextarea, frozen || isWidgetControlledExpressionNode(editorNode));
  }
  if (expressionStateInitialInput) {
    setExplicitControlDisabled(
      expressionStateInitialInput,
      frozen || expressionStateInitialBlock?.classList.contains("hidden"),
    );
  }
  if (expressionDescriptionInput) {
    setExplicitControlDisabled(
      expressionDescriptionInput,
      frozen || !Boolean(ui.expressionEditor?.nodeId && ui.expressionEditor?.fieldKey !== "__custom__"),
    );
  }
  if (expressionFormulaNotesInput) {
    setExplicitControlDisabled(
      expressionFormulaNotesInput,
      frozen || !Boolean(ui.expressionEditor?.nodeId && ui.expressionEditor?.fieldKey !== "__custom__"),
    );
  }
  if (expressionSymbolsFilter) {
    setExplicitControlDisabled(expressionSymbolsFilter, frozen);
  }
  if (expressionEditorApplyBtn) {
    expressionEditorApplyBtn.disabled = frozen || Boolean(ui.expressionEditor && !ui.expressionEditor.syntaxOk);
  }
  if (!frozen) {
    releaseExecutionDisabledControls(document);
  }
}

function collectSelectedForClipboard() {
  if (ui.selectedNodes.size === 0) {
    return null;
  }
  const ids = new Set(ui.selectedNodes);
  const nodes = graph.nodes
    .filter((n) => ids.has(n.id))
    .map((n) => ({
      id: n.id,
      name: n.name,
      input: n.shape === "ellipse" ? Boolean(n.input) : false,
      output: Boolean(n.output),
      global: Boolean(n.global),
      shape: n.shape,
      x: n.x,
      y: n.y,
      width: n.width,
      height: n.height,
      fillColor: String(n.fillColor ?? ""),
      strokeColor: String(n.strokeColor ?? ""),
      valueExpression: n.valueExpression,
      initialStateExpression: n.initialStateExpression,
      modelPath: n.modelPath,
      inputBindings: deepClone(n.inputBindings || {}),
      interfaceCache: deepClone(normalizeSubmodelInterfaceCache(n.interfaceCache)),
      computedValue: n.computedValue,
      computedError: n.computedError,
      pendingStateValue: n.pendingStateValue,
      pendingStateError: n.pendingStateError,
      properties: n.properties.map((p) => ({ key: p.key, value: p.value })),
    }));
  const edges = graph.edges
    .filter((e) => ids.has(e.from) && ids.has(e.to))
    .map((e) => ({
      from: e.from,
      to: e.to,
      relationType: normalizeEdgeRelationType(e.relationType),
      controlPoints: (e.controlPoints || []).map((cp) => ({ x: cp.x, y: cp.y })),
      label: normalizeEdgeLabel(e.label),
    }));
  return { nodes, edges };
}

function copySelectionToClipboard() {
  const payload = collectSelectedForClipboard();
  if (!payload || payload.nodes.length === 0) {
    setStatusKey("status.clipboardNothingToCopy");
    return false;
  }
  const raw = serializeModelClipboardPayload(payload);
  clipboard.data = deepClone(payload);
  clipboard.pasteCount = 0;
  clipboard.signature = raw;
  persistSharedModelClipboard(raw);
  updateHistoryButtons();
  setStatusKey("status.clipboardCopied", { count: payload.nodes.length });
  return true;
}

function cutSelectionToClipboard() {
  const copied = copySelectionToClipboard();
  if (!copied) {
    return;
  }
  removeSelected();
  setStatusKey("status.clipboardCut");
}

async function pasteFromClipboard() {
  await syncClipboardFromSharedSource();
  if (!clipboard.data || !Array.isArray(clipboard.data.nodes) || clipboard.data.nodes.length === 0) {
    setStatusKey("status.clipboardEmpty");
    return;
  }
  if (isExecutionFrozen()) {
    resetExecution();
  }

  const offset = 30 * (clipboard.pasteCount + 1);
  let pastedCount = 0;
  runAction(() => {
    const idMap = new Map();
    const newNodeIds = [];

    clipboard.data.nodes.forEach((n) => {
      const newId = nodeCounter++;
      const uniqueName = semantics.makeUniqueName(graph.nodes, n.name, null, "n");
      const node = {
        id: newId,
        name: uniqueName,
        input: n.shape === "ellipse" ? Boolean(n.input) : false,
        output: Boolean(n.output),
        global: Boolean(n.global),
        shape: n.shape,
        x: snap(n.x + offset),
        y: snap(n.y + offset),
        width: n.width,
        height: n.height,
        fillColor: normalizeColorString(n.fillColor),
        strokeColor: normalizeColorString(n.strokeColor),
        valueExpression: String(n.valueExpression ?? ""),
        initialStateExpression: String(n.initialStateExpression ?? ""),
        modelPath: String(n.modelPath ?? ""),
        inputBindings: deepClone(n.inputBindings || {}),
        interfaceCache: deepClone(normalizeSubmodelInterfaceCache(n.interfaceCache)),
        submodelError: "",
        computedValue: n.computedValue ?? null,
        computedError: String(n.computedError ?? ""),
        pendingStateValue: n.pendingStateValue ?? null,
        pendingStateError: String(n.pendingStateError ?? ""),
        properties: (n.properties || []).map((p) => ({ key: String(p.key), value: String(p.value) })),
      };
      normalizeNodeDescriptionProperty(node);
      normalizeNodeFormulaNotesProperty(node);
      sanitizeNodeVisualOptions(node);
      graph.nodes.push(node);
      idMap.set(n.id, newId);
      newNodeIds.push(newId);
    });

    clipboard.data.edges.forEach((e) => {
      const from = idMap.get(e.from);
      const to = idMap.get(e.to);
      if (!from || !to || from === to) {
        return;
      }
      graph.edges.push({
        id: edgeCounter++,
        from,
        to,
        relationType: normalizeEdgeRelationType(e.relationType),
        controlPoints: (e.controlPoints || []).map((cp) => ({
          x: snap(cp.x + offset),
          y: snap(cp.y + offset),
        })),
        label: e.label ? {
          ...normalizeEdgeLabel(e.label),
          x: snap(Number(e.label.x) + offset),
          y: snap(Number(e.label.y) + offset),
        } : null,
      });
    });

    normalizeInputNodeFlags();
    setNodeSelection(newNodeIds, false);
    pastedCount = newNodeIds.length;
  });

  clipboard.pasteCount += 1;
  updateHistoryButtons();
  setStatusKey("status.clipboardPasted", { count: pastedCount });
}

function undo() {
  if (history.undo.length === 0) {
    return;
  }
  if (isExecutionFrozen()) {
    resetExecution();
  }
  const current = exportGraphData();
  history.redo.push(current);
  const prev = history.undo.pop();
  applyGraphData(prev);
  render();
  setStatusKey("status.undo");
  updateHistoryButtons();
}

function redo() {
  if (history.redo.length === 0) {
    return;
  }
  if (isExecutionFrozen()) {
    resetExecution();
  }
  const current = exportGraphData();
  pushUndoState(current);
  const next = history.redo.pop();
  applyGraphData(next);
  render();
  setStatusKey("status.redo");
  updateHistoryButtons();
}

function diamondPoints(node) {
  const w = node.width / 2;
  const h = node.height / 2;
  return [
    `${node.x},${node.y - h}`,
    `${node.x + w},${node.y}`,
    `${node.x},${node.y + h}`,
    `${node.x - w},${node.y}`,
  ].join(" ");
}

function nodeBoundaryPoint(node, targetX, targetY) {
  const dx = targetX - node.x;
  const dy = targetY - node.y;
  if (dx === 0 && dy === 0) {
    return { x: node.x, y: node.y };
  }

  const hw = node.width / 2;
  const hh = node.height / 2;
  let scale = 1;

  if (node.shape === "ellipse") {
    const denom = Math.sqrt((dx * dx) / (hw * hw) + (dy * dy) / (hh * hh)) || 1;
    scale = 1 / denom;
  } else if (node.shape === "diamond") {
    const denom = Math.abs(dx) / hw + Math.abs(dy) / hh || 1;
    scale = 1 / denom;
  } else {
    const denom = Math.max(Math.abs(dx) / hw, Math.abs(dy) / hh) || 1;
    scale = 1 / denom;
  }

  return {
    x: node.x + dx * scale,
    y: node.y + dy * scale,
  };
}

function buildSplinePath(points) {
  if (points.length < 2) {
    return "";
  }
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }
  if (points.length === 3) {
    return `M ${points[0].x} ${points[0].y} Q ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y}`;
  }

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const p = points[i];
    const next = points[i + 1];
    if (i < points.length - 2) {
      const mx = (p.x + next.x) / 2;
      const my = (p.y + next.y) / 2;
      d += ` Q ${p.x} ${p.y} ${mx} ${my}`;
    } else {
      d += ` Q ${p.x} ${p.y} ${next.x} ${next.y}`;
    }
  }
  return d;
}

function buildEdgeGeometry(edge) {
  const fromNode = getNodeById(edge.from);
  const toNode = getNodeById(edge.to);
  if (!fromNode || !toNode) {
    return null;
  }

  const cps = edge.controlPoints || [];
  const firstTarget = cps[0] || { x: toNode.x, y: toNode.y };
  const lastTarget = cps[cps.length - 1] || { x: fromNode.x, y: fromNode.y };

  const start = nodeBoundaryPoint(fromNode, firstTarget.x, firstTarget.y);
  const end = nodeBoundaryPoint(toNode, lastTarget.x, lastTarget.y);
  const points = [start, ...cps, end];

  const path = buildSplinePath(points);

  return { path, points };
}

function edgePolylineMidpoint(points = []) {
  if (!Array.isArray(points) || points.length === 0) {
    return null;
  }
  if (points.length === 1) {
    return { x: Number(points[0].x) || 0, y: Number(points[0].y) || 0 };
  }
  let total = 0;
  for (let index = 1; index < points.length; index += 1) {
    total += Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y);
  }
  if (!Number.isFinite(total) || total <= 0) {
    return { x: Number(points[0].x) || 0, y: Number(points[0].y) || 0 };
  }
  let travelled = 0;
  const halfway = total / 2;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const segment = Math.hypot(current.x - previous.x, current.y - previous.y);
    if (travelled + segment >= halfway) {
      const ratio = segment > 0 ? (halfway - travelled) / segment : 0;
      return {
        x: previous.x + (current.x - previous.x) * ratio,
        y: previous.y + (current.y - previous.y) * ratio,
      };
    }
    travelled += segment;
  }
  return points[points.length - 1];
}

function rectangleOverlapArea(left, right, gap = 0) {
  const leftEdge = Math.max(left.x - gap, right.x);
  const topEdge = Math.max(left.y - gap, right.y);
  const rightEdge = Math.min(left.x + left.width + gap, right.x + right.width);
  const bottomEdge = Math.min(left.y + left.height + gap, right.y + right.height);
  return Math.max(0, rightEdge - leftEdge) * Math.max(0, bottomEdge - topEdge);
}

function visibleCanvasBounds() {
  const rect = graphViewport.getBoundingClientRect();
  const inset = Math.min(32, Math.max(8, Math.min(rect.width, rect.height) / 12));
  const topLeft = svgPointFromClient(rect.left + inset, rect.top + inset);
  const bottomRight = svgPointFromClient(rect.right - inset, rect.bottom - inset);
  return {
    x: Math.min(topLeft.x, bottomRight.x),
    y: Math.min(topLeft.y, bottomRight.y),
    width: Math.abs(bottomRight.x - topLeft.x),
    height: Math.abs(bottomRight.y - topLeft.y),
  };
}

function visibleCanvasObstacles() {
  const obstacles = [];
  const visibleNodeIds = visiblePresentationNodeIds();
  graph.nodes.filter((node) => visibleNodeIds.has(node.id)).forEach((node) => {
    obstacles.push({
      x: node.x - node.width / 2,
      y: node.y - node.height / 2,
      width: node.width,
      height: node.height,
    });
  });
  if (!ui.showWidgets) {
    return obstacles;
  }
  graph.widgets.filter((widget) => widget && isDashboardItemVisible(widget)).forEach((widget) => {
    const position = dashboardItemPosition(widget);
    if (!position || !Number.isFinite(Number(position.x)) || !Number.isFinite(Number(position.y))) {
      return;
    }
    obstacles.push({
      x: position.x,
      y: position.y,
      width: Number(widget.width) || 0,
      height: Number(widget.minimized ? 36 : widget.height) || 0,
    });
  });
  graph.textItems.filter((item) => item && isDashboardItemVisible(item)).forEach((item) => {
    const position = dashboardItemPosition(item);
    if (!position || !Number.isFinite(Number(position.x)) || !Number.isFinite(Number(position.y))) {
      return;
    }
    obstacles.push({ x: position.x, y: position.y, width: item.width, height: item.height });
  });
  if (graph.dashboard && graph.dashboard.visible !== false) {
    obstacles.push({
      x: graph.dashboard.x,
      y: graph.dashboard.y,
      width: graph.dashboard.width,
      height: graph.dashboard.height,
    });
  }
  return obstacles;
}

// Returns a top-left graph coordinate that is visible and does not cover existing content.
function getSmartCanvasInsertionPoint({ width, height, anchor = null } = {}) {
  const itemWidth = Math.max(1, Number(width) || 1);
  const itemHeight = Math.max(1, Number(height) || 1);
  const visible = visibleCanvasBounds();
  const minX = visible.x;
  const minY = visible.y;
  const maxX = Math.max(minX, visible.x + visible.width - itemWidth);
  const maxY = Math.max(minY, visible.y + visible.height - itemHeight);
  const centerX = Number.isFinite(Number(anchor?.x)) ? Number(anchor.x) : visible.x + visible.width / 2;
  const centerY = Number.isFinite(Number(anchor?.y)) ? Number(anchor.y) : visible.y + visible.height / 2;
  const initial = {
    x: clamp(centerX - itemWidth / 2, minX, maxX),
    y: clamp(centerY - itemHeight / 2, minY, maxY),
  };
  const obstacles = visibleCanvasObstacles();
  const step = Math.max(24, ui.gridSize || 20);
  const offsets = [{ x: 0, y: 0 }];
  // Cover the whole visible canvas, not just a fixed area around its centre.
  const maxRing = Math.min(100, Math.ceil(Math.max(visible.width, visible.height) / step) + 1);
  for (let ring = 1; ring <= maxRing; ring += 1) {
    for (let dx = -ring; dx <= ring; dx += 1) {
      offsets.push({ x: dx, y: -ring }, { x: dx, y: ring });
    }
    for (let dy = -ring + 1; dy < ring; dy += 1) {
      offsets.push({ x: -ring, y: dy }, { x: ring, y: dy });
    }
  }
  const seen = new Set();
  let leastObstructed = null;
  for (const offset of offsets) {
    const candidate = {
      x: clamp(snap(clamp(initial.x + offset.x * step, minX, maxX)), minX, maxX),
      y: clamp(snap(clamp(initial.y + offset.y * step, minY, maxY)), minY, maxY),
      width: itemWidth,
      height: itemHeight,
    };
    const key = `${candidate.x}:${candidate.y}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const overlapArea = obstacles.reduce(
      (total, obstacle) => total + rectangleOverlapArea(candidate, obstacle, 16),
      0,
    );
    if (overlapArea === 0) {
      return { x: candidate.x, y: candidate.y };
    }
    if (!leastObstructed || overlapArea < leastObstructed.overlapArea) {
      leastObstructed = { x: candidate.x, y: candidate.y, overlapArea };
    }
  }
  if (leastObstructed) {
    return { x: leastObstructed.x, y: leastObstructed.y };
  }
  return {
    x: clamp(snap(initial.x), minX, maxX),
    y: clamp(snap(initial.y), minY, maxY),
  };
}

function addNode(shape, atPoint = null) {
  const id = nodeCounter++;
  const width = 120;
  const height = 70;
  const position = getSmartCanvasInsertionPoint({ width, height, anchor: atPoint });
  const px = position.x + width / 2;
  const py = position.y + height / 2;
  const defaultName = semantics.makeUniqueName(graph.nodes, t("node.defaultName", { id }), null, "n");
  const node = {
    id,
    name: defaultName,
    input: false,
    output: false,
    global: false,
    shape,
    x: px,
    y: py,
    width,
    height,
    fillColor: "",
    strokeColor: "",
    valueExpression: "",
    initialStateExpression: "",
    modelPath: "",
    inputBindings: {},
    interfaceCache: emptySubmodelInterfaceCache(),
    submodelError: "",
    computedValue: null,
    computedError: "",
    pendingStateValue: null,
    pendingStateError: "",
    properties: [],
  };
  normalizeNodeDescriptionProperty(node);
  normalizeNodeFormulaNotesProperty(node);
  sanitizeNodeVisualOptions(node);
  graph.nodes.push(node);
  selectSingleNode(node.id);
}

function addEdge(fromId, toId) {
  if (fromId === toId) {
    setStatusKey("error.edgeDifferentNodes");
    return null;
  }

  const targetNode = getNodeById(toId);
  if (targetNode?.shape === "diamond") {
    setStatusKey("error.parameterIncomingEdge");
    return null;
  }

  const exists = graph.edges.some((e) => e.from === fromId && e.to === toId);
  if (exists) {
    setStatusKey("error.edgeExists");
    return null;
  }

  const edge = {
    id: edgeCounter++,
    from: fromId,
    to: toId,
    relationType: "1",
    controlPoints: [],
  };
  graph.edges.push(edge);
  if (targetNode?.input) {
    removeNodeFromInputWidgetBindings(targetNode.name);
    targetNode.input = false;
  }
  selectEdge(edge.id);
  return edge;
}

function resetQualitativeGraphWizard() {
  qualitativeGraphWizard.step = 1;
  qualitativeGraphWizard.variables = [""];
  qualitativeGraphWizard.matrix = [];
  qualitativeGraphWizard.stateNames = new Set();
  qualitativeGraphWizard.inputNames = new Set();
  qualitativeGraphWizard.parameterNames = new Set();
}

function qualitativeGraphNamesAreValid() {
  const candidates = graph.nodes.map((node) => ({ id: node.id, name: node.name }));
  for (const rawName of qualitativeGraphWizard.variables) {
    const name = String(rawName || "").trim();
    const validation = semantics.validateNodeName(candidates, name, null);
    if (!validation.ok) return false;
    candidates.push({ id: -(candidates.length + 1), name });
  }
  return candidates.length > graph.nodes.length;
}

function qualitativeGraphMatrixIsValid() {
  return qualitativeGraphWizard.matrix.every((row) => row.every((value) => (
    value === "" || value === "0" || value === "1" || value === "+" || value === "-"
  )));
}

function initializeQualitativeGraphMatrix() {
  const size = qualitativeGraphWizard.variables.length;
  qualitativeGraphWizard.matrix = Array.from(
    { length: size },
    (_row, row) => Array.from({ length: size }, (_col, col) => (row === col ? "0" : "")),
  );
  qualitativeGraphWizard.stateNames = new Set(
    [...qualitativeGraphWizard.stateNames].filter((name) => qualitativeGraphWizard.variables.includes(name)),
  );
  qualitativeGraphWizard.inputNames = new Set(
    [...qualitativeGraphWizard.inputNames].filter((name) => qualitativeGraphWizard.variables.includes(name)),
  );
  qualitativeGraphWizard.parameterNames = new Set(
    [...qualitativeGraphWizard.parameterNames].filter((name) => qualitativeGraphWizard.variables.includes(name)),
  );
}

function renderQualitativeGraphWizard() {
  if (!qualitativeGraphContent || !qualitativeGraphSteps) return;
  const wizard = qualitativeGraphWizard;
  qualitativeGraphSteps.innerHTML = "";
  ["variables", "relations", "states", "roles"].forEach((name, index) => {
    const item = document.createElement("span");
    item.className = `qualitative-graph-step${wizard.step === index + 1 ? " active" : ""}${wizard.step > index + 1 ? " complete" : ""}`;
    item.textContent = t(`qualitativeGraph.step.${name}`);
    qualitativeGraphSteps.appendChild(item);
  });
  qualitativeGraphContent.innerHTML = "";

  if (wizard.step === 1) {
    const intro = document.createElement("p");
    intro.className = "help-intro";
    intro.textContent = t("qualitativeGraph.variables.intro");
    const list = document.createElement("div");
    list.className = "qualitative-graph-variable-list";
    wizard.variables.forEach((value, index) => {
      const row = document.createElement("div");
      row.className = "qualitative-graph-variable-row";
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = t("qualitativeGraph.variables.name");
      input.value = value;
      input.addEventListener("input", () => { wizard.variables[index] = input.value; });
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "small-btn";
      remove.textContent = t("qualitativeGraph.variables.remove");
      remove.disabled = wizard.variables.length === 1;
      remove.addEventListener("click", () => {
        wizard.variables.splice(index, 1);
        renderQualitativeGraphWizard();
      });
      row.append(input, remove);
      list.appendChild(row);
    });
    const add = document.createElement("button");
    add.type = "button";
    add.className = "small-btn";
    add.textContent = t("qualitativeGraph.variables.add");
    add.disabled = wizard.variables.length >= 10;
    add.addEventListener("click", () => {
      wizard.variables.push("");
      renderQualitativeGraphWizard();
    });
    const limit = document.createElement("div");
    limit.className = "qualitative-graph-limit";
    limit.textContent = t("qualitativeGraph.variables.limit");
    qualitativeGraphContent.append(intro, list, add, limit);
  } else if (wizard.step === 2) {
    const intro = document.createElement("p");
    intro.className = "help-intro";
    intro.textContent = t("qualitativeGraph.relations.intro");
    const wrap = document.createElement("div");
    wrap.className = "qualitative-graph-matrix-wrap";
    const table = document.createElement("table");
    table.className = "qualitative-graph-matrix";
    const head = document.createElement("thead");
    const headRow = document.createElement("tr");
    const corner = document.createElement("th");
    corner.textContent = t("qualitativeGraph.relations.from");
    headRow.appendChild(corner);
    wizard.variables.forEach((name) => {
      const cell = document.createElement("th");
      cell.textContent = name;
      headRow.appendChild(cell);
    });
    head.appendChild(headRow);
    const body = document.createElement("tbody");
    wizard.variables.forEach((from, row) => {
      const tr = document.createElement("tr");
      const name = document.createElement("th");
      name.textContent = from;
      tr.appendChild(name);
      wizard.variables.forEach((_to, col) => {
        const cell = document.createElement("td");
        if (row === col) {
          cell.textContent = "—";
        } else {
          const select = document.createElement("select");
          select.className = "qualitative-graph-matrix-choice";
          select.setAttribute("aria-label", `${from} → ${wizard.variables[col]}`);
          [["", ""], ["0", "0"], ["1", "1"], ["+", "+"], ["-", "-"]].forEach(([value, label]) => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = label;
            select.appendChild(option);
          });
          select.value = wizard.matrix[row]?.[col] || "";
          select.classList.toggle("selected", Boolean(select.value));
          select.addEventListener("change", () => {
            wizard.matrix[row][col] = select.value;
            select.classList.toggle("selected", Boolean(select.value));
          });
          cell.appendChild(select);
        }
        tr.appendChild(cell);
      });
      body.appendChild(tr);
    });
    table.append(head, body);
    wrap.appendChild(table);
    qualitativeGraphContent.append(intro, wrap);
  } else if (wizard.step === 3) {
    const intro = document.createElement("p");
    intro.className = "help-intro";
    intro.textContent = t("qualitativeGraph.states.intro");
    const list = document.createElement("div");
    list.className = "qualitative-graph-state-list";
    wizard.variables.forEach((name) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = wizard.stateNames.has(name);
      input.addEventListener("change", () => {
        if (input.checked) wizard.stateNames.add(name);
        else wizard.stateNames.delete(name);
      });
      label.append(input, document.createTextNode(name));
      list.appendChild(label);
    });
    const note = document.createElement("div");
    note.className = "qualitative-graph-limit";
    note.textContent = t("qualitativeGraph.states.empty");
    qualitativeGraphContent.append(intro, list, note);
  } else {
    const intro = document.createElement("p");
    intro.className = "help-intro";
    intro.textContent = t("qualitativeGraph.roles.intro");
    const list = document.createElement("div");
    list.className = "qualitative-graph-role-list";
    const heading = document.createElement("div");
    heading.className = "qualitative-graph-role-row qualitative-graph-role-heading";
    const variableHeading = document.createElement("span");
    variableHeading.textContent = t("qualitativeGraph.roles.variable");
    const inputHeading = document.createElement("span");
    inputHeading.textContent = t("qualitativeGraph.roles.input");
    const parameterHeading = document.createElement("span");
    parameterHeading.textContent = t("qualitativeGraph.roles.parameter");
    heading.append(variableHeading, inputHeading, parameterHeading);
    list.appendChild(heading);
    wizard.variables.forEach((name, index) => {
      const hasIncomingRelation = wizard.matrix.some((row, rowIndex) => (
        rowIndex !== index && row[index] !== "" && row[index] !== "0"
      ));
      const isState = wizard.stateNames.has(name);
      const canAssignRole = !isState && !hasIncomingRelation;
      if (!canAssignRole) {
        wizard.inputNames.delete(name);
        wizard.parameterNames.delete(name);
      }
      const row = document.createElement("div");
      row.className = "qualitative-graph-role-row";
      const nameCell = document.createElement("span");
      nameCell.textContent = name;
      const inputLabel = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.setAttribute("aria-label", `${t("qualitativeGraph.roles.input")}: ${name}`);
      input.checked = wizard.inputNames.has(name);
      input.disabled = !canAssignRole;
      input.addEventListener("change", () => {
        if (input.checked) {
          wizard.inputNames.add(name);
          wizard.parameterNames.delete(name);
        } else {
          wizard.inputNames.delete(name);
        }
        renderQualitativeGraphWizard();
      });
      inputLabel.appendChild(input);
      const parameterLabel = document.createElement("label");
      const parameter = document.createElement("input");
      parameter.type = "checkbox";
      parameter.setAttribute("aria-label", `${t("qualitativeGraph.roles.parameter")}: ${name}`);
      parameter.checked = wizard.parameterNames.has(name);
      parameter.disabled = !canAssignRole;
      parameter.addEventListener("change", () => {
        if (parameter.checked) {
          wizard.parameterNames.add(name);
          wizard.inputNames.delete(name);
        } else {
          wizard.parameterNames.delete(name);
        }
        renderQualitativeGraphWizard();
      });
      parameterLabel.appendChild(parameter);
      row.append(nameCell, inputLabel, parameterLabel);
      list.appendChild(row);
    });
    const note = document.createElement("div");
    note.className = "qualitative-graph-limit";
    note.textContent = t("qualitativeGraph.roles.unavailable");
    qualitativeGraphContent.append(intro, list, note);
  }

  qualitativeGraphBackBtn.disabled = wizard.step === 1;
  qualitativeGraphNextBtn.textContent = t(wizard.step === 4 ? "action.create" : "action.next");
}

function layoutQualitativeGraph(count, links) {
  const center = graph.nodes.length
    ? { x: Math.max(...graph.nodes.map((node) => node.x)) + 280, y: Math.max(220, Math.round(graph.nodes.reduce((sum, node) => sum + node.y, 0) / graph.nodes.length)) }
    : { x: 420, y: 280 };
  // Keep the two-node layout compact, then expand all spacing by 20% for
  // each additional node so denser qualitative graphs remain readable.
  const spacingScale = 1 + Math.max(0, count - 2) * 0.2;
  const radius = Math.max(135, count * 34) * spacingScale;
  const points = Array.from({ length: count }, (_item, index) => {
    const angle = (Math.PI * 2 * index) / Math.max(1, count) - Math.PI / 2;
    return { x: center.x + Math.cos(angle) * radius, y: center.y + Math.sin(angle) * radius };
  });
  const existing = graph.nodes.map((node) => ({ x: node.x, y: node.y }));
  const minDistance = 135 * spacingScale;
  const linkedDistance = 185 * spacingScale;
  for (let iteration = 0; iteration < 90; iteration += 1) {
    for (let left = 0; left < count; left += 1) {
      for (let right = left + 1; right < count; right += 1) {
        let dx = points[right].x - points[left].x;
        let dy = points[right].y - points[left].y;
        let distance = Math.hypot(dx, dy);
        if (distance < 0.001) { dx = 1; dy = 0; distance = 1; }
        const ux = dx / distance;
        const uy = dy / distance;
        const linked = links[left][right] || links[right][left];
        const force = linked
          ? (distance - linkedDistance) * 0.028
          : -Math.min(18, 7200 / (distance * distance));
        points[left].x += ux * force;
        points[left].y += uy * force;
        points[right].x -= ux * force;
        points[right].y -= uy * force;
        if (distance < minDistance) {
          const push = (minDistance - distance) * 0.16;
          points[left].x -= ux * push;
          points[left].y -= uy * push;
          points[right].x += ux * push;
          points[right].y += uy * push;
        }
      }
      existing.forEach((node) => {
        const dx = points[left].x - node.x;
        const dy = points[left].y - node.y;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance < minDistance) {
          const push = (minDistance - distance) * 0.2;
          points[left].x += (dx / distance) * push;
          points[left].y += (dy / distance) * push;
        }
      });
      points[left].x += (center.x - points[left].x) * 0.012;
      points[left].y += (center.y - points[left].y) * 0.012;
    }
  }
  return points.map((point) => ({ x: snap(point.x), y: snap(point.y) }));
}

function createQualitativeGraphFromWizard() {
  const names = qualitativeGraphWizard.variables.map((name) => String(name).trim());
  const links = qualitativeGraphWizard.matrix.map((row) => row.map((value) => value !== "" && value !== "0"));
  const positions = layoutQualitativeGraph(names.length, links);
  let edgeCount = 0;
  runAction(() => {
    const ids = names.map((name, index) => {
      const state = qualitativeGraphWizard.stateNames.has(name);
      const parameter = qualitativeGraphWizard.parameterNames.has(name);
      const input = !state && !parameter && qualitativeGraphWizard.inputNames.has(name);
      const node = {
        id: nodeCounter++, name, input, output: false, global: false,
        shape: state ? "rect" : (parameter ? "diamond" : "ellipse"), x: positions[index].x, y: positions[index].y,
        width: 120, height: 70, fillColor: "", strokeColor: "", valueExpression: "",
        initialStateExpression: "", modelPath: "", inputBindings: {},
        interfaceCache: emptySubmodelInterfaceCache(), submodelError: "", computedValue: null,
        computedError: "", pendingStateValue: null, pendingStateError: "", properties: [],
      };
      normalizeNodeDescriptionProperty(node);
      normalizeNodeFormulaNotesProperty(node);
      sanitizeNodeVisualOptions(node);
      graph.nodes.push(node);
      return node.id;
    });
    links.forEach((row, from) => row.forEach((linked, to) => {
      if (!linked || from === to) return;
      graph.edges.push({
        id: edgeCounter++,
        from: ids[from],
        to: ids[to],
        relationType: qualitativeGraphWizard.matrix[from][to],
        controlPoints: [],
      });
      edgeCount += 1;
    }));
    setNodeSelection(ids, false);
  });
  closeQualitativeGraphWizard();
  setStatusKey("status.qualitativeGraphCreated", { nodes: names.length, edges: edgeCount });
}

function openQualitativeGraphWizard() {
  if (!qualitativeGraphWizardModal) return;
  resetQualitativeGraphWizard();
  renderQualitativeGraphWizard();
  qualitativeGraphWizardModal.classList.remove("hidden");
}

function closeQualitativeGraphWizard() {
  qualitativeGraphWizardModal?.classList.add("hidden");
}

function advanceQualitativeGraphWizard() {
  if (qualitativeGraphWizard.step === 1) {
    qualitativeGraphWizard.variables = qualitativeGraphWizard.variables.map((name) => String(name).trim()).filter(Boolean);
    if (!qualitativeGraphNamesAreValid()) {
      setStatus(t("qualitativeGraph.error.variables"), true);
      return;
    }
    initializeQualitativeGraphMatrix();
    qualitativeGraphWizard.step = 2;
  } else if (qualitativeGraphWizard.step === 2) {
    if (!qualitativeGraphMatrixIsValid()) {
      setStatus(t("qualitativeGraph.error.matrix"), true);
      return;
    }
    qualitativeGraphWizard.step = 3;
  } else if (qualitativeGraphWizard.step === 3) {
    qualitativeGraphWizard.step = 4;
  } else {
    createQualitativeGraphFromWizard();
    return;
  }
  renderQualitativeGraphWizard();
}


function refreshSidebar() {
  syncNodeSelectionFocus();
  syncExpressionEditorToSelectedNode();
  updateDeleteActionLabel();
  updateEditActionButtons();

  if (ui.selected?.type === "edge") {
    delete propsList.dataset.ownerKey;
    noSelection.classList.add("hidden");
    globalPanel.classList.add("hidden");
    textPanel.classList.add("hidden");
    widgetPanel.classList.add("hidden");
    nodePanel.classList.add("hidden");
    edgePanel.classList.remove("hidden");

    const edgeId = ui.selected.id;
    const edge = getEdgeById(edgeId);
    if (!edge) {
      clearAllSelection();
      refreshSidebar();
      return;
    }

    const from = getNodeById(edge.from);
    const to = getNodeById(edge.to);
    edgeInfo.innerHTML = "";

    const summary = document.createElement("div");
    summary.textContent = `${from?.name || edge.from} -> ${to?.name || edge.to}`;
    edgeInfo.appendChild(summary);

    const relationSection = document.createElement("section");
    relationSection.className = "edge-relation-config";
    const relationTitle = document.createElement("h4");
    relationTitle.textContent = t("panel.edgeRelation");
    const relationLabel = document.createElement("label");
    relationLabel.textContent = t("label.edgeRelation");
    const relationSelect = document.createElement("select");
    ["+", "-", "1", "0"].forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = t(`edgeRelation.${value}`);
      relationSelect.appendChild(option);
    });
    relationSelect.value = normalizeEdgeRelationType(edge.relationType);
    relationSelect.addEventListener("change", () => {
      const nextType = normalizeEdgeRelationType(relationSelect.value);
      runAction(() => {
        const target = getEdgeById(edgeId);
        if (!target) return;
        if (nextType === "0") {
          graph.edges = graph.edges.filter((candidate) => candidate.id !== edgeId);
          clearAllSelection();
          return;
        }
        target.relationType = nextType;
      });
      setStatusKey(nextType === "0" ? "status.edgeRelationRemoved" : "status.edgeRelationUpdated");
    });
    relationLabel.appendChild(relationSelect);
    relationSection.append(relationTitle, relationLabel);
    edgeInfo.appendChild(relationSection);

    const labelSection = document.createElement("section");
    labelSection.className = "edge-label-config";
    const labelTitle = document.createElement("h4");
    labelTitle.textContent = t("panel.edgeLabel");
    const labelValue = normalizeEdgeLabel(edge.label);
    const textLabel = document.createElement("label");
    textLabel.textContent = t("label.edgeLabel");
    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = labelValue?.text || "";
    textInput.addEventListener("change", () => {
      const text = textInput.value.trim();
      runAction(() => {
        const target = getEdgeById(edgeId);
        if (!target) return;
        if (!text) {
          target.label = null;
          return;
        }
        target.label = { ...(normalizeEdgeLabel(target.label) || defaultEdgeLabel(target)), text };
      });
    });
    textLabel.appendChild(textInput);

    const transparentLabel = document.createElement("label");
    transparentLabel.className = "edge-label-transparent-row";
    const transparentInput = document.createElement("input");
    transparentInput.type = "checkbox";
    transparentInput.checked = Boolean(labelValue?.transparent);
    transparentInput.disabled = !labelValue;
    transparentInput.addEventListener("change", () => {
      runAction(() => {
        const target = getEdgeById(edgeId);
        if (target?.label) target.label.transparent = transparentInput.checked;
      });
    });
    transparentLabel.append(transparentInput, document.createTextNode(t("label.edgeLabelTransparent")));
    labelSection.append(labelTitle, textLabel, transparentLabel);
    edgeInfo.appendChild(labelSection);

    return;
  }

  if (ui.selected?.type === "widget") {
    ui.sidebarNodeId = null;
    delete propsList.dataset.ownerKey;
    noSelection.classList.add("hidden");
    globalPanel.classList.add("hidden");
    textPanel.classList.add("hidden");
    nodePanel.classList.add("hidden");
    edgePanel.classList.add("hidden");
    widgetPanel.classList.remove("hidden");
    const widget = getWidgetById(ui.selected.id);
    if (!widget) {
      clearAllSelection();
      refreshSidebar();
      return;
    }
    if (widgetPanelTitle) {
      widgetPanelTitle.textContent = widget.type === "barplot"
        ? t("panel.widgetBarPlot")
        : widget.type === "xychart"
        ? t("panel.widgetChart")
        : widget.type === "slider"
          ? t("panel.widgetSlider")
          : widget.type === "select"
            ? t("panel.widgetSelect")
            : widget.type === "text"
              ? t("panel.widgetText")
              : widget.type === "button"
                ? t("panel.widgetButton")
                : widget.type === "led"
                  ? t("panel.widgetLed")
                  : (widget.type === "matrix" ? t("panel.widgetMatrix") : t("panel.widgetTable"));
    }
    refreshWidgetConfigPanel(widget);
    return;
  }

  if (ui.selected?.type === "text") {
    ui.sidebarNodeId = null;
    delete propsList.dataset.ownerKey;
    noSelection.classList.add("hidden");
    globalPanel.classList.add("hidden");
    nodePanel.classList.add("hidden");
    edgePanel.classList.add("hidden");
    widgetPanel.classList.add("hidden");
    textPanel.classList.remove("hidden");
    const item = getTextItemById(ui.selected.id);
    if (!item) {
      clearAllSelection();
      refreshSidebar();
      return;
    }
    if (document.activeElement !== textWidthInput) {
      textWidthInput.value = String(item.width);
    }
    if (document.activeElement !== textHeightInput) {
      textHeightInput.value = String(item.height);
    }
    if (document.activeElement !== textFillColorInput && textFillColorInput) {
      textFillColorInput.value = item.fillColor || "";
    }
    if (document.activeElement !== textStrokeColorInput && textStrokeColorInput) {
      textStrokeColorInput.value = item.strokeColor || "";
    }
    syncSelectedTextInputs(item);
    return;
  }

  if (isTextEditorOpen()) {
    closeTextEditor();
  }

  if (ui.selectedNodes.size === 1) {
    const nodeId = [...ui.selectedNodes][0];
    const node = getNodeById(nodeId);
    if (!node) {
      clearAllSelection();
      refreshSidebar();
      return;
    }

    noSelection.classList.add("hidden");
    globalPanel.classList.add("hidden");
    textPanel.classList.add("hidden");
    widgetPanel.classList.add("hidden");
    nodePanel.classList.remove("hidden");
    edgePanel.classList.add("hidden");

    nodeIdentitySection?.classList.remove("hidden");
    nodeFormulaSection?.classList.remove("hidden");
    nodeValueSection?.classList.remove("hidden");
    nodeColorSection?.classList.remove("hidden");
    nodePropsSection?.classList.remove("hidden");
    nodeNameLabel?.classList.remove("hidden");
    nodeValueOutputLabel?.classList.remove("hidden");
    nodeNameInput?.classList.remove("hidden");
    nodeShapeInput?.classList.remove("hidden");
    propsList?.classList.remove("hidden");
    nodePropsTitle?.classList.remove("hidden");
    addPropBtn?.classList.remove("hidden");

    const sameSidebarNode = ui.sidebarNodeId === node.id;

    if (!sameSidebarNode || document.activeElement !== nodeNameInput) {
      nodeNameInput.value = node.name;
    }
    if (!sameSidebarNode || document.activeElement !== nodeShapeInput) {
      nodeShapeInput.value = node.shape;
    }
    const showInputToggle = canMarkNodeAsInput(node);
    const showGlobalToggle = canMarkNodeAsGlobal(node);
    const submodelNode = isSubmodelNode(node);
    nodeInputInput.checked = Boolean(node.input);
    nodeOutputInput.checked = Boolean(node.output);
    nodeOutputInput.indeterminate = false;
    nodeGlobalInput.checked = Boolean(node.global);
    nodeGlobalInput.indeterminate = false;
    sanitizeNodeVisualOptions(node);
    if (nodeFillColorInput) {
      nodeFillColorInput.value = node.fillColor || "";
    }
    if (nodeStrokeColorInput) {
      nodeStrokeColorInput.value = node.strokeColor || "";
    }
    if (nodeInputLabel) {
      nodeInputLabel.classList.toggle("hidden", !showInputToggle);
    }
    nodeInputInput.disabled = !showInputToggle;
    if (nodeGlobalLabel) {
      nodeGlobalLabel.classList.toggle("hidden", !showGlobalToggle);
    }
    nodeGlobalInput.disabled = !showGlobalToggle;
    const stateNode = isStateNode(node);
    const parameterNode = node.shape === "diamond";
    if (nodeOutputInput?.closest("label")) {
      nodeOutputInput.closest("label").classList.toggle("hidden", submodelNode);
    }
    if (submodelNode && !sameSidebarNode) {
      nodeOutputInput.checked = false;
    }
    if (nodeModelPathLabel) {
      nodeModelPathLabel.classList.toggle("hidden", !submodelNode);
    }
    if (nodeModelPathInput) {
      nodeModelPathInput.classList.toggle("hidden", !submodelNode);
      if (submodelNode && (!sameSidebarNode || document.activeElement !== nodeModelPathInput)) {
        nodeModelPathInput.value = node.modelPath || "";
      }
    }
    if (submodelActionRow) {
      submodelActionRow.classList.toggle("hidden", !submodelNode);
    }
    if (loadSubmodelBtn) {
      loadSubmodelBtn.classList.toggle("hidden", !submodelNode);
      loadSubmodelBtn.disabled = !submodelNode;
    }
    if (showSubmodelBtn) {
      showSubmodelBtn.classList.toggle("hidden", !submodelNode);
      showSubmodelBtn.disabled = !submodelNode || !canShowSubmodelNode(node);
    }
    if (nodeSubmodelInfo) {
      if (submodelNode) {
        if (
          (!Array.isArray(node.interfaceCache?.inputs) || node.interfaceCache.inputs.length === 0) &&
          (!Array.isArray(node.interfaceCache?.outputs) || node.interfaceCache.outputs.length === 0) &&
          String(node.modelPath ?? "").trim() &&
          !node.submodelError
        ) {
          void refreshSubmodelInterface(node, false, { allowPrompt: false });
        }
        const summary = node.submodelError
          ? t("text.submodelError", { reason: node.submodelError })
          : submodelInterfaceSummary(node);
        nodeSubmodelInfo.textContent = summary;
        nodeSubmodelInfo.classList.remove("hidden");
        nodeSubmodelInfo.classList.toggle("error", Boolean(node.submodelError));
        nodeSubmodelInfo.classList.toggle("ok", !node.submodelError);
      } else {
        nodeSubmodelInfo.classList.add("hidden");
        nodeSubmodelInfo.classList.remove("error", "ok");
        nodeSubmodelInfo.textContent = "";
      }
    }
    renderSubmodelBindingsEditor(submodelNode ? node : null);
    if (nodeValueExprLabel) {
      nodeValueExprLabel.textContent = parameterNode
        ? t("label.value")
        : (stateNode ? t("label.stateTransition") : t("label.behaviorFunction"));
    }
    updateNodeExpressionTooltips(node);
    if (!submodelNode && (!sameSidebarNode || document.activeElement !== nodeValueExprInput)) {
      nodeValueExprInput.value = node.valueExpression || "";
    }
    nodeValueExprLabel.classList.toggle("hidden", submodelNode);
    nodeValueExprRow?.classList.toggle("hidden", submodelNode);
    nodeValueExprStatus.classList.toggle("hidden", submodelNode);
    if (!submodelNode) {
      updateExpressionFieldState(nodeValueExprInput, nodeValueExprStatus, node.valueExpression || "", false, "value");
      setExplicitControlDisabled(
        nodeValueExprInput,
        isEditingUiLocked() || isWidgetControlledExpressionNode(node),
      );
      setExplicitControlDisabled(
        editNodeValueExprBtn,
        isEditingUiLocked() || isWidgetControlledExpressionNode(node),
      );
    } else {
      nodeValueExprInput.classList.remove("invalid");
      hideExpressionStatus(nodeValueExprStatus);
      setExplicitControlDisabled(editNodeValueExprBtn, true);
    }
    if (nodeWidgetBindingInfo) {
      const controlledByWidget = !submodelNode && hasInputWidgetBinding(node);
      nodeWidgetBindingInfo.classList.toggle("hidden", !controlledByWidget);
      nodeWidgetBindingInfo.classList.remove("ok", "error");
      nodeWidgetBindingInfo.textContent = controlledByWidget ? t("node.widgetControlled") : "";
    }
    if (nodeInitialStateLabel) {
      nodeInitialStateLabel.classList.toggle("hidden", !stateNode || submodelNode);
    }
    if (nodeInitialStateInput) {
      nodeInitialStateRow?.classList.toggle("hidden", !stateNode || submodelNode);
      nodeInitialStateInput.classList.toggle("hidden", !stateNode || submodelNode);
      if (nodeInitialStateStatus) {
        nodeInitialStateStatus.classList.toggle("hidden", !stateNode || submodelNode);
      }
      if (stateNode && !submodelNode && (!sameSidebarNode || document.activeElement !== nodeInitialStateInput)) {
        nodeInitialStateInput.value = node.initialStateExpression || "";
      }
      if (stateNode && !submodelNode) {
        updateExpressionFieldState(nodeInitialStateInput, nodeInitialStateStatus, node.initialStateExpression || "", false, "initial");
      } else {
        nodeInitialStateInput.classList.remove("invalid");
        hideExpressionStatus(nodeInitialStateStatus);
      }
    }
    const definitionIssue = validateNodeDefinition(node);
    nodeValueOutput.classList.remove("ok", "error");
    if (graph.execution.strictDefinitions && !definitionIssue.ok) {
      nodeValueOutput.textContent = "-";
    } else if (node.computedError) {
      nodeValueOutput.textContent = t("text.valueError", { reason: evalReasonText(node.computedError) });
      nodeValueOutput.classList.add("error");
    } else {
      nodeValueOutput.textContent = formatComputedValue(node.computedValue);
      if (node.computedValue != null) {
        nodeValueOutput.classList.add("ok");
      }
    }

    normalizeNodeDescriptionProperty(node);
    normalizeNodeFormulaNotesProperty(node);
    const visibleProperties = node.properties
      .map((prop, idx) => ({ prop, idx }))
      .filter(({ prop }) => {
        const key = String(prop?.key ?? "").trim().toLowerCase();
        return !formulaNotesPropertyKeys().has(key) && !descriptionPropertyKeys().has(key);
      });
    if (renderPropertiesEditor(
      propsList,
      visibleProperties.map(({ prop }) => prop),
      `node:${node.id}`,
      (idx) => {
        const originalIndex = visibleProperties[idx]?.idx;
        if (originalIndex != null) {
          node.properties.splice(originalIndex, 1);
        }
      },
      {
        isLockedKey: (prop) => {
          const key = String(prop?.key ?? "").trim().toLowerCase();
          return descriptionPropertyKeys().has(key);
        },
      },
    )) {
      ui.sidebarNodeId = node.id;
      return;
    }
    ui.sidebarNodeId = node.id;
    return;
  }

  ui.sidebarNodeId = null;
  nodePanel.classList.add("hidden");
  textPanel.classList.add("hidden");
  edgePanel.classList.add("hidden");
  widgetPanel.classList.add("hidden");
  if (nodeValueExprLabel) {
    nodeValueExprLabel.textContent = t("label.behaviorFunction");
  }
  updateNodeExpressionTooltips(null);
  nodeValueExprInput.classList.remove("invalid");
  nodeInitialStateInput.classList.remove("invalid");
  hideExpressionStatus(nodeValueExprStatus);
  hideExpressionStatus(nodeInitialStateStatus);
  if (nodeWidgetBindingInfo) {
    nodeWidgetBindingInfo.classList.add("hidden");
    nodeWidgetBindingInfo.classList.remove("ok", "error");
    nodeWidgetBindingInfo.textContent = "";
  }
  nodeInputInput.checked = false;
  if (nodeInputLabel) {
    nodeInputLabel.classList.add("hidden");
  }
  nodeInputInput.disabled = true;
  nodeGlobalInput.checked = false;
  if (nodeGlobalLabel) {
    nodeGlobalLabel.classList.add("hidden");
  }
  nodeGlobalInput.disabled = true;
  if (nodeInitialStateLabel) {
    nodeInitialStateLabel.classList.add("hidden");
  }
  if (nodeModelPathLabel) {
    nodeModelPathLabel.classList.add("hidden");
  }
  if (nodeModelPathInput) {
    nodeModelPathInput.classList.add("hidden");
  }
  if (submodelActionRow) {
    submodelActionRow.classList.add("hidden");
  }
  if (loadSubmodelBtn) {
    loadSubmodelBtn.classList.add("hidden");
    loadSubmodelBtn.disabled = true;
  }
  if (showSubmodelBtn) {
    showSubmodelBtn.classList.add("hidden");
    showSubmodelBtn.disabled = true;
  }
  if (nodeSubmodelInfo) {
    nodeSubmodelInfo.classList.add("hidden");
    nodeSubmodelInfo.classList.remove("error", "ok");
    nodeSubmodelInfo.textContent = "";
  }
  renderSubmodelBindingsEditor(null);
  if (nodeOutputInput?.closest("label")) {
    nodeOutputInput.closest("label").classList.remove("hidden");
  }
  nodeOutputInput.indeterminate = false;
  nodeValueExprLabel.classList.remove("hidden");
  nodeValueExprRow?.classList.remove("hidden");
  if (nodeInitialStateInput) {
    nodeInitialStateRow?.classList.add("hidden");
    nodeInitialStateInput.classList.add("hidden");
  }
  if (widgetPanelTitle) {
    widgetPanelTitle.textContent = t("panel.widget");
  }
  delete propsList.dataset.ownerKey;

  if (ui.selectedNodes.size > 1) {
    const nodes = selectedNodesList();
    globalPanel.classList.add("hidden");
    textPanel.classList.add("hidden");
    widgetPanel.classList.add("hidden");
    edgePanel.classList.add("hidden");
    nodePanel.classList.remove("hidden");
    noSelection.classList.add("hidden");

    if (nodeIdentitySection) {
      nodeIdentitySection.classList.add("hidden");
    }
    if (nodeFormulaSection) {
      nodeFormulaSection.classList.add("hidden");
    }
    if (nodeValueSection) {
      nodeValueSection.classList.add("hidden");
    }
    if (nodePropsSection) {
      nodePropsSection.classList.add("hidden");
    }
    if (nodeColorSection) {
      nodeColorSection.classList.remove("hidden");
    }

    if (nodeOutputInput?.closest("label")) {
      const outputTargets = nodes.filter((node) => !isSubmodelNode(node));
      const allOn = outputTargets.length > 0 && outputTargets.every((node) => Boolean(node.output));
      const allOff = outputTargets.length > 0 && outputTargets.every((node) => !node.output);
      nodeOutputInput.closest("label").classList.toggle("hidden", outputTargets.length === 0);
      nodeOutputInput.indeterminate = !(allOn || allOff);
      nodeOutputInput.checked = allOn;
    }

    if (nodeInputLabel) {
      const canSetAllAsInput = nodes.length > 0 && nodes.every((node) => canMarkNodeAsInput(node));
      const allInputsOn = canSetAllAsInput && nodes.every((node) => Boolean(node.input));
      const allInputsOff = canSetAllAsInput && nodes.every((node) => !node.input);
      nodeInputLabel.classList.toggle("hidden", !canSetAllAsInput);
      nodeInputInput.indeterminate = canSetAllAsInput && !(allInputsOn || allInputsOff);
      nodeInputInput.checked = allInputsOn;
      nodeInputInput.disabled = !canSetAllAsInput;
    }
    if (nodeGlobalLabel) {
      nodeGlobalLabel.classList.add("hidden");
    }
    nodeNameLabel?.classList.add("hidden");
    nodeNameInput?.classList.add("hidden");
    nodeShapeInput?.classList.add("hidden");
    nodeGlobalInput.checked = false;
    nodeGlobalInput.disabled = true;
    nodeValueExprLabel.classList.add("hidden");
    nodeValueExprRow?.classList.add("hidden");
    hideExpressionStatus(nodeValueExprStatus);
    if (nodeInitialStateLabel) {
      nodeInitialStateLabel.classList.add("hidden");
    }
    nodeInitialStateRow?.classList.add("hidden");
    nodeInitialStateInput.classList.add("hidden");
    hideExpressionStatus(nodeInitialStateStatus);
    if (nodeModelPathLabel) {
      nodeModelPathLabel.classList.add("hidden");
    }
    if (nodeModelPathInput) {
      nodeModelPathInput.classList.add("hidden");
    }
    if (submodelActionRow) {
      submodelActionRow.classList.add("hidden");
    }
    if (loadSubmodelBtn) {
      loadSubmodelBtn.classList.add("hidden");
      loadSubmodelBtn.disabled = true;
    }
    if (showSubmodelBtn) {
      showSubmodelBtn.classList.add("hidden");
      showSubmodelBtn.disabled = true;
    }
    if (nodeSubmodelInfo) {
      nodeSubmodelInfo.classList.add("hidden");
      nodeSubmodelInfo.classList.remove("error", "ok");
      nodeSubmodelInfo.textContent = "";
    }
    renderSubmodelBindingsEditor(null);
    nodeValueOutputLabel?.classList.add("hidden");
    if (propsList) {
      propsList.innerHTML = "";
      delete propsList.dataset.ownerKey;
    }
    propsList?.classList.add("hidden");
    nodePropsTitle?.classList.add("hidden");
    addPropBtn?.classList.add("hidden");
    nodeValueOutput.textContent = t("text.nodesSelected", { count: ui.selectedNodes.size });
    nodeValueOutput.classList.remove("ok", "error");
    if (nodeFillColorInput) {
      const fillValues = new Set(nodes.map((node) => String(node.fillColor || "")));
      nodeFillColorInput.value = fillValues.size === 1 ? [...fillValues][0] : "";
    }
    if (nodeStrokeColorInput) {
      const strokeValues = new Set(nodes.map((node) => String(node.strokeColor || "")));
      nodeStrokeColorInput.value = strokeValues.size === 1 ? [...strokeValues][0] : "";
    }
  } else {
    noSelection.classList.add("hidden");
    globalPanel.classList.remove("hidden");
    nodeIdentitySection?.classList.remove("hidden");
    nodeFormulaSection?.classList.remove("hidden");
    nodeValueSection?.classList.remove("hidden");
    nodeColorSection?.classList.remove("hidden");
    nodePropsSection?.classList.remove("hidden");
    nodeNameLabel?.classList.remove("hidden");
    nodeValueOutputLabel?.classList.remove("hidden");
    nodeNameInput?.classList.remove("hidden");
    nodeShapeInput?.classList.remove("hidden");
    propsList?.classList.remove("hidden");
    nodePropsTitle?.classList.remove("hidden");
    addPropBtn?.classList.remove("hidden");
    if (document.activeElement !== modelTitleInput) {
      modelTitleInput.value = String(graph.modelTitle ?? "");
    }
    if (document.activeElement !== timeStartInput) {
      timeStartInput.value = String(graph.execution.t0);
    }
    syncTimeInputConstraints();
    if (document.activeElement !== timeStepInput) {
      timeStepInput.value = String(graph.execution.dt);
    }
    if (document.activeElement !== timeEndInput) {
      timeEndInput.value = String(graph.execution.t1);
    }
    if (document.activeElement !== timeDelayInput) {
      timeDelayInput.value = String(graph.execution.delayMs);
    }
    if (renderEveryStepsInput && document.activeElement !== renderEveryStepsInput) {
      renderEveryStepsInput.value = String(graph.execution.renderEverySteps);
    }
    if (decimalDigitsInput && document.activeElement !== decimalDigitsInput) {
      decimalDigitsInput.value = String(clampDisplayDecimals(graph.execution.decimals));
    }
    if (document.activeElement !== integratorInput) {
      integratorInput.value = String(graph.execution.integrator ?? "euler");
    }
    if (zoomRangeInput && document.activeElement !== zoomRangeInput) {
      zoomRangeInput.value = String(Math.round(ui.zoom * 100));
    }
    if (zoomRangeValue) {
      zoomRangeValue.textContent = `${Math.round(ui.zoom * 100)}%`;
    }
    timeCurrentOutput.textContent =
      graph.execution.currentTime == null
        ? formatNumberValue(Number(graph.execution.t0))
        : formatNumberValue(Number(graph.execution.currentTime));
    renderPropertiesEditor(
      modelPropsList,
      graph.properties,
      "model",
      (idx) => {
        graph.properties.splice(idx, 1);
      },
    );
    updateModelRunButtons();
  }
}

function render(options = {}) {
  clearStrictInvalidNodeValues();
  updateModelRunButtons();
  updateMenuTimeLabel();
  updateDeleteActionLabel();
  updateEditActionButtons();
  syncPresentationGroups();
  syncDashboard();
  const visibleNodeIds = visiblePresentationNodeIds();
  presentationGroupsLayer.innerHTML = "";
  dashboardLayer.innerHTML = "";
  edgesLayer.innerHTML = "";
  nodesLayer.innerHTML = "";
  textLayer.innerHTML = "";
  controlsLayer.innerHTML = "";
  previewLayer.innerHTML = "";
  marqueeLayer.innerHTML = "";

  const highlightedNodeId = ui.highlightNodeEdges && ui.selectedNodes.size === 1
    ? [...ui.selectedNodes][0]
    : null;

  graph.presentationGroups.forEach((group) => {
    if (!group.visible || group.showFrame === false) {
      return;
    }
    const bounds = presentationGroupBounds(group);
    if (!bounds) {
      return;
    }
    const frame = document.createElementNS(SVG_NS, "rect");
    frame.classList.add("presentation-group-frame");
    frame.setAttribute("x", bounds.minX);
    frame.setAttribute("y", bounds.minY);
    frame.setAttribute("width", bounds.width);
    frame.setAttribute("height", bounds.height);
    frame.setAttribute("rx", "12");
    presentationGroupsLayer.appendChild(frame);

    const label = document.createElementNS(SVG_NS, "text");
    label.classList.add("presentation-group-label");
    label.setAttribute("x", bounds.minX + 10);
    label.setAttribute("y", bounds.minY + 16);
    label.textContent = group.name;
    presentationGroupsLayer.appendChild(label);
  });

  if (graph.dashboard && graph.dashboard.visible !== false) {
    const dashboard = graph.dashboard;
    const frame = document.createElementNS(SVG_NS, "rect");
    frame.classList.add("dashboard-frame");
    if (ui.dashboardDropState === "enter") frame.classList.add("dashboard-drop-enter");
    if (ui.dashboardDropState === "leave") frame.classList.add("dashboard-drop-leave");
    frame.setAttribute("x", dashboard.x);
    frame.setAttribute("y", dashboard.y);
    frame.setAttribute("width", dashboard.width);
    frame.setAttribute("height", dashboard.height);
    frame.setAttribute("rx", "12");
    dashboardLayer.appendChild(frame);

    const header = document.createElementNS(SVG_NS, "rect");
    header.classList.add("dashboard-header");
    header.setAttribute("x", dashboard.x + 1);
    header.setAttribute("y", dashboard.y + 1);
    header.setAttribute("width", Math.max(0, dashboard.width - 2));
    header.setAttribute("height", "32");
    header.setAttribute("rx", "11");
    header.addEventListener("pointerdown", (evt) => {
      if (isEditingUiLocked()) return;
      evt.preventDefault();
      evt.stopPropagation();
      ui.dashboardDrag = {
        pointerId: evt.pointerId,
        startClientX: evt.clientX,
        startClientY: evt.clientY,
        startX: dashboard.x,
        startY: dashboard.y,
      };
      evt.currentTarget?.setPointerCapture?.(evt.pointerId);
      beginTransaction();
    });
    dashboardLayer.appendChild(header);

    const title = document.createElementNS(SVG_NS, "text");
    title.classList.add("dashboard-title");
    title.setAttribute("x", dashboard.x + 16);
    title.setAttribute("y", dashboard.y + 24);
    title.setAttribute("pointer-events", "none");
    title.textContent = t("dashboard.canvasTitle");
    dashboardLayer.appendChild(title);

    const hide = document.createElementNS(SVG_NS, "rect");
    hide.classList.add("dashboard-window-action");
    hide.setAttribute("x", dashboard.x + dashboard.width - 29);
    hide.setAttribute("y", dashboard.y + 6);
    hide.setAttribute("width", "23");
    hide.setAttribute("height", "21");
    hide.setAttribute("rx", "5");
    hide.setAttribute("title", t("dashboard.hide"));
    hide.addEventListener("click", (evt) => {
      evt.stopPropagation();
      commitDashboardChange(() => { graph.dashboard.visible = false; });
    });
    dashboardLayer.appendChild(hide);
    const hideLabel = document.createElementNS(SVG_NS, "text");
    hideLabel.classList.add("dashboard-window-action-label");
    hideLabel.setAttribute("x", dashboard.x + dashboard.width - 17.5);
    hideLabel.setAttribute("y", dashboard.y + 21);
    hideLabel.setAttribute("pointer-events", "none");
    hideLabel.textContent = "x";
    dashboardLayer.appendChild(hideLabel);

    const tabsBar = document.createElementNS(SVG_NS, "rect");
    tabsBar.classList.add("dashboard-tabs-bar");
    tabsBar.setAttribute("x", dashboard.x + 1);
    tabsBar.setAttribute("y", dashboard.y + 33);
    tabsBar.setAttribute("width", Math.max(0, dashboard.width - 2));
    tabsBar.setAttribute("height", "33");
    dashboardLayer.appendChild(tabsBar);

    const resize = document.createElementNS(SVG_NS, "rect");
    resize.classList.add("dashboard-resize-handle");
    resize.setAttribute("x", dashboard.x + dashboard.width - 15);
    resize.setAttribute("y", dashboard.y + dashboard.height - 15);
    resize.setAttribute("width", "12");
    resize.setAttribute("height", "12");
    resize.setAttribute("rx", "2");
    resize.addEventListener("pointerdown", (evt) => {
      if (isEditingUiLocked()) return;
      evt.preventDefault();
      evt.stopPropagation();
      ui.dashboardResize = {
        pointerId: evt.pointerId,
        startClientX: evt.clientX,
        startClientY: evt.clientY,
        startWidth: dashboard.width,
        startHeight: dashboard.height,
      };
      evt.currentTarget?.setPointerCapture?.(evt.pointerId);
      beginTransaction();
    });
    dashboardLayer.appendChild(resize);

    let tabX = dashboard.x + 14;
    dashboard.pages.forEach((page) => {
      const label = String(page.title || t("dashboard.defaultPage"));
      const canDelete = dashboard.pages.length > 1;
      const tabWidth = Math.max(100, Math.min(210, 48 + label.length * 7 + (canDelete ? 18 : 0)));
      const tab = document.createElementNS(SVG_NS, "rect");
      tab.classList.add("dashboard-tab");
      if (page.id === dashboard.activePageId) tab.classList.add("active");
      tab.setAttribute("x", tabX);
      tab.setAttribute("y", dashboard.y + 37);
      tab.setAttribute("width", tabWidth);
      tab.setAttribute("height", "25");
      tab.setAttribute("rx", "6");
      tab.addEventListener("click", (evt) => {
        evt.stopPropagation();
        // Delay activation long enough to distinguish a double click used to rename.
        if (ui.dashboardTabClickTimer != null) {
          const samePage = ui.dashboardTabClickPageId === page.id;
          clearTimeout(ui.dashboardTabClickTimer);
          ui.dashboardTabClickTimer = null;
          ui.dashboardTabClickPageId = null;
          if (samePage) {
            // The subsequent dblclick event performs the rename.
            return;
          }
        }
        ui.dashboardTabClickPageId = page.id;
        ui.dashboardTabClickTimer = window.setTimeout(() => {
          const targetPageId = ui.dashboardTabClickPageId;
          ui.dashboardTabClickTimer = null;
          ui.dashboardTabClickPageId = null;
          if (graph.dashboard?.activePageId !== targetPageId) {
            commitDashboardChange(() => { graph.dashboard.activePageId = targetPageId; });
          }
        }, 280);
      });
      tab.addEventListener("dblclick", (evt) => {
        evt.stopPropagation();
        if (ui.dashboardTabClickTimer != null) {
          clearTimeout(ui.dashboardTabClickTimer);
          ui.dashboardTabClickTimer = null;
          ui.dashboardTabClickPageId = null;
        }
        renameDashboardPage(page.id);
      });
      dashboardLayer.appendChild(tab);
      const tabText = document.createElementNS(SVG_NS, "text");
      tabText.classList.add("dashboard-tab-label");
      tabText.setAttribute("x", tabX + 10);
      tabText.setAttribute("y", dashboard.y + 54);
      tabText.setAttribute("pointer-events", "none");
      tabText.textContent = label;
      dashboardLayer.appendChild(tabText);
      const renameTab = document.createElementNS(SVG_NS, "rect");
      renameTab.classList.add("dashboard-tab-rename");
      renameTab.setAttribute("x", tabX + tabWidth - (canDelete ? 39 : 20));
      renameTab.setAttribute("y", dashboard.y + 41);
      renameTab.setAttribute("width", "15");
      renameTab.setAttribute("height", "16");
      renameTab.setAttribute("rx", "3");
      renameTab.setAttribute("title", t("dashboard.renamePage"));
      renameTab.addEventListener("click", (evt) => {
        evt.stopPropagation();
        renameDashboardPage(page.id);
      });
      dashboardLayer.appendChild(renameTab);
      const renameLabel = document.createElementNS(SVG_NS, "text");
      renameLabel.classList.add("dashboard-tab-rename-label");
      renameLabel.setAttribute("x", tabX + tabWidth - (canDelete ? 31.5 : 12.5));
      renameLabel.setAttribute("y", dashboard.y + 53.5);
      renameLabel.setAttribute("pointer-events", "none");
      renameLabel.textContent = "e";
      dashboardLayer.appendChild(renameLabel);
      if (canDelete) {
        const deleteTab = document.createElementNS(SVG_NS, "rect");
        deleteTab.classList.add("dashboard-tab-delete");
        deleteTab.setAttribute("x", tabX + tabWidth - 20);
        deleteTab.setAttribute("y", dashboard.y + 41);
        deleteTab.setAttribute("width", "15");
        deleteTab.setAttribute("height", "16");
        deleteTab.setAttribute("rx", "3");
        deleteTab.setAttribute("title", t("dashboard.deletePage"));
        deleteTab.addEventListener("click", (evt) => {
          evt.stopPropagation();
          removeDashboardPage(page.id);
        });
        dashboardLayer.appendChild(deleteTab);
        const deleteLabel = document.createElementNS(SVG_NS, "text");
        deleteLabel.classList.add("dashboard-tab-delete-label");
        deleteLabel.setAttribute("x", tabX + tabWidth - 12.5);
        deleteLabel.setAttribute("y", dashboard.y + 53.5);
        deleteLabel.setAttribute("pointer-events", "none");
        deleteLabel.textContent = "x";
        dashboardLayer.appendChild(deleteLabel);
      }
      tabX += tabWidth + 6;
    });
    const addTab = document.createElementNS(SVG_NS, "rect");
    addTab.classList.add("dashboard-tab-add");
    addTab.setAttribute("x", tabX);
    addTab.setAttribute("y", dashboard.y + 37);
    addTab.setAttribute("width", "26");
    addTab.setAttribute("height", "25");
    addTab.setAttribute("rx", "6");
    addTab.setAttribute("title", t("dashboard.addPage"));
    addTab.addEventListener("click", (evt) => {
      evt.stopPropagation();
      addDashboardPage();
    });
    dashboardLayer.appendChild(addTab);
    const addLabel = document.createElementNS(SVG_NS, "text");
    addLabel.classList.add("dashboard-tab-add-label");
    addLabel.setAttribute("x", tabX + 13);
    addLabel.setAttribute("y", dashboard.y + 55);
    addLabel.setAttribute("pointer-events", "none");
    addLabel.textContent = "+";
    dashboardLayer.appendChild(addLabel);
  }

  graph.edges.forEach((edge) => {
    if (!visibleNodeIds.has(edge.from) || !visibleNodeIds.has(edge.to)) {
      return;
    }
    const geom = buildEdgeGeometry(edge);
    if (!geom) {
      return;
    }

    const g = document.createElementNS(SVG_NS, "g");
    g.classList.add("edge");
    const isSelected = ui.selected?.type === "edge" && ui.selected.id === edge.id;
    const isIncomingHighlight = highlightedNodeId != null && edge.to === highlightedNodeId;
    const isOutgoingHighlight = highlightedNodeId != null && edge.from === highlightedNodeId;
    const isBothHighlight = isIncomingHighlight && isOutgoingHighlight;
    if (isSelected) {
      g.classList.add("selected");
    }
    if (isAnalysisFocusActive("edge", edge.id) || isFunctionalLoopFocusActive("edge", edge.id)) {
      g.classList.add("analysis-focus");
    }
    if (isBothHighlight) {
      g.classList.add("related-both");
    } else if (isIncomingHighlight) {
      g.classList.add("related-incoming");
    } else if (isOutgoingHighlight) {
      g.classList.add("related-outgoing");
    }

    const path = document.createElementNS(SVG_NS, "path");
    path.classList.add("edge-line");
    path.setAttribute("d", geom.path);
    const markerId = isSelected
      ? "arrow-selected"
      : isBothHighlight
        ? "arrow-both"
        : isIncomingHighlight
          ? "arrow-incoming"
          : isOutgoingHighlight
            ? "arrow-outgoing"
            : "arrow";
    path.setAttribute("marker-end", `url(#${markerId})`);

    const hit = document.createElementNS(SVG_NS, "path");
    hit.classList.add("edge-hit");
    hit.setAttribute("d", geom.path);

    const onEdgeContextMenu = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      if (isEditingUiLocked()) {
        return;
      }
      selectEdge(edge.id);
      render();
      const p = svgPointFromClient(evt.clientX, evt.clientY);
      openEdgeContextMenu(evt, edge.id, p);
    };

    hit.addEventListener("contextmenu", onEdgeContextMenu);
    path.addEventListener("contextmenu", onEdgeContextMenu);

    const onEdgeHitDown = (evt, pointGetter) => {
      if (isTabletCanvasPanMode()) {
        return;
      }
      evt.stopPropagation();
      const p = pointGetter(evt);
      if (!isSelected) {
        selectEdge(edge.id);
        render();
        return;
      }
      if (isEditingUiLocked()) {
        return;
      }

      runAction(() => {
        addControlPointAt(edge, p);
      });
      setStatusKey("status.cpAdded");
    };

    path.addEventListener("pointerdown", (evt) => onEdgeHitDown(evt, svgPoint));
    path.addEventListener("mousedown", (evt) => onEdgeHitDown(evt, (e) => svgPointFromClient(e.clientX, e.clientY)));
    hit.addEventListener("pointerdown", (evt) => onEdgeHitDown(evt, svgPoint));
    hit.addEventListener("mousedown", (evt) => onEdgeHitDown(evt, (e) => svgPointFromClient(e.clientX, e.clientY)));

    g.appendChild(path);
    g.appendChild(hit);

    if (ui.showEdgeValues === true && graph.execution.currentTime != null) {
      const sourceNode = getNodeById(edge.from);
      if (sourceNode) {
        const midpoint = edgePolylineMidpoint(geom.points);
        const valueLabel = document.createElementNS(SVG_NS, "text");
        valueLabel.classList.add("edge-runtime-value");
        valueLabel.setAttribute("x", String(midpoint?.x ?? 0));
        valueLabel.setAttribute("y", String((midpoint?.y ?? 0) + 16));
        valueLabel.setAttribute("text-anchor", "middle");
        valueLabel.textContent = sourceNode.computedError
          ? t("text.nodeValueError")
          : summarizeTooltipValue(sourceNode.computedValue);
        const title = document.createElementNS(SVG_NS, "title");
        title.textContent = sourceNode.computedError
          ? String(sourceNode.computedError)
          : summarizeTooltipValue(sourceNode.computedValue);
        valueLabel.appendChild(title);
        g.appendChild(valueLabel);
      }
    }

    // A monotonic functional relationship communicates its sign even before a
    // custom label has been created.  Keep that indication derived from the
    // relationship type, rather than persisting a second label in the model.
    const customEdgeLabel = normalizeEdgeLabel(edge.label);
    const relationType = normalizeEdgeRelationType(edge.relationType);
    const edgeLabel = customEdgeLabel || (
      relationType === "+" || relationType === "-"
        ? { ...defaultEdgeLabel(edge, relationType === "-" ? "−" : relationType), transparent: true }
        : null
    );
    if (edgeLabel) {
      const labelGroup = document.createElementNS(SVG_NS, "g");
      labelGroup.classList.add("edge-label");
      if (!customEdgeLabel) {
        labelGroup.classList.add("auto-relation-label");
      }
      if (edgeLabel.transparent) {
        labelGroup.classList.add("transparent");
      }
      if (customEdgeLabel && ui.selected?.type === "edgeLabel" && ui.selected.id === edge.id) {
        labelGroup.classList.add("selected");
      }
      labelGroup.setAttribute(
        "transform",
        `translate(${edgeLabel.x} ${edgeLabel.y}) rotate(${edgeLabel.rotation})`,
      );
      const labelWidth = Math.max(42, edgeLabel.text.length * 7.4 + 12);
      const labelHit = document.createElementNS(SVG_NS, "rect");
      labelHit.classList.add("edge-label-hit");
      labelHit.setAttribute("x", String(-labelWidth / 2));
      labelHit.setAttribute("y", "-14");
      labelHit.setAttribute("width", String(labelWidth));
      labelHit.setAttribute("height", "22");
      const labelText = document.createElementNS(SVG_NS, "text");
      labelText.classList.add("edge-label-text");
      labelText.setAttribute("text-anchor", "middle");
      labelText.textContent = edgeLabel.text;
      labelGroup.append(labelHit, labelText);

      if (customEdgeLabel && ui.selected?.type === "edgeLabel" && ui.selected.id === edge.id) {
        const rotateHandle = document.createElementNS(SVG_NS, "g");
        rotateHandle.classList.add("edge-label-rotate-handle");
        rotateHandle.setAttribute("transform", "translate(0 -30)");
        const rotateCircle = document.createElementNS(SVG_NS, "circle");
        rotateCircle.setAttribute("r", "9");
        const rotateIcon = document.createElementNS(SVG_NS, "path");
        rotateIcon.setAttribute("d", "M 3 -4 A 5.5 5.5 0 1 0 5 2 M 3 -4 L 6 -4 L 6 -1");
        rotateHandle.append(rotateCircle, rotateIcon);
        rotateHandle.addEventListener("pointerdown", (evt) => {
          if (evt.button !== 0 || isTabletCanvasPanMode() || isEditingUiLocked()) return;
          evt.preventDefault();
          evt.stopPropagation();
          ui.edgeLabelRotate = { edgeId: edge.id, pointerId: evt.pointerId };
          rotateHandle.setPointerCapture?.(evt.pointerId);
          beginTransaction();
        });
        labelGroup.appendChild(rotateHandle);
      }

      if (customEdgeLabel) {
        labelGroup.addEventListener("contextmenu", (evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          if (isEditingUiLocked()) return;
          selectEdgeLabel(edge.id);
          render();
          openEdgeContextMenu(evt, edge.id, svgPointFromClient(evt.clientX, evt.clientY));
        });
        labelGroup.addEventListener("pointerdown", (evt) => {
          if (evt.button !== 0 || isTabletCanvasPanMode()) return;
          evt.preventDefault();
          evt.stopPropagation();
          selectEdgeLabel(edge.id);
          if (isEditingUiLocked()) {
            render();
            return;
          }
          const p = svgPoint(evt);
          ui.edgeLabelDrag = {
            edgeId: edge.id,
            pointerId: evt.pointerId,
            offsetX: p.x - edgeLabel.x,
            offsetY: p.y - edgeLabel.y,
          };
          labelGroup.setPointerCapture?.(evt.pointerId);
          beginTransaction();
          render();
        });
      }
      g.appendChild(labelGroup);
    }

    if (isSelected) {
      edge.controlPoints.forEach((cp, idx) => {
        const cpCircle = document.createElementNS(SVG_NS, "circle");
        cpCircle.classList.add("control-point");
        if (
          ui.selectedControlPoint &&
          ui.selectedControlPoint.edgeId === edge.id &&
          ui.selectedControlPoint.index === idx
        ) {
          cpCircle.classList.add("active");
        }
        cpCircle.setAttribute("cx", cp.x);
        cpCircle.setAttribute("cy", cp.y);
        cpCircle.setAttribute("r", isCompactTabletLayout() ? "10" : "7");

        cpCircle.addEventListener("pointerdown", (evt) => {
          if (isTabletCanvasPanMode()) {
            return;
          }
          evt.stopPropagation();
          selectEdge(edge.id);
          if (isEditingUiLocked()) {
            render();
            return;
          }
          const now = Date.now();
          if (
            ui.lastControlPointTap &&
            ui.lastControlPointTap.edgeId === edge.id &&
            ui.lastControlPointTap.index === idx &&
            now - ui.lastControlPointTap.time < 320
          ) {
            ui.lastControlPointTap = null;
            runAction(() => {
              removeControlPoint(edge.id, idx);
            });
            setStatusKey("status.cpRemoved");
            return;
          }

          ui.lastControlPointTap = { edgeId: edge.id, index: idx, time: now };
          ui.selectedControlPoint = { edgeId: edge.id, index: idx };
          ui.controlPointDrag = {
            edgeId: edge.id,
            index: idx,
            pointerId: evt.pointerId,
          };
          beginTransaction();
        });

        controlsLayer.appendChild(cpCircle);
      });
    }

    edgesLayer.appendChild(g);
  });

  if (ui.edgeCreate) {
    const fromNode = getNodeById(ui.edgeCreate.fromId);
    if (fromNode) {
      const start = nodeBoundaryPoint(fromNode, ui.edgeCreate.current.x, ui.edgeCreate.current.y);
      const preview = document.createElementNS(SVG_NS, "path");
      preview.classList.add("edge-drag-preview");
      preview.setAttribute("d", `M ${start.x} ${start.y} L ${ui.edgeCreate.current.x} ${ui.edgeCreate.current.y}`);
      preview.setAttribute("marker-end", "url(#arrow)");
      previewLayer.appendChild(preview);
    }
  }

  if (ui.marquee) {
    const r = marqueeRect(ui.marquee);
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", r.x);
    rect.setAttribute("y", r.y);
    rect.setAttribute("width", r.width);
    rect.setAttribute("height", r.height);
    rect.setAttribute("fill", "rgba(37,99,235,0.12)");
    rect.setAttribute("stroke", "#2563eb");
    rect.setAttribute("stroke-dasharray", "6 4");
    marqueeLayer.appendChild(rect);
  }

  graph.nodes.forEach((node) => {
    if (!visibleNodeIds.has(node.id)) {
      return;
    }
    const g = document.createElementNS(SVG_NS, "g");
    g.classList.add("node");
    g.setAttribute("data-node-id", node.id);
    g.setAttribute("data-node-tooltip", "1");
    setTooltipText(g, buildNodeTooltipText(node).text);
    g.addEventListener("pointerenter", (evt) => {
      showNodeTooltip(node, g, evt.clientX, evt.clientY);
    });
    g.addEventListener("pointermove", (evt) => {
      setTooltipText(g, buildNodeTooltipText(node).text);
      ui.tooltipPointer = { x: evt.clientX, y: evt.clientY };
      if (ui.tooltipTarget === g) {
        showNodeTooltip(node, g, evt.clientX, evt.clientY);
      } else {
        showNodeTooltip(node, g, evt.clientX, evt.clientY);
      }
    });
    g.addEventListener("pointerleave", () => {
      scheduleHideAppTooltip(60);
    });
    g.addEventListener("contextmenu", (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      if (isEditingUiLocked()) {
        return;
      }
      openNodeContextMenu(evt, node);
    });
    if (ui.selectedNodes.has(node.id)) {
      g.classList.add("selected");
    }
    if (isGlobalParameterNode(node)) {
      g.classList.add("global-node");
    }
    if (nodeHasRuntimeError(node)) {
      g.classList.add("runtime-error");
    }
    if (isAnalysisFocusActive("node", node.id) || isFunctionalLoopFocusActive("node", node.id)) {
      g.classList.add("analysis-focus");
    }
    if (graph.execution.strictDefinitions && !validateNodeDefinition(node).ok) {
      g.classList.add("invalid-definition");
    }
    if (ui.edgeCreate && ui.edgeCreateHoverId === node.id && node.id !== ui.edgeCreate.fromId) {
      g.classList.add("edge-target");
    }

    let shapeEl;
    let shapeOutlineEl = null;
    let submodelInnerShape = null;
    if (node.shape === "ellipse") {
      shapeEl = document.createElementNS(SVG_NS, "ellipse");
      shapeEl.setAttribute("cx", node.x);
      shapeEl.setAttribute("cy", node.y);
      shapeEl.setAttribute("rx", node.width / 2);
      shapeEl.setAttribute("ry", node.height / 2);
    } else if (node.shape === "diamond") {
      shapeEl = document.createElementNS(SVG_NS, "polygon");
      shapeEl.setAttribute("points", diamondPoints(node));
    } else {
      shapeEl = document.createElementNS(SVG_NS, "rect");
      shapeEl.setAttribute("x", node.x - node.width / 2);
      shapeEl.setAttribute("y", node.y - node.height / 2);
      shapeEl.setAttribute("width", node.width);
      shapeEl.setAttribute("height", node.height);
      shapeEl.setAttribute("rx", 8);
      if (isSubmodelNode(node)) {
        submodelInnerShape = document.createElementNS(SVG_NS, "rect");
        submodelInnerShape.setAttribute("x", node.x - node.width / 2 + 6);
        submodelInnerShape.setAttribute("y", node.y - node.height / 2 + 6);
        submodelInnerShape.setAttribute("width", Math.max(8, node.width - 12));
        submodelInnerShape.setAttribute("height", Math.max(8, node.height - 12));
        submodelInnerShape.setAttribute("rx", 6);
        submodelInnerShape.classList.add("node-shape", "node-shape-inner");
      }
    }
    shapeEl.classList.add("node-shape");
    shapeOutlineEl = shapeEl.cloneNode(false);
    shapeOutlineEl.classList.add("node-shape-outline");
    if (node.fillColor) {
      g.style.setProperty("--node-fill", node.fillColor);
    } else {
      g.style.removeProperty("--node-fill");
    }
    if (node.strokeColor) {
      g.style.setProperty("--node-stroke", node.strokeColor);
      g.classList.add("has-custom-stroke");
    } else {
      g.style.removeProperty("--node-stroke");
      g.classList.remove("has-custom-stroke");
    }

    const startEdgeCreate = (evt) => {
      if (isTabletCanvasPanMode()) {
        return;
      }
      if (evt.ctrlKey || evt.metaKey) {
        evt.preventDefault();
        evt.stopPropagation();
        addNodeToSelection(node.id);
        render();
        return;
      }
      if (isEditingUiLocked()) {
        return;
      }
      evt.stopPropagation();
      startEdgeCreateFromNode(node.id, evt.pointerId, svgPoint(evt));
      render();
    };

    const startEdgeCreateMouse = (evt) => {
      if (isTabletCanvasPanMode()) {
        return;
      }
      if (evt.ctrlKey || evt.metaKey) {
        evt.preventDefault();
        evt.stopPropagation();
        addNodeToSelection(node.id);
        render();
        return;
      }
      if (isEditingUiLocked()) {
        return;
      }
      evt.stopPropagation();
      startEdgeCreateFromMouse(node.id, evt);
    };

    g.addEventListener("pointerdown", (evt) => {
      if (isTabletCanvasPanMode()) {
        return;
      }
      evt.preventDefault();
      evt.stopPropagation();
      ui.marquee = null;
      const additive = evt.ctrlKey || evt.metaKey;

      if (additive) {
        addNodeToSelection(node.id);
        render();
        return;
      }

      if (!ui.selectedNodes.has(node.id)) {
        selectSingleNode(node.id);
      }
      if (isEditingUiLocked()) {
        render();
        return;
      }

      const dragIds = ui.selectedNodes.size > 0 ? [...ui.selectedNodes] : [node.id];
      const dragSet = new Set(dragIds);
      const startMap = new Map(dragIds.map((id) => {
        const n = getNodeById(id);
        return [id, { x: n.x, y: n.y }];
      }));
      const edgeControlStartMap = new Map();
      graph.edges.forEach((edge) => {
        if (dragSet.has(edge.from) && dragSet.has(edge.to) && edge.controlPoints.length > 0) {
          edgeControlStartMap.set(
            edge.id,
            edge.controlPoints.map((cp) => ({ x: cp.x, y: cp.y })),
          );
        }
      });

      ui.drag = {
        nodeIds: dragIds,
        dragSet,
        startMap,
        edgeControlStartMap,
        anchorNodeId: dragIds[0] ?? node.id,
        startClientX: evt.clientX,
        startClientY: evt.clientY,
        pointerId: evt.pointerId,
      };
      beginTransaction();
      startTouchHold(evt, ({ clientX, clientY, pointerId }) => {
        if (ui.drag && ui.drag.pointerId === pointerId) {
          ui.drag = null;
          cancelTransaction();
        }
        openNodeContextMenu({ preventDefault() {}, stopPropagation() {}, clientX, clientY }, node);
        render();
      });
    });
    g.addEventListener("pointerup", (evt) => {
      if (evt.button !== 0) {
        return;
      }
      const activeDrag = ui.drag && evt.pointerId === ui.drag.pointerId ? ui.drag : null;
      const moved = activeDrag
        ? Math.hypot(
          evt.clientX - activeDrag.startClientX,
          evt.clientY - activeDrag.startClientY,
        ) >= 4
        : false;
      if (moved) {
        ui.lastNodeActivate = null;
        return;
      }
      const now = performance.now();
      const last = ui.lastNodeActivate;
      if (
        last
        && last.nodeId === node.id
        && (now - last.time) <= 320
      ) {
        ui.lastNodeActivate = null;
        evt.preventDefault();
        evt.stopPropagation();
        if (ui.drag && evt.pointerId === ui.drag.pointerId) {
          ui.drag = null;
          cancelTransaction();
          render();
        }
        openNodePrimaryEditor(node);
        return;
      }
      ui.lastNodeActivate = { nodeId: node.id, time: now };
    });

    const label = document.createElementNS(SVG_NS, "text");
    label.classList.add("node-label");
    label.setAttribute("x", node.x);
    const showRuntimeValue = ui.showNodeValues === true && graph.execution.currentTime != null;
    label.setAttribute("y", showRuntimeValue ? node.y - 8 : node.y);
    label.textContent = node.name;

    let runtimeValueLabel = null;
    if (showRuntimeValue) {
      const runtimeValue = summarizeNodeRuntimeValue(node);
      runtimeValueLabel = document.createElementNS(SVG_NS, "text");
      runtimeValueLabel.classList.add("node-runtime-value");
      if (runtimeValue.error) {
        runtimeValueLabel.classList.add("node-runtime-value-error");
      }
      runtimeValueLabel.setAttribute("x", node.x);
      runtimeValueLabel.setAttribute("y", node.y + 11);
      runtimeValueLabel.textContent = runtimeValue.text;
      const title = document.createElementNS(SVG_NS, "title");
      title.textContent = runtimeValue.error
        ? String(node.computedError)
        : summarizeTooltipValue(node.computedValue);
      runtimeValueLabel.appendChild(title);
    }

    let inputBadge = null;
    let inputBadgeLabel = null;
    if (node.input) {
      inputBadge = document.createElementNS(SVG_NS, "circle");
      inputBadge.classList.add("node-input-badge");
      inputBadge.setAttribute("cx", node.x - node.width / 2 + 9);
      inputBadge.setAttribute("cy", node.y - node.height / 2 + 9);
      inputBadge.setAttribute("r", "7");
      inputBadgeLabel = document.createElementNS(SVG_NS, "text");
      inputBadgeLabel.classList.add("node-input-badge-label");
      inputBadgeLabel.setAttribute("x", node.x - node.width / 2 + 9);
      inputBadgeLabel.setAttribute("y", node.y - node.height / 2 + 9);
      inputBadgeLabel.textContent = "I";
    }

    let outputBadge = null;
    let outputBadgeLabel = null;
    if (node.output) {
      outputBadge = document.createElementNS(SVG_NS, "circle");
      outputBadge.classList.add("node-output-badge");
      outputBadge.setAttribute("cx", node.x + node.width / 2 - 9);
      outputBadge.setAttribute("cy", node.y - node.height / 2 + 9);
      outputBadge.setAttribute("r", "7");
      outputBadgeLabel = document.createElementNS(SVG_NS, "text");
      outputBadgeLabel.classList.add("node-output-badge-label");
      outputBadgeLabel.setAttribute("x", node.x + node.width / 2 - 9);
      outputBadgeLabel.setAttribute("y", node.y - node.height / 2 + 9);
      outputBadgeLabel.textContent = "O";
    }

    let globalBadge = null;
    let globalBadgeLabel = null;
    if (isGlobalParameterNode(node)) {
      globalBadge = document.createElementNS(SVG_NS, "circle");
      globalBadge.classList.add("node-global-badge");
      globalBadge.setAttribute("cx", node.x - node.width / 2 + 9);
      globalBadge.setAttribute("cy", node.y + node.height / 2 - 9);
      globalBadge.setAttribute("r", "7");
      globalBadgeLabel = document.createElementNS(SVG_NS, "text");
      globalBadgeLabel.classList.add("node-global-badge-label");
      globalBadgeLabel.setAttribute("x", node.x - node.width / 2 + 9);
      globalBadgeLabel.setAttribute("y", node.y + node.height / 2 - 9);
      globalBadgeLabel.textContent = "G";
    }

    const submodelPorts = [];
    if (isSubmodelNode(node)) {
      const makePorts = (items, side) => {
        const values = Array.isArray(items) ? items : [];
        if (!values.length) {
          return;
        }
        const availableHeight = Math.max(12, node.height - 20);
        const step = availableHeight / (values.length + 1);
        values.forEach((name, idx) => {
          const port = document.createElementNS(SVG_NS, "circle");
          port.classList.add("submodel-port", side);
          port.setAttribute("r", "4");
          port.setAttribute("cx", side === "input" ? node.x - node.width / 2 : node.x + node.width / 2);
          port.setAttribute("cy", node.y - node.height / 2 + 10 + step * (idx + 1));
          const title = document.createElementNS(SVG_NS, "title");
          title.textContent = `${side === "input" ? t("label.input") : t("label.output")}: ${String(name)}`;
          if (isCompactTabletLayout()) {
            port.setAttribute("r", "6");
          }
          port.appendChild(title);
          submodelPorts.push(port);
        });
      };
      makePorts(node.interfaceCache?.inputs, "input");
      makePorts(node.interfaceCache?.outputs, "output");
    }

    const centerPortHit = document.createElementNS(SVG_NS, "circle");
    const disableCenterPortForMultiSelection =
      ui.selectedNodes.size > 1 && ui.selectedNodes.has(node.id);
    centerPortHit.classList.add("center-port-hit");
    centerPortHit.setAttribute("cx", node.x);
    centerPortHit.setAttribute("cy", node.y);
    centerPortHit.setAttribute("r", isCompactTabletLayout() ? "26" : "18");
    if (disableCenterPortForMultiSelection) {
      centerPortHit.style.pointerEvents = "none";
      centerPortHit.style.cursor = "inherit";
    } else {
      centerPortHit.addEventListener("pointerdown", startEdgeCreate);
      centerPortHit.addEventListener("mousedown", startEdgeCreateMouse);
    }

    const handle = document.createElementNS(SVG_NS, "circle");
    handle.classList.add("resize-handle");
    handle.setAttribute("cx", node.x + node.width / 2);
    handle.setAttribute("cy", node.y + node.height / 2);
    handle.setAttribute("r", "6");

    handle.addEventListener("pointerdown", (evt) => {
      if (isTabletCanvasPanMode()) {
        return;
      }
      evt.stopPropagation();
      if (evt.ctrlKey || evt.metaKey) {
        addNodeToSelection(node.id);
        render();
        return;
      }
      if (!ui.selectedNodes.has(node.id)) {
        selectSingleNode(node.id);
      }
      if (isEditingUiLocked()) {
        render();
        return;
      }
      ui.resize = {
        nodeId: node.id,
        startPointer: svgPoint(evt),
        startWidth: node.width,
        startHeight: node.height,
        pointerId: evt.pointerId,
      };
      beginTransaction();
      render();
    });

    g.appendChild(shapeOutlineEl);
    g.appendChild(shapeEl);
    if (submodelInnerShape) {
      g.appendChild(submodelInnerShape);
    }
    g.appendChild(label);
    if (runtimeValueLabel) {
      g.appendChild(runtimeValueLabel);
    }
    if (inputBadge && inputBadgeLabel) {
      g.appendChild(inputBadge);
      g.appendChild(inputBadgeLabel);
    }
    if (outputBadge && outputBadgeLabel) {
      g.appendChild(outputBadge);
      g.appendChild(outputBadgeLabel);
    }
    if (globalBadge && globalBadgeLabel) {
      g.appendChild(globalBadge);
      g.appendChild(globalBadgeLabel);
    }
    submodelPorts.forEach((port) => g.appendChild(port));
    g.appendChild(centerPortHit);
    g.appendChild(handle);
    nodesLayer.appendChild(g);
  });

  graph.textItems.forEach((item) => {
    sanitizeTextItem(item);
    if (!isDashboardItemVisible(item)) {
      return;
    }
    const displayedPosition = dashboardItemPosition(item);
    const g = document.createElementNS(SVG_NS, "g");
    g.classList.add("canvas-text-item");
    if (item.fillColor) {
      g.style.setProperty("--text-box-fill", item.fillColor);
    } else {
      g.style.removeProperty("--text-box-fill");
    }
    if (item.strokeColor) {
      g.style.setProperty("--text-box-stroke", item.strokeColor);
      g.classList.add("has-custom-stroke");
    } else {
      g.style.removeProperty("--text-box-stroke");
      g.classList.remove("has-custom-stroke");
    }
    if (ui.selected?.type === "text" && ui.selected.id === item.id) {
      g.classList.add("selected");
    }
    g.setAttribute("transform", `translate(${displayedPosition.x}, ${displayedPosition.y})`);

    const frame = document.createElementNS(SVG_NS, "rect");
    frame.classList.add("canvas-text-frame");
    frame.setAttribute("x", "0");
    frame.setAttribute("y", "0");
    frame.setAttribute("width", String(item.width));
    frame.setAttribute("height", String(item.height));
    frame.setAttribute("rx", "6");
    frame.setAttribute("ry", "6");

    const foreignObject = document.createElementNS(SVG_NS, "foreignObject");
    foreignObject.setAttribute("x", "0");
    foreignObject.setAttribute("y", "0");
    foreignObject.setAttribute("width", String(item.width));
    foreignObject.setAttribute("height", String(item.height));
    foreignObject.classList.add("canvas-text-fo");
    const div = document.createElement("div");
    div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    div.className = "canvas-text-content";
    div.innerHTML = canvasTextDisplayHtml(item);
    div.addEventListener("dblclick", (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      if (!(ui.selected?.type === "text" && ui.selected.id === item.id)) {
        selectTextItem(item.id);
      }
      openTextEditor();
    });
    foreignObject.appendChild(div);

    const handle = document.createElementNS(SVG_NS, "circle");
    handle.classList.add("resize-handle");
    handle.setAttribute("cx", String(item.width));
    handle.setAttribute("cy", String(item.height));
    handle.setAttribute("r", "6");

    g.addEventListener("pointerdown", (evt) => {
      if (isTabletCanvasPanMode()) {
        return;
      }
      evt.stopPropagation();
      if (!(ui.selected?.type === "text" && ui.selected.id === item.id)) {
        selectTextItem(item.id);
      }
      if (isEditingUiLocked()) {
        render();
        return;
      }
      ui.textDrag = {
        id: item.id,
        pointerId: evt.pointerId,
        startClientX: evt.clientX,
        startClientY: evt.clientY,
        startX: item.x,
        startY: item.y,
      };
      beginTransaction();
    });
    g.addEventListener("contextmenu", (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      if (!(ui.selected?.type === "text" && ui.selected.id === item.id)) {
        selectTextItem(item.id);
      }
      openTextContextMenu(evt, item);
    });
    g.addEventListener("dblclick", (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      if (!(ui.selected?.type === "text" && ui.selected.id === item.id)) {
        selectTextItem(item.id);
      }
      openTextEditor();
    });
    handle.addEventListener("pointerdown", (evt) => {
      if (isTabletCanvasPanMode()) {
        return;
      }
      evt.stopPropagation();
      if (!(ui.selected?.type === "text" && ui.selected.id === item.id)) {
        selectTextItem(item.id);
      }
      if (isEditingUiLocked()) {
        render();
        return;
      }
      ui.textResize = {
        id: item.id,
        pointerId: evt.pointerId,
        startClientX: evt.clientX,
        startClientY: evt.clientY,
        startWidth: item.width,
        startHeight: item.height,
      };
      beginTransaction();
    });

    g.appendChild(frame);
    g.appendChild(foreignObject);
    g.appendChild(handle);
    textLayer.appendChild(g);
  });

  refreshActiveTooltip();

  updateCanvasSize();
  applyCanvasVisibility();
  if (!options.preserveWidgets && ui.sliderInteraction == null) {
    renderWidgets();
  } else {
    applyWidgetDrivenNodeValues();
  }
  refreshSidebar();
  renderWatchDebugger();
  updateHistoryButtons();
  updateEditingLockUi();
}

function isValidPoint(p) {
  return p && Number.isFinite(p.x) && Number.isFinite(p.y);
}

function importGraphData(data) {
  if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) {
    throw new Error(t("error.invalidJson"));
  }

  const nodes = data.nodes
    .filter((n) => Number.isInteger(n.id))
    .map((n) => {
      if (!["state", "algebraic", "parameter", "submodel"].includes(n.type)) {
        throw new Error(t("error.invalidJson"));
      }
      const shape = deserializeNodeType(n.type);
      const node = {
        id: n.id,
        name: typeof n.name === "string" ? n.name : t("node.defaultName", { id: n.id }),
        input: shape === "ellipse" ? Boolean(n.input) : false,
        output: Boolean(n.output),
        global: shape === "diamond" ? Boolean(n.global) : false,
        type: serializeNodeType(shape),
        x: Number.isFinite(n.x) ? n.x : 200,
        y: Number.isFinite(n.y) ? n.y : 200,
        width: clamp(Number(n.width) || 120, 40, 500),
        height: clamp(Number(n.height) || 70, 30, 500),
        fillColor: normalizeColorString(n.fillColor),
        strokeColor: normalizeColorString(n.strokeColor),
        valueExpression: shape === "rect" ? "" : String(n.valueExpression ?? ""),
        stateTransition: shape === "rect"
          ? String(n.stateTransition ?? "")
          : "",
        initialState: shape === "rect"
          ? String(n.initialState ?? "")
          : "",
        modelPath: shape === "submodel" ? String(n.modelPath ?? "") : "",
        inputBindings: shape === "submodel" && n.inputBindings && typeof n.inputBindings === "object"
          ? Object.fromEntries(
            Object.entries(n.inputBindings)
              .map(([key, value]) => [String(key), String(value ?? "")])
              .filter(([key]) => key.trim()),
          )
          : {},
        interfaceCache: shape === "submodel"
          ? normalizeSubmodelInterfaceCache(n.interfaceCache)
          : emptySubmodelInterfaceCache(),
        submodelError: "",
        computedValue: null,
        computedError: "",
        pendingStateValue: null,
        pendingStateError: "",
        properties: Array.isArray(n.properties)
          ? n.properties.map((p) => ({ key: String(p?.key ?? ""), value: String(p?.value ?? "") }))
          : [],
      };
      normalizeNodeDescriptionProperty(node);
      normalizeNodeFormulaNotesProperty(node);
      sanitizeNodeVisualOptions(node);
      return node;
    });
  const nodesWithValidNames = semantics.sanitizeNodeNames(nodes, "n");

  const nodeIds = new Set(nodesWithValidNames.map((n) => n.id));

  const edges = data.edges
    .filter((e) => {
      if (!Number.isInteger(e.id) || !nodeIds.has(e.from) || !nodeIds.has(e.to) || e.from === e.to) {
        return false;
      }
      if (normalizeEdgeRelationType(e.relationType) === "0") {
        return false;
      }
      const targetNode = nodesWithValidNames.find((n) => n.id === e.to);
      return targetNode?.type !== "parameter";
    })
    .map((e) => ({
      id: e.id,
      from: e.from,
      to: e.to,
      relationType: normalizeEdgeRelationType(e.relationType),
      controlPoints: Array.isArray(e.controlPoints)
        ? e.controlPoints.filter(isValidPoint).map((cp) => ({ x: cp.x, y: cp.y }))
        : [],
      label: normalizeEdgeLabel(e.label),
    }));

  const textItems = Array.isArray(data.textItems)
    ? data.textItems
      .filter((item) => Number.isInteger(item?.id))
      .map((item) => {
        const out = {
          id: item.id,
          x: Number(item.x),
          y: Number(item.y),
          width: Number(item.width),
          height: Number(item.height),
          fillColor: normalizeColorString(item.fillColor),
          strokeColor: normalizeColorString(item.strokeColor),
          dashboardPageId: item.dashboardPageId,
          html: String(item.html ?? ""),
        };
        sanitizeTextItem(out);
        return out;
      })
    : [];

  const maxNodeId = nodesWithValidNames.reduce((max, n) => Math.max(max, n.id), 0);
  const maxEdgeId = edges.reduce((max, e) => Math.max(max, e.id), 0);
  const maxTextItemId = textItems.reduce((max, item) => Math.max(max, item.id), 0);
  const widgets = Array.isArray(data.widgets)
    ? data.widgets
      .filter((w) => Number.isInteger(w.id) && (w.type === "table" || w.type === "xychart" || w.type === "barplot" || w.type === "slider" || w.type === "matrix" || w.type === "button" || w.type === "led" || w.type === "select" || w.type === "text"))
      .map((w) => ({
        id: w.id,
        type: (w.type === "xychart" || w.type === "barplot")
          ? w.type
          : (w.type === "slider"
            ? "slider"
            : (w.type === "matrix"
              ? "matrix"
              : (w.type === "button"
                ? "button"
                : (w.type === "led"
                  ? "led"
                  : (w.type === "select" ? "select" : (w.type === "text" ? "text" : "table")))))),
        customTitle: String(w.customTitle ?? ""),
        x: Number.isFinite(Number(w.x)) ? Number(w.x) : 40,
        y: Number.isFinite(Number(w.y)) ? Number(w.y) : 40,
        width: clamp(Number(w.width) || 320, widgetMinDimensions({
          type: (w.type === "xychart" || w.type === "barplot")
            ? w.type
            : (w.type === "slider"
              ? "slider"
              : (w.type === "matrix"
                ? "matrix"
                : (w.type === "button"
                  ? "button"
                  : (w.type === "led"
                    ? "led"
                    : (w.type === "select" ? "select" : (w.type === "text" ? "text" : "table"))))))
        }).width, 1200),
        height: clamp(Number(w.height) || 160, widgetMinDimensions({
          type: (w.type === "xychart" || w.type === "barplot")
            ? w.type
            : (w.type === "slider"
              ? "slider"
              : (w.type === "matrix"
                ? "matrix"
                : (w.type === "button"
                  ? "button"
                  : (w.type === "led"
                    ? "led"
                    : (w.type === "select" ? "select" : (w.type === "text" ? "text" : "table"))))))
        }).height, 900),
        dashboardPageId: normalizeDashboardPageId(w.dashboardPageId),
        minimized: Boolean(w.minimized),
        showTitleBar: w.showTitleBar !== false,
        fontSize: Number.isFinite(Number(w.fontSize))
          ? clamp(Math.round(Number(w.fontSize)), 8, 32)
          : (Number.isFinite(Number(w.tableFontSize)) ? clamp(Math.round(Number(w.tableFontSize)), 8, 32) : 13),
        outputOnly: Boolean(w.outputOnly),
        showHistory: Boolean(w.showHistory),
        expandNonScalarValues: Boolean(w.expandNonScalarValues) && !Boolean(w.showHistory),
        tableTextAlign: ["left", "center", "right"].includes(String(w.tableTextAlign ?? "")) ? String(w.tableTextAlign) : "left",
        tableDecimalDigits: Number.isInteger(Number(w.tableDecimalDigits)) && Number(w.tableDecimalDigits) >= 0 && Number(w.tableDecimalDigits) <= 12
          ? Number(w.tableDecimalDigits)
          : null,
        tableScrolling: w.tableScrolling === "first" ? "first" : "last",
        xMin: parseAutoNullableNumber(w.xMin),
        xMax: parseAutoNullableNumber(w.xMax),
        yMin: parseAutoNullableNumber(w.yMin),
        yMax: parseAutoNullableNumber(w.yMax),
        xAxisLabel: String(w.xAxisLabel ?? "").trim().slice(0, 120),
        yAxisLabel: String(w.yAxisLabel ?? "").trim().slice(0, 120),
        showGrid: w.showGrid !== false,
        legendPosition: ["none", "top-right", "top-left", "bottom-right", "bottom-left"].includes(String(w.legendPosition ?? ""))
          ? String(w.legendPosition)
          : "top-right",
        barWidth: Number.isFinite(Number(w.barWidth)) ? clamp(Number(w.barWidth), 0.1, 1) : 0.8,
        showXTicks: w.showXTicks !== false,
        xTickLabels: Array.isArray(w.xTickLabels) ? w.xTickLabels.map((entry) => ({ value: Number(entry?.value), label: String(entry?.label ?? "") })).filter((entry) => Number.isFinite(entry.value)) : [],
        source: String(w.source ?? ""),
        showNumericValues: w.showNumericValues !== false,
        showIndices: w.showIndices !== false,
        autoFitCells: w.autoFitCells !== false,
        cellSize: Number.isFinite(Number(w.cellSize)) ? clamp(Number(w.cellSize), 2, 96) : 28,
        valueMin: parseAutoNullableNumber(w.valueMin),
        valueMax: parseAutoNullableNumber(w.valueMax),
        displayRows: Number.isInteger(Number(w.displayRows)) && Number(w.displayRows) > 0 ? Number(w.displayRows) : null,
        displayCols: Number.isInteger(Number(w.displayCols)) && Number(w.displayCols) > 0 ? Number(w.displayCols) : null,
        colorScheme: ["blue", "heat", "grayscale", "diverging", "none"].includes(String(w.colorScheme ?? ""))
          ? String(w.colorScheme)
          : "blue",
        viewMode: ["grid", "surface"].includes(String(w.viewMode ?? "")) ? String(w.viewMode) : "grid",
        surfaceStyle: ["solid", "wireframe"].includes(String(w.surfaceStyle ?? "")) ? String(w.surfaceStyle) : "solid",
        surfaceAzimuth: Number.isFinite(Number(w.surfaceAzimuth)) ? clamp(Number(w.surfaceAzimuth), -180, 180) : 45,
        surfaceElevation: Number.isFinite(Number(w.surfaceElevation)) ? clamp(Number(w.surfaceElevation), 5, 85) : 32,
        surfaceHeightScale: Number.isFinite(Number(w.surfaceHeightScale)) ? clamp(Number(w.surfaceHeightScale), 0.1, 10) : 1,
        min: Number.isFinite(Number(w.min)) ? Number(w.min) : 0,
        max: Number.isFinite(Number(w.max)) ? Number(w.max) : 100,
        step: Number.isFinite(Number(w.step)) ? Number(w.step) : 1,
        value: w.type === "button"
          ? (w.initialValue === true || w.initialValue === "true" || w.initialValue === 1 || w.initialValue === "1"
            || ((w.initialValue == null) && (w.value === true || w.value === "true" || w.value === 1 || w.value === "1")))
          : (Number.isFinite(Number(w.value)) ? Number(w.value) : 0),
        initialValue: w.type === "button"
          ? (w.initialValue === true || w.initialValue === "true" || w.initialValue === 1 || w.initialValue === "1"
            || ((w.initialValue == null) && (w.value === true || w.value === "true" || w.value === 1 || w.value === "1")))
          : undefined,
        buttonMode: w.type === "button" && w.buttonMode === "momentary" ? "momentary" : "toggle",
        falseLabel: String(w.falseLabel ?? ""),
        trueLabel: String(w.trueLabel ?? ""),
        options: Array.isArray(w.options)
          ? w.options.map((option) => ({
            label: String(option?.label ?? ""),
            value: Number.isFinite(Number(option?.value)) ? Number(option.value) : 0,
          }))
          : [],
        mappings: Array.isArray(w.mappings)
          ? w.mappings.map((mapping) => ({
            value: Number.isFinite(Number(mapping?.value)) ? Number(mapping.value) : 0,
            label: String(mapping?.label ?? ""),
          }))
          : [],
        rows: [],
        columns: Array.isArray(w.columns) ? w.columns.map(normalizeTableColumnName) : [],
        tableColumnOptions: normalizeTableColumnOptions(w.tableColumnOptions),
        xyPairs: Array.isArray(w.xyPairs)
          ? w.xyPairs.map((pair, idx) => ({
            xSource: String(pair.xSource ?? "time"),
            ySource: String(pair.ySource ?? ""),
            visualizedLabel: String(pair.visualizedLabel ?? "").trim().slice(0, 120),
            showTimeSeries: normalizeChartSeriesToggle(pair?.showTimeSeries, pair?.seriesMode !== "instant"),
            showInstantProfile: normalizeChartSeriesToggle(pair?.showInstantProfile, pair?.seriesMode === "instant" ? true : false),
            color: /^#[0-9a-fA-F]{6}$/.test(String(pair?.color ?? "")) ? String(pair.color) : defaultChartSeriesColor(idx),
            pointColor: /^#[0-9a-fA-F]{6}$/.test(String(pair?.pointColor ?? "")) ? String(pair.pointColor) : (/^#[0-9a-fA-F]{6}$/.test(String(pair?.color ?? "")) ? String(pair.color) : defaultChartSeriesColor(idx)),
            showLine: pair?.showLine !== false,
            lineWidth: Number.isFinite(Number(pair?.lineWidth)) ? clamp(Number(pair.lineWidth), 1, 8) : 2.2,
            lineStyle: normalizeChartLineStyle(pair?.lineStyle),
            pointMode: normalizeChartPointMode(pair?.pointMode, pair?.showPoints),
            pointSize: Number.isFinite(Number(pair?.pointSize)) ? clamp(Number(pair.pointSize), 1, 12) : 2.4,
            points: [],
          }))
          : (() => {
            const legacyX = String(w.xSource ?? w.xNode ?? "time");
            const legacyYNodes = Array.isArray(w.yNodes)
              ? w.yNodes.map((n) => String(n))
              : (w.yNode ? [String(w.yNode)] : []);
            return legacyYNodes.map((yNode, idx) => ({
              xSource: legacyX,
              ySource: yNode,
              showTimeSeries: true,
              showInstantProfile: false,
              color: defaultChartSeriesColor(idx),
              showLine: true,
              lineWidth: 2.2,
              lineStyle: "solid",
              pointMode: "all",
              pointSize: 2.4,
              points: [],
            }));
          })(),
      }))
    : [];
  const maxWidgetId = widgets.reduce((max, w) => Math.max(max, w.id), 0);
  const presentationGroups = sanitizePresentationGroups(data.presentationGroups, nodesWithValidNames);
  const maxPresentationGroupId = presentationGroups.reduce((max, group) => Math.max(max, group.id), 0);

  applyGraphData({
    version: 1,
    modelTitle: String(data.modelTitle ?? ""),
    externalData: normalizeExternalDataEntries(data?.externalData),
    localFunctions: Array.isArray(data?.localFunctions)
      ? data.localFunctions.map((definition) => sanitizeLocalFunctionDefinition(definition))
      : [],
    view: data?.view && typeof data.view === "object"
      ? {
        zoom: clampZoom(Number(data.view.zoom) || 1),
        showGrid: data.view.showGrid === true,
        highlightNodeEdges: data.view.highlightNodeEdges === true,
        showNodeValues: data.view.showNodeValues === true,
        showEdgeValues: data.view.showEdgeValues === true,
        gridSize: clamp(Number(data.view.gridSize) || 20, 5, 100),
        tooltipDelayMs: normalizeTooltipDelayMs(data.view.tooltipDelayMs),
        scrollLeft: Math.max(0, Number(data.view.scrollLeft) || 0),
        scrollTop: Math.max(0, Number(data.view.scrollTop) || 0),
      }
      : null,
    modelProperties: Array.isArray(data.modelProperties)
      ? data.modelProperties.map((p) => ({ key: String(p?.key ?? ""), value: String(p?.value ?? "") }))
      : [],
    debug: {
      watches: Array.isArray(data?.debug?.watches) ? data.debug.watches.map((name) => String(name ?? "")) : [],
      breakpointEnabled: Boolean(data?.debug?.breakpointEnabled),
      breakpointExpression: String(data?.debug?.breakpointExpression ?? ""),
    },
    nodeCounter: Math.max(Number(data.nodeCounter) || 0, maxNodeId) + 1,
    edgeCounter: Math.max(Number(data.edgeCounter) || 0, maxEdgeId) + 1,
    widgetCounter: Math.max(Number(data.widgetCounter) || 0, maxWidgetId) + 1,
    textItemCounter: Math.max(Number(data.textItemCounter) || 0, maxTextItemId) + 1,
    presentationGroupCounter: Math.max(Number(data.presentationGroupCounter) || 0, maxPresentationGroupId) + 1,
    presentationGroups,
    dashboard: sanitizeDashboard(data.dashboard),
    execution: normalizeExecutionConfig(data.execution),
    nodes: nodesWithValidNames,
    edges,
    textItems,
    widgets,
  }, { deferReadDataInitialization: true });
}

function defaultGraphFilename() {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `grafo-${stamp}.json`;
}

const modelFileHelpers = globalThis.STGraphXModelFiles?.createModelFileHelpers({
  defaultJsonFilename: defaultGraphFilename,
  hasPlatformApi,
  getPlatform: () => window.STGraphXPlatform,
});

if (!modelFileHelpers) {
  throw new Error("STGraphX model files helpers are unavailable");
}

function normalizeJsonFilename(name) {
  return modelFileHelpers.normalizeJsonFilename(name);
}

function supportsRecentModelPaths() {
  return modelFileHelpers.supportsRecentModelPaths();
}

async function extractFileHandlePath(fileHandle) {
  return modelFileHelpers.extractFileHandlePath(fileHandle);
}

function clearRecentModels() {
  recentModelsStore.clear();
  renderRecentModelsMenu();
}

async function maybeSaveUnsavedChangesBeforeModelReplace(confirmKey) {
  if (!hasUnsavedChanges()) {
    return true;
  }
  const shouldSave = window.confirm(t(confirmKey));
  if (!shouldSave) {
    return true;
  }
  return saveGraphJson(false);
}

function notifyMissingRecentModelEntry(entry) {
  recentModelsStore.remove(entry);
  renderRecentModelsMenu();
  setStatusKey("status.recentMissing");
  window.alert(t("error.recentMissing"));
}

function renderRecentModelsMenu() {
  if (!recentModelsMenuRoot || !recentModelsSection || !recentModelsSep || !clearRecentModelsBtn) {
    return;
  }
  recentModelsSection.innerHTML = "";
  const entries = recentModelsStore.entries();
  const hasRecent = entries.length > 0;
  recentModelsMenuRoot.classList.toggle("hidden", !hasRecent);
  recentModelsSep.classList.toggle("hidden", !hasRecent);
  clearRecentModelsBtn.classList.toggle("hidden", !hasRecent);
  if (!hasRecent) {
    return;
  }
  entries.forEach((entry, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "menu-command";
    btn.title = entry.path || entry.name || "";
    const label = document.createElement("span");
    label.className = "recent-model-label";
    const name = document.createElement("span");
    name.className = "recent-model-name";
    name.textContent = entry.name || entry.path || `${idx + 1}`;
    label.appendChild(name);
    if (entry.path) {
      const path = document.createElement("span");
      path.className = "recent-model-path";
      path.textContent = entry.path;
      label.appendChild(path);
    }
    btn.appendChild(label);
    btn.addEventListener("click", () => {
      closeTopMenus();
      void openRecentModelEntry(entry);
    });
    recentModelsSection.appendChild(btn);
  });
}

async function rememberRecentModel(name, fileHandle = null, directoryHandle = currentModelDirectoryHandle) {
  await recentModelsStore.remember(name, fileHandle, directoryHandle);
  renderRecentModelsMenu();
}

async function resolveRecentModelHandle(entry) {
  // Old Electron entries may contain a Chromium file handle without a path.
  // Relink them once through the native dialog so future openings also recover
  // the parent folder required by relative submodels.
  if (electronFileBridge() && !String(entry?.path || "").trim()) {
    return null;
  }
  return recentModelsStore.resolveHandle(entry);
}

async function resolveRecentModelDirectoryHandle(entry) {
  const handle = await recentModelsStore.resolveDirectoryHandle(entry);
  if (handle?.kind === "pseudo-directory" && Array.isArray(handle.files)) {
    return createPseudoDirectoryHandle(handle.files);
  }
  return handle;
}

async function openPreparedJsonEntry(rootEntry) {
  return modelLoadingHelpers.openPreparedJsonEntry(rootEntry);
}

async function openPreparedJsonEntryInNewTab(rootEntry) {
  return modelLoadingHelpers.openPreparedJsonEntryInNewTab(rootEntry);
}

async function openRecentModelEntry(entry) {
  return modelLoadingHelpers.openRecentModelEntry(entry);
}

function tryDeriveDirectoryHandleFromFileHandle(fileHandle) {
  return modelFileHelpers.tryDeriveDirectoryHandleFromFileHandle(fileHandle);
}

async function deriveDirectoryHandleFromFileHandle(fileHandle) {
  return modelFileHelpers.deriveDirectoryHandleFromFileHandle(fileHandle);
}

function derivedDirectoryHandleDisplayName(handle) {
  return modelFileHelpers.derivedDirectoryHandleDisplayName(handle);
}

function loadGraphFromJsonText(jsonText, sourceName = "", fileHandle = null, directoryHandle = null, preserveSubmodelCache = false) {
  stopTimedExecution(false);
  try {
    if (!preserveSubmodelCache) {
      submodelTemplateCache.clear();
      submodelFileHandleCache.clear();
      submodelSourceCache.clear();
    }
    const data = runtimeLoader.parseJsonText(jsonText);
    runAction(() => {
      importGraphData(data);
    });
    currentFileHandle = fileHandle || null;
    const effectiveDirectoryHandle = directoryHandle || tryDeriveDirectoryHandleFromFileHandle(fileHandle) || null;
    currentModelDirectoryHandle = effectiveDirectoryHandle;
    graph.__directoryPath = String(effectiveDirectoryHandle?.path ?? "");
    graph.__readDataCache = Object.create(null);
    currentFileName = sourceName || currentFileName || defaultGraphFilename();
    history.undo = [];
    history.redo = [];
    updateHistoryButtons();
    ui.submodelsPrepared = false;
    const loadedModel = graph;
    if (effectiveDirectoryHandle) {
      const label = derivedDirectoryHandleDisplayName(effectiveDirectoryHandle);
      if (label) {
        setStatusKey("status.modelFolderDerived", { name: label });
      } else {
        setStatusKey("status.loaded");
      }
    } else {
      setStatusKey("status.loaded");
    }
    void (async () => {
      const missing = await resolveLinkedReadDataFilesAfterLoad(loadedModel, effectiveDirectoryHandle);
      if (graph !== loadedModel) {
        return;
      }
      if (missing.length) {
        setStatusKey("status.linkedDataMissing", { paths: missing.join(", ") }, "warning");
        return;
      }
      try {
        await prepareReadDataCachesForModelTree(loadedModel);
        initializeStateNodes(loadedModel.execution.t0);
        invalidateExpressionPreviewInitializationCache();
        render();
      } catch (err) {
        setStatus(localizeExpressionErrorMessage(String(err?.message || "")), "error");
      }
    })();
    window.requestAnimationFrame(() => {
      if (!data?.view || typeof data.view !== "object") {
        fitToContent();
      }
      window.requestAnimationFrame(() => {
        markSavedSnapshot();
      });
    });
  } catch (err) {
    cancelTransaction();
    setStatus(t("error.load", { message: err.message }), "error");
  }
}

function downloadJsonFile(filename, json) {
  modelFileHelpers.downloadJsonFile(filename, json);
}

function downloadTextFile(filename, text, mimeType = "text/plain;charset=utf-8") {
  modelFileHelpers.downloadTextFile(filename, text, mimeType);
}

async function ensureCurrentModelDirectoryHandle() {
  if (currentModelDirectoryHandle) {
    graph.__directoryPath = String(currentModelDirectoryHandle?.path ?? graph.__directoryPath ?? "");
    return currentModelDirectoryHandle;
  }
  const derivedFromCurrentFile = await deriveDirectoryHandleFromFileHandle(currentFileHandle);
  if (derivedFromCurrentFile) {
    currentModelDirectoryHandle = derivedFromCurrentFile;
    graph.__directoryPath = String(currentModelDirectoryHandle?.path ?? graph.__directoryPath ?? "");
    return currentModelDirectoryHandle;
  }
  if (supportsDirectoryPicker()) {
    currentModelDirectoryHandle = await showDirectoryPickerCompat({ mode: "read" });
    graph.__directoryPath = String(currentModelDirectoryHandle?.path ?? graph.__directoryPath ?? "");
    return currentModelDirectoryHandle;
  }
  // Prefer the native File System Access handle: unlike the legacy
  // webkitdirectory input fallback, it can be stored in IndexedDB and reused
  // by the Recent models menu.
  if (supportsDirectoryInputSelection()) {
    currentModelDirectoryHandle = await pickModelDirectoryWithInput();
    graph.__directoryPath = String(currentModelDirectoryHandle?.path ?? graph.__directoryPath ?? "");
    return currentModelDirectoryHandle;
  }
  throw new Error(t("error.submodelDirectoryUnsupported"));
}

async function getModelDirectoryHandleForReadData(model) {
  if (model === graph) {
    return ensureCurrentModelDirectoryHandle();
  }
  const directoryPath = String(model?.__directoryPath ?? "").trim();
  if (directoryPath && hasPlatformApi("createDirectoryHandleFromDirectoryPath")) {
    return window.STGraphXPlatform.createDirectoryHandleFromDirectoryPath(directoryPath);
  }
  throw new Error("readData requires access to the model folder");
}

async function getLinkedReadDataFile(model, relativePath) {
  const path = normalizeReadDataPath(relativePath);
  const entry = path && Array.isArray(model?.externalData)
    ? model.externalData.find((item) => item.path === path)
    : null;
  if (!entry) {
    return null;
  }
  let handle = linkedReadDataFileHandles.get(path) || null;
  if (!handle && entry.id && linkedDataHandleStore) {
    try {
      handle = await linkedDataHandleStore.get(entry.id) || null;
      if (handle) {
        linkedReadDataFileHandles.set(path, typeof handle.getFile === "function" ? handle : createPseudoFileHandle(handle));
      }
    } catch (_err) {
      handle = null;
    }
  }
  if (!handle) {
    return null;
  }
  return typeof handle.getFile === "function" ? handle.getFile() : handle;
}

async function resolveLinkedReadDataFilesAfterLoad(model, directoryHandle) {
  const paths = Array.isArray(model?.externalData)
    ? model.externalData.map((entry) => normalizeReadDataPath(entry?.path)).filter(Boolean)
    : [];
  if (!paths.length) {
    return [];
  }
  const missing = [];
  for (const path of paths) {
    try {
      const cachedFile = await getLinkedReadDataFile(model, path);
      if (cachedFile) {
        continue;
      }
      if (!directoryHandle?.getFileHandle) throw new Error("Model directory is unavailable");
      const handle = await directoryHandle.getFileHandle(path);
      await handle.getFile();
      if (model === graph) {
        linkedReadDataFileHandles.set(path, handle);
      }
    } catch (_err) {
      missing.push(path);
    }
  }
  return missing;
}

async function prepareReadDataCacheForModel(model) {
  return runtimeLoader.prepareReadDataCacheForModel(model);
}

async function prepareReadDataCachesForModelTree(model, visited = new Set()) {
  return runtimeLoader.prepareReadDataCachesForModelTree(model, visited);
}

function basenameOfSubmodelPath(modelPath) {
  return String(modelPath ?? "").split("/").filter(Boolean).pop() || String(modelPath ?? "");
}

function isDeferredSubmodelResolutionError(err) {
  return String(err?.message || "") === SUBMODEL_DEFERRED_RESOLUTION;
}

function pickSubmodelFileWithInput(accept = ".json,application/json") {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.style.position = "fixed";
    input.style.left = "-9999px";
    input.addEventListener("change", () => {
      const file = input.files && input.files[0] ? input.files[0] : null;
      input.remove();
      if (file) {
        resolve(file);
      } else {
        reject(new Error(t("error.loadCancelled")));
      }
    }, { once: true });
    document.body.appendChild(input);
    input.click();
  });
}

function pickSubmodelFilesWithInput(accept = ".json,application/json") {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = accept;
    input.style.position = "fixed";
    input.style.left = "-9999px";
    input.addEventListener("change", () => {
      const files = Array.from(input.files || []);
      input.remove();
      if (files.length) {
        resolve(files);
      } else {
        reject(new Error(t("error.loadCancelled")));
      }
    }, { once: true });
    document.body.appendChild(input);
    input.click();
  });
}

function supportsDirectoryInputSelection() {
  const input = document.createElement("input");
  return "webkitdirectory" in input || "directory" in input;
}

function createPseudoFileHandle(file) {
  return {
    name: String(file?.name || ""),
    async getFile() {
      return file;
    },
  };
}

function createPseudoDirectoryHandle(files) {
  const fileMap = new Map();
  Array.from(files || []).forEach((file) => {
    const rawRelativePath = String(file?.webkitRelativePath || file?.name || "").replace(/\\/g, "/");
    const relativeParts = rawRelativePath.split("/").filter(Boolean);
    const relativePath = relativeParts.length > 1 ? relativeParts.slice(1).join("/") : relativeParts[0] || "";
    const normalizedRelativePath = normalizeReadDataPath(relativePath);
    const baseName = normalizeSubmodelPath(file?.name) || basenameOfSubmodelPath(file?.name);
    if (normalizedRelativePath && !fileMap.has(normalizedRelativePath)) {
      fileMap.set(normalizedRelativePath, file);
    }
    if (baseName && !fileMap.has(baseName)) {
      fileMap.set(baseName, file);
    }
  });
  return {
    kind: "directory",
    name: "",
    // Keep the selected files so recent models can serialize this fallback.
    files: Array.from(files || []),
    async getFileHandle(name) {
      const normalizedPath = normalizeReadDataPath(name);
      const baseName = normalizeSubmodelPath(name) || basenameOfSubmodelPath(name);
      const file = (normalizedPath && fileMap.get(normalizedPath)) || fileMap.get(baseName);
      if (!file) {
        const err = new Error(`Missing file: ${normalizedPath || baseName}`);
        err.name = "NotFoundError";
        throw err;
      }
      return createPseudoFileHandle(file);
    },
  };
}

function pickModelDirectoryWithInput() {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.style.position = "fixed";
    input.style.left = "-9999px";
    input.webkitdirectory = true;
    input.directory = true;
    input.setAttribute("webkitdirectory", "");
    input.setAttribute("directory", "");
    input.addEventListener("change", async () => {
      const files = Array.from(input.files || []);
      input.remove();
      if (!files.length) {
        reject(new Error(t("error.loadCancelled")));
        return;
      }
      try {
        const jsonFiles = files.filter((file) => String(file?.name || "").toLowerCase().endsWith(".json"));
        await cacheSelectedSubmodelEntries(jsonFiles);
        resolve(createPseudoDirectoryHandle(files));
      } catch (err) {
        reject(err);
      }
    }, { once: true });
    document.body.appendChild(input);
    input.click();
  });
}

async function parseSelectedJsonEntry(entry) {
  return modelSessionHelpers.parseSelectedJsonEntry(entry);
}

function collectReferencedSubmodelNames(data) {
  return submodelSupportHelpers.collectReferencedSubmodelNames(data);
}

function rootModelHasSubmodels(data) {
  return submodelSupportHelpers.rootModelHasSubmodels(data);
}

function rootModelHasUnresolvedSubmodels(data) {
  return submodelSupportHelpers.rootModelHasUnresolvedSubmodels(data);
}

async function maybeSelectModelDirectoryForSubmodels(data) {
  return submodelSupportHelpers.maybeSelectModelDirectoryForSubmodels(data);
}

async function prepareSelectedJsonEntries(entries) {
  return modelSessionHelpers.prepareSelectedJsonEntries(entries, {
    onCacheSubmodelSource(baseName, payload) {
      submodelSourceCache.set(baseName, payload.text);
      if (payload.fileHandle) {
        submodelFileHandleCache.set(baseName, payload.fileHandle);
      }
      if (payload.template) {
        submodelTemplateCache.set(baseName, payload.template);
      }
    },
  });
}

async function cacheSelectedSubmodelEntries(entries, allowedNames = null) {
  return submodelSupportHelpers.cacheSelectedSubmodelEntries(entries, allowedNames);
}

async function promptForMissingSubmodelFiles(missingPaths) {
  return submodelSupportHelpers.promptForMissingSubmodelFiles(missingPaths);
}

async function resolveSubmodelFileByPath(modelPath, options = {}) {
  return submodelResolutionHelpers.resolveSubmodelFileByPath(modelPath, options);
}

function extractSubmodelInterfaceFromData(data) {
  return submodelSupportHelpers.extractSubmodelInterfaceFromData(data);
}

async function loadSubmodelInterfaceByPath(modelPath) {
  return submodelResolutionHelpers.loadSubmodelInterfaceByPath(modelPath);
}

async function loadSubmodelTemplateByPath(modelPath, visited = new Set(), options = {}) {
  return submodelResolutionHelpers.loadSubmodelTemplateByPath(modelPath, visited, options);
}

async function ensureSubmodelTemplatesReady(options = {}) {
  return submodelOrchestrationHelpers.ensureSubmodelTemplatesReady(options);
}

async function refreshSubmodelInterface(node, updateStatus = true, options = {}) {
  return submodelOrchestrationHelpers.refreshSubmodelInterface(node, updateStatus, options);
}

async function refreshAllSubmodelInterfaces() {
  return submodelOrchestrationHelpers.refreshAllSubmodelInterfaces();
}

async function preloadSubmodelsAfterLoad() {
  await submodelOrchestrationHelpers.preloadSubmodelsAfterLoad();
  refreshInitialValuesAfterSubmodelPreload();
}

// The first import happens before submodel templates are available. Rebuild the
// preview once they are loaded, while keeping the model ready to start at t0.
function refreshInitialValuesAfterSubmodelPreload() {
  if (!ui.submodelsPrepared || graph.execution.currentTime != null) {
    return;
  }
  const timeValue = Number(graph.execution.t0);
  if (!Number.isFinite(timeValue)) {
    return;
  }
  clearRuntimeSubmodelState();
  initializeStateNodes(timeValue);
  evaluateAtTime(timeValue);
  graph.execution.currentTime = null;
  refreshRuntimeView();
}

async function openSubmodelNodeInNewTab(node) {
  return submodelOrchestrationHelpers.openSubmodelNodeInNewTab(node);
}

async function writeJsonToFileHandle(fileHandle, json) {
  return modelPersistenceHelpers.writeJsonToFileHandle(fileHandle, json);
}

async function writeTextToFileHandle(fileHandle, text) {
  return modelPersistenceHelpers.writeTextToFileHandle(fileHandle, text);
}

async function pickSaveAsHandle(suggestedName) {
  if (!supportsSaveFilePicker()) {
    return null;
  }
  return modelSessionHelpers.pickSaveAsHandle(suggestedName);
}

async function pickSaveCsvHandle(suggestedName) {
  if (!supportsSaveFilePicker()) {
    return null;
  }
  return modelSessionHelpers.pickSaveCsvHandle(suggestedName);
}

async function exportSimulationCsv() {
  let csv;
  try {
    csv = buildSimulationCsvText();
  } catch (err) {
    const message = String(err?.message || t("error.csvExportFailed"));
    setStatus(message, true);
    window.alert(message);
    return false;
  }

  let filename = suggestedCsvFilename();
  const hasNativeSavePicker = supportsSaveFilePicker();
  try {
    const fileHandle = await pickSaveCsvHandle(filename);
    if (fileHandle) {
      const ok = await writeTextToFileHandle(fileHandle, csv);
      if (!ok) {
        setStatusKey("error.csvExportFailed");
        window.alert(t("error.csvExportFailed"));
        return false;
      }
      setStatusKey("status.csvExported");
      return true;
    }
  } catch (err) {
    if (err && err.name === "AbortError") {
      setStatusKey("status.csvExportCanceled");
      return false;
    }
    if (hasNativeSavePicker) {
      setStatusKey("error.csvExportFailed");
      window.alert(t("error.csvExportFailed"));
      return false;
    }
  }

  if (isFirefoxBrowser()) {
    const proposed = window.prompt(t("prompt.saveCsv"), filename);
    if (proposed == null) {
      setStatusKey("status.csvExportCanceled");
      return false;
    }
    filename = normalizeCsvFilename(proposed);
  }

  downloadTextFile(filename, csv, "text/csv;charset=utf-8");
  setStatusKey("status.csvExported");
  return true;
}

async function saveGraphJson(forceSaveAs = false) {
  const result = await modelPersistenceHelpers.saveJsonModel({
    forceSaveAs,
    dirtySinceLastSave,
    exportGraphData,
    currentFileHandle,
    currentFileName,
    currentModelDirectoryHandle,
    defaultGraphFilename,
    normalizeJsonFilename,
    pickSaveAsHandle,
    deriveDirectoryHandleFromFileHandle,
    rememberRecentModel,
    markSavedSnapshot,
    isFirefoxBrowser,
    promptSaveAs: (suggestedName) => window.prompt(t("prompt.saveAs"), suggestedName),
    downloadJsonFile,
    hasNativeSavePicker: supportsSaveFilePicker(),
    setStatusKey,
    async onAfterSave({ fileName, fileHandle, directoryHandle, data }) {
      currentFileHandle = fileHandle || null;
      currentFileName = fileName;
      currentModelDirectoryHandle = directoryHandle || null;
      graph.__directoryPath = String(currentModelDirectoryHandle?.path ?? graph.__directoryPath ?? "");
      submodelTemplateCache.set(String(currentFileName || fileName), buildRuntimeModelFromData(data, {
        directoryPath: String(currentModelDirectoryHandle?.path ?? ""),
      }));
    },
  });
  return result.ok;
}

async function loadGraphJsonFile(file) {
  try {
    const extraFiles = Array.from(loadJsonInput.files || []).filter((entry) => entry !== file);
    await modelLoadingHelpers.loadGraphJsonFile(file, extraFiles);
  } catch (_err) {
    cancelTransaction();
    setStatusKey("status.readError");
  }
}

async function openGraphJson() {
  if (supportsOpenFilePicker()) {
    try {
      const opened = await modelLoadingHelpers.openGraphJson();
      if (opened) {
        return;
      }
    } catch (err) {
      if (err && err.name === "AbortError") {
        return;
      }
    }
  }
  loadJsonInput.multiple = true;
  loadJsonInput.click();
}

function resetGraphToEmptyModel() {
  graph.modelTitle = "";
  graph.properties = [];
  graph.localFunctions = [];
  graph.externalData = [];
  linkedReadDataFileHandles.clear();
  graph.nodes = [];
  graph.edges = [];
  graph.textItems = [];
  graph.widgets = [];
  graph.presentationGroups = [];
  graph.dashboard = null;
  graph.debug = {
    watches: [],
    breakpointEnabled: false,
    breakpointExpression: "",
  };
  graph.__directoryPath = "";
  graph.__readDataCache = Object.create(null);
  clearSimulationOutputHistory();
  invalidateExecutionPlan();
  stopTimedExecution(false);
  graph.execution = {
    t0: 0,
    dt: 1,
    t1: 10,
    delayMs: 100,
    renderEverySteps: 1,
    decimals: 3,
    integrator: "euler",
    strictDefinitions: true,
    currentTime: null,
  };
  nodeCounter = 1;
  edgeCounter = 1;
  widgetCounter = 1;
  textItemCounter = 1;
  presentationGroupCounter = 1;
  clearAllSelection();
  history.undo = [];
  history.redo = [];
  updateHistoryButtons();
  currentFileHandle = null;
  currentFileName = "";
  currentModelDirectoryHandle = null;
  submodelTemplateCache.clear();
  submodelFileHandleCache.clear();
  submodelSourceCache.clear();
  ui.submodelsPrepared = false;
  ui.showGrid = false;
  ui.watchPreviousSnapshot = new Map();
  ui.breakpointLastResult = null;
  ui.localFunctionsEditor = null;
}

async function createNewGraph() {
  saveActiveWorkspaceTabState();
  closeDocumentTransientUi();
  resetGraphToEmptyModel();
  createWorkspaceTabFromCurrentState({ activate: true });
  setStatusKey("status.newGraph");
  render();
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      markSavedSnapshot();
    });
  });
}

function stopTimedExecution(updateStatus = true) {
  runtimeController.stopTimedExecution(updateStatus);
}

function isTimeWithinBounds(value, t0, dt, t1) {
  const epsilon = Math.max(1e-12, Math.abs(dt) * 1e-9);
  if (dt > 0) {
    return value <= t1 + epsilon && value >= t0 - epsilon;
  }
  return value >= t1 - epsilon && value <= t0 + epsilon;
}

function isExecutionEnded(cfg) {
  if (graph.execution.currentTime == null) {
    return false;
  }
  const nextTime = graph.execution.currentTime + cfg.dt;
  return !isTimeWithinBounds(nextTime, cfg.t0, cfg.dt, cfg.t1);
}

function parseModelPropertyStoredValue(raw) {
  return runtimeShared.parseModelPropertyStoredValue(raw);
}

function serializeModelPropertyStoredValue(value) {
  return runtimeShared.serializeModelPropertyStoredValue(value);
}

function parseNodePropertyStoredValue(raw) {
  return runtimeShared.parseNodePropertyStoredValue(raw);
}

function serializeNodePropertyStoredValue(value) {
  return runtimeShared.serializeNodePropertyStoredValue(value);
}

const runtimeCore = globalThis.STGraphXRuntimeCore?.createRuntimeCore({
  t,
  semantics,
  normalizeExecutionConfig,
  deserializeNodeType,
  normalizeNodeDescriptionProperty: runtimeShared.normalizeNodeDescriptionProperty,
  normalizeNodeFormulaNotesProperty: runtimeShared.normalizeNodeFormulaNotesProperty,
  sanitizeLocalFunctionDefinition,
  clamp,
  deepClone,
  localFunctionsForSemantics,
  globalParameterNodesForModel,
  referencedGlobalParameterNodesForTarget,
  isStateNode,
  getModelNodeById,
  isSubmodelNode,
  normalizeSubmodelPath,
  normalizeReadDataPath,
  parseModelPropertyStoredValue,
  serializeModelPropertyStoredValue,
  parseNodePropertyStoredValue,
  serializeNodePropertyStoredValue,
  submodelBindingReferences,
  applyRuntimeModelInputOverrides,
  getSubmodelTemplate: (modelPath) => {
    const normalized = normalizeSubmodelPath(modelPath);
    return normalized ? submodelTemplateCache.get(normalized) || null : null;
  },
});

if (!runtimeCore) {
  throw new Error("STGraphX runtime core is unavailable");
}

const runtimeLoader = globalThis.STGraphXRuntimeLoader?.createRuntimeLoader({
  t,
  normalizeReadDataPath,
  expressionUsesReadData,
  validateReadDataExpressionUsage,
  extractReadDataPaths,
  parseCsvMatrix,
  normalizeSubmodelPath,
  isSubmodelNode,
  getSubmodelTemplate: (modelPath) => {
    const normalized = normalizeSubmodelPath(modelPath);
    return normalized ? submodelTemplateCache.get(normalized) || null : null;
  },
  getDirectoryHandleForModel: async (model) => getModelDirectoryHandleForReadData(model),
  getLinkedReadDataFile,
});

if (!runtimeLoader) {
  throw new Error("STGraphX runtime loader is unavailable");
}

const runtimeSession = globalThis.STGraphXRuntimeSession?.createRuntimeSession({
  core: runtimeCore,
  model: graph,
  rootExecution: graph.execution,
  isStateNode,
  beforeInitialize: () => {
    applyWidgetDrivenNodeValues();
  },
  beforeEvaluate: () => {
    captureWatchSnapshot();
    applyWidgetDrivenNodeValues();
  },
  afterEvaluate: ({ timeValue }) => {
    const nodeMap = buildNodeNameMap();
    updateTableWidgetsFromComputedValues(timeValue, nodeMap);
    updateXYWidgetsFromComputedValues(timeValue, nodeMap);
    recordSimulationOutputSnapshot(timeValue);
    syncSubmodelWorkspaceTabsFromActiveParent();
  },
});

if (!runtimeSession) {
  throw new Error("STGraphX runtime session is unavailable");
}

const runtimeController = globalThis.STGraphXRuntimeController?.createRuntimeController({
  session: runtimeSession,
  getExecution: () => graph.execution,
  timedState: ui,
  t,
  enforceStrictDefinitions: () => enforceStrictDefinitionsIfNeeded(),
  ensureBreakpointReady: () => ensureBreakpointReadyForExecution(),
  prepareForExecution: () => prepareSubmodelsForExecution(),
  isExecutionEnded,
  refreshRuntimeView: () => refreshRuntimeView(),
  render: () => render(),
  updateEditingLockUi: () => updateEditingLockUi(),
  setStatusKey: (key, vars) => setStatusKey(key, vars),
  setStatus: (message, isError) => setStatus(message, isError),
  formatNumberValue: (value) => formatNumberValue(value),
  formatExecutionDuration: (ms) => formatExecutionDuration(ms),
  evalReasonText: (reason) => evalReasonText(reason),
  evaluateBreakpointConditionAtTime: (timeValue) => {
    const result = evaluateBreakpointConditionAtTime(timeValue);
    ui.breakpointLastResult = result.hit ? { ...result, time: timeValue } : result;
    return result;
  },
  openWatchDebugger: () => openWatchDebugger(),
  clearVisualHistory: () => {
    clearAllXYChartPoints();
    clearAllTableWidgetRows();
  },
  clearSimulationHistory: () => clearSimulationOutputHistory(),
  hasStrictExecutionBlock: () => hasStrictExecutionBlock(),
  buildEvaluationEnv: () => ({
    rootExecution: graph.execution,
    stack: [],
  }),
});

if (!runtimeController) {
  throw new Error("STGraphX runtime controller is unavailable");
}

function buildRuntimeModelFromData(data, options = {}) {
  return runtimeCore.buildRuntimeModelFromData(data, options);
}

function cloneRuntimeModel(template) {
  return runtimeCore.cloneRuntimeModel(template);
}

function getModelPropertyValue(key, fallback = null) {
  const name = String(key ?? "");
  const found = graph.properties.find((prop) => String(prop?.key ?? "") === name);
  if (!found) {
    return fallback;
  }
  return parseModelPropertyStoredValue(found.value);
}

function setModelPropertyValue(key, value) {
  const name = String(key ?? "");
  const stored = serializeModelPropertyStoredValue(value);
  const found = graph.properties.find((prop) => String(prop?.key ?? "") === name);
  if (found) {
    found.value = stored;
  } else {
    graph.properties.push({ key: name, value: stored });
  }
  return value;
}

function readDataFromModelCache(model, relativePath) {
  return runtimeCore.readDataFromModelCache(model, relativePath);
}

function clearSimulationOutputHistory() {
  graph.__simulationHistory = [];
}

function cloneSimulationOutputValue(value) {
  if (value === null || value === undefined) {
    return value;
  }
  try {
    if (typeof structuredClone === "function") {
      return structuredClone(value);
    }
  } catch (_err) {
    // Fall through.
  }
  try {
    return deepClone(value);
  } catch (_err) {
    return value;
  }
}

function recordSimulationOutputSnapshot(timeValue) {
  const outputNodes = graph.nodes.filter((node) => node.output);
  if (!outputNodes.length) {
    return;
  }
  if (!Array.isArray(graph.__simulationHistory)) {
    graph.__simulationHistory = [];
  }
  graph.__simulationHistory.push({
    time: Number(timeValue),
    values: Object.fromEntries(outputNodes.map((node) => [
      node.name,
      {
        value: cloneSimulationOutputValue(node.computedValue),
        error: String(node.computedError || ""),
      },
    ])),
  });
}

function normalizeCsvFilename(name) {
  return modelFileHelpers.normalizeCsvFilename(name);
}

function suggestedCsvFilename() {
  const base = String(currentFileName || graph.modelTitle || "simulation-output")
    .replace(/\.json$/i, "")
    .trim();
  return normalizeCsvFilename(base ? `${base}-output` : "simulation-output");
}

function csvEscapeCell(value) {
  const text = value == null ? "" : String(value);
  if (!/[",\n\r]/.test(text)) {
    return text;
  }
  return `"${text.replace(/"/g, "\"\"")}"`;
}

function inferCsvValueSchema(value) {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === "number" || typeof value === "string" || typeof value === "boolean") {
    return { kind: "scalar" };
  }
  if (!Array.isArray(value)) {
    return { kind: "serialized" };
  }
  if (value.every((item) => !Array.isArray(item))) {
    return { kind: "vector", size: value.length };
  }
  const isRectangularMatrix =
    value.length > 0
    && value.every((row) => Array.isArray(row))
    && value.every((row) => row.length === value[0].length)
    && value.every((row) => row.every((cell) => !Array.isArray(cell)));
  if (isRectangularMatrix) {
    return { kind: "matrix", rows: value.length, cols: value[0].length };
  }
  return { kind: "serialized" };
}

function csvSchemaMatches(schema, candidate) {
  if (!schema || !candidate) {
    return true;
  }
  if (schema.kind !== candidate.kind) {
    return false;
  }
  if (schema.kind === "vector") {
    return schema.size === candidate.size;
  }
  if (schema.kind === "matrix") {
    return schema.rows === candidate.rows && schema.cols === candidate.cols;
  }
  return true;
}

function csvNodeColumnNames(nodeName, schema) {
  if (!schema || schema.kind === "scalar" || schema.kind === "serialized") {
    return [nodeName];
  }
  if (schema.kind === "vector") {
    return Array.from({ length: schema.size }, (_unused, idx) => `${nodeName}[${idx}]`);
  }
  if (schema.kind === "matrix") {
    const columns = [];
    for (let row = 0; row < schema.rows; row += 1) {
      for (let col = 0; col < schema.cols; col += 1) {
        columns.push(`${nodeName}[${row},${col}]`);
      }
    }
    return columns;
  }
  return [nodeName];
}

function csvValueCellsForSchema(value, schema) {
  if (value === null || value === undefined) {
    return new Array(csvNodeColumnNames("", schema).length).fill("");
  }
  if (!schema || schema.kind === "scalar") {
    return [String(value)];
  }
  if (schema.kind === "serialized") {
    try {
      return [JSON.stringify(value)];
    } catch (_err) {
      return [String(value)];
    }
  }
  if (schema.kind === "vector") {
    return Array.from({ length: schema.size }, (_unused, idx) => value[idx] == null ? "" : String(value[idx]));
  }
  if (schema.kind === "matrix") {
    const cells = [];
    for (let row = 0; row < schema.rows; row += 1) {
      for (let col = 0; col < schema.cols; col += 1) {
        cells.push(value[row]?.[col] == null ? "" : String(value[row][col]));
      }
    }
    return cells;
  }
  return [String(value)];
}

function buildSimulationCsvText() {
  const history = Array.isArray(graph.__simulationHistory) ? graph.__simulationHistory : [];
  if (!history.length) {
    throw new Error(t("error.csvNoData"));
  }
  const outputNames = graph.nodes.filter((node) => node.output).map((node) => node.name);
  if (!outputNames.length) {
    throw new Error(t("error.csvNoOutputs"));
  }

  const schemas = new Map();
  outputNames.forEach((name) => {
    let schema = null;
    for (const entry of history) {
      const sample = entry?.values?.[name];
      if (!sample || sample.error || sample.value == null) {
        continue;
      }
      const candidate = inferCsvValueSchema(sample.value);
      if (!schema) {
        schema = candidate;
      } else if (!csvSchemaMatches(schema, candidate)) {
        throw new Error(t("error.csvShapeChanged", { name }));
      }
    }
    schemas.set(name, schema || { kind: "scalar" });
  });

  const header = ["time"];
  outputNames.forEach((name) => {
    csvNodeColumnNames(name, schemas.get(name)).forEach((columnName) => header.push(columnName));
  });

  const lines = [header.map(csvEscapeCell).join(",")];
  history.forEach((entry) => {
    const row = [csvEscapeCell(entry.time)];
    outputNames.forEach((name) => {
      const schema = schemas.get(name);
      const sample = entry?.values?.[name];
      if (!sample || sample.error || sample.value == null) {
        csvNodeColumnNames(name, schema).forEach(() => row.push(""));
        return;
      }
      const candidate = inferCsvValueSchema(sample.value);
      if (!csvSchemaMatches(schema, candidate)) {
        throw new Error(t("error.csvShapeChanged", { name }));
      }
      csvValueCellsForSchema(sample.value, schema).forEach((cell) => row.push(csvEscapeCell(cell)));
    });
    lines.push(row.join(","));
  });
  return lines.join("\n");
}

function buildExecutionGlobals(timeValue) {
  return {
    ...runtimeCore.buildExecutionGlobalsForModel(graph, graph.execution, timeValue),
    getModelProperty: getModelPropertyValue,
    setModelProperty: setModelPropertyValue,
  };
}

function buildExecutionGlobalsForModel(model, rootExecution, timeValue) {
  return runtimeCore.buildExecutionGlobalsForModel(model, rootExecution, timeValue);
}

function nodePropertyAccessForContext(node) {
  return {
    getProperty: (key, fallback = null) => {
      const found = node.properties.find((prop) => String(prop?.key ?? "") === String(key ?? ""));
      return found ? parseNodePropertyStoredValue(found.value) : fallback;
    },
    setProperty: (key, value) => {
      const name = String(key ?? "");
      const stored = serializeNodePropertyStoredValue(value);
      const found = node.properties.find((prop) => String(prop?.key ?? "") === name);
      if (found) {
        found.value = stored;
      } else {
        node.properties.push({ key: name, value: stored });
      }
      return value;
    },
  };
}

function evaluateParameterNodesForModel(model, timeValue, rootExecution) {
  return runtimeCore.evaluateParameterNodesForModel(model, timeValue, rootExecution);
}

function buildInitialStateContextForModel(model, node, timeValue, rootExecution) {
  return runtimeCore.buildInitialStateContextForModel(model, node, timeValue, rootExecution);
}

function initializeStateNodesForModel(model, timeValue, rootExecution) {
  return runtimeCore.initializeStateNodesForModel(model, timeValue, rootExecution);
}

function promotePendingStateNodesForModel(model) {
  return runtimeCore.promotePendingStateNodesForModel(model);
}

function getCachedSubmodelTemplate(modelPath) {
  const normalized = normalizeSubmodelPath(modelPath);
  return normalized ? submodelTemplateCache.get(normalized) || null : null;
}

function evaluateModelAtTimeRecursive(model, timeValue, env, options = {}) {
  return runtimeCore.evaluateModelAtTimeRecursive(model, timeValue, env, options);
}

function currentDisplayTimeValue() {
  return graph.execution.currentTime == null
    ? Number(graph.execution.t0)
    : Number(graph.execution.currentTime);
}

function hasInitializedStateSnapshot(model = graph) {
  return runtimeSession.hasInitializedStateSnapshot(model);
}

function updateMenuTimeLabel() {
  if (!menuTimeText) {
    return;
  }
  const baseTime = graph.execution.currentTime == null
    ? Number(graph.execution.t0)
    : Number(graph.execution.currentTime);
  if (!Number.isFinite(baseTime)) {
    menuTimeText.textContent = "";
    return;
  }
  menuTimeText.textContent = t("menu.time", { time: formatNumberValue(baseTime) });
}

function ensureExecutionPlan() {
  if (!ui.executionPlan) {
    ui.executionPlan = semantics.prepareStatefulExecutionPlan(graph.nodes, graph.edges);
  }
  return ui.executionPlan;
}

function isRk4IntegratorSelected() {
  return String(graph.execution.integrator ?? "euler") === "rk4";
}

function graphHasSubmodels(model = graph) {
  return Boolean(model?.nodes?.some((node) => isSubmodelNode(node)));
}

function clearRuntimeSubmodelState(model = graph) {
  return runtimeSession.clearSubmodelState(model);
}

function scaleTensorValue(value, factor) {
  return runtimeCore.scaleTensorValue(value, factor);
}

function combineTensorValues(left, right, scalarFn) {
  return runtimeCore.combineTensorValues(left, right, scalarFn);
}

function addTensorValues(left, right) {
  return runtimeCore.addTensorValues(left, right);
}

function rk4IntegratedValue(currentValue, k1, k2, k3, k4, dt) {
  return runtimeCore.rk4IntegratedValue(currentValue, k1, k2, k3, k4, dt);
}

function collectRk4IntegralStateAnalyses() {
  const analyses = new Map();
  graph.nodes.forEach((node) => {
    if (!isStateNode(node)) {
      return;
    }
    const analysis = semantics.analyzeStateTransitionExpression(node.valueExpression);
    if (analysis.ok && analysis.usesIntegral && analysis.integralCount > 0) {
      analyses.set(node.id, analysis);
    }
  });
  return analyses;
}

function buildStateOverrideMap(baseMap, derivativeMap, factor) {
  const overrides = new Map();
  for (const [nodeId, baseValue] of baseMap.entries()) {
    const derivativeValue = derivativeMap.get(nodeId);
    if (derivativeValue === undefined) {
      continue;
    }
    overrides.set(nodeId, addTensorValues(baseValue, scaleTensorValue(derivativeValue, factor)));
  }
  return overrides;
}

function extractSuccessfulResultMap(entries) {
  return runtimeCore.extractSuccessfulResultMap(entries);
}

function extractSuccessfulAlgebraicValueMap(entries) {
  return runtimeCore.extractSuccessfulAlgebraicValueMap(entries);
}

function firstFailedEntry(entries, nodeIds = null) {
  return runtimeCore.firstFailedEntry(entries, nodeIds);
}

function collectRk4IntegralStateAnalysesForModel(model) {
  return runtimeCore.collectRk4IntegralStateAnalysesForModel(model);
}

function buildCurrentStateMapForModel(model, stateValueOverrides = null) {
  return runtimeCore.buildCurrentStateMapForModel(model, stateValueOverrides);
}

function createSubmodelNodeEvaluator(model, timeValue, env, options = {}) {
  return runtimeCore.createSubmodelNodeEvaluator(model, timeValue, env, options);
}

function evaluateTransitionResultsWithIntegralValuesForModel(
  model,
  timeValue,
  env,
  executionPlan,
  integralStateIds,
  integralValuesMap,
  algebraicValueMap,
  stateValueOverrides = null,
) {
  return runtimeCore.evaluateTransitionResultsWithIntegralValuesForModel(
    model,
    timeValue,
    env,
    executionPlan,
    integralStateIds,
    integralValuesMap,
    algebraicValueMap,
    stateValueOverrides,
  );
}

function buildStageIntegralValuesMap(currentStateMap, derivativeListMap, factor) {
  return runtimeCore.buildStageIntegralValuesMap(currentStateMap, derivativeListMap, factor);
}

function evaluateTransitionResultsWithIntegralValues(timeValue, integralStateIds, integralValuesMap) {
  const globals = buildExecutionGlobals(timeValue);
  const executionPlan = ensureExecutionPlan();
  const results = new Map();
  graph.nodes.forEach((node) => {
    if (!integralStateIds.has(node.id)) {
      return;
    }
    const context = {
      ...globals,
      __self: node.computedValue,
    };
    globalParameterNodesForModel(graph, node.id).forEach((depNode) => {
      if (!depNode.computedError) {
        context[depNode.name] = depNode.computedValue;
      }
    });
    (executionPlan.incoming.get(node.id) || []).forEach((fromId) => {
      const fromNode = getNodeById(fromId);
      if (!fromNode) {
        return;
      }
      context[fromNode.name] = fromNode.computedValue;
    });
    const access = {
      getProperty: (key, fallback = null) => {
        const found = node.properties.find((prop) => String(prop?.key ?? "") === String(key ?? ""));
        return found ? parseNodePropertyStoredValue(found.value) : fallback;
      },
      setProperty: (key, value) => {
        const name = String(key ?? "");
        const stored = serializeNodePropertyStoredValue(value);
        const found = node.properties.find((prop) => String(prop?.key ?? "") === name);
        if (found) {
          found.value = stored;
        } else {
          node.properties.push({ key: name, value: stored });
        }
        return value;
      },
    };
    results.set(
      node.id,
      semantics.evaluateStateTransitionExpressionWithIntegralValues(
        node.valueExpression,
        { ...context, ...access },
        integralValuesMap.get(node.id) || [],
        { allowThisAlias: true, localFunctions: localFunctionsForSemantics(graph) },
      ),
    );
  });
  return results;
}

function initializeStateNodes(timeValue) {
  runtimeSession.initializeAt(timeValue, graph, graph.execution);
}

function promotePendingStateNodes() {
  runtimeSession.promotePending(graph);
}

function evaluateAtTime(timeValue) {
  return runtimeSession.evaluateAtTime(timeValue, {
    rootExecution: graph.execution,
    stack: [],
  });
}

function validateTimeConfig() {
  return runtimeController.validateTimeConfig();
}

async function prepareSubmodelsForExecution() {
  await preloadSubmodelsAfterLoad();
  let ready = await ensureSubmodelTemplatesReady({ allowPrompt: false });
  if (!ready) {
    const hasSubmodels = graph.nodes.some((node) => isSubmodelNode(node) && String(node.modelPath ?? "").trim());
    if (hasSubmodels && !currentModelDirectoryHandle && (supportsDirectoryInputSelection() || supportsDirectoryPicker())) {
      try {
        await ensureCurrentModelDirectoryHandle();
        await preloadSubmodelsAfterLoad();
        ready = await ensureSubmodelTemplatesReady({ allowPrompt: false });
      } catch (_err) {
        ready = false;
      }
    }
  }
  if (!ready) {
    return false;
  }
  try {
    await prepareReadDataCachesForModelTree(graph);
  } catch (err) {
    setStatus(localizeExpressionErrorMessage(String(err?.message || "")), true);
    return false;
  }
  return ready;
}

async function executeOneStep(restartIfEnded = true) {
  return runtimeController.executeOneStep(restartIfEnded);
}

async function executeNodeExpressions() {
  await runtimeController.executeAll();
}

async function runManualStep() {
  await runtimeController.runManualStep();
}

async function resetExecution() {
  await runtimeController.resetExecution();
}

async function toggleTimedExecution() {
  await runtimeController.toggleTimedExecution();
}

window.addEventListener("pointermove", (evt) => {
  if (ui.touchHold && evt.pointerId === ui.touchHold.pointerId) {
    ui.touchHold.lastClientX = evt.clientX;
    ui.touchHold.lastClientY = evt.clientY;
    if (
      Math.hypot(
        evt.clientX - ui.touchHold.startClientX,
        evt.clientY - ui.touchHold.startClientY,
      ) > ui.touchHold.moveTolerance
    ) {
      clearTouchHold();
    }
  }
  if (ui.tabletSidebarDrag && evt.pointerId === ui.tabletSidebarDrag.pointerId) {
    return;
  }
  if (handleCompactTouchViewportPointerMove(evt)) {
    return;
  }
  if (ui.modalDrag && evt.pointerId === ui.modalDrag.pointerId) {
    const card = ui.modalDrag.card;
    if (card) {
      card.style.transform = "none";
      card.style.left = `${evt.clientX - ui.modalDrag.offsetX}px`;
      card.style.top = `${evt.clientY - ui.modalDrag.offsetY}px`;
    }
    return;
  }
  if (ui.modalResize && evt.pointerId === ui.modalResize.pointerId) {
    const card = ui.modalResize.card;
    if (card) {
      const nextWidth = clamp(ui.modalResize.startWidth + (evt.clientX - ui.modalResize.startClientX), 780, window.innerWidth - 20);
      const nextHeight = clamp(ui.modalResize.startHeight + (evt.clientY - ui.modalResize.startClientY), 420, window.innerHeight - 20);
      card.style.transform = "none";
      card.style.left = `${ui.modalResize.startLeft}px`;
      card.style.top = `${ui.modalResize.startTop}px`;
      card.style.width = `${nextWidth}px`;
      card.style.height = `${nextHeight}px`;
    }
    return;
  }
  if (ui.dashboardDrag && evt.pointerId === ui.dashboardDrag.pointerId) {
    const dashboard = graph.dashboard;
    if (dashboard) {
      const z = Math.max(0.0001, ui.zoom || 1);
      const dx = (evt.clientX - ui.dashboardDrag.startClientX) / z;
      const dy = (evt.clientY - ui.dashboardDrag.startClientY) / z;
      dashboard.x = ui.snapToGrid ? snap(ui.dashboardDrag.startX + dx) : ui.dashboardDrag.startX + dx;
      dashboard.y = ui.snapToGrid ? snap(ui.dashboardDrag.startY + dy) : ui.dashboardDrag.startY + dy;
      render();
    }
    return;
  }
  if (ui.dashboardResize && evt.pointerId === ui.dashboardResize.pointerId) {
    const dashboard = graph.dashboard;
    if (dashboard) {
      const z = Math.max(0.0001, ui.zoom || 1);
      const dx = (evt.clientX - ui.dashboardResize.startClientX) / z;
      const dy = (evt.clientY - ui.dashboardResize.startClientY) / z;
      dashboard.width = clamp(ui.dashboardResize.startWidth + dx, 320, 1600);
      dashboard.height = clamp(ui.dashboardResize.startHeight + dy, 220, 1200);
      render();
    }
    return;
  }
  if (ui.widgetDrag && evt.pointerId === ui.widgetDrag.pointerId) {
    const widget = graph.widgets.find((w) => w.id === ui.widgetDrag.widgetId);
    if (widget) {
      const z = Math.max(0.0001, ui.zoom || 1);
      const dx = (evt.clientX - ui.widgetDrag.startClientX) / z;
      const dy = (evt.clientY - ui.widgetDrag.startClientY) / z;
      const dragSnap = ui.snapToGrid && !ui.widgetDrag.snapOnRelease;
      widget.x = dragSnap ? snap(ui.widgetDrag.startX + dx) : ui.widgetDrag.startX + dx;
      widget.y = dragSnap ? snap(ui.widgetDrag.startY + dy) : ui.widgetDrag.startY + dy;
      updateDashboardDropState(widget);
      if (!refreshWidgetFrame(widget)) {
        renderWidgets();
      }
    }
    return;
  }
  if (ui.widgetResize && evt.pointerId === ui.widgetResize.pointerId) {
    const widget = graph.widgets.find((w) => w.id === ui.widgetResize.widgetId);
    if (widget) {
      const z = Math.max(0.0001, ui.zoom || 1);
      const dx = (evt.clientX - ui.widgetResize.startClientX) / z;
      const dy = (evt.clientY - ui.widgetResize.startClientY) / z;
      const nextWidth = ui.snapToGrid ? snap(ui.widgetResize.startWidth + dx) : ui.widgetResize.startWidth + dx;
      const nextHeight = ui.snapToGrid ? snap(ui.widgetResize.startHeight + dy) : ui.widgetResize.startHeight + dy;
      const minSize = widgetMinDimensions(widget);
      widget.width = clamp(nextWidth, minSize.width, 1200);
      widget.height = clamp(nextHeight, minSize.height, 900);
      if (!refreshWidgetFrame(widget)) {
        renderWidgets();
      }
    }
    return;
  }
  if (ui.textDrag && evt.pointerId === ui.textDrag.pointerId) {
    const item = getTextItemById(ui.textDrag.id);
    if (item) {
      const delta = worldDeltaFromClientDelta(
        evt.clientX - ui.textDrag.startClientX,
        evt.clientY - ui.textDrag.startClientY,
      );
      item.x = ui.snapToGrid ? snap(ui.textDrag.startX + delta.x) : ui.textDrag.startX + delta.x;
      item.y = ui.snapToGrid ? snap(ui.textDrag.startY + delta.y) : ui.textDrag.startY + delta.y;
      updateDashboardDropState(item);
      render();
    }
    return;
  }
  if (ui.textResize && evt.pointerId === ui.textResize.pointerId) {
    const item = getTextItemById(ui.textResize.id);
    if (item) {
      const delta = worldDeltaFromClientDelta(
        evt.clientX - ui.textResize.startClientX,
        evt.clientY - ui.textResize.startClientY,
      );
      item.width = clamp(ui.snapToGrid ? snap(ui.textResize.startWidth + delta.x) : ui.textResize.startWidth + delta.x, 40, 1200);
      item.height = clamp(ui.snapToGrid ? snap(ui.textResize.startHeight + delta.y) : ui.textResize.startHeight + delta.y, 24, 1200);
      render();
    }
    return;
  }

  const pRaw = svgPoint(evt);
  const p = snapPoint(pRaw);
  const hoverNodeId = nodeIdAtGraphPoint(pRaw);
  const hoverNode = hoverNodeId != null ? getNodeById(hoverNodeId) : null;
  const hoverNearCenter = hoverNode ? Math.hypot(pRaw.x - hoverNode.x, pRaw.y - hoverNode.y) <= 20 : false;

  if (!ui.drag && !ui.resize && !ui.edgeCreate && !ui.controlPointDrag && !ui.marquee && !ui.textDrag && !ui.textResize) {
    if (hoverNearCenter) {
      svg.style.cursor = "crosshair";
    } else if (hoverNode) {
      svg.style.cursor = "grab";
    } else {
      svg.style.cursor = "";
    }
  }

  if (ui.drag && evt.pointerId === ui.drag.pointerId) {
    const delta = worldDeltaFromClientDelta(
      evt.clientX - ui.drag.startClientX,
      evt.clientY - ui.drag.startClientY,
    );
    const rawDx = delta.x;
    const rawDy = delta.y;
    let dx = rawDx;
    let dy = rawDy;
    if (ui.snapToGrid) {
      const anchorStart = ui.drag.startMap.get(ui.drag.anchorNodeId);
      if (anchorStart) {
        dx = snap(anchorStart.x + rawDx) - anchorStart.x;
        dy = snap(anchorStart.y + rawDy) - anchorStart.y;
      }
    }
    ui.drag.nodeIds.forEach((id) => {
      const node = getNodeById(id);
      const start = ui.drag.startMap.get(id);
      if (node && start) {
        node.x = ui.snapToGrid ? start.x + dx : start.x + dx;
        node.y = ui.snapToGrid ? start.y + dy : start.y + dy;
      }
    });
    ui.drag.edgeControlStartMap.forEach((cpStart, edgeId) => {
      const edge = getEdgeById(edgeId);
      if (!edge) {
        return;
      }
      edge.controlPoints = cpStart.map((cp) => ({
        x: ui.snapToGrid ? cp.x + dx : cp.x + dx,
        y: ui.snapToGrid ? cp.y + dy : cp.y + dy,
      }));
    });
    // Keep the dynamic right/bottom boundaries ahead of the dragged node.
    // Without this forced update, the current SVG viewBox clips a node as soon
    // as it crosses the former model boundary, until the pointer is released.
    updateCanvasSize(evt.clientX, evt.clientY, true);
    render();
  }

  if (ui.resize && evt.pointerId === ui.resize.pointerId) {
    const node = getNodeById(ui.resize.nodeId);
    if (node) {
      const dx = pRaw.x - ui.resize.startPointer.x;
      const dy = pRaw.y - ui.resize.startPointer.y;
      node.width = clamp(snap(ui.resize.startWidth + dx), 40, 500);
      node.height = clamp(snap(ui.resize.startHeight + dy), 30, 500);
      render();
    }
  }

  if (ui.edgeCreate && evt.pointerId === ui.edgeCreate.pointerId) {
    updateEdgeCreateFromClient(evt.clientX, evt.clientY);
    render();
  }

  if (ui.controlPointDrag && evt.pointerId === ui.controlPointDrag.pointerId) {
    const edge = getEdgeById(ui.controlPointDrag.edgeId);
    if (edge && edge.controlPoints[ui.controlPointDrag.index]) {
      ui.lastControlPointTap = null;
      edge.controlPoints[ui.controlPointDrag.index] = p;
      render();
    }
  }

  if (ui.edgeLabelDrag && evt.pointerId === ui.edgeLabelDrag.pointerId) {
    const edge = getEdgeById(ui.edgeLabelDrag.edgeId);
    if (edge?.label) {
      edge.label.x = ui.snapToGrid ? snap(pRaw.x - ui.edgeLabelDrag.offsetX) : pRaw.x - ui.edgeLabelDrag.offsetX;
      edge.label.y = ui.snapToGrid ? snap(pRaw.y - ui.edgeLabelDrag.offsetY) : pRaw.y - ui.edgeLabelDrag.offsetY;
      render();
    }
  }

  if (ui.edgeLabelRotate && evt.pointerId === ui.edgeLabelRotate.pointerId) {
    const edge = getEdgeById(ui.edgeLabelRotate.edgeId);
    if (edge?.label) {
      const angle = Math.atan2(pRaw.y - edge.label.y, pRaw.x - edge.label.x) * (180 / Math.PI);
      edge.label.rotation = angle + 90;
      render();
    }
  }

  if (ui.marquee && evt.pointerId === ui.marquee.pointerId) {
    ui.marquee.current = pRaw;
    const rect = marqueeRect(ui.marquee);
    const ids = nodesInRect(rect);
    if (ui.marquee.additive) {
      setNodeSelection([...ui.marquee.baseSelection, ...ids], false);
    } else {
      setNodeSelection(ids, false);
    }
    render();
  }
});

window.addEventListener("mousemove", (evt) => {
  const pRaw = svgPointFromClient(evt.clientX, evt.clientY);
  const hoverNodeId = nodeIdAtGraphPoint(pRaw);
  const hoverNode = hoverNodeId != null ? getNodeById(hoverNodeId) : null;
  const hoverNearCenter = hoverNode ? Math.hypot(pRaw.x - hoverNode.x, pRaw.y - hoverNode.y) <= 20 : false;

  if (!ui.drag && !ui.resize && !ui.edgeCreate && !ui.controlPointDrag && !ui.marquee) {
    if (hoverNearCenter) {
      svg.style.cursor = "crosshair";
    } else if (hoverNode) {
      svg.style.cursor = "grab";
    } else {
      svg.style.cursor = "";
    }
  }

  if (!ui.edgeCreate) {
    return;
  }
  updateEdgeCreateFromClient(evt.clientX, evt.clientY);
  render();
});

window.addEventListener("pointerup", (evt) => {
  const touchHoldTriggered = ui.touchHold?.pointerId === evt.pointerId && ui.touchHold.triggered;
  if (ui.touchHold?.pointerId === evt.pointerId) {
    clearTouchHold();
  }
  if (touchHoldTriggered) {
    return;
  }
  handleCompactTouchViewportPointerEnd(evt);
  if (ui.tabletSidebarDrag && evt.pointerId === ui.tabletSidebarDrag.pointerId) {
    const deltaY = evt.clientY - ui.tabletSidebarDrag.startClientY;
    const wasExpanded = ui.tabletSidebarDrag.startExpanded;
    ui.tabletSidebarDrag = null;
    if (deltaY < -26) {
      setTabletSidebarExpanded(true);
    } else if (deltaY > 36) {
      if (wasExpanded) {
        setTabletSidebarExpanded(false);
      } else {
        setTabletSidebarOpen(false);
      }
    }
    return;
  }
  let needsRender = false;

  if (ui.modalDrag && evt.pointerId === ui.modalDrag.pointerId) {
    ui.modalDrag = null;
  }
  if (ui.modalResize && evt.pointerId === ui.modalResize.pointerId) {
    ui.modalResize = null;
  }

  if (ui.dashboardDrag && evt.pointerId === ui.dashboardDrag.pointerId) {
    const dashboard = graph.dashboard;
    const moved = dashboard && (dashboard.x !== ui.dashboardDrag.startX || dashboard.y !== ui.dashboardDrag.startY);
    ui.dashboardDrag = null;
    commitTransaction();
    needsRender = Boolean(moved);
  }

  if (ui.dashboardResize && evt.pointerId === ui.dashboardResize.pointerId) {
    const dashboard = graph.dashboard;
    const resized = dashboard && (
      dashboard.width !== ui.dashboardResize.startWidth || dashboard.height !== ui.dashboardResize.startHeight
    );
    ui.dashboardResize = null;
    commitTransaction();
    needsRender = needsRender || Boolean(resized);
  }

  if (ui.widgetDrag && evt.pointerId === ui.widgetDrag.pointerId) {
    const widget = graph.widgets.find((w) => w.id === ui.widgetDrag.widgetId);
    if (widget && ui.widgetDrag.snapOnRelease && ui.snapToGrid) {
      widget.x = snap(widget.x);
      widget.y = snap(widget.y);
    }
    const droppedInDashboard = widget && dropItemIntoActiveDashboardPage(widget);
    ui.dashboardDropState = null;
    const moved = widget && (widget.x !== ui.widgetDrag.startX || widget.y !== ui.widgetDrag.startY);
    ui.widgetDrag = null;
    commitTransaction();
    if (moved || droppedInDashboard) {
      setStatusKey("status.widgetMoved");
    }
    needsRender = true;
  }

  if (ui.widgetResize && evt.pointerId === ui.widgetResize.pointerId) {
    const widget = graph.widgets.find((w) => w.id === ui.widgetResize.widgetId);
    const resized =
      widget &&
      (widget.width !== ui.widgetResize.startWidth || widget.height !== ui.widgetResize.startHeight);
    ui.widgetResize = null;
    commitTransaction();
    if (resized) {
      setStatusKey("status.widgetResized");
    }
    needsRender = true;
  }

  if (ui.textDrag && evt.pointerId === ui.textDrag.pointerId) {
    const item = getTextItemById(ui.textDrag.id);
    const droppedInDashboard = item && dropItemIntoActiveDashboardPage(item);
    ui.dashboardDropState = null;
    const moved =
      item &&
      (item.x !== ui.textDrag.startX || item.y !== ui.textDrag.startY);
    const releasedTextId = ui.textDrag.id;
    ui.textDrag = null;
    commitTransaction();
    if (moved || droppedInDashboard) {
      setStatusKey("status.textMoved");
      ui.lastTextActivate = null;
    } else if (releasedTextId != null) {
      const now = Date.now();
      if (ui.lastTextActivate && ui.lastTextActivate.id === releasedTextId && now - ui.lastTextActivate.time <= 360) {
        ui.lastTextActivate = null;
        if (!(ui.selected?.type === "text" && ui.selected.id === releasedTextId)) {
          selectTextItem(releasedTextId);
        }
        openTextEditor();
      } else {
        ui.lastTextActivate = { id: releasedTextId, time: now };
      }
    }
    needsRender = true;
  }

  if (ui.textResize && evt.pointerId === ui.textResize.pointerId) {
    const item = getTextItemById(ui.textResize.id);
    const resized =
      item &&
      (item.width !== ui.textResize.startWidth || item.height !== ui.textResize.startHeight);
    ui.textResize = null;
    commitTransaction();
    if (resized) {
      setStatusKey("status.textResized");
    }
    needsRender = true;
  }

  if (ui.edgeCreate && evt.pointerId === ui.edgeCreate.pointerId) {
    finishEdgeCreateFromClient(evt.clientX, evt.clientY);
    needsRender = true;
  }

  if (ui.marquee && evt.pointerId === ui.marquee.pointerId) {
    const rect = marqueeRect(ui.marquee);
    if (rect.width < 4 && rect.height < 4 && !ui.marquee.additive) {
      clearAllSelection();
    }
    ui.marquee = null;
    needsRender = true;
  }

  if (ui.drag && evt.pointerId === ui.drag.pointerId) {
    const movedCount = ui.drag.nodeIds.filter((id) => {
      const node = getNodeById(id);
      const start = ui.drag.startMap.get(id);
      return node && start && (node.x !== start.x || node.y !== start.y);
    }).length;
    ui.drag = null;
    commitTransaction();
    if (movedCount > 0) {
      setStatusKey("status.nodesMoved", { count: movedCount });
    }
    needsRender = true;
  }

  if (ui.resize && evt.pointerId === ui.resize.pointerId) {
    const node = getNodeById(ui.resize.nodeId);
    const resized =
      node &&
      (node.width !== ui.resize.startWidth || node.height !== ui.resize.startHeight);
    ui.resize = null;
    commitTransaction();
    if (resized) {
      setStatusKey("status.nodeResized");
    }
    needsRender = true;
  }

  if (ui.controlPointDrag && evt.pointerId === ui.controlPointDrag.pointerId) {
    ui.controlPointDrag = null;
    commitTransaction();
    needsRender = true;
  }

  if (ui.edgeLabelDrag && evt.pointerId === ui.edgeLabelDrag.pointerId) {
    ui.edgeLabelDrag = null;
    commitTransaction();
    needsRender = true;
  }

  if (ui.edgeLabelRotate && evt.pointerId === ui.edgeLabelRotate.pointerId) {
    ui.edgeLabelRotate = null;
    commitTransaction();
    needsRender = true;
  }

  if (ui.sliderInteraction?.mode === "range") {
    ui.sliderInteraction = null;
    needsRender = true;
  }

  if (needsRender) {
    render();
  }
  if (!ui.drag && !ui.resize && !ui.edgeCreate && !ui.controlPointDrag && !ui.edgeLabelDrag && !ui.edgeLabelRotate && !ui.marquee && !ui.widgetDrag && !ui.widgetResize && !ui.textDrag && !ui.textResize) {
    svg.style.cursor = "";
  }
});

window.addEventListener("pointercancel", (evt) => {
  if (ui.touchHold?.pointerId === evt.pointerId) {
    clearTouchHold();
  }
  handleCompactTouchViewportPointerEnd(evt);
  if ((ui.widgetDrag && evt.pointerId === ui.widgetDrag.pointerId) || (ui.textDrag && evt.pointerId === ui.textDrag.pointerId)) {
    ui.dashboardDropState = null;
    render();
  }
  if (ui.tabletSidebarDrag && evt.pointerId === ui.tabletSidebarDrag.pointerId) {
    ui.tabletSidebarDrag = null;
  }
});

window.addEventListener("mouseup", (evt) => {
  if (!ui.edgeCreate) {
    return;
  }
  finishEdgeCreateFromClient(evt.clientX, evt.clientY);
});

svg.addEventListener("pointerleave", () => {
  ui.edgeCreateHoverId = null;
  ui.edgeCreateLastPoint = null;
  if (!ui.drag && !ui.resize && !ui.controlPointDrag && !ui.edgeLabelDrag && !ui.edgeLabelRotate && !ui.edgeCreate && !ui.marquee && !ui.widgetDrag && !ui.widgetResize && !ui.textDrag && !ui.textResize) {
    svg.style.cursor = "";
  }
});

svg.addEventListener("pointerdown", (evt) => {
  hideContextMenu();
  if (isTabletCanvasPanMode()) {
    return;
  }
  if (isCompactTouchPointerEvent(evt)) {
    if (evt.target === svg) {
      closeTopMenus();
      clearAllSelection();
      render();
    }
    return;
  }
  ui.lastNodeActivate = null;
  if (evt.target !== svg) {
    return;
  }
  if (evt.button !== 0) {
    return;
  }

  // Avoid the native SVG selection drag, notably visible in WebKit on macOS.
  evt.preventDefault();

  const additive = evt.ctrlKey || evt.metaKey;
  const p = svgPoint(evt);
  ui.marquee = {
    pointerId: evt.pointerId,
    start: p,
    current: p,
    additive,
    baseSelection: [...ui.selectedNodes],
  };

  if (!additive) {
    clearAllSelection();
  }
  render();
});

svg.addEventListener("selectstart", (evt) => {
  evt.preventDefault();
});

svg.addEventListener("dragstart", (evt) => {
  evt.preventDefault();
});

[graphViewport, canvasContent].forEach((el) => {
  el?.addEventListener("pointerdown", (evt) => {
    if (!evt.target.closest?.(".node")) {
      ui.lastNodeActivate = null;
    }
    if (evt.target.closest?.(".node, .canvas-text-item, .edge, .st-widget, .menu-bar, .sidebar, .context-menu, svg")) {
      return;
    }
    hideContextMenu();
    closeTopMenus();
    clearAllSelection();
    render();
  });
});

graphViewport.addEventListener("pointerdown", (evt) => {
  if (isCompactTouchPointerEvent(evt) && isBackgroundTouchCanvasTarget(evt.target)) {
    hideContextMenu();
    closeTopMenus();
    clearAllSelection();
    render();
  }
  handleCompactTouchViewportPointerDown(evt);
}, { passive: false });

svg.addEventListener("contextmenu", (evt) => {
  const onNode = evt.target.closest?.(".node");
  const onText = evt.target.closest?.(".canvas-text-item");
  if (onNode || onText) {
    return;
  }
  evt.preventDefault();
  openBackgroundContextMenu(evt);
});

[graphViewport, canvasContent].forEach((el) => {
  el?.addEventListener("contextmenu", (evt) => {
    if (evt.target.closest?.(".node, .canvas-text-item, .edge, .st-widget, .context-menu")) {
      return;
    }
    evt.preventDefault();
    openBackgroundContextMenu(evt);
  });
});

menuTitles.forEach((title) => {
  const openCompactMenu = (evt) => {
    if (!isCompactTabletLayout()) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    hideContextMenu();
    const root = title.closest(".menu-root");
    if (root) {
      toggleTopMenu(root);
    }
  };
  title.addEventListener("touchstart", (evt) => {
    ui.lastMenuTouchAt = Date.now();
    openCompactMenu(evt);
  }, { passive: false });
  title.addEventListener("pointerdown", (evt) => {
    if (!isCompactTabletLayout()) {
      return;
    }
    if (evt.pointerType === "touch" && (Date.now() - ui.lastMenuTouchAt) < 700) {
      return;
    }
    openCompactMenu(evt);
  });
  title.addEventListener("click", (evt) => {
    if (isCompactTabletLayout()) {
      if ((Date.now() - ui.lastMenuTouchAt) < 700) {
        return;
      }
      openCompactMenu(evt);
      return;
    }
    evt.stopPropagation();
    hideContextMenu();
    const root = title.closest(".menu-root");
    if (root) {
      toggleTopMenu(root);
    }
  });
});

menuRoots.forEach((root) => {
  root.addEventListener("pointerenter", () => {
    const hasOpen = menuRoots.some((r) => r.classList.contains("open"));
    if (hasOpen && !root.classList.contains("open")) {
      toggleTopMenu(root);
    }
  });
});

menuCommands.forEach((cmd) => {
  cmd.addEventListener("click", () => {
    closeTopMenus();
  });
});

if (recentModelsMenuBtn) {
  const toggleRecentModelsSubmenu = (evt) => {
    if (!isCompactTabletLayout()) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    const submenu = recentModelsMenuBtn.closest(".menu-submenu");
    if (!submenu) {
      return;
    }
    const willOpen = !submenu.classList.contains("open");
    document.querySelectorAll(".menu-submenu.open").forEach((item) => {
      if (item !== submenu) {
        item.classList.remove("open");
      }
    });
    submenu.classList.toggle("open", willOpen);
  };
  recentModelsMenuBtn.addEventListener("touchstart", (evt) => {
    ui.lastMenuTouchAt = Date.now();
    toggleRecentModelsSubmenu(evt);
  }, { passive: false });
  recentModelsMenuBtn.addEventListener("pointerdown", (evt) => {
    if (!isCompactTouchPointerEvent(evt)) {
      return;
    }
    if ((Date.now() - ui.lastMenuTouchAt) < 700) {
      return;
    }
    toggleRecentModelsSubmenu(evt);
  });
  recentModelsMenuBtn.addEventListener("click", (evt) => {
    if (!isCompactTabletLayout()) {
      return;
    }
    if ((Date.now() - ui.lastMenuTouchAt) < 700) {
      return;
    }
    toggleRecentModelsSubmenu(evt);
  });
}

addRectNodeItem.addEventListener("click", () => {
  runAction(() => {
    addNode("rect");
  });
  setStatusKey("status.nodeCreated");
});

addEllipseNodeItem.addEventListener("click", () => {
  runAction(() => {
    addNode("ellipse");
  });
  setStatusKey("status.nodeCreated");
});

addDiamondNodeItem.addEventListener("click", () => {
  runAction(() => {
    addNode("diamond");
  });
  setStatusKey("status.nodeCreated");
});

if (addSubmodelNodeItem) {
  addSubmodelNodeItem.addEventListener("click", () => {
    runAction(() => {
      addNode("submodel");
    });
    setStatusKey("status.nodeCreated");
  });
}

if (qualitativeGraphBuilderItem) {
  qualitativeGraphBuilderItem.addEventListener("click", () => {
    closeTopMenus();
    openQualitativeGraphWizard();
  });
}

if (addTextItem) {
  addTextItem.addEventListener("click", () => {
    runAction(() => {
      addCanvasText();
    });
    setStatusKey("status.textCreated");
  });
}

if (addButtonWidgetItem) {
  addButtonWidgetItem.addEventListener("click", () => {
    runWidgetAction(() => {
      addButtonWidget();
    });
    setStatusKey("status.widgetButtonCreated");
  });
}

if (addSelectWidgetItem) {
  addSelectWidgetItem.addEventListener("click", () => {
    runWidgetAction(() => {
      addSelectWidget();
    });
    setStatusKey("status.widgetSelectCreated");
  });
}

if (addLedWidgetItem) {
  addLedWidgetItem.addEventListener("click", () => {
    runWidgetAction(() => {
      addLedWidget();
    });
    setStatusKey("status.widgetLedCreated");
  });
}

if (addTextWidgetItem) {
  addTextWidgetItem.addEventListener("click", () => {
    runWidgetAction(() => {
      addTextWidget();
    });
    setStatusKey("status.widgetTextCreated");
  });
}

addSliderWidgetItem.addEventListener("click", () => {
  runWidgetAction(() => {
    addSliderWidget();
  });
  setStatusKey("status.widgetSliderCreated");
});

addMatrixWidgetItem.addEventListener("click", () => {
  runWidgetAction(() => {
    addMatrixWidget();
  });
  setStatusKey("status.widgetMatrixCreated");
});

addTableWidgetItem.addEventListener("click", () => {
  runWidgetAction(() => {
    addTableWidget();
  });
  setStatusKey("status.widgetCreated");
});
addXYChartWidgetItem.addEventListener("click", () => {
  runWidgetAction(() => {
    addXYChartWidget();
  });
  setStatusKey("status.widgetChartCreated");
});
addBarPlotWidgetItem.addEventListener("click", () => {
  runWidgetAction(() => {
    addBarPlotWidget();
  });
  setStatusKey("status.widgetBarPlotCreated");
});

fitContentItem.addEventListener("click", () => {
  fitToContent();
});

zoomInItem.addEventListener("click", () => {
  applyZoom(ui.zoom * 1.2);
});

zoomOutItem.addEventListener("click", () => {
  applyZoom(ui.zoom / 1.2);
});

zoomResetItem.addEventListener("click", () => {
  applyZoom(1);
});

if (zoomRangeInput) {
  zoomRangeInput.addEventListener("input", () => {
    applyZoom(Number(zoomRangeInput.value) / 100);
  });
}
if (managePresentationGroupsItem) {
  managePresentationGroupsItem.addEventListener("click", openPresentationGroupsEditor);
}
if (viewOptionsItem) {
  viewOptionsItem.addEventListener("click", openViewOptions);
}
toggleGraphItem.addEventListener("click", () => {
  toggleGraphVisibility();
});
toggleWidgetsItem.addEventListener("click", () => {
  toggleWidgetsVisibility();
});
if (toggleGraphBtn) {
  toggleGraphBtn.addEventListener("click", toggleGraphVisibility);
}
if (toggleWidgetsBtn) {
  toggleWidgetsBtn.addEventListener("click", toggleWidgetsVisibility);
}
if (runFullModelBtn) {
  runFullModelBtn.addEventListener("click", () => {
    void executeNodeExpressions();
  });
}
if (topRunEvalBtn) {
  topRunEvalBtn.addEventListener("click", () => {
    void executeNodeExpressions();
  });
}
if (topRunStepBtn) {
  topRunStepBtn.addEventListener("click", () => {
    void runManualStep();
  });
}
function bindTimedExecutionToggle(button) {
  if (!button) {
    return;
  }
  let lastPointerActivationAt = -Infinity;
  const activate = () => {
    void toggleTimedExecution();
  };

  // WebKit can lose a click while a timed execution refreshes the toolbar.
  // Pointer activation keeps the stop command responsive in the Tauri shell.
  button.addEventListener("pointerup", (evt) => {
    if (!evt.pointerType) {
      return;
    }
    lastPointerActivationAt = performance.now();
    evt.preventDefault();
    activate();
  });
  button.addEventListener("click", (evt) => {
    if (performance.now() - lastPointerActivationAt < 600) {
      evt.preventDefault();
      return;
    }
    activate();
  });
}

bindTimedExecutionToggle(topRunTimedBtn);
if (topRunResetBtn) {
  topRunResetBtn.addEventListener("click", resetExecution);
}
if (tabletFitBtn) {
  tabletFitBtn.addEventListener("click", fitToContent);
}
if (tabletModeBtn) {
  tabletModeBtn.addEventListener("click", () => {
    setTabletCanvasMode(ui.tabletCanvasMode === "pan" ? "edit" : "pan");
  });
}
if (tabletRunBtn) {
  tabletRunBtn.addEventListener("click", () => {
    void executeNodeExpressions();
  });
}
if (tabletStepBtn) {
  tabletStepBtn.addEventListener("click", () => {
    void runManualStep();
  });
}
bindTimedExecutionToggle(tabletTimedBtn);
if (tabletResetBtn) {
  tabletResetBtn.addEventListener("click", resetExecution);
}
runEvalBtn.addEventListener("click", () => {
  void executeNodeExpressions();
});
runStepBtn.addEventListener("click", () => {
  void runManualStep();
});
bindTimedExecutionToggle(runTimedToggleBtn);
runResetBtn.addEventListener("click", resetExecution);

undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);
if (selectAllBtn) {
  selectAllBtn.addEventListener("click", selectAllNodes);
}
deleteBtn.addEventListener("click", removeSelected);
cutBtn.addEventListener("click", cutSelectionToClipboard);
copyBtn.addEventListener("click", copySelectionToClipboard);
pasteBtn.addEventListener("click", pasteFromClipboard);
newGraphBtn.addEventListener("click", () => {
  void createNewGraph();
});
saveJsonBtn.addEventListener("click", () => saveGraphJson(false));
saveAsJsonBtn.addEventListener("click", () => saveGraphJson(true));
if (closeModelBtn) {
  closeModelBtn.addEventListener("click", () => {
    closeTopMenus();
    void closeActiveWorkspaceTab();
  });
}
if (exportCsvBtn) {
  exportCsvBtn.addEventListener("click", () => {
    closeTopMenus();
    void exportSimulationCsv();
  });
}
if (manageDataLinksBtn) {
  manageDataLinksBtn.addEventListener("click", () => {
    closeTopMenus();
    void openDataLinksDialog();
  });
}
loadJsonBtn.addEventListener("click", openGraphJson);
if (newTabBtn) {
  newTabBtn.addEventListener("click", () => {
    void createNewGraph();
  });
}
if (workspaceTabBar) {
  workspaceTabBar.addEventListener("click", (evt) => {
    const closeBtn = evt.target.closest("[data-tab-close-id]");
    if (closeBtn) {
      evt.preventDefault();
      evt.stopPropagation();
      void closeWorkspaceTab(Number(closeBtn.dataset.tabCloseId));
      return;
    }
    const tabBtn = evt.target.closest("[data-tab-id]");
    if (tabBtn) {
      evt.preventDefault();
      switchWorkspaceTab(Number(tabBtn.dataset.tabId));
    }
  });
}


snapToGridInput.addEventListener("change", () => {
  ui.snapToGrid = snapToGridInput.checked;
  setStatusKey(ui.snapToGrid ? "status.snapOn" : "status.snapOff");
});

if (showGridInput) {
  showGridInput.addEventListener("change", () => {
    ui.showGrid = showGridInput.checked;
    updateCanvasGridAppearance();
    scheduleFileStatusRefresh();
    setStatusKey(ui.showGrid ? "status.gridOn" : "status.gridOff");
  });
}

if (highlightNodeEdgesInput) {
  highlightNodeEdgesInput.addEventListener("change", () => {
    ui.highlightNodeEdges = highlightNodeEdgesInput.checked;
    render();
    scheduleFileStatusRefresh();
    setStatusKey(ui.highlightNodeEdges ? "status.highlightNodeEdgesOn" : "status.highlightNodeEdgesOff");
  });
}

if (showNodeValuesInput) {
  showNodeValuesInput.addEventListener("change", () => {
    ui.showNodeValues = showNodeValuesInput.checked;
    render();
    scheduleFileStatusRefresh();
    setStatusKey(ui.showNodeValues ? "status.nodeValuesOn" : "status.nodeValuesOff");
  });
}

if (showEdgeValuesInput) {
  showEdgeValuesInput.addEventListener("change", () => {
    ui.showEdgeValues = showEdgeValuesInput.checked;
    render();
    scheduleFileStatusRefresh();
    setStatusKey(ui.showEdgeValues ? "status.edgeValuesOn" : "status.edgeValuesOff");
  });
}

gridSizeInput.addEventListener("change", () => {
  ui.gridSize = clamp(Number(gridSizeInput.value) || 20, 5, 100);
  gridSizeInput.value = String(ui.gridSize);
  updateCanvasGridAppearance();
  scheduleFileStatusRefresh();
  setStatusKey("status.gridStep", { value: ui.gridSize });
});

if (tooltipDelayInput) {
  tooltipDelayInput.addEventListener("change", () => {
    ui.tooltipDelayMs = normalizeTooltipDelayMs(tooltipDelayInput.value);
    tooltipDelayInput.value = String(ui.tooltipDelayMs);
    scheduleFileStatusRefresh();
    hideAppTooltip();
  });
}

if (interfaceLanguageInput) {
  interfaceLanguageInput.addEventListener("change", () => {
    applyInterfaceLanguage(interfaceLanguageInput.value, true);
  });
}

if (interfaceThemeInput) {
  interfaceThemeInput.addEventListener("change", () => {
    ui.visualTheme = normalizeVisualTheme(interfaceThemeInput.value);
    applyVisualTheme();
    persistVisualThemePreferences();
    render();
  });
}

if (minimalistNightModeInput) {
  minimalistNightModeInput.addEventListener("change", () => {
    if (normalizeVisualTheme(ui.visualTheme) !== "minimalist") {
      return;
    }
    ui.minimalistNightMode = minimalistNightModeInput.checked;
    applyVisualTheme();
    persistVisualThemePreferences();
    render();
  });
}

if (strictDefinitionsInput) {
  strictDefinitionsInput.addEventListener("change", () => {
    graph.execution.strictDefinitions = strictDefinitionsInput.checked;
    scheduleFileStatusRefresh();
    setStatusKey(graph.execution.strictDefinitions ? "status.strictDefinitionsOn" : "status.strictDefinitionsOff");
    render();
  });
}

if (graphViewport) {
  graphViewport.addEventListener("scroll", () => {
    scheduleFileStatusRefresh();
  }, { passive: true });
}

function commitExecutionInput(inputEl, key) {
  const parsed = Number(inputEl.value);
  if (!Number.isFinite(parsed)) {
    inputEl.value = String(graph.execution[key]);
    setStatusKey("error.timeInvalid");
    return;
  }
  const nextExecution = { ...graph.execution, [key]: parsed };
  if (nextExecution.dt < 0) {
    inputEl.value = String(graph.execution[key]);
    setStatusKey("error.timeStepNegative");
    return;
  }
  if (nextExecution.t1 <= nextExecution.t0) {
    inputEl.value = String(graph.execution[key]);
    setStatusKey("error.timeEndAfterStart");
    return;
  }
  graph.execution[key] = parsed;
  syncTimeInputConstraints();
  scheduleFileStatusRefresh();
  setStatusKey("status.timeConfigUpdated");
}

function syncTimeInputConstraints() {
  const dt = Number(graph.execution.dt);
  // A zero time step cannot provide a meaningful increment; retain free-form
  // numeric editing until a positive step is selected.
  const timeStep = Number.isFinite(dt) && dt > 0 ? String(dt) : "any";
  if (timeStartInput) {
    timeStartInput.step = timeStep;
  }
  if (timeEndInput) {
    timeEndInput.step = timeStep;
    timeEndInput.min = String(graph.execution.t0);
  }
}

timeStartInput.addEventListener("change", () => commitExecutionInput(timeStartInput, "t0"));
timeStepInput.addEventListener("change", () => commitExecutionInput(timeStepInput, "dt"));
timeEndInput.addEventListener("change", () => commitExecutionInput(timeEndInput, "t1"));
timeDelayInput.addEventListener("change", () => {
  const parsed = Number(timeDelayInput.value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    timeDelayInput.value = String(graph.execution.delayMs);
    setStatusKey("error.timeDelayInvalid");
    return;
  }
  graph.execution.delayMs = Math.round(parsed);
  scheduleFileStatusRefresh();
  setStatusKey("status.timeDelayUpdated", { delay: graph.execution.delayMs });
});

if (renderEveryStepsInput) {
  renderEveryStepsInput.addEventListener("change", () => {
    const parsed = Number(renderEveryStepsInput.value);
    if (!Number.isFinite(parsed) || parsed < 1) {
      renderEveryStepsInput.value = String(graph.execution.renderEverySteps);
      setStatusKey("error.renderEveryStepsInvalid");
      return;
    }
    graph.execution.renderEverySteps = Math.round(parsed);
    renderEveryStepsInput.value = String(graph.execution.renderEverySteps);
    scheduleFileStatusRefresh();
    setStatusKey("status.renderEveryStepsUpdated", { steps: graph.execution.renderEverySteps });
  });
}

if (decimalDigitsInput) {
  decimalDigitsInput.addEventListener("change", () => {
    const parsed = Number(decimalDigitsInput.value);
    if (!Number.isFinite(parsed)) {
      decimalDigitsInput.value = String(clampDisplayDecimals(graph.execution.decimals));
      setStatusKey("error.timeInvalid");
      return;
    }
    graph.execution.decimals = clampDisplayDecimals(parsed);
    decimalDigitsInput.value = String(graph.execution.decimals);
    scheduleFileStatusRefresh();
    setStatusKey("status.timeConfigUpdated");
    render();
  });
}

if (integratorInput) {
  integratorInput.addEventListener("change", () => {
    graph.execution.integrator = String(integratorInput.value || "euler").toLowerCase() === "rk4" ? "rk4" : "euler";
    setStatusKey("status.integratorUpdated", { name: t(`integrator.${graph.execution.integrator}`) });
    scheduleFileStatusRefresh();
    render();
  });
}

[timeStartInput, timeStepInput, timeEndInput, timeDelayInput, decimalDigitsInput, integratorInput].filter(Boolean).forEach((inputEl) => {
  inputEl.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
      inputEl.blur();
    }
  });
});

loadJsonInput.addEventListener("change", () => {
  const file = loadJsonInput.files?.[0];
  if (file) {
    void loadGraphJsonFile(file);
  }
  loadJsonInput.value = "";
});

if (clearRecentModelsBtn) {
  clearRecentModelsBtn.addEventListener("click", () => {
    clearRecentModels();
    closeTopMenus();
    setStatusKey("status.recentCleared");
  });
}

graphViewport.addEventListener(
  "wheel",
  (evt) => {
    if (!(evt.ctrlKey || evt.metaKey)) {
      return;
    }
    evt.preventDefault();
    const factor = evt.deltaY < 0 ? 1.12 : 1 / 1.12;
    applyZoom(ui.zoom * factor, evt.clientX, evt.clientY);
  },
  { passive: false },
);

nodeNameInput.addEventListener("input", () => {
  if (ui.selectedNodes.size !== 1) {
    return;
  }
  const nodeId = [...ui.selectedNodes][0];
  const node = getNodeById(nodeId);
  if (!node) {
    return;
  }
  const attempt = semantics.validateNodeName(graph.nodes, nodeNameInput.value, node.id);
  if (attempt.ok) {
    nodeNameInput.classList.remove("invalid");
    const oldName = node.name;
    node.name = attempt.name;
    propagateNodeRenameInExpressions(oldName, node.name);
    render();
    return;
  }

  nodeNameInput.classList.add("invalid");
  if (attempt.reason === "duplicate") {
    setStatusKey("error.duplicateNodeName");
  } else if (attempt.reason === "function") {
    setStatusKey("error.functionNodeName");
  } else if (attempt.reason === "reserved") {
    setStatusKey("error.reservedNodeName");
  } else {
    setStatusKey("error.invalidNodeName");
  }
});

nodeNameInput.addEventListener("focus", () => {
  if (ui.selectedNodes.size !== 1) {
    ui.nodeNameEditStart = null;
    return;
  }
  const nodeId = [...ui.selectedNodes][0];
  const node = getNodeById(nodeId);
  ui.nodeNameEditStart = node ? node.name : null;
});

nodeNameInput.addEventListener("blur", () => {
  if (ui.selectedNodes.size !== 1) {
    ui.nodeNameEditStart = null;
    return;
  }
  const nodeId = [...ui.selectedNodes][0];
  const node = getNodeById(nodeId);
  if (!node) {
    ui.nodeNameEditStart = null;
    return;
  }
  if (ui.nodeNameEditStart != null && ui.nodeNameEditStart !== node.name) {
    setStatusKey("status.nodeRenamed", { name: node.name });
  }
  ui.nodeNameEditStart = null;
  nodeNameInput.value = node.name;
  nodeNameInput.classList.remove("invalid");
});

nodeNameInput.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    nodeNameInput.blur();
  }
});

function setNodeShape(node, shape) {
  if (!node || !["rect", "ellipse", "diamond", "submodel"].includes(shape)) {
    return;
  }
  runAction(() => {
    applyNodeShape(node, shape);
  });
}

function applyNodeShape(node, shape) {
  const wasSliderBindable = canBindSliderToNode(node);
  node.shape = shape;
  if (!canMarkNodeAsGlobal(node)) {
    node.global = false;
  }
  if (isSubmodelNode(node)) {
    node.input = false;
    node.output = false;
    node.valueExpression = "";
    node.initialStateExpression = "";
    node.pendingStateValue = null;
    node.pendingStateError = "";
  }
  if (!isStateNode(node)) {
    node.initialStateExpression = "";
    node.pendingStateValue = null;
    node.pendingStateError = "";
  }
  if (!isSubmodelNode(node)) {
    node.modelPath = "";
    node.inputBindings = {};
    node.interfaceCache = emptySubmodelInterfaceCache();
    node.submodelError = "";
  }
  node.__runtimeSubmodel = null;
  node.__runtimeSubmodelPath = "";
  normalizeInputNodeFlags();
  if (wasSliderBindable && !canBindSliderToNode(node)) {
    removeNodeFromInputWidgetBindings(node.name);
  }
}

function setNodeGlobal(node, global) {
  if (!canMarkNodeAsGlobal(node)) {
    return;
  }
  runAction(() => {
    node.global = Boolean(global);
  });
}

function setNodeOutput(node, output) {
  if (!node || isSubmodelNode(node)) {
    return;
  }
  runAction(() => {
    const wasOutput = Boolean(node.output);
    node.output = Boolean(output);
    if (wasOutput && !node.output) {
      removeNodeFromAllWidgetDisplays(node.name);
    }
  });
}

nodeShapeInput.addEventListener("change", () => {
  if (ui.selectedNodes.size !== 1) {
    return;
  }
  const node = getNodeById([...ui.selectedNodes][0]);
  if (!node) {
    return;
  }
  setNodeShape(node, nodeShapeInput.value);
});

if (nodeModelPathInput) {
  nodeModelPathInput.addEventListener("input", () => {
    if (ui.selectedNodes.size !== 1) {
      return;
    }
    const nodeId = [...ui.selectedNodes][0];
    const node = getNodeById(nodeId);
    if (!node || !isSubmodelNode(node)) {
      return;
    }
    node.modelPath = String(nodeModelPathInput.value ?? "");
    node.submodelError = "";
    node.interfaceCache = emptySubmodelInterfaceCache();
    node.inputBindings = {};
    node.__runtimeSubmodel = null;
    node.__runtimeSubmodelPath = "";
    ui.submodelsPrepared = false;
    render();
  });
  nodeModelPathInput.addEventListener("blur", () => {
    if (ui.selectedNodes.size !== 1) {
      return;
    }
    const nodeId = [...ui.selectedNodes][0];
    const node = getNodeById(nodeId);
    if (!node || !isSubmodelNode(node)) {
      return;
    }
    node.modelPath = String(nodeModelPathInput.value ?? "").trim();
    nodeModelPathInput.value = node.modelPath;
    scheduleFileStatusRefresh();
    render();
  });
  nodeModelPathInput.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      nodeModelPathInput.blur();
    }
  });
}

if (loadSubmodelBtn) {
  loadSubmodelBtn.addEventListener("click", async () => {
    if (ui.selectedNodes.size !== 1) {
      return;
    }
    const nodeId = [...ui.selectedNodes][0];
    const node = getNodeById(nodeId);
    if (!node || !isSubmodelNode(node)) {
      return;
    }
    try {
      const chosen = await chooseSubmodelFileForNode(node);
      if (!chosen) {
        return;
      }
    } catch (err) {
      if (err && err.name === "AbortError") {
        return;
      }
      setStatus(String(err?.message || t("error.submodelLoadFailed", { message: t("error.load") })), "error");
      refreshSidebar();
      render();
      return;
    }
    await refreshSubmodelInterface(node, true, { allowPrompt: true });
    await preloadSubmodelsAfterLoad();
    refreshSidebar();
    render();
  });
}

if (showSubmodelBtn) {
  showSubmodelBtn.addEventListener("click", async () => {
    if (ui.selectedNodes.size !== 1) {
      return;
    }
    const nodeId = [...ui.selectedNodes][0];
    const node = getNodeById(nodeId);
    if (!canShowSubmodelNode(node)) {
      return;
    }
    await openSubmodelNodeInNewTab(node);
  });
}

nodeInputInput.addEventListener("change", () => {
  const nodes = selectedNodesList();
  if (nodes.length === 0 || !nodes.every((node) => canMarkNodeAsInput(node))) {
    nodeInputInput.checked = false;
    nodeInputInput.indeterminate = false;
    return;
  }
  runAction(() => {
    nodes.forEach((node) => {
      const wasInput = Boolean(node.input);
      node.input = nodeInputInput.checked;
      if (wasInput && !node.input) {
        removeNodeFromInputWidgetBindings(node.name);
      }
    });
  });
  nodeInputInput.indeterminate = false;
});

nodeGlobalInput.addEventListener("change", () => {
  if (ui.selectedNodes.size !== 1) {
    return;
  }
  const nodeId = [...ui.selectedNodes][0];
  const node = getNodeById(nodeId);
  if (!node) {
    return;
  }
  if (!canMarkNodeAsGlobal(node)) {
    nodeGlobalInput.checked = false;
    return;
  }
  setNodeGlobal(node, nodeGlobalInput.checked);
});

nodeOutputInput.addEventListener("change", () => {
  const nodes = selectedNodesList().filter((node) => !isSubmodelNode(node));
  if (nodes.length === 0) {
    return;
  }
  if (nodes.length === 1) {
    setNodeOutput(nodes[0], nodeOutputInput.checked);
  } else {
    runAction(() => {
      nodes.forEach((node) => {
        const wasOutput = Boolean(node.output);
        node.output = nodeOutputInput.checked;
        if (wasOutput && !node.output) {
          removeNodeFromAllWidgetDisplays(node.name);
        }
      });
    });
  }
  nodeOutputInput.indeterminate = false;
});

if (nodeFillColorInput) {
  nodeFillColorInput.addEventListener("change", () => {
    const nodes = selectedNodesList();
    if (nodes.length === 0) {
      return;
    }
    runAction(() => {
      const nextColor = normalizeColorString(nodeFillColorInput.value);
      nodes.forEach((node) => {
        node.fillColor = nextColor;
        sanitizeNodeVisualOptions(node);
      });
    });
  });
}

if (nodeStrokeColorInput) {
  nodeStrokeColorInput.addEventListener("change", () => {
    const nodes = selectedNodesList();
    if (nodes.length === 0) {
      return;
    }
    runAction(() => {
      const nextColor = normalizeColorString(nodeStrokeColorInput.value);
      nodes.forEach((node) => {
        node.strokeColor = nextColor;
        sanitizeNodeVisualOptions(node);
      });
    });
  });
}

if (resetNodeColorsBtn) {
  resetNodeColorsBtn.addEventListener("click", () => {
    const nodes = selectedNodesList();
    if (nodes.length === 0) {
      return;
    }
    runAction(() => {
      nodes.forEach((node) => {
        node.fillColor = "";
        node.strokeColor = "";
        sanitizeNodeVisualOptions(node);
      });
    });
  });
}

if (textWidthInput) {
  textWidthInput.addEventListener("change", () => {
    const item = ui.selected?.type === "text" ? getTextItemById(ui.selected.id) : null;
    if (!item) {
      return;
    }
    runAction(() => {
      item.width = clamp(Number(textWidthInput.value) || item.width, 40, 1200);
      sanitizeTextItem(item);
    });
  });
}

if (textHeightInput) {
  textHeightInput.addEventListener("change", () => {
    const item = ui.selected?.type === "text" ? getTextItemById(ui.selected.id) : null;
    if (!item) {
      return;
    }
    runAction(() => {
      item.height = clamp(Number(textHeightInput.value) || item.height, 24, 1200);
      sanitizeTextItem(item);
    });
  });
}

if (textFillColorInput) {
  textFillColorInput.addEventListener("change", () => {
    const item = ui.selected?.type === "text" ? getTextItemById(ui.selected.id) : null;
    if (!item) {
      return;
    }
    runAction(() => {
      item.fillColor = normalizeColorString(textFillColorInput.value);
      sanitizeTextItem(item);
    });
  });
}

if (textStrokeColorInput) {
  textStrokeColorInput.addEventListener("change", () => {
    const item = ui.selected?.type === "text" ? getTextItemById(ui.selected.id) : null;
    if (!item) {
      return;
    }
    runAction(() => {
      item.strokeColor = normalizeColorString(textStrokeColorInput.value);
      sanitizeTextItem(item);
    });
  });
}

function bindTextInputEditor(input) {
  if (!input) {
    return;
  }
  input.addEventListener("focus", () => {
    const item = ui.selected?.type === "text" ? getTextItemById(ui.selected.id) : null;
    if (!item) {
      return;
    }
    beginTransaction();
  });
  input.addEventListener("input", () => {
    const item = ui.selected?.type === "text" ? getTextItemById(ui.selected.id) : null;
    if (!item) {
      return;
    }
    item.html = String(input.value ?? "");
    sanitizeTextItem(item);
    syncSelectedTextInputs(item);
    dirtySinceLastSave = true;
    updateFileStatusLabel(true);
    render();
  });
  input.addEventListener("blur", () => {
    commitTransaction();
    render();
  });
}

bindTextInputEditor(textHtmlInput);
bindTextInputEditor(textEditorInput);

if (textHtmlInput) {
  textHtmlInput.addEventListener("dblclick", () => {
    openTextEditor();
  });
}

function handleTextEditorTool(tool) {
  if (tool === "h1") {
    wrapTextSelection("<h1>", "</h1>", t("text.toolbarHeading1"));
    return;
  }
  if (tool === "h2") {
    wrapTextSelection("<h2>", "</h2>", t("text.toolbarHeading2"));
    return;
  }
  if (tool === "h3") {
    wrapTextSelection("<h3>", "</h3>", t("text.toolbarHeading3"));
    return;
  }
  if (tool === "p") {
    wrapTextSelection("<p>", "</p>", t("text.toolbarParagraph"));
    return;
  }
  if (tool === "b") {
    wrapTextSelection("<strong>", "</strong>");
    return;
  }
  if (tool === "i") {
    wrapTextSelection("<em>", "</em>");
    return;
  }
  if (tool === "u") {
    wrapTextSelection("<u>", "</u>");
    return;
  }
  if (tool === "ul") {
    wrapTextSelection("<ul>\n<li>", "</li>\n</ul>", t("text.toolbarListItem"));
    return;
  }
  if (tool === "ol") {
    wrapTextSelection("<ol>\n<li>", "</li>\n</ol>", t("text.toolbarListItem"));
    return;
  }
  if (tool === "li") {
    wrapTextSelection("<li>", "</li>", t("text.toolbarListItem"));
    return;
  }
  if (tool === "br") {
    insertTextHtmlSnippet("<br>");
    return;
  }
  if (tool === "hr") {
    insertTextHtmlSnippet("<hr>");
  }
}

if (textEditorToolbar) {
  textEditorToolbar.addEventListener("click", (evt) => {
    const btn = evt.target.closest("[data-text-tool]");
    if (!btn) {
      return;
    }
    evt.preventDefault();
    handleTextEditorTool(btn.getAttribute("data-text-tool"));
  });
}

if (textEditorCloseBtn) {
  textEditorCloseBtn.addEventListener("click", () => {
    closeTextEditor();
  });
}

if (textEditorDismissBtn) {
  textEditorDismissBtn.addEventListener("click", () => {
    closeTextEditor();
  });
}

manualStepBtn.addEventListener("click", () => {
  void runManualStep();
});
bindTimedExecutionToggle(timedToggleBtn);
resetExecBtn.addEventListener("click", resetExecution);

nodeValueExprInput.addEventListener("input", () => {
  const meta = expressionFieldMeta("value");
  if (!meta) {
    return;
  }
  const changed = nodeValueExprInput.value !== meta.value;
  meta.setValue(nodeValueExprInput.value);
  updateExpressionFieldState(nodeValueExprInput, nodeValueExprStatus, nodeValueExprInput.value, false, "value");
  scheduleFileStatusRefresh();
  if (changed) {
    resetExecutionAfterEquationChange();
  }
});

nodeInitialStateInput.addEventListener("input", () => {
  const meta = expressionFieldMeta("initial");
  if (!meta) {
    return;
  }
  const changed = nodeInitialStateInput.value !== meta.value;
  meta.setValue(nodeInitialStateInput.value);
  updateExpressionFieldState(nodeInitialStateInput, nodeInitialStateStatus, nodeInitialStateInput.value, false, "initial");
  scheduleFileStatusRefresh();
  if (changed) {
    resetExecutionAfterEquationChange();
  }
});

if (expressionDescriptionInput) {
  expressionDescriptionInput.addEventListener("focus", () => {
    if (isTabletExpressionEditorMode()) {
      setExpressionEditorView("notes", { focus: false });
    }
  });
  expressionDescriptionInput.addEventListener("input", () => {
    const node = ui.expressionEditor?.nodeId ? getNodeById(ui.expressionEditor.nodeId) : null;
    if (!node) {
      return;
    }
    const prop = normalizeNodeDescriptionProperty(node);
    prop.value = expressionDescriptionInput.value;
    scheduleFileStatusRefresh();
  });
}

if (expressionFormulaNotesInput) {
  expressionFormulaNotesInput.addEventListener("focus", () => {
    if (isTabletExpressionEditorMode()) {
      setExpressionEditorView("notes", { focus: false });
    }
  });
  expressionFormulaNotesInput.addEventListener("input", () => {
    const node = ui.expressionEditor?.nodeId ? getNodeById(ui.expressionEditor.nodeId) : null;
    if (!node) {
      return;
    }
    const prop = normalizeNodeFormulaNotesProperty(node);
    prop.value = expressionFormulaNotesInput.value;
    scheduleFileStatusRefresh();
  });
}

if (editNodeValueExprBtn) {
  editNodeValueExprBtn.addEventListener("click", () => {
    if (isWidgetControlledExpressionNode(selectedNodeForSidebar())) {
      return;
    }
    openExpressionEditor("value");
  });
}

if (expressionEditorTextarea) {
  expressionEditorTextarea.addEventListener("focus", () => {
    setActiveExpressionEditor("main");
    if (isTabletExpressionEditorMode()) {
      setExpressionEditorView("editor", { focus: false });
    }
  });
  expressionEditorTextarea.addEventListener("input", () => {
    refreshExpressionEditorValidation();
  });
  expressionEditorTextarea.addEventListener("scroll", () => {
    renderExpressionHighlight();
  });
  expressionEditorTextarea.addEventListener("keydown", (evt) => {
    if (evt.key === "ArrowDown" && evt.shiftKey) {
      evt.preventDefault();
      moveLibrarySelection(1);
      return;
    }
    if (evt.key === "ArrowUp" && evt.shiftKey) {
      evt.preventDefault();
      moveLibrarySelection(-1);
      return;
    }
    if (evt.key === "Enter" && evt.shiftKey && !evt.ctrlKey && !evt.metaKey) {
      evt.preventDefault();
      insertSelectedLibraryEntry();
      return;
    }
    if (evt.key === "Tab") {
      evt.preventDefault();
      insertExpressionSnippet("\t");
      refreshExpressionEditorValidation();
      return;
    }
    if (evt.key === "Enter" && !evt.ctrlKey && !evt.metaKey) {
      evt.preventDefault();
      insertExpressionSnippet("\n");
      refreshExpressionEditorValidation();
    }
  });
  ["click", "keyup", "mouseup"].forEach((eventName) => {
    expressionEditorTextarea.addEventListener(eventName, () => {
      renderExpressionHighlight();
      renderExpressionAutocomplete();
    });
  });
  ["pointerup", "touchend"].forEach((eventName) => {
    expressionEditorTextarea.addEventListener(eventName, () => {
      renderExpressionHighlight();
    });
  });
}

if (expressionNodeShapeInput) {
  expressionNodeShapeInput.addEventListener("change", () => {
    const node = ui.expressionEditor?.nodeId ? getNodeById(ui.expressionEditor.nodeId) : null;
    const nextShape = expressionNodeShapeInput.value;
    if (!node || !["rect", "ellipse", "diamond", "submodel"].includes(nextShape)) {
      return;
    }
    // The popup is also the node-type editor. Apply this structural choice as
    // soon as it is made so its state-only fields, validation and sidebar stay
    // in sync with the selected type instead of waiting for an unrelated
    // expression edit to be applied.
    if (nextShape !== node.shape) {
      setNodeShape(node, nextShape);
      resetExecutionAfterEquationChange();
      if (ui.expressionEditor) {
        ui.expressionEditor.baseTitle = expressionEditorBaseTitleForNode(node);
        ui.expressionEditor.initialValue = String(node.valueExpression ?? "");
        ui.expressionEditor.secondaryInitialValue = isStateNode(node)
          ? String(node.initialStateExpression ?? "")
          : "";
      }
    }
    syncExpressionEditorFormulaNotes();
    refreshExpressionEditorValidation();
  });
}

if (expressionNodeNameInput) {
  expressionNodeNameInput.addEventListener("input", () => {
    expressionNodeNameInput.classList.remove("invalid");
  });
}

if (expressionStateInitialInput) {
  expressionStateInitialInput.addEventListener("focus", () => {
    setActiveExpressionEditor("initial");
    if (isTabletExpressionEditorMode()) {
      setExpressionEditorView("editor", { focus: false });
    }
  });
  expressionStateInitialInput.addEventListener("input", () => {
    refreshExpressionEditorValidation();
  });
  expressionStateInitialInput.addEventListener("scroll", () => {
    renderExpressionHighlight();
  });
  expressionStateInitialInput.addEventListener("keydown", (evt) => {
    if (evt.key === "ArrowDown" && evt.shiftKey) {
      evt.preventDefault();
      moveLibrarySelection(1);
      return;
    }
    if (evt.key === "ArrowUp" && evt.shiftKey) {
      evt.preventDefault();
      moveLibrarySelection(-1);
      return;
    }
    if (evt.key === "Enter" && evt.shiftKey && !evt.ctrlKey && !evt.metaKey) {
      evt.preventDefault();
      insertSelectedLibraryEntry();
      return;
    }
    if (evt.key === "Tab") {
      evt.preventDefault();
      insertExpressionSnippet("\t");
      refreshExpressionEditorValidation();
      return;
    }
    if (evt.key === "Enter" && !evt.ctrlKey && !evt.metaKey) {
      evt.preventDefault();
      insertExpressionSnippet("\n");
      refreshExpressionEditorValidation();
    }
  });
  ["click", "keyup", "mouseup"].forEach((eventName) => {
    expressionStateInitialInput.addEventListener(eventName, () => {
      renderExpressionHighlight();
      renderExpressionAutocomplete();
    });
  });
  ["pointerup", "touchend"].forEach((eventName) => {
    expressionStateInitialInput.addEventListener(eventName, () => {
      renderExpressionHighlight();
    });
  });
}

const expressionResizeObserver = typeof ResizeObserver === "function"
  ? new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target;
      if (target === expressionEditorTextarea) {
        syncExpressionSurfaceSize(expressionEditorTextarea, expressionEditorHighlight);
        renderExpressionHighlightFor(expressionEditorTextarea, expressionEditorHighlight);
      } else if (target === expressionStateInitialInput) {
        syncExpressionSurfaceSize(expressionStateInitialInput, expressionStateInitialHighlight);
        renderExpressionHighlightFor(expressionStateInitialInput, expressionStateInitialHighlight);
      }
    });
  })
  : null;

if (expressionResizeObserver) {
  if (expressionEditorTextarea) {
    expressionResizeObserver.observe(expressionEditorTextarea);
  }
  if (expressionStateInitialInput) {
    expressionResizeObserver.observe(expressionStateInitialInput);
  }
}

if (expressionEditorCloseBtn) {
  expressionEditorCloseBtn.addEventListener("click", closeExpressionEditor);
}
if (expressionEditorCancelBtn) {
  expressionEditorCancelBtn.addEventListener("click", closeExpressionEditor);
}
if (expressionEditorApplyBtn) {
  expressionEditorApplyBtn.addEventListener("click", applyExpressionEditor);
}
if (expressionHelpCopyBtn) {
  expressionHelpCopyBtn.addEventListener("click", () => {
    copyExpressionAuxText(expressionHelp);
  });
}
if (expressionStatusCopyBtn) {
  expressionStatusCopyBtn.addEventListener("click", () => {
    copyExpressionAuxText(expressionEditorStatus);
  });
}
if (expressionSymbolsFilter) {
  expressionSymbolsFilter.addEventListener("focus", () => {
    if (isTabletExpressionEditorMode()) {
      setExpressionEditorView("help", { focus: false });
    }
  });
  expressionSymbolsFilter.addEventListener("input", () => {
    renderExpressionLibrary();
  });
  expressionSymbolsFilter.addEventListener("keydown", (evt) => {
    if (evt.key === "ArrowDown") {
      evt.preventDefault();
      moveLibrarySelection(1);
      return;
    }
    if (evt.key === "ArrowUp") {
      evt.preventDefault();
      moveLibrarySelection(-1);
      return;
    }
    if (evt.key === "Enter") {
      evt.preventDefault();
      insertSelectedLibraryEntry();
      return;
    }
    if (evt.key === "Escape") {
      evt.preventDefault();
      expressionEditorTextarea?.focus();
    }
  });
}
[
  [expressionEditorViewEditorBtn, "editor"],
  [expressionEditorViewNotesBtn, "notes"],
  [expressionEditorViewHelpBtn, "help"],
].forEach(([btn, view]) => {
  if (!btn) {
    return;
  }
  btn.addEventListener("click", () => {
    setExpressionEditorView(view);
  });
});
if (expressionEditorModal) {
  const modalCard = expressionEditorModal.querySelector(".expression-editor-card");
  bindModalDragHandle(expressionEditorModal, ".expression-editor-card");
  if (expressionEditorResizeHandle && modalCard) {
    expressionEditorResizeHandle.addEventListener("pointerdown", (evt) => {
      if (isCompactTouchPointerEvent(evt)) {
        return;
      }
      evt.preventDefault();
      evt.stopPropagation();
      const rect = modalCard.getBoundingClientRect();
      modalCard.style.transform = "none";
      modalCard.style.left = `${rect.left}px`;
      modalCard.style.top = `${rect.top}px`;
      modalCard.style.width = `${rect.width}px`;
      modalCard.style.height = `${rect.height}px`;
      ui.modalResize = {
        pointerId: evt.pointerId,
        startClientX: evt.clientX,
        startClientY: evt.clientY,
        startWidth: rect.width,
        startHeight: rect.height,
        startLeft: rect.left,
        startTop: rect.top,
        card: modalCard,
      };
      evt.currentTarget?.setPointerCapture?.(evt.pointerId);
    });
  }
}
bindModalDragHandle(functionsHelpModal, ".functions-help-card");
bindModalDragHandle(dataLinksModal, ".data-links-card");
bindModalDragHandle(examplesHelpModal, ".examples-help-card");
bindModalDragHandle(aboutAppModal, ".about-app-card");
bindModalDragHandle(modelAnalysisModal, ".model-analysis-card");
bindModalDragHandle(functionalLoopModal, ".functional-loop-card");
bindModalDragHandle(eightTupleModal, ".eight-tuple-card");
bindModalDragHandle(watchDebuggerModal, ".watch-debugger-card");
bindModalDragHandle(localFunctionsModal, ".local-functions-card");
bindModalDragHandle(presentationGroupsModal, ".presentation-groups-card");
bindModalDragHandle(textEditorModal, ".text-editor-card");
if (functionsHelpBtn) {
  functionsHelpBtn.addEventListener("click", () => {
    closeTopMenus();
    openFunctionsHelp();
  });
}
if (eightTupleBtn) {
  eightTupleBtn.addEventListener("click", () => {
    closeTopMenus();
    openEightTuple();
  });
}
if (examplesHelpBtn) {
  examplesHelpBtn.addEventListener("click", () => {
    closeTopMenus();
    openExamplesHelp();
  });
}
if (aboutAppBtn) {
  aboutAppBtn.addEventListener("click", () => {
    closeTopMenus();
    openAboutApp();
  });
}
if (analyzeModelBtn) {
  analyzeModelBtn.addEventListener("click", () => {
    closeTopMenus();
    openModelAnalysis();
  });
}
if (functionalLoopDiagramBtn) {
  functionalLoopDiagramBtn.addEventListener("click", () => {
    closeTopMenus();
    openFunctionalLoopDiagram();
  });
}
if (watchDebuggerBtn) {
  watchDebuggerBtn.addEventListener("click", () => {
    closeTopMenus();
    openWatchDebugger();
  });
}
if (functionsHelpCloseBtn) {
  functionsHelpCloseBtn.addEventListener("click", closeFunctionsHelp);
}
if (functionsHelpDismissBtn) {
  functionsHelpDismissBtn.addEventListener("click", closeFunctionsHelp);
}
if (dataLinksCloseBtn) {
  dataLinksCloseBtn.addEventListener("click", closeDataLinksDialog);
}
if (dataLinksDismissBtn) {
  dataLinksDismissBtn.addEventListener("click", closeDataLinksDialog);
}
if (addLinkedDataBtn) {
  addLinkedDataBtn.addEventListener("click", () => {
    void linkExternalCsvFiles().then(() => renderDataLinksDialog());
  });
}
if (qualitativeGraphCloseBtn) {
  qualitativeGraphCloseBtn.addEventListener("click", closeQualitativeGraphWizard);
}
if (qualitativeGraphCancelBtn) {
  qualitativeGraphCancelBtn.addEventListener("click", closeQualitativeGraphWizard);
}
if (qualitativeGraphBackBtn) {
  qualitativeGraphBackBtn.addEventListener("click", () => {
    if (qualitativeGraphWizard.step > 1) {
      qualitativeGraphWizard.step -= 1;
      renderQualitativeGraphWizard();
    }
  });
}
if (qualitativeGraphNextBtn) {
  qualitativeGraphNextBtn.addEventListener("click", advanceQualitativeGraphWizard);
}
if (functionsHelpSearch) {
  functionsHelpSearch.addEventListener("input", renderFunctionsHelp);
}
if (functionsHelpTypeFilter) {
  functionsHelpTypeFilter.addEventListener("change", renderFunctionsHelp);
}
if (examplesHelpCloseBtn) {
  examplesHelpCloseBtn.addEventListener("click", closeExamplesHelp);
}
if (examplesHelpDismissBtn) {
  examplesHelpDismissBtn.addEventListener("click", closeExamplesHelp);
}
if (aboutAppCloseBtn) {
  aboutAppCloseBtn.addEventListener("click", closeAboutApp);
}
if (aboutAppDismissBtn) {
  aboutAppDismissBtn.addEventListener("click", closeAboutApp);
}
if (eightTupleCloseBtn) {
  eightTupleCloseBtn.addEventListener("click", closeEightTuple);
}
if (eightTupleDismissBtn) {
  eightTupleDismissBtn.addEventListener("click", closeEightTuple);
}
if (eightTupleCopyBtn) {
  eightTupleCopyBtn.addEventListener("click", copyEightTupleText);
}
if (eightTupleExportBtn) {
  eightTupleExportBtn.addEventListener("click", () => {
    void exportEightTupleMarkdown();
  });
}
if (modelAnalysisCloseBtn) {
  modelAnalysisCloseBtn.addEventListener("click", closeModelAnalysis);
}
if (modelAnalysisDismissBtn) {
  modelAnalysisDismissBtn.addEventListener("click", closeModelAnalysis);
}
if (modelAnalysisChecksBtn) {
  modelAnalysisChecksBtn.addEventListener("click", openModelAnalysisChecksHelp);
}
if (modelAnalysisChecksCloseBtn) {
  modelAnalysisChecksCloseBtn.addEventListener("click", closeModelAnalysisChecksHelp);
}
if (modelAnalysisChecksDismissBtn) {
  modelAnalysisChecksDismissBtn.addEventListener("click", closeModelAnalysisChecksHelp);
}
if (functionalLoopCloseBtn) {
  functionalLoopCloseBtn.addEventListener("click", closeFunctionalLoopDiagram);
}
if (functionalLoopDismissBtn) {
  functionalLoopDismissBtn.addEventListener("click", closeFunctionalLoopDiagram);
}
if (functionalLoopRunBtn) {
  functionalLoopRunBtn.addEventListener("click", runFunctionalLoopDiagram);
}
if (functionalLoopExportBtn) {
  functionalLoopExportBtn.addEventListener("click", exportFunctionalLoopDiagram);
}
if (watchDebuggerCloseBtn) {
  watchDebuggerCloseBtn.addEventListener("click", closeWatchDebugger);
}
if (watchDebuggerDismissBtn) {
  watchDebuggerDismissBtn.addEventListener("click", closeWatchDebugger);
}
if (watchDebuggerModal) {
  watchDebuggerModal.addEventListener("pointerdown", (evt) => {
    if (evt.target === watchDebuggerModal) {
      closeWatchDebugger();
    }
  });
}
if (watchAddSelectedBtn) {
  watchAddSelectedBtn.addEventListener("click", () => {
    const node = selectedWatchableNode();
    if (!node || isEditingUiLocked()) {
      return;
    }
    commitDebugConfigChange(() => {
      const debug = ensureDebugConfig(graph);
      if (!debug.watches.includes(node.name)) {
        debug.watches.push(node.name);
      }
      sanitizeDebugConfig(graph);
    });
    renderWatchDebugger();
  });
}
if (watchBreakpointEnabledInput) {
  watchBreakpointEnabledInput.addEventListener("change", () => {
    commitDebugConfigChange(() => {
      ensureDebugConfig(graph).breakpointEnabled = Boolean(watchBreakpointEnabledInput.checked);
      if (!watchBreakpointEnabledInput.checked) {
        ui.breakpointLastResult = null;
      }
    });
    renderWatchDebugger();
  });
}
if (watchBreakpointInput) {
  const commitWatchBreakpointExpression = () => {
    commitDebugConfigChange(() => {
      ensureDebugConfig(graph).breakpointExpression = String(watchBreakpointInput.value ?? "");
      ui.breakpointLastResult = null;
    });
    renderWatchDebugger();
  };
  watchBreakpointInput.addEventListener("input", () => {
    ui.breakpointLastResult = null;
    renderWatchDebugger();
  });
  watchBreakpointInput.addEventListener("change", commitWatchBreakpointExpression);
  watchBreakpointInput.addEventListener("blur", commitWatchBreakpointExpression);
  watchBreakpointInput.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      commitWatchBreakpointExpression();
      watchBreakpointInput.blur();
    }
  });
}
if (expressionEditorSwitchCloseBtn) {
  expressionEditorSwitchCloseBtn.addEventListener("click", closeExpressionEditorSwitchModal);
}
if (expressionEditorSwitchCancelBtn) {
  expressionEditorSwitchCancelBtn.addEventListener("click", closeExpressionEditorSwitchModal);
}
if (expressionEditorSwitchDiscardBtn) {
  expressionEditorSwitchDiscardBtn.addEventListener("click", runPendingExpressionEditorSelectionAction);
}
if (expressionEditorSwitchApplyBtn) {
  expressionEditorSwitchApplyBtn.addEventListener("click", () => {
    if (!commitExpressionEditorValue(false)) {
      return;
    }
    runPendingExpressionEditorSelectionAction();
  });
}
if (functionsHelpModal) {
  functionsHelpModal.addEventListener("pointerdown", (evt) => {
    if (evt.target === functionsHelpModal) {
      closeFunctionsHelp();
    }
  });
}
if (dataLinksModal) {
  dataLinksModal.addEventListener("pointerdown", (evt) => {
    if (evt.target === dataLinksModal) {
      closeDataLinksDialog();
    }
  });
}
if (qualitativeGraphWizardModal) {
  qualitativeGraphWizardModal.addEventListener("pointerdown", (evt) => {
    if (evt.target === qualitativeGraphWizardModal) {
      closeQualitativeGraphWizard();
    }
  });
}
if (examplesHelpModal) {
  examplesHelpModal.addEventListener("pointerdown", (evt) => {
    if (evt.target === examplesHelpModal) {
      closeExamplesHelp();
    }
  });
}
if (aboutAppModal) {
  aboutAppModal.addEventListener("pointerdown", (evt) => {
    if (evt.target === aboutAppModal) {
      closeAboutApp();
    }
  });
}
if (eightTupleModal) {
  eightTupleModal.addEventListener("pointerdown", (evt) => {
    if (evt.target === eightTupleModal) {
      closeEightTuple();
    }
  });
}
if (modelAnalysisChecksModal) {
  modelAnalysisChecksModal.addEventListener("pointerdown", (evt) => {
    if (evt.target === modelAnalysisChecksModal) {
      closeModelAnalysisChecksHelp();
    }
  });
}
if (localFunctionsModal) {
  localFunctionsModal.addEventListener("pointerdown", (evt) => {
    if (evt.target === localFunctionsModal) {
      closeLocalFunctionsEditor();
    }
  });
}
if (presentationGroupsModal) {
  presentationGroupsModal.addEventListener("pointerdown", (evt) => {
    if (evt.target === presentationGroupsModal) {
      closePresentationGroupsEditor();
    }
  });
}
if (viewOptionsModal) {
  viewOptionsModal.addEventListener("pointerdown", (evt) => {
    if (evt.target === viewOptionsModal) {
      closeViewOptions();
    }
  });
}
if (dashboardRenameModal) {
  dashboardRenameModal.addEventListener("pointerdown", (evt) => {
    if (evt.target === dashboardRenameModal) {
      closeDashboardPageRenameEditor();
    }
  });
}
if (expressionEditorSwitchModal) {
  expressionEditorSwitchModal.addEventListener("pointerdown", (evt) => {
    if (evt.target === expressionEditorSwitchModal) {
      closeExpressionEditorSwitchModal();
    }
  });
}

document.addEventListener("pointerover", (evt) => {
  const target = activeTooltipTarget(evt.target);
  if (!target) {
    scheduleHideAppTooltip(60);
    return;
  }
  ui.tooltipPointer = { x: evt.clientX, y: evt.clientY };
  scheduleShowAppTooltip(target, evt.clientX, evt.clientY, ui.tooltipDelayMs);
});

document.addEventListener("pointermove", (evt) => {
  const target = activeTooltipTarget(evt.target);
  // Tooltips describe the point currently being inspected. Hide immediately
  // on movement, then allow the normal delay only after the pointer is still.
  hideAppTooltip();
  if (target && ui.tooltipDelayMs > 0) {
    scheduleShowAppTooltip(target, evt.clientX, evt.clientY, ui.tooltipDelayMs);
  }
});

document.addEventListener("pointerout", (evt) => {
  if (!evt.relatedTarget || !activeTooltipTarget(evt.relatedTarget)) {
    scheduleHideAppTooltip(60);
  }
});

document.addEventListener("pointerdown", () => {
  ensureEditingUiUnlockedIfIdle();
}, true);

document.addEventListener("focusin", (evt) => {
  if (isTypingTarget(evt.target)) {
    ensureEditingUiUnlockedIfIdle();
  }
  const target = activeTooltipTarget(evt.target);
  if (!target) {
    return;
  }
  if (ui.tooltipDelayMs <= 0) {
    return;
  }
  const rect = target.getBoundingClientRect();
  showAppTooltip(target, rect.left + 8, rect.bottom);
});

document.addEventListener("focusout", (evt) => {
  if (!evt.relatedTarget || !activeTooltipTarget(evt.relatedTarget)) {
    hideAppTooltip();
  }
});

window.addEventListener("scroll", hideAppTooltip, true);
window.addEventListener("resize", hideAppTooltip);

modelTitleInput.addEventListener("input", () => {
  graph.modelTitle = modelTitleInput.value;
});

addModelPropBtn.addEventListener("click", () => {
  runAction(() => {
    graph.properties.push({ key: "", value: "" });
  });
});
if (editLocalFunctionsBtn) {
  editLocalFunctionsBtn.addEventListener("click", openLocalFunctionsEditor);
}
if (localFunctionsAddBtn) {
  localFunctionsAddBtn.addEventListener("click", () => {
    localFunctionsDraft().push({ name: "", params: [], expression: "", description: "" });
    renderLocalFunctionsEditor();
    showLocalFunctionsStatus();
  });
}
if (localFunctionsApplyBtn) {
  localFunctionsApplyBtn.addEventListener("click", commitLocalFunctionsEditor);
}
if (localFunctionsCancelBtn) {
  localFunctionsCancelBtn.addEventListener("click", closeLocalFunctionsEditor);
}
if (localFunctionsCloseBtn) {
  localFunctionsCloseBtn.addEventListener("click", closeLocalFunctionsEditor);
}
if (presentationGroupCreateBtn) {
  presentationGroupCreateBtn.addEventListener("click", createPresentationGroupFromSelection);
}
if (presentationGroupNameInput) {
  presentationGroupNameInput.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      createPresentationGroupFromSelection();
    }
  });
}
if (presentationGroupsCloseBtn) {
  presentationGroupsCloseBtn.addEventListener("click", closePresentationGroupsEditor);
}
if (presentationGroupsDismissBtn) {
  presentationGroupsDismissBtn.addEventListener("click", closePresentationGroupsEditor);
}
if (viewOptionsCloseBtn) {
  viewOptionsCloseBtn.addEventListener("click", closeViewOptions);
}
if (viewOptionsDismissBtn) {
  viewOptionsDismissBtn.addEventListener("click", closeViewOptions);
}
if (dashboardRenameCloseBtn) {
  dashboardRenameCloseBtn.addEventListener("click", closeDashboardPageRenameEditor);
}
if (dashboardRenameCancelBtn) {
  dashboardRenameCancelBtn.addEventListener("click", closeDashboardPageRenameEditor);
}
if (dashboardRenameApplyBtn) {
  dashboardRenameApplyBtn.addEventListener("click", applyDashboardPageRename);
}
if (manageDashboardItem) {
  manageDashboardItem.addEventListener("click", () => {
    closeTopMenus();
    commitDashboardChange(() => {
      if (!graph.dashboard) {
        graph.dashboard = defaultDashboard();
      } else {
        graph.dashboard.visible = !graph.dashboard.visible;
      }
    });
  });
}

addPropBtn.addEventListener("click", () => {
  if (ui.selectedNodes.size !== 1) {
    return;
  }
  const nodeId = [...ui.selectedNodes][0];
  const node = getNodeById(nodeId);
  if (!node) {
    return;
  }
  runAction(() => {
    node.properties.push({ key: "", value: "" });
  });
});

window.addEventListener("keydown", (evt) => {
  if ((evt.ctrlKey || evt.metaKey) && !evt.shiftKey && evt.key.toLowerCase() === "n" && !isTypingTarget(evt.target)) {
    evt.preventDefault();
    evt.stopPropagation();
    createNewGraph();
    return;
  }
  if (evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && evt.key.toLowerCase() === "n" && !isTypingTarget(evt.target)) {
    evt.preventDefault();
    evt.stopPropagation();
    createNewGraph();
    return;
  }
  if (evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && evt.key.toLowerCase() === "o" && !isTypingTarget(evt.target)) {
    evt.preventDefault();
    evt.stopPropagation();
    openGraphJson();
  }
}, true);

document.addEventListener("keydown", (evt) => {
  if (!dashboardRenameModal?.classList.contains("hidden")) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeDashboardPageRenameEditor();
    } else if (evt.key === "Enter") {
      evt.preventDefault();
      applyDashboardPageRename();
    }
    return;
  }

  if (!functionalLoopModal?.classList.contains("hidden")) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeFunctionalLoopDiagram();
    }
    return;
  }

  if (!expressionEditorSwitchModal?.classList.contains("hidden")) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeExpressionEditorSwitchModal();
    } else if ((evt.ctrlKey || evt.metaKey) && evt.key === "Enter") {
      evt.preventDefault();
      if (commitExpressionEditorValue(false)) {
        runPendingExpressionEditorSelectionAction();
      }
    }
    return;
  }

  if (!watchDebuggerModal?.classList.contains("hidden")) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeWatchDebugger();
      return;
    }
  }

  if (!localFunctionsModal?.classList.contains("hidden")) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeLocalFunctionsEditor();
      return;
    }
    if ((evt.ctrlKey || evt.metaKey) && evt.key === "Enter") {
      evt.preventDefault();
      commitLocalFunctionsEditor();
      return;
    }
  }

  const expressionEditorActive =
    !expressionEditorModal?.classList.contains("hidden")
    && expressionEditorModal.contains(document.activeElement);
  if (expressionEditorActive) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeExpressionEditor();
    } else if ((evt.ctrlKey || evt.metaKey) && evt.key === "Enter") {
      evt.preventDefault();
      applyExpressionEditor();
    }
    return;
  }

  if (!dataLinksModal?.classList.contains("hidden")) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeDataLinksDialog();
    }
    return;
  }

  if (!qualitativeGraphWizardModal?.classList.contains("hidden")) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeQualitativeGraphWizard();
    }
    return;
  }

  if (!functionsHelpModal?.classList.contains("hidden")) {
    if (evt.key === "Escape" || evt.key === "F1") {
      evt.preventDefault();
      closeFunctionsHelp();
    }
    return;
  }

  if (!examplesHelpModal?.classList.contains("hidden")) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeExamplesHelp();
    }
    return;
  }

  if (!aboutAppModal?.classList.contains("hidden")) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeAboutApp();
    }
    return;
  }
  if (!eightTupleModal?.classList.contains("hidden")) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeEightTuple();
    }
    return;
  }
  if (!modelAnalysisChecksModal?.classList.contains("hidden")) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closeModelAnalysisChecksHelp();
    }
    return;
  }

  if (evt.key === "F1") {
    evt.preventDefault();
    openFunctionsHelp();
    return;
  }

  if (evt.key === "F7") {
    evt.preventDefault();
    void executeNodeExpressions();
    return;
  }
  if (evt.key === "F8") {
    evt.preventDefault();
    void runManualStep();
    return;
  }
  if (evt.key === "F9") {
    evt.preventDefault();
    void toggleTimedExecution();
    return;
  }
  if (evt.key === "F10") {
    evt.preventDefault();
    resetExecution();
    return;
  }

  if (evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !isTypingTarget(evt.target)) {
    if (isEditingUiLocked() && ["1", "2", "3", "4"].includes(evt.key)) {
      evt.preventDefault();
      return;
    }
    if (evt.key === "1") {
      evt.preventDefault();
      runAction(() => {
        addNode("rect");
      });
      setStatusKey("status.nodeCreated");
      return;
    }
    if (evt.key === "2") {
      evt.preventDefault();
      runAction(() => {
        addNode("ellipse");
      });
      setStatusKey("status.nodeCreated");
      return;
    }
    if (evt.key === "3") {
      evt.preventDefault();
      runAction(() => {
        addNode("diamond");
      });
      setStatusKey("status.nodeCreated");
      return;
    }
    if (evt.key === "4") {
      evt.preventDefault();
      runAction(() => {
        addNode("submodel");
      });
      setStatusKey("status.nodeCreated");
      return;
    }
  }

  if (evt.ctrlKey || evt.metaKey) {
    const key = evt.key.toLowerCase();
    const typingTarget = isTypingTarget(evt.target);
    if (key === "a" && !typingTarget) {
      evt.preventDefault();
      selectAllNodes();
      return;
    }
    if (key === "x" && !typingTarget) {
      if (isEditingUiLocked()) {
        evt.preventDefault();
        return;
      }
      evt.preventDefault();
      cutSelectionToClipboard();
      return;
    }
    if (key === "c" && !typingTarget) {
      evt.preventDefault();
      copySelectionToClipboard();
      return;
    }
    if (key === "v" && !typingTarget) {
      if (isEditingUiLocked()) {
        evt.preventDefault();
        return;
      }
      evt.preventDefault();
      pasteFromClipboard();
      return;
    }
    if (key === "s") {
      evt.preventDefault();
      if (evt.shiftKey) {
        saveGraphJson(true);
      } else {
        saveGraphJson(false);
      }
      return;
    }
    if (key === "n") {
      evt.preventDefault();
      createNewGraph();
      return;
    }
    if (key === "w") {
      evt.preventDefault();
      void closeActiveWorkspaceTab();
      return;
    }
    if (key === "f" && evt.shiftKey) {
      evt.preventDefault();
      fitToContent();
      return;
    }
    if (evt.key === "+" || evt.key === "=") {
      evt.preventDefault();
      applyZoom(ui.zoom * 1.2);
      return;
    }
    if (evt.key === "-" || evt.key === "_") {
      evt.preventDefault();
      applyZoom(ui.zoom / 1.2);
      return;
    }
    if (evt.key === "0") {
      evt.preventDefault();
      applyZoom(1);
      return;
    }
  }

  if ((evt.ctrlKey || evt.metaKey) && !evt.shiftKey && evt.key.toLowerCase() === "z") {
    if (isEditingUiLocked()) {
      evt.preventDefault();
      return;
    }
    evt.preventDefault();
    undo();
    return;
  }

  if (
    (evt.ctrlKey || evt.metaKey) &&
    (evt.key.toLowerCase() === "y" || (evt.shiftKey && evt.key.toLowerCase() === "z"))
  ) {
    if (isEditingUiLocked()) {
      evt.preventDefault();
      return;
    }
    evt.preventDefault();
    redo();
    return;
  }

  // macOS reports the physical Delete key as Backspace; fn+Delete continues
  // to report Delete. Leave both keys available for text editing controls.
  if ((evt.key === "Delete" || evt.key === "Backspace") && !isTypingTarget(evt.target)) {
    evt.preventDefault();
    if (isEditingUiLocked()) {
      return;
    }
    removeSelected();
    return;
  }

  if (evt.key === "Escape") {
    hideContextMenu();
    closeTopMenus();
    if (ui.drag || ui.resize || ui.edgeCreate || ui.controlPointDrag || ui.edgeLabelDrag || ui.edgeLabelRotate || ui.marquee) {
      cancelTransaction();
      ui.drag = null;
      ui.resize = null;
      ui.edgeCreate = null;
      ui.edgeCreateHoverId = null;
      ui.edgeCreateLastPoint = null;
      ui.controlPointDrag = null;
      ui.edgeLabelDrag = null;
      ui.edgeLabelRotate = null;
      ui.marquee = null;
      stopTimedExecution(false);
      setStatusKey("status.cancelOp");
      render();
    }
  }
});

window.addEventListener("pointerdown", (evt) => {
  if (!contextMenu.contains(evt.target)) {
    hideContextMenu();
  }
  if (!topMenuBar.contains(evt.target)) {
    closeTopMenus();
  }
  if (
    isCompactTabletLayout()
    && ui.tabletSidebarOpen
    && !evt.target.closest?.(".sidebar, #tabletSidebarToggle, .menu-bar, .context-menu, .modal-overlay")
  ) {
    setTabletSidebarOpen(false);
  }
});

window.addEventListener("resize", () => {
  updateCanvasSize();
  applyResponsiveUiState();
  const openMenuRoot = menuRoots.find((root) => root.classList.contains("open"));
  if (openMenuRoot) {
    positionCompactTopMenu(openMenuRoot);
  }
});

async function boot() {
  restoreVisualThemePreferences();
  applyVisualTheme();
  await loadI18n();
  if (sidebarCollapseBtn) {
    sidebarCollapseBtn.addEventListener("click", () => {
      setSidebarCollapsed(true);
    });
  }
  if (sidebarExpandBtn) {
    sidebarExpandBtn.addEventListener("click", () => {
      setSidebarCollapsed(false);
    });
  }
  if (tabletSidebarToggle) {
    tabletSidebarToggle.addEventListener("click", () => {
      setTabletSidebarOpen(!ui.tabletSidebarOpen);
    });
  }
  if (tabletSidebarBackdrop) {
    tabletSidebarBackdrop.addEventListener("click", () => {
      setTabletSidebarOpen(false);
    });
  }
  if (tabletSidebarExpandBtn) {
    tabletSidebarExpandBtn.addEventListener("click", () => {
      setTabletSidebarExpanded(!ui.tabletSidebarExpanded);
    });
  }
  if (tabletSidebarCloseBtn) {
    tabletSidebarCloseBtn.addEventListener("click", () => {
      setTabletSidebarOpen(false);
    });
  }
  if (tabletSidebarHeader) {
    tabletSidebarHeader.addEventListener("pointerdown", (evt) => {
      if (!isCompactTouchPointerEvent(evt) || evt.target.closest("button")) {
        return;
      }
      evt.currentTarget?.setPointerCapture?.(evt.pointerId);
      ui.tabletSidebarDrag = {
        pointerId: evt.pointerId,
        startClientY: evt.clientY,
        startExpanded: ui.tabletSidebarExpanded,
      };
    });
    tabletSidebarHeader.addEventListener("click", (evt) => {
      if (evt.target.closest("button")) {
        return;
      }
      setTabletSidebarExpanded(!ui.tabletSidebarExpanded);
    });
  }
  await recentModelsStore.loadFromStorage();
  renderRecentModelsMenu();

  history.undo = [];
  history.redo = [];
  updateZoomButtons();
  applyCanvasVisibility();
  applyResponsiveUiState();
  workspace.tabs = [];
  workspace.activeTabId = null;
  workspace.nextTabId = 1;
  createWorkspaceTabFromCurrentState({ activate: true });
  updateModelRunButtons();
  setStatusKey("status.ready");
  render();
  window.requestAnimationFrame(() => {
    markSavedSnapshot();
  });
}

boot().catch((err) => {
  const message = err?.stack || err?.message || String(err);
  window.__stgraphxBootError = String(message);
  console.error(err);
  if (statusText) {
    statusText.textContent = String(message);
  }
});
