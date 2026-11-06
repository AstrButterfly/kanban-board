import { z } from "zod";
import { db } from "@/db";
import { isUniqueViolation } from "@/db/errors";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/password";
import { registerSchema, type RegisterFieldErrors } from "@/lib/validation/auth";

export type RegisterResult = { ok: true } | { ok: false; fieldErrors: RegisterFieldErrors };

/**
 * Creates a user account. This is plain business logic with no knowledge of forms or
 * HTTP, so it can be tested directly and reused (for example by a future API route).
 *
 * Expected problems (invalid input, e-mail already taken) are returned as a result.
 * Unexpected ones (database down) are thrown and handled by the caller.
 */
export async function registerUser(input: unknown): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const { name, email, password } = parsed.data;
  const passwordHash = await hashPassword(password);

  try {
    await db.insert(users).values({ name, email, passwordHash });
  } catch (error) {
    // We rely on the UNIQUE constraint instead of "SELECT, then INSERT". Two requests
    // arriving at the same moment could both pass a SELECT check; the database cannot
    // be fooled that way.
    if (isUniqueViolation(error)) {
      return { ok: false, fieldErrors: { email: ["An account with this email already exists"] } };
    }
    throw error;
  }

  return { ok: true };
}
