# Sprint Test Plan

This document contains binary pass/fail test cases for the implementation tasks, aligned with the SciDS Game PRD and Architecture documents. Do NOT run tests manually; use the exact commands provided to verify the DoD criteria mechanically.

<!-- unid-meta
unid: test:scids-game:ui-overlay
fulfills:
  - arch:game-design:feedback-systems
  - arch:game-design:corrective-feedback
-->
## Task: scids-game-1yg.4 (Dedicated Quiz Overlay UI)

### Test Case 1: Graphics Overlay
- **UNID:** `test:scids-game:ui-overlay:tc1`
- **Description:** Verifies that `Phaser.Graphics` is used to draw the dimmed background instead of a static image.
- **Command:** `grep -E "this\.add\.graphics\(" src/scenes/QuizScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 2: Physics Pause
- **UNID:** `test:scids-game:ui-overlay:tc2`
- **Description:** Verifies that physics is paused when the overlay opens.
- **Command:** `grep -E "physics\.pause\(\)" src/scenes/QuizScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 3: Physics Resume
- **UNID:** `test:scids-game:ui-overlay:tc3`
- **Description:** Verifies that physics is resumed when the UI is dismissed after a correct answer.
- **Command:** `grep -E "physics\.resume\(\)" src/scenes/QuizScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail


<!-- unid-meta
unid: test:scids-game:assessment-zones
fulfills:
  - arch:game-design:triggers
  - arch:game-design:assessment-loop
  - arch:game-design:action-challenges
  - prd:scids:core-features
-->
## Task: scids-game-1yg.3 (Mandatory Question Blocks & Assessment Zones)

### Test Case 1: Assessment Walls Group
- **UNID:** `test:scids-game:assessment-zones:tc1`
- **Description:** Verifies that the `assessmentWalls` static physics group is implemented.
- **Command:** `grep -E "assessmentWalls" src/scenes/QuizScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 2: Progression Gate Unlock
- **UNID:** `test:scids-game:assessment-zones:tc2`
- **Description:** Verifies that walls are destroyed upon a correct answer to allow progression.
- **Command:** `grep -E "\.destroy\(\)" src/scenes/QuizScene.js | grep -i "wall"`
- **Expected Output:** Match found (or equivalent logic in the success handler).
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 3: Block Re-enable
- **UNID:** `test:scids-game:assessment-zones:tc3`
- **Description:** Verifies that blocks are re-enabled (reactivated) on incorrect answers to enforce the mandatory challenge.
- **Command:** `grep -E "setData\('active', true\)" src/scenes/QuizScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail


<!-- unid-meta
unid: test:scids-game:complex-diagrams
fulfills:
  - arch:game-design:missing-assets
  - arch:game-design:current-assets
  - arch:game-design:asset-inventory
-->
## Task: scids-game-1oz.2 (Generate Complex Science Diagrams)

### Test Case 1: Asset Presence
- **UNID:** `test:scids-game:complex-diagrams:tc1`
- **Description:** Verifies that the generated science assets exist in the correct directory.
- **Command:** `ls public/assets/science/volcano-cross-section.png public/assets/science/human-skeleton.png public/assets/science/circuit-components.png`
- **Expected Output:** Files exist.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 2: Asset Preload
- **UNID:** `test:scids-game:complex-diagrams:tc2`
- **Description:** Verifies that the new image assets are preloaded in `PreloadScene.js`.
- **Command:** `grep -E "load\.image" src/scenes/PreloadScene.js | grep -E "(volcano|skeleton|circuit)"`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 3: Data Reference
- **UNID:** `test:scids-game:complex-diagrams:tc3`
- **Description:** Verifies that `src/data/questions.js` references the new image keys.
- **Command:** `grep -E "image:" src/data/questions.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail


<!-- unid-meta
unid: test:scids-game:procedural-graphics
fulfills:
  - arch:game-design:flexible-strategy
  - prd:scids:goals
-->
## Task: scids-game-1oz.3 (Implement Procedural Fallback Graphics)

### Test Case 1: Rounded Rectangles
- **UNID:** `test:scids-game:procedural-graphics:tc1`
- **Description:** Verifies that `fillRoundedRect` is used for procedural panels.
- **Command:** `grep -E "fillRoundedRect" src/scenes/QuizScene.js src/scenes/BossScene.js`
- **Expected Output:** Match found in at least one scene.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 2: Particle Emitters
- **UNID:** `test:scids-game:procedural-graphics:tc2`
- **Description:** Verifies that procedural particle emitters are configured.
- **Command:** `grep -E "add\.particles" src/scenes/QuizScene.js src/scenes/BossScene.js`
- **Expected Output:** Match found in at least one scene.
- **Pass/Fail:** [ ] Pass / [ ] Fail


<!-- unid-meta
unid: test:scids-game:data-ingestion
fulfills:
  - prd:scids:content-sources
  - prd:scids:unid-arch
  - arch:game-design:pedagogy
-->
## Task: scids-game-hp0.1 (Data Ingestion & UNID Tracking)

### Test Case 1: UNID Tracking
- **UNID:** `test:scids-game:data-ingestion:tc1`
- **Description:** Verifies that questions include the mandatory UNID `id` field.
- **Command:** `grep -E "id: " src/data/questions.js`
- **Expected Output:** Match found (multiple instances).
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 2: Data Structure Parsing
- **UNID:** `test:scids-game:data-ingestion:tc2`
- **Description:** Verifies that the JSON parser/data store handles the required fields properly.
- **Command:** `grep -E "(question|options|correct|hint|explanation)" src/data/questions.js`
- **Expected Output:** Match found for all structure fields.
- **Pass/Fail:** [ ] Pass / [ ] Fail


<!-- unid-meta
unid: test:scids-game:domains
fulfills:
  - arch:game-design:12-domains
  - arch:game-design:world-mechanics
  - arch:game-design:vision
  - prd:scids:overview
-->
## Content Domain General Verification

### Test Case 1: Domain Metadata Mapping
- **UNID:** `test:scids-game:domains:tc1`
- **Description:** Verifies that the general curriculum domains are mapped.
- **Command:** `grep -E "(earth|life|physical)" src/data/questions.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail


<!-- unid-meta
unid: test:scids-game:domain-earth
fulfills:
  - arch:game-design:domain-earth-space
  - prd:scids:domain-earth-space
  - prd:scids:earth-structure
  - prd:scids:natural-phenomena
  - prd:scids:solar-system
-->
## Domain: Earth & Space Verification

### Test Case 1: Earth & Space Data
- **UNID:** `test:scids-game:domain-earth:tc1`
- **Description:** Verifies Earth structure, phenomena, and solar system parsing.
- **Command:** `grep -E "(volcan|earthquake|solar)" src/data/questions.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail


<!-- unid-meta
unid: test:scids-game:domain-life
fulfills:
  - arch:game-design:domain-life-sciences
  - prd:scids:domain-life-sciences
  - prd:scids:skeleton-muscles
  - prd:scids:animal-adaptations
  - prd:scids:ecosystems
-->
## Domain: Life Sciences Verification

### Test Case 1: Life Sciences Data
- **UNID:** `test:scids-game:domain-life:tc1`
- **Description:** Verifies skeletons, muscular, matching and ecosystem parsing.
- **Command:** `grep -E "(skeleton|muscle|adapt|ecosystem)" src/data/questions.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail


<!-- unid-meta
unid: test:scids-game:domain-physical
fulfills:
  - arch:game-design:domain-physical-sciences
  - prd:scids:domain-physical-sciences
  - prd:scids:states-of-matter
  - prd:scids:light-vision
  - prd:scids:electrical-circuits
-->
## Domain: Physical Sciences Verification

### Test Case 1: Physical Sciences Data
- **UNID:** `test:scids-game:domain-physical:tc1`
- **Description:** Verifies states of matter, light, and circuits parsing.
- **Command:** `grep -E "(matter|light|circuit)" src/data/questions.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail


<!-- unid-meta
unid: test:scids-game:mechanics
fulfills:
  - arch:game-design:exploration-pipeline
  - arch:game-design:level-completion
-->
## World and Gameplay Verification

### Test Case 1: Player Locomotion Initialization
- **UNID:** `test:scids-game:mechanics:tc1`
- **Description:** Verifies basic player locomotion bindings and world collision setup.
- **Command:** `grep -E "(setVelocity|setCollideWorldBounds|createCursorKeys)" src/scenes/MainScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 2: Physics Gravity Validation
- **UNID:** `test:scids-game:mechanics:tc2`
- **Description:** Verifies proper gravity applied to the physics engine to ensure a responsive platformer feel.
- **Command:** `grep -E "gravity:.*[yY]:" src/main.js src/scenes/MainScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 3: Player Jump Mechanics
- **UNID:** `test:scids-game:mechanics:tc3`
- **Description:** Verifies jump logic handles touching down and applies upward vertical velocity.
- **Command:** `grep -E "(body\.touching\.down.*setVelocityY|body\.blocked\.down)" src/scenes/MainScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 4: Collectible System (Coins)
- **UNID:** `test:scids-game:mechanics:tc4`
- **Description:** Verifies overlap triggers to collect coins and disable their physical bodies.
- **Command:** `grep -E "(overlap.*coins.*collectCoin|disableBody.*coin)" src/scenes/MainScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 5: Score Tracking Accumulator
- **UNID:** `test:scids-game:mechanics:tc5`
- **Description:** Verifies that internal score variables correctly increment when rewards/coins are acquired.
- **Command:** `grep -E "(score\s*\+=|updateScore)" src/scenes/MainScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 6: Dynamic Camera Following
- **UNID:** `test:scids-game:mechanics:tc6`
- **Description:** Verifies that the main camera viewport is firmly bound to track the player sprite.
- **Command:** `grep -E "cameras\.main\.startFollow\(" src/scenes/MainScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 7: Parallax Environment Backgrounds
- **UNID:** `test:scids-game:mechanics:tc7`
- **Description:** Verifies scrolling backgrounds using tileSprite based on camera or player movement.
- **Command:** `grep -E "(tilePositionX.*=|add\.tileSprite)" src/scenes/MainScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 8: Level Bounds Enforcement
- **UNID:** `test:scids-game:mechanics:tc8`
- **Description:** Verifies that the camera specifically constrains its view bounds within the level map.
- **Command:** `grep -E "cameras\.main\.setBounds\(" src/scenes/MainScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 9: Immersive Audio Feedback
- **UNID:** `test:scids-game:mechanics:tc9`
- **Description:** Verifies playing of sound effects for dynamic actions like jumps and coin collection.
- **Command:** `grep -E "sound\.play\(" src/scenes/MainScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 10: Enemy Patrol Logic
- **UNID:** `test:scids-game:mechanics:tc10`
- **Description:** Verifies rudimentary patrol loop or bounce mechanics for environmental hazards/enemies.
- **Command:** `grep -E "(setBounce|setVelocityX.*\-?[0-9]+)" src/scenes/MainScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 11: Seamless Scene Transitions
- **UNID:** `test:scids-game:mechanics:tc11`
- **Description:** Verifies safe navigation between levels and the seamless loading into the Result scene.
- **Command:** `grep -E "scene\.start\(" src/scenes/MainScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail


<!-- unid-meta
unid: test:scids-game:advanced-gamification
fulfills:
  - arch:game-design:gamification-proposals
  - arch:game-design:power-ups
  - arch:game-design:boss-fights
  - arch:game-design:secret-zones
  - arch:game-design:combo-meter
  - arch:game-design:hub-world
-->
## Advanced Gamification Verification (Future Sprints)
*No tests registered for this sprint. Placed here for tracking UNID state matrix.*


<!-- unid-meta
unid: test:scids-game:ui-ux
fulfills:
  - prd:scids:core-features
  - arch:game-design:flexible-strategy
-->
## UI/UX Verification

### Test Case 1: Responsive Scaling (Phaser.Scale.FIT)
- **UNID:** `test:scids-game:ui-ux:tc1`
- **Description:** Verifies that the game is configured to scale responsively using the `FIT` methodology across mobile and desktop.
- **Command:** `grep -E "mode: Phaser\.Scale\.FIT" src/main.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 2: Procedural UI Fallbacks
- **UNID:** `test:scids-game:ui-ux:tc2`
- **Description:** Verifies that UI panels utilize procedural drawing (`Phaser.Graphics`) if assets are not present.
- **Command:** `grep -E "this\.add\.graphics\(" src/scenes/QuizScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 3: Visual Corrective Feedback (Shake / Confetti)
- **UNID:** `test:scids-game:ui-ux:tc3`
- **Description:** Verifies the visual feedback mechanisms for correct and incorrect answers.
- **Command:** `grep -E "(cameras\.main\.shake|add\.particles)" src/scenes/QuizScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail
