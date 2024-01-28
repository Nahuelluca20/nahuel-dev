import type { MetaFunction } from "@remix-run/cloudflare";
import { Button } from "~/components/ui/Button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div
      data-mode="dark"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    >
      <h1>Welcome to Remixd dasds</h1>
      <Button>CLICK ME</Button>
    </div>
  );
}
