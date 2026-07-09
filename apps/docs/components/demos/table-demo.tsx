'use client';

import { Badge, Card, Table } from '@varient/ui';

const invoices = [
  { id: 'INV-001', customer: 'Acme Corp', status: 'paid' as const, amount: '$1,250.00' },
  { id: 'INV-002', customer: 'Globex Ltd', status: 'pending' as const, amount: '$780.50' },
  { id: 'INV-003', customer: 'Initech', status: 'overdue' as const, amount: '$2,140.00' },
  { id: 'INV-004', customer: 'Umbrella Co', status: 'paid' as const, amount: '$420.00' },
  { id: 'INV-005', customer: 'Stark Industries', status: 'pending' as const, amount: '$3,890.25' },
];

const statusVariant = {
  paid: 'success',
  pending: 'warning',
  overdue: 'danger',
} as const;

export function TableDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Card className="w-full border-0 shadow-none">
          <Card.Header className="px-0 pt-0">
            <Card.Title>Recent invoices</Card.Title>
            <Card.Description>A list of your latest billing activity.</Card.Description>
          </Card.Header>
          <Card.Body className="px-0 pb-0">
            <Table>
              <Table.Caption>A list of recent invoices and their payment status.</Table.Caption>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Invoice</Table.Head>
                  <Table.Head>Customer</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head className="text-right">Amount</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {invoices.map((invoice) => (
                  <Table.Row key={invoice.id}>
                    <Table.Cell className="font-medium">{invoice.id}</Table.Cell>
                    <Table.Cell>{invoice.customer}</Table.Cell>
                    <Table.Cell>
                      <Badge variant={statusVariant[invoice.status]} appearance="soft" size="sm">
                        {invoice.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="text-right">{invoice.amount}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.Cell colSpan={3}>Total</Table.Cell>
                  <Table.Cell className="text-right">$8,480.75</Table.Cell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Card.Body>
        </Card>
        <span className="text-xs font-medium text-muted-foreground">Invoice table</span>
      </div>
    </div>
  );
}

export function TablePreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center">
      <Table className="max-w-[240px]">
        <Table.Header>
          <Table.Row>
            <Table.Head className="h-8 px-3">Name</Table.Head>
            <Table.Head className="h-8 px-3">Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell className="px-3 py-2">Alpha</Table.Cell>
            <Table.Cell className="px-3 py-2">
              <Badge variant="success" appearance="soft" size="sm">
                Active
              </Badge>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="px-3 py-2">Beta</Table.Cell>
            <Table.Cell className="px-3 py-2">
              <Badge variant="warning" appearance="soft" size="sm">
                Pending
              </Badge>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
