# Technical Debt

Copyright (c) 2026 Francesco Bertolotti.

This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

## 2026-10-12 — Posizione relativa delle etichette degli archi

Le etichette degli archi spostate manualmente possono ancora restare ancorate a
coordinate assolute del canvas quando si muove l'arco, un nodo collegato o un
punto di controllo. Il comportamento desiderato è che lo spostamento sia
memorizzato come offset relativo al punto di ancoraggio dell'arco e quindi che
l'etichetta segua sempre l'arco. Verificare sia le etichette manuali sia quelle
automatiche `+` e `−`, compresi salvataggio, ricaricamento e modelli precedenti.
