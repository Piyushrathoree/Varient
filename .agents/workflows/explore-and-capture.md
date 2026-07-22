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
