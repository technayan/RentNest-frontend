import PropertyCard from "@/components/shared/PropertyCard";
import { IProperty } from "@/lib/types";
import Link from "next/link";
import { Suspense } from "react";
import { getProperties } from "../_actions/getProperties";
import { FeaturedPropertySkeleton } from "./FeaturedPropertySkeleton";

export default async function FeaturedProperties() {
  const properties = await getProperties();
  const featuredProperties = properties.data.data.filter(
    (p: IProperty) => p.isFeatured === true,
  );

  // const featuredProperties = properties.map((p) => p.isFeatured);
  return (
    <div className="py-16 lg:py-20">
      <h2 className="text-2xl font-semibold text-center md:text-3xl lg:text-4xl">
        Featured Properties
      </h2>
      <Suspense fallback={<FeaturedPropertySkeleton />}>
        <div className="grid grid-cols-1 my-10 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3 lg:my-12 2xl:gap-6">
          {featuredProperties.map((property: IProperty) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </Suspense>
      <div className="text-center">
        <Link
          href={"/properties"}
          className="px-5 py-3 bg-transparent rounded-3xl font-medium text-primary border border-primary duration-300 hover:bg-primary hover:text-white ease-in-out"
        >
          More Properties
        </Link>
      </div>
    </div>
  );
}
