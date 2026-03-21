import { IconMenu2 } from "@tabler/icons-react";
import { ThemeIcon, type ThemeIconProps } from "../shared";

export default function IconMenu({
  width = 30,
  height = 30,
  ...props
}: ThemeIconProps) {
  return <ThemeIcon icon={IconMenu2} width={width} height={height} {...props} />;
}
