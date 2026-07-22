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
          'my-6 overflow-x-auto rounded-xl border border-border bg-muted/40 p-5 text-sm leading-relaxed',
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
              ? 'rounded bg-smooth-200 px-1 py-0.5 font-mono text-xs text-brand'
              : 'font-mono text-muted-foreground',
            className,
          )}
          {...props}
        />
      );
    },
    h1: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        className={cn(
          'font-title mt-2 mb-6 text-3xl font-bold tracking-tight text-foreground',
          className,
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className={cn(
          'font-title mt-10 mb-4 text-lg font-semibold tracking-tight text-foreground',
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className={cn('font-title mt-8 mb-3 text-base font-semibold text-foreground', className)}
        {...props}
      />
    ),
    p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
      <p className={cn('mb-4 text-base leading-relaxed text-muted-foreground', className)} {...props} />
    ),
    a: ({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        className={cn(
          'text-brand underline-offset-4 transition-colors hover:underline',
          className,
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => (
      <ul
        className={cn('my-4 ml-6 list-disc space-y-2 text-muted-foreground', className)}
        {...props}
      />
    ),
    ol: ({ className, ...props }: HTMLAttributes<HTMLOListElement>) => (
      <ol
        className={cn('my-4 ml-6 list-decimal space-y-2 text-muted-foreground', className)}
        {...props}
      />
    ),
    blockquote: ({ className, ...props }: HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className={cn(
          'my-6 rounded-r-xl border-l-2 border-brand bg-smooth-100 px-6 py-4 text-muted-foreground',
          className,
        )}
        {...props}
      />
    ),
    strong: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
      <strong className={cn('font-semibold text-foreground', className)} {...props} />
    ),
    table: ({ className, ...props }: HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-border">
        <table className={cn('w-full border-collapse text-sm', className)} {...props} />
      </div>
    ),
    th: ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
      <th
        className={cn(
          'border-b border-border bg-muted/40 px-4 py-2.5 text-left font-medium text-foreground',
          className,
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
      <td
        className={cn('border-b border-border px-4 py-2.5 text-muted-foreground', className)}
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
