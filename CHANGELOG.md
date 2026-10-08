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

- I grafici X-Y e a barre consentono ora di aggiungere etichette testuali
  opzionali agli assi X e Y; lo spazio del grafico si adatta per mantenerle
  leggibili.
- Ogni coppia X-Y può ora avere una `Visualized label` personalizzata per la
  legenda; lasciandola vuota viene mantenuto il nome automatico `x -> y`.
- Nelle Opzioni di visualizzazione è disponibile lo stile `Minimalista`, una
  variante Minimalism & Swiss, affiancato da `Legacy` che conserva senza
  modifiche l'interfaccia precedente. Lo stile Minimalista offre anche una
  Modalità notturna OLED e adatta i grafici su canvas ai colori del tema.


### Changed

- Aggiornate al 2026-10-08 le date correnti della documentazione e il metadato
  di release mostrato nell'applicazione e nel player incorporabile.
- Lo stile grafico e la relativa Modalità notturna sono preferenze locali
  dell'interfaccia: non vengono salvati nel file del modello e non cambiano
  l'aspetto scelto da altri utenti.
- L'interfaccia usa ora Geist come font principale. Il tema Minimalista usa
  `#F7F8FA` per le superfici non separate e `#2563EB` per ogni stato attivo,
  selezione, focus e slider, mantenendo il canvas e gli input bianchi.
- Anche l'aspetto Legacy usa ora lo sfondo neutro `#F7F8FA` e il blu
  `#2563EB` per gli indicatori di selezione condivisi, senza modificare
  struttura o comportamento dell'editor.

### Fixed

- Nello stile Minimalista la preferenza del modello `Mostra griglia` viene
  nuovamente rispettata; inoltre l'editor delle equazioni conserva il proprio
  livello trasparente di sintassi, così il testo resta leggibile in entrambi i
  temi chiari e scuri.
- Nel popup di modifica del nodo, cambiare il tipo applica subito la
  trasformazione strutturale: i campi specifici (come stato iniziale e
  transizione) e la validazione si aggiornano immediatamente.
- Con più nodi selezionati, la spunta Input è ora disponibile quando tutti i
  nodi sono algebrici e privi di frecce entranti; se anche un solo nodo non è
  idoneo, l'azione resta indisponibile per l'intera selezione.


### Removed

_Nessuna rimozione per ora._

### Security

_Nessuna modifica di sicurezza per ora._
