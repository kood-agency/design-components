import type { Meta, StoryObj } from "@storybook/react";
import { NoticeList01 } from "./page";

const meta: Meta<typeof NoticeList01> = {
  title: "Examples/Notice List 01",
  component: NoticeList01,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof NoticeList01>;

export const Default: Story = {};
