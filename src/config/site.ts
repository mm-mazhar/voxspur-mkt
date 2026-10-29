/**
 * The only file in this project that names or prices the product.
 *
 * A rename, a new logo, a new app address, a price change or a new partner
 * share is an edit to this file and nothing else. No page, component, title or meta tag may contain the
 * product name, a price or one of these links as literal text.
 */

export interface Pricing {
  /** Platform fee charged per `unit`, in major units of `currency`. */
  readonly amount: number;
  /** ISO 4217 code. */
  readonly currency: string;
  /** What the fee is charged per, singular: "minute". */
  readonly unit: string;
  /** The balance a new call needs to start, in major units of `currency`. */
  readonly minimumCallBalance: number;
}

export interface Partner {
  /** Share of a managed client's platform fees paid to the partner, in percent. */
  readonly sharePercent: number;
  /** Where applications are sent. */
  readonly email: string;
  /** "early-access" until the program opens, then "live". */
  readonly status: "early-access" | "live";
  /** Minutes a month used in the worked example on /partners. */
  readonly exampleMinutes: number;
  /**
   * Earnings a partner must reach before a payout is made, in major units of
   * the pricing currency. Payouts are monthly.
   */
  readonly payoutMinimum: number;
}

export interface Plan {
  readonly id: string;
  readonly name: string;
  /** One line under the plan name. */
  readonly summary: string;
  readonly features: readonly string[];
  /** The figure on the card: the platform fee, or the partner share. */
  readonly figure: "price" | "share";
  readonly action: "signup" | "apply";
  /** Marked with a Signal Green top rule. At most one plan. */
  readonly featured: boolean;
}

export interface FooterLink {
  readonly label: string;
  readonly href: string;
}

/** "live" works in the app today. "soon" shows a "Coming soon" badge. */
export type Status = "live" | "soon";

export type IntegrationCategory = "models" | "voices" | "telephony";

export interface Integration {
  readonly name: string;
  readonly category: IntegrationCategory;
  readonly status: Status;
  /**
   * File stem in `src/assets/logos/` (a monochrome SVG). Without one the name
   * is set as a text wordmark.
   */
  readonly logo?: string;
}

export interface Feature {
  readonly id: string;
  readonly title: string;
  /** One line. */
  readonly description: string;
  /**
   * A "soon" feature is listed with a "Coming soon" badge and appears nowhere
   * else: not in the hero, not in the pricing band. Flip it to "live" here and
   * the badge goes.
   */
  readonly status: Status;
}

export interface ExampleLine {
  readonly who: "agent" | "caller" | "tool";
  readonly text: string;
}

export interface UseCase {
  readonly id: string;
  /** The tab. */
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly status: Status;
  /** Generic sample dialogue, always shown labelled "Example". */
  readonly example: readonly ExampleLine[];
}

/** What the platform fee buys, as facts the pricing band can list. */
export interface Billing {
  /** Customers add credit first and calls draw it down. */
  readonly prepaid: boolean;
  readonly perSecond: boolean;
  readonly autoTopUp: boolean;
  /** True would mean a recurring plan exists. */
  readonly subscription: boolean;
}

const partner = {
  sharePercent: 20,
  email: "partners@voxspur.com",
  status: "early-access",
  exampleMinutes: 10_000,
  payoutMinimum: 50,
} satisfies Partner as Partner;

export const site = {
  name: "Voxspur",
  tagline: "Voice agents that stay on track.",
  /**
   * The address the site is served from, with no trailing slash. Every
   * absolute link in the page head (the share address, the share image) is
   * built from it.
   */
  siteUrl: "https://voxspur.com",

  /**
   * The size of the picture shown when a link to the site is shared. The file
   * is `src/assets/og-card.png` (or `.jpg`), at exactly this size: social
   * sites do not read WebP or AVIF reliably. Until the file exists the page
   * writes no image tags, so a preview never points at a missing file; they
   * appear on the next build after it is added, and the build warns if the
   * size is wrong.
   */
  ogImage: {
    width: 1200,
    height: 630,
  },

  /** One sentence. Used as the default meta description. */
  description:
    "A platform for building AI voice agents that answer and place phone calls. Describe what the agent should do, connect a phone number, and test the call in your browser.",

  logo: {
    /** Mark and wordmark for light surfaces. */
    light: "/voxspur-logo.svg",
    /** Mark and wordmark for dark surfaces. */
    dark: "/voxspur-logo-inverse.svg",
    /** Intrinsic size of both logo files, in SVG units. */
    width: 906,
    height: 200,
    /** Square plate mark. The favicon files are small-size drawings of it. */
    mark: "/voxspur-mark.svg",
    /** Alt text for the logo, and for the mark. */
    alt: "Voxspur",
    markAlt: "Voxspur mark",
  },

  /**
   * The app's address, without a trailing slash. Empty until the app is
   * hosted; while it is empty, "Get started" and "Sign in" resolve to "#".
   */
  appUrl: "",

  /** Every "Contact us" action uses this. */
  contactUrl: "mailto:inquiry@voxspur.com",

  /**
   * Where "Book a call" goes. While it is empty every "Book a call" is hidden,
   * and so is the enterprise band's link.
   */
  bookCallUrl: "https://cal.com/mazhar-voxspur/voxspur-intro-call",

  /**
   * Who runs the booking page behind `bookCallUrl`. The Privacy page has a
   * "Booking a call" section written for one provider, "cal.com", and shows it
   * only while this is exactly "cal.com" and `bookCallUrl` is set; any other
   * value, or an empty one, hides it. The link may sit on our own address (a
   * redirect to Cal.com, say): this field says who is behind it, the address
   * does not. For another provider, rewrite that section in
   * `src/pages/privacy.astro` before changing this value.
   */
  bookCallProvider: "cal.com" as string,

  /** The booking provider's privacy policy, linked from that section. */
  bookCallProviderPrivacyUrl: "https://cal.com/privacy",

  /** The documentation. The "Docs" link is hidden while this is empty. */
  docsUrl: "",

  /**
   * The "Talk to our AI agent" demo. Off by default. When on, the button loads
   * the widget from `demoAgentScriptUrl` on click only; nothing loads before.
   * Paste both values from the app's Embed dialog once it is hosted: the full
   * address of `/embed/voxspur-widget.js`, and the token that goes in the
   * script's `data-voxspur-context`. When off, or while the address is empty,
   * the button opens the booking link, or is hidden if that is empty too.
   */
  demoAgentEnabled: false as boolean,
  demoAgentScriptUrl: "",
  demoAgentToken: "",

  /**
   * The "run it on your own infrastructure" band. It says Voxspur can be run
   * on a customer's own infrastructure, which is not offered today, so it is
   * off by default.
   */
  showEnterprise: false as boolean,

  /** Named on /privacy and /terms for questions, requests and notices. */
  supportEmail: "support@voxspur.com",

  pricing: {
    amount: 0.01,
    currency: "USD",
    unit: "minute",
    minimumCallBalance: 0.5,
  } satisfies Pricing as Pricing,

  partner,

  plans: [
    {
      id: "payg",
      name: "Pay as you go",
      summary: "For building and running your own agents.",
      features: [
        "Inbound and outbound calls, including outbound campaigns",
        "Bring your own keys for the language model, the voice, the transcriber and the knowledge base's embeddings",
        "Phone numbers through Twilio, Telnyx, Plivo, Exotel, Cloudonix, or your own SIP via Asterisk",
        "Transfer a call to a person, with an optional spoken handover",
        "A knowledge base: upload documents and the agent answers from them during a call",
        "A widget to put an agent on a website",
        "Call recordings, transcripts and run history",
        "Tools the agent can call during a conversation",
      ],
      figure: "price",
      action: "signup",
      featured: true,
    },
    {
      id: "partner",
      name: "Partner program",
      summary: `Build voice agents for clients? Earn ${partner.sharePercent}% of their platform fees, for as long as you manage them.`,
      features: [
        "No monthly fee",
        "No minimum number of clients",
        "Your clients' price stays the same",
        "Add as many clients as you like",
      ],
      figure: "share",
      action: "apply",
      featured: false,
    },
  ] satisfies readonly Plan[] as readonly Plan[],

  billing: {
    prepaid: true,
    perSecond: true,
    autoTopUp: true,
    subscription: false,
  } satisfies Billing as Billing,

  /**
   * Everything the marquee shows, grouped by category in this order. The
   * marquee splits the list in half, one half per row. Logos are the CC0
   * artwork from Simple Icons, kept in `src/assets/logos/` (see the README
   * there); the trademarks stay with their owners. Names without a licensed
   * logo are set as text wordmarks.
   */
  integrations: [
    { name: "OpenAI", category: "models", status: "live" },
    { name: "Google Gemini", category: "models", status: "live", logo: "google-gemini" },
    { name: "Groq", category: "models", status: "live" },
    { name: "OpenRouter", category: "models", status: "live", logo: "openrouter" },
    { name: "Azure", category: "models", status: "live" },
    { name: "MiniMax", category: "models", status: "live" },

    { name: "ElevenLabs", category: "voices", status: "live", logo: "elevenlabs" },
    { name: "Cartesia", category: "voices", status: "live" },
    { name: "Deepgram", category: "voices", status: "live", logo: "deepgram" },
    { name: "Sarvam", category: "voices", status: "live" },
    { name: "AssemblyAI", category: "voices", status: "live" },
    { name: "Gladia", category: "voices", status: "live" },
    { name: "Smallest AI", category: "voices", status: "live" },
    { name: "Soniox", category: "voices", status: "live" },
    { name: "Speechmatics", category: "voices", status: "live" },
    { name: "Azure Speech", category: "voices", status: "live" },
    { name: "Google Speech", category: "voices", status: "live", logo: "google" },

    { name: "Twilio", category: "telephony", status: "live" },
    { name: "Telnyx", category: "telephony", status: "live" },
    { name: "Vonage", category: "telephony", status: "live", logo: "vonage" },
    { name: "Plivo", category: "telephony", status: "live" },
    { name: "Exotel", category: "telephony", status: "live" },
    { name: "Vobiz", category: "telephony", status: "live" },
    { name: "Asterisk (ARI)", category: "telephony", status: "live", logo: "asterisk" },
    { name: "Cloudonix", category: "telephony", status: "live" },
    // Inbound only, and not yet tested end to end.
    { name: "WhatsApp", category: "telephony", status: "soon", logo: "whatsapp" },
  ] satisfies readonly Integration[] as readonly Integration[],

  /** The core feature list, in the order it is shown. */
  features: [
    {
      id: "builder",
      title: "A visual agent builder",
      description: "Lay the call out as steps and branches, then test it in your browser.",
      status: "live",
    },
    {
      id: "models",
      title: "Bring your own model",
      description: "Connect your own accounts, and name a fallback model for when the first one fails.",
      status: "live",
    },
    {
      id: "knowledge",
      title: "A knowledge base",
      description: "Upload documents and the agent looks up answers in them during the call.",
      status: "live",
    },
    {
      id: "tools",
      title: "Tools, webhooks and MCP",
      description: "HTTP tools, MCP tools and webhooks connect the agent to your own systems mid-call.",
      status: "live",
    },
    {
      id: "records",
      title: "Recordings, transcripts and call review",
      description: "Every call is recorded and transcribed, so you can hear and read what happened.",
      status: "live",
    },
    {
      id: "workspaces",
      title: "Team workspaces",
      description: "Invite your team with owner, admin and member roles.",
      status: "live",
    },
    {
      id: "templates",
      title: "Ready-made agent templates",
      description: "Start from a template for a common kind of business.",
      status: "soon",
    },
    {
      id: "crm",
      title: "CRM and booking integrations",
      description: "HubSpot, GoHighLevel, Zendesk and Cal.com.",
      status: "soon",
    },
    {
      id: "recovery",
      title: "Lost-call recovery",
      description: "A daily list of callers the agent couldn't help, to call back.",
      status: "soon",
    },
    {
      id: "compliance",
      title: "Outbound compliance controls",
      description: "Consent records, calling hours and opt-out handling.",
      status: "soon",
    },
  ] satisfies readonly Feature[] as readonly Feature[],

  useCases: [
    {
      id: "receptionist",
      label: "Inbound receptionist",
      title: "Answer every call that comes in",
      description:
        "The agent picks up, answers from your knowledge base, and puts the caller through to a person when it should.",
      status: "live",
      example: [
        { who: "agent", text: "Thanks for calling. How can I help?" },
        { who: "caller", text: "Can you tell me about your opening hours?" },
        { who: "tool", text: "Look up the answer in the knowledge base" },
        { who: "agent", text: "I have that. Shall I read it out, or put you through to a person?" },
      ],
    },
    {
      id: "reminders",
      label: "Appointment reminders",
      title: "Call people before they forget",
      description:
        "Run an outbound campaign from a list. The agent gives the reminder and hands over to a person if the caller needs one.",
      status: "live",
      example: [
        { who: "agent", text: "Hello, this is a reminder about your appointment." },
        { who: "caller", text: "Could someone call me back instead?" },
        { who: "tool", text: "Hand the call to a person" },
        { who: "agent", text: "Of course. One moment while I transfer you." },
      ],
    },
    {
      id: "website",
      label: "Website voice assistant",
      title: "Let visitors talk instead of type",
      description:
        "Put the same agent on a page of your site with the widget, so visitors can speak to it without dialling.",
      status: "live",
      example: [
        { who: "agent", text: "Hi, I can answer questions about this site. Ask me anything." },
        { who: "caller", text: "How do I get started?" },
        { who: "tool", text: "Look up the answer in the knowledge base" },
        { who: "agent", text: "I can walk you through it, one step at a time." },
      ],
    },
    {
      id: "whatsapp",
      label: "WhatsApp calls",
      title: "Take calls where people already are",
      description:
        "Answer WhatsApp calls with the same agent. Inbound calls only, and not available yet.",
      status: "soon",
      example: [
        { who: "agent", text: "Hello, you've reached our voice line." },
        { who: "caller", text: "Hi, I need some help with my order." },
        { who: "agent", text: "Of course. Tell me what you need." },
      ],
    },
  ] satisfies readonly UseCase[] as readonly UseCase[],

  footerLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ] satisfies readonly FooterLink[] as readonly FooterLink[],
} as const;

/* ------------------------------------------------------------------------- *
 * Derived links
 * ------------------------------------------------------------------------- */

/** "Get started" — the app's signup. "#" until `appUrl` is set. */
export const signupUrl: string = site.appUrl ? `${site.appUrl}/auth/signup` : "#";

/** "Sign in" — the app's login. "#" until `appUrl` is set. */
export const loginUrl: string = site.appUrl ? `${site.appUrl}/auth/login` : "#";

/** "Contact us". */
export const contactUrl: string = site.contactUrl;

/** The support address as a link. */
export const supportEmailUrl: string = `mailto:${site.supportEmail}`;

/** "Book a call". Empty until a booking page exists. */
export const bookCallUrl: string = site.bookCallUrl;

/** False while there is nowhere to book, so every "Book a call" is hidden. */
export const hasBookCall: boolean = bookCallUrl !== "";

/** The documentation. Empty until it is published. */
export const docsUrl: string = site.docsUrl;

/** False while there is no documentation, so the "Docs" link is hidden. */
export const hasDocs: boolean = docsUrl !== "";

export type TalkMode = "widget" | "book" | "none";

/**
 * What "Talk to our AI agent" does: load the widget on click, open the booking
 * link, or (with neither available) not be shown at all.
 */
export const talkMode: TalkMode =
  site.demoAgentEnabled && site.demoAgentScriptUrl !== ""
    ? "widget"
    : hasBookCall
      ? "book"
      : "none";

/** Where the enterprise band's link goes: the booking page, else email. */
export const enterpriseUrl: string = hasBookCall ? bookCallUrl : `mailto:${site.supportEmail}`;

/** The marquee's two rows: the list cut in half, one half per row. */
export function integrationRows(): readonly [readonly Integration[], readonly Integration[]] {
  const half = Math.ceil(site.integrations.length / 2);
  return [site.integrations.slice(0, half), site.integrations.slice(half)];
}

/** Names of the phone providers that work today, in the order listed. */
export function liveTelephonyNames(): string[] {
  return site.integrations
    .filter((item) => item.category === "telephony" && item.status === "live")
    .map((item) => item.name);
}

/** Joins names the way a sentence does: "A, B and C". */
export function joinNames(names: readonly string[]): string {
  return new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(names);
}

/** What the platform fee buys, as short lines for the pricing band. */
export function billingFacts(): string[] {
  const { prepaid, perSecond, autoTopUp, subscription } = site.billing;
  const facts: string[] = [];
  if (prepaid) facts.push(perSecond ? "Prepaid credit, charged by the second" : "Prepaid credit");
  if (autoTopUp) facts.push("Automatic top-up");
  if (!subscription) facts.push("No subscription");
  return facts;
}

/** True while the app has no address, so links point nowhere real yet. */
export const appLinksArePlaceholders: boolean = site.appUrl === "";

/** True until the partner program opens. */
export const partnerIsEarlyAccess: boolean = site.partner.status === "early-access";

/** The partner application: an email with the subject and questions filled in. */
export const partnerApplyUrl: string = (() => {
  const subject = `${site.name} partner application`;
  const body = [
    "Hello,",
    "",
    `I'd like to apply for the ${site.name} partner program.`,
    "",
    "Name:",
    "Company or website:",
    "Roughly how many clients:",
  ].join("\r\n");
  return `mailto:${site.partner.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
})();

/** The stop label over the partner steps on /partners. */
export const partnerStepsLabel: string = partnerIsEarlyAccess
  ? "How it will work"
  : "How it works";

/** The label on every partner application button. */
export const partnerActionLabel: string = partnerIsEarlyAccess
  ? "Apply for early access"
  : "Apply to be a partner";

export function planActionUrl(action: Plan["action"]): string {
  return action === "signup" ? signupUrl : partnerApplyUrl;
}

/* ------------------------------------------------------------------------- *
 * Price formatting — the one place a price becomes text
 * ------------------------------------------------------------------------- */

/**
 * Sub-unit symbols for currencies whose minor unit has a conventional sign.
 * Amounts below one major unit are shown in the minor unit, so 0.01 USD reads
 * "1c" rather than "$0.01".
 */
const MINOR_UNIT_SYMBOL: Readonly<Record<string, string>> = {
  USD: "¢",
  EUR: "c",
  GBP: "p",
};

/** The fee on its own: "1¢" for 0.01 USD, "$1.50" for 1.5 USD. */
export function formatPriceAmount(pricing: Pricing = site.pricing): string {
  const minorSymbol = MINOR_UNIT_SYMBOL[pricing.currency];

  if (pricing.amount > 0 && pricing.amount < 1 && minorSymbol !== undefined) {
    const minor = Math.round(pricing.amount * 100);
    return `${minor}${minorSymbol}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: pricing.currency,
    minimumFractionDigits: Number.isInteger(pricing.amount) ? 0 : 2,
  }).format(pricing.amount);
}

/** The full rate: "1¢ per minute". */
export function formatPriceRate(pricing: Pricing = site.pricing): string {
  return `${formatPriceAmount(pricing)} per ${pricing.unit}`;
}

/** The unit on its own, for a figure's caption: "per minute". */
export function formatPriceUnit(pricing: Pricing = site.pricing): string {
  return `per ${pricing.unit}`;
}

/** An amount of money in major units: "$100", "$12.50". */
export function formatMoney(amount: number, currency: string = site.pricing.currency): string {
  const cents = Math.round(amount * 100);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/* ------------------------------------------------------------------------- *
 * Partner figures — computed here, never typed into a page
 * ------------------------------------------------------------------------- */

/** The partner share: "20%". */
export function formatSharePercent(p: Partner = site.partner): string {
  return `${p.sharePercent}%`;
}

/** What a partner's earnings must reach before a payout: "$50". */
export function formatPayoutMinimum(
  p: Partner = site.partner,
  pricing: Pricing = site.pricing,
): string {
  return formatMoney(p.payoutMinimum, pricing.currency);
}

/** The balance a call needs to start: "$0.50". */
export function formatMinimumCallBalance(pricing: Pricing = site.pricing): string {
  return formatMoney(pricing.minimumCallBalance, pricing.currency);
}

export interface PartnerExample {
  /** "10,000" */
  readonly minutes: string;
  /** What the client pays in platform fees for those minutes: "$100". */
  readonly fees: string;
  /** The partner's share of those fees: "$20". */
  readonly earnings: string;
}

/** The worked example: minutes × platform fee = fees; fees × share = earnings. */
export function partnerExample(
  p: Partner = site.partner,
  pricing: Pricing = site.pricing,
): PartnerExample {
  // Work in cents so the two multiplications cannot drift.
  const feesCents = Math.round(p.exampleMinutes * pricing.amount * 100);
  const earningsCents = Math.round((feesCents * p.sharePercent) / 100);
  return {
    minutes: new Intl.NumberFormat("en-US").format(p.exampleMinutes),
    fees: formatMoney(feesCents / 100, pricing.currency),
    earnings: formatMoney(earningsCents / 100, pricing.currency),
  };
}
