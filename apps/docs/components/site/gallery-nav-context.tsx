'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ComponentLayer } from '@/lib/components/registry';
import { getCategoryAnchorId } from '@/lib/components/registry';

interface GalleryNavContextValue {
  activeAnchor: string | null;
  setActiveAnchor: (anchor: string | null) => void;
  scrollToCategory: (layer: ComponentLayer, category: string) => void;
}

const GalleryNavContext = createContext<GalleryNavContextValue | null>(null);

export function GalleryNavProvider({ children }: { children: ReactNode }) {
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  const scrollToCategory = useCallback((layer: ComponentLayer, category: string) => {
    const id = getCategoryAnchorId(layer, category);
    const target = document.getElementById(id);
    if (!target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    window.history.replaceState(null, '', `#${id}`);
    setActiveAnchor(id);
  }, []);

  const value = useMemo(
    () => ({ activeAnchor, setActiveAnchor, scrollToCategory }),
    [activeAnchor, scrollToCategory],
  );

  return <GalleryNavContext.Provider value={value}>{children}</GalleryNavContext.Provider>;
}

export function useGalleryNav(): GalleryNavContextValue {
  const context = useContext(GalleryNavContext);
  if (!context) {
    throw new Error('useGalleryNav must be used within GalleryNavProvider');
  }
  return context;
}

export function useOptionalGalleryNav(): GalleryNavContextValue | null {
  return useContext(GalleryNavContext);
}
