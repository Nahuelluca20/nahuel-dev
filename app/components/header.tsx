import { Link } from "@remix-run/react";
import { Laptop } from "lucide-react";
import { Button } from "./ui/Button";
import { Menu, MenuItem, MenuSeparator } from "./ui/Menu";
import { MenuTrigger } from "react-aria-components";

export default function Header() {
  return (
    <header className="mx-auto px-5 py-9 lg:py-12 max-w-[1535px] flex justify-between items-center w-full">
      <h2 className="text-2xl font-bold">nahuel.luca()</h2>
      <nav>
        <ul className="flex space-x-8 font-semibold">
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="#">Projects</Link>
          </li>
          <li>
            <Link to="#">About me</Link>
          </li>
        </ul>
      </nav>
      <MenuTrigger>
        <Button className="px-2" variant="secondary">
          <Laptop className="w-5 h-5" />
        </Button>
        <Menu
          onAction={function Ya() {}}
          onClose={function Ya() {}}
          onScroll={function Ya() {}}
          onSelectionChange={function Ya() {}}
          placement="bottom right"
        >
          <MenuItem id="new">Dark</MenuItem>
          <MenuItem id="open">Light</MenuItem>
          <MenuSeparator />
          <MenuItem id="save">System</MenuItem>
        </Menu>
      </MenuTrigger>
    </header>
  );
}
