import type { Meta, StoryObj } from "@storybook/react";
import { PlusIcon } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button" },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Secondary: Story = { args: { variant: "secondary" } };

export const Outline: Story = { args: { variant: "outline" } };

export const Ghost: Story = { args: { variant: "ghost" } };

export const Destructive: Story = { args: { variant: "destructive" } };

export const Link: Story = { args: { variant: "link" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="xs">xs</Button>
      <Button size="sm">sm</Button>
      <Button size="default">default</Button>
      <Button size="lg">lg</Button>
      <Button size="icon" aria-label="icon">
        <PlusIcon />
      </Button>
      <Button size="icon-xs" aria-label="icon-xs">
        <PlusIcon />
      </Button>
      <Button size="icon-sm" aria-label="icon-sm">
        <PlusIcon />
      </Button>
      <Button size="icon-lg" aria-label="icon-lg">
        <PlusIcon />
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <PlusIcon />
        Add
      </>
    ),
  },
};

export const Disabled: Story = { args: { disabled: true, children: "Disabled" } };

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <svg
          className="size-4 animate-spin motion-reduce:animate-none"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="48 24"
          />
        </svg>
        Saving
      </>
    ),
  },
};

export const AsLink: Story = {
  render: () => (
    <Button nativeButton={false} render={<a href="#" />}>
      Link
    </Button>
  ),
};

export const Focus: Story = {
  args: { autoFocus: true, children: "Focus" },
};
