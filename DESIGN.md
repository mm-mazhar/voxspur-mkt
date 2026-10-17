---
name: Voxspur
description: Voice agents that stay on track. Calls drawn as lines with stops, status shown as signal lamps; a night control room by default, a printed line map by day.
colors:
  # Accent
  signal-green: "oklch(0.76 0.19 150)"        # #37d16c  accent on dark
  signal-green-day: "oklch(0.72 0.19 150)"    # #20c45f  accent fills on light
  signal-ink: "oklch(0.24 0.06 155)"          # #002712  text on a green fill, both modes
  signal-deep: "oklch(0.50 0.125 152)"        # #12773d  accent as text or line on light
  # Dark (default)
  night-track: "oklch(0.145 0.006 165)"       # #080b09  page
  platform: "oklch(0.205 0.008 165)"          # #141816  raised surface
  wash-night: "oklch(0.27 0.008 165)"         # #232825  hover, secondary fill
  chalk: "oklch(0.985 0 0)"                   # #fafafa  text
  ballast-night: "oklch(0.71 0.012 165)"      # #9ba4a0  secondary text
  rail-night: "oklch(1 0 0 / 10%)"            # borders and rules
  # Light
  paper: "oklch(1 0 0)"                       # #ffffff  page
  ink: "oklch(0.16 0.008 165)"                # #0a0e0c  text
  wash-day: "oklch(0.967 0.003 165)"          # #f2f5f3  hover, secondary fill
  ballast-day: "oklch(0.50 0.014 165)"        # #5c6661  secondary text
  rail-day: "oklch(0.92 0.005 165)"           # #e2e6e4  borders and rules
  # Signals (status only)
  caution-amber: "oklch(0.80 0.16 75)"        # #f9ad26  dark
  caution-amber-day: "oklch(0.55 0.11 72)"    # #996516  light
  stop-red: "oklch(0.704 0.191 22.216)"       # dark
  stop-red-day: "oklch(0.577 0.245 27.325)"   # light
  # Extra lines (route diagrams and charts)
  line-blue: "oklch(0.70 0.13 245)"           # #4fa6e9  dark
  line-blue-day: "oklch(0.52 0.125 250)"      # #246cad  light
  line-violet: "oklch(0.70 0.13 300)"         # #ab8be3  dark
  line-violet-day: "oklch(0.52 0.14 300)"     # #7652ac  light
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 5rem)"
    fontWeight: 700
    fontStretch: "112%"
    lineHeight: 1.0
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.75rem)"
    fontWeight: 650
    fontStretch: "108%"
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.14em"
    textTransform: "uppercase"
  figure:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
    fontVariantNumeric: "tabular-nums"
rounded:
  sm: "calc(0.625rem - 4px)"
  md: "calc(0.625rem - 2px)"
  lg: "0.625rem"
  xl: "calc(0.625rem + 4px)"
  stop: "9999px"
spacing:
  gutter-sm: "1rem"
  gutter-md: "1.5rem"
  gutter-lg: "2rem"
  rail-width: "2px"
  stop-size: "0.875rem"
  section: "6rem"
  section-lg: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.signal-ink}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 1.5rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.chalk}"
    borderColor: "{colors.rail-night}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 1.5rem"
  card:
    backgroundColor: "{colors.platform}"
    textColor: "{colors.chalk}"
    borderColor: "{colors.rail-night}"
    rounded: "{rounded.xl}"
    padding: "1.5rem"
  stop-marker:
    size: "{spacing.stop-size}"
    borderWidth: "2px"
    borderColor: "{colors.signal-green}"
    backgroundColor: "{colors.night-track}"
    rounded: "{rounded.stop}"
  signal-lamp:
    size: "0.5rem"
    rounded: "{rounded.stop}"
---

# Design System: Voxspur

## Overview

**Creative North Star: "The Line"**

Voxspur builds voice agents that answer and place phone calls. The name is the brief: *vox* on a *spur*. A spur is a branch line that leaves the main line to reach one destination, and a call is a journey along a line. It starts somewhere, passes through stops (greet, qualify, book, transfer), sometimes branches, and ends. The product's own agent editor already draws calls this way: Start, Agent, End, joined by a path. The brand takes that picture and makes it the whole visual language.

So the site looks like a line map and its signalling, not like an AI product. Routes are thin lines with round stop markers. Status is a signal lamp with a word beside it. Lists of facts are timetables: ruled rows with figures in a monospace face. Where two systems meet (a phone carrier, a model provider, a CRM) there is an interchange.

The promise this makes is the one customers care about: calls that are dependable and stay on track.

**Two lights.** Dark is the default, a night control room: near-black with a slight green cast, chalk-white type, green signals. Light is the printed line map: white paper, ink, the same lines in a deeper green. Both are first-class. Every screen must be checked in both.

**Two registers.**
- The **marketing site** (`voxspur.com`) is the expressive layer: large Archivo headlines, the line running down the page, route diagrams, signal lamps, one piece of motion in the hero.
- The **app** (`app.voxspur.com`) is the operational layer: the same colours and the Geist faces it already uses, standard components, no ornament. The brand appears there as tokens only. See "App mapping".

**Key characteristics**
- One continuous line, with stops, as the organising device on marketing pages
- Signal Green marks things: stops, lamps, the primary button, focus. It never fills a section
- Hairline rules and ruled timetables, not card mosaics or heavy shadows
- Small monospace capitals for labels and all figures; never for sentences
- Every colour comes from a token; dark and light are both designed
- No gradients on text, no glow, no frosted glass, no purple

## Colors

A near-neutral base with a faint green cast (hue 165, very low chroma), one accent, and two status colours.

Tokens are named in the frontmatter. In CSS they map to the shadcn variable names the app already uses, so the site and the app share one vocabulary:

| CSS variable | Dark (default) | Light |
|---|---|---|
| `--background` | night-track | paper |
| `--foreground` | chalk | ink |
| `--card`, `--popover` | platform | paper |
| `--muted`, `--secondary`, `--accent` | wash-night | wash-day |
| `--muted-foreground` | ballast-night | ballast-day |
| `--border`, `--input` | rail-night | rail-day |
| `--signal` | signal-green | signal-green-day |
| `--signal-foreground` | signal-ink | signal-ink |
| `--signal-text` | signal-green | signal-deep |
| `--ring` | signal-green | signal-deep |
| `--caution` | caution-amber | caution-amber-day |
| `--destructive` | stop-red | stop-red-day |

Structure the stylesheet at the token level for two states. Dark values go on bare `:root` with `color-scheme: dark`. Light values go under `:root[data-theme="light"]` with `color-scheme: light`. The site does not follow the operating system setting: every visitor starts in dark, and light appears only when they choose it with the toggle, which remembers the choice. Components read tokens only; no colour is defined solely inside a media or theme block. `body` sets an explicit `background`.

### Accent
- **Signal Green** (`--signal`). The primary button fill, stop-marker rings, the travelling dot in the hero, the "live" lamp, link underlines, focus rings. On dark it is `signal-green`; on light fills it is `signal-green-day`.
- **Signal Ink** (`--signal-foreground`). The text on any green fill, in both modes: 8.1:1 on dark's green, 7.0:1 on light's. Never white: white on Signal Green is 1.9:1.
- **Signal Deep** (`--signal-text` in light). Green used as text or as a thin line on white paper: 5.7:1. The bright green is only 2.3:1 on white and must not be used for text or 1px lines there.

### Neutrals
- **Night Track / Paper**: the page.
- **Platform**: the raised surface in dark (cards, the nav after scroll). In light, cards are paper with a rule.
- **Chalk / Ink**: primary text. 18.9:1 and 19.4:1 on their pages.
- **Ballast**: secondary text and labels. 7.7:1 on night-track, 7.0:1 on platform, 6.0:1 on paper, 5.4:1 on wash-day.
- **Wash**: hover and secondary fills.
- **Rail**: every border and rule. In dark it is 10% white.

### Signals
Status uses the railway's own three aspects. They are separate from decoration and always come with a word.
- **Green, clear**: live, connected, answered, passed. The same Signal Green as the accent; that overlap is intended.
- **Amber, caution**: ringing, waiting, degraded, needs attention. 10.4:1 on night-track; the day variant is 5.0:1 on paper.
- **Red, stop**: failed, ended with an error, destructive actions. 6.8:1 on night-track; the day variant is 4.8:1 on paper.

### Extra lines
Route diagrams and charts sometimes need more than one line. The order is fixed: green first, then blue, then violet, then amber. All are at least 7:1 on night-track and 5:1 on paper in their day variants. Red is never a line colour; it means stop.

### Named rules
**The Token-Only Rule.** No raw palette classes, hex values or `rgba()` in components. Every colour resolves from a token or a `color-mix()` of tokens. Exceptions: third-party logos and raster images.

**The Signal-Not-Surface Rule.** Green marks; it does not fill areas. Buttons, stop markers, lamps, underlines, focus rings. No green section backgrounds, no green cards.

**The Ink-On-Signal Rule.** Text on a green fill is always Signal Ink. If a new green is introduced, retune `--signal-foreground`; do not override colours on individual buttons.

**The Deep-On-Paper Rule.** In light mode, green text and green hairlines use `--signal-text` (Signal Deep). In dark mode the same token is the bright green.

**The Lamp-And-Label Rule.** Status is never colour alone. A lamp always has a word next to it ("Live", "Ringing", "Failed"), so it works for colour-blind readers and in greyscale.

## Typography

**Display:** Archivo, variable, set slightly wide (stretch 108–112%). A plain grotesque with the weight and width of platform signage.
**Body:** Geist. The app already uses it, so the two feel like one product.
**Label and figures:** Geist Mono. Station codes, durations, prices, phone numbers, timetable columns.

Self-host all three as WOFF2 with `font-display: swap`. Do not load them from a third-party CDN: the app makes no outside requests and the site should hold to the same standard. Give every family a real fallback stack.

### Hierarchy
- **Display** (700, 2.75rem → 5rem, line-height 1.0, tracking −0.03em): the home hero `<h1>` and the `<h1>` of secondary pages. `text-wrap: balance`.
- **Headline** (650, 2rem → 2.75rem, line-height 1.08): section `<h2>`s.
- **Title** (600, 1.375rem): `<h3>` for stops, timetable groups, cards.
- **Body** (400, 1rem, line-height 1.6): paragraphs. Ledes are 1.125rem. Keep running text to about 65 characters (`max-width: 40rem`).
- **Label** (Geist Mono 500, 0.75rem, tracking 0.14em, uppercase): stop names, section tags, table headers, lamp words.
- **Figure** (Geist Mono, tabular numerals): any number that lines up with another.

### Named rules
**The Label-Not-Sentence Rule.** Monospace capitals are for labels of four words or fewer. Never a sentence, a button, or an error message.

**The Plain-Headline Rule.** Headlines say what the product does in ordinary words. No italic accent word, no gradient, no decorative underline. The line and its stops carry the personality; the type stays calm.

## Layout

One centred measure: `max-width: 72rem`, gutters of 1rem / 1.5rem / 2rem at base / 640px / 1024px. Sections breathe: `padding-block` 6rem, 8rem from 768px.

**The line.** On screens 1024px and wider, a 2px vertical rule runs down the left of the content column from the hero to the footer. Each section hangs off it at a stop marker, with the section's label beside the marker. Below 1024px the line is dropped and each section keeps its stop marker and label above its headline. The line is decoration: it is `aria-hidden`, and the page reads correctly without it.

**Numbering is information.** Stops are numbered only where order is real: the steps to go live, the path of a call. Sections that are not a sequence (features, pricing, FAQ) get a name on their stop, not a number.

**Timetables, not card grids.** Features, comparisons, pricing rows and FAQs are ruled rows: a label column, the content, and where it helps a figure column aligned right. Build shared grids with `border-top` and `border-left` on the container and `border-right` and `border-bottom` on the cells, so rules never double.

**Responsive.** Every multi-column layout collapses to one column below 768px. Give any flex or grid child that holds text, code or a table `min-width: 0`. Only tables, route diagrams and code blocks may be wider than the screen, each inside its own `overflow-x: auto` container. The page body never scrolls sideways.

## Elevation and depth

Flat. Depth comes from tone and hairlines. In dark, cards lift by sitting on Platform against Night Track. In light, they lift by a rule alone. One shadow exists, for things that float over content (menus, the mobile nav sheet): `0 16px 40px -16px color-mix(in oklab, var(--foreground) 35%, transparent)`.

**The No-Glass Rule.** No frosted panels. Backdrop blur is allowed only on the fixed header once the page has scrolled, because content moves beneath it.

## Shapes

One radius token, 0.625rem, the same as the app. Buttons and inputs use `md`, cards `xl`, tags `sm`. Stop markers and lamps are full circles. Lines turn corners with a quarter-circle of radius 12px, never a sharp mitre and never a free curve: line maps use straight runs and consistent arcs.

## Components

### Buttons
- **Primary:** Signal Green fill, Signal Ink text, semibold, at least 44px tall, `md` radius. One per view.
- **Outline:** transparent, rail border, foreground text. The secondary action beside a primary.
- **Hover:** fill shifts 6% toward the foreground with `color-mix`. **Focus:** 2px `--ring` outline, 2px offset, on `:focus-visible`.
- Labels say what happens: "Start building", "See pricing", "Sign in". Not "Get started" where something more specific is true.

### Navigation
- **Header:** fixed; transparent at the top of the page, gaining a Platform (or Paper) background with a bottom rule after 48px of scroll. Wordmark left, links centre in Ballast that darken to the foreground on hover, "Sign in" (outline) and the primary action right. Links have 44px hit areas. On small screens the links move behind a toggle that sets `aria-expanded` and `aria-controls`.
- **"Sign in"** always goes to the app's login. It is a real link, not a script.
- **Footer:** the end of the line. A terminus marker, then a ruled index of links, then the legal line. Privacy and Terms live here.

### Cards
Used sparingly, for things that are objects: a pricing plan, a testimonial. Platform fill (paper in light), rail border, `xl` radius, 1.5rem padding, no shadow. The featured plan is marked by a Signal Green top rule, not a glow.

### Forms
Visible `<label>` on every field. Rail border, transparent fill, `md` radius, 44px tall. Focus moves the border to `--ring`. Errors use `role="alert"`, are linked with `aria-describedby`, and say what went wrong and how to fix it. Forms on a static site have nowhere to post by themselves: say so in the build plan and wire each one to a real endpoint before it ships.

### Stop marker (signature)
A 14px circle: 2px Signal Green ring, page-colour centre. It sits on the line. A stop that is the current step, or the end of a route, is filled green. Beside it, a Label: a name (`FEATURES`), or a number and name where order is real (`02 · CONNECT A NUMBER`).

### Signal lamp (signature)
An 8px filled circle followed by a Label word. Green "Live", amber "Ringing", red "Failed". Used in the hero diagram, in status lines, in the pricing table for what is included. A lamp may pulse once on entry; it does not blink.

### Route diagram (signature)
The picture of a call. Stops joined by 2px lines, left to right on wide screens and top to bottom on narrow ones. Branches leave at 45° through a 12px arc and run parallel. The main route is green; a branch (for example "transfer to a person") takes the next line colour. Each stop has a Label beneath it and, where useful, a figure ("0:04"). Drawn as inline SVG with every shape given an explicit `fill` or `stroke` from the tokens, a `<title>`, and `role="img"`. The hero diagram shows one real call path, for example: caller rings, agent greets, agent qualifies, then either books or transfers, call ends.

### Timetable (signature)
Ruled rows for anything list-like. Header row in Labels. Figures in Geist Mono, tabular, right-aligned. Rows fill with Wash on hover where they are links. Pricing, feature comparison, supported providers and FAQ all use it. An FAQ row is a disclosure: the heading wraps a button with `aria-expanded` and `aria-controls`.

### Interchange (signature)
Where Voxspur meets another system. Two or more lines converge on a wider "capsule" stop, with the outside systems labelled around it. Used for the integrations section. Name only providers the product supports today (see "Voice and claims"). Use each provider's name in text; do not redraw their logos.

## Motion

One orchestrated moment: in the hero, the route draws itself from the first stop to the last over about two seconds, then a single green dot travels the main line on a slow loop. Nothing else on the page moves on its own.

- Use `transform` and `opacity` only. Easing `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Everything is visible at rest. A section may reveal from a visible state; nothing waits at `opacity: 0` for a scroll observer.
- Under `prefers-reduced-motion: reduce`, the route is drawn complete and the dot is still.
- Because the dot loops for longer than five seconds, the hero has a visible Pause control.
- Hover and focus transitions are 120–160ms.

## Voice and claims

Write the way a knowledgeable person talks. Short sentences. Name things as customers know them: "phone number", "call", "transfer", not "telephony configuration" or "workflow run".

**What Voxspur is.** A platform for building AI voice agents that answer and place phone calls. Customers describe what the agent should do, connect a phone number, and test the call in the browser.

**What may be said today.** Only what the product does now:
- Inbound and outbound calls; outbound campaigns
- Bring your own keys for the language model, the voice and the transcriber
- Phone numbers through Twilio, Telnyx, Plivo, Exotel, Cloudonix, or your own SIP via Asterisk
- Transfer a call to a person, with an optional spoken handover
- A widget to put an agent on a website
- Call recordings, transcripts and run history
- Tools the agent can call during a conversation
- A knowledge base: upload documents and the agent looks up answers in them during a call. It reads PDFs with selectable text, Word `.docx` files, plain text, Markdown and JSON. It uses the customer's own embeddings key, like the other bring-your-own-keys services

**What may not be said yet.**
- Any price other than the one in the site config, and any plan detail the product cannot deliver yet: concurrency limits, credit amounts, free tiers, discounts.
- That the knowledge base reads scanned documents, photos of pages, legacy `.doc` files or password-protected PDFs. It does not. Do not promise a document size or count either; no limit has been measured.
- Partner features that do not exist yet, such as white-label, client sub-accounts or consolidated billing. The partner program is in early access: say so, and do not promise a payout method, a payout minimum or legal terms beyond the FAQ on `/partners`.
- "Open source". Voxspur is sold as a hosted product.
- Uptime figures, customer counts, testimonials or logos that are not real.

**Pricing.** One public price: a platform fee, currently 1 cent. The amount, the currency and the unit it is charged per are values in the site config and are never typed into a page. Wherever the price appears, say plainly that the customer pays their own model, voice and phone providers directly; the fee covers the platform only. The partner program shows the partner share from the site config, and its action is an application by email ("Apply for early access" while in early access).

**Attribution.** Voxspur is built on Dograh, which is BSD-2-Clause licensed. That credit lives in the product's README and licence file. The marketing site does not use the Dograh name or logo.

**Privacy line.** The app loads nothing from third parties and sends nothing to them unless the customer connects a provider. The site should be able to say the same about itself: self-hosted fonts, no tracking scripts by default. If analytics are added later, say so on the Privacy page.

## Site map

A static site. These pages and nothing else:

| Page | Purpose |
|---|---|
| `/` | What Voxspur is, the route diagram, how to go live (a real three-step sequence), what it connects to, the primary action |
| `/partners` | The partner program for people who build voice agents for clients: the share, how it works, a worked example computed from the config, FAQ. The action is an application by email. `/agencies` redirects here |
| `/privacy`, `/terms` | Required before taking customers |
| `/pricing` | Two cards: pay as you go (the platform fee from the site config, action "Get started") and Partner program (the partner share from the site config, action "Apply for early access") |

Every page has exactly one `<h1>`, a short `<title>` that names the page, and a one-sentence meta description. The wordmark is never a heading.

## Site config

One file holds everything that names or prices the product, so a rename, a new logo or a price change is an edit to that file and nothing else:

- Product name, tagline and the one-sentence description used in meta tags
- Logo and mark file paths, and their alt text
- The app's address, and the "Get started" and "Sign in" links built from it
- The "Contact us" link
- The partner program: share, application email, status (early access or live) and the minutes in the worked example
- Pricing: amount, currency, the unit it is charged per, and the plan names
- Footer links (privacy, terms)

No page, component or meta tag contains the product name, a price or one of these links as literal text. Until the app is hosted, "Get started", "Sign in" and "Contact us" may point to `#`.

## Assets

The artwork is final as of 6 Oct 2026. The same files live in the app repository at `ui/public/` and in the site's `public/` folder, under the same names, so both projects update together.

| File | What it is | Where it is used |
|---|---|---|
| `voxspur-mark.svg` | The mark on its dark plate, 500 by 500 | App sidebar, anywhere a square mark is wanted, 24px and up |
| `voxspur-logo.svg` | Mark and wordmark for light surfaces, 906 by 200 | Header and footer in light, the app's login page |
| `voxspur-logo-inverse.svg` | The same for dark surfaces | Header and footer in dark |
| `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` (site) and `ui/src/app/favicon.ico` (app) | Small-size drawings of the mark | Browser tabs and home screens |

**The mark.** A dark plate; an inbound rail in chalk; a spur turnout in Signal Green forming a "V" for Vox that climbs to an acoustic spur rowel with forward voice flare and central transit bullseye. It is the line-map language of the rest of the system, uniting voice acoustics with transit routing.

**The wordmark.** "Voxspur" in Archivo, weight 700, width 112, converted to outlines so no font has to load. Chalk on dark, ink on light.

**Small sizes.** Below 48px the mark is redrawn with heavier strokes (54px) and boosted rowel points. `favicon.svg` and the `.ico` files use that drawing. Do not scale `voxspur-mark.svg` down to 16px.

**Rules.**
- Use the files as they are. Do not recolour, outline, rotate or add effects.
- Keep clear space around the logo of at least the height of the letter "x" in the wordmark.
- The plate's colours are fixed (plate `#141816`, chalk `#fafafa`, Signal Green `#37d16c`), so one mark works on dark and on light.
- The logo's size on a page comes from the site config (`logo.width`, `logo.height`), not from numbers typed into a component.
- The icon files are committed artwork. There is no script that regenerates them; a change to the mark means exporting them again.

## App mapping

How this system reaches the app. The change is confined to `ui/src/app/globals.css` in the app repository (its folder is still named `voxrail`), which is the only file that defines these variables. Applied on the `feat/brand-palette` branch, 4 Oct 2026.

| App variable | Light | Dark |
|---|---|---|
| `--cta` (active nav item, accent buttons, accent text) | `signal-deep` | `signal-green` |
| `--cta-foreground` (text on a `--cta` fill) | near-white `oklch(0.985 0 0)`, 5.4:1 | `signal-ink`, 8.1:1 |
| `--ring`, `--sidebar-ring` | `signal-deep` | `signal-green` |
| `--sidebar-primary` / `-foreground` | `signal-deep` / near-white | `signal-green` / `signal-ink` |
| `--chart-1` … `--chart-5` | deep green, blue, violet, amber, grey | green, blue, lavender, amber, grey |
| neutrals (`--foreground`, `--card`, `--muted`, `--border`, `--sidebar` …) | the hue-165 neutrals above | the hue-165 neutrals above |
| `--primary` (default buttons) | neutral, unchanged in role | neutral, unchanged |

**Why the app's light mode differs from the site's.** On the site, a light-mode primary button is bright `signal-green-day` with Signal Ink text. In the app, one token (`--cta`) is used both as a fill and as text (`text-cta`), and the bright green is only 2.3:1 as text on white. So the app's light mode uses Signal Deep for both, with near-white text on the fill. Both pairings pass 4.5:1.

**Why `--primary` stays neutral.** The app has many buttons per screen; turning them all green would break the Signal-Not-Surface Rule. Green is kept for the action that matters on a screen, for active state, and for live status.

**Chart colours** step in lightness as well as hue so neighbouring series stay apart. Green and amber are still hard to tell apart for people with red-green colour blindness: label series directly, and don't rely on a legend alone, once a chart has four or more series.

**Not covered by tokens.** A few app elements use fixed colours in their components and are unchanged: the orange "begin" and "finish" labels in the flow editor, the amber "Unsaved changes" tag, and the blue onboarding highlight. Changing them means editing upstream component files.

## Do's and don'ts

### Do
- Draw every colour from a token, and check dark and light.
- Use Signal Ink on green fills, and Signal Deep for green text or hairlines on paper.
- Give every status lamp a word.
- Number stops only where the order is real.
- Present lists as ruled timetables with figures in Geist Mono.
- Make every interactive target at least 44px.
- Keep the page complete at rest, and give the hero's loop a Pause control.
- Self-host fonts and keep third-party scripts off the site.
- Say only what the product does today.

### Don't
- Fill sections or cards with green.
- Put white text on green.
- Use purple, gradient text, glow, shine borders or frosted glass.
- Set sentences, buttons or errors in monospace capitals.
- Add waveform or microphone clip-art. The line is the motif. The acoustic spur rowel in the mark is the only sound-wave shape in the system; do not repeat it as decoration.
- Show provider logos, customer logos or testimonials that were not supplied.
- Mention Dograh or "open source" on the marketing site.
- Type the product name, a price or an app link into a page. They come from the site config.
- Bring line-map ornament into the app. The app gets tokens, not decoration.
