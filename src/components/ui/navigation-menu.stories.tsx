import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
};
export default meta;

type Story = StoryObj<typeof NavigationMenu>;

export const Glass: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <NavigationMenu appearance="glass" data-testid="glass">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Glass</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#glass">Overview</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu appearance="glass-strong" data-testid="glass-strong">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Strong</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#strong">Overview</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};

export const ContentGlass: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Content glass</NavigationMenuTrigger>
          <NavigationMenuContent variant="glass" data-testid="glass">
            <NavigationMenuLink href="#content-glass">Overview</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-1">
              <li>
                <NavigationMenuLink href="#">Overview</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Pricing</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-1">
              <li>
                <NavigationMenuLink href="#">Docs</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Blog</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">About</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
