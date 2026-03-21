import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import ResponsiveEmbed from "../../components/ResponsiveEmbed";
import { useIframe } from "../../hooks/useIframe";

const FEEDBACK_EMBED_URL =
  "https://product.unraid.net/embed/f/docs-experience-survey";

export function FeedbackWidget(): ReactElement | null {
  const isInIframeState = useIframe();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (
      !isOpen ||
      typeof window === "undefined" ||
      typeof document === "undefined"
    ) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (isInIframeState) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className={`feedback-widget-button${isOpen ? " feedback-widget-button--hidden" : ""}`}
        aria-label="Open feedback panel"
        title="Share feedback"
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
            aria-label="Close feedback panel"
            onClick={() => setIsOpen(false)}
          />

          <section
            className="feedback-widget-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-widget-title"
          >
            <div className="feedback-widget-panel__header">
              <div className="feedback-widget-panel__copy">
                <p className="feedback-widget-panel__eyebrow">Docs feedback</p>
                <h2
                  id="feedback-widget-title"
                  className="feedback-widget-panel__title"
                >
                  Share your docs experience
                </h2>
              </div>

              <button
                type="button"
                className="feedback-widget-panel__close"
                aria-label="Close feedback panel"
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
                title="Docs experience survey"
                aspectRatio="1 / 1"
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
