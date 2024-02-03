import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [
    { title: "Nahuel dev" },
    { name: "description", content: "Welcome web - Nahuel dev" },
  ];
};

export default function Index() {
  return (
    <section
      className="grid items-center justify-center pt-10 md:pt-20 pb-5"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    >
      <div className="space-y-2">
        <h1 className="text-5xl max-w-[800px]">
          Creating better web interfaces with excitement and enthusiasms
        </h1>
        <h2 className="text-xl text-[#535661] dark:text-[#a9adc1] font-medium">
          Nahuel Luca - FrontEnd Developer
        </h2>
      </div>
      <div className="grid max-w-[300px] md:max-w-full md:flex gap-5 mt-10 text-lg font-semibold">
        <Link
          className="hover:ring-4 border-2 text-white dark:text-black bg-black dark:bg-white rounded-full py-6 px-11 border-[#e6e9ee]"
          to="/blog"
        >
          Read the blog
        </Link>

        <Link
          className="hover:ring-4 border-2 rounded-full py-6 px-11 border-[#e6e9ee]"
          to="/projects"
        >
          See projects
        </Link>
      </div>
    </section>
  );
}
