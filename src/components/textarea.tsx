import * as React from "react";
import { cn } from "../lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input bg-card text-foreground placeholder:text-muted-foreground selection:bg-selection selection:text-selection-foreground focus-visible:outline-ring focus-visible:border-ring ease-standard disabled:border-input disabled:bg-secondary disabled:text-muted-foreground disabled:placeholder:text-muted-foreground data-disabled:border-input data-disabled:bg-secondary data-disabled:text-muted-foreground aria-invalid:border-destructive data-invalid:border-destructive field-sizing-content min-h-9 min-h-16 w-full min-w-0 rounded-md border px-3 py-2 text-base transition-colors duration-(--duration-enter) outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid disabled:cursor-not-allowed data-disabled:cursor-not-allowed motion-reduce:transition-none md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
