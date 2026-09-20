"use strict";

const assert = require("assert");
const { createModelLoadingHelpers } = require("../platform/model-loading.js");

async function run() {
  const existingHandle = { kind: "file", name: "existing.json" };
  let pickerCalls = 0;
  let missingEntry = null;
  const helpers = createModelLoadingHelpers({
    resolveRecentModelHandle: async (entry) => entry.path === "/models/existing.json" ? existingHandle : null,
    resolveRecentModelDirectoryHandle: async () => null,
    prepareSelectedJsonEntries: async (entries) => entries[0] === existingHandle
      ? { fileHandle: existingHandle, name: "existing.json", text: "{}" }
      : null,
    beforeOpenInNewTab: () => ({}),
    loadGraphFromJsonText: () => {},
    rememberRecentModel: async () => {},
    preloadSubmodelsAfterLoad: async () => {},
    maybeSelectModelDirectoryForSubmodels: async () => null,
    afterOpenInNewTab: () => {},
    onOpenPreparedStart: () => {},
    notifyMissingRecentModelEntry: (entry) => { missingEntry = entry; },
    showOpenFilePickerCompat: async () => {
      pickerCalls += 1;
      return [];
    },
  });

  const existing = { path: "/models/existing.json" };
  assert.equal(await helpers.openRecentModelEntry(existing), true);
  assert.equal(pickerCalls, 0, "an existing recent model opens without a picker");
  assert.equal(missingEntry, null);

  const missing = { path: "/models/missing.json" };
  assert.equal(await helpers.openRecentModelEntry(missing), false);
  assert.equal(pickerCalls, 0, "a missing recent model never opens a picker");
  assert.equal(missingEntry, missing, "a missing recent model is reported");

  console.log("model-loading.test.js: ok");
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
