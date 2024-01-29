import { Link, useLocation } from "@remix-run/react";
import { Laptop } from "lucide-react";
import { Button } from "./ui/Button";
import { Menu, MenuItem } from "./ui/Menu";
import { MenuTrigger } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { Theme, useTheme } from "~/utils/theme-provider";

export default function Header() {
  const [theme, setTheme] = useTheme();

  const links = [
    { href: "/blog", text: "Blog" },
    { href: "/projects", text: "Projects" },
    { href: "/about", text: "About me" },
    { href: "/contact", text: "Contact me" },
  ];

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <header className="abosolute left-0 top-0 mx-auto px-5 py-9 lg:px-36 lg:py-12 max-w- flex justify-between items-center w-screen overflow-x-hidden">
      <Link to={"/"} className="text-2xl font-bold">
        nahuel.luca()
      </Link>
      <nav className="hidden md:flex">
        <ul className="flex space-x-8 font-semibold text-xl">
          {links.map((link) => (
            <li className="relative group" key={`link-${link.text}`}>
              <Link
                to={link.href}
                className={twMerge(
                  "block pb-1",
                  link.href === `/${path}`
                    ? "text-blue-400"
                    : "hover:text-blue-400"
                )}
              >
                {link.text}
              </Link>
              <div
                className={twMerge(
                  link.href === `/${path}`
                    ? "w-full h-[1.5px] bg-blue-400"
                    : "absolute bottom-0 left-0 w-full h-[1.5px] bg-blue-400 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"
                )}
              ></div>
            </li>
          ))}
        </ul>
      </nav>
      <MenuTrigger>
        <Button className="px-2" variant="secondary">
          <Laptop className="w-5 h-5" />
        </Button>
        <Menu
          onAction={() => {
            setTheme((prevTheme) =>
              prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
            );
            if (theme === Theme.DARK) {
              document
                .querySelector("html")
                ?.style.setProperty("color-scheme", "light");
            } else {
              document
                .querySelector("html")
                ?.style.setProperty("color-scheme", "dark");
            }
          }}
          disabledKeys={theme === Theme.LIGHT ? ["light"] : ["dark"]}
          onClose={function Ya() {}}
          onScroll={function Ya() {}}
          onSelectionChange={function Ya() {}}
          placement="bottom right"
        >
          <MenuItem id="dark">Dark</MenuItem>
          <MenuItem id="light">Light</MenuItem>
        </Menu>
      </MenuTrigger>
    </header>
  );
}
