"use server";

import { IRegisterResponse } from "@/lib/types";
import { redirect, RedirectType } from "next/navigation";

export const registerAction = async (
  prevState: null | IRegisterResponse,
  formData: FormData,
) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");
  const role = formData.get("role");
  const profile_photo = formData.get("profile_photo");

  const payload = {
    name,
    email,
    phone,
    password,
    role,
    profile_photo,
  };
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    redirect("/login", RedirectType.replace);
  }

  return result;
};
