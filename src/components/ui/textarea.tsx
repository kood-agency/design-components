import * as React from "react";
import { cn } from "../../lib/utils";

function Textarea({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"textarea"> & {
  variant?: "default" | "glass" | "glass-strong";
}) {
  return (
    <textarea
      data-slot="textarea"
      data-variant={variant}
      className={cn(
        "border-input text-foreground placeholder:text-muted-foreground selection:bg-selection selection:text-selection-foreground focus-visible:outline-ring focus-visible:!border-ring aria-invalid:focus-visible:outline-foreground ease-standard disabled:border-input disabled:bg-secondary disabled:text-muted-foreground disabled:placeholder:text-muted-foreground data-disabled:border-input data-disabled:bg-secondary data-disabled:text-muted-foreground aria-invalid:!border-destructive data-invalid:!border-destructive field-sizing-content min-h-9 min-h-16 w-full min-w-0 rounded-md border px-3 py-2 text-base leading-6 transition-colors duration-(--duration-enter) focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-solid disabled:cursor-not-allowed data-disabled:cursor-not-allowed supports-[field-sizing:content]:resize-none motion-reduce:transition-none md:text-sm md:leading-5",
        variant === "default" && "bg-card",
        variant === "glass" && "kood-glass",
        variant === "glass-strong" && "kood-glass-strong",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
