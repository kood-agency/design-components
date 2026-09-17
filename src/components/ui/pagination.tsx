import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import { cn } from "../../lib/utils";

import { buttonVariants, type Button } from "./button";

function Pagination({
  className,
  label = "페이지 탐색",
  ...props
}: React.ComponentProps<"nav"> & { label?: string }) {
  return (
    <nav
      role="navigation"
      aria-label={label}
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = { isActive?: boolean } & Pick<
  React.ComponentProps<typeof Button>,
  "size"
> &
  React.ComponentProps<"a">;

function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive || undefined}
      className={cn(
        buttonVariants({ variant: isActive ? "secondary" : "ghost", size }),
        "data-active:bg-foreground data-active:text-background border-0",
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  text = "이전",
  label = "이전 페이지로 이동",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string; label?: string }) {
  return (
    <PaginationLink
      aria-label={label}
      size="default"
      className={cn("gap-1 px-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = "다음",
  label = "다음 페이지로 이동",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string; label?: string }) {
  return (
    <PaginationLink
      aria-label={label}
      size="default"
      className={cn("gap-1 px-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  label = "더 많은 페이지",
  ...props
}: React.ComponentProps<"span"> & { label?: string }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
