'use client';

import { Badge, Button, ImageComparison } from '@varient/ui';

function MountainIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m3 18 6-9 4 5 2-3 6 7H3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Same scene rendered in two "grades" — a flat neutral pass standing in for
// an unedited original, and a brand-tinted, higher-contrast pass standing in
// for the edit — so the slider demo never depends on remote image assets
// (house pattern, see expandable-card-demo's MediaBlock).
function PhotoScene({ tone }: { tone: 'original' | 'edited' }) {
  return (
    <div
      className={
        tone === 'original'
          ? 'flex size-full items-center justify-center bg-linear-to-br from-muted via-card to-muted/70 text-muted-foreground/40'
          : 'flex size-full items-center justify-center bg-linear-to-br from-brand/25 via-brand-light/15 to-card text-brand'
      }
    >
      <MountainIcon className="size-14" />
    </div>
  );
}

// A small themed subtree reused for both sides of the light/dark comparison
// card — dogfoods Card-less primitives (Badge, Button) directly on
// bg-background/text-foreground so the tokens flip correctly whichever side
// wraps it in a `.dark` class (same trick DynamicIsland uses).
function UiPreview() {
  return (
    <div className="flex size-full flex-col justify-between gap-3 bg-background p-4 text-left">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Weekly report</span>
        <Badge variant="primary" size="sm">
          New
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">
        Usage is up 12% over last week, driven mostly by the new onboarding flow.
      </p>
      <Button size="sm" className="self-start">
        View report
      </Button>
    </div>
  );
}

export function ImageComparisonDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Drag mode &amp; hover mode</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <ImageComparison
              before={<PhotoScene tone="original" />}
              after={<PhotoScene tone="edited" />}
              beforeLabel="Original"
              afterLabel="Edited"
              className="w-full"
            />
            <span className="text-xs font-medium text-muted-foreground">
              Photo edit — drag to reveal (default)
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <ImageComparison
              before={<PhotoScene tone="original" />}
              after={<PhotoScene tone="edited" />}
              beforeLabel="Original"
              afterLabel="Edited"
              mode="hover"
              className="w-full"
            />
            <span className="text-xs font-medium text-muted-foreground">
              Hover mode — follows the pointer, no press
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Content axis &amp; isSpring</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <ImageComparison
              before={
                <div className="dark size-full">
                  <UiPreview />
                </div>
              }
              after={
                <div className="light size-full">
                  <UiPreview />
                </div>
              }
              beforeLabel="Dark"
              afterLabel="Light"
              defaultPosition={35}
              className="w-full"
            />
            <span className="text-xs font-medium text-muted-foreground">
              Light vs dark UI — real Badge/Button subtree
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <ImageComparison
              before={<PhotoScene tone="original" />}
              after={<PhotoScene tone="edited" />}
              beforeLabel="Original"
              afterLabel="Edited"
              isSpring={false}
              className="w-full"
            />
            <span className="text-xs font-medium text-muted-foreground">
              isSpring=false — instant, no smoothing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImageComparisonPreviewCompact() {
  return (
    <div className="w-full max-w-70">
      <ImageComparison
        before={<PhotoScene tone="original" />}
        after={<PhotoScene tone="edited" />}
        beforeLabel="Before"
        afterLabel="After"
        className="aspect-3/2"
      />
    </div>
  );
}
