# Embedding Unraid Docs

Use the following guidance when loading the Unraid documentation inside an iframe-driven experience. Query parameters cover the most common configuration options, and an optional `postMessage` API is available for hosts that need dynamic coordination.

## Required Query Parameters

- `embed=1` — Opts the page into iframe-specific presentation tweaks (hides the global navbar, footer, etc.). Include this on every embedded URL.

## Optional Query Parameters

- `theme=<light|dark>` — Forces the initial Docs theme. The value is persisted for the iframe session so reloads stay consistent.
- `entry=<path>` — Marks the logical entry point for the iframe session. Supply an absolute docs path (e.g. `/unraid-os/...`) or a full docs URL; the embedded UI shows a floating back icon that returns visitors to this path and hides itself while you remain on it. Defaults to the first loaded URL if omitted.
- `sidebar=1` — Re-enables the documentation sidebar and table of contents, which are hidden by default in embedded mode.

## Session Storage Keys

The iframe experience uses `window.sessionStorage` to remember state while a browser tab stays open. Host applications normally do not need to interact with these keys, but they are listed here for completeness.

| Key                       | Purpose                                                         |
| ------------------------- | --------------------------------------------------------------- |
| `unraidDocsIframe`        | Tracks whether the current session originated inside an iframe. |
| `unraidDocsTheme`         | Stores the last used Docs theme so reloads stay consistent.     |
| `unraidDocsIframeEntry`   | Holds the iframe entry path for the fallback back button.       |
| `unraidDocsIframeSidebar` | Marks whether the sidebar was explicitly enabled.               |

A host can clear these keys to reset the embedded state before opening a new iframe session.

## Example URL Builders

```js
function buildDocsUrl(path, { theme, entry, sidebar } = {}) {
  const url = new URL(path, "https://docs.unraid.net");
  url.searchParams.set("embed", "1");

  if (theme === "light" || theme === "dark") {
    url.searchParams.set("theme", theme);
  }

  if (entry) {
    url.searchParams.set("entry", entry);
  }

  if (sidebar) {
    url.searchParams.set("sidebar", "1");
  }

  return url.toString();
}
```

## Recommended Host Flow

1. Decide which route should serve as the iframe entry point and supply it via `entry` when loading the iframe.
2. Pass the current host theme if you want the Docs theme to match immediately.
3. Toggle `sidebar=1` only when the host layout can accommodate the wider viewport required for the sidebar.
4. When tearing down an iframe session, optionally clear the session-storage keys to remove residual state before launching a new session in the same tab.

## Messaging API

The embedded docs surface a lightweight `postMessage` API that reports readiness, navigation, and theme changes using structured message types. All messages share the shape `{ source: "unraid-docs", type: string, ...payload }` so hosts can quickly filter for docs-specific traffic.

### Messages emitted from the iframe

| Type                       | Payload                           | Purpose                                                                   |
| -------------------------- | --------------------------------- | ------------------------------------------------------------------------- |
| `unraid-docs:ready`        | `{ theme: "light" \| "dark" }`    | Fired once the iframe has applied its starting theme.                     |
| `unraid-docs:theme-change` | `{ theme: "light" \| "dark" }`    | Fired whenever the iframe theme changes (including the initial emission). |
| `unraid-docs:navigation`   | `{ pathname, search, hash, url }` | Fired whenever in-iframe navigation occurs.                               |

### Commands accepted by the iframe

| Type                    | Payload                        | Purpose                                             |
| ----------------------- | ------------------------------ | --------------------------------------------------- |
| `unraid-docs:set-theme` | `{ theme: "light" \| "dark" }` | Requests a theme change without requiring a reload. |

Example host handler:

```js
window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || data.source !== 'unraid-docs') {
    return;
  }

  if (data.type === 'unraid-docs:theme-change') {
    console.log('Docs theme changed to', data.theme);
  }
});

function setIframeTheme(frame, theme) {
  if (!frame.contentWindow) {
    return;
  }

  frame.contentWindow.postMessage({
    source: 'unraid-docs',
    type: 'unraid-docs:set-theme',
    theme,
  }, '*');
}
```

Refer to `iframe-test.html` for a working example that exercises both outgoing and incoming messages.

### Legacy compatibility

For backwards compatibility the iframe still listens for `{ type: "theme-update", theme }` and continues to emit the historical `theme-ready` and `theme-changed` messages alongside the new message types. Hosts should migrate to the structured `unraid-docs:*` contract because the legacy events will be removed in a future release. The example test page also demonstrates how to broadcast both message formats during the transition period.
