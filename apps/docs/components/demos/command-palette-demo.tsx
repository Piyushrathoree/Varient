'use client';

import { useEffect, useState, type ReactNode } from 'react';
import {
  Calendar,
  FileText,
  Home,
  Moon,
  Search,
  Settings,
  Sun,
} from 'lucide-react';
import { Button, CommandPalette, Kbd, KbdGroup } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function CommandPalettePanel({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <CommandPalette isOpen={isOpen} onOpenChange={onOpenChange}>
      <CommandPalette.Input autoFocus placeholder="Search commands…" />
      <CommandPalette.List>
        <CommandPalette.Empty>No results found.</CommandPalette.Empty>

        <CommandPalette.Group heading="Navigation">
          <CommandPalette.Item
            icon={<Home strokeWidth={1.75} />}
            shortcut={<KbdGroup keys={['G', 'H']} size="sm" />}
            onSelect={() => onOpenChange(false)}
          >
            Go to Home
          </CommandPalette.Item>
          <CommandPalette.Item
            icon={<FileText strokeWidth={1.75} />}
            shortcut={<KbdGroup keys={['G', 'D']} size="sm" />}
            onSelect={() => onOpenChange(false)}
          >
            Documentation
          </CommandPalette.Item>
        </CommandPalette.Group>

        <CommandPalette.Separator />

        <CommandPalette.Group heading="Actions">
          <CommandPalette.Item
            icon={<Search strokeWidth={1.75} />}
            shortcut={<Kbd size="sm">/</Kbd>}
            onSelect={() => onOpenChange(false)}
          >
            Search workspace
          </CommandPalette.Item>
          <CommandPalette.Item
            icon={<Calendar strokeWidth={1.75} />}
            onSelect={() => onOpenChange(false)}
          >
            Open calendar
          </CommandPalette.Item>
          <CommandPalette.Item
            icon={<Settings strokeWidth={1.75} />}
            shortcut={<KbdGroup keys={['⌘', ',']} size="sm" />}
            onSelect={() => onOpenChange(false)}
          >
            Settings
          </CommandPalette.Item>
        </CommandPalette.Group>
      </CommandPalette.List>

      <CommandPalette.Footer>
        <span>Navigate with ↑↓</span>
        <KbdGroup keys={['↵']} size="sm" />
      </CommandPalette.Footer>
    </CommandPalette>
  );
}

export function CommandPaletteDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const mod = event.metaKey || event.ctrlKey;
      if (mod && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen((current) => !current);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DemoCard label="Keyboard shortcut">
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            Open palette
          </Button>
          <span className="text-xs text-muted-foreground">
            or press <KbdGroup keys={['⌘', 'K']} size="sm" />
          </span>
          <CommandPalettePanel isOpen={isOpen} onOpenChange={setIsOpen} />
        </DemoCard>

        <DemoCard label="Themed actions">
          <Button variant="outline" onClick={() => setIsThemeOpen(true)}>
            Change theme
          </Button>
          <CommandPalette isOpen={isThemeOpen} onOpenChange={setIsThemeOpen} label="Theme">
            <CommandPalette.Input autoFocus placeholder="Filter themes…" />
            <CommandPalette.List>
              <CommandPalette.Group heading="Appearance">
                <CommandPalette.Item
                  icon={<Sun strokeWidth={1.75} />}
                  onSelect={() => setIsThemeOpen(false)}
                >
                  Light mode
                </CommandPalette.Item>
                <CommandPalette.Item
                  icon={<Moon strokeWidth={1.75} />}
                  onSelect={() => setIsThemeOpen(false)}
                >
                  Dark mode
                </CommandPalette.Item>
              </CommandPalette.Group>
            </CommandPalette.List>
          </CommandPalette>
        </DemoCard>
      </div>
    </div>
  );
}

/** Static inline panel — no overlay so the gallery card stays self-contained. */
export function CommandPalettePreviewCompact() {
  return (
    <div className="w-full max-w-[240px] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-sm">
      <div className="border-b border-border px-3 py-2.5 text-sm text-muted-foreground">
        Search commands…
      </div>
      <div className="p-1.5">
        <p className="px-2 py-1 text-xs font-medium text-muted-foreground">Navigation</p>
        <div className="flex items-center gap-2 rounded-md bg-muted px-2 py-1.5 text-sm">
          <Home className="size-4 text-brand" strokeWidth={1.75} />
          <span className="flex-1">Go to Home</span>
          <KbdGroup keys={['G', 'H']} size="sm" />
        </div>
        <div className="mt-0.5 flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground">
          <FileText className="size-4" strokeWidth={1.75} />
          <span className="flex-1">Documentation</span>
        </div>
      </div>
    </div>
  );
}
