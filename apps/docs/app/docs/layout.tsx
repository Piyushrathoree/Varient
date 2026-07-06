import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { SiteFooter } from '@/components/site/site-footer';

// Mirrors SmoothUI's `app/docs/layout.tsx`: the three-column DocsLayout with
// the marketing SiteFooter rendered as a sibling below it, so /docs pages
// end in the same footer as the rest of the site instead of trailing off
// into empty space. SmoothUI-specific extras (FloatNav, sponsor card, "new
// page" decoration) aren't ported — no equivalent surface here yet.
export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <>
      <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
        {children}
      </DocsLayout>
      <SiteFooter />
    </>
  );
}
