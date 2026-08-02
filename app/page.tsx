import NavbarArea from "@/components/shared/NavbarArea";
import HeroImage from "@/public/assets/hero-img.jpg";
import Image from "next/image";
import { Suspense } from "react";
import FeaturedProperties from "./_components/FeaturedProperties";

export default async function HomePage() {
  return (
    <div>
      <Suspense fallback={""}>
        <NavbarArea />
      </Suspense>
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="relative mt-4">
          <Image
            src={HeroImage}
            width={1400}
            height={500}
            alt="Picture of the author"
            className="w-full h-40 md:h-50 lg:h-60 object-cover rounded-3xl "
          />
          <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full">
            <h1 className="w-full text-3xl md:text-4xl lg:text-6xl text-center font-bold text-white">
              Find Your <br />
              Perfect Home
            </h1>
          </div>
        </div>

        {/* Featured Properties */}

        <FeaturedProperties />
      </div>
    </div>
  );
}
