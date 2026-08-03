"use client";

import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface PropertyDetailsProps {
  title: string;
  price: number;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
}

export function PropertyArea({
  title,
  price,
  category,
  description,
  rating,
  reviewCount,
}: PropertyDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Title and Category */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {title}
        </h1>
        <Badge
          variant="outline"
          className="bg-primary/20 text-black p-3 capitalize"
        >
          {category}
        </Badge>
      </div>

      {/* Price */}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Starting price</p>
        <p className="text-3xl md:text-4xl font-bold text-primary">
          ${price.toLocaleString()}
        </p>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={18}
              className={
                i < Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }
            />
          ))}
        </div>
        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">
          ({reviewCount} reviews)
        </span>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Description</h2>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
