'use client';

import { type ReactNode } from 'react';
import { ExpandableCard } from '@varient/ui';

// Decorative media placeholders — neutral gradient blocks with a glyph, the
// house pattern for "media" slots in demos that shouldn't depend on remote
// image assets (see bento-showcase-demo.tsx).
function MediaBlock({ icon, className }: { icon: ReactNode; className?: string }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-muted via-card to-muted/60 text-muted-foreground/50 ${className ?? ''}`}
    >
      {icon}
    </div>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-10" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m14.5 9.5-1.8 5.2-5.2 1.8 1.8-5.2 5.2-1.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-10" aria-hidden>
      <path
        d="m12 3 8 4.5-8 4.5-8-4.5 8-4.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WaveformIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-10" aria-hidden>
      <path
        d="M3 12h2l2-6 3 12 3-15 3 15 2-9 3 3h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
      {children}
    </span>
  );
}

const ARTICLES = [
  {
    icon: <CompassIcon />,
    title: 'Designing for orientation',
    description: 'How wayfinding cues keep users grounded across a deep navigation tree.',
    body: 'Orientation cues — breadcrumbs, active-state indicators, and consistent spatial anchors — let users build a mental map of where they are without reading every label. The best ones are quiet: felt more than seen, present in peripheral vision until the moment they are needed.',
    tags: ['UX', 'Navigation'],
  },
  {
    icon: <LayersIcon />,
    title: 'Depth without noise',
    description: 'Layering surfaces with restraint — shadows, borders, and z-index as language.',
    body: 'Every added layer is a claim on the user’s attention. Reserve elevation for things that genuinely float above the page — dialogs, popovers, dragged items — and let flat surfaces carry the rest. A hairline border does more honest work than a heavy drop shadow.',
    tags: ['Design systems', 'Depth'],
  },
  {
    icon: <WaveformIcon />,
    title: 'The rhythm of motion',
    description: 'Springs, easing, and duration as a consistent voice across a whole product.',
    body: 'A shared spring config is a typeface for motion: pick one, tune it once, and reuse it everywhere so transitions feel like they belong to the same product instead of a pile of one-off animations. Reserve bounce for moments that earn a little delight.',
    tags: ['Motion', 'Systems'],
  },
];

export function ExpandableCardDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Article grid</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <ExpandableCard
              key={article.title}
              title={article.title}
              description={article.description}
              media={<MediaBlock icon={article.icon} />}
              footer={
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              }
            >
              {article.body}
            </ExpandableCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Compact, media-less</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ExpandableCard
            title="Release notes — v2.4"
            description="Sortable list, carousel, and a redesigned prompt input landed this week."
            footer={<Tag>Changelog</Tag>}
          >
            SortableList and Carousel join the animated layer, PromptInput lands in foundation
            with an auto-growing textarea and a morphing submit control, and Stepper rounds out
            multi-step flows. Full details and migration notes are in the changelog.
          </ExpandableCard>
          <ExpandableCard
            title="Team standup — Thursday"
            description="Async notes from the design systems sync, expand for the full agenda."
            footer={<Tag>Notes</Tag>}
          >
            Agenda: theme engine simplification follow-ups, the new component batch review,
            and open questions on carousel keyboard behavior. Drop comments inline before
            Thursday if you can&apos;t make the call.
          </ExpandableCard>
        </div>
      </div>
    </div>
  );
}

export function ExpandableCardPreviewCompact() {
  return (
    <div className="w-full max-w-[260px]">
      <ExpandableCard
        title="Designing for orientation"
        description="How wayfinding cues keep users grounded in deep navigation."
        media={<MediaBlock icon={<CompassIcon />} />}
      >
        Orientation cues let users build a mental map of where they are without reading every
        label.
      </ExpandableCard>
    </div>
  );
}
