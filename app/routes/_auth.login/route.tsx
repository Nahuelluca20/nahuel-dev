import { Auth } from "~/lib/auth/auth.server";
import type { Route } from "../_auth.login/+types/route";
import { Form, redirect } from "react-router";
import { signIn } from "~/lib/auth/auth-client";

export async function loader({ request, context }: Route.LoaderArgs) {
  const session = await Auth.getSession(
    request,
    context.cloudflare.env.BLOG_DB
  );

  if (session) {
    throw redirect("/");
  }

  return null;
}

export default function Login() {
  async function handleSubmit(formData: FormData) {
    const { error } = await signIn.email(
      {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
      {
        onSuccess: () => {
          throw redirect("/");
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
    if (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex mx-auto max-w-[300px]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <Form
          method="post"
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
        >
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Login</button>
        </Form>
      </div>
    </div>
  );
}
