import * as React from "react";
import { Loader2Icon } from "lucide-react";
import { cn } from "../../lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="로딩 중"
      className={cn(
        "text-muted-foreground size-4 animate-spin motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}

export { Spinner };
