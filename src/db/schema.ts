import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  // Always stored in lower case, see normalizeEmail() in src/lib/validation/auth.ts.
  // The UNIQUE constraint is what really guarantees there are no duplicate accounts.
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  // bcrypt hash. The plain password is never stored.
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
