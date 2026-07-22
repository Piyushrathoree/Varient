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
- No duplicates. No generic workflows.

**P8 — Staleness:** If you directly observed a live file contradicting a loaded skill this session:
Write `stale: true` to that skill's frontmatter. Do not proactively scan — flag only what you observed.

**Output order (strict):**
1. CONTEXT.md — complete
2. NEW WORKFLOWS CREATED — or "none"
3. SKILLS FLAGGED STALE — or "none"
4. CORRECTIONS MADE — or "none"
