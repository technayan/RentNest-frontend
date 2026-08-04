import { getMe } from "@/service/getMe";
import { DashboardSidebar } from "./DashboardSidebar";

export default async function DashboardSidebarArea() {
  const user = await getMe();
  return (
    <>
      <DashboardSidebar user={user.data} />
    </>
  );
}
