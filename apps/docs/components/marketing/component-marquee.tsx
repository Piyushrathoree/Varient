import { cn } from '@varient/ui';
import type { ComponentLayer } from '@/lib/components/registry';

interface MarqueePillProps {
  name: string;
  layer: ComponentLayer;
}

const layerColors: Record<ComponentLayer, string> = {
  foundation: 'border-brand-500/30 bg-brand-500/8 text-brand-300',
  animated: 'border-neutral-700/60 bg-neutral-800/60 text-neutral-300',
  sections: 'border-neutral-600/40 bg-neutral-800/40 text-neutral-400',
};

function MarqueePill({ name, layer }: MarqueePillProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full border px-3.5 py-1.5 text-sm font-medium whitespace-nowrap',
        layerColors[layer],
      )}
    >
      {name}
    </span>
  );
}

interface ComponentMarqueeProps {
  row1: MarqueePillProps[];
  row2: MarqueePillProps[];
}

export function ComponentMarquee({ row1, row2 }: ComponentMarqueeProps) {
  return (
    <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      {/* Row 1: left */}
      <div className="mb-3 flex">
        <div className="marquee-track animate-marquee-left gap-3">
          {[...row1, ...row1].map((item, i) => (
            <MarqueePill key={`r1-${i}`} {...item} />
          ))}
        </div>
      </div>

      {/* Row 2: right */}
      <div className="flex">
        <div className="marquee-track animate-marquee-right gap-3">
          {[...row2, ...row2].map((item, i) => (
            <MarqueePill key={`r2-${i}`} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
