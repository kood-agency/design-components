"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "../../lib/utils";

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "peer border-input bg-card text-foreground focus-visible:!border-foreground ease-standard disabled:border-input disabled:bg-secondary disabled:text-muted-foreground data-disabled:border-input data-disabled:bg-secondary data-disabled:text-muted-foreground aria-invalid:!border-destructive aria-invalid:focus-visible:!border-foreground data-invalid:!border-destructive data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground relative flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-(--duration-enter) after:absolute after:-inset-3.5 after:content-[''] focus-visible:outline-hidden focus-visible:transition-none disabled:pointer-events-none data-disabled:pointer-events-none motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="grid place-content-center"
      >
        <span className="bg-primary-foreground size-2 rounded-full" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
