"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ITenantRequests } from "@/lib/types";
import { getNameInitials } from "@/service/getNameInitials";
import { getDate } from "@/utils/getDate";
import Image from "next/image";
import Link from "next/link";

export function RequestBox({
  request,
  isLandlord,
}: {
  request: ITenantRequests;
  isLandlord: boolean;
}) {
  let statusColor = "";

  if (request.status === "COMPLETED") {
    statusColor = "bg-gray-500 text-black";
  } else if (request.status === "APPROVED") {
    statusColor = "bg-blue-500 text-white";
  } else if (request.status === "REJECTED") {
    statusColor = "bg-red-500 text-white";
  } else if (request.status === "ACTIVE") {
    statusColor = "bg-green-500 text-white";
  } else {
    statusColor = "bg-orange-500 text-white";
  }

  return (
    <Card className="w-full max-w-5xl border bg-background shadow-none p-3 rounded-lg md:rounded-2xl">
      <CardContent className="flex gap-3 p-0 justify-between md:gap-8">
        <div className="flex flex-col lg:flex-row md:gap-6">
          <div className="flex h-auto w-30 shrink-0 items-start justify-center overflow-hidden rounded md:rounded-2xl bg-background text-3xl font-medium text-primary md:h-auto md:w-60">
            <Link href={`/properties/${request.property_id}`}>
              <Image
                src={request.property.property_image}
                width={500}
                height={500}
                alt={request.property.title}
                className="rounded md:rounded-2xl"
              />
            </Link>
          </div>

          <div className="flex flex-1 justify-between items-start gap-5 mt-2 py-2 pr-2 sm:p-0">
            <div className="flex flex-col gap-1">
              <h4 className="truncate text-lg font-medium tracking-tight wrap-break-word">
                <Link href={`/properties/${request.property_id}`}>
                  {request.property?.title}
                </Link>
              </h4>
              <p className="text-base leading-tight text-gray-600 mt-1">
                {request.message}
              </p>
              {isLandlord && (
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={
                        "https://images.unsplash.com/photo-1613064756072-52b429a1e06f?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt={"Arif Hossain"}
                    />
                    <AvatarFallback>
                      {getNameInitials("Arif Hossain")}
                    </AvatarFallback>
                  </Avatar>
                  <p>Arif Hossain</p>
                </div>
              )}

              <p className="shrink-0 text-sm mt-2 text-gray-400">
                {getDate(request.created_at)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Badge className={`px-3 py-2 text-xs ${statusColor}`}>
            {request.status}
          </Badge>
          {request.status === "APPROVED" ? (
            <Button className="cursor-pointer p-4 text-base">Pay Now</Button>
          ) : request.status === "ACTIVE" ? (
            <Button className="cursor-pointer p-4 text-base">
              Leave Review
            </Button>
          ) : (
            ""
          )}
        </div>
      </CardContent>
    </Card>
  );
}
