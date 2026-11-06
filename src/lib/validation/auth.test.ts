import { describe, expect, it } from "vitest";
import { registerSchema } from "./auth";

const valid = {
  name: "Anna",
  email: "anna@example.com",
  password: "secret123",
  confirmPassword: "secret123",
};

function errorsFor(input: Record<string, string>) {
  const result = registerSchema.safeParse(input);
  if (result.success) return {};
  const errors: Record<string, string[]> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0]);
    (errors[key] ??= []).push(issue.message);
  }
  return errors;
}

describe("registerSchema", () => {
  it("accepts valid input", () => {
    expect(registerSchema.safeParse(valid).success).toBe(true);
  });

  it("trims the name and lower-cases the email", () => {
    const result = registerSchema.parse({
      ...valid,
      name: "  Anna  ",
      email: "  Anna@Example.COM ",
    });
    expect(result.name).toBe("Anna");
    expect(result.email).toBe("anna@example.com");
  });

  it("rejects a too short name", () => {
    expect(errorsFor({ ...valid, name: "A" }).name).toBeDefined();
  });

  it("rejects an invalid email", () => {
    expect(errorsFor({ ...valid, email: "not-an-email" }).email).toBeDefined();
  });

  it("rejects a short password", () => {
    const input = { ...valid, password: "a1", confirmPassword: "a1" };
    expect(errorsFor(input).password).toBeDefined();
  });

  it("requires a letter and a digit in the password", () => {
    const noDigit = { ...valid, password: "onlyletters", confirmPassword: "onlyletters" };
    const noLetter = { ...valid, password: "12345678", confirmPassword: "12345678" };
    expect(errorsFor(noDigit).password).toBeDefined();
    expect(errorsFor(noLetter).password).toBeDefined();
  });

  it("accepts non-latin letters in the password", () => {
    const input = { ...valid, password: "пароль123", confirmPassword: "пароль123" };
    expect(registerSchema.safeParse(input).success).toBe(true);
  });

  it("rejects passwords longer than 72 bytes", () => {
    const long = "a1".repeat(37); // 74 bytes
    expect(errorsFor({ ...valid, password: long, confirmPassword: long }).password).toBeDefined();
  });

  it("rejects mismatching password confirmation", () => {
    expect(errorsFor({ ...valid, confirmPassword: "different1" }).confirmPassword).toEqual([
      "Passwords do not match",
    ]);
  });
});
