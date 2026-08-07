import { getMyProperties } from "@/app/(dashboards)/dashboard/landlord/_actions/landlordActions";
import { getProperties } from "@/app/_actions/getProperties";
import PropertyCard from "@/components/shared/PropertyCard";
import { IProperty } from "@/lib/types";

export default async function PropertyList({
  searchParams,
  propertyTypes,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
  propertyTypes: string;
}) {
  const query = await searchParams;
  let propertiesData;
  let properties;
  if (propertyTypes === "all") {
    propertiesData = await getProperties({ query });
    properties = propertiesData?.data?.data;
  } else if (propertyTypes === "my-properties") {
    propertiesData = await getMyProperties();
    properties = propertiesData?.data;
  }

  return (
    <div className="grid grid-cols-1 my-6 gap-6 sm:grid-cols-2 md:my-10 lg:grid-cols-3 lg:gap-6 lg:my-12 2xl:gap-6">
      {properties.map((property: IProperty) => (
        <PropertyCard
          key={property.id}
          property={property}
          dashboardProperty={propertyTypes === "my-properties"}
        />
      ))}
    </div>
  );
}
