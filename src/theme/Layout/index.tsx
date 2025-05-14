import React, { useEffect, useState } from "react";
import Layout from "@theme-original/Layout";
import { useLocation } from "@docusaurus/router";

function isInIframe() {
  return typeof window !== 'undefined' && window.self !== window.top;
}

export default function LayoutWrapper(props) {
  const location = useLocation();
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    setIsIframe(isInIframe());
  }, []);

  useEffect(() => {
    if (isIframe) {
      window.parent.postMessage({
        type: 'unraid-docs-navigation',
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
        url: window.location.href,
      }, '*');
    }
  }, [location, isIframe]);

  const dataAttributes = isIframe ? { 'data-iframe': 'true' } : {};

  return (
    <div {...dataAttributes}>
      <Layout {...props} />
    </div>
  );
}
