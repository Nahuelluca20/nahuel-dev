import {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/cloudflare";
import { useLoaderData, useNavigate } from "@remix-run/react";

import { MarkdownView } from "~/components/markdown";
import { markdownParser } from "~/utils/md.server";
import styles from "./prismjs.css";
import { ArrowLeft } from "lucide-react";
import { Env } from "~/types";
import { getBlogPost } from "./queries";
import TableOfContents from "~/components/markdoc/table-of-contents";
import { extractHeadings } from "~/utils/extract-headings";

interface IBlog {
  content: string | null;
  tags: string | null;
  title: string | null;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ params, context }: LoaderFunctionArgs) {
  const slug = params.slug;

  const env = context.env as Env;
  const result: IBlog[] = await getBlogPost(env.BLOG_DB, String(slug));
  const content =
    result[0].content && (await markdownParser(result[0].content));
  console.log(content);
  const tags = result[0]?.tags;
  const title = result[0]?.title;
  const headers = { "Cache-Control": "public, max-age=60" };
  return json({ content, tags, title }, { headers });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title || "Nahuel dev" },
    { name: "description", content: `${data?.tags}` },
  ];
};

export default function BlogId() {
  const { content } = useLoaderData<typeof loader>();
  const tableOfContents = extractHeadings(content);
  const navigate = useNavigate();

  return (
    <div className="lg:min-w-[700px] lg:max-w-[700px] mx-auto prose prose-md">
      <button
        className="flex mb-10 dark:text-white items-center font-bold gap-2 z-0 transition-transform transform hover:-translate-x-1 focus:outline-none"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowLeft />
        <span className="mb-[1px]">Back to posts</span>
      </button>
      <div className="flex gap-0">
        <MarkdownView content={content} />

        <div className="relative -mt-20 max-h-[300px] overscroll-contain">
          <TableOfContents tableOfContents={tableOfContents} />
        </div>
      </div>
    </div>
  );
}
