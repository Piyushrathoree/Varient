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

// SIGNAL surface classes — shared across every `CommandPalette.Group` / `.Item` instance below
// so the smooth-ladder + jade treatment stays consistent without touching the primitives.
const GROUP_HEADING_CLASSNAME =
  '[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-smooth-800';

const ACTIVE_ROW_CLASSNAME =
  'data-[selected=true]:bg-smooth-200 data-[selected=true]:text-brand data-[selected=true]:shadow-[inset_2px_0_0_0_var(--color-brand)]';

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

      <CommandPalette
        isOpen={open}
        onOpenChange={setOpen}
        label="Command menu"
        className="bg-smooth-50"
      >
        <CommandPalette.Input
          autoFocus
          placeholder="Search components, docs, actions…"
          className="font-body placeholder:font-mono placeholder:text-[13px] placeholder:tracking-tight placeholder:text-smooth-800"
        />
        <CommandPalette.List>
          <CommandPalette.Empty>No results found.</CommandPalette.Empty>

          {layers.map((layer) => {
            const LayerIcon = layerIcons[layer];
            const entries = getComponentsByLayer(layer).filter(
              (entry) => entry.status === 'shipped',
            );
            if (entries.length === 0) return null;

            return (
              <CommandPalette.Group
                key={layer}
                heading={layerLabels[layer]}
                className={GROUP_HEADING_CLASSNAME}
              >
                {entries.map((entry) => (
                  <CommandPalette.Item
                    key={entry.slug}
                    value={`${entry.name} ${entry.category}`}
                    icon={<LayerIcon strokeWidth={1.75} />}
                    shortcut={
                      <span className="rounded border border-border bg-smooth-100 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-smooth-800">
                        {entry.category}
                      </span>
                    }
                    onSelect={() => goTo(`/components/${entry.slug}`)}
                    className={ACTIVE_ROW_CLASSNAME}
                  >
                    {entry.name}
                  </CommandPalette.Item>
                ))}
              </CommandPalette.Group>
            );
          })}

          <CommandPalette.Separator />

          <CommandPalette.Group heading="Docs" className={GROUP_HEADING_CLASSNAME}>
            <CommandPalette.Item
              value="Getting started documentation guide"
              icon={<BookOpen strokeWidth={1.75} />}
              onSelect={() => goTo('/docs')}
              className={ACTIVE_ROW_CLASSNAME}
            >
              Getting started
            </CommandPalette.Item>
          </CommandPalette.Group>

          <CommandPalette.Separator />

          <CommandPalette.Group heading="Actions" className={GROUP_HEADING_CLASSNAME}>
            <CommandPalette.Item
              value="Toggle theme light dark mode"
              icon={isDark ? <Sun strokeWidth={1.75} /> : <Moon strokeWidth={1.75} />}
              onSelect={() => {
                setTheme(isDark ? 'light' : 'dark');
                setOpen(false);
              }}
              className={ACTIVE_ROW_CLASSNAME}
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
              className={ACTIVE_ROW_CLASSNAME}
            >
              Open GitHub
            </CommandPalette.Item>
          </CommandPalette.Group>
        </CommandPalette.List>

        <CommandPalette.Footer className="font-mono text-[11px] uppercase tracking-wide text-smooth-800">
          <span>Navigate with ↑↓</span>
          <KbdGroup keys={['↵']} size="sm" />
        </CommandPalette.Footer>
      </CommandPalette>
    </CommandMenuContext.Provider>
  );
}
