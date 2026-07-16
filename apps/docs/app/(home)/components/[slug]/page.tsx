import { notFound } from 'next/navigation';
import { ComponentDetail } from '@/components/component-detail';
import { components, getComponentBySlug } from '@/lib/components/registry';
import { getDocContent } from '@/lib/components/content';
import { getHighlightedSources } from '@/lib/components/source';

export function generateStaticParams() {
  return components
    .filter((c) => c.status === 'shipped')
    .map((c) => ({ slug: c.slug }));
}

export default async function ComponentPage(props: PageProps<'/components/[slug]'>) {
  const { slug } = await props.params;
  const entry = getComponentBySlug(slug);

  if (!entry || entry.status !== 'shipped') {
    notFound();
  }

  const content = getDocContent(entry.slug);
  const sources = await getHighlightedSources(entry.layer, entry.slug, content);

  return (
    <main>
      <ComponentDetail entry={entry} content={content} sources={sources} />
    </main>
  );
}
