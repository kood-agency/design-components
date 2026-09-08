import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardNested,
  CardTitle,
} from "./card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>분기별 고객 운영 현황과 서비스 안정성 검토</CardTitle>
        <CardDescription>현재 디자인 시스템 릴리스의 상태를 확인합니다.</CardDescription>
      </CardHeader>
      <CardContent>여덟 개의 표면 컴포넌트가 승인된 레시피를 따릅니다.</CardContent>
      <CardFooter>
        <Button size="sm">Continue</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>알림</CardTitle>
        <CardDescription>읽지 않은 메시지가 3개 있습니다.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Mark all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>배지 스타일 변경에 새 댓글이 있습니다.</CardContent>
    </Card>
  ),
};

export const Nested: Story = {
  render: () => (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>중첩 영역</CardTitle>
        <CardDescription>중첩 영역은 한 단계만 사용합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <CardNested>16px 패딩을 사용하는 surface-2 중첩 영역입니다.</CardNested>
      </CardContent>
    </Card>
  ),
};

export const Small: Story = {
  render: () => (
    <Card size="sm" className="w-full max-w-80">
      <CardHeader>
        <CardTitle>긴 한국어 제목도 컨테이너 안에서 자연스럽게 줄바꿈됩니다</CardTitle>
        <CardDescription>작은 크기는 16px 패딩을 사용합니다.</CardDescription>
      </CardHeader>
      <CardContent>밀도 높은 메타데이터에 사용합니다.</CardContent>
    </Card>
  ),
};
