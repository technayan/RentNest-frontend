"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from "@/service/getNameInitials";
import { getDate } from "@/utils/getDate";
import { Star } from "lucide-react";

interface ITenant {
  id: string;
  name: string;
  profile_photo: string;
}

interface IReview {
  id: string;
  tenant: ITenant;
  rating: number;
  comment: string;
  created_at: string;
}

interface PropertyReviewsProps {
  reviews: IReview[];
}

export function PropertyReviews({ reviews }: PropertyReviewsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">
        Customer Reviews
      </h2>

      <div className="space-y-4">
        {reviews.length
          ? reviews.map((review) => (
              <div
                key={review.id}
                className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex gap-3 items-center">
                    <Avatar className="size-9">
                      <AvatarImage
                        src={review.tenant?.profile_photo}
                        alt={review.tenant?.name}
                      />
                      <AvatarFallback>
                        {getNameInitials(review.tenant?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">
                        {review.tenant?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {getDate(review.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))
          : "No review avaialable."}
      </div>
    </div>
  );
}
