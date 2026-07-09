'use client';

import { useState } from 'react';
import { Pagination } from '@varient/ui';

export function PaginationDemo() {
  const [fewPage, setFewPage] = useState(2);
  const [manyPage, setManyPage] = useState(5);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(10);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Pagination page={fewPage} pageCount={3} onPageChange={setFewPage} />
        <span className="text-xs font-medium text-muted-foreground">Few pages</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Pagination page={manyPage} pageCount={10} onPageChange={setManyPage} siblingCount={1} />
        <span className="text-xs font-medium text-muted-foreground">Many pages (ellipsis)</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Pagination page={startPage} pageCount={10} onPageChange={setStartPage} />
        <span className="text-xs font-medium text-muted-foreground">First page (Prev disabled)</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Pagination page={endPage} pageCount={10} onPageChange={setEndPage} />
        <span className="text-xs font-medium text-muted-foreground">Last page (Next disabled)</span>
      </div>
    </div>
  );
}

export function PaginationPreviewCompact() {
  const [page, setPage] = useState(2);

  return (
    <div className="flex w-full items-center justify-center">
      <Pagination page={page} pageCount={3} onPageChange={setPage} />
    </div>
  );
}
