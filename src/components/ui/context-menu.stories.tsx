import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./context-menu";

const meta: Meta<typeof ContextMenu> = {
  title: "Components/ContextMenu",
  component: ContextMenu,
};
export default meta;

type Story = StoryObj<typeof ContextMenu>;

const targetClassName =
  "flex h-[120px] w-[200px] items-center justify-center rounded-md border border-input bg-card text-sm text-foreground";

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className={targetClassName}>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>Account</ContextMenuLabel>
          <ContextMenuItem>
            Profile
            <ContextMenuShortcut>⇧⌘P</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Billing
            <ContextMenuShortcut>⌘B</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Settings
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Checkboxes: Story = {
  render: function CheckboxesStory() {
    const [showStatusBar, setShowStatusBar] = React.useState(true);
    const [showActivityBar, setShowActivityBar] = React.useState(false);
    const [showPanel, setShowPanel] = React.useState(false);
    return (
      <ContextMenu>
        <ContextMenuTrigger className={targetClassName}>Right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>Appearance</ContextMenuLabel>
            <ContextMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
              Status Bar
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
              Activity Bar
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
              Panel
            </ContextMenuCheckboxItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const Radios: Story = {
  render: function RadiosStory() {
    const [position, setPosition] = React.useState("bottom");
    return (
      <ContextMenu>
        <ContextMenuTrigger className={targetClassName}>Right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>Panel position</ContextMenuLabel>
            <ContextMenuRadioGroup value={position} onValueChange={setPosition}>
              <ContextMenuRadioItem value="top">Top</ContextMenuRadioItem>
              <ContextMenuRadioItem value="bottom">Bottom</ContextMenuRadioItem>
              <ContextMenuRadioItem value="right">Right</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};

export const Submenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className={targetClassName}>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>New Tab</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Email</ContextMenuItem>
            <ContextMenuItem>Message</ContextMenuItem>
            <ContextMenuItem>Copy link</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>Print</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className={targetClassName}>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>New</ContextMenuItem>
        <ContextMenuItem disabled>Open</ContextMenuItem>
        <ContextMenuItem>Save</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
