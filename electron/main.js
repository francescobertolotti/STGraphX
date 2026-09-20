/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 * Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.
 */

const { app, BrowserWindow, clipboard, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs/promises');

function resolveSupportedLang(raw) {
  const value = String(raw || '').trim().toLowerCase();
  if (!value) {
    return '';
  }
  const base = value.split('-')[0];
  if (base === 'it' || base === 'en') {
    return base;
  }
  return '';
}

function resolveStartupLang() {
  const cliArg = process.argv.find((arg) => /^--lang=/i.test(String(arg)));
  if (cliArg) {
    return resolveSupportedLang(cliArg.split('=').slice(1).join('='));
  }
  return 'en';
}

function createWindow() {
  const win = new BrowserWindow({
    title: 'DSGraph',
    icon: path.join(__dirname, '..', 'icon.png'),
    show: false,
    width: 1600,
    height: 980,
    minWidth: 1100,
    minHeight: 700,
    autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  const startupLang = resolveStartupLang();
  win.loadFile(path.join(__dirname, '..', 'index.html'), startupLang ? { query: { lang: startupLang } } : undefined);
  win.once('ready-to-show', () => {
    win.show();
  });

  let allowClose = false;
  win.on('close', async (event) => {
    if (allowClose) {
      return;
    }
    event.preventDefault();
    let closeData = { hasUnsaved: false };
    try {
      closeData = await win.webContents.executeJavaScript(
        'window.__stgraphxGetClosePromptData ? window.__stgraphxGetClosePromptData() : ({ hasUnsaved: false })',
        true,
      );
    } catch (_err) {
      closeData = { hasUnsaved: false };
    }
    if (!closeData?.hasUnsaved) {
      allowClose = true;
      win.close();
      return;
    }
    const choice = await dialog.showMessageBox(win, {
      type: 'question',
      buttons: Array.isArray(closeData.buttons) && closeData.buttons.length >= 3
        ? closeData.buttons.slice(0, 3)
        : ['Save', 'Discard', 'Cancel'],
      defaultId: 0,
      cancelId: 2,
      noLink: true,
      message: closeData.message || 'There are unsaved changes. Save before closing?',
      detail: closeData.detail || '',
    });
    if (choice.response === 0) {
      let saved = false;
      try {
        saved = await win.webContents.executeJavaScript(
          'window.__stgraphxSaveBeforeClose ? window.__stgraphxSaveBeforeClose() : false',
          true,
        );
      } catch (_err) {
        saved = false;
      }
      if (!saved) {
        return;
      }
      allowClose = true;
      win.close();
      return;
    }
    if (choice.response === 1) {
      allowClose = true;
      win.close();
    }
  });
}

app.whenReady().then(() => {
  app.setName('DSGraph');
  ipcMain.handle('stgraphx:read-clipboard-text', () => clipboard.readText());
  ipcMain.handle('stgraphx:write-clipboard-text', (_event, text) => {
    clipboard.writeText(String(text ?? ''));
    return true;
  });
  ipcMain.handle('stgraphx:show-open-dialog', async (event, options = {}) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    return dialog.showOpenDialog(win, {
      title: options.title || 'Open JSON',
      properties: options.multiple ? ['openFile', 'multiSelections'] : ['openFile'],
      filters: [{ name: 'JSON', extensions: ['json'] }],
    });
  });

  ipcMain.handle('stgraphx:read-text-file', async (_event, filePath) => {
    return fs.readFile(String(filePath || ''), 'utf8');
  });

  ipcMain.handle('stgraphx:write-text-file', async (_event, filePath, text) => {
    await fs.writeFile(String(filePath || ''), String(text ?? ''), 'utf8');
    return true;
  });

  ipcMain.handle('stgraphx:show-save-dialog', async (event, options = {}) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    return dialog.showSaveDialog(win, {
      title: options.title || 'Save JSON',
      defaultPath: options.suggestedName || 'model.json',
      filters: [{ name: 'JSON', extensions: ['json'] }],
    });
  });

  ipcMain.handle('stgraphx:show-directory-dialog', async (event, options = {}) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const result = await dialog.showOpenDialog(win, {
      title: options.title || 'Select model folder',
      properties: ['openDirectory'],
    });
    return {
      canceled: result.canceled,
      directoryPath: result.filePaths && result.filePaths[0] ? result.filePaths[0] : '',
    };
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
