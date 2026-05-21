import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { describe, expect, it } from "vitest";

import ResponsiveEmbed from "../index";

type TestElement = ReactElement<Record<string, unknown> & { children?: ReactNode }>;

function onlyElementChild(element: TestElement): TestElement {
  const child = Children.only(element.props.children);

  if (isValidElement<Record<string, unknown> & { children?: ReactNode }>(child)) {
    return child;
  }

  throw new Error("Expected a React element child.");
}

describe("ResponsiveEmbed", () => {
  it("passes credentialless as a string so React renders the iframe attribute", () => {
    const embed = ResponsiveEmbed({
      src: "https://www.youtube.com/embed/NMHaMaa8iV0",
      title: "Internal boot walkthrough",
    }) as TestElement;
    const frame = onlyElementChild(embed);
    const iframe = onlyElementChild(frame);

    expect(iframe.props.credentialless).toBe("");
    expect(iframe.props.src).toBe("https://www.youtube.com/embed/NMHaMaa8iV0");
  });
});
