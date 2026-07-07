'use client';

import { useState, type ReactNode } from 'react';
import { Select } from '@varient/ui';

const LANGUAGES = [
  'Rust',
  'Go',
  'TypeScript',
  'Python',
  'Zig',
  'Elixir',
  'Swift',
  'Kotlin',
  'C++',
  'Haskell',
  'Ruby',
  'Java',
];

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function SelectDemo() {
  const [framework, setFramework] = useState('next');
  const [timezone, setTimezone] = useState('utc');
  const [language, setLanguage] = useState('typescript');
  const [small, setSmall] = useState('utc');
  const [medium, setMedium] = useState('utc');
  const [large, setLarge] = useState('utc');

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants &amp; states</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DemoCard label="Basic">
            <Select value={timezone} onValueChange={setTimezone}>
              <Select.Trigger aria-label="Timezone" className="w-48">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="utc">UTC</Select.Item>
                <Select.Item value="pst">Pacific Time</Select.Item>
                <Select.Item value="ist">India Standard Time</Select.Item>
              </Select.Content>
            </Select>
          </DemoCard>

          <DemoCard label="Grouped, with labels">
            <Select value={framework} onValueChange={setFramework}>
              <Select.Trigger aria-label="Framework" className="w-48">
                <Select.Value placeholder="Select a framework" />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Label>Vercel-maintained</Select.Label>
                  <Select.Item value="next">Next.js</Select.Item>
                  <Select.Item value="turborepo">Turborepo</Select.Item>
                </Select.Group>
                <Select.Separator />
                <Select.Group>
                  <Select.Label>Meta-maintained</Select.Label>
                  <Select.Item value="react">React</Select.Item>
                  <Select.Item value="react-native">React Native</Select.Item>
                </Select.Group>
                <Select.Separator />
                <Select.Group>
                  <Select.Label>Other</Select.Label>
                  <Select.Item value="svelte">Svelte</Select.Item>
                  <Select.Item value="vue">Vue</Select.Item>
                  <Select.Item value="solid" disabled>
                    Solid (coming soon)
                  </Select.Item>
                </Select.Group>
              </Select.Content>
            </Select>
          </DemoCard>

          <DemoCard label="Ghost variant">
            <Select defaultValue="next">
              <Select.Trigger variant="ghost" aria-label="Framework (ghost)" className="w-48">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="next">Next.js</Select.Item>
                <Select.Item value="react">React</Select.Item>
                <Select.Item value="svelte">Svelte</Select.Item>
              </Select.Content>
            </Select>
          </DemoCard>

          <DemoCard label="Filled variant">
            <Select defaultValue="next">
              <Select.Trigger variant="filled" aria-label="Framework (filled)" className="w-48">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="next">Next.js</Select.Item>
                <Select.Item value="react">React</Select.Item>
                <Select.Item value="svelte">Svelte</Select.Item>
              </Select.Content>
            </Select>
          </DemoCard>

          <DemoCard label="Long list, scrolls">
            <Select value={language} onValueChange={setLanguage}>
              <Select.Trigger aria-label="Language" className="w-48">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                {LANGUAGES.map((lang) => (
                  <Select.Item key={lang} value={lang.toLowerCase()}>
                    {lang}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </DemoCard>

          <DemoCard label="Disabled">
            <Select defaultValue="utc" isDisabled>
              <Select.Trigger aria-label="Timezone (disabled)" className="w-48">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="utc">UTC</Select.Item>
              </Select.Content>
            </Select>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DemoCard label="Small">
            <Select value={small} onValueChange={setSmall}>
              <Select.Trigger size="sm" aria-label="Timezone (small)" className="w-40">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="utc">UTC</Select.Item>
                <Select.Item value="pst">Pacific Time</Select.Item>
                <Select.Item value="ist">India Standard Time</Select.Item>
              </Select.Content>
            </Select>
          </DemoCard>

          <DemoCard label="Medium">
            <Select value={medium} onValueChange={setMedium}>
              <Select.Trigger aria-label="Timezone (medium)" className="w-40">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="utc">UTC</Select.Item>
                <Select.Item value="pst">Pacific Time</Select.Item>
                <Select.Item value="ist">India Standard Time</Select.Item>
              </Select.Content>
            </Select>
          </DemoCard>

          <DemoCard label="Large">
            <Select value={large} onValueChange={setLarge}>
              <Select.Trigger size="lg" aria-label="Timezone (large)" className="w-40">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="utc">UTC</Select.Item>
                <Select.Item value="pst">Pacific Time</Select.Item>
                <Select.Item value="ist">India Standard Time</Select.Item>
              </Select.Content>
            </Select>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function SelectPreviewCompact() {
  return (
    <Select defaultValue="next">
      <Select.Trigger size="sm" className="max-w-xs" aria-label="Framework">
        <Select.Value />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="next">Next.js</Select.Item>
        <Select.Item value="react">React</Select.Item>
        <Select.Item value="svelte">Svelte</Select.Item>
      </Select.Content>
    </Select>
  );
}
