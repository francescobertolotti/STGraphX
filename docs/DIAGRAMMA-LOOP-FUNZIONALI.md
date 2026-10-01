<!--
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Copyright (c) 2026 Francesco Bertolotti.
-->

# Diagramma dei Loop Funzionali

Il **Diagramma dei Loop Funzionali** è un'analisi qualitativa e strutturale del grafo diretto già presente nel modello. Si apre da **Esegui > Esegui Diagramma dei Loop Funzionali** e non richiede equazioni, dati quantitativi né simulazioni temporali. Non modifica il grafo: legge soltanto nodi, frecce e tipo di relazione funzionale.

## Preparare il grafo

Seleziona una freccia e, nel pannello delle proprietà, scegli il suo **Tipo di relazione funzionale**:

- `+` — relazione diretta: aumentando la sorgente, aumenta tendenzialmente la destinazione;
- `−` — relazione inversa: aumentando la sorgente, diminuisce tendenzialmente la destinazione;
- `1` — relazione non monotona o non specificata: la dipendenza esiste, ma non è possibile assegnarle con rigore un segno;
- `0` — nessuna relazione: rimuove la freccia, quindi non viene salvata né analizzata.

Ogni freccia nuova riceve per default `1`. Il valore `1` non significa `+1`: è un rapporto funzionalmente indeterminato per il calcolo dei segni. I modelli precedenti restano compatibili: le loro frecce senza campo esplicito assumono il valore `1`.

Con una relazione `+` o `−`, se il campo **Etichetta** è vuoto, DSGraph mostra automaticamente il segno sopra l'arco. Se viene inserita un'etichetta personalizzata, questa sostituisce il segno automatico; posizione, rotazione e sfondo dell'etichetta restano quindi completamente controllabili dall'utente.

## Risultati dell'analisi

Il pulsante **Esegui analisi** calcola cinque gruppi di risultati.

1. **Loop funzionali.** Elenca tutti i cicli semplici diretti fino al limite configurabile. Un ciclo contiene nodi non ripetuti, salvo il ritorno al nodo iniziale. Le rotazioni dello stesso ciclo non sono duplicate; gli autoanelli e archi paralleli sono trattati correttamente dal motore.
2. **Classificazione.** Per un loop composto solo da `+` e `−`, il prodotto dei segni vale `+1` (R, rinforzante: un numero pari di segni negativi) o `−1` (B, bilanciante: un numero dispari). Se contiene almeno un `1`, il prodotto è `0` e il loop è N, neutro o indeterminato. È comunque contato e mostra quali frecce impediscono la classificazione.
3. **Partecipazione delle variabili.** Per ogni variabile mostra il numero di loop totali, R, B e N, la loro lunghezza media e gli ID associati. La tabella è ordinata per partecipazione totale decrescente.
4. **Portata funzionale.** Mostra out-degree, nodi raggiungibili, nodi che possono raggiungere la variabile e centralità di intermediazione diretta. Per grafi oltre 80 nodi la centralità viene omessa per mantenere l'interfaccia responsiva.
5. **Influenza firmata.** Esplora cammini semplici fino alla profondità scelta (predefinita: 4). Per ogni nodo raggiunto separa segnali positivi, negativi e indeterminati e segnala un conflitto quando sono presenti sia segnali positivi sia negativi.

Il ranking dei punti di leva usa un punteggio esplicativo: `3 × partecipazione ai loop + nodi raggiungibili + nodi che possono raggiungere la variabile + intermediazione`. Serve a ordinare punti strutturalmente rilevanti, non a fare previsioni quantitative.

Le righe dei loop e delle variabili, e il ranking, sono cliccabili: evidenziano in sincronia nodi e frecce corrispondenti sul diagramma. L'esportazione CSV comprende riepilogo, loop e indicatori delle variabili.

## Esempio con quattro nodi

Considera i nodi `A`, `B`, `C`, `D` e queste frecce:

- `A → B (+)`, `B → A (+)`: loop `A → B → A`, **R**;
- `A → C (+)`, `C → A (−)`: loop `A → C → A`, **B**;
- `B → D (1)`, `D → B (+)`: loop `B → D → B`, **N**.

L'ultimo loop rimane visibile e conteggiato, ma non viene aggiunto né al totale R né al totale B: il segno della relazione `B → D` non è noto. Un eventuale `D → A (0)` non entra nel grafo analizzato.

## Limiti

Questa procedura descrive struttura e segni funzionali dichiarati; non calcola grandezze, tempi, ritardi o stabilità dinamica. Per simulare l'evoluzione nel tempo restano necessari equazioni, parametri, condizioni iniziali e, quando opportuno, ritardi. Grafi con moltissimi cicli possono raggiungere il limite di enumerazione: DSGraph avvisa chiaramente quando il risultato è troncato. Una relazione non monotona o funzionalmente incerta non viene forzata a positiva o negativa e mantiene quindi indeterminati i loop e i cammini che la attraversano.

## Note tecniche

L'algoritmo è implementato senza dipendenze esterne in `functional-loop-core.js`. Mantiene separate la validazione dei tipi di relazione, l'enumerazione e deduplicazione dei cicli, la classificazione dei segni, gli indicatori dei nodi e l'esportazione CSV. I test automatici coprono loop rinforzanti, bilancianti e indeterminati, archi `0`, autoanelli, archi paralleli e troncamento dell'enumerazione.
