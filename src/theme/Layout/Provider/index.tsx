import React from "react";
import LayoutProvider from "@theme-original/Layout/Provider";
import { FeedbackWidget } from "../FeedbackWidget";
import { ThemeSync } from "../ThemeSync";
import { IframeNavigation } from "../IframeNavigation";

export default function LayoutProviderWrapper({ children }) {
  return (
    <LayoutProvider>
      <ThemeSync />
      <IframeNavigation />
      <FeedbackWidget />
      {children}
    </LayoutProvider>
  );
}
