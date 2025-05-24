import { Link, Await, data } from "react-router";
import { Link as LinkUI } from "~/components/ui/Link";
import { Suspense } from "react";

import { getAllBlogs } from "./queries.server";
import ListSkeleton from "~/components/list-skeleton";
import type { Route } from "../_layout.blog/+types/route";
import { Auth } from "~/lib/auth/auth.server";

export const meta = () => {
  return [
    { title: "Blog" },
    { name: "description", content: "Blogs - Loadertsx" },
  ];
};

export function headers(_: Route.HeadersArgs) {
  return {
    "Cache-Control": "private, max-age=3600",
  };
}

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const authManager = await Auth.authManager(context.cloudflare.env.BLOG_DB);
  const session = await authManager.api.getSession({
    headers: request.headers,
  });

  console.log(session);
  console.log(session?.user);

  const results = getAllBlogs(context.cloudflare.env.BLOG_DB);

  return data({ results });
};
export const handle = {
  its: "all yours",
};

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { results } = loaderData;

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
                <ul className="list-disc space-y-2">
                  {results?.map(
                    (post: {
                      id: string | null;
                      title: string | null;
                      date: string | null;
                      tags: string | null;
                    }) => (
                      <li key={`post-${post.id}`}>
                        <LinkUI>
                          <Link prefetch="intent" to={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </LinkUI>
                      </li>
                    )
                  )}
                </ul>
              )}
            </Await>
          </Suspense>
        }
      </div>
    </section>
  );
}
