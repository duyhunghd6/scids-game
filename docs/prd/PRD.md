# Product Requirements Document (PRD)

## Project: SciDS Game

<!-- unid-meta
unid: prd:scids:overview
fulfills: []
-->
### Overview
SciDS Game is an engaging, 2D educational application built using **Phaser 4** and **Vanilla JS**. Designed for Grade 3 students, the game transforms science curriculum assessments into an interactive arcade experience. By gamifying end-term exams, the application aims to increase knowledge retention, provide immediate corrective feedback, and encourage mastery through play.

<!-- unid-meta
unid: prd:scids:unid-arch
fulfills: []
-->
### Universal ID (UNID) Architecture
A core mandate of the SciDS architecture is the **Universal ID (UNID)**. The UNID provides a deterministic tracking mechanism through which all entities—curriculum topics, questions, media assets, and development artifacts—are linked. 

Each question JSON file, topic node, and feedback interaction maps to a specific UNID. This permits agentic pipelines (like future translation, voice synthesis, and auto-reporting systems) to cleanly interact with specific nodes in the game state without ambiguity. 

Example UNID paths for content mapping:
- `topic.earth_structure`
- `question.es1`
- `media.es1.hint`

<!-- unid-meta
unid: prd:scids:core-features
fulfills: []
-->
### Core Features
1. **Interactive Menu Grid**: 12 modular science topics (e.g., Volcanoes, Animal Adaptations) represented as grid cards.
2. **Dynamic Quizzing System**: Multiple-choice format parsing UNID-driven JSON data sources.
3. **Responsive Procedural UI**: Game interface created primarily via the `Phaser.Graphics` API (eliminating the need for large pre-cached image assets), utilizing emoji sets for iconography, and dynamically scaling using `Phaser.Scale.FIT`.
4. **Learning Feedback Loop**: Immediate visual feedback per question (confetti vs. shake), displaying the correct answer upon a missed attempt, and a "Show Hint" mechanism.
5. **Score & Grading**: A "Result Scene" grading the user up to 3 stars based on completion percentages.

<!-- unid-meta
unid: prd:scids:content-sources
fulfills: []
-->
### Content Sources
The base domain knowledge (the JSON files located in `./docs/prd/json/`) stems directly from actual Grade 3 summative tests. The game digests these JSON inputs into internal modules categorized by topic.

<!-- unid-meta
unid: prd:scids:goals
fulfills: []
-->
### Goals
- Empower self-directed student review.
- Eliminate external dependencies for graphics where possible to keep the bundle size extremely lightweight (< 2MB).
- Ensure a robust pipeline where AI agents can augment content deterministically utilizing the UNID tagging.
