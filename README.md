# Marketing site

A static marketing site built with Astro and Tailwind. `npm run build` writes a
plain `dist/` folder that any static host can serve. There is no server, no
adapter and no backend; there is no contact form.

`DESIGN.md` is the source of truth for colour, type, layout, components,
motion, wording and the site map. `reference/` holds the design this one
replaced; nothing is taken from it.

## Commands

All commands run from the project root, in Windows `cmd`:

```
npm install            install dependencies
npm run dev            start the dev server at http://localhost:4321
npm run build          type-safe production build into dist\
npm run preview        serve dist\ locally
npm run check          astro check (TypeScript, strict)
npm run fonts          re-copy the WOFF2 files into public\fonts\
```

## One file for brand, links and price

`src/config/site.ts` is the only place the product name, the logo paths, the
app address, the contact link and the price exist. A rename, a new logo or a
price change is an edit to that file and nothing else. No page, component,
title or meta tag contains any of those as literal text.

The price is built from `pricing: { amount, currency, unit }` by the helpers in
the same file. Never type a price into a page.

While `appUrl` is empty, "Get started" and "Sign in" resolve to `#`. Set
`appUrl` to the app's address (no trailing slash) and they become
`{appUrl}/auth/signup` and `{appUrl}/auth/login`.

## Pages

| Route | What it is |
| --- | --- |
| `/` | What the product is, the route diagram, how to go live, what it connects to, the primary action |
| `/pricing` | Two plans: the platform fee, and the partner program |
| `/partners` | The partner program: the share, how it works, a worked example, FAQ, apply by email |
| `/agencies` | Redirects to `/partners` (set in `astro.config.mjs`) |
| `/privacy` | Draft. `noindex`. |
| `/terms` | Draft. `noindex`. |

`/privacy` and `/terms` are structure with placeholder wording. Each carries a
notice listing what has to be supplied before it can ship. Neither has been
reviewed and neither is in force.

## Theme

Dark is the default. Light appears only when the visitor chooses it with the
toggle, which remembers the choice in `localStorage` under `site-theme`. A
blocking script in `<head>` applies the stored choice before the first paint,
so the page never flashes the wrong theme. The site does not follow the
operating system setting.

Tokens live in `src/styles/global.css`: dark on bare `:root`, light under
`:root[data-theme="light"]`. Components read tokens only. No colour appears in
a component except through a token.

## JavaScript

There is no UI framework and nothing hydrates. The site ships six small vanilla
scripts:

- the theme toggle
- the header's scrolled state (it gains a surface after 48px)
- the mobile menu button (`aria-expanded` / `aria-controls`)
- the **Pause motion** control, which stops every decorative loop on the page
- the use-case tabs (arrow keys, Home and End; without scripts every panel is
  shown in a stack)
- the "Talk to our AI agent" button, which loads the Voxspur widget from the
  app's own domain **when it is clicked**, and not before

Nothing else runs. There are no analytics and no third-party scripts, and the
fonts are served by the site itself.

## Switches in the config

`src/config/site.ts` carries these, all off or empty by default:

| Field | What it does |
| --- | --- |
| `bookCallUrl` | Where "Book a call" goes. Empty hides every "Book a call" (header, hero, closing call to action, footer). |
| `docsUrl` | The documentation. Empty hides the "Docs" links. |
| `demoAgentEnabled`, `demoAgentScriptUrl`, `demoAgentToken` | The talk button. Off: it opens the booking link, or is hidden if there is none. On: it loads `demoAgentScriptUrl` on click and sets the token as the script's `data-voxspur-context`. Paste both values from the app's Embed dialog once it is hosted. |
| `showEnterprise` | The "run it on your own infrastructure" band. Not offered today, so it stays off until it is true. |
| `siteUrl` | The address the site is served from. The share address and share image links are built from it. |
| `ogImage` | The expected size of the share image. The file is `src/assets/og-card.png`; until it exists no image tags are written. |
| `integrations`, `features`, `useCases` | What the marquee, the feature list and the tabs show. Each entry has `status: "live"` or `"soon"`; "soon" shows a badge, and going live is one word. |

Clicking the talk button when it is on requests a script from the app's domain,
so the Privacy page should say so before the switch is turned on.

## Motion

The home page has three decorative loops: the voice waves in the hero, the
integrations marquee, and the transcript in the call card. Each sits in a
wrapper with the `motion` class. They stop when the visitor chooses "Pause
motion" in the header (which sets `data-motion="paused"` on `<html>`) and under
`prefers-reduced-motion`. Everything is drawn complete at rest. The rules are in
the Motion block of `src/styles/global.css`.

## The hero visual

The hero's visual is `src/components/VoiceWaves.astro`, three rows of CSS bars
(`Bars.astro`) with the talk button on a plate over the middle row. The bars are
drawn from a seeded generator in `src/lib/waves.ts`, so a build always draws the
same waves. `src/components/hero/RouteDiagram.astro`, the earlier hero visual, is
no longer used on the home page and is kept as the system's route diagram.

## Assets

`public/voxspur-logo.svg`, `public/voxspur-logo-inverse.svg` and
`public/voxspur-mark.svg` are the final artwork. The same files, under the same
names, are in the app repository at `ui/public/`, so both projects update
together. `favicon.svg`, `favicon.ico` and `apple-touch-icon.png` are small-size
drawings of the mark and are committed as artwork; no script generates them.
The logo's intrinsic size is in the site config (`logo.width`, `logo.height`).
"Assets" in `DESIGN.md` describes the mark and the rules for using it.

Fonts are self-hosted WOFF2 in `public/fonts/`, committed to the repository and
regenerated by `npm run fonts` from the Fontsource dev dependencies. Archivo is
loaded from its `wdth` build because the display and headline styles set
`font-stretch` above 100%.

Provider logos for the "Works with" marquee are in `src/assets/logos/`, with
their source and licence in the README there. Optional generated artwork goes in
`src/assets/art/`; the README there lists each slot with its size and a prompt,
and the page looks complete without any of it.
