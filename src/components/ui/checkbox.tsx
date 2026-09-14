"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "../../lib/utils";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input bg-card text-foreground focus-visible:!border-foreground ease-standard disabled:border-input disabled:bg-secondary disabled:text-muted-foreground data-disabled:border-input data-disabled:bg-secondary data-disabled:text-muted-foreground aria-invalid:!border-destructive aria-invalid:focus-visible:!border-foreground data-invalid:!border-destructive data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground relative flex size-4 shrink-0 items-center justify-center rounded-xs border transition-colors duration-(--duration-enter) after:absolute after:-inset-3.5 after:content-[''] focus-visible:outline-hidden focus-visible:transition-none disabled:pointer-events-none data-disabled:pointer-events-none motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
