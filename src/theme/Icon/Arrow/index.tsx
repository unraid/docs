import { IconChevronsLeft } from "@tabler/icons-react";
import { ThemeIcon, type ThemeIconProps } from "../shared";

export default function IconArrow(props: ThemeIconProps) {
  return <ThemeIcon icon={IconChevronsLeft} defaultWidth={20} defaultHeight={20} {...props} />;
}
