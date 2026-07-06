import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="font-display select-none text-xl font-medium tracking-tight text-foreground">
          Vari<span className="text-brand">ent</span>
        </span>
      ),
    },
    links: [
      {
        text: 'Components',
        url: '/components',
      },
      {
        text: 'Docs',
        url: '/docs',
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
