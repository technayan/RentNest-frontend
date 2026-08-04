import NavbarArea from "@/components/shared/NavbarArea";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode, Suspense } from "react";
import DashboardSidebarArea from "./_components/DashboardSidebarArea";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={""}>
        <NavbarArea />
      </Suspense>
      <SidebarProvider>
        <div className="flex flex-1">
          <Suspense fallback={""}>
            <DashboardSidebarArea />
            <SidebarInset>
              <SidebarTrigger className="fixed top-18 ml-1 bg-accent p-4 rounded-lg" />
            </SidebarInset>
          </Suspense>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
