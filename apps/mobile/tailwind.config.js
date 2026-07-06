/**
 * NativeWind (Tailwind v3) config for native targets.
 *
 * Semantic color names map to CSS variables — the SAME names the web library
 * uses (bg-bg-base, text-text-primary, bg-accent, rounded-theme, …). The
 * variable *values* are supplied at runtime by `vars(identityCssVars[id])`
 * from @varient/ui/tokens, so switching identity repaints everything.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx',
    './app/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--bg-base)',
        'bg-subtle': 'var(--bg-subtle)',
        'bg-muted': 'var(--bg-muted)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-warm': 'var(--accent-warm)',
        brand: {
          400: 'var(--brand-400)',
          500: 'var(--brand-500)',
          600: 'var(--brand-600)',
        },
        'neutral-0': 'var(--neutral-0)',
        danger: 'var(--danger)',
        success: 'var(--success)',
        warning: 'var(--warning)',
      },
      borderRadius: {
        theme: 'var(--radius-theme)',
      },
    },
  },
  plugins: [],
};
