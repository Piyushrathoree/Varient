'use client';

import { forwardRef, useState, type ReactNode, type RefObject } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_DEFAULT } from '../../../lib/animation';

export interface FloatingNavbarItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface FloatingNavbarCta {
  label: string;
  href: string;
}

export interface FloatingNavbarProps {
  items: FloatingNavbarItem[];
  cta?: FloatingNavbarCta;
  className?: string;
  /** When set, scroll direction is tracked on this element instead of the window. */
  scrollContainerRef?: RefObject<HTMLElement | null>;
  /** When false, uses absolute positioning for in-frame demos. Default true. */
  isFixed?: boolean;
}

const ctaStyles = cn(
  'ml-1 inline-flex h-9 shrink-0 items-center justify-center rounded-md px-4 text-sm font-medium',
  'border-[0.5px] border-white/25 bg-gradient-to-b from-brand to-brand-secondary text-white',
  'shadow-black/20 shadow-md ring-1 ring-(--ring-color)',
  '[--ring-color:color-mix(in_oklab,var(--color-foreground)_15%,var(--color-brand))]',
  'transition-transform duration-150 ease-out active:scale-[0.97]',
  'hover:from-brand-secondary hover:to-brand-secondary',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
);

const linkStyles = cn(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground',
  'transition-colors hover:text-foreground',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
);

/**
 * Floating pill navbar that hides on scroll down and reveals on scroll up.
 * Under `prefers-reduced-motion` the bar stays visible with no hide/show animation.
 */
export const FloatingNavbar = forwardRef<HTMLElement, FloatingNavbarProps>(
  ({ items, cta, className, scrollContainerRef, isFixed = true }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const [isHidden, setIsHidden] = useState(false);

    const { scrollY } = useScroll({
      container: scrollContainerRef,
    });

    useMotionValueEvent(scrollY, 'change', (latest) => {
      if (prefersReducedMotion) return;

      const previous = scrollY.getPrevious() ?? 0;

      if (latest > previous && latest > 80) {
        setIsHidden(true);
      } else if (latest < previous) {
        setIsHidden(false);
      }
    });

    const positioning = isFixed ? 'fixed' : 'absolute';

    return (
      <motion.nav
        ref={ref}
        aria-label="Main navigation"
        className={cn(
          positioning,
          'top-4 inset-x-0 z-50 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center gap-0.5',
          'rounded-full border border-border bg-background/80 px-4 py-2.5 sm:px-6',
          'shadow-[var(--shadow-custom)] backdrop-blur-xl',
          className,
        )}
        initial={false}
        animate={
          prefersReducedMotion
            ? { y: '0%', opacity: 1 }
            : {
                y: isHidden ? '-100%' : '0%',
                opacity: isHidden ? 0 : 1,
              }
        }
        transition={prefersReducedMotion ? { duration: 0 } : SPRING_DEFAULT}
      >
        <div className="flex flex-wrap items-center justify-center gap-0.5">
          {items.map((item) => (
            <a key={`${item.href}-${item.label}`} href={item.href} className={linkStyles}>
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        {cta ? (
          <a href={cta.href} className={ctaStyles}>
            {cta.label}
          </a>
        ) : null}
      </motion.nav>
    );
  },
);

FloatingNavbar.displayName = 'FloatingNavbar';
