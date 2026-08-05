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
