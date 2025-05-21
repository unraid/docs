import React, { useEffect, useState } from "react";
import Layout from "@theme-original/Layout";
import { ThemeSync } from "./ThemeSync";
import { IframeNavigation } from "./IframeNavigation";
import { isInIframe } from "./utils";

export default function LayoutWrapper(props) {
  const [isInIframeState, setIsInIframeState] = useState(false);

  useEffect(() => {
    setIsInIframeState(isInIframe());
  }, []);

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
