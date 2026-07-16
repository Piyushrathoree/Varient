/**
 * Varient design tokens — TypeScript source for NATIVE targets.
 *
 * ⚠️ Hand-synced mirror of `src/styles/themes.css` + `globals.css` (the web
 * source of truth). If you change light/dark there, change it here too.
 * Codegen (TS → CSS) replaces this hand-sync in a later phase.
 *
 * Two modes only — light + dark — matching the web token system in themes.css/globals.css.
 * The old 4-identity engine (ThemeIdentity/identities/identityCssVars) is
 * gone; native picks up `light` or `dark` and passes its CSS-var object to
 * NativeWind's `vars()` on a root <View>, same as `.dark` does on web.
 * Components reference the same semantic classes on both platforms
 * (`bg-bg-base`, `text-text-primary`, `border-border`, `bg-accent`, …).
 */

/* ── Static scales — identical in both modes ── */

export const ember = {
  50: '#fff4ee',
  100: '#ffe4d5',
  200: '#ffc6a8',
  300: '#ffa377',
  400: '#ff7e44',
  500: '#ff5a1f',
  600: '#f03e0c',
  700: '#c22f08',
  800: '#94240a',
  900: '#6b1c0c',
} as const;

/** `brand` aliases `ember` — indigo (#6366f1) retired: the "AI purple" tell. */
export const brand = ember;

export const neutral = {
  0: '#ffffff',
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d1d1d6',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  850: '#1c1c1f',
  900: '#131316',
  950: '#0a0a0d',
} as const;

export const semantic = {
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
} as const;

/* ── Theme tokens — mirrors themes.css :root (light) / .dark ── */

export type ColorScheme = 'light' | 'dark';

export interface ThemeTokens {
  bgBase: string;
  bgSubtle: string;
  bgMuted: string;
  bgElevated: string;
  border: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  accent: string;
  accentHover: string;
  accentContrast: string;
  /** px — themes.css --radius-theme */
  radiusTheme: number;
  /** ms — themes.css --motion-duration / --motion-duration-slow */
  motionDuration: number;
  motionDurationSlow: number;
  colorScheme: ColorScheme;
}

export const light: ThemeTokens = {
  bgBase: neutral[0],
  bgSubtle: neutral[50],
  bgMuted: neutral[100],
  bgElevated: neutral[0],
  border: neutral[200],
  borderStrong: neutral[300],
  textPrimary: neutral[950],
  textSecondary: neutral[500],
  textTertiary: neutral[400],
  accent: brand[500],
  accentHover: brand[600],
  accentContrast: '#ffffff',
  radiusTheme: 10,
  motionDuration: 160,
  motionDurationSlow: 220,
  colorScheme: 'light',
};

export const dark: ThemeTokens = {
  bgBase: neutral[950],
  bgSubtle: neutral[900],
  bgMuted: neutral[850],
  bgElevated: neutral[800],
  border: neutral[800],
  borderStrong: neutral[700],
  textPrimary: neutral[50],
  textSecondary: neutral[400],
  textTertiary: neutral[600],
  accent: brand[500],
  accentHover: brand[400],
  accentContrast: '#1a0f08',
  radiusTheme: 10,
  motionDuration: 160,
  motionDurationSlow: 220,
  colorScheme: 'dark',
};

export const themes: Record<ColorScheme, ThemeTokens> = { light, dark };

export const DEFAULT_COLOR_SCHEME: ColorScheme = 'light';

export function isColorScheme(value: unknown): value is ColorScheme {
  return value === 'light' || value === 'dark';
}

/* ── Runtime CSS-variable objects for NativeWind `vars()` ── */

const scaleVars: Record<string, string> = {
  ...Object.fromEntries(Object.entries(ember).map(([k, v]) => [`--ember-${k}`, v])),
  ...Object.fromEntries(Object.entries(brand).map(([k, v]) => [`--brand-${k}`, v])),
  ...Object.fromEntries(Object.entries(neutral).map(([k, v]) => [`--neutral-${k}`, v])),
  ...Object.fromEntries(Object.entries(semantic).map(([k, v]) => [`--${k}`, v])),
};

function toCssVars(tokens: ThemeTokens): Record<string, string> {
  return {
    ...scaleVars,
    '--bg-base': tokens.bgBase,
    '--bg-subtle': tokens.bgSubtle,
    '--bg-muted': tokens.bgMuted,
    '--bg-elevated': tokens.bgElevated,
    '--border': tokens.border,
    '--border-strong': tokens.borderStrong,
    '--text-primary': tokens.textPrimary,
    '--text-secondary': tokens.textSecondary,
    '--text-tertiary': tokens.textTertiary,
    '--accent': tokens.accent,
    '--accent-hover': tokens.accentHover,
    '--accent-contrast': tokens.accentContrast,
    '--radius-theme': `${tokens.radiusTheme}px`,
  };
}

/** Pass to NativeWind `vars()` on a root View to activate light or dark. */
export const lightCssVars: Record<string, string> = toCssVars(light);
export const darkCssVars: Record<string, string> = toCssVars(dark);

export const themeCssVars: Record<ColorScheme, Record<string, string>> = {
  light: lightCssVars,
  dark: darkCssVars,
};
