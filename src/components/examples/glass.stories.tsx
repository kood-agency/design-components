import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Toaster } from "../ui/sonner";
import { Textarea } from "../ui/textarea";

const meta: Meta<typeof GlassShowcase> = {
  title: "Examples/Glass",
  component: GlassShowcase,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof GlassShowcase>;

function GlassShowcase() {
  const [saved, setSaved] = React.useState(false);

  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden p-4 sm:p-8">
      <div
        className="border-border bg-background relative mx-auto grid w-full max-w-6xl gap-4 overflow-hidden rounded-2xl border p-4 sm:gap-6 sm:p-6"
        data-testid="glass-showcase"
      >
        <div
          aria-hidden="true"
          className="bg-border pointer-events-none absolute inset-0 grid grid-cols-3 gap-px"
        >
          <div className="bg-secondary" />
          <div className="bg-muted" />
          <div className="bg-card" />
          <div className="bg-card" />
          <div className="bg-secondary" />
          <div className="bg-muted" />
        </div>

        <header className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-2">
            <p className="text-foreground-muted text-sm font-medium">Component gallery</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Glass variants</h1>
            <p className="text-foreground-muted text-sm leading-6">
              One interactive surface per family. Use the adjacent component stories for complete
              APIs.
            </p>
          </div>
          <NavigationMenu appearance="glass" data-testid="glass-navigation">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger data-testid="glass-navigation-trigger">
                  Navigation
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-56 gap-1 p-1">
                    <NavigationMenuLink href="#controls">Overview</NavigationMenuLink>
                    <NavigationMenuLink href="#overlays">Overlay APIs</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#controls">Examples</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </header>

        <section className="relative grid min-w-0 gap-4 lg:grid-cols-2">
          <Card variant="glass" className="min-w-0" data-testid="glass-panel-normal">
            <CardHeader>
              <CardTitle>Glass</CardTitle>
              <CardDescription>
                Use for a single neutral surface over useful backdrop detail.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-foreground-muted text-sm">
              Keep its children transparent so this card owns the material.
            </CardContent>
          </Card>
          <Card variant="glass-strong" className="min-w-0" data-testid="glass-panel-strong">
            <CardHeader>
              <CardTitle>Glass strong</CardTitle>
              <CardDescription>
                Use the denser opacity for an independent focused surface.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-foreground-muted text-sm">
              It uses the same filtering recipe as Glass, with a denser translucent fill.
            </CardContent>
          </Card>
        </section>

        <section className="relative grid min-w-0 gap-4 lg:grid-cols-[1.15fr_.85fr]" id="controls">
          <div className="border-border grid content-start gap-5 rounded-xl border p-4">
            <div>
              <h2 className="font-semibold">Controls and menu</h2>
              <p className="text-foreground-muted text-sm">Independent glass controls and popup.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger
                  data-testid="glass-menu-trigger"
                  render={<Button variant="glass" />}
                >
                  Open menu
                </DropdownMenuTrigger>
                <DropdownMenuContent variant="glass" data-testid="glass-menu-content">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => toast("Token copied")}>
                      Copy token
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast("Preview reset")}>
                      Reset preview
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="glass"
                data-testid="glass-toast-trigger"
                onClick={() =>
                  toast("Glass toast", {
                    description: "A neutral toast uses the selected material.",
                    testId: "glass-neutral-toast",
                  })
                }
              >
                Show toast
              </Button>
            </div>
          </div>

          <div className="border-border grid gap-4 rounded-xl border p-4">
            <div>
              <h2 className="font-semibold">Inputs</h2>
              <p className="text-foreground-muted text-sm">
                Independent stronger control surfaces.
              </p>
            </div>
            <form
              className="grid gap-3"
              data-testid="glass-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSaved(true);
              }}
            >
              <div className="grid gap-1.5">
                <Label htmlFor="glass-reviewer">Name</Label>
                <Input
                  id="glass-reviewer"
                  variant="glass-strong"
                  data-testid="glass-reviewer-input"
                  defaultValue="Glass strong"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="glass-note">Message</Label>
                <Textarea
                  id="glass-note"
                  variant="glass-strong"
                  data-testid="glass-note-input"
                  defaultValue="A reusable input surface."
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" variant="glass-strong" data-testid="glass-form-submit">
                  Submit
                </Button>
                <output className="text-foreground-muted text-sm" data-testid="glass-form-status">
                  {saved ? "Submitted" : "Ready"}
                </output>
              </div>
            </form>
          </div>
        </section>

        <section
          className="border-border relative flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
          id="overlays"
        >
          <div>
            <p className="font-semibold">Modal</p>
            <p className="text-foreground-muted text-sm">
              The stronger variant applies to dialog content, not the scrim.
            </p>
          </div>
          <Dialog>
            <DialogTrigger
              data-testid="glass-dialog-trigger"
              render={<Button variant="glass-strong" />}
            >
              Open dialog
            </DialogTrigger>
            <DialogContent variant="glass-strong" data-testid="glass-dialog">
              <DialogHeader>
                <DialogTitle>Glass dialog</DialogTitle>
                <DialogDescription>
                  This modal keeps its scrim while the content owns the stronger material.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
                <DialogClose
                  render={<Button variant="glass-strong" data-testid="glass-dialog-approve" />}
                  onClick={() => toast.success("Confirmed", { testId: "glass-approved-toast" })}
                >
                  Confirm
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
      </div>
      <Toaster appearance="glass" />
    </main>
  );
}

export const Showcase: Story = {};
