# PRD to Backlog State Matrix

This document tracks the fulfillment of Universal IDs (UNIDs) from `PRD.md` by the items in `Backlog.md`. 
It ensures that all product requirements are explicitly addressed by actionable epics and stories in the sprint backlog.

## PRD UNIDs

| PRD UNID | Description | Fulfilled By (Backlog UNID) | Status |
| :--- | :--- | :--- | :--- |
| `prd:scids:overview` | Project overview | `epic:scids:educational-architecture` | ✅ Fulfilled |
| `prd:scids:unid-arch` | UNID Architecture | `story:scids:data-ingestion` | ✅ Fulfilled |
| `prd:scids:core-features` | Core Features | `epic:scids:mario-adaptation` | ✅ Fulfilled |
| `prd:scids:content-sources` | Content Sources | `story:scids:data-ingestion` | ✅ Fulfilled |
| `prd:scids:domain-earth-space` | Earth & Space Sciences | `story:scids:earth-space-levels` | ✅ Fulfilled |
| `prd:scids:earth-structure` | Structure of the Earth | `story:scids:earth-space-levels` | ✅ Fulfilled |
| `prd:scids:natural-phenomena` | Natural Phenomena | `story:scids:earth-space-levels` | ✅ Fulfilled |
| `prd:scids:solar-system` | Solar System & Space | `story:scids:earth-space-levels` | ✅ Fulfilled |
| `prd:scids:domain-life-sciences` | Life Sciences | `story:scids:life-sciences-levels` | ✅ Fulfilled |
| `prd:scids:skeleton-muscles` | Skeleton and Muscles | `story:scids:life-sciences-levels` | ✅ Fulfilled |
| `prd:scids:animal-adaptations` | Animal Adaptations | `story:scids:life-sciences-levels` | ✅ Fulfilled |
| `prd:scids:ecosystems` | Ecosystems | `story:scids:life-sciences-levels` | ✅ Fulfilled |
| `prd:scids:domain-physical-sciences` | Physical Sciences | `story:scids:physical-sciences-levels` | ✅ Fulfilled |
| `prd:scids:states-of-matter` | States of Matter | `story:scids:physical-sciences-levels` | ✅ Fulfilled |
| `prd:scids:light-vision` | Light & Vision | `story:scids:physical-sciences-levels` | ✅ Fulfilled |
| `prd:scids:electrical-circuits` | Electrical Circuits | `story:scids:physical-sciences-levels` | ✅ Fulfilled |
| `prd:scids:goals` | Project Goals | `epic:scids:educational-architecture` | ✅ Fulfilled |

## Backlog UNIDs & Fulfillment

| Backlog UNID | Resolves PRD UNID | Resolves Other UNIDs (Arch/Epic) |
| :--- | :--- | :--- |
| `epic:scids:mario-adaptation` | `prd:scids:core-features` | - |
| `story:scids:mario-physics` | - | `epic:scids:mario-adaptation`, `arch:game-design:12-domains` |
| `story:scids:scene-refactor` | - | `epic:scids:mario-adaptation`, `arch:game-design:exploration-pipeline` |
| `story:scids:question-blocks` | - | `epic:scids:mario-adaptation`, `arch:game-design:triggers` |
| `story:scids:quiz-overlay` | - | `epic:scids:mario-adaptation`, `arch:game-design:action-challenges` |
| `epic:scids:advanced-gamification` | - | `arch:game-design:gamification-proposals` |
| `story:scids:power-ups` | - | `arch:game-design:power-ups` |
| `story:scids:boss-fights` | - | `arch:game-design:boss-fights` |
| `story:scids:warp-pipes` | - | `arch:game-design:secret-zones` |
| `story:scids:combo-meter` | - | `arch:game-design:combo-meter` |
| `story:scids:hub-world` | - | `arch:game-design:hub-world` |
| `epic:scids:create-missing-assets` | - | `arch:game-design:asset-inventory` |
| `story:scids:download-existing-assets`| - | `epic:scids:create-missing-assets`, `arch:game-design:current-assets`|
| `story:scids:generate-science-diagrams`| - | `epic:scids:create-missing-assets`, `arch:game-design:missing-assets`|
| `story:scids:procedural-fallback` | - | `epic:scids:create-missing-assets`, `arch:game-design:flexible-strategy` |
| `epic:scids:curriculum-implementation`| - | `arch:game-design:12-domains` |
| `story:scids:earth-space-levels`| `prd:scids:domain-earth-space`, `prd:scids:earth-structure`, `prd:scids:natural-phenomena`, `prd:scids:solar-system` | `epic:scids:curriculum-implementation`, `arch:game-design:domain-earth-space` |
| `story:scids:life-sciences-levels`| `prd:scids:domain-life-sciences`, `prd:scids:skeleton-muscles`, `prd:scids:animal-adaptations`, `prd:scids:ecosystems` | `epic:scids:curriculum-implementation`, `arch:game-design:domain-life-sciences` |
| `story:scids:physical-sciences-levels`| `prd:scids:domain-physical-sciences`, `prd:scids:states-of-matter`, `prd:scids:light-vision`, `prd:scids:electrical-circuits` | `epic:scids:curriculum-implementation`, `arch:game-design:domain-physical-sciences` |
| `epic:scids:educational-architecture`| `prd:scids:overview`, `prd:scids:goals` | `arch:scids:core-stack`, `arch:game-design:vision`, `arch:game-design:pedagogy` |
| `story:scids:data-ingestion`| `prd:scids:unid-arch`, `prd:scids:content-sources` | `epic:scids:educational-architecture`, `arch:scids:data-sublayer` |
| `story:scids:engine-boot`| - | `epic:scids:educational-architecture`, `arch:scids:rendering` |
| `story:scids:assessment-feedback-loop`| - | `epic:scids:educational-architecture`, `arch:game-design:assessment-loop`, `arch:game-design:feedback-systems`, `arch:game-design:corrective-feedback`, `arch:game-design:level-completion`, `arch:scids:scene-pipeline` |

## Gap Analysis

As of the latest refinement, `Backlog.md` covers 100% of the Universal IDs declared in `PRD.md`. 
Both architectural alignment and curriculum items are fully traced to actionable sprint tickets.

**Action Items:**
- ✅ All PRD and architecture components are fully mapped. Proceed to sprint execution.
