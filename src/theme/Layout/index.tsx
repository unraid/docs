import React from "react";
import Layout from "@theme-original/Layout";
import { ThemeSync } from "./ThemeSync";
import { IframeNavigation } from "./IframeNavigation";
import { useIframe } from "../../hooks/useIframe";

export default function LayoutWrapper(props) {
  const isInIframeState = useIframe();
  const dataAttributes = isInIframeState ? { 'data-iframe': 'true' } : {};

  return (
    <div {...dataAttributes}>
      <Layout {...props}>
        <ThemeSync />
        <IframeNavigation />
        {props.children}
      </Layout>
    </div>
  );
}
