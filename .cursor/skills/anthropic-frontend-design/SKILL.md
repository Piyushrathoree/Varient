---
name: anthropic-frontend-design
description: "Use when building or styling a frontend interface with Anthropic's official design skill so the result has a clear aesthetic direction instead of generic agent UI."
source: https://github.com/anthropics/skills/tree/main/skills/frontend-design
generated: 2026-05-25T02:43:49.724Z
category: design
audience: creators
---

## When to use

- Turning a brief for a landing page, dashboard, component, poster, or web artifact into working frontend code
- Choosing a deliberate visual direction before styling a UI
- Pushing an agent-generated interface past default fonts, purple gradients, and cookie-cutter component layouts
- Matching implementation detail to the intended design treatment, from restrained minimalism to maximalist motion

## Key concepts

### Design thinking before coding

The skill starts with purpose, audience, tone, technical constraints, and differentiation. It asks the agent to choose an aesthetic direction before implementation so the code has a coherent point of view.

### Bold aesthetic direction

Frontend work should commit to a specific direction such as editorial, industrial, playful, brutalist, refined, or retro-futuristic. The skill values intentional execution over a uniformly safe default.

### Frontend design pillars

Typography, color, motion, spatial composition, backgrounds, and fine visual details are treated as design inputs. The skill expects choices across those pillars to work together rather than being applied as isolated decoration.

### Working production code

The output is not a static moodboard. The skill is for implemented HTML, CSS, JavaScript, React, Vue, or similar UI code that remains functional while carrying stronger visual craft.

### Complexity matched to vision

A maximalist screen may need richer motion and layered treatments, while a refined minimal screen needs spacing, type, and restraint. The skill explicitly rejects adding elaborate effects when the design direction does not need them.

### Generic AI aesthetic avoidance

The source calls out overused font families, predictable component arrangements, and cliched color treatments as failure modes. Differentiation must come from the product context, not a repeated template.

## API reference

```
npx skills add https://github.com/anthropics/skills --skill frontend-design
```

Install Anthropic's official frontend-design skill without pulling unrelated skills from the repository.

```
npx skills add https://github.com/anthropics/skills --skill frontend-design
```

```
frontend brief: purpose + audience + constraints + differentiation
```

The input shape the skill uses to choose a design direction before implementation.

```
Build a dense incident dashboard for on-call engineers. Keep it keyboard-friendly, fast to scan, and visually distinct from a marketing landing page.
```

## Gotchas

- The skill pushes for distinctive design; it still needs product context so visual ambition does not fight the user's job
- It is a design and implementation guide, not a replacement for accessibility, performance, or framework-specific review
- A strong aesthetic direction is not permission to ship broken flows or placeholder-only UI
- Restraint is part of the skill: minimal screens should not accumulate effects just to look different
- Existing brand systems and component libraries should constrain the design direction when they already exist

---