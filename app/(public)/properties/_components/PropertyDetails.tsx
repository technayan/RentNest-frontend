import { getPropertyDetails } from "../_actions/propertyActions";
import { OwnerCard } from "./OwnerCard";
import { PropertyArea } from "./PropertyArea";
import { PropertyImage } from "./PropertyImage";
import { PropertyReviews } from "./PropertyReviews";

export default async function PropertyDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyDetails(id);
  return (
    <div>
      {/* Main Content */}
      <div className="pb-10 xl:pb-15">
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Image */}
            <div className="mb-8">
              <PropertyImage
                src={property.property_image}
                alt={property.title}
                availability_status={property.availability_status}
              />
            </div>
            <PropertyArea
              title={property.title}
              price={property.price}
              category={property?.category?.category_name}
              description={property.description}
              rating={property.average_rating}
              reviewCount={property.reviews.length}
            />

            {/* Reviews Section */}
            <PropertyReviews reviews={property.reviews} />
          </div>

          {/* Right Column - Owner Card */}
          <div>
            <OwnerCard
              ownerImage={property.landLord?.profile_photo}
              ownerName={property.landLord?.name}
              ownerEmail={property.landLord?.email}
              ownerPhone={property.landLord?.phone}
              propertyId={property.id}
              availability_status={property.availability_status}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
