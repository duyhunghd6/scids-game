# Sprint 3 Test Plan

This document contains binary pass/fail test cases for the Sprint 3 implementation tasks. Do NOT run tests manually; use the exact commands provided to verify the DoD criteria mechanically.

## Task: scids-game-1yg.4 (Dedicated Quiz Overlay UI)

### Test Case 1: Graphics Overlay
- **Description:** Verifies that `Phaser.Graphics` is used to draw the dimmed background instead of a static image.
- **Command:** `grep -E "this\.add\.graphics\(" src/scenes/QuizScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 2: Physics Pause
- **Description:** Verifies that physics is paused when the overlay opens.
- **Command:** `grep -E "physics\.pause\(\)" src/scenes/QuizScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 3: Physics Resume
- **Description:** Verifies that physics is resumed when the UI is dismissed after a correct answer.
- **Command:** `grep -E "physics\.resume\(\)" src/scenes/QuizScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

## Task: scids-game-1yg.3 (Mandatory Question Blocks & Assessment Zones)

### Test Case 1: Assessment Walls Group
- **Description:** Verifies that the `assessmentWalls` static physics group is implemented.
- **Command:** `grep -E "assessmentWalls" src/scenes/QuizScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 2: Progression Gate Unlock
- **Description:** Verifies that walls are destroyed upon a correct answer to allow progression.
- **Command:** `grep -E "\.destroy\(\)" src/scenes/QuizScene.js | grep -i "wall"`
- **Expected Output:** Match found (or equivalent logic in the success handler).
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 3: Block Re-enable
- **Description:** Verifies that blocks are re-enabled (reactivated) on incorrect answers to enforce the mandatory challenge.
- **Command:** `grep -E "setData\('active', true\)" src/scenes/QuizScene.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

## Task: scids-game-1oz.2 (Generate Complex Science Diagrams)

### Test Case 1: Asset Presence
- **Description:** Verifies that the generated science assets exist in the correct directory.
- **Command:** `ls public/assets/science/volcano-cross-section.png public/assets/science/human-skeleton.png public/assets/science/circuit-components.png`
- **Expected Output:** Files exist.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 2: Asset Preload
- **Description:** Verifies that the new image assets are preloaded in `PreloadScene.js`.
- **Command:** `grep -E "load\.image" src/scenes/PreloadScene.js | grep -E "(volcano|skeleton|circuit)"`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 3: Data Reference
- **Description:** Verifies that `src/data/questions.js` references the new image keys.
- **Command:** `grep -E "image:" src/data/questions.js`
- **Expected Output:** Match found.
- **Pass/Fail:** [ ] Pass / [ ] Fail

## Task: scids-game-1oz.3 (Implement Procedural Fallback Graphics)

### Test Case 1: Rounded Rectangles
- **Description:** Verifies that `fillRoundedRect` is used for procedural panels.
- **Command:** `grep -E "fillRoundedRect" src/scenes/QuizScene.js src/scenes/BossScene.js`
- **Expected Output:** Match found in at least one scene.
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 2: Particle Emitters
- **Description:** Verifies that procedural particle emitters are configured.
- **Command:** `grep -E "add\.particles" src/scenes/QuizScene.js src/scenes/BossScene.js`
- **Expected Output:** Match found in at least one scene.
- **Pass/Fail:** [ ] Pass / [ ] Fail

## Task: scids-game-hp0.1 (Data Ingestion & UNID Tracking)

### Test Case 1: UNID Tracking
- **Description:** Verifies that questions include the mandatory UNID `id` field.
- **Command:** `grep -E "id: " src/data/questions.js`
- **Expected Output:** Match found (multiple instances).
- **Pass/Fail:** [ ] Pass / [ ] Fail

### Test Case 2: Data Structure Parsing
- **Description:** Verifies that the JSON parser/data store handles the required fields properly.
- **Command:** `grep -E "(question|options|correct|hint|explanation)" src/data/questions.js`
- **Expected Output:** Match found for all structure fields.
- **Pass/Fail:** [ ] Pass / [ ] Fail
