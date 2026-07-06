import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '../../../lib/utils';
import type { NumberTickerProps } from './types';

/**
 * Native renderer for NumberTicker — same props contract as the web version.
 *
 * Reanimated's UI-thread clock drives the count (withTiming, same bezier as
 * web); each frame's formatted string is applied to a <Text> via
 * useAnimatedReaction → runOnJS, mirroring the web version's
 * animate() → onUpdate → setState flow.
 *
 * Differences from web, by design:
 * - Ticks on mount rather than on scroll-into-view (native screens are
 *   typically fully visible when mounted; a viewport trigger can come later).
 * - Respects reduced motion via Reanimated's useReducedMotion — jumps straight
 *   to the final value.
 *
 * Accessibility: `accessibilityLabel` carries the final value, so VoiceOver /
 * TalkBack announce it once, correctly, without narrating every tick — the
 * native mirror of the web version's sr-only span.
 */
export function NumberTicker({
  value,
  prefix = '',
  suffix = '',
  decimalPlaces = 0,
  duration = 1.2,
  className,
}: NumberTickerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(() => (0).toFixed(decimalPlaces));
  const progress = useSharedValue(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(value.toFixed(decimalPlaces));
      return;
    }

    progress.value = withTiming(value, {
      duration: duration * 1000,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
  }, [value, duration, decimalPlaces, prefersReducedMotion, progress]);

  useAnimatedReaction(
    () => progress.value.toFixed(decimalPlaces),
    (formatted, previous) => {
      if (formatted !== previous) {
        runOnJS(setDisplay)(formatted);
      }
    },
    [decimalPlaces],
  );

  return (
    <Text
      accessibilityLabel={`${prefix}${value}${suffix}`}
      className={cn('text-text-primary', className)}
      style={{ fontVariant: ['tabular-nums'] }}
    >
      {prefix}
      {display}
      {suffix}
    </Text>
  );
}
