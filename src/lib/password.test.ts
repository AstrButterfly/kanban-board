import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("password hashing", () => {
  it("does not store the password in plain text", async () => {
    const hash = await hashPassword("secret123");
    expect(hash).not.toContain("secret123");
    expect(hash.startsWith("$2")).toBe(true); // bcrypt prefix
  });

  it("uses a random salt, so the same password gives different hashes", async () => {
    const [a, b] = await Promise.all([hashPassword("secret123"), hashPassword("secret123")]);
    expect(a).not.toBe(b);
  });

  it("verifies the right password and rejects the wrong one", async () => {
    const hash = await hashPassword("secret123");
    expect(await verifyPassword("secret123", hash)).toBe(true);
    expect(await verifyPassword("wrong-password1", hash)).toBe(false);
  });
});
