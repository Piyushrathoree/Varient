import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { SiteFooter } from '@/components/site/site-footer';

// Three-column DocsLayout with the marketing SiteFooter rendered as a sibling
// below it, so /docs pages end in the same footer as the rest of the site.
export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <div className="bg-background">
      <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
        {children}
      </DocsLayout>
      <SiteFooter />
    </div>
  );
}
