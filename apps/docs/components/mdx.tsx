import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { HTMLAttributes, AnchorHTMLAttributes } from 'react';
import { cn } from '@varient/ui';
import { ComponentPreview } from '@/components/preview/component-preview';
import { PropsTable, buttonProps, inputProps } from '@/components/docs/props-table';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    PropsTable,
    ButtonPropsTable: () => <PropsTable props={buttonProps} />,
    InputPropsTable: () => <PropsTable props={inputProps} />,
    pre: ({ className, ...props }: HTMLAttributes<HTMLPreElement>) => (
      <pre
        className={cn(
          'my-6 overflow-x-auto rounded-2xl border border-border/60 bg-neutral-950 p-5 text-sm leading-relaxed',
          className,
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
      const isInline = !className?.includes('language-');
      return (
        <code
          className={cn(
            isInline
              ? 'rounded-md bg-neutral-800/70 px-1.5 py-0.5 text-xs font-mono text-brand-300'
              : 'font-mono text-neutral-300',
            className,
          )}
          {...props}
        />
      );
    },
    h1: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        className={cn(
          'font-display mt-2 mb-6 text-4xl font-bold tracking-tight text-text-primary',
          className,
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className={cn(
          'font-display mt-10 mb-4 text-2xl font-semibold tracking-tight text-text-primary',
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className={cn(
          'font-display mt-8 mb-3 text-xl font-semibold text-text-primary',
          className,
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className={cn('mb-4 leading-relaxed text-text-secondary', className)}
        {...props}
      />
    ),
    a: ({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        className={cn(
          'text-brand-400 underline underline-offset-4 transition-colors hover:text-brand-300',
          className,
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => (
      <ul
        className={cn('my-4 ml-6 list-disc space-y-2 text-text-secondary', className)}
        {...props}
      />
    ),
    ol: ({ className, ...props }: HTMLAttributes<HTMLOListElement>) => (
      <ol
        className={cn('my-4 ml-6 list-decimal space-y-2 text-text-secondary', className)}
        {...props}
      />
    ),
    blockquote: ({ className, ...props }: HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className={cn(
          'my-6 rounded-2xl border-l-4 border-brand-500/50 bg-brand-500/5 px-6 py-4 text-text-secondary',
          className,
        )}
        {...props}
      />
    ),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
