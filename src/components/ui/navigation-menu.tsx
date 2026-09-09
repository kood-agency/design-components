import * as React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "../../lib/utils";

type NavigationMenuAppearance = "default" | "glass" | "glass-strong";

const NavigationMenuAppearanceContext = React.createContext<NavigationMenuAppearance>("default");

function NavigationMenu({
  align = "start",
  appearance = "default",
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props &
  Pick<NavigationMenuPrimitive.Positioner.Props, "align"> & {
    appearance?: NavigationMenuAppearance;
  }) {
  return (
    <NavigationMenuAppearanceContext.Provider value={appearance}>
      <NavigationMenuPrimitive.Root
        data-slot="navigation-menu"
        data-appearance={appearance}
        className={cn(
          "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
          className,
        )}
        {...props}
      >
        {children}
        <NavigationMenuPositioner align={align} appearance={appearance} />
      </NavigationMenuPrimitive.Root>
    </NavigationMenuAppearanceContext.Provider>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex flex-1 list-none items-center justify-center gap-0", className)}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger inline-flex w-max max-md:min-h-11 items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-foreground-muted outline-none transition-colors duration-(--duration-enter) ease-standard hover:bg-secondary hover:text-foreground focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:border-input disabled:bg-secondary disabled:text-muted-foreground data-disabled:pointer-events-none data-disabled:border-input data-disabled:bg-secondary data-disabled:text-muted-foreground data-popup-open:bg-secondary data-popup-open:text-foreground motion-reduce:transition-none",
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="ease-standard relative top-px ml-1 size-3 transition-transform duration-(--duration-enter) group-data-popup-open/navigation-menu-trigger:rotate-180 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  variant = "default",
  ...props
}: NavigationMenuPrimitive.Content.Props & { variant?: NavigationMenuAppearance }) {
  const appearance = React.useContext(NavigationMenuAppearanceContext);
  const surfaceVariant = appearance === "default" ? variant : "default";

  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      data-variant={variant}
      className={cn(
        "text-foreground ease-standard h-full w-auto rounded-lg border p-1 transition-[opacity,transform] duration-(--duration-enter) data-ending-style:opacity-0 data-ending-style:duration-(--duration-exit) data-starting-style:opacity-0 **:data-[slot=navigation-menu-link]:focus:outline-none motion-reduce:transition-none",
        appearance !== "default"
          ? "border-transparent bg-transparent"
          : surfaceVariant === "default"
            ? "border-input bg-popover shadow-raised"
            : `border-input shadow-raised kood-${surfaceVariant}`,
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuPositioner({
  className,
  side = "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  appearance = "default",
  ...props
}: NavigationMenuPrimitive.Positioner.Props & { appearance?: NavigationMenuAppearance }) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={cn(
          "isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) data-instant:transition-none data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0",
          className,
        )}
        {...props}
      >
        <NavigationMenuPrimitive.Popup
          data-appearance={appearance}
          className={cn(
            "border-input text-foreground shadow-raised ease-standard xs:w-(--popup-width) relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-lg border transition-[opacity,transform] duration-(--duration-enter) outline-none data-ending-style:opacity-0 data-ending-style:duration-(--duration-exit) data-starting-style:opacity-0 motion-reduce:transition-none",
            appearance === "default" ? "bg-popover" : `kood-${appearance}`,
          )}
        >
          <NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden" />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}

function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "text-foreground ease-standard hover:bg-secondary hover:text-foreground focus-visible:outline-ring data-highlighted:bg-secondary data-highlighted:text-foreground data-disabled:text-muted-foreground data-active:bg-secondary data-active:text-foreground flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors duration-(--duration-enter) outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid data-disabled:pointer-events-none motion-reduce:transition-none max-md:min-h-11 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-indicator"
      className={cn("top-full z-1 flex h-1.5 items-end justify-center overflow-hidden", className)}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm" />
    </NavigationMenuPrimitive.Icon>
  );
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuPositioner,
};
