'use client';

import { TiltCardWall, type TiltCardItem } from '@varient/ui';

const DEMO_ITEMS: TiltCardItem[] = [
  {
    quote:
      'Finally an extension that actually speeds up my design workflow. I keep it pinned and use it on every project.',
    name: 'Sarah Chen',
    role: 'Product Hunt review',
    rating: 5.0,
    source: 'Product Hunt',
  },
  {
    quote:
      'The overlay is crisp, fast, and never gets in the way. Exactly what I needed for inspecting live sites.',
    name: 'Marcus Webb',
    role: 'Frontend Developer',
    rating: 5.0,
    source: 'Chrome Web Store',
  },
  {
    quote:
      'Clean UI, thoughtful details, and it just works. This has earned a permanent spot in my toolbar.',
    name: 'Elena Ruiz',
    role: 'Product Hunt review',
    rating: 5.0,
    source: 'Product Hunt',
  },
  {
    quote:
      'I ship faster because I spend less time guessing spacing and colors. A small tool with a big payoff.',
    name: 'James Okonkwo',
    role: 'UI Engineer',
    rating: 5.0,
    source: 'Chrome Web Store',
  },
  {
    quote:
      'Every designer on our team uses it daily. The fan layout alone made our landing page feel premium.',
    name: 'Priya Nair',
    role: 'Design Lead',
    rating: 5.0,
    source: 'Product Hunt',
  },
];

const COMPACT_ITEMS: TiltCardItem[] = DEMO_ITEMS.slice(0, 2);
const VARIANT_ITEMS: TiltCardItem[] = DEMO_ITEMS.slice(0, 3);

export function TiltCardWallDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-10 py-4">
      <div className="flex w-full flex-col items-center gap-6">
        <p className="text-sm font-medium text-muted-foreground">Full wall — hover a card</p>
        <TiltCardWall items={DEMO_ITEMS} className="max-w-full overflow-x-hidden" />
      </div>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <TiltCardWall
            items={VARIANT_ITEMS}
            maxRotation={12}
            className="max-w-full overflow-x-hidden"
          />
          <span className="text-xs font-medium text-muted-foreground">
            3-item wall &middot; default rotation (12&deg;)
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <TiltCardWall
            items={VARIANT_ITEMS}
            maxRotation={24}
            className="max-w-full overflow-x-hidden"
          />
          <span className="text-xs font-medium text-muted-foreground">
            3-item wall &middot; wide fan (maxRotation=24)
          </span>
        </div>
      </div>
    </div>
  );
}

export function TiltCardWallPreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      <TiltCardWall
        items={COMPACT_ITEMS}
        maxRotation={8}
        className="max-w-full scale-[0.72] origin-center py-2"
      />
    </div>
  );
}
