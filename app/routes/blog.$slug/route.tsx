import { LinksFunction } from "@remix-run/cloudflare";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { post } from "~/blogposts/prefetchlnks";

import { MarkdownView } from "~/components/markdown";
import { markdownParser } from "~/utils/md.server";
import styles from "./prismjs.css";
import { ArrowLeft } from "lucide-react";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader() {
  const content = await markdownParser(post);
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
