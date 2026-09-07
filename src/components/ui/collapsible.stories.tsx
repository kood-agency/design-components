import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
};
export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-full max-w-96">
      <CollapsibleTrigger className="text-foreground hover:text-accent-foreground focus-visible:outline-ring rounded-md px-3 py-2 text-sm font-semibold outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid">
        Toggle
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="text-foreground pt-2 text-sm">Hidden content that is revealed on toggle.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
};
