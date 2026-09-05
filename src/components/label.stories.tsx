import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "./input";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  args: { children: "Label" },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const Disabled: Story = {
  render: () => (
    <div className="group flex w-64 flex-col gap-2" data-disabled="">
      <Label htmlFor="label-disabled">Disabled</Label>
      <Input id="label-disabled" disabled defaultValue="Value" />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="label-invalid">Invalid</Label>
      <Input id="label-invalid" aria-invalid defaultValue="Value" />
    </div>
  ),
};
