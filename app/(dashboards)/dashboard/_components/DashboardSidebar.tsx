"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ISidebarItem, NavbarProps } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";

export function DashboardSidebar({ user }: NavbarProps) {
  const pathname = usePathname();

  let dashboardItems: ISidebarItem[] = [];

  if (user.role === "TENANT") {
    dashboardItems = sidebarMenuItems.TENANT;
  } else if (user.role === "LANDLORD") {
    dashboardItems = sidebarMenuItems.LANDLORD;
  } else if (user.role === "ADMIN") {
    dashboardItems = sidebarMenuItems.ADMIN;
  }
  console.log(dashboardItems);
  console.log(user);

  return (
    <Sidebar>
      <SidebarContent className="pt-16">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    className="p-0 h-10"
                  >
                    <Link href={item.href} className="block w-full p-4">
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
