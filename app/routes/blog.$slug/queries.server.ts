import { eq } from "drizzle-orm";
import { post } from "~/db/schema";
import type { Database } from "~/db";
import { env } from "cloudflare:workers";
import database from "~/db";

export async function getBlogPost(slug: string) {
  const db = database(env.BLOG_DB);

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
