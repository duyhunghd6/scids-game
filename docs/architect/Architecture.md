# System Architecture

<!-- unid-meta
unid: arch:scids:core-stack
fulfills:
  - prd:scids:overview
-->
## Core Tech Stack
- **Engine**: Phaser 4 (latest release targeting WebGL/Canvas rendering via named ESM exports).
- **Tooling**: Vite (Module bundling, Hot Module Replacement).
- **Language**: Vanilla ES6+ JavaScript.

<!-- unid-meta
unid: arch:scids:rendering
fulfills:
  - prd:scids:core-features
-->
## Rendering and Scaling
- The game leverages `Phaser.Scale.FIT` accompanied by `Phaser.Scale.CENTER_BOTH`. This ensures the 800x600 reference resolution dynamically scales maintaining its aspect ratio without stretching, fully functioning on mobile or desktop browsers.
- **Procedural UI**: Rather than loading `.png` or `.jpg` atlases, 90% of the game interface relies on `Phaser.GameObjects.Graphics`. Complex gradients, rounded rectangles (`fillRoundedRect`), and circle buttons drastically lessen HTTP requests and keep the bundle ultra-lean. 

<!-- unid-meta
unid: arch:scids:scene-pipeline
fulfills:
  - prd:scids:core-features
-->
## Scene Management Pipeline
The game navigates through five strictly isolated `Phaser.Scene` classes:
1. **`BootScene`**: Establishes initial environment variables and runs branding splash. 
2. **`PreloadScene`**: Manages the `CacheManager` / `TextureManager` loader queues and renders the loading progress bar.
3. **`MenuScene`**: Iterates over UNID topic nodes to present user-selectable modules. Employs Container-based transforms for card animations.
4. **`QuizScene`**: The gameplay engine. Recursively builds and clears the UI state based on the current active question index. Implements the feedback logic (correct/incorrect) and hint overlays.
5. **`ResultScene`**: Tallies the total score against a grade threshold (1-3 stars) and presents options to restart or select a new topic.

<!-- unid-meta
unid: arch:scids:data-sublayer
fulfills:
  - prd:scids:unid-arch
  - prd:scids:content-sources
-->
## Data Sublayer (UNID Implementation)
Currently extracted manually to `src/data/questions.js`, the game will eventually transition all `.json` imports (found in `docs/prd/json`) directly into the Vite pipeline. Each data node operates against a strict schema comprising:
- `id` (The UNID unique identifier: e.g. "et1")
- `question`
- `options[]`
- `correct` (index)
- `hint`
