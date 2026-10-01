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
2. **Functional relationships.** The row `a` and column `b` ask how `a`
   influences `b`. Select `+` to create a direct functional relationship, `−`
   for an inverse one, or `1` when a relationship exists but is non-monotonic
   or its sign is not yet specified. Select `0`, or leave the selector empty,
   to create no edge. `+` and `−` relationships are created as monotonic and
   show their sign above the edge until a custom label is entered. The diagonal
   cannot be edited because the wizard does not introduce self-links.
3. **State variables.** Select variables whose value also depends on the
   system's previous state. They become state nodes; the remaining variables
   become algebraic nodes. All expressions and values are initially blank.
4. **Roles.** For each algebraic variable without incoming relationships, you
   may select either `Input` or `Parameter`. An input is ready to be driven by
   an input widget; a parameter is created as a parameter node. State variables
   and variables with incoming links cannot be selected because neither role
   may receive relationships.

When the wizard finishes, DSGraph uses an internal scatter layout: each
relationship moderately attracts its endpoints, while every nearby pair of
nodes repels each other. A minimum distance prevents overlap and increases by
20% for every node after the first two; no external layout library is used.
The resulting layout is only a starting point and can be adjusted manually on
the canvas.
