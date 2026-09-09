import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: { placeholder: "Placeholder", defaultValue: "Value" },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const Glass: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      <Input variant="glass" data-testid="glass" placeholder="Glass input" />
      <Input variant="glass-strong" data-testid="glass-strong" placeholder="Strong glass input" />
    </div>
  ),
};

export const Invalid: Story = {
  args: { "aria-invalid": true },
  render: (args) => (
    <div className="flex w-64 flex-col gap-2">
      <Input aria-describedby="input-invalid-description" {...args} />
      <p id="input-invalid-description" role="alert" className="text-destructive text-sm">
        Enter a valid email address.
      </p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="input-with-label">Email</Label>
      <Input id="input-with-label" {...args} />
    </div>
  ),
};
