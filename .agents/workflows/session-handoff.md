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
- No duplicates. No generic workflows.

**P8 — Staleness:** If you directly observed a live file contradicting a loaded skill this session:
Write `stale: true` to that skill's frontmatter. Do not proactively scan — flag only what you observed.

**Output order (strict):**
1. CONTEXT.md — complete
2. NEW WORKFLOWS CREATED — or "none"
3. SKILLS FLAGGED STALE — or "none"
4. CORRECTIONS MADE — or "none"
5. NEXT SESSION — one sentence on where to pick up
