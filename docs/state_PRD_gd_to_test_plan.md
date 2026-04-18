# State Matrix: PRD & Game Design to Test Plan

This matrix computes the coverage of requirements defined in `PRD.md` and `game-design.md` against the verification criteria defined in `docs/tests/test-plan.md`.

## Universal ID Coverage

| Source ID | Description | Fulfilled By (Test UNID) | Status |
| :--- | :--- | :--- | :--- |
| **PRD.md** | | | |
| `prd:scids:overview` | SciDS Game Overview | `test:scids-game:domains` | ✅ Covered |
| `prd:scids:unid-arch` | UNID Architecture | `test:scids-game:data-ingestion` | ✅ Covered |
| `prd:scids:core-features` | Core Features (Levels, Blocks, Feedback) | `test:scids-game:assessment-zones`, `test:scids-game:ui-ux` | ✅ Covered |
| `prd:scids:content-sources` | Content Sources | `test:scids-game:data-ingestion` | ✅ Covered |
| `prd:scids:domain-earth-space` | Earth & Space Sciences | `test:scids-game:domain-earth` | ✅ Covered |
| `prd:scids:earth-structure` | Structure of the Earth | `test:scids-game:domain-earth` | ✅ Covered |
| `prd:scids:natural-phenomena`| Natural Phenomena | `test:scids-game:domain-earth` | ✅ Covered |
| `prd:scids:solar-system` | Solar System & Space | `test:scids-game:domain-earth` | ✅ Covered |
| `prd:scids:domain-life-sciences` | Life Sciences | `test:scids-game:domain-life` | ✅ Covered |
| `prd:scids:skeleton-muscles` | Skeleton and Muscles | `test:scids-game:domain-life` | ✅ Covered |
| `prd:scids:animal-adaptations`| Animal Adaptations | `test:scids-game:domain-life` | ✅ Covered |
| `prd:scids:ecosystems` | Ecosystems & Health Data | `test:scids-game:domain-life` | ✅ Covered |
| `prd:scids:domain-physical-sciences`| Physical Sciences | `test:scids-game:domain-physical` | ✅ Covered |
| `prd:scids:states-of-matter` | States of Matter & Heat | `test:scids-game:domain-physical` | ✅ Covered |
| `prd:scids:light-vision` | Light & Vision | `test:scids-game:domain-physical` | ✅ Covered |
| `prd:scids:electrical-circuits`| Electrical Circuits | `test:scids-game:domain-physical` | ✅ Covered |
| `prd:scids:goals` | Project Goals | `test:scids-game:procedural-graphics` | ✅ Covered |
| **game-design.md** | | | |
| `arch:game-design:vision` | Game Vision & Philosophy | `test:scids-game:domains` | ✅ Covered |
| `arch:game-design:world-mechanics` | World and Level Mechanics | `test:scids-game:domains` | ✅ Covered |
| `arch:game-design:12-domains` | The Science Domains | `test:scids-game:domains` | ✅ Covered |
| `arch:game-design:domain-earth-space`| Earth & Space Sciences | `test:scids-game:domain-earth` | ✅ Covered |
| `arch:game-design:domain-life-sciences`| Life Sciences | `test:scids-game:domain-life` | ✅ Covered |
| `arch:game-design:domain-physical-sciences`| Physical Sciences | `test:scids-game:domain-physical` | ✅ Covered |
| `arch:game-design:exploration-pipeline`| Exploration Pipeline | `test:scids-game:mechanics` | ✅ Covered |
| `arch:game-design:assessment-loop` | Assessment Loop | `test:scids-game:assessment-zones` | ✅ Covered |
| `arch:game-design:triggers` | Triggers | `test:scids-game:assessment-zones` | ✅ Covered |
| `arch:game-design:action-challenges` | Action-Based Challenges | `test:scids-game:assessment-zones` | ✅ Covered |
| `arch:game-design:feedback-systems` | Feedback and Reward Systems | `test:scids-game:ui-overlay` | ✅ Covered |
| `arch:game-design:corrective-feedback`| Corrective Feedback Loop | `test:scids-game:ui-overlay` | ✅ Covered |
| `arch:game-design:level-completion` | Level Completion | `test:scids-game:mechanics` | ✅ Covered |
| `arch:game-design:pedagogy` | Pedagogical Alignment | `test:scids-game:data-ingestion` | ✅ Covered |
| `arch:game-design:gamification-proposals`| Advanced Gamification Proposals | `test:scids-game:advanced-gamification` | ⏸️ Future Sprint |
| `arch:game-design:power-ups` | Subject-Specific Power-Ups | `test:scids-game:advanced-gamification` | ⏸️ Future Sprint |
| `arch:game-design:boss-fights`| Knowledge Boss Fights | `test:scids-game:advanced-gamification` | ⏸️ Future Sprint |
| `arch:game-design:secret-zones`| Secret Assessment Zones | `test:scids-game:advanced-gamification` | ⏸️ Future Sprint |
| `arch:game-design:combo-meter`| Combo Meter | `test:scids-game:advanced-gamification` | ⏸️ Future Sprint |
| `arch:game-design:hub-world` | Science Lab Hub World | `test:scids-game:advanced-gamification` | ⏸️ Future Sprint |
| `arch:game-design:asset-inventory` | Asset Inventory & Gap Analysis | `test:scids-game:complex-diagrams` | ✅ Covered |
| `arch:game-design:current-assets` | Current Asset Inventory | `test:scids-game:complex-diagrams` | ✅ Covered |
| `arch:game-design:missing-assets` | Missing Assets | `test:scids-game:complex-diagrams` | ✅ Covered |
| `arch:game-design:flexible-strategy` | Flexible Asset Strategy | `test:scids-game:procedural-graphics`, `test:scids-game:ui-ux` | ✅ Covered |

## Coverage Summary
- Total Tracked UNIDs: 41
- Total Mapped to Test Plan: 41
- Current Status: 100% Traceability (with Advanced Gamification explicitly marked for Future Sprints).
