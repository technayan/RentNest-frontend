import { IRequest } from "@/lib/types";
import { getMe } from "@/service/getMe";
import { getPendingRequestsForAdmin } from "../admin/_actions/adminActions";
import { getActiveRequests } from "../landlord/_actions/landlordActions";
import { getMyRequests } from "../tenant/_actions/tenantActions";
import { RequestBox } from "./RequestBox";

export default async function RequestList({
  requestType,
}: {
  requestType?: string;
}) {
  const user = await getMe();

  let requestList = [];

  if (user.data?.role === "TENANT") {
    requestList = await getMyRequests();
  } else if (user.data?.role === "LANDLORD") {
    if (requestType === "ACTIVE") {
      requestList = await getActiveRequests();
    }
  } else {
    requestList = await getPendingRequestsForAdmin();
  }

  return (
    <div className="flex flex-col gap-4">
      {requestList.length
        ? requestList.map((request: IRequest) => (
            <RequestBox
              key={request.id}
              request={request}
              role={user.data?.role}
            />
          ))
        : "No request found."}
    </div>
  );
}
