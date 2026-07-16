/**
 * Deterministic pseudo-random in [0, 1) from an integer seed — SSR-stable, so
 * server and client render identical "random" layouts (meteor positions,
 * particle seeds) without hydration mismatches.
 */
export function seededUnit(seed: number): number {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}
