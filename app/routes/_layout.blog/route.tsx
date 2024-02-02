import { LoaderFunction, json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { drizzle } from "drizzle-orm/d1";
import { post } from "~/db/schema";

interface Env {
  BLOG_DB: D1Database;
}

interface Post {
  id: number;
  date: string;
  title: string;
  content: string;
  tags: string;
}

export const loader: LoaderFunction = async ({ context }) => {
  const env = context.env as Env;
  const db = drizzle(env.BLOG_DB);
  const results = await db
    .select({
      date: post.date,
      id: post.id,
      title: post.title,
      tags: post.tags,
    })
    .from(post)
    .all();
  const headers = { "Cache-Control": "some cache" };
  return json(results, { headers });
};

export default function Blog() {
  const data: Post[] = useLoaderData();

  return (
    <div>
      {data && (
        <ul>
          {data.map((post: Post) => (
            <li key={`post-${post.id}`}>
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
