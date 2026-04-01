import Translate, { translate } from "@docusaurus/Translate";
import type { ReactElement } from "react";
import React, { useEffect, useRef, useState } from "react";
import ResponsiveEmbed from "../../components/ResponsiveEmbed";
import { useIframe } from "../../hooks/useIframe";

const FEEDBACK_EMBED_URL =
  "https://product.unraid.net/embed/f/docs-experience-survey";
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      element.getAttribute("aria-hidden") !== "true" &&
      element.tabIndex !== -1,
  );
}

export function FeedbackWidget(): ReactElement | null {
  const isInIframeState = useIframe();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (
      !isOpen ||
      typeof window === "undefined" ||
      typeof document === "undefined"
    ) {
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const dialogElement = dialogRef.current;
    if (!dialogElement) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements(dialogElement);
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogElement.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

      if (event.shiftKey) {
        if (activeElement === firstElement || activeElement === dialogElement) {
          event.preventDefault();
          lastElement.focus();
        }
        return;
      }

      if (activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    const handleFocusIn = (event: FocusEvent): void => {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }

      if (!dialogElement.contains(event.target)) {
        const focusableElements = getFocusableElements(dialogElement);
        const focusTarget = focusableElements[0] ?? dialogElement;
        focusTarget.focus();
      }
    };

    document.addEventListener("focusin", handleFocusIn);

    const focusableElements = getFocusableElements(dialogElement);
    const focusTarget = focusableElements[0] ?? dialogElement;
    focusTarget.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  if (isInIframeState !== false) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className={`feedback-widget-button${isOpen ? " feedback-widget-button--hidden" : ""}`}
        aria-hidden={isOpen}
        aria-label={translate({
          message: "Open feedback panel",
          description: "Aria label for the floating docs feedback button",
        })}
        tabIndex={isOpen ? -1 : 0}
        title={translate({
          message: "Share feedback",
          description: "Tooltip for the floating docs feedback button",
        })}
        onClick={() => setIsOpen(true)}
      >
        <span className="feedback-widget-button__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4h-1A2.5 2.5 0 0 1 4 13.5z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
            <path
              d="M8 9.25h8M8 12h5.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </svg>
        </span>
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            className="feedback-widget-backdrop"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setIsOpen(false)}
          />

          <section
            className="feedback-widget-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-widget-title"
            ref={dialogRef}
            tabIndex={-1}
          >
            <div className="feedback-widget-panel__header">
              <div className="feedback-widget-panel__copy">
                <p className="feedback-widget-panel__eyebrow">
                  <Translate
                    id="theme.Layout.FeedbackWidget.eyebrow"
                    description="Eyebrow label above the docs feedback panel title"
                  >
                    Docs feedback
                  </Translate>
                </p>
                <h2
                  id="feedback-widget-title"
                  className="feedback-widget-panel__title"
                >
                  <Translate
                    id="theme.Layout.FeedbackWidget.title"
                    description="Title for the docs feedback modal panel"
                  >
                    Share your docs experience
                  </Translate>
                </h2>
              </div>

              <button
                type="button"
                className="feedback-widget-panel__close"
                aria-label={translate({
                  message: "Close feedback panel",
                  description: "Aria label for the close button in the docs feedback modal",
                })}
                onClick={() => setIsOpen(false)}
              >
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6l-12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>

            <div className="feedback-widget-panel__frame">
              <ResponsiveEmbed
                src={FEEDBACK_EMBED_URL}
                title={translate({
                  message: "Docs experience survey",
                  description: "Title attribute for the embedded docs feedback survey iframe",
                })}
                aspectRatio="1 / 1"
                disableMargin
                embedClassName="feedback-widget-panel__embed"
                frameClassName="feedback-widget-panel__embed-frame"
                iframeClassName="feedback-widget-panel__iframe"
              />
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}
