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
            <span className="bg-sidebar-accent text-sidebar-accent-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <GalleryVerticalEndIcon className="size-4" />
            </span>
            <span className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Acme Inc</span>
              <span className="text-xs">Enterprise</span>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-56">
            <DropdownMenuItem>
              <FrameIcon className="size-4" /> <span>Design Engineering</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CommandIcon className="size-4" /> <span>Sales &amp; Marketing</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export { TeamSwitcher as NavHeader };
