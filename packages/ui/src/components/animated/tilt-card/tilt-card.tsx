'use client';

import {
  forwardRef,
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_SNAPPY } from '../../../lib/animation';
import { useFinePointer } from '../../../lib/use-fine-pointer';

export interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Maximum tilt angle in degrees on each axis. */
  maxTilt?: number;
  /** Scale applied while the pointer is over the card. */
  scale?: number;
  /** Whether the moving specular glare overlay is shown. */
  isGlareEnabled?: boolean;
  /** CSS perspective distance in pixels. */
  perspective?: number;
  /** Specular glare color, as a valid `oklch()`/`color-mix()` etc. CSS color value. */
  glareColor?: string;
}

const springConfig = {
  duration: SPRING_SNAPPY.duration,
  bounce: SPRING_SNAPPY.bounce,
};

/**
 * Single-card 3D tilt container — pointer position drives rotateX/Y via
 * spring-smoothed motion values. Optional glare overlay tracks the pointer.
 * Under `prefers-reduced-motion` renders a static card with hover shadow only.
 */
export const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  (
    {
      children,
      maxTilt = 12,
      scale = 1.02,
      isGlareEnabled = true,
      perspective = 800,
      glareColor = 'oklch(100% 0 0 / 0.28)',
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const isFinePointer = useFinePointer();

    const rawRotateX = useMotionValue(0);
    const rawRotateY = useMotionValue(0);
    const rawScale = useMotionValue(1);
    const glareX = useMotionValue(50);
    const glareY = useMotionValue(50);
    const glareOpacity = useMotionValue(0);

    const rotateX = useSpring(rawRotateX, springConfig);
    const rotateY = useSpring(rawRotateY, springConfig);
    const cardScale = useSpring(rawScale, springConfig);
    const smoothGlareOpacity = useSpring(glareOpacity, springConfig);

    const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, var(--tilt-glare-color, ${glareColor}) 0%, transparent 55%)`;

    const isEnabled = isFinePointer && !shouldReduceMotion;

    useEffect(() => {
      const node = nodeRef.current;
      if (!node || !isEnabled) return;

      const resetTilt = () => {
        rawRotateX.set(0);
        rawRotateY.set(0);
        rawScale.set(1);
        glareOpacity.set(0);
        glareX.set(50);
        glareY.set(50);
      };

      const handlePointerMove = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const xPct = (event.clientX - centerX) / (rect.width / 2);
        const yPct = (event.clientY - centerY) / (rect.height / 2);

        rawRotateX.set(-yPct * maxTilt);
        rawRotateY.set(xPct * maxTilt);
        rawScale.set(scale);

        if (isGlareEnabled) {
          const localX = ((event.clientX - rect.left) / rect.width) * 100;
          const localY = ((event.clientY - rect.top) / rect.height) * 100;
          glareX.set(localX);
          glareY.set(localY);
          glareOpacity.set(1);
        }
      };

      const handlePointerLeave = () => {
        resetTilt();
      };

      node.addEventListener('pointermove', handlePointerMove);
      node.addEventListener('pointerleave', handlePointerLeave);

      return () => {
        node.removeEventListener('pointermove', handlePointerMove);
        node.removeEventListener('pointerleave', handlePointerLeave);
        resetTilt();
      };
    }, [
      isEnabled,
      isGlareEnabled,
      maxTilt,
      scale,
      rawRotateX,
      rawRotateY,
      rawScale,
      glareOpacity,
      glareX,
      glareY,
    ]);

    const setRefs = (node: HTMLDivElement | null) => {
      nodeRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    if (!isEnabled) {
      return (
        <div
          ref={setRefs}
          className={cn(
            'transition-shadow duration-300 ease-out motion-reduce:transition-none',
            'hover:shadow-xl',
            className,
          )}
          style={style}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={setRefs}
        className={cn('relative [perspective:var(--tilt-perspective)]', className)}
        style={
          {
            ...style,
            '--tilt-perspective': `${perspective}px`,
            '--tilt-glare-color': glareColor,
          } as CSSProperties
        }
        {...props}
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d] will-change-transform"
          style={{
            rotateX,
            rotateY,
            scale: cardScale,
          }}
        >
          {children}
          {isGlareEnabled ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
              style={{
                opacity: smoothGlareOpacity,
                background: glareBackground,
              }}
            />
          ) : null}
        </motion.div>
      </div>
    );
  },
);

TiltCard.displayName = 'TiltCard';
