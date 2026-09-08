import { ActivityIcon, FolderClosedIcon, LayoutDashboardIcon, UsersIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "../../../ui";
import { NavHeader } from "./nav-header";
import { NavMain, NavUser, type NavItem } from "./nav-main";
import { NavProjects } from "./nav-projects";

const mainNav: NavItem[] = [
  { title: "Dashboard", url: "#", icon: LayoutDashboardIcon, isActive: true },
  { title: "Lifecycle", url: "#", icon: ActivityIcon },
  { title: "Analytics", url: "#", icon: ActivityIcon },
  { title: "Projects", url: "#", icon: FolderClosedIcon },
  { title: "Team", url: "#", icon: UsersIcon },
];

const user = {
  name: "Carolyn Newton",
  email: "c.newton@example.com",
  initials: "CN",
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-3">
        <NavHeader />
      </SidebarHeader>
      <SidebarContent className="gap-4 py-3">
        <NavMain title="Platform" items={mainNav} />
        <NavProjects />
      </SidebarContent>
      <NavUser user={user} />
      <SidebarRail />
    </Sidebar>
  );
}
