'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ToastViewport } from './toast';
import type { ToastOptions, ToastRecord } from './types';

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// Older toasts drop off the front once the visible stack exceeds this many.
const TOAST_LIMIT = 4;
let idCounter = 0;

// Context + state owner. Renders children untouched and mounts the toast
// viewport (a portal) alongside them — drop this once near the root of
// whatever tree needs toast({ ... }).
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    idCounter += 1;
    const id = `toast-${idCounter}`;
    setToasts((current) => {
      const next = [...current, { id, ...options }];
      return next.length > TOAST_LIMIT ? next.slice(next.length - TOAST_LIMIT) : next;
    });
    return id;
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>.');
  }
  return ctx;
}
