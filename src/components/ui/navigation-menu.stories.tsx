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

function MaterialBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#0f172a_0%,#7c3aed_50%,#f59e0b_100%)] p-16">
      {children}
    </div>
  );
}

export const Glass: Story = {
  render: () => (
    <MaterialBackdrop>
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
    </MaterialBackdrop>
  ),
};

export const ContentGlass: Story = {
  render: () => (
    <MaterialBackdrop>
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
    </MaterialBackdrop>
  ),
};

export const ContentGlassStrong: Story = {
  render: () => (
    <MaterialBackdrop>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Content strong glass</NavigationMenuTrigger>
            <NavigationMenuContent variant="glass-strong" data-testid="glass-strong">
              <NavigationMenuLink href="#content-glass-strong">Overview</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </MaterialBackdrop>
  ),
};

export const ContentGlassToDefault: Story = {
  render: () => (
    <MaterialBackdrop>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Glass content</NavigationMenuTrigger>
            <NavigationMenuContent variant="glass" data-testid="switch-glass">
              <NavigationMenuLink href="#switch-glass">Overview</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Default content</NavigationMenuTrigger>
            <NavigationMenuContent data-testid="switch-default">
              <NavigationMenuLink href="#switch-default">Overview</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </MaterialBackdrop>
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
