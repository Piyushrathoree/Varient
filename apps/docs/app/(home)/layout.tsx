import { MotionConfig } from 'motion/react';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import type { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    // `reducedMotion="user"` makes every declarative motion.* animation on the
    // marketing site (hero/stats/architecture reveals, etc.) automatically
    // fall back to instant opacity — no per-component opt-in needed.
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
