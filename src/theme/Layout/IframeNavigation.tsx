import React, { useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import { useIframe } from "../../hooks/useIframe";

/**
 * Component that handles navigation events between iframe and parent window
 */
export function IframeNavigation(): JSX.Element | null {
  const location = useLocation();
  const isInIframeState = useIframe();

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