'use client';

import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_SNAPPY } from '../../../lib/animation';

const DEFAULT_ICON_SIZE = 44;
const DEFAULT_MAGNIFICATION = 72;
const DEFAULT_DISTANCE = 140;

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

interface DockContextValue {
  mouseX: MotionValue<number>;
  isEnabled: boolean;
  iconSize: number;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextValue | null>(null);

function useDockContext(component: string) {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error(`${component} must be rendered inside a <Dock>.`);
  }
  return context;
}

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
>;

export interface DockProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Base icon size in pixels when the pointer is far away. */
  iconSize?: number;
  /** Peak icon size in pixels at the cursor focal point. */
  magnification?: number;
  /** Horizontal influence radius in pixels. */
  distance?: number;
}

export const Dock = forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_ICON_SIZE,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion() ?? false;
    const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
    const isEnabled = !shouldReduceMotion;

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(event);
      if (!event.defaultPrevented && isEnabled) {
        mouseX.set(event.pageX);
      }
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(event);
      if (!event.defaultPrevented && isEnabled) {
        mouseX.set(Number.POSITIVE_INFINITY);
      }
    };

    const dockChildren = Children.map(children, (child) => {
      if (!isValidElement(child)) return child;
      return cloneElement(child as ReactElement<DockIconProps>, {
        iconSize,
        magnification,
        distance,
      });
    });

    return (
      <DockContext.Provider
        value={{ mouseX, isEnabled, iconSize, magnification, distance }}
      >
        <div
          ref={ref}
          className={cn(
            'mx-auto flex h-16 items-end gap-2 rounded-2xl border border-border bg-card/80 px-3 pb-2 backdrop-blur-xl',
            className,
          )}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          role="toolbar"
          {...props}
        >
          {dockChildren}
        </div>
      </DockContext.Provider>
    );
  },
);

Dock.displayName = 'Dock';

export interface DockIconProps extends NativeButtonProps {
  children: ReactNode;
  /** Tooltip / accessible name — also used as `title` when collapsed. */
  label?: string;
  /** Override context icon size. */
  iconSize?: number;
  /** Override context magnification. */
  magnification?: number;
  /** Override context distance. */
  distance?: number;
}

export const DockIcon = forwardRef<HTMLButtonElement, DockIconProps>(
  (
    {
      className,
      children,
      label,
      iconSize: iconSizeProp,
      magnification: magnificationProp,
      distance: distanceProp,
      style,
      title,
      ...props
    },
    ref,
  ) => {
    const {
      mouseX,
      isEnabled,
      iconSize: contextIconSize,
      magnification: contextMagnification,
      distance: contextDistance,
    } = useDockContext('DockIcon');

    const iconSize = iconSizeProp ?? contextIconSize;
    const magnification = magnificationProp ?? contextMagnification;
    const distance = distanceProp ?? contextDistance;

    const nodeRef = useRef<HTMLButtonElement | null>(null);
    const distanceValue = useTransform(mouseX, (value) => {
      const rect = nodeRef.current?.getBoundingClientRect();
      if (!rect) return Number.POSITIVE_INFINITY;
      return value - rect.left - rect.width / 2;
    });

    // Fixed-size box (iconSize) — magnification is a GPU-composited transform
    // (scale + a small upward arc translate) instead of animating width/height,
    // so neighboring icons never reflow while the spring settles.
    const scaleFactor = magnification / iconSize;
    const scaleSync = useTransform(
      distanceValue,
      [-distance, 0, distance],
      [1, scaleFactor, 1],
    );
    const scale = useSpring(scaleSync, {
      duration: SPRING_SNAPPY.duration,
      bounce: SPRING_SNAPPY.bounce,
    });

    const liftSync = useTransform(
      distanceValue,
      [-distance, 0, distance],
      [0, -(magnification - iconSize) / 2, 0],
    );
    const lift = useSpring(liftSync, {
      duration: SPRING_SNAPPY.duration,
      bounce: SPRING_SNAPPY.bounce,
    });

    const setRefs = (node: HTMLButtonElement | null) => {
      nodeRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const tooltip = title ?? label;

    if (!isEnabled) {
      return (
        <button
          ref={setRefs}
          aria-label={label}
          className={cn(
            'inline-flex items-center justify-center rounded-xl border border-border bg-background text-foreground shadow-sm transition-colors duration-200 hover:bg-primary motion-reduce:transition-none',
            focusRing,
            className,
          )}
          style={{ width: iconSize, height: iconSize, ...style }}
          title={tooltip}
          type="button"
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <motion.button
        ref={setRefs}
        aria-label={label}
        className={cn(
          'relative inline-flex items-center justify-center rounded-xl border border-border bg-background text-foreground shadow-sm transition-colors duration-200 hover:bg-primary motion-reduce:transition-none',
          focusRing,
          className,
        )}
        style={{
          width: iconSize,
          height: iconSize,
          scale,
          y: lift,
          transformOrigin: 'bottom',
          willChange: 'transform',
          ...style,
        }}
        title={tooltip}
        type="button"
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

DockIcon.displayName = 'DockIcon';
