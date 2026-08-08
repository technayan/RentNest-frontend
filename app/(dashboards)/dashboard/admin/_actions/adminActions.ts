"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

//* Get Pending Requests
export const getPendingRequestsForAdmin = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/pending-requests`,
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
