import { Suspense } from "react";
import DashboarTitle from "../../_components/DashboarTitle";
import RequestList from "../../_components/RequestList";
import { RequestListSkeleton } from "../../_components/RequestListSkeleton";

export default function AdminRequestPage() {
  return (
    <div>
      <DashboarTitle title={"Pending Requests"} />
      <Suspense fallback={<RequestListSkeleton />}>
        <RequestList />
      </Suspense>
    </div>
  );
}
