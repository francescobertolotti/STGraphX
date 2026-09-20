# Capitolo 7: utilizzare un modello {#capitolo-7-utilizzare-un-modello}

Per determinare la qualità di un modello dinamico, è utile considerare l\'approccio come se si trattasse di una consulenza professionale, dove il modello viene presentato come una soluzione per un ipotetico cliente. L\'obiettivo principale è verificare l\'utilità del modello, che rappresenta l\'indice fondamentale di qualità. Questo vale anche in contesti non consulenziali. Per esempio, per un ricercatore un modello è utile se gli fa scoprire qualcosa di nuovo sul sistema di cui ha interesse. È importante ricordare che la modellazione è solitamente un\'attività sviluppata su commessa specifica ma non sempre, quindi per voi è utile ragionare come se potesse servire in futuro a un cliente non identificato. Di conseguenza, l\'indicatore di qualità principale è: il modello deve essere in grado di adempiere al compito previsto. Qualora il modello fornisca risultati aggiuntivi interessanti, tanto meglio.

Tendenzialmente, un modello può essere prima valutato e successivamente utilizzato per generare dei risultati. In questo capitolo, analizziamo prima i criteri di qualità di un modello che lo rendono adeguato al nostro obiettivo, e poi due tecniche distinte (analisi di scenario e analisi di sensibilità) che si possono utilizzare per estrarre informazioni da un modello e aiutarci a generare immagini

## Valutazione della qualità di un modello {#valutazione-della-qualità-di-un-modello}

I criteri di valutazione della qualità di un modello si dividono in tre categorie:

1.  Criteri necessari

2.  Criteri desiderabili

### Criteri necessari {#criteri-necessari}

I criteri seguenti sono essenziali per garantire sia il superamento dell\'esame sia la presentazione di un modello valido a un cliente, evitando situazioni di insoddisfazione o scarsa professionalità:

1.  Assenza di errori sintattici**\
    **Il modello deve essere eseguibile senza errori sintattici. Spesso alcuni gruppi non riescono a eseguire il proprio modello. Anche se STGraph non presenta sempre messaggi di errore di facile interpretazione, è necessario garantire l\'assenza di errori di questo tipo. Un modello non funzionante non può essere valutato positivamente.

2.  Correttezza sintattica della ottupla**\
    **È fondamentale che la descrizione del modello sia sintatticamente corretta, inclusi gli insiemi di input con la corretta definizione delle unità di misura. Un errore comune è trattare una variabile algebrica come una variabile di stato. In questi casi, è necessario giustificare perché una variabile è considerata di stato, facendo riferimento a un comportamento dinamico (ad esempio accumulatore, ritardatore, memorizzatore) con una coda temporale.

3.  Consistenza delle ipotesi modellistiche\
    Le ipotesi del modello devono essere consistenti, a partire dalle due meta-ipotesi fondamentali: unità di tempo e unità di analisi. L\'utilizzo del diagramma "black box" è utile per la presentazione delle ipotesi e non dovrebbe essere trascurato.

4.  Comportamento dinamico del modello\
    Se il modello è algebrico ma presenta una variabile di stato finale, è formalmente dinamico ma sostanzialmente algebrico. I modelli dovrebbero presentare una dinamica interessante, non necessariamente caratterizzata dal numero di variabili di stato, ma dalla qualità del loro utilizzo.

### Criteri desiderabili {#criteri-desiderabili}

Oltre ai criteri necessari, vi sono delle condizioni desiderabili per migliorare ulteriormente la qualità del modello:

1.  Dinamica complessa ma non complicata\
    La dinamica del modello dovrebbe essere complessa, senza essere eccessivamente complicata. È utile seguire il principio DRY ("Don\'t Repeat Yourself"), sviluppando una dinamica interessante senza introdurre elementi ridondanti.

2.  Struttura efficiente\
    Utilizzare vettori al posto di variabili scalari multiple o implementare sottomodelli aiuta a migliorare la struttura del modello, rendendolo più efficiente e chiaro. L'opzione contraria è copiare e incollare nodi con le stesse formule[^cap7-1].

3.  Consistenza delle unità di grandezza\
    La consistenza delle unità di misura è fondamentale e deve essere verificata per garantire l\'affidabilità dei risultati.

4.  Discussione dei principali scenari\
    Il modello dovrebbe essere in grado di raccontare storie significative tramite l\'analisi di scenari. Un modello puramente algebrico o completamente casuale risulta poco interessante. Come nel caso del famoso esperimento di Galileo sulla caduta dei corpi, un modello deve essere in grado di raccontare una storia che susciti interesse. Dopo la costruzione del modello, è opportuno creare scenari che combinino parametri differenti per valutare come il modello risponde a situazioni diverse (es. "budget elevato e costi bassi").

## Analisi di scenario {#analisi-di-scenario}

L\'analisi di scenario (o what-if analysis) è una metodologia utilizzata per esplorare e valutare i possibili comportamenti di un modello sotto diverse combinazioni di parametri e condizioni iniziali. Consiste nel definire e analizzare vari scenari che rappresentano situazioni future alternative, al fine di comprendere come il sistema potrebbe reagire a variabili esterne o a cambiamenti nei parametri interni. Definire uno scenario, quindi, vuol dire impostare una determinata combinazione di input e parametri, interpretando non solo il loro significato ma anche quello dell'output che ne viene generato.

Questo tipo di analisi permette di identificare la robustezza del modello (e quindi di controllare una volta di più la qualità, nel senso dell'aderenza a un obiettivo predefinito) e di sviluppare strategie di risposta a possibili cambiamenti, assicurando una comprensione più completa del comportamento dinamico del sistema. La capacità di raccontare storie coerenti fra loro è un ulteriore indice della qualità del modello: un modello "schizofrenico" non è un modello che vogliamo utilizzare per prendere decisioni importanti.

Per ogni scenario (cioè, una specifica combinazione di parametri), è essenziale che ci sia una storia significativa da raccontare. Senza una storia che giustifichi il significato dello scenario, esso rimane semplicemente una combinazione di valori numerici, e il risultato rischia di non avere un impatto reale. Una buona storia fornisce il contesto necessario per comprendere le implicazioni della decisione suggerita, rendendo il modello più efficace e coinvolgente per chi lo utilizza o lo analizza.

Durante l\'analisi di scenario, è fondamentale gestire con attenzione la presenza di variabili casuali, che potrebbero infleunzare il risultato e renderlo meno interpretabile. Le possibili opzioni per fare ciò sono:

1.  Eliminazione delle variabili casuali**\
    **Durante l\'analisi, è possibile rimuovere l\'influenza delle variabili casuali, ad esempio impostando la deviazione standard di una distribuzione di probabilità gaussiana a zero.

2.  Ripetere più volte ciascuno scenario\
    Non è sufficiente presentare una singola esecuzione del modello, poiché non è rappresentativa dell\'insieme dei risultati possibili. Se vengono presentati quattro casi con comportamenti estremamente diversi tra loro, il modello risulterà troppo influenzato dalla casualità. In teoria[^cap7-2], è necessario simulare il modello per ottenere un numero significativo di osservazioni, e riportare poi sia il valore misurato che l'incertezza di misurazione.

## Analisi di sensitività {#analisi-di-sensitività}

L\'analisi di sensitività rappresenta un aspetto cruciale nella modellazione matematica e nell\'interpretazione di sistemi dinamici. Essa permette di determinare quanto una variazione degli input influenzi le uscite di un modello, fornendo indicazioni utili per valutare l\'utilità degli input stessi e la robustezza del modello. Formalmente, la sensitività può essere definita come il rapporto tra la variazione dell\'uscita (Δy) e la variazione dell\'input (Δu), ossia:

sensitività = Δy / Δu

Una sensitività pari a zero implica che la variabile u non ha alcuna influenza sulla previsione di y, risultando quindi inutile per la predizione. Al contrario, una sensitività molto elevata suggerisce che il modello potrebbe essere eccessivamente reattivo rispetto a variazioni di u, il che può mettere in dubbio la sua robustezza e la capacità di gestire perturbazioni.

**Analisi di Sensitività: Input, Parametri e Dimensione Temporale**

L\'analisi di sensitività può essere condotta considerando differenti riferimenti, come gli input del modello, i parametri interni e la dimensione temporale (Δt). In tal modo, si ottiene una valutazione più completa dell\'influenza di ciascun elemento sul comportamento complessivo del sistema.

Per quanto riguarda l\'analisi degli input, l\'obiettivo è valutare in che misura le variazioni degli input influenzano il comportamento del sistema. Se un determinato input ha una sensibilità trascurabile, potrebbe essere rimosso o semplificato, riducendo così la complessità del modello senza compromettere significativamente l\'accuratezza delle previsioni. D\'altro canto, se l\'input ha una sensibilità elevata, significa che il sistema è particolarmente influenzato da quel parametro e che è necessario comprenderlo e gestirlo con attenzione per evitare instabilità o comportamenti indesiderati.

Per quanto riguarda i parametri interni del modello, l\'analisi di sensitività consente di capire quali parametri hanno un impatto significativo sulle variabili di uscita e quali, invece, hanno un\'influenza minima. Questa informazione è fondamentale per calibrare il modello, poiché permette di concentrare gli sforzi di ottimizzazione sui parametri più critici, riducendo il carico computazionale e aumentando l\'efficienza dell\'intero processo di modellazione.

Infine, la dimensione temporale (Δt) gioca un ruolo rilevante nei sistemi dinamici. Analizzare la sensitività rispetto al passo temporale permette di comprendere se il modello è sensibile a variazioni nella discretizzazione temporale. Questo tipo di analisi è cruciale per evitare errori di integrazione numerica e per garantire che il modello rappresenti accuratamente la dinamica del sistema.

**Analisi di Sensitività nei Modelli MIMO**

Per i modelli a più ingressi e uscite (MIMO, Multiple-Input Multiple-Output), l\'analisi di sensitività rappresenta un problema multivariato. In tali casi, una strategia comune consiste nell\'analizzare una coppia di variabili alla volta, mantenendo costanti tutte le altre (analisi \"ceteris paribus\"). Questo approccio consente di isolare l\'effetto specifico di ciascun input su ciascuna uscita, riducendo la complessità dell\'analisi e facilitando l\'interpretazione dei risultati.

L\'approccio ceteris paribus, sebbene utile, presenta dei limiti: non tiene conto delle interazioni non lineari tra gli input che potrebbero influenzare simultaneamente più uscite. Pertanto, per i modelli complessi, può essere necessario utilizzare metodi più avanzati, come le tecniche di Monte Carlo o la decomposizione di Sobol\', che permettono di considerare l\'intero spettro delle interazioni tra variabili.

**Interpretazione dei Risultati dell\'Analisi di Sensitività**

L\'interpretazione dei risultati dell\'analisi di sensitività fornisce informazioni cruciali sulla struttura e sul comportamento del modello. Una sensitività elevata per un determinato input indica che piccole variazioni di quell\'input possono avere un grande impatto sull\'uscita del sistema. Questo è particolarmente rilevante nei sistemi reali, dove input sensibili devono essere monitorati e gestiti con particolare attenzione per evitare instabilità o fallimenti operativi.

Inoltre, l\'analisi di sensitività può evidenziare la presenza di ridondanze all\'interno del modello. Ad esempio, se due o più input mostrano una correlazione elevata con la stessa variabile di uscita, potrebbe essere possibile ridurre il numero di variabili indipendenti senza compromettere la precisione del modello. Questa semplificazione è utile sia per migliorare la leggibilità del modello sia per ridurre i costi computazionali.

**Applicazioni dell\'Analisi di Sensitività**

L\'analisi di sensitività trova applicazione in numerosi campi dell\'ingegneria, come l\'ingegneria civile, l\'ingegneria chimica, l\'automazione e la progettazione di sistemi complessi. Ad esempio, nella progettazione di un sistema di controllo per un impianto industriale, l\'analisi di sensitività permette di identificare i parametri critici e di stabilire le priorità per la calibrazione e la manutenzione del sistema. Nell\'ambito dell\'ingegneria gestionale, l\'analisi di sensitività può essere utilizzata per valutare come variazioni nei parametri di produzione influenzino l\'efficienza complessiva di una linea produttiva. Ad esempio, è possibile analizzare l\'effetto di un cambiamento nei tempi di lavorazione o nei livelli di scorte sul rendimento del sistema, consentendo di identificare le leve più efficaci per ottimizzare il processo produttivo.

Note da aggiungere

-   tabella lezione 2.1 ruoli

-   tecnica tabella

-   distinzione fra proprietà ed entità

-   inserire FDE nell'approfondimento sul Cobweb

-   Inserire approfondimento su relazione fra stati e memoria

-   Inserire approfondimento su storia della mappa logistica con May negli anni '60

-   Nell'approfondimento suila complessità dei sistemi, mettere anche Simon, Holland e Kauffman

-   Inserire una sezione di esempi di interessanti e famosi modelli di sistemi sociali

[^cap7-1]: In generale, imparare a utilizzare i vettori è un ottimo modo per realizzare un ottimo modello su STGraph, ma più in generale è anche un ottimo modo per imparare a pensare in modo diverso, e affrontare i problemi in modo più organico.

[^cap7-2]: Per la presentazione di un progetto basta ripetere ciascuno scenario 5 volte
