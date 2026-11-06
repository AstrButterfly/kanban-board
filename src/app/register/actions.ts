"use server";

import { redirect } from "next/navigation";
import { registerUser } from "@/lib/auth/register";
import type { RegisterFieldErrors } from "@/lib/validation/auth";

// What the form needs to re-render after a submit: errors per field, an overall error,
// and the values to put back into the inputs (passwords are intentionally never returned).
export type RegisterFormState = {
  fieldErrors?: RegisterFieldErrors;
  formError?: string;
  values?: { name: string; email: string };
};

const text = (value: FormDataEntryValue | null) => (typeof value === "string" ? value : "");

export async function registerAction(
  _previousState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const input = {
    name: text(formData.get("name")),
    email: text(formData.get("email")),
    password: text(formData.get("password")),
    confirmPassword: text(formData.get("confirmPassword")),
  };
  const values = { name: input.name, email: input.email };

  let result;
  try {
    result = await registerUser(input);
  } catch (error) {
    console.error("Registration failed", error);
    return { formError: "Something went wrong. Please try again.", values };
  }

  if (!result.ok) {
    return { fieldErrors: result.fieldErrors, values };
  }

  // redirect() works by throwing a special error, so it must stay outside of try/catch.
  redirect("/register/success");
}
