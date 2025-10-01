import { UserButton } from "@clerk/nextjs";
import type { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/dashboard-layout/app-sidebar";
// import LayoutBreadcrumb from "./_components/dashboard-layout/layout-breadcrumb";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <UserButton />
          {/* <LayoutBreadcrumb/> */}
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
