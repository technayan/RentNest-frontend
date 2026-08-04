import { ISidebarItem } from "@/lib/types";

const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Requests",
    href: "/dashboard/tenant/requests",
  },
  {
    label: "Payments",
    href: "/dashboard/tenant/payments",
  },
];

const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Profile",
    href: "/dashboard/landlord/profile",
  },
  {
    label: "Properties",
    href: "/dashboard/landlord/properties",
  },
  {
    label: "Requests",
    href: "/dashboard/landlord/requests",
  },
  {
    label: "Rental History",
    href: "/dashboard/landlord/rental-history",
  },
  {
    label: "Earnings",
    href: "/dashboard/landlord/earnings",
  },
  {
    label: "Reviews",
    href: "/dashboard/landlord/reviews",
  },
];

const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "All Users",
    href: "/dashboard/admin/users",
  },
  {
    label: "All Properties",
    href: "/dashboard/admin/properties",
  },
  {
    label: "All Pending Requests",
    href: "/dashboard/admin/pending-requests",
  },
  {
    label: "Rental History",
    href: "/dashboard/admin/rental-history",
  },
  {
    label: "Earnings",
    href: "/dashboard/admin/earnings",
  },
  {
    label: "Reviews",
    href: "/dashboard/admin/reviews",
  },
];

export const sidebarMenuItems = {
  TENANT: TENANT_SIDEBAR_ITEMS,
  LANDLORD: LANDLORD_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
