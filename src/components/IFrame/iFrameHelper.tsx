import { useEffect } from "react";
import { useLocation } from "@docusaurus/router";

function isInIframe() {
  return window.self !== window.top;
}

export default function IframeModeProvider() {
  const location = useLocation();

  // Apply iframe styling when inside an iframe
  useEffect(() => {
    function applyIframeMode() {
      if (isInIframe()) {
        document.documentElement.setAttribute("data-iframe", "true");
      } else {
        document.documentElement.removeAttribute("data-iframe");
      }
    }

    applyIframeMode();
  }, []);

  // Send navigation events to parent window
  useEffect(() => {
    if (isInIframe()) {
      // Send the current location to the parent window
      window.parent.postMessage({
        type: 'unraid-docs-navigation',
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
        url: window.location.href,
      }, '*');
    }
  }, [location]);

  return null;
}
