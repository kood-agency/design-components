import type { Meta, StoryObj } from "@storybook/react";
import {
  After as InfluencerChannelsAfter,
  AfterEmpty as InfluencerChannelsAfterEmpty,
  Before as InfluencerChannelsBefore,
} from "./page";

const meta: Meta<typeof InfluencerChannelsAfter> = {
  title: "Examples/Influencer Channels 01",
  component: InfluencerChannelsAfter,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof InfluencerChannelsAfter>;

export const Before: Story = {
  render: () => <InfluencerChannelsBefore />,
};

export const After: Story = {
  render: () => <InfluencerChannelsAfter />,
};

export const AfterEmpty: Story = {
  render: () => <InfluencerChannelsAfterEmpty />,
};
