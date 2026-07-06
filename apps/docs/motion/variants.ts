import type { Variants } from 'motion/react';

/** Stagger a group of children in on viewport entry — fires once, never on scroll-back. */
export const staggerContainer = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] } },
};

/** Card lift on hover — pair with a per-theme shadow/border transition in className. */
export const cardHover = {
  rest: { y: 0 },
  hover: { y: -4 },
};

/** Button press feedback — used across every interactive primitive. */
export const pressScale = {
  rest: { scale: 1 },
  pressed: { scale: 0.97 },
};

/** Viewport config shared by scroll-reveal sections — trigger once, generous margin. */
export const viewportOnce = { once: true, margin: '-80px' } as const;

/** Reduced-motion-safe variants — instant opacity swap only, transform never triggers. */
export const reducedMotionFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};
