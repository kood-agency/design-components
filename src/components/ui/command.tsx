"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { CheckIcon, SearchIcon } from "lucide-react";
import { cn } from "../../lib/utils";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";
import { InputGroup, InputGroupAddon } from "./input-group";

type CommandVariant = "default" | "glass" | "glass-strong";

const CommandDialogVariantContext = React.createContext<CommandVariant>("default");

function Command({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof CommandPrimitive> & { variant?: CommandVariant }) {
  const dialogVariant = React.useContext(CommandDialogVariantContext);
  const isTransparentInGlassDialog = dialogVariant !== "default";

  return (
    <CommandPrimitive
      data-slot="command"
      data-variant={variant}
      className={cn(
        "text-foreground flex h-full w-full flex-col overflow-hidden rounded-lg",
        !isTransparentInGlassDialog && (variant === "default" ? "bg-popover" : `kood-${variant}`),
        className,
      )}
      {...props}
    />
  );
}

function CommandDialog({
  title = "명령 팔레트",
  description = "실행할 명령을 검색하세요.",
  children,
  className,
  showCloseButton = false,
  variant = "default",
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  variant?: CommandVariant;
  children: React.ReactNode;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        variant={variant}
        className={cn(
          "border-input text-foreground shadow-raised overflow-hidden rounded-xl border p-0 sm:max-w-lg",
          variant === "default" && "bg-card",
          className,
        )}
        showCloseButton={showCloseButton}
      >
        <CommandDialogVariantContext.Provider value={variant}>
          {children}
        </CommandDialogVariantContext.Provider>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="border-border border-b px-3">
      <InputGroup className="has-[input:focus-visible]:outline-ring border-0 has-[input:focus-visible]:outline-1 has-[input:focus-visible]:-outline-offset-1 has-[input:focus-visible]:outline-solid">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "text-foreground placeholder:text-muted-foreground disabled:text-muted-foreground min-h-6 w-full text-sm focus-visible:outline-hidden disabled:cursor-not-allowed max-md:min-h-11",
            className,
          )}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className="text-muted-foreground size-4 shrink-0" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn("max-h-72 overflow-y-auto p-1 focus-visible:outline-hidden", className)}
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("text-muted-foreground py-6 text-center text-sm", className)}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "text-foreground data-[selected=true]:bg-secondary data-[selected=true]:text-foreground data-[selected=true]:before:bg-ring data-[disabled=true]:text-muted-foreground relative flex items-center gap-2 rounded-md px-2 py-1.5 text-sm select-none before:absolute before:inset-y-1.5 before:left-0 before:w-0.5 before:rounded-full focus-visible:outline-hidden data-[disabled=true]:pointer-events-none max-md:min-h-11 forced-colors:data-[selected=true]:outline-1 forced-colors:data-[selected=true]:-outline-offset-1 forced-colors:data-[selected=true]:outline-solid [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <CheckIcon className="ml-auto hidden group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:block" />
    </CommandPrimitive.Item>
  );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn("text-muted-foreground ml-auto text-xs", className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
