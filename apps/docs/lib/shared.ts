export const appName = 'Varient';

/** Canonical site origin — used to build absolute registry/CLI URLs (shadcn `add` command, JSON-LD, etc.). */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://varient.dev';

export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: 'piyush',
  repo: 'varient',
  branch: 'main',
};
