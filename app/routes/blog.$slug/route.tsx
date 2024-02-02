import { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, useNavigate } from "@remix-run/react";

import { MarkdownView } from "~/components/markdown";
import { markdownParser } from "~/utils/md.server";
import styles from "./prismjs.css";
import { ArrowLeft } from "lucide-react";
import { drizzle } from "drizzle-orm/d1";
import { Env } from "~/types";
import { post } from "~/db/schema";
import { eq } from "drizzle-orm";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ params, context }: LoaderFunctionArgs) {
  const slug = params.slug;

  const env = context.env as Env;
  const db = drizzle(env.BLOG_DB);
  const result: { content: string | null }[] = await db
    .select({
      content: post.content,
    })
    .from(post)
    .where(eq(post.id, String(slug)))
    .all();
  console.log(result[0].content);
  const content =
    result[0].content && (await markdownParser(result[0].content));
  return { content };
}

export default function BlogId() {
  const { content } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <div className="lg:min-w-[900px] mx-auto prose prose-sm sm:prose lg:prose-lg">
      <button
        className="flex mb-10 dark:text-white items-center font-bold gap-2 transition-transform transform hover:-translate-x-1 focus:outline-none"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowLeft />
        <span className="mb-[1px]">Back to posts</span>
      </button>
      <MarkdownView content={content} />
    </div>
  );
}
