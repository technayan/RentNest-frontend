import { Suspense } from "react";
import { BreadcrumbBasic } from "../_components/BreadcrumbBasic";
import PropertyDetails from "../_components/PropertyDetails";
import PropertySkeleton from "../_components/PropertySkeleton";

export default function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <BreadcrumbBasic />
          </div>
        </header>

        <Suspense fallback={<PropertySkeleton />}>
          <PropertyDetails params={params} />
        </Suspense>
      </div>
    </main>
  );
}
