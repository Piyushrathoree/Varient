import type { Metadata } from 'next';
import { components, getReadyCount } from '@/lib/components/registry';
import { HeroSection } from '@/components/marketing/hero-section';
import { ComponentBentoShowcase } from '@/components/marketing/component-bento-showcase';
import { Features } from '@/components/marketing/features-section';
import { StatsSection } from '@/components/marketing/stats-section';
import { TechMarqueeSection } from '@/components/marketing/tech-marquee-section';
import { CtaSection } from '@/components/marketing/cta-section';
import { FaqSection } from '@/components/marketing/faq-section';
import Divider from '@/components/marketing/divider';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

/**
 * Drafting-table `+` joints composed at the top-left/top-right rail
 * intersections of a section boundary. Purely decorative.
 */
function RailJoints() {
  return (
    <>
      <span aria-hidden className="plus-mark -top-[4.5px] -left-[4.5px] absolute z-10" />
      <span aria-hidden className="plus-mark -top-[4.5px] -right-[4.5px] absolute z-10" />
    </>
  );
}

export default function HomePage() {
  const readyCount = getReadyCount();

  return (
    // One rail structure for the whole landing: content-width wrapper with
    // hairline side rails; every section boundary gets `+` joints where it
    // meets the rails. Sections draw their own fading bottom hairline —
    // only the hero (which bleeds edge-to-edge inside the rails) needs one
    // composed here.
    <div className="section-rails relative mx-auto w-full max-w-7xl">
      <div className="relative">
        <RailJoints />
        <HeroSection readyCount={readyCount} totalCount={components.length} />
        <Divider />
      </div>
      <div className="relative">
        <RailJoints />
        <TechMarqueeSection />
      </div>
      <div className="relative">
        <RailJoints />
        <Features />
      </div>
      <div className="relative">
        <RailJoints />
        <ComponentBentoShowcase />
      </div>
      <div className="relative">
        <RailJoints />
        <StatsSection />
      </div>
      <div className="relative">
        <RailJoints />
        <FaqSection />
      </div>
      <div className="relative">
        <RailJoints />
        <CtaSection />
      </div>
    </div>
  );
}
