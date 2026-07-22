export interface PropRow {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

interface PropsTableProps {
  props: PropRow[];
}

/**
 * Props table — hand-authored: a hairline card, a quiet mono-eyebrow header
 * row, and a brand-colored required marker next to prop names whose
 * description leads with "Required".
 */
export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="my-6 overflow-x-auto overflow-hidden rounded-xl border border-border">
      <table className="w-full min-w-[32rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50 text-left">
            <th className="px-4 py-2.5 font-mono text-[11px] tracking-wider text-smooth-800 uppercase">
              Prop
            </th>
            <th className="px-4 py-2.5 font-mono text-[11px] tracking-wider text-smooth-800 uppercase">
              Type
            </th>
            <th className="hidden px-4 py-2.5 font-mono text-[11px] tracking-wider text-smooth-800 uppercase sm:table-cell">
              Default
            </th>
            <th className="px-4 py-2.5 font-mono text-[11px] tracking-wider text-smooth-800 uppercase">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => {
            const isRequired = /^required\b/i.test(prop.description);
            return (
              <tr key={prop.name} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5 font-mono text-xs whitespace-nowrap text-foreground">
                  {prop.name}
                  {isRequired && (
                    <span className="ml-0.5 text-brand" aria-hidden="true">
                      *
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 font-mono text-[12.5px] text-muted-foreground">
                  {prop.type}
                </td>
                <td className="hidden px-4 py-2.5 font-mono text-xs text-muted-foreground/70 sm:table-cell">
                  {prop.defaultValue ?? '—'}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{prop.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export const buttonProps: PropRow[] = [
  { name: 'variant', type: 'ButtonVariant', defaultValue: "'default'", description: 'Visual style of the button — default, primary, secondary, ghost, outline, destructive, link, sweep, or frame.' },
  { name: 'size', type: 'ButtonSize', defaultValue: "'md'", description: 'Height and padding preset — xs, sm, md, lg, or xl.' },
  { name: 'isLoading', type: 'boolean', defaultValue: 'false', description: 'Shows a spinner in place of the label and disables interaction.' },
  { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables the button.' },
  { name: 'leftIcon', type: 'ReactNode', description: 'Icon rendered before the label.' },
  { name: 'rightIcon', type: 'ReactNode', description: 'Icon rendered after the label.' },
  { name: 'asChild', type: 'boolean', defaultValue: 'false', description: 'Merges button styles and behavior onto its child element instead of rendering a <button>.' },
  { name: 'children', type: 'ReactNode', description: 'Button label content.' },
  { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
];

export const inputProps: PropRow[] = [
  { name: 'label', type: 'string', description: 'Label text rendered above the input.' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text inside the input.' },
  { name: 'helperText', type: 'string', description: 'Helper text shown below the input.' },
  { name: 'errorText', type: 'string', description: 'Error message — triggers error styling and takes over from helperText.' },
  { name: 'variant', type: "'default' | 'frame'", defaultValue: "'default'", description: "'frame' pairs with Button variant=\"frame\" — a gradient-rimmed input that glows on focus." },
  { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables the input.' },
  { name: 'isReadOnly', type: 'boolean', defaultValue: 'false', description: 'Makes the input read-only.' },
  { name: 'isRequired', type: 'boolean', defaultValue: 'false', description: 'Marks the field as required.' },
  { name: 'leftAddon', type: 'ReactNode', description: 'Icon or content inside the left edge.' },
  { name: 'rightAddon', type: 'ReactNode', description: 'Icon or content inside the right edge.' },
  { name: 'size', type: 'InputSize', defaultValue: "'md'", description: 'Height and padding preset — sm, md, or lg.' },
  { name: 'type', type: 'string', defaultValue: "'text'", description: 'Native input type attribute.' },
  { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
];

export const switchProps: PropRow[] = [
  { name: 'isChecked', type: 'boolean', description: 'Required — the current on/off state.' },
  { name: 'onChange', type: '(checked: boolean) => void', description: 'Required — called with the next state when toggled.' },
  { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables the switch.' },
  { name: 'size', type: 'SwitchSize', defaultValue: "'md'", description: 'Track/thumb size — sm, md, or lg.' },
  { name: 'label', type: 'string', description: 'Inline label rendered next to the track and linked via htmlFor.' },
  { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the track.' },
];

export const tabsProps: PropRow[] = [
  { name: 'value', type: 'string', description: 'Controlled active tab value — pass with onValueChange (Tabs root).' },
  { name: 'defaultValue', type: 'string', description: 'Initial active tab for uncontrolled usage (Tabs root).' },
  { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the active tab changes (Tabs root).' },
  { name: 'variant', type: "'underline' | 'pills'", defaultValue: "'underline'", description: 'Visual style shared by List and Trigger (Tabs root).' },
  { name: 'Tabs.Trigger value', type: 'string', description: 'Required — the tab value this trigger activates.' },
  { name: 'Tabs.Content value', type: 'string', description: 'Required — shows this panel when it matches the active value.' },
];

export const badgeProps: PropRow[] = [
  { name: 'variant', type: 'BadgeVariant', defaultValue: "'default'", description: 'Tinted wash + matching ink — default, primary, secondary, success, warning, danger, or outline.' },
  { name: 'size', type: 'BadgeSize', defaultValue: "'md'", description: 'Padding and text size — sm, md, or lg.' },
  { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
];

export const cardProps: PropRow[] = [
  { name: 'variant', type: "'default' | 'outline' | 'ghost'", defaultValue: "'default'", description: 'default is the hairline surface; outline drops the fill; ghost drops both border and fill.' },
  { name: 'isHoverable', type: 'boolean', defaultValue: 'false', description: 'Lifts and brightens the hairline on hover — for cards in a browsable grid.' },
  { name: 'isClickable', type: 'boolean', defaultValue: 'false', description: 'Marks the card as an interactive target: pointer cursor, press feedback, and keyboard activation (Enter/Space).' },
  { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
  { name: 'Card.Header / Body / Footer', type: 'HTMLAttributes<HTMLDivElement>', description: 'Layout slots — standard div props.' },
  { name: 'Card.Title', type: 'HTMLAttributes<HTMLHeadingElement>', description: 'Renders an h3.' },
  { name: 'Card.Description', type: 'HTMLAttributes<HTMLParagraphElement>', description: 'Renders a p.' },
];

export const numberTickerProps: PropRow[] = [
  { name: 'value', type: 'number', description: 'Required — the target value counted up to.' },
  { name: 'prefix', type: 'string', defaultValue: "''", description: 'Text rendered before the number, e.g. "$".' },
  { name: 'suffix', type: 'string', defaultValue: "''", description: 'Text rendered after the number, e.g. "%" or "+".' },
  { name: 'decimalPlaces', type: 'number', defaultValue: '0', description: 'Fixed number of decimal places shown while counting and at rest.' },
  { name: 'duration', type: 'number', defaultValue: '1.2', description: 'Count-up duration in seconds.' },
  { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
];
