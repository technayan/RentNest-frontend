/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";

// Get Property Details By Id
export const getPropertyDetails = async (id: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
  );

  const result = await res.json();

  return result.data;
};

// Get Categories
export const getCategories = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`);

  const result = await res.json();

  return result.data;
};

type FormState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Record<string, any>;
};

// Rental Request
export const sendRentalRequest = async (
  id: string,
  prevPost: FormState,
  formData: FormData,
) => {
  const accessToken = await isAccessTokenExist();

  const message = formData.get("message");

  const payload = { message };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${id}`, {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = res.json();

  return result;
};
