import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your display name. Changes apply immediately.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="dialog-name">Name</Label>
          <Input id="dialog-name" defaultValue="Ada Lovelace" />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const NoClose: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>This dialog has no icon close control.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Glass: Story = {
  render: () => (
    <div className="bg-secondary flex min-h-80 items-center justify-center gap-3 p-6">
      <Dialog>
        <DialogTrigger data-testid="glass-trigger" render={<Button />}>
          Open glass
        </DialogTrigger>
        <DialogContent data-testid="glass" variant="glass">
          <DialogHeader>
            <DialogTitle>Glass dialog</DialogTitle>
            <DialogDescription>
              A translucent modal panel over the existing scrim.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger data-testid="glass-strong-trigger" render={<Button />}>
          Open strong glass
        </DialogTrigger>
        <DialogContent data-testid="glass-strong" variant="glass-strong">
          <DialogHeader>
            <DialogTitle>Strong glass dialog</DialogTitle>
            <DialogDescription>
              A higher-opacity modal panel with the same filter.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  ),
};
