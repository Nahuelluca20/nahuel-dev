import { Await, data, Link, useSearchParams } from "react-router";
import { getNotes, getTopics } from "./queries.server";
import database from "~/db";
import type { Route } from "../notes/+types/route";
import { Tab, TabList, Tabs } from "~/components/ui/Tabs";
import { Suspense } from "react";
import ListSkeleton from "~/components/list-skeleton";
import { Link as LinkUI } from "~/components/ui/Link";

export async function loader({ context, request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const topic = url.searchParams.get("topic");
  const db = database(context.cloudflare.env.BLOG_DB);
  const topics = await getTopics(db);

  const notes = await getNotes(db, topic || "");

  return data({ topics, topic, notes });
}

export const meta = ({ data }: Route.MetaArgs) => {
  return [
    { title: "Notes" },
    {
      name: "description",
      content: `${data?.topics.map((topic) => topic.title).join(", ")}`,
    },
  ];
};

export default function Notes({ loaderData }: Route.ComponentProps) {
  const { topics, notes } = loaderData;
  let [_, setSearchParams] = useSearchParams();

  return (
    <div className="lg:min-w-[800px] lg:max-w-[800px] mx-auto prose prose-md lg:prose-lg">
      <Tabs
        onSelectionChange={(key) => {
          setSearchParams({ topic: key.toString() });
        }}
      >
        <TabList>
          {topics.map((topic) => (
            <Tab key={topic.id} id={topic.id}>
              {topic.title}
            </Tab>
          ))}
        </TabList>
      </Tabs>
      <section className="grid gap-2 w-full max-w-[700px] mx-auto">
        <div className="grid ml-5 gap-2 mt-5">
          {
            <Suspense fallback={<ListSkeleton />}>
              <Await resolve={notes}>
                {(notes) => (
                  <ul className="list-disc space-y-2">
                    {notes?.map(
                      (note: { id: string | null; title: string | null }) => (
                        <li key={`post-${note.id}`}>
                          <LinkUI>
                            <Link
                              prefetch="intent"
                              className="dark:text-gray-200"
                              to={`/notes/${note.id}`}
                            >
                              {note.title}
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
    </div>
  );
}
