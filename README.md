# SciDS Game

SciDS Game is an engaging 2D educational application designed for Grade 3 Science students. The game transforms curriculum assessments into a highly interactive, Mario-inspired platformer experience. By disguising end-term exams as a fun adventure game featuring physics-based locomotion, question blocks, and boss fights, it aims to increase knowledge retention, provide immersive corrective feedback, and encourage mastery through play.

This project was built leveraging **Agentic Software Engineering** practices to demonstrate how AI coding agents collaborate under a unified Universal ID (UNID) architecture system to build complex game mechanics and educational data delivery systems.

For full feature blueprints and core domains mapping, see the [Product Requirements Document (PRD)](./docs/prd/PRD.md).

## Technology Stack

- **Game Engine:** Phaser 4 (ESM named exports)
- **UI & Graphics:** Dynamic `Phaser.Scale.FIT` architecture, utilizing `Phaser.Graphics` for lightweight procedural UI fallbacks.
- **Build System:** Vite
- **Data & State Management:** Universal ID (UNID) workflow for deterministic content ingestion tracking.

## Quickstart

To run the game locally: 

1. Install the required Node.js dependencies:
   ```bash
   npm install
   ```

2. Start the Vite development server (strictly enforced to `port 9998`):
   ```bash
   npm run dev
   ```

3. The game will be playable in your browser at `http://localhost:9998`.

## License

This project is licensed under the MIT License.
