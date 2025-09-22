import type { ReactElement } from "react";
import React, { useEffect, useMemo, useState } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useIframe } from "../../hooks/useIframe";
import {
  ENTRY_QUERY_PARAM,
  ENTRY_STORAGE_KEY,
  readSessionValue,
  writeSessionValue,
} from "../../utils/iframeConstants";

/**
 * Component that handles navigation events between iframe and parent window.
 * Keeps the legacy postMessage flow for hosts that still rely on it while
 * providing an in-iframe fallback navigation affordance.
 */
export function IframeNavigation(): ReactElement | null {
  const location = useLocation();
  const isInIframeState = useIframe();
  const [entryPath, setEntryPath] = useState<string | null>(null);

  // Legacy navigation event propagation for hosts that still listen for it.
  useEffect(() => {
    if (!isInIframeState) {
      return;
    }

    window.parent.postMessage(
      {
        type: "unraid-docs-navigation",
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
        url: window.location.href,
      },
      "*",
    );
  }, [location, isInIframeState]);

  // Determine the entry point for the iframe session.
  useEffect(() => {
    if (!isInIframeState || typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const entryFromQuery = params.get(ENTRY_QUERY_PARAM);

    if (entryFromQuery) {
      writeSessionValue(ENTRY_STORAGE_KEY, entryFromQuery);
      setEntryPath(entryFromQuery);
      return;
    }

    const entryFromStorage = readSessionValue(ENTRY_STORAGE_KEY);
    if (entryFromStorage) {
      setEntryPath(entryFromStorage);
      return;
    }

    const fallbackEntry = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    writeSessionValue(ENTRY_STORAGE_KEY, fallbackEntry);
    setEntryPath(fallbackEntry);
  }, [isInIframeState]);

  const currentPath = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
  }, [location]);

  if (!isInIframeState || !entryPath) {
    return null;
  }

  if (currentPath === entryPath) {
    return null;
  }

  return (
    <Link
      to={entryPath}
      className="iframe-back-button"
      aria-label="Back to start"
      title="Back to start"
    >
      <span aria-hidden="true" className="iframe-back-button__icon">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 4.5a1 1 0 0 1 .76 1.65L8.91 11H18a1 1 0 1 1 0 2H8.91l3.85 4.85a1 1 0 1 1-1.52 1.3l-5.5-6.9a1 1 0 0 1 0-1.3l5.5-6.9A1 1 0 0 1 12 4.5Z" />
        </svg>
      </span>
    </Link>
  );
}
