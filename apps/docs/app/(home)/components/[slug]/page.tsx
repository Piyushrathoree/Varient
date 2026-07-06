import { notFound } from 'next/navigation';
import { ComponentDetail } from '@/components/component-detail';
import { components, getComponentBySlug } from '@/lib/components/registry';

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

  return (
    <main>
      <ComponentDetail entry={entry} />
    </main>
  );
}
