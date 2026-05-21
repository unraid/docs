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

const credentiallessIframeProps: Record<string, string> = {
  // React treats `credentialless` as a non-boolean iframe attribute.
  // Passing `credentialless` or `{true}` omits it during SSR, which breaks
  // embeds on pages served with `Cross-Origin-Embedder-Policy: credentialless`.
  credentialless: "",
} as const;

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
          {...credentiallessIframeProps}
          loading="lazy"
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
