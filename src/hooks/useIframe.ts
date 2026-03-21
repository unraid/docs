import { useState, useEffect } from 'react';
import {
  IFRAME_QUERY_PARAM,
  IFRAME_STORAGE_KEY,
  parseBooleanFlag,
  clearSessionValue,
  writeSessionValue,
} from '../utils/iframeConstants';

/**
 * React hook that detects if the current page is displayed inside an iframe
 * @returns boolean indicating if the current page is in an iframe,
 * or undefined until the client-side check has completed
 */
export function useIframe(): boolean | undefined {
  const [isInIframeState, setIsInIframeState] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const queryValue = params.get(IFRAME_QUERY_PARAM);
    const iframeFromQuery = parseBooleanFlag(queryValue);

    const iframeFromWindow = (() => {
      try {
        return window.self !== window.top;
      } catch (error) {
        return false;
      }
    })();

    if (iframeFromQuery || iframeFromWindow) {
      writeSessionValue(IFRAME_STORAGE_KEY, 'true');
      setIsInIframeState(true);
      return;
    }

    setIsInIframeState(false);
    clearSessionValue(IFRAME_STORAGE_KEY);
  }, []);

  return isInIframeState;
}
