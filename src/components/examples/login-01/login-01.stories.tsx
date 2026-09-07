import type { Meta, StoryObj } from "@storybook/react";
import { Login01 } from "./page";

const meta: Meta<typeof Login01> = {
  title: "Examples/Login 01",
  component: Login01,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Login01>;

export const Default: Story = {};
