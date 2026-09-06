import type { Meta, StoryObj } from "@storybook/react";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert className="w-full max-w-96">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>This is the default card-styled alert.</AlertDescription>
    </Alert>
  ),
};

export const Info: Story = {
  args: { variant: "info" },
  render: (args) => (
    <Alert {...args} className="w-full max-w-96">
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>Accent-tinted informational banner.</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <Alert {...args} className="w-full max-w-96">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong. Try again.</AlertDescription>
    </Alert>
  ),
};

export const WithIcon: Story = {
  args: { variant: "info" },
  render: (args) => (
    <Alert {...args} className="w-full max-w-96">
      <InfoIcon />
      <AlertTitle>With icon</AlertTitle>
      <AlertDescription>Informational banner with a leading icon.</AlertDescription>
    </Alert>
  ),
};
