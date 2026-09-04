import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button" },
};
export default meta;

export const Default: StoryObj<typeof Button> = {};
export const Secondary: StoryObj<typeof Button> = { args: { variant: "secondary" } };
export const Outline: StoryObj<typeof Button> = { args: { variant: "outline" } };
