"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from "@/service/getNameInitials";
import { Mail, Phone } from "lucide-react";
import RentalRequestDialog from "./RentalRequestDialog";

interface OwnerCardProps {
  ownerImage: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  propertyId: string;
  availability_status: string;
}

export function OwnerCard({
  ownerImage,
  ownerName,
  ownerEmail,
  ownerPhone,
  propertyId,
  availability_status,
}: OwnerCardProps) {
  return (
    <div className="sticky top-4 rounded-lg border border-border bg-card p-6 shadow-sm">
      {/* Owner Image */}
      <div className="flex justify-center mb-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          <Avatar className="w-full h-full">
            <AvatarImage src={ownerImage} alt={ownerName} />
            <AvatarFallback>{getNameInitials(ownerName)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Owner Info */}
      <div className="space-y-2 text-center mb-6">
        <h3 className="text-xl font-bold text-foreground">{ownerName}</h3>
        <p className="text-sm text-muted-foreground">Property Owner</p>
      </div>

      {/* Contact Information */}
      <div className="space-y-4 mb-6">
        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail size={18} className="text-primary size-5 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <a
              href={`mailto:${ownerEmail}`}
              className="text-base font-medium text-primary hover:underline break-all"
            >
              {ownerEmail}
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-ceter gap-3">
          <Phone size={18} className="text-primary size-5 shrink-0 mt-0.5" />
          <div>
            <a
              href={`tel:${ownerPhone}`}
              className="text-base font-medium text-primary hover:underline"
            >
              {ownerPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <RentalRequestDialog
          id={propertyId}
          availability_status={availability_status}
        />
      </div>
    </div>
  );
}
