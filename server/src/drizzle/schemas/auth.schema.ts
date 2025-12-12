import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const adminAuth = pgTable('admin_auth', {

  email: varchar('email', { length: 255 }).primaryKey(),
  otp: varchar('otp', { length: 6 }),
  otpExpiresAt: timestamp('otp_expires_at'),
  failedAttempts: integer('failed_attempts').default(0).notNull(),
  lockedUntil: timestamp('locked_until'),
});


