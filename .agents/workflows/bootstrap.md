# Workflow: Project Bootstrap
# Trigger: /bootstrap
# Purpose: Set up complete AI tooling structure for a new project or workspace.
# Run once per project. Re-run when topology changes (repos added, removed, or newly cloned).
# Re-run rule: only ADD new files. Never recreate or overwrite existing files.

---

Ask questions one group at a time. Wait for answers before proceeding.
Do not make assumptions. Do not create any files until all three groups are answered.

---

## Group 1 — Project Scope

1. What is this project? (own / OSS / GSoC / learning / other)
2. Workspace path? (the root folder you open in your IDE)
2b. Single-repo or multi-repo workspace?
    - Single: confirm repo URL. Then answer 2c.
    - Multi: list every repo with a one-line purpose each. Which are you starting with? Skip 2c.
2c. (Only if Q2b = single) Are there other repos from the same org cloned alongside this one?
    (Even repos you won't work in today — just name them with a one-line purpose each.)
    - No: skip.
3. Primary goal? (exploration / feature / bug fix / proposal / learning / other)
4. Expected duration? (single session / few weeks / months)
5. Which tools? List specifically: Antigravity, Cursor, VSCode. Do not say "multiple."

## Group 2 — Technical Context

6. Tech stack? (languages, frameworks, key libraries — partial is fine)
7. People to know? (maintainers, mentors, collaborators — skip if solo own project)
8. Communication channels? (Matrix, Slack, GitHub Discussions — skip if solo own project)
9. What do you already know about the codebase?
10. What do you NOT know yet that you need to figure out?

## Group 3 — Session Intent

11. What is the very first thing you want to accomplish this session?
12. Hard constraints? (deadlines, contribution conventions, things to avoid)
13. Recurring tasks you already know about? Say "none yet" if unsure.

---

## Decision: What Structure to Create

Scope = f(Q4, Q13). Duration alone is insufficient.

### Single session
Condition: Q4 = single session AND Q13 = none.

**Contradiction:** If Q4 = single session but Q13 lists tasks — stop and say:
"You have recurring tasks but chose single-session scope. Upgrade to short-term? Confirm before proceeding."

Create only `CONTEXT.md` using minimal template:
```
## §0. Current Focus ← UPDATE THIS EVERY SESSION
Goal:
Now:
Next:

## §6. Open Questions
```
Populate §0 from Q3 + Q11. Leave §6 empty.

If Q2b = multi OR Q2c = yes: also create `WORKSPACE.md` stub. See WORKSPACE.md Structure.

---

### Short-term (few weeks, OR upgraded from single session)

Create `CONTEXT.md` (full template) + `AGENTS.md` + all four standard workflows.
If Q2b = multi OR Q2c = yes: also create `WORKSPACE.md` stub.
Do not create tool-specific files (Cursor, VSCode) or Q13 task workflows yet.

---

### Ongoing (months, OR 3+ recurring tasks regardless of Q4)

Create full structure. Only create tool-specific files for tools confirmed in Q5.

---

## Full Structure — Ongoing Projects

> Replace ALL placeholder tokens before writing any file. Placeholders use ALL-CAPS or `<angle-brackets>`.
> No generated file may contain unreplaced placeholders in any form.
> Create parent directories before files within them.

---

### Core Files (always)

**`CONTEXT.md`** at workspace root — see CONTEXT.md Structure below.
**`AGENTS.md`** at workspace root — see AGENTS.md Structure below.
**`.agentsignore`** at workspace root — see Ignore Files section below.

---

### Org-Root Additions (Q2b = multi OR Q2c = yes)

**`WORKSPACE.md`** at workspace root — see WORKSPACE.md Structure below.
Populate the Repos table from Q2b + Q2c answers. Leave Dependency Graph and Shared Contracts as TBD.

**`.cursorignore`** at workspace root — only if Cursor confirmed in Q5.

---

### Antigravity (only if confirmed in Q5)

Workflows → `.agents/workflows/` — plain markdown, NO frontmatter. Triggered by `/workflow-name`. Never auto-run.

Always create all four standard workflows using the [FILE] blocks below:
- `.agents/workflows/session-handoff.md`
- `.agents/workflows/update-context.md`
- `.agents/workflows/explore-and-capture.md`
- `.agents/workflows/update-skills.md`

Q13 tasks → `.agents/workflows/<task-name>.md`
```
# Workflow: <Task Name>
# Trigger: /<task-name>
# Purpose: <one sentence>

[steps derived from what the user described]
```

---

### Cursor (only if confirmed in Q5)

Requires `.agents/workflows/`. If Antigravity not in Q5, still create `.agents/workflows/` and all four standard workflow files.

**Rules** → `.cursor/rules/<workspace-name>-rules.mdc`
`<workspace-name>` = last path segment of Q2. E.g. `~/code/myorg-work` → `myorg-work-rules.mdc`.

```
---
description: <project name> rules
alwaysApply: true
---
[Adapt from AGENTS.md: project identity, non-negotiables, technical accuracy rules, session behavior. Not a verbatim copy.]
```

If Q2b = multi OR Q2c = yes: also create `.cursor/rules/org-topology.mdc` (alwaysApply: true).
Content: mirror the Org Topology block from AGENTS.md with YAML header prepended.

**Commands** → `.cursor/commands/` — plain markdown, NO frontmatter.
Create for each standard workflow and each Q13 task:
```
# /<command-name> - <Short Description>
<One line on when to use it.>
## Instructions
Read the workflow defined in `.agents/workflows/<task-name>.md` and execute it.
```

---

### VSCode (only if confirmed in Q5)

Multi-repo: files go in the primary repo's `.github/`. Single-repo: workspace root `.github/`.
Conflict check: before writing to `.github/`, check if the target path exists. Report conflicts, wait for confirmation.

- `.github/copilot-instructions.md` — project identity, key files, tech stack, session behavior. Adapt from AGENTS.md, not a verbatim copy.
- `.github/prompts/<task-name>.prompt.md` for each standard workflow and each Q13 task.

Format:
```
# <Task Name>
# Source of truth: .agents/workflows/<task-name>.md
Read the workflow defined in `.agents/workflows/<task-name>.md` and execute it.
```

---

## CONTEXT.md Structure

Populate from answers. Unknown → `TBD — ask [person] or check [file]`. Never guess or leave blank.

**Mappings:**
- §0 ← Q3 (goal) + Q11 (now) + Q11 as first next step
- §1 ← empty at bootstrap — populated by /explore-and-capture
- §2 ← Q6
- §3 ← Q7 + Q8 — omit entirely if solo own project
- §4 ← empty at bootstrap
- §5 ← Q12 (known constraints or conventions)
- §6 ← Q10

**§5 label by type:** OSS/GSoC → Contribution Conventions | own project → Architecture Decisions

**§1 paths:** single-repo → `path/to/file` | multi-repo → `repo-name/path/to/file`

```markdown
## §0. Current Focus ← UPDATE THIS EVERY SESSION
Goal:
Now:
Next:

## §1. Map
<!-- Entry points and key files with one-line purpose. No line numbers — use symbol names. -->
<!-- Starts empty. Populated by /explore-and-capture. -->

## §2. Stack
<!-- Language, framework, key libraries. One paragraph on data flow max. -->
<!-- Anything deeper belongs in a skill file. -->

## §3. People
<!-- Omit entirely if solo own project. -->
<!-- Maintainers, mentors, reviewers and their communication channels. -->

## §4. Settled
### Decided
<!-- Design decisions made — do not revisit. Format: decision — reason (one line). -->
<!-- Starts empty. -->
### Avoid
<!-- Rejected approaches — do not retry. Format: approach — why it failed (one line). -->
<!-- Starts empty. -->

## §5. Conventions
<!-- OSS/GSoC: PR format, branch naming, commit style, review process. -->
<!-- Own project: architecture decisions and patterns in use. -->
<!-- Seed from Q12. Enriched by /explore-and-capture over time. -->

## §6. Open Questions
<!-- Unresolved questions. Format: question — who/where to find the answer. -->
<!-- Resolved questions move to §4 or §5. Never deleted silently. -->
```

---

## AGENTS.md Structure

Project-specific rules only. No generic best practices. AGENTS.md is the rules file — no separate rules files.

```markdown
## Project Identity
<!-- What this repo is, repo URL, key people. -->

## Non-Negotiables
<!-- Hard rules that cannot be overridden. Starts empty — add as discovered. -->
<!-- Format: rule — reason (one line). -->

## Technical Accuracy Rules
<!-- What must be verified before stating. What must never be assumed. -->

## Session Behavior

At session start:
1. Read CONTEXT.md §0. Orient to current focus before anything else.
2. Check .agents/skills/ for any SKILL.md whose description matches the current task. Load it.
3. If any loaded skill has `stale: true` — warn the user before proceeding. Recommend /update-skills.

Before making changes to an unfamiliar area:
- Read 2-3 existing examples of similar functionality in the codebase first.
- Follow the patterns found, not patterns assumed.

## Org Topology
<!-- Omit this section entirely for solo single-repo projects with no sibling repos (Q2c = no). -->
Root: WORKSPACE-PATH
This repo: REPO-NAME — ONE-LINE-PURPOSE
Siblings:
  - SIBLING-NAME/ — ONE-LINE-PURPOSE [depends-on: yes/no]

Load sibling context only if [depends-on: yes] AND the current task explicitly requires cross-repo work.
Do not read sibling repos preemptively.
Source of truth is WORKSPACE.md. This block is a summary for when the org root is not in the IDE file tree.
```

**`depends-on`** = yes only if a direct dependency between repos can be inferred from Q2b/Q2c answers.
Default: no. Update after /explore-and-capture confirms actual dependencies.

---

## WORKSPACE.md Structure

Multi-repo and org-root projects only (Q2b = multi OR Q2c = yes).

```markdown
# WORKSPACE.md
# SIZE LIMIT: 150 lines. Move detail to per-repo AGENTS.md if exceeded.
# Source of truth for org topology. Per-repo AGENTS.md carries a read-only summary.
# Updated by /explore-and-capture as repos are explored.

## Repos
| Repo | Type | Purpose |
|------|------|---------|
<!-- type: service / library / cli / config / infra -->
<!-- Populate from Q2b + Q2c. -->

## Dependency Graph
<!-- Who depends on whom and what they take from each other. -->
<!-- Format: repo-a → repo-b (what a takes from b) -->
<!-- TBD — populated by /explore-and-capture. "none" is valid if repos are independent. -->

## Shared Contracts
<!-- APIs, event schemas, shared types that cross repo boundaries. -->
<!-- Format: contract-name — location (repo/path) -->
<!-- TBD — populated by /explore-and-capture. -->

## Load Protocol
1. This file: always in context for multi-repo sessions.
2. Active repo AGENTS.md: load when task is in that repo.
3. Sibling AGENTS.md: load only if dependency graph shows a link to the active repo.
4. Sibling CONTEXT.md: load only if actively modifying that repo this session.

Context pressure — drop in this order (never drop items 1, 2, or 3):
1. WORKSPACE.md ← never drop
2. Active repo AGENTS.md ← never drop
3. Active repo CONTEXT.md ← never drop
4. Sibling CONTEXT.md files ← drop first
5. Sibling AGENTS.md with depends-on: no ← drop second
6. Code files read earlier in session ← drop third
```

---

## Ignore Files

`.agentsignore` — always created at workspace root for ongoing projects.
`.cursorignore` — only if Cursor confirmed in Q5. Same content as `.agentsignore`.
Assemble from blocks below. Always include universal block. Include language blocks matching Q6 only.

```
# Universal
**/.git/  **/build/  **/.cache/
```
```
# Python (if Q6 mentions Python):
**/__pycache__/  **/*.pyc  **/*.pyo  **/.venv/  **/.env/  **/site-packages/
```
```
# Node/JS/TS (if Q6 mentions Node, JavaScript, or TypeScript):
**/node_modules/  **/*.min.js  **/*.min.css  **/.next/  **/.nuxt/
```
```
# Go (if Q6 mentions Go):
**/vendor/  **/*.pb.go  **/*_generated.go
```
```
# Rust (if Q6 mentions Rust):
**/target/
```
```
# Java/Kotlin (if Q6 mentions Java or Kotlin):
**/target/  **/*.class  **/.gradle/  **/.idea/
```

---

## .gitignore (OSS and GSoC only)

If Q1 = OSS or GSoC: append to `.gitignore` at workspace root. Create if missing. Append at end only.

```
# AI tooling — personal, not for upstream
CONTEXT.md
AGENTS.md
WORKSPACE.md
.agents/
.agentsignore
.cursorignore
```

---

## Universal File Creation Rules

| File type | Format |
|---|---|
| `.agents/workflows/*.md` | plain markdown, no frontmatter |
| `.cursor/commands/*.md` | plain markdown, no frontmatter |
| `.cursor/rules/*.mdc` | YAML frontmatter required |
| `.agents/skills/*/SKILL.md` | YAML frontmatter required |
| `.github/prompts/*.prompt.md` | plain markdown, no frontmatter |

- Never invent content — unknown → TBD
- Model-agnostic — no references to specific AI models
- No instructions requiring manual UI actions
- All placeholders replaced before writing
- Create parent directories before files

---

## [FILE: `.agents/workflows/session-handoff.md`]

```markdown
# Workflow: Session Handoff
# Trigger: /session-handoff — run at end of session. Never auto-run.

Execute ALL steps in order. Do not skip any.

**P1 — Source of truth:** Conversation beats existing CONTEXT.md on conflicts.

**P2 — Full output:** Produce complete standalone CONTEXT.md. Never a diff.
All sections §0–§6 in order. Preserve all inline annotations verbatim.

**P3 — §0:** Update Current Focus to reflect this session's work. Must change every run.

**P4 — Corrections:** Self-correct factual errors in existing CONTEXT.md without being asked.

**P5 — TBD resolution:** For each TBD, check if the conversation has the answer.
If yes: replace with verified fact. Cite `(source: path)` or `(source: conversation)`.

**P6 — TBD escalation:** Any TBD still unresolved → ensure it appears in §6 Open Questions.

**P7 — Growth:** Scan full conversation for recurring task patterns without a workflow file.
Qualifies if: performed as a distinct task 2+ times, OR user explicitly called it recurring.
Reads or mentions alone do not qualify. Must be specific, actionable, domain-specific.
For each qualifying pattern:
- Create `.agents/workflows/<task-name>.md`
- Create `.cursor/commands/<task-name>.md` if Cursor in use (check `.cursor/` exists)
- Create `.github/prompts/<task-name>.prompt.md` if VSCode in use
- No duplicates. No generic workflows.

**P8 — Staleness:** If you directly observed a live file contradicting a loaded skill this session:
Write `stale: true` to that skill's frontmatter. Do not proactively scan — flag only what you observed.

**Output order (strict):**
1. CONTEXT.md — complete
2. NEW WORKFLOWS CREATED — or "none"
3. SKILLS FLAGGED STALE — or "none"
4. CORRECTIONS MADE — or "none"
5. NEXT SESSION — one sentence on where to pick up
```

---

## [FILE: `.agents/workflows/update-context.md`]

```markdown
# Workflow: Update Context
# Trigger: /update-context — run mid-session. Never auto-run.

Execute ALL steps in order. Do not skip any.

**P1 — Source of truth:** Current message content only. Do not review full conversation history.

**P2 — Full output:** Complete standalone CONTEXT.md. Never a diff.
All sections §0–§6 in order. Preserve all inline annotations verbatim.

**P3 — §0:** Update Current Focus to reflect current state of work.

**P4 — Corrections:** Self-correct factual errors identifiable from the current message.

**P5 — TBD resolution:** Check current message for TBD answers. Replace + cite if found.

**P6 — TBD escalation:** Unresolved TBDs → ensure they appear in §6 Open Questions.

**P7 — Growth:** Scan conversation history from session start to now for recurring task patterns without a workflow file.
Qualifies if: performed as a distinct task 2+ times, OR user explicitly called it recurring.
Reads or mentions alone do not qualify. Must be specific, actionable, domain-specific.
For each qualifying pattern:
- Create `.agents/workflows/<task-name>.md`
- Create `.cursor/commands/<task-name>.md` if Cursor in use (check `.cursor/` exists)
- Create `.github/prompts/<task-name>.prompt.md` if VSCode in use
- No duplicates. No generic workflows.

**P8 — Staleness:** If you directly observed a live file contradicting a loaded skill this session:
Write `stale: true` to that skill's frontmatter. Do not proactively scan — flag only what you observed.

**Output order (strict):**
1. CONTEXT.md — complete
2. NEW WORKFLOWS CREATED — or "none"
3. SKILLS FLAGGED STALE — or "none"
4. CORRECTIONS MADE — or "none"
```

---

## [FILE: `.agents/workflows/explore-and-capture.md`]

```markdown
# Workflow: Explore and Capture
# Trigger: /explore-and-capture <repo-name>
# Purpose: Explore a repo and encode findings as a persistent skill file.
# Run once per repo. Re-run only to upgrade a sister skill to primary.
# Output: .agents/skills/<repo-name>/SKILL.md

---

## Pre-flight
Check if `.agents/skills/<repo-name>/SKILL.md` already exists.
If yes → ask: "Skill exists. Re-explore and overwrite, or run /update-skills instead?"
If no → proceed.

Read AGENTS.md Org Topology for workspace root path.
All file paths are relative to workspace root.

Ask the user: "Is this your active working repo (primary) or a sibling you depend on but won't modify today (sister)?"
- primary — full exploration: structure, architecture, conventions, public surface
- sister — lean exploration: structure and public surface only

---

## Step 1 — Structure (all types)
Read: top-level directory tree, README, entry points (main.*, index.*, cmd/, bin/, src/)
Capture:
- What this repo does — one sentence, from reading, not guessing
- Primary entry point paths
- Key directory purposes

## Step 2 — Architecture (primary only)
Read: 3–5 of the most central files identified in Step 1
Capture:
- Core abstractions: key classes, modules, interfaces
- Data flow: how a request or event moves through the system — one paragraph max
- External dependencies: databases, APIs, message queues

## Step 3 — Conventions (primary only)
Read: 2–3 examples of similar functionality in different parts of the codebase
Capture:
- Naming patterns, error handling style, test structure, import style
- Add to CONTEXT.md §5 if these override or enrich what's already there

## Step 4 — Public Surface (all types)
Read: API definitions, exported functions, event schemas, shared type definitions
Capture:
- What this repo exposes to other repos
- How to call or use it from another repo

## Step 5 — Update WORKSPACE.md (if WORKSPACE.md exists)
Add or update this repo's row in the Repos table.
If a dependency to or from another repo was found: add to Dependency Graph.
If a shared contract was found: add to Shared Contracts.
Do not overwrite existing entries — only add or correct.
Update AGENTS.md Org Topology depends-on values if dependencies were confirmed or ruled out.

## Step 6 — Write Skill
Write `.agents/skills/<repo-name>/SKILL.md`:

---
name: <repo-name>
description: Load this skill when the task involves or depends on <repo-name>. Covers: [5-word summary of what it owns].
last-verified: <today's date>
type: primary | sister
stale: false
---

## What This Repo Does
[one sentence — from reading]

## Entry Points
[paths and symbol names — no line numbers]

## Core Architecture
[primary only — omit for sister]
[key abstractions and data flow — one paragraph max]

## Conventions
[primary only — omit for sister]
[naming, error handling, test structure, import style]

## Public Surface
[always present — what this repo exposes and how to use it from another repo]

## Key Files
[symbol names and paths — no line numbers]
[format: path/to/file — what it owns]

## Gotchas
[starts empty — populated as you work in this repo]

---

## After Writing
Report:
- Skill created/updated at: path
- Type: primary / sister
- Confidence: high / medium / low (how much of the repo was readable)
- Anything that could not be found or was unclear

If confidence is low (sparse or empty repo): create the skill with what was found.
Mark sections that could not be populated as `TBD — repo too sparse to determine`.
Do not stall or skip — a minimal skill is better than none.

If WORKSPACE.md was updated: note what was added.

If this is the first explore-and-capture run in this session:
"Run /explore-and-capture for each remaining repo before starting deep work.
Start with primary, then any sisters you know you'll interact with.
You don't need all repos now — explore as you encounter them."
```

---

## [FILE: `.agents/workflows/update-skills.md`]

```markdown
# Workflow: Update Skills
# Trigger: /update-skills
# Purpose: Re-verify all skill cached facts against live repo files.
# Scope: reads across all tracked repos. Run after repo updates or when session-handoff flags stale: true.

---

## Pre-flight
Read AGENTS.md Org Topology for workspace root path.
For each repo covered by skills: check `git status`.
If any repo has merge conflicts or rebase in progress → skip that repo's skills, report it, continue.

## Discovery
List all `.agents/skills/*/SKILL.md` files.
For each skill:
- Read its `last-verified` date
- Run `git log --since=<last-verified> -- <files in Key Files section>` to check for changes
- If no tracked file changed → mark "current", skip verification, report as skipped
- If files changed → proceed to verification

## Verification (per skill needing update)
Read the Key Files section of the skill.
For each file and symbol listed:
1. Search for the symbol by name — do not rely on line numbers
2. If found with same contract → confirmed, no change needed
3. If renamed or moved → find the new location, update the entry
4. If not found after searching → mark `[UNVERIFIED — not found, possible rename or deletion]`

If >50% of a skill's key files are missing:
Flag as potentially obsolete. Report: "Skill <name> may be obsolete — recommend review or deletion."
Do not delete automatically.

## Write-back
For each skill verified or updated:
- Correct paths and symbol names in Key Files
- Update `last-verified` to today's date
- Set `stale: false`
- Add to Gotchas if new sharp edges were discovered
- Do NOT remove any skill section — only update content within sections

## Report
**UPDATED:** each skill — what changed
**SKIPPED:** each skill — reason (no changes / repo in conflict)
**UNVERIFIED:** items that could not be confirmed and why
**OBSOLETE CANDIDATES:** skills flagged for review
**GAPS:** relevant information found in repos not currently captured in any skill
```

---

## After Creating the Files

1. Show complete directory tree of everything created.
2. Show in full: `CONTEXT.md`, `AGENTS.md`.
   If Q2b = multi OR Q2c = yes: also show `WORKSPACE.md`.
3. For each Q13 workflow (beyond the four standard ones): show content and one-sentence reason it was created.
4. If Q1 = OSS or GSoC: confirm `CONTEXT.md`, `AGENTS.md`, `WORKSPACE.md`, `.agents/` appear in `.gitignore`. Add if missing.
5. Ask: "Does this match what you need, or should anything be adjusted?"
   Bootstrap is not complete until the user confirms.

6. After confirmation, say:

"Bootstrap is set up. Before starting deep work, run `/explore-and-capture` for each repo:
- Start with your primary working repo: `/explore-and-capture <repo-name>` (type: primary)
- Then any sibling repos you know you'll interact with (type: sister)
- You don't need all repos now — explore as you encounter them

This populates your skill files and fills in WORKSPACE.md's dependency graph.
Skills are your persistent codebase knowledge — the agent won't re-explore from scratch each session."

7. Once explore-and-capture has run for the primary repo: pivot immediately to Q11.
   Begin on the session goal without waiting for sibling repos to be explored.
