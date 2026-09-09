import type { Meta, StoryObj } from "@storybook/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./input-group";

const meta: Meta<typeof InputGroup> = {
  title: "Components/InputGroup",
  component: InputGroup,
};
export default meta;

type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
};

export const Glass: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      <InputGroup variant="glass" data-testid="glass">
        <InputGroupInput placeholder="Glass input group" />
      </InputGroup>
      <InputGroup variant="glass-strong" data-testid="glass-strong">
        <InputGroupTextarea placeholder="Strong glass input group" />
      </InputGroup>
    </div>
  ),
};

export const DisabledGlass: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      <InputGroup variant="glass" data-testid="disabled-glass">
        <InputGroupInput disabled placeholder="Disabled glass input group" />
      </InputGroup>
      <InputGroup variant="glass-strong" data-testid="disabled-glass-strong">
        <InputGroupTextarea
          data-disabled="true"
          placeholder="Data-disabled strong glass input group"
        />
      </InputGroup>
    </div>
  ),
};

export const WithAddon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
};

export const WithButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>Go</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Textarea: Story = {
  render: () => (
    <InputGroup>
      <InputGroupTextarea placeholder="Message" />
    </InputGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput aria-invalid defaultValue="bad" />
    </InputGroup>
  ),
};
