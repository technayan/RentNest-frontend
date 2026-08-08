"use server";

import { IPropertyUpdateFormState, IRequestStatus } from "@/lib/types";
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidatePath, revalidateTag } from "next/cache";

//* Get My Properties
export const getMyProperties = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["my-properties"],
      },
    },
  );

  const result = await res.json();

  return result;
};

//* Update Property
export const updateProperty = async (
  id: string,
  prevPost: IPropertyUpdateFormState,
  formData: FormData,
) => {
  const accessToken = await isAccessTokenExist();

  const title = formData.get("title");
  const description = formData.get("description");
  const property_image = formData.get("property_image");
  const price = formData.get("price");
  const location = formData.get("location");
  const category = formData.get("category");
  const availability_status = formData.get("availability_status");

  const payload = {
    title,
    description,
    property_image,
    price,
    location,
    category,
    availability_status,
  };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties/${id}`,
    {
      method: "PUT",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-properties", { expire: 0 });
  }

  return result;
};

//* Delete Property
export const deleteProperty = async (id: string) => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties/${id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-properties", { expire: 0 });
    revalidateTag("properties", { expire: 0 });
  }

  return result;
};

//* Get Active Requests
export const getActiveRequests = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/requests`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
    },
  );

  const result = await res.json();

  return result.data;
};

//* Request Action
export const requestAction = async (
  prevState: IRequestStatus,
  { id, actionType }: { id: string; actionType: "APPROVED" | "REJECTED" },
) => {
  const accessToken = await isAccessTokenExist();

  const status = actionType;

  const payload = { status };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/requests/${id}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();
  revalidatePath("/");

  return result;
};
