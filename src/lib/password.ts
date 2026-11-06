import bcrypt from "bcryptjs";

// Cost factor (2^12 rounds). Higher is slower for attackers and for us:
// 12 is a common balance for web apps today. Increase it as hardware gets faster.
const BCRYPT_COST = 12;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_COST);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
