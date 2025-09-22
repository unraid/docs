export const IFRAME_QUERY_PARAM = "embed";
export const THEME_QUERY_PARAM = "theme";
export const ENTRY_QUERY_PARAM = "entry";
export const SIDEBAR_QUERY_PARAM = "sidebar";

export const IFRAME_STORAGE_KEY = "unraidDocsIframe";
export const THEME_STORAGE_KEY = "unraidDocsTheme";
export const ENTRY_STORAGE_KEY = "unraidDocsIframeEntry";
export const SIDEBAR_STORAGE_KEY = "unraidDocsIframeSidebar";

const BOOLEAN_TRUE_VALUES = new Set(["1", "true", "yes"]);

export type SupportedTheme = "light" | "dark";

export function parseBooleanFlag(value: string | null): boolean {
  if (!value) {
    return false;
  }

  return BOOLEAN_TRUE_VALUES.has(value.toLowerCase());
}

export function normalizeTheme(theme: string | null): SupportedTheme | null {
  if (!theme) {
    return null;
  }

  const lowerCase = theme.toLowerCase();
  if (lowerCase === "light" || lowerCase === "dark") {
    return lowerCase;
  }

  return null;
}

export function readSessionValue(key: string): string | null {
  if (typeof window === "undefined" || !window.sessionStorage) {
    return null;
  }

  try {
    return window.sessionStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

export function writeSessionValue(key: string, value: string): void {
  if (typeof window === "undefined" || !window.sessionStorage) {
    return;
  }

  try {
    window.sessionStorage.setItem(key, value);
  } catch (error) {
    // Failing to write session state should not break the docs experience.
  }
}

export function clearSessionValue(key: string): void {
  if (typeof window === "undefined" || !window.sessionStorage) {
    return;
  }

  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    // Removing session state is a best-effort operation.
  }
}
