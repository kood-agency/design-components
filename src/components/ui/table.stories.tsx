import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
};
export default meta;

type Story = StoryObj<typeof Table>;

const rows = [
  { name: "김서윤", department: "고객 경험 디자인 전략실", count: 1284 },
  { name: "이도현", department: "플랫폼 안정성 엔지니어링 본부", count: 98 },
  { name: "박지민", department: "데이터 기반 제품 리서치팀", count: 21045 },
  { name: "최하은", department: "전사 운영 지원 및 파트너십 그룹", count: 7 },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>부서별 구성원 현황</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>부서</TableHead>
          <TableHead className="text-right">인원</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.department}</TableCell>
            <TableCell className="text-right tabular-nums">{row.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Selected: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>부서</TableHead>
          <TableHead className="text-right">인원</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={row.name} data-selected={index === 1 ? "true" : undefined}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.department}</TableCell>
            <TableCell className="text-right tabular-nums">{row.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Empty: Story = {
  render: () => {
    const emptyRows: typeof rows = [];

    return (
      <Table>
        <TableCaption>구성원 현황</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>부서</TableHead>
            <TableHead className="text-right">인원</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emptyRows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell className="text-right tabular-nums">{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const Narrow: Story = {
  render: () => (
    <div className="w-72">
      <Table className="min-w-[640px]">
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>부서</TableHead>
            <TableHead className="text-right">인원</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell className="text-right tabular-nums">{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
