import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar01Page } from "./page";

const meta: Meta<typeof Sidebar01Page> = {
  title: "Examples/Sidebar 01",
  component: Sidebar01Page,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Sidebar01Page>;

export const Default: Story = {};
