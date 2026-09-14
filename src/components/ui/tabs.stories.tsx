import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">계정</TabsTrigger>
        <TabsTrigger value="password">보안</TabsTrigger>
        <TabsTrigger value="team">팀 설정</TabsTrigger>
      </TabsList>
      <TabsContent value="account">계정 설정</TabsContent>
      <TabsContent value="password">보안 설정</TabsContent>
      <TabsContent value="team">팀 설정</TabsContent>
    </Tabs>
  ),
};

export const Pill: Story = {
  render: () => (
    <Tabs data-testid="tabs-pill" defaultValue="channels">
      <TabsList variant="pill">
        <TabsTrigger value="channels">채널</TabsTrigger>
        <TabsTrigger value="campaigns">캠페인</TabsTrigger>
        <TabsTrigger value="reports">리포트</TabsTrigger>
      </TabsList>
      <TabsContent value="channels">연결된 채널을 관리합니다.</TabsContent>
      <TabsContent value="campaigns">진행 중인 캠페인을 확인합니다.</TabsContent>
      <TabsContent value="reports">성과 리포트를 확인합니다.</TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">계정</TabsTrigger>
        <TabsTrigger value="password" disabled>
          보안
        </TabsTrigger>
        <TabsTrigger value="team">팀 설정</TabsTrigger>
      </TabsList>
      <TabsContent value="account">계정 설정</TabsContent>
      <TabsContent value="password">보안 설정</TabsContent>
      <TabsContent value="team">팀 설정</TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="account" orientation="vertical">
      <TabsList>
        <TabsTrigger value="account">계정</TabsTrigger>
        <TabsTrigger value="password">보안</TabsTrigger>
        <TabsTrigger value="team">팀 설정</TabsTrigger>
      </TabsList>
      <TabsContent value="account">계정 설정</TabsContent>
      <TabsContent value="password">보안 설정</TabsContent>
      <TabsContent value="team">팀 설정</TabsContent>
    </Tabs>
  ),
};
