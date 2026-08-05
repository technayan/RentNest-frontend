import { getMe } from "@/service/getMe";
import ProfileInfo from "../../_components/ProfileInfo";

export default async function TenantProfilePage() {
  const user = await getMe();

  return (
    <div>
      <ProfileInfo user={user.data} />
    </div>
  );
}
