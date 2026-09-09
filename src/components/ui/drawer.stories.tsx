import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Bottom: Story = {
  render: () => (
    <Drawer defaultOpen swipeDirection="down" showSwipeHandle>
      <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Bottom drawer</DrawerTitle>
          <DrawerDescription>Swipe down to dismiss.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="secondary" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Right: Story = {
  render: () => (
    <Drawer defaultOpen swipeDirection="right" showSwipeHandle>
      <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Right drawer</DrawerTitle>
          <DrawerDescription>Swipe right to dismiss.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="secondary" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Glass: Story = {
  render: () => (
    <div className="bg-secondary flex min-h-80 items-center justify-center gap-3 p-6">
      <Drawer swipeDirection="down" showSwipeHandle>
        <DrawerTrigger data-testid="glass-trigger" render={<Button />}>
          Open glass
        </DrawerTrigger>
        <DrawerContent data-testid="glass" variant="glass">
          <DrawerHeader>
            <DrawerTitle>Glass drawer</DrawerTitle>
            <DrawerDescription>The bleed uses the matching material tint.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button variant="secondary" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer swipeDirection="down" showSwipeHandle>
        <DrawerTrigger data-testid="glass-strong-trigger" render={<Button />}>
          Open strong glass
        </DrawerTrigger>
        <DrawerContent data-testid="glass-strong" variant="glass-strong">
          <DrawerHeader>
            <DrawerTitle>Strong glass drawer</DrawerTitle>
            <DrawerDescription>
              The stronger material keeps the same interaction model.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button variant="secondary" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  ),
};
