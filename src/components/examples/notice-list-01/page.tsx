import { ArchiveIcon, CheckCheckIcon, MegaphoneIcon } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../ui";

type Notice = {
  category: string;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
};

const today: Notice[] = [
  {
    category: "캠페인",
    title: "가을 신제품 캠페인 검토가 완료되었습니다",
    description: "선정 결과와 다음 작업을 확인해 주세요.",
    time: "10분 전",
    unread: true,
  },
  {
    category: "정산",
    title: "9월 정산 예정 금액이 업데이트되었습니다",
    description: "지급 계좌와 세금 정보를 다시 확인할 수 있습니다.",
    time: "1시간 전",
    unread: true,
  },
];

const earlier: Notice[] = [
  {
    category: "공지",
    title: "파트너 센터 이용약관이 변경됩니다",
    description: "변경되는 내용을 검토하고 필요한 조치를 준비해 주세요.",
    time: "어제",
  },
];

function NoticeRow({ notice }: { notice: Notice }) {
  return (
    <article
      className="flex gap-3 py-4"
      data-testid={notice.unread ? "notice-unread-row" : undefined}
    >
      <div className="bg-secondary text-foreground-muted grid size-9 shrink-0 place-items-center rounded-md">
        <MegaphoneIcon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold">{notice.title}</p>
          {notice.unread ? <Badge variant="outline">새 알림</Badge> : null}
        </div>
        <p className="text-foreground-muted mt-1 text-sm">{notice.description}</p>
        <p className="text-muted-foreground mt-2 text-xs">
          {notice.category} · {notice.time}
        </p>
      </div>
    </article>
  );
}

function NoticeSection({ title, notices }: { title: string; notices: Notice[] }) {
  return (
    <section aria-label={title}>
      <h2
        className="text-foreground-muted text-sm font-semibold"
        data-testid="notice-section-title"
      >
        {title}
      </h2>
      <div className="divide-border mt-2 divide-y">
        {notices.map((notice) => (
          <NoticeRow key={notice.title} notice={notice} />
        ))}
      </div>
    </section>
  );
}

export function NoticeList01() {
  return (
    <main className="bg-background text-foreground min-h-svh p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid w-full max-w-4xl gap-6">
        <header className="border-border flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-foreground-muted text-sm font-semibold">업무 알림</p>
            <h1 className="mt-1 text-2xl leading-8 font-semibold" data-testid="notice-list-title">
              알림
            </h1>
            <p className="text-foreground-muted mt-2 text-sm">
              중요한 업데이트와 다음 작업을 한곳에서 확인하세요.
            </p>
          </div>
          <Button variant="secondary">
            <CheckCheckIcon />
            모두 읽음으로 표시
          </Button>
        </header>

        <Tabs defaultValue="all">
          <TabsList variant="pill" aria-label="알림 분류" data-testid="notice-tabs">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="unread">읽지 않음</TabsTrigger>
            <TabsTrigger value="archive">보관함</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="grid gap-6" data-testid="notice-all-panel">
            <Card size="sm">
              <CardHeader>
                <CardTitle>받은 편지함</CardTitle>
                <CardDescription>새 알림 2개를 포함해 최근 소식을 보여줍니다.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <NoticeSection title="오늘" notices={today} />
                <NoticeSection title="이전" notices={earlier} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread" data-testid="notice-unread-panel">
            <Card size="sm">
              <CardHeader>
                <CardTitle>읽지 않은 알림</CardTitle>
                <CardDescription>확인이 필요한 업데이트만 모았습니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <NoticeSection
                  title="읽지 않은 알림"
                  notices={today.filter((notice) => notice.unread)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archive" data-testid="notice-archive-panel">
            <Card size="sm">
              <CardHeader>
                <CardTitle>보관함</CardTitle>
                <CardDescription>나중에 다시 확인할 알림을 보관합니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <ArchiveIcon />
                    </EmptyMedia>
                    <EmptyTitle>보관한 알림이 없습니다</EmptyTitle>
                    <EmptyDescription data-testid="notice-section-title">
                      필요한 알림을 보관하면 이곳에서 다시 확인할 수 있습니다.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button variant="secondary">알림 설정 열기</Button>
                  </EmptyContent>
                </Empty>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
