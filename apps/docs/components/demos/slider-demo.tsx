'use client';

import { useState, type ReactNode } from 'react';
import { Slider, type SliderSize } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const SIZES: { size: SliderSize; label: string }[] = [
  { size: 'sm', label: 'Small' },
  { size: 'md', label: 'Medium' },
  { size: 'lg', label: 'Large' },
];

function StepTicks({ min, max, step }: { min: number; max: number; step: number }) {
  const ticks = Array.from(
    { length: Math.floor((max - min) / step) + 1 },
    (_, index) => min + index * step,
  );

  return (
    <div className="relative mt-2 h-3 w-full max-w-[240px]">
      {ticks.map((tick) => {
        const percent = ((tick - min) / (max - min)) * 100;
        return (
          <span
            key={tick}
            aria-hidden
            className="absolute top-0 size-1 -translate-x-1/2 rounded-full bg-muted-foreground/40"
            style={{ left: `${percent}%` }}
          />
        );
      })}
    </div>
  );
}

export function SliderDemo() {
  const [single, setSingle] = useState([40]);
  const [range, setRange] = useState([25, 75]);
  const [stepped, setStepped] = useState([50]);
  const [liveValue, setLiveValue] = useState([62]);
  const [labeled, setLabeled] = useState([55]);
  const [eased, setEased] = useState([20]);

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DemoCard label="Default">
          <Slider
            className="w-full max-w-[240px]"
            value={single}
            onValueChange={setSingle}
            aria-label="Volume"
          />
        </DemoCard>

        <DemoCard label="Range">
          <Slider
            className="w-full max-w-[240px]"
            value={range}
            onValueChange={setRange}
            aria-label="Price range"
          />
        </DemoCard>

        <DemoCard label="Stepped (step 10)">
          <div className="flex w-full max-w-[240px] flex-col items-center">
            <Slider
              className="w-full"
              value={stepped}
              onValueChange={setStepped}
              step={10}
              aria-label="Brightness"
            />
            <StepTicks min={0} max={100} step={10} />
          </div>
        </DemoCard>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SIZES.map(({ size, label }) => (
            <DemoCard key={size} label={label}>
              <Slider
                className="w-full max-w-[240px]"
                defaultValue={[50]}
                size={size}
                aria-label={`${label} slider`}
              />
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DemoCard label="Disabled">
          <Slider
            className="w-full max-w-[240px]"
            defaultValue={[35]}
            isDisabled
            aria-label="Disabled slider"
          />
        </DemoCard>

        <DemoCard label="Live value">
          <div className="flex w-full max-w-[240px] flex-col items-center gap-3">
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {liveValue[0]}
            </span>
            <Slider
              className="w-full"
              value={liveValue}
              onValueChange={setLiveValue}
              aria-label="Live value slider"
            />
          </div>
        </DemoCard>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Show value label</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Floating label on press/focus">
            <Slider
              className="w-full max-w-[240px]"
              value={labeled}
              onValueChange={setLabeled}
              showValue
              aria-label="Zoom"
            />
          </DemoCard>

          <DemoCard label="Programmatic jump (eased)">
            <div className="flex w-full max-w-[240px] flex-col items-center gap-3">
              <Slider
                className="w-full"
                value={eased}
                onValueChange={setEased}
                showValue
                aria-label="Temperature"
              />
              <button
                type="button"
                onClick={() => setEased([Math.random() > 0.5 ? 80 : 20])}
                className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted motion-reduce:transition-none"
              >
                Jump value
              </button>
            </div>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function SliderPreviewCompact() {
  const [value, setValue] = useState([45]);

  return (
    <div className="flex w-full items-center justify-center">
      <Slider
        className="w-[200px]"
        value={value}
        onValueChange={setValue}
        aria-label="Volume"
      />
    </div>
  );
}
