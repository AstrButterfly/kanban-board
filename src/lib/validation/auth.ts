import { z } from "zod";

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 50;
export const PASSWORD_MIN_LENGTH = 8;
// bcrypt silently ignores everything after the first 72 bytes of a password,
// so we reject longer passwords instead of pretending they are fully used.
export const PASSWORD_MAX_BYTES = 72;

const utf8ByteLength = (value: string) => new TextEncoder().encode(value).length;

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(NAME_MIN_LENGTH, `Name must be at least ${NAME_MIN_LENGTH} characters`)
      .max(NAME_MAX_LENGTH, `Name must be at most ${NAME_MAX_LENGTH} characters`),
    // trim + lower case first, then check the format. We store emails in lower case,
    // so "Anna@Example.com" and "anna@example.com" are the same account.
    email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address")),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
      .refine((value) => utf8ByteLength(value) <= PASSWORD_MAX_BYTES, {
        message: `Password is too long (max ${PASSWORD_MAX_BYTES} bytes)`,
      })
      .regex(/\p{L}/u, "Password must contain at least one letter")
      .regex(/\d/, "Password must contain at least one digit"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterInput = z.input<typeof registerSchema>;
export type RegisterData = z.output<typeof registerSchema>;
export type RegisterField = keyof RegisterInput;
export type RegisterFieldErrors = Partial<Record<RegisterField, string[]>>;
