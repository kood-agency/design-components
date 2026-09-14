import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "../../lib/utils";

function Input({
  className,
  type,
  variant = "default",
  ...props
}: React.ComponentProps<"input"> & {
  variant?: "default" | "glass" | "glass-strong";
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(
        "border-input text-foreground placeholder:text-muted-foreground selection:bg-selection selection:text-selection-foreground focus-visible:outline-ring focus-visible:!border-ring aria-invalid:focus-visible:!border-destructive aria-invalid:focus-visible:outline-foreground ease-standard disabled:border-input disabled:bg-secondary disabled:text-muted-foreground disabled:placeholder:text-muted-foreground data-disabled:border-input data-disabled:bg-secondary data-disabled:text-muted-foreground aria-invalid:!border-destructive data-invalid:!border-destructive box-border min-h-10 w-full min-w-0 rounded-md border px-3 py-[7px] text-base leading-6 transition-colors duration-(--duration-enter) focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:transition-none focus-visible:outline-solid disabled:cursor-not-allowed data-disabled:cursor-not-allowed motion-reduce:transition-none max-md:min-h-11 md:text-sm md:leading-5",
        variant === "default" && "bg-card",
        variant === "glass" && "kood-glass",
        variant === "glass-strong" && "kood-glass-strong",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
