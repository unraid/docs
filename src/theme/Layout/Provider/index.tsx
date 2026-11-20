import React from "react";
import type { Props } from "@theme/Layout/Provider";
import LayoutProvider from "@theme-original/Layout/Provider";
import { FeedbackWidget } from "../FeedbackWidget";
import { ThemeSync } from "../ThemeSync";
import { IframeNavigation } from "../IframeNavigation";

export default function LayoutProviderWrapper({ children }: Props) {
  return (
    <LayoutProvider>
      <ThemeSync />
      <IframeNavigation />
      <FeedbackWidget />
      {children}
    </LayoutProvider>
  );
}
