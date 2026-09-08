import { Separator, SidebarInset, SidebarProvider, SidebarTrigger } from "../../ui";
import { Sidebar01 } from "./components/sidebar-nav";

export function Sidebar01Page() {
  return (
    <SidebarProvider>
      <Sidebar01 />
      <SidebarInset>
        <header className="flex min-h-16 items-center gap-3 border-b px-4 md:px-6 xl:px-8">
          <SidebarTrigger />
          <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
          <span className="text-sm font-medium">Navigation</span>
        </header>
        <div className="flex flex-col gap-3 p-4 md:p-6 xl:p-8">
          <h1 className="text-2xl font-semibold">Sidebar preview</h1>
          <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
            Explore workspace navigation, project links, and account controls. Use the toggle to
            open or close the sidebar.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
