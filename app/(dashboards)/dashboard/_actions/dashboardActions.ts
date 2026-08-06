/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getNewAccessToken } from "@/service/getNewAccessToken";
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type FormState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Record<string, any>;
};

//* Update Profile
export const handleUpdateProfile = async (
  prevPost: FormState,
  formData: FormData,
) => {
  const accessToken = await isAccessTokenExist();

  const name = formData.get("name");
  const phone = formData.get("phone");
  const profile_photo = formData.get("profile_photo");

  const payload = { name, phone, profile_photo };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
    method: "PATCH",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("profile", { expire: 0 });

    const resultData = await getNewAccessToken();

    const cookieStore = await cookies();
    if (resultData.success) {
      cookieStore.set("accessToken", resultData.data.accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });
    }

    return {
      success: true,
      message: "Profile updated successfully",
    };
  }

  return result;
};

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
  prevPost: FormState,
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
