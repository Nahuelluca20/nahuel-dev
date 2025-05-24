import { eq } from "drizzle-orm";
import { post } from "~/db/schemas/post";
import database from "~/db";

export async function getBlogPost(slug: string, dbEnv: D1Database) {
  const db = database(dbEnv);

  return await db
    .select({
      tags: post.tags,
      content: post.content,
      title: post.title,
    })
    .from(post)
    .where(eq(post.id, String(slug)))
    .all();
}
