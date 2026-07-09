'use client';

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
  SidebarNavItem,
  SidebarSection,
  SidebarToggle,
  useSidebar,
} from '@varient/ui';
import {
  FolderKanban,
  Home,
  Layers,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';

function SidebarBrand() {
  const { isCollapsed } = useSidebar();

  if (isCollapsed) return null;

  return (
    <span className="truncate font-title text-sm font-semibold tracking-tight text-foreground">
      Varient
    </span>
  );
}

export function SidebarDemo() {
  return (
    <div className="flex h-[420px] w-full overflow-hidden rounded-xl border border-border bg-background">
      <Sidebar defaultCollapsed={false}>
        <SidebarHeader>
          <SidebarBrand />
          <SidebarToggle />
        </SidebarHeader>

        <SidebarNav>
          <SidebarSection label="Main">
            <SidebarNavItem
              href="#"
              icon={<Home className="size-4" />}
              isActive
              label="Overview"
            />
            <SidebarNavItem
              badge="12"
              href="#"
              icon={<Layers className="size-4" />}
              label="Components"
            />
            <SidebarNavItem
              href="#"
              icon={<Sparkles className="size-4" />}
              label="Animated"
            />
          </SidebarSection>

          <SidebarSection label="Workspace">
            <SidebarNavItem
              href="#"
              icon={<FolderKanban className="size-4" />}
              label="Projects"
            />
            <SidebarNavItem href="#" icon={<Users className="size-4" />} label="Team" />
          </SidebarSection>
        </SidebarNav>

        <SidebarFooter>
          <SidebarNavItem href="#" icon={<Settings className="size-4" />} label="Settings" />
        </SidebarFooter>
      </Sidebar>

      <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Main content area — collapse the sidebar with the toggle.
      </div>
    </div>
  );
}

export function SidebarPreviewCompact() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background">
      <Sidebar defaultCollapsed>
        <SidebarHeader>
          <SidebarToggle />
        </SidebarHeader>
        <SidebarNav>
          <SidebarNavItem href="#" icon={<Home className="size-4" />} isActive label="Home" />
          <SidebarNavItem href="#" icon={<Layers className="size-4" />} label="Layers" />
        </SidebarNav>
      </Sidebar>
      <div className="flex flex-1 items-center justify-center text-xs text-muted-foreground">
        Collapsed rail
      </div>
    </div>
  );
}
