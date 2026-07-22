## §0. Current Focus ← UPDATE THIS EVERY SESSION
Goal: Varient — the best modern **universal (React Native + Web)** animation-first UI library. Copy-paste DX, one-click Web⇄Native switch, top-tier design + animation. Inspirations: Aceternity, MagicUI, Vengeance. (This supersedes the older web-only framing in DESIGN.md/AGENTS.md/SKILL.md and the RN-only pivot in plan.md — see §4.)
Now (2026-07-03): Universal spike is BUILT and code-complete. `apps/mobile` (Expo SDK 57 + NativeWind v4), TS token bridge (`packages/ui/src/tokens`), NumberTicker ported to native (Reanimated 4), 4-identity theme-switch demo in `apps/mobile/App.tsx`. Web side already strong: 4-identity theme engine (`themes.css`), marketing site, 3 web components (Button, Input, NumberTicker). Web + mobile **typecheck PASS**. The hard blocker — NativeWind v4 needs Tailwind v3 while web runs Tailwind v4 — is **SOLVED in code**: `apps/mobile/scripts/fix-nativewind-tailwind.cjs` junctions the app-local `tailwindcss@3` into `node_modules/nativewind` (self-heals from `metro.config.js` + postinstall).

⚠️ RESUME HERE — the ONLY unverified step is the final Android bundle / device run. It was NOT machine-verified here because the WSL `/mnt/a` mount is pathologically slow (bun install stalled in disk-wait). **Run it on Windows PowerShell** (see memory `dev-on-windows-powershell-not-wsl` + `apps/mobile/README.md`):
```
cd A:\Codebase\OSS\stelth-ui-lib\Varient ; bun install ; cd apps\mobile ; npx expo start   # QR via Expo Go
# headless bundle check: npx expo export --platform android
# if the tailwind link is missing: node apps\mobile\scripts\fix-nativewind-tailwind.cjs
```
Next (after the run is confirmed green): port ~8–10 signature ANIMATED components to BOTH platforms (Marquee, Border Beam, Shimmer Button, Meteors, Spotlight, …) — animation-first, not foundation-first. Then docs Web/Native switcher + Expo kitchensink. Also pending: reconcile DESIGN.md/AGENTS.md/SKILL.md to the universal direction (still web-only).

## §1. Map
<!-- Entry points and key files with one-line purpose. No line numbers — use symbol names. -->

DESIGN.md — single source of truth: component specs, prop APIs, visual specs, build checklist
AGENTS.md — agent rules: non-negotiables, technical accuracy, session behaviour
CONTEXT.md — this file: current focus, stack, decisions, open questions
README.md — project overview, dev commands, monorepo structure
package.json — root scripts (dev, build, types:check via turbo) + Bun workspaces
turbo.json — Turborepo task pipeline
bun.lock — Bun lockfile

packages/ui/src/index.ts — WEB barrel export (DOM components)
packages/ui/src/native.ts — NATIVE barrel (@varient/ui/native) — universal components only
packages/ui/src/tokens/index.ts — TS token SOURCE OF TRUTH for native (identities + identityCssVars); mirrors themes.css
packages/ui/src/lib/utils.ts — cn() utility (clsx + tailwind-merge) — works on both platforms
packages/ui/src/styles/globals.css — web design tokens (CSS custom properties + @theme for Tailwind v4)
packages/ui/src/styles/themes.css — 4-identity theme engine (Studio/Void/Paper/Aurora), web
packages/ui/src/components/foundation/button/ — Button component (web only so far)
packages/ui/src/components/foundation/input/ — Input component (web only so far)
packages/ui/src/components/animated/number-ticker/ — types.ts (shared API) + number-ticker.tsx (web) + number-ticker.native.tsx (native)
packages/ui/src/components/sections/ — Layer 3 components (empty)
apps/mobile/ — Expo SDK 57 demo/kitchensink app (NativeWind v4, Reanimated 4); App.tsx = universal spike screen
bunfig.toml — linker="hoisted" (React Native/Metro require a hoisted node_modules)

apps/docs/app/page.tsx — marketing landing page (via app/(home)/page.tsx)
apps/docs/app/docs/ — Fumadocs documentation routes
apps/docs/content/docs/ — MDX documentation content
apps/docs/lib/source.ts — Fumadocs content loader
apps/docs/source.config.ts — Fumadocs MDX collection config

## §2. Stack
**Universal architecture — one component API, two renderers.** Metro resolves `component.native.tsx` on native; web bundlers resolve `component.tsx`. NOT react-native-web for the web target (it can't do backdrop-filter/blend-modes/shaders — would make web animations worse than Aceternity/MagicUI).

- **Web:** Next.js 16 (App Router, Turbopack) · Tailwind CSS v4 · Framer Motion (`motion/react`) · Radix UI (foundation a11y) · Fumadocs (docs).
- **Native:** Expo SDK 57 (New Architecture) · React Native 0.86 · React 19.2 · NativeWind v4.2.6 (Tailwind v3 — bridge, see §4) · Reanimated 4 + react-native-worklets · (Skia planned for drawn FX: beams, meteors, particles).
- **Shared:** TypeScript strict (no `any`) · `cn()` (clsx + tailwind-merge) · design tokens single-sourced in `packages/ui/src/tokens/index.ts` · Lucide (react / react-native) · Changesets · **Bun workspaces with `linker="hoisted"`**.

Monorepo layout: `apps/docs` (Next.js site + docs, pure web) + `apps/mobile` (Expo demo/kitchensink) + `packages/ui` (universal component library). Copy-paste DX — users own the code, no per-component installs.

## §4. Settled
### Decided (2026-07-03)
- **Direction: universal (RN + Web), animation-first.** Supersedes plan.md's RN-only pivot AND the web-only framing still written in DESIGN.md/AGENTS.md/SKILL.md (those docs need a rewrite pass).
- **Architecture: one API, two renderers** — `component.tsx` (web, full power) + `component.native.tsx` (native), shared `types.ts` for the props contract. Metro does platform resolution. No react-native-web for web.
- **Native styling: NativeWind v4.2.6 + Tailwind v3 as a tracked bridge**; web stays Tailwind v4. Token VALUES single-sourced in `packages/ui/src/tokens/index.ts`; native applies them via NativeWind `vars()` at runtime. Migrate to NativeWind v5 (Tailwind v4) when it ships stable/RC (research: v5-preview not production-ready — deprecated `vars()`, no validated SDK-57 combo). **Resolves R1.**
- **Bun works for Expo — with `linker="hoisted"` in bunfig.toml.** RN/Metro/Babel need a hoisted node_modules. **Resolves R2.**
- **Native animation: Reanimated 4** (+ react-native-worklets; `babel-preset-expo` auto-injects the plugin) for motion; **Skia** for drawn effects (planned).
- **Build order: signature animated components first**, foundation grows as demos need it (the moat is the theme engine + animation, not a Button).

### Avoid
- **react-native-web as the web renderer** — kills web-only FX (backdrop-filter, blend modes, WebGL); web must stay hand-tuned.
- **NativeWind v5-preview in production** — not ready (2026-07); revisit at stable/RC.
- **Foundation-first grind** — don't chase the 75-count before the differentiator (theme engine × animation × universal) is shown off.

## §5. Contribution Conventions
<!-- Source of truth: DESIGN.md. Do not deviate without updating DESIGN.md first. -->
- Commit format: `type(scope): description` — types: `feat` / `fix` / `docs` / `refactor` / `chore` / `test`
- Prop naming: `isDisabled` not `disabled`, `isLoading` not `loading`, `isOpen` not `open`
- Design tokens only: `--brand-500` not `#6366f1`, semantic names not raw Tailwind slate/zinc
- `cn()` for all className merging — import from `@/lib/utils`, never concatenate classes directly
- Never import shadcn defaults — Varient has its own color system and token names
- Every component must pass DESIGN.md §10 build checklist before merge

## §6. Open Questions
- **Docs Web/Native switcher** — how to render both targets per component page (web live preview + native device-frame / Expo Snack). Core DX feature.
- **CLI / registry per-platform files** — how `npx varient add <c>` copies `.tsx` + `.native.tsx` + shared `types.ts` + tokens.
- **Token codegen** — `tokens/index.ts` and `themes.css` are hand-synced today; add TS→CSS generation so there's one true source.
- **iOS on WSL** — no iOS simulator here; dev = Android emulator + Expo Go on device, EAS cloud for iOS builds. (Constraint, not a blocker.)
- Live playground implementation (DESIGN.md §9) — needed for animated components on both platforms.
- Changesets release workflow for a Bun monorepo — check changesets.guide.
- ~~R1 NativeWind v5/TW4 maturity~~ / ~~R2 Bun vs pnpm for Expo~~ — **resolved, see §4.**
