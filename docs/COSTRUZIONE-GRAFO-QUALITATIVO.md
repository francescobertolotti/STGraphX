<!--
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Copyright (c) 2026 Francesco Bertolotti.
-->

# Costruzione qualitativa del grafo

La procedura **Inserisci > Grafo > Qualitative Graph Building...** aiuta a
creare la prima struttura di un modello senza richiedere subito formule
quantitative. Non sostituisce la validazione con gli esperti del sistema: rende
esplicite le ipotesi iniziali, che possono poi essere controllate, corrette e
quantificate.

1. **Variabili.** Inserisci fino a dieci proprietà rilevanti del sistema. Ogni
   nome deve essere un identificatore DSGraph valido e diverso dagli altri nomi
   già presenti nel modello.
2. **Relazioni funzionali.** La riga `a` e la colonna `b` rappresentano la
   domanda: “come `a` influenza `b`?”. Seleziona `+` per creare una relazione
   funzionale diretta, `−` per una inversa, oppure `1` quando la relazione
   esiste ma è non monotona o il suo segno non è ancora specificato. Seleziona
   `0`, oppure lascia il selettore vuoto, per non creare alcuna freccia. Le
   relazioni `+` e `−` sono create già monotone e mostrano il loro segno sopra
   la freccia finché non viene inserita un'etichetta personalizzata. La diagonale
   non è modificabile perché il passaggio non introduce auto-collegamenti.
3. **Variabili di stato.** Seleziona le variabili che dipendono anche dal loro
   valore precedente. Esse diventano nodi di stato; le altre diventano nodi
   algebrici. Tutti i valori e le espressioni restano inizialmente vuoti.
4. **Ruoli.** Per ogni variabile algebrica senza relazioni entranti puoi
   selezionare, in alternativa, `Input` oppure `Parametro`. Un input è pronto
   per essere pilotato da un widget; un parametro viene creato come nodo
   parametro. Le variabili di stato e quelle con frecce entranti non sono
   selezionabili, poiché nessuno dei due ruoli può ricevere relazioni.

Al termine, DSGraph applica un layout a dispersione interno: ogni relazione
attrae moderatamente i suoi estremi, mentre ogni coppia di nodi si respinge a
breve distanza. Una distanza minima evita sovrapposizioni e cresce del 20% per
ogni nodo oltre i primi due; non sono usate librerie esterne. Il layout è solo
un punto di partenza e può essere modificato manualmente nel canvas.
