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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartInteractive />
              </div>
            </div>
            <div className="px-4 pb-6 lg:px-6">
              <DataTable />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
