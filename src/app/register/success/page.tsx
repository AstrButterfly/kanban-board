import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account created · Kanban Board",
};

export default function RegisterSuccessPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Account created</h1>
      <p className="mb-8 mt-2 text-sm text-zinc-500">
        Your account is ready. Signing in will be added in the next step of this project.
      </p>
      <Link href="/" className="text-sm underline underline-offset-4">
        Back to home
      </Link>
    </main>
  );
}
