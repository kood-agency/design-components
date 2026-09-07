import type { LucideIcon } from "lucide-react";
import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react";
import {
  Badge,
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui";

interface Vital {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  trendText: string;
  footer: string;
}

const vitals: Vital[] = [
  {
    label: "Total Revenue",
    value: "$1,250.00",
    delta: "+12.5%",
    trend: "up",
    trendText: "Trending up this month",
    footer: "Visitors for the last 6 months",
  },
  {
    label: "New Customers",
    value: "1,234",
    delta: "-20%",
    trend: "down",
    trendText: "Down 20% this period",
    footer: "Acquisition needs attention",
  },
  {
    label: "Active Accounts",
    value: "45,678",
    delta: "+12.5%",
    trend: "up",
    trendText: "Strong user retention",
    footer: "Engagement exceed targets",
  },
  {
    label: "Growth Rate",
    value: "4.5%",
    delta: "+4.5%",
    trend: "up",
    trendText: "Steady performance increase",
    footer: "Meets growth projections",
  },
];

function TrendIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="size-3.5" />;
}

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {vitals.map((v) => (
        <Card key={v.label} className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <span>{v.trendText}</span>
              <TrendIcon icon={v.trend === "up" ? ArrowUpRightIcon : ArrowDownRightIcon} />
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[2rem]/card:text-3xl">
              {v.value}
            </CardTitle>
            <CardAction>
              <Badge variant={v.trend === "up" ? "accent" : "destructive"}>
                {v.trend === "up" ? <ArrowUpRightIcon /> : <ArrowDownRightIcon />}
                {v.delta}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-muted-foreground justify-start text-xs">
            {v.footer}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
