'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { BookOpen, Layers3, LayoutGrid, Moon, Sparkles, Sun, type LucideIcon } from 'lucide-react';
import { CommandPalette, KbdGroup } from '@varient/ui';
import { Github } from '@/components/site/brand-icons';
import { gitConfig } from '@/lib/shared';
import { getComponentsByLayer, layerLabels, type ComponentLayer } from '@/lib/components/registry';

const GITHUB_URL = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

const layers: ComponentLayer[] = ['foundation', 'animated', 'sections'];

const layerIcons: Record<ComponentLayer, LucideIcon> = {
  foundation: Layers3,
  animated: Sparkles,
  sections: LayoutGrid,
};

interface CommandMenuContextValue {
  openCommandMenu: () => void;
}

const CommandMenuContext = createContext<CommandMenuContextValue | null>(null);

/**
 * The site's own ⌘K, built on the library's `CommandPalette` (dogfooding the
 * flagship overlay on its own docs). Mounted once by `(home)/layout.tsx`.
 */
export function useCommandMenu(): CommandMenuContextValue {
  const ctx = useContext(CommandMenuContext);
  if (!ctx) {
    throw new Error('useCommandMenu must be used within a CommandMenuProvider');
  }
  return ctx;
}

export function CommandMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const mod = event.metaKey || event.ctrlKey;
      if (!mod || event.key.toLowerCase() !== 'k') return;

      const target = event.target as HTMLElement | null;
      const isEditable =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable === true;
      if (isEditable) return;

      event.preventDefault();
      setOpen((current) => !current);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const openCommandMenu = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openCommandMenu }), [openCommandMenu]);

  function goTo(href: string) {
    router.push(href);
    setOpen(false);
  }

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <CommandMenuContext.Provider value={value}>
      {children}

      <CommandPalette isOpen={open} onOpenChange={setOpen} label="Command menu">
        <CommandPalette.Input autoFocus placeholder="Search components, docs, actions…" />
        <CommandPalette.List>
          <CommandPalette.Empty>No results found.</CommandPalette.Empty>

          {layers.map((layer) => {
            const LayerIcon = layerIcons[layer];
            const entries = getComponentsByLayer(layer).filter(
              (entry) => entry.status === 'shipped',
            );
            if (entries.length === 0) return null;

            return (
              <CommandPalette.Group key={layer} heading={layerLabels[layer]}>
                {entries.map((entry) => (
                  <CommandPalette.Item
                    key={entry.slug}
                    value={`${entry.name} ${entry.category}`}
                    icon={<LayerIcon strokeWidth={1.75} />}
                    shortcut={entry.category}
                    onSelect={() => goTo(`/components/${entry.slug}`)}
                  >
                    {entry.name}
                  </CommandPalette.Item>
                ))}
              </CommandPalette.Group>
            );
          })}

          <CommandPalette.Separator />

          <CommandPalette.Group heading="Docs">
            <CommandPalette.Item
              value="Getting started documentation guide"
              icon={<BookOpen strokeWidth={1.75} />}
              onSelect={() => goTo('/docs')}
            >
              Getting started
            </CommandPalette.Item>
          </CommandPalette.Group>

          <CommandPalette.Separator />

          <CommandPalette.Group heading="Actions">
            <CommandPalette.Item
              value="Toggle theme light dark mode"
              icon={isDark ? <Sun strokeWidth={1.75} /> : <Moon strokeWidth={1.75} />}
              onSelect={() => {
                setTheme(isDark ? 'light' : 'dark');
                setOpen(false);
              }}
            >
              Toggle theme
            </CommandPalette.Item>
            <CommandPalette.Item
              value="Open GitHub repository source code"
              icon={<Github className="size-4" />}
              onSelect={() => {
                window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
                setOpen(false);
              }}
            >
              Open GitHub
            </CommandPalette.Item>
          </CommandPalette.Group>
        </CommandPalette.List>

        <CommandPalette.Footer>
          <span>Navigate with ↑↓</span>
          <KbdGroup keys={['↵']} size="sm" />
        </CommandPalette.Footer>
      </CommandPalette>
    </CommandMenuContext.Provider>
  );
}
