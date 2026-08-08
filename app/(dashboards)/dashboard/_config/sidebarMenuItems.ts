import { ISidebarItem } from "@/lib/types";

const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Profile",
    href: "/dashboard/landlord/profile",
  },
  {
    label: "My Requests",
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
    label: "My Properties",
    href: "/dashboard/landlord/properties",
  },
  {
    label: "New Requests",
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
    label: "Profile",
    href: "/dashboard/admin/profile",
  },
  {
    label: "All Users",
    href: "/dashboard/admin/users",
  },
  {
    label: "All Properties",
    href: "/dashboard/admin/properties",
  },
  {
    label: "Pending Requests",
    href: "/dashboard/admin/pending-requests",
  },
];

export const sidebarMenuItems = {
  TENANT: TENANT_SIDEBAR_ITEMS,
  LANDLORD: LANDLORD_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
