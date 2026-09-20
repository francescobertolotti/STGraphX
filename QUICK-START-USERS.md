# DSGraph: Quick start per utenti

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

Questo file descrive l'uso di DSGraph nelle tre modalità basilari:

- editor completo;
- visualizzatore via browser;
- API JavaScript.

Per dettagli ulteriori:

- `README.md`
- `README-PLAYER.md`
- `README-USAGE.md`

## Licenza

STGraphX è distribuito sotto licenza Mozilla Public License 2.0 (`MPL-2.0`).

Se ricevi una copia redistribuita dell'applicazione o del player, il file `LICENSE` dovrebbe essere incluso insieme ai file del progetto.

## 1. Editor completo

### 1.1 A cosa serve

L'editor serve per:

- creare modelli;
- modificare modelli esistenti;
- eseguire simulazioni;
- configurare widget;
- usare strumenti come help, esempi, analisi del modello, debugger e 8-upla.

### 1.2 Cosa devi avere

Per usare l'editor ti serve una di queste due possibilità:

- una versione desktop di STGraphX già pronta da avviare;
- oppure una versione web dell'editor già pubblicata e raggiungibile via browser.

Se vuoi aprire modelli esistenti, ti servono anche:

- il file JSON del modello;
- eventuali file JSON di sottomodelli;
- eventuali file CSV usati dal modello tramite `readData(...)`.

### 1.3 Quali file devono essere presenti

Se usi l'editor desktop:

- ti basta avere l'app desktop STGraphX;
- i file dei modelli possono stare in qualunque cartella leggibile dall'app;
- i sottomodelli e i file CSV è bene che stiano nella stessa cartella del modello, o comunque in posizioni coerenti con i path usati dal modello.

Se usi l'editor web:

- deve esistere una pagina dell'editor già predisposta;
- i file del modello, dei sottomodelli e dei CSV devono essere raggiungibili dal browser.

### 1.4 Dove devono stare i file

Nel caso più semplice:

- metti il modello principale `.json` in una cartella;
- metti nella stessa cartella anche gli eventuali sottomodelli;
- metti nelle sottocartelle o nella stessa cartella gli eventuali file CSV;
- usa nei modelli path coerenti con questa struttura.

Questo è particolarmente importante per:

- sottomodelli;
- `readData(...)`.

### 1.5 Serve un server web?

Dipende.

Se usi l'editor desktop:

- no.

Se usi l'editor web:

- sì, normalmente l'editor va usato via `http:` o `https:`;
- l'uso diretto via `file:` può funzionare solo parzialmente ed è sconsigliato.

### 1.6 Come si usa

Editor web:

```text
http://localhost:8080/
http://localhost:8080/?lang=it
http://localhost:8080/?lang=en
```

Editor desktop:

- avvia l'applicazione STGraphX;
- poi apri o crea un modello.

Flusso tipico:

1. apri o crea un modello;
2. definisci nodi, relazioni e widget;
3. imposta i parametri temporali;
4. esegui il modello;
5. salva il modello in JSON;
6. se necessario, esporta gli output in CSV.

## 2. Visualizzatore Via Browser

### 2.1 A cosa serve

Il visualizzatore via browser, cioè il player, serve per:

- mostrare un modello già costruito;
- farlo usare senza esporre funzioni di editing;
- incorporarlo in una pagina web.

### 2.2 Cosa devi avere

Ti serve:

- un browser moderno;
- una pagina HTML che includa già STGraphX player;
- almeno un file JSON di modello.

Se il modello usa risorse esterne, servono anche:

- i file JSON dei sottomodelli;
- i file CSV letti da `readData(...)`.

### 2.3 Quali file devono essere presenti

Perché il player funzioni, in generale devono essere presenti:

- una pagina HTML che lo usa, per esempio `mypage.html`;
- `player-runtime-loader.js`;
- il bundle del player oppure i file sorgente del player;
- il file JSON del modello;
- eventuali sottomodelli;
- eventuali file CSV.

La configurazione consigliata è:

- `mypage.html`
- `player-runtime-loader.js`
- `build/player/stgraphx-player.min.js`
- `models/mio-modello.json`
- eventuali file collegati dentro `models/`

### 2.4 Dove devono stare i file

Una struttura semplice e chiara è questa:

```text
site/
  mypage.html
  player-runtime-loader.js
  build/
    player/
      stgraphx-player.min.js
  models/
    mio-modello.json
    sotto1.json
    sotto2.json
    dati.csv
```

Dentro `mypage.html` puoi allora scrivere, per esempio:

```html
<script src="player-runtime-loader.js"></script>

<stgraphx-player
  src="models/mio-modello.json"
  lang="it"
  zoom="0.9"
  controls="full">
</stgraphx-player>
```

La regola pratica è:

- la pagina HTML deve poter leggere `player-runtime-loader.js`;
- il loader deve poter leggere il bundle del player;
- il modello deve poter leggere gli eventuali sottomodelli e CSV usando path validi rispetto alla posizione del modello o della pagina, secondo i casi gestiti dal runtime.

### 2.5 Serve un server web?

Sì, nella pratica quasi sempre sì.

È la soluzione corretta usare:

- `http:`
- oppure `https:`

Per esempio:

```text
http://localhost:8080/mypage.html
```

L'uso diretto aprendo `mypage.html` via `file:` non è consigliato, perché può rompersi facilmente il caricamento di:

- modello JSON;
- sottomodelli;
- file CSV;
- script del player.

### 2.6 Come si usa

Una volta aperta la pagina HTML nel browser, vedrai:

- il grafo del modello;
- i widget;
- i controlli di esecuzione.

Potrai in genere:

- avviare l'esecuzione completa;
- eseguire un passo;
- avviare o fermare l'esecuzione temporizzata;
- fare reset;
- interagire con i widget di input.

Attributi più utili del player:

- `src`: file JSON del modello;
- `lang`: `it` oppure `en`;
- `zoom`: scala iniziale;
- `autostart`: avvio automatico;
- `controls`: `full`, `minimal`, `none`;
- `show-graph`: `false` per nascondere il grafo;
- `show-widgets`: `false` per nascondere i widget.

## 3. API JavaScript

### 3.1 A cosa serve

L'API JavaScript serve per controllare STGraphX da codice.

Ci sono due casi:

- uso dentro una pagina web, con il custom element `stgraphx-player`;
- uso headless da script JavaScript o Node.js.

### 3.2 Cosa devi avere

Per l'API dentro una pagina web ti serve:

- una pagina HTML;
- `player-runtime-loader.js`;
- il player STGraphX;
- un elemento `<stgraphx-player ...>`;
- uno script JavaScript tuo;
- un modello JSON.

Per l'API headless in Node.js ti serve:

- Node.js installato;
- i file JavaScript di STGraphX necessari al runtime headless;
- uno script `.js` tuo;
- un modello JSON.

Se il modello li usa, servono anche:

- sottomodelli JSON;
- file CSV.

### 3.3 Quali file devono essere presenti

Caso A: API del player dentro una pagina web.

Devono essere presenti:

- la tua pagina HTML;
- `player-runtime-loader.js`;
- il bundle del player oppure i file sorgente del player;
- il file JSON del modello;
- il tuo script JavaScript, se separato dalla pagina HTML.

Una struttura semplice può essere:

```text
site/
  api-demo.html
  player-runtime-loader.js
  build/
    player/
      stgraphx-player.min.js
  models/
    sir.json
```

Caso B: API headless in Node.js.

Devono essere presenti:

- `headless-runtime.js`;
- `i18n-inline.js`;
- `graph-functions.js`;
- `semantic.js`;
- `runtime-shared.js`;
- `runtime-core.js`;
- `runtime-loader.js`;
- `runtime-session.js`;
- `runtime-controller.js`;
- il tuo script `.js`;
- il modello JSON.

Una struttura semplice può essere:

```text
project/
  my-script.js
  headless-runtime.js
  i18n-inline.js
  graph-functions.js
  semantic.js
  runtime-shared.js
  runtime-core.js
  runtime-loader.js
  runtime-session.js
  runtime-controller.js
  models/
    sir.json
```

### 3.4 Dove devono stare i file

Per l'API web:

- la tua pagina HTML e il loader devono stare in una posizione coerente;
- il path nel `src` del player deve puntare davvero al modello JSON;
- i sottomodelli e i CSV devono essere raggiungibili dai path usati dal modello.

Per l'API headless Node.js:

- i file JavaScript del runtime devono stare in posizioni che il tuo script possa importare;
- il modello JSON deve stare in un path corretto rispetto allo script o alle opzioni passate al runtime;
- se usi `data` invece di `src`, devi comunque indicare un `basePath` corretto quando servono sottomodelli o CSV.

### 3.5 Serve un server web?

Per l'API dentro una pagina web:

- sì, è fortemente consigliato usare un server web attivo;
- in pratica vale lo stesso discorso del player embedded.

Per l'API headless in Node.js:

- no, non serve un server web;
- basta eseguire lo script con Node.js.

### 3.6 Come si usa

Caso A: API del player in una pagina web.

HTML:

```html
<script src="player-runtime-loader.js"></script>
<stgraphx-player id="p1" src="models/sir.json"></stgraphx-player>

<button id="stepBtn" type="button">Passo</button>
<pre id="outputBox"></pre>

<script>
  async function demo() {
    await customElements.whenDefined("stgraphx-player");
    const player = document.getElementById("p1");
    const stepBtn = document.getElementById("stepBtn");
    const outputBox = document.getElementById("outputBox");

    function refreshOutput() {
      outputBox.textContent = JSON.stringify({
        time: player.getTime(),
        outputs: player.getOutputs()
      }, null, 2);
    }

    await player.ready;
    refreshOutput();

    stepBtn.addEventListener("click", async () => {
      await player.step();
      refreshOutput();
    });
  }

  demo().catch(console.error);
</script>
```

Nota importante:

- prima di usare i metodi del player aspetta sempre:
  1. `customElements.whenDefined("stgraphx-player")`
  2. `player.ready`

Altrimenti l'elemento può essere già presente nella pagina ma non ancora inizializzato come custom element, e metodi come `step()` possono non essere ancora disponibili.

Metodi più utili:

- `run()`
- `runUntil(time)`
- `step()`
- `reset()`
- `toggleTimed()`
- `setValue(name, value[, options])`
- `setValues(values[, options])`
- `getValue(name)`
- `getOutputs()`
- `getTime()`

Caso B: runtime headless in Node.js.

```js
const { STGraphXHeadlessRuntime } = require("./headless-runtime.js");

async function main() {
  const runtime = await STGraphXHeadlessRuntime.load({
    src: "models/sir.json",
    lang: "it"
  });

  await runtime.setValues({
    beta: 0.4,
    gamma: 0.2
  }, { evaluate: true });

  await runtime.run();

  console.log(runtime.getOutputs());
  console.log(runtime.getOutputHistoryCsv());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

Esecuzione:

```bash
node my-script.js
```

Metodi più utili:

- `evaluate()`
- `step()`
- `run()`
- `runUntil(time)`
- `reset()`
- `setValue(name, value[, options])`
- `setValues(values[, options])`
- `getOutputs()`
- `getOutputHistory()`
- `getOutputHistoryCsv([options])`
- `writeOutputHistoryCsv(path[, options])`

## 4. Scelta Rapida Della Modalità

Usa l'editor se vuoi:

- costruire o modificare modelli;
- configurare widget;
- fare debug o analisi.

Usa il player se vuoi:

- mostrare un modello in una pagina web;
- permettere l'interazione senza funzioni di editing.

Usa l'API JavaScript se vuoi:

- controllare un modello da codice;
- integrare STGraphX in uno script o in un'applicazione più ampia.
