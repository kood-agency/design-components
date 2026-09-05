import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardNested,
  CardTitle,
} from "./card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Project overview</CardTitle>
        <CardDescription>Status of the current design system release.</CardDescription>
      </CardHeader>
      <CardContent>Eight surface components restyled to DESIGN.md recipes.</CardContent>
      <CardFooter>
        <Button size="sm">Continue</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Mark all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>New comments on the badge restyle.</CardContent>
    </Card>
  ),
};

export const Nested: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Nested region</CardTitle>
        <CardDescription>One nested card, never a third level.</CardDescription>
      </CardHeader>
      <CardContent>
        <CardNested>Inset surface-2 region with 16px padding.</CardNested>
      </CardContent>
    </Card>
  ),
};

export const Small: Story = {
  render: () => (
    <Card size="sm" className="w-80">
      <CardHeader>
        <CardTitle>Compact card</CardTitle>
        <CardDescription>Small size uses 16px padding.</CardDescription>
      </CardHeader>
      <CardContent>Use for dense metadata.</CardContent>
    </Card>
  ),
};
