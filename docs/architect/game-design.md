# SciDS Game Design Document

<!-- unid-meta
unid: arch:game-design:vision
fulfills:
  - prd:scids:overview
  - prd:scids:goals
-->
## 1. Vision & Philosophy
The core philosophy of the SciDS Game is **"Curriculum Disguised as an Adventure."** Instead of presenting educational assessments as static quizzes, the game natively integrates real Grade 3 summative science tests into highly interactive, Mario-inspired 2D platformer mechanics. 

By applying traditional arcade design patterns, we aim to:
- Maximize self-directed engagement.
- Obfuscate the pressure of traditional testing.
- Increase knowledge retention through tactile, gamified feedback loops.

---

<!-- unid-meta
unid: arch:game-design:world-mechanics
fulfills:
  - prd:scids:core-features
-->
## 2. World and Level Mechanics
<!-- unid-meta
unid: arch:game-design:12-domains
fulfills: []
-->
### 2.1. The Science Domains (Curriculum Mapping)
The game categorizes the curriculum into distinct thematic 2D **platformer levels** organized by domain. The following domains align directly with the educational PRD:

<!-- unid-meta
unid: arch:game-design:domain-earth-space
fulfills:
  - prd:scids:domain-earth-space
  - prd:scids:earth-structure
  - prd:scids:natural-phenomena
  - prd:scids:solar-system
-->
#### Earth & Space Sciences
Levels in this domain focus on physical environment and celestial mechanics.
- **Structure of the Earth**: Levels feature subterranean and volcanic aesthetics. Challenges involve layer identification (`diagram_labeling`).
- **Natural Phenomena**: Dynamic levels with hazards like magma or shaking ground.
- **Solar System & Space**: Space-themed visuals where shadows and planetary rotation are puzzle elements.

<!-- unid-meta
unid: arch:game-design:domain-life-sciences
fulfills:
  - prd:scids:domain-life-sciences
  - prd:scids:skeleton-muscles
  - prd:scids:animal-adaptations
  - prd:scids:ecosystems
-->
#### Life Sciences
Levels in this domain are built around biology, habitats, and organic structures.
- **Skeleton and Muscles**: Mechanics might involve assembling structures or dealing with movement based on muscle pairs.
- **Animal Adaptations**: Levels featuring diverse biomes (arctic, desert, wetlands) where specific traits are required to bypass obstacles.
- **Ecosystems**: Forest or jungle environments focusing on food webs and health data charts.

<!-- unid-meta
unid: arch:game-design:domain-physical-sciences
fulfills:
  - prd:scids:domain-physical-sciences
  - prd:scids:states-of-matter
  - prd:scids:light-vision
  - prd:scids:electrical-circuits
-->
#### Physical Sciences
Levels focusing on physics, energy, and matter interaction.
- **States of Matter**: Ice/water mechanics where melting/solidifying affect traversal.
- **Light & Vision**: Puzzle elements using reflective surfaces and ray vectors to unlock doors.
- **Electrical Circuits**: Conducting paths to power elevators and platforms safely.

<!-- unid-meta
unid: arch:game-design:exploration-pipeline
fulfills: []
-->
### 2.2. Exploration Pipeline
- **Avatar Control:** The player controls an on-screen avatar (utilizing standard Phaser arcade physics).
- **Movement:** Running, jumping, and interacting with the physical environment.
- **World Interaction:** Learning happens *in-world*. Instead of clicking a UI button to start a quiz, the player explores the level and physically triggers challenges.

---

<!-- unid-meta
unid: arch:game-design:assessment-loop
fulfills:
  - prd:scids:core-features
-->
## 3. The Assessment Loop
Traditional quizzes are replaced by the **"Question Block" System**.

<!-- unid-meta
unid: arch:game-design:triggers
fulfills: []
-->
### 3.1. Triggers
The player encounters challenges by:
- Physically colliding with or striking **Question Blocks** (reminiscent of the iconic `?` blocks).
- Stepping into predefined **Assessment Zones** (invisible hitboxes).

*Note: These triggers act as mandatory progression gates. The player must successfully solve the presented challenge to advance further into the level.*

<!-- unid-meta
unid: arch:game-design:action-challenges
fulfills: []
-->
### 3.2. Action-Based Challenges
Once a block is triggered, the game parses the associated JSON data via its mapping and launches an interactive mini-game. Challenge types include:
- **Diagram Labeling:** Dragging tags onto volcano cross-sections.
- **Interactive Drawing:** Drawing straight light vectors or particle models.
- **Matching:** Connecting animal traits to environments.
- **Tabular Data Entry:** Completing science experiment results tables.

---

<!-- unid-meta
unid: arch:game-design:feedback-systems
fulfills:
  - prd:scids:core-features
-->
## 4. Feedback and Reward Systems
Immediate, visceral feedback is critical for mastery through play. 

<!-- unid-meta
unid: arch:game-design:corrective-feedback
fulfills: []
-->
### 4.1. The Corrective Feedback Loop
- **Success:** Triggers positive reinforcement mechanics (e.g., particle system confetti, cheerful audio cues, coin spawning).
- **Failure:** Triggers "soft punishment" (e.g., screen shake, dull sound). Crucially, the game provides immediate coaching by leveraging the `coaching_hint` and `explanation` metadata from the UNID data sources. The actual correct answer is shown implicitly after a missed attempt to reinforce the concept.

<!-- unid-meta
unid: arch:game-design:level-completion
fulfills: []
-->
### 4.2. Level Completion
Upon finishing a level, the player transitions to a **Result Scene**:
- **Scoring:** The game calculates a score based on `reward_points`, coins gathered in-level, and accuracy percentage.
- **The 3-Star Rating:** A standard gaming progress metric. Earning a low star rating encourages the student to replay the level and achieve mastery voluntarily.

---

<!-- unid-meta
unid: arch:game-design:pedagogy
fulfills:
  - prd:scids:unid-arch
-->
## 5. Pedagogical Alignment
Every game mechanical element maps to a Universal ID (UNID). The player feels they are playing an arcade platformer, but the system is deterministically testing their knowledge against core learning objectives (like identifying states of matter or ecosystem food chains) and piping the results for future analytical reporting.

---

<!-- unid-meta
unid: arch:game-design:gamification-proposals
fulfills: []
-->
## 6. Advanced Gamification Proposals (The "Fun" Factor)
To elevate the game from "an interactive quiz" to a truly legendary educational experience, the following advanced game design mechanics are proposed for future sprints:

<!-- unid-meta
unid: arch:game-design:power-ups
fulfills: []
-->
### 6.1. Subject-Specific "Power-Ups"
Drawing direct inspiration from Mario's Fire Flower or Super Star, power-ups should be earned by achieving high accuracy and used to traverse the platformer levels:
- **Magma Suit (Earth Science):** Earned by answering a streak of Volcano questions correctly. Allows the player to safely walk across lava hazards in the level.
- **Photon Dash (Light Science):** Allows the player to travel rapidly in a straight line (like a light ray) to reach out-of-bounds coins.
- **The Adaptability Cloak (Life Sciences):** Grants camouflage to sneak past enemy patrol sprites, learned from the "Animal Adaptations" unit.

<!-- unid-meta
unid: arch:game-design:boss-fights
fulfills: []
-->
### 6.2. Knowledge "Boss Fights"
At the end of a Domain, instead of a summary screen, the player encounters a "Boss Area." 
- **The Mechanic:** The player must utilize the domain knowledge in a fast-twitch, highly engaging scenario. 
- **Example:** A giant "Darkness Monster" blocks the exit to the Light & Vision level. The player must rapidly drag-and-drop "Light Source" and "Reflective" objects onto the field to stun the boss before the timer runs out.

<!-- unid-meta
unid: arch:game-design:secret-zones
fulfills: []
-->
### 6.3. Secret Assessment Zones (Warp Pipes)
Reward exploration by hiding classic platformer "Warp Pipes" or secret caves.
- **Mechanics:** These hidden rooms contain "Hardcore" challenge questions or advanced interactive puzzles (e.g., dragging wires to build a perfect electrical circuit). 
- **Rewards:** Completing secret zones awards rare "Galileo Badges" or "Einstein Medals" that are displayed on the player's profile, appealing to completionists.

<!-- unid-meta
unid: arch:game-design:combo-meter
fulfills: []
-->
### 6.4. The "Curiosity" Combo Meter
To reinforce continuous accuracy, we introduce a **Combo System**.
- **Mechanic:** Answering 3 challenges perfectly in a row puts the avatar into a "Flow State" (glowing particle effects, slightly faster movement speed, dynamic music change). 
- **Dopamine Loop:** This provides an immediate, visceral dopamine hit for accuracy, encouraging the student to think carefully rather than guess randomly to maintain their "Flow."

<!-- unid-meta
unid: arch:game-design:hub-world
fulfills: []
-->
### 6.5. The Science Lab Hub World
- **Mechanic:** Instead of a static "Level Select Screen," the overworld is an interactive, customizable **Science Lab**. 
- **The Coin Sink:** As players collect coins in the platforming levels, they can spend them to buy purely cosmetic "Lab Upgrades" (e.g., placing a telescope by the window, buying a skeleton model, painting the lab walls). This creates a powerful, long-term progression loop that keeps students returning.

---

<!-- unid-meta
unid: arch:game-design:asset-inventory
fulfills: []
-->
## 7. Asset Inventory & Gap Analysis

<!-- unid-meta
unid: arch:game-design:current-assets
fulfills: []
-->
### 7.1. Current Asset Inventory
The baseline arcade platforming engine is **100% covered**. We possess all the physics, locomotion, and world-building sprites necessary within `./public/assets/mario/` (e.g., `mario_bros.png`, `tile_set.png`, `item_objects.png`, `enemies.png`).

<!-- unid-meta
unid: arch:game-design:missing-assets
fulfills: []
-->
### 7.2. Missing Assets (Gap Analysis)
Based on our "Curriculum Disguised as Adventure" requirements, some domain-specific visual assets do not currently exist:
- **Core Educational Diagrams:** Volcano Cross-Section, Human Skeletal Chart, Electrical Circuit Components.
- **Hub World Items:** Science Lab Decorations (Telescope, Bunsen Burner), Reward Medals.

<!-- unid-meta
unid: arch:game-design:flexible-strategy
fulfills: []
-->
### 7.3. Flexible Asset Strategy
If the above specific image assets do not exist, we strictly fall back to procedural drawing using Phaser 4's built-in `Phaser.Graphics` for UI panels, hitboxes, vector lines, and particle emitters.
