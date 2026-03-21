import { IconExternalLink as TablerIconExternalLink } from "@tabler/icons-react";
import { translate } from "@docusaurus/Translate";
import { ThemeIcon, type ThemeIconProps } from "../shared";

export default function IconExternalLink({
  width = 13.5,
  height = 13.5,
  ...props
}: ThemeIconProps) {
  return (
    <ThemeIcon
      icon={TablerIconExternalLink}
      width={width}
      height={height}
      label={translate({
        id: "theme.IconExternalLink.ariaLabel",
        message: "(opens in new tab)",
        description: "The ARIA label for the external link icon",
      })}
      {...props}
    />
  );
}
