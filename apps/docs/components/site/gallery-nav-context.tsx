'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { ComponentLayer } from '@/lib/components/registry';
import { getCategoryAnchorId } from '@/lib/components/registry';

export type GalleryLayerFilter = ComponentLayer | 'all';

interface GalleryNavContextValue {
  activeAnchor: string | null;
  setActiveAnchor: (anchor: string | null) => void;
  /** The gallery's active layer filter — lifted here so sidebar navigation can
   *  broaden the filter when it targets a category outside the current view. */
  activeLayer: GalleryLayerFilter;
  setActiveLayer: (layer: GalleryLayerFilter) => void;
  /** Registered by the gallery on mount — clears its search query so a
   *  sidebar jump to a filtered-out category always resolves. */
  registerQueryReset: (fn: () => void) => void;
  scrollToCategory: (layer: ComponentLayer, category: string) => void;
}

const GalleryNavContext = createContext<GalleryNavContextValue | null>(null);

export function GalleryNavProvider({ children }: { children: ReactNode }) {
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<GalleryLayerFilter>('all');
  const queryResetRef = useRef<(() => void) | null>(null);

  const registerQueryReset = useCallback((fn: () => void) => {
    queryResetRef.current = fn;
  }, []);

  const scrollToCategory = useCallback((layer: ComponentLayer, category: string) => {
    const id = getCategoryAnchorId(layer, category);

    // Broaden any active filters that would hide the target category, then
    // wait a couple of frames for the grid to re-render before scrolling.
    setActiveLayer('all');
    queryResetRef.current?.();

    const scroll = () => {
      const target = document.getElementById(id);
      if (!target) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      window.history.replaceState(null, '', `#${id}`);
      setActiveAnchor(id);
    };

    requestAnimationFrame(() => requestAnimationFrame(scroll));
  }, []);

  const value = useMemo(
    () => ({
      activeAnchor,
      setActiveAnchor,
      activeLayer,
      setActiveLayer,
      registerQueryReset,
      scrollToCategory,
    }),
    [activeAnchor, activeLayer, registerQueryReset, scrollToCategory],
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
