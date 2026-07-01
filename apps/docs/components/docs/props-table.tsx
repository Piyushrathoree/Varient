interface PropRow {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

interface PropsTableProps {
  props: PropRow[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border/60">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/50 bg-neutral-900/40 text-left">
            <th className="px-4 py-3 font-medium text-text-primary">Prop</th>
            <th className="px-4 py-3 font-medium text-text-primary">Type</th>
            <th className="hidden px-4 py-3 font-medium text-text-primary sm:table-cell">
              Default
            </th>
            <th className="px-4 py-3 font-medium text-text-primary">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-border last:border-0">
              <td className="px-4 py-3 font-mono text-xs text-brand-500">{prop.name}</td>
              <td className="px-4 py-3 font-mono text-xs text-text-secondary">{prop.type}</td>
              <td className="hidden px-4 py-3 font-mono text-xs text-text-tertiary sm:table-cell">
                {prop.defaultValue ?? '—'}
              </td>
              <td className="px-4 py-3 text-text-secondary">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const buttonProps: PropRow[] = [
  { name: 'variant', type: 'ButtonVariant', defaultValue: "'default'", description: 'Visual style of the button.' },
  { name: 'size', type: 'ButtonSize', defaultValue: "'md'", description: 'Height and padding preset.' },
  { name: 'isLoading', type: 'boolean', defaultValue: 'false', description: 'Shows spinner and disables interaction.' },
  { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables the button.' },
  { name: 'leftIcon', type: 'ReactNode', description: 'Icon rendered before the label.' },
  { name: 'rightIcon', type: 'ReactNode', description: 'Icon rendered after the label.' },
  { name: 'children', type: 'ReactNode', description: 'Button label content.' },
  { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
];

export const inputProps: PropRow[] = [
  { name: 'label', type: 'string', description: 'Label text rendered above the input.' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text inside the input.' },
  { name: 'helperText', type: 'string', description: 'Helper text shown below the input.' },
  { name: 'errorText', type: 'string', description: 'Error message — triggers error styling.' },
  { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables the input.' },
  { name: 'isReadOnly', type: 'boolean', defaultValue: 'false', description: 'Makes the input read-only.' },
  { name: 'isRequired', type: 'boolean', defaultValue: 'false', description: 'Marks the field as required.' },
  { name: 'leftAddon', type: 'ReactNode', description: 'Icon or content inside the left edge.' },
  { name: 'rightAddon', type: 'ReactNode', description: 'Icon or content inside the right edge.' },
  { name: 'size', type: 'InputSize', defaultValue: "'md'", description: 'Height and padding preset.' },
  { name: 'type', type: 'string', defaultValue: "'text'", description: 'Native input type attribute.' },
  { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
];
