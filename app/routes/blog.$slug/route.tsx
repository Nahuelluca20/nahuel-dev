import {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/cloudflare";
import { useLoaderData, useNavigate } from "@remix-run/react";

import { MarkdownView } from "~/components/markdown";
import { markdownParser } from "~/utils/md.server";
import styles from "./prismjs.css?url";
import { ArrowLeft } from "lucide-react";
import { getBlogPost } from "./queries.server";

interface IBlog {
  content: string | null;
  tags: string | null;
  title: string | null;
}

export const links: LinksFunction = () => [
  { rel: "preload", as: "style", href: styles },
  { rel: "stylesheet", href: styles },
];

export async function loader({ params, context }: LoaderFunctionArgs) {
  const slug = params.slug;

  const { BLOG_DB } = context.cloudflare.env;
  const result: IBlog[] = await getBlogPost(BLOG_DB, String(slug));
  const content = result[0]?.content && markdownParser(result[0].content);
  const tags = result[0]?.tags;
  const title = result[0]?.title;
  const headers = { "Cache-Control": "private, max-age=3600" };
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
  const navigate = useNavigate();

  return (
    <div className="lg:min-w-[800px] lg:max-w-[800px] mx-auto prose prose-md lg:prose-lg">
      <button
        className="flex mb-10 dark:text-white items-center font-bold gap-2 z-0 transition-transform transform hover:-translate-x-1 focus:outline-none"
        onClick={() => {
          navigate("/blog");
        }}
      >
        <ArrowLeft />
        <span className="mb-[1px]">Back to posts</span>
      </button>
      {content && <MarkdownView content={content} />}
    </div>
  );
}
