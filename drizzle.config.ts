import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Config for the drizzle-kit CLI (generate / migrate / studio).
// The running Next.js app does NOT use this file; it connects via src/db/index.ts.
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
