'use client';

import { useRef, type ReactNode, type RefObject } from 'react';
import { AnimatedBeam } from '@varient/ui';
import { Database, Globe, Share2, Sparkles, Zap } from 'lucide-react';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function NodeIcon({
  nodeRef,
  children,
}: {
  nodeRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  return (
    <div
      ref={nodeRef}
      className="relative z-10 flex size-12 items-center justify-center rounded-full border border-border bg-background p-3 shadow-sm"
    >
      {children}
    </div>
  );
}

function IntegrationDiagram({ curvature = 0 }: { curvature?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<HTMLDivElement>(null);
  const syncRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex w-full max-w-lg items-center justify-center px-6 py-16"
    >
      <div className="absolute left-8 top-1/2 -translate-y-1/2">
        <NodeIcon nodeRef={inputRef}>
          <Globe className="size-5 text-foreground" strokeWidth={1.5} aria-hidden="true" />
        </NodeIcon>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2">
        <NodeIcon nodeRef={outputRef}>
          <Share2 className="size-5 text-foreground" strokeWidth={1.5} aria-hidden="true" />
        </NodeIcon>
      </div>

      <div className="absolute left-1/4 top-6 -translate-x-1/2">
        <NodeIcon nodeRef={apiRef}>
          <Zap className="size-5 text-foreground" strokeWidth={1.5} aria-hidden="true" />
        </NodeIcon>
      </div>

      <div className="absolute bottom-6 left-1/4 -translate-x-1/2">
        <NodeIcon nodeRef={syncRef}>
          <Database className="size-5 text-foreground" strokeWidth={1.5} aria-hidden="true" />
        </NodeIcon>
      </div>

      <div
        ref={centerRef}
        className="relative z-10 flex size-16 items-center justify-center rounded-full border border-border bg-card p-3 shadow-sm"
      >
        <Sparkles className="size-7 text-brand" strokeWidth={1.5} aria-hidden="true" />
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={inputRef} toRef={centerRef} curvature={curvature} />
      <AnimatedBeam containerRef={containerRef} fromRef={outputRef} toRef={centerRef} curvature={curvature} />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={apiRef}
        toRef={centerRef}
        curvature={curvature}
        delay={1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={syncRef}
        toRef={centerRef}
        curvature={curvature}
        delay={2}
        isReverse
      />
    </div>
  );
}

export function AnimatedBeamDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <p className="text-sm font-medium text-muted-foreground">
        Beams connect element centers inside a shared container — pass refs for the
        container and each endpoint.
      </p>

      <div className="grid grid-cols-1 gap-4">
        <DemoCard label="Integration diagram (default)">
          <IntegrationDiagram />
        </DemoCard>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Curvature</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Straight (curvature 0)">
            <IntegrationDiagram curvature={0} />
          </DemoCard>
          <DemoCard label="Curved (curvature 0.35)">
            <IntegrationDiagram curvature={0.35} />
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function AnimatedBeamPreviewCompact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex w-full items-center justify-between px-4 py-4"
    >
      <div
        ref={fromRef}
        className="relative z-10 size-9 rounded-full border border-border bg-background p-1.5"
      >
        <Globe className="size-full text-foreground" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div
        ref={toRef}
        className="relative z-10 size-9 rounded-full border border-border bg-card p-1.5"
      >
        <Sparkles className="size-full text-brand" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <AnimatedBeam containerRef={containerRef} fromRef={fromRef} toRef={toRef} duration={4} />
    </div>
  );
}
