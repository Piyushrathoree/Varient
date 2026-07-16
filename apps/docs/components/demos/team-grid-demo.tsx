'use client';

import { TeamGrid, type TeamMember } from '@varient/ui';

const foundingMembers: TeamMember[] = [
  {
    name: 'Piyush Sharma',
    role: 'Founder & design',
    socials: { github: 'https://github.com', x: 'https://x.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Maya Chen',
    role: 'Engineering lead',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'James Okonkwo',
    role: 'Frontend',
    socials: { x: 'https://x.com' },
  },
  {
    name: 'Elena Vasquez',
    role: 'Design systems',
    socials: { linkedin: 'https://linkedin.com' },
  },
];

const relationsTeam: TeamMember[] = [
  {
    name: 'Tom Bradley',
    role: 'Product',
    socials: { x: 'https://x.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Priya Nair',
    role: 'Developer relations',
    socials: { github: 'https://github.com', x: 'https://x.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Sofia Rossi',
    role: 'Community',
    socials: { github: 'https://github.com' },
  },
];

export function TeamGridDemo() {
  return (
    <div className="flex w-full flex-col gap-10 bg-background">
      <div>
        <span className="mb-3 block px-6 text-xs font-medium text-muted-foreground md:px-8">
          Founding team
        </span>
        <TeamGrid
          eyebrow="Team"
          title="The people behind Varient"
          description="A small team building copy-paste components so you can ship polished UI without the scaffolding tax."
          members={foundingMembers}
        />
      </div>
      <div>
        <span className="mb-3 block px-6 text-xs font-medium text-muted-foreground md:px-8">
          Relations & community
        </span>
        <TeamGrid
          className="py-10 md:py-10"
          eyebrow="Growing fast"
          title="Relations and community"
          description="The folks helping developers get the most out of Varient."
          members={relationsTeam}
        />
      </div>
    </div>
  );
}

export function TeamGridPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <TeamGrid
        className="px-4 py-6 md:py-6"
        description="Meet the core team."
        eyebrow="Team"
        members={foundingMembers}
      />
    </div>
  );
}
