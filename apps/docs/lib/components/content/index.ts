import type { ComponentDocContent } from '../content-types';

/**
 * Orchestrator-owned aggregation of per-slug content modules.
 * Agents add `content/<slug>.ts` files but NEVER edit this index — it is
 * regenerated centrally after each fan-out wave. An absent slug simply means
 * the detail page skips the props/features/accessibility sections.
 */
export const docContentBySlug: Record<string, ComponentDocContent> = {};

export function getDocContent(slug: string): ComponentDocContent | undefined {
  return docContentBySlug[slug];
}
