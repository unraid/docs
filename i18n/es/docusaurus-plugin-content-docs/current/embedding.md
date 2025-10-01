# Incorporación de Documentos de Unraid

Utilice la siguiente guía al cargar la documentación de Unraid dentro de una experiencia impulsada por iframe. Los parámetros de consulta cubren las opciones de configuración más comunes, y se dispone de una API `postMessage` opcional para hosts que necesitan coordinación dinámica.

## Parámetros de Consulta Requeridos

- `embed=1` — Opta por ajustar la presentación específica del iframe (oculta la barra de navegación global, pie de página, etc.). Incluya esto en cada URL incrustada.

## Parámetros de Consulta Opcionales

- `theme=<light|dark>` — Obliga el tema inicial de los Documentos. El valor se mantiene durante la sesión del iframe para que las recargas sean consistentes.
- `entry=<path>` — Marca el punto de entrada lógico para la sesión del iframe. Proporcione una ruta absoluta de documentos (e.g. `/unraid-os/...`) o una URL completa de documentos; la interfaz incrustada muestra un icono flotante de retroceso que devuelve a los visitantes a esta ruta y se oculta mientras permanece en ella. Se utiliza por defecto la primera URL cargada si se omite.
- `sidebar=1` — Vuelve a habilitar la barra lateral de documentación y tabla de contenidos, que están ocultas por defecto en modo incrustado.

## Claves de almacenamiento de sesión

La experiencia de iframe utiliza `window.sessionStorage` para recordar el estado mientras una pestaña del navegador permanece abierta. Normalmente, las aplicaciones del host no necesitan interactuar con estas claves, pero están enumeradas aquí para completar la información.

| Clave                     | Propósito                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| `unraidDocsIframe`        | Rastrea si la sesión actual se originó dentro de un iframe.                      |
| `unraidDocsTheme`         | Almacena el último tema de Docs utilizado para que las recargas sean coherentes. |
| `unraidDocsIframeEntry`   | Mantiene la ruta de entrada del iframe para el botón de retroceso de reserva.    |
| `unraidDocsIframeSidebar` | Marca si la barra lateral fue activada explícitamente.                           |

Un anfitrión puede borrar estas claves para restablecer el estado incrustado antes de abrir una nueva sesión de iframe.

## Constructores de URL de ejemplo

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

## Método recomendado

1. Decida qué ruta debe servir como punto de entrada del iframe y proporciónela mediante `entrada` al cargar el iframe.
2. Pase el tema del host actual si desea que el tema de los Docs coincida de inmediato.
3. Active `sidebar=1` solo cuando el diseño del host pueda acomodar el ancho de vista requerido para la barra lateral.
4. Al finalizar una sesión de iframe, opcionalmente borre las claves de sesión-almacenamiento para eliminar el estado residual antes de lanzar una nueva sesión en la misma pestaña.

## API de mensajería

Los documentos incrustados ofrecen una API `postMessage` ligera que informa sobre disponibilidad, navegación y cambios de tema mediante tipos de mensajes estructurados. Todos los mensajes comparten la estructura `{ source: "unraid-docs", type: string, ...payload }` para que los anfitriones puedan filtrar rápidamente el tráfico específico de los documentos.

### Mensajes emitidos desde el iframe

| Tipo                       | Contenido                         | Propósito                                                                                                          |
| -------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `unraid-docs:ready`        | `{ theme: "light" \\| "dark" }`  | Se activa una vez que el iframe ha aplicado su tema inicial.                                       |
| `unraid-docs:theme-change` | `{ theme: "light" \\| "dark" }`  | Se activa cada vez que el tema del iframe cambia (incluida la emisión inicial). |
| `unraid-docs:navigation`   | `{ pathname, search, hash, url }` | Se activa cada vez que ocurre una navegación dentro del iframe.                                    |

### Comandos aceptados por el iframe

| Tipo                    | Contenido                        | Propósito                                                         |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `unraid-docs:set-theme` | `{ theme: "light" \\| "dark" }` | Solicita un cambio de tema sin necesitar recarga. |

Ejemplo de controlador host:

```js
window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || data.source !== 'unraid-docs') {
    return;
  }

  if (data.type === 'unraid-docs:theme-change') {
    console.log('El tema de los Docs ha cambiado a', data.theme);
  }
});

function establecerTemaIframe(marco, tema) {
  if (!marco.contentWindow) {
    return;
  }

  marco.contentWindow.postMessage({
    source: 'unraid-docs',
    type: 'unraid-docs:set-theme',
    theme: tema,
  }, '*');
}
```

Consulte `iframe-test.html` para un ejemplo funcional que ejerza tanto mensajes salientes como entrantes.

### Compatibilidad con versiones anteriores

Para compatibilidad hacia atrás, el iframe sigue escuchando `{ type: "theme-update", theme }` y continúa emitiendo los mensajes históricos `theme-ready` y `theme-changed` junto con los nuevos tipos de mensajes. Los anfitriones deben migrar al contrato estructurado `unraid-docs:*` porque los eventos heredados se eliminarán en una futura versión. La página de prueba de ejemplo también muestra cómo difundir ambos formatos de mensajes durante el período de transición.
