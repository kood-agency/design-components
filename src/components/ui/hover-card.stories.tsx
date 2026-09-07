import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

const meta: Meta<typeof HoverCard> = {
  title: "Components/HoverCard",
  component: HoverCard,
};
export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger
        delay={0}
        closeDelay={0}
        render={
          <a
            className="text-accent-foreground hover:text-accent-hover text-sm font-semibold underline-offset-4 hover:underline"
            href="#hover-card"
          />
        }
      >
        @kood
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-foreground text-sm font-semibold">kood</p>
        <p className="text-muted-foreground text-sm">Design system for kood products.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
