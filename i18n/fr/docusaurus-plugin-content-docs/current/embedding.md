# Intégration des Documents Unraid

Utilisez les directives suivantes lors du chargement de la documentation Unraid dans une interface pilotée par iframe. Les paramètres de requête couvrent les options de configuration les plus courantes, et une API `postMessage` est disponible pour les hôtes nécessitant une coordination dynamique.

## Paramètres de Requête Requis

- `embed=1` — Adapte la page aux ajustements spécifiques à l'iframe (cache la barre de navigation globale, le pied de page, etc.). Incluez ce paramètre dans chaque URL intégrée.

## Paramètres de Requête Optionnels

- `theme=<light|dark>` — Force le thème initial des Docs. La valeur est conservée pour la session iframe afin que les rechargements restent cohérents.
- `entry=<path>` — Indique le point d'entrée logique pour la session iframe. Fournissez un chemin docs absolu (ex. `/unraid-os/...`) ou une URL entière ; l'UI intégrée affiche une icône retour flottante qui ramène les visiteurs vers ce chemin et se dissimule tant que vous restez dessus. Par défaut, c'est l'URL chargée en premier lieu si omis.
- `sidebar=1` — Réactive la barre latérale de documentation et la table des matières, qui sont masquées par défaut en mode intégré.

## Clés de stockage de session

L'expérience iframe utilise `window.sessionStorage` pour se souvenir de l'état tant qu'un onglet du navigateur reste ouvert. En général, les applications hôtes n'ont pas besoin d'interagir avec ces clés, mais elles sont listées ici pour plus de complétude.

| Clé                       | But                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| `unraidDocsIframe`        | Indique si la session en cours a commencé à l'intérieur d'un iframe.               |
| `unraidDocsTheme`         | Stocke le dernier thème Docs utilisé pour que les rechargements restent cohérents. |
| `unraidDocsIframeEntry`   | Contient le chemin d'entrée de l'iframe pour le bouton de retour.                  |
| `unraidDocsIframeSidebar` | Indique si la barre latérale a été explicitement activée.                          |

Un hôte peut effacer ces clés pour réinitialiser l'état embarqué avant d'ouvrir une nouvelle session iframe.

## Constructeurs d'URL d'exemple

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

## Flux de l'hôte recommandé

1. Décidez quelle route doit servir de point d'entrée de l'iframe et fournissez-la via `entry` lors du chargement de l'iframe.
2. Passez le thème hôte actuel si vous souhaitez que le thème Docs corresponde immédiatement.
3. Activez `sidebar=1` uniquement lorsque la disposition de l'hôte peut accueillir la vue étendue requise pour la barre latérale.
4. Lors de la fermeture d'une session iframe, vous pouvez effacer les clés de stockage de session pour supprimer l'état résiduel avant de lancer une nouvelle session dans le même onglet.

## API de messagerie

Les documents intégrés exposent une API légère `postMessage` qui signale les états de préparation, les navigations et les changements de thème en utilisant des types de messages structurés. Tous les messages partagent la forme `{ source: "unraid-docs", type: chaîne, ...payload }` pour que les hôtes puissent filtrer rapidement le trafic spécifique aux documents.

### Messages émis depuis l'iframe

| Type                       | Chargement utile                  | But                                                                                                                  |
| -------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `unraid-docs:ready`        | `{ theme: "light" \\| "dark" }`  | Émis une fois que l'iframe a appliqué son thème de démarrage.                                        |
| `unraid-docs:theme-change` | `{ theme: "light" \\| "dark" }`  | Émis chaque fois que le thème de l'iframe change (y compris l'émission initiale). |
| `unraid-docs:navigation`   | `{ pathname, search, hash, url }` | Émis à chaque navigation dans l'iframe.                                                              |

### Commandes acceptées par l'iframe

| Type                    | Chargement utile                 | But                                                                             |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| `unraid-docs:set-theme` | `{ theme: "light" \\| "dark" }` | Demande un changement de thème sans nécessiter de rechargement. |

Exemple de gestionnaire hôte :

```js
window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || data.source !== 'unraid-docs') {
    return;
  }

  if (data.type === 'unraid-docs:theme-change') {
    console.log('Le thème des documents a été changé pour', data.theme);
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

Référez-vous à `iframe-test.html` pour un exemple fonctionnel qui montre comment gérer les messages sortants et entrants.

### Compatibilité héritée

Pour la compatibilité descendante, l'iframe écoute toujours `{ type: "theme-update", theme }` et continue d'émettre les messages historiques `theme-ready` et `theme-changed` en parallèle avec les nouveaux types de messages. Les hôtes doivent migrer vers le contrat structuré `unraid-docs:*` car les événements hérités seront supprimés dans une future version. La page de test d'exemple démontre également comment diffuser les deux formats de messages durant la période de transition.
