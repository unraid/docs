import type { ReactElement } from "react";
import React, { useEffect, useRef } from "react";
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

const DOCUSAURUS_THEME_STORAGE_KEY = "theme";

function getCurrentTheme(): SupportedTheme | null {
  if (typeof document === "undefined") {
    return null;
  }

  return normalizeTheme(document.documentElement.getAttribute("data-theme"));
}

function dispatchStorageChangeEvent(key: string, oldValue: string | null, newValue: string | null): void {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const event = document.createEvent("StorageEvent");
  event.initStorageEvent(
    "storage",
    false,
    false,
    key,
    oldValue,
    newValue,
    window.location.href,
    window.localStorage,
  );
  window.dispatchEvent(event);
}

function setCurrentTheme(theme: SupportedTheme): void {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-theme-choice", theme);

  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    const isEmbed = window.self !== window.top;
    const storageKey = isEmbed ? THEME_STORAGE_KEY : DOCUSAURUS_THEME_STORAGE_KEY;
    const oldValue = window.localStorage.getItem(storageKey);
    window.localStorage.setItem(storageKey, theme);
    dispatchStorageChangeEvent(storageKey, oldValue, theme);
  } catch (error) {
    // Best-effort only; theme sync should still work via DOM attributes.
  }
}

/**
 * Component that handles theme synchronization between iframe and parent window
 */
export function ThemeSync(): ReactElement | null {
  const isInIframeState = useIframe();
  const readySentRef = useRef(false);
  const lastAnnouncedThemeRef = useRef<SupportedTheme | null>(null);
  const lastPersistedThemeRef = useRef<SupportedTheme | null>(null);
  const currentThemeRef = useRef<SupportedTheme | null>(null);

  // Apply the theme coming from query params or previous iframe session state.
  useEffect(() => {
    if (!isInIframeState || typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const themeFromQuery = normalizeTheme(params.get(THEME_QUERY_PARAM));
    const themeFromStorage = normalizeTheme(readSessionValue(THEME_STORAGE_KEY));
    const themeToApply = themeFromQuery ?? themeFromStorage;
    const currentTheme = getCurrentTheme();
    currentThemeRef.current = currentTheme;

    if (themeToApply && themeToApply !== currentTheme) {
      setCurrentTheme(themeToApply);
      currentThemeRef.current = themeToApply;
    }

    const themeToPersist = themeToApply ?? currentThemeRef.current;
    if (themeToPersist && themeToPersist !== lastPersistedThemeRef.current) {
      writeSessionValue(THEME_STORAGE_KEY, themeToPersist);
      lastPersistedThemeRef.current = themeToPersist;
    }
  }, [isInIframeState]);

  useEffect(() => {
    if (!isInIframeState) {
      return;
    }

    const syncThemeState = (): void => {
      const normalizedTheme = getCurrentTheme();
      if (!normalizedTheme) {
        return;
      }

      currentThemeRef.current = normalizedTheme;

      if (normalizedTheme !== lastPersistedThemeRef.current) {
        writeSessionValue(THEME_STORAGE_KEY, normalizedTheme);
        lastPersistedThemeRef.current = normalizedTheme;
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
    };

    syncThemeState();

    if (typeof document === "undefined") {
      return;
    }

    const observer = new MutationObserver(() => {
      syncThemeState();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const onStorage = (event: StorageEvent): void => {
      if (event.key !== THEME_STORAGE_KEY) {
        return;
      }

      const nextTheme = normalizeTheme(event.newValue);
      if (!nextTheme || nextTheme === currentThemeRef.current) {
        return;
      }

      currentThemeRef.current = nextTheme;
      setCurrentTheme(nextTheme);
    };

    window.addEventListener("storage", onStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", onStorage);
    };
  }, [isInIframeState]);

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

      setCurrentTheme(incomingTheme);
      currentThemeRef.current = incomingTheme;
    });

    return unsubscribe;
  }, [isInIframeState]);

  // This component doesn't render anything
  return null;
}
