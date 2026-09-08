import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta: Meta<typeof ToggleGroup> = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
};
export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Single: Story = {
  render: () => (
    <ToggleGroup defaultValue={["left"]}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={["bold"]}>
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Outline: Story = {
  render: () => (
    <ToggleGroup variant="outline" defaultValue={["left"]}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Glass: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <ToggleGroup variant="glass" defaultValue={["left"]}>
        <ToggleGroupItem value="left">Selected</ToggleGroupItem>
        <ToggleGroupItem value="center" data-testid="glass">
          Glass
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup variant="glass-strong" defaultValue={["left"]}>
        <ToggleGroupItem value="left">Selected</ToggleGroupItem>
        <ToggleGroupItem value="center" data-testid="glass-strong">
          Glass strong
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};
