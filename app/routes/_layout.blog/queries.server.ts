import { post } from "~/db/schemas/post";
import { sql } from "drizzle-orm";
import { env } from "cloudflare:workers";
import database from "~/db";

export async function getAllBlogs() {
  const db = database(env.BLOG_DB);
  return await db
    .select({
      date: post.date,
      id: post.id,
      title: post.title,
      tags: post.tags,
    })
    .from(post)
    .orderBy(
      sql`substr(${post.date}, 7, 2) || '-' || substr(${post.date}, 4, 2) || '-' || substr(${post.date}, 1, 2) DESC`
    )
    .all();
}
