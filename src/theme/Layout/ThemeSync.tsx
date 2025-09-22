import type { ReactElement } from "react";
import React, { useEffect, useRef, useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { useIframe } from "../../hooks/useIframe";
import {
  THEME_QUERY_PARAM,
  THEME_STORAGE_KEY,
  normalizeTheme,
  readSessionValue,
  writeSessionValue,
} from "../../utils/iframeConstants";
import {
  EMBED_MESSAGE_TYPES,
  createReadyMessage,
  createThemeChangeMessage,
  postEmbedMessage,
  sendLegacyThemeMessage,
  subscribeToEmbedMessages,
} from "../../utils/embedMessaging";
import type { SupportedTheme } from "../../utils/iframeConstants";

/**
 * Component that handles theme synchronization between iframe and parent window
 */
export function ThemeSync(): ReactElement | null {
  const isInIframeState = useIframe();
  const [lastPersistedTheme, setLastPersistedTheme] = useState<string | null>(null);
  const { colorMode, setColorMode } = useColorMode();
  const readySentRef = useRef(false);
  const lastAnnouncedThemeRef = useRef<SupportedTheme | null>(null);
  const currentThemeRef = useRef<SupportedTheme | null>(normalizeTheme(colorMode));

  useEffect(() => {
    currentThemeRef.current = normalizeTheme(colorMode);
  }, [colorMode]);

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

  useEffect(() => {
    if (!isInIframeState) {
      return;
    }

    const unsubscribe = subscribeToEmbedMessages((message) => {
      if (message.type !== EMBED_MESSAGE_TYPES.SET_THEME) {
        return;
      }

      const incomingTheme = message.theme;
      if (!incomingTheme || incomingTheme === currentThemeRef.current) {
        return;
      }

      setColorMode(incomingTheme);
    });

    return unsubscribe;
  }, [isInIframeState, setColorMode]);

  useEffect(() => {
    if (!isInIframeState) {
      return;
    }

    const normalizedTheme = normalizeTheme(colorMode);
    if (!normalizedTheme) {
      return;
    }

    if (!readySentRef.current) {
      postEmbedMessage(createReadyMessage(normalizedTheme));
      sendLegacyThemeMessage("theme-ready", normalizedTheme);
      readySentRef.current = true;
    }

    if (lastAnnouncedThemeRef.current === normalizedTheme) {
      return;
    }

    postEmbedMessage(createThemeChangeMessage(normalizedTheme));
    sendLegacyThemeMessage("theme-changed", normalizedTheme);
    lastAnnouncedThemeRef.current = normalizedTheme;
  }, [colorMode, isInIframeState]);

  // This component doesn't render anything
  return null;
}
