import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./button-group";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
};
export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Center</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Paste</Button>
    </ButtonGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>https://</ButtonGroupText>
      <Button variant="secondary">kood.dev</Button>
    </ButtonGroup>
  ),
};
