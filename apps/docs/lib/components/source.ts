import fs from 'node:fs';
import path from 'node:path';
import { createHighlighter, type Highlighter } from 'shiki';
import type { ComponentDocContent } from './content-types';
import type { ComponentLayer } from './registry';

export interface HighlightedSource {
  fileName: string;
  code: string;
  html: string;
}

/**
 * Slugs whose `packages/ui/src/components/<layer>/<dir>` directory name
 * doesn't match the slug 1:1.
 */
const SLUG_DIR_OVERRIDES: Record<string, string> = {
  'skeleton-loader': 'skeleton',
  'meteor-shower': 'meteors',
  '404-page': 'not-found-page',
  'toggle-group': 'toggle',
};

function resolveDir(slug: string): string {
  return SLUG_DIR_OVERRIDES[slug] ?? slug;
}

/** apps/docs is the Next.js build cwd — walk up two levels to the repo root. */
const REPO_ROOT = path.join(process.cwd(), '../..');

function langFor(fileName: string): string {
  if (fileName.endsWith('.tsx')) return 'tsx';
  if (fileName.endsWith('.ts')) return 'typescript';
  if (fileName.endsWith('.css')) return 'css';
  return 'text';
}

let highlighterPromise: Promise<Highlighter> | null = null;

/** Module-level singleton — reused across every source file / request. */
function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light-default', 'github-dark-default'],
      langs: ['tsx', 'typescript', 'css'],
    });
  }
  return highlighterPromise;
}

async function readAndHighlight(repoRelativePath: string): Promise<HighlightedSource | null> {
  const absolutePath = path.join(REPO_ROOT, repoRelativePath);

  let code: string;
  try {
    code = fs.readFileSync(absolutePath, 'utf-8');
  } catch {
    return null;
  }

  const highlighter = await getHighlighter();
  const html = highlighter.codeToHtml(code, {
    lang: langFor(repoRelativePath),
    themes: { light: 'github-light-default', dark: 'github-dark-default' },
    defaultColor: false,
  });

  return { fileName: path.basename(repoRelativePath), code, html };
}

/** Fallback when a component has no content module yet: list its packages/ui dir. */
function listComponentDirFiles(layer: ComponentLayer, slug: string): string[] {
  const dir = resolveDir(slug);
  const dirRelativePath = path.join('packages/ui/src/components', layer, dir);
  const absoluteDirPath = path.join(REPO_ROOT, dirRelativePath);

  let entries: string[];
  try {
    entries = fs.readdirSync(absoluteDirPath);
  } catch {
    return [];
  }

  const files = entries.filter((name) => name.endsWith('.ts') || name.endsWith('.tsx'));

  // Main file (matching the directory name) first, then the rest alphabetically.
  files.sort((a, b) => {
    const aIsMain = a === `${dir}.tsx` || a === `${dir}.ts`;
    const bIsMain = b === `${dir}.tsx` || b === `${dir}.ts`;
    if (aIsMain && !bIsMain) return -1;
    if (bIsMain && !aIsMain) return 1;
    return a.localeCompare(b);
  });

  return files.map((name) => path.join(dirRelativePath, name));
}

/**
 * Resolves and shiki-highlights every source file backing a component's Code
 * tab. `content.sourceFiles` wins when present (main file first, as authored);
 * otherwise falls back to scanning the component's packages/ui directory.
 * Never throws — a missing directory or file just yields fewer/no sources so
 * the build stays green.
 */
export async function getHighlightedSources(
  layer: ComponentLayer,
  slug: string,
  content: ComponentDocContent | undefined,
): Promise<HighlightedSource[]> {
  const repoRelativePaths =
    content?.sourceFiles && content.sourceFiles.length > 0
      ? content.sourceFiles
      : listComponentDirFiles(layer, slug);

  const results = await Promise.all(repoRelativePaths.map((filePath) => readAndHighlight(filePath)));
  return results.filter((result): result is HighlightedSource => result !== null);
}
