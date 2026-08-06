import PropertyList from "@/app/(public)/properties/_components/PropertyList";
import { PropertyListSkeleton } from "@/app/(public)/properties/_components/PropertyListSkeleton";
import { Suspense } from "react";
import DashboarTitle from "../../_components/DashboarTitle";

export default function LandlordPropertiesPage() {
  return (
    <div>
      <DashboarTitle title={"My Properties"} />
      <Suspense fallback={<PropertyListSkeleton />}>
        <PropertyList propertyTypes={"my-properties"} />
      </Suspense>
    </div>
  );
}
