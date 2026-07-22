---
name: impeccable
description: Use when designing, redesigning, or polishing any frontend interface so the agent works against committed design choices, sub-command flows, and project context instead of generic AI defaults.
source: https://github.com/pbakaus/impeccable
generated: 2026-05-25T04:08:24.240Z
category: concept
audience: design
---

## When to use

- Producing real working frontend code that has a committed point of view, not template-grade output
- Auditing a UI for visual hierarchy, information architecture, cognitive load, and accessibility gaps
- Tightening typography, spacing, color, and motion across an interface so it reads as designed work
- Live iteration on UI elements with a sub-command flow (craft, shape, audit, polish, distill)

## Key concepts

### Context handshake

Before any design or edit, the skill loads PRODUCT.md and DESIGN.md via a context loader, then loads the register (brand vs product) and the matching sub-command reference. Skipping these produces project-blind output.

### Sub-commands as reference loads

Commands like craft, shape, audit, polish each load their own reference file. Running `craft` without `craft.md` loaded skips the shape-and-confirm step the user expects.

### Anthropic frontend-design lineage

Impeccable is licensed under Apache 2.0 and explicitly based on Anthropic's frontend-design skill, extended with per-project context loading and a sub-command system.

### Real working code only

Outputs are production-grade code with committed design choices — not mockups, not pseudo-components, not 'this should be a button.' Exceptional craft is the bar.

### Comprehensive surface coverage

Covers visual hierarchy, IA, cognitive load, accessibility, performance, responsive behavior, theming, motion, micro-interactions, UX copy, error states, edge cases, i18n, and design tokens — in one skill.

## API reference

```
npx skills add pbakaus/impeccable
```

Install the impeccable frontend-design skill.

```
npx skills add pbakaus/impeccable
```

```
npx impeccable craft | shape | audit | polish | distill <target>
```

Run a specific sub-command flow; each loads its own reference and expectation contract.

```
npx impeccable craft components/Pricing.tsx
```

## Gotchas

- Skipping the context load (PRODUCT.md / DESIGN.md) makes the output project-blind; never skip the loader
- Sub-commands without their reference file load behave like the skill is half-installed; load each one explicitly
- Not suitable for backend-only tasks; the skill refuses non-UI work to keep its sharpness
- Outputs are real code, so they must compile — review imports and stack before merging, not after
- Override paths via IMPECCABLE_CONTEXT_DIR when context files live outside project root or .agents/context/

---