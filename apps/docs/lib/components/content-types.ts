/**
 * Per-component doc content contract — one module per slug lives in
 * `lib/components/content/<slug>.ts` and exports `content: ComponentDocContent`.
 * The `/components/[slug]` detail page renders these; the orchestrator owns the
 * aggregating `content/index.ts`, component agents own only their slug file.
 *
 * `DocPropRow` intentionally matches `PropRow` in `components/docs/props-table.tsx`
 * so rows can be copied verbatim from the existing `.mdx` inline tables.
 */
export interface DocPropRow {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

export interface DocPropsTable {
  /** Heading when a component needs several tables (e.g. compound parts). */
  title?: string;
  rows: DocPropRow[];
}

export interface DocKeyboardRow {
  keys: string;
  description: string;
}

export interface DocAriaRow {
  attribute: string;
  element: string;
  purpose: string;
}

export interface ComponentDocContent {
  /** Primary import + JSX snippet shown in the usage block and copied by the copy button. */
  usage: string;
  props?: DocPropsTable[];
  features?: string[];
  keyboard?: DocKeyboardRow[];
  aria?: DocAriaRow[];
  a11yNotes?: string[];
  /** npm deps beyond the base stack (e.g. 'canvas-confetti', '@radix-ui/react-dialog'). */
  dependencies?: string[];
  /**
   * Repo-relative source files for the Code tab and the registry endpoint,
   * main file first — e.g. 'packages/ui/src/components/animated/dock/dock.tsx'.
   */
  sourceFiles?: string[];
}
