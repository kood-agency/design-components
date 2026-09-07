import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
};
export default meta;

type Story = StoryObj<typeof Popover>;

const fieldClassName =
  "min-h-9 w-full rounded-md border border-input bg-card px-3 py-2 text-base text-foreground placeholder:text-muted-foreground outline-none selection:bg-selection selection:text-selection-foreground focus-visible:border-ring focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:text-sm";

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button />}>Open popover</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};

export const Form: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button />}>Edit profile</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Edit profile</PopoverTitle>
          <PopoverDescription>Change your display name.</PopoverDescription>
        </PopoverHeader>
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label className="text-foreground flex flex-col gap-1 text-sm">
            Name
            <input className={fieldClassName} defaultValue="Ada Lovelace" name="name" />
          </label>
          <Button type="submit">Save</Button>
        </form>
      </PopoverContent>
    </Popover>
  ),
};
