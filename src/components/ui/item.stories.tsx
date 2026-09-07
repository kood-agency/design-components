import type { Meta, StoryObj } from "@storybook/react";
import { FolderIcon } from "lucide-react";
import { Button } from "./button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "./item";

const meta: Meta<typeof Item> = {
  title: "Components/Item",
  component: Item,
};
export default meta;

type Story = StoryObj<typeof Item>;

export const Default: Story = {
  render: () => (
    <Item className="max-w-md">
      <ItemMedia variant="icon">
        <FolderIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Design system</ItemTitle>
        <ItemDescription>Tokens, components, and usage notes.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="secondary" size="sm">
          Open
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const Outline: Story = {
  render: () => (
    <Item variant="outline" className="max-w-md">
      <ItemMedia variant="icon">
        <FolderIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Outline item</ItemTitle>
        <ItemDescription>Hairline container on surface-1.</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const Muted: Story = {
  render: () => (
    <Item variant="muted" className="max-w-md">
      <ItemMedia variant="icon">
        <FolderIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Muted item</ItemTitle>
        <ItemDescription>Surface-2 fill with no tile on the icon.</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Item variant="outline" render={<a href="#" />} className="max-w-md">
      <ItemMedia variant="icon">
        <FolderIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Open documentation</ItemTitle>
        <ItemDescription>Interactive item rendered as a link.</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const List: Story = {
  render: () => (
    <ItemGroup className="max-w-md">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FolderIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Buttons</ItemTitle>
          <ItemDescription>Primary, secondary, ghost, and destructive.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FolderIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Dialogs</ItemTitle>
          <ItemDescription>Modal surface with overlay and focus trap.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FolderIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Sheets</ItemTitle>
          <ItemDescription>Edge-attached panels on four sides.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};
