import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface PropertyImageProps {
  src: string;
  alt: string;
  availability_status: string;
}

export function PropertyImage({
  src,
  alt,
  availability_status,
}: PropertyImageProps) {
  const isAvailable = availability_status === "AVAILABLE";
  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden bg-muted">
      <Image src={src} alt={alt} fill className="object-cover" priority />

      <Badge
        variant="outline"
        className={`absolute top-2 right-2 text-base px-5 py-4 ${isAvailable ? "bg-primary" : "bg-red-500 "} text-white border-0 capitalize`}
      >
        {availability_status.toLowerCase()}
      </Badge>
    </div>
  );
}
