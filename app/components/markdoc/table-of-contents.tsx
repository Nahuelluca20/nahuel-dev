import { Link } from "@remix-run/react";

export default function TableOfContents({ tableOfContents }: any) {
  const items: any[] = tableOfContents.filter(
    (item: any) => item.level === 1 || item.level === 2 || item.level === 3
  );

  return (
    <div className="fixed hidden lg:block py-8  px-2  mx-2">
      <div className="text-2xl font-semibold dark:text-white">
        Table of content
      </div>
      <ul className="pl-2 mt-4 list-disc list-inside text-blue-500">
        {items.map((item) => {
          const href = `#${item.title}`;
          const active =
            typeof window !== "undefined" && window.location.hash === href;

          return (
            <Link
              key={item.title}
              className={[
                active ? "text-red-500" : undefined,
                item.level === 2
                  ? "pl-4"
                  : item.level === 3
                  ? "pl-10"
                  : undefined,
              ].join("")}
              to={href}
            >
              <li>{item.title}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
