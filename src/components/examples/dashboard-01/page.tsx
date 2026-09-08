import type { CSSProperties } from "react";
import { SidebarInset, SidebarProvider } from "../../ui";
import { AppSidebar } from "./components/app-sidebar";
import { ChartInteractive } from "./components/chart-interactive";
import { DataTable } from "./components/data-table";
import { SiteHeader } from "./components/site-header";
import { SectionCards } from "./components/section-cards";

export function Dashboard01() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="@container/main flex min-w-0 flex-1 flex-col gap-6 p-4 md:p-6 xl:p-8">
          <SectionCards />
          <ChartInteractive />
          <DataTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
