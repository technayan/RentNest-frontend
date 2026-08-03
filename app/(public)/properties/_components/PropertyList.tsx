import { getProperties } from "@/app/_actions/getProperties";
import PropertyCard from "@/components/shared/PropertyCard";
import { IProperty } from "@/lib/types";

export default async function PropertyList({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const query = await searchParams;
  const propertiesData = await getProperties({ query });
  const properties = propertiesData.data?.data;
  return (
    <div className="grid grid-cols-1 my-6 gap-6 sm:grid-cols-2 md:my-10 lg:grid-cols-3 lg:gap-6 lg:my-12 2xl:gap-6">
      {properties.map((property: IProperty) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
