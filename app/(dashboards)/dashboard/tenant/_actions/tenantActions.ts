"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

//* Get My Requests
export const getMyRequests = async () => {
  const accessToken = await isAccessTokenExist();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "content-type": "application/json",
    },
  });

  const result = await res.json();

  return result.data;
};
