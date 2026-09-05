"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "../lib/utils";

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer border-input bg-secondary focus-visible:outline-ring ease-standard disabled:border-input disabled:bg-secondary disabled:text-muted-foreground data-disabled:border-input data-disabled:bg-secondary data-disabled:text-muted-foreground aria-invalid:border-destructive data-invalid:border-destructive data-checked:border-primary data-checked:bg-primary relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-(--duration-enter) outline-none after:absolute after:-inset-3.5 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid disabled:pointer-events-none data-disabled:pointer-events-none motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="bg-foreground ease-standard data-checked:bg-primary-foreground pointer-events-none block size-4 rounded-full transition-transform duration-(--duration-enter) data-checked:translate-x-4 motion-reduce:transition-none"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
