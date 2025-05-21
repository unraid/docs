import React, { useEffect, useState } from "react";
import { useLocation } from "@docusaurus/router";
import { isInIframe } from "./utils";

/**
 * Component that handles navigation events between iframe and parent window
 */
export function IframeNavigation(): JSX.Element | null {
  const location = useLocation();
  const [isInIframeState, setIsInIframeState] = useState(false);

  useEffect(() => {
    setIsInIframeState(isInIframe());
  }, []);

  // Handle navigation events
  useEffect(() => {
    if (isInIframeState) {
      window.parent.postMessage({
        type: 'unraid-docs-navigation',
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
        url: window.location.href,
      }, '*');
    }
  }, [location, isInIframeState]);

  // This component doesn't render anything
  return null;
} 