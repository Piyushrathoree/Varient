// Metro config for a Bun-workspace monorepo + NativeWind.
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Point NativeWind at this app's local Tailwind v3 BEFORE requiring
// nativewind/metro (which reads tailwindcss/package.json at module load and
// throws on the web's hoisted v4). Self-heals if the postinstall was skipped.
// See scripts/fix-nativewind-tailwind.cjs for the full rationale.
require('./scripts/fix-nativewind-tailwind.cjs').linkTailwindForNativeWind();

const { withNativeWind } = require('nativewind/metro');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the whole monorepo so changes in packages/ui hot-reload.
config.watchFolders = [workspaceRoot];

// Resolve deps from the app first, then the hoisted root node_modules.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = withNativeWind(config, { input: './global.css' });
