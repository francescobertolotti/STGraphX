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

- Aggiunta la procedura guidata **Qualitative Graph Building** in
  Inserisci > Grafo: raccoglie fino a dieci variabili, una matrice di relazioni
  dirette e le variabili di stato, quindi genera nodi vuoti e frecce con un
  layout a dispersione interno. La matrice usa selettori vuoti/0/1, rossi se
  non impostati e verdi dopo una scelta. La metodologia è documentata in
  italiano e inglese.
- Il layout generato da Qualitative Graph Building aumenta ora del 20% la
  distanza minima e quella desiderata tra nodi per ogni nodo oltre i primi due,
  riducendo le sovrapposizioni nei grafi più grandi.
- Le frecce possono ora avere un'etichetta testuale: dal menu contestuale si
  crea, modifica, ruota o elimina; l'etichetta è trascinabile, salvata nel
  modello e può essere rimossa anche con Canc/Backspace.
- Le proprietà della freccia includono ora testo e sfondo trasparente
  dell'etichetta, con checkbox allineata alla relativa voce; l'etichetta
  selezionata espone una maniglia circolare per ruotarla direttamente sul canvas.
- Il menu File consente ora di collegare CSV esterni al modello senza
  incorporarne il contenuto; i riferimenti sono suggeriti durante la scrittura
  di `readData("…")` nei parametri.
- Il primo capitolo del libro incorpora ora il modello `models/1.1.json` nel
  punto in cui presenta la matrice dei quattro problemi, tramite il player
  interattivo DSGraph.
- Aggiunto il visualizzatore HTML del libro in `libro/index.html`: converte i
  capitoli Markdown al caricamento, mantiene immagini e note a piè di pagina e
  presenta un indice laterale unico con ricerca e navigazione tra capitoli.
- Aggiunta `logBase(b, x)`, funzione per il logaritmo di `x` in base generica
  `b`, con supporto ai valori vettoriali e matriciali.
- Introdotto questo changelog e la relativa procedura obbligatoria di
  aggiornamento per ogni modifica al repository.
- Il pannello delle proprietà a destra può ora essere compresso e riaperto,
  lasciando più spazio al canvas.
- L'editor popup aperto con doppio clic su un nodo include ora il selettore del
  tipo e le caselle Output e Globale, insieme a valore e comportamento.
- Aggiunto il widget di output Bar plot: associa due array paralleli X e Y e
  rappresenta ogni coppia come una barra, con gli stessi assi e limiti del
  grafico X-Y.

### Changed

- Nel capitolo 2 del libro, le immagini delle quattro strutture elementari
  (catena, fusione, fork e loop) sono sostituite dai rispettivi modelli DSGraph
  interattivi presenti nella cartella del capitolo.
- I percorsi e gli identificatori dei dati CSV collegati sono conservati nel
  JSON del modello; l'editor ripristina automaticamente gli handle autorizzati
  oppure cerca nella cartella del modello, mostrando un warning solo per i file
  non disponibili.
- Le funzioni `appendRow`, `col`, `ncols`, `nrows`, `removeRow`, `row`,
  `setCol` e `setRow` sono ora classificate tra le funzioni per array e
  matrici, anziché tra quelle per agenti; il riferimento rapido è aggiornato.
- I suggerimenti dei CSV collegati in `readData("…")` mostrano ora la chiamata
  completa e indicano chiaramente l'azione di completamento; la guida utente e
  il riferimento rapido descrivono il collegamento, il ricollegamento e il
  requisito di una tabella CSV rettangolare.
- Il menu File riunisce la gestione dei CSV esterni in `Manage data links`:
  la finestra mostra ogni riferimento, segnala quelli da ricollegare e consente
  di aggiungere o rimuovere singoli file.
- Il player embedded usa ora inglese e il marchio DSGraph per impostazione
  predefinita; il testo di stato è sostituito da un pulsante Opzioni che
  permette di impostare la velocità temporizzata e di mostrare, su richiesta,
  i valori calcolati delle variabili.
- L'area grafica dell'editor e del player viene ora calcolata dai limiti reali
  di nodi, widget e testo, con margine e dimensione minima pari a metà della
  tela iniziale (600×400): torna quindi a ridursi quando gli oggetti vengono
  riavvicinati.
- Il primo capitolo del libro aggiunge due note sull'apprendistato di Leonardo
  presso Andrea del Verrocchio e sulla *Madonna col Bambino e una melagrana*,
  rinumerando coerentemente tutte le note successive.
- Il primo capitolo del libro sostituisce la nota 14 con un approfondimento
  sull'apprendimento nelle botteghe rinascimentali, con gli esempi di Leonardo,
  Verrocchio e della *Madonna col Bambino e una melagrana*.
- Il lettore HTML del libro mostra le note a piè di pagina in popup dal
  riferimento cliccato, amplia considerevolmente l'area di lettura e aggiunge
  nell'indice laterale i titoli di secondo livello del capitolo aperto.
- Il lettore HTML del libro compone ora le formule LaTeX, espande i sottocapitoli
  sotto il solo capitolo attivo e usa l'intestazione "An Introduction to
  Dynamical System Design"; il titolo del capitolo occupa l'intera larghezza
  dell'area di lettura e i riquadri non hanno più bordi verticali neri.
- La barra superiore mostra ora solo notifiche di warning arancioni o di errore
  rosse; gli aggiornamenti informativi non sono
  visualizzati. Il logo precedentemente inserito è stato rimosso.
- Le notifiche di warning ed errore restano visibili finché non vengono cliccate
  o finché il modello non viene modificato; i messaggi lunghi possono occupare
  una porzione più ampia della barra e andare su più righe.
- Le checkbox nelle opzioni di visualizzazione mantengono ora dimensioni
  intrinseche esplicite, evitando che Safari le allarghi e separi le etichette;
  il layout resta invariato in Chrome.
- Le proprietà temporali del modello impediscono ora valori negativi per
  `delta t` e richiedono sempre `t1 > t0`, anche quando un modello viene
  normalizzato al caricamento.
- Le frecce dei campi `t0` e `t1` avanzano o arretrano ora dello stesso valore
  del `delta t` corrente.
- Il tasto Canc/Backspace elimina ora gli oggetti selezionati anche su macOS,
  senza interferire con la modifica del testo nei campi editabili.
- Il prodotto distribuito e le relative finestre ora sono denominati DSGraph,
  based on STGraphX; attribuzioni e licenza MPL 2.0 sono documentate in
  `ATTRIBUTION.md` senza modificare gli identificatori tecnici compatibili.
- Il pannello del Bar plot mostra ora soltanto le sorgenti degli array X/Y, il
  colore e la larghezza delle barre, oltre a limiti degli assi e griglia; le
  opzioni non pertinenti per serie temporali, profili, linee e punti sono state rimosse.
- Il Bar plot riserva ora automaticamente spazio ai lati per la larghezza delle
  barre, mostra di default un tick per ogni valore X e consente di sostituire i
  valori numerici dell'asse X con etichette testuali.
- Il Delay predefinito per l'esecuzione temporizzata è ora 100 ms anziché
  1000 ms; i modelli che hanno un valore salvato esplicitamente lo mantengono.
- L'editor web, Electron e Tauri ora si avviano in inglese per impostazione
  predefinita; `?lang=it` e `--lang=it` continuano a selezionare l'italiano.
- La griglia del canvas è ora disattivata per impostazione predefinita; i
  modelli che la salvano esplicitamente attiva continuano a mostrarla.
- Lo sfondo dell'area del modello è ora bianco uniforme.
- L'icona di avvio dell'esecuzione temporizzata combina ora play e un piccolo
  cronometro, senza modificare le dimensioni del pulsante.
- I widget Button possono ora alternare il valore a ogni clic oppure restare
  attivi solo quando premuti, tornando al valore iniziale al rilascio.
- Le etichette della modalità di pressione del widget Button sono ora
  "Active while pressed" e "Attivo quando premuto".
- I nuovi widget di input non vengono più associati automaticamente a un
  parametro: il nodo da controllare va scelto esplicitamente.
- Lo slider dei widget usa ora una pista e un thumb disegnati esplicitamente,
  così min e max coincidono con gli estremi visivi senza invadere il campo numerico.
- Le tabelle con cronologia non duplicano più il campionamento iniziale degli
  stati quando lo stesso istante viene valutato una seconda volta.

### Fixed

- Il player web incorporato disegna ora frecce esplicite, indipendenti dal
  supporto del browser ai marker SVG, e visualizza anche le etichette dei link
  con posizione, rotazione e trasparenza salvate nel modello.
- I parametri basati su `readData` non vengono più valutati contro una cache
  CSV vuota durante l'apertura del modello: i nodi collegati non appaiono più
  erroneamente in rosso prima del ripristino dei dati.
- GitHub Pages non esegue più Jekyll/Liquid sulla repository: i capitoli del
  libro e le direttive del player embedded vengono pubblicati come file statici.
- Il lettore HTML del libro interpreta ora correttamente il markup Pandoc
  `.underline`, anche sui collegamenti, e non mostra più linee verticali nere
  nella navigazione né attorno ai riquadri del testo.

- Il widget Bar plot viene ora incluso correttamente nel rendering del canvas e
  nel caricamento dei modelli salvati, compreso il comando di inserimento.
- La modifica di un'equazione, inclusi stato iniziale e transizione di stato,
  resetta ora l'esecuzione al tempo iniziale invece di conservare lo stato
  calcolato con la definizione precedente.
- I tooltip degli oggetti scompaiono ora subito al movimento del cursore e
  ricompaiono solo dopo il normale tempo di attesa con il puntatore fermo.
- I modelli recenti disponibili si aprono direttamente dal riferimento
  memorizzato; se il file non esiste più viene mostrato un avviso, senza aprire
  il selettore di file né modificare il modello corrente.
- Caricando un modello, la sola scheda iniziale vuota e non modificata viene
  sostituita automaticamente; una scheda con anche una sola modifica resta
  invece aperta accanto al modello appena caricato.
- Le modifiche ai widget, comprese configurazione, aggiunta ed eliminazione,
  non resettano più lo stato dell'esecuzione; il reset resta riservato alle
  modifiche delle formule dei nodi.
- Le tabelle consentono ora di impostare per ciascuna colonna il nome
  visualizzato, l'allineamento e i decimali, con fallback alle impostazioni
  generali della tabella quando non sono specificati.
- Le proprietà di una colonna della tabella si aprono ora dal pulsante con
  ingranaggio accanto ai controlli di riordino ed eliminazione, evitando di
  espandere tutte le impostazioni nella barra laterale.
- Le tabelle con cronologia permettono ora di mantenere visibile la prima o
  l'ultima riga quando il contenuto supera l'area disponibile.

### Removed

_Nessuna rimozione per ora._

### Security

_Nessuna modifica di sicurezza per ora._
