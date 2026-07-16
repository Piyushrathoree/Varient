import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { TeamGrid } from '@/components/sections/team-grid';

export function AboutPage() {
  return (
    <TeamGrid
      eyebrow="Team"
      title="The people behind Varient"
      description="A small team building copy-paste components."
      members={[
        {
          name: 'Maya Chen',
          role: 'Engineering lead',
          socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
        },
      ]}
    />
  );
}`,
  props: [
    {
      title: 'TeamGrid',
      rows: [
        { name: 'eyebrow', type: 'string', defaultValue: "'Team'", description: 'Small brand-colored label above the section title.' },
        { name: 'title', type: 'string', defaultValue: "'The people behind Varient'", description: 'Section headline.' },
        { name: 'description', type: 'string', description: 'One-line supporting copy below the title.' },
        { name: 'members', type: 'TeamMember[]', description: 'Profile grid items — each needs name and role; avatarSrc and socials are optional. Defaults to a 6-member roster with no avatarSrc (initials fallback).' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section.' },
      ],
    },
    {
      title: 'TeamMember',
      rows: [
        { name: 'name', type: 'string', description: 'Member display name. Also used to derive the avatar initials fallback.' },
        { name: 'role', type: 'string', description: 'Role or title below the name.' },
        { name: 'avatarSrc', type: 'string', description: 'Optional image URL for the profile avatar. Omit it to show a token-colored initials avatar instead.' },
        { name: 'socials', type: '{ github?: string; x?: string; linkedin?: string }', description: 'Optional social profile URLs — only provided networks render as icon links, always in github → x → linkedin order.' },
      ],
    },
  ],
  features: [
    'Responsive profile grid (2 columns on mobile, up to 4 on desktop) with a scroll-revealed header and staggered member entrances.',
    'Avatars fall back to token-colored initials (muted surface) when no avatarSrc is provided — the default roster ships with zero hotlinked images.',
    'Per-network social icon links (GitHub, X, LinkedIn) rendered only for the networks a member provides, always in a fixed visual order.',
    'Reduced-motion users see the header and every member card immediately, with no stagger or fade.',
  ],
  keyboard: [
    { keys: 'Tab / Shift + Tab', description: 'Moves focus between social profile links.' },
    { keys: 'Enter', description: 'Activates the focused social link.' },
  ],
  aria: [
    { attribute: 'aria-labelledby="team-grid-heading"', element: '<section>', purpose: 'Associates the section landmark with its visible heading.' },
    { attribute: 'aria-label="<Network> profile"', element: 'social <a>', purpose: 'Describes the destination of each icon-only social link.' },
  ],
  a11yNotes: [
    'Heading hierarchy is explicit: h2 for the section title, h3 for each member name.',
    'Social links open in a new tab with rel="noopener noreferrer".',
    'Scroll-reveal motion is gated behind prefers-reduced-motion via useReducedMotion().',
  ],
  dependencies: ['@radix-ui/react-avatar'],
  sourceFiles: [
    'packages/ui/src/components/sections/team-grid/team-grid.tsx',
    'packages/ui/src/components/sections/team-grid/index.ts',
  ],
};
