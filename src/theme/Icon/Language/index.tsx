import { IconLanguage as TablerIconLanguage } from "@tabler/icons-react";
import { ThemeIcon, type ThemeIconProps } from "../shared";

export default function IconLanguage({
  width = 20,
  height = 20,
  ...props
}: ThemeIconProps) {
  return <ThemeIcon icon={TablerIconLanguage} width={width} height={height} {...props} />;
}
