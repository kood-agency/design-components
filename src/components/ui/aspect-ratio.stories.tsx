import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
  component: AspectRatio,
};
export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  render: () => (
    <AspectRatio
      ratio={16 / 9}
      className="border-border bg-secondary w-80 overflow-hidden rounded-md border"
    >
      <div className="text-foreground-muted flex size-full items-center justify-center text-sm">
        16:9
      </div>
    </AspectRatio>
  ),
};
