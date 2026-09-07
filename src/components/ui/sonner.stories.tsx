import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Button } from "./button";
import { Toaster } from "./sonner";

const meta: Meta<typeof Toaster> = {
  title: "Components/Sonner",
  component: Toaster,
};
export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button onClick={() => toast("Saved")}>Default toast</Button>
        <Button variant="secondary" onClick={() => toast.success("Success toast")}>
          Success toast
        </Button>
        <Button variant="outline" onClick={() => toast.error("Error toast")}>
          Error toast
        </Button>
        <Button variant="ghost" onClick={() => toast.info("Info toast")}>
          Info toast
        </Button>
      </div>
      <Toaster />
    </>
  ),
};
