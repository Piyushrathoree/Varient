import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
  SidebarNavItem,
  SidebarSection,
  SidebarToggle,
  useSidebar,
} from '@varient/ui'

function Brand() {
  const { isCollapsed } = useSidebar();
  if (isCollapsed) return null;
  return <span className="font-semibold">Acme</span>;
}

<Sidebar defaultCollapsed={false}>
  <SidebarHeader>
    <Brand />
    <SidebarToggle />
  </SidebarHeader>
  <SidebarNav>
    <SidebarSection label="Main">
      <SidebarNavItem href="/" icon={<Home className="size-4" />} label="Home" isActive />
      <SidebarNavItem href="/layers" icon={<Layers className="size-4" />} label="Layers" badge="3" />
    </SidebarSection>
  </SidebarNav>
  <SidebarFooter>{/* footer items */}</SidebarFooter>
</Sidebar>`,
  props: [
    {
      title: 'Sidebar',
      rows: [
        { name: 'isCollapsed', type: 'boolean', description: 'Controlled collapsed state.' },
        {
          name: 'defaultCollapsed',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Initial collapsed state when uncontrolled.',
        },
        {
          name: 'onCollapsedChange',
          type: '(isCollapsed: boolean) => void',
          description: 'Called when collapse state changes.',
        },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
    {
      title: 'SidebarNav',
      rows: [
        {
          name: 'label',
          type: 'string',
          defaultValue: "'Sidebar'",
          description: 'Accessible label on the `<nav>` element.',
        },
      ],
    },
    {
      title: 'SidebarSection',
      rows: [{ name: 'label', type: 'string', description: 'Uppercase group heading, hidden while collapsed.' }],
    },
    {
      title: 'SidebarNavItem',
      rows: [
        { name: 'icon', type: 'ReactNode', description: 'Leading icon, always visible (collapsed and expanded).' },
        { name: 'label', type: 'string', description: 'Item label; also used as the collapsed-state title tooltip.' },
        { name: 'href', type: 'string', description: 'Link target.' },
        {
          name: 'isActive',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Sets `aria-current="page"` and the active visual style.',
        },
        { name: 'badge', type: 'ReactNode', description: 'Optional trailing badge; strings/numbers render as a soft Badge.' },
      ],
    },
    {
      title: 'SidebarToggle',
      rows: [
        {
          name: 'onToggle',
          type: '() => void',
          description: 'Called in addition to the default collapse/expand toggle.',
        },
      ],
    },
  ],
  features: [
    'Compound API (Header/Nav/Section/NavItem/Footer/Toggle) sharing collapse state via a Sidebar context.',
    'Animated width transition between 256px expanded and 72px collapsed icon rail using a spring-free eased tween.',
    'Controlled or uncontrolled collapse state (`isCollapsed` / `defaultCollapsed` + `onCollapsedChange`).',
    'Labels and section headings fade/collapse out via AnimatePresence when the rail collapses; reduced-motion collapses instantly with no fade.',
    'Collapsed nav items expose a native `title` tooltip with the label text.',
    '`useSidebar()` hook exposes `isCollapsed`, `setCollapsed`, and `toggleCollapsed` to any descendant.',
  ],
  keyboard: [
    { keys: 'Tab', description: 'Move focus between the toggle button and nav items.' },
    { keys: 'Enter / Space', description: 'Activate the focused link or the collapse toggle button.' },
  ],
  aria: [
    { attribute: 'aria-label="Sidebar"', element: '<aside>', purpose: 'Names the root landmark.' },
    { attribute: 'aria-label', element: '<nav> (SidebarNav)', purpose: 'Configurable accessible name for the nav region, defaults to "Sidebar".' },
    { attribute: 'role="group" + aria-labelledby', element: 'SidebarSection', purpose: 'Associates the group with its (possibly hidden) heading.' },
    { attribute: 'aria-current="page"', element: 'SidebarNavItem', purpose: 'Marks the active item for assistive tech.' },
    { attribute: 'aria-expanded', element: 'SidebarToggle', purpose: 'Reflects whether the sidebar is expanded.' },
  ],
  a11yNotes: [
    'Width animation and label/heading fades respect `prefers-reduced-motion` by resolving to an instant transition instead of a tween.',
    'Collapsed items still expose their label via the `title` attribute for pointer users; screen readers still get the link text.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/sidebar/sidebar.tsx',
    'packages/ui/src/components/foundation/sidebar/index.ts',
  ],
};
