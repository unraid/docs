import { visit } from "unist-util-visit";

export default function remarkGlossaryLinkTriggers() {
  return (tree) => {
    visit(tree, isLink, (link) => {
      visit(link, isGlossaryAnchor, (trigger) => {
        trigger.name = "span";
      });
    });
  };
}

function isLink(node) {
  return node.type === "link" || node.type === "linkReference" || (
    isJsxAnchor(node) && !isGlossaryAnchor(node)
  );
}

function isJsxAnchor(node) {
  return node.name === "a" && (
    node.type === "mdxJsxTextElement" || node.type === "mdxJsxFlowElement"
  );
}

function isGlossaryAnchor(node) {
  return isJsxAnchor(node) && node.attributes.some((attribute) =>
    attribute.type === "mdxJsxAttribute" &&
    attribute.name === "className" &&
    attribute.value === "remark-auto-glossary-tooltip-trigger"
  );
}
