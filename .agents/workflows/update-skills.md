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
