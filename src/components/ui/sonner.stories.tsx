import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "next-themes";
import { toast } from "sonner";
import { Button } from "./button";
import { Toaster } from "./sonner";

const meta: Meta<typeof Toaster> = {
  title: "Components/Sonner",
  component: Toaster,
  decorators: [
    (Story, context) => (
      <ThemeProvider forcedTheme={context.globals.theme === "light" ? "light" : "dark"}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Toaster>;

function ToastControls({
  appearance = "default",
}: {
  appearance?: "default" | "glass" | "glass-strong";
}) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          data-testid={`${appearance}-neutral-trigger`}
          onClick={() =>
            toast("Saved", {
              description: "Your changes are available to the team.",
              action: { label: "Undo", onClick: () => undefined },
              cancel: { label: "Dismiss", onClick: () => undefined },
              testId: `${appearance}-neutral`,
            })
          }
        >
          Default toast
        </Button>
        <Button
          variant="secondary"
          data-testid={`${appearance}-success-trigger`}
          onClick={() =>
            toast.success("Success toast", {
              description: "The workspace is ready to share.",
              action: { label: "View", onClick: () => undefined },
              testId: `${appearance}-success`,
            })
          }
        >
          Success toast
        </Button>
        <Button
          variant="outline"
          data-testid={`${appearance}-error-trigger`}
          onClick={() => toast.error("Error toast", { testId: `${appearance}-error` })}
        >
          Error toast
        </Button>
        <Button
          variant="ghost"
          data-testid={`${appearance}-info-trigger`}
          onClick={() => toast.info("Info toast", { testId: `${appearance}-info` })}
        >
          Info toast
        </Button>
      </div>
      <Toaster appearance={appearance} />
    </>
  );
}

export const Default: Story = {
  render: () => <ToastControls />,
};

export const Glass: Story = {
  render: () => <ToastControls appearance="glass" />,
};

export const GlassStrong: Story = {
  render: () => <ToastControls appearance="glass-strong" />,
};
