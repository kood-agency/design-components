import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  args: { children: "Toggle" },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};

export const Outline: Story = { args: { variant: "outline" } };

export const Glass: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Toggle variant="glass" data-testid="glass">
        Glass
      </Toggle>
      <Toggle variant="glass-strong" data-testid="glass-strong">
        Glass strong
      </Toggle>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true, children: "Disabled" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm">sm</Toggle>
      <Toggle size="default">default</Toggle>
      <Toggle size="lg">lg</Toggle>
    </div>
  ),
};
