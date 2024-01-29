import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

// import { MarkdownView } from "~/components/markdown";

export async function loader({ params }: LoaderFunctionArgs) {
  return params.slug;
}

export default function BlogId() {
  const content = useLoaderData<typeof loader>();

  return (
    <div className="">
      {/* <MarkdownView content={contentParser} /> */}
      <h1>{content || "dsaidas"}</h1>
    </div>
  );
}
