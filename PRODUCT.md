# Product

<!-- impeccable:product-schema 1 -->
<!-- Capabilities updated 28 Oct 2026 -->

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
- **Differentiating Mechanism:** Structured call flow paths (visualized as lines with stops for greeting, qualification, booking, and transfer) paired with Bring-Your-Own-Keys (BYOK) for language models, voice synthesis, transcribers, and carriers (Twilio, Telnyx, Vonage, Plivo, Exotel, Vobiz, Cloudonix, or Asterisk through ARI).
- **Value Claim:** Predictable execution with a flat 1¢/minute platform fee, charged by the second against prepaid credit, letting customers pay provider costs directly.

## Operating Context

- **Marketing Site (`voxspur.com`):** Static Astro site serving as the expressive, high-trust entry point explaining platform mechanics, pricing, the partner program, and legal terms.
- **Product Application (`app.voxspur.com`):** Separate application repository where users configure agents, credentials, and call routing.
- **Future Touchpoints:** A "Talk to our AI agent" demo on the home page. The code is in and switched off (`demoAgentEnabled` in the config) until the app is hosted and its embed snippet is pasted in.

## Capabilities and Constraints

### Confirmed Capabilities

Working in the app as of 28 Oct 2026. The site may describe these.

**Calls and building**
- Inbound and outbound phone calls, plus outbound campaigns from a list.
- A visual, multi-step agent builder. Agents can be tested in the browser before a number is connected.
- Live call transfer to a person, with an optional spoken handover.
- Real-time tool calling during a call: HTTP tools and MCP tools. Webhooks.
- A knowledge base: upload documents (PDF with selectable text, Word `.docx`, plain text, Markdown, JSON) and the agent looks up answers during a call, using the customer's own embeddings key. It does not read scanned documents, legacy `.doc` files or password-protected PDFs. No size or count limit has been measured.
- Call recordings, full transcripts and run history.
- A web widget that puts an agent on a website. The app serves it as `/embed/voxspur-widget.js`; it defines the global `VoxspurWidget` and reads its token from `data-voxspur-context`.
- Team workspaces with owner, admin and member roles.

**Bring your own keys**
- Language models: named model configurations, each with fallback models.
- Models and voices: OpenAI, OpenRouter, Google Gemini, Groq, Azure, ElevenLabs, Deepgram, Cartesia, MiniMax, Sarvam. The app's list does not say which of these serve models and which serve voices; the site's marquee files MiniMax under models, and the other split follows the product brief.
- Speech-to-text: AssemblyAI, Azure Speech, Cartesia, Deepgram, ElevenLabs, Gladia, Google, OpenAI, Sarvam, Smallest AI, Soniox, Speechmatics.
- Telephony: Twilio, Telnyx, Vonage, Plivo, Exotel, Vobiz, Cloudonix, and Asterisk through ARI.

**Billing**
- Prepaid credit. The platform fee is 1¢ per minute, charged per second.
- Automatic top-up, and a minimum balance to start a call.
- No subscription.

**Partner program (early access)**
- The partner earns a share of a managed client's platform fees (`partner.sharePercent` in the config), for as long as they manage the client. No monthly fee and no minimum number of clients.
- Payouts are monthly, once earnings reach the payout minimum (`partner.payoutMinimum`, currently $50).

**Outbound calling**
- The customer is responsible for consent, permitted calling hours and honouring opt-outs. The platform does not yet provide tools for them (see below).

### Not Yet Available

The site may list these only as "coming soon", and never in the hero or the pricing band. Each has `status: "soon"` in the config, and moving to `"live"` is a config change.

- WhatsApp calls. The code is in, for inbound calls only, and has not been tested end to end.
- Ready-made agent templates for common businesses.
- CRM and booking integrations: HubSpot, GoHighLevel, Zendesk, Cal.com.
- Lost-call recovery: a daily list of callers the agent could not help, to call back.
- Outbound compliance controls: consent records, calling hours, opt-out handling.
- Running Voxspur on a customer's own infrastructure. It is sold as a hosted product. The enterprise band on the home page says otherwise, so it is off (`showEnterprise: false`).

### Strict Constraints
- **Static Output:** Plain HTML/CSS build via `astro build` into `dist/` with no server runtime or adapter.
- **Single Config File:** All names, links, prices, and plan text exist exclusively in `src/config/site.ts`, as do the lists of integrations, features and use cases with their `live` or `soon` status, and the switches `bookCallUrl`, `docsUrl`, `demoAgentEnabled` and `showEnterprise`. No literal prices or product names in templates or styles.
- **Token-Only Design:** Colors derived strictly from CSS variables in `global.css`. Dark theme default with user-toggleable light mode.
- **Zero Third Parties:** No external analytics, tracking scripts, CDN links, or remote fonts (all WOFF2 fonts self-hosted in `public/fonts/`).
- **Minimal JavaScript:** Vanilla scripts only for the theme toggle, the shared "Pause motion" control, the header's scroll state, the mobile menu, the use-case tabs, and the talk button, which loads the widget from our own app domain on click and nothing before.
- **Truthful Copy:** No fabricated testimonials, customer logos, uptime figures, concurrency limits, or unreleased feature claims (e.g., the knowledge base cannot read scanned documents, so the site must not say it can). Sample dialogue is generic and always labelled "Example". The "Works with" section lists providers the app supports; it is not a customer list.

## Brand Commitments

- **Product Name:** Voxspur (configured in `src/config/site.ts`). Renamed from Voxrail on 6 Oct 2026; the domain `voxspur.com` is registered. The project folder and package keep the name `voxrail-mkt`.
- **Logo:** Inbound chalk rail and Signal Green spur forming a "V" turnout that climbs to an acoustic spur rowel with forward voice flare and central transit bullseye. Final artwork, described under "Assets" in `DESIGN.md`.
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
- Support `prefers-reduced-motion` across every decorative animation, and give anything that loops for more than five seconds a visible way to pause it.
