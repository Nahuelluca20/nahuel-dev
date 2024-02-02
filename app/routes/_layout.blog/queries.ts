import { drizzle } from "drizzle-orm/d1";
import { post } from "~/db/schema";

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
    .all();
}
