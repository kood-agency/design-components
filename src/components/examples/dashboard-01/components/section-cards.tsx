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
    trendText: "이번 달 고객 성공 통합 운영 계약 매출이 증가했습니다",
    footer: "최근 6개월의 누적 계약 및 갱신 매출 기준",
  },
  {
    label: "New Customers",
    value: "1,234",
    delta: "-20%",
    trend: "down",
    trendText: "이번 기간 신규 고객사 유입이 이전 기간보다 감소했습니다",
    footer: "온보딩 전환 흐름과 담당자 배정을 확인하세요",
  },
  {
    label: "Active Accounts",
    value: "45,678",
    delta: "+12.5%",
    trend: "up",
    trendText: "고객 성공 통합 관리 본부의 활성 계정 유지율이 안정적입니다",
    footer: "팀별 협업 참여도가 이번 분기 목표를 상회했습니다",
  },
  {
    label: "Growth Rate",
    value: "4.5%",
    delta: "+4.5%",
    trend: "up",
    trendText: "운영 지표가 계획한 범위 안에서 꾸준히 개선되고 있습니다",
    footer: "다음 분기 고객 성공 운영 전망과 일치합니다",
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
