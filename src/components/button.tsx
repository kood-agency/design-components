import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex max-md:min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent text-sm font-semibold select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 outline-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-colors duration-(--duration-enter) ease-standard motion-reduce:transition-none disabled:pointer-events-none disabled:border-input disabled:bg-secondary disabled:text-muted-foreground data-disabled:pointer-events-none data-disabled:border-input data-disabled:bg-secondary data-disabled:text-muted-foreground",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        secondary: "border-input bg-card text-foreground hover:bg-secondary active:bg-muted",
        outline: "border-input bg-card text-foreground hover:bg-secondary active:bg-muted",
        ghost: "text-foreground-muted hover:bg-secondary hover:text-foreground active:bg-muted",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive active:bg-destructive",
        link: "text-accent-foreground underline-offset-4 hover:text-accent-hover hover:underline",
      },
      size: {
        default: "min-h-9 px-3.5 py-2",
        xs: "min-h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "min-h-8 gap-1.5 px-3",
        lg: "min-h-10 px-6",
        icon: "size-9 max-md:min-w-11",
        "icon-xs": "size-6 max-md:min-w-11",
        "icon-sm": "size-8 max-md:min-w-11",
        "icon-lg": "size-10 max-md:min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
