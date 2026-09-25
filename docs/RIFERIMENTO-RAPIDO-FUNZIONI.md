# DSGraph - Riferimento rapido alle funzioni

Generato automaticamente da `i18n-inline.js` e `graph-functions.js` (release 2026.09.19).

Rigenerare con `npm run docs:functions`.

## Attribution

DSGraph is a modified version of STGraphX, originally created by Luca Mari.

Original work:
Copyright (c) 2026 Luca Mari

Modifications and additional features:
Copyright (c) 2026 Francesco Bertolotti

DSGraph is distributed under the Mozilla Public License, version 2.0.

Luca Mari and the original STGraphX project are not necessarily responsible, maintainers, or endorsers of DSGraph.

Elenco delle funzioni, delle variabili di sistema e delle utility disponibili nelle espressioni.

## Variabili disponibili

### `$0`

`$0, $1, ...`

In array(...), valore corrente del primo asse ($0), del secondo ($1), e cosi via.

---

### `$i0`

`$i0, $i1, ...`

In array(...), indice da zero del primo asse ($i0), del secondo ($i1), e cosi via.

---

### `dt`

`dt`

Passo temporale dell'esecuzione.

---

### `t0`

`t0`

Istante iniziale dell'esecuzione.

---

### `t1`

`t1`

Istante finale dell'esecuzione.

---

### `this`

`this`

Valore corrente del nodo di stato.

---

### `time`

`time`

Istante corrente dell'esecuzione.

## Funzioni generali

### `getModelProperty`

`getModelProperty(name, fallback)`

Una proprietà custom del modello.

**Esempi**
- `getModelProperty("title", "untitled")`

---

### `getProperty`

`getProperty(name, fallback)`

Una proprietà custom del nodo.

**Esempi**
- `getProperty("unit", "")`

---

### `if`

`if(condition, value[, condition, value, ...], defaultValue)`

Valore associato alla prima condizione vera, valutata in ordine, oppure defaultValue. La valutazione e' pigra e opera elemento per elemento con condizioni vettoriali o matriciali.

**Esempi**
- `if(x > 0, x, 0)`
- `if(x < 0, -1, x == 0, 0, 1)`

---

### `integral`

`integral(x)`

Un'approssimazione discreta dell'integrale di x nel tempo. Con integratore Euler equivale a this + x * dt; con RK4 usa automaticamente il metodo di Runge-Kutta del quarto ordine sulle chiamate integral(...) presenti nelle transizioni di stato.

**Esempi**
- `integral(flow)`

---

### `map`

`map(expr, array)`

Trasformazione elemento per elemento di un vettore o di una matrice. Dentro expr, $value è il valore corrente e $0, $1, ... sono gli indici locali.

**Esempi**
- `map($value*2, [1,2,3])`
- `map($0+$value, [10,20,30])`
- `map($0+$1, [[1,2],[3,4]])`

---

### `range`

`range(stop) | range(start, stop[, step])`

Una successione numerica con estremo finale escluso.

**Esempi**
- `range(4) -> [0,1,2,3]`

---

### `readData`

`readData(path)`

Matrice di valori numerici e/o testuali letta da un file CSV. Disponibile solo nei parametri. Per collegare un file senza includerlo nel JSON usa File > Gestisci collegamenti dati: percorso e identificatore sono salvati nel modello e cercati automaticamente alla riapertura. Digita quindi `readData("` e scegli il CSV suggerito. Le righe del CSV devono avere tutte lo stesso numero di colonne.

**Esempi**
- `readData("data/values.csv")`

---

### `reduce`

`reduce(op|fn, vector[, init]) | reduce(op|fn, matrix, axis[, init])`

Riduzione progressiva di un vettore o di una matrice mediante un operatore o una funzione. Per le matrici axis=0 riduce per colonne, axis=1 per righe.

**Esempi**
- `reduce(+, [1,2,3])`
- `reduce(max, [3,7,2])`
- `reduce(+, [[1,2],[3,4]], 0)`

---

### `setModelProperty`

`setModelProperty(name, value)`

Assegnazione di una proprietà custom del modello, con restituzione del valore assegnato.

**Esempi**
- `setModelProperty("title", "Experiment")`

---

### `setProperty`

`setProperty(name, value)`

Assegnazione di una proprietà custom del nodo, con restituzione del valore assegnato.

**Esempi**
- `setProperty("unit", "kg")`

## Funzioni per array e matrici

### `append`

`append(vector, value|vector) | append(value, vector) | append(matrix, rowVector)`

Aggiunge o antepone un elemento a un vettore, concatena due vettori, oppure aggiunge una riga a una matrice.

**Esempi**
- `append([1,2], 3)`
- `append(1, [2,3])`
- `append([1,2], [3,4])`
- `append([[1,2],[3,4]], [5,6])`

---

### `appendRow`

`appendRow(matrix, row)`

Una copia della matrice con una nuova riga aggiunta in fondo. Per matrici agents aggiunge un nuovo agente.

**Esempi**
- `appendRow(agents, [3,1])`

---

### `argmax`

`argmax(vector|matrix)`

L'indice del primo valore massimo. Per un vettore restituisce un indice; per una matrice restituisce [riga, colonna]. In caso di parita sceglie il primo elemento in ordine di righe e colonne.

**Esempi**
- `argmax([2,7,4]) -> 1`
- `argmax([[1,5],[5,2]]) -> [0,1]`

---

### `argmin`

`argmin(vector|matrix)`

L'indice del primo valore minimo. Per un vettore restituisce un indice; per una matrice restituisce [riga, colonna]. In caso di parita sceglie il primo elemento in ordine di righe e colonne.

**Esempi**
- `argmin([2,-1,4]) -> 1`
- `argmin([[3,2],[1,1]]) -> [1,0]`

---

### `array`

`array(axis0[, axis1, ...], expr)`

Array ottenuto valutando expr per ogni combinazione degli axis. Un axis puo essere un intero n (valori 0,...,n-1) oppure un vettore di valori. $0, $1, ... sono i valori degli axis; $i0, $i1, ... i rispettivi indici.

**Esempi**
- `array(range(-2,3), $0^2)`

---

### `col`

`col(matrix, j)`

La colonna j-esima della matrice come vettore.

**Esempi**
- `col(agents, ENERGY)`

---

### `coords`

`coords(matrix[, value])`

Le coordinate [riga, colonna] delle celle non nulle della matrice, oppure solo di quelle uguali a valore se specificato.

**Esempi**
- `coords([[0,1,0],[2,0,3]]) -> [[0,1],[1,0],[1,2]]`
- `coords([[0,1,0],[2,0,3]], 2) -> [[1,0]]`

---

### `filter`

`filter(cond, array[, mode])`

Selezione da un vettore o una matrice. Con modo omesso o 'elements' mantiene gli elementi per cui la condizione è vera. Con modo='rows' filtra le righe di una matrice, dove $value è la riga corrente e $0 il suo indice. Con modo='cols' filtra le colonne, dove $value è la colonna corrente e $0 il suo indice.

**Esempi**
- `filter($value>0, [-2,0,3])`
- `filter($0===$1, [[1,2],[3,4]])`
- `filter(griglia[$value]==1, coordinate, 'rows')`

---

### `flatten`

`flatten(matrix)`

Matrice trasformata in vettore concatenando le righe.

**Esempi**
- `flatten([[1,2],[3,4]]) -> [1,2,3,4]`

---

### `grid`

`grid(rows, cols[, [nRows, nCols][, collisions[, value]]])`

Una matrice spaziale a partire da coordinate intere non negative. Se si specifica `[nRow, nCols]`, la matrice risultante ha dimensione fissa e genera errore se qualche coordinata esce dai limiti. `collisions` puo valere `error`, `first` oppure `sum`: il primo genera errore sulle coordinate coincidenti, il secondo tiene il valore della prima occorrenza, il terzo somma i valori coincidenti. Se `value` manca, usa `1`; se è scalare usa `value` in tutte le celle occupate; se è un vettore usa `value[i]` nella cella di riga `rows[i]` e colonna `cols[i]`.

**Esempi**
- `grid([1,1], [0,2]) -> [[0,0,0],[1,0,1]]`
- `grid([1,1], [0,2], [4,5])`
- `grid([1,1], [0,0], 'sum') -> [[0],[2]]`
- `grid([1,1], [0,2], [4,5], 'error', [1,2])`

---

### `indicesWhere`

`indicesWhere(array) | indicesWhere(cond, array)`

Gli indici degli elementi truthy oppure di quelli che soddisfano la condizione. Per un vettore restituisce un vettore di indici; per una matrice restituisce un vettore di coppie [riga,colonna].

**Esempi**
- `indicesWhere([0,1,0,1]) -> [1,3]`
- `indicesWhere($value>0, [-2,0,3]) -> [2]`
- `indicesWhere($0===$1, [[1,2],[3,4]]) -> [[0,0],[1,1]]`

---

### `intersection`

`intersection(vectorA, vectorB)`

Gli elementi presenti in entrambi i vettori, senza duplicati e mantenendo l'ordine del primo vettore.

**Esempi**
- `intersection([1,2,2,3], [2,3,4]) -> [2,3]`

---

### `ncols`

`ncols(matrix)`

Il numero di colonne della matrice. Per una popolazione di agenti coincide con il numero di proprietà.

**Esempi**
- `ncols(agents)`

---

### `neighbors`

`neighbors(matrix, row, col[, diagonals[, toroidal]])`

I valori delle celle vicine a quella indicata. Con `diagonals=true` usa il vicinato di Moore, con `diagonals=false` solo sopra, sotto, sinistra e destra. Con `toroidal=true` lo spazio si richiude sui bordi.

**Esempi**
- `neighbors([[1,2,3],[4,5,6],[7,8,9]], 1, 1) -> [1,2,3,4,6,7,8,9]`
- `neighbors([[1,2,3],[4,5,6],[7,8,9]], 1, 1, false) -> [2,4,6,8]`
- `neighbors([[1,2,3],[4,5,6],[7,8,9]], 0, 0, false, true) -> [2,4,3,7]`

---

### `nrows`

`nrows(matrix)`

Il numero di righe della matrice. Per una popolazione di agenti coincide con il numero di agenti.

**Esempi**
- `nrows(agents)`

---

### `removeAt`

`removeAt(vector, index) | removeAt(matrix, index[, axis])`

Una copia senza l'elemento indicato del vettore oppure senza la riga o la colonna indicate della matrice. Per le matrici axis=0 rimuove una riga, axis=1 una colonna.

**Esempi**
- `removeAt([1,2,3], 1) -> [1,3]`
- `removeAt([[1,2],[3,4]], 0) -> [[3,4]]`
- `removeAt([[1,2],[3,4]], 1, 1) -> [[1],[3]]`

---

### `removeRow`

`removeRow(matrix, i)`

Una copia della matrice senza la riga i. Per matrici agents elimina l'agente i.

**Esempi**
- `removeRow(agents, 2)`

---

### `row`

`row(matrix, i)`

La riga i-esima della matrice. Se la matrice rappresenta agenti, restituisce il vettore proprietà dell'agente i.

**Esempi**
- `row(agents, 0)`

---

### `set`

`set(vector)`

Vettore senza duplicati, nell'ordine della prima apparizione.

**Esempi**
- `set([3,1,3,2,1]) -> [3,1,2]`

---

### `setAt`

`setAt(vector, index, value) | setAt(matrix, [row,col], value) | setAt(matrix, row, rowVector)`

Una copia con l'elemento o la riga sostituiti.

**Esempi**
- `setAt([1,2,3], 1, 9) -> [1,9,3]`
- `setAt([[1,2],[3,4]], [1,0], 8) -> [[1,2],[8,4]]`

---

### `setCol`

`setCol(matrix, j, vector)`

Una copia della matrice con la colonna j sostituita dai valori del vettore. Il vettore deve avere una voce per ogni riga.

**Esempi**
- `setCol(agents, ENERGY, newEnergy)`

---

### `setRow`

`setRow(matrix, i, row)`

Una copia della matrice con la riga i sostituita da riga.

**Esempi**
- `setRow(agents, 3, [10,1,4,7])`

---

### `shuffle`

`shuffle(vector|matrix)`

Una copia del vettore con gli elementi mescolati casualmente oppure una copia della matrice con le righe mescolate casualmente.

**Esempi**
- `shuffle([1,2,3,4])`
- `shuffle([[1,2],[3,4],[5,6]])`

---

### `size`

`size(array[, axis])`

La dimensione di un vettore o di una matrice. Per un vettore restituisce la lunghezza; per una matrice restituisce [righe, colonne]. Con axis=0 o axis=1 restituisce una singola dimensione.

**Esempi**
- `size([1,2,3]) -> 3`
- `size([[1,2],[3,4]]) -> [2,2]`
- `size([[1,2],[3,4]], 1) -> 2`

---

### `sort`

`sort(vector)`

Una copia del vettore ordinata in senso crescente.

**Esempi**
- `sort([3,1,2]) -> [1,2,3]`

---

### `sum`

`sum(array[, axis])`

Somma degli elementi di un vettore o di una matrice. Per una matrice, senza axis restituisce la somma complessiva; con axis=0 restituisce le somme per colonna, con axis=1 le somme per riga.

**Esempi**
- `sum([1,2,3]) -> 6`
- `sum([[1,2],[3,4]]) -> 10`
- `sum([[1,2],[3,4]], 0) -> [4,6]`

---

### `union`

`union(vectorA, vectorB)`

Unione di due vettori, senza duplicati e nell'ordine della prima apparizione.

**Esempi**
- `union([1,2], [2,3]) -> [1,2,3]`

## Funzioni statistiche e probabilistiche

### `average`

`average(array[, axis])`

Media aritmetica di un vettore o di una matrice. Per una matrice, senza `axis` restituisce la media complessiva; con `axis=0` per colonna, con `axis=1` per riga.

**Esempi**
- `average([1,2,3]) -> 2`
- `average([[1,2],[3,4]]) -> 2.5`
- `average([[1,2],[3,4]], 0) -> [2,3]`

---

### `bernoulli`

`bernoulli([p], x, mode)`

Distribuzione di Bernoulli (parametro predefinito: `p=0.5`). Se `x` manca, estrae un campione. Con `mode=0` calcola la pmf, con `mode=1` la cdf, con `mode=2` il quantile discreto.

**Esempi**
- `bernoulli()`
- `bernoulli([0.3], 1, 0)`

---

### `binomial`

`binomial([n, p], x, mode)`

Distribuzione binomiale (parametri predefiniti: `n=1`, `p=0.5`). Se `x` manca, estrae un campione. Con `mode=0` calcola la pmf, con `mode=1` la cdf, con `mode=2` il quantile discreto.

**Esempi**
- `binomial()`
- `binomial([10,0.2], 3, 0)`

---

### `choice`

`choice(vector|matrix)`

Elemento estratto casualmente da un vettore non vuoto oppure riga estratta casualmente da una matrice non vuota.

**Esempi**
- `choice([10,20,30])`
- `choice([[1,2],[3,4]])`

---

### `count`

`count(array[, axis]) | count(cond, array[, axis])`

Numero degli elementi truthy oppure di quelli che soddisfano la condizione `cond`, usando `$value` e gli indici locali `$0`, `$1`, ... (vedi per analogia `filter()`).

**Esempi**
- `count([1,0,1]) -> 2`
- `count($value>0, [-2,0,3]) -> 1`
- `count($value==1, [[1,0],[1,1]], 1) -> [1,2]`

---

### `exponential`

`exponential([params], x, mode)`

Distribuzione di probabilità esponenziale (parametro di default: `rate=1`). Se `x` manca, estrae un campione. Con `mode=0` calcola la pdf, con `mode=1` la cdf, con `mode=2` la icdf.

**Esempi**
- `exponential()`
- `exponential([2])`
- `exponential([2], 1.5, 0)`
- `exponential([2], 0.9, 2)`

---

### `gaussian`

`gaussian([mu, sigma], x, mode)`

Distribuzione di probabilità gaussiana (parametri di default: `mu=0`, `sigma=1`). Se `x` manca, estrae un campione. Con `mode=0` calcola la pdf, con `mode=1` la cdf, con `mode=2` la icdf.

**Esempi**
- `gaussian()`
- `gaussian([0,1])`
- `gaussian([0,1], 0, 0)`
- `gaussian([0,1], 0.95, 2)`

---

### `poisson`

`poisson([rate], x, mode)`

Distribuzione di Poisson (parametro predefinito: `rate=1`). Se `x` manca, estrae un campione. Con `mode=0` calcola la pmf, con `mode=1` la cdf, con `mode=2` il quantile discreto.

**Esempi**
- `poisson()`
- `poisson([4], 2, 0)`

---

### `rand`

`rand([max]) | rand(min, max)`

Numero casuale da una distribuzione di probabilità uniforme. Senza argomenti restituisce un valore tra `0` e `1`; con un argomento tra `0` e `max`; con due argomenti tra `min` e `max`.

**Esempi**
- `rand()`
- `rand(10)`
- `rand(-1, 1)`

---

### `randInt`

`randInt(max) | randInt(min, max)`

Numero intero casuale da una distribuzione di probabilità uniforme. Con un argomento restituisce un intero tra `0` e `max`; con due argomenti tra `min` e `max`.

**Esempi**
- `randInt(5)`
- `randInt(2, 7)`

---

### `stdev`

`stdev(array[, axis])`

Deviazione standard di un vettore o di una matrice. Per una matrice, senza `axis` restituisce la deviazione standard complessiva; con `axis=0` per colonna, con `axis=1` per riga.

**Esempi**
- `stdev([1,2,3])`
- `stdev([[1,2],[3,4]], 0)`

---

### `uniform`

`uniform([min, max], x, mode)`

Distribuzione di probabilità uniforme (parametri di default: `min=0`, `max=1`). Se `x` manca, estrae un campione. Con `mode=0` calcola la pdf, con `mode=1` la cdf, con `mode=2` la icdf.

**Esempi**
- `uniform()`
- `uniform([0,10], 3, 1)`
- `uniform([0,10], 0.25, 2)`

## Funzioni matematiche

### `abs`

`abs(x)`

Valore assoluto di `x`.

**Esempi**
- `abs(-3) -> 3`

---

### `acos`

`acos(x)`

Arcocoseno di `x`.

**Esempi**
- `acos(1) -> 0`

---

### `and`

`a and b`

Congiunzione logica (equivalente a `&&`).

**Esempi**
- `a and b`

---

### `asin`

`asin(x)`

Arcoseno di `x`.

**Esempi**
- `asin(0) -> 0`

---

### `atan`

`atan(x)`

Arcotangente di `x`.

**Esempi**
- `atan(0) -> 0`

---

### `atan2`

`atan2(y, x)`

Arcotangente con due argomenti `(y, x)`.

**Esempi**
- `atan2(0, 1) -> 0`

---

### `ceil`

`ceil(x)`

Arrotondamento per eccesso di `x`.

**Esempi**
- `ceil(1.2) -> 2`

---

### `cos`

`cos(x)`

Coseno di `x`.

**Esempi**
- `cos(0) -> 1`

---

### `cosh`

`cosh(x)`

Coseno iperbolico di `x`.

**Esempi**
- `cosh(0) -> 1`

---

### `exp`

`exp(x)`

Esponenziale naturale `e^x`.

**Esempi**
- `exp(0) -> 1`

---

### `floor`

`floor(x)`

Arrotondamento per difetto di `x`.

**Esempi**
- `floor(1.8) -> 1`

---

### `int`

`int(x)`

Parte intera di `x`.

**Esempi**
- `int(-1.8) -> -1`

---

### `log`

`log(x)`

Logaritmo naturale di `x`.

**Esempi**
- `log(1) -> 0`

---

### `log10`

`log10(x)`

Logaritmo in base `10` di `x`.

**Esempi**
- `log10(100) -> 2`

---

### `log2`

`log2(x)`

Logaritmo in base `2` di `x`.

**Esempi**
- `log2(8) -> 3`

---

### `logBase`

`logBase(b, x)`

Logaritmo di `x` in base `b`.

**Esempi**
- `logBase(2, 8) -> 3`

---

### `max`

`max(x1, x2, ...)`

Massimo tra `x1`, `x2`, ... .

**Esempi**
- `max(2, 7, 4) -> 7`

---

### `min`

`min(x1, x2, ...)`

Minimo tra `x1`, `x2`, ... .

**Esempi**
- `min(2, 7, 4) -> 2`

---

### `not`

`not x`

Negazione logica (equivalente a `!`).

**Esempi**
- `not x. Esempio: `not active``

---

### `or`

`a or b`

Disgiunzione logica (equivalente a `||`).

**Esempi**
- `a or b`

---

### `piecewise`

`piecewise(cx, cy, x)`

Segnale definito dai punti di controllo `cx` e `cy` con interpolazione lineare: `cx` e `cy` sono vettori numerici della stessa lunghezza, con almeno due elementi; `cx` deve essere strettamente crescente. `x` puo essere scalare, vettore o matrice. Fuori dall'intervallo di `cx` restituisce il valore dell'estremo piu vicino.

**Esempi**
- `piecewise([0,2,5], [0,10,4], time)`

---

### `pos`

`pos(x)`

Parte positiva di `x`: `x` se positivo, altrimenti `0`.

**Esempi**
- `pos(-2) -> 0`

---

### `pow`

`pow(base, exp)`

Potenza: `base` elevata a `exp`.

**Esempi**
- `pow(2, 3) -> 8`

---

### `round`

`round(x)`

Arrotondamento all'intero più vicino di `x`.

**Esempi**
- `round(1.6) -> 2`

---

### `sign`

`sign(x)`

Segno di `x`: `-1`, `0` o `1`.

**Esempi**
- `sign(-4) -> -1`

---

### `sin`

`sin(x)`

Seno di `x`.

**Esempi**
- `sin(0) -> 0`

---

### `sinh`

`sinh(x)`

Seno iperbolico di `x`.

**Esempi**
- `sinh(0) -> 0`

---

### `spline`

`spline(cx, cy, x)`

Segnale definito dai punti di controllo `cx` e `cy` con spline cubica naturale: `cx` e `cy` sono vettori numerici della stessa lunghezza, con almeno due elementi; `cx` deve essere strettamente crescente. `x` puo essere scalare, vettore o matrice. Fuori dall'intervallo di `cx` restituisce il valore dell'estremo piu vicino.

**Esempi**
- `spline([0,2,5], [0,10,4], time)`

---

### `sqrt`

`sqrt(x)`

Radice quadrata di `x`.

**Esempi**
- `sqrt(9) -> 3`

---

### `tan`

`tan(x)`

Tangente di `x`.

**Esempi**
- `tan(0) -> 0`

---

### `tanh`

`tanh(x)`

Tangente iperbolica di `x`.

**Esempi**
- `tanh(0) -> 0`

---

### `trunc`

`trunc(x)`

Parte intera di `x`.

**Esempi**
- `trunc(-1.8) -> -1`

## Funzioni e variabili per agenti

### `$i`

`$i`

Indice di riga dell'agente o cella corrente. In esecuzione scalare vale 0; in esecuzione vettoriale identifica la componente locale; con matrici agent-based indica la riga corrente.

---

### `$j`

`$j`

Indice di colonna dell'agente o cella corrente nei contesti matriciali agent-based. Nelle strutture non matriciali non è disponibile.

---

### `agentIndicesWhere`

`agentIndicesWhere(cond, agents)`

Gli indici degli agenti per cui la condizione e vera. Nella condizione self e la riga dell'agente corrente e $i il suo indice.

**Esempi**
- `agentIndicesWhere(self[STATE] == 1, agents)`

---

### `agents`

`agents(fieldNames[, rowsOrCount])`

Crea una matrice di agenti con schema di proprietà. campi e un vettore di nomi di campo; il secondo argomento puo essere una matrice opzionale di agenti iniziali oppure un numero di agenti da inizializzare a zero.

**Esempi**
- `agents(["ID","STATE","X","Y"])`
- `agents(["ID","STATE"], [[1,0],[2,1]])`
- `agents(["X","Y","VX","VY"], 10)`

---

### `agentSpace`

`agentSpace(agents, xCol, yCol[, idCol][, [rows, cols][, neighborhood[, toroidal[, radius]]]])`

Un indice spaziale per una popolazione di agenti con coordinate intere non negative nelle colonne xCol e yCol. Se specifichi idCol, nelle celle dello spazio vengono memorizzati i valori di quella proprietà invece degli indici di riga. neighborhood puo valere 'moore' o 'vonNeumann'.

**Esempi**
- `agentSpace(agents, X, Y)`

---

### `allNeighborCounts`

`allNeighborCounts(agents, space)`

Un vettore con il numero di vicini di ogni agente.

**Esempi**
- `allNeighborCounts(agents, space)`

---

### `filterAgents`

`filterAgents(cond, agents)`

La sotto-popolazione degli agenti che soddisfano la condizione. Nella condizione self e la riga dell'agente corrente e $i il suo indice.

**Esempi**
- `filterAgents(self[ENERGY] > 0, agents)`

---

### `mapAgents`

`mapAgents(expr, agents)`

Trasformazione riga per riga di tutti gli agenti. expr deve restituire per ogni agente una nuova riga con la stessa lunghezza. In expr self e la riga dell'agente corrente e $i il suo indice.

**Esempi**
- `mapAgents(setAt(self, ENERGY, self[ENERGY] + 1), agents)`

---

### `neighborCountOf`

`neighborCountOf(agents, space, i)`

Quanti vicini ha l'agente i nello spazio dato.

**Esempi**
- `neighborCountOf(agents, space, 0)`

---

### `neighborsOf`

`neighborsOf(agents, space, i)`

I riferimenti degli agenti vicini all'agente di riga i, usando lo spazio costruito con agentSpace(...). Se agentSpace usa idCol, i riferimenti restituiti sono quei valori identificativi; altrimenti sono indici di riga. Esclude l'agente stesso.

**Esempi**
- `neighborsOf(agents, space, 0)`

---

### `self`

`self`

Valore locale corrente del nodo. In esecuzione scalare coincide con il valore del nodo; in esecuzione vettoriale indica la componente dell'agente corrente; nei contesti matriciali agent-based coincide con il valore della cella corrente.

---

### `spaceMatrix`

`spaceMatrix(space)`

La matrice dei conteggi di agenti per cella a partire da un valore agentSpace(...). Utile quando vuoi trattare lo spazio come matrice generica.

**Esempi**
- `spaceMatrix(agentSpace(agents, X, Y))`
