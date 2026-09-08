import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "../../lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "border-input bg-card text-foreground placeholder:text-muted-foreground selection:bg-selection selection:text-selection-foreground focus-visible:outline-ring focus-visible:border-ring ease-standard disabled:border-input disabled:bg-secondary disabled:text-muted-foreground disabled:placeholder:text-muted-foreground data-disabled:border-input data-disabled:bg-secondary data-disabled:text-muted-foreground aria-invalid:border-destructive data-invalid:border-destructive box-border min-h-10 w-full min-w-0 rounded-md border px-3 py-[7px] text-base leading-6 transition-colors duration-(--duration-enter) outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid disabled:cursor-not-allowed data-disabled:cursor-not-allowed motion-reduce:transition-none max-md:min-h-11",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
