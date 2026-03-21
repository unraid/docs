import type { CSSProperties } from "react";
import styles from "./styles.module.css";

type ResponsiveEmbedProps = {
  src: string;
  title: string;
  aspectRatio?: `${number}/${number}` | `${number} / ${number}`;
  allow?: string;
  referrerPolicy?: HTMLIFrameElement["referrerPolicy"];
};

export default function ResponsiveEmbed({
  src,
  title,
  aspectRatio = "16 / 9",
  allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
  referrerPolicy = "strict-origin-when-cross-origin",
}: ResponsiveEmbedProps) {
  const frameStyle = {
    aspectRatio,
  } satisfies CSSProperties;

  return (
    <div className={styles.embed}>
      <div className={styles.frame} style={frameStyle}>
        <iframe
          {...{ credentialless: "" }}
          className={styles.iframe}
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
