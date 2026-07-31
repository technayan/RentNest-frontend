"use server";

import { ILoginResponse, IRegisterResponse } from "@/lib/types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
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

export const loginAction = async (
  prevState: null | ILoginResponse,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    if (decodedToken.role === "ADMIN") {
      redirect("/dashboard/admin", RedirectType.replace);
    } else if (decodedToken.role === "LANDLORD") {
      redirect("/dashboard/landlord", RedirectType.replace);
    } else {
      redirect("/dashboard/tenant", RedirectType.replace);
    }
  }

  return result;
};
