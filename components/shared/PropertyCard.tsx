import DeletePropertyButton from "@/app/(dashboards)/dashboard/_components/DeletePropertyButton";
import { PropertyEditDialog } from "@/app/(dashboards)/dashboard/_components/PropertyEditDialog";
import { IProperty } from "@/lib/types";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function PropertyCard({
  property,
  featured,
  dashboardProperty,
}: {
  property: IProperty;
  featured?: boolean;
  dashboardProperty?: boolean;
}) {
  return (
    <Card className="py-3 2xl:py-5">
      <CardHeader className="px-3 2xl:px-5">
        <div className="relative">
          <Link href={`/properties/${property.id}`} className="overflow-hidden">
            <Image
              src={property.property_image}
              width={300}
              height={200}
              alt={property.title}
              className={`w-full h-60 rounded-lg sm:h-45 md:h-50 ${featured ? "2xl:h-60" : "xl:h-60 2xl:h-70"}`}
            />
          </Link>
          {featured ? (
            <Badge className="absolute top-0 p-3 right-1 mt-2 bg-white text-black">
              Featured
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className={`absolute top-2 right-2 p-3 ${property.availability_status === "AVAILABLE" ? "bg-primary" : "bg-red-500 "} text-white border-0 capitalize`}
            >
              {property.availability_status.toLowerCase()}
            </Badge>
          )}
        </div>
        <div className="flex justify-between items-center mt-2">
          <Badge className="bg-primary/20 text-black p-3 capitalize">
            {property.category.category_name}
          </Badge>
          <p className="text-xl font-bold text-primary sm:text-2xl">
            ${property.price}
          </p>
        </div>
        <Link
          href={`/properties/${property.id}`}
          className="duration-300 hover:text-primary my-2"
        >
          <CardTitle className="text-base sm:text-xl">
            {property.title}
          </CardTitle>
        </Link>
        <CardDescription className="sm:text-base">
          {property.description.slice(0, 90)}
          {"..."}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3 2xl:px-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-sm flex items-start gap-1 sm:text-base">
              <span className="mt-0.5">
                <MapPin className="size-4 sm:size-5" />
              </span>
              {property.location}
            </p>
            <p className="text-sm flex items-center gap-1 sm:text-base">
              <Star className="size-4 sm:size-5" />
              {property._count.reviews}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-3 2xl:px-5">
        {dashboardProperty ? (
          <div className="flex gap-1">
            <PropertyEditDialog property={property} />

            <DeletePropertyButton id={property?.id} />
          </div>
        ) : (
          <Link
            href={`/properties/${property.id}`}
            className="w-full mt-auto px-4 py-3 bg-transparent text-primary font-medium text-center border border-primary rounded-3xl duration-300 hover:bg-primary hover:text-white"
          >
            View Details
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
