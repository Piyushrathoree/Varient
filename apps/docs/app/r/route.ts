import { NextResponse } from 'next/server';
import { components } from '@/lib/components/registry';
import { SITE_URL } from '@/lib/shared';

export const dynamic = 'force-static';

/** Registry index — `GET /r`. Individual items live at `/r/<slug>.json`. */
export async function GET() {
  const items = components
    .filter((c) => c.status === 'shipped')
    .map((c) => ({
      name: c.slug,
      type: 'registry:ui',
      title: c.name,
      description: c.description,
    }));

  return NextResponse.json({
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'varient',
    homepage: SITE_URL,
    items,
  });
}
