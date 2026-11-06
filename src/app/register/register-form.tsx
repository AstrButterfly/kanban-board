"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction, type RegisterFormState } from "./actions";

const initialState: RegisterFormState = {};

type FieldProps = {
  label: string;
  name: string;
  type: "text" | "email" | "password";
  autoComplete: string;
  defaultValue?: string;
  errors?: string[];
  hint?: string;
};

function Field({ label, name, type, autoComplete, defaultValue, errors, hint }: FieldProps) {
  const errorId = `${name}-error`;
  const hasError = Boolean(errors?.length);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        className="rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-900 aria-invalid:border-red-500 dark:border-zinc-700 dark:focus:border-zinc-300"
      />
      {hint && !hasError && <p className="text-xs text-zinc-500">{hint}</p>}
      {hasError && (
        <p id={errorId} className="text-xs text-red-600 dark:text-red-400">
          {errors![0]}
        </p>
      )}
    </div>
  );
}

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    // noValidate: we show our own messages from the server (single source of truth)
    // instead of the browser's built-in validation bubbles.
    <form action={formAction} noValidate className="flex flex-col gap-4">
      {state.formError && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {state.formError}
        </p>
      )}

      <Field
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        defaultValue={state.values?.name}
        errors={errors.name}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        defaultValue={state.values?.email}
        errors={errors.email}
      />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        errors={errors.password}
        hint="At least 8 characters, with a letter and a digit."
      />
      <Field
        label="Confirm password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        errors={errors.confirmPassword}
      />

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isPending ? "Creating account…" : "Create account"}
      </button>

      <p className="text-center text-sm text-zinc-500">
        <Link href="/" className="underline underline-offset-4">
          Back to home
        </Link>
      </p>
    </form>
  );
}
