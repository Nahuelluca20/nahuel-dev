import { Link, useLocation } from "react-router";
import { Moon, Sun, Menu as MenuIcon, X } from "lucide-react";
import { Button } from "./ui/Button";
import { Menu, MenuItem } from "./ui/Menu";
import { MenuTrigger } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { Theme, useTheme } from "~/utils/theme-provider";

export default function Header({
  setOpenMenu,
  openMenu,
}: {
  setOpenMenu: (open: boolean) => void;
  openMenu: boolean;
}) {
  const [theme, setTheme] = useTheme();

  const links = [
    { href: "/blog", text: "Blog", blank: "" },
    { href: "/projects", text: "Projects", blank: "" },
    { href: "/about", text: "About me", blank: "" },
    { href: "/contact", text: "Contact me", blank: "" },
    {
      href: "https://notes-quartz-c54.pages.dev/",
      text: "Notes",
      blank: "blank",
    },
  ];

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <header>
      <div className="relative bg-white dark:bg-[#1F2028] z-50 overflow-hidden max-h-screen mx-auto px-5 py-9 xl:px-36 lg:py-12 flex justify-between items-center w-screen overflow-x-hidden">
        <Link to={"/"} className="text-2xl font-bold">
          nahuel.luca()
        </Link>
        <nav className="hidden md:flex">
          <ul className="flex space-x-8 font-semibold text-xl">
            {links.map((link) => (
              <li className="relative group" key={`link-${link.text}`}>
                <Link
                  to={link.href}
                  target={link.blank}
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
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 ">
          <Button
            aria-label="Open menu"
            className="px-2 md:hidden"
            variant="icon"
            onPress={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? (
              <X className="w-8 h-8" />
            ) : (
              <MenuIcon className="w-8 h-8" />
            )}
          </Button>

          <MenuTrigger>
            <Button aria-label="set theme" className="px-2" variant="secondary">
              {Theme.DARK === theme ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
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
        </div>
      </div>
      <nav
        className={twMerge(
          "absolute left-0 overflow-hidden z-10 h-screen w-full transition-transform duration-500 bg-white dark:bg-[#1F2028]",
          openMenu ? "translate-y-0 top-24" : "-translate-y-full top-0"
        )}
      >
        <ul className="mt-5">
          {links.map((link) => (
            <li
              className="px-5 relative group text-2xl font-bold border-t py-8"
              key={`link-${link.text}`}
            >
              <Link onClick={() => setOpenMenu(false)} to={link.href}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <hr className="h-1 border-t" />
      </nav>
    </header>
  );
}
