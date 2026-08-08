"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IRequest } from "@/lib/types";
import { getNameInitials } from "@/service/getNameInitials";
import { getDate } from "@/utils/getDate";
import Image from "next/image";
import Link from "next/link";

export function RequestBox({
  request,
  role,
}: {
  request: IRequest;
  role: string;
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
      <CardContent className="p-0 relative">
        <div className="flex flex-col w-full lg:flex-row md:gap-6">
          {/* div-1 */}
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

          {/* div-2 */}
          <div className="flex flex-1 min-w-0 justify-between items-start gap-5 mt-2 py-2 pr-2 sm:p-0">
            <div className="flex min-w-0 flex-1 flex-col gap-1 h-full">
              <h4 className="truncate text-lg shrink-0 font-medium tracking-tight lg:pr-4 lg:w-5/6">
                <Link href={`/properties/${request.property_id}`}>
                  {request.property?.title.length > 40
                    ? request.property?.title.slice(0, 40).concat("...")
                    : request.property?.title}
                </Link>
              </h4>
              <p className="text-base leading-tight text-gray-600 mt-1 shrink-0">
                {request.message}
              </p>
              {role !== "TENANT" && (
                <div className="flex items-center gap-2 mt-2 shrink-0">
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
              <div className="w-full lg:flex justify-between items-end flex-1 min-h-0">
                <div className="h-full">
                  <p className="text-sm mt-2 mb-4 text-gray-400 lg:mb-0">
                    {getDate(request.created_at)}
                  </p>
                </div>
                {role === "TENANT" ? (
                  request.status === "APPROVED" ? (
                    <Button className="cursor-pointer p-4 text-base">
                      Pay Now
                    </Button>
                  ) : request.status === "ACTIVE" ? (
                    <Button className="cursor-pointer p-4 text-base">
                      Leave Review
                    </Button>
                  ) : (
                    ""
                  )
                ) : role === "LANDLORD" ? (
                  request.status === "PENDING" ? (
                    <div className="flex gap-2">
                      <Button className="cursor-pointer p-4 text-base border-primary bg-transparent text-primary hover:bg-primary hover:text-white">
                        Accept
                      </Button>
                      <Button className="cursor-pointer p-4 text-base border-red-600 bg-transparent text-red-600 hover:bg-red-600 hover:text-white">
                        Reject
                      </Button>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <Badge className={`px-3 py-2 text-xs ${statusColor}`}>
            {request.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
