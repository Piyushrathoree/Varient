'use client';

import {
  forwardRef,
  useEffect,
  useState,
  type HTMLAttributes,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Avatar } from '../../foundation/avatar';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_DEFAULT } from '../../../lib/animation';

export interface TiltCardItem {
  quote: string;
  name: string;
  role?: string;
  avatarSrc?: string;
  rating?: number;
  source?: string;
}

export interface TiltCardWallProps extends HTMLAttributes<HTMLDivElement> {
  items: TiltCardItem[];
  /** Maximum rotation in degrees for the outermost cards in the fan. */
  maxRotation?: number;
  className?: string;
}

interface FanPose {
  rotate: number;
  translateY: number;
  zIndex: number;
}

function computeFanPose(index: number, total: number, maxRotation: number): FanPose {
  const center = (total - 1) / 2;
  const offset = index - center;
  const maxOffset = Math.max(center, total - 1 - center);
  const normalized = maxOffset > 0 ? offset / maxOffset : 0;

  return {
    rotate: normalized * maxRotation,
    translateY: Math.abs(offset) * 14,
    zIndex: Math.round(total - Math.abs(offset)),
  };
}

function QuoteIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-4 text-muted-foreground"
      fill="currentColor"
    >
      <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V14h3v-2.83A2.17 2.17 0 0 1 7.17 9H9V6H7.17ZM16.17 6A5.17 5.17 0 0 0 11 11.17V14h3v-2.83A2.17 2.17 0 0 1 16.17 9H18V6h-1.83Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="size-3.5 text-warning" fill="currentColor">
      <path d="M10 1.5 12.09 7.26 18.18 7.64 13.59 11.74 15.18 17.76 10 14.77 4.82 17.76 6.41 11.74 1.82 7.64 7.91 7.26 10 1.5Z" />
    </svg>
  );
}

function SourceIcon({ source }: { source: string }) {
  const normalized = source.toLowerCase();

  if (normalized.includes('product hunt')) {
    return (
      <span
        aria-hidden
        className="inline-flex size-5 items-center justify-center rounded-md bg-muted text-[10px] font-bold text-foreground"
      >
        P
      </span>
    );
  }

  if (normalized.includes('chrome')) {
    return (
      <svg aria-hidden viewBox="0 0 20 20" className="size-5" role="presentation">
        <circle cx="10" cy="10" r="8" className="fill-muted" />
        <circle cx="10" cy="10" r="3.25" className="fill-background" />
        <path d="M10 2a8 8 0 0 1 6.93 4H10V2Z" className="fill-warning" />
        <path
          d="M3.07 6A8 8 0 0 0 2 10c0 1.45.39 2.81 1.07 3.98L10 10V2.87A8.02 8.02 0 0 0 3.07 6Z"
          className="fill-success"
        />
        <path
          d="M3.07 13.98A8 8 0 0 0 10 18a8 8 0 0 0 6.93-4H10l-6.93 0Z"
          className="fill-destructive/80"
        />
      </svg>
    );
  }

  return (
    <span
      aria-hidden
      className="inline-flex size-5 items-center justify-center rounded-md bg-muted text-[9px] font-semibold text-muted-foreground"
    >
      {source.charAt(0).toUpperCase()}
    </span>
  );
}

interface WallCardProps {
  item: TiltCardItem;
  index: number;
  total: number;
  maxRotation: number;
  isFanLayout: boolean;
  isActive: boolean;
  isNeighborDimmed: boolean;
  shouldReduceMotion: boolean | null;
  onActivate: () => void;
  onDeactivate: () => void;
}

function WallCard({
  item,
  index,
  total,
  maxRotation,
  isFanLayout,
  isActive,
  isNeighborDimmed,
  shouldReduceMotion,
  onActivate,
  onDeactivate,
}: WallCardProps) {
  const fanPose = computeFanPose(index, total, maxRotation);
  const useFan = isFanLayout && total > 1;

  const restRotate = useFan ? fanPose.rotate : 0;
  const restTranslateY = useFan ? fanPose.translateY : 0;
  const restZIndex = useFan ? fanPose.zIndex : 1;

  const activeRotate = 0;
  const activeTranslateY = shouldReduceMotion ? restTranslateY : -20;
  const activeScale = shouldReduceMotion ? 1 : 1.04;
  const activeZIndex = total + 10;

  const transition = shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT;

  const handlePointerLeave = (relatedTarget: EventTarget | null, currentTarget: HTMLElement) => {
    const wall = currentTarget.closest('[role="group"]');
    if (wall?.contains(relatedTarget as Node)) return;
    onDeactivate();
  };

  return (
    <motion.article
      tabIndex={0}
      aria-label={`Review from ${item.name}`}
      onMouseEnter={onActivate}
      onMouseLeave={(event) => handlePointerLeave(event.relatedTarget, event.currentTarget)}
      onFocus={onActivate}
      onBlur={(event) => handlePointerLeave(event.relatedTarget, event.currentTarget)}
      className={cn(
        'relative w-full max-w-[19rem] shrink-0 outline-none sm:w-[19rem]',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        useFan && index > 0 && '-ml-16 sm:-ml-20',
        !useFan && 'max-sm:max-w-none',
      )}
      style={{ transformOrigin: '50% 100%', zIndex: isActive ? activeZIndex : restZIndex }}
      initial={false}
      animate={{
        rotate: isActive ? activeRotate : restRotate,
        y: isActive ? activeTranslateY : restTranslateY,
        scale: isActive ? activeScale : 1,
        opacity: isNeighborDimmed ? 0.72 : 1,
        filter: isNeighborDimmed ? 'saturate(0.85)' : 'saturate(1)',
      }}
      transition={transition}
    >
      <div
        className={cn(
          'flex h-full flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground',
          'shadow-[var(--shadow-custom)] transition-shadow duration-300 ease-out motion-reduce:transition-none',
          isActive && 'border-foreground/15 shadow-xl',
        )}
      >
        <div className="mb-4 inline-flex size-8 items-center justify-center rounded-lg bg-muted">
          <QuoteIcon />
        </div>

        <p className="flex-1 text-sm leading-relaxed text-foreground">{item.quote}</p>

        <div className="mt-5 border-t border-border pt-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar
                size="md"
                src={item.avatarSrc}
                alt={item.name}
                fallback={item.name}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
                {item.role ? (
                  <p className="truncate text-xs text-muted-foreground">{item.role}</p>
                ) : null}
              </div>
            </div>

            {(item.rating !== undefined || item.source) && (
              <div className="flex shrink-0 items-center gap-1.5">
                {item.source ? <SourceIcon source={item.source} /> : null}
                {item.rating !== undefined ? (
                  <div className="flex items-center gap-1">
                    <StarIcon />
                    <span className="text-xs font-medium text-foreground">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * A horizontal fan of testimonial cards that straighten, lift, and come
 * forward on hover or keyboard focus. Stacks vertically on small screens.
 */
export const TiltCardWall = forwardRef<HTMLDivElement, TiltCardWallProps>(
  ({ items, maxRotation = 12, className, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const [isFanLayout, setIsFanLayout] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 640px)');
      const updateLayout = () => setIsFanLayout(mediaQuery.matches);
      updateLayout();
      mediaQuery.addEventListener('change', updateLayout);
      return () => mediaQuery.removeEventListener('change', updateLayout);
    }, []);

    if (items.length === 0) {
      return (
        <div
          ref={ref}
          role="group"
          aria-label="Testimonials"
          className={cn('text-sm text-muted-foreground', className)}
          {...props}
        >
          No testimonials to display.
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Testimonials"
        className={cn(
          'flex w-full items-end justify-center',
          isFanLayout ? 'flex-row px-4 py-8' : 'flex-col items-stretch gap-4 px-0 py-2',
          className,
        )}
        onMouseLeave={() => setActiveIndex(null)}
        {...props}
      >
        {items.map((item, index) => (
          <WallCard
            key={`${item.name}-${index}`}
            item={item}
            index={index}
            total={items.length}
            maxRotation={maxRotation}
            isFanLayout={isFanLayout}
            isActive={activeIndex === index}
            isNeighborDimmed={activeIndex !== null && activeIndex !== index}
            shouldReduceMotion={shouldReduceMotion}
            onActivate={() => setActiveIndex(index)}
            onDeactivate={() => setActiveIndex((current) => (current === index ? null : current))}
          />
        ))}
      </div>
    );
  },
);

TiltCardWall.displayName = 'TiltCardWall';
