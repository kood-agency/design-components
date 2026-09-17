import { SearchIcon, UsersIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../ui";

const channels = [
  { name: "민지의 주말", handle: "@minji.weekend", audience: "24.8K", initials: "민" },
  { name: "서울 한 끼", handle: "@seoul.onebite", audience: "18.2K", initials: "서" },
] as const;

function ChannelRows() {
  return (
    <ul className="divide-border divide-y" data-testid="channel-rows">
      {channels.map((channel) => (
        <li className="flex items-center gap-3 py-4" key={channel.handle}>
          <Avatar size="sm">
            <AvatarFallback>{channel.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{channel.name}</p>
            <p className="text-foreground-muted truncate text-sm">{channel.handle}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{channel.audience}</p>
            <p className="text-foreground-muted text-xs">팔로워</p>
          </div>
          <Badge variant="success">연결됨</Badge>
        </li>
      ))}
    </ul>
  );
}

function ChannelForm() {
  return (
    <form className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="channel-name">채널 이름</Label>
        <Input id="channel-name" placeholder="예: 민지의 주말" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="channel-platform">플랫폼</Label>
        <Select defaultValue="instagram">
          <SelectTrigger id="channel-platform" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <SheetFooter>
        <Button type="submit" className="w-full">
          채널 추가
        </Button>
      </SheetFooter>
    </form>
  );
}

function AddChannelSheet() {
  return (
    <Sheet>
      <SheetTrigger render={<Button />}>채널 추가</SheetTrigger>
      <SheetContent closeLabel="닫기" data-testid="after-channel-sheet">
        <SheetHeader>
          <SheetTitle>채널 추가</SheetTitle>
          <SheetDescription>채널 정보를 입력하면 검토 대기 목록에 추가됩니다.</SheetDescription>
        </SheetHeader>
        <ChannelForm />
      </SheetContent>
    </Sheet>
  );
}

function PageHeader({ count }: { count: number }) {
  return (
    <header className="border-border flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="text-foreground-muted text-sm font-semibold">파트너 관리</p>
        <h1 className="mt-1 text-2xl leading-8 font-semibold">인플루언서와 채널</h1>
        <p className="text-foreground-muted mt-2 text-sm">
          캠페인에 참여하는 크리에이터와 채널을 한 곳에서 관리합니다.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-foreground-muted text-sm" data-testid="channel-count">
          {count}개 채널
        </span>
        <AddChannelSheet />
      </div>
    </header>
  );
}

function ChannelFilters() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input aria-label="채널 검색" className="pl-9" placeholder="이름 또는 채널 검색" />
      </div>
      <Select defaultValue="active">
        <SelectTrigger aria-label="연결 상태" className="w-full sm:w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">연결됨</SelectItem>
          <SelectItem value="review">검토 대기</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function Before() {
  return (
    <SidebarProvider>
      <div
        className="bg-background text-foreground flex min-h-svh w-full"
        data-testid="influencer-before"
      >
        <Sidebar collapsible="offcanvas" data-testid="influencer-before-sidebar">
          <SidebarHeader className="border-border border-b p-4">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-primary-foreground grid size-9 place-items-center rounded-md text-sm font-bold">
                K
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Kood Influencer</p>
                <p className="text-foreground-muted truncate text-xs">운영 워크스페이스</p>
              </div>
            </div>
            <Badge
              className="border-sidebar-border text-sidebar-foreground mt-3 w-fit"
              variant="outline"
            >
              운영 담당
            </Badge>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>업무 탐색</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>운영 현황</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>인플루언서</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>캠페인</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-border border-t p-4">
            <p className="text-sm font-medium">김민지</p>
            <p className="text-foreground-muted text-xs">minji@kood.kr</p>
            <Button className="mt-3 w-full">로그아웃</Button>
          </SidebarFooter>
          <SidebarRail label="사이드바 전환" />
        </Sidebar>
        <SidebarInset className="min-w-0">
          <header className="border-border flex min-h-16 items-center gap-3 border-b px-4">
            <SidebarTrigger label="메뉴 열기" />
            <Separator orientation="vertical" className="h-4" />
            <p className="text-foreground-muted min-w-0 flex-1 truncate text-sm">
              업무 기록과 다음 할 일을 한 곳에서 확인합니다.
            </p>
          </header>
          <main className="min-w-0 flex-1 p-4 sm:p-8">
            <div className="mx-auto max-w-5xl">
              <h1 className="text-2xl font-semibold">인플루언서</h1>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <section className="border-border rounded-lg border p-6">
                  <p className="text-foreground-muted text-sm">전체 인플루언서</p>
                  <p className="mt-2 text-2xl font-semibold">126명</p>
                </section>
                <section className="border-border rounded-lg border p-6">
                  <p className="text-foreground-muted text-sm">연결된 채널</p>
                  <p className="mt-2 text-2xl font-semibold">2개</p>
                </section>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export function After() {
  return (
    <main
      className="bg-background text-foreground min-h-svh p-4 sm:p-6 lg:p-8"
      data-testid="influencer-after"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-6">
        <PageHeader count={channels.length} />
        <Tabs defaultValue="channels">
          <TabsList variant="pill">
            <TabsTrigger value="channels">채널</TabsTrigger>
            <TabsTrigger value="influencers">인플루언서</TabsTrigger>
          </TabsList>
          <TabsContent value="channels" className="grid gap-6">
            <ChannelFilters />
            <div className="grid gap-6 lg:grid-cols-2" data-testid="after-channel-grid">
              <section className="border-border border-b pb-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold">연결된 채널</h2>
                    <p className="text-foreground-muted mt-1 text-sm">
                      현재 캠페인에 사용할 수 있습니다.
                    </p>
                  </div>
                  <Badge variant="outline">{channels.length}</Badge>
                </div>
                <ChannelRows />
              </section>
              <section className="border-border border-b pb-2">
                <div>
                  <h2 className="text-base font-semibold">검토 기준</h2>
                  <p className="text-foreground-muted mt-1 text-sm">
                    채널을 추가하면 아래 항목을 검토합니다.
                  </p>
                </div>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-foreground-muted">최근 게시물</dt>
                    <dd className="font-semibold">최근 30일</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-foreground-muted">공개 계정</dt>
                    <dd className="font-semibold">필수</dd>
                  </div>
                </dl>
              </section>
            </div>
          </TabsContent>
          <TabsContent value="influencers" className="text-foreground-muted">
            인플루언서 목록은 채널을 기준으로 정리됩니다.
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export function AfterEmpty() {
  return (
    <main
      className="bg-background text-foreground min-h-svh p-4 sm:p-6 lg:p-8"
      data-testid="influencer-after-empty"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-6">
        <PageHeader count={0} />
        <Tabs defaultValue="channels">
          <TabsList variant="pill">
            <TabsTrigger value="channels">채널</TabsTrigger>
            <TabsTrigger value="influencers">인플루언서</TabsTrigger>
          </TabsList>
          <TabsContent value="channels" className="grid gap-6">
            <ChannelFilters />
            <Empty data-testid="after-empty-state">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <UsersIcon />
                </EmptyMedia>
                <EmptyTitle>아직 연결된 채널이 없습니다</EmptyTitle>
                <EmptyDescription>
                  채널을 추가하면 캠페인에 참여할 인플루언서를 관리할 수 있습니다.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <AddChannelSheet />
              </EmptyContent>
            </Empty>
          </TabsContent>
          <TabsContent value="influencers" className="text-foreground-muted">
            인플루언서 목록은 채널을 기준으로 정리됩니다.
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
