import { eq } from "drizzle-orm";
import { post } from "~/db/schemas/post";
import type { Database } from "~/db";

export async function getBlogPost(slug: string, db: Database) {
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
