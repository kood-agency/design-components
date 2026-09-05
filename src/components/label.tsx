import * as React from "react";
import { cn } from "../lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-foreground peer-disabled:text-muted-foreground group-data-[disabled]:text-muted-foreground text-sm font-medium select-none peer-disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
