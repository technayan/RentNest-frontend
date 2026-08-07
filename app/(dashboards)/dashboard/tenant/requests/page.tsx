import { Suspense } from "react";
import DashboarTitle from "../../_components/DashboarTitle";
import RequestList from "../../_components/RequestList";
import { RequestListSkeleton } from "../../_components/RequestListSkeleton";

export default function TenantRequestsPage() {
  return (
    <div>
      <DashboarTitle title={"My Requests"} />
      <Suspense fallback={<RequestListSkeleton />}>
        <RequestList />
      </Suspense>
    </div>
  );
}
