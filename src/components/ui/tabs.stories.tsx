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
