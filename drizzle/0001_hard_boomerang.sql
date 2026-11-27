CREATE TABLE "audit_logs" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"user_id" text,
	"action" text NOT NULL,
	"table_name" text NOT NULL,
	"target_id" text,
	"old_values" text,
	"new_values" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "status" text DEFAULT 'pending' NOT NULL;--> statement-breakpoint
UPDATE "projects" SET "status" = 'approved';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "submitted_by" text;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "email" text DEFAULT '' NOT NULL;--> statement-breakpoint
UPDATE "students" SET "email" = 'student-' || "id" || '@example.invalid' WHERE "email" = '';--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "email" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_submitted_by_students_id_fk" FOREIGN KEY ("submitted_by") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;