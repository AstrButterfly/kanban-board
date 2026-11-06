// PostgreSQL error code for "unique_violation".
const UNIQUE_VIOLATION = "23505";

/**
 * True if the error (or the error it wraps) is a PostgreSQL unique constraint violation.
 * Drizzle wraps driver errors, and the original `pg` error is available as `cause`,
 * so we walk down the cause chain.
 */
export function isUniqueViolation(error: unknown): boolean {
  let current: unknown = error;

  for (let depth = 0; depth < 4 && typeof current === "object" && current !== null; depth++) {
    if ((current as { code?: unknown }).code === UNIQUE_VIOLATION) {
      return true;
    }
    current = (current as { cause?: unknown }).cause;
  }

  return false;
}
