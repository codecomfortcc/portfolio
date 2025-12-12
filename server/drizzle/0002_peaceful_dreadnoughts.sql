CREATE TYPE "public"."current_status" AS ENUM('development', 'completed', 'planning', 'paused', 'deprecated');--> statement-breakpoint
CREATE TYPE "public"."future_status" AS ENUM('maintained', 'unmaintained', 'community', 'archived', 'none');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"logo" text,
	"current_status" "current_status" DEFAULT 'planning' NOT NULL,
	"future_status" "future_status" DEFAULT 'none' NOT NULL,
	"image_src" text NOT NULL,
	"alt" varchar(255),
	"repo" text NOT NULL,
	"demo" text,
	"technologies" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
