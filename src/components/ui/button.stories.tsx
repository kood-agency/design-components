import { useState } from "react";
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

export const Glass: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="glass" data-testid="glass">
        Glass
      </Button>
      <Button variant="glass-strong" data-testid="glass-strong">
        Glass strong
      </Button>
    </div>
  ),
};

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

export const CursorOverride: Story = {
  args: { className: "cursor-help", children: "Cursor override" },
};

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

export const InteractionStates: Story = {
  render: function InteractionStatesStory() {
    const [enabledClicks, setEnabledClicks] = useState(0);
    const [disabledClicks, setDisabledClicks] = useState(0);

    return (
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-3">
          <Button
            data-testid="enabled-button"
            onClick={() => setEnabledClicks((count) => count + 1)}
          >
            클릭 가능한 버튼
          </Button>
          <output data-testid="enabled-click-count">{enabledClicks}</output>
        </div>
        <div className="flex items-center gap-3">
          <Button
            data-testid="disabled-button"
            disabled
            onClick={() => setDisabledClicks((count) => count + 1)}
          >
            비활성 버튼
          </Button>
          <output data-testid="disabled-click-count">{disabledClicks}</output>
        </div>
      </div>
    );
  },
};

export const LongKoreanLabel: Story = {
  render: () => (
    <Button data-testid="long-korean-button">
      <PlusIcon />
      <span data-testid="long-korean-label">연결된 모든 결제 내역을 검토하고 승인하기</span>
    </Button>
  ),
};
