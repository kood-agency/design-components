import type { Meta, StoryObj } from "@storybook/react";
import { Signup01 } from "./page";

const meta: Meta<typeof Signup01> = {
  title: "Examples/Signup 01",
  component: Signup01,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Signup01>;

export const Default: Story = {};
