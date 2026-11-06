import { eq } from "drizzle-orm";
import { afterAll, describe, expect, it } from "vitest";

// These tests talk to a real PostgreSQL database (see docker-compose.yml and .env).
// They are skipped automatically when DATABASE_URL is not set.
const hasDatabase = Boolean(process.env.DATABASE_URL);

const email = `test-${crypto.randomUUID()}@example.com`;
const input = {
  name: "Test User",
  email,
  password: "secret123",
  confirmPassword: "secret123",
};

describe.skipIf(!hasDatabase)("registerUser (PostgreSQL)", () => {
  afterAll(async () => {
    const { db } = await import("@/db");
    const { users } = await import("@/db/schema");
    await db.delete(users).where(eq(users.email, email));
  });

  it("creates a user and stores only a password hash", async () => {
    const { registerUser } = await import("./register");
    const { db } = await import("@/db");
    const { users } = await import("@/db/schema");

    const result = await registerUser(input);
    expect(result).toEqual({ ok: true });

    const [row] = await db.select().from(users).where(eq(users.email, email));
    expect(row.name).toBe("Test User");
    expect(row.passwordHash).not.toContain("secret123");
    expect(row.passwordHash.startsWith("$2")).toBe(true);
  });

  it("rejects a duplicate email, ignoring letter case", async () => {
    const { registerUser } = await import("./register");

    const result = await registerUser({ ...input, email: email.toUpperCase() });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.email).toBeDefined();
    }
  });

  it("returns field errors for invalid input without touching the database", async () => {
    const { registerUser } = await import("./register");

    const result = await registerUser({ ...input, name: "", password: "x", confirmPassword: "y" });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.fieldErrors).length).toBeGreaterThan(0);
    }
  });
});
