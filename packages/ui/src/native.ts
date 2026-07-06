/**
 * Native barrel — import surface for React Native apps (`@varient/ui/native`).
 *
 * Only universal components appear here. Web-only components (Button, Input —
 * DOM implementations) join as they gain `.native.tsx` counterparts; the main
 * `index.ts` barrel stays web-only until then. Metro resolves each component's
 * `.native.tsx` file automatically.
 */
export { cn } from './lib/utils';
export { NumberTicker } from './components/animated/number-ticker';
export type { NumberTickerProps } from './components/animated/number-ticker/types';
