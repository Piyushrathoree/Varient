import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Avatar, AvatarGroup } from '@varient/ui'

<Avatar
  size="md"
  src="https://i.pravatar.cc/150?img=1"
  alt="Alex Morgan"
  fallback="Alex Morgan"
  status="online"
/>

<AvatarGroup max={4} size="md" onOverflowClick={() => setOpen(true)}>
  <Avatar src="..." alt="Member 1" fallback="Member 1" />
  <Avatar src="..." alt="Member 2" fallback="Member 2" />
</AvatarGroup>`,
  props: [
    {
      title: 'Avatar',
      rows: [
        { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Diameter of the avatar circle.' },
        { name: 'src', type: 'string', description: 'Image URL — convenience API only; use Avatar.Image in compound mode.' },
        { name: 'alt', type: 'string', description: 'Accessible label for the image.' },
        { name: 'fallback', type: 'string', description: 'Initials string shown when the image is missing or fails to load.' },
        { name: 'status', type: "'online' | 'offline' | 'away' | 'busy'", description: 'Presence dot rendered at the bottom-right.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root surface.' },
      ],
    },
    {
      title: 'Avatar.Image / Avatar.Fallback',
      rows: [
        { name: 'Avatar.Image', type: 'ImgHTMLAttributes<HTMLImageElement>', description: 'Radix image primitive — fades in on load when motion is allowed.' },
        { name: 'Avatar.Fallback delayMs', type: 'number', description: 'Optional Radix delay before showing fallback while the image loads.' },
      ],
    },
    {
      title: 'AvatarGroup',
      rows: [
        { name: 'max', type: 'number', description: 'Maximum avatars to show before rendering a +N overflow chip.' },
        { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: 'Default size applied to children without their own size prop.' },
        { name: 'onOverflowClick', type: '(event: MouseEvent<HTMLButtonElement>) => void', description: 'When provided, the +N overflow chip renders as a real, keyboard-focusable button with a visible focus ring instead of a decorative span.' },
      ],
    },
  ],
  features: [
    'Simple API (src/fallback/status props) and compound API (Avatar.Image/Avatar.Fallback) share the same size context.',
    'Radix-powered image load/fallback coordination with a motion-gated fade-in.',
    'AvatarGroup renders an overlapping stack with a +N overflow chip; passing onOverflowClick upgrades the chip to a real, keyboard-focusable button.',
    'Status dot resolves an accessible aria-label on the root when no alt text is provided.',
  ],
  keyboard: [
    { keys: 'Tab', description: 'Moves focus to the overflow chip when AvatarGroup has onOverflowClick set (otherwise it is not focusable).' },
    { keys: 'Enter / Space', description: 'Activates the overflow chip button, invoking onOverflowClick.' },
  ],
  aria: [
    { attribute: 'aria-label', element: 'Avatar root', purpose: 'Combined "User avatar, {status}" label when status is set and no alt/aria-label is provided.' },
    { attribute: 'role="group"', element: 'AvatarGroup', purpose: 'Groups the stacked avatars for assistive technology.' },
    { attribute: 'aria-label="Show N more"', element: 'Overflow chip button', purpose: 'Describes the action when onOverflowClick makes the chip interactive.' },
  ],
  a11yNotes: [
    'Image load and fallback transitions are gated behind prefers-reduced-motion — reduced-motion users get instant state changes instead of fade animations.',
    'The overflow chip stays a non-interactive, aria-labeled span unless onOverflowClick is passed; only then does it become a focusable button with a focus-visible ring.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/avatar/avatar.tsx',
    'packages/ui/src/components/foundation/avatar/index.ts',
  ],
};
