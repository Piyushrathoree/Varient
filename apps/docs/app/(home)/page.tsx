import type { Metadata } from 'next';
import { getReadyCount, components } from '@/lib/components/registry';
import { HeroSection } from '@/components/marketing/hero-section';
import { Features } from '@/components/marketing/features-section';
import { ComponentsSlideshow } from '@/components/marketing/components-slideshow';
import { FaqSection } from '@/components/marketing/faq-section';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

/**
 * Landing page — structure ported from SmoothUI (https://smoothui.dev, MIT,
 * by Edu Calvo): Hero → Features → ComponentsSlideshow → FAQ. Content is
 * Varient's; the hero showcase and slideshow mount real, shipped
 * `@varient/ui` components driven by the registry, not screenshots.
 */
export default function HomePage() {
  const readyCount = getReadyCount();

  return (
    <>
      <HeroSection readyCount={readyCount} totalCount={components.length} />
      <Features />
      <ComponentsSlideshow />
      <FaqSection />
    </>
  );
}
