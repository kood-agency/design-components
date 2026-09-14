import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const toggleVariants = cva(
  "inline-flex max-md:min-h-11 max-md:min-w-11 items-center justify-center gap-2 rounded-md text-sm font-semibold whitespace-nowrap text-foreground-muted focus-visible:outline-solid focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring transition-colors duration-(--duration-enter) ease-standard motion-reduce:transition-none disabled:pointer-events-none disabled:border-input disabled:bg-secondary disabled:text-muted-foreground data-disabled:pointer-events-none data-disabled:border-input data-disabled:bg-secondary data-disabled:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "hover:bg-secondary hover:text-foreground aria-pressed:border aria-pressed:!border-input aria-pressed:bg-secondary aria-pressed:text-foreground",
        outline:
          "border border-input bg-card hover:bg-secondary hover:text-foreground aria-pressed:!border-input aria-pressed:bg-secondary aria-pressed:text-foreground",
        glass:
          "border border-input kood-glass hover:text-foreground aria-pressed:!border-input aria-pressed:bg-secondary aria-pressed:text-foreground",
        "glass-strong":
          "border border-input kood-glass-strong hover:text-foreground aria-pressed:!border-input aria-pressed:bg-secondary aria-pressed:text-foreground",
      },
      size: {
        default: "min-h-9 px-2",
        sm: "min-h-8 px-1.5",
        lg: "min-h-10 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      data-variant={variant}
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
