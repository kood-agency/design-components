import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./menubar";

const meta: Meta<typeof Menubar> = {
  title: "Components/Menubar",
  component: Menubar,
};
export default meta;

type Story = StoryObj<typeof Menubar>;

export const Glass: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Menubar variant="glass" data-testid="glass">
        <MenubarMenu>
          <MenubarTrigger>Glass</MenubarTrigger>
          <MenubarContent variant="glass">
            <MenubarItem>Profile</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Menubar variant="glass-strong" data-testid="glass-strong">
        <MenubarMenu>
          <MenubarTrigger>Strong</MenubarTrigger>
          <MenubarContent variant="glass-strong">
            <MenubarItem>Settings</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  ),
};

export const Default: Story = {
  render: function DefaultStory() {
    const [showBookmarks, setShowBookmarks] = React.useState(true);
    const [person, setPerson] = React.useState("pedro");
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab
              <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
                <MenubarItem>Copy link</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo
              <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo
              <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
              Show Bookmarks
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup value={person} onValueChange={setPerson}>
              <MenubarRadioItem value="pedro">Pedro Duarte</MenubarRadioItem>
              <MenubarRadioItem value="colm">Colm Tuite</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};
