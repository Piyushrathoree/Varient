import Link from 'next/link';
import { Button } from '@varient/ui';
import { getComponentsByStatus } from '@/lib/components/registry';
import { getDemo } from '@/lib/components/demos';
import Divider from '@/components/marketing/divider';
import Frame from '@/components/marketing/frame';

/**
 * Ported from SmoothUI's `components/landing/components-slideshow.tsx` — same
 * heading + `Frame` grid + CTA structure. Instead of a fixed list of example
 * components, this renders every component the registry marks `shipped`, so
 * the slideshow grows automatically as more components ship.
 */
export function ComponentsSlideshow() {
  const shipped = getComponentsByStatus('shipped');

  return (
    <section className="relative bg-background px-8 py-24 transition">
      <Divider />
      <h2 className="text-balance text-center font-display font-semibold text-3xl text-foreground transition">
        Components Showcase
      </h2>
      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
        {shipped.map((entry) => {
          const Demo = getDemo(entry.slug, true);
          if (!Demo) return null;
          return <Frame key={entry.slug} component={Demo} label={entry.name} />;
        })}
      </div>
      <div className="mx-auto mt-8 flex justify-center">
        <Button asChild variant="primary" size="lg">
          <Link href="/components">View All Components</Link>
        </Button>
      </div>
    </section>
  );
}
