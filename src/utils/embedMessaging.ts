import { normalizeTheme, type SupportedTheme } from "./iframeConstants";

const EMBED_MESSAGE_SOURCE = "unraid-docs" as const;

export const EMBED_MESSAGE_TYPES = {
  READY: "unraid-docs:ready",
  THEME_CHANGE: "unraid-docs:theme-change",
  NAVIGATION: "unraid-docs:navigation",
  SET_THEME: "unraid-docs:set-theme",
} as const;

export type EmbedReadyMessage = {
  source: typeof EMBED_MESSAGE_SOURCE;
  type: typeof EMBED_MESSAGE_TYPES.READY;
  theme: SupportedTheme;
};

export type EmbedThemeChangeMessage = {
  source: typeof EMBED_MESSAGE_SOURCE;
  type: typeof EMBED_MESSAGE_TYPES.THEME_CHANGE;
  theme: SupportedTheme;
};

export type EmbedNavigationMessage = {
  source: typeof EMBED_MESSAGE_SOURCE;
  type: typeof EMBED_MESSAGE_TYPES.NAVIGATION;
  pathname: string;
  search: string;
  hash: string;
  url: string;
};

export type EmbedOutboundMessage =
  | EmbedReadyMessage
  | EmbedThemeChangeMessage
  | EmbedNavigationMessage;

export type EmbedSetThemeMessage = {
  source: typeof EMBED_MESSAGE_SOURCE;
  type: typeof EMBED_MESSAGE_TYPES.SET_THEME;
  theme: SupportedTheme;
  /** Indicates the message came from the legacy postMessage contract. */
  legacy?: boolean;
};

export type EmbedInboundMessage = EmbedSetThemeMessage;

export type LegacyThemeMessageType = "theme-ready" | "theme-changed";

export type LegacyThemeUpdateMessage = {
  type: "theme-update";
  theme: string;
};

function isWindowAvailable(): boolean {
  return typeof window !== "undefined";
}

function isInIframe(): boolean {
  if (!isWindowAvailable()) {
    return false;
  }

  try {
    return window.parent !== window;
  } catch (error) {
    return false;
  }
}

function isEmbedSetThemeMessage(data: unknown): data is EmbedSetThemeMessage {
  if (!data || typeof data !== "object") {
    return false;
  }

  const candidate = data as Partial<EmbedSetThemeMessage>;
  if (
    candidate.source !== EMBED_MESSAGE_SOURCE ||
    candidate.type !== EMBED_MESSAGE_TYPES.SET_THEME ||
    typeof candidate.theme !== "string"
  ) {
    return false;
  }

  return normalizeTheme(candidate.theme) !== null;
}

function isLegacyThemeUpdateMessage(data: unknown): data is LegacyThemeUpdateMessage {
  if (!data || typeof data !== "object") {
    return false;
  }

  const candidate = data as Partial<LegacyThemeUpdateMessage>;
  return candidate.type === "theme-update" && typeof candidate.theme === "string";
}

export function postEmbedMessage(message: EmbedOutboundMessage): void {
  if (!isInIframe()) {
    return;
  }

  window.parent.postMessage(message, "*");
}

export function subscribeToEmbedMessages(handler: (message: EmbedInboundMessage) => void): () => void {
  if (!isWindowAvailable()) {
    return () => undefined;
  }

  const listener = (event: MessageEvent): void => {
    if (isEmbedSetThemeMessage(event.data)) {
      handler({
        ...event.data,
        theme: normalizeTheme(event.data.theme)!,
      });
      return;
    }

    if (isLegacyThemeUpdateMessage(event.data)) {
      const normalized = normalizeTheme(event.data.theme);
      if (!normalized) {
        return;
      }

      handler({
        source: EMBED_MESSAGE_SOURCE,
        type: EMBED_MESSAGE_TYPES.SET_THEME,
        theme: normalized,
        legacy: true,
      });
    }
  };

  window.addEventListener("message", listener);

  return () => {
    window.removeEventListener("message", listener);
  };
}

export function sendLegacyThemeMessage(type: LegacyThemeMessageType, theme: SupportedTheme): void {
  if (!isInIframe()) {
    return;
  }

  window.parent.postMessage({ type, theme }, "*");
}

export function createReadyMessage(theme: SupportedTheme): EmbedReadyMessage {
  return {
    source: EMBED_MESSAGE_SOURCE,
    type: EMBED_MESSAGE_TYPES.READY,
    theme,
  };
}

export function createThemeChangeMessage(theme: SupportedTheme): EmbedThemeChangeMessage {
  return {
    source: EMBED_MESSAGE_SOURCE,
    type: EMBED_MESSAGE_TYPES.THEME_CHANGE,
    theme,
  };
}

export function createNavigationMessage(payload: Omit<EmbedNavigationMessage, "source" | "type">): EmbedNavigationMessage {
  return {
    source: EMBED_MESSAGE_SOURCE,
    type: EMBED_MESSAGE_TYPES.NAVIGATION,
    ...payload,
  };
}
