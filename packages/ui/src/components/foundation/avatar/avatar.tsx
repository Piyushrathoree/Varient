'use client';

import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
  useState,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION, DURATION_INSTANT } from '../../../lib/animation';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

const avatarSizeStyles: Record<AvatarSize, string> = {
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-10',
  xl: 'size-14',
};

const avatarTextSizeStyles: Record<AvatarSize, string> = {
  sm: 'text-[10px]',
  md: 'text-xs',
  lg: 'text-sm',
  xl: 'text-base',
};

const statusDotSizeStyles: Record<AvatarSize, string> = {
  sm: 'size-1.5',
  md: 'size-2',
  lg: 'size-2.5',
  xl: 'size-3',
};

const statusColorStyles: Record<AvatarStatus, string> = {
  online: 'bg-success',
  offline: 'bg-muted-foreground',
  away: 'bg-warning',
  busy: 'bg-destructive',
};

const statusLabel: Record<AvatarStatus, string> = {
  online: 'Online',
  offline: 'Offline',
  away: 'Away',
  busy: 'Busy',
};

interface AvatarContextValue {
  size: AvatarSize;
}

const AvatarContext = createContext<AvatarContextValue | null>(null);

function useAvatarContext(component: string): AvatarContextValue {
  const ctx = useContext(AvatarContext);
  if (!ctx) {
    throw new Error(`Avatar.${component} must be rendered inside <Avatar>.`);
  }
  return ctx;
}

function formatInitials(value: string): string {
  if (value.startsWith('+')) return value;
  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase();
}

function StatusIndicator({ size, status }: { size: AvatarSize; status: AvatarStatus }) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute right-0 bottom-0 rounded-full ring-2 ring-background',
        statusDotSizeStyles[size],
        statusColorStyles[status],
      )}
    />
  );
}

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  /** Initials shown when the image is missing or fails to load. */
  fallback?: string;
  status?: AvatarStatus;
  children?: ReactNode;
}

const AvatarRoot = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      className,
      size = 'md',
      src,
      alt,
      fallback,
      status,
      children,
      'aria-label': ariaLabelProp,
      ...props
    },
    ref,
  ) => {
    const contextValue = useMemo(() => ({ size }), [size]);
    const resolvedAriaLabel =
      ariaLabelProp ??
      (status && !alt ? `User avatar, ${statusLabel[status].toLowerCase()}` : undefined);

    const content =
      children ??
      (src || fallback ? (
        <>
          {src ? <AvatarImageComp src={src} alt={alt} /> : null}
          {fallback ? (
            <AvatarFallbackComp>{formatInitials(fallback)}</AvatarFallbackComp>
          ) : null}
        </>
      ) : null);

    return (
      <AvatarContext.Provider value={contextValue}>
        <span className="relative inline-flex shrink-0" data-slot="avatar">
          <AvatarPrimitive.Root
            ref={ref}
            aria-label={resolvedAriaLabel}
            className={cn(
              'relative inline-flex shrink-0 overflow-hidden rounded-full ring-1 ring-border',
              avatarSizeStyles[size],
              className,
            )}
            {...props}
          >
            {content}
          </AvatarPrimitive.Root>
          {status ? <StatusIndicator size={size} status={status} /> : null}
        </span>
      </AvatarContext.Provider>
    );
  },
);
AvatarRoot.displayName = 'Avatar';

export type AvatarImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  onLoadingStatusChange?: (status: 'idle' | 'loading' | 'loaded' | 'error') => void;
};

const AvatarImageComp = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, onLoad, onLoadingStatusChange, src, alt }, ref) => {
    useAvatarContext('Image');
    const shouldReduceMotion = useReducedMotion();
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <AvatarPrimitive.Image
        asChild
        onLoadingStatusChange={(next) => {
          setIsLoaded(next === 'loaded');
          onLoadingStatusChange?.(next);
        }}
      >
        <motion.img
          ref={ref}
          src={src}
          alt={alt}
          className={cn('aspect-square size-full object-cover', className)}
          initial={false}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={
            shouldReduceMotion ? DURATION_INSTANT : { duration: DURATION.default, ease: 'easeOut' }
          }
          onLoad={onLoad}
        />
      </AvatarPrimitive.Image>
    );
  },
);
AvatarImageComp.displayName = 'Avatar.Image';

export interface AvatarFallbackProps extends HTMLAttributes<HTMLSpanElement> {
  delayMs?: number;
}

const AvatarFallbackComp = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, children, delayMs, ...props }, ref) => {
    const { size } = useAvatarContext('Fallback');
    const shouldReduceMotion = useReducedMotion();
    const label =
      typeof children === 'string' ? formatInitials(children) : children;

    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        delayMs={delayMs}
        className={cn(
          'flex size-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground',
          avatarTextSizeStyles[size],
          className,
        )}
        {...props}
      >
        {shouldReduceMotion ? (
          label
        ) : (
          <motion.span
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: DURATION.default, ease: 'easeOut' }}
          >
            {label}
          </motion.span>
        )}
      </AvatarPrimitive.Fallback>
    );
  },
);
AvatarFallbackComp.displayName = 'Avatar.Fallback';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars to show before rendering a +N overflow chip. */
  max?: number;
  size?: AvatarSize;
  children: ReactNode;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, size = 'md', children, ...props }, ref) => {
    const childArray = Children.toArray(children).filter(isValidElement) as ReactElement<
      AvatarProps & { className?: string }
    >[];
    const visibleCount = max !== undefined ? Math.min(max, childArray.length) : childArray.length;
    const overflowCount =
      max !== undefined && childArray.length > max ? childArray.length - max : 0;

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center', className)}
        role="group"
        aria-label="Avatar group"
        {...props}
      >
        {childArray.slice(0, visibleCount).map((child, index) => (
          <span
            key={child.key ?? `avatar-${index}`}
            className={cn(index > 0 && '-ml-2')}
          >
            {cloneElement(child, {
              size: child.props.size ?? size,
              className: cn('ring-2 ring-background', child.props.className),
            })}
          </span>
        ))}
        {overflowCount > 0 ? (
          <span className="-ml-2">
            <AvatarRoot
              size={size}
              fallback={`+${overflowCount}`}
              className="ring-2 ring-background"
              aria-label={`${overflowCount} more`}
            />
          </span>
        ) : null}
      </div>
    );
  },
);
AvatarGroup.displayName = 'AvatarGroup';

export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImageComp,
  Fallback: AvatarFallbackComp,
});

export const AvatarImage = AvatarImageComp;
export const AvatarFallback = AvatarFallbackComp;
