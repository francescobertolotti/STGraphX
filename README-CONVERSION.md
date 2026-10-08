# DSGraph: Manuale di uso del convertitore da STGraph

versione 8 ottobre 2026

Copyright (c) 2026 Luca Mari

## Attribution

DSGraph is a modified version of STGraphX, originally created by Luca Mari.

Original work:
Copyright (c) 2026 Luca Mari

Modifications and additional features:
Copyright (c) 2026 Francesco Bertolotti

DSGraph is distributed under the Mozilla Public License, version 2.0.

Luca Mari and the original STGraphX project are not necessarily responsible, maintainers, or endorsers of DSGraph.

`scripts/convert-stgraph-xml.js` converte la parte strutturale di un modello XML legacy di STGraph (`.stg`) nel formato JSON di STGraphX.

## Uso

```bash
node scripts/convert-stgraph-xml.js percorso/modello.stg
```

Senza un secondo argomento, il file JSON viene creato nella stessa cartella, con lo stesso nome base:

```text
percorso/modello.stg -> percorso/modello.json
```

Per scegliere il file di output e produrre anche un report leggibile da altri strumenti:

```bash
node scripts/convert-stgraph-xml.js modello.stg converted/modello.json --report converted/modello.report.json
```

Il comando mostra sempre a terminale il numero di elementi convertiti e gli avvisi rilevati. Un avviso non impedisce la creazione del JSON: apre il modello convertito in STGraphX, quindi rivedi le formule e usa `Help > Analizza modello` prima di eseguirlo.

## Convertito

* intestazione del modello e base dei tempi: `time0`, `timeD`, `time1`, ritardo e zoom;
* nodi `ValueNode` e `AuxiliaryNode`: parametri, variabili algebriche e di stato;
* posizione, dimensione, colori, descrizione e proprietà custom dei nodi;
* frecce, inclusi i punti di controllo intermedi;
* testi inseriti nel canvas;
* riferimenti a `SubmodelNode` e `ModelNode`: l'estensione `.stg` viene sostituita con `.json` e i binding espliciti vengono mantenuti quando sono presenti.

## Non Convertito

Questa versione non converte widget, gruppi grafici e report legacy.  
Il report indica il numero e i tipi di widget incontrati.  
I sottomodelli non vengono convertiti ricorsivamente: ogni file `.stg` deve essere convertito separatamente.

STGraph e STGraphX hanno molte parti di linguaggio comuni, ma differiscono in alcune funzioni e convenzioni.

Questa versione converte:

* le riduzioni associative legacy `+/x` e `*/x` nella forma rispettivamente `reduce(+, x, 0)` e `reduce(*, x, 1)`, anche se l'argomento e fra parentesi, indicizzato o una riduzione annidata (le forme non associative `-/x` e `//x` restano invece da rivedere manualmente);
* converte vettori di intervallo `[1:5]` e `[1:2:5]` in `range(1, 6)` e `range(1, 6, 2)`;
* l'operatore dimensionale `@x` in `size(x)`;
*  l'operatore di concatenazione `x#y` in `append(x, y)` (con catene convertite da sinistra a destra);
* la sintassi `array([d0,d1,...], expr)` in `array(d0, d1, ..., expr)`; gli indici locali legacy `$i0`, `$i1`, ... sono gia supportati direttamente e vengono mantenuti.

Il convertitore segnala inoltre costrutti sospetti, come indici legacy residui, eventuali operatori `#` non convertiti, letture da foglio elettronico e `&&`/`||`.  
I nodi legacy di stato con un'espressione di output separata vengono convertiti in nodi di stato e quell'espressione viene conservata nelle `formula notes`, perché STGraphX non usa quel costrutto.  
I metodi di integrazione legacy diversi da Eulero richiedono una verifica manuale: il JSON prodotto imposta `euler` e registra un avviso.

## Verifica Del Convertitore

```bash
node tests/convert-stgraph-xml.test.js
```

Il test usa un piccolo modello XML sintetico e controlla la conversione di nodi, frecce, testi, colori, proprietà e widget esclusi.
