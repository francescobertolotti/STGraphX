/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 * Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.
 */

(function initRuntimeShared(global) {
  function createRuntimeShared(options = {}) {
    const {
      getCurrentLang = () => "en",
    } = options;

    function clamp(val, min, max) {
      return Math.min(max, Math.max(min, val));
    }

    function deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }

    function clampDisplayDecimals(value) {
      return clamp(Math.round(Number(value) || 0), 0, 12);
    }

    function normalizeExecutionConfig(raw) {
      const t0 = Number(raw?.t0);
      const dt = Number(raw?.dt);
      const t1 = Number(raw?.t1);
      const delayMs = Number(raw?.delayMs);
      const renderEverySteps = Number(raw?.renderEverySteps);
      const decimals = Number(raw?.decimals);
      const integrator = String(raw?.integrator ?? "euler").toLowerCase();
      const strictDefinitions = Boolean(raw?.strictDefinitions);
      const currentTime = raw?.currentTime;
      const normalizedT0 = Number.isFinite(t0) ? t0 : 0;
      const normalizedDt = Number.isFinite(dt) && dt >= 0 ? dt : 1;
      const normalizedT1 = Number.isFinite(t1) && t1 > normalizedT0 ? t1 : normalizedT0 + 10;
      return {
        t0: normalizedT0,
        dt: normalizedDt,
        t1: normalizedT1,
        delayMs: Number.isFinite(delayMs) && delayMs > 0 ? Math.round(delayMs) : 100,
        renderEverySteps: Number.isFinite(renderEverySteps) && renderEverySteps >= 1
          ? Math.round(renderEverySteps)
          : 1,
        decimals: Number.isFinite(decimals) ? clampDisplayDecimals(decimals) : 3,
        integrator: integrator === "rk4" ? "rk4" : "euler",
        strictDefinitions,
        currentTime: Number.isFinite(Number(currentTime)) ? Number(currentTime) : null,
      };
    }

    function sanitizeLocalFunctionName(name) {
      return String(name ?? "").trim();
    }

    function sanitizeLocalFunctionParams(params) {
      if (Array.isArray(params)) {
        return params.map((param) => sanitizeLocalFunctionName(param)).filter(Boolean);
      }
      return String(params ?? "")
        .split(",")
        .map((param) => sanitizeLocalFunctionName(param))
        .filter(Boolean);
    }

    function sanitizeLocalFunctionDefinition(definition = {}) {
      return {
        name: sanitizeLocalFunctionName(definition.name),
        params: sanitizeLocalFunctionParams(definition.params),
        expression: String(definition.expression ?? "").trim(),
        description: String(definition.description ?? "").trim(),
      };
    }

    function normalizeSubmodelPath(value) {
      let raw = String(value ?? "").trim();
      if (!raw) {
        return "";
      }
      raw = raw.replace(/\\/g, "/");
      while (raw.startsWith("./")) {
        raw = raw.slice(2);
      }
      raw = raw.trim();
      if (!raw || raw === "." || raw.includes("..")) {
        return "";
      }
      const parts = raw.split("/").filter(Boolean);
      const base = parts.length ? parts[parts.length - 1].trim() : "";
      if (!base || base === "." || base === "..") {
        return "";
      }
      return base;
    }

    function normalizeReadDataPath(value) {
      let raw = String(value ?? "").trim();
      if (!raw) {
        return "";
      }
      raw = raw.replace(/\\/g, "/");
      while (raw.startsWith("./")) {
        raw = raw.slice(2);
      }
      raw = raw.trim();
      if (!raw || raw === "." || raw.startsWith("/") || /^[A-Za-z]:\//.test(raw)) {
        return "";
      }
      const parts = raw.split("/").filter(Boolean);
      if (!parts.length || parts.some((part) => part === "." || part === "..")) {
        return "";
      }
      return parts.join("/");
    }

    function serializeNodeType(shape) {
      if (shape === "ellipse") {
        return "algebraic";
      }
      if (shape === "diamond") {
        return "parameter";
      }
      if (shape === "submodel") {
        return "submodel";
      }
      return "state";
    }

    function deserializeNodeType(type) {
      if (type === "algebraic") {
        return "ellipse";
      }
      if (type === "parameter") {
        return "diamond";
      }
      if (type === "submodel") {
        return "submodel";
      }
      return "rect";
    }

    function parseStoredPropertyValue(raw) {
      const text = String(raw ?? "");
      const trimmed = text.trim();
      if (!trimmed) {
        return "";
      }
      if (trimmed === "true") {
        return 1;
      }
      if (trimmed === "false") {
        return 0;
      }
      const numeric = Number(trimmed);
      if (Number.isFinite(numeric)) {
        return numeric;
      }
      if (
        (trimmed.startsWith("[") && trimmed.endsWith("]"))
        || (trimmed.startsWith("{") && trimmed.endsWith("}"))
      ) {
        try {
          return JSON.parse(trimmed);
        } catch (_err) {
          return text;
        }
      }
      return text;
    }

    function serializeStoredPropertyValue(value) {
      if (value === true) {
        return "1";
      }
      if (value === false) {
        return "0";
      }
      if (value === null || value === undefined) {
        return "";
      }
      if (typeof value === "number") {
        return String(value);
      }
      if (Array.isArray(value) || typeof value === "object") {
        return JSON.stringify(value);
      }
      return String(value);
    }

    function descriptionPropertyKey() {
      return getCurrentLang() === "it" ? "descrizione" : "description";
    }

    function descriptionPropertyKeys() {
      return new Set(["descrizione", "description"]);
    }

    function formulaNotesPropertyKey() {
      return getCurrentLang() === "it" ? "note formula" : "formula notes";
    }

    function formulaNotesPropertyKeys() {
      return new Set(["note formula", "formula notes"]);
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

    return {
      clamp,
      deepClone,
      normalizeExecutionConfig,
      sanitizeLocalFunctionDefinition,
      normalizeSubmodelPath,
      normalizeReadDataPath,
      serializeNodeType,
      deserializeNodeType,
      parseModelPropertyStoredValue: parseStoredPropertyValue,
      serializeModelPropertyStoredValue: serializeStoredPropertyValue,
      parseNodePropertyStoredValue: parseStoredPropertyValue,
      serializeNodePropertyStoredValue: serializeStoredPropertyValue,
      normalizeNodeDescriptionProperty,
      getNodeDescription,
      normalizeNodeFormulaNotesProperty,
      getNodeFormulaNotes,
    };
  }

  global.STGraphXRuntimeShared = {
    createRuntimeShared,
  };
})(globalThis);
