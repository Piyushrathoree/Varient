import type { Transition } from 'motion/react';

/**
 * Single motion signature — SmoothUI-style: a snappy, no-overshoot ease
 * (see PORT-SPEC.md). The old per-identity signature table (void/paper/
 * studio/aurora, each with its own duration/curve) is gone along with the
 * 4-identity engine; there's one register now, for both light and dark.
 */
export const motionSignature: Transition = {
  duration: 0.175,
  ease: [0.4, 0, 0.2, 1],
};

/** Slightly longer variant for larger/slower movements (hero, page transitions). */
export const motionSignatureSlow: Transition = {
  duration: 0.22,
  ease: [0.4, 0, 0.2, 1],
};

export function getMotionSignature(slow = false): Transition {
  return slow ? motionSignatureSlow : motionSignature;
}
