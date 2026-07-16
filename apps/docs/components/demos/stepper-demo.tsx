'use client';

import { useState } from 'react';
import { Stepper } from '@varient/ui';

const CHECKOUT_STEPS = [
  {
    title: 'Cart',
    description: 'Review items',
    content: '3 items in your cart — free shipping applied.',
  },
  {
    title: 'Shipping',
    description: 'Delivery address',
    content: 'Shipping to 42 Ember Street, Portland, OR.',
  },
  {
    title: 'Payment',
    description: 'Card details',
    content: 'Visa ending in 4242, billed at checkout.',
  },
  {
    title: 'Confirm',
    description: 'Place order',
    content: 'Review your order summary before confirming.',
  },
];

function CheckoutStepperCard() {
  const [activeStep, setActiveStep] = useState(0);
  const isLast = activeStep === CHECKOUT_STEPS.length - 1;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
      <Stepper activeStep={activeStep} onStepChange={setActiveStep}>
        {CHECKOUT_STEPS.map((step) => (
          <Stepper.Item key={step.title} title={step.title} description={step.description} />
        ))}
        <Stepper.Content className="min-h-16 pt-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {CHECKOUT_STEPS[activeStep].content}
          </p>
        </Stepper.Content>
      </Stepper>

      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={activeStep === 0}
          onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
          className="cursor-pointer rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors duration-150 ease-out hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
        >
          Back
        </button>
        <button
          type="button"
          disabled={isLast}
          onClick={() => setActiveStep((step) => Math.min(CHECKOUT_STEPS.length - 1, step + 1))}
          className="cursor-pointer rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-brand-secondary disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
        >
          {isLast ? 'Done' : 'Next'}
        </button>
      </div>
      <span className="text-center text-xs font-medium text-muted-foreground">
        Horizontal — Back/Next wired, with Stepper.Content
      </span>
    </div>
  );
}

const SETTINGS_STEPS = [
  { title: 'Account', description: 'Basic profile info' },
  { title: 'Security', description: 'Password & 2FA' },
  { title: 'Preferences', description: 'Notifications & theme' },
];

function VerticalStepperCard() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6">
      <Stepper
        activeStep={activeStep}
        onStepChange={setActiveStep}
        orientation="vertical"
        isNavigable
        className="w-full max-w-60"
      >
        {SETTINGS_STEPS.map((step) => (
          <Stepper.Item key={step.title} title={step.title} description={step.description} />
        ))}
      </Stepper>
      <span className="text-xs font-medium text-muted-foreground">
        Vertical — isNavigable, any step clickable
      </span>
    </div>
  );
}

const NONLINEAR_STEPS = ['Details', 'Photos', 'Pricing', 'Review', 'Publish'];

function NonLinearStepperCard() {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6">
      <Stepper
        activeStep={activeStep}
        onStepChange={setActiveStep}
        isNavigable
        className="w-full"
      >
        {NONLINEAR_STEPS.map((title) => (
          <Stepper.Item key={title} title={title} />
        ))}
      </Stepper>
      <span className="text-xs font-medium text-muted-foreground">
        Non-linear — click any dot to jump directly to that step
      </span>
    </div>
  );
}

export function StepperDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
      <CheckoutStepperCard />
      <VerticalStepperCard />
      <div className="lg:col-span-2">
        <NonLinearStepperCard />
      </div>
    </div>
  );
}

export function StepperPreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center px-6">
      <Stepper activeStep={1} className="w-full max-w-65">
        <Stepper.Item title="Cart" />
        <Stepper.Item title="Shipping" />
        <Stepper.Item title="Payment" />
      </Stepper>
    </div>
  );
}
