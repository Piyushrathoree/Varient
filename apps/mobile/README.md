# @varient/mobile

The universal spike: proves that **one token source** (`packages/ui/src/tokens/index.ts`) and **one component API** — a `.tsx` for web, a `.native.tsx` for native, same props — can drive a real Expo app and the Next.js docs site from the same design system. The demo screen switches between the four Varient theme identities (Studio, Void, Paper, Aurora) and runs a `NumberTicker` animated on Reanimated's UI thread.

## Prerequisites

- Node 20+
- Bun 1.3+
- For device testing, one of:
  - **Android** — Android Studio with an emulator configured, or the [Expo Go](https://expo.dev/go) app on a physical Android phone.
  - **iOS** — there is no macOS in this setup (Windows/WSL2), so Xcode/the iOS Simulator aren't available. Use **Expo Go on a physical iPhone**, or an **EAS cloud build** (`eas build --platform ios`) for anything beyond what Expo Go supports.

## Install

From the **repo root**:

```bash
bun install
```

Two things make this work that are easy to miss on a fresh clone:

- Root `bunfig.toml` sets `linker = "hoisted"` — Metro/Babel expect a flat, npm-style `node_modules`, which Bun's default isolated layout doesn't provide.
- `apps/mobile/scripts/fix-nativewind-tailwind.cjs` bridges NativeWind to this app's local Tailwind v3 (see **Stack note** below). It runs automatically as a `postinstall` after `bun install`, and again at the top of `metro.config.js` on every `expo start` / `expo export`, so it self-heals even if the postinstall was skipped. It's idempotent (a no-op once linked) and needs no admin rights on Windows.

## Run

```bash
cd apps/mobile

npx expo start              # scan the QR code with Expo Go (iOS or Android)
npx expo start --android    # launch on an Android emulator
npx expo start --web        # run in a browser via react-native-web
```

## Verify the bundle (no device needed)

```bash
cd apps/mobile
npx expo export --platform android
```

Succeeds when it prints `Exported: dist` and writes a bundle to `dist/_expo/static/js/android/*.hbc`.

## Stack note

- **NativeWind v4 + Tailwind v3** on native — a tracked bridge, not the end state. Web intentionally stays on **Tailwind v4** (the `@theme`-based engine in `packages/ui/src/styles/globals.css` / `themes.css`); the two coexist via Bun's hoisting (web's v4 at the repo root, this app's v3 nested locally) plus the postinstall fix above, which points NativeWind's own module resolution (including its forked Tailwind CLI process) at the local v3 instead of the hoisted v4.
- Migrate native to **NativeWind v5** once it's stable and drop the bridge.
- Tokens are single-sourced in `packages/ui/src/tokens/index.ts` — never duplicate identity colors/radii in `tailwind.config.js`, only map semantic names to CSS vars there.
