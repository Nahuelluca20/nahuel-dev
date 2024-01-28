import Markdoc, { transform, type RenderableTreeNodes } from "@markdoc/markdoc";

const fence = {
  render: "Fence",
  attributes: {
    language: {
      type: String,
    },
  },
};

export function markdownParser(markdown: string): RenderableTreeNodes {
  return transform(Markdoc.parse(markdown), { nodes: { fence } });
}
