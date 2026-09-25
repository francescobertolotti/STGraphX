<!--
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
Copyright (c) 2026 Francesco Bertolotti.
-->

# Qualitative Graph Building

The **Insert > Graph > Qualitative Graph Building...** wizard helps create the
first structure of a model before quantitative equations are known. It does not
replace validation with system experts: it makes the initial assumptions
explicit, so they can be reviewed, corrected, and later quantified.

1. **Variables.** Enter up to ten important system properties. Each name must
   be a valid DSGraph identifier and must not duplicate another name already in
   the model.
2. **Relationships.** The row `a` and column `b` ask whether `a` directly
   influences `b`. Select `1` to create `a → b`; select `0`, or leave the
   selector empty, to create no edge. The diagonal cannot be edited because the wizard
   does not introduce self-links.
3. **State variables.** Select variables whose value also depends on the
   system's previous state. They become state nodes; the remaining variables
   become algebraic nodes. All expressions and values are initially blank.

When the wizard finishes, DSGraph uses an internal scatter layout: each
relationship moderately attracts its endpoints, while every nearby pair of
nodes repels each other. A minimum distance prevents overlap and increases by
20% for every node after the first two; no external layout library is used.
The resulting layout is only a starting point and can be adjusted manually on
the canvas.
