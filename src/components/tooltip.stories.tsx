import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <TooltipProvider delay={0}>
      <Tooltip>
        <TooltipTrigger delay={0} render={<Button />}>
          Hover me
        </TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const Sides: Story = {
  render: () => (
    <TooltipProvider delay={0}>
      <div className="flex items-center gap-8 p-16">
        <Tooltip>
          <TooltipTrigger delay={0} render={<Button variant="secondary" />}>
            Top
          </TooltipTrigger>
          <TooltipContent side="top">Top</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger delay={0} render={<Button variant="secondary" />}>
            Right
          </TooltipTrigger>
          <TooltipContent side="right">Right</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger delay={0} render={<Button variant="secondary" />}>
            Bottom
          </TooltipTrigger>
          <TooltipContent side="bottom">Bottom</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger delay={0} render={<Button variant="secondary" />}>
            Left
          </TooltipTrigger>
          <TooltipContent side="left">Left</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const WithKbd: Story = {
  render: () => (
    <TooltipProvider delay={0}>
      <Tooltip>
        <TooltipTrigger delay={0} render={<Button />}>
          Save
        </TooltipTrigger>
        <TooltipContent>
          Save
          <kbd
            data-slot="kbd"
            className="border-code-border bg-code text-code-foreground rounded-md border px-1.5 font-mono text-xs"
          >
            ⌘S
          </kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
