import React from "react";
import type { Props } from "@theme/Layout";
import Layout from "@theme-original/Layout";
import { useIframe } from "../../hooks/useIframe";

export default function LayoutWrapper(props: Props) {
  const isInIframeState = useIframe();

  const dataAttributes = isInIframeState
    ? {
        'data-iframe': 'true',
      }
    : {};

  return (
    <div {...dataAttributes}>
      <Layout {...props}>{props.children}</Layout>
    </div>
  );
}
