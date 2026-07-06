'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../../lib/utils';

export type TabsVariant = 'underline' | 'pills';

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled active tab value. */
  value?: string;
  /** Initial active tab value for uncontrolled usage. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
}

interface TabsContextValue {
  value: string | undefined;
  setValue: (value: string) => void;
  variant: TabsVariant;
  idBase: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`Tabs.${component} must be rendered inside <Tabs>.`);
  }
  return ctx;
}

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
  (
    { className, value: valueProp, defaultValue, onValueChange, variant = 'underline', children, ...props },
    ref,
  ) => {
    const idBase = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? valueProp : internalValue;

    const setValue = useCallback(
      (next: string) => {
        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
      },
      [isControlled, onValueChange],
    );

    const contextValue = useMemo<TabsContextValue>(
      () => ({ value: currentValue, setValue, variant, idBase }),
      [currentValue, setValue, variant, idBase],
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} className={cn('flex flex-col gap-3', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
TabsRoot.displayName = 'Tabs';

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

const TAB_SELECTOR = '[role="tab"]:not(:disabled)';

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, onKeyDown, children, ...props }, ref) => {
    const { variant } = useTabsContext('List');

    // Arrow-key roving-tabindex navigation (WAI-ARIA APG "automatic
    // activation" tabs pattern) — focusing a tab also selects it, same as a
    // native OS tab strip.
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;

        event.preventDefault();
        const tabs = Array.from(
          event.currentTarget.querySelectorAll<HTMLButtonElement>(TAB_SELECTOR),
        );
        if (tabs.length === 0) return;

        const activeIndex = tabs.findIndex((tab) => tab === document.activeElement);
        let nextIndex = activeIndex === -1 ? 0 : activeIndex;

        if (event.key === 'ArrowRight') nextIndex = (activeIndex + 1 + tabs.length) % tabs.length;
        else if (event.key === 'ArrowLeft')
          nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = tabs.length - 1;

        tabs[nextIndex]?.focus();
        tabs[nextIndex]?.click();
      },
      [onKeyDown],
    );

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center gap-1',
          variant === 'underline' ? 'border-b border-border' : 'rounded-full bg-muted p-1',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsList.displayName = 'Tabs.List';

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, onClick, disabled, children, ...props }, ref) => {
    const { value: activeValue, setValue, variant, idBase } = useTabsContext('Trigger');
    const isSelected = activeValue === value;
    const triggerId = `${idBase}-trigger-${value}`;
    const panelId = `${idBase}-panel-${value}`;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={triggerId}
        aria-selected={isSelected}
        aria-controls={panelId}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setValue(value);
        }}
        className={cn(
          'relative inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-colors duration-150 ease-out motion-reduce:transition-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50',
          variant === 'underline'
            ? cn(
                '-mb-px border-b-2',
                // The indicator bar carries the brand color; the label itself
                // stays neutral (foreground/muted-foreground), matching
                // SmoothUI's underline tabs.
                isSelected
                  ? 'border-brand text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )
            : cn(
                'rounded-full',
                // Selected pill is a raised neutral chip (background + hairline
                // + shadow), not a brand fill — matches SmoothUI's pill/segment tabs.
                isSelected
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              ),
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
TabsTrigger.displayName = 'Tabs.Trigger';

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: activeValue, idBase } = useTabsContext('Content');
    const isSelected = activeValue === value;
    const triggerId = `${idBase}-trigger-${value}`;
    const panelId = `${idBase}-panel-${value}`;

    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={triggerId}
        tabIndex={0}
        className={cn(
          'rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsContent.displayName = 'Tabs.Content';

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
