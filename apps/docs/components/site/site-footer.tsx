import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const footerLinks = [
  {
    heading: 'Library',
    items: [
      { label: 'Components', href: '/components' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Foundation', href: '/components?layer=foundation' },
      { label: 'Animated', href: '/components?layer=animated' },
      { label: 'Sections', href: '/components?layer=sections' },
    ],
  },
  {
    heading: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/docs' },
      { label: 'Installation', href: '/docs/getting-started/installation' },
      { label: 'Theming', href: '/docs/getting-started/theming' },
    ],
  },
  {
    heading: 'Project',
    items: [
      { label: 'GitHub', href: 'https://github.com/piyush/varient' },
      { label: 'Changelog', href: '/docs' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg-subtle/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500 shadow-[0_0_12px_rgb(99_102_241/0.4)]">
                <Sparkles className="size-3.5 text-white" />
              </div>
              <span className="font-display text-base font-semibold text-text-primary">Varient</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              Copy-paste React components for utilities, animations, and full-page sections.
              You own the code — no lock-in, no per-component installs.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} Varient. Open-source under MIT license.
          </p>
          <p className="text-xs text-text-tertiary">
            Built by Piyush · Copy-paste, you own it.
          </p>
        </div>
      </div>
    </footer>
  );
}
