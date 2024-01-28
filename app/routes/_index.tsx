import type { MetaFunction } from "@remix-run/cloudflare";
import { Button } from "~/components/ui/Button";
import { ComboBox, ComboBoxItem } from "~/components/ui/ComboBox";

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
      <ComboBox
        disabledKeys={["mint"]}
        className="max-w-[200px]"
        label="Ice cream flavor"
        onBlur={function Ya() {}}
        onFocus={function Ya() {}}
        onFocusChange={function Ya() {}}
        onInputChange={function Ya() {}}
        onKeyDown={function Ya() {}}
        onKeyUp={function Ya() {}}
        onOpenChange={function Ya() {}}
        onSelectionChange={function Ya() {}}
      >
        <ComboBoxItem>Chocolate</ComboBoxItem>
        <ComboBoxItem id="mint">Mint</ComboBoxItem>
        <ComboBoxItem>Strawberry</ComboBoxItem>
        <ComboBoxItem>Vanilla</ComboBoxItem>
      </ComboBox>
    </div>
  );
}
