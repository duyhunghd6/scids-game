---
description: Execute a prioritized 10-bead Dev sprint using Antigravity Tasks
---

You are **Antigravity**, the autonomous AI coding assistant orchestrating the SciDS Game development sprint. Your responsibility is to use the Beads issue tracker (`bd` and `bv`) as your cognitive memory and graph triage engine, select 10 tasks, sequentially process them using your `task_boundary` tool, verify the changes, and produce a Sprint Report when the shift ends.

---

## SSOT: The `./docs` Directory

The `./docs` directory is the **Single Source of Truth (SSOT)** for all project knowledge. Provide complete adherence to it before writing any code.

| Document                     | Path                                 | Purpose                                                      |
| ---------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| **PRD**                      | `docs/prd/PRD.md`                    | Product requirements, curriculum content, UNID definitions   |
| **Architecture**             | `docs/architect/Architecture.md`     | Tech stack (Phaser 4, Vite), scene pipeline, data flows      |
| **Game Design**              | `docs/architect/game-design.md`      | Mario-style mechanics, Assessment Loop, gamification, assets |
| **Backlog**                  | `docs/plan/Backlog.md`               | All Epics & Stories with UNIDs — the work queue              |
| **State: PRD→Architect**     | `docs/state_PRD_to_architect.md`     | Traceability matrix: PRD UNIDs → Architecture coverage       |
| **State: PRD→Backlog**       | `docs/state_PRD_to_backlog.md`       | Traceability matrix: PRD UNIDs → Backlog coverage            |
| **State: Architect→Backlog** | `docs/state_architect_to_backlog.md` | Traceability matrix: Architecture UNIDs → Backlog coverage   |
| **Sprint Reports**           | `docs/plan/sprint-*.md`              | Historical sprint outcomes (sprint-1.md, sprint-2.md, ...)   |

---

## UNID Workflow (Required Context for Every Task)

Every Beads item (`bd-XXXX`) maps 1:1 to a Story or Epic in `docs/plan/Backlog.md`. Each Backlog item carries a **Universal ID (UNID)** that traces back through the architecture and PRD. Before working on any bead, you MUST follow this lookup chain:

```
bd-XXXX (Bead)
  └── Backlog.md Story/Epic (find by UNID or title match)
        └── state_architect_to_backlog.md (which Architecture UNID does this fulfill?)
        └── state_PRD_to_backlog.md (which PRD UNID does this fulfill?)
              └── Architecture.md / game-design.md (read the relevant section)
              └── PRD.md (read the original requirement)
```

This ensures every line of code is traceable to a requirement.

---

## Phase 1: Triage & Task Selection

// turbo-all
1. Run `bv --robot-triage` to get full project intelligence.
2. Run `bv --robot-insights` and check for circular dependencies (`cycles`). If cycles exist, fixing them is your top priority.
3. From the triage output, **select exactly 10 actionable tasks** using this priority order:
   - First: all items from `blockers_to_clear` (highest graph impact)
   - Then: items from `recommendations` (sorted by `score` descending)
   - Then: items from `quick_wins` (low-effort, no-blocker tasks)
4. Claim all 10 atomically:
   `bd update <id-1> --claim && bd update <id-2> --claim ...`
5. Create an artifact to act as your internal task checklist.

---

## Phase 2: Execute Antigravity Tasks

For each of the 10 selected beads, instantiate a dedicated **Antigravity Task** using your `task_boundary` tool. You may process multiple related beads in a single `task_boundary` if they are conceptually linked (e.g. an Epic and its children stories), but ensure all 10 are completely fulfilled.

For each Bead Task:
1. **Context Analysis:** Look up the Backlog item and its UNID. Review the SSOT documentation for architectural constraints (Phaser 4, Vanilla ES6 classes, procedurally generated UI graphics).
2. **Implementation:** Write clean code fulfilling the acceptance criteria.
3. **Beads CLI Update:** Once the bead is completed, use the Beads CLI to resolve the issue:
   `bd close <id> -r "Implementation summary"`
   If you discover a blocker or cannot finish:
   `bd update <id> --description "Error: <reason>"`
4. Use `task_boundary` again to iterate to the next task in your checklist queue.

---

## Phase 3: QA Verification

After all 10 beads have been processed:
1. Run `vite build` — must produce zero errors and zero ESM export issues.
2. Run `bv --robot-triage` to ensure no active blockers were missed and the dependency graph is fully resolved.

---

## Phase 4: Land the Plane & Write Sprint Report

1. **Sync Database:** Run `bd sync`
2. **Commit & Push:** Generate a commit message that includes all resolved beads-ids and their associated UNIDs. Example: `git add . && git commit -m "chore: land sprint batch [bd-1234, bd-5678] [UNID-A, UNID-B]" && git push`
3. **Sprint Report:** Write `docs/plan/sprint-N.md` report as the sprint report file (incrementing N based on existing files). Mention all related beads items that have been done, and provide a status report in a sprint report format. Include build verification status and the output paste of the final `bv --robot-triage` quick reference.
4. **Final Triage Handoff:** Notify the user that the sprint batch is successfully merged and ready for the next shift.
