'use client';

import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { SPRING_DEFAULT } from '../../../lib/animation';
import { cn } from '../../../lib/utils';
import type { ToastRecord, ToastVariant } from './types';
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  CloseIcon,
  InfoIcon,
  XCircleIcon,
} from './toast-icons';

const DEFAULT_DURATION = 5000;

const variantIcon: Record<ToastVariant, ComponentType<{ className?: string }> | null> = {
  default: null,
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: AlertTriangleIcon,
  info: InfoIcon,
};

// success/error/warning are the only variants that carry a hue accent — info
// stays neutral (foreground) and default shows no status icon at all.
const variantIconClass: Record<ToastVariant, string> = {
  default: '',
  success: 'text-success',
  error: 'text-destructive',
  warning: 'text-warning',
  info: 'text-foreground',
};

interface ToastCardProps {
  toast: ToastRecord;
  onDismiss: (id: string) => void;
}

function ToastCard({ toast, onDismiss }: ToastCardProps) {
  const { id, title, description, action } = toast;
  const variant = toast.variant ?? 'default';
  const duration = toast.duration ?? DEFAULT_DURATION;
  const shouldReduceMotion = useReducedMotion();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = useRef(duration);
  const startedAtRef = useRef(Date.now());

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const scheduleTimer = useCallback(
    (ms: number) => {
      clearTimer();
      if (ms <= 0) return;
      startedAtRef.current = Date.now();
      timerRef.current = setTimeout(() => onDismiss(id), ms);
    },
    [clearTimer, id, onDismiss],
  );

  // duration <= 0 means the toast persists until dismissed by the user or
  // its action — otherwise it starts counting down as soon as it mounts.
  useEffect(() => {
    scheduleTimer(duration);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleMouseEnter = () => {
    clearTimer();
    remainingRef.current -= Date.now() - startedAtRef.current;
  };

  const handleMouseLeave = () => {
    scheduleTimer(Math.max(remainingRef.current, 0));
  };

  const Icon = variantIcon[variant];

  return (
    <motion.div
      layout
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={
        shouldReduceMotion
          ? { opacity: 0, transition: { duration: 0 } }
          : { opacity: 0, y: -8, transition: { duration: 0.15 } }
      }
      transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className="pointer-events-auto flex w-[356px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border border-border bg-popover p-4 shadow-xl"
    >
      {Icon && <Icon className={cn('mt-0.5 size-5 shrink-0', variantIconClass[variant])} />}

      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-medium text-popover-foreground">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {action && (
          <button
            type="button"
            onClick={() => {
              action.onClick();
              onDismiss(id);
            }}
            className="mt-1 self-start text-sm font-medium text-brand hover:underline"
          >
            {action.label}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
        className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <CloseIcon className="size-4" />
      </button>
    </motion.div>
  );
}

interface ToastViewportProps {
  toasts: ToastRecord[];
  onDismiss: (id: string) => void;
}

// Portals into document.body so the stack sits above app content — and
// escapes any overflow-hidden ancestor — regardless of where <ToastProvider>
// is mounted. The mounted-flag defers the portal past the first
// server-rendered pass, since document is unavailable on the server.
export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <div
      role="region"
      aria-label="Notifications"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col gap-2 sm:inset-x-auto sm:right-4"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((item) => (
          <ToastCard key={item.id} toast={item} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
