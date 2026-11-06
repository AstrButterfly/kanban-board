import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Kanban Board</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        A small task tracker built with Next.js, TypeScript and PostgreSQL. Organize work in columns
        and move tasks from “To do” to “Done”.
      </p>
      <div>
        <Link
          href="/register"
          className="inline-block rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Create account
        </Link>
      </div>
    </main>
  );
}
