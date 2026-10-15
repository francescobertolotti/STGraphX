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

- Aggiunto `Strumenti > Analisi di sensibilità...`: consente di variare un solo
  parametro o input alla volta su un intervallo campionato e mostrare il valore
  finale di un output in tabella e in un grafico SVG, con esportazione CSV e
  download dell'immagine vettoriale del grafico,
  eseguendo copie temporanee del modello senza modificare il modello aperto.

- Aggiunta la `Modalità sviluppo` nelle Opzioni di visualizzazione: abilita una
  freccia per tornare al passo temporale precedente e conserva in RAM solo gli
  ultimi cinque stati. Il ritorno in avanti riusa uno stato già calcolato senza
  rivalutarlo; la cronologia non viene salvata nel modello e si elimina al
  termine o al reset dell'esecuzione.

- Aggiunte `odd(x)` ed `even(x)`, che restituiscono rispettivamente `1` per
  gli interi dispari e pari, oppure `0` negli altri casi.
- Aggiunta `powerLaw([alpha, xmin], x, mode)`, con campionamento quando `x`
  manca e supporto per pdf, cdf e icdf.
- Aggiunto il widget di input D-pad: vale `0` a riposo, `1` in alto, `2` a
  destra, `3` in basso e `4` a sinistra, con comportamento alternato o attivo
  solo mentre premuto.
- Pulsanti e direzioni del D-pad possono ora associare un tasto della tastiera;
  le associazioni sono univoche e una nuova assegnazione sostituisce la precedente.
- Aggiunto `TECHNICAL DEPT.md` per registrare i problemi rimandati con data e
  criterio di completamento.
- Le proprietà degli archi includono ora una `Description` libera, salvata nel
  modello insieme al collegamento.
- Le etichette automatiche `+` e `−` degli archi funzionali sono ora spostabili
  e ruotabili, mantengono il simbolo sincronizzato alla relazione e possono
  essere nascoste con una nuova opzione di visualizzazione.
- Passando su un punto o una linea del grafico x-y viene mostrata la coppia
  `(x, y)` più vicina; passando su una barra viene mostrato il suo valore.

### Changed

- Il Diagramma dei Loop Funzionali è stato spostato dal menu `Esegui` al menu
  `Tools`, insieme agli altri strumenti di analisi.

- I pulsanti standard mostrano ora rosso per il valore `0` e verde per il
  valore `1` con sfumature ad alto contrasto; la direzione attiva del D-pad
  usa un blu scuro con contorno visibile, anche durante la pressione.
- Le posizioni delle etichette degli archi sono ora offset relativi al loro
  arco: dopo uno spostamento seguono nodi e punti di controllo anziché restare
  ancorate a coordinate assolute del canvas.

### Fixed

- La finestra dell'analisi di sensibilità ora fa scorrere l'intero contenuto,
  inclusi tabella e grafico, evitando che il grafico venga compresso o tagliato.

- Nelle Opzioni di visualizzazione le opzioni di esecuzione sono ora disposte
  verticalmente, evitando che `Modalità sviluppo` faccia debordare il popup.

- Il profilo istantaneo del grafico x-y visualizza ora anche una singola coppia
  di valori scalari.
- Le serie dei grafici x-y e le barre vengono ora ritagliate entro i limiti
  fissati degli assi, con bordo e assi ridisegnati sopra ai dati.
- I menu a tendina scorrono internamente quando l'altezza della finestra non
  basta a visualizzarli interamente.
- Il sottomenu dei modelli recenti resta apribile dal menu File anche con i
  pannelli a tendina scorrevoli.

### Removed

_Nessuna rimozione per ora._

### Security

_Nessuna modifica di sicurezza per ora._
