import React from "react";
import Layout from "@theme-original/Layout";
import { useIframe } from "../../hooks/useIframe";

export default function LayoutWrapper(props) {
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
