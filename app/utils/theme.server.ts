import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { Theme, isTheme } from "./theme-provider";

// export const loader = async ({ context }: LoaderFunctionArgs) => {
//   console.log(context.env.SESSION_SECRET);
// };

const sessionSecret = "dsaedasdsa";
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "my_remix_theme",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : null;
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session),
  };
}

export { getThemeSession };
