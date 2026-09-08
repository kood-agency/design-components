import {
  ArrowUpRightIcon,
  ChartColumnIcon,
  FrameIcon,
  LifeBuoyIcon,
  MapIcon,
  PieChartIcon,
  SendIcon,
  SettingsIcon,
  SquareTerminalIcon,
} from "lucide-react";
import {
  Badge,
  Button,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "../../../ui";
import { NavHeader } from "../../dashboard-01/components/nav-header";
import { NavUser } from "../../dashboard-01/components/nav-main";

const navMain: {
  title: string;
  url: string;
  icon: typeof SquareTerminalIcon;
  isActive?: boolean;
  badge?: string;
}[] = [
  { title: "Playground", url: "#", icon: SquareTerminalIcon, isActive: true },
  { title: "Models", url: "#", icon: ChartColumnIcon },
  { title: "Documentation", url: "#", icon: FrameIcon },
  { title: "Settings", url: "#", icon: SettingsIcon, badge: "New" },
];

const navSecondary = [
  { title: "Support", url: "#", icon: LifeBuoyIcon },
  { title: "Feedback", url: "#", icon: SendIcon },
];

const projects: { name: string; url: string; icon: typeof PieChartIcon }[] = [
  { name: "Design Engineering", url: "#", icon: FrameIcon },
  { name: "Sales & Marketing", url: "#", icon: PieChartIcon },
  { name: "Travel", url: "#", icon: MapIcon },
];

const user = {
  name: "Carolyn Newton",
  email: "c.newton@example.com",
  initials: "CN",
};

export function Sidebar01() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-3">
        <NavHeader />
      </SidebarHeader>
      <SidebarContent className="gap-4 py-3">
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.isActive}
                    className={item.badge ? "pr-14" : undefined}
                    render={<a href={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  {item.badge && (
                    <Badge
                      className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 group-data-[collapsible=icon]:hidden"
                      variant="accent"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton render={<a href={item.url} />}>
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<a href={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <Button size="sm" className="w-full">
          <ArrowUpRightIcon /> Upgrade to Pro
        </Button>
      </SidebarFooter>
      <NavUser user={user} />
      <SidebarRail />
    </Sidebar>
  );
}
