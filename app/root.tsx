import type { LinksFunction, LoaderFunction } from "@remix-run/cloudflare";
import {
  ClientLoaderFunctionArgs,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { twMerge } from "tailwind-merge";

import styles from "./tailwind.css";
import Header from "./components/header";
import { Theme, ThemeProvider, useTheme } from "./utils/theme-provider";
import { getThemeSession } from "./utils/theme.server";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export type LoaderData = {
  theme: Theme | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  const data: LoaderData = {
    theme: themeSession.getTheme(),
  };

  return data;
};

export const clientLoader = async ({
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  // call the server loader
  const serverData: { theme: string } = await serverLoader();
  if (serverData.theme === Theme.LIGHT) {
    document.querySelector("html")?.style.setProperty("color-scheme", "light");
  } else {
    document.querySelector("html")?.style.setProperty("color-scheme", "dark");
  }

  return serverData;
};

function App() {
  const [theme] = useTheme();
  return (
    <html lang="en" className={twMerge(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="overflow-x-hidden dark:bg-[#1F2028]">
        <Header />
        <div className="max-w-[1280px] mx-auto mt-10 px-5 xl:px-0">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
