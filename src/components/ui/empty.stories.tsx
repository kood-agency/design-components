import type { Meta, StoryObj } from "@storybook/react";
import { BellIcon, InboxIcon } from "lucide-react";
import { Button } from "./button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty";

const meta: Meta<typeof Empty> = {
  title: "Components/Empty",
  component: Empty,
};
export default meta;

type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>Try a different filter or create a new item.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>Create a project to get started.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>New project</Button>
      </EmptyContent>
    </Empty>
  ),
};

export const NoticeEmpty: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BellIcon />
        </EmptyMedia>
        <EmptyTitle>새 알림이 없습니다</EmptyTitle>
        <EmptyDescription>새 소식이 도착하면 이곳에서 확인할 수 있습니다.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};
