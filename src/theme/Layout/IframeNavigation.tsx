import type { ReactElement } from "react";
import React, { useEffect, useMemo, useState } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useIframe } from "../../hooks/useIframe";
import {
  ENTRY_QUERY_PARAM,
  ENTRY_STORAGE_KEY,
  normalizePath,
  readSessionValue,
  writeSessionValue,
} from "../../utils/iframeConstants";
import { createNavigationMessage, postEmbedMessage } from "../../utils/embedMessaging";

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
    if (!isInIframeState || typeof window === "undefined") {
      return;
    }

    const payload = {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      url: window.location.href,
    };

    postEmbedMessage(createNavigationMessage(payload));

    window.parent.postMessage(
      {
        type: "unraid-docs-navigation",
        ...payload,
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
    const normalizedEntryFromQuery = normalizePath(entryFromQuery);

    if (entryFromQuery && normalizedEntryFromQuery) {
      writeSessionValue(ENTRY_STORAGE_KEY, normalizedEntryFromQuery);
      setEntryPath(normalizedEntryFromQuery);
      return;
    }

    const entryFromStorage = normalizePath(readSessionValue(ENTRY_STORAGE_KEY));
    if (entryFromStorage) {
      writeSessionValue(ENTRY_STORAGE_KEY, entryFromStorage);
      setEntryPath(entryFromStorage);
      return;
    }

    const fallbackEntry = normalizePath(
      `${window.location.pathname}${window.location.search}${window.location.hash}`,
    );

    if (fallbackEntry) {
      writeSessionValue(ENTRY_STORAGE_KEY, fallbackEntry);
      setEntryPath(fallbackEntry);
    }
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
          <path
            d="M5 12h14M5 12l6 6M5 12l6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
