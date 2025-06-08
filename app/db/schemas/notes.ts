import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { topics } from "./topics";

export const notes = sqliteTable("notes", {
  id: text("id").primaryKey(),
  topicId: text("topic_id")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});
