import { ITenantRequests } from "@/lib/types";
import { getMyRequests } from "../tenant/_actions/tenantActions";
import { RequestBox } from "./RequestBox";

export default async function RequestList() {
  const myRequests = await getMyRequests();

  return (
    <div className="flex flex-col gap-4">
      {myRequests.length
        ? myRequests.map((request: ITenantRequests) => (
            <RequestBox key={request.id} request={request} isLandlord={false} />
          ))
        : "No request found."}
    </div>
  );
}
