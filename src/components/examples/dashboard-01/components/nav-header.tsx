import { CommandIcon, FrameIcon, GalleryVerticalEndIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui";
import type { ComponentProps } from "react";

function TeamSwitcher(props: ComponentProps<typeof SidebarMenuButton>) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size="lg" {...props} />}>
            <span className="bg-sidebar-accent text-sidebar-accent-foreground flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg">
              <GalleryVerticalEndIcon className="size-4" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1 text-left leading-snug">
              <span className="truncate font-semibold">코오드 디자인 시스템 운영 본부</span>
              <span className="text-muted-foreground truncate text-xs">고객 성공 통합 관리</span>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-56">
            <DropdownMenuItem>
              <FrameIcon className="size-4" /> <span>디자인 엔지니어링</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CommandIcon className="size-4" /> <span>고객 성공 운영</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export { TeamSwitcher as NavHeader };
