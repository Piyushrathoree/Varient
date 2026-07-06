# Varient — Core Plan: "shadcn for Mobile" (React Native, Universal Native + Web)

> **Status:** Proposed pivot / strategic plan
> **Date:** 2026-07-02
> **Author:** Piyush
> **One-line thesis:** Varient becomes the **mobile-first, copy-paste React Native component library** — "shadcn/ui for mobile" — shipping components that work on **iOS, Android, and Web** from one codebase, with the same "you own the code" DX that made shadcn dominant on web.

---

## 0. TL;DR — What this plan decides

- Varient's current direction (web-only React + Radix + Framer Motion + Tailwind v4) is **crowded and late** on web. The real underserved gap is **React Native**.
- The idea is **already proven to have demand** (React Native Reusables has **8.4k stars**, gluestack is commercially backed) but **the space is wide open for a better-executed, more complete competitor** — especially one that ships the things RNR/gluestack explicitly lack: a real **Animated layer**, **mobile-native patterns** (bottom sheets, haptics, tab bars, action sheets), and **Sections**.
- React Native is **technically very different** from React web (no DOM, different primitives, no CSS cascade, flexbox-default, native threads, gesture-driven). This plan maps every current Varient dependency to its RN equivalent.
- We go **universal**: one codebase targeting iOS + Android + Web via **Expo + react-native-web + NativeWind + React Aria + Reanimated**. Both native and web, as requested.
- This is a **stack rebuild**, not a tweak. Radix (web-only) and Framer Motion (web-first) do not carry over. The keepers are: TypeScript strict, the copy-paste/registry DX, design-token philosophy, the three-layer architecture (Foundation / Animated / Sections), and `cn()`.

---

## 1. The Idea

**Varient = shadcn/ui, but mobile-native first, and universal.**

Today Varient is positioned as a web React component library (Foundation / Animated / Sections, 75 components, copy-paste). This plan refocuses the product:

- **Primary surface: React Native** (iOS + Android via Expo).
- **Secondary surface: Web** — the *same* components render on web through `react-native-web`, so a team gets one design system across mobile app + marketing site + web admin.
- **DX unchanged in spirit:** users visit docs, copy the code (or run `npx varient add <component>`), paste into their Expo project, and own it. No runtime npm dependency on "varient" itself — the code lives in their repo.
- **Mobile-native, not "web components squeezed onto a phone."** Components are designed around touch, gestures, bottom sheets, haptics, safe areas, the software keyboard, and platform conventions — the things web libraries get wrong on mobile.

### 1.1 Why "shadcn for mobile" specifically

shadcn/ui's win wasn't components — it was a **philosophy**: copy-paste, you own the code, Radix for a11y, Tailwind for styling, tokens for theming. That philosophy is **portable**. On web it's saturated (shadcn, Radix, HeroUI, Mantine, Chakra, Aceternity, Magic UI, Untitled UI React...). On mobile, the same philosophy has only **two serious direct ports** and they're incomplete. That asymmetry is the opportunity.

---

## 2. Idea Validation — Does this make sense?

**Yes, with high confidence.** Evidence:

1. **Demand is proven.** React Native Reusables (the most direct shadcn→RN port) sits at **~8.4k GitHub stars / 302 forks / 1.2k commits** as of mid-2026 — organic, no big company behind it originally (Zach Nugent / founded-labs). That's strong grassroots traction for an incomplete library.

2. **The market is asking for it.** Active Reddit threads: *"Why are there no popular alternative to shadcn [for RN]?"* (r/reactnative) and *"What UI libraries do you use. Is Shadcn viable for React Native?"* — i.e. developers want this and feel underserved.

3. **Commercial validation exists.** gluestack (by GeekyAnts, the former NativeBase team, 15+ yrs RN, 600+ clients) bet their company on the same "copy-paste, NativeWind, universal" model and ships a paid ecosystem around it (AppLaunchKit, starter kits, MCP server, Figma kit). Where there's a commercial layer, there's a real market.

4. **The web shadcn flywheel is mobile-relevant.** Teams that use shadcn on their web app *want their mobile app to match*. Today they cobble together RNR + NativeWind manually. A polished, opinionated, complete library that "matches shadcn mental model on mobile" is the exact thing those teams reach for.

5. **RN is healthy and modernizing.** New Architecture (Fabric + TurboModules + JSI) is **default since Expo SDK 53**; Expo SDK 55 stable / SDK 56 beta (mid-2026) ship **stable SwiftUI + Jetpack Compose native primitives** via Expo UI. The platform is investing hard in native feel — exactly Varient's angle.

### 2.1 The honest risk

The space is **not empty** (see §3). We are not first. We win only by being **more complete + more polished + better animated + better documented** than RNR, and **more copy-paste-pure / less lock-in** than gluestack/Tamagui. If we ship another half-finished "30 components, no animation" library, we lose. Execution, not novelty, is the moat.

---

## 3. Is it already there? — Competitor Landscape (full list)

**Yes, the idea exists.** Below is every meaningful player, grouped by category, with positioning, stack, license, and — critically — **gaps Varient can exploit**.

### 3.1 Direct shadcn→RN ports (the real competition)

| Library | Stars / Status | Stack | License | What it is | Gap for Varient |
|---|---|---|---|---|---|
| **React Native Reusables** (founded-labs, ex mrzachnugent) | ~8.4k★, 302 forks, 12 releases, very active | Expo + NativeWind/Uniwind + own `rn-primitives` (Radix-style headless) + TypeScript, pnpm+turbo monorepo, has its own `packages/registry` | MIT | The canonical shadcn-for-RN. Same component names, copy-paste, Web/Native switcher in docs, universal. AI-agent-first (ships `.claude/.codex/.cursor/.gemini` + `.mcp.json`). | **Self-admits "limited advanced features — complex charts & animations need extra libraries."** No real Animated layer. No Sections. This is Varient's wedge. |
| **NativeCN UI** (Mobilecn-UI) | active, smaller | Expo + NativeWind + TypeScript | MIT | "Zero dependencies, zero lock-in" shadcn-inspired RN components. 40+ (Avatar, Badge, Button, Card, Checkbox, Dialog, Input, Progress, Radio Group, Skeleton, Switch, Tabs, Toast, Dropdown, Select…). | Smaller community, no animation layer, no universal web story emphasized, narrower catalog. |

### 3.2 Universal libraries (shared web + native code) — heavier, more opinionated

| Library | Backing | Stack | Model | Gap for Varient |
|---|---|---|---|---|
| **gluestack** (v2) | **GeekyAnts** (NativeBase team) — commercial, strongest competitor | React + RN + NativeWind + Tailwind, React Aria foundation, universal Next.js + Expo | Copy-paste components/patterns/screens; **MCP server** for AI codegen; Kitchensink demo app; **Figma design kit**; `LLMs.txt`/`LLMs-full.txt` (AI-friendly); paid AppLaunchKit + starter kits | **Heavier / less shadcn-purist**, "no pre-designed theme — you build branding from scratch," some advanced components (date/time pickers) still missing. Varient can be lighter + opinionated + pre-designed-token-first. |
| **Tamagui** | OSS, community | React + RN + **optimizing compiler** (flattens styles to native at build time), TypeScript | Universal kit, **framework not copy-paste** — you commit to the Tamagui design system | Different philosophy (framework lock-in vs copy-paste). Steep learning curve (community reports "disaster" DX vs gluestack). Varient stays copy-paste-pure. |

### 3.3 Foundation / starter layer (not full libraries — we'd build *on top*)

- **NativeWind** — Tailwind CSS for React Native. The styling foundation under RNR, NativeCN, gluestack. **This becomes Varient's styling layer** (see §6).
- **expo-nativewind-template** — full Expo starter (routing + dark mode + components). Reference for our starter.
- **shadcn.io React Native category** — catalog/directory. Discovery channel, not a competitor.

### 3.4 Traditional React Native UI libraries (NOT shadcn-style — npm-install, themed, dated)

These validate the market size but are **not the copy-paste philosophy** and are mostly aging:

| Library | Notes |
|---|---|
| **NativeBase** | The original giant. **Officially dead** — support stopped, users told to migrate to gluestack. $199 bundle. Its death created the opening RNR/gluestack filled. |
| **React Native Paper** | Material Design, MIT, well-maintained. **Material-bound** — hard to rebrand, not copy-paste, not shadcn-like. |
| **React Native Elements** | ~30 components, OSS classic. Updates slowed, look dated, less flexible. |
| **UI Kitten** | Eva Design System, runtime theming, light/dark. Hefty bundle, hard to customize away from Eva. |
| **react-native-ui-lib** (Wix) | Huge feature set, Wix-backed. Install/dependency pain, iOS keyboard bugs, dated aesthetics, complex docs. |
| **Ant Design Mobile** | 60+ components, enterprise, i18n. Conservative/rigid theming, dated look, weak TS. |
| **Nachos UI** | Lightweight, MVP-friendly. Tiny community, iOS-biased, thin docs. |

**Read of the field:** the old guard (NativeBase/Elements/UI Kitten/Paper/ui-lib/Ant) is npm-install + themed + aging. The new guard (RNR, NativeCN, gluestack, Tamagui) is copy-paste + NativeWind + universal. **Varient joins the new guard and aims to be the most complete of them.**

### 3.5 Where Varient sits (target positioning)

```
                    copy-paste / you-own-the-code
                              ▲
                              │
      React Native Reusables ●  ← direct rival, incomplete
      NativeCN UI            ●  ← direct rival, smaller
      Varient (target)       ★  ← complete: Foundation + Animated + Sections, universal
                              │
   lock-in / framework ●Tamagui
                              │
              npm-install ●NativeBase(dead) ●Paper ●Elements ●ui-lib ●UI Kitten ●Ant Mobile
                              │
                              ▼
                    install + theme-bound
```

**The wedge:** RNR is the benchmark. RNR has *Foundation* but no *Animated* and no *Sections*, and admits it. Varient's existing 3-layer plan (Foundation / Animated / Sections) — re-targeted to RN with Reanimated/Moti + gesture-driven mobile patterns + full-screen mobile blocks — is *exactly* the gap.

---

## 4. How does this make sense? (Strategic case)

1. **Asymmetry of competition.** Web shadcn-space: 10+ mature players. RN shadcn-space: 2 real ports, both incomplete. Same philosophy, 1/5th the competition.
2. **Varient's architecture already maps.** Foundation→Foundation (RN primitives), Animated→Animated (Reanimated/Moti), Sections→Sections (mobile screens). The 3-layer idea is *more* valuable on mobile, where "a finished settings screen" or "a finished onboarding flow" saves more time than a button.
3. **Mobile-native patterns are hard and undersupplied.** Bottom sheets, haptics, pull-to-refresh, swipeable lists, tab bars with native feel, action sheets, keyboard-aware forms, safe-area handling — these are where RNR/gluestack are thin and where a polished library earns adoption.
4. **Universal = compounding leverage.** One design system across the app (iOS/Android) *and* the web marketing/admin surface is a story only gluestack/Tamagui tell, and they're either heavy or framework-locked. A light, copy-paste, token-driven universal library is a clean lane.
5. **AI-native DX is now table stakes.** RNR ships agent configs + MCP; gluestack ships an MCP server + `LLMs.txt`. Varient should ship `LLMs.txt`, a registry, and an MCP server from day one — copy-paste + AI = the 2026 DX bar.

---

## 5. React Native vs React Web — the technical differences (deep)

This is the core "what's different" section. Building a component library for RN is **not** "web components on a phone." Almost every layer changes.

### 5.1 No DOM — different primitives

| Web (current Varient) | React Native (new Varient) |
|---|---|
| `<div>`, `<span>`, `<button>`, `<input>`, `<img>`, `<ul>/<li>`, `<a>` | `<View>`, `<Text>`, `<Pressable>`/`<TouchableOpacity>`, `<TextInput>`, `<Image>`, `<FlatList>`/`<SectionList>`, `<Link>` (Expo Router) |
| Text can live anywhere | **All text must be inside `<Text>`** — bare text in a `<View>` throws. This reshapes every component's markup. |
| `<select>`, native dropdowns | No native select — build from `<Pressable>` + bottom sheet / list. |
| `<dialog>`, `<details>` | `<Modal>`, custom bottom sheets (e.g. `@gorhom/bottom-sheet`). |

### 5.2 Styling — no CSS cascade, no DOM

- **No CSS.** Styling is `StyleSheet.create()` + inline `style` props, compiled to native style objects. **NativeWind** brings Tailwind utility classes to RN (maps `className` → native styles at build/runtime). This is Varient's bridge — keeps the Tailwind mental model.
- **No cascade, no pseudo-classes the web way.** No `:hover`, `:focus`, `:active` selectors on native. Interactive states are handled in JS (`onPressIn`/`onPressOut`, `isFocused`, `isPressed`). NativeWind polyfills *some* (`active:` works via state; `hover:` is **web-only**).
- **No native CSS custom properties.** Varient's current token system (`--brand-500` CSS vars in `globals.css`) **does not work as-is on native.** Tokens must move to NativeWind's theme config (`tailwind.config` / `@theme`-equivalent for NW) and/or a JS theme object. **This is the biggest migration task.** (See §8.2.)
- **Layout = flexbox only (Yoga engine).** `flexDirection` **defaults to `column`** on RN (web defaults `row`) — a classic footgun. CSS Grid support is minimal/absent. No `display:grid` in component layouts.

### 5.3 Interaction — touch & gesture, not mouse

- **Touch-first:** `onPress`, `onPressIn`, `onPressOut`, `onLongPress`. **No hover, no right-click, no context menu** on native (hover is web-only).
- **Gestures** (swipe, pan, pinch, double-tap) need **React Native Gesture Handler** — there's no DOM pointer events equivalent.
- **Haptics** (`Haptics.impactAsync`) — a native-only affordance web can't do. Big mobile-UX differentiator; should be wired into pressable components.
- **Keyboard:** software keyboard + `KeyboardAvoidingView`; no physical-keyboard focus model on phones (though iPad/external keyboards exist). Web `:focus-visible` tabs ≠ mobile.

### 5.4 Navigation & routing

- **No `<a>` / URL routing by default.** Use **React Navigation** or, modern standard, **Expo Router** (file-based, Next.js-like, works on native + web).
- Navigators (Stack / Tabs / Drawer) replace routes. Deep linking / URLs come via Expo Router. This affects any "link" component and the Sections layer (screens are routes).

### 5.5 Overlays & portals

- **No DOM portals.** Overlays need `react-native-portal` / `Modal` primitives, or `@gorhom/bottom-sheet`. Tooltips/popovers need manual positioning + React Native Aria's `useOverlayPosition`. Z-index + absolute positioning instead of portal stacking.

### 5.6 Platform specifics (the "native feel" work)

- **SafeAreaView** (notches, home indicator), **StatusBar**, dynamic islands.
- **Platform-specific UI:** iOS Action Sheets vs Android dialogs; material ripple vs iOS highlight; blur effects (`@react-native-community/blur`). `Platform.OS` + `.ios.tsx`/`.android.tsx`/`.web.tsx` file extensions for platform code.
- **Keyboard handling, permissions, image pickers, camera, biometrics** — all native modules (expo-* packages).
- **Fonts/assets:** `expo-font` + `useFonts()`; `<Image source={require()}>` not `<img src>`. No `public/` served the same way.

### 5.7 Performance & threads

- **Two threads:** JS thread vs UI (native) thread. Heavy JS work during interaction = jank.
- **New Architecture** (Fabric renderer + TurboModules + JSI) — **default in Expo since SDK 53** — removes the old bridge, enables synchronous native calls, better layout. Varient targets New Arch.
- **Animation must run on the UI thread** to stay 60fps → that's what **Reanimated 3 worklets** do. JS-thread animations jank. This is *why* Framer Motion (JS-thread, web-first) is the wrong tool on native.

### 5.8 Accessibility — different API, same goal

- Web: `aria-*` attributes, `role`, keyboard focus, `:focus-visible`.
- RN: `accessibilityRole`, `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `accessibilityLiveRegion`. Screen readers = **VoiceOver (iOS)** + **TalkBack (Android)**.
- **The unifier: React Aria (Adobe).** It's a hooks library that outputs the *correct* platform accessibility props on each target (ARIA on web, RN a11y props on native). This is the **Radix replacement** (Radix is web-only; React Aria is universal). React Native ARIA (GeekyAnts) is the older RN-specific flavor; modern React Aria itself now spans platforms.

### 5.9 Animation — the stack swap

| Web (current) | RN (new) |
|---|---|
| Framer Motion (`motion/react`) — JS-thread, declarative, great web DX | **Reanimated 3** (`react-native-reanimated`) — UI-thread worklets, 60fps, integrates with Gesture Handler. The RN standard. |
| — | **Moti** — Framer Motion-*like* declarative API (`<MotiView from={{opacity:0}} animate={{opacity:1}}/>`) built *on top of* Reanimated. Best DX bridge from Framer Motion habits. |
| `useReducedMotion()` (Framer) | `useReducedMotion()` (Moti/Reanimated support it) — **non-negotiable per AGENTS.md, keep it.** |

> **Note:** Framer Motion *has* a React Native build but "lacks advanced features like layout animations and gesture handlers available on web" and is JS-thread — not suitable as the primary RN animation engine. **Primary: Reanimated 3 + Gesture Handler. Optional DX sugar: Moti.**

### 5.10 Build / deploy / distribution

| Web | RN |
|---|---|
| `next dev` / Vercel deploy, instant | **Expo** (`npx expo start`), **EAS Build** (native binaries), **EAS Update** (OTA JS updates), App Store / Play Store submission. Web target via `react-native-web` (can still deploy to Vercel). |
| Hot reload everywhere | Fast Refresh; native changes need rebuild (or EAS Update for JS-only). |

### 5.11 One-table summary: current dep → RN equivalent

| Concern | Current (web) | New (RN universal) | Verdict |
|---|---|---|---|
| Runtime | React DOM | React Native + `react-native-web` (web target) | **Swap** |
| Primitives/a11y | **Radix UI** (web-only) | **React Aria** (universal) or `rn-primitives`-style | **Swap** |
| Styling | Tailwind v4 (CSS) | **NativeWind** (Tailwind for RN) | **Adapt** (v5 for TW v4) |
| Tokens | CSS custom props in `globals.css` | NativeWind theme config + JS theme object | **Migrate** |
| Animation | Framer Motion | **Reanimated 3 + Gesture Handler** (+ Moti) | **Swap** |
| Class merge | `cn()` (clsx + tailwind-merge) | `cn()` (clsx + tailwind-merge) — **works in NW** | **Keep** |
| Icons | `lucide-react` | `lucide-react-native` | **Adapt** |
| Routing | (none / React Router) | **Expo Router** (universal) | **Add** |
| Docs site | Fumadocs (Next.js) | Fumadocs (Next.js) — keep web docs | **Keep** |
| Monorepo | Bun workspaces + Turbo | pnpm/Turbo or Bun + Turbo | **Keep/Adapt** |
| Versioning | Changesets | Changesets | **Keep** |
| TS strict, no `any` | ✓ | ✓ | **Keep** |
| Copy-paste / registry | planned | `components.json` + `registry.json` + `npx varient add` | **Build** |
| Prop naming (`isDisabled` etc.) | ✓ | ✓ | **Keep** |

---

## 6. Universal (Native + Web) Architecture

User requirement: **both native and web.** Three viable patterns; we pick the first.

### 6.1 Pattern A — RN-first universal (RECOMMENDED)

Write every component in **React Native primitives** (`View`, `Text`, `Pressable`…) styled with **NativeWind**. Render on web via **`react-native-web`** (View→`<div>`, Text→`<span>`). Expo supports the web target natively.

- **Pros:** True single codebase. This is the proven model (gluestack, RNR both do this). One component, three platforms. Token system + class names shared everywhere.
- **Cons:** Web output is `react-native-web` DOM (slightly heavier than hand-tuned HTML; some web-specific a11y/SEO nuances). Acceptable for app/admin surfaces; for the *marketing/docs* site we keep pure Next.js (Fumadocs).
- **Routing:** **Expo Router** (file-based, native + web). Replaces Solito for new projects.

### 6.2 Pattern B — Solito (Next.js + React Navigation bridge)

Shares *screens* between Next.js (web) and React Navigation (native). Older; Expo Router has largely superseded it for greenfield. **Not recommended** — adds complexity for no gain over Expo Router.

### 6.3 Pattern C — Dual codebases, shared tokens only

Maintain a web component set (Radix/Framer) *and* a native set (React Aria/Reanimated), sharing only design tokens. **Rejected** — doubles maintenance, defeats "one design system," and the user explicitly wants both from one effort.

### 6.4 Recommended universal stack (concrete)

```
Expo (SDK 55/56, New Architecture) ──┐
Expo Router (file-based, native+web) │
react-native-web (web target)        │  → one codebase → iOS / Android / Web
NativeWind v5 (Tailwind v4)          │
React Aria (universal a11y hooks)    │
Reanimated 3 + Gesture Handler       │
Moti (declarative animation DX)      │
@gorhom/bottom-sheet (sheets)        │
lucide-react-native (icons)          │
expo-haptics, expo-font, expo-image  │
┘
Docs: Next.js + Fumadocs (pure web, stays as-is)
Distribution: shadcn-style registry + `npx varient add` + MCP server + LLMs.txt
```

---

## 7. What I Need to Implement It (the build requirements)

### 7.1 Tooling & environment

- **Node.js 20+**, **Expo CLI** (`npx create-expo-app`), **EAS CLI** (`eas build/update/submit`).
- **Simulators:** iOS Simulator (requires macOS/Xcode) + Android Emulator (Android Studio). Web via browser. **Note:** iOS builds require a Mac or EAS cloud build — flag for dev environment.
- **Monorepo:** keep `apps/` + `packages/`. Add `apps/mobile` (Expo app + Kitchensink/demo) alongside `apps/docs`. `packages/ui` becomes the RN universal component package; `packages/registry` for the copy-paste registry.
- **Package manager:** RNR uses pnpm+Turbo; Varient currently uses Bun+Turbo. **Verify Bun's Expo/NativeWind support** — if friction, switch the RN workspace to pnpm. (Decision point, see §10.)

### 7.2 The token migration (highest-effort, highest-risk item)

Current tokens live as **CSS custom properties** in `packages/ui/src/styles/globals.css` + Tailwind v4 `@theme`. On native there are **no CSS custom properties**. Plan:

1. Define tokens as a **source-of-truth JS/TS theme object** (colors `brand-500`, radii, spacing, typography — keep the `--brand-500` *names* as keys).
2. Feed that object into **NativeWind's theme config** so `bg-brand-500` resolves on native.
3. For web, generate the CSS custom properties from the *same* source object (so the web docs / `react-native-web` output match native exactly).
4. Keep semantic naming (`--brand-500` not `#6366f1`, semantic not raw slate/zinc) — **AGENTS.md non-negotiable, preserved.**
5. **`cn()` stays** (clsx + tailwind-merge) — works inside NativeWind.

### 7.3 Primitive / accessibility layer

- Adopt **React Aria** as the headless layer (replaces Radix). It gives universal hooks (useButton, useSelect, useCheckbox, useDialog, useTooltip, useOverlayPosition, useTabs…) that emit correct a11y props per platform.
- For overlays/portals: `@gorhom/bottom-sheet` + a Portal primitive (React Native ARIA's `OverlayContainer` or `react-native-portal`).
- Build a thin `varient-primitives` package mirroring the Radix component shape teams already know (Dialog, Select, Popover, Tabs, Tooltip, Checkbox, Switch, RadioGroup) but backed by React Aria + RN.

### 7.4 Animation layer (Layer 2)

- **Reanimated 3** + **Gesture Handler** as the engine (UI-thread, 60fps).
- **Moti** for declarative, Framer-Motion-like component APIs (lower the learning curve, matches Varient's existing Animated DX).
- **`useReducedMotion()` everywhere** (non-negotiable per AGENTS.md).
- Live playground for every Layer 2 component (DESIGN.md §13) — on RN this means an interactive demo in the Expo app + web playground in docs.

### 7.5 Mobile-native component catalog (Foundation + mobile patterns)

Beyond shadcn-parity components, ship the **mobile-native** ones RNR/gluestack underdeliver:

- **shadcn-parity (Foundation):** Button, Input, Textarea, Label, Badge, Avatar, Card, Checkbox, Switch, RadioGroup, Select, Tabs, Dialog, Tooltip, Popover, Progress, Skeleton, Separator, Slider, Toast, Dropdown/Menu, Accordion, Alert.
- **Mobile-native (the wedge):** **Bottom Sheet** (gorhom), **Action Sheet** (iOS-style), **Tab Bar** (native-feel bottom nav), **Navbar/Header** (safe-area aware), **Floating Action Button**, **List / Swipeable Row**, **Pull-to-refresh list**, **Segmented Control**, **Chip/Tag input**, **Stepper**, **Keyboard-aware Form field**, **Calendar/DateTimePicker**, **Pin/OTP input**, **Image picker avatar**, **Skeleton shimmer**, **Haptic-enabled pressables**, **Toast (swipe-to-dismiss)**.
- **Layer 3 — Sections (mobile screens):** Onboarding flow, Auth (login/signup/OTP), Settings screen, Profile, Empty states, Error states, Mobile dashboard, Chat list, Feed card, Checkout/cart — composed from Layer 1 + 2 (never duplicate logic, per AGENTS.md).

### 7.6 Copy-paste distribution (registry + CLI)

- **`components.json`** + **`registry.json`** at repo root (shadcn-compatible schema so `npx shadcn@latest add` *and* our own `npx varient add` both work).
- CLI resolves dependencies (a component pulls its `cn()`, tokens, primitive) and writes files into the user's Expo project at their configured paths.
- **MCP server** (like gluestack's) so AI agents generate Varient components type-safely.
- **`LLMs.txt` / `LLMs-full.txt`** so agents can ingest the whole catalog.
- Users **own the code** — no `varient` runtime dep required.

### 7.7 Docs & demo

- Keep **Fumadocs (Next.js)** for the docs site (pure web).
- Add an **Expo Kitchensink app** (`apps/mobile`) — a real RN app demoing every component, scannable via Expo Go QR (like gluestack). This is the #1 trust signal for a mobile library.
- **Web/Native switcher** in docs (RNR has this) — show the same component on both targets.

### 7.8 Quality gates (preserve from AGENTS.md)

- TypeScript strict, zero `any`.
- `isDisabled`/`isLoading`/`isOpen` prop naming contract.
- Design tokens only (semantic, not raw colors).
- `cn()` for all className merging.
- Every Layer 2 component ships `useReducedMotion()`.
- DESIGN.md §10 build checklist passes before a component is "complete."
- **New:** every interactive component wired to **haptics** (configurable, reducible) + correct **VoiceOver/TalkBack** labels (via React Aria).

---

## 8. Migration Path from Current Varient

The repo is early (only Button + Input built). This is a **clean rebuild of `packages/ui`, not a migration of many components.**

### 8.1 Keep as-is
- Monorepo shape (`apps/` + `packages/`), Turbo, TypeScript strict, Changesets.
- `cn()` utility (clsx + tailwind-merge).
- Three-layer architecture concept (Foundation / Animated / Sections) and the 75-component ambition.
- Prop-naming contract, token-only rule, `useReducedMotion` rule, build checklist.
- Docs site (Fumadocs/Next.js) — stays pure web.

### 8.2 Replace / rebuild
- `packages/ui` runtime: React DOM → React Native + `react-native-web`.
- Radix → React Aria (+ `varient-primitives`).
- Framer Motion → Reanimated 3 + Gesture Handler (+ Moti).
- Tailwind v4 CSS → NativeWind (v5 for Tailwind v4 alignment).
- Token source: CSS vars → JS theme object → emits both NativeWind theme + web CSS vars.
- `lucide-react` → `lucide-react-native`.

### 8.3 Add new
- `apps/mobile` (Expo + Expo Router Kitchensink app).
- `packages/registry` + `components.json` + `varient` CLI.
- MCP server + `LLMs.txt`.
- Mobile-native components (§7.5) and Sections (§7.5).
- Platform-specific file extensions (`.ios.tsx`/`.android.tsx`/`.web.tsx`) where needed.

### 8.4 Suggested phasing
1. **Foundation rebuild:** Expo workspace, NativeWind, token migration, React Aria primitives, Button + Input in RN, Kitchensink shell, registry/CLI MVP, `LLMs.txt`.
2. **Foundation breadth:** ship the shadcn-parity set + key mobile-native (Bottom Sheet, Tab Bar, Action Sheet, Haptic pressable).
3. **Animated layer:** Reanimated/Moti components with live playground, `useReducedMotion`.
4. **Sections:** mobile screen blocks composed from 1+2.
5. **Polish & distribution:** MCP server, Figma kit (optional), starter template, EAS demo, launch.

---

## 9. Risks & Open Questions

| # | Risk / Question | Mitigation / Next step |
|---|---|---|
| R1 | **NativeWind + Tailwind v4 maturity.** NativeWind v4 is stable on Tailwind v3; **v5 brings Tailwind v4 support and is still settling** (migration friction reported). Varient already uses Tailwind v4. | Decide: target **NativeWind v5 (TW v4)** for token alignment *if* stable enough, else ship on **NativeWind v4 (TW v3)** and migrate later. **Verify before building.** This is the single biggest technical risk. |
| R2 | **Bun vs pnpm for Expo.** Varient uses Bun; RNR uses pnpm. Expo/NativeWind tooling is best-validated on pnpm. | Test a Bun-based Expo+NativeWind workspace; switch to pnpm if friction. |
| R3 | **iOS build requires macOS** (or EAS cloud). Dev environment constraint. | Use EAS Build for iOS if no Mac; document in README. |
| R4 | **react-native-web output quality** for the web target (SEO/a11y nuances vs pure HTML). | Use RN-web for *app/admin* surfaces; keep marketing/docs as pure Next.js. |
| R5 | **We are not first** — RNR has 8.4k★ and momentum. | Win on completeness (Animated + Sections + mobile patterns), polish, and docs/Kitchensink — not novelty. |
| R6 | **React Aria vs building rn-primitives** — React Aria is powerful but hook-heavy (more code per component than Radix). | Start with React Aria; extract a `varient-primitives` shape that feels Radix-familiar to users. |
| R7 | **Scope creep** — 75 components across 3 layers on 3 platforms is large. | Phase strictly (§8.4); ship Foundation MVP first. |
| Q1 | Does the registry use the **shadcn CLI schema directly** (interchangeable) or a custom `varient` CLI? | Recommend shadcn-compatible schema + custom CLI alias. |
| Q2 | Should Layer 2 standardize on **Reanimated** (max power) or **Moti** (DX) as the user-facing API? | Recommend Moti for declarative APIs, Reanimated under the hood for complex gestures. |
| Q3 | Figma design kit — build now or later? | Later (Phase 5); not blocking. |

---

## 10. Immediate Next Actions (to start)

1. **Decide R1** — spike NativeWind v5 + Tailwind v4 in a throwaway Expo app; confirm token-to-NativeWind-theme flow works. This de-risks the whole plan.
2. **Decide R2** — confirm Bun vs pnpm for the Expo workspace.
3. Scaffold `apps/mobile` (Expo + Expo Router + NativeWind) and a minimal `packages/ui` RN build with migrated Button.
4. Stand up the Kitchensink shell + Expo Go QR.
5. Wire `components.json` + `registry.json` + `npx varient add` MVP + `LLMs.txt`.
6. Update `CONTEXT.md §0` and `DESIGN.md` to reflect the RN-universal pivot once the spike passes.

---

## 11. Sources (research basis, July 2026)

- AdminLTE — *7 Best shadcn/ui Mobile Templates 2026* (RNR, NativeCN, expo-nativewind-template, NativeWind, Tamagui, gluestack, shadcn.io RN category).
- DEV Community (Nina Rao) — *Top React Native UI libraries in 2026* (gluestack, NativeBase, Paper, Elements, UI Kitten, ui-lib, Ant Mobile, Nachos).
- LogRocket — *10 best React Native UI libraries of 2026*; *Headless UI alternatives: Radix vs React Aria vs Ark UI vs Base UI*.
- gluestack.io — product/stack (GeekyAnts, NativeWind, MCP server, Kitchensink, LLMs.txt, Figma kit, AppLaunchKit).
- React Native Reusables — GitHub (8.4k★, `rn-primitives`, `packages/registry`, agent configs, MCP) + allshadcn review (limitations: advanced charts/animations need extra libs).
- React Native ARIA (GeekyAnts) docs — universal a11y hooks approach (React Aria on web → RN a11y props on native).
- npm-compare / PkgPulse / F22 Labs — animation stack (Reanimated v3 UI-thread worklets, Moti as Framer-Motion-like DX, Framer Motion RN limitations).
- shadcn/ui docs — `components.json`, `registry.json`, `npx shadcn add`, GitHub-as-registry.
- Expo changelog — SDK 53 (New Arch default), SDK 55 (stable, mid-2026), SDK 56 beta (stable SwiftUI/Compose primitives via Expo UI).
- NativeWind docs/discussions — v4 stable (Tailwind v3), v5 bringing Tailwind v4 (migration in progress).
- r/reactnative — "Why are there no popular alternative to shadcn?" + "Is Shadcn viable for React Native?" (demand signal).
