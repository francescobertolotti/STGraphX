# DSGraph: Readme tecnico

versione 31 agosto 2026

Copyright (c) 2026 Luca Mari

## Attribution

DSGraph is a modified version of STGraphX, originally created by Luca Mari.

Original work:
Copyright (c) 2026 Luca Mari

Modifications and additional features:
Copyright (c) 2026 Francesco Bertolotti

DSGraph is distributed under the Mozilla Public License, version 2.0.

Luca Mari and the original STGraphX project are not necessarily responsible, maintainers, or endorsers of DSGraph.

## Architettura

DSGraph mantiene un unico codice applicativo per tre shell:

- web, per accesso da browser via `http:` (e con qualche limitazione anche `file:`);
- desktop, mediante `Electron`.
- desktop, mediante `Tauri`.

L'obiettivo è evitare duplicazione del codice applicativo e isolare le differenze di piattaforma, relative solo al layer di accesso a file e cartelle.

## Struttura del progetto

Frontend condiviso:

- `index.html`
- `styles.css`
- `app.js`
- `local-functions-core.js`
- `help-content.js`
- `model-analysis-core.js`
- `model-analysis-ui.js`
- `watch-debugger-core.js`
- `watch-debugger-ui.js`
- `widgets.js`
- `semantic.js`
- `graph-functions.js`
- `i18n-inline.js`

Shell Electron:

- `electron/main.js`
- `electron/preload.js`

Shell Tauri:

- `src-tauri/`
- `platform/tauri-platform.js`
- `scripts/build-tauri-frontend.js`

Supporto sviluppo:

- `scripts/dev-server.js`
- `package.json`

## i18n

La localizzazione runtime è concentrata in:

- `i18n-inline.js`

Il renderer legge i testi tramite:

- `window.STGraphXI18nBundles`

Questo evita dipendenze da `fetch(...)` e riduce i problemi in esecuzione locale o in ambienti con policy diverse sui file.

## Separazione delle responsabilità

### Renderer condiviso

Il renderer contiene:

- editor del grafo
- pannelli di configurazione
- runtime dei modelli
- integrazione UI della semantica delle espressioni
- risoluzione dei sottomodelli a livello logico

`app.js` resta il punto di orchestrazione principale della UI:

- selezione e navigazione sul canvas
- menu e finestre flottanti
- gestione file e recenti
- esecuzione del modello
- coordinamento tra sidebar, canvas, semantica e widget

### Modulo funzioni locali

`local-functions-core.js` contiene la logica di dominio per le funzioni definite nel modello:

- normalizzazione di nomi, parametri e definizioni;
- gestione della collezione memorizzata nel modello;
- costruzione delle firme e della mappa delle funzioni;
- validazione sintattica, conflitti con i nodi e rilevamento dei cicli di chiamata.

Espone nel renderer:

- `window.STGraphXLocalFunctionsCore.createLocalFunctionsCoreHelpers(...)`

L’editor delle funzioni locali e la sua integrazione con undo/redo restano nella shell `app.js`.

### Modulo help

`help-content.js` contiene la logica delle finestre informative derivate dal modello:

- pagina esempi
- generazione e rendering della 8-upla
- finestra about

Espone nel renderer:

- `window.STGraphXHelpContent.createHelpContentHelpers(...)`

In questo modo la logica di caricamento asset, rendering dei contenuti help ed esportazione markdown non resta più incorporata direttamente in `app.js`.

### Modulo analisi modello

`model-analysis-core.js` contiene il motore dell’analisi statica:

- raccolta dei riferimenti nelle espressioni
- analisi delle dipendenze implicite
- rilevazione di cicli non di stato
- controlli su nodi, archi, widget e binding dei sottomodelli
- preview di coerenza tra stato iniziale e stato prossimo

Espone nel renderer:

- `window.STGraphXModelAnalysisCore.createModelAnalysisCoreHelpers(...)`

In questo modo la logica diagnostica del modello non resta più incorporata direttamente in `app.js` ed è riusabile separatamente dalla UI.

`model-analysis-ui.js` contiene la logica UI della funzione `Analizza modello`:

- help dei controlli eseguiti
- rendering del report errori / warning / info
- apertura e chiusura delle relative finestre

Espone nel renderer:

- `window.STGraphXModelAnalysisUi.createModelAnalysisUiHelpers(...)`

In questo modo la presentazione dei risultati dell’analisi non resta più mescolata alla logica generale del renderer ed è separata dal motore di analisi statica.

### Modulo watch debugger

`watch-debugger-core.js` contiene la logica indipendente dalla UI del debugging:

- normalizzazione e pulizia della configurazione persistita dei watch;
- acquisizione dello snapshot dei valori precedenti;
- nomi disponibili, validazione e valutazione delle espressioni di breakpoint;
- costruzione del contesto del breakpoint, inclusi tempo e valori correnti o prossimi degli stati.

Espone:

- `window.STGraphXWatchDebuggerCore.createWatchDebuggerCoreHelpers(...)`

`watch-debugger-ui.js` contiene la logica UI del pannello di debugging:

- rendering della lista watch
- riepilogo dei valori corrente / precedente / prossimo
- rendering dello stato del breakpoint
- apertura e chiusura della finestra

Espone nel renderer:

- `window.STGraphXWatchDebuggerUi.createWatchDebuggerUiHelpers(...)`

In questo modo configurazione e valutazione dei breakpoint non restano mescolate alla UI. `app.js` mantiene soltanto l’integrazione con undo/redo, stato della shell e controller di esecuzione.

### Modulo widget

`widgets.js` contiene la logica specifica dei widget:

- creazione dei widget
- sanificazione delle opzioni
- rendering dei widget
- rendering del grafico XY
- aggiornamento runtime dei widget
- pannello di configurazione dei widget

Espone nel renderer un namespace condiviso:

- `window.Widgets`

In particolare:

- `window.Widgets.renderWidgets(...)`
- `window.Widgets.refreshWidgetConfigPanel(...)`
- helper di creazione come `addTableWidget(...)`, `addMatrixWidget(...)`, `addSliderWidget(...)`, `addXYChartWidget(...)`

### Modulo funzioni

`graph-functions.js` contiene il catalogo centralizzato del linguaggio:

- funzioni matematiche built-in
- funzioni su vettori e matrici
- generatori casuali
- distribuzioni probabilistiche
- metadatazione delle funzioni e variabili di sistema usata dall'editor e dall'help

Espone in particolare:

- `window.GraphFunctions.createMathScope(...)`
- `window.GraphFunctions.probability`
- `window.GraphFunctions.expressionDocs`

### Modulo semantico

`semantic.js` contiene:

- parser delle espressioni
- AST
- valutazione delle espressioni
- special forms del linguaggio:
  - `array(...)`
  - `map(...)`
  - `filter(...)`
  - `reduce(...)`
  - `append(...)`
  - forme condizionali di `count(...)` e `indicesWhere(...)`
- runtime dei modelli e delle transizioni di stato

In pratica:

- `graph-functions.js` definisce cosa il linguaggio sa fare
- `semantic.js` definisce come il linguaggio viene interpretato

### Layer di piattaforma

`app.js` usa wrapper compatibili per:

- apertura file
- salvataggio file
- scelta cartella

API usate dal renderer:

- `showOpenFilePickerCompat(...)`
- `showSaveFilePickerCompat(...)`
- `showDirectoryPickerCompat(...)`

Questi wrapper preferiscono:

1. `window.STGraphXPlatform` se disponibile
2. API native del browser come fallback
3. fallback HTML input dove necessario

## Electron bridge

### Main process

`electron/main.js` crea la finestra e gestisce tre canali IPC:

- `stgraphx:show-open-dialog`
- `stgraphx:show-save-dialog`
- `stgraphx:show-directory-dialog`

### Preload

`electron/preload.js` espone nel renderer:

- `window.STGraphXPlatform.showOpenFilePicker(...)`
- `window.STGraphXPlatform.showSaveFilePicker(...)`
- `window.STGraphXPlatform.showDirectoryPicker(...)`

Le API esposte imitano il più possibile gli handle del File System Access API del browser, così il renderer non deve conoscere la piattaforma concreta.

### Shared platform layer

Il bridge desktop non definisce più direttamente gli handle e le API di piattaforma dentro il preload. La logica condivisa è ora isolata in:

- `platform/path-handles.js`
- `platform/platform-contract.js`
- `platform/install-platform.js`
- `platform/electron-platform.js`
- `platform/tauri-platform.js`
- `platform/model-files.js`
- `platform/model-session.js`
- `platform/model-persistence.js`
- `platform/model-loading.js`
- `platform/submodel-support.js`
- `platform/submodel-resolution.js`
- `platform/submodel-orchestration.js`
- `platform/recent-models.js`

In questo modo:

- `electron/preload.js` resta un adapter sottile;
- il contratto `STGraphXPlatform` è versionato e dichiara identità della shell e capacità disponibili, così un adapter Tauri può offrire gli stessi handle e selettori senza modificare il renderer;
- gli handle file/cartella restano riusabili;
- gli helper di nomi file, download e derivazione delle cartelle modello non restano più dispersi dentro `app.js`;
- la preparazione delle entry JSON e la scelta degli handle di salvataggio non restano più incorporate direttamente nella shell editor;
- la persistenza JSON del modello e la scrittura su handle non restano più mescolate alla logica UI del renderer;
- il flusso di apertura del modello e di materializzazione del root entry non resta più incorporato direttamente nella shell editor;
- il supporto comune ai sottomodelli (analisi del root model, interfacce input/output, caching delle entry selezionate) non resta più disperso nella shell editor;
- la risoluzione dei file dei sottomodelli e il caricamento dei relativi template/interfacce non restano più dispersi nella shell editor;
- la coordinazione UI dei sottomodelli, inclusi preload, refresh delle interfacce e apertura nel modello corrente o in un nuovo tab, non resta più mescolata al renderer principale;
- la gestione dei modelli recenti è isolata dalla UI e riusabile tra shell diverse;
- l'app è preparata a future shell desktop alternative, per esempio Tauri, senza toccare la logica del renderer.

### Shell Tauri

La shell Tauri è una seconda build desktop, affiancata a Electron. Riusa `index.html` e tutti i moduli del renderer; `scripts/build-tauri-frontend.js` copia soltanto gli asset necessari in `dist/tauri/` prima del packaging.

`platform/tauri-platform.js` implementa il contratto `STGraphXPlatform` in un WebView Tauri. I comandi Rust in `src-tauri/src/lib.rs` forniscono:

- apertura e salvataggio file JSON;
- scelta della cartella del modello;
- lettura e scrittura di file;
- accesso alla clipboard.

Comandi principali:

```bash
npm run start:tauri
npm run start:tauri -- --lang=en
npm run build:tauri:frontend
npm run build:tauri
```

La shell richiede una toolchain Rust stabile oltre alle dipendenze JavaScript. `npm run build:tauri` genera prima la cartella statica e poi il pacchetto Tauri; i prodotti Rust intermedi in `src-tauri/target/` non sono versionati.

## Packaging

Il packaging desktop usa `electron-builder` via `package.json`.

### Primo packaging, passo per passo

La procedura consigliata è questa.

1. Verifica la versione di Node:

```bash
node -v
npm -v
```

2. Installa le dipendenze del progetto:

```bash
npm install
```

3. Controlla che il codice sia sintatticamente coerente:

```bash
npm run check
```

4. Avvia l'app in modalità desktop, prima di impacchettarla:

```bash
npm run start:desktop
```

Se vuoi forzare la lingua della UI nella shell Electron:

```bash
npm run start:desktop -- --lang=en
```

oppure:

```bash
npm run start:desktop -- --lang=it
```

Se non passi `--lang`, la shell Electron prova a usare la lingua del sistema operativo.

## Pagina esempi

La gestione della finestra `Help -> Modelli di esempio...` è mantenuta nella cartella `examples/`.

File principali:

- `examples/examples-catalog.json`
- `examples/examples-catalog.template.json`
- `examples/examples-help.css`
- `examples/README-EXAMPLES.md`

Il renderer carica dinamicamente catalogo e CSS, così contenuti e layout della pagina esempi possono essere mantenuti localmente in quella cartella.

5. Genera una build unpacked di prova:

```bash
npm run pack
```

Questo produce una versione non installer, utile per capire se la shell Electron funziona correttamente.
Provala con un comando come

```bash
./dist/linux-unpacked/stgraphx
```

6. Genera il pacchetto distribuibile per la piattaforma corrente, gli alias non versionati e i checksum:

```bash
npm run prepare:release
```

Il comando produce prima gli artefatti versionati e poi, nella stessa cartella `dist/`, le copie non versionate (per esempio `STGraphX.AppImage`) e `SHA256SUMS.txt`. Per una build specifica usa prima `npm run dist:linux`, `npm run dist:win` o `npm run dist:mac`, poi `npm run prepare:release:assets`.

7. Se vuoi forzare una piattaforma specifica:

```bash
npm run dist:win
npm run dist:linux
npm run dist:mac
```

### Cosa aspettarsi nella cartella `dist/`

A seconda del sistema operativo, `electron-builder` produrrà file diversi. Il prefisso del nome e' derivato da `window.STGraphXAppMeta.releaseDate` in `i18n-inline.js`, convertendo `YYYY.MM.DD` in `YYMMDD`: con `2026.09.09`, per esempio, l'AppImage e' `STGraphX260909.AppImage`.

- Windows: `STGraphX260909-setup.exe` e `STGraphX260909-portable.exe`
- Linux: `STGraphX260909.AppImage` e `STGraphX260909.tar.gz`
- macOS: `STGraphX260909.dmg` e `STGraphX260909.zip`

### Risorse opzionali ma consigliate

La cartella `build/` è predisposta per contenere risorse di packaging, in particolare:

- icone applicative
- eventuali immagini usate dagli installer

Se non inserisci icone personalizzate, il packaging funziona comunque, ma userà i default di Electron o di `electron-builder`.

### Nota sui target cross-platform

In generale, il packaging funziona meglio quando viene eseguito sulla piattaforma destinazione:

- build Windows su Windows
- build macOS su macOS
- build Linux su Linux

Alcuni target possono essere generati anche da altri sistemi, ma per una prima esperienza conviene evitare cross-build aggressivi.

Output previsto:

- cartella `dist/`

### Estensioni possibili

Passi successivi plausibili:

1. icone dedicate per Windows/macOS/Linux
2. packaging firmato
3. eventuale layer di persistenza più esplicito per preferenze applicative
4. eventuale toolbar o splash specifici per la shell desktop

## Avvio

### Versione web

Modalità consigliata:

```bash
npm run start:web
```

In alternativa puoi usare un altro server statico, per esempio:

```bash
python3 -m http.server
```

Note pratiche:

- con Firefox e Chrome funziona spesso anche `file:`, mentre Opera può essere meno affidabile;
- per un uso regolare è preferibile `http:`.
