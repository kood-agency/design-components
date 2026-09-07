import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";
import { Label } from "./label";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const Invalid: Story = { args: { "aria-invalid": true } };

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="switch-with-label" {...args} />
      <Label htmlFor="switch-with-label">Airplane mode</Label>
    </div>
  ),
};

export const Checked: Story = { args: { defaultChecked: true } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Switch id="switch-small" size="sm" />
        <Label htmlFor="switch-small">Small</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="switch-default" />
        <Label htmlFor="switch-default">Default</Label>
      </div>
    </div>
  ),
};
