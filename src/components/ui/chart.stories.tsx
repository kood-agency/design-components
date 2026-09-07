import type { Meta, StoryObj } from "@storybook/react";
import {
  Bar as RechartsBar,
  BarChart,
  CartesianGrid,
  Line as RechartsLine,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart";

const meta: Meta<typeof ChartContainer> = {
  title: "Components/Chart",
  component: ChartContainer,
};
export default meta;

type Story = StoryObj<typeof ChartContainer>;

const data = [
  { month: "Jan", desktop: 186, mobile: 80, tablet: 45 },
  { month: "Feb", desktop: 305, mobile: 200, tablet: 90 },
  { month: "Mar", desktop: 237, mobile: 120, tablet: 70 },
  { month: "Apr", desktop: 273, mobile: 190, tablet: 110 },
];

const barConfig = {
  desktop: { label: "Desktop", color: "var(--accent-foreground)" },
  mobile: { label: "Mobile", color: "var(--success)" },
  tablet: { label: "Tablet", color: "var(--warning)" },
} satisfies ChartConfig;

const lineConfig = {
  desktop: { label: "Desktop", color: "var(--accent-foreground)" },
  mobile: { label: "Mobile", color: "var(--success)" },
} satisfies ChartConfig;

export const Bar: Story = {
  render: () => (
    <ChartContainer config={barConfig} className="min-h-64 w-[calc(100vw-2rem)] max-w-xl">
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <RechartsBar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <RechartsBar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        <RechartsBar dataKey="tablet" fill="var(--color-tablet)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};

export const Line: Story = {
  render: () => (
    <ChartContainer config={lineConfig} className="min-h-64 w-[calc(100vw-2rem)] max-w-xl">
      <LineChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <RechartsLine
          dataKey="desktop"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
        <RechartsLine
          dataKey="mobile"
          type="monotone"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  ),
};
