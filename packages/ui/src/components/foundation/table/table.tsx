'use client';

import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import { cn } from '../../../lib/utils';

export type TableVariant = 'default' | 'striped';
export type TableSize = 'default' | 'compact';

interface TableContextValue {
  variant: TableVariant;
  size: TableSize;
  isStickyHeader: boolean;
}

const TableContext = createContext<TableContextValue>({
  variant: 'default',
  size: 'default',
  isStickyHeader: false,
});

const useTableContext = () => useContext(TableContext);

const bodyVariantClasses: Record<TableVariant, string> = {
  default: '',
  striped: '[&_tr:nth-child(odd)]:bg-muted/30',
};

const headSizeClasses: Record<TableSize, string> = {
  default: 'h-10 px-4',
  compact: 'h-8 px-3',
};

const cellSizeClasses: Record<TableSize, string> = {
  default: 'px-4 py-3',
  compact: 'px-3 py-1.5',
};

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  /** `striped` tints odd body rows with `bg-muted/30`. @default 'default' */
  variant?: TableVariant;
  /** `compact` tightens header height and cell padding. @default 'default' */
  size?: TableSize;
  /** Pins `Table.Header` to the top of the scroll container with a blurred backdrop. @default false */
  isStickyHeader?: boolean;
}

const TableRoot = forwardRef<HTMLDivElement, TableProps>(
  (
    {
      className,
      children,
      variant = 'default',
      size = 'default',
      isStickyHeader = false,
      ...props
    },
    ref,
  ) => (
    <TableContext.Provider value={{ variant, size, isStickyHeader }}>
      <div
        ref={ref}
        className={cn('w-full overflow-x-auto rounded-xl border border-border', className)}
        {...props}
      >
        <table className="w-full caption-bottom text-sm">{children}</table>
      </div>
    </TableContext.Provider>
  ),
);
TableRoot.displayName = 'Table';

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    const { isStickyHeader } = useTableContext();
    return (
      <thead
        ref={ref}
        className={cn(
          '[&_tr]:border-b [&_tr]:border-border',
          isStickyHeader && 'sticky top-0 z-10 bg-background/95 backdrop-blur-sm',
          className,
        )}
        {...props}
      />
    );
  },
);
TableHeader.displayName = 'Table.Header';

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    const { variant } = useTableContext();
    return (
      <tbody
        ref={ref}
        className={cn(
          '[&_tr:last-child]:border-0 [&_tr]:border-b [&_tr]:border-border [&_tr]:transition-colors [&_tr]:hover:bg-muted/30',
          bodyVariantClasses[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
TableBody.displayName = 'Table.Body';

export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {}

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        'border-t border-border bg-muted/50 font-medium [&_tr]:border-b [&_tr]:border-border',
        className,
      )}
      {...props}
    />
  ),
);
TableFooter.displayName = 'Table.Footer';

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('border-b border-border transition-colors', className)}
      {...props}
    />
  ),
);
TableRow.displayName = 'Table.Row';

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {}

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, scope = 'col', ...props }, ref) => {
    const { size } = useTableContext();
    return (
      <th
        ref={ref}
        scope={scope}
        className={cn(
          'bg-muted/50 text-left align-middle font-medium text-muted-foreground',
          headSizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
TableHead.displayName = 'Table.Head';

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => {
    const { size } = useTableContext();
    return (
      <td
        ref={ref}
        className={cn('align-middle text-foreground', cellSizeClasses[size], className)}
        {...props}
      />
    );
  },
);
TableCell.displayName = 'Table.Cell';

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  ),
);
TableCaption.displayName = 'Table.Caption';

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
});

export {
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
