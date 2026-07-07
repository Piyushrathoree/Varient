'use client';

import { useMemo, type ReactNode } from 'react';
import { useToastContext } from './toast-provider';
import type { ToastOptions, ToastVariant } from './types';

type ToastShorthandOptions = Omit<ToastOptions, 'title' | 'variant'>;

export interface ToastFn {
  (options: ToastOptions): string;
  success: (title: ReactNode, options?: ToastShorthandOptions) => string;
  error: (title: ReactNode, options?: ToastShorthandOptions) => string;
  warning: (title: ReactNode, options?: ToastShorthandOptions) => string;
  info: (title: ReactNode, options?: ToastShorthandOptions) => string;
}

export interface UseToastReturn {
  toast: ToastFn;
  dismiss: (id: string) => void;
}

function withVariant(base: (options: ToastOptions) => string, variant: ToastVariant) {
  return (title: ReactNode, options?: ToastShorthandOptions) =>
    base({ ...options, title, variant });
}

// toast(...) is callable directly (default variant) and carries
// success/error/warning/info shorthands, e.g. toast.success('Saved').
export function useToast(): UseToastReturn {
  const { toast: baseToast, dismiss } = useToastContext();

  const toast = useMemo(() => {
    const fn = ((options: ToastOptions) => baseToast(options)) as ToastFn;
    fn.success = withVariant(baseToast, 'success');
    fn.error = withVariant(baseToast, 'error');
    fn.warning = withVariant(baseToast, 'warning');
    fn.info = withVariant(baseToast, 'info');
    return fn;
  }, [baseToast]);

  return { toast, dismiss };
}
