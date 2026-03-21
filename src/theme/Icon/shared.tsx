import type { ComponentType, ReactElement, SVGProps } from "react";

export type ThemeIconProps = SVGProps<SVGSVGElement>;

type ThemeIconWrapperProps = ThemeIconProps & {
  defaultWidth?: number | string;
  defaultHeight?: number | string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label?: string;
};

export function ThemeIcon({
  defaultWidth,
  defaultHeight,
  icon: Icon,
  label,
  width,
  height,
  ...props
}: ThemeIconWrapperProps): ReactElement {
  const ariaHidden = label ? undefined : props["aria-hidden"] ?? true;

  return (
    <Icon
      width={width ?? defaultWidth}
      height={height ?? defaultHeight}
      aria-hidden={ariaHidden}
      aria-label={label}
      {...props}
    />
  );
}
