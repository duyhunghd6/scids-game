# Sprint 3 Architecture Decisions

## Overview
This document outlines the architectural decisions, file ownership map, and integration points for the designated Sprint 3 implementation tasks. All tasks aim to solidify the "Curriculum Disguised as an Adventure" philosophy defined in the system architecture.

## File Ownership Map & Integration Points

### 1. scids-game-1yg.4 (Dedicated Quiz Overlay UI)
- **Assigned to:** Dev-Quiz-Overlay UI
- **Files Touched:** `src/scenes/QuizScene.js`
- **Integration Points:**
  - The UI must leverage `Phaser.Graphics` (`this.add.graphics()`) to draw a dimmed background over the platformer level, rather than loading external static assets.
  - State integration: Physics must be paused (`this.physics.pause()`) immediately upon the overlay opening, and resumed (`this.physics.resume()`) directly after a correct answer dismisses the UI.
- **Design Constraints:** UI components must dynamically position based on `this.scale.width` and `this.scale.height` using `Phaser.Scale.FIT`.

### 2. scids-game-1yg.3 (Mandatory Question Blocks & Assessment Zones)
- **Assigned to:** Dev-Question-Blocks
- **Files Touched:** `src/scenes/QuizScene.js`
- **Integration Points:**
  - **Assessment Zones:** Create invisible hitboxes using a static physics group (`this.assessmentWalls`) placed alongside the Question Blocks.
  - **Progression Logic:** The `assessmentWalls` act as physical barriers. When a Question Block is successfully answered, the corresponding `wall.destroy()` is called to allow the player to advance. Incorrect answers must re-enable the block (`block.setData('active', true)`) to enforce the challenge as a mandatory gate.
- **Design Constraints:** Progression cannot be bypassed; players must not be able to jump over the invisible wall.

### 3. scids-game-1oz.2 (Generate Complex Science Diagrams)
- **Assigned to:** Dev-Science-Diagrams
- **Files Touched:** `public/assets/science/*` (e.g., `volcano-cross-section.png`, `human-skeleton.png`), `src/scenes/PreloadScene.js`, `src/data/questions.js`.
- **Integration Points:**
  - Images must be generated, placed in `public/assets/science/`, and loaded in `PreloadScene.js` via `this.load.image()`.
  - The newly loaded asset keys must be referenced dynamically inside specific domain questions in `src/data/questions.js` (e.g., setting an `image` property on the UNID question node).
- **Design Constraints:** Ensure generated PNGs have transparent backgrounds where necessary and do not exceed reasonable file sizes to maintain fast web load times.

### 4. scids-game-1oz.3 (Implement Procedural Fallback Graphics)
- **Assigned to:** Dev-Procedural-Fallback
- **Files Touched:** `src/scenes/QuizScene.js`, `src/scenes/BossScene.js`
- **Integration Points:**
  - Instead of static images for UI frames and particle systems, heavily utilize `Phaser.Graphics` for `fillRoundedRect` panels and gradients.
  - For particle emitters (e.g., confetti or flow state), configure `this.add.particles` using basic generated textures or procedural color tints (`[0xfff3a1, 0x9fe7ff]`).
- **Design Constraints:** Keep the Vite bundle minimal. Procedural graphics must be drawn efficiently to not impact frame rates.

### 5. scids-game-hp0.1 (Data Ingestion & UNID Tracking)
- **Assigned to:** Dev-Data-Ingestion
- **Files Touched:** `src/data/questions.js`, `src/main.js`
- **Integration Points:**
  - Data ingestion must adhere strictly to the UNID system. Every question object must include an `id` field referencing its UNID (e.g., `"et1"`, `"lf2"`).
  - The parser must safely handle structural data (`question`, `options`, `correct`, `hint`, `explanation`).
- **Design Constraints:** Data fetching and parsing must occur synchronously before the scene renders or be correctly awaited, ensuring deterministic references between game logic and educational content.