import Link from 'next/link';
import { cn } from '@varient/ui';

const navLinks = [
  { href: '/components', label: 'Components' },
  { href: '/docs', label: 'Docs' },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="text-brand-500">Varient</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors',
                'hover:bg-bg-subtle hover:text-text-primary',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
