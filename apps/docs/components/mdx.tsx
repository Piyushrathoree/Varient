import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ComponentPreview } from '@/components/preview/component-preview';
import { PropsTable, buttonProps, inputProps } from '@/components/docs/props-table';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    PropsTable,
    ButtonPropsTable: () => <PropsTable props={buttonProps} />,
    InputPropsTable: () => <PropsTable props={inputProps} />,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
