import { LayoutDashboard } from "lucide-react";

const tenantProfileItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/tenant",
  },
];

const landlordProfileItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/landlord",
  },
];

const adminProfileItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/admin",
  },
];

let profileItems = [];

export const getProfileItems = (role: string) => {
  if (role === "ADMIN") {
    profileItems = adminProfileItems;
  } else if (role === "LANDLORD") {
    profileItems = landlordProfileItems;
  } else {
    profileItems = tenantProfileItems;
  }

  return profileItems;
};
