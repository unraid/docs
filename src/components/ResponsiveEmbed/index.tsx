import type { CSSProperties } from "react";
import styles from "./styles.module.css";

type ResponsiveEmbedProps = {
  src: string;
  title: string;
  aspectRatio?: `${number}/${number}` | `${number} / ${number}`;
  allow?: string;
  referrerPolicy?: HTMLIFrameElement["referrerPolicy"];
  disableMargin?: boolean;
  embedClassName?: string;
  frameClassName?: string;
  iframeClassName?: string;
};

export default function ResponsiveEmbed({
  src,
  title,
  aspectRatio = "16 / 9",
  allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
  referrerPolicy = "strict-origin-when-cross-origin",
  disableMargin = false,
  embedClassName,
  frameClassName,
  iframeClassName,
}: ResponsiveEmbedProps) {
  const frameStyle = {
    aspectRatio,
  } satisfies CSSProperties;

  const embedClasses = [disableMargin ? styles.embedNoMargin : styles.embed, embedClassName]
    .filter(Boolean)
    .join(" ");
  const frameClasses = [styles.frame, frameClassName].filter(Boolean).join(" ");
  const iframeClasses = [styles.iframe, iframeClassName].filter(Boolean).join(" ");

  return (
    <div className={embedClasses}>
      <div className={frameClasses} style={frameStyle}>
        <iframe
          {...{ credentialless: "" }}
          className={iframeClasses}
          src={src}
          title={title}
          allow={allow}
          referrerPolicy={referrerPolicy}
          allowFullScreen
        />
      </div>
    </div>
  );
}
