import { Auth } from "~/lib/auth/auth.server";
import type { Route } from "./+types/route";
import { Outlet, redirect } from "react-router";

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const session = await Auth.getSession(
    request,
    context.cloudflare.env.BLOG_DB
  );

  if (!session?.user) {
    throw redirect("/");
  }
};

export default function CMS() {
  return (
    <div>
      <h1>CMS</h1>
      <Outlet />
    </div>
  );
}
