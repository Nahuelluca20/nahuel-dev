import type { LinksFunction, LoaderFunction } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { twMerge } from "tailwind-merge";

import stylesheet from "./tailwind.css?url";
import Header from "./components/header";
import { Theme, ThemeProvider, useTheme } from "./utils/theme-provider";
import { getThemeSession } from "./utils/theme.server";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css?url";

NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  easing: "ease",
  speed: 500,
});

export const links: LinksFunction = () => [
  { rel: "preload", as: "style", href: stylesheet },
  { rel: "preload", as: "style", href: nProgressStyles },
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: nProgressStyles },
];

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

function App() {
  const [theme] = useTheme();
  const [openMenu, setOpenMenu] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [navigation.state]);

  return (
    <html lang="en" className={twMerge(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className={twMerge(
          "overflow-x-hidden dark:bg-[#1F2028]  ",
          openMenu ? "overflow-hidden max-h-screen" : "overflow-x-hidden"
        )}
      >
        <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <div className="max-w-[1280px] mx-auto mt-10 px-5 lg:px-[100px]">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
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
