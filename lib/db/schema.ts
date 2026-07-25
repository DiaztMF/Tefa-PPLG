import { pgTable, text, varchar, integer, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  entryYear: integer("entry_year").notNull(),
  github: text("github"),
  linkedin: text("linkedin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  category: text("category").notNull(), // Web App, Mobile App, UI/UX, etc.
  coverImage: text("cover_image"),
  liveUrl: text("live_url"),
  repoUrl: text("repo_url"),
  techStack: text("tech_stack").notNull(), // Comma-separated or JSON string
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectStudents = pgTable(
  "project_students",
  {
    projectId: varchar("project_id", { length: 64 })
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    studentId: varchar("student_id", { length: 64 })
      .notNull()
      .references(() => students.id, { onDelete: "cascade" }),
    role: text("role").notNull(), // e.g., "Frontend Developer", "UI Designer"
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.studentId] }),
  ]
);

export const briefs = pgTable("briefs", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name").notNull(),
  org: text("org"),
  whatsapp: text("whatsapp").notNull(),
  service: text("service").notNull(),
  budget: text("budget").notNull(),
  briefText: text("brief_text").notNull(),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const news = pgTable("news", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
