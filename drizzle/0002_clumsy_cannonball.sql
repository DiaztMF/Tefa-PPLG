CREATE TABLE "rateLimit" (
	"key" text PRIMARY KEY NOT NULL,
	"count" integer NOT NULL,
	"lastRequest" bigint NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'siswa';--> statement-breakpoint
ALTER TABLE "briefs" ADD COLUMN "tracking_token" text DEFAULT '' NOT NULL;--> statement-breakpoint
UPDATE "briefs" SET "tracking_token" = md5("id" || random()::text) WHERE "tracking_token" = '';--> statement-breakpoint
ALTER TABLE "briefs" ALTER COLUMN "tracking_token" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "briefs" ADD CONSTRAINT "briefs_tracking_token_unique" UNIQUE("tracking_token");--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_unique" UNIQUE("user_id");