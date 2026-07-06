/**
 * Shared props contract — one API, two renderers.
 * `number-ticker.tsx` (web, Framer Motion) and `number-ticker.native.tsx`
 * (React Native, Reanimated) both implement exactly this interface.
 */
export interface NumberTickerProps {
  /** Target value to count up to. */
  value: number;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
  /** Animation duration in seconds. */
  duration?: number;
  className?: string;
}
