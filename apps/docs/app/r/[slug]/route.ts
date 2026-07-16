import { NextResponse } from 'next/server';
import { getComponentBySlug } from '@/lib/components/registry';
import { getDocContent } from '@/lib/components/content';
import { SITE_URL } from '@/lib/shared';
import {
  RESERVED_LIB_SLUGS,
  isReservedLibSlug,
  resolveComponentSources,
  resolveLibSource,
  shippedSlugs,
} from '../registry-sources';

// shadcn fetches `<SITE_URL>/r/<slug>.json` — this segment captures the whole
// `<slug>.json` string (Next doesn't split on the dot), so we strip the suffix below.
export const dynamic = 'force-static';

const LIB_URL_BY_SLUG: Record<string, string> = Object.fromEntries(
  RESERVED_LIB_SLUGS.map((slug) => [slug, `${SITE_URL}/r/${slug}.json`]),
);

export function generateStaticParams() {
  const componentParams = shippedSlugs().map((slug) => ({ slug: `${slug}.json` }));
  const libParams = RESERVED_LIB_SLUGS.map((slug) => ({ slug: `${slug}.json` }));
  return [...componentParams, ...libParams];
}

/** Only reference lib registry deps a component's rewritten source actually imports. */
function registryDependenciesFor(code: string): string[] {
  return RESERVED_LIB_SLUGS.filter((slug) => code.includes(`@/lib/${slug}`)).map(
    (slug) => LIB_URL_BY_SLUG[slug],
  );
}

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await context.params;
  const slug = rawSlug.replace(/\.json$/, '');

  if (isReservedLibSlug(slug)) {
    const file = resolveLibSource(slug);
    if (!file) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      name: slug,
      type: 'registry:lib',
      title: slug,
      description: `Shared Varient helper used internally by animated components.`,
      dependencies: [],
      files: [{ path: `lib/${file.fileName}`, type: 'registry:lib', content: file.code }],
    });
  }

  const entry = getComponentBySlug(slug);
  if (!entry || entry.status !== 'shipped') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const content = getDocContent(slug);
  const sources = resolveComponentSources(entry);
  const combinedCode = sources.map((s) => s.code).join('\n');

  return NextResponse.json({
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: slug,
    type: 'registry:ui',
    title: entry.name,
    description: entry.description,
    dependencies: [...(content?.dependencies ?? []), 'motion', 'clsx', 'tailwind-merge'],
    registryDependencies: registryDependenciesFor(combinedCode),
    files: sources.map((s) => ({
      path: `ui/varient/${s.fileName}`,
      type: 'registry:ui',
      content: s.code,
    })),
  });
}
