import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="a" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args} disabled>
      <RadioGroupItem value="a" />
    </RadioGroup>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="a" aria-invalid />
    </RadioGroup>
  ),
};

export const Checked: Story = {
  render: (args) => (
    <RadioGroup defaultValue="a" {...args}>
      <RadioGroupItem value="a" />
    </RadioGroup>
  ),
};

export const Group: Story = {
  render: (args) => (
    <RadioGroup defaultValue="one" {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="one" id="radio-one" />
        <Label htmlFor="radio-one">One</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="two" id="radio-two" />
        <Label htmlFor="radio-two">Two</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="three" id="radio-three" />
        <Label htmlFor="radio-three">Three</Label>
      </div>
    </RadioGroup>
  ),
};
