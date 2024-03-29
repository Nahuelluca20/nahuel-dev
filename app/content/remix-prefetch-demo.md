# Remix prefetch: Get data early and cache it with PrefetchPageLinks

This is a small guide to learn how to use `data prefetching` with remix and caching the data.

## What application will we build?

We will create a very very simple application using the Rick and Morty API to obtain the Morty character. And we will use Remix's `PrefetchPageLinks` compente to obtain the data before the user clicks we will do a `data prefetching`.

## Let's go

First of all, we will create our loader function that is responsible for requesting data from the API. We can do this function in the `resource.ts` file in the routes folder like this: `app/routes/resource.ts`

```javascript
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const fetchData = await fetch("https://rickandmortyapi.com/api/character/2");
  const response = await fetchData.json();
  const data = response;

  return json(data, {});
};
```

Then we will create our component that renders the da and our types.
`app/components/display-data.tsx`

```javascript
import type { Character } from "~/types/character";

export default function DisplayData({ data }: { data: Character }) {
  return (
    <div className="bg-zinc-700 text-white rounded-md">
      <img
        src={data.image}
        className="rounded-md"
        alt={data.name + " " + data.species}
        width={250}
        height={250}
      />
      <div className="font-semibold space-y-3 px-5 py-2 text-start">
        <p>Name: {data.name}</p>
        <p>Specie: {data.species}</p>
        <p>Status: {data.status}</p>
      </div>
    </div>
  );
}
```

and `app/types/character.ts`

```javascript
export type Character = {
  image: string,
  name: string,
  species: string,
  status: string,
};
```

Now in our `_index.tsx` file we will use `useFetcher()` to get the data and make the load resource.

```javascript
import { PrefetchPageLinks, useFetcher } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import type { loader as resourceLoader } from "./resource";
import DisplayData from "~/components/display-data";

export const meta: MetaFunction = () => {
  return [
    { title: "PrefetchPageLinks + Cache" },
    {
      name: "description",
      content:
        "Use PrefetchPageLinks and cache the data with Rick and Mory API",
    },
  ];
};

export default function Index() {
  let fetcher = useFetcher<typeof resourceLoader>();

  return (
    <main className="space-y-10 text-center">
      <PrefetchPageLinks page="/resource" />
      <button
        className="bg-blue-500 text-white text-xl font-semibold rounded-md py-2 px-4"
        type="button"
        onClick={() => fetcher.load("/resource")}
      >
        Get Morty data
      </button>
      {fetcher.data && <DisplayData data={fetcher.data} />}
    </main>
  );
}
```

This is what happens on our website now:

![Prefetch Before](/remix-prefetch/prefetch-before.jpeg)

But after 5 seconds (the time we had specified in the loader) it loads the resource that comes from the API.

![Prefetch Before](/remix-prefetch/prefetch-after.jpeg)

Now after 5 seconds if we click on the `Get Morty data` button we get the data instantly. Now we will reduce the time of our promise and `cache the data`.

We will add `headers = { "Cache-Control": "public, max-age=60" }` to our loader function:

```javascript
export const loader: LoaderFunction = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const fetchData = await fetch("https://rickandmortyapi.com/api/character/2");
  const response = await fetchData.json();
  const data = response;

  let headers = { "Cache-Control": "public, max-age=60" };
  return json(data, {
    headers,
  });
};
```

Cool! Now our data is cached for 60 seconds. If we click on the button again, we will see that the data is loaded instantly.

## The end

Thank you very much for reading this article! You can see the code [here](https://github.com/Nahuelluca20/remix-PrefetchPageLinks-demo) and the live demo [here](https://remix-prefetch-page-links-demo.vercel.app/)
