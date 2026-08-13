# flips-byte.github.io

Mein Portfolio als Fachinformatiker für Anwendungsentwicklung.

**→ [flips-byte.github.io](https://flips-byte.github.io/)**

## Ohne Framework gebaut

Drei Dateien, keine Abhängigkeiten, kein Build-Schritt. Kein React, kein Tailwind,
kein GSAP, keine externe Anfrage zur Laufzeit.

| Datei | |
|---|---|
| `index.html` | Auszeichnung |
| `styles.css` | Gestaltung, gesamtes Layout |
| `main.js` | ein Scroll-Listener, zwei IntersectionObserver |

## Wie die Effekte funktionieren

Der Hero bleibt beim Scrollen stehen und der Titel wächst heraus. Das Pinning ist
CSS `position:sticky` — kein JavaScript. Nur die Werte für Skalierung, Deckkraft
und Weichzeichnung kommen aus `main.js`: ein passiver `scroll`-Listener, der pro
Bild einen `requestAnimationFrame`-Tick auslöst und den Scrollfortschritt über
eine `map()`-Funktion auf CSS-Werte abbildet.

Die Leiste am rechten Rand zeigt den Seitenfortschritt als Strecke. Das Einblenden
der Abschnitte und der aktive Punkt in der Navigation laufen über zwei
`IntersectionObserver`.

## Barrierefreiheit

- Ohne JavaScript bleiben alle Inhalte sichtbar und lesbar
- `prefers-reduced-motion` löst das Pinning auf, die Seite wird zu normalem Fluss
- Alle Textfarben erreichen mindestens 4,5:1 gegen den texturierten Grund
- Tastaturbedienbar, jede Station mit sichtbarem Fokusring

## Schriften

Bricolage Grotesque und IBM Plex liegen als Subsets im Repo und werden lokal
ausgeliefert — kein Google-CDN, keine Anfrage an Dritte.

Beide stehen unter der [SIL Open Font License 1.1](https://openfontlicense.org/).
Die Lizenztexte liegen unverändert bei den Schriftdateien:

- [`assets/fonts/LICENSE-Bricolage-Grotesque.txt`](assets/fonts/LICENSE-Bricolage-Grotesque.txt)
  — Copyright 2022 The Bricolage Grotesque Project Authors
- [`assets/fonts/LICENSE-IBM-Plex.txt`](assets/fonts/LICENSE-IBM-Plex.txt)
  — Copyright © 2017 IBM Corp., Reserved Font Name „Plex"

Die Subsets sind gegenüber den Originalen im Zeichenumfang reduziert; die OFL
erlaubt das ausdrücklich, solange Lizenz und Copyright-Vermerk mitgehen.
