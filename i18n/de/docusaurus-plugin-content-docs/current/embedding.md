# Einbetten von Unraid-Dokumentationen

Verwenden Sie die folgende Anleitung, wenn Sie die Unraid-Dokumentation innerhalb einer Iframe-gesteuerten Umgebung laden. Abfrageparameter decken die gebräuchlichsten Konfigurationsoptionen ab, und eine optionale `postMessage`-API steht für Hosts zur Verfügung, die eine dynamische Koordination benötigen.

## Erforderliche Abfrageparameter

- `embed=1` — Ermöglicht die Iframe-spezifische Anpassung der Seitendarstellung (versteckt die globale Navigationsleiste, Fußzeile usw.). Fügen Sie dies zu jeder eingebetteten URL hinzu.

## Optionale Abfrageparameter

- `theme=<light|dark>` — Erzwingt das anfängliche Design der Dokumentation. Der Wert bleibt für die Iframe-Sitzung bestehen, sodass Wiederholungen konsistent bleiben.
- `entry=<path>` — Kennzeichnet den logischen Einstiegspunkt für die Iframe-Sitzung. Geben Sie einen absoluten Dokumentationspfad (z. B. `/unraid-os/...`) oder eine vollständige Dokumentations-URL an; die eingebettete Benutzeroberfläche zeigt ein schwebendes Zurück-Symbol, das die Besucher zu diesem Pfad zurückführt und sich versteckt, während Sie darauf bleiben. Standardmäßig wird die zuerst geladene URL verwendet, wenn nicht angegeben.
- `sidebar=1` — Aktiviert die Dokumentationsseitenleiste und das Inhaltsverzeichnis, die im eingebetteten Modus standardmäßig ausgeblendet sind.

## Sitzung Speicher Schlüssel

Die Iframe-Erfahrung verwendet `window.sessionStorage`, um den Zustand zu merken, während ein Browser-Tab geöffnet bleibt. Hostanwendungen müssen normalerweise nicht mit diesen Schlüsseln interagieren, aber sie sind hier aufgeführt, um der Vollständigkeit halber.

| Schlüssel                 | Zweck                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `unraidDocsIframe`        | Gibt an, ob die aktuelle Sitzung innerhalb eines Iframes gestartet wurde.       |
| `unraidDocsTheme`         | Speichert das zuletzt verwendete Docs-Thema, sodass Reloads konsistent bleiben. |
| `unraidDocsIframeEntry`   | Speichert den Iframe-Eintragspfad für die Rücksprungtaste.                      |
| `unraidDocsIframeSidebar` | Kennzeichnet, ob die Seitenleiste explizit aktiviert wurde.                     |

Ein Host kann diese Schlüssel löschen, um den eingebetteten Zustand zurückzusetzen, bevor eine neue Iframe-Sitzung geöffnet wird.

## Beispiel-URL-Erstellung

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

## Empfohlener Host-Flow

1. Entscheiden Sie, welche Route als Einstiegspunkt für das Iframe dienen soll, und geben Sie diese über `entry` beim Laden des Iframes an.
2. Übergeben Sie das aktuelle Hostthema, wenn Sie möchten, dass das Docs-Thema sofort übereinstimmt.
3. Schalten Sie das `sidebar=1` nur um, wenn das Host-Layout das breitere Ansichtsfenster für die Seitenleiste aufnehmen kann.
4. Beim Abbau einer Iframe-Sitzung können die Sitzungsspeicher-Schlüssel optional gelöscht werden, um den Restzustand zu entfernen, bevor eine neue Sitzung im selben Tab gestartet wird.

## Nachrichten-API

Die eingebetteten Dokumente bieten eine vereinfachte `postMessage`-API, die Bereitschaft, Navigation und Themenänderungen mithilfe strukturierter Nachrichtentypen meldet. Alle Nachrichten haben die Form `{ source: "unraid-docs", type: string, ...payload }`, damit Hosts schnell nach dokumentspezifischem Datenverkehr filtern können.

### Nachrichten, die vom Iframe gesendet werden

| Typ                        | Nutzlast                          | Zweck                                                                                                                                  |
| -------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `unraid-docs:ready`        | `{ theme: "light" \\| "dark" }`  | Wird ausgelöst, sobald das Iframe sein Startthema angewendet hat.                                                      |
| `unraid-docs:theme-change` | `{ theme: "light" \\| "dark" }`  | Wird jedes Mal ausgelöst, wenn das Iframe-Thema wechselt (einschließlich der anfänglichen Ausgabe). |
| `unraid-docs:navigation`   | `{ pathname, search, hash, url }` | Wird ausgelöst, wenn eine Navigation im Iframe erfolgt.                                                                |

### Von dem Iframe akzeptierte Befehle

| Typ                     | Nutzlast                         | Zweck                                                                                   |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------------------------- |
| `unraid-docs:set-theme` | `{ theme: "light" \\| "dark" }` | Erfordert eine Themenänderung, ohne dass ein Neuladen erforderlich ist. |

Beispiel Host-Handler:

```js
window.addEventListener('message', (ereignis) => {
 const daten = ereignis.daten;
 if (!daten || daten.quelle !== 'unraid-docs') {
 return;
 }

 if (daten.typ === 'unraid-docs:theme-change') {
 console.log('Dokumentations-Thema geändert zu', daten.theme);
 }
});

function setIframeTheme(rahmen, theme) {
 if (!rahmen.contentWindow) {
 return;
 }

 rahmen.contentWindow.postMessage({
 quelle: 'unraid-docs',
 typ: 'unraid-docs:set-theme',
 theme,
 }, '*');
}
```

Siehe `iframe-test.html` für ein funktionierendes Beispiel, das sowohl ausgehende als auch eingehende Nachrichten verarbeitet.

### Legacy-Kompatibilität

Zur Rückwärtskompatibilität horcht das Iframe weiterhin auf `{ type: "theme-update", theme }` und sendet die historischen Nachrichten `theme-ready` und `theme-changed` zusätzlich zu den neuen Nachrichtentypen. Hosts sollten auf den strukturierten `unraid-docs:*`-Vertrag umsteigen, da die Legacy-Ereignisse in einer zukünftigen Veröffentlichung entfernt werden. Die Beispieltestseite demonstriert auch, wie beide Nachrichtenformate während der Übergangszeit gesendet werden.
