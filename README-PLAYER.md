# DSGraph: Manuale d'uso del player

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

## Scopo

`stgraphx-player` è la shell embedded di STGraphX.

Serve per pubblicare dentro una pagina web un modello già costruito con l'applicazione completa, senza esporre alcuna funzione di editing.

L'idea è separare nettamente:

* `authoring app`: editor completo;
* `player`: runtime leggero per fruizione e interazione.

## Caratteristiche attuali

Il player:

* carica un modello JSON tramite attributo `src`;
* riusa i moduli runtime condivisi del progetto;
* supporta più istanze nella stessa pagina caricando gli script una sola volta;
* mostra:
  * grafo del modello;
  * widget;
  * dashboard con pagine a tab, se definita nel modello;
  * controlli di esecuzione;
* consente:
  * esecuzione completa;
  * esecuzione passo-passo;
  * esecuzione temporizzata;
  * reset;
  * interazione con i widget di input;
* supporta:
  * sottomodelli;
  * `readData(...)`;
  * localizzazione `it`, `en`.

In più è disponibile anche un runtime headless JavaScript, utilizzabile:

* in una pagina web;
* da script JS senza UI;
* in ambiente Node.js.

Non include invece:

* editor del modello;
* pannelli di configurazione;
* menu di authoring;
* analisi del modello;
* undo/redo;
* clipboard strutturata dell'editor.

## File coinvolti

Per usare il player ci sono due strade.

### Strada consigliata: loader unico

```html
<script src="player-runtime-loader.js"></script>
```

Il loader prova in quest'ordine:

1. `build/player/stgraphx-player.min.js`
2. `build/player/stgraphx-player.js`
3. fallback ai singoli file sorgente

Questa è la soluzione più pratica sia per i test sia per l'embed reale.

Carica anche:

* il custom element `stgraphx-player`;
* il runtime headless `STGraphXHeadlessRuntime`.

### Strada esplicita: file sorgente separati

```html
<script src="i18n-inline.js"></script>
<script src="graph-functions.js"></script>
<script src="semantic.js"></script>
<script src="runtime-shared.js"></script>
<script src="runtime-core.js"></script>
<script src="runtime-loader.js"></script>
<script src="runtime-session.js"></script>
<script src="runtime-controller.js"></script>
<script src="player-shell.js"></script>
```

Il file `player-demo.html` mostra un esempio minimo funzionante.

Per i test manuali più mirati ci sono anche:

* `tests/index.html`
* `tests/player_smoke_widgets.html`
* `tests/player_matrix_smoke.html`
* `tests/player_abm_space_smoke.html`

con i relativi modelli JSON nella cartella `tests/`.

## Bundle singolo

Per produrre un unico file JavaScript del player c'è lo script:

```bash
npm run build:player
```

Lo script:

* concatena gli script richiesti nell'ordine corretto;
* scrive `build/player/stgraphx-player.js`;
* se `terser` è disponibile, scrive anche:
  * `build/player/stgraphx-player.min.js`

Se `terser` non è installato, il bundle unico viene comunque generato.

### Come ottenere anche la versione minificata

Installa `terser` come dipendenza di sviluppo:

```bash
npm install --save-dev terser
```

Poi riesegui:

```bash
npm run build:player
```

Otterrai anche:

* `build/player/stgraphx-player.min.js`

Il loader `player-runtime-loader.js` la userà automaticamente se presente.

## Test del player

I test manuali del player sono nella cartella `tests/`.

### Modelli disponibili

* `tests/player_smoke_widgets.json`
* `tests/player_matrix_smoke.json`
* `tests/player_abm_space_smoke.json`

### Pagine HTML disponibili

* `tests/index.html`
* `tests/player_smoke_widgets.html`
* `tests/player_matrix_smoke.html`
* `tests/player_abm_space_smoke.html`

### Flusso consigliato

1. costruisci il bundle:

```bash
npm run build:player
```

2. avvia il server web locale:

```bash
npm run start:web
```

3. apri nel browser una delle pagine:

```txt
http://localhost:8080/tests/index.html
http://localhost:8080/tests/player_smoke_widgets.html
http://localhost:8080/tests/player_matrix_smoke.html
http://localhost:8080/tests/player_abm_space_smoke.html
```

Se il bundle non è presente, le pagine continuano comunque a funzionare grazie al fallback ai file sorgente.

## Licenza

Il player embedded, il runtime headless e i file sorgente correlati di STGraphX sono distribuiti sotto licenza Mozilla Public License 2.0 (`MPL-2.0`).

Il testo completo della licenza è disponibile nel file `LICENSE` del progetto.

## Uso minimo

```html
<stgraphx-player src="examples/newtonian_system.json"></stgraphx-player>
```

Esempio con due modelli nella stessa pagina:

```html
<stgraphx-player
  src="examples/newtonian_system.json"
  lang="it"
  zoom="0.9"
  controls="full">
</stgraphx-player>

<stgraphx-player
  src="examples/life.json"
  lang="en"
  zoom="0.8"
  controls="minimal">
</stgraphx-player>
```

## Attributi del custom element

### `src`

Percorso del file JSON del modello da caricare.

Esempio:

```html
<stgraphx-player src="models/sir.json"></stgraphx-player>
```

### `lang`

Lingua dell'interfaccia:

* `it`
* `en`

Se omesso, il player usa `en`.

### `zoom`

Fattore di zoom iniziale.

Esempio:

```html
<stgraphx-player src="m.json" zoom="0.85"></stgraphx-player>
```

Se assente, il player usa:

1. lo zoom salvato nel modello, se presente;
2. altrimenti `1`.

### `autostart`

Se presente, avvia automaticamente l'esecuzione dopo il caricamento.

Esempio:

```html
<stgraphx-player src="m.json" autostart></stgraphx-player>
```

### `controls`

Definisce il livello dei controlli visibili:

* `full`
  * `run`, `step`, `timed`, `reset`
* `minimal`
  * `run`, `reset`
* `none`
  * nessun controllo

Esempio:

```html
<stgraphx-player src="m.json" controls="minimal"></stgraphx-player>
```

### `show-graph`

Se impostato a `false`, nasconde il grafo.

Esempio:

```html
<stgraphx-player src="m.json" show-graph="false"></stgraphx-player>
```

### `show-widgets`

Se impostato a `false`, nasconde i widget.

Esempio:

```html
<stgraphx-player src="m.json" show-widgets="false"></stgraphx-player>
```

## API JavaScript

Il custom element espone questi metodi:

### `reload()`

Ricarica il modello.

```js
await player.reload();
```

### `run()`

Esegue il modello fino al tempo finale.

```js
await player.run();
```

### `runUntil(time)`

Esegue passi successivi fino a raggiungere il tempo richiesto, senza superarlo.

```js
await player.runUntil(10);
```

### `step()`

Esegue un singolo passo.

```js
await player.step();
```

### `reset()`

Reinizializza il modello.

```js
await player.reset();
```

### `toggleTimed()`

Avvia o ferma l'esecuzione temporizzata.

```js
await player.toggleTimed();
```

### `setZoom(value)`

Imposta lo zoom del player.

```js
await player.setZoom(1.1);
```

### `ready`

Promessa risolta quando il player ha completato il caricamento iniziale.

```js
await customElements.whenDefined("stgraphx-player");
await player.ready;
```

Nota:

- prima di usare i metodi del player conviene attendere sia la definizione del custom element sia `player.ready`;
- se salti `customElements.whenDefined("stgraphx-player")`, l'elemento può esistere nel DOM ma non essere ancora stato "upgraded", e metodi come `step()` possono risultare assenti.

### Metodi disponibili anche sul custom element

Oltre ai metodi di esecuzione, il player espone anche:

* `evaluate()`
* `setValue(name, value[, options])`
* `setValues(values[, options])`
* `runUntil(time)`
* `getValue(name)`
* `getValues(names)`
* `getOutputs()`
* `getTime()`

Esempio:

```js
const player = document.querySelector("stgraphx-player");
await customElements.whenDefined("stgraphx-player");
await player.ready;

await player.setValue("beta", 0.4, { evaluate: true });
const outputs = player.getOutputs();
```

Esempio più completo, con un pulsante HTML per avanzare di un passo e un elemento per visualizzare gli output:

```html
<script src="player-runtime-loader.js"></script>

<stgraphx-player id="p1" src="models/sir.json"></stgraphx-player>

<button id="stepBtn" type="button">Passo</button>
<pre id="outputBox"></pre>

<script>
  async function main() {
    await customElements.whenDefined("stgraphx-player");
    const player = document.getElementById("p1");
    const stepBtn = document.getElementById("stepBtn");
    const outputBox = document.getElementById("outputBox");

    function refreshOutput() {
      const payload = {
        time: player.getTime(),
        outputs: player.getOutputs(),
      };
      outputBox.textContent = JSON.stringify(payload, null, 2);
    }

    await player.ready;
    refreshOutput();

    stepBtn.addEventListener("click", async () => {
      await player.step();
      refreshOutput();
    });
  }

  main().catch((err) => {
    console.error(err);
  });
</script>
```

## Runtime headless

Il runtime headless è esposto come:

```js
STGraphXHeadlessRuntime
```

oppure, in Node.js:

```js
const { STGraphXHeadlessRuntime } = require("./headless-runtime.js");
```

Sono disponibili anche due helper espliciti:

```js
const {
  loadHeadlessRuntimeFromObject,
  loadHeadlessRuntimeFromJsonText
} = require("./headless-runtime.js");
```

### Caricamento

```js
const runtime = await STGraphXHeadlessRuntime.load({
  src: "examples/sir.json",
  lang: "it"
});
```

In alternativa puoi caricare direttamente un oggetto JSON:

```js
const runtime = await STGraphXHeadlessRuntime.load({
  data: modelJson,
  basePath: "./examples",
  lang: "en"
});
```

Se usi `data`, `basePath` o `baseUrl` servono per risolvere correttamente:

* sottomodelli;
* file letti tramite `readData(...)`.

Equivalentemente:

```js
const runtime = await STGraphXHeadlessRuntime.loadFromObject(modelJson, {
  basePath: "./examples",
  lang: "en"
});
```

oppure:

```js
const runtime = await STGraphXHeadlessRuntime.loadFromJsonText(modelText, {
  basePath: "./examples",
  lang: "en"
});
```

### Metodi principali

* `reload()`
* `evaluate()`
* `step()`
* `run()`
* `runUntil(time)`
* `reset()`
* `setValue(name, value[, options])`
* `setValues(values[, options])`
* `getValue(name)`
* `getValues(names)`
* `getOutputs()`
* `getOutputHistory()`
* `getOutputHistoryCsv([options])`
* `writeOutputHistoryCsv(path[, options])`
* `getTime()`
* `getStatus()`
* `getSettableNames()`
* `setProgressCallback(fn)`

### Esempio completo

```js
const runtime = await STGraphXHeadlessRuntime.load({
  src: "examples/sir.json",
  lang: "it"
});

await runtime.setValues({
  beta: 0.4,
  gamma: 0.2
}, { evaluate: true });

await runtime.run();

console.log(runtime.getOutputs());
console.log(runtime.getOutputHistory());
console.log(runtime.getOutputHistoryCsv());
```

### Export CSV della history

Per ottenere la history degli output in formato CSV:

```js
const csv = runtime.getOutputHistoryCsv();
```

Per limitare le colonne:

```js
const csv = runtime.getOutputHistoryCsv({
  names: ["S", "I", "R"]
});
```

Per scrivere direttamente il CSV su file in Node.js:

```js
const filePath = await runtime.writeOutputHistoryCsv("./out/sir.csv", {
  names: ["S", "I", "R"]
});
```

### Callback di avanzamento

Puoi passare una callback già al caricamento:

```js
const runtime = await STGraphXHeadlessRuntime.load({
  src: "examples/sir.json",
  lang: "it",
  onProgress(info) {
    console.log(info.phase, info.time, info.historyLength);
  }
});
```

oppure impostarla dopo:

```js
runtime.setProgressCallback((info) => {
  console.log(info.outputs);
});
```

La callback riceve un oggetto con:

* `phase`
* `time`
* `outputs`
* `historyLength`
* `status`

## Script demo headless

Nel repository c'è anche uno script pronto:

* `tests/headless-demo.js`

Esecuzione:

```bash
node tests/headless-demo.js
```

Lo script mostra:

* caricamento di un modello headless;
* impostazione di input;
* esecuzione con `runUntil(...)`;
* callback di avanzamento;
* scrittura della history CSV su file.

## Eventi emessi verso la pagina host

Il player emette eventi DOM con:

* `bubbles: true`
* `composed: true`

quindi intercettabili anche fuori dallo `Shadow DOM`.

### `stgraphx-load`

Emesso quando un modello è stato caricato.

Dettagli:

* `src`
* `title`

Esempio:

```js
player.addEventListener("stgraphx-load", (event) => {
  console.log(event.detail);
});
```

### `stgraphx-run-start`

Emesso all'inizio di un'esecuzione.

Dettagli:

* `mode`
  * `full`
  * `step`
  * `timed`

### `stgraphx-run-stop`

Emesso al termine di un'esecuzione o dopo un reset.

Dettagli:

* `mode`
  * `full`
  * `step`
  * `timed`
  * `reset`
* `time`

### `stgraphx-error`

Emesso quando il player incontra un errore.

Dettagli:

* `phase`
  * `load`
  * `run`
  * `step`
  * `timed`
  * `input`
* `message`

## Risoluzione dei path

I path relativi usati dal modello vengono risolti rispetto a `src`.

Questo vale in particolare per:

* sottomodelli;
* `readData(...)`.

Quindi, se il modello sta in:

```txt
models/demo/main.json
```

e usa:

```txt
readData("data/init.csv")
```

il player cercherà:

```txt
models/demo/data/init.csv
```

## Vista iniziale

Il player usa, quando disponibili nel JSON del modello:

* `view.zoom`
* `view.scrollLeft`
* `view.scrollTop`
* `presentationGroups`, incluse le visibilità dei gruppi di nodi

Se l'attributo `zoom` è specificato nell'HTML, quello ha precedenza sullo zoom salvato nel modello.

## Requisiti pratici

Il player va usato preferibilmente via `http:` o `https:`.

In particolare:

* il caricamento del JSON modello avviene via `fetch`;
* anche `readData(...)` e i sottomodelli passano da `fetch`.

Quindi l'uso diretto via `file:` può risultare limitato o non funzionare, a seconda del browser.

## Note sui widget

Al momento il player supporta:

* `slider`
* `button`
* `select`
* `text`
* `led`
* `matrix`
* `table`
* `xychart`

I widget di input aggiornano la preview del modello direttamente nel player.

Durante l'esecuzione temporizzata i widget di input vengono bloccati.

Il widget `table` puo mostrare una serie storica oppure, con `expandNonScalarValues: true`, espandere il valore istantaneo di vettori e matrici: ogni elemento compare in una cella distinta, con intestazioni come `nodo[0]` e `nodo[1][2]`.

## Limitazioni attuali

Il player è già utilizzabile, ma non è ancora completamente allineato alla shell completa.

In particolare:

* il rendering dei widget è ancora una versione dedicata del player, non ancora unificata con l'app completa;
* alcuni dettagli grafici e di layout possono differire dalla shell completa;
* il supporto ai casi più avanzati di widget e grafici è ancora in evoluzione.

## Demo

Per una prova rapida:

```txt
player-demo.html
```

che mostra due istanze del player nella stessa pagina.

## Evoluzione prevista

Passi naturali successivi:

* ulteriore allineamento del rendering widget fra player e app completa;
* documentazione di pubblicazione più completa;
* eventuale bundle dedicato del player;
* eventuale esportazione/publishing specifica per il player.
