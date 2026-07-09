'use client';

import { forwardRef, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION, EASE_OUT } from '../../../lib/animation';

export type AvatarCirclesSize = 'sm' | 'md' | 'lg';

export interface AvatarCircleItem {
  src?: string;
  alt?: string;
  /** Initials shown when `src` is missing or fails to load. */
  fallback?: string;
}

export interface AvatarCirclesProps {
  /** Avatar entries rendered left-to-right with overlap. */
  avatars: AvatarCircleItem[];
  /** Maximum avatars shown before a `+N` overflow chip. Default 5. */
  maxVisible?: number;
  size?: AvatarCirclesSize;
  className?: string;
}

const SIZE_CLASSES: Record<
  AvatarCirclesSize,
  { circle: string; text: string; overlap: string; chip: string }
> = {
  sm: {
    circle: 'size-8 text-[10px]',
    text: 'text-[10px]',
    overlap: '-ml-2.5',
    chip: 'size-8',
  },
  md: {
    circle: 'size-10 text-xs',
    text: 'text-xs',
    overlap: '-ml-3',
    chip: 'size-10',
  },
  lg: {
    circle: 'size-12 text-sm',
    text: 'text-sm',
    overlap: '-ml-3.5',
    chip: 'size-12',
  },
};

const STAGGER_SECONDS = 0.08;

function AvatarCircle({
  item,
  size,
  index,
  shouldReduceMotion,
  isInView,
}: {
  item: AvatarCircleItem;
  size: AvatarCirclesSize;
  index: number;
  shouldReduceMotion: boolean;
  isInView: boolean;
}) {
  const sizeClasses = SIZE_CLASSES[size];
  const initials =
    item.fallback ??
    (item.alt
      ? item.alt
          .split(' ')
          .map((part) => part[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
      : '?');

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.6 },
        animate: isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 },
        transition: {
          duration: DURATION.default,
          ease: EASE_OUT,
          delay: index * STAGGER_SECONDS,
        },
      };

  return (
    <motion.div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-full ring-2 ring-background',
        sizeClasses.circle,
        index > 0 && sizeClasses.overlap,
      )}
      {...motionProps}
    >
      {item.src ? (
        <img
          src={item.src}
          alt={item.alt ?? initials}
          className="size-full object-cover"
        />
      ) : (
        <span
          className={cn(
            'flex size-full items-center justify-center bg-muted font-medium text-muted-foreground',
            sizeClasses.text,
          )}
          aria-hidden={Boolean(item.alt)}
        >
          {initials}
        </span>
      )}
    </motion.div>
  );
}

/**
 * Overlapping avatar row with ring-background borders and staggered pop-in.
 * Shows a `+N` chip when `avatars` exceeds `maxVisible`. Under
 * `prefers-reduced-motion` all avatars render immediately with no scale animation.
 */
export const AvatarCircles = forwardRef<HTMLDivElement, AvatarCirclesProps>(
  ({ avatars, maxVisible = 5, size = 'md', className }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion() ?? false;
    const isInView = useInView(localRef, { once: true, margin: '-40px' });

    const setRef = (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const visibleAvatars = avatars.slice(0, maxVisible);
    const overflowCount = Math.max(0, avatars.length - maxVisible);
    const sizeClasses = SIZE_CLASSES[size];

    const chipMotionProps = shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, scale: 0.6 },
          animate: isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 },
          transition: {
            duration: DURATION.default,
            ease: EASE_OUT,
            delay: visibleAvatars.length * STAGGER_SECONDS,
          },
        };

    return (
      <div
        ref={setRef}
        className={cn('flex items-center', className)}
        role="group"
        aria-label={
          overflowCount > 0
            ? `${avatars.length} people, showing ${visibleAvatars.length}`
            : `${avatars.length} people`
        }
      >
        {visibleAvatars.map((avatar, index) => (
          <AvatarCircle
            key={`${avatar.src ?? avatar.fallback ?? avatar.alt ?? 'avatar'}-${index}`}
            item={avatar}
            size={size}
            index={index}
            shouldReduceMotion={shouldReduceMotion}
            isInView={shouldReduceMotion || isInView}
          />
        ))}

        {overflowCount > 0 ? (
          <motion.div
            className={cn(
              'relative flex shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground ring-2 ring-background',
              sizeClasses.chip,
              sizeClasses.text,
              visibleAvatars.length > 0 && sizeClasses.overlap,
            )}
            {...chipMotionProps}
            aria-hidden="true"
          >
            +{overflowCount}
          </motion.div>
        ) : null}
      </div>
    );
  },
);

AvatarCircles.displayName = 'AvatarCircles';
