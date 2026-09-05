"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
});

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }) {
  const contextValue = React.useMemo(
    () => ({ variant, size, spacing, orientation }),
    [variant, size, spacing, orientation],
  );

  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "flex w-fit gap-[--spacing(var(--gap))] [&>*]:rounded-none [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md",
        orientation === "vertical" &&
          "flex-col [&>*:first-child]:rounded-t-md [&>*:first-child]:rounded-l-none [&>*:last-child]:rounded-r-none [&>*:last-child]:rounded-b-md",
        variant === "outline" && "border-input rounded-md border [&>*]:border-0",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={contextValue}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);
  const itemVariant = context.variant ?? variant;
  const itemSize = context.size ?? size;

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={itemVariant}
      data-size={itemSize}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0",
        toggleVariants({ variant: itemVariant, size: itemSize }),
        className,
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}

export { ToggleGroup, ToggleGroupItem };
