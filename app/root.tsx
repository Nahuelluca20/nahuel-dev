import { twMerge } from "tailwind-merge";

import Header from "./components/header";
import { useState } from "react";
import "./app.css";
import type { Route } from "./+types/root";
import {
  Meta,
  Links,
  ScrollRestoration,
  Scripts,
  Outlet,
  isRouteErrorResponse,
} from "react-router";
import { ThemeProvider } from "./utils/theme-provider";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className={twMerge(
          "overflow-x-hidden",
          openMenu ? "overflow-hidden max-h-screen" : "overflow-x-hidden"
        )}
      >
        <ThemeProvider>
          <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <div className="max-w-[1280px] mx-auto mt-10 px-5 lg:px-[100px]">
            {children}
          </div>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
