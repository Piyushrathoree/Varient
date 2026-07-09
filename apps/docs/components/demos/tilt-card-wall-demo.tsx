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

export function TiltCardWallDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-4">
      <p className="text-sm font-medium text-muted-foreground">Hover a card</p>
      <TiltCardWall items={DEMO_ITEMS} className="max-w-full overflow-x-hidden" />
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
