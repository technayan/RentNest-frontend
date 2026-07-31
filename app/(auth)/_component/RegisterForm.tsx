"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/authActions";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(32, "Name must be at most 32 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+8801|01)[3-9]\d{8}$/,
      "Please enter a valid Bangladeshi phone numer.",
    )
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password cannot exceed 100 characters."),
  role: z.enum(["TENANT", "LANDLORD"], {
    error: "Please select a role.",
  }),
  profile_photo: z
    .string()
    .trim()
    .url("Please enter a valid image URL.")
    .optional()
    .or(z.literal("")),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "TENANT",
      profile_photo: "",
    },
  });

  const [state, action, pending] = useActionState(registerAction, false);

  function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value ?? "");
    });

    startTransition(() => {
      action(formData);
    });
  }

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "User registered successfully.");
    }

    if (!state.success) {
      toast.error(state.message || "User registration failed!");
    }
  }, [state]);

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Register</CardTitle>
        <CardDescription>Provide your valid credentials.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="register-form-name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your name"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="register-form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your valid email"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-phone">Phone</FieldLabel>
                  <Input
                    {...field}
                    id="register-form-phone"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your valid phone no."
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-form-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password."
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-role">Role</FieldLabel>
                  <Select
                    defaultValue={"TENANT"}
                    required
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="register-form-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="TENANT">Tenant</SelectItem>
                        <SelectItem value="LANDLORD">Landlord</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="profile_photo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-profile-photo">
                    Profile Photo
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-form-profile-photo"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your profile photo link"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col mt-2">
        <Button
          type="submit"
          className={"px-5 py-5 w-full cursor-pointer"}
          form="register-form"
        >
          {pending ? "Submitting..." : "Submit"}
        </Button>
        <p className="mt-4">
          Already have an account?{" "}
          <Link href={"/login"} className="underline hover:text-primary">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
