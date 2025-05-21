import React, { useEffect, useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { isInIframe } from "./utils";

/**
 * Component that handles theme synchronization between iframe and parent window
 */
export function ThemeSync(): JSX.Element | null {
  const [isInIframeState, setIsInIframeState] = useState(false);
  const { colorMode, setColorMode } = useColorMode();
  
  useEffect(() => {
    setIsInIframeState(isInIframe());
  }, []);
  
  // Handle theme message events from parent
  useEffect(() => {
    if (isInIframeState) {
      const handleMessage = (event) => {
        // Handle theme update message
        if (event.data && event.data.type === 'theme-update') {
          const { theme } = event.data;
          
          // Set the theme based on the message
          if (theme === 'dark' || theme === 'light') {
            setColorMode(theme);
          }
        }
      };

      // Add event listener
      window.addEventListener('message', handleMessage);
      
      // Send ready message to parent
      window.parent.postMessage({ type: 'theme-ready' }, '*');

      // Clean up
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [isInIframeState, setColorMode]);

  // Notify parent when the theme changes
  useEffect(() => {
    if (isInIframeState) {
      // Send theme change notification to parent
      window.parent.postMessage({ 
        type: 'theme-changed', 
        theme: colorMode 
      }, '*');
    }
  }, [colorMode, isInIframeState]);

  // This component doesn't render anything
  return null;
} 