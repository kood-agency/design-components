import type { Meta, StoryObj } from "@storybook/react";
import { CalendarIcon, HomeIcon, InboxIcon, SearchIcon, SettingsIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "./sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

function DemoNav() {
  return (
    <>
      <SidebarHeader>
        <SidebarInput placeholder="Search" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Home">
                  <HomeIcon />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Inbox">
                  <InboxIcon />
                  <span>Inbox</span>
                  <SidebarMenuBadge>3</SidebarMenuBadge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Calendar">
                  <CalendarIcon />
                  <span>Calendar</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <span>Upcoming</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton isActive>
                      <span>Past</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Search">
                  <SearchIcon />
                  <span>Search</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton variant="outline" tooltip="Settings">
                  <SettingsIcon />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="sm" tooltip="Account">
              <span>Ada Lovelace</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </>
  );
}

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <DemoNav />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 px-3">
          <SidebarTrigger />
          <span className="text-sm">Inbox</span>
        </header>
        <div className="p-6 text-sm">Workspace content</div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <DemoNav />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 px-3">
          <SidebarTrigger />
          <span className="text-sm">Collapsed</span>
        </header>
        <div className="p-6 text-sm">Icon mode</div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const Floating: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar variant="floating" collapsible="icon">
        <DemoNav />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 px-3">
          <SidebarTrigger />
          <span className="text-sm">Floating</span>
        </header>
        <div className="p-6 text-sm">Floating sidebar</div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const Inset: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <DemoNav />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 px-3">
          <SidebarTrigger />
          <span className="text-sm">Inset</span>
        </header>
        <div className="p-6 text-sm">Inset content</div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const Mobile: Story = {
  render: () => (
    <div style={{ width: 375, height: 640 }}>
      <SidebarProvider>
        <Sidebar collapsible="offcanvas">
          <DemoNav />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 px-3">
            <SidebarTrigger />
            <span className="text-sm">Mobile</span>
          </header>
          <div className="p-6 text-sm">Narrow viewport</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  ),
};
