import { useState, useEffect } from 'react';

/**
 * Determines if the current window is running inside an iframe
 */
function isInIframe(): boolean {
  return typeof window !== 'undefined' && window.self !== window.top;
}

/**
 * React hook that detects if the current page is displayed inside an iframe
 * @returns boolean indicating if the current page is in an iframe
 */
export function useIframe(): boolean {
  const [isInIframeState, setIsInIframeState] = useState(false);

  useEffect(() => {
    setIsInIframeState(isInIframe());
  }, []);

  return isInIframeState;
} 