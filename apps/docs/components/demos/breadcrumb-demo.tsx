'use client';

import { Breadcrumb } from '@varient/ui';

export function BreadcrumbDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
        <span className="text-xs font-medium text-muted-foreground">Default</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Ellipsis />
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Navigation</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
        <span className="text-xs font-medium text-muted-foreground">With ellipsis</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>/</Breadcrumb.Separator>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>/</Breadcrumb.Separator>
            <Breadcrumb.Item>
              <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
        <span className="text-xs font-medium text-muted-foreground">Custom separator</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
        <Breadcrumb.Auto
          items={[
            { label: 'Home', href: '#' },
            { label: 'Workspace', href: '#' },
            { label: 'Projects', href: '#' },
            { label: 'Varient', href: '#' },
            { label: 'Components', href: '#' },
            { label: 'Foundation', href: '#' },
            { label: 'Breadcrumb', isCurrent: true },
          ]}
          maxItems={4}
        />
        <span className="text-xs font-medium text-muted-foreground">
          Auto-collapsed (click … to expand)
        </span>
      </div>
    </div>
  );
}

export function BreadcrumbPreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center">
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Docs</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    </div>
  );
}
