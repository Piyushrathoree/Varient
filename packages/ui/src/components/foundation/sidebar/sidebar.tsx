'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  type SVGProps,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Badge } from '../badge';
import { DURATION_INSTANT, EASE_OUT } from '../../../lib/animation';
import { cn } from '../../../lib/utils';

const EXPANDED_WIDTH = 256;
const COLLAPSED_WIDTH = 72;

interface SidebarContextValue {
  isCollapsed: boolean;
  setCollapsed: (value: boolean) => void;
  toggleCollapsed: () => void;
  shouldReduceMotion: boolean;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebarContext(component: string) {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(`${component} must be rendered inside a <Sidebar>.`);
  }
  return context;
}

/** Read collapse state and toggles from a child of `<Sidebar>`. */
export function useSidebar() {
  return useSidebarContext('useSidebar');
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function PanelLeftIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
      {...props}
    >
      <rect height="18" rx="2" width="18" x="3" y="3" />
      <path d="M9 3v18" />
    </svg>
  );
}

type NativeAsideProps = Omit<
  HTMLAttributes<HTMLElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
>;

export interface SidebarProps extends NativeAsideProps {
  children: ReactNode;
  isCollapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (isCollapsed: boolean) => void;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      children,
      isCollapsed: isCollapsedProp,
      defaultCollapsed = false,
      onCollapsedChange,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion() ?? false;
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
    const isCollapsed = isCollapsedProp ?? internalCollapsed;

    const setCollapsed = useCallback(
      (value: boolean) => {
        if (isCollapsedProp === undefined) {
          setInternalCollapsed(value);
        }
        onCollapsedChange?.(value);
      },
      [isCollapsedProp, onCollapsedChange],
    );

    const toggleCollapsed = useCallback(() => {
      setCollapsed(!isCollapsed);
    }, [isCollapsed, setCollapsed]);

    const width = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

    return (
      <SidebarContext.Provider
        value={{ isCollapsed, setCollapsed, toggleCollapsed, shouldReduceMotion }}
      >
        <motion.aside
          ref={ref}
          animate={{ width }}
          aria-label="Sidebar"
          className={cn(
            'flex h-full shrink-0 flex-col overflow-hidden border-r border-border bg-card',
            className,
          )}
          initial={false}
          transition={
            shouldReduceMotion
              ? DURATION_INSTANT
              : { duration: 0.25, ease: EASE_OUT }
          }
          {...props}
        >
          {children}
        </motion.aside>
      </SidebarContext.Provider>
    );
  },
);

Sidebar.displayName = 'Sidebar';

export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { isCollapsed } = useSidebarContext('SidebarHeader');

    return (
      <div
        ref={ref}
        className={cn(
          'flex shrink-0 items-center border-b border-border px-3 py-4',
          isCollapsed ? 'justify-center' : 'justify-between gap-2',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SidebarHeader.displayName = 'SidebarHeader';

export interface SidebarNavProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  /** Accessible label for the navigation region. */
  label?: string;
}

export const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(
  ({ className, children, label = 'Sidebar', ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label={label}
        className={cn('flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-3', className)}
        {...props}
      >
        {children}
      </nav>
    );
  },
);

SidebarNav.displayName = 'SidebarNav';

export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  children?: ReactNode;
}

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, label, children, ...props }, ref) => {
    const { isCollapsed, shouldReduceMotion } = useSidebarContext('SidebarSection');
    const sectionId = useId();

    return (
      <div ref={ref} aria-labelledby={sectionId} className={cn('space-y-1', className)} role="group" {...props}>
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.p
              animate={{ opacity: 1, height: 'auto' }}
              className="px-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
              exit={{ opacity: 0, height: 0 }}
              id={sectionId}
              initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
              transition={shouldReduceMotion ? DURATION_INSTANT : { duration: 0.2, ease: EASE_OUT }}
            >
              {label}
            </motion.p>
          )}
        </AnimatePresence>
        <div className="space-y-0.5">{children}</div>
      </div>
    );
  },
);

SidebarSection.displayName = 'SidebarSection';

export interface SidebarNavItemProps extends Omit<HTMLAttributes<HTMLAnchorElement>, 'children'> {
  icon: ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  badge?: ReactNode;
}

export const SidebarNavItem = forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  ({ className, icon, label, href, isActive = false, badge, ...props }, ref) => {
    const { isCollapsed, shouldReduceMotion } = useSidebarContext('SidebarNavItem');

    return (
      <a
        ref={ref}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors duration-200 motion-reduce:transition-none',
          isActive
            ? 'bg-brand/10 text-foreground'
            : 'text-muted-foreground hover:bg-primary hover:text-foreground',
          isCollapsed && 'justify-center px-2',
          focusRing,
          className,
        )}
        href={href}
        title={isCollapsed ? label : undefined}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-md',
            isActive ? 'bg-brand/15 text-brand' : 'text-muted-foreground group-hover:text-foreground',
          )}
        >
          {icon}
        </span>

        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.span
              animate={{ opacity: 1, x: 0 }}
              className="flex min-w-0 flex-1 items-center justify-between gap-2"
              exit={{ opacity: 0, x: -8 }}
              initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
              transition={shouldReduceMotion ? DURATION_INSTANT : { duration: 0.2, ease: EASE_OUT }}
            >
              <span className="truncate font-medium">{label}</span>
              {badge ? (
                typeof badge === 'string' || typeof badge === 'number' ? (
                  <Badge appearance="soft" size="sm" variant="primary">
                    {badge}
                  </Badge>
                ) : (
                  badge
                )
              ) : null}
            </motion.span>
          )}
        </AnimatePresence>
      </a>
    );
  },
);

SidebarNavItem.displayName = 'SidebarNavItem';

export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => {
    const { isCollapsed } = useSidebarContext('SidebarFooter');

    return (
      <div
        ref={ref}
        className={cn(
          'mt-auto shrink-0 border-t border-border px-2 py-3',
          isCollapsed && 'flex justify-center',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SidebarFooter.displayName = 'SidebarFooter';

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
>;

export interface SidebarToggleProps extends NativeButtonProps {
  /** Override the default toggle behaviour. */
  onToggle?: () => void;
}

export const SidebarToggle = forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, onToggle, onClick, ...props }, ref) => {
    const { isCollapsed, toggleCollapsed } = useSidebarContext('SidebarToggle');

    return (
      <button
        ref={ref}
        aria-expanded={!isCollapsed}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={cn(
          'inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-primary hover:text-foreground motion-reduce:transition-none',
          focusRing,
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            onToggle?.();
            toggleCollapsed();
          }
        }}
        type="button"
        {...props}
      >
        <PanelLeftIcon className="size-4" />
      </button>
    );
  },
);

SidebarToggle.displayName = 'SidebarToggle';
