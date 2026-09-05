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

function CommandContents() {
  return (
    <Command>
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

function CommandDialogExample() {
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
      <Button onClick={() => setOpen(true)}>Open command palette (Cmd+K)</Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandContents />
      </CommandDialog>
    </>
  );
}

export const Dialog: Story = {
  render: () => <CommandDialogExample />,
};
