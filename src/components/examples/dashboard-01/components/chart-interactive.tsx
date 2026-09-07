import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui";
import { chartData, type ChartDatum } from "../data/charts";

const chartConfig = {
  visitors: { label: "Visitors" },
  desktop: { label: "Desktop", color: "var(--accent-foreground)" },
  mobile: { label: "Mobile", color: "var(--muted-foreground)" },
};

function aggregate(days: number): ChartDatum[] {
  return chartData.slice(-days);
}

const RANGES = [
  { value: "90", label: "Last 3 months", days: 90 },
  { value: "30", label: "Last 30 days", days: 30 },
  { value: "7", label: "Last 7 days", days: 7 },
] as const;

export function ChartInteractive() {
  const [range, setRange] = React.useState<string>("90");
  const active = RANGES.find((r) => r.value === range) ?? RANGES[0];
  const data = aggregate(active.days);
  const total = React.useMemo(
    () => data.reduce((acc, cur) => acc + cur.desktop + cur.mobile, 0),
    [data],
  );

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[5px]/card:block">Total for the last 3 months</span>
          <span className="@[5px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <Select value={range} onValueChange={(v) => v && setRange(v)}>
            <SelectTrigger size="sm" aria-label="Select a value" className="w-[160px]">
              <SelectValue>{active.label}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {RANGES.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:py-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value: string) => {
                const date = new Date(`${value}T00:00:00Z`);
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
        <p className="sr-only">{`Total visitors: ${total.toLocaleString()}`}</p>
      </CardContent>
    </Card>
  );
}
