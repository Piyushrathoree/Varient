'use client';

import { TeamGrid, type TeamMember } from '@varient/ui';

const compactMembers: TeamMember[] = [
  {
    name: 'Piyush Sharma',
    role: 'Founder',
    avatarSrc: 'https://i.pravatar.cc/150?img=12',
    socials: { github: 'https://github.com', x: 'https://x.com' },
  },
  {
    name: 'Maya Chen',
    role: 'Engineering',
    avatarSrc: 'https://i.pravatar.cc/150?img=1',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'James Okonkwo',
    role: 'Frontend',
    avatarSrc: 'https://i.pravatar.cc/150?img=3',
    socials: { x: 'https://x.com' },
  },
  {
    name: 'Elena Vasquez',
    role: 'Design',
    avatarSrc: 'https://i.pravatar.cc/150?img=5',
    socials: { linkedin: 'https://linkedin.com' },
  },
];

export function TeamGridDemo() {
  return (
    <div className="w-full bg-background">
      <TeamGrid />
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
        members={compactMembers.slice(0, 4)}
        title="People behind Varient"
      />
    </div>
  );
}
