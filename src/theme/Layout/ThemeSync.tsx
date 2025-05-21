import React, { useEffect, useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { useIframe } from "../../hooks/useIframe";

/**
 * Component that handles theme synchronization between iframe and parent window
 */
export function ThemeSync(): JSX.Element | null {
  const isInIframeState = useIframe();
  const [lastSentTheme, setLastSentTheme] = useState<string | null>(null);
  const { colorMode, setColorMode } = useColorMode();
  
  // Ensure theme system is ready and notify parent
  useEffect(() => {
    if (isInIframeState) {
      // Wait a short time to ensure Docusaurus theme system is fully initialized
      const readyTimer = setTimeout(() => {
        // Send ready message to parent
        window.parent.postMessage({ type: 'theme-ready' }, '*');
      }, 20);
      
      return () => clearTimeout(readyTimer);
    }
  }, [isInIframeState]);
  
  // Handle theme message events from parent
  useEffect(() => {
    if (isInIframeState) {
      const handleMessage = (event) => {
        // Validate the message structure
        if (event.data && typeof event.data === 'object') {
          // Handle theme update message
          if (event.data.type === 'theme-update') {
            const { theme } = event.data;
            
            // Set the theme based on the message
            if (theme === 'dark' || theme === 'light') {
              setColorMode(theme);
            }
          }
        }
      };

      // Add event listener
      window.addEventListener('message', handleMessage);
      
      // Clean up
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [isInIframeState, setColorMode]);

  // Notify parent when the theme changes
  useEffect(() => {
    if (isInIframeState && colorMode !== lastSentTheme) {
      // Send theme change notification to parent
      window.parent.postMessage({ 
        type: 'theme-changed', 
        theme: colorMode 
      }, '*');
      
      // Update the last sent theme
      setLastSentTheme(colorMode);
    }
  }, [colorMode, isInIframeState, lastSentTheme]);

  // This component doesn't render anything
  return null;
} 