# Provider logos

Monochrome marks for the "Works with" marquee on the home page. Each file is a
single-path SVG drawn in `currentColor`, so it takes the text colour in both
themes. The marquee inlines them at build time; nothing is fetched.

Source: [Simple Icons](https://simpleicons.org) 16.36.0, released under CC0 1.0.
CC0 covers the artwork only. The marks are trademarks of their owners, shown
here only to say the product works with them. Some owners publish brand
guidelines (ElevenLabs, Deepgram, Google, WhatsApp); read them before changing
how a mark is shown.

| File | Provider |
| --- | --- |
| `google-gemini.svg` | Google Gemini |
| `openrouter.svg` | OpenRouter |
| `elevenlabs.svg` | ElevenLabs |
| `deepgram.svg` | Deepgram |
| `google.svg` | Google (speech) |
| `vonage.svg` | Vonage |
| `asterisk.svg` | Asterisk |
| `whatsapp.svg` | WhatsApp |

A provider without a file is set as a text wordmark. MiniMax's icon in Simple
Icons is under a custom licence, so it is not used. To add a logo, put the SVG
here and name its file stem in the `logo` field of that provider in
`src/config/site.ts`. A name with no matching file fails the build.
