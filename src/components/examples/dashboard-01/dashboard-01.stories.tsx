import type { Meta, StoryObj } from "@storybook/react";
import { Dashboard01 } from "./page";

const meta: Meta<typeof Dashboard01> = {
  title: "Examples/Dashboard 01",
  component: Dashboard01,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Dashboard01>;

export const Default: Story = {};
