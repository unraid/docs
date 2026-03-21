import { IconMoon } from "@tabler/icons-react";
import { ThemeIcon, type ThemeIconProps } from "../shared";

export default function IconDarkMode(props: ThemeIconProps) {
  return <ThemeIcon icon={IconMoon} defaultWidth={20} defaultHeight={20} {...props} />;
}
