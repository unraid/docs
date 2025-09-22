import React, { useEffect, useState } from "react";
import Layout from "@theme-original/Layout";
import { useLocation } from "@docusaurus/router";
import { ThemeSync } from "./ThemeSync";
import { IframeNavigation } from "./IframeNavigation";
import { useIframe } from "../../hooks/useIframe";
import {
  SIDEBAR_QUERY_PARAM,
  SIDEBAR_STORAGE_KEY,
  clearSessionValue,
  parseBooleanFlag,
  readSessionValue,
  writeSessionValue,
} from "../../utils/iframeConstants";

export default function LayoutWrapper(props) {
  const isInIframeState = useIframe();
  const location = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    if (!isInIframeState || typeof window === "undefined") {
      setIsSidebarVisible(false);
      clearSessionValue(SIDEBAR_STORAGE_KEY);
      return;
    }

    const params = new URLSearchParams(location?.search || window.location.search);
    const hasSidebarParam = params.has(SIDEBAR_QUERY_PARAM);
    const sidebarFromQuery = parseBooleanFlag(params.get(SIDEBAR_QUERY_PARAM));

    if (hasSidebarParam) {
      if (sidebarFromQuery) {
        setIsSidebarVisible(true);
        writeSessionValue(SIDEBAR_STORAGE_KEY, "true");
      } else {
        setIsSidebarVisible(false);
        clearSessionValue(SIDEBAR_STORAGE_KEY);
      }
      return;
    }

    const sidebarFromStorage = parseBooleanFlag(readSessionValue(SIDEBAR_STORAGE_KEY));
    if (sidebarFromStorage) {
      setIsSidebarVisible(true);
      return;
    }

    setIsSidebarVisible(false);
  }, [isInIframeState, location]);

  const dataAttributes = isInIframeState
    ? {
        'data-iframe': 'true',
        'data-iframe-sidebar': isSidebarVisible ? 'visible' : 'hidden',
      }
    : {};

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
