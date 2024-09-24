import { drizzle } from "drizzle-orm/d1";
import { post } from "~/db/schema";
import { sql } from "drizzle-orm";

export async function getAllBlogs(env: D1Database) {
  const db = drizzle(env);

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
