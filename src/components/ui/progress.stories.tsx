import type { Meta, StoryObj } from "@storybook/react";
import { Progress, ProgressLabel, ProgressValue } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: () => (
    <Progress value={40}>
      <ProgressLabel>Uploading</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
};

export const Complete: Story = {
  render: () => (
    <Progress value={100}>
      <ProgressLabel>Complete</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
};
