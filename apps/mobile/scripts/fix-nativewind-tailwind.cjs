/**
 * Bridges NativeWind (Tailwind v3 only) to this app's Tailwind v3 install
 * in a repo where the WEB workspaces intentionally use Tailwind v4.
 *
 * Why this is needed:
 * - Bun's hoisted linker puts `nativewind` in the ROOT node_modules (no
 *   version conflict on nativewind itself — only apps/mobile depends on it).
 * - It nests `tailwindcss` locally in apps/mobile/node_modules because that
 *   IS a real conflict (web wants v4, this app needs v3).
 * - NativeWind's own source does plain Node `require("tailwindcss/...")`
 *   calls — including from a `child_process.fork()`'d worker it uses to run
 *   the Tailwind v3 CLI — that resolve relative to NativeWind's OWN
 *   location on disk, not this app's. Node's module resolution walks up
 *   from root/node_modules/nativewind and finds root/node_modules/tailwindcss
 *   (the web's v4) first, throwing "NativeWind only supports Tailwind CSS v3".
 *
 * Fix: symlink this app's local tailwindcss v3 into nativewind's own
 * node_modules/, so it's the first thing Node resolves — in every process,
 * including NativeWind's forked CLI worker. This never touches the web's
 * Tailwind v4 install and only affects the native app's own dependency tree.
 *
 * Invoked two ways (both idempotent):
 * - `postinstall` in package.json, so a fresh `bun install` sets it up.
 * - At the top of `metro.config.js`, BEFORE `require('nativewind/metro')`,
 *   so it self-heals even if the postinstall was skipped (e.g. Bun's
 *   "no changes" fast path) or the link was clobbered.
 */
const fs = require('fs');
const path = require('path');

function linkTailwindForNativeWind() {
  const mobileRoot = path.resolve(__dirname, '..');
  const workspaceRoot = path.resolve(mobileRoot, '..', '..');

  const nativewindDir = path.join(workspaceRoot, 'node_modules', 'nativewind');
  const localTailwind = path.join(mobileRoot, 'node_modules', 'tailwindcss');
  const linkDir = path.join(nativewindDir, 'node_modules');
  const linkPath = path.join(linkDir, 'tailwindcss');

  if (!fs.existsSync(nativewindDir)) {
    // nativewind isn't installed (e.g. partial/CI install) — nothing to do.
    return false;
  }
  if (!fs.existsSync(localTailwind)) {
    console.warn(
      '[fix-nativewind-tailwind] apps/mobile/node_modules/tailwindcss not found — skipping. ' +
        'NativeWind will likely fail to resolve Tailwind v3.'
    );
    return false;
  }

  const isWin = process.platform === 'win32';
  // Windows junctions need an ABSOLUTE target and don't require admin / Dev Mode;
  // POSIX directory symlinks use a relative target.
  const target = isWin ? localTailwind : path.relative(linkDir, localTailwind);
  const linkType = isWin ? 'junction' : 'dir';

  // If the link already resolves to the right place, do nothing (quiet Metro startup).
  try {
    if (
      fs.existsSync(linkPath) &&
      fs.realpathSync(linkPath) === fs.realpathSync(localTailwind)
    ) {
      return true;
    }
  } catch {
    // not present / broken — fall through to (re)create
  }

  fs.mkdirSync(linkDir, { recursive: true });
  try {
    fs.rmSync(linkPath, { recursive: true, force: true });
  } catch {
    // ignore
  }
  fs.symlinkSync(target, linkPath, linkType);
  console.log(
    `[fix-nativewind-tailwind] linked ${path.relative(
      workspaceRoot,
      linkPath
    )} -> ${path.relative(workspaceRoot, localTailwind)}`
  );
  return true;
}

module.exports = { linkTailwindForNativeWind };

// Allow running directly: `node scripts/fix-nativewind-tailwind.cjs` (postinstall).
if (require.main === module) {
  linkTailwindForNativeWind();
}
