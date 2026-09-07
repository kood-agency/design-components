import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "Badge" },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Accent: Story = { args: { variant: "accent", children: "Accent" } };

export const Success: Story = { args: { variant: "success", children: "Success" } };

export const Warning: Story = { args: { variant: "warning", children: "Warning" } };

export const Destructive: Story = { args: { variant: "destructive", children: "Danger" } };

export const Outline: Story = { args: { variant: "outline", children: "Outline" } };

export const AsLink: Story = {
  render: () => (
    <Badge variant="accent" render={<a href="#" />}>
      Link
    </Badge>
  ),
};
