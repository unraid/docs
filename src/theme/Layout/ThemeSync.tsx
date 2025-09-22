import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { useIframe } from "../../hooks/useIframe";
import {
  THEME_QUERY_PARAM,
  THEME_STORAGE_KEY,
  normalizeTheme,
  readSessionValue,
  writeSessionValue,
} from "../../utils/iframeConstants";

/**
 * Component that handles theme synchronization between iframe and parent window
 */
export function ThemeSync(): ReactElement | null {
  const isInIframeState = useIframe();
  const [lastPersistedTheme, setLastPersistedTheme] = useState<string | null>(null);
  const { colorMode, setColorMode } = useColorMode();

  // Apply the theme coming from query params or previous iframe session state.
  useEffect(() => {
    if (!isInIframeState || typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const themeFromQuery = normalizeTheme(params.get(THEME_QUERY_PARAM));
    const themeFromStorage = normalizeTheme(readSessionValue(THEME_STORAGE_KEY));
    const themeToApply = themeFromQuery ?? themeFromStorage;

    if (themeToApply && themeToApply !== colorMode) {
      setColorMode(themeToApply);
    }

    if (themeToApply) {
      if (themeToApply !== lastPersistedTheme) {
        writeSessionValue(THEME_STORAGE_KEY, themeToApply);
        setLastPersistedTheme(themeToApply);
      }
      return;
    }

    if (colorMode !== lastPersistedTheme) {
      writeSessionValue(THEME_STORAGE_KEY, colorMode);
      setLastPersistedTheme(colorMode);
    }
  }, [colorMode, isInIframeState, lastPersistedTheme, setColorMode]);

  // Persist changes that happen inside the iframe so reloads stay consistent.
  useEffect(() => {
    if (!isInIframeState) {
      return;
    }

    if (colorMode === lastPersistedTheme) {
      return;
    }

    writeSessionValue(THEME_STORAGE_KEY, colorMode);
    setLastPersistedTheme(colorMode);
  }, [colorMode, isInIframeState, lastPersistedTheme]);

  // This component doesn't render anything
  return null;
}
