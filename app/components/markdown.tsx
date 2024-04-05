import type { RenderableTreeNodes } from "@markdoc/markdoc";

import { renderers } from "@markdoc/markdoc";
import * as React from "react";
import prism from "prismjs";
import Heading from "./markdoc/heading";

type Props = {
  content: RenderableTreeNodes;
};

export function Fence({
  children,
  language,
}: {
  children: React.ReactNode;
  language: string;
}) {
  return (
    <pre key={language}>
      <code className={`language-${language}`}>{children}</code>
    </pre>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div className="callout">{children}</div>;
}

export function MarkdownView({ content }: Props) {
  React.useEffect(() => {
    prism.highlightAll();
  });
  return (
    <>
      {renderers.react(content, React, {
        components: { Fence, Callout, Heading },
      })}
    </>
  );
}
