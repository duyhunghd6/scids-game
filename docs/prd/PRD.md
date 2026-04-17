# Product Requirements Document (PRD)

## Project: SciDS Game

<!-- unid-meta
unid: prd:scids:overview
fulfills: []
-->

### Overview

SciDS Game is an engaging, 2D educational application built using **Phaser 4** and **Vanilla JS**. Designed for Grade 3 students, the game transforms science curriculum assessments into a highly interactive, Mario-inspired platformer experience. By disguising end-term exams as a fun adventure game, the application aims to increase knowledge retention, provide immediate corrective feedback, and encourage mastery through play.

<!-- unid-meta
unid: prd:scids:unid-arch
fulfills: []
-->

### Universal ID (UNID) Architecture

A core mandate of the SciDS architecture is the **Universal ID (UNID)**. The UNID provides a deterministic tracking mechanism through which all entities—curriculum topics, questions, media assets, and development artifacts—are linked.

Each question JSON file, topic node, and feedback interaction maps to a specific UNID. This permits agentic pipelines (like future translation, voice synthesis, and auto-reporting systems) to cleanly interact with specific nodes in the game state without ambiguity.

Example UNID paths for content mapping:

- `level.earth_structure`
- `topic.earth_structure`
- `block.question1`
- `question.es1`
- `media.es1.hint`

<!-- unid-meta
unid: prd:scids:core-features
fulfills: []
-->

### Core Features

1. **Mario-Style Level System**: 12 modular science topics (e.g., Volcanoes, Animal Adaptations) represented as distinct 2D platformer worlds where the player runs, jumps, and explores.
2. **Platformer Quizzing System**: Parses UNID-driven JSON data sources. The player strikes "Question Blocks" or enters assessment zones to trigger diverse challenge types (e.g., multiple-choice, diagram labeling, interactive drawing, matching, and table completion). **Crucially, these blocks and assessment zones act as mandatory progression gates—the player must successfully solve the question to continue playing and pass the quest.**
3. **Responsive Core UI**: The game interface combines a responsive 2D physics world with `Phaser.Graphics` and traditional platformer sprites (player, ground, blocks), scaling dynamically using `Phaser.Scale.FIT` to accommodate both mobile and desktop screens.
4. **Formative Learning Feedback Loop**: Immediate visual feedback per question (confetti vs. shake), displaying the correct answer upon a missed attempt, and incorporating `coaching_hint` and `explanation` metadata from the JSON sources as real-time corrective instruction. Missing gamification data natively defaults to derived values from the `marks` attribute.
5. **Score & Grading**: A "Result Scene" grading the user up to 3 stars based on accumulated `reward_points`, coins gathered in the level, and completion percentages.

<!-- unid-meta
unid: prd:scids:content-sources
fulfills: []
-->

### Content Sources

The base domain knowledge at `./docs/prd/json/` stems directly from actual Grade 3 summative tests and slide reviews (Units 4, 5, 6). The game digests these JSON inputs into internal modules categorized by topic.

#### Data Normalization Pipeline

Because the raw JSON test datasets use highly variable schemas (`modules` vs `game_data.questions` vs `gameData.levels`), the application implements a robust data normalization layer that:

- Standardizes all schemas into the 12 UI domains.
- Employs RegEx to systematically strip inline citation markers (e.g., `[cite: 183]`) to prevent them from rendering into the game's UI.

Based on the parsed JSON extracts, the science curriculum is categorized into the following core domains, which inform the 12 modular topics in the Interactive Menu Grid:

<!-- unid-meta
unid: prd:scids:domain-earth-space
fulfills: []
-->

#### 1. Earth & Space Sciences

<!-- unid-meta
unid: prd:scids:earth-structure
fulfills: []
-->

##### Structure of the Earth

Crust, mantle, outer/inner core properties and states.

- _Learning Objectives_: Identify layers sequentially and comprehend physical states (liquid magma vs solid metal).
- _Tool Mapping_: `diagram_labeling` cross-sections, `short_answer` for layer properties.

<!-- unid-meta
unid: prd:scids:natural-phenomena
fulfills: []
-->

##### Natural Phenomena

Volcanoes (formation, eruptions), Earthquakes, and Tsunamis.

- _Learning Objectives_: Analyze volcano formation/components, earthquake origins (epicentre/friction), and coastal tsunami risks. Identify constructive vs destructive environmental effects.
- _Tool Mapping_: `diagram_labeling` (volcano parts like crater, magma chamber, secondary cone).

<!-- unid-meta
unid: prd:scids:solar-system
fulfills: []
-->

##### Solar System & Space

Planets, asteroids, comets, Earth's rotation (day/night causes), and shadow length changes.

- _Learning Objectives_: Separate planetary rotation (causing day/night) from orbit. Differentiate asteroids, comets, and planets. Relate sun altitude to shadow length.
- _Tool Mapping_: `interactive_coloring` to shade dark zones on Earth, `matching` celestial vocabulary.

<!-- unid-meta
unid: prd:scids:domain-life-sciences
fulfills: []
-->

#### 2. Life Sciences (Biology)

<!-- unid-meta
unid: prd:scids:skeleton-muscles
fulfills: []
-->

##### Skeleton and Muscles

Vertebrate/invertebrate classification, exoskeletons, and how muscle pairs create movement.

- _Learning Objectives_: Classify vertebrates vs invertebrates and exoskeletons. Relate bones to antagonistic muscle pairs (contract/relax).
- _Tool Mapping_: `diagram_labeling` human skeletal parts, `multiple_choice` / `fill_in_the_blank` for muscle mechanics.

<!-- unid-meta
unid: prd:scids:animal-adaptations
fulfills: []
-->

##### Animal Adaptations & Habitats

Survival traits and identification keys.

- _Learning Objectives_: Evaluate physical attributes (webbed feet, long necks, specialized bird beaks) as adaptations for hunting and survival. Use identification keys.
- _Tool Mapping_: `matching` beaks/traits directly to their optimal habitats or functions.

<!-- unid-meta
unid: prd:scids:ecosystems
fulfills: []
-->

##### Ecosystems & Health Data

Food Chains and Measles vaccinations.

- _Learning Objectives_: Track energy in food chains (producers to predators). Analyze health graphs depicting vaccination and infection rates.
- _Tool Mapping_: `fill_in_the_blank` for food chain order, `short_answer` for bar chart graph interpretation (e.g., measles data).

<!-- unid-meta
unid: prd:scids:domain-physical-sciences
fulfills: []
-->

#### 3. Physical Sciences

<!-- unid-meta
unid: prd:scids:states-of-matter
fulfills: []
-->

##### States of Matter & Heat

Solids vs. liquids, particle models, heat transfer, and state changes (melting, solidification).

- _Learning Objectives_: Diagram particle models for solids vs liquids. Predict time factors in melting using fair tests. Evaluate line graphs showing heat transfer over time.
- _Tool Mapping_: `interactive_drawing` (drawing loose particle arrangements), `table_completion` for recording melting experiment times.

<!-- unid-meta
unid: prd:scids:light-vision
fulfills: []
-->

##### Light & Vision

Ray behavior, reflection vs. absorption, material properties, and ray diagrams.

- _Learning Objectives_: Categorize reflective (smooth/shiny) vs absorbent (rough/dull) materials. Understand that light travels in straight rays and must reflect into an observer's eyes.
- _Tool Mapping_: `interactive_drawing` (drawing straight ray vectors from light source -> object -> eye), `multiple_selection` for material properties.

<!-- unid-meta
unid: prd:scids:electrical-circuits
fulfills: []
-->

##### Electrical Circuits

Components (cells, lamps, switches), conductors vs. insulators, energy transfer, and electrical safety.

- _Learning Objectives_: Construct complete circuits mapping cells, wires, switches, and lamps. Validate conductors vs insulators and adhere to electrical safety practices. Identify energy transfer states (electrical to sound, heat, movement).
- _Tool Mapping_: `multiple_selection` for insulators/conductors, `matching` electrical terms, `short_answer` for debugging faulty circuits.

<!-- unid-meta
unid: prd:scids:goals
fulfills: []
-->

### Goals

- Empower self-directed student review by disguising curriculum as a fun, Mario-like adventure.
- **Flexible Asset Strategy**: Utilize available heavy `.png` image assets for interactive educational elements or menus to maximize visual fidelity. If specific assets do not currently exist, strictly fallback to procedural drawing using Phaser 4's built-in `Phaser.Graphics` to draw UI panels, hitboxes, vector lines, and particle emitters entirely with code.
- Ensure a robust pipeline where AI agents can augment content deterministically utilizing the UNID tagging.
