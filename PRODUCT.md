# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary Audience:** Developers, engineering teams, and businesses building and deploying AI voice agents for phone calls.
- **Secondary Audience:** Agencies and consultants managing AI voice agents on behalf of client accounts.
- **User Situation:** Need reliable, deterministic handling of inbound and outbound phone conversations without unpredictable execution or vendor lock-in.

## Product Purpose

Voxspur is a hosted platform for building, testing, and operating AI voice agents that handle phone calls. Users define agent conversation paths, connect phone numbers, test agents in the browser, and monitor live call logs. Success means voice agents that predictably follow defined conversation steps ("rails"), execute tool calls, and hand off calls seamlessly when required.

## Positioning

- **Core Tagline:** "Voice agents that stay on track."
- **Differentiating Mechanism:** Structured call flow paths (visualized as lines with stops for greeting, qualification, booking, and transfer) paired with Bring-Your-Own-Keys (BYOK) for LLMs, voice synthesis, transcribers, and carriers (Twilio, Telnyx, Plivo, Exotel, Cloudonix, or custom Asterisk SIP).
- **Value Claim:** Predictable execution with a flat 1¢/minute platform fee, letting customers pay provider costs directly.

## Operating Context

- **Marketing Site (`voxspur.com`):** Static Astro site serving as the expressive, high-trust entry point explaining platform mechanics, pricing, agency capabilities, and legal terms.
- **Product Application (`app.voxspur.com`):** Separate application repository where users configure agents, credentials, and call routing.
- **Future Touchpoints:** Interactive demo widgets or live web call previews planned for the marketing site.

## Capabilities and Constraints

### Confirmed Capabilities
- Inbound and outbound phone calls, plus outbound campaign scheduling.
- BYOK integration for language models, voice synthesis, and STT transcribers.
- Carrier & SIP support: Twilio, Telnyx, Plivo, Exotel, Cloudonix, or custom SIP via Asterisk.
- Live call transfer to human operators with optional spoken handover.
- Embeddable website voice agent widget.
- Call recordings, full transcripts, and execution run history.
- Real-time agent tool calling during active calls.
- Knowledge base: upload documents (PDF with selectable text, Word `.docx`, plain text, Markdown, JSON) and the agent looks up answers during a call, using the customer's own embeddings key. Working since 6 Oct 2026. It does not read scanned documents, legacy `.doc` files or password-protected PDFs.

### Planned Capabilities
- Interactive demo widgets and live web call previews directly on marketing pages.

### Strict Constraints
- **Static Output:** Plain HTML/CSS build via `astro build` into `dist/` with no server runtime or adapter.
- **Single Config File:** All names, links, prices, and plan text exist exclusively in `src/config/site.ts`. No literal prices or product names in templates or styles.
- **Token-Only Design:** Colors derived strictly from CSS variables in `global.css`. Dark theme default with user-toggleable light mode.
- **Zero Third Parties:** No external analytics, tracking scripts, CDN links, or remote fonts (all WOFF2 fonts self-hosted in `public/fonts/`).
- **Minimal JavaScript:** Vanilla scripts only for theme toggle, hero motion pause, header scroll state, and mobile navigation.
- **Truthful Copy:** No fabricated testimonials, customer logos, uptime figures, concurrency limits, or unreleased feature claims (e.g., the knowledge base cannot read scanned documents, so the site must not say it can).

## Brand Commitments

- **Product Name:** Voxspur (configured in `src/config/site.ts`). Renamed from Voxrail on 6 Oct 2026; the domain `voxspur.com` is registered. The project folder and package keep the name `voxrail-mkt`.
- **Logo:** A main line with a green spur that ends at a stop marker, with two arcs spreading from the stop. Final artwork, described under "Assets" in `DESIGN.md`.
- **Visual Motif:** "The Line" — railway line-map typography, signal lamps, stop markers, ruled timetable grids, and control-room aesthetics.
- **Color Logic:** Hue-165 neutral base (`night-track` dark, `paper` light), Signal Green (`--signal`) accent for actions/markers, amber caution, red stop aspect. Text on Signal Green must always use Signal Ink (`--signal-foreground`).

## Evidence on Hand

- **Design System:** [`DESIGN.md`](file:///c:/Users/maz/dev/Projects_/AI-VoiceAgents/voxrail-mkt/DESIGN.md)
- **Agent Rules:** [`AGENTS.md`](file:///c:/Users/maz/dev/Projects_/AI-VoiceAgents/voxrail-mkt/AGENTS.md)
- **Site Configuration:** [`src/config/site.ts`](file:///c:/Users/maz/dev/Projects_/AI-VoiceAgents/voxrail-mkt/src/config/site.ts)
- **Brand Assets:** `public/voxspur-logo.svg`, `public/voxspur-logo-inverse.svg`, `public/voxspur-mark.svg`, `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`

## Product Principles

1. **Predictability Over Magic:** Call flows follow clear, structured rails; visual design and messaging emphasize control, order, and dependability.
2. **BYOK Sovereignty:** Customers retain total control of their model, voice, and telephony keys and underlying costs.
3. **Strict Truthfulness:** Present only existing capabilities without synthetic social proof or speculative promises.
4. **Single-Config Integrity:** Product attributes and pricing exist in exactly one place.
5. **Privacy First:** Zero third-party scripts, zero tracking, self-hosted assets.

## Accessibility & Inclusion

- Target WCAG 2.1 AA compliance across dark and light themes.
- Touch/interactive targets at least 44px x 44px.
- Visible focus rings (`2px` `--ring` with `2px` offset).
- Minimum text contrast 4.5:1 in both modes.
- Signal lamps always combine color aspect with a label word ("Live", "Ringing", "Failed") for color-blind accessibility.
- Support `prefers-reduced-motion` across all hero animations.
