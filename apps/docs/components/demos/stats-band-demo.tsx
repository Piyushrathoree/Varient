'use client';

import { StatsBand, type StatsBandStat } from '@varient/ui';
import { DollarSign, TrendingUp, Users, Zap } from 'lucide-react';

const growthStats: StatsBandStat[] = [
  {
    value: 2.4,
    prefix: '$',
    suffix: 'M',
    decimalPlaces: 1,
    label: 'Annual recurring revenue',
    icon: <DollarSign size={18} strokeWidth={1.75} />,
  },
  {
    value: 98.6,
    suffix: '%',
    decimalPlaces: 1,
    label: 'Customer retention',
    icon: <TrendingUp size={18} strokeWidth={1.75} />,
  },
  {
    value: 340,
    suffix: '+',
    label: 'Active teams',
    icon: <Users size={18} strokeWidth={1.75} />,
  },
  {
    value: 12,
    suffix: 'ms',
    label: 'Median response time',
    icon: <Zap size={18} strokeWidth={1.75} />,
  },
];

export function StatsBandDemo() {
  return (
    <div className="w-full bg-background">
      <StatsBand
        description="Metrics pulled straight from the growth dashboard — icons, prefixes, and decimal precision all wired through the content API."
        isRaised
        stats={growthStats}
        title="Growth this quarter"
      />
    </div>
  );
}

export function StatsBandPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <StatsBand
        className="px-4 py-6 sm:py-6"
        stats={[
          { value: 75, suffix: '+', label: 'Components' },
          { value: 12, suffix: 'k', label: 'Copies' },
        ]}
      />
    </div>
  );
}
