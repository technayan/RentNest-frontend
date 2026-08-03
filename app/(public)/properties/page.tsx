import { Suspense } from "react";
import PropertyList from "./_components/PropertyList";
import { PropertyListSkeleton } from "./_components/PropertyListSkeleton";
import SearchForm from "./_components/SearchForm";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={""}>
        <SearchForm />
      </Suspense>

      <Suspense fallback={<PropertyListSkeleton />}>
        <PropertyList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
