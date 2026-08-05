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
import Link from "next/link";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { loginAction } from "../_actions/authActions";

const formSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password cannot exceed 100 characters."),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [state, action, pending] = useActionState(loginAction, false);

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
      toast.success(state.message || "User logged in successfully.");
    }

    if (!state.success) {
      toast.error(state.message || "User login failed!");
    }
  }, [state]);

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Login</CardTitle>
        <CardDescription>Provide your valid credentials.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="login-form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your valid email"
                    autoComplete="on"
                    className="py-5"
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
                  <FieldLabel htmlFor="login-form-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-form-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password."
                    autoComplete="on"
                    className="py-5"
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
          form="login-form"
        >
          {pending ? "Logging in..." : "Login"}
        </Button>
        <p className="mt-4">
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="underline hover:text-primary">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
