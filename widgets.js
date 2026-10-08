/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 * Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.
 */

(() => {

const graphFunctionHelpers = globalThis.GraphFunctions?.helpers || {};

function runWidgetAction(mutator) {
  return runAction(mutator);
}

function addTableWidget(at = null) {
  const id = widgetCounter++;
  const { x, y } = getSmartCanvasInsertionPoint({ width: 320, height: 160, anchor: at });
  graph.widgets.push({
    id,
    type: "table",
    customTitle: "",
    x,
    y,
    width: 320,
    height: 160,
    minimized: false,
    showTitleBar: true,
    fontSize: 13,
    outputOnly: false,
    showHistory: false,
    expandNonScalarValues: false,
    tableTextAlign: "left",
    tableDecimalDigits: null,
    tableScrolling: "last",
    rows: [],
    columns: [],
  });
}

function addCanvasText(at = null) {
  const id = textItemCounter++;
  const { x, y } = getSmartCanvasInsertionPoint({ width: 240, height: 90, anchor: at });
  graph.textItems.push({
    id,
    x,
    y,
    width: 240,
    height: 90,
    fillColor: "",
    strokeColor: "",
    html: `<p><strong>${t("menu.insert.text")}</strong></p><p>${t("text.defaultCanvasText")}</p>`,
  });
  selectTextItem(id);
}

function addMatrixWidget(at = null) {
  const id = widgetCounter++;
  const { x, y } = getSmartCanvasInsertionPoint({ width: 260, height: 190, anchor: at });
  graph.widgets.push({
    id,
    type: "matrix",
    customTitle: "",
    x,
    y,
    width: 260,
    height: 190,
    minimized: false,
    showTitleBar: true,
    fontSize: 13,
    outputOnly: true,
    source: "",
    showNumericValues: true,
    showIndices: true,
    autoFitCells: true,
    cellSize: 28,
    colorScheme: "blue",
    viewMode: "grid",
    surfaceStyle: "solid",
    surfaceAzimuth: 45,
    surfaceElevation: 32,
    surfaceHeightScale: 1,
    valueMin: null,
    valueMax: null,
    displayRows: null,
    displayCols: null,
    rows: [],
    columns: [],
    xyPairs: [],
  });
}

function sortedWidgetNodeNames(nodes) {
  return nodes
    .map((node) => String(node?.name ?? "").trim())
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }));
}

function outputWidgetNodeNames() {
  return sortedWidgetNodeNames(graph.nodes.filter((node) => node.output));
}

function addLedWidget(at = null) {
  const id = widgetCounter++;
  const { x, y } = getSmartCanvasInsertionPoint({ width: 170, height: 96, anchor: at });
  const outputNames = outputWidgetNodeNames();
  graph.widgets.push({
    id,
    type: "led",
    customTitle: "",
    x,
    y,
    width: 170,
    height: 96,
    minimized: false,
    showTitleBar: true,
    fontSize: 13,
    outputOnly: true,
    source: outputNames[0] || "",
    falseLabel: "",
    trueLabel: "",
    rows: [],
    columns: [],
    xyPairs: [],
  });
}

function addSliderWidget(at = null) {
  const id = widgetCounter++;
  const { x, y } = getSmartCanvasInsertionPoint({ width: 260, height: 96, anchor: at });
  graph.widgets.push({
    id,
    type: "slider",
    customTitle: "",
    x,
    y,
    width: 260,
    height: 96,
    minimized: false,
    showTitleBar: true,
    fontSize: 13,
    outputOnly: false,
    source: "",
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    rows: [],
    columns: [],
    xyPairs: [],
  });
}

function addButtonWidget(at = null) {
  const id = widgetCounter++;
  const { x, y } = getSmartCanvasInsertionPoint({ width: 190, height: 88, anchor: at });
  graph.widgets.push({
    id,
    type: "button",
    customTitle: "",
    x,
    y,
    width: 190,
    height: 88,
    minimized: false,
    showTitleBar: true,
    fontSize: 13,
    outputOnly: false,
    source: "",
    value: false,
    initialValue: false,
    buttonMode: "toggle",
    falseLabel: "",
    trueLabel: "",
    rows: [],
    columns: [],
    xyPairs: [],
  });
}

function addSelectWidget(at = null) {
  const id = widgetCounter++;
  const { x, y } = getSmartCanvasInsertionPoint({ width: 240, height: 92, anchor: at });
  graph.widgets.push({
    id,
    type: "select",
    customTitle: "",
    x,
    y,
    width: 240,
    height: 92,
    minimized: false,
    showTitleBar: true,
    fontSize: 13,
    outputOnly: false,
    source: "",
    value: 0,
    options: [
      { label: t("widget.selectOption.1"), value: 0 },
      { label: t("widget.selectOption.2"), value: 1 },
    ],
    rows: [],
    columns: [],
    xyPairs: [],
  });
}

function addTextWidget(at = null) {
  const id = widgetCounter++;
  const { x, y } = getSmartCanvasInsertionPoint({ width: 220, height: 92, anchor: at });
  const outputNames = outputWidgetNodeNames();
  graph.widgets.push({
    id,
    type: "text",
    customTitle: "",
    x,
    y,
    width: 220,
    height: 92,
    minimized: false,
    showTitleBar: true,
    fontSize: 13,
    outputOnly: true,
    source: outputNames[0] || "",
    mappings: [],
    rows: [],
    columns: [],
    xyPairs: [],
  });
}

function addXYChartWidget(at = null) {
  const id = widgetCounter++;
  const { x, y } = getSmartCanvasInsertionPoint({ width: 320, height: 210, anchor: at });
  const nodeNames = outputWidgetNodeNames();
  graph.widgets.push({
    id,
    type: "xychart",
    customTitle: "",
    x,
    y,
    width: 320,
    height: 210,
    minimized: false,
    showTitleBar: true,
    fontSize: 13,
    outputOnly: false,
    xMin: null,
    xMax: null,
    yMin: null,
    yMax: null,
    xAxisLabel: "",
    yAxisLabel: "",
    showGrid: true,
    legendPosition: "top-right",
    xyPairs: [
      {
        xSource: "time",
        ySource: nodeNames[0] || "",
        visualizedLabel: "",
        showTimeSeries: true,
        showInstantProfile: false,
        color: defaultChartSeriesColor(0),
        pointColor: defaultChartSeriesColor(0),
        showLine: true,
        lineWidth: 2.2,
        lineStyle: "solid",
        pointMode: "all",
        pointSize: 2.4,
        points: [],
      },
    ],
    columns: [],
  });
}

function addBarPlotWidget(at = null) {
  const id = widgetCounter++;
  const { x, y } = getSmartCanvasInsertionPoint({ width: 320, height: 210, anchor: at });
  const nodeNames = outputWidgetNodeNames();
  graph.widgets.push({
    id, type: "barplot", customTitle: "", x, y, width: 320, height: 210,
    minimized: false, showTitleBar: true, fontSize: 13, outputOnly: true,
    xMin: null, xMax: null, yMin: null, yMax: null, xAxisLabel: "", yAxisLabel: "", showGrid: true, legendPosition: "none", barWidth: 0.8, showXTicks: true, xTickLabels: [],
    xyPairs: [{ xSource: nodeNames[0] || "", ySource: nodeNames[1] || nodeNames[0] || "", visualizedLabel: "", showTimeSeries: false, showInstantProfile: true, color: defaultChartSeriesColor(0), pointColor: defaultChartSeriesColor(0), showLine: false, lineWidth: 2.2, lineStyle: "solid", pointMode: "none", pointSize: 2.4, points: [] }],
    columns: [],
  });
}

function getNodeByName(name) {
  return graph.nodes.find((n) => n.name === name);
}

function buildNodeNameMap() {
  return new Map(graph.nodes.map((node) => [String(node.name ?? ""), node]));
}

function getModelNodeByName(model, name) {
  return model?.nodes?.find((node) => node.name === name) || null;
}

function getModelNodeById(model, id) {
  return model?.nodes?.find((node) => node.id === id) || null;
}

function buildModelNodeNameMap(model) {
  return new Map((model?.nodes || []).map((node) => [String(node.name ?? ""), node]));
}

function defaultChartSeriesColor(index = 0) {
  return CHART_SERIES_PALETTE[Math.abs(Number(index) || 0) % CHART_SERIES_PALETTE.length];
}

function normalizeChartPointMode(value, legacyShowPoints = null) {
  if (value === "none" || value === "last" || value === "all") {
    return value;
  }
  if (legacyShowPoints === false) {
    return "none";
  }
  return "all";
}

function normalizeChartSeriesToggle(value, fallback = false) {
  return value == null ? Boolean(fallback) : value !== false;
}

function normalizeChartLineStyle(value) {
  if (value === "solid" || value === "dashed" || value === "dotted") {
    return value;
  }
  return "solid";
}

function normalizeAxisLabel(value) {
  return String(value ?? "").trim().slice(0, 120);
}

function chartLineDash(style) {
  if (style === "dashed") {
    return [8, 5];
  }
  if (style === "dotted") {
    return [2, 4];
  }
  return [];
}

function sanitizeWidgetColumns(widget) {
  if (!Array.isArray(widget.columns)) {
    widget.columns = [];
    return;
  }
  widget.columns = widget.columns.map((col) => {
    if (typeof col === "string") {
      return col;
    }
    if (col && typeof col === "object") {
      if (typeof col.source === "string") {
        return col.source;
      }
      if (typeof col.name === "string") {
        return col.name;
      }
      if (typeof col.label === "string") {
        return col.label;
      }
    }
    return String(col ?? "");
  });
}

function sanitizeTableWidgetOptions(widget) {
  sanitizeWidgetPresentationOptions(widget);
  widget.showHistory = Boolean(widget.showHistory);
  widget.expandNonScalarValues = Boolean(widget.expandNonScalarValues) && !widget.showHistory;
  widget.tableTextAlign = ["left", "center", "right"].includes(String(widget.tableTextAlign ?? ""))
    ? String(widget.tableTextAlign)
    : "left";
  widget.tableDecimalDigits = Number.isInteger(Number(widget.tableDecimalDigits))
    && Number(widget.tableDecimalDigits) >= 0
    && Number(widget.tableDecimalDigits) <= 12
    ? Number(widget.tableDecimalDigits)
    : null;
  widget.tableScrolling = widget.tableScrolling === "first" ? "first" : "last";
  const rawColumnOptions = widget.tableColumnOptions && typeof widget.tableColumnOptions === "object"
    ? widget.tableColumnOptions
    : {};
  widget.tableColumnOptions = Object.fromEntries(
    Object.entries(rawColumnOptions).map(([name, options]) => {
      const align = ["left", "center", "right"].includes(String(options?.align ?? ""))
        ? String(options.align)
        : "";
      const decimalDigits = Number.isInteger(Number(options?.decimalDigits))
        && Number(options.decimalDigits) >= 0
        && Number(options.decimalDigits) <= 12
        ? Number(options.decimalDigits)
        : null;
      return [String(name), {
        label: String(options?.label ?? "").trim(),
        align,
        decimalDigits,
      }];
    }),
  );
  if (!Array.isArray(widget.rows)) {
    widget.rows = [];
  }
}

function sanitizeWidgetPresentationOptions(widget) {
  const legacyFontSize = Number(widget.tableFontSize);
  widget.fontSize = Number.isFinite(Number(widget.fontSize))
    ? clamp(Math.round(Number(widget.fontSize)), 8, 32)
    : (Number.isFinite(legacyFontSize) ? clamp(Math.round(legacyFontSize), 8, 32) : 13);
  widget.showTitleBar = widget.showTitleBar !== false;
}

function sanitizeMatrixWidgetOptions(widget) {
  const allowedNames = new Set(graph.nodes.filter((n) => n.output).map((n) => n.name));
  widget.source = String(widget.source ?? "");
  if (widget.source && !allowedNames.has(widget.source)) {
    widget.source = "";
  }
  widget.showNumericValues = widget.showNumericValues !== false;
  widget.showIndices = widget.showIndices !== false;
  widget.autoFitCells = widget.autoFitCells !== false;
  widget.cellSize = Number.isFinite(Number(widget.cellSize)) ? clamp(Number(widget.cellSize), 2, 96) : 28;
  const allowedPalettes = new Set(["blue", "heat", "grayscale", "diverging", "none"]);
  widget.colorScheme = allowedPalettes.has(String(widget.colorScheme ?? "")) ? String(widget.colorScheme) : "blue";
  widget.viewMode = ["grid", "surface"].includes(String(widget.viewMode ?? "")) ? String(widget.viewMode) : "grid";
  widget.surfaceStyle = ["solid", "wireframe"].includes(String(widget.surfaceStyle ?? ""))
    ? String(widget.surfaceStyle)
    : "solid";
  widget.surfaceAzimuth = Number.isFinite(Number(widget.surfaceAzimuth))
    ? clamp(Number(widget.surfaceAzimuth), -180, 180)
    : 45;
  widget.surfaceElevation = Number.isFinite(Number(widget.surfaceElevation))
    ? clamp(Number(widget.surfaceElevation), 5, 85)
    : 32;
  widget.surfaceHeightScale = Number.isFinite(Number(widget.surfaceHeightScale))
    ? clamp(Number(widget.surfaceHeightScale), 0.1, 10)
    : 1;
  const parseNullableNumber = (value) => {
    if (value === "" || value == null) {
      return null;
    }
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  };
  const parseNullablePositiveInt = (value) => {
    if (value === "" || value == null) {
      return null;
    }
    const n = Math.floor(Number(value));
    return Number.isFinite(n) && n > 0 ? n : null;
  };
  widget.valueMin = parseNullableNumber(widget.valueMin);
  widget.valueMax = parseNullableNumber(widget.valueMax);
  if (widget.valueMin != null && widget.valueMax != null && widget.valueMax < widget.valueMin) {
    const tmp = widget.valueMin;
    widget.valueMin = widget.valueMax;
    widget.valueMax = tmp;
  }
  widget.displayRows = parseNullablePositiveInt(widget.displayRows);
  widget.displayCols = parseNullablePositiveInt(widget.displayCols);
}

function sanitizeLedWidgetOptions(widget) {
  const allowedNames = new Set(graph.nodes.filter((n) => n.output).map((n) => n.name));
  widget.source = String(widget.source ?? "");
  if (widget.source && !allowedNames.has(widget.source)) {
    widget.source = "";
  }
  widget.falseLabel = String(widget.falseLabel ?? "").trim();
  widget.trueLabel = String(widget.trueLabel ?? "").trim();
}

function sanitizeWidgetXYPairs(widget) {
  if (!Array.isArray(widget.xyPairs)) {
    widget.xyPairs = [];
  }
  widget.xyPairs = widget.xyPairs
    .map((pair, idx) => ({
      xSource: String(pair?.xSource ?? "time"),
      ySource: String(pair?.ySource ?? ""),
      visualizedLabel: normalizeAxisLabel(pair?.visualizedLabel),
      showTimeSeries: normalizeChartSeriesToggle(pair?.showTimeSeries, pair?.seriesMode !== "instant"),
      showInstantProfile: normalizeChartSeriesToggle(pair?.showInstantProfile, pair?.seriesMode === "instant" ? true : false),
      color: /^#[0-9a-fA-F]{6}$/.test(String(pair?.color ?? "")) ? String(pair.color) : defaultChartSeriesColor(idx),
      pointColor: /^#[0-9a-fA-F]{6}$/.test(String(pair?.pointColor ?? "")) ? String(pair.pointColor) : (/^#[0-9a-fA-F]{6}$/.test(String(pair?.color ?? "")) ? String(pair.color) : defaultChartSeriesColor(idx)),
      showLine: pair?.showLine !== false,
      lineWidth: Number.isFinite(Number(pair?.lineWidth)) ? clamp(Number(pair.lineWidth), 1, 8) : 2.2,
      lineStyle: normalizeChartLineStyle(pair?.lineStyle),
      pointMode: normalizeChartPointMode(pair?.pointMode, pair?.showPoints),
      pointSize: Number.isFinite(Number(pair?.pointSize)) ? clamp(Number(pair.pointSize), 1, 12) : 2.4,
      seriesData: Array.isArray(pair?.seriesData)
        ? pair.seriesData.map((series) => ({
          label: String(series?.label ?? ""),
          points: Array.isArray(series?.points)
            ? series.points
              .map((p) => ({ x: Number(p?.x), y: Number(p?.y) }))
              .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y))
            : [],
        }))
        : [],
      instantSeriesData: Array.isArray(pair?.instantSeriesData)
        ? pair.instantSeriesData.map((series) => ({
          label: String(series?.label ?? ""),
          points: Array.isArray(series?.points)
            ? series.points
              .map((p) => ({ x: Number(p?.x), y: Number(p?.y) }))
              .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y))
            : [],
        }))
        : [],
      points: Array.isArray(pair?.points)
        ? pair.points
          .map((p) => ({ x: Number(p?.x), y: Number(p?.y) }))
          .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y))
        : [],
    }))
    .filter((pair) => pair.ySource || widget.type === "barplot");
}

function chartPairDefaultLabel(pair) {
  return `${pair?.xSource ?? ""} -> ${pair?.ySource ?? ""}`;
}

function chartPairLegendLabel(pair, fallback = "") {
  return normalizeAxisLabel(pair?.visualizedLabel) || fallback || chartPairDefaultLabel(pair);
}

function sanitizeXYChartOptions(widget) {
  const parseNumOrNull = (value) => {
    if (value == null) {
      return null;
    }
    if (typeof value === "string") {
      const trimmed = value.trim().toLowerCase();
      if (!trimmed || trimmed === "auto") {
        return null;
      }
    }
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  };
  widget.xMin = parseNumOrNull(widget.xMin);
  widget.xMax = parseNumOrNull(widget.xMax);
  widget.yMin = parseNumOrNull(widget.yMin);
  widget.yMax = parseNumOrNull(widget.yMax);
  widget.xAxisLabel = normalizeAxisLabel(widget.xAxisLabel);
  widget.yAxisLabel = normalizeAxisLabel(widget.yAxisLabel);
  widget.showGrid = widget.showGrid !== false;
  widget.legendPosition = ["none", "top-right", "top-left", "bottom-right", "bottom-left"].includes(String(widget.legendPosition ?? ""))
    ? String(widget.legendPosition)
    : "top-right";
}

function isFiniteScalar(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function isFiniteVector(value) {
  return Array.isArray(value) && value.every((item) => isFiniteScalar(item));
}

function buildChartPairSeriesDefinitions(pair, xValue, yValue) {
  if (isFiniteScalar(xValue) && isFiniteScalar(yValue)) {
    return [
      {
        label: `${pair.xSource} -> ${pair.ySource}`,
        point: { x: xValue, y: yValue },
      },
    ];
  }

  if (isFiniteScalar(xValue) && isFiniteVector(yValue)) {
    return yValue.map((item) => ({
      label: `${pair.xSource} -> ${pair.ySource}`,
      point: { x: xValue, y: item },
    }));
  }

  if (isFiniteVector(xValue) && isFiniteVector(yValue) && xValue.length === yValue.length) {
    return xValue.map((xItem, idx) => ({
      label: `${pair.xSource} -> ${pair.ySource}`,
      point: { x: xItem, y: yValue[idx] },
    }));
  }

  return [];
}

function buildChartPairInstantSeriesDefinitions(pair, xValue, yValue) {
  if (isFiniteScalar(xValue) && isFiniteVector(yValue)) {
    return [
      {
        label: `${pair.xSource} -> ${pair.ySource}`,
        points: yValue.map((item) => ({ x: xValue, y: item })),
      },
    ];
  }

  if (isFiniteVector(xValue) && isFiniteVector(yValue) && xValue.length === yValue.length) {
    return [
      {
        label: `${pair.xSource} -> ${pair.ySource}`,
        points: xValue.map((xItem, idx) => ({ x: xItem, y: yValue[idx] })),
      },
    ];
  }

  return [];
}

function sanitizeSliderWidgetOptions(widget) {
  const parseFinite = (value, fallback) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };
  const allowedNames = new Set(sliderBindableNodeNames(widget.id, widget.source));
  widget.source = String(widget.source ?? "");
  if (widget.source && !allowedNames.has(widget.source)) {
    widget.source = "";
  }
  widget.min = parseFinite(widget.min, 0);
  widget.max = parseFinite(widget.max, 100);
  if (widget.max < widget.min) {
    const tmp = widget.min;
    widget.min = widget.max;
    widget.max = tmp;
  }
  widget.step = Math.abs(parseFinite(widget.step, 1));
  if (!Number.isFinite(widget.step) || widget.step <= 0) {
    widget.step = 1;
  }
  widget.value = parseFinite(widget.value, widget.min);
  if (widget.value < widget.min) {
    widget.value = widget.min;
  }
  if (widget.value > widget.max) {
    widget.value = widget.max;
  }
}

function sanitizeButtonWidgetOptions(widget) {
  const allowedNames = new Set(buttonBindableNodeNames(widget.id, widget.source));
  widget.source = String(widget.source ?? "");
  if (widget.source && !allowedNames.has(widget.source)) {
    widget.source = "";
  }
  const normalizedValue = widget.value === true || widget.value === "true" || widget.value === 1 || widget.value === "1";
  const normalizedInitialValue = widget.initialValue === true || widget.initialValue === "true" || widget.initialValue === 1 || widget.initialValue === "1";
  widget.value = normalizedValue;
  widget.initialValue = normalizedInitialValue;
  widget.buttonMode = widget.buttonMode === "momentary" ? "momentary" : "toggle";
  widget.falseLabel = String(widget.falseLabel ?? "").trim();
  widget.trueLabel = String(widget.trueLabel ?? "").trim();
}

function normalizeSelectWidgetOptions(options) {
  const normalized = Array.isArray(options)
    ? options.map((option, idx) => ({
      label: String(option?.label ?? "").trim() || t("widget.selectOption.n", { index: idx + 1 }),
      value: Number.isFinite(Number(option?.value)) ? Number(option.value) : idx,
    }))
    : [];
  if (normalized.length === 0) {
    normalized.push(
      { label: t("widget.selectOption.1"), value: 0 },
      { label: t("widget.selectOption.2"), value: 1 },
    );
  }
  return normalized;
}

function sanitizeSelectWidgetOptions(widget) {
  const allowedNames = new Set(selectBindableNodeNames(widget.id, widget.source));
  widget.source = String(widget.source ?? "");
  if (widget.source && !allowedNames.has(widget.source)) {
    widget.source = "";
  }
  widget.options = normalizeSelectWidgetOptions(widget.options);
  const allowedValues = new Set(widget.options.map((option) => option.value));
  const numericValue = Number(widget.value);
  widget.value = allowedValues.has(numericValue) ? numericValue : widget.options[0].value;
}

function sanitizeTextWidgetOptions(widget) {
  const allowedNames = new Set(graph.nodes.filter((n) => n.output).map((n) => n.name));
  widget.source = String(widget.source ?? "");
  if (widget.source && !allowedNames.has(widget.source)) {
    widget.source = "";
  }
  widget.mappings = Array.isArray(widget.mappings)
    ? widget.mappings.map((mapping) => ({
      value: Number.isFinite(Number(mapping?.value)) ? Number(mapping.value) : 0,
      label: String(mapping?.label ?? ""),
    }))
    : [];
}

function isFiniteMatrix(value) {
  return Array.isArray(value)
    && value.length >= 0
    && value.every((row) => Array.isArray(row))
    && (value.length === 0 || value.every((row) => row.length === value[0].length))
    && value.every((row) => row.every((item) => isFiniteScalar(item)));
}

function snapSliderValue(value, min, max, step) {
  const raw = Number(value);
  const minVal = Number(min);
  const maxVal = Number(max);
  const stepVal = Math.abs(Number(step));
  if (!Number.isFinite(raw) || !Number.isFinite(minVal) || !Number.isFinite(maxVal)) {
    return 0;
  }
  const clamped = clamp(raw, minVal, maxVal);
  if (!Number.isFinite(stepVal) || stepVal <= 0) {
    return clamped;
  }
  const snapped = minVal + Math.round((clamped - minVal) / stepVal) * stepVal;
  const stepText = String(stepVal);
  const dotIndex = stepText.indexOf(".");
  const decimals = dotIndex >= 0 ? stepText.length - dotIndex - 1 : 0;
  return Number(clamp(snapped, minVal, maxVal).toFixed(Math.min(10, decimals)));
}

function applyWidgetDrivenNodeValues() {
  graph.nodes.forEach((node) => {
    node.externalValueEnabled = false;
    node.externalValue = null;
  });
  graph.widgets.forEach((widget) => {
    if (widget.type === "slider") {
      applySliderWidgetValueToNode(widget);
    } else if (widget.type === "button") {
      applyButtonWidgetValueToNode(widget);
    } else if (widget.type === "select") {
      applySelectWidgetValueToNode(widget);
    }
  });
}

function applySliderWidgetValueToNode(widget) {
  if (!widget || widget.type !== "slider") {
    return;
  }
  sanitizeSliderWidgetOptions(widget);
  if (!widget.source) {
    return;
  }
  const node = getNodeByName(widget.source);
  if (!canBindSliderToNode(node)) {
    return;
  }
  const value = Number(widget.value);
  node.externalValueEnabled = true;
  node.externalValue = value;
  node.computedValue = value;
  node.computedError = "";
}

function applyButtonWidgetValueToNode(widget) {
  if (!widget || widget.type !== "button") {
    return;
  }
  sanitizeButtonWidgetOptions(widget);
  if (!widget.source) {
    return;
  }
  const node = getNodeByName(widget.source);
  if (!canBindButtonToNode(node)) {
    return;
  }
  const value = widget.value ? 1 : 0;
  node.externalValueEnabled = true;
  node.externalValue = value;
  node.computedValue = value;
  node.computedError = "";
}

function applySelectWidgetValueToNode(widget) {
  if (!widget || widget.type !== "select") {
    return;
  }
  sanitizeSelectWidgetOptions(widget);
  if (!widget.source) {
    return;
  }
  const node = getNodeByName(widget.source);
  if (!canBindSliderToNode(node)) {
    return;
  }
  const value = Number(widget.value);
  node.externalValueEnabled = true;
  node.externalValue = value;
  node.computedValue = value;
  node.computedError = "";
}

function resetModelExternalValues(model) {
  (model?.nodes || []).forEach((node) => {
    node.externalValueEnabled = false;
    node.externalValue = null;
  });
}

function applyRuntimeModelInputOverrides(model, inputValueMap = new Map()) {
  resetModelExternalValues(model);
  inputValueMap.forEach((value, name) => {
    const node = getModelNodeByName(model, name);
    if (!node) {
      return;
    }
    node.externalValueEnabled = true;
    node.externalValue = value;
    node.computedValue = value;
    node.computedError = "";
  });
}

function canvasThemePalette() {
  const classList = globalThis.document?.body?.classList;
  const minimalist = Boolean(classList?.contains("ui-theme-minimalist"));
  const night = minimalist && Boolean(classList?.contains("ui-minimalist-night"));
  if (night) {
    return {
      background: "#000000",
      plotBorder: "#5b5b5b",
      grid: "#282828",
      axis: "#a8a8a8",
      tick: "#6d6d6d",
      text: "#f0f0ec",
      legendBackground: "rgba(14, 14, 14, 0.94)",
      legendBorder: "#454545",
      legendText: "#f0f0ec",
    };
  }
  if (minimalist) {
    return {
      background: "#ffffff",
      plotBorder: "#cbd5e1",
      grid: "#e2e8f0",
      axis: "#64748b",
      tick: "#94a3b8",
      text: "#343936",
      legendBackground: "rgba(255, 255, 255, 0.94)",
      legendBorder: "#dfe3e8",
      legendText: "#252a27",
    };
  }
  return {
    background: "#ffffff",
    plotBorder: "#c4d3df",
    grid: "#d3dee8",
    axis: "#aebfd0",
    tick: "#b8c8d8",
    text: "#4e6072",
    legendBackground: "rgba(255, 255, 255, 0.88)",
    legendBorder: "#d2dde7",
    legendText: "#334b60",
  };
}

function drawXYChart(canvas, seriesList = [], options = null) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  const drawRoundedRectPath = (x, y, w, h, r) => {
    const radius = Math.max(0, Math.min(r, w / 2, h / 2));
    if (typeof ctx.roundRect === "function") {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, radius);
      return;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  };
  const width = canvas.width;
  const height = canvas.height;
  const palette = canvasThemePalette();
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = palette.background;
  ctx.fillRect(0, 0, width, height);

  const activeSeries = (Array.isArray(seriesList) ? seriesList : [])
    .map((s, idx) => ({
      label: String(s?.label ?? ""),
      color: /^#[0-9a-fA-F]{6}$/.test(String(s?.color ?? "")) ? String(s.color) : defaultChartSeriesColor(idx),
      pointColor: /^#[0-9a-fA-F]{6}$/.test(String(s?.pointColor ?? "")) ? String(s.pointColor) : (/^#[0-9a-fA-F]{6}$/.test(String(s?.color ?? "")) ? String(s.color) : defaultChartSeriesColor(idx)),
      showLine: s?.showLine !== false,
      lineWidth: Number.isFinite(Number(s?.lineWidth)) ? clamp(Number(s.lineWidth), 1, 8) : 2.2,
      lineStyle: normalizeChartLineStyle(s?.lineStyle),
      pointMode: normalizeChartPointMode(s?.pointMode, s?.showPoints),
      pointSize: Number.isFinite(Number(s?.pointSize)) ? clamp(Number(s.pointSize), 1, 12) : 2.4,
      points: Array.isArray(s?.points)
        ? s.points
          .map((p) => ({ x: Number(p?.x), y: Number(p?.y) }))
          .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y))
        : [],
    }))
    .filter((s) => s.points.length > 0 && (s.showLine || s.pointMode !== "none"));

  if (activeSeries.length < 1) {
    return;
  }

  const parseAxisLimit = (value) => {
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
  };

  const cfg = {
    xMin: parseAxisLimit(options?.xMin),
    xMax: parseAxisLimit(options?.xMax),
    yMin: parseAxisLimit(options?.yMin),
    yMax: parseAxisLimit(options?.yMax),
    xAxisLabel: normalizeAxisLabel(options?.xAxisLabel),
    yAxisLabel: normalizeAxisLabel(options?.yAxisLabel),
    showGrid: options?.showGrid !== false,
    legendPosition: ["none", "top-right", "top-left", "bottom-right", "bottom-left"].includes(String(options?.legendPosition ?? ""))
      ? String(options.legendPosition)
      : "top-right",
  };
  const fontSize = Number.isFinite(Number(options?.fontSize))
    ? clamp(Math.round(Number(options.fontSize)), 8, 24)
    : 11;
  const chartFont = `${fontSize}px "Noto Sans", "DejaVu Sans", "Liberation Sans", Arial, sans-serif`;

  let minX = activeSeries[0].points[0].x;
  let maxX = activeSeries[0].points[0].x;
  let minY = activeSeries[0].points[0].y;
  let maxY = activeSeries[0].points[0].y;
  activeSeries.forEach((series) => {
    series.points.forEach((p) => {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    });
  });
  if (cfg.xMin != null && cfg.xMax != null && cfg.xMax > cfg.xMin) {
    minX = cfg.xMin;
    maxX = cfg.xMax;
  }
  if (cfg.yMin != null && cfg.yMax != null && cfg.yMax > cfg.yMin) {
    minY = cfg.yMin;
    maxY = cfg.yMax;
  }
  if (minX === maxX) {
    minX -= 1;
    maxX += 1;
  }
  if (minY === maxY) {
    minY -= 1;
    maxY += 1;
  }

  const niceStep = (span, approxTicks = 5) => {
    const raw = Math.abs(span) / Math.max(1, approxTicks);
    if (!Number.isFinite(raw) || raw <= 0) {
      return 1;
    }
    const power = 10 ** Math.floor(Math.log10(raw));
    const scaled = raw / power;
    let base = 1;
    if (scaled <= 1) {
      base = 1;
    } else if (scaled <= 2) {
      base = 2;
    } else if (scaled <= 5) {
      base = 5;
    } else {
      base = 10;
    }
    return base * power;
  };

  const buildTicks = (min, max, approxTicks = 5) => {
    const span = max - min;
    if (!Number.isFinite(span) || span <= 0) {
      return [min];
    }
    const step = niceStep(span, approxTicks);
    const start = Math.ceil(min / step) * step;
    const ticks = [min];
    for (let value = start; value < max; value += step) {
      if (Math.abs(value - min) < step * 0.25 || Math.abs(value - max) < step * 0.25) {
        continue;
      }
      ticks.push(Number(value.toFixed(12)));
    }
    ticks.push(max);
    return ticks.filter((value, index, arr) => index === 0 || Math.abs(value - arr[index - 1]) > step * 0.25);
  };

  ctx.font = chartFont;
  const provisionalXTicks = buildTicks(minX, maxX, Math.max(4, Math.floor((width - 48) / 90)));
  const provisionalYTicks = buildTicks(minY, maxY, Math.max(4, Math.floor((height - 48) / 60)));
  const maxYLabelWidth = provisionalYTicks.reduce((max, tick) => {
    const label = formatNumberValue(tick);
    return Math.max(max, ctx.measureText(label).width);
  }, 0);
  const leftPad = Math.max(30, Math.ceil(maxYLabelWidth) + 14)
    + (cfg.yAxisLabel ? fontSize + 10 : 0);
  const rightPad = 24;
  const topPad = 24;
  const bottomPad = Math.max(30, fontSize + 19)
    + (cfg.xAxisLabel ? fontSize + 10 : 0);
  const plotW = Math.max(10, width - leftPad - rightPad);
  const plotH = Math.max(10, height - topPad - bottomPad);

  ctx.strokeStyle = palette.plotBorder;
  ctx.lineWidth = 1;
  ctx.strokeRect(leftPad, topPad, plotW, plotH);

  const sx = (x) => leftPad + ((x - minX) / (maxX - minX)) * plotW;
  const sy = (y) => topPad + plotH - ((y - minY) / (maxY - minY)) * plotH;
  const xTicks = buildTicks(minX, maxX, Math.max(4, Math.floor(plotW / 90)));
  const yTicks = buildTicks(minY, maxY, Math.max(4, Math.floor(plotH / 60)));
  const chartPointBudget = Math.max(200, Math.floor(plotW * 2));
  const sampleSeriesPoints = (points) => {
    if (!Array.isArray(points) || points.length <= chartPointBudget) {
      return points;
    }
    const stride = Math.max(1, Math.ceil(points.length / chartPointBudget));
    const sampled = [];
    for (let i = 0; i < points.length; i += stride) {
      sampled.push(points[i]);
    }
    if (sampled[sampled.length - 1] !== points[points.length - 1]) {
      sampled.push(points[points.length - 1]);
    }
    return sampled;
  };

  if (cfg.showGrid) {
    ctx.strokeStyle = palette.grid;
    ctx.lineWidth = 1;
    xTicks.slice(1, -1).forEach((tick) => {
      const gx = sx(tick);
      ctx.beginPath();
      ctx.moveTo(gx, topPad);
      ctx.lineTo(gx, topPad + plotH);
      ctx.stroke();
    });
    yTicks.slice(1, -1).forEach((tick) => {
      const gy = sy(tick);
      ctx.beginPath();
      ctx.moveTo(leftPad, gy);
      ctx.lineTo(leftPad + plotW, gy);
      ctx.stroke();
    });
  }

  ctx.strokeStyle = palette.axis;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(leftPad, topPad + plotH);
  ctx.lineTo(leftPad + plotW, topPad + plotH);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(leftPad, topPad);
  ctx.lineTo(leftPad, topPad + plotH);
  ctx.stroke();

  activeSeries.forEach((series, s) => {
    const color = series.color || defaultChartSeriesColor(s);
    // Decimation is appropriate for a continuous path, but not for a scatter
    // plot: dropping samples changes the displayed population (for example,
    // an iterated-function-system fractal). Keep every requested point.
    const linePoints = series.showLine ? sampleSeriesPoints(series.points) : [];
    ctx.strokeStyle = color;
    ctx.lineWidth = series.lineWidth;
    ctx.setLineDash(chartLineDash(series.lineStyle));
    if (series.showLine) {
      ctx.beginPath();
      let moved = false;
      linePoints.forEach((p) => {
        const x = sx(p.x);
        const y = sy(p.y);
        if (!moved) {
          ctx.moveTo(x, y);
          moved = true;
        } else {
          ctx.lineTo(x, y);
        }
      });
      if (moved) {
        ctx.stroke();
      }
    }
    ctx.setLineDash([]);
    if (series.pointMode !== "none") {
      ctx.fillStyle = series.pointColor || color;
      const pointsToDraw = series.pointMode === "last"
        ? [series.points[series.points.length - 1]].filter(Boolean)
        : series.points;
      pointsToDraw.forEach((p) => {
        const x = sx(p.x);
        const y = sy(p.y);
        if (series.pointSize <= 1) {
          ctx.fillRect(Math.round(x - 1), Math.round(y - 1), 2, 2);
          return;
        }
        ctx.beginPath();
        ctx.arc(x, y, series.pointSize, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  });

  ctx.strokeStyle = palette.tick;
  ctx.lineWidth = 1;
  xTicks.forEach((tick) => {
    const x = sx(tick);
    ctx.beginPath();
    ctx.moveTo(x, topPad + plotH);
    ctx.lineTo(x, topPad + plotH + 4);
    ctx.stroke();
  });
  yTicks.forEach((tick) => {
    const y = sy(tick);
    ctx.beginPath();
    ctx.moveTo(leftPad - 4, y);
    ctx.lineTo(leftPad, y);
    ctx.stroke();
  });

  ctx.fillStyle = palette.text;
  ctx.textBaseline = "top";
  ctx.textAlign = "center";
  xTicks.forEach((tick, index) => {
    const label = formatNumberValue(tick);
    const x = sx(tick);
    if (index === 0) {
      ctx.textAlign = "left";
      ctx.fillText(label, leftPad, topPad + plotH + 8);
    } else if (index === xTicks.length - 1) {
      ctx.textAlign = "right";
      ctx.fillText(label, leftPad + plotW, topPad + plotH + 8);
    } else {
      ctx.textAlign = "center";
      ctx.fillText(label, x, topPad + plotH + 8);
    }
  });
  ctx.textAlign = "right";
  yTicks.forEach((tick, index) => {
    const label = formatNumberValue(tick);
    const y = sy(tick);
    if (index === 0) {
      ctx.fillText(label, leftPad - 8, topPad + plotH - 6);
    } else if (index === yTicks.length - 1) {
      ctx.fillText(label, leftPad - 8, topPad - 6);
    } else {
      ctx.fillText(label, leftPad - 8, y - 6);
    }
  });

  if (cfg.xAxisLabel) {
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(cfg.xAxisLabel, leftPad + plotW / 2, height - 3);
  }
  if (cfg.yAxisLabel) {
    ctx.save();
    ctx.translate(Math.max(fontSize, 11), topPad + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(cfg.yAxisLabel, 0, 0);
    ctx.restore();
  }

  const legendSeries = [];
  const seenLegendLabels = new Set();
  activeSeries.forEach((series, idx) => {
    const key = String(series.label || `s${idx + 1}`);
    if (seenLegendLabels.has(key)) {
      return;
    }
    seenLegendLabels.add(key);
    legendSeries.push({ ...series, legendIndex: idx });
  });
  const visibleLegend = legendSeries.slice(0, 10);
  if (cfg.legendPosition !== "none" && visibleLegend.length > 0) {
  ctx.font = chartFont;
    const sampleWidth = 18;
    const sampleGap = 8;
    const rowHeight = Math.max(18, fontSize + 7);
    const legendPaddingX = 10;
    const legendPaddingY = 8;
    const maxLabelWidth = visibleLegend.reduce((max, series, idx) => {
      return Math.max(max, ctx.measureText(series.label || `s${idx + 1}`).width);
    }, 0);
    const legendWidth = Math.ceil(legendPaddingX * 2 + sampleWidth + sampleGap + maxLabelWidth);
    const legendHeight = Math.ceil(legendPaddingY * 2 + visibleLegend.length * rowHeight);
    let legendLeft = leftPad + plotW - legendWidth - 8;
    let legendTop = topPad + 8;
    if (cfg.legendPosition === "top-left") {
      legendLeft = leftPad + 8;
      legendTop = topPad + 8;
    } else if (cfg.legendPosition === "bottom-right") {
      legendLeft = leftPad + plotW - legendWidth - 8;
      legendTop = topPad + plotH - legendHeight - 8;
    } else if (cfg.legendPosition === "bottom-left") {
      legendLeft = leftPad + 8;
      legendTop = topPad + plotH - legendHeight - 8;
    }

    ctx.fillStyle = palette.legendBackground;
    ctx.strokeStyle = palette.legendBorder;
    ctx.lineWidth = 1;
    drawRoundedRectPath(legendLeft, legendTop, legendWidth, legendHeight, 8);
    ctx.fill();
    ctx.stroke();

    visibleLegend.forEach((series, idx) => {
      const rowY = legendTop + legendPaddingY + idx * rowHeight + rowHeight / 2;
      const sampleX = legendLeft + legendPaddingX;
      ctx.strokeStyle = series.color || defaultChartSeriesColor(series.legendIndex ?? idx);
      ctx.lineWidth = series.lineWidth || 2.2;
      ctx.setLineDash(chartLineDash(series.lineStyle));
      ctx.beginPath();
      ctx.moveTo(sampleX, rowY);
      ctx.lineTo(sampleX + sampleWidth, rowY);
      ctx.stroke();
      ctx.setLineDash([]);
      if (series.pointMode !== "none") {
        ctx.fillStyle = series.pointColor || series.color || defaultChartSeriesColor(series.legendIndex ?? idx);
        ctx.beginPath();
        ctx.arc(sampleX + sampleWidth / 2, rowY, Math.min(3, series.pointSize || 2.4), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = palette.legendText;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(series.label || `s${idx + 1}`, sampleX + sampleWidth + sampleGap, rowY);
    });
    ctx.textBaseline = "top";
  }
}

function drawBarPlot(canvas, seriesList = [], options = {}) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const palette = canvasThemePalette();
  const bars = seriesList.flatMap((series, index) => (series.points || []).map((point) => ({
    x: Number(point.x), y: Number(point.y), color: series.color || defaultChartSeriesColor(index),
  }))).filter((bar) => Number.isFinite(bar.x) && Number.isFinite(bar.y));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = palette.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (!bars.length) return;
  let minX = Math.min(...bars.map((bar) => bar.x)); let maxX = Math.max(...bars.map((bar) => bar.x));
  let minY = Math.min(0, ...bars.map((bar) => bar.y)); let maxY = Math.max(0, ...bars.map((bar) => bar.y));
  const hasXMin = options.xMin != null && String(options.xMin).trim() !== "" && Number.isFinite(Number(options.xMin));
  const hasXMax = options.xMax != null && String(options.xMax).trim() !== "" && Number.isFinite(Number(options.xMax));
  [["xMin", "minX"], ["xMax", "maxX"], ["yMin", "minY"], ["yMax", "maxY"]].forEach(([key, target]) => {
    const raw = options[key];
    if (raw != null && String(raw).trim() !== "" && Number.isFinite(Number(raw))) { if (target === "minX") minX = Number(raw); else if (target === "maxX") maxX = Number(raw); else if (target === "minY") minY = Number(raw); else maxY = Number(raw); }
  });
  if (minX === maxX) { minX -= 1; maxX += 1; }
  if (minY === maxY) { minY -= 1; maxY += 1; }
  const uniqueX = [...new Set(bars.map((bar) => bar.x))].sort((a, b) => a - b);
  const gaps = uniqueX.slice(1).map((value, index) => value - uniqueX[index]).filter((gap) => gap > 0);
  const spacing = gaps.length ? Math.min(...gaps) : (maxX - minX);
  const widthFactor = clamp(Number(options.barWidth) || 0.8, 0.1, 1);
  // When axes are automatic, reserve half a bar at each side so outer bars
  // never touch or exceed the plot frame.
  if (!hasXMin) minX -= spacing * widthFactor / 2;
  if (!hasXMax) maxX += spacing * widthFactor / 2;
  const fontSize = Math.max(8, Number(options.fontSize) || 11);
  const xAxisLabel = normalizeAxisLabel(options.xAxisLabel);
  const yAxisLabel = normalizeAxisLabel(options.yAxisLabel);
  const left = 42 + (yAxisLabel ? fontSize + 10 : 0); const top = 18; const right = 18;
  const bottom = 30 + (xAxisLabel ? fontSize + 10 : 0);
  const plotW = Math.max(10, canvas.width - left - right); const plotH = Math.max(10, canvas.height - top - bottom);
  const sx = (value) => left + ((value - minX) / (maxX - minX)) * plotW;
  const sy = (value) => top + plotH - ((value - minY) / (maxY - minY)) * plotH;
  if (options.showGrid !== false) {
    ctx.strokeStyle = palette.grid; ctx.lineWidth = 1;
    for (let i = 1; i < 5; i += 1) { const y = top + plotH * i / 5; ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(left + plotW, y); ctx.stroke(); }
  }
  ctx.strokeStyle = palette.axis; ctx.lineWidth = 1.2; ctx.strokeRect(left, top, plotW, plotH);
  const zeroY = sy(0); ctx.beginPath(); ctx.moveTo(left, zeroY); ctx.lineTo(left + plotW, zeroY); ctx.stroke();
  const width = Math.max(2, Math.min(plotW / Math.max(1, bars.length) * widthFactor, Math.abs(sx(uniqueX[0] + spacing * widthFactor) - sx(uniqueX[0]))));
  bars.forEach((bar) => { const y = sy(bar.y); ctx.fillStyle = bar.color; ctx.fillRect(sx(bar.x) - width / 2, Math.min(y, zeroY), width, Math.abs(zeroY - y)); });
  ctx.fillStyle = palette.text; ctx.font = `${fontSize}px sans-serif`;
  const xLabels = new Map((Array.isArray(options.xTickLabels) ? options.xTickLabels : []).map((entry) => [Number(entry?.value), String(entry?.label ?? "")]).filter(([value, label]) => Number.isFinite(value) && label));
  if (options.showXTicks !== false) {
    ctx.textAlign = "center";
    uniqueX.forEach((value) => { ctx.fillText(xLabels.get(value) || formatNumberValue(value), sx(value), canvas.height - (xAxisLabel ? fontSize + 11 : 8)); });
  }
  ctx.textAlign = "right"; ctx.fillText(formatNumberValue(maxY), left - 7, top + 7); ctx.fillText(formatNumberValue(minY), left - 7, top + plotH);
  if (xAxisLabel) {
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(xAxisLabel, left + plotW / 2, canvas.height - 3);
    ctx.textBaseline = "alphabetic";
  }
  if (yAxisLabel) {
    ctx.save();
    ctx.translate(Math.max(fontSize, 11), top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(yAxisLabel, 0, 0);
    ctx.restore();
  }
}

function barPlotSeries(widget, nodeMap = buildNodeNameMap()) {
  const flatten = (value) => Array.isArray(value) ? value.flat(Infinity).map(Number) : [];
  return (widget.xyPairs || []).flatMap((pair, index) => {
    const x = flatten(nodeMap.get(pair.xSource)?.computedValue);
    const y = flatten(nodeMap.get(pair.ySource)?.computedValue);
    const count = Math.min(x.length, y.length);
    return count > 0 ? [{ label: chartPairLegendLabel(pair), color: pair.color || defaultChartSeriesColor(index), points: x.slice(0, count).map((value, idx) => ({ x: value, y: y[idx] })) }] : [];
  });
}

function updateXYWidgetsFromComputedValues(timeValue = null, nodeMap = buildNodeNameMap()) {
  const currentTime = Number(
    Number.isFinite(Number(timeValue)) ? timeValue : graph.execution.currentTime,
  );
  graph.widgets.forEach((widget) => {
    if (widget.type !== "xychart" && widget.type !== "barplot") {
      return;
    }
    sanitizeWidgetXYPairs(widget);
    widget.xyPairs.forEach((pair) => {
      if (widget.outputOnly) {
        const xAllowed = pair.xSource === "time" || nodeMap.get(pair.xSource)?.output;
        const yAllowed = pair.ySource === "time" || nodeMap.get(pair.ySource)?.output;
        if (!xAllowed || !yAllowed) {
          return;
        }
      }
      if (pair.xSource !== "time") {
        const xNode = nodeMap.get(pair.xSource);
        if (!xNode || xNode.computedError) {
          return;
        }
      }
      if (pair.ySource !== "time") {
        const yNode = nodeMap.get(pair.ySource);
        if (!yNode || yNode.computedError) {
          return;
        }
      }
      const xVal = pair.xSource === "time"
        ? currentTime
        : nodeMap.get(pair.xSource)?.computedValue;
      const yVal = pair.ySource === "time"
        ? currentTime
        : nodeMap.get(pair.ySource)?.computedValue;
      if (pair.showInstantProfile) {
        pair.instantSeriesData = buildChartPairInstantSeriesDefinitions(pair, xVal, yVal);
      } else {
        pair.instantSeriesData = [];
      }
      if (pair.showTimeSeries) {
        const seriesDefs = buildChartPairSeriesDefinitions(pair, xVal, yVal);
        if (seriesDefs.length === 0) {
          return;
        }
        if (!Array.isArray(pair.seriesData)) {
          pair.seriesData = [];
        }
        seriesDefs.forEach((seriesDef, idx) => {
          if (!pair.seriesData[idx] || pair.seriesData[idx].label !== seriesDef.label) {
            pair.seriesData[idx] = { label: seriesDef.label, points: [] };
          }
          pair.seriesData[idx].points.push(seriesDef.point);
        });
        if (pair.seriesData.length > seriesDefs.length) {
          pair.seriesData = pair.seriesData.slice(0, seriesDefs.length);
        }
      } else {
        pair.seriesData = [];
      }
    });
  });
}

function updateTableWidgetsFromComputedValues(timeValue = null, nodeMap = buildNodeNameMap()) {
  const currentTime = Number(
    Number.isFinite(Number(timeValue)) ? timeValue : graph.execution.currentTime,
  );
  graph.widgets.forEach((widget) => {
    if (widget.type !== "table") {
      return;
    }
    sanitizeWidgetColumns(widget);
    sanitizeTableWidgetOptions(widget);
    if (!widget.showHistory) {
      return;
    }
    const displayedCols = widget.outputOnly
      ? widget.columns.filter((name) => name === "time" || nodeMap.get(name)?.output)
      : widget.columns.slice();
    const values = {};
    displayedCols.forEach((colName) => {
      if (colName === "time") {
        values.time = { value: currentTime };
        return;
      }
      const node = nodeMap.get(colName);
      if (!node) {
        values[colName] = { value: null };
        return;
      }
      if (node.computedError) {
        values[colName] = { error: node.computedError };
        return;
      }
      values[colName] = { value: node.computedValue };
    });
    const lastRow = widget.rows[widget.rows.length - 1];
    if (lastRow && Number(lastRow.time) === currentTime) {
      lastRow.values = values;
    } else {
      widget.rows.push({ time: currentTime, values });
    }
  });
}

function clearAllXYChartPoints() {
  graph.widgets.forEach((widget) => {
    if (widget.type === "xychart" || widget.type === "barplot") {
      sanitizeWidgetXYPairs(widget);
      widget.xyPairs.forEach((pair) => {
        pair.points = [];
        pair.seriesData = [];
        pair.instantSeriesData = [];
      });
    }
  });
}

function clearAllTableWidgetRows() {
  graph.widgets.forEach((widget) => {
    if (widget.type === "table") {
      sanitizeTableWidgetOptions(widget);
      widget.rows = [];
    }
  });
}

function copyTextToClipboard(text) {
  const content = String(text ?? "");
  if (!content) {
    return Promise.resolve(false);
  }
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    return navigator.clipboard.writeText(content).then(() => true).catch(() => false);
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    return Promise.resolve(Boolean(ok));
  } catch (_err) {
    return Promise.resolve(false);
  }
}

function renderMatrixGrid(body, widget, matrix) {
  const rowCount = matrix.length;
  const colCount = rowCount > 0 ? matrix[0].length : 0;
  const displayRows = widget.displayRows ?? rowCount;
  const displayCols = widget.displayCols ?? colCount;
  const grid = document.createElement("div");
  grid.className = "matrix-widget-grid";
  const showIndices = widget.showIndices !== false;
  const headerOffset = showIndices ? 1 : 0;
  const availableWidth = Math.max(40, Math.floor(widget.width - 16));
  const availableHeight = Math.max(40, Math.floor(widget.height - 44));
  const fitSize = Math.floor(Math.min(
    availableWidth / Math.max(1, displayCols + headerOffset),
    availableHeight / Math.max(1, displayRows + headerOffset),
  ));
  const cellSize = widget.autoFitCells
    ? clamp(fitSize || widget.cellSize, 2, 96)
    : clamp(Number(widget.cellSize) || 28, 2, 96);
  grid.style.setProperty("--matrix-cell-size", `${cellSize}px`);
  grid.style.setProperty("--matrix-font-size", `${Math.min(widget.fontSize, Math.max(0, Math.floor(cellSize * 0.45)))}px`);
  grid.style.gridTemplateColumns = `repeat(${Math.max(1, displayCols + headerOffset)}, ${cellSize}px)`;
  grid.style.width = `${Math.max(1, displayCols + headerOffset) * cellSize}px`;
  if (showIndices) {
    const corner = document.createElement("div");
    corner.className = "matrix-widget-cell matrix-widget-index";
    corner.textContent = "";
    grid.appendChild(corner);
    for (let colIdx = 0; colIdx < displayCols; colIdx += 1) {
      const th = document.createElement("div");
      th.className = "matrix-widget-cell matrix-widget-index";
      th.textContent = String(colIdx);
      grid.appendChild(th);
    }
  }

  const valueRange = matrixValueRange(matrix, rowCount, colCount, widget);
  for (let rowIdx = 0; rowIdx < displayRows; rowIdx += 1) {
    if (showIndices) {
      const rowHeader = document.createElement("div");
      rowHeader.className = "matrix-widget-cell matrix-widget-index";
      rowHeader.textContent = String(rowIdx);
      grid.appendChild(rowHeader);
    }
    for (let colIdx = 0; colIdx < displayCols; colIdx += 1) {
      const value = rowIdx < rowCount && colIdx < colCount ? matrix[rowIdx][colIdx] : null;
      const td = document.createElement("div");
      td.className = "matrix-widget-cell matrix-widget-value";
      td.textContent = widget.showNumericValues && value != null ? formatComputedValue(value) : "";
      const bg = value != null
        ? matrixCellBackgroundColor(
          value,
          valueRange.min,
          valueRange.max,
          widget.colorScheme,
          valueRange.fixed,
        )
        : "";
      if (bg) {
        td.style.backgroundColor = bg;
      }
      grid.appendChild(td);
    }
  }
  body.appendChild(grid);
}

function matrixSurfaceDimensions(matrix, widget) {
  return {
    rows: Math.min(matrix.length, widget.displayRows ?? matrix.length),
    cols: Math.min(matrix[0]?.length ?? 0, widget.displayCols ?? (matrix[0]?.length ?? 0)),
  };
}

function matrixSurfaceRange(matrix, rows, cols, widget) {
  return matrixValueRange(matrix, rows, cols, widget);
}

function matrixValueRange(matrix, rows, cols, widget) {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const value = matrix[row]?.[col];
      if (Number.isFinite(value)) {
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return { min: 0, max: 0, fixed: false };
  }
  const hasMin = Number.isFinite(widget.valueMin);
  const hasMax = Number.isFinite(widget.valueMax);
  return {
    min: hasMin ? widget.valueMin : min,
    max: hasMax ? widget.valueMax : max,
    fixed: hasMin || hasMax,
  };
}

function sampledIndices(length, limit = 72) {
  if (length <= limit) {
    return Array.from({ length }, (_unused, index) => index);
  }
  const step = Math.ceil((length - 1) / (limit - 1));
  const indices = [];
  for (let index = 0; index < length; index += step) {
    indices.push(index);
  }
  if (indices[indices.length - 1] !== length - 1) {
    indices.push(length - 1);
  }
  return indices;
}

function drawMatrixSurfaceCanvas(canvas, widget, matrix) {
  const ctx = canvas.getContext("2d");
  const { rows, cols } = matrixSurfaceDimensions(matrix, widget);
  const range = matrixSurfaceRange(matrix, rows, cols, widget);
  if (!ctx || rows < 2 || cols < 2 || !range) {
    return false;
  }
  const width = Math.max(80, Math.floor(widget.width - 16));
  const height = Math.max(80, Math.floor(widget.height - (widget.showTitleBar === false ? 16 : 44)));
  canvas.width = width;
  canvas.height = height;
  canvas.className = "matrix-surface-canvas";

  const azimuth = (widget.surfaceAzimuth * Math.PI) / 180;
  const elevation = (widget.surfaceElevation * Math.PI) / 180;
  const cosAzimuth = Math.cos(azimuth);
  const sinAzimuth = Math.sin(azimuth);
  const cosElevation = Math.cos(elevation);
  const sinElevation = Math.sin(elevation);
  const rowIndices = sampledIndices(rows);
  const colIndices = sampledIndices(cols);
  const points = [];
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  const span = range.max - range.min || 1;

  rowIndices.forEach((row, rowIndex) => {
    points[rowIndex] = [];
    colIndices.forEach((col, colIndex) => {
      const rawValue = Number(matrix[row]?.[col]);
      const value = Number.isFinite(rawValue) ? rawValue : range.min;
      const normalized = (value - range.min) / span;
      const x = cols > 1 ? (col / (cols - 1)) - 0.5 : 0;
      const y = rows > 1 ? (row / (rows - 1)) - 0.5 : 0;
      const z = (normalized - 0.5) * widget.surfaceHeightScale;
      const rotatedX = x * cosAzimuth - y * sinAzimuth;
      const rotatedY = x * sinAzimuth + y * cosAzimuth;
      const projectedY = rotatedY * sinElevation - z * cosElevation;
      const depth = rotatedY * cosElevation + z * sinElevation;
      points[rowIndex][colIndex] = { x: rotatedX, y: projectedY, depth, value };
      minX = Math.min(minX, rotatedX);
      maxX = Math.max(maxX, rotatedX);
      minY = Math.min(minY, projectedY);
      maxY = Math.max(maxY, projectedY);
    });
  });
  const scale = Math.min(
    (width - 24) / Math.max(0.01, maxX - minX),
    (height - 24) / Math.max(0.01, maxY - minY),
  );
  const project = (point) => ({
    x: width / 2 + point.x * scale,
    y: height / 2 + point.y * scale,
  });
  const cells = [];
  for (let row = 0; row < points.length - 1; row += 1) {
    for (let col = 0; col < points[row].length - 1; col += 1) {
      const corners = [points[row][col], points[row][col + 1], points[row + 1][col + 1], points[row + 1][col]];
      cells.push({ corners, depth: corners.reduce((sum, point) => sum + point.depth, 0) / 4 });
    }
  }
  cells.sort((first, second) => first.depth - second.depth);
  ctx.fillStyle = canvasThemePalette().background;
  ctx.fillRect(0, 0, width, height);
  cells.forEach(({ corners }) => {
    const path = corners.map(project);
    const average = corners.reduce((sum, point) => sum + point.value, 0) / corners.length;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    path.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.closePath();
    if (widget.surfaceStyle === "solid") {
      ctx.fillStyle = matrixCellBackgroundColor(average, range.min, range.max, widget.colorScheme, range.fixed) || "#8ca7c1";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      ctx.lineWidth = 0.65;
    } else {
      ctx.strokeStyle = matrixCellBackgroundColor(average, range.min, range.max, widget.colorScheme, range.fixed) || "#426983";
      ctx.lineWidth = 1;
    }
    ctx.stroke();
  });
  return true;
}

function renderMatrixSurface(body, widget, matrix) {
  const canvas = document.createElement("canvas");
  if (drawMatrixSurfaceCanvas(canvas, widget, matrix)) {
    body.appendChild(canvas);
    return;
  }
  const msg = document.createElement("div");
  msg.className = "empty-props";
  msg.textContent = t("widget.matrixSurfaceNotNumeric");
  body.appendChild(msg);
}

function widgetDefaultTitle(widget) {
  if (widget.type === "barplot") {
    return t("widget.barPlotTitle", { id: widget.id });
  }
  if (widget.type === "xychart") {
    return t("widget.chartTitle", { id: widget.id });
  }
  if (widget.type === "matrix") {
    return t("widget.matrixTitle", { id: widget.id });
  }
  if (widget.type === "slider") {
    return t("widget.sliderTitle", { id: widget.id });
  }
  if (widget.type === "select") {
    return t("widget.selectTitle", { id: widget.id });
  }
  if (widget.type === "button") {
    return t("widget.buttonTitle", { id: widget.id });
  }
  if (widget.type === "text") {
    return t("widget.textTitle", { id: widget.id });
  }
  if (widget.type === "led") {
    return t("widget.ledTitle", { id: widget.id });
  }
  return t("widget.tableTitle", { id: widget.id });
}

function widgetTitleBindingLabel(widget) {
  const source = String(widget?.source ?? "").trim();
  if (["slider", "select", "button", "text", "led", "matrix"].includes(widget?.type)) {
    return source;
  }
  if (widget?.type === "table") {
    const columns = Array.isArray(widget.columns)
      ? [...new Set(widget.columns.map((name) => String(name ?? "").trim()).filter((name) => name && name !== "time"))]
      : [];
    return columns.length === 1 ? columns[0] : "";
  }
  if (widget?.type === "xychart") {
    const pairs = Array.isArray(widget.xyPairs)
      ? widget.xyPairs.filter((pair) => String(pair?.ySource ?? "").trim())
      : [];
    if (pairs.length === 1) {
      const xSource = String(pairs[0]?.xSource ?? "").trim();
      const ySource = String(pairs[0]?.ySource ?? "").trim();
      if (!ySource) {
        return "";
      }
      return !xSource || xSource === "time" ? ySource : `${xSource} -> ${ySource}`;
    }
  }
  return "";
}

function widgetDisplayTitle(widget) {
  const custom = String(widget.customTitle ?? "").trim();
  const binding = widgetTitleBindingLabel(widget);
  if (custom && binding) {
    return `${custom} · ${binding}`;
  }
  if (binding) {
    return binding;
  }
  return custom || widgetDefaultTitle(widget);
}

function widgetDisplayedTableColumns(widget, nodeMap = buildNodeNameMap()) {
  return widget.outputOnly
    ? widget.columns.filter((name) => name === "time" || nodeMap.get(name)?.output)
    : widget.columns.slice();
}

function tableColumnOptions(widget, colName) {
  return widget?.tableColumnOptions?.[colName] || { label: "", align: "", decimalDigits: null };
}

function tableColumnLabel(widget, colName) {
  return tableColumnOptions(widget, colName).label || colName || t("widget.columnEmpty");
}

function applyTableColumnStyle(cell, widget, colName) {
  cell.style.textAlign = tableColumnOptions(widget, colName).align || widget.tableTextAlign;
}

function formatTableNumber(value, widget, colName = "") {
  const numeric = Number(value);
  const decimalDigits = tableColumnOptions(widget, colName).decimalDigits ?? widget.tableDecimalDigits;
  if (!Number.isFinite(numeric) || decimalDigits == null) {
    return formatNumberValue(numeric);
  }
  return numeric.toFixed(decimalDigits);
}

function formatTableValue(value, widget, colName = "") {
  if (value === null || value === undefined) {
    return "-";
  }
  if (typeof value === "number") {
    return formatTableNumber(value, widget, colName);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => formatTableValue(item, widget, colName)).join(", ")}]`;
  }
  return formatComputedValue(value);
}

function applyTableDisplayStyle(table, widget) {
  table.classList.add("table-widget-table");
  table.style.setProperty("--table-value-font-size", `${widget.fontSize}px`);
  table.style.setProperty("--table-value-align", widget.tableTextAlign);
}

function buildTableRowElement(displayedCols, entry, widget) {
  const row = document.createElement("tr");
  displayedCols.forEach((colName) => {
    const td = document.createElement("td");
    applyTableColumnStyle(td, widget, colName);
    const cell = entry?.values?.[colName];
    if (cell?.error) {
      td.textContent = t("text.valueError", { reason: evalReasonText(cell.error) });
    } else if (Object.prototype.hasOwnProperty.call(entry?.values || {}, colName)) {
      td.textContent = formatTableValue(cell?.value ?? null, widget, colName);
    } else {
      td.textContent = "-";
    }
    row.appendChild(td);
  });
  return row;
}

function flattenTableScalarValues(value, indexPath = []) {
  if (!Array.isArray(value)) {
    return [{ indexPath, value }];
  }
  if (value.length === 0) {
    return [{ indexPath, value: null, empty: true }];
  }
  return value.flatMap((item, index) => flattenTableScalarValues(item, [...indexPath, index]));
}

function expandedTableCells(widget, nodeMap = buildNodeNameMap()) {
  const displayedCols = widgetDisplayedTableColumns(widget, nodeMap);
  const currentTime = graph.execution.currentTime == null ? graph.execution.t0 : graph.execution.currentTime;
  return displayedCols.flatMap((colName) => {
    if (colName === "time") {
      return [{ label: "time", value: Number(currentTime) }];
    }
    const node = nodeMap.get(colName);
    if (!node) {
      return [{ label: colName || t("widget.columnEmpty"), value: null, missing: true }];
    }
    if (node.computedError) {
      return [{ label: colName, error: node.computedError }];
    }
    return flattenTableScalarValues(node.computedValue).map((cell) => ({
      label: `${colName}${cell.indexPath.map((index) => `[${index}]`).join("")}`,
      value: cell.value,
      empty: cell.empty,
    }));
  });
}

function expandedTableMatrix(widget, nodeMap = buildNodeNameMap()) {
  const displayedCols = widgetDisplayedTableColumns(widget, nodeMap);
  if (displayedCols.length !== 1 || displayedCols[0] === "time") {
    return null;
  }
  const node = nodeMap.get(displayedCols[0]);
  const matrix = node?.computedValue;
  if (node?.computedError || !Array.isArray(matrix) || matrix.length === 0 || !matrix.every(Array.isArray)) {
    return null;
  }
  const columnCount = matrix[0].length;
  if (!matrix.every((row) => row.length === columnCount)) {
    return null;
  }
  return { name: displayedCols[0], matrix, columnCount };
}

function renderExpandedTableWidgetBody(body, widget, nodeMap = buildNodeNameMap()) {
  const expandedMatrix = expandedTableMatrix(widget, nodeMap);
  if (expandedMatrix) {
    const table = document.createElement("table");
    applyTableDisplayStyle(table, widget);
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    const corner = document.createElement("th");
    corner.textContent = expandedMatrix.name;
    headRow.appendChild(corner);
    for (let column = 0; column < expandedMatrix.columnCount; column += 1) {
      const th = document.createElement("th");
      th.textContent = `[${column}]`;
      headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    expandedMatrix.matrix.forEach((matrixRow, rowIndex) => {
      const row = document.createElement("tr");
      const rowHeader = document.createElement("th");
      rowHeader.textContent = `[${rowIndex}]`;
      row.appendChild(rowHeader);
      for (let column = 0; column < expandedMatrix.columnCount; column += 1) {
        const td = document.createElement("td");
        td.textContent = formatTableValue(matrixRow[column], widget);
        row.appendChild(td);
      }
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    body.appendChild(table);
    return;
  }
  const cells = expandedTableCells(widget, nodeMap);
  const table = document.createElement("table");
  applyTableDisplayStyle(table, widget);
  const colgroup = document.createElement("colgroup");
  const columnWidth = cells.length > 0 ? `${100 / cells.length}%` : "100%";
  cells.forEach(() => {
    const col = document.createElement("col");
    col.style.width = columnWidth;
    colgroup.appendChild(col);
  });
  table.appendChild(colgroup);
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  cells.forEach((cell) => {
    const th = document.createElement("th");
    th.textContent = cell.label;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  const row = document.createElement("tr");
  cells.forEach((cell) => {
    const td = document.createElement("td");
    if (cell.error) {
      td.textContent = t("text.valueError", { reason: evalReasonText(cell.error) });
    } else if (cell.empty || cell.missing) {
      td.textContent = "-";
    } else {
      td.textContent = formatTableValue(cell.value, widget);
    }
    row.appendChild(td);
  });
  tbody.appendChild(row);
  table.appendChild(tbody);
  body.appendChild(table);
}

function matrixPaletteColor(scheme, ratio) {
  const tValue = clamp(Number(ratio) || 0, 0, 1);
  if (scheme === "heat") {
    const hue = 44 - (44 * tValue);
    const sat = 90;
    const light = 94 - (46 * tValue);
    return `hsl(${hue.toFixed(1)} ${sat}% ${light.toFixed(1)}%)`;
  }
  if (scheme === "grayscale") {
    const light = 98 - (68 * tValue);
    return `hsl(210 10% ${light.toFixed(1)}%)`;
  }
  if (scheme === "diverging") {
    const hue = tValue < 0.5 ? 210 : 12;
    const distance = Math.abs(tValue - 0.5) * 2;
    const sat = 68;
    const light = 96 - (44 * distance);
    return `hsl(${hue} ${sat}% ${light.toFixed(1)}%)`;
  }
  return `hsl(204 76% ${94 - (38 * tValue)}%)`;
}

function matrixCellBackgroundColor(value, minValue, maxValue, scheme, fixedRange = false) {
  if (scheme === "none" || !isFiniteScalar(value)) {
    return "";
  }
  const range = maxValue - minValue;
  if (range > 0) {
    const useDiscreteSteps = fixedRange
      && Number.isInteger(value)
      && Number.isInteger(minValue)
      && Number.isInteger(maxValue);
    const denominator = useDiscreteSteps ? (range + 1) : range;
    return matrixPaletteColor(scheme, (value - minValue) / denominator);
  }
  if (value === 0) {
    return "";
  }
  return matrixPaletteColor(scheme, 0.55);
}

function widgetBinaryStateLabel(widget, state, fallbackKey) {
  const explicit = state ? String(widget?.trueLabel ?? "").trim() : String(widget?.falseLabel ?? "").trim();
  if (explicit) {
    return explicit;
  }
  return fallbackKey ? t(fallbackKey) : "";
}

function coerceLedState(value) {
  if (value === true || value === false) {
    return { ok: true, value };
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    if (value === 0) {
      return { ok: true, value: false };
    }
    if (value === 1) {
      return { ok: true, value: true };
    }
  }
  if (typeof value === "string") {
    const lower = value.trim().toLowerCase();
    if (lower === "true") {
      return { ok: true, value: true };
    }
    if (lower === "false") {
      return { ok: true, value: false };
    }
  }
  return { ok: false, value: false };
}

function renderLedWidgetBody(body, widget, nodeMap = buildNodeNameMap()) {
  body.innerHTML = "";
  const sourceNode = nodeMap.get(widget.source) || null;
  const wrap = document.createElement("div");
  wrap.className = "led-widget-wrap";

  const display = document.createElement("div");
  display.className = "led-widget-display";
  const stack = document.createElement("div");
  stack.className = "led-widget-stack";
  const lamp = document.createElement("div");
  lamp.className = "led-widget-lamp";
  const label = document.createElement("div");
  label.className = "led-widget-label";
  const message = document.createElement("div");
  message.className = "led-widget-message";

  let overlayText = "";
  let messageText = "";
  if (!sourceNode) {
    lamp.classList.add("is-invalid");
    messageText = t("widget.noneOption");
  } else if (sourceNode.computedError) {
    lamp.classList.add("is-invalid");
    messageText = localizeExpressionErrorMessage(String(sourceNode.computedError || ""));
  } else if (sourceNode.computedValue == null) {
    // Keep the LED neutral until the source node has produced a value.
  } else {
    const coerced = coerceLedState(sourceNode.computedValue);
    if (coerced.ok) {
      lamp.classList.toggle("is-on", coerced.value);
      lamp.classList.toggle("is-off", !coerced.value);
      overlayText = widgetBinaryStateLabel(widget, coerced.value, "");
    } else {
      lamp.classList.add("is-invalid");
      messageText = t("widget.ledInvalid");
    }
  }

  label.textContent = overlayText;
  label.hidden = !overlayText;
  message.textContent = messageText;
  message.hidden = !messageText;

  stack.appendChild(lamp);
  stack.appendChild(label);
  display.appendChild(stack);
  display.appendChild(message);
  wrap.appendChild(display);
  body.appendChild(wrap);
}

function textWidgetMappedLabel(widget, rawValue) {
  const value = Number(rawValue);
  if (!Number.isFinite(value) || !Array.isArray(widget?.mappings)) {
    return "";
  }
  const hit = widget.mappings.find((mapping) => Number(mapping?.value) === value && String(mapping?.label ?? "").trim());
  return hit ? String(hit.label) : "";
}

function renderTextWidgetBody(body, widget, nodeMap = buildNodeNameMap()) {
  body.innerHTML = "";
  sanitizeTextWidgetOptions(widget);
  const sourceNode = nodeMap.get(widget.source) || null;
  const wrap = document.createElement("div");
  wrap.className = "text-widget-wrap";

  const display = document.createElement("div");
  display.className = "text-widget-display";
  if (!sourceNode) {
    display.textContent = t("widget.noneOption");
  } else if (sourceNode.computedError) {
    display.textContent = localizeExpressionErrorMessage(String(sourceNode.computedError || ""));
  } else {
    const mapped = textWidgetMappedLabel(widget, sourceNode.computedValue);
    display.textContent = mapped || formatComputedValue(sourceNode.computedValue);
  }
  wrap.appendChild(display);
  body.appendChild(wrap);
}

function matrixWidgetRenderableMatrix(value) {
  if (Array.isArray(value) && value.every((row) => Array.isArray(row))) {
    const rowCount = value.length;
    const colCount = rowCount > 0 ? value[0].length : 0;
    if (value.every((row) => row.length === colCount)) {
      return value;
    }
    return null;
  }
  if (value && typeof value === "object" && value.kind === "agentSpace") {
    return graphFunctionHelpers.agentSpaceToMatrix?.(value) || null;
  }
  return null;
}

function renderMatrixWidgetBody(body, widget, nodeMap = buildNodeNameMap()) {
  body.innerHTML = "";
  sanitizeMatrixWidgetOptions(widget);
  const sourceNode = nodeMap.get(widget.source);
  if (!sourceNode || !widget.source) {
    const msg = document.createElement("div");
    msg.className = "empty-props";
    msg.textContent = t("widget.matrixEmpty");
    body.appendChild(msg);
    return;
  }
  if (sourceNode.computedValue == null && !Array.isArray(widget.lastMatrixValue)) {
    return;
  }
  if (sourceNode.computedError) {
    if (Array.isArray(widget.lastMatrixValue)) {
      widget.viewMode === "surface" ? renderMatrixSurface(body, widget, widget.lastMatrixValue) : renderMatrixGrid(body, widget, widget.lastMatrixValue);
      return;
    }
    const msg = document.createElement("div");
    msg.className = "empty-props error";
    msg.textContent = t("text.valueError", { reason: evalReasonText(sourceNode.computedError) });
    body.appendChild(msg);
    return;
  }
  const matrix = matrixWidgetRenderableMatrix(sourceNode.computedValue);
  if (!Array.isArray(matrix)) {
    if (Array.isArray(widget.lastMatrixValue)) {
      widget.viewMode === "surface" ? renderMatrixSurface(body, widget, widget.lastMatrixValue) : renderMatrixGrid(body, widget, widget.lastMatrixValue);
      return;
    }
    const msg = document.createElement("div");
    msg.className = "empty-props";
    msg.textContent = sourceNode.computedValue == null
      ? t("widget.matrixEmpty")
      : t("widget.matrixNotMatrix");
    body.appendChild(msg);
    return;
  }
  widget.lastMatrixValue = deepClone(matrix);
  if (widget.viewMode === "surface") {
    renderMatrixSurface(body, widget, matrix);
  } else {
    renderMatrixGrid(body, widget, matrix);
  }
}

function renderTableWidgetBody(body, widget, nodeMap = buildNodeNameMap()) {
  body.innerHTML = "";
  sanitizeTableWidgetOptions(widget);
  if (widget.expandNonScalarValues) {
    renderExpandedTableWidgetBody(body, widget, nodeMap);
    return;
  }
  const table = document.createElement("table");
  applyTableDisplayStyle(table, widget);
  const displayedCols = widgetDisplayedTableColumns(widget, nodeMap);
  const colgroup = document.createElement("colgroup");
  const columnWidth = displayedCols.length > 0 ? `${100 / displayedCols.length}%` : "100%";
  displayedCols.forEach(() => {
    const col = document.createElement("col");
    col.style.width = columnWidth;
    colgroup.appendChild(col);
  });
  table.appendChild(colgroup);

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  displayedCols.forEach((colName) => {
    const th = document.createElement("th");
    th.textContent = tableColumnLabel(widget, colName);
    applyTableColumnStyle(th, widget, colName);
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  table.dataset.columns = JSON.stringify(displayedCols);
  if (widget.showHistory) {
    sanitizeTableWidgetOptions(widget);
    widget.rows.forEach((entry) => {
      tbody.appendChild(buildTableRowElement(displayedCols, entry, widget));
    });
    table.dataset.rowCount = String(widget.rows.length);
  } else {
    const row = document.createElement("tr");
    displayedCols.forEach((colName) => {
      const td = document.createElement("td");
      applyTableColumnStyle(td, widget, colName);
      if (colName === "time") {
        const tVal = graph.execution.currentTime == null ? graph.execution.t0 : graph.execution.currentTime;
        td.textContent = formatTableNumber(Number(tVal), widget, colName);
      } else {
        const node = nodeMap.get(colName);
        if (!node) {
          td.textContent = "-";
        } else if (node.computedError) {
          td.textContent = t("text.valueError", { reason: evalReasonText(node.computedError) });
        } else {
          td.textContent = formatTableValue(node.computedValue, widget, colName);
        }
      }
      row.appendChild(td);
    });
    tbody.appendChild(row);
    table.dataset.rowCount = "1";
  }
  table.appendChild(tbody);
  body.appendChild(table);
  if (widget.showHistory) {
    window.requestAnimationFrame(() => {
      body.scrollTop = widget.tableScrolling === "first" ? 0 : body.scrollHeight;
    });
  }
}

function matrixWidgetStructuredText(widget, nodeMap = buildNodeNameMap()) {
  sanitizeMatrixWidgetOptions(widget);
  const sourceNode = nodeMap.get(widget.source);
  let matrix = null;
  if (sourceNode && !sourceNode.computedError) {
    matrix = matrixWidgetRenderableMatrix(sourceNode.computedValue);
  }
  if (!matrix && Array.isArray(widget.lastMatrixValue)) {
    matrix = widget.lastMatrixValue;
  }
  if (!Array.isArray(matrix)) {
    return "";
  }
  return matrix
    .map((row) => row.map((value) => formatComputedValue(value)).join("\t"))
    .join("\n")
    .trim();
}

function widgetRenderedText(widget) {
  if (widget?.type === "matrix") {
    return matrixWidgetStructuredText(widget);
  }
  const root = widgetLayer.querySelector(`.value-widget[data-widget-id="${widget.id}"]`);
  const body = root?.querySelector(".value-widget-body");
  return String(body?.innerText || "").trim();
}

function refreshTableWidgetRuntimeBody(root, widget, nodeMap = buildNodeNameMap()) {
  const body = root.querySelector(".value-widget-body");
  sanitizeTableWidgetOptions(widget);
  if (widget.expandNonScalarValues) {
    renderTableWidgetBody(body, widget, nodeMap);
    return;
  }
  const table = body?.querySelector("table");
  const displayedCols = widgetDisplayedTableColumns(widget, nodeMap);
  const columnsKey = JSON.stringify(displayedCols);
  if (!body || !table || table.dataset.columns !== columnsKey) {
    renderTableWidgetBody(body || root.querySelector(".value-widget-body"), widget, nodeMap);
    return;
  }
  const tbody = table.querySelector("tbody");
  if (!tbody) {
    renderTableWidgetBody(body, widget, nodeMap);
    return;
  }
  if (widget.showHistory) {
    sanitizeTableWidgetOptions(widget);
    const renderedRows = Number(table.dataset.rowCount || 0);
    if (renderedRows > widget.rows.length) {
      renderTableWidgetBody(body, widget, nodeMap);
      return;
    }
    for (let i = renderedRows; i < widget.rows.length; i += 1) {
      tbody.appendChild(buildTableRowElement(displayedCols, widget.rows[i], widget));
    }
    table.dataset.rowCount = String(widget.rows.length);
    window.requestAnimationFrame(() => {
      body.scrollTop = widget.tableScrolling === "first" ? 0 : body.scrollHeight;
    });
    return;
  }
  renderTableWidgetBody(body, widget, nodeMap);
}

function refreshMatrixWidgetRuntimeBody(root, widget, nodeMap = buildNodeNameMap()) {
  const body = root.querySelector(".value-widget-body");
  if (!body) {
    renderWidgets();
    return;
  }
  renderMatrixWidgetBody(body, widget, nodeMap);
}

function refreshChartWidgetRuntimeBody(root, widget, nodeMap = buildNodeNameMap()) {
  const canvas = root.querySelector("canvas.xy-chart-canvas");
  if (!canvas) {
    renderWidgets();
    return;
  }
  const displayedPairs = widget.outputOnly
    ? widget.xyPairs.filter((pair) => {
      const xAllowed = pair.xSource === "time" || nodeMap.get(pair.xSource)?.output;
      const yAllowed = pair.ySource === "time" || nodeMap.get(pair.ySource)?.output;
      return xAllowed && yAllowed;
    })
    : widget.xyPairs;
  const seriesList = displayedPairs.flatMap((pair) => {
    const out = [];
    if (pair.showTimeSeries) {
      const seriesData = Array.isArray(pair.seriesData) && pair.seriesData.length > 0
        ? pair.seriesData
        : [{ label: chartPairDefaultLabel(pair), points: pair.points || [] }];
      out.push(...seriesData.map((series, idx) => ({
        label: chartPairLegendLabel(pair, series.label || `${chartPairDefaultLabel(pair)}${seriesData.length > 1 ? ` [${idx}]` : ""}`),
        color: pair.color,
        pointColor: pair.pointColor,
        showLine: pair.showLine,
        lineWidth: pair.lineWidth,
        lineStyle: pair.lineStyle,
        pointMode: pair.pointMode,
        pointSize: pair.pointSize,
        points: series.points || [],
      })));
    }
    if (pair.showInstantProfile) {
      const instantSeriesData = Array.isArray(pair.instantSeriesData) && pair.instantSeriesData.length > 0
        ? pair.instantSeriesData
        : [];
      out.push(...instantSeriesData.map((series) => ({
        label: chartPairLegendLabel(pair, series.label || chartPairDefaultLabel(pair)),
        color: pair.color,
        pointColor: pair.pointColor,
        showLine: pair.showLine,
        lineWidth: pair.lineWidth,
        lineStyle: pair.lineStyle,
        pointMode: pair.pointMode === "last" ? "all" : pair.pointMode,
        pointSize: pair.pointSize,
        points: series.points || [],
      })));
    }
    return out;
  });
  if (widget.type === "barplot") {
    drawBarPlot(canvas, barPlotSeries(widget, nodeMap), widget);
  } else {
    drawXYChart(canvas, seriesList, widget);
  }
}

function refreshSliderWidgetRuntimeBody(root, widget) {
  const rangeInput = root.querySelector("input[type='range']");
  const valueInput = root.querySelector(".slider-widget-number");
  const minLabel = root.querySelector(".slider-bound-min");
  const maxLabel = root.querySelector(".slider-bound-max");
  const sourceNode = getNodeByName(widget.source);
  const lockedForRun = sourceNode?.shape === "diamond" && isExecutionFrozen();
  if (rangeInput) {
    rangeInput.min = String(widget.min);
    rangeInput.max = String(widget.max);
    rangeInput.step = String(widget.step);
    rangeInput.value = String(widget.value);
    rangeInput.disabled = lockedForRun;
  }
  if (valueInput) {
    valueInput.min = String(widget.min);
    valueInput.max = String(widget.max);
    valueInput.step = String(widget.step);
    valueInput.value = String(widget.value);
    valueInput.disabled = lockedForRun;
  }
  if (minLabel) {
    minLabel.textContent = formatNumberValue(Number(widget.min));
  }
  if (maxLabel) {
    maxLabel.textContent = formatNumberValue(Number(widget.max));
  }
}

function refreshButtonWidgetRuntimeBody(root, widget) {
  sanitizeButtonWidgetOptions(widget);
  const body = root.querySelector(".value-widget-body");
  const toggleBtn = body?.querySelector(".button-widget-toggle");
  if (!body || !toggleBtn) {
    renderWidgets();
    return;
  }
  const sourceNode = getNodeByName(widget.source);
  const lockedForRun = sourceNode?.shape === "diamond" && isExecutionFrozen();
  toggleBtn.disabled = lockedForRun;
  toggleBtn.classList.toggle("is-on", Boolean(widget.value));
  toggleBtn.classList.toggle("is-off", !Boolean(widget.value));
  toggleBtn.textContent = widgetBinaryStateLabel(widget, Boolean(widget.value), "");
}

function refreshSelectWidgetRuntimeBody(root, widget) {
  sanitizeSelectWidgetOptions(widget);
  const body = root.querySelector(".value-widget-body");
  const selectInput = body?.querySelector(".select-widget-input");
  if (!body || !selectInput) {
    renderWidgets();
    return;
  }
  const sourceNode = getNodeByName(widget.source);
  const lockedForRun = sourceNode?.shape === "diamond" && isExecutionFrozen();
  const optionsKey = JSON.stringify(widget.options);
  if (selectInput.dataset.options !== optionsKey) {
    selectInput.innerHTML = "";
    widget.options.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = String(option.value);
      opt.textContent = option.label;
      selectInput.appendChild(opt);
    });
    selectInput.dataset.options = optionsKey;
  }
  selectInput.value = String(widget.value);
  selectInput.disabled = lockedForRun;
}

function refreshLedWidgetRuntimeBody(root, widget, nodeMap = buildNodeNameMap()) {
  sanitizeLedWidgetOptions(widget);
  const body = root.querySelector(".value-widget-body");
  if (!body) {
    renderWidgets();
    return;
  }
  renderLedWidgetBody(body, widget, nodeMap);
}

function refreshTextWidgetRuntimeBody(root, widget, nodeMap = buildNodeNameMap()) {
  sanitizeTextWidgetOptions(widget);
  const body = root.querySelector(".value-widget-body");
  if (!body) {
    renderWidgets();
    return;
  }
  renderTextWidgetBody(body, widget, nodeMap);
}

function refreshRuntimeWidgetContents(excludeWidgetId = null) {
  const roots = [...widgetLayer.querySelectorAll(".value-widget[data-widget-id]")];
  const visibleWidgets = graph.widgets.filter((widget) => typeof isDashboardItemVisible !== "function" || isDashboardItemVisible(widget));
  if (roots.length !== visibleWidgets.length) {
    renderWidgets();
    return;
  }
  const rootMap = new Map(roots.map((root) => [Number(root.dataset.widgetId), root]));
  const nodeMap = buildNodeNameMap();
  for (const widget of visibleWidgets) {
    if (widget.id === excludeWidgetId) {
      continue;
    }
    const root = rootMap.get(widget.id);
    if (!root) {
      renderWidgets();
      return;
    }
    if (widget.type === "table") {
      refreshTableWidgetRuntimeBody(root, widget, nodeMap);
    } else if (widget.type === "matrix") {
      refreshMatrixWidgetRuntimeBody(root, widget, nodeMap);
    } else if (widget.type === "xychart" || widget.type === "barplot") {
      refreshChartWidgetRuntimeBody(root, widget, nodeMap);
    } else if (widget.type === "slider") {
      refreshSliderWidgetRuntimeBody(root, widget);
    } else if (widget.type === "select") {
      refreshSelectWidgetRuntimeBody(root, widget);
    } else if (widget.type === "button") {
      refreshButtonWidgetRuntimeBody(root, widget);
    } else if (widget.type === "text") {
      refreshTextWidgetRuntimeBody(root, widget, nodeMap);
    } else if (widget.type === "led") {
      refreshLedWidgetRuntimeBody(root, widget, nodeMap);
    } else {
      renderWidgets();
      return;
    }
  }
}

function refreshRuntimeView() {
  clearStrictInvalidNodeValues();
  updateModelRunButtons();
  updateMenuTimeLabel();
  render({ preserveWidgets: true });
  applyWidgetDrivenNodeValues();
  // Preserve the native control being manipulated, while keeping all output
  // widgets live during the same timed execution.
  refreshRuntimeWidgetContents(ui.sliderInteraction?.widgetId ?? null);
  refreshRenderedNodeTooltipElements();
  refreshSidebar();
  refreshActiveTooltip();
  updateEditingLockUi();
}

function refreshWidgetFrame(widget) {
  const root = widgetLayer.querySelector(`.value-widget[data-widget-id="${widget?.id}"]`);
  if (!root || !widget) {
    return false;
  }
  const view = svg.viewBox.baseVal;
  const zoom = Math.max(0.0001, ui.zoom || 1);
  const viewMinX = view?.x ?? 0;
  const viewMinY = view?.y ?? 0;
  const displayedPosition = typeof dashboardItemPosition === "function"
    ? dashboardItemPosition(widget)
    : { x: widget.x, y: widget.y };
  root.style.left = `${(displayedPosition.x - viewMinX) * zoom}px`;
  root.style.top = `${(displayedPosition.y - viewMinY) * zoom}px`;
  root.style.width = `${widget.width}px`;
  root.style.height = widget.minimized ? "36px" : `${widget.height}px`;
  root.style.transform = `scale(${zoom})`;
  root.classList.toggle("selected", ui.selected?.type === "widget" && ui.selected.id === widget.id);
  return true;
}

function renderWidgets() {
  widgetLayer.innerHTML = "";
  applyWidgetDrivenNodeValues();
  const view = svg.viewBox.baseVal;
  const viewMinX = view?.x ?? 0;
  const viewMinY = view?.y ?? 0;
  const startWidgetDrag = (widget, evt) => {
    if (typeof isTabletCanvasPanMode === "function" && isTabletCanvasPanMode()) {
      return false;
    }
    if (isEditingUiLocked()) {
      if (!(ui.selected?.type === "widget" && ui.selected.id === widget.id)) {
        selectWidget(widget.id);
        render();
      }
      return false;
    }
    if (!(ui.selected?.type === "widget" && ui.selected.id === widget.id)) {
      selectWidget(widget.id);
    }
    ui.widgetDrag = {
      widgetId: widget.id,
      pointerId: evt.pointerId,
      startClientX: evt.clientX,
      startClientY: evt.clientY,
      startX: widget.x,
      startY: widget.y,
      snapOnRelease: Boolean(evt.pointerType === "touch" && typeof isCompactTabletLayout === "function" && isCompactTabletLayout()),
    };
    evt.currentTarget?.setPointerCapture?.(evt.pointerId);
    beginTransaction();
    return true;
  };

  graph.widgets.forEach((widget) => {
    if (widget.type !== "table" && widget.type !== "xychart" && widget.type !== "barplot" && widget.type !== "slider" && widget.type !== "matrix" && widget.type !== "button" && widget.type !== "led" && widget.type !== "select" && widget.type !== "text") {
      return;
    }
    if (typeof isDashboardItemVisible === "function" && !isDashboardItemVisible(widget)) {
      return;
    }
    sanitizeWidgetPresentationOptions(widget);
    if (widget.type === "table") {
      sanitizeWidgetColumns(widget);
      sanitizeTableWidgetOptions(widget);
    } else if (widget.type === "matrix") {
      sanitizeMatrixWidgetOptions(widget);
    } else if (widget.type === "xychart" || widget.type === "barplot") {
      sanitizeWidgetXYPairs(widget);
      sanitizeXYChartOptions(widget);
    } else if (widget.type === "button") {
      sanitizeButtonWidgetOptions(widget);
    } else if (widget.type === "select") {
      sanitizeSelectWidgetOptions(widget);
    } else if (widget.type === "text") {
      sanitizeTextWidgetOptions(widget);
    } else if (widget.type === "led") {
      sanitizeLedWidgetOptions(widget);
    } else {
      sanitizeSliderWidgetOptions(widget);
    }
    const root = document.createElement("div");
    root.className = `value-widget widget-type-${widget.type}`;
    if (ui.selected?.type === "widget" && ui.selected.id === widget.id) {
      root.classList.add("selected");
    }
    if (typeof isAnalysisFocusActive === "function" && isAnalysisFocusActive("widget", widget.id)) {
      root.classList.add("analysis-focus");
    }
    if (widget.minimized) {
      root.classList.add("minimized");
    }
    const z = Math.max(0.0001, ui.zoom || 1);
    const displayedPosition = typeof dashboardItemPosition === "function"
      ? dashboardItemPosition(widget)
      : { x: widget.x, y: widget.y };
    root.style.left = `${(displayedPosition.x - viewMinX) * z}px`;
    root.style.top = `${(displayedPosition.y - viewMinY) * z}px`;
    root.style.width = `${widget.width}px`;
    root.style.height = widget.minimized ? "36px" : `${widget.height}px`;
    root.style.transform = `scale(${z})`;
    root.style.transformOrigin = "top left";
    root.style.setProperty("--widget-font-size", `${widget.fontSize}px`);
    root.classList.toggle("title-bar-hidden", widget.showTitleBar === false && !widget.minimized);
    root.dataset.widgetId = String(widget.id);
    root.addEventListener("pointerdown", (evt) => {
      if (typeof isTabletCanvasPanMode === "function" && isTabletCanvasPanMode()) {
        return;
      }
      evt.stopPropagation();
      if (!(ui.selected?.type === "widget" && ui.selected.id === widget.id)) {
        selectWidget(widget.id);
        render();
      }
      if (
        widget.showTitleBar === false
        && !widget.minimized
        && evt.pointerType !== "touch"
        && !isEditingUiLocked()
        && !evt.target.closest("input, select, button, textarea")
      ) {
        if (startWidgetDrag(widget, evt)) {
          render();
        }
        return;
      }
      const touchDragAllowed =
        evt.pointerType === "touch"
        && typeof isCompactTabletLayout === "function"
        && isCompactTabletLayout()
        && !evt.target.closest("input, select, button, textarea");
      if (touchDragAllowed) {
        if (typeof startTouchHold === "function") {
          startTouchHold(evt, ({ clientX, clientY, pointerId }) => {
            if (ui.widgetDrag && ui.widgetDrag.pointerId === pointerId) {
              ui.widgetDrag = null;
              cancelTransaction();
            }
            openWidgetContextMenu({ preventDefault() {}, stopPropagation() {}, clientX, clientY }, widget);
            render();
          });
        }
        startWidgetDrag(widget, evt);
      }
    });
    root.addEventListener("contextmenu", (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      if (isEditingUiLocked()) {
        return;
      }
      if (!(ui.selected?.type === "widget" && ui.selected.id === widget.id)) {
        selectWidget(widget.id);
        render();
      }
      openWidgetContextMenu(evt, widget);
    });

    const header = document.createElement("div");
    header.className = "value-widget-header";
    const dragHandle = document.createElement("button");
    dragHandle.type = "button";
    dragHandle.className = "value-widget-drag-handle";
    dragHandle.textContent = "⋮⋮";
    dragHandle.setAttribute("aria-label", "Sposta widget");
    setTooltipText(dragHandle, "Sposta widget");
    const title = document.createElement("span");
    title.className = "value-widget-title";
    title.textContent = widgetDisplayTitle(widget);
    const actions = document.createElement("div");
    actions.className = "value-widget-actions";
    const minBtn = document.createElement("button");
    minBtn.type = "button";
    minBtn.textContent = widget.minimized ? "+" : "_";
    setTooltipText(minBtn, widget.minimized ? t("widget.restore") : t("widget.minimize"));
    minBtn.addEventListener("pointerdown", (evt) => {
      evt.stopPropagation();
    });
    minBtn.addEventListener("click", (evt) => {
      if (isEditingUiLocked()) {
        return;
      }
      evt.stopPropagation();
      runWidgetAction(() => {
        widget.minimized = !widget.minimized;
      });
      setStatusKey(widget.minimized ? "status.widgetMinimized" : "status.widgetRestored");
    });

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "x";
    delBtn.addEventListener("pointerdown", (evt) => {
      evt.stopPropagation();
    });
    delBtn.addEventListener("click", (evt) => {
      if (isEditingUiLocked()) {
        return;
      }
      evt.stopPropagation();
      runWidgetAction(() => {
        graph.widgets = graph.widgets.filter((w) => w.id !== widget.id);
      });
      setStatusKey("status.widgetDeleted");
    });
    dragHandle.addEventListener("pointerdown", (evt) => {
      evt.stopPropagation();
      startWidgetDrag(widget, evt);
      render();
    });
    header.appendChild(dragHandle);
    header.appendChild(title);
    actions.appendChild(minBtn);
    actions.appendChild(delBtn);
    header.appendChild(actions);
    header.addEventListener("pointerdown", (evt) => {
      if (typeof isTabletCanvasPanMode === "function" && isTabletCanvasPanMode()) {
        return;
      }
      if (evt.target.closest("button")) {
        return;
      }
      evt.stopPropagation();
      if (startWidgetDrag(widget, evt)) {
        render();
      }
    });

    const body = document.createElement("div");
    body.className = "value-widget-body";
    if (widget.type === "table") {
      renderTableWidgetBody(body, widget);
    } else if (widget.type === "matrix") {
      renderMatrixWidgetBody(body, widget);
    } else if (widget.type === "led") {
      renderLedWidgetBody(body, widget);
    } else if (widget.type === "xychart" || widget.type === "barplot") {
      const canvasWrap = document.createElement("div");
      canvasWrap.className = "xy-chart-canvas-wrap";
      const canvas = document.createElement("canvas");
      canvas.className = "xy-chart-canvas";
      const cw = Math.max(140, Math.floor(widget.width - 18));
      const ch = Math.max(100, Math.floor(widget.height - 52));
      canvas.width = cw;
      canvas.height = ch;
      const displayedPairs = widget.outputOnly
        ? widget.xyPairs.filter((pair) => {
          const xAllowed = pair.xSource === "time" || getNodeByName(pair.xSource)?.output;
          const yAllowed = pair.ySource === "time" || getNodeByName(pair.ySource)?.output;
          return xAllowed && yAllowed;
        })
        : widget.xyPairs;
      const seriesList = widget.type === "barplot"
        ? barPlotSeries(widget)
        : displayedPairs.flatMap((pair) => {
        const out = [];
        if (pair.showTimeSeries) {
          const seriesData = Array.isArray(pair.seriesData) && pair.seriesData.length > 0
            ? pair.seriesData
            : [{ label: chartPairDefaultLabel(pair), points: pair.points || [] }];
          out.push(...seriesData.map((series, idx) => ({
            label: chartPairLegendLabel(pair, series.label || `${chartPairDefaultLabel(pair)}${seriesData.length > 1 ? ` [${idx}]` : ""}`),
            color: pair.color,
            pointColor: pair.pointColor,
            showLine: pair.showLine,
            lineWidth: pair.lineWidth,
            lineStyle: pair.lineStyle,
            pointMode: pair.pointMode,
            pointSize: pair.pointSize,
            points: series.points || [],
          })));
        }
        if (pair.showInstantProfile) {
          const instantSeriesData = Array.isArray(pair.instantSeriesData) && pair.instantSeriesData.length > 0
            ? pair.instantSeriesData
            : [];
          out.push(...instantSeriesData.map((series) => ({
            label: chartPairLegendLabel(pair, series.label || chartPairDefaultLabel(pair)),
            color: pair.color,
            pointColor: pair.pointColor,
            showLine: pair.showLine,
            lineWidth: pair.lineWidth,
            lineStyle: pair.lineStyle,
            pointMode: pair.pointMode === "last" ? "all" : pair.pointMode,
            pointSize: pair.pointSize,
            points: series.points || [],
          })));
        }
        return out;
      });
      if (widget.type === "barplot") {
        drawBarPlot(canvas, seriesList, widget);
      } else {
        drawXYChart(canvas, seriesList, widget);
      }
      canvasWrap.appendChild(canvas);
      body.appendChild(canvasWrap);
    } else if (widget.type === "slider") {
      const sliderWrap = document.createElement("div");
      sliderWrap.className = "slider-widget-wrap";

      const sourceNode = getNodeByName(widget.source);
      const lockedForRun = sourceNode?.shape === "diamond" && isExecutionFrozen();

      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = String(widget.min);
      slider.max = String(widget.max);
      slider.step = String(widget.step);
      slider.value = String(widget.value);
      slider.disabled = lockedForRun;
      slider.addEventListener("pointerdown", (evt) => {
        if ((typeof isTabletCanvasPanMode === "function" && isTabletCanvasPanMode()) || lockedForRun) {
          return;
        }
        evt.stopPropagation();
        ui.sliderInteraction = { widgetId: widget.id, mode: "range" };
        if (!(ui.selected?.type === "widget" && ui.selected.id === widget.id)) {
          selectWidget(widget.id);
        }
      });
      slider.addEventListener("mousedown", (evt) => {
        evt.stopPropagation();
      });

      const minLabel = document.createElement("span");
      minLabel.className = "slider-bound slider-bound-min";
      minLabel.textContent = formatNumberValue(Number(widget.min));

      const maxLabel = document.createElement("span");
      maxLabel.className = "slider-bound slider-bound-max";
      maxLabel.textContent = formatNumberValue(Number(widget.max));

      const valueInput = document.createElement("input");
      valueInput.type = "number";
      valueInput.step = String(widget.step);
      valueInput.min = String(widget.min);
      valueInput.max = String(widget.max);
      valueInput.value = String(widget.value);
      valueInput.className = "slider-widget-number";
      valueInput.disabled = lockedForRun;
      valueInput.addEventListener("pointerdown", (evt) => {
        if ((typeof isTabletCanvasPanMode === "function" && isTabletCanvasPanMode()) || lockedForRun) {
          return;
        }
        evt.stopPropagation();
        ui.sliderInteraction = { widgetId: widget.id, mode: "number" };
      });
      valueInput.addEventListener("mousedown", (evt) => {
        evt.stopPropagation();
      });
      valueInput.addEventListener("focus", () => {
        if (lockedForRun) {
          return;
        }
        ui.sliderInteraction = { widgetId: widget.id, mode: "number" };
      });

      const rangeLine = document.createElement("div");
      rangeLine.className = "slider-range-line";
      rangeLine.appendChild(minLabel);
      rangeLine.appendChild(slider);
      rangeLine.appendChild(valueInput);
      rangeLine.appendChild(maxLabel);

      const syncSliderDisplay = (nextValue = slider.value, commit = false) => {
        const snapped = snapSliderValue(nextValue, widget.min, widget.max, widget.step);
        widget.value = snapped;
        slider.value = String(snapped);
        const span = Number(widget.max) - Number(widget.min);
        const progress = span > 0 ? ((snapped - Number(widget.min)) / span) * 100 : 0;
        slider.style.setProperty("--slider-progress", `${Math.max(0, Math.min(100, progress))}%`);
        valueInput.value = String(snapped);
        applySliderWidgetValueToNode(widget);
        if (commit) {
          refreshSidebar();
          scheduleFileStatusRefresh();
        }
      };

      slider.addEventListener("input", (evt) => {
        evt.stopPropagation();
        syncSliderDisplay();
      });
      slider.addEventListener("change", (evt) => {
        evt.stopPropagation();
        syncSliderDisplay(slider.value, true);
      });
      slider.addEventListener("pointerup", (evt) => {
        evt.stopPropagation();
        ui.sliderInteraction = null;
        render();
      });
      slider.addEventListener("pointercancel", () => {
        ui.sliderInteraction = null;
        render();
      });
      valueInput.addEventListener("input", (evt) => {
        evt.stopPropagation();
        syncSliderDisplay(valueInput.value);
      });
      valueInput.addEventListener("change", (evt) => {
        evt.stopPropagation();
        syncSliderDisplay(valueInput.value, true);
        render();
      });
      valueInput.addEventListener("blur", () => {
        ui.sliderInteraction = null;
        syncSliderDisplay(valueInput.value, true);
        render();
      });

      sliderWrap.appendChild(rangeLine);
      body.appendChild(sliderWrap);
    } else if (widget.type === "select") {
      const selectWrap = document.createElement("div");
      selectWrap.className = "select-widget-wrap";

      const sourceNode = getNodeByName(widget.source);
      const lockedForRun = sourceNode?.shape === "diamond" && isExecutionFrozen();

      const selectInput = document.createElement("select");
      selectInput.className = "select-widget-input";
      widget.options.forEach((option) => {
        const opt = document.createElement("option");
        opt.value = String(option.value);
        opt.textContent = option.label;
        selectInput.appendChild(opt);
      });
      selectInput.dataset.options = JSON.stringify(widget.options);
      selectInput.value = String(widget.value);
      selectInput.disabled = lockedForRun;
      selectInput.addEventListener("pointerdown", (evt) => {
        if ((typeof isTabletCanvasPanMode === "function" && isTabletCanvasPanMode()) || lockedForRun) {
          return;
        }
        evt.stopPropagation();
        ui.sliderInteraction = { widgetId: widget.id, mode: "select" };
        if (!(ui.selected?.type === "widget" && ui.selected.id === widget.id)) {
          selectWidget(widget.id);
        }
      });
      selectInput.addEventListener("mousedown", (evt) => {
        evt.stopPropagation();
      });
      selectInput.addEventListener("focus", () => {
        if (lockedForRun) {
          return;
        }
        ui.sliderInteraction = { widgetId: widget.id, mode: "select" };
      });
      selectInput.addEventListener("change", (evt) => {
        evt.stopPropagation();
        widget.value = Number(selectInput.value);
        applySelectWidgetValueToNode(widget);
        refreshSidebar();
        scheduleFileStatusRefresh();
        ui.sliderInteraction = null;
        renderWidgets();
      });
      selectInput.addEventListener("blur", () => {
        if (ui.sliderInteraction?.widgetId === widget.id && ui.sliderInteraction?.mode === "select") {
          ui.sliderInteraction = null;
        }
      });

      selectWrap.appendChild(selectInput);
      body.appendChild(selectWrap);
    } else if (widget.type === "button") {
      const buttonWrap = document.createElement("div");
      buttonWrap.className = "button-widget-wrap";

      const sourceNode = getNodeByName(widget.source);
      const lockedForRun = sourceNode?.shape === "diamond" && isExecutionFrozen();

      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "button-widget-toggle";
      toggleBtn.disabled = lockedForRun;
      const syncButtonDisplay = (commit = false) => {
        toggleBtn.classList.toggle("is-on", Boolean(widget.value));
        toggleBtn.classList.toggle("is-off", !Boolean(widget.value));
        toggleBtn.textContent = widgetBinaryStateLabel(widget, Boolean(widget.value), "");
        applyButtonWidgetValueToNode(widget);
        if (commit) {
          refreshSidebar();
          scheduleFileStatusRefresh();
        }
      };
      syncButtonDisplay();
      let pointerDownToggled = false;
      let buttonHeld = false;
      const isMomentary = () => widget.buttonMode === "momentary";
      const clearButtonInteraction = () => {
        if (ui.sliderInteraction?.widgetId === widget.id && ui.sliderInteraction?.mode === "button") {
          ui.sliderInteraction = null;
        }
      };
      const releaseMomentaryButton = () => {
        if (!buttonHeld) return;
        buttonHeld = false;
        widget.value = widget.initialValue;
        syncButtonDisplay(true);
        clearButtonInteraction();
      };
      toggleBtn.addEventListener("pointerdown", (evt) => {
        if ((typeof isTabletCanvasPanMode === "function" && isTabletCanvasPanMode()) || lockedForRun) {
          return;
        }
        evt.stopPropagation();
        ui.sliderInteraction = { widgetId: widget.id, mode: "button" };
        if (!(ui.selected?.type === "widget" && ui.selected.id === widget.id)) {
          selectWidget(widget.id);
        }
        if (isMomentary()) {
          buttonHeld = true;
          toggleBtn.setPointerCapture?.(evt.pointerId);
          widget.value = !widget.initialValue;
          syncButtonDisplay(true);
          return;
        }
        const timedRunning = typeof isTimedExecutionActive === "function" && isTimedExecutionActive();
        if (timedRunning) {
          pointerDownToggled = true;
          widget.value = !widget.value;
          syncButtonDisplay(true);
        } else {
          pointerDownToggled = false;
        }
      });
      toggleBtn.addEventListener("pointerup", () => {
        releaseMomentaryButton();
        clearButtonInteraction();
      });
      toggleBtn.addEventListener("pointercancel", () => {
        releaseMomentaryButton();
        pointerDownToggled = false;
        clearButtonInteraction();
      });
      toggleBtn.addEventListener("blur", () => {
        releaseMomentaryButton();
        clearButtonInteraction();
      });
      toggleBtn.addEventListener("click", (evt) => {
        if (lockedForRun) {
          return;
        }
        evt.stopPropagation();
        if (isMomentary()) {
          return;
        }
        if (pointerDownToggled) {
          pointerDownToggled = false;
          return;
        }
        widget.value = !widget.value;
        syncButtonDisplay(true);
        clearButtonInteraction();
        renderWidgets();
      });
      toggleBtn.addEventListener("keydown", (evt) => {
        if (!isMomentary() || (evt.key !== " " && evt.key !== "Enter") || buttonHeld) return;
        evt.preventDefault();
        buttonHeld = true;
        widget.value = !widget.initialValue;
        syncButtonDisplay(true);
      });
      toggleBtn.addEventListener("keyup", (evt) => {
        if (!isMomentary() || (evt.key !== " " && evt.key !== "Enter")) return;
        evt.preventDefault();
        releaseMomentaryButton();
      });

      buttonWrap.appendChild(toggleBtn);
      body.appendChild(buttonWrap);
    } else if (widget.type === "text") {
      renderTextWidgetBody(body, widget);
    }

    const resize = document.createElement("div");
    resize.className = "value-widget-resize";
    resize.addEventListener("pointerdown", (evt) => {
      if (typeof isTabletCanvasPanMode === "function" && isTabletCanvasPanMode()) {
        return;
      }
      evt.stopPropagation();
      if (isEditingUiLocked()) {
        return;
      }
      ui.widgetResize = {
        widgetId: widget.id,
        pointerId: evt.pointerId,
        startClientX: evt.clientX,
        startClientY: evt.clientY,
        startWidth: widget.width,
        startHeight: widget.height,
      };
      evt.currentTarget?.setPointerCapture?.(evt.pointerId);
      beginTransaction();
    });

    root.appendChild(header);
    root.appendChild(body);
    root.appendChild(resize);
    widgetLayer.appendChild(root);
  });
}

function startEdgeCreateFromNode(nodeId, pointerId, p) {
  const node = getNodeById(nodeId);
  if (!node) {
    return;
  }
  selectSingleNode(node.id);
  ui.edgeCreate = {
    fromId: node.id,
    pointerId,
    current: p || { x: node.x, y: node.y },
  };
  ui.edgeCreateLastPoint = p || { x: node.x, y: node.y };
  ui.edgeCreateHoverId = null;
  setStatus(t("hint.edge.4"));
}

function startEdgeCreateFromMouse(nodeId, evt) {
  startEdgeCreateFromNode(nodeId, "mouse", svgPointFromClient(evt.clientX, evt.clientY));
  render();
}

function updateEdgeCreateFromClient(clientX, clientY) {
  if (!ui.edgeCreate) {
    return;
  }
  const pRaw = svgPointFromClient(clientX, clientY);
  ui.edgeCreate.current = snapPoint(pRaw);
  ui.edgeCreateLastPoint = pRaw;
  ui.edgeCreateHoverId = nodeIdAtClient(clientX, clientY) ?? nodeIdAtGraphPoint(pRaw);
}

function finishEdgeCreateFromClient(clientX, clientY) {
  if (!ui.edgeCreate) {
    return;
  }
  const dropPoint = ui.edgeCreateLastPoint || svgPointFromClient(clientX, clientY);
  const toId =
    ui.edgeCreateHoverId ??
    nodeIdAtClient(clientX, clientY) ??
    nodeIdAtGraphPoint(dropPoint);
  const fromId = ui.edgeCreate.fromId;
  ui.edgeCreate = null;
  ui.edgeCreateHoverId = null;
  ui.edgeCreateLastPoint = null;

  if (toId != null) {
    let created = false;
    runAction(() => {
      created = Boolean(addEdge(fromId, toId));
    });
    if (created) {
      setStatusKey("status.edgeCreated");
    }
  } else {
    setStatusKey("status.edgeCanceled");
    render();
  }
}

function removeControlPoint(edgeId, cpIndex) {
  const edge = getEdgeById(edgeId);
  if (!edge || !edge.controlPoints[cpIndex]) {
    return;
  }

  edge.controlPoints.splice(cpIndex, 1);
  if (
    ui.selectedControlPoint &&
    ui.selectedControlPoint.edgeId === edgeId &&
    ui.selectedControlPoint.index === cpIndex
  ) {
    ui.selectedControlPoint = null;
  }
}

function removeSelected() {
  if (ui.selectedControlPoint) {
    runAction(() => {
      removeControlPoint(ui.selectedControlPoint.edgeId, ui.selectedControlPoint.index);
    });
    return;
  }

  if (ui.selectedNodes.size > 0) {
    runAction(() => {
      const selectedIds = new Set(ui.selectedNodes);
      graph.nodes
        .filter((n) => selectedIds.has(n.id))
        .forEach((n) => removeNodeFromInputWidgetBindings(n.name));
      graph.nodes = graph.nodes.filter((n) => !selectedIds.has(n.id));
      graph.edges = graph.edges.filter((e) => !selectedIds.has(e.from) && !selectedIds.has(e.to));
      clearAllSelection();
      setStatusKey("status.nodesDeleted");
    });
    return;
  }

  if (ui.selected?.type === "edge") {
    runAction(() => {
      graph.edges = graph.edges.filter((e) => e.id !== ui.selected.id);
      clearAllSelection();
      setStatusKey("status.edgeDeleted");
    });
    return;
  }

  if (ui.selected?.type === "edgeLabel") {
    runAction(() => {
      const edge = getEdgeById(ui.selected.id);
      if (edge) {
        edge.label = null;
      }
      clearAllSelection();
      setStatusKey("status.edgeLabelDeleted");
    });
    return;
  }

  if (ui.selected?.type === "widget") {
    runWidgetAction(() => {
      graph.widgets = graph.widgets.filter((w) => w.id !== ui.selected.id);
      clearAllSelection();
      setStatusKey("status.widgetDeleted");
    });
    return;
  }

  if (ui.selected?.type === "text") {
    runAction(() => {
      graph.textItems = graph.textItems.filter((item) => item.id !== ui.selected.id);
      clearAllSelection();
      setStatusKey("status.textDeleted");
    });
  }
}

function distancePointToSegment(p, a, b) {
  const abx = b.x - a.x;
  const aby = b.y - a.y;
  const apx = p.x - a.x;
  const apy = p.y - a.y;
  const ab2 = abx * abx + aby * aby || 1;
  const t = clamp((apx * abx + apy * aby) / ab2, 0, 1);
  const qx = a.x + t * abx;
  const qy = a.y + t * aby;
  const dx = p.x - qx;
  const dy = p.y - qy;
  return { distance: Math.hypot(dx, dy), t };
}

function addControlPointAt(edge, p) {
  const geom = buildEdgeGeometry(edge);
  if (!geom) {
    return;
  }

  let insertAt = edge.controlPoints.length;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let i = 0; i < geom.points.length - 1; i += 1) {
    const d = distancePointToSegment(p, geom.points[i], geom.points[i + 1]);
    if (d.distance < bestDistance) {
      bestDistance = d.distance;
      insertAt = i;
    }
  }

  const snapped = snapPoint(p);
  edge.controlPoints.splice(insertAt, 0, { x: snapped.x, y: snapped.y });
  ui.selectedControlPoint = { edgeId: edge.id, index: insertAt };
}

function nodeIdAtClient(clientX, clientY) {
  const elements = document.elementsFromPoint(clientX, clientY);
  for (const el of elements) {
    const group = el.closest?.(".node");
    if (group) {
      return Number(group.dataset.nodeId);
    }
  }
  return null;
}

function pointInsideNode(node, p) {
  const dx = p.x - node.x;
  const dy = p.y - node.y;
  const hw = node.width / 2;
  const hh = node.height / 2;

  if (node.shape === "ellipse") {
    const v = (dx * dx) / (hw * hw) + (dy * dy) / (hh * hh);
    return v <= 1;
  }
  if (node.shape === "diamond") {
    const v = Math.abs(dx) / hw + Math.abs(dy) / hh;
    return v <= 1;
  }
  return Math.abs(dx) <= hw && Math.abs(dy) <= hh;
}

function nodeIdAtGraphPoint(p) {
  for (let i = graph.nodes.length - 1; i >= 0; i -= 1) {
    const node = graph.nodes[i];
    if (pointInsideNode(node, p)) {
      return node.id;
    }
  }
  return null;
}

function openBackgroundContextMenu(evt) {
  if (isEditingUiLocked()) {
    return;
  }
  const p = svgPointFromClient(evt.clientX, evt.clientY);
  showContextMenu(evt.clientX, evt.clientY, [
    {
      title: true,
      label: t("menu.insert.group.nodes"),
    },
    {
      label: t("context.bg.newRect"),
      icon: "▭",
      action: () => {
        runAction(() => addNode("rect", p));
        setStatusKey("status.nodeCreated");
      },
    },
    {
      label: t("context.bg.newEllipse"),
      icon: "○",
      action: () => {
        runAction(() => addNode("ellipse", p));
        setStatusKey("status.nodeCreated");
      },
    },
    {
      label: t("context.bg.newDiamond"),
      icon: "◇",
      action: () => {
        runAction(() => addNode("diamond", p));
        setStatusKey("status.nodeCreated");
      },
    },
    {
      label: t("context.bg.newSubmodel"),
      icon: "▣",
      action: () => {
        runAction(() => addNode("submodel", p));
        setStatusKey("status.nodeCreated");
      },
    },
    { separator: true },
    {
      title: true,
      label: t("menu.insert.group.inputWidgets"),
    },
    {
      label: t("context.bg.newButtonWidget"),
      icon: "◉",
      action: () => {
        runWidgetAction(() => addButtonWidget({ x: p.x, y: p.y }));
        setStatusKey("status.widgetButtonCreated");
      },
    },
    {
      label: t("context.bg.newSelectWidget"),
      icon: "▾",
      action: () => {
        runWidgetAction(() => addSelectWidget({ x: p.x, y: p.y }));
        setStatusKey("status.widgetSelectCreated");
      },
    },
    {
      label: t("context.bg.newSliderWidget"),
      icon: "━●",
      action: () => {
        runWidgetAction(() => addSliderWidget({ x: p.x, y: p.y }));
        setStatusKey("status.widgetSliderCreated");
      },
    },
    { separator: true },
    {
      title: true,
      label: t("menu.insert.group.outputWidgets"),
    },
    {
      label: t("context.bg.newLedWidget"),
      icon: "●",
      action: () => {
        runWidgetAction(() => addLedWidget({ x: p.x, y: p.y }));
        setStatusKey("status.widgetLedCreated");
      },
    },
    {
      label: t("context.bg.newTextWidget"),
      icon: "¶",
      action: () => {
        runWidgetAction(() => addTextWidget({ x: p.x, y: p.y }));
        setStatusKey("status.widgetTextCreated");
      },
    },
    {
      label: t("context.bg.newMatrixWidget"),
      icon: "▦",
      action: () => {
        runWidgetAction(() => addMatrixWidget({ x: p.x, y: p.y }));
        setStatusKey("status.widgetMatrixCreated");
      },
    },
    {
      label: t("context.bg.newTableWidget"),
      icon: "▤",
      action: () => {
        runWidgetAction(() => addTableWidget({ x: p.x, y: p.y }));
        setStatusKey("status.widgetCreated");
      },
    },
    {
      label: t("context.bg.newXYChartWidget"),
      icon: "⌁",
      action: () => {
        runWidgetAction(() => addXYChartWidget({ x: p.x, y: p.y }));
        setStatusKey("status.widgetChartCreated");
      },
    },
    { separator: true },
    {
      title: true,
      label: t("menu.insert.group.content"),
    },
    {
      label: t("context.bg.newText"),
      icon: "T",
      action: () => {
        runAction(() => addCanvasText({ x: p.x, y: p.y }));
        setStatusKey("status.textCreated");
      },
    },
  ]);
}

function openNodeContextMenu(evt, node) {
  if (isEditingUiLocked()) {
    return;
  }
  const useSelectionDelete = ui.selectedNodes.has(node.id) && ui.selectedNodes.size > 0;
  showContextMenu(evt.clientX, evt.clientY, [
    {
      label: t("context.node.rename"),
      action: () => {
        selectSingleNode(node.id);
        render();
        nodeNameInput.focus();
        nodeNameInput.select();
        setStatusKey("status.renameNode");
      },
    },
    {
      label: t("context.node.addProp"),
      action: () => {
        runAction(() => {
          const target = getNodeById(node.id);
          if (target) {
            target.properties.push({ key: "", value: "" });
          }
        });
        setStatusKey("status.propertyAdded");
      },
    },
    ...(isSubmodelNode(node)
      ? [{
        label: t("action.openSubmodel"),
        action: () => {
          void openSubmodelNodeInNewTab(node);
        },
      }]
      : []),
    {
      label: t("context.node.newLinked"),
      action: () => {
        runAction(() => {
          const p = { x: node.x + 180, y: node.y };
          addNode("rect", p);
          const createdNodeId = [...ui.selectedNodes][0];
          addEdge(node.id, createdNodeId);
        });
        setStatusKey("status.linkedNodeCreated");
      },
    },
    {
      label: useSelectionDelete ? t("menu.edit.delete") : t("context.node.delete"),
      action: () => {
        if (useSelectionDelete) {
          removeSelected();
          return;
        }
        runAction(() => {
          removeNodeFromInputWidgetBindings(node.name);
          graph.nodes = graph.nodes.filter((n) => n.id !== node.id);
          graph.edges = graph.edges.filter((e) => e.from !== node.id && e.to !== node.id);
          clearAllSelection();
        });
        setStatusKey("status.nodeDeleted");
      },
    },
  ]);
}

function openWidgetContextMenu(evt, widget) {
  if (isEditingUiLocked()) {
    return;
  }
  const wasMinimized = Boolean(widget.minimized);
  const items = [];
  if (widget.type === "table" || widget.type === "matrix") {
    items.push({
      label: t("context.widget.copy"),
      action: async () => {
        const content = widgetRenderedText(widget);
        const ok = await copyTextToClipboard(content);
        setStatusKey(ok ? "status.widgetCopied" : "status.clipboardEmpty");
      },
      disabled: !widgetRenderedText(widget),
    });
  }
  items.push(
    {
      label: widget.showTitleBar === false ? t("context.widget.showTitleBar") : t("context.widget.hideTitleBar"),
      action: () => {
        runWidgetAction(() => {
          const target = graph.widgets.find((w) => w.id === widget.id);
          if (target) {
            target.showTitleBar = target.showTitleBar === false;
          }
        });
      },
    },
    {
      label: wasMinimized ? t("context.widget.restore") : t("context.widget.minimize"),
      action: () => {
        runWidgetAction(() => {
          const target = graph.widgets.find((w) => w.id === widget.id);
          if (target) {
            target.minimized = !target.minimized;
          }
        });
        setStatusKey(wasMinimized ? "status.widgetRestored" : "status.widgetMinimized");
      },
    },
    {
      label: t("context.widget.delete"),
      action: () => {
        runWidgetAction(() => {
          graph.widgets = graph.widgets.filter((w) => w.id !== widget.id);
          clearAllSelection();
        });
        setStatusKey("status.widgetDeleted");
      },
    },
  );
  showContextMenu(evt.clientX, evt.clientY, items);
}

function openTextContextMenu(evt, item) {
  if (isEditingUiLocked()) {
    return;
  }
  showContextMenu(evt.clientX, evt.clientY, [
    {
      label: t("context.text.edit"),
      action: () => {
        selectTextItem(item.id);
        render();
        window.requestAnimationFrame(() => {
          const editorModal = document.getElementById("textEditorModal");
          const editorInput = document.getElementById("textEditorInput");
          if (editorModal) {
            editorModal.classList.remove("hidden");
          }
          if (editorInput) {
            editorInput.value = String(item.html ?? "");
            editorInput.focus();
            editorInput.select();
          }
        });
      },
    },
    {
      label: t("context.text.delete"),
      action: () => {
        runAction(() => {
          graph.textItems = graph.textItems.filter((entry) => entry.id !== item.id);
          clearAllSelection();
        });
        setStatusKey("status.textDeleted");
      },
    },
  ]);
}

function openEdgeContextMenu(evt, edgeId, atPoint) {
  const edge = getEdgeById(edgeId);
  if (!edge) {
    return;
  }

  showContextMenu(evt.clientX, evt.clientY, [
    {
      label: t("context.edge.addCp"),
      action: () => {
        runAction(() => {
          const target = getEdgeById(edgeId);
          if (!target) {
            return;
          }
          selectEdge(edgeId);
          addControlPointAt(target, atPoint);
        });
        setStatusKey("status.cpAdded");
      },
    },
    {
      label: t("context.edge.clearCp"),
      action: () => {
        runAction(() => {
          const target = getEdgeById(edgeId);
          if (!target) {
            return;
          }
          target.controlPoints = [];
          selectEdge(edgeId);
        });
        setStatusKey("status.cpCleared");
      },
      disabled: edge.controlPoints.length === 0,
    },
    { separator: true },
    {
      label: edge.label?.text ? t("context.edge.editLabel") : t("context.edge.addLabel"),
      action: () => {
        const current = getEdgeById(edgeId);
        if (!current) {
          return;
        }
        const text = window.prompt(
          t("context.edge.editLabel"),
          String(current.label?.text ?? ""),
        );
        if (text == null) {
          return;
        }
        runAction(() => {
          const target = getEdgeById(edgeId);
          if (!target) {
            return;
          }
          const trimmed = String(text).trim();
          if (!trimmed) {
            target.label = null;
          } else if (target.label) {
            target.label.text = trimmed;
          } else {
            target.label = defaultEdgeLabel(target, trimmed);
          }
          selectEdge(edgeId);
        });
      },
    },
    {
      label: t("context.edge.rotateLabel"),
      action: () => {
        const current = getEdgeById(edgeId);
        if (!current?.label) {
          return;
        }
        const rotation = window.prompt(
          t("context.edge.rotateLabel"),
          String(Number(current.label.rotation) || 0),
        );
        if (rotation == null) {
          return;
        }
        const value = Number(rotation);
        if (!Number.isFinite(value)) {
          return;
        }
        runAction(() => {
          const target = getEdgeById(edgeId);
          if (target?.label) {
            target.label.rotation = value;
          }
        });
      },
      disabled: !edge.label?.text,
    },
    {
      label: t("context.edge.deleteLabel"),
      action: () => {
        runAction(() => {
          const target = getEdgeById(edgeId);
          if (target) {
            target.label = null;
          }
          clearAllSelection();
        });
        setStatusKey("status.edgeLabelDeleted");
      },
      disabled: !edge.label?.text,
    },
    { separator: true },
    {
      label: t("context.edge.delete"),
      action: () => {
        runAction(() => {
          graph.edges = graph.edges.filter((e) => e.id !== edgeId);
          clearAllSelection();
        });
        setStatusKey("status.edgeDeleted");
      },
    },
  ]);
}

function marqueeRect(m) {
  const x = Math.min(m.start.x, m.current.x);
  const y = Math.min(m.start.y, m.current.y);
  const width = Math.abs(m.current.x - m.start.x);
  const height = Math.abs(m.current.y - m.start.y);
  return { x, y, width, height };
}

function nodesInRect(rect) {
  return graph.nodes
    .filter((n) => n.x >= rect.x && n.x <= rect.x + rect.width && n.y >= rect.y && n.y <= rect.y + rect.height)
    .map((n) => n.id);
}

function normalizeNodeDescriptionProperty(node) {
  if (!node) {
    return null;
  }
  if (!Array.isArray(node.properties)) {
    node.properties = [];
  }
  const canonicalKey = descriptionPropertyKey();
  const acceptedKeys = descriptionPropertyKeys();
  const legacyValue = node.description == null ? "" : String(node.description);
  const matches = node.properties.filter((prop) => acceptedKeys.has(String(prop?.key ?? "").trim().toLowerCase()));
  let target = matches[0] || null;
  if (!target) {
    target = { key: canonicalKey, value: legacyValue };
    node.properties.unshift(target);
  } else {
    target.key = canonicalKey;
    if ((target.value == null || target.value === "") && legacyValue) {
      target.value = legacyValue;
    }
  }
  for (let i = node.properties.length - 1; i >= 0; i -= 1) {
    const prop = node.properties[i];
    if (prop !== target && acceptedKeys.has(String(prop?.key ?? "").trim().toLowerCase())) {
      node.properties.splice(i, 1);
    }
  }
  delete node.description;
  return target;
}

function getNodeDescription(node) {
  return String(normalizeNodeDescriptionProperty(node)?.value ?? "").trim();
}

function normalizeNodeFormulaNotesProperty(node) {
  if (!node) {
    return null;
  }
  if (!Array.isArray(node.properties)) {
    node.properties = [];
  }
  const canonicalKey = formulaNotesPropertyKey();
  const acceptedKeys = formulaNotesPropertyKeys();
  const matches = node.properties.filter((prop) => acceptedKeys.has(String(prop?.key ?? "").trim().toLowerCase()));
  let target = matches[0] || null;
  if (!target) {
    target = { key: canonicalKey, value: "" };
    node.properties.unshift(target);
  } else {
    target.key = canonicalKey;
  }
  for (let i = node.properties.length - 1; i >= 0; i -= 1) {
    const prop = node.properties[i];
    if (prop !== target && acceptedKeys.has(String(prop?.key ?? "").trim().toLowerCase())) {
      node.properties.splice(i, 1);
    }
  }
  return target;
}

function getNodeFormulaNotes(node) {
  return String(normalizeNodeFormulaNotesProperty(node)?.value ?? "").trim();
}

function buildNodeTooltipText(node) {
  if (!node) {
    return { text: "", tone: "" };
  }
  const description = getNodeDescription(node);
  if (node.computedValue != null) {
    const valueText = summarizeTooltipValue(node.computedValue);
    return { text: description ? `${description}: ${valueText}` : valueText, tone: "value" };
  }
  if (String(node.computedError || "").trim()) {
    const errorText = localizeExpressionErrorMessage(node.computedError);
    return { text: description ? `${description}: ${errorText}` : errorText, tone: "error" };
  }
  return { text: description, tone: "" };
}

function canvasTextDisplayHtml(item) {
  const sanitized = sanitizeRichTextHtml(item?.html ?? "");
  return sanitized || `<p>${t("text.defaultCanvasText")}</p>`;
}

function updateSelectedTextHtml(nextValue) {
  const item = ui.selected?.type === "text" ? getTextItemById(ui.selected.id) : null;
  const panelInput = document.getElementById("textHtmlInput");
  const editorInput = document.getElementById("textEditorInput");
  if (!item || (!panelInput && !editorInput)) {
    return false;
  }
  if (panelInput && document.activeElement !== panelInput) {
    panelInput.value = nextValue;
  }
  if (editorInput && document.activeElement !== editorInput) {
    editorInput.value = nextValue;
  }
  item.html = String(nextValue ?? "");
  sanitizeTextItem(item);
  dirtySinceLastSave = true;
  updateFileStatusLabel(true);
  render();
  return true;
}

function activeTextHtmlInput() {
  const panelInput = document.getElementById("textHtmlInput");
  const editorInput = document.getElementById("textEditorInput");
  const editorModal = document.getElementById("textEditorModal");
  if (document.activeElement === editorInput || (editorModal && editorModal.contains(document.activeElement))) {
    return editorInput;
  }
  return panelInput || editorInput;
}

function wrapTextSelection(startTag, endTag, placeholder = "testo") {
  const input = activeTextHtmlInput();
  if (!input) {
    return;
  }
  const start = input.selectionStart ?? 0;
  const end = input.selectionEnd ?? 0;
  const current = input.value || "";
  const selected = start === end ? placeholder : current.slice(start, end);
  const nextValue = `${current.slice(0, start)}${startTag}${selected}${endTag}${current.slice(end)}`;
  if (!updateSelectedTextHtml(nextValue)) {
    return;
  }
  const nextStart = start + startTag.length;
  const nextEnd = nextStart + selected.length;
  input.focus();
  input.value = nextValue;
  input.setSelectionRange(nextStart, nextEnd);
}

function insertTextHtmlSnippet(snippet) {
  const input = activeTextHtmlInput();
  if (!input) {
    return;
  }
  const start = input.selectionStart ?? 0;
  const end = input.selectionEnd ?? 0;
  const current = input.value || "";
  const nextValue = `${current.slice(0, start)}${snippet}${current.slice(end)}`;
  if (!updateSelectedTextHtml(nextValue)) {
    return;
  }
  const caret = start + snippet.length;
  input.focus();
  input.value = nextValue;
  input.setSelectionRange(caret, caret);
}

function renderPropertiesEditor(container, items, ownerKey, deleteHandler, options = {}) {
  const activeEl = document.activeElement;
  const activeInPropsEditor =
    container.contains(activeEl) &&
    (activeEl?.tagName === "INPUT" || activeEl?.tagName === "TEXTAREA" || activeEl?.tagName === "SELECT");
  if (activeInPropsEditor && container.dataset.ownerKey === ownerKey) {
    return true;
  }

  container.innerHTML = "";
  container.dataset.ownerKey = ownerKey;
  if (!Array.isArray(items) || items.length === 0) {
    const msg = document.createElement("div");
    msg.className = "empty-props";
    msg.textContent = t("text.noneProps");
    container.appendChild(msg);
    return false;
  }

  const isLockedKey = typeof options.isLockedKey === "function" ? options.isLockedKey : () => false;
  items.forEach((prop, idx) => {
    const row = document.createElement("div");
    row.className = "prop-row";
    const locked = isLockedKey(prop, idx);
    if (locked) {
      row.classList.add("prop-row-locked");
    }

    const keyInput = document.createElement("input");
    keyInput.placeholder = t("prop.keyPlaceholder");
    keyInput.value = prop.key;
    if (locked) {
      keyInput.readOnly = true;
      keyInput.tabIndex = -1;
      keyInput.classList.add("display-only-input");
    } else {
      keyInput.addEventListener("input", () => {
        prop.key = keyInput.value;
      });
    }

    const valueInput = document.createElement("input");
    valueInput.placeholder = t("prop.valuePlaceholder");
    valueInput.value = prop.value;
    valueInput.addEventListener("input", () => {
      prop.value = valueInput.value;
    });
    if (locked) {
      setTooltipText(valueInput, t("tooltip.node.description"));
    }

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "X";
    if (locked) {
      delBtn.disabled = true;
      delBtn.classList.add("hidden");
    } else {
      delBtn.addEventListener("click", () => {
        delete container.dataset.ownerKey;
        runAction(() => {
          deleteHandler(idx);
        });
      });
    }

    row.appendChild(keyInput);
    row.appendChild(valueInput);
    row.appendChild(delBtn);
    container.appendChild(row);
  });
  return false;
}

function openTableColumnPropertiesPopup(widget, colName) {
  const current = tableColumnOptions(widget, colName);
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  const card = document.createElement("div");
  card.className = "modal-card";
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-modal", "true");
  const head = document.createElement("div");
  head.className = "modal-head";
  const title = document.createElement("h3");
  title.textContent = `${t("widget.tableColumnProperties")}: ${colName === "time" ? t("widget.xSourceTime") : colName}`;
  const close = document.createElement("button");
  close.type = "button";
  close.className = "icon-btn modal-close-btn";
  close.textContent = "×";
  const body = document.createElement("div");
  body.className = "widget-config-grid";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = current.label;
  nameInput.placeholder = colName;
  const alignInput = document.createElement("select");
  [["", t("widget.tableUseDefault")], ["left", t("widget.tableAlign.left")], ["center", t("widget.tableAlign.center")], ["right", t("widget.tableAlign.right")]].forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    alignInput.appendChild(option);
  });
  alignInput.value = current.align;
  const decimalsInput = document.createElement("select");
  [["", t("widget.tableUseDefault")], ...Array.from({ length: 13 }, (_unused, digits) => [String(digits), String(digits)])].forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    decimalsInput.appendChild(option);
  });
  decimalsInput.value = current.decimalDigits == null ? "" : String(current.decimalDigits);
  const appendField = (labelKey, input) => {
    const label = document.createElement("label");
    label.className = "compact-field";
    const text = document.createElement("span");
    text.textContent = t(labelKey);
    label.append(text, input);
    body.appendChild(label);
  };
  appendField("widget.tableDisplayName", nameInput);
  appendField("widget.tableAlign", alignInput);
  appendField("widget.tableDecimals", decimalsInput);
  const actions = document.createElement("div");
  actions.className = "modal-actions";
  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.textContent = t("action.cancel");
  const apply = document.createElement("button");
  apply.type = "button";
  apply.textContent = t("action.apply");
  const dismiss = () => backdrop.remove();
  close.addEventListener("click", dismiss);
  cancel.addEventListener("click", dismiss);
  backdrop.addEventListener("pointerdown", (evt) => {
    if (evt.target === backdrop) dismiss();
  });
  apply.addEventListener("click", () => {
    runWidgetAction(() => {
      widget.tableColumnOptions[colName] = {
        label: nameInput.value.trim(),
        align: alignInput.value,
        decimalDigits: decimalsInput.value === "" ? null : Number(decimalsInput.value),
      };
      sanitizeTableWidgetOptions(widget);
    });
    dismiss();
  });
  head.append(title, close);
  actions.append(cancel, apply);
  card.append(head, body, actions);
  backdrop.appendChild(card);
  document.body.appendChild(backdrop);
  nameInput.focus();
}

function refreshWidgetConfigPanel(widget) {
  // Widget presentation and bindings do not invalidate the current runtime
  // state. Keep this scope separate from edits to node definitions.
  const runAction = runWidgetAction;
  widgetConfig.innerHTML = "";
  widgetConfig.className = "widget-config-grid";
  sanitizeWidgetPresentationOptions(widget);

  const createWidgetSection = (advanced = false) => {
    const section = document.createElement("div");
    section.className = "panel-section compact-panel-section";
    if (advanced) {
      section.classList.add("tablet-advanced-details");
    }
    widgetConfig.appendChild(section);
    return section;
  };

  const appendWidgetSectionTitle = (section, labelKey) => {
    const title = document.createElement("h4");
    title.className = "widget-section-title";
    title.textContent = t(labelKey);
    section.appendChild(title);
    return title;
  };

  const setConfigTooltip = (element, tooltipKey, fallbackKey = tooltipKey) => {
    if (!element) {
      return;
    }
    setTooltipText(element, t(tooltipKey || fallbackKey));
  };

  const compactFieldTooltipKeys = {
    "widget.sliderMin": "tooltip.widget.sliderMin",
    "widget.sliderStep": "tooltip.widget.sliderStep",
    "widget.sliderMax": "tooltip.widget.sliderMax",
    "widget.binaryFalseLabel": "tooltip.widget.binaryFalseLabel",
    "widget.binaryTrueLabel": "tooltip.widget.binaryTrueLabel",
    "widget.matrixViewMode": "tooltip.widget.matrixViewMode",
    "widget.matrixCellSize": "tooltip.widget.matrixCellSize",
    "widget.matrixColorSchemeLabel": "tooltip.widget.matrixColorScheme",
    "widget.matrixSurfaceStyle": "tooltip.widget.matrixSurfaceStyle",
    "widget.matrixSurfaceHeightScale": "tooltip.widget.matrixSurfaceHeightScale",
    "widget.matrixSurfaceAzimuth": "tooltip.widget.matrixSurfaceAzimuth",
    "widget.matrixSurfaceElevation": "tooltip.widget.matrixSurfaceElevation",
    "widget.matrixValueMin": "tooltip.widget.matrixValueMin",
    "widget.matrixValueMax": "tooltip.widget.matrixValueMax",
    "widget.matrixDisplayRows": "tooltip.widget.matrixDisplayRows",
    "widget.matrixDisplayCols": "tooltip.widget.matrixDisplayCols",
    "widget.tableAlign": "tooltip.widget.tableAlign",
    "widget.tableDecimals": "tooltip.widget.tableDecimals",
    "widget.lineStyle": "tooltip.widget.lineStyle",
    "widget.lineWidthShort": "tooltip.widget.lineWidth",
    "widget.seriesPoints": "tooltip.widget.seriesPoints",
    "widget.pointSizeShort": "tooltip.widget.pointSize",
    "widget.lineColor": "tooltip.widget.lineColor",
    "widget.pointColor": "tooltip.widget.pointColor",
    "widget.axisXMin": "tooltip.widget.axisXMin",
    "widget.axisXMax": "tooltip.widget.axisXMax",
    "widget.axisYMin": "tooltip.widget.axisYMin",
    "widget.axisYMax": "tooltip.widget.axisYMax",
    "widget.legendPosition": "tooltip.widget.legendPosition",
  };

  const createCompactField = (labelKey, inputEl, tooltipKey = labelKey) => {
    const wrap = document.createElement("label");
    wrap.className = "compact-field";
    const text = document.createElement("span");
    text.textContent = t(labelKey);
    wrap.appendChild(text);
    wrap.appendChild(inputEl);
    const resolvedTooltipKey = tooltipKey === labelKey
      ? (compactFieldTooltipKeys[labelKey] || labelKey)
      : tooltipKey;
    setConfigTooltip(wrap, resolvedTooltipKey, labelKey);
    setConfigTooltip(inputEl, resolvedTooltipKey, labelKey);
    return wrap;
  };

  const mainSection = createWidgetSection(true);

  const titleRow = document.createElement("div");
  titleRow.className = "widget-title-row";
  const titleLabel = document.createElement("span");
  titleLabel.textContent = t("widget.customTitleLabel");
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = t("widget.customTitlePlaceholder");
  titleInput.value = String(widget.customTitle ?? "");
  titleInput.addEventListener("change", () => {
    runAction(() => {
      widget.customTitle = titleInput.value;
    });
  });
  setConfigTooltip(titleInput, "tooltip.widget.customTitle");
  const fontSizeInput = document.createElement("input");
  fontSizeInput.type = "number";
  fontSizeInput.min = "8";
  fontSizeInput.max = "32";
  fontSizeInput.step = "1";
  fontSizeInput.value = String(widget.fontSize);
  fontSizeInput.addEventListener("change", () => {
    runAction(() => {
      widget.fontSize = Number(fontSizeInput.value);
      sanitizeWidgetPresentationOptions(widget);
    });
    fontSizeInput.value = String(widget.fontSize);
  });
  const titleBarLabel = document.createElement("label");
  titleBarLabel.className = "menu-check compact-bool";
  const titleBarInput = document.createElement("input");
  titleBarInput.type = "checkbox";
  titleBarInput.checked = widget.showTitleBar !== false;
  titleBarInput.addEventListener("change", () => {
    runAction(() => {
      widget.showTitleBar = titleBarInput.checked;
    });
  });
  const titleBarText = document.createElement("span");
  titleBarText.textContent = t("widget.showTitleBar");
  titleBarLabel.appendChild(titleBarInput);
  titleBarLabel.appendChild(titleBarText);
  setConfigTooltip(titleBarLabel, "tooltip.widget.showTitleBar");
  titleRow.appendChild(titleLabel);
  titleRow.appendChild(titleBarLabel);
  mainSection.appendChild(titleRow);
  mainSection.appendChild(titleInput);
  if (widget.type !== "matrix") {
    const fontRow = document.createElement("div");
    fontRow.className = "widget-font-row";
    const fontLabel = document.createElement("span");
    fontLabel.textContent = t("widget.fontSize");
    fontRow.appendChild(fontLabel);
    fontRow.appendChild(fontSizeInput);
    setConfigTooltip(fontRow, "tooltip.widget.fontSize");
    mainSection.appendChild(fontRow);
  }

  const outputNodeNames = outputWidgetNodeNames();
  const nodeNames = outputNodeNames;

  if (widget.type === "slider") {
    sanitizeSliderWidgetOptions(widget);
    const sliderSection = createWidgetSection();
    const sourceLabel = document.createElement("label");
    sourceLabel.textContent = t("widget.sliderSourceLabel");
    const sourceSelect = document.createElement("select");
    const sliderChoices = ["", ...sliderBindableNodeNames(widget.id, widget.source)];
    sliderChoices.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name || t("widget.noneOption");
      sourceSelect.appendChild(opt);
    });
    sourceSelect.value = sliderChoices.includes(widget.source) ? widget.source : "";
    sourceSelect.addEventListener("change", () => {
      runAction(() => {
        widget.source = sourceSelect.value;
      });
    });
    sliderSection.appendChild(sourceLabel);
    sliderSection.appendChild(sourceSelect);
    setConfigTooltip(sourceLabel, "tooltip.widget.inputSource");
    setConfigTooltip(sourceSelect, "tooltip.widget.inputSource");

    const limitsLabel = document.createElement("label");
    limitsLabel.textContent = t("widget.sliderRangeLabel");
    sliderSection.appendChild(limitsLabel);
    setConfigTooltip(limitsLabel, "tooltip.widget.sliderRange");

    const rangeRow = document.createElement("div");
    rangeRow.className = "row3-exec";
    const minInput = document.createElement("input");
    minInput.type = "number";
    minInput.step = "any";
    minInput.value = String(widget.min);
    minInput.addEventListener("change", () => {
      runAction(() => {
        widget.min = Number(minInput.value);
        sanitizeSliderWidgetOptions(widget);
      });
    });
    const stepInput = document.createElement("input");
    stepInput.type = "number";
    stepInput.step = "any";
    stepInput.min = "0.0000001";
    stepInput.value = String(widget.step);
    stepInput.addEventListener("change", () => {
      runAction(() => {
        widget.step = Number(stepInput.value);
        sanitizeSliderWidgetOptions(widget);
      });
    });
    const maxInput = document.createElement("input");
    maxInput.type = "number";
    maxInput.step = "any";
    maxInput.value = String(widget.max);
    maxInput.addEventListener("change", () => {
      runAction(() => {
        widget.max = Number(maxInput.value);
        sanitizeSliderWidgetOptions(widget);
      });
    });
    rangeRow.appendChild(createCompactField("widget.sliderMin", minInput));
    rangeRow.appendChild(createCompactField("widget.sliderStep", stepInput));
    rangeRow.appendChild(createCompactField("widget.sliderMax", maxInput));
    sliderSection.appendChild(rangeRow);
    return;
  }

  if (widget.type === "button") {
    sanitizeButtonWidgetOptions(widget);
    const buttonSection = createWidgetSection();
    const sourceLabel = document.createElement("label");
    sourceLabel.textContent = t("widget.buttonSourceLabel");
    const sourceSelect = document.createElement("select");
    const buttonChoices = ["", ...buttonBindableNodeNames(widget.id, widget.source)];
    buttonChoices.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name || t("widget.noneOption");
      sourceSelect.appendChild(opt);
    });
    sourceSelect.value = buttonChoices.includes(widget.source) ? widget.source : "";
    sourceSelect.addEventListener("change", () => {
      runAction(() => {
        widget.source = sourceSelect.value;
        sanitizeButtonWidgetOptions(widget);
      });
    });
    buttonSection.appendChild(sourceLabel);
    buttonSection.appendChild(sourceSelect);
    setConfigTooltip(sourceLabel, "tooltip.widget.inputSource");
    setConfigTooltip(sourceSelect, "tooltip.widget.inputSource");

    const valueLabel = document.createElement("label");
    valueLabel.className = "menu-check compact-bool";
    const valueInput = document.createElement("input");
    valueInput.type = "checkbox";
    valueInput.checked = widget.initialValue === true;
    valueInput.addEventListener("change", () => {
      runAction(() => {
        widget.initialValue = valueInput.checked;
        if (!isEditingUiLocked()) {
          widget.value = widget.initialValue;
        }
        sanitizeButtonWidgetOptions(widget);
      });
      valueInput.checked = widget.initialValue === true;
    });
    const valueText = document.createElement("span");
    valueText.textContent = t("widget.buttonValueLabel");
    valueLabel.appendChild(valueInput);
    valueLabel.appendChild(valueText);
    setConfigTooltip(valueLabel, "tooltip.widget.buttonInitialValue");
    buttonSection.appendChild(valueLabel);

    const modeLabel = document.createElement("label");
    modeLabel.textContent = t("widget.buttonModeLabel");
    const modeSelect = document.createElement("select");
    [["toggle", "widget.buttonMode.toggle"], ["momentary", "widget.buttonMode.momentary"]].forEach(([value, key]) => {
      const option = document.createElement("option"); option.value = value; option.textContent = t(key); modeSelect.appendChild(option);
    });
    modeSelect.value = widget.buttonMode;
    modeSelect.addEventListener("change", () => runAction(() => { widget.buttonMode = modeSelect.value; widget.value = widget.initialValue; sanitizeButtonWidgetOptions(widget); }));
    buttonSection.appendChild(modeLabel);
    buttonSection.appendChild(modeSelect);
    setConfigTooltip(modeSelect, "tooltip.widget.buttonMode");

    const labelsRow = document.createElement("div");
    labelsRow.className = "row2-exec";
    const falseLabelInput = document.createElement("input");
    falseLabelInput.type = "text";
    falseLabelInput.placeholder = t("widget.binaryLabelPlaceholder");
    falseLabelInput.value = String(widget.falseLabel ?? "");
    falseLabelInput.addEventListener("change", () => {
      runAction(() => {
        widget.falseLabel = falseLabelInput.value;
        sanitizeButtonWidgetOptions(widget);
      });
      falseLabelInput.value = String(widget.falseLabel ?? "");
    });
    const trueLabelInput = document.createElement("input");
    trueLabelInput.type = "text";
    trueLabelInput.placeholder = t("widget.binaryLabelPlaceholder");
    trueLabelInput.value = String(widget.trueLabel ?? "");
    trueLabelInput.addEventListener("change", () => {
      runAction(() => {
        widget.trueLabel = trueLabelInput.value;
        sanitizeButtonWidgetOptions(widget);
      });
      trueLabelInput.value = String(widget.trueLabel ?? "");
    });
    labelsRow.appendChild(createCompactField("widget.binaryFalseLabel", falseLabelInput));
    labelsRow.appendChild(createCompactField("widget.binaryTrueLabel", trueLabelInput));
    buttonSection.appendChild(labelsRow);
    return;
  }

  if (widget.type === "select") {
    sanitizeSelectWidgetOptions(widget);
    const selectSection = createWidgetSection();
    const sourceLabel = document.createElement("label");
    sourceLabel.textContent = t("widget.selectSourceLabel");
    const sourceSelect = document.createElement("select");
    const selectChoices = ["", ...selectBindableNodeNames(widget.id, widget.source)];
    selectChoices.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name || t("widget.noneOption");
      sourceSelect.appendChild(opt);
    });
    sourceSelect.value = selectChoices.includes(widget.source) ? widget.source : "";
    sourceSelect.addEventListener("change", () => {
      runAction(() => {
        widget.source = sourceSelect.value;
        sanitizeSelectWidgetOptions(widget);
      });
    });
    selectSection.appendChild(sourceLabel);
    selectSection.appendChild(sourceSelect);
    setConfigTooltip(sourceLabel, "tooltip.widget.inputSource");
    setConfigTooltip(sourceSelect, "tooltip.widget.inputSource");

    appendWidgetSectionTitle(selectSection, "widget.selectOptions");
    const list = document.createElement("div");
    list.className = "props-list";
    widget.options.forEach((option, idx) => {
      const row = document.createElement("div");
      row.className = "prop-row";
      row.style.gridTemplateColumns = "1fr 120px auto";

      const labelInput = document.createElement("input");
      labelInput.type = "text";
      labelInput.value = option.label;
      setConfigTooltip(labelInput, "tooltip.widget.selectOptionLabel");
      labelInput.addEventListener("change", () => {
        runAction(() => {
          widget.options[idx].label = labelInput.value;
          sanitizeSelectWidgetOptions(widget);
        });
      });

      const valueInput = document.createElement("input");
      valueInput.type = "number";
      valueInput.step = "any";
      valueInput.value = String(option.value);
      setConfigTooltip(valueInput, "tooltip.widget.selectOptionValue");
      valueInput.addEventListener("change", () => {
        runAction(() => {
          widget.options[idx].value = Number(valueInput.value);
          sanitizeSelectWidgetOptions(widget);
        });
      });

      const del = document.createElement("button");
      del.type = "button";
      del.textContent = "×";
      setConfigTooltip(del, "tooltip.widget.removeOption");
      del.addEventListener("click", () => {
        runAction(() => {
          widget.options.splice(idx, 1);
          sanitizeSelectWidgetOptions(widget);
        });
      });

      row.appendChild(labelInput);
      row.appendChild(valueInput);
      row.appendChild(del);
      list.appendChild(row);
    });
    selectSection.appendChild(list);

    const add = document.createElement("button");
    add.type = "button";
    add.textContent = t("action.addOption");
    setConfigTooltip(add, "tooltip.widget.addOption");
    add.addEventListener("click", () => {
      runAction(() => {
        const nextValue = widget.options.reduce((max, option) => Math.max(max, Number(option.value) || 0), -1) + 1;
        widget.options.push({
          label: t("widget.selectOption.n", { index: widget.options.length + 1 }),
          value: nextValue,
        });
        sanitizeSelectWidgetOptions(widget);
      });
    });
    selectSection.appendChild(add);
    return;
  }

  if (widget.type === "matrix") {
    sanitizeMatrixWidgetOptions(widget);
    const matrixSection = createWidgetSection();
    const sourceLabel = document.createElement("label");
    sourceLabel.textContent = t("widget.matrixSourceLabel");
    const sourceSelect = document.createElement("select");
    const matrixChoices = ["", ...outputNodeNames];
    matrixChoices.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name || t("widget.noneOption");
      sourceSelect.appendChild(opt);
    });
    sourceSelect.value = matrixChoices.includes(widget.source) ? widget.source : "";
    sourceSelect.addEventListener("change", () => {
      runAction(() => {
        widget.source = sourceSelect.value;
        widget.lastMatrixValue = null;
        sanitizeMatrixWidgetOptions(widget);
      });
    });
    matrixSection.appendChild(sourceLabel);
    matrixSection.appendChild(sourceSelect);
    setConfigTooltip(sourceLabel, "tooltip.widget.outputSource");
    setConfigTooltip(sourceSelect, "tooltip.widget.outputSource");

    const valuesLabel = document.createElement("label");
    valuesLabel.className = "menu-check compact-bool";
    const valuesInput = document.createElement("input");
    valuesInput.type = "checkbox";
    valuesInput.checked = widget.showNumericValues !== false;
    valuesInput.addEventListener("change", () => {
      runAction(() => {
        widget.showNumericValues = valuesInput.checked;
      });
    });
    const valuesText = document.createElement("span");
    valuesText.textContent = t("widget.matrixShowValues");
    valuesLabel.appendChild(valuesInput);
    valuesLabel.appendChild(valuesText);
    setConfigTooltip(valuesLabel, "tooltip.widget.matrixShowValues");
    if (widget.viewMode === "grid") {
      matrixSection.appendChild(valuesLabel);
    }

    const indicesLabel = document.createElement("label");
    indicesLabel.className = "menu-check compact-bool";
    const indicesInput = document.createElement("input");
    indicesInput.type = "checkbox";
    indicesInput.checked = widget.showIndices !== false;
    indicesInput.addEventListener("change", () => {
      runAction(() => {
        widget.showIndices = indicesInput.checked;
      });
    });
    const indicesText = document.createElement("span");
    indicesText.textContent = t("widget.matrixShowIndices");
    indicesLabel.appendChild(indicesInput);
    indicesLabel.appendChild(indicesText);
    setConfigTooltip(indicesLabel, "tooltip.widget.matrixShowIndices");
    if (widget.viewMode === "grid") {
      matrixSection.appendChild(indicesLabel);
    }

    const fitLabel = document.createElement("label");
    fitLabel.className = "menu-check compact-bool";
    const fitInput = document.createElement("input");
    fitInput.type = "checkbox";
    fitInput.checked = widget.autoFitCells !== false;
    fitInput.addEventListener("change", () => {
      runAction(() => {
        widget.autoFitCells = fitInput.checked;
      });
      cellSizeInput.disabled = fitInput.checked;
    });
    const fitText = document.createElement("span");
    fitText.textContent = t("widget.matrixAutoFitCells");
    fitLabel.appendChild(fitInput);
    fitLabel.appendChild(fitText);
    setConfigTooltip(fitLabel, "tooltip.widget.matrixAutoFitCells");
    if (widget.viewMode === "grid") {
      matrixSection.appendChild(fitLabel);
    }

    const matrixAdvancedSection = createWidgetSection(true);

    const matrixOptionsRow = document.createElement("div");
    matrixOptionsRow.className = "row3-exec";

    const viewModeSelect = document.createElement("select");
    ["grid", "surface"].forEach((mode) => {
      const opt = document.createElement("option");
      opt.value = mode;
      opt.textContent = t(`widget.matrixViewMode.${mode}`);
      viewModeSelect.appendChild(opt);
    });
    viewModeSelect.value = widget.viewMode;
    viewModeSelect.addEventListener("change", () => {
      runAction(() => {
        widget.viewMode = viewModeSelect.value;
        sanitizeMatrixWidgetOptions(widget);
        refreshWidgetConfigPanel(widget);
      });
    });

    const cellSizeInput = document.createElement("input");
    cellSizeInput.type = "number";
    cellSizeInput.min = "2";
    cellSizeInput.max = "96";
    cellSizeInput.step = "1";
    cellSizeInput.value = String(widget.cellSize ?? 28);
    cellSizeInput.disabled = widget.autoFitCells !== false;
    cellSizeInput.addEventListener("change", () => {
      runAction(() => {
        widget.cellSize = clamp(Number(cellSizeInput.value) || 28, 2, 96);
      });
      cellSizeInput.value = String(widget.cellSize);
    });

    const colorSelect = document.createElement("select");
    ["blue", "heat", "grayscale", "diverging", "none"].forEach((scheme) => {
      const opt = document.createElement("option");
      opt.value = scheme;
      opt.textContent = t(`widget.matrixColorScheme.${scheme}`);
      colorSelect.appendChild(opt);
    });
    colorSelect.value = widget.colorScheme;
    colorSelect.addEventListener("change", () => {
      runAction(() => {
        widget.colorScheme = colorSelect.value;
      });
    });

    matrixOptionsRow.appendChild(createCompactField("widget.matrixViewMode", viewModeSelect));
    if (widget.viewMode === "grid") {
      matrixOptionsRow.appendChild(createCompactField("widget.matrixCellSize", cellSizeInput));
    }
    matrixOptionsRow.appendChild(createCompactField("widget.matrixColorSchemeLabel", colorSelect));
    matrixAdvancedSection.appendChild(matrixOptionsRow);

    if (widget.viewMode === "surface") {
      const surfaceOptionsRow = document.createElement("div");
      surfaceOptionsRow.className = "row2-exec";
      const surfaceStyleSelect = document.createElement("select");
      ["solid", "wireframe"].forEach((style) => {
        const opt = document.createElement("option");
        opt.value = style;
        opt.textContent = t(`widget.matrixSurfaceStyle.${style}`);
        surfaceStyleSelect.appendChild(opt);
      });
      surfaceStyleSelect.value = widget.surfaceStyle;
      surfaceStyleSelect.addEventListener("change", () => {
        runAction(() => { widget.surfaceStyle = surfaceStyleSelect.value; });
      });
      const heightScaleInput = document.createElement("input");
      heightScaleInput.type = "number";
      heightScaleInput.min = "0.1";
      heightScaleInput.max = "10";
      heightScaleInput.step = "0.1";
      heightScaleInput.value = String(widget.surfaceHeightScale);
      heightScaleInput.addEventListener("change", () => {
        runAction(() => {
          widget.surfaceHeightScale = Number(heightScaleInput.value);
          sanitizeMatrixWidgetOptions(widget);
        });
        heightScaleInput.value = String(widget.surfaceHeightScale);
      });
      surfaceOptionsRow.appendChild(createCompactField("widget.matrixSurfaceStyle", surfaceStyleSelect));
      surfaceOptionsRow.appendChild(createCompactField("widget.matrixSurfaceHeightScale", heightScaleInput));
      matrixAdvancedSection.appendChild(surfaceOptionsRow);

      const surfaceViewRow = document.createElement("div");
      surfaceViewRow.className = "row2-exec";
      const addAngleInput = (label, property, min, max) => {
        const input = document.createElement("input");
        input.type = "number";
        input.min = String(min);
        input.max = String(max);
        input.step = "1";
        input.value = String(widget[property]);
        input.addEventListener("change", () => {
          runAction(() => {
            widget[property] = Number(input.value);
            sanitizeMatrixWidgetOptions(widget);
          });
          input.value = String(widget[property]);
        });
        surfaceViewRow.appendChild(createCompactField(label, input));
      };
      addAngleInput("widget.matrixSurfaceAzimuth", "surfaceAzimuth", -180, 180);
      addAngleInput("widget.matrixSurfaceElevation", "surfaceElevation", 5, 85);
      matrixAdvancedSection.appendChild(surfaceViewRow);
    }

    const matrixRangeRow = document.createElement("div");
    matrixRangeRow.className = "row2-exec";

    const valueMinInput = document.createElement("input");
    valueMinInput.type = "number";
    valueMinInput.step = "any";
    valueMinInput.placeholder = t("widget.autoOption");
    valueMinInput.value = Number.isFinite(widget.valueMin) ? String(widget.valueMin) : "";
    valueMinInput.addEventListener("change", () => {
      runAction(() => {
        widget.valueMin = valueMinInput.value.trim() === "" ? null : Number(valueMinInput.value);
        sanitizeMatrixWidgetOptions(widget);
      });
      valueMinInput.value = Number.isFinite(widget.valueMin) ? String(widget.valueMin) : "";
      valueMaxInput.value = Number.isFinite(widget.valueMax) ? String(widget.valueMax) : "";
    });

    const valueMaxInput = document.createElement("input");
    valueMaxInput.type = "number";
    valueMaxInput.step = "any";
    valueMaxInput.placeholder = t("widget.autoOption");
    valueMaxInput.value = Number.isFinite(widget.valueMax) ? String(widget.valueMax) : "";
    valueMaxInput.addEventListener("change", () => {
      runAction(() => {
        widget.valueMax = valueMaxInput.value.trim() === "" ? null : Number(valueMaxInput.value);
        sanitizeMatrixWidgetOptions(widget);
      });
      valueMinInput.value = Number.isFinite(widget.valueMin) ? String(widget.valueMin) : "";
      valueMaxInput.value = Number.isFinite(widget.valueMax) ? String(widget.valueMax) : "";
    });

    matrixRangeRow.appendChild(createCompactField("widget.matrixValueMin", valueMinInput));
    matrixRangeRow.appendChild(createCompactField("widget.matrixValueMax", valueMaxInput));
    matrixAdvancedSection.appendChild(matrixRangeRow);

    const matrixDimsRow = document.createElement("div");
    matrixDimsRow.className = "row2-exec";

    const displayRowsInput = document.createElement("input");
    displayRowsInput.type = "number";
    displayRowsInput.min = "1";
    displayRowsInput.step = "1";
    displayRowsInput.placeholder = t("widget.autoOption");
    displayRowsInput.value = Number.isInteger(widget.displayRows) ? String(widget.displayRows) : "";
    displayRowsInput.addEventListener("change", () => {
      runAction(() => {
        widget.displayRows = displayRowsInput.value.trim() === "" ? null : Number(displayRowsInput.value);
        sanitizeMatrixWidgetOptions(widget);
      });
      displayRowsInput.value = Number.isInteger(widget.displayRows) ? String(widget.displayRows) : "";
    });

    const displayColsInput = document.createElement("input");
    displayColsInput.type = "number";
    displayColsInput.min = "1";
    displayColsInput.step = "1";
    displayColsInput.placeholder = t("widget.autoOption");
    displayColsInput.value = Number.isInteger(widget.displayCols) ? String(widget.displayCols) : "";
    displayColsInput.addEventListener("change", () => {
      runAction(() => {
        widget.displayCols = displayColsInput.value.trim() === "" ? null : Number(displayColsInput.value);
        sanitizeMatrixWidgetOptions(widget);
      });
      displayColsInput.value = Number.isInteger(widget.displayCols) ? String(widget.displayCols) : "";
    });

    matrixDimsRow.appendChild(createCompactField("widget.matrixDisplayRows", displayRowsInput));
    matrixDimsRow.appendChild(createCompactField("widget.matrixDisplayCols", displayColsInput));
    matrixAdvancedSection.appendChild(matrixDimsRow);
    return;
  }

  if (widget.type === "led") {
    sanitizeLedWidgetOptions(widget);
    const ledSection = createWidgetSection();
    const sourceLabel = document.createElement("label");
    sourceLabel.textContent = t("widget.ledSourceLabel");
    const sourceSelect = document.createElement("select");
    const ledChoices = ["", ...outputNodeNames];
    ledChoices.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name || t("widget.noneOption");
      sourceSelect.appendChild(opt);
    });
    sourceSelect.value = ledChoices.includes(widget.source) ? widget.source : "";
    sourceSelect.addEventListener("change", () => {
      runAction(() => {
        widget.source = sourceSelect.value;
        sanitizeLedWidgetOptions(widget);
      });
    });
    ledSection.appendChild(sourceLabel);
    ledSection.appendChild(sourceSelect);
    setConfigTooltip(sourceLabel, "tooltip.widget.outputSource");
    setConfigTooltip(sourceSelect, "tooltip.widget.outputSource");

    const labelsSection = createWidgetSection(true);
    const labelsRow = document.createElement("div");
    labelsRow.className = "row2-exec";
    const falseLabelInput = document.createElement("input");
    falseLabelInput.type = "text";
    falseLabelInput.placeholder = t("widget.binaryLabelPlaceholder");
    falseLabelInput.value = String(widget.falseLabel ?? "");
    falseLabelInput.addEventListener("change", () => {
      runAction(() => {
        widget.falseLabel = falseLabelInput.value;
        sanitizeLedWidgetOptions(widget);
      });
      falseLabelInput.value = String(widget.falseLabel ?? "");
    });
    const trueLabelInput = document.createElement("input");
    trueLabelInput.type = "text";
    trueLabelInput.placeholder = t("widget.binaryLabelPlaceholder");
    trueLabelInput.value = String(widget.trueLabel ?? "");
    trueLabelInput.addEventListener("change", () => {
      runAction(() => {
        widget.trueLabel = trueLabelInput.value;
        sanitizeLedWidgetOptions(widget);
      });
      trueLabelInput.value = String(widget.trueLabel ?? "");
    });
    labelsRow.appendChild(createCompactField("widget.binaryFalseLabel", falseLabelInput));
    labelsRow.appendChild(createCompactField("widget.binaryTrueLabel", trueLabelInput));
    labelsSection.appendChild(labelsRow);
    return;
  }

  if (widget.type === "text") {
    sanitizeTextWidgetOptions(widget);
    const textSection = createWidgetSection();
    const sourceLabel = document.createElement("label");
    sourceLabel.textContent = t("widget.textSourceLabel");
    const sourceSelect = document.createElement("select");
    const textChoices = ["", ...outputNodeNames];
    textChoices.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name || t("widget.noneOption");
      sourceSelect.appendChild(opt);
    });
    sourceSelect.value = textChoices.includes(widget.source) ? widget.source : "";
    sourceSelect.addEventListener("change", () => {
      runAction(() => {
        widget.source = sourceSelect.value;
        sanitizeTextWidgetOptions(widget);
      });
    });
    textSection.appendChild(sourceLabel);
    textSection.appendChild(sourceSelect);
    setConfigTooltip(sourceLabel, "tooltip.widget.outputSource");
    setConfigTooltip(sourceSelect, "tooltip.widget.outputSource");

    const mappingsSection = createWidgetSection(true);
    appendWidgetSectionTitle(mappingsSection, "widget.textMappings");
    const list = document.createElement("div");
    list.className = "props-list";
    widget.mappings.forEach((mapping, idx) => {
      const row = document.createElement("div");
      row.className = "prop-row";
      row.style.gridTemplateColumns = "120px 1fr auto";

      const valueInput = document.createElement("input");
      valueInput.type = "number";
      valueInput.step = "any";
      valueInput.value = String(mapping.value);
      setConfigTooltip(valueInput, "tooltip.widget.mappingValue");
      valueInput.addEventListener("change", () => {
        runAction(() => {
          widget.mappings[idx].value = Number(valueInput.value);
          sanitizeTextWidgetOptions(widget);
        });
      });

      const labelInput = document.createElement("input");
      labelInput.type = "text";
      labelInput.value = mapping.label;
      setConfigTooltip(labelInput, "tooltip.widget.mappingText");
      labelInput.addEventListener("change", () => {
        runAction(() => {
          widget.mappings[idx].label = labelInput.value;
          sanitizeTextWidgetOptions(widget);
        });
      });

      const del = document.createElement("button");
      del.type = "button";
      del.textContent = "×";
      setConfigTooltip(del, "tooltip.widget.removeMapping");
      del.addEventListener("click", () => {
        runAction(() => {
          widget.mappings.splice(idx, 1);
          sanitizeTextWidgetOptions(widget);
        });
      });

      row.appendChild(valueInput);
      row.appendChild(labelInput);
      row.appendChild(del);
      list.appendChild(row);
    });
    mappingsSection.appendChild(list);

    const add = document.createElement("button");
    add.type = "button";
    add.textContent = t("action.addMapping");
    setConfigTooltip(add, "tooltip.widget.addMapping");
    add.addEventListener("click", () => {
      runAction(() => {
        widget.mappings.push({ value: 0, label: "" });
        sanitizeTextWidgetOptions(widget);
      });
    });
    mappingsSection.appendChild(add);
    return;
  }

  if (widget.type === "table") {
    sanitizeWidgetColumns(widget);
    sanitizeTableWidgetOptions(widget);
    const tableSection = createWidgetSection();
    appendWidgetSectionTitle(tableSection, "widget.tableNodes");
    const list = document.createElement("div");
    list.className = "props-list";
    const tableChoices = ["time", ...nodeNames];
    widget.columns.forEach((colName, idx) => {
      const row = document.createElement("div");
      row.className = "prop-row";
      row.style.gridTemplateColumns = "1fr auto auto auto auto";
      const sel = document.createElement("select");
      tableChoices.forEach((name) => {
        const opt = document.createElement("option");
        opt.value = name || "";
        opt.textContent = name === "time" ? t("widget.xSourceTime") : name;
        sel.appendChild(opt);
      });
      sel.value = tableChoices.includes(colName) ? colName : "time";
      setConfigTooltip(sel, "tooltip.widget.tableColumn");
      sel.addEventListener("change", () => {
        runAction(() => {
          widget.columns[idx] = sel.value;
        });
      });
      const settingsBtn = document.createElement("button");
      settingsBtn.type = "button";
      settingsBtn.textContent = "⚙";
      setConfigTooltip(settingsBtn, "tooltip.widget.tableColumnProperties");
      settingsBtn.addEventListener("click", () => {
        openTableColumnPropertiesPopup(widget, colName);
      });
      const del = document.createElement("button");
      del.type = "button";
      del.textContent = "-";
      setConfigTooltip(del, "tooltip.widget.removeColumn");
      del.addEventListener("click", () => {
        runAction(() => {
          if (widget.columns.length > 0) {
            widget.columns.splice(idx, 1);
          }
        });
      });
      const upBtn = document.createElement("button");
      upBtn.type = "button";
      upBtn.textContent = "↑";
      setConfigTooltip(upBtn, "tooltip.widget.moveUp");
      upBtn.disabled = idx === 0;
      upBtn.addEventListener("click", () => {
        runAction(() => {
          if (idx <= 0 || idx >= widget.columns.length) {
            return;
          }
          const tmp = widget.columns[idx - 1];
          widget.columns[idx - 1] = widget.columns[idx];
          widget.columns[idx] = tmp;
        });
      });
      const downBtn = document.createElement("button");
      downBtn.type = "button";
      downBtn.textContent = "↓";
      setConfigTooltip(downBtn, "tooltip.widget.moveDown");
      downBtn.disabled = idx >= widget.columns.length - 1;
      downBtn.addEventListener("click", () => {
        runAction(() => {
          if (idx < 0 || idx >= widget.columns.length - 1) {
            return;
          }
          const tmp = widget.columns[idx + 1];
          widget.columns[idx + 1] = widget.columns[idx];
          widget.columns[idx] = tmp;
        });
      });
      row.appendChild(sel);
      row.appendChild(settingsBtn);
      row.appendChild(upBtn);
      row.appendChild(downBtn);
      row.appendChild(del);
      list.appendChild(row);
    });
    const add = document.createElement("button");
    add.type = "button";
    add.className = "small-btn";
    add.textContent = t("widget.addColumn");
    setConfigTooltip(add, "tooltip.widget.addColumn");
    add.addEventListener("click", () => {
      runAction(() => {
        widget.columns.push("time");
      });
    });
    tableSection.appendChild(list);
    tableSection.appendChild(add);
    if (widget.columns.length === 0) {
      return;
    }
    const modeLabel = document.createElement("label");
    modeLabel.className = "menu-check compact-bool";
    const modeInput = document.createElement("input");
    modeInput.type = "checkbox";
    modeInput.checked = Boolean(widget.showHistory);
    modeInput.addEventListener("change", () => {
      runAction(() => {
        if (!widget.showHistory && modeInput.checked) {
          widget.rows = [];
        }
        widget.showHistory = modeInput.checked;
        if (widget.showHistory) {
          widget.expandNonScalarValues = false;
        }
      });
    });
    const modeText = document.createElement("span");
    modeText.textContent = t("widget.showHistory");
    modeLabel.appendChild(modeInput);
    modeLabel.appendChild(modeText);
    setConfigTooltip(modeLabel, "tooltip.widget.showHistory");
    const expandLabel = document.createElement("label");
    expandLabel.className = "menu-check compact-bool";
    const expandInput = document.createElement("input");
    expandInput.type = "checkbox";
    expandInput.checked = Boolean(widget.expandNonScalarValues);
    expandInput.addEventListener("change", () => {
      runAction(() => {
        widget.expandNonScalarValues = expandInput.checked;
        if (widget.expandNonScalarValues) {
          widget.showHistory = false;
          widget.rows = [];
        }
      });
    });
    const expandText = document.createElement("span");
    expandText.textContent = t("widget.expandNonScalarValues");
    expandLabel.appendChild(expandInput);
    expandLabel.appendChild(expandText);
    setConfigTooltip(expandLabel, "tooltip.widget.expandNonScalarValues");
    const tableModeSection = createWidgetSection(true);
    tableModeSection.appendChild(modeLabel);
    tableModeSection.appendChild(expandLabel);

    const displayRow = document.createElement("div");
    displayRow.className = "row2-exec table-display-options";
    const alignInput = document.createElement("select");
    ["left", "center", "right"].forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = t(`widget.tableAlign.${value}`);
      alignInput.appendChild(option);
    });
    alignInput.value = widget.tableTextAlign;
    alignInput.addEventListener("change", () => {
      runAction(() => {
        widget.tableTextAlign = alignInput.value;
        sanitizeTableWidgetOptions(widget);
      });
    });
    const decimalsInput = document.createElement("select");
    const autoOption = document.createElement("option");
    autoOption.value = "";
    autoOption.textContent = t("widget.tableDecimalsModel");
    decimalsInput.appendChild(autoOption);
    for (let digits = 0; digits <= 12; digits += 1) {
      const option = document.createElement("option");
      option.value = String(digits);
      option.textContent = String(digits);
      decimalsInput.appendChild(option);
    }
    decimalsInput.value = widget.tableDecimalDigits == null ? "" : String(widget.tableDecimalDigits);
    decimalsInput.addEventListener("change", () => {
      runAction(() => {
        widget.tableDecimalDigits = decimalsInput.value === "" ? null : Number(decimalsInput.value);
        sanitizeTableWidgetOptions(widget);
      });
    });
    displayRow.appendChild(createCompactField("widget.tableAlign", alignInput));
    displayRow.appendChild(createCompactField("widget.tableDecimals", decimalsInput));
    tableModeSection.appendChild(displayRow);
    const scrollingInput = document.createElement("select");
    [["first", "widget.tableScrolling.first"], ["last", "widget.tableScrolling.last"]].forEach(([value, key]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = t(key);
      scrollingInput.appendChild(option);
    });
    scrollingInput.value = widget.tableScrolling;
    scrollingInput.addEventListener("change", () => {
      runAction(() => {
        widget.tableScrolling = scrollingInput.value;
        sanitizeTableWidgetOptions(widget);
      });
    });
    tableModeSection.appendChild(createCompactField("widget.tableScrolling", scrollingInput));
    return;
  }

  if (widget.type === "barplot") {
    if (!Array.isArray(widget.xyPairs) || widget.xyPairs.length === 0) {
      widget.xyPairs = [{ xSource: "", ySource: "", color: defaultChartSeriesColor(0) }];
    }
    sanitizeWidgetXYPairs(widget);
    sanitizeXYChartOptions(widget);
    widget.barWidth = clamp(Number(widget.barWidth) || 0.8, 0.1, 1);
    const pair = widget.xyPairs[0];
    const sourcesSection = createWidgetSection();
    appendWidgetSectionTitle(sourcesSection, "widget.barPlotArrays");
    const sourceRow = document.createElement("div");
    sourceRow.className = "row2-exec";
    const addSourceSelect = (key, tooltipKey) => {
      const select = document.createElement("select");
      ["", ...outputNodeNames].forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name || t("widget.noneOption");
        select.appendChild(option);
      });
      select.value = outputNodeNames.includes(pair[key]) ? pair[key] : "";
      select.addEventListener("change", () => {
        runAction(() => { pair[key] = select.value; sanitizeWidgetXYPairs(widget); });
      });
      return createCompactField(key === "xSource" ? "widget.barXSource" : "widget.barYSource", select, tooltipKey);
    };
    sourceRow.append(addSourceSelect("xSource", "tooltip.widget.barXSource"), addSourceSelect("ySource", "tooltip.widget.barYSource"));
    sourcesSection.appendChild(sourceRow);
    const styleRow = document.createElement("div");
    styleRow.className = "row2-exec";
    const color = document.createElement("input");
    color.type = "color";
    color.value = /^#[0-9a-fA-F]{6}$/.test(String(pair.color ?? "")) ? pair.color : defaultChartSeriesColor(0);
    color.addEventListener("change", () => runAction(() => { pair.color = color.value; }));
    const width = document.createElement("input");
    width.type = "number"; width.min = "0.1"; width.max = "1"; width.step = "0.1"; width.value = String(widget.barWidth);
    width.addEventListener("change", () => runAction(() => { widget.barWidth = clamp(Number(width.value) || 0.8, 0.1, 1); width.value = String(widget.barWidth); }));
    styleRow.append(createCompactField("widget.barColor", color, "tooltip.widget.barColor"), createCompactField("widget.barWidth", width, "tooltip.widget.barWidth"));
    sourcesSection.appendChild(styleRow);
    const ticksLabel = document.createElement("label"); ticksLabel.className = "menu-check compact-bool";
    const ticksInput = document.createElement("input"); ticksInput.type = "checkbox"; ticksInput.checked = widget.showXTicks !== false;
    ticksInput.addEventListener("change", () => runAction(() => { widget.showXTicks = ticksInput.checked; }));
    const ticksText = document.createElement("span"); ticksText.textContent = t("widget.barShowXTicks"); ticksLabel.append(ticksInput, ticksText); setConfigTooltip(ticksLabel, "tooltip.widget.barShowXTicks"); sourcesSection.appendChild(ticksLabel);
    const labelsSection = createWidgetSection(true);
    appendWidgetSectionTitle(labelsSection, "widget.barTickLabels");
    if (!Array.isArray(widget.xTickLabels)) widget.xTickLabels = [];
    const labelsList = document.createElement("div"); labelsList.className = "props-list";
    widget.xTickLabels.forEach((entry, index) => {
      const row = document.createElement("div"); row.className = "prop-row"; row.style.gridTemplateColumns = "90px 1fr auto";
      const value = document.createElement("input"); value.type = "number"; value.step = "any"; value.value = String(entry.value ?? 0);
      const label = document.createElement("input"); label.type = "text"; label.value = String(entry.label ?? "");
      const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "×"; setConfigTooltip(remove, "tooltip.widget.removeMapping");
      value.addEventListener("change", () => runAction(() => { widget.xTickLabels[index].value = Number(value.value); }));
      label.addEventListener("change", () => runAction(() => { widget.xTickLabels[index].label = label.value; }));
      remove.addEventListener("click", () => runAction(() => { widget.xTickLabels.splice(index, 1); }));
      row.append(value, label, remove); labelsList.appendChild(row);
    });
    const addLabel = document.createElement("button"); addLabel.type = "button"; addLabel.className = "small-btn"; addLabel.textContent = t("widget.addTickLabel"); setConfigTooltip(addLabel, "tooltip.widget.addTickLabel");
    addLabel.addEventListener("click", () => runAction(() => { widget.xTickLabels.push({ value: 0, label: "" }); }));
    labelsSection.append(labelsList, addLabel);

    const axesSection = createWidgetSection(true);
    appendWidgetSectionTitle(axesSection, "widget.axisLimitsLabel");
    const addLimit = (key, labelKey) => {
      const input = document.createElement("input");
      input.type = "number"; input.step = "any"; input.placeholder = t("widget.autoOption"); input.value = widget[key] == null ? "" : String(widget[key]);
      input.addEventListener("change", () => runAction(() => { const value = String(input.value).trim(); widget[key] = value === "" || !Number.isFinite(Number(value)) ? null : Number(value); }));
      return createCompactField(labelKey, input);
    };
    const xLimits = document.createElement("div"); xLimits.className = "row2-exec"; xLimits.append(addLimit("xMin", "widget.axisXMin"), addLimit("xMax", "widget.axisXMax"));
    const yLimits = document.createElement("div"); yLimits.className = "row2-exec"; yLimits.append(addLimit("yMin", "widget.axisYMin"), addLimit("yMax", "widget.axisYMax"));
    axesSection.append(xLimits, yLimits);
    const axisLabels = document.createElement("div"); axisLabels.className = "row2-exec";
    const addAxisLabel = (key, labelKey, tooltipKey) => {
      const input = document.createElement("input");
      input.type = "text"; input.maxLength = 120; input.value = widget[key] || "";
      input.addEventListener("change", () => runAction(() => { widget[key] = normalizeAxisLabel(input.value); input.value = widget[key]; }));
      return createCompactField(labelKey, input, tooltipKey);
    };
    axisLabels.append(
      addAxisLabel("xAxisLabel", "widget.axisXLabel", "tooltip.widget.axisXLabel"),
      addAxisLabel("yAxisLabel", "widget.axisYLabel", "tooltip.widget.axisYLabel"),
    );
    axesSection.appendChild(axisLabels);
    const grid = document.createElement("label"); grid.className = "menu-check compact-bool";
    const gridInput = document.createElement("input"); gridInput.type = "checkbox"; gridInput.checked = widget.showGrid !== false;
    gridInput.addEventListener("change", () => runAction(() => { widget.showGrid = gridInput.checked; }));
    const gridText = document.createElement("span"); gridText.textContent = t("widget.showGrid"); grid.append(gridInput, gridText); setConfigTooltip(grid, "tooltip.widget.showGrid"); axesSection.appendChild(grid);
    return;
  }

  sanitizeWidgetXYPairs(widget);
  sanitizeXYChartOptions(widget);
  const choices = ["time", ...nodeNames];
  const chartPairsSection = createWidgetSection();
  appendWidgetSectionTitle(chartPairsSection, "widget.xyPairsLabel");
  if (widget.type === "barplot") {
    const help = document.createElement("div");
    help.className = "empty-props";
    help.textContent = t("widget.barPlotHelp");
    chartPairsSection.appendChild(help);
  }

  const pairList = document.createElement("div");
  pairList.className = "chart-pair-list";
  const currentPairCount = widget.xyPairs.length;
  const currentActivePair = ui.activeChartPairByWidgetId.get(widget.id) ?? 0;
  const activePairIndex = currentPairCount > 0
    ? clamp(currentActivePair, 0, currentPairCount - 1)
    : -1;
  if (currentPairCount > 0) {
    ui.activeChartPairByWidgetId.set(widget.id, activePairIndex);
  } else {
    ui.activeChartPairByWidgetId.delete(widget.id);
  }

  widget.xyPairs.forEach((pair, idx) => {
    const row = document.createElement("div");
    row.className = "chart-pair-list-row";

    const selectBtn = document.createElement("button");
    selectBtn.type = "button";
    selectBtn.className = "chart-pair-select-btn";
    if (idx === activePairIndex) {
      selectBtn.classList.add("active");
    }
    selectBtn.textContent = `${pair.xSource} -> ${pair.ySource}`;
    setConfigTooltip(selectBtn, "tooltip.widget.selectPair");
    selectBtn.addEventListener("click", () => {
      ui.activeChartPairByWidgetId.set(widget.id, idx);
      refreshWidgetConfigPanel(widget);
    });

    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "-";
    del.className = "chart-pair-delete-btn";
    setConfigTooltip(del, "tooltip.widget.removePair");
    del.addEventListener("click", () => {
      runAction(() => {
        if (widget.xyPairs.length > 0) {
          widget.xyPairs.splice(idx, 1);
          const nextIndex = Math.max(0, Math.min(idx, widget.xyPairs.length - 1));
          if (widget.xyPairs.length > 0) {
            ui.activeChartPairByWidgetId.set(widget.id, nextIndex);
          } else {
            ui.activeChartPairByWidgetId.delete(widget.id);
          }
        }
      });
    });

    row.appendChild(selectBtn);
    row.appendChild(del);
    pairList.appendChild(row);
  });
  chartPairsSection.appendChild(pairList);

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "small-btn";
  addBtn.textContent = t("widget.addPair");
  setConfigTooltip(addBtn, "tooltip.widget.addPair");
  addBtn.addEventListener("click", () => {
    runAction(() => {
      const defaultY = nodeNames[0] || "time";
        widget.xyPairs.push({
          xSource: "time",
          ySource: defaultY,
          visualizedLabel: "",
          showTimeSeries: true,
          showInstantProfile: false,
          color: defaultChartSeriesColor(widget.xyPairs.length),
          pointColor: defaultChartSeriesColor(widget.xyPairs.length),
          showLine: true,
          lineWidth: 2.2,
          lineStyle: "solid",
          pointMode: "all",
          pointSize: 2.4,
          points: [],
        });
      ui.activeChartPairByWidgetId.set(widget.id, widget.xyPairs.length - 1);
    });
  });
  chartPairsSection.appendChild(addBtn);

  if (activePairIndex >= 0 && widget.xyPairs[activePairIndex]) {
    const activePairSection = createWidgetSection(true);
    appendWidgetSectionTitle(activePairSection, "widget.activePairLabel");

    const pair = widget.xyPairs[activePairIndex];

    const topRow = document.createElement("div");
    topRow.className = "chart-pair-top";

    const xSel = document.createElement("select");
    choices.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name === "time" ? t("widget.xSourceTime") : name;
      xSel.appendChild(opt);
    });
    xSel.value = choices.includes(pair.xSource) ? pair.xSource : "time";
    setConfigTooltip(xSel, "tooltip.widget.xSource");
    xSel.addEventListener("change", () => {
      runAction(() => {
        widget.xyPairs[activePairIndex].xSource = xSel.value;
        widget.xyPairs[activePairIndex].points = [];
        widget.xyPairs[activePairIndex].seriesData = [];
        widget.xyPairs[activePairIndex].instantSeriesData = [];
      });
    });

    const ySel = document.createElement("select");
    choices.forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name === "time" ? t("widget.xSourceTime") : name;
      ySel.appendChild(opt);
    });
    ySel.value = choices.includes(pair.ySource) ? pair.ySource : "time";
    setConfigTooltip(ySel, "tooltip.widget.ySource");
    ySel.addEventListener("change", () => {
      runAction(() => {
        widget.xyPairs[activePairIndex].ySource = ySel.value;
        widget.xyPairs[activePairIndex].points = [];
        widget.xyPairs[activePairIndex].seriesData = [];
        widget.xyPairs[activePairIndex].instantSeriesData = [];
      });
    });

    topRow.appendChild(xSel);
    topRow.appendChild(ySel);
    activePairSection.appendChild(topRow);

    const visualizedLabelInput = document.createElement("input");
    visualizedLabelInput.type = "text";
    visualizedLabelInput.maxLength = 120;
    visualizedLabelInput.value = pair.visualizedLabel || "";
    setConfigTooltip(visualizedLabelInput, "tooltip.widget.visualizedLabel");
    visualizedLabelInput.addEventListener("change", () => {
      runAction(() => {
        widget.xyPairs[activePairIndex].visualizedLabel = normalizeAxisLabel(visualizedLabelInput.value);
        visualizedLabelInput.value = widget.xyPairs[activePairIndex].visualizedLabel;
      });
    });
    activePairSection.appendChild(createCompactField(
      "widget.visualizedLabel",
      visualizedLabelInput,
      "tooltip.widget.visualizedLabel",
    ));

    const modesRow = document.createElement("div");
    modesRow.className = "chart-pair-modes";

    const timeSeriesLabel = document.createElement("label");
    timeSeriesLabel.className = "menu-check compact-bool";
    setConfigTooltip(timeSeriesLabel, "tooltip.widget.showTimeSeries");
    const timeSeriesInput = document.createElement("input");
    timeSeriesInput.type = "checkbox";
    timeSeriesInput.checked = pair.showTimeSeries !== false;
    timeSeriesInput.addEventListener("change", () => {
      runAction(() => {
        widget.xyPairs[activePairIndex].showTimeSeries = timeSeriesInput.checked;
        widget.xyPairs[activePairIndex].points = [];
        widget.xyPairs[activePairIndex].seriesData = [];
      });
    });
    const timeSeriesText = document.createElement("span");
    timeSeriesText.textContent = t("widget.showTimeSeries");
    timeSeriesLabel.appendChild(timeSeriesInput);
    timeSeriesLabel.appendChild(timeSeriesText);

    const instantProfileLabel = document.createElement("label");
    instantProfileLabel.className = "menu-check compact-bool";
    setConfigTooltip(instantProfileLabel, "tooltip.widget.showInstantProfile");
    const instantProfileInput = document.createElement("input");
    instantProfileInput.type = "checkbox";
    instantProfileInput.checked = pair.showInstantProfile === true;
    const updateInstantProfile = () => {
      const enabled = instantProfileInput.checked === true;
      if (pair.showInstantProfile === enabled) {
        return;
      }
      beginTransaction();
      pair.showInstantProfile = enabled;
      pair.instantSeriesData = [];
      dirtySinceLastSave = true;
      updateFileStatusLabel(true);
      commitTransaction();
      render();
    };
    instantProfileInput.addEventListener("change", updateInstantProfile);
    const instantProfileText = document.createElement("span");
    instantProfileText.textContent = t("widget.showInstantProfile");
    instantProfileLabel.appendChild(instantProfileInput);
    instantProfileLabel.appendChild(instantProfileText);

    modesRow.appendChild(timeSeriesLabel);
    modesRow.appendChild(instantProfileLabel);
    activePairSection.appendChild(modesRow);

    const styleRow = document.createElement("div");
    styleRow.className = "chart-pair-style-row";

    const lineColorInput = document.createElement("input");
    lineColorInput.type = "color";
    lineColorInput.value = /^#[0-9a-fA-F]{6}$/.test(String(pair.color ?? "")) ? String(pair.color) : defaultChartSeriesColor(activePairIndex);
    setTooltipText(lineColorInput, t("widget.lineColor"));
    lineColorInput.addEventListener("change", () => {
      runAction(() => {
        widget.xyPairs[activePairIndex].color = lineColorInput.value;
      });
    });

    const pointColorInput = document.createElement("input");
    pointColorInput.type = "color";
    pointColorInput.value = /^#[0-9a-fA-F]{6}$/.test(String(pair.pointColor ?? ""))
      ? String(pair.pointColor)
      : (/^#[0-9a-fA-F]{6}$/.test(String(pair.color ?? "")) ? String(pair.color) : defaultChartSeriesColor(activePairIndex));
    setTooltipText(pointColorInput, t("widget.pointColor"));
    pointColorInput.addEventListener("change", () => {
      runAction(() => {
        widget.xyPairs[activePairIndex].pointColor = pointColorInput.value;
      });
    });

    const pointsSelect = document.createElement("select");
    setTooltipText(pointsSelect, t("widget.seriesPoints"));
    ["none", "last", "all"].forEach((mode) => {
      const opt = document.createElement("option");
      opt.value = mode;
      opt.textContent = t(`widget.seriesPointsMode.${mode}`);
      pointsSelect.appendChild(opt);
    });
    pointsSelect.value = normalizeChartPointMode(pair.pointMode, pair.showPoints);
    pointsSelect.addEventListener("change", () => {
      runAction(() => {
        widget.xyPairs[activePairIndex].pointMode = pointsSelect.value;
      });
      updateSeriesStyleControls();
    });

    const pointSizeInput = document.createElement("input");
    pointSizeInput.type = "number";
    pointSizeInput.step = "0.2";
    pointSizeInput.min = "1";
    pointSizeInput.max = "12";
    pointSizeInput.value = String(Number(pair.pointSize ?? 2.4));
    setTooltipText(pointSizeInput, t("widget.pointSize"));
    pointSizeInput.addEventListener("change", () => {
      runAction(() => {
        widget.xyPairs[activePairIndex].pointSize = clamp(Number(pointSizeInput.value) || 2.4, 1, 12);
      });
    });

    const lineStyleSelect = document.createElement("select");
    setTooltipText(lineStyleSelect, t("widget.lineStyle"));
    ["none", "solid", "dashed", "dotted"].forEach((mode) => {
      const opt = document.createElement("option");
      opt.value = mode;
      opt.textContent = t(`widget.lineStyleMode.${mode}`);
      lineStyleSelect.appendChild(opt);
    });
    lineStyleSelect.value = pair.showLine === false ? "none" : normalizeChartLineStyle(pair.lineStyle);
    lineStyleSelect.addEventListener("change", () => {
      runAction(() => {
        if (lineStyleSelect.value === "none") {
          widget.xyPairs[activePairIndex].showLine = false;
          return;
        }
        widget.xyPairs[activePairIndex].showLine = true;
        widget.xyPairs[activePairIndex].lineStyle = normalizeChartLineStyle(lineStyleSelect.value);
      });
      refreshWidgetConfigPanel(widget);
    });

    const lineWidthInput = document.createElement("input");
    lineWidthInput.type = "number";
    lineWidthInput.step = "0.2";
    lineWidthInput.min = "1";
    lineWidthInput.max = "8";
    lineWidthInput.value = String(Number(pair.lineWidth ?? 2.2));
    setTooltipText(lineWidthInput, t("widget.lineWidth"));
    lineWidthInput.addEventListener("change", () => {
      runAction(() => {
        widget.xyPairs[activePairIndex].lineWidth = clamp(Number(lineWidthInput.value) || 2.2, 1, 8);
      });
    });

    const updateSeriesStyleControls = () => {
      const lineDisabled = lineStyleSelect.value === "none";
      const pointsDisabled = pointsSelect.value === "none";
      lineWidthInput.disabled = lineDisabled;
      pointSizeInput.disabled = pointsDisabled;
      lineColorInput.disabled = lineDisabled;
      pointColorInput.disabled = pointsDisabled;
    };

    const primaryStyleRow = document.createElement("div");
    primaryStyleRow.className = "chart-pair-style-main";
    primaryStyleRow.appendChild(createCompactField("widget.lineStyle", lineStyleSelect));
    primaryStyleRow.appendChild(createCompactField("widget.lineWidthShort", lineWidthInput));
    const pointControls = document.createElement("div");
    pointControls.className = "chart-pair-point-controls";
    pointControls.appendChild(createCompactField("widget.seriesPoints", pointsSelect));
    pointControls.appendChild(createCompactField("widget.pointSizeShort", pointSizeInput));
    primaryStyleRow.appendChild(pointControls);

    const secondaryStyleRow = document.createElement("div");
    secondaryStyleRow.className = "chart-pair-style-secondary";
    secondaryStyleRow.appendChild(createCompactField("widget.lineColor", lineColorInput));
    secondaryStyleRow.appendChild(createCompactField("widget.pointColor", pointColorInput));

    updateSeriesStyleControls();

    styleRow.appendChild(primaryStyleRow);
    styleRow.appendChild(secondaryStyleRow);
    activePairSection.appendChild(styleRow);
  } else {
    const emptyPairs = document.createElement("div");
    emptyPairs.className = "empty-props";
    emptyPairs.textContent = t("widget.noPairs");
    chartPairsSection.appendChild(emptyPairs);
  }

  const chartAxisSection = createWidgetSection(true);
  appendWidgetSectionTitle(chartAxisSection, "widget.axisLimitsLabel");

  const parseLimitInput = (text) => {
    const trimmed = String(text ?? "").trim();
    if (!trimmed) {
      return null;
    }
    const n = Number(trimmed);
    return Number.isFinite(n) ? n : null;
  };

  const xLimitRow = document.createElement("div");
  xLimitRow.className = "row2-exec";
  const xMinInput = document.createElement("input");
  xMinInput.type = "number";
  xMinInput.step = "any";
  xMinInput.placeholder = t("widget.autoOption");
  xMinInput.value = widget.xMin == null ? "" : String(widget.xMin);
  xMinInput.addEventListener("change", () => {
    runAction(() => {
      widget.xMin = parseLimitInput(xMinInput.value);
    });
  });
  const xMaxInput = document.createElement("input");
  xMaxInput.type = "number";
  xMaxInput.step = "any";
  xMaxInput.placeholder = t("widget.autoOption");
  xMaxInput.value = widget.xMax == null ? "" : String(widget.xMax);
  xMaxInput.addEventListener("change", () => {
    runAction(() => {
      widget.xMax = parseLimitInput(xMaxInput.value);
    });
  });
  xLimitRow.appendChild(createCompactField("widget.axisXMin", xMinInput));
  xLimitRow.appendChild(createCompactField("widget.axisXMax", xMaxInput));
  chartAxisSection.appendChild(xLimitRow);

  const yLimitRow = document.createElement("div");
  yLimitRow.className = "row2-exec";
  const yMinInput = document.createElement("input");
  yMinInput.type = "number";
  yMinInput.step = "any";
  yMinInput.placeholder = t("widget.autoOption");
  yMinInput.value = widget.yMin == null ? "" : String(widget.yMin);
  yMinInput.addEventListener("change", () => {
    runAction(() => {
      widget.yMin = parseLimitInput(yMinInput.value);
    });
  });
  const yMaxInput = document.createElement("input");
  yMaxInput.type = "number";
  yMaxInput.step = "any";
  yMaxInput.placeholder = t("widget.autoOption");
  yMaxInput.value = widget.yMax == null ? "" : String(widget.yMax);
  yMaxInput.addEventListener("change", () => {
    runAction(() => {
      widget.yMax = parseLimitInput(yMaxInput.value);
    });
  });
  yLimitRow.appendChild(createCompactField("widget.axisYMin", yMinInput));
  yLimitRow.appendChild(createCompactField("widget.axisYMax", yMaxInput));
  chartAxisSection.appendChild(yLimitRow);

  const axisLabelsRow = document.createElement("div");
  axisLabelsRow.className = "row2-exec";
  const addAxisLabel = (key, labelKey, tooltipKey) => {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 120;
    input.value = widget[key] || "";
    input.addEventListener("change", () => {
      runAction(() => {
        widget[key] = normalizeAxisLabel(input.value);
        input.value = widget[key];
      });
    });
    return createCompactField(labelKey, input, tooltipKey);
  };
  axisLabelsRow.append(
    addAxisLabel("xAxisLabel", "widget.axisXLabel", "tooltip.widget.axisXLabel"),
    addAxisLabel("yAxisLabel", "widget.axisYLabel", "tooltip.widget.axisYLabel"),
  );
  chartAxisSection.appendChild(axisLabelsRow);

  const gridLabel = document.createElement("label");
  gridLabel.className = "menu-check compact-bool";
  const gridInput = document.createElement("input");
  gridInput.type = "checkbox";
  gridInput.checked = widget.showGrid !== false;
  gridInput.addEventListener("change", () => {
    runAction(() => {
      widget.showGrid = gridInput.checked;
    });
  });
  const gridSpan = document.createElement("span");
  gridSpan.textContent = t("widget.showGrid");
  gridLabel.appendChild(gridInput);
  gridLabel.appendChild(gridSpan);
  setConfigTooltip(gridLabel, "tooltip.widget.showGrid");
  chartAxisSection.appendChild(gridLabel);

  const legendPositionSelect = document.createElement("select");
  ["none", "top-right", "top-left", "bottom-right", "bottom-left"].forEach((pos) => {
    const opt = document.createElement("option");
    opt.value = pos;
    opt.textContent = t(`widget.legendPositionMode.${pos}`);
    legendPositionSelect.appendChild(opt);
  });
  legendPositionSelect.value = widget.legendPosition || "top-right";
  legendPositionSelect.addEventListener("change", () => {
    runAction(() => {
      widget.legendPosition = legendPositionSelect.value;
    });
  });
  chartAxisSection.appendChild(createCompactField("widget.legendPosition", legendPositionSelect));
}

globalThis.Widgets = {
  addCanvasText,
  addLedWidget,
  addButtonWidget,
  addSelectWidget,
  addTextWidget,
  addTableWidget,
  addMatrixWidget,
  addSliderWidget,
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
  refreshRuntimeView,
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
  sanitizeWidgetColumns,
  sanitizeTableWidgetOptions,
  sanitizeMatrixWidgetOptions,
  sanitizeLedWidgetOptions,
  sanitizeSelectWidgetOptions,
  sanitizeTextWidgetOptions,
  sanitizeWidgetXYPairs,
  sanitizeXYChartOptions,
  sanitizeSliderWidgetOptions,
  sanitizeButtonWidgetOptions,
  drawXYChart,
  drawBarPlot,
  updateXYWidgetsFromComputedValues,
  updateTableWidgetsFromComputedValues,
  clearAllXYChartPoints,
  clearAllTableWidgetRows,
  refreshWidgetFrame,
  renderWidgets,
  refreshWidgetConfigPanel,
  copyTextToClipboard,
};

})();
