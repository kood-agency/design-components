import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button } from "./button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "./command";

const meta: Meta<typeof Command> = {
  title: "Components/Command",
  component: Command,
};
export default meta;

type Story = StoryObj<typeof Command>;

function CommandContents({
  variant,
  testId,
}: {
  variant?: "default" | "glass" | "glass-strong";
  testId?: string;
}) {
  return (
    <Command variant={variant} data-testid={testId}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            Calendar
            <CommandShortcut>C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Search
            <CommandShortcut>S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem disabled>Billing</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export const Inline: Story = {
  render: () => (
    <div className="border-border h-80 w-full max-w-lg border">
      <CommandContents />
    </div>
  ),
};

function CommandDialogExample({
  variant = "default",
  testId,
}: {
  variant?: "default" | "glass" | "glass-strong";
  testId?: string;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Button data-testid={testId ? `${testId}-trigger` : undefined} onClick={() => setOpen(true)}>
        Open command palette (Cmd+K)
      </Button>
      <CommandDialog variant={variant} open={open} onOpenChange={setOpen}>
        <CommandContents testId={testId} />
      </CommandDialog>
    </>
  );
}

export const Dialog: Story = {
  render: () => <CommandDialogExample />,
};

export const Glass: Story = {
  render: () => (
    <div className="border-border h-80 w-full max-w-lg border">
      <CommandContents variant="glass" testId="glass" />
    </div>
  ),
};

export const GlassStrong: Story = {
  render: () => (
    <div className="border-border h-80 w-full max-w-lg border">
      <CommandContents variant="glass-strong" testId="glass-strong" />
    </div>
  ),
};

export const GlassDialog: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <CommandDialogExample variant="glass" testId="glass" />
      <CommandDialogExample variant="glass-strong" testId="glass-strong" />
    </div>
  ),
};
