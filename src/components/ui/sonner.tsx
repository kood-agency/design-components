import * as React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";
import { buttonVariants } from "./button";

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={(resolvedTheme ?? "dark") as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin motion-reduce:animate-none" />,
      }}
      style={{ "--border-radius": "var(--radius-lg)" } as React.CSSProperties}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-89 items-center gap-2 rounded-lg border border-input bg-popover p-4 font-sans text-sm text-foreground shadow-raised",
          success: "bg-success text-success-foreground border-success",
          error: "bg-destructive text-destructive-foreground border-destructive",
          warning: "bg-warning text-warning-foreground border-warning",
          info: "bg-accent text-accent-foreground border-accent-foreground",
          title: "font-semibold",
          description: "text-foreground-muted",
          actionButton: buttonVariants({ size: "xs" }),
          cancelButton: buttonVariants({ variant: "secondary", size: "xs" }),
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
