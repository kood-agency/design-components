import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";
import { Label } from "./label";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  args: { placeholder: "Placeholder", defaultValue: "Value" },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const Invalid: Story = { args: { "aria-invalid": true } };

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="textarea-with-label">Notes</Label>
      <Textarea id="textarea-with-label" {...args} />
    </div>
  ),
};
