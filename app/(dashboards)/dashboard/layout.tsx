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
        <div className="flex flex-1 mt-20 md:mt-15">
          <Suspense fallback={""}>
            <DashboardSidebarArea />
            <SidebarInset>
              <SidebarTrigger className="sticky top-18 ml-0 z-10 bg-primary text-white p-5 rounded-lg hover:bg-primary/50  md:hidden" />
              <div className="p-5"> {children}</div>
            </SidebarInset>
          </Suspense>
        </div>
      </SidebarProvider>
    </div>
  );
}
