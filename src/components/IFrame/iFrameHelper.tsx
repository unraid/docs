import { useEffect } from "react";

function isInIframe() {
  return window.self !== window.top;
}

export default function IframeModeProvider() {
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

  return null;
}
