'use client';

import {
  forwardRef,
  useRef,
  type ReactElement,
  type ReactNode,
  type SVGAttributes,
} from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';

export type LineDrawPreset = 'underline' | 'scribble' | 'arrow';

interface LineDrawPresetConfig {
  viewBox: string;
  path: string;
}

const LINE_DRAW_PRESETS: Record<LineDrawPreset, LineDrawPresetConfig> = {
  underline: {
    viewBox: '0 0 200 24',
    path: 'M 4 18 C 36 6, 58 22, 92 12 S 148 8, 196 16',
  },
  scribble: {
    viewBox: '0 0 100 100',
    path:
      'M 50 12 C 72 8, 90 26, 88 50 C 86 74, 68 90, 50 88 C 32 86, 14 70, 16 50 C 18 30, 34 14, 50 12',
  },
  arrow: {
    viewBox: '0 0 120 60',
    path: 'M 8 30 H 88 M 68 14 L 92 30 L 68 46',
  },
};

type NativeSvgProps = Omit<
  SVGAttributes<SVGSVGElement>,
  | 'children'
  | 'values'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
>;

type NativeSvgElementProps = Omit<
  SVGAttributes<SVGElement>,
  | 'values'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
>;

function toMotionPathProps(props: SVGAttributes<SVGElement>): NativeSvgElementProps {
  const {
    onDrag: _onDrag,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
    onAnimationStart: _onAnimationStart,
    onAnimationEnd: _onAnimationEnd,
    onAnimationIteration: _onAnimationIteration,
    values: _values,
    ...rest
  } = props;
  return rest;
}

export interface LineDrawProps extends NativeSvgProps {
  /** Built-in decorative path when `path` is not provided. */
  preset?: LineDrawPreset;
  /** Custom SVG path `d` attribute — overrides `preset`. */
  path?: string;
  /** Draw duration in seconds. */
  duration?: number;
  /** Delay before drawing starts, in seconds. */
  delay?: number;
  /** Stroke width in pixels. */
  strokeWidth?: number;
  /** When true, the draw animation loops after completing. */
  isLooping?: boolean;
  /** Stroke color — defaults to foreground. */
  stroke?: string;
  /** Custom SVG children — when set, preset/path props are ignored. */
  children?: ReactNode;
  className?: string;
}

function isMotionPathElement(
  child: ReactNode,
): child is ReactElement<SVGAttributes<SVGElement>> {
  return (
    typeof child === 'object' &&
    child !== null &&
    'type' in child &&
    (child.type === 'path' || child.type === motion.path)
  );
}

/**
 * SVG stroke-drawing animation — animates `pathLength` when scrolled into view.
 * Ship decorative presets or pass custom path data / SVG children.
 * Under `prefers-reduced-motion`, paths render fully drawn.
 */
export const LineDraw = forwardRef<SVGSVGElement, LineDrawProps>(
  (
    {
      preset = 'underline',
      path,
      duration = 1.2,
      delay = 0,
      strokeWidth = 2,
      isLooping = false,
      stroke = 'var(--color-foreground)',
      children,
      className,
      viewBox: viewBoxProp,
      ...props
    },
    ref,
  ) => {
    const localRef = useRef<SVGSVGElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const isInView = useInView(localRef, { once: !isLooping, margin: '-40px' });

    const presetConfig = LINE_DRAW_PRESETS[preset];
    const resolvedPath = path ?? presetConfig.path;
    const resolvedViewBox = viewBoxProp ?? presetConfig.viewBox;

    const setRef = (node: SVGSVGElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const pathTransition = {
      duration,
      delay,
      ease: EASE_OUT,
      ...(isLooping ? { repeat: Infinity, repeatDelay: 0.6 } : {}),
    };

    const pathAnimate = shouldReduceMotion
      ? { pathLength: 1, pathOffset: 0 }
      : isInView
        ? { pathLength: 1, pathOffset: 0 }
        : { pathLength: 0, pathOffset: 1 };

    const svgClassName = cn('overflow-visible text-foreground', className);

    if (children) {
      if (shouldReduceMotion) {
        return (
          <svg
            ref={setRef}
            aria-hidden="true"
            className={svgClassName}
            viewBox={resolvedViewBox}
            fill="none"
            {...props}
          >
            {children}
          </svg>
        );
      }

      return (
        <motion.svg
          ref={setRef}
          aria-hidden="true"
          className={svgClassName}
          viewBox={resolvedViewBox}
          fill="none"
          initial={false}
          {...props}
        >
          {Array.isArray(children)
            ? children.map((child, index) =>
                isMotionPathElement(child) ? (
                  <motion.path
                    key={index}
                    {...toMotionPathProps(child.props)}
                    initial={{ pathLength: 0, pathOffset: 1 }}
                    animate={pathAnimate}
                    transition={pathTransition}
                  />
                ) : (
                  child
                ),
              )
            : isMotionPathElement(children) ? (
                <motion.path
                  {...toMotionPathProps(children.props)}
                  initial={{ pathLength: 0, pathOffset: 1 }}
                  animate={pathAnimate}
                  transition={pathTransition}
                />
              ) : (
                children
              )}
        </motion.svg>
      );
    }

    if (shouldReduceMotion) {
      return (
        <svg
          ref={setRef}
          aria-hidden="true"
          className={svgClassName}
          viewBox={resolvedViewBox}
          fill="none"
          {...props}
        >
          <path
            d={resolvedPath}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    return (
      <motion.svg
        ref={setRef}
        aria-hidden="true"
        className={svgClassName}
        viewBox={resolvedViewBox}
        fill="none"
        initial={false}
        {...props}
      >
        <motion.path
          d={resolvedPath}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, pathOffset: 1 }}
          animate={pathAnimate}
          transition={pathTransition}
        />
      </motion.svg>
    );
  },
);

LineDraw.displayName = 'LineDraw';
