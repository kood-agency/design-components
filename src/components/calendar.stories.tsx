import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "./calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
};
export default meta;

type Story = StoryObj<typeof Calendar>;

const today = new Date();
const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
const selectedDay = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() === 15 ? 16 : 15,
);
const disabledDay = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() === 20 ? 21 : 20,
);

export const Single: Story = {
  render: function SingleStory() {
    const [date, setDate] = React.useState<Date | undefined>(selectedDay);
    return <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={monthStart} />;
  },
};

export const Range: Story = {
  render: function RangeStory() {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(today.getFullYear(), today.getMonth(), 10),
      to: new Date(today.getFullYear(), today.getMonth(), 18),
    });
    return <Calendar mode="range" selected={range} onSelect={setRange} defaultMonth={monthStart} />;
  },
};

export const Dropdown: Story = {
  render: () => <Calendar captionLayout="dropdown" defaultMonth={monthStart} />,
};

export const Disabled: Story = {
  render: () => <Calendar defaultMonth={monthStart} disabled={[disabledDay]} />,
};
