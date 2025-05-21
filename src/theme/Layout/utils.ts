/**
 * Determines if the current window is running inside an iframe
 */
export function isInIframe(): boolean {
  return typeof window !== 'undefined' && window.self !== window.top;
} 