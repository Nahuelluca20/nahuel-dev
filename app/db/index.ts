import { drizzle } from "drizzle-orm/d1";
import { post } from "./schemas/post";
import { user, session, account, verification } from "./schemas/auth-schema";
import { notes } from "./schemas/notes";
import { topics } from "./schemas/topics";
import { noteRelations } from "./schemas/note-relations";

export type Database = ReturnType<typeof database>;

export default function database(d1: D1Database) {
  return drizzle(d1, {
    schema: {
      post,
      user,
      session,
      account,
      verification,
      notes,
      topics,
      noteRelations,
    },
  });
}
