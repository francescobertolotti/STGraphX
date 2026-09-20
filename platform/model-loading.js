/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 * Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.
 */

(function initModelLoadingModule(globalScope, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }
  globalScope.STGraphXModelLoading = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function createModelLoadingExports() {
  function createModelLoadingHelpers(options = {}) {
    const deriveDirectoryHandleFromFileHandle = typeof options.deriveDirectoryHandleFromFileHandle === "function"
      ? options.deriveDirectoryHandleFromFileHandle
      : async () => null;
    const loadGraphFromJsonText = typeof options.loadGraphFromJsonText === "function"
      ? options.loadGraphFromJsonText
      : () => {};
    const rememberRecentModel = typeof options.rememberRecentModel === "function"
      ? options.rememberRecentModel
      : async () => {};
    const preloadSubmodelsAfterLoad = typeof options.preloadSubmodelsAfterLoad === "function"
      ? options.preloadSubmodelsAfterLoad
      : async () => {};
    const maybeSelectModelDirectoryForSubmodels = typeof options.maybeSelectModelDirectoryForSubmodels === "function"
      ? options.maybeSelectModelDirectoryForSubmodels
      : async () => null;
    const prepareSelectedJsonEntries = typeof options.prepareSelectedJsonEntries === "function"
      ? options.prepareSelectedJsonEntries
      : async () => null;
    const resolveRecentModelHandle = typeof options.resolveRecentModelHandle === "function"
      ? options.resolveRecentModelHandle
      : async () => null;
    const resolveRecentModelDirectoryHandle = typeof options.resolveRecentModelDirectoryHandle === "function"
      ? options.resolveRecentModelDirectoryHandle
      : async () => null;
    const supportsOpenFilePicker = typeof options.supportsOpenFilePicker === "function"
      ? options.supportsOpenFilePicker
      : () => false;
    const showOpenFilePickerCompat = typeof options.showOpenFilePickerCompat === "function"
      ? options.showOpenFilePickerCompat
      : async () => [];
    const notifyMissingRecentModelEntry = typeof options.notifyMissingRecentModelEntry === "function"
      ? options.notifyMissingRecentModelEntry
      : () => {};
    const isLoadCancelledError = typeof options.isLoadCancelledError === "function"
      ? options.isLoadCancelledError
      : () => false;
    const beforeOpenInNewTab = typeof options.beforeOpenInNewTab === "function"
      ? options.beforeOpenInNewTab
      : () => ({ previousActiveTabId: null });
    const afterOpenInNewTab = typeof options.afterOpenInNewTab === "function"
      ? options.afterOpenInNewTab
      : () => {};
    const onOpenPreparedStart = typeof options.onOpenPreparedStart === "function"
      ? options.onOpenPreparedStart
      : () => {};
    const onOpenPreparedFailure = typeof options.onOpenPreparedFailure === "function"
      ? options.onOpenPreparedFailure
      : () => {};

    async function openPreparedJsonEntry(rootEntry) {
      if (!rootEntry) {
        return false;
      }
      onOpenPreparedStart();
      const handle = rootEntry.fileHandle;
      const file = rootEntry.file;
      // A browser selected through <input type="file"> has no persistent
      // FileSystemFileHandle, but its File object can still be kept in
      // IndexedDB by the recent-models store.
      const recentFileReference = handle || file || null;
      const text = rootEntry.text;
      const rootData = rootEntry.data || JSON.parse(text);
      const directoryHandle = rootEntry.directoryHandle || await deriveDirectoryHandleFromFileHandle(handle) || null;
      loadGraphFromJsonText(
        text,
        rootEntry.name || (handle && handle.name) || (file && file.name) || "graph.json",
        handle || null,
        directoryHandle,
        true,
      );
      await rememberRecentModel(
        rootEntry.name || (handle && handle.name) || (file && file.name) || "graph.json",
        recentFileReference,
        directoryHandle,
      );
      await preloadSubmodelsAfterLoad();
      const selectedDirectoryHandle = await maybeSelectModelDirectoryForSubmodels(rootData);
      await rememberRecentModel(
        rootEntry.name || (handle && handle.name) || (file && file.name) || "graph.json",
        recentFileReference,
        selectedDirectoryHandle || directoryHandle,
      );
      await preloadSubmodelsAfterLoad();
      return true;
    }

    async function openPreparedJsonEntryInNewTab(rootEntry) {
      if (!rootEntry) {
        return false;
      }
      const checkpoint = beforeOpenInNewTab() || {};
      const opened = await openPreparedJsonEntry(rootEntry);
      if (!opened) {
        onOpenPreparedFailure(checkpoint);
        return false;
      }
      afterOpenInNewTab(checkpoint);
      return true;
    }

    async function openRecentModelEntry(entry) {
      try {
        let rootEntry = null;
        const handle = await resolveRecentModelHandle(entry);
        const directoryHandle = await resolveRecentModelDirectoryHandle(entry);
        if (handle) {
          try {
            rootEntry = await prepareSelectedJsonEntries([handle]);
            if (rootEntry && directoryHandle) {
              rootEntry.directoryHandle = directoryHandle;
            }
          } catch (_err) {
            // A moved or revoked file must not open a file picker from Recent
            // models: this entry is a direct reference, not an open command.
            rootEntry = null;
          }
        }
        if (!rootEntry) {
          notifyMissingRecentModelEntry(entry);
          return false;
        }
        return openPreparedJsonEntryInNewTab(rootEntry);
      } catch (err) {
        if (isLoadCancelledError(err)) {
          return false;
        }
        notifyMissingRecentModelEntry(entry);
        return false;
      }
    }

    async function loadGraphJsonFile(file, extraFiles = []) {
      const rootEntry = await prepareSelectedJsonEntries([file, ...extraFiles]);
      if (!rootEntry) {
        return false;
      }
      return openPreparedJsonEntryInNewTab(rootEntry);
    }

    async function openGraphJson() {
      if (!supportsOpenFilePicker()) {
        return false;
      }
      const handles = await showOpenFilePickerCompat({
        multiple: true,
        types: [
          {
            description: "JSON",
            accept: { "application/json": [".json"] },
          },
        ],
      });
      if (!handles || handles.length === 0) {
        return false;
      }
      const rootEntry = await prepareSelectedJsonEntries(handles);
      if (!rootEntry) {
        return false;
      }
      return openPreparedJsonEntryInNewTab(rootEntry);
    }

    return {
      loadGraphJsonFile,
      openGraphJson,
      openPreparedJsonEntry,
      openPreparedJsonEntryInNewTab,
      openRecentModelEntry,
    };
  }

  return {
    createModelLoadingHelpers,
  };
});
