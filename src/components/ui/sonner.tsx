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

type ToasterAppearance = "default" | "glass" | "glass-strong";

const Toaster = ({
  appearance = "default",
  ...props
}: ToasterProps & {
  appearance?: ToasterAppearance;
}) => {
  const { resolvedTheme } = useTheme();
  const neutralToastClass =
    appearance === "default"
      ? "flex w-89 items-center gap-2 rounded-lg border border-input bg-popover p-4 font-sans text-sm text-foreground shadow-raised"
      : `flex w-89 items-center gap-2 rounded-lg border border-input p-4 font-sans text-sm text-foreground shadow-raised kood-${appearance}`;
  const semanticToastClasses =
    appearance === "default"
      ? {
          success: "bg-success text-success-foreground border-success",
          error: "bg-destructive text-destructive-foreground border-destructive",
          warning: "bg-warning text-warning-foreground border-warning",
          info: "bg-accent text-accent-foreground border-accent-foreground",
        }
      : {
          success:
            "border-success bg-success text-success-foreground hover:bg-success active:bg-success backdrop-filter-none [&_[data-description]]:!text-success-foreground",
          error:
            "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive active:bg-destructive backdrop-filter-none [&_[data-description]]:!text-destructive-foreground",
          warning:
            "border-warning bg-warning text-warning-foreground hover:bg-warning active:bg-warning backdrop-filter-none [&_[data-description]]:!text-warning-foreground",
          info: "border-accent-foreground bg-accent text-accent-foreground hover:bg-accent active:bg-accent backdrop-filter-none [&_[data-description]]:!text-accent-foreground",
        };

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
          toast: neutralToastClass,
          success: semanticToastClasses.success,
          error: semanticToastClasses.error,
          warning: semanticToastClasses.warning,
          info: semanticToastClasses.info,
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
