import { LoaderFunction, defer } from "@remix-run/cloudflare";
import { Link, useLoaderData, Await } from "@remix-run/react";
import { Link as LinkUI } from "~/components/ui/Link";
import { Env, Post } from "~/types";

import { Suspense } from "react";

import { getAllBlogs } from "./queries";
import ListSkeleton from "~/components/list-skeleton";

export const loader: LoaderFunction = async ({ context }) => {
  const env = context.env as Env;
  const results = await getAllBlogs(env.BLOG_DB);
  const headers = { "Cache-Control": "public, max-age=60" };
  return defer({ results }, { headers });
};

export default function Blog() {
  const { results }: { results: Post[] } = useLoaderData();

  return (
    <section className="grid gap-2 w-full max-w-[700px] mx-auto">
      <h1 className="text-3xl font-semibold">Blog, tutorials and more...</h1>
      <h3 className="text-xl text-[#535661] dark:text-[#a9adc1] font-medium">
        Here I talk about Remix, NextJS, React and other things related to the
        front
      </h3>
      <div className="grid ml-5 gap-2 mt-5">
        {
          <Suspense fallback={<ListSkeleton />}>
            <Await resolve={results}>
              {(results) => (
                <ul className="list-disc">
                  {results?.map((post: Post) => (
                    <li key={`post-${post.id}`}>
                      <LinkUI>
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </LinkUI>
                    </li>
                  ))}
                </ul>
              )}
            </Await>
          </Suspense>
        }
      </div>
    </section>
  );
}
