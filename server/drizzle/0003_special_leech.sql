CREATE TABLE IF NOT EXISTS "admin_auth" (
	"email" varchar(255) PRIMARY KEY NOT NULL,
	"otp" varchar(6),
	"otp_expires_at" timestamp,
	"failed_attempts" integer DEFAULT 0 NOT NULL,
	"locked_until" timestamp
);
