import { IconSun } from "@tabler/icons-react";
import { ThemeIcon, type ThemeIconProps } from "../shared";

export default function IconLightMode(props: ThemeIconProps) {
  return <ThemeIcon icon={IconSun} defaultWidth={20} defaultHeight={20} {...props} />;
}
