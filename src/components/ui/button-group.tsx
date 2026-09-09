import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Separator } from "./separator";

const buttonGroupVariants = cva(
  "flex w-fit items-stretch [&>*]:rounded-none [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md [&>*:not(:first-child)]:-ml-px has-[>[data-slot=button-group]]:gap-2 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "",
        vertical:
          "flex-col [&>*]:rounded-none [&>*:first-child]:rounded-t-md [&>*:first-child]:rounded-l-none [&>*:last-child]:rounded-b-md [&>*:last-child]:rounded-r-none [&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:-ml-0",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

const buttonGroupTextVariants = cva(
  "border-input text-foreground-muted flex items-center gap-2 border px-3 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card",
        glass: "kood-glass",
        "glass-strong": "kood-glass-strong",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function ButtonGroupText({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof buttonGroupTextVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(buttonGroupTextVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "button-group-text",
      variant,
    } satisfies {
      slot: "button-group-text";
      variant: VariantProps<typeof buttonGroupTextVariants>["variant"];
    },
  });
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn("bg-input w-px self-stretch", className)}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
