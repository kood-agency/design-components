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
    header: "Cover page",
    type: "Cover page",
    status: "In Process" as const,
    target: 18,
    limit: 5,
    reviewer: "Eddie Lake",
  },
  {
    id: "2",
    header: "Table of contents",
    type: "Table of contents",
    status: "Done" as const,
    target: 29,
    limit: 24,
    reviewer: "Eddie Lake",
  },
];

function StatusCell({ status }: { status: (typeof rows)[number]["status"] }) {
  if (status === "Done") {
    return (
      <span className="text-muted-foreground inline-flex items-center gap-1.5">
        <CheckIcon className="text-success size-3.5" /> Done
      </span>
    );
  }
  return (
    <span className="text-muted-foreground inline-flex items-center gap-1.5">
      <LoaderCircleIcon className="size-3.5" /> In Process
    </span>
  );
}

function DocumentsTable() {
  return (
    <Table>
      <TableHeader className="bg-transparent">
        <TableRow className="hover:bg-transparent">
          <TableHead>Header</TableHead>
          <TableHead>Section Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Target</TableHead>
          <TableHead className="text-right">Limit</TableHead>
          <TableHead>Reviewer</TableHead>
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
    <Tabs value="outline">
      <TabsList className="w-fit">
        <TabsTrigger value="outline">Outline</TabsTrigger>
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
        <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
      </TabsList>
      <TabsContent value="outline" className="mt-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
              <Settings2Icon className="size-4" /> Customize Columns
              <ChevronDownIcon className="text-muted-foreground size-3.5" />
              <span className="sr-only">Customize columns</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Header</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Section Type</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Status</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Target</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Limit</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Reviewer</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline">
            <PlusIcon className="size-4" /> Add Section
          </Button>
        </div>
        <DocumentsTable />
        <p className="text-muted-foreground mt-4 flex items-center gap-1.5 text-xs">
          <ChevronsUpDownIcon className="size-3.5" /> Drag handles to reorder sections
        </p>
      </TabsContent>
      <TabsContent value="past-performance" className="mt-4" />
      <TabsContent value="key-personnel" className="mt-4" />
      <TabsContent value="focus-documents" className="mt-4" />
    </Tabs>
  );
}
