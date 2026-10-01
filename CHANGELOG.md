# Changelog

Questo file registra tutte le modifiche che hanno effetto su codice, comportamento, documentazione, distribuzione o strumenti di sviluppo rispetto alla versione originaria di Luca Mari nella versione del 16 settembre. 

## Regola obbligatoria

Per ogni modifica effettuata nel repository, aggiornare nella stessa modifica la
sezione `Unreleased` qui sotto. Inserire la voce nella categoria appropriata e
scriverla dal punto di vista di chi usa o mantiene il progetto. Non chiudere una
modifica senza questa registrazione; se una voce non e' applicabile, indicarne
esplicitamente il motivo nella revisione della modifica.

Le categorie da usare sono: `Added`, `Changed`, `Fixed`, `Removed`, `Security`.
Le versioni pubblicate mantengono le stesse categorie sotto un'intestazione con
versione e data nel formato `## [x.y.z] - AAAA-MM-GG`.

## Unreleased

### Added

_Nessuna aggiunta per ora._

### Changed

- L'origine del canvas rimane ora fissa in alto a sinistra e la sua dimensione
  minima resta costante: l'adattamento dinamico estende soltanto il lato destro
  e quello inferiore, permettendo di posizionare gli oggetti nell'angolo alto
  sinistro senza spostare l'area del modello.
- Durante il trascinamento dei nodi, i limiti dinamici destro e inferiore si
  aggiornano subito: il nodo non viene più ritagliato quando supera l'area del
  modello precedentemente attiva.
- Le Opzioni di visualizzazione includono ora `Block execution if not all the
  nodes are defined`, attiva per impostazione predefinita: se attiva evidenzia
  in rosso i nodi incompleti e blocca l'esecuzione con un errore; se disattiva
  ripristina il comportamento permissivo precedente.
- Il popup di modifica di un nodo permette ora di modificarne nome, tipo e
  flag Input/Output/Global; i campi Description e Formula notes sono più
  compatti e la finestra mantiene la larghezza precedente con altezza maggiore.
- Il pannello `Current function value` del popup è ora collassato all'apertura,
  lasciando più spazio alla sezione `Contextual help`; può essere riaperto con
  un clic sul titolo.
- Le Opzioni di visualizzazione consentono ora di mostrare, disattivato di
  default, il valore corrente passato dalla sorgente sotto il centro di ogni
  collegamento, con testo su sfondo trasparente.
- I nuovi modelli iniziano ora sempre con la griglia nascosta.
- Qualitative Graph Building aggiunge una quarta fase per assegnare, quando
  compatibile con le relazioni scelte, il ruolo Input o Parametro alle
  variabili; i nodi generati ricevono automaticamente tipo e flag corrispondenti.

### Fixed

- In Safari, le checkbox Input, Output e Global nel pannello delle proprietà e
  nell'editor popup del nodo mantengono ora dimensioni intrinseche e un'area
  cliccabile corretta, senza separarsi dalle rispettive etichette.

### Removed

_Nessuna rimozione per ora._

### Security

_Nessuna modifica di sicurezza per ora._
