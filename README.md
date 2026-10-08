# DSGraph: Readme

versione 8 ottobre 2026

Copyright (c) 2026 Luca Mari

## Attribution

DSGraph is a modified version of STGraphX, originally created by Luca Mari.

Original work:
Copyright (c) 2026 Luca Mari

Modifications and additional features:
Copyright (c) 2026 Francesco Bertolotti

DSGraph is distributed under the Mozilla Public License, version 2.0.

Luca Mari and the original STGraphX project are not necessarily responsible,
maintainers, or endorsers of DSGraph.

## Contesto

DSGraph, based on STGraphX, è un editor ed esecutore di modelli dinamici a grafo orientato.

È una reimplementazione di STGraph, da Java a JavaScript, realizzata interamente in _vibe coding_ con GPT-Codex-5.x (ho guardato ma mai toccato il codice generato, che al momento è di circa 1k linee HTML, 5k linee CSS, 40k linee JS).

Si può provare <a href="https://lmari.github.io/STGraphX" target="_blank" rel="noopener noreferrer">direttamente da questo repo GitHub</a>.

Il file QUICK-START.md contiene informazioni sull'installazione, l'uso, e lo sviluppo di STGraphX.

## Qualitative Graph Building

La procedura guidata `Inserisci > Grafo > Qualitative Graph Building...` crea
la struttura iniziale di un modello a partire da variabili, relazioni dirette,
variabili di stato e ruoli Input/Parametro. La metodologia è disponibile in
[italiano](docs/COSTRUZIONE-GRAFO-QUALITATIVO.md) e in
[English](docs/QUALITATIVE-GRAPH-BUILDING.md).

## Diagramma dei Loop Funzionali

Dal menu `Esegui` è disponibile il **Diagramma dei Loop Funzionali**, un'analisi
qualitativa del grafo che individua cicli rinforzanti, bilancianti e
indeterminati, partecipazione delle variabili, portata funzionale e influenza
firmata. I tipi di relazione `+`, `−`, `1` e `0` sono configurabili direttamente
nelle proprietà delle frecce; `+` e `−` vengono mostrati automaticamente sopra
la freccia quando non è presente un'etichetta personalizzata. La guida è disponibile in
[italiano](docs/DIAGRAMMA-LOOP-FUNZIONALI.md) e in
[English](docs/FUNCTIONAL-LOOP-DIAGRAM.md).

## Download dell'applicazione

Per scaricare la versione desktop di STGraphX (versione attuale: 2026.09.12):

- Linux: <a href="https://github.com/lmari/STGraphX/releases/latest/download/STGraphX.AppImage" target="_blank" rel="noopener noreferrer">AppImage</a>, <a href="https://github.com/lmari/STGraphX/releases/latest/download/STGraphX.tar.gz" target="_blank" rel="noopener noreferrer">tar.gz</a>

- Windows: <a href="https://github.com/lmari/STGraphX/releases/latest/download/STGraphX-setup.exe" target="_blank" rel="noopener noreferrer">exe di installazione</a>, <a href="https://github.com/lmari/STGraphX/releases/latest/download/STGraphX-portable.exe" target="_blank" rel="noopener noreferrer">exe portabile</a>

- macOS: <a href="https://github.com/lmari/STGraphX/releases/latest/download/STGraphX.dmg" target="_blank" rel="noopener noreferrer">dmg</a>, <a href="https://github.com/lmari/STGraphX/releases/latest/download/STGraphX.zip" target="_blank" rel="noopener noreferrer">zip</a>

## Stato del progetto

STGraphX è un'applicazione JavaScript con tre opzioni di uso:

* editor con tre shell e logica condivisa:
  * web, per accesso da browser via `http:` (e con qualche limitazione anche `file:`);
  * desktop, mediante `Electron`, per MS Windows, Mac, Linux;
  * desktop, mediante `Tauri` (build alternativa sperimentale);
* visualizzatore via browser;
* API Javascript.

Ha un'interfaccia utente responsive, che lo rende utilizzabile anche su tablet.

### Implementati (senza librerie esterne)

((*): funzionalità già presente in STGraph ma migliorata in modo significativo; (**): funzionalità assente in STGraph e introdotta qui)

#### Funzionalità generali

* Editor per grafi orientati, con nodi di forme e colori diversi e tooltip, frecce spline, testi, gruppi di presentazione sovrapponibili con visibilità indipendente, gestione di ridimensionamento, spostamento, cancellazione dei nodi, anche per selezioni multiple, zoom, griglia, clipboard (anche condivisa tra instanze diverse dell'app), undo e redo, ...
* Player per esecuzione di modelli in pagine HTML (**)
* API JavaScript per esecuzione headless via script (**)
* Menu, menu contestuale e pannello di configurazione aggiornato dinamicamente, con tooltip
* Interfaccia responsive a tab per più modelli, con gestione contestuale della relazione tra modelli e sottomodelli
* Gestione dei testi dell'interfaccia utente in italiano e inglese, con scelta via query string nella shell web (`?lang=it|en`) e via parametro `--lang=it|en` nella shell Electron
* Menu di help
* Script per generare il manuale di riferimento delle funzioni (**)
* Script per convertire i file dei modelli dal formato stg di STGraph (**)
* Una pagina di esempi configurabile via file JSON
* Licenza MPL-2.0

#### Funzionalità strutturali

* Gestione dei nodi algebrici, di stato, parametri e sottomodelli, con funzioni in sintassi javascript (compresa la gestione locale di `this` come stato attuale); controllo sintattico sul nome dei nodi; controllo sui parametri (valore non cambia dopo la prima esecuzione; frecce entranti non ammesse); inizializzazione ordinata di stati e nodi algebrici, con controllo di cicli nelle definizioni iniziali; controllo del numero di cifre decimali visualizzate (*)
* Gestione di variabili globali
* Tipi qualitativi sulle frecce (`+`, `−`, non monotona e nessuna relazione) e
  analisi del Diagramma dei Loop Funzionali, senza richiedere simulazioni (**)
* Possibilità di definire funzioni locali ai modelli (*)
* Gestione di nodi di output e di widget di output: grafici, tabelle, matrici, led, testo; le tabelle possono mostrare una serie storica oppure espandere vettori e matrici in celle scalari; pannello di configurazione aggiornato dinamicamente (*)
* Gestione di nodi di input e di widget di input, anche per parametri: slider, pulsante, selettore di testo; pannello di configurazione aggiornato dinamicamente
* Gestione dei sottomodelli con file JSON separati, con caricamento dalla stessa cartella del modello, binding dei nodi di input e accesso ai nodi di output con notazione `nomeSottomodello.nomeOutput`

#### Funzionalità dell'engine

* Definizione della base dei tempi e modalità varie di esecuzione; pannello di configurazione aggiornato dinamicamente
* Gestione di esecuzione completa, passo-passo, temporizzata, con modello in modalità read-only durante l'esecuzione
* Nelle Opzioni di visualizzazione, l'impostazione `Blocca l'esecuzione se non tutti i nodi sono definiti` evidenzia in rosso i nodi non definiti e blocca l'esecuzione con un messaggio di errore; disattivandola, l'esecuzione conserva il comportamento permissivo precedente (**)

#### Funzionalità del linguaggio

* Varie funzioni definite; mapping da valori booleani a valori numerici e funzione `if`
* Funzione `integral`, con scelta dell'algoritmo di integrazione, se Eulero o RK4;
* Alcune funzioni per distribuzioni di probabilità
* Generazione di vettori con la sintassi `range(inizio, fine, [passo])`; indicizzazione/slicing di vettori e matrici con la sintassi di NumPy, `[inizio:fine]` oppure `[inizio:fine:passo]`, anche con indici opzionali e negativi; gestione di funzioni a valori non scalari, per esempio `sin([1,2,3])`; gestione di operatori con argomenti non scalari (*)
* Funzioni "special form" per operare su vettori e matrici: `array`, `reduce`, `map`, `filter` (*)
* Una funzione per leggere il contenuto di file dati in formato csv (*)
* Gestione di proprietà custom per il modello e i singoli nodi e funzioni `getModelProperty`/`getProperty` e `setModelProperty`/`setProperty` (**)
* Prima gestione in logica ABM dichiarativa / funzionale, mediante variabili di sistema `self` e `$i$` (**)

#### Funzionalità di interfaccia utente

* Editor per espressioni, con controllo sintattico dinamico, visualizzazione dei valori attuali, help contestuale
* Due stili dell'interfaccia selezionabili da `Vista > Opzioni di visualizzazione`: `Legacy` e `Minimalista` (Minimalism & Swiss), con variante OLED scura disponibile per il secondo
* Visualizzazione alternata per il grafo e i widget
* Gestione di una dashboard a più pagine per raggruppare widget (**)
* Enfatizzazione delle frecce sul nodo selezionato
* Editor per testi con formattazione HTML basilare
* Una voce di menu per esportare la serie storica dei valori delle variabili di output in un file csv (*)
* Caricamento e salvataggio di modelli in file JSON (*)
* Una funzione per la generazione dei contenuti noti della 8-upla del modello attivo (*)
* Gestione dei gruppi di visualizzazione di nodi (*)
* Nel menu File, gestione persistente dei modelli aperti di recente, anche nella versione web
* Una prima gestione di controllo di correttezza del modello
* Un primo debugger, con gestione di watch e breakpoint (**)

#### Al momento non implementati (rispetto a STGraph)

* Altri widget e altre opzioni per i widget già presenti
* Altre funzioni
* Nodi di stato con output
* Gestione di interrupt
* Playmode e altre modalità di esecuzione
* ...

## Appunti sul progetto

* Comprende le richieste molto bene e la qualità del codice prodotto è quasi sempre eccellente
* Anche senza che glielo si chieda, fa test sul codice che ha generato, e quasi sempre lo corregge da sé se trova degli errori
* Nel caso di estensioni a parti già realizzate, si fa carico automaticamente di mantenere la coerenza
* Le spiegazioni del lavoro compiuto sono chiare e corrette
* A volte prende iniziative proponendo o anche implementando estensioni a quanto richiesto
* È in grado di fare refactoring e ottimizzazione, e fa refactoring anche autonomamente quando si accorge che è opportuno
* Si possono chiedere pareri o comunque indicazioni su come si potrebbero risolvere problemi
* Una stessa richiesta può includere cose diverse da realizzare
* Quando si chiede di realizzare cose complesse, suggerisce di farlo per passi successivi ("Se vuoi, il prossimo passo utile è...")
* Scrive ottima documentazione a partire dal codice, e aggiorna automaticamente la documentazione
* È come un dialogo con uno sviluppatore esperto (inclusi suoi commenti come "Il patch è saltato su un punto di contesto nel CSS. Lo rifaccio in blocchi più piccoli così non rischiamo di lasciare roba a metà.")
* Sa usare il software che ha generato: dunque in questo caso sa creare modelli stg come file json del formato atteso e di contenuto appropriato
* ...

## Documentazione aggiuntiva

Per l'architettura tecnica e per le istruzioni su come sviluppare il progetto, si veda `README-ARCHITECTURE.md`.

Per l'uso del player e dell'API JavaScript, si veda `README-PLAYER.md`.

Per l'uso di funzioni nei modelli, si veda `README-USAGE.md`.

Per convertire modelli XML legacy di STGraph nel formato JSON di STGraphX, si veda `README-CONVERSION.md`.

## Licenza

STGraphX è distribuito sotto licenza Mozilla Public License 2.0 (`MPL-2.0`).

Il testo completo della licenza è disponibile nel file `LICENSE`.

Le dipendenze di build e packaging attualmente usate dal progetto risultano distribuite principalmente sotto licenze permissive come `MIT`, `ISC`, `BSD` e `Apache-2.0`.
