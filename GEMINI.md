# SciDS Game - Agentic Directives (GEMINI.md)

## Core Philosophy
This project, **SciDS Game**, follows an Agentic Software Engineering methodology. The AI agents (Gemini, Claude, etc.) must adhere to the rules defined in this document to ensure alignment with the Universal ID (UNID) principles and maintain a clean, resilient, and verifiable codebase.

## Documentation as Single Source of Truth (SSOT)
The `./docs` directory is the SSOT for all project knowledge, architecture decisions, plans, and feature requirements. Agents MUST consult the `./docs` directory before making architectural changes or creating new implementation plans.

### Directory Structure Protocol & File-Level Directives
- **`docs/prd/` (Product Requirements)**: 
  - `PRD.md`: The central specification document detailing core game features, UNID mapping rules, and design philosophy.
  - `json/*.json`: Original source content (e.g., exams and slide presentations) that agents parse to generate playable quizzes.
- **`docs/architect/` (System Architecture)**:
  - `Architecture.md`: Defines the technical stack (Phaser 4, Vite), the scene management pipeline, rendering strategies, and data flows.
  - `game-design.md`: Defines the Mario-style game mechanics, the Assessment Loop, gamification elements, and the asset strategy as a core part of the SSOT.
- **`docs/plan/` (Sprint Planning & Reports)**:
  - `sprint-*.md`: Incremental sprint reports (e.g., `sprint-1.md`) capturing what was built, agent verifications, and next steps for the cycle.
- **`docs/tests/` (Testing & Verification)**:
  - Stores unit testing strategies, E2E browser automation scripts, and test results.

## Universal ID (UNID) Alignment
- All core game entities (topics, questions, assets) and documentation artifacts should conceptually or explicitly link to a Universal ID (UNID).
- This ensures cross-agent referencing remains deterministic.
- Agents should use exact file paths and UNID markers when making cross-references.

## Tech Stack Rules
- **Framework:** Phaser 4 (Vanilla JS ESM named exports) + Vite
- **UI:** Procedural drawing using Phaser Graphics wherever possible to minimize external texture dependencies.
- **Scaling:** `Phaser.Scale.FIT` for cross-device responsiveness.
- **Port Settings:** Game strictly runs on port `9998` instead of the Vite default.
- **Git Hygiene:** Maintain atomic commits, keep tracked files clean, and ensure `package-lock.json` syncs properly.

## Continuous Verification
Any agent proposing code changes must verify the build (`vite build`) and ensure no ESM export issues occur (use `import * as Phaser from 'phaser'`).
