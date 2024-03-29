import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { post } from "~/db/schema";

export async function getBlogPost(env: D1Database, slug: string) {
  const db = drizzle(env);
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
