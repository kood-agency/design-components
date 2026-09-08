import {
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  LoaderCircleIcon,
  PlusIcon,
  Settings2Icon,
} from "lucide-react";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui";

const rows = [
  {
    id: "1",
    header: "주식회사 코오드 디자인 시스템 운영 및 고객 성공 통합 관리 본부 분기 운영 계획서",
    type: "분기 운영 계획",
    status: "진행 중" as const,
    target: 18,
    limit: 5,
    reviewer: "김서윤 운영 책임자",
  },
  {
    id: "2",
    header: "고객 성공 통합 관리 본부 서비스 품질 검토 및 개선 항목 목록",
    type: "서비스 품질 검토",
    status: "완료" as const,
    target: 29,
    limit: 24,
    reviewer: "박도윤 고객 성공 매니저",
  },
];

function StatusCell({ status }: { status: (typeof rows)[number]["status"] }) {
  if (status === "완료") {
    return (
      <span className="text-muted-foreground inline-flex items-center gap-1.5">
        <CheckIcon className="text-success size-3.5" /> 완료
      </span>
    );
  }
  return (
    <span className="text-muted-foreground inline-flex items-center gap-1.5">
      <LoaderCircleIcon className="size-3.5" /> 진행 중
    </span>
  );
}

function DocumentsTable() {
  return (
    <Table>
      <TableHeader className="bg-transparent">
        <TableRow className="hover:bg-transparent">
          <TableHead>문서 이름</TableHead>
          <TableHead>분류</TableHead>
          <TableHead>상태</TableHead>
          <TableHead className="text-right">목표</TableHead>
          <TableHead className="text-right">한도</TableHead>
          <TableHead>검토 담당</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.header}</TableCell>
            <TableCell className="text-muted-foreground">{row.type}</TableCell>
            <TableCell>
              <StatusCell status={row.status} />
            </TableCell>
            <TableCell className="text-right tabular-nums">{row.target}</TableCell>
            <TableCell className="text-right tabular-nums">{row.limit}</TableCell>
            <TableCell className="text-muted-foreground">{row.reviewer}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function DataTable() {
  return (
    <Tabs value="outline" className="min-w-0">
      <TabsList className="h-auto max-w-full flex-wrap justify-start gap-y-2">
        <TabsTrigger value="outline">개요</TabsTrigger>
        <TabsTrigger value="past-performance" className="gap-1.5">
          Past Performance{" "}
          <Badge variant="outline" className="px-1">
            3
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="key-personnel" className="gap-1.5">
          Key Personnel{" "}
          <Badge variant="outline" className="px-1">
            2
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="focus-documents">중점 문서</TabsTrigger>
      </TabsList>
      <TabsContent value="outline" className="mt-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
              <Settings2Icon className="size-4" /> 열 설정
              <ChevronDownIcon className="text-muted-foreground size-3.5" />
              <span className="sr-only">표시할 열 설정</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Header</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Section Type</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Target</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Limit</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Reviewer</DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline">
            <PlusIcon className="size-4" /> 문서 추가
          </Button>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <DocumentsTable />
        </div>
        <p className="text-muted-foreground mt-4 flex items-center gap-1.5 text-xs">
          <ChevronsUpDownIcon className="size-3.5" /> 드래그 핸들로 문서 순서를 바꿀 수 있습니다
        </p>
      </TabsContent>
      <TabsContent value="past-performance" className="mt-4" />
      <TabsContent value="key-personnel" className="mt-4" />
      <TabsContent value="focus-documents" className="mt-4" />
    </Tabs>
  );
}
