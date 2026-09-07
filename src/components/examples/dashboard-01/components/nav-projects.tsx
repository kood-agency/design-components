import type { LucideIcon } from "lucide-react";
import {
  AudioLinesIcon,
  BugIcon,
  CodeIcon,
  ConeIcon,
  FrameIcon,
  LayersIcon,
  MessageSquareWarningIcon,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui";

const projects: { name: string; url: string; icon: LucideIcon; badge?: string }[] = [
  { name: "Design Engineering", url: "#", icon: LayersIcon },
  { name: "Sales & Marketing", url: "#", icon: ConeIcon, badge: "24" },
  { name: "Travel", url: "#", icon: FrameIcon },
  { name: "Bug Reports", url: "#", icon: BugIcon, badge: "3" },
  { name: "Code Review", url: "#", icon: CodeIcon },
  { name: "Coding Assistant", url: "#", icon: MessageSquareWarningIcon },
  { name: "Audio Transcription", url: "#", icon: AudioLinesIcon },
];

export function NavProjects() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {projects.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                isActive={item.name === "Design Engineering"}
                render={<a href={item.url} />}
              >
                <item.icon />
                <span>{item.name}</span>
              </SidebarMenuButton>
              {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
