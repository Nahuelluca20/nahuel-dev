import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { useLoaderData, useNavigate } from "@remix-run/react";

import { MarkdownView } from "~/components/markdown";
import { markdownParser } from "~/utils/md.server";
import styles from "./prismjs.css";
import { ArrowLeft } from "lucide-react";
import { Env } from "~/types";
import { getBlogPost } from "./queries";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ params, context }: LoaderFunctionArgs) {
  const slug = params.slug;

  const env = context.env as Env;
  const result: { content: string | null }[] = await getBlogPost(
    env.BLOG_DB,
    String(slug)
  );
  const content =
    result[0].content && (await markdownParser(result[0].content));
  const headers = { "Cache-Control": "public, max-age=60" };
  return json(content, { headers });
}

export default function BlogId() {
  const content = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <div className="lg:min-w-[800px] mx-auto prose prose-sm sm:prose lg:prose-lg">
      <button
        className="flex mb-10 dark:text-white items-center font-bold gap-2 z-0 transition-transform transform hover:-translate-x-1 focus:outline-none"
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
