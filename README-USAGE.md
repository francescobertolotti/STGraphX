# DSGraph: Manuale di uso dell'editor (bozza)

versione 19 settembre 2026

Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.

## Attribution

DSGraph is a modified version of STGraphX, originally created by Luca Mari.

Original work:
Copyright (c) 2026 Luca Mari

Modifications and additional features:
Copyright (c) 2026 Francesco Bertolotti

DSGraph is distributed under the Mozilla Public License, version 2.0.

Luca Mari and the original STGraphX project are not necessarily responsible, maintainers, or endorsers of DSGraph.

## Definizione dei nodi prima dell'esecuzione

In `Vista > Opzioni di visualizzazione`, la casella `Blocca l'esecuzione se non tutti i nodi sono definiti` è attiva per impostazione predefinita. Con la casella attiva, DSGraph evidenzia in rosso i nodi privi di una definizione valida e blocca l'esecuzione, mostrando nella barra superiore il primo nodo problematico e il motivo. Disattivandola, i nodi vuoti non sono evidenziati e il modello conserva il comportamento permissivo precedente.

## Diagramma dei Loop Funzionali

Da `Esegui > Esegui Diagramma dei Loop Funzionali` puoi analizzare la struttura funzionale del grafo anche se le formule non sono ancora state scritte. Seleziona una freccia e imposta nel pannello laterale il tipo di relazione: `+` diretta, `−` inversa, `1` non monotona o non specificata, oppure `0` per rimuovere la freccia. Con `+` e `−`, il segno compare automaticamente sopra la freccia se il campo Etichetta è vuoto; un'etichetta personalizzata lo sostituisce. I loop composti solo da `+` e `−` risultano rinforzanti (R) o bilancianti (B); un loop che contiene `1` resta neutro o indeterminato (N). La finestra riporta loop, partecipazione delle variabili, portata funzionale, influenza firmata, ranking dei punti di leva ed esportazione CSV. La guida completa, inclusi limiti e esempio, è in [docs/DIAGRAMMA-LOOP-FUNZIONALI.md](docs/DIAGRAMMA-LOOP-FUNZIONALI.md).

## Gruppi di presentazione

Dal menu `Vista > Gruppi di presentazione...` puoi definire insiemi nominati di nodi per organizzare il grafo durante la presentazione del modello. Un gruppo non modifica frecce, formule o ordine di esecuzione.

- seleziona uno o più nodi e crea il gruppo assegnandogli un nome;
- un nodo può appartenere a più gruppi;
- la casella `Visibile` mostra o nasconde il gruppo. Un nodo presente in più gruppi resta visibile finché almeno uno dei suoi gruppi è visibile;
- la casella `Bordo e nome` mostra o nasconde solo la cornice e l'etichetta del gruppo, lasciandone visibili i nodi;
- i gruppi, i nomi e la visibilità sono salvati nel JSON del modello e sono rispettati anche dal player.

## Dashboard

Dal menu `Vista > Crea dashboard` puoi creare l'unica dashboard opzionale del modello. La stessa voce la mostra o nasconde in seguito. La dashboard e' un contenitore visivo nel canvas, indipendente dalla visibilita' del grafo: puo' avere piu' pagine a tab, ciascuna con un titolo.

La gestione avviene direttamente nella finestra:

- il pulsante `+` crea una pagina e la rende attiva;
- il pulsante `x` su un tab elimina la pagina, trasferendo i contenuti a un'altra pagina;
- il doppio click su un tab, oppure il piccolo pulsante di modifica, ne modifica il nome;
- trascina un widget o un testo autonomo nell'area della dashboard per assegnarlo alla pagina attiva; trascinalo poi fuori dall'area per renderlo di nuovo autonomo.

La dashboard puo' anche essere spostata trascinando la barra del titolo e ridimensionata dalla maniglia nell'angolo inferiore destro. Gli elementi assegnati usano coordinate locali alla pagina; le pagine non attive non visualizzano i rispettivi contenuti. La dashboard viene salvata nel JSON del modello ed e' resa anche dal player.

## Vettori e matrici

Il linguaggio delle espressioni di STGraphX supporta valori non scalari:

- scalari
- vettori
- matrici

Molte funzioni matematiche e molti operatori lavorano in modo vettorializzato. Per esempio:

- `sin([1,2,3])`
- `[1,2,3] * 2`
- `[1,2,3] + [4,5,6]`

Per le espressioni booleane puoi usare anche gli alias testuali:

- `not` al posto di `!`
- `and` al posto di `&&`
- `or` al posto di `||`

Esempi:

- `not(x > 0)`
- `a > 0 and b > 0`
- `occupied or toroidal`

### Costruzione

- `range(stop)`
- `range(start, stop[, step])`
  - genera un vettore numerico con estremo finale escluso
  - esempi:
    - `range(4)` -> `[0,1,2,3]`
    - `range(1,5)` -> `[1,2,3,4]`
    - `range(0,10,2)` -> `[0,2,4,6,8]`

- `array(axis0[, axis1, ...], expr)`
  - costruisce un vettore, una matrice o un array multidimensionale valutando `expr` per ogni combinazione degli assi
  - ogni asse puo essere un intero `n`, equivalente ai valori `0,...,n-1`, oppure un vettore che contiene direttamente i valori dell'asse
  - dentro `expr`, `$0`, `$1`, ... sono i valori correnti degli assi e `$i0`, `$i1`, ... i rispettivi indici da zero
  - esempi:
    - `array(3, 0)` -> `[0,0,0]`
    - `array(3, $0*2)` -> `[0,2,4]`
    - `array(range(-2,3), $0)` -> `[-2,-1,0,1,2]`
    - `array(2, 3, $0+$1)` -> `[[0,1,2],[1,2,3]]`
    - `array(range(-2,3), $i0)` -> `[0,1,2,3,4]`

### Accesso e slicing

I vettori possono essere indicizzati con sintassi in stile Python:

- `v[i]`
- `v[start:end]`
- `v[start:end:step]`

Sono supportati anche:

- indici negativi
- estremi opzionali

Esempi:

- `range(5)[2]` -> `2`
- `range(5)[1:4]` -> `[1,2,3]`
- `range(5)[::2]` -> `[0,2,4]`
- `range(5)[-1]` -> `4`
- `[1,2,3,4][[0,2]]` -> `[1,3]`
- `[1,2,3,4][[-1,0,-1]]` -> `[4,1,4]`

Per le matrici sono supportate entrambe le forme:

- `m[i]` restituisce la riga `i`
- `m[i][j]` restituisce l'elemento in posizione `i,j`

Sono inoltre disponibili selezioni non contigue:

- `m[[r,c]]` mantiene il significato di singola cella in posizione `r,c`
- `m[[r1,r2], :]` seleziona le righe indicate
- `m[:, [c1,c2]]` seleziona le colonne indicate
- `m[[[r1,c1],[r2,c2]]]` seleziona celle arbitrarie e restituisce un vettore
- `m[i, j]` restituisce lo stesso elemento con una sintassi piu compatta
- `m[righe, colonne]` consente slicing di righe e colonne nello stesso accesso, in stile NumPy

Esempi, assumendo:

- `m = [[1,2,3],[4,5,6],[7,8,9]]`

Allora:

- `m[0]` -> `[1,2,3]`
- `m[1][2]` -> `6`
- `m[1, 2]` -> `6`
- `m[0:2]` -> `[[1,2,3],[4,5,6]]`
- `m[:, 1]` -> `[2,5,8]`
- `m[:, 0]` -> `[1,4,7]`
- `m[:, -1]` -> `[3,6,9]`
- `m[0:2, 1:3]` -> `[[2,3],[5,6]]`
- `m[1, :]` -> `[4,5,6]`

La forma con `map(...)` resta comunque valida e puo essere utile quando si vuole essere espliciti:

- `map($value[1], m)` -> `[2,5,8]`

### Dimensioni

- `size(vettore)`
  - restituisce la lunghezza del vettore

- `size(matrice)`
  - restituisce `[righe, colonne]`

- `size(matrice, asse)`
  - con `asse = 0` restituisce il numero di righe
  - con `asse = 1` restituisce il numero di colonne

Esempi:

- `size([1,2,3])` -> `3`
- `size([[1,2,3],[4,5,6]])` -> `[2,3]`
- `size([[1,2,3],[4,5,6]], 0)` -> `2`
- `size([[1,2,3],[4,5,6]], 1)` -> `3`

### Trasformazione

- `map(expr, array)`
  - trasforma un vettore o una matrice elemento per elemento
  - dentro `expr`:
    - `$value` è il valore corrente
    - `$0`, `$1`, ... sono gli indici locali
  - esempi:
    - `map($value*2, [1,2,3])`
    - `map($0+$value, [10,20,30])`
    - `map($0+$1, [[1,2],[3,4]])`

- `filter(condizione, array[, modo])`
  - filtra un vettore o una matrice
  - con `modo` omesso o `elements`, filtra gli elementi
  - con `modo = "rows"`, filtra le righe di una matrice
  - con `modo = "cols"`, filtra le colonne di una matrice
  - dentro `condizione`:
    - `$value` è il valore corrente
    - `$0`, `$1`, ... sono gli indici locali
  - in modalità `rows`, `$value` è la riga corrente
  - in modalità `cols`, `$value` è la colonna corrente
  - esempi:
    - `filter($value>0, [-2,0,3,4])`
    - `filter($0%2===0, [10,20,30,40])`
    - `filter($value[0] > 0, [[1,2],[-1,5],[3,4]], "rows")`
    - `filter(sum($value) > 3, [[1,2,3],[4,5,6]], "cols")`

### Riduzione

- `reduce(op_o_funzione, vettore[, init])`
- `reduce(op_o_funzione, matrice, asse[, init])`

Riduce progressivamente:

- un vettore a uno scalare
- una matrice lungo un asse

Per le matrici:

- `asse = 0` riduce per colonne
- `asse = 1` riduce per righe

Esempi:

- `reduce(+, [1,2,3])` -> `6`
- `reduce(max, [3,7,2])` -> `7`
- `reduce(+, [[1,2],[3,4]], 0)` -> `[4,6]`
- `reduce(+, [[1,2],[3,4]], 1)` -> `[3,7]`

### Media e deviazione standard

- `average(vettore)`
  - restituisce la media aritmetica del vettore

- `average(matrice)`
  - restituisce la media aritmetica complessiva della matrice

- `average(matrice, asse)`
  - con `asse = 0` restituisce le medie per colonna
  - con `asse = 1` restituisce le medie per riga

- `stdev(vettore)`
  - restituisce la deviazione standard del vettore

- `stdev(matrice)`
  - restituisce la deviazione standard complessiva della matrice

- `stdev(matrice, asse)`
  - con `asse = 0` restituisce la deviazione standard per colonna
  - con `asse = 1` restituisce la deviazione standard per riga

Esempi:

- `average([1,2,3])` -> `2`
- `average([[1,2],[3,4]])` -> `2.5`
- `average([[1,2],[3,4]], 0)` -> `[2,3]`
- `average([[1,2],[3,4]], 1)` -> `[1.5,3.5]`
- `stdev([1,2,3])`
- `stdev([[1,2],[3,4]])`
- `stdev([[1,2],[3,4]], 0)`

### Somma e conteggio

- `sum(vettore)`
  - restituisce la somma degli elementi del vettore

- `sum(matrice)`
  - restituisce la somma complessiva della matrice

- `sum(matrice, asse)`
  - con `asse = 0` restituisce le somme per colonna
  - con `asse = 1` restituisce le somme per riga

- `count(vettore)`
  - conta gli elementi truthy del vettore

- `count(matrice)`
  - conta gli elementi truthy della matrice

- `count(matrice, asse)`
  - con `asse = 0` restituisce i conteggi per colonna
  - con `asse = 1` restituisce i conteggi per riga

- `count(condizione, array[, asse])`
  - conta gli elementi che soddisfano la condizione
  - dentro `condizione` puoi usare `$value` e gli indici locali `$0`, `$1`, ...

Esempi:

- `sum([1,2,3])` -> `6`
- `sum([[1,2],[3,4]])` -> `10`
- `sum([[1,2],[3,4]], 0)` -> `[4,6]`
- `count([1,0,1])` -> `2`
- `count([[1,0],[1,1]])` -> `3`
- `count([[1,0],[1,1]], 1)` -> `[1,2]`
- `count($value > 0, [-2,0,3])` -> `1`
- `count($value == 1, [[1,0],[1,1]], 1)` -> `[1,2]`

### Append e concatenazione

- `append(vettore, valore)`
  - aggiunge un elemento in fondo a un vettore

- `append(vettore, vettore2)`
  - concatena due vettori

- `append(matrice, vettoreRiga)`
  - aggiunge una riga a una matrice, se la lunghezza è compatibile

Esempi:

- `append([1,2], 3)` -> `[1,2,3]`
- `append([1,2], [3,4])` -> `[1,2,3,4]`
- `append([[1,2],[3,4]], [5,6])` -> `[[1,2],[3,4],[5,6]]`

### Operazioni insiemistiche e flatten

- `set(vettore)`
  - elimina i duplicati mantenendo l'ordine di prima apparizione

- `union(vettoreA, vettoreB)`
  - unisce due vettori eliminando i duplicati

- `intersection(vettoreA, vettoreB)`
  - restituisce solo gli elementi presenti in entrambi i vettori

- `flatten(matrice)`
  - trasforma una matrice in un vettore concatenando le righe

Esempi:

- `set([3,1,3,2,1])` -> `[3,1,2]`
- `union([1,2], [2,3])` -> `[1,2,3]`
- `intersection([1,2,2,3], [2,3,4])` -> `[2,3]`
- `flatten([[1,2],[3,4]])` -> `[1,2,3,4]`

### Indici e sostituzione

- `indicesWhere(vettore)`
  - restituisce gli indici degli elementi truthy

- `indicesWhere(matrice)`
  - restituisce le coordinate `[riga, colonna]` degli elementi truthy

- `indicesWhere(condizione, array)`
  - restituisce gli indici degli elementi che soddisfano la condizione
  - dentro `condizione` puoi usare `$value` e gli indici locali `$0`, `$1`, ...

- `setAt(vettore, indice, valore)`
  - restituisce una copia del vettore con un elemento sostituito

- `setAt(matrice, [riga,colonna], valore)`
  - restituisce una copia della matrice con una cella sostituita

- `setAt(matrice, riga, vettoreRiga)`
  - restituisce una copia della matrice con una riga sostituita

- `removeAt(vettore, indice)`
  - restituisce una copia del vettore senza l'elemento indicato

- `removeAt(matrice, indice)`
  - restituisce una copia della matrice senza la riga indicata

- `removeAt(matrice, indice, 1)`
  - restituisce una copia della matrice senza la colonna indicata

Esempi:

- `indicesWhere([0,1,0,1])` -> `[1,3]`
- `indicesWhere([[1,0],[0,1]])` -> `[[0,0],[1,1]]`
- `indicesWhere($value > 0, [-2,0,3])` -> `[2]`
- `indicesWhere($0 === $1, [[1,2],[3,4]])` -> `[[0,0],[1,1]]`
- `setAt([1,2,3], 1, 9)` -> `[1,9,3]`
- `setAt([[1,2],[3,4]], [1,0], 8)` -> `[[1,2],[8,4]]`
- `removeAt([1,2,3], 1)` -> `[1,3]`
- `removeAt([[1,2],[3,4]], 0)` -> `[[3,4]]`
- `removeAt([[1,2],[3,4]], 1, 1)` -> `[[1],[3]]`

### Coordinate e griglie spaziali

- `grid(righe, colonne)`
  - costruisce una matrice di occupazione con `1` nelle celle occupate e `0` altrove

- `grid(righe, colonne, collisioni)`
  - con `collisioni` uguale a `"error"`, `"first"` o `"sum"` controlla come gestire coordinate coincidenti, usando `1` come valore implicito

- `grid(righe, colonne, collisioni, valoreScalare)`
  - usa lo stesso valore in ogni cella occupata

- `grid(righe, colonne, collisioni, vettoreValori)`
  - usa `vettoreValori[i]` nella cella di coordinate `righe[i], colonne[i]`

- `grid(righe, colonne, collisioni, valore)`
  - con `collisioni` uguale a `"error"`, `"first"` o `"sum"` controlla come gestire coordinate coincidenti

Regole:

- `righe` e `colonne` devono essere vettori della stessa lunghezza
- le coordinate devono essere interi non negativi
- il primo vettore indica le righe, il secondo le colonne
- la dimensione della matrice viene inferita come:
  - righe = `max(righe) + 1`
  - colonne = `max(colonne) + 1`
- se due agenti finiscono nella stessa cella:
  - con `"error"` l'espressione fallisce con errore
  - con `"first"` resta il valore della prima occorrenza
  - con `"sum"` i valori coincidenti vengono sommati

Esempi:

- `grid([1,1], [0,2])` -> `[[0,0,0],[1,0,1]]`
- `grid([1,1], [0,2], "error", 5)` -> `[[0,0,0],[5,0,5]]`
- `grid([1,1], [0,2], "error", [1,2])` -> `[[0,0,0],[1,0,2]]`
- `grid([1,1], [0,0], "first")` -> `[[0],[1]]`
- `grid([1,1], [0,0], "sum")` -> `[[0],[2]]`
- `grid([1,1], [0,0], "sum", [2,3])` -> `[[0],[5]]`

- `coords(matrice)`
  - restituisce le coordinate `[riga, colonna]` delle celle non nulle

- `coords(matrice, valore)`
  - restituisce le coordinate `[riga, colonna]` delle celle uguali a `valore`

Esempi:

- `coords([[0,1,0],[2,0,3]])` -> `[[0,1],[1,0],[1,2]]`
- `coords([[0,1,0],[2,0,3]], 2)` -> `[[1,0]]`

### Vicinato su griglia

- `neighbors(matrice, riga, colonna)`
  - restituisce i valori del vicinato di Moore della cella indicata

- `neighbors(matrice, riga, colonna, false)`
  - restituisce solo i vicini ortogonali: sopra, sotto, sinistra e destra

- `neighbors(matrice, riga, colonna, true, true)`
  - usa il vicinato di Moore con spazio toroidale

- `neighbors(matrice, riga, colonna, false, true)`
  - usa solo i vicini ortogonali con spazio toroidale

Esempi:

- `neighbors([[1,2,3],[4,5,6],[7,8,9]], 1, 1)` -> `[1,2,3,4,6,7,8,9]`
- `neighbors([[1,2,3],[4,5,6],[7,8,9]], 1, 1, false)` -> `[2,4,6,8]`
- `neighbors([[1,2,3],[4,5,6],[7,8,9]], 0, 0, false, true)` -> `[2,4,3,7]`

### Estrazione, permutazione e ordinamento

- `choice(vettore)`
- `choice(matrice)`
  - estrae casualmente un elemento da un vettore non vuoto
  - oppure una riga da una matrice non vuota

- `shuffle(vettore)`
- `shuffle(matrice)`
  - restituisce una copia del vettore con gli elementi mescolati casualmente
  - oppure una copia della matrice con le righe mescolate casualmente

- `sort(vettore)`
  - restituisce una copia del vettore ordinata in senso crescente

Esempi:

- `choice([10,20,30])`
- `choice([[1,2],[3,4]])` -> `[1,2]` oppure `[3,4]`
- `shuffle([1,2,3,4])`
- `shuffle([[1,2],[3,4],[5,6]])`
- `sort([3,1,2])` -> `[1,2,3]`

### Nota semantica

Le funzioni e gli operatori non scalari sono pensati per lavorare in modo coerente su numeri, vettori e matrici numeriche. In presenza di forme non compatibili, per esempio vettori di lunghezza diversa o matrici non rettangolari, l'espressione fallisce con errore di valutazione.

## Numeri casuali

- `rand()`
  - numero casuale uniforme tra `0` e `1`

- `rand(max)`
  - numero casuale uniforme tra `0` e `max`

- `rand(min, max)`
  - numero casuale uniforme tra `min` e `max`

- `randInt(max)`
  - intero casuale uniforme tra `0` e `max`, con `max` incluso

- `randInt(min, max)`
  - intero casuale uniforme tra `min` e `max`, con `max` incluso

Esempi:

- `rand()`
- `rand(10)`
- `rand(-1, 1)`
- `randInt(5)`
- `randInt(2, 7)`

## Stato iniziale dei nodi di stato

Per un nodo di stato, l'espressione di `stato iniziale`:

- puo usare costanti, funzioni, proprieta del nodo e variabili globali come `time`, `t0`, `t1`, `dt`
- puo usare parametri, nodi algebrici e nodi di stato collegati da una freccia entrante, oltre ai parametri globali
- se riferisce un nodo di stato, usa il suo stato iniziale
- se riferisce un nodo algebrico, ne usa il valore calcolato durante l'inizializzazione

STGraphX risolve insieme parametri, stati iniziali e nodi algebrici necessari, rispettando le frecce e le dipendenze effettive delle espressioni. Per esempio, con frecce `p -> a -> b -> c`:

```text
a.stato iniziale = p + 1
b.comportamento = a * 2
c.stato iniziale = b + 3
```

`c` viene inizializzato usando il valore iniziale di `a` e il valore iniziale di `b`.

La regola resta la stessa del resto del linguaggio del modello:

- un nodo vede solo cio che entra in esso

Un ciclo nelle definizioni iniziali, diretto o indiretto, non e ammesso. Per esempio `a.stato iniziale = b + 1` e `b.comportamento = a + 1` genera un ciclo `a -> b -> a`, segnalato da `Help > Analizza modello` e non risolvibile in esecuzione.

Nel pannello `Modifica...`, per il campo `stato iniziale`, l'elenco dei simboli disponibili mostra tutti i nodi entranti ammessi in quel contesto.

## Sottomodelli

STGraphX supporta i `sottomodelli` come nodi speciali che referenziano un altro modello salvato in un file JSON separato.

Principi d'uso:

- un `sottomodello` è un nodo del modello padre
- il file del `sottomodello` è esterno, non incorporato inline nel JSON del modello padre
- il file padre e i file figlio devono stare nella stessa cartella
- l'interfaccia del `sottomodello` è definita dai nodi `input` e `output` del modello figlio
- gli input del `sottomodello` possono avere binding espliciti nel modello padre, oppure restare vuoti e usare i default definiti nel modello figlio

Uso pratico:

1. crea o seleziona un nodo di tipo `sottomodello`
2. usa `Apri` per scegliere il file JSON del `sottomodello` oppure per aggiornarlo
3. una volta disponibile, usa `Mostra` per aprire il modello figlio
4. quando carichi un modello padre che contiene `sottomodelli`, l'app può chiedere anche la cartella del modello per risolvere automaticamente i file figlio

Note:

- le uscite del `sottomodello` sono accessibili nel modello padre con la notazione `nomeSottomodello.nomeOutput`
- lo stato interno dei nodi di stato del `sottomodello` resta locale al modello figlio
- padre e figli condividono la stessa base dei tempi: `time`, `t0`, `t1`, `dt`

### Sottomodelli come template di agenti

Un `sottomodello` puo essere usato anche come template di una popolazione di agenti: il comportamento emerge direttamente quando gli ingressi o gli stati del modello figlio sono vettoriali.

In questa modalità:

- ogni nodo del modello figlio puo assumere valori vettoriali
- ogni elemento del vettore corrisponde a un agente
- il modello padre continua a vedere il `sottomodello` come un singolo nodo, ma le sue uscite possono essere vettori

Regole pratiche:

- se uno stato iniziale del modello figlio e, per esempio, `range(3)`, allora il `sottomodello` rappresenta gia una popolazione di `3` agenti
- analogamente, anche espressioni come `array(3, rand())` possono costruire una popolazione iniziale di `3` agenti
- nel modello padre, le uscite del `sottomodello` restano accessibili con la sintassi `nomeSottomodello.nomeOutput`

### `this`, `self`, `x` e `x[$i]`

Quando un nodo del modello figlio è usato in modo vettoriale, è utile distinguere tra valore completo e valore locale:

- `this`
  - valore completo corrente del nodo
  - se il nodo è scalare, `this` è uno scalare
  - se il nodo è vettoriale, `this` e l'intero vettore

- `self`
  - valore locale corrente
  - se il nodo e scalare, coincide con il valore del nodo
  - se il nodo e vettoriale, indica l'elemento corrente del vettore

- `x`
  - valore completo del nodo `x`
  - in scalare e il valore di `x`
  - in vettoriale e il vettore completo di `x`

- `$i`
  - indice dell'agente corrente
  - in scalare vale `0`
  - in vettoriale identifica la componente locale

- `x[$i]`
  - valore locale del nodo `x` per l'agente corrente
  - in scalare coincide con `x`

Questa semantica vale sia:

- quando il modello e eseguito come `sottomodello` dentro un modello padre
- sia quando il modello e eseguito autonomamente

In questo modo la stessa espressione puo restare valida durante la costruzione e il collaudo del modello.

Esempi:

- persistenza semplice:
  - `self`

- accesso al vettore completo del nodo corrente:
  - `this`

- accesso al valore locale di un altro nodo:
  - `x[$i]`

- confronto con la media della popolazione:
  - `if(self > average(this), 1, 0)`

- regressione verso la media:
  - `self + 0.1 * (average(this) - self)`

L'ultimo esempio significa:

- se il valore locale e sopra la media della popolazione, diminuisce
- se e sotto la media, aumenta
- se e uguale alla media, resta invariato

## Widget grafico x-y

Il widget grafico x-y consente di definire una o più coppie `x -> y`, dove `x` e `y` possono essere il tempo oppure nodi di output.

### Casi supportati

Per ogni coppia `x -> y`, il comportamento attuale è il seguente.

Per ogni coppia `x -> y`, il widget supporta due opzioni indipendenti:

- `Serie nel tempo`
  - e la modalita di default
  - ogni componente genera una serie distinta nel tempo

- `Profilo istantaneo`
  - si applica ai casi in cui `y` e vettoriale
  - a ogni istante, i punti del vettore vengono letti come un unico profilo
  - se l'opzione linea e attiva, il widget collega in quell'istante i punti successivi del profilo
  - esempio: se `x=[0,1]` e `y=[0,1]`, il widget puo visualizzare il segmento da `(0,0)` a `(1,1)`
  - le due opzioni non sono alternative: si possono tenere attive entrambe

- `x` scalare, `y` scalare
  - viene generata una singola serie
  - a ogni passo temporale si aggiunge il punto `(x(t), y(t))`

- `x` scalare, `y` vettore
  - viene generata una serie per ogni componente del vettore `y`
  - a ogni passo temporale si aggiungono i punti:
    - `(x(t), y[0](t))`
    - `(x(t), y[1](t))`
    - ...
  - se e attivo anche `Profilo istantaneo`, il widget puo mostrare anche il profilo corrente costruito dai punti `(x(t), y[i](t))`

- `x` vettore, `y` vettore della stessa dimensione
  - in modalita `Serie nel tempo`
    - viene generata una serie per ogni componente
    - a ogni passo temporale si aggiungono i punti:
      - serie 0: `(x[0](t), y[0](t))`
      - serie 1: `(x[1](t), y[1](t))`
      - ...
  - in modalita `Profilo istantaneo`
    - viene generata una sola serie istantanea
    - a ogni refresh il widget collega i punti:
      - `(x[0](t), y[0](t))`
      - `(x[1](t), y[1](t))`
      - ...

In tutti questi casi la legenda resta semplificata e usa la forma:

- `x -> y`

### Casi non supportati

Attualmente il widget non tratta i seguenti casi:

- `x` vettore, `y` scalare
- matrici come sorgente `x`
- matrici come sorgente `y`
- `x` e `y` vettori di dimensioni diverse

Se una coppia rientra in uno di questi casi, il widget non aggiunge punti per quella coppia.

### Modalita di visualizzazione dei punti

Per ogni coppia si puo scegliere anche come visualizzare i punti:

- `No punti`
  - vengono disegnate solo le linee, se attive

- `Ultimo punto`
  - viene disegnato solo l'ultimo punto di ogni serie
  - nel caso vettoriale questo significa:
    - un ultimo punto per ogni componente / serie
  - questa opzione e particolarmente utile per animazioni
  - in modalita `Profilo istantaneo`, per non perdere il profilo corrente, il widget disegna comunque tutti i punti del profilo istantaneo

- `Punti`
  - vengono disegnati tutti i punti della serie

### Nota pratica

Quando `x` oppure `y` sono vettoriali, una singola coppia `x -> y` puo quindi generare piu serie interne, anche se nel pannello del widget compare come una sola coppia configurata.

## Widget matrice

Il widget matrice visualizza direttamente il contenuto di un nodo output che produce una matrice.

Caratteristiche:

- selezione di un solo nodo sorgente
- intestazioni con indice di riga e colonna
- opzione per mostrare o nascondere i valori numerici nelle celle
- opzione per mostrare o nascondere gli indici di righe e colonne
- opzione per scegliere la dimensione delle celle oppure adattarle automaticamente alla finestra del widget
- palette colore selezionabili in funzione dei valori numerici nelle celle
- due modalita di visualizzazione: `Griglia` e `Superficie`
- nella vista superficie: tessitura continua o wireframe, palette, scala verticale, azimut ed elevazione
- aggiornamento automatico durante l'esecuzione

La vista `Superficie` usa una proiezione prospettica leggera su Canvas ed e disponibile per matrici numeriche con almeno due righe e due colonne. Per mantenere reattiva l'interfaccia, matrici molto grandi vengono sottocampionate solo nella rappresentazione grafica; il dato del modello non viene modificato.

Se il nodo selezionato:

- non esiste
- ha un errore di valutazione
- oppure non produce una matrice rettangolare

il widget mostra un messaggio esplicito invece della griglia.
