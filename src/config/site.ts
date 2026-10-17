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

const partner = {
  sharePercent: 20,
  email: "partners@voxspur.com",
  status: "early-access",
  exampleMinutes: 10_000,
} satisfies Partner as Partner;

export const site = {
  name: "Voxspur",
  tagline: "Voice agents that stay on track.",
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
  contactUrl: "#",

  pricing: {
    amount: 0.01,
    currency: "USD",
    unit: "minute",
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
        "No minimum",
        "Your clients' price stays the same",
        "Add as many clients as you like",
      ],
      figure: "share",
      action: "apply",
      featured: false,
    },
  ] satisfies readonly Plan[] as readonly Plan[],

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
