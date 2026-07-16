import fs from 'node:fs';
import path from 'node:path';
import { components, type ComponentEntry } from '@/lib/components/registry';
import { getDocContent } from '@/lib/components/content';

/**
 * Small, self-contained source resolver for the `/r/*` shadcn registry endpoint.
 * Deliberately not shared with `lib/components/source.ts` (owned by the detail-page
 * agent) — same resolution rules (content.sourceFiles first, dir-scan fallback,
 * same slug -> dir exceptions), independent implementation per file-ownership rules.
 */

/** Slugs served from `packages/ui/src/lib/*` as shared `registry:lib` items. */
export const RESERVED_LIB_SLUGS = [
  'utils',
  'animation',
  'use-fine-pointer',
  'use-viewport-active',
  'random',
] as const;

export type ReservedLibSlug = (typeof RESERVED_LIB_SLUGS)[number];

export function isReservedLibSlug(slug: string): slug is ReservedLibSlug {
  return (RESERVED_LIB_SLUGS as readonly string[]).includes(slug);
}

/** slug -> component directory name, only where it diverges from the slug itself. */
const DIR_OVERRIDES: Record<string, string> = {
  'skeleton-loader': 'skeleton',
  'meteor-shower': 'meteors',
  '404-page': 'not-found-page',
  'toggle-group': 'toggle',
};

/** Relative import specifiers rewritten so served files resolve inside a consumer project. */
const IMPORT_REWRITES: Array<[string, string]> = [
  ['../../../lib/utils', '@/lib/utils'],
  ['../../../lib/animation', '@/lib/animation'],
  ['../../../lib/use-fine-pointer', '@/lib/use-fine-pointer'],
  ['../../../lib/use-viewport-active', '@/lib/use-viewport-active'],
  ['../../../lib/random', '@/lib/random'],
];

function rewriteImports(code: string): string {
  let out = code;
  for (const [from, to] of IMPORT_REWRITES) {
    out = out.split(from).join(to);
  }
  return out;
}

/** Repo root, robust to `cwd` being either the repo root or `apps/docs` (dev vs. build). */
function repoRoot(): string {
  const fromDocsRoot = path.join(process.cwd(), '../..');
  if (fs.existsSync(path.join(fromDocsRoot, 'packages/ui/src/components'))) {
    return fromDocsRoot;
  }
  return process.cwd();
}

export function getComponentDir(entry: ComponentEntry): string {
  return DIR_OVERRIDES[entry.slug] ?? entry.slug;
}

export interface ResolvedSourceFile {
  fileName: string;
  repoPath: string;
  code: string;
}

/** Reads + import-rewrites every source file for a shipped component. */
export function resolveComponentSources(entry: ComponentEntry): ResolvedSourceFile[] {
  const root = repoRoot();
  const content = getDocContent(entry.slug);

  if (content?.sourceFiles?.length) {
    return content.sourceFiles.flatMap((repoPath) => {
      const abs = path.join(root, repoPath);
      if (!fs.existsSync(abs)) return [];
      return [
        {
          fileName: path.basename(repoPath),
          repoPath,
          code: rewriteImports(fs.readFileSync(abs, 'utf-8')),
        },
      ];
    });
  }

  const dir = getComponentDir(entry);
  const dirRepoPath = `packages/ui/src/components/${entry.layer}/${dir}`;
  const absDir = path.join(root, dirRepoPath);
  if (!fs.existsSync(absDir)) return [];

  const isMain = (f: string) => f === `${dir}.tsx` || f === `${dir}.ts`;
  const files = fs
    .readdirSync(absDir)
    .filter((f) => /\.(ts|tsx)$/.test(f))
    .sort((a, b) => {
      if (isMain(a)) return -1;
      if (isMain(b)) return 1;
      if (a === 'index.ts') return 1;
      if (b === 'index.ts') return -1;
      return a.localeCompare(b);
    });

  return files.map((fileName) => {
    const repoPath = `${dirRepoPath}/${fileName}`;
    return {
      fileName,
      repoPath,
      code: rewriteImports(fs.readFileSync(path.join(root, repoPath), 'utf-8')),
    };
  });
}

export function resolveLibSource(slug: ReservedLibSlug): ResolvedSourceFile | null {
  const root = repoRoot();
  const repoPath = `packages/ui/src/lib/${slug}.ts`;
  const abs = path.join(root, repoPath);
  if (!fs.existsSync(abs)) return null;
  return {
    fileName: `${slug}.ts`,
    repoPath,
    code: rewriteImports(fs.readFileSync(abs, 'utf-8')),
  };
}

export function shippedSlugs(): string[] {
  return components.filter((c) => c.status === 'shipped').map((c) => c.slug);
}
