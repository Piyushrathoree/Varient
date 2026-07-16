import type { Metadata } from 'next';
import { components, getReadyCount } from '@/lib/components/registry';
import { HeroSection } from '@/components/marketing/hero-section';
import { ComponentBentoShowcase } from '@/components/marketing/component-bento-showcase';
import { Features } from '@/components/marketing/features-section';
import { StatsSection } from '@/components/marketing/stats-section';
import { TechMarqueeSection } from '@/components/marketing/tech-marquee-section';
import { CtaSection } from '@/components/marketing/cta-section';
import { FaqSection } from '@/components/marketing/faq-section';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const readyCount = getReadyCount();

  return (
    <>
      <HeroSection readyCount={readyCount} totalCount={components.length} />
      <Features />
      <ComponentBentoShowcase />
      <StatsSection />
      <TechMarqueeSection />
      <CtaSection />
      <FaqSection />
    </>
  );
}
