--- 
name: redesign-existing-projects
description: Use when upgrading an existing site or app to premium quality — auditing the current build, removing generic AI patterns, and applying high-end design standards without breaking the underlying stack.
source: https://github.com/leonxlnx/taste-skill/tree/main/skills/redesign-skill
generated: 2026-05-25T04:08:30.017Z
category: design
audience: design
---

## When to use

- Taking a working but visually generic project and bringing it up to a portfolio-grade finish
- Removing tell-tale AI-generated patterns (default fonts, weak hierarchy, missing states) without rewriting from scratch
- Upgrading typography, color, and motion within whatever framework already ships in the repo
- Auditing a live site and producing a prioritized list of targeted upgrades, not a rebuild proposal

## Key concepts

### Scan, diagnose, fix sequence

Read the codebase first — framework, styling method, current patterns. Then walk the audit and list every generic pattern, weak point, and missing state. Then apply targeted upgrades on the existing stack.

### Typography upgrade rules

Replace browser defaults and ubiquitous Inter with fonts that have character. Tighten display headlines, cap body width near 65ch, and introduce medium / semibold weights for real hierarchy.

### No rewrite from scratch

The skill is explicit: keep the existing framework, styling approach, and structural code. Only improve what's there. This is what makes it merge-safe instead of a rebuild proposal.

### Generic AI pattern detection

Default Inter at 16px, three colors of gray, full-width text columns, and missing focus rings are flagged as AI-default tells. The skill replaces them with intentional choices.

### State coverage audit

Hover, focus, active, disabled, loading, empty, and error states are inventoried. Missing states are the most common gap between a working build and a finished design.

## API reference

```
npx skills add leonxlnx/taste-skill --skill redesign-skill
```

Install the redesign-existing-projects skill.

```
npx skills add leonxlnx/taste-skill --skill redesign-skill
```

## Gotchas

- Don't rewrite the framework; the skill is intentionally merge-safe and a rewrite breaks that contract
- Replacing the default font in isolation does not redesign the page; pair it with hierarchy, color, and spacing fixes
- Adding motion without state coverage produces a 'fancy but unfinished' feel; do states first, motion second
- If the existing stack is mid-migration (e.g., partial Tailwind v3→v4), audit but don't fix until the migration lands
- Some pages are intentionally plain (docs, settings); apply the audit but lower the variance dial for those screens

---