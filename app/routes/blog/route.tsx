// import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { MarkdownView } from "~/components/markdown";
import { markdownParser } from "~/utils/md.server";
import styles from "./prismjs.css";
import type { LinksFunction } from "@remix-run/cloudflare";
import { post } from "~/blogposts/prefetchlnks";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader() {
  const content = await markdownParser(post);
  return { content };
}

export default function Blog() {
  const { content } = useLoaderData<typeof loader>();

  return (
    <div className="min-w-[900px] mx-auto prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      <MarkdownView content={content} />
    </div>
  );
}
