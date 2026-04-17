# Product Backlog

## Epic: Mario-Style Platformer Adaptation
<!-- unid-meta
unid: epic:scids:mario-adaptation
fulfills:
  - prd:scids:core-features
-->
**Description:** Modify the current grid-based menu and flat UI of the SciDS game into a fully-fledged 2D platformer using Arcade Physics. Physics worlds represent thematic topics, and students trigger their science assessments by interacting with mandatory "Question Blocks."

---

### Story: Physics Engine & Tilemap Foundation
<!-- unid-meta
unid: story:scids:mario-physics
fulfills:
  - epic:scids:mario-adaptation
  - arch:game-design:12-domains
-->
**As a** student  
**I want** to control a character in a physics-based 2D world using standard Mario locomotion  
**So that** traversing through topics is fun and interactive.  
**Acceptance Criteria:**
- Phaser config updated to use `arcade` physics globally.
- `Phaser.Tilemaps` initialized drawing the platformer environment.
- Player character sprite implemented with horizontal movement velocity and jumping gravity.

### Story: Scene Pipeline Refactoring
<!-- unid-meta
unid: story:scids:scene-refactor
fulfills:
  - epic:scids:mario-adaptation
  - arch:game-design:exploration-pipeline
-->
**As a** developer  
**I want** to replace the generic `MenuScene` and `QuizScene` with platformer-specific logic  
**So that** the game's core loop clearly supports levels rather than grids.  

### Story: Mandatory Question Blocks & Assessment Zones
<!-- unid-meta
unid: story:scids:question-blocks
fulfills:
  - epic:scids:mario-adaptation
  - arch:game-design:triggers
-->
**As a** student  
**I want** to step into invisible zones or jump into Question Blocks (`?`)  
**So that** my collisions trigger mandatory challenges preventing further progression until solved.  

### Story: Dedicated Quiz Overlay UI (Procedural Fallback)
<!-- unid-meta
unid: story:scids:quiz-overlay
fulfills:
  - epic:scids:mario-adaptation
  - arch:game-design:action-challenges
-->
**As a** student  
**I want** my curriculum questions to pop up cleanly over my game character  
**So that** I can focus purely on answering the question.  
**Acceptance Criteria:**
- The overlay dims the background (`LevelScene`) and leverages `Phaser.Graphics` to draw panels.
- Dismissing the overlay upon a correct answer unpauses physics (`this.physics.resume()`).

---

## Epic: Advanced Gamification (The "Fun" Factor)
<!-- unid-meta
unid: epic:scids:advanced-gamification
fulfills:
  - arch:game-design:gamification-proposals
-->
**Description:** Inject high-retention mechanics to obfuscate the educational pressure, encouraging replayability and mastery via arcade loops.

### Story: Subject-Specific Power-Ups
<!-- unid-meta
unid: story:scids:power-ups
fulfills:
  - arch:game-design:power-ups
-->
**Description:** Implement the Magma Suit and Photon Dash, unlocked via accurate answer streaks.

### Story: Knowledge "Boss Fights"
<!-- unid-meta
unid: story:scids:boss-fights
fulfills:
  - arch:game-design:boss-fights
-->
**Description:** Replace static level-end screens with fast-twitch Boss arenas requiring drag-and-drop domain knowledge to defeat the boss.

### Story: Secret Assessment Zones (Warp Pipes)
<!-- unid-meta
unid: story:scids:warp-pipes
fulfills:
  - arch:game-design:secret-zones
-->
**Description:** Add interactable retro warp pipes leading to hardcore challenge puzzles for exclusive "Galileo Badges". 

### Story: The "Curiosity" Combo Meter
<!-- unid-meta
unid: story:scids:combo-meter
fulfills:
  - arch:game-design:combo-meter
-->
**Description:** If a student answers 3 times perfectly, enter a "Flow State" with glowing particle effects.

### Story: The Science Lab Hub World
<!-- unid-meta
unid: story:scids:hub-world
fulfills:
  - arch:game-design:hub-world
-->
**Description:** Allow players to sink coins into Hub World decorations using available image assets (or procedurally drawn shapes).

---

## Epic: Create Missing Assets
<!-- unid-meta
unid: epic:scids:create-missing-assets
fulfills:
  - arch:game-design:asset-inventory
-->
**Description:** Secure and generate the required visual assets for the educational game outlined in the gap analysis.

### Story: Download Existing Arcade Assets
<!-- unid-meta
unid: story:scids:download-existing-assets
fulfills:
  - epic:scids:create-missing-assets
  - arch:game-design:current-assets
-->
**Description:** Gather, download, and correctly structure the existing core Mario sprites (`mario_bros.png`, `tile_set.png`, etc.) directly into the `public/assets/mario/` folder.

### Story: Generate Complex Science Diagrams
<!-- unid-meta
unid: story:scids:generate-science-diagrams
fulfills:
  - epic:scids:create-missing-assets
  - arch:game-design:missing-assets
-->
**Description:** Use generative tools to create high-quality `.png` mockups for the critical missing science assets: Volcano Cross-Sections, Human Skeleton, and Circuit components.

### Story: Implement Procedural Fallback Graphics
<!-- unid-meta
unid: story:scids:procedural-fallback
fulfills:
  - epic:scids:create-missing-assets
  - arch:game-design:flexible-strategy
-->
**Description:** Code the `Phaser.Graphics` arrays for hitboxes, light photon vectors, UI popup backgrounds, and confetti particle emitters where external image assets are unnecessary.

---

## Epic: Curriculum Implementation
<!-- unid-meta
unid: epic:scids:curriculum-implementation
fulfills:
  - arch:game-design:12-domains
-->
**Description:** Implement the physical levels, content queries, and assessments for all 12 domains in the Grade 3 Science curriculum.

### Story: Earth & Space Sciences Level Design
<!-- unid-meta
unid: story:scids:earth-space-levels
fulfills:
  - epic:scids:curriculum-implementation
  - prd:scids:domain-earth-space
  - prd:scids:earth-structure
  - prd:scids:natural-phenomena
  - prd:scids:solar-system
  - arch:game-design:domain-earth-space
-->
**Description:** Build the environments and insert the parsed questioning data for the Earth and Space structure, natural phenomena, and solar system levels.

### Story: Life Sciences Level Design
<!-- unid-meta
unid: story:scids:life-sciences-levels
fulfills:
  - epic:scids:curriculum-implementation
  - prd:scids:domain-life-sciences
  - prd:scids:skeleton-muscles
  - prd:scids:animal-adaptations
  - prd:scids:ecosystems
  - arch:game-design:domain-life-sciences
-->
**Description:** Build out the structural physics platform levels and quiz mechanics for the life science domains including human biology and ecosystems.

### Story: Physical Sciences Level Design
<!-- unid-meta
unid: story:scids:physical-sciences-levels
fulfills:
  - epic:scids:curriculum-implementation
  - prd:scids:domain-physical-sciences
  - prd:scids:states-of-matter
  - prd:scids:light-vision
  - prd:scids:electrical-circuits
  - arch:game-design:domain-physical-sciences
-->
**Description:** Construct interactive levels reflecting state changes, light behavior, and circuits for physical sciences.

---

## Epic: Core Educational Architecture
<!-- unid-meta
unid: epic:scids:educational-architecture
fulfills:
  - prd:scids:overview
  - prd:scids:goals
  - arch:scids:core-stack
  - arch:game-design:vision
  - arch:game-design:pedagogy
-->
**Description:** Establish the foundational systems for data ingestion, assessment loop tracking, UNID adherence, and rendering config.

### Story: Data Ingestion & UNID Tracking
<!-- unid-meta
unid: story:scids:data-ingestion
fulfills:
  - epic:scids:educational-architecture
  - prd:scids:unid-arch
  - prd:scids:content-sources
  - arch:scids:data-sublayer
-->
**Description:** Build out the engine's JSON parser, state store, and deterministic UNID referencing system for the assessment components.

### Story: Renderer and Engine Boot Setup
<!-- unid-meta
unid: story:scids:engine-boot
fulfills:
  - epic:scids:educational-architecture
  - arch:scids:rendering
-->
**Description:** Configure Phaser and Vite with the optimal pixel-canvas scaling options as documented in the architecture.

### Story: Complete Assessment & Scene Feedback Loop
<!-- unid-meta
unid: story:scids:assessment-feedback-loop
fulfills:
  - epic:scids:educational-architecture
  - arch:game-design:assessment-loop
  - arch:game-design:feedback-systems
  - arch:game-design:corrective-feedback
  - arch:game-design:level-completion
  - arch:scids:scene-pipeline
-->
**Description:** Finalize the full sequence covering the presentation of a question, correctness evaluation, game state updates, negative/positive corrective feedback screens, and final level-completion scoring.

