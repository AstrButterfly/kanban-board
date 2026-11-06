import type { Metadata } from "next";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Create account · Kanban Board",
};

export default function RegisterPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
      <p className="mb-8 mt-2 text-sm text-zinc-500">
        Start organizing your tasks on a Kanban board.
      </p>
      <RegisterForm />
    </main>
  );
}
