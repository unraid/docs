import React, { type ReactNode } from "react";
import type { Props } from "@theme/Footer/Copyright";

const CURRENT_YEAR_TOKEN_PATTERN = /\{currentYear\}/g;
const COPYRIGHT_YEAR_PATTERN = /2005-\d{4}/;

export default function FooterCopyright({ copyright }: Props): ReactNode {
  const currentYear = new Date().getFullYear().toString();
  const resolvedCopyright = copyright
    .replace(CURRENT_YEAR_TOKEN_PATTERN, currentYear)
    .replace(COPYRIGHT_YEAR_PATTERN, `2005-${currentYear}`);

  return (
    <div
      className="footer__copyright"
      dangerouslySetInnerHTML={{ __html: resolvedCopyright }}
    />
  );
}
