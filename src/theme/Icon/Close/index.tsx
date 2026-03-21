import { IconX } from "@tabler/icons-react";
import { ThemeIcon, type ThemeIconProps } from "../shared";

export default function IconClose({
  width = 21,
  height = 21,
  strokeWidth = 1.5,
  ...props
}: ThemeIconProps) {
  return (
    <ThemeIcon
      icon={IconX}
      width={width}
      height={height}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}
