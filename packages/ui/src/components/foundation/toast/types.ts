import type { ReactNode } from 'react';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastAction {
  /** Action button label. */
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms — default 5000, 0 disables auto-dismiss. */
  duration?: number;
  action?: ToastAction;
}

/** Internal — a queued toast with its generated id. */
export interface ToastRecord extends ToastOptions {
  id: string;
}
