# Generated artwork

The home page is complete without any of this. Each slot below is optional:
drop the files in this folder under exactly these names and they appear, with no
code change. Until then each slot is an empty, invisible box that shows no
text, in dev or in production. Its name and size are on the box as
`data-art-slot` and `data-art-size`, for the browser's inspector.

Every slot takes **two files**, one per theme, as AVIF (preferred) or WebP:
`<slot>-dark.avif` and `<slot>-light.avif`. Draw dark on a **pure black**
background and light on a **pure white** one. The page blends them in (screen
on dark, multiply on light), so the plain background disappears and only the
lines remain. Astro writes the width and height, and the images below the fold
are lazy-loaded.

## One style for all of them

The brand's line map: thin even lines of one width, joined by round stop
markers drawn as rings; straight runs, 45 degree branches, corners turned with
one consistent quarter-circle. Flat vector look. No gradients, no glow, no
shadows, no 3D, no text, no logos, no people, no hands, no microphones, no
phones, no waveform clip-art. Lots of empty space; the detail sits to one side.

- Dark: pure black background (#000000). Main lines Signal Green (#37d16c).
  A few secondary lines in chalk (#fafafa) at about 25% strength.
- Light: pure white background (#ffffff). Main lines Signal Deep (#12773d).
  A few secondary lines in ink (#0a0e0c) at about 25% strength.

## Slots

| Slot (file stem) | Where | Size | Notes |
| --- | --- | --- | --- |
| `ambient-backdrop` | Behind the hero and the closing call to action | 1920 x 1080 (16:9) | Under 150 KB each as AVIF |
| `enterprise-band` | Inside the enterprise band (shown only when `showEnterprise` is on) | 1600 x 900 (16:9) | Under 120 KB each as AVIF |

### `ambient-backdrop`

> Flat vector illustration of a railway line map on a pure black background.
> A few long thin lines in bright green (#37d16c), all the same 2 px weight,
> run in straight horizontal and vertical stretches and split at clean 45
> degree branches with rounded corners of one radius. Small hollow ring
> markers (stops) sit on the lines, one or two filled solid green. Two or three
> faint off-white lines run alongside at 25% strength. The lines gather in the
> upper right of the frame and thin out to nothing toward the lower left, which
> is left empty black. No text, no logos, no people, no gradients, no glow, no
> shadows, no 3D. 1920 x 1080.

For the light file, say: "on a pure white background, lines in deep green
(#12773d), faint lines in near-black at 25% strength", and keep the rest.

### `enterprise-band`

> Flat vector illustration on a pure black background: one main green (#37d16c)
> line, 2 px, enters from the left edge and ends inside a large rounded
> rectangle drawn as a thin off-white outline at 25% strength, like a depot
> on a line map. Inside the rectangle the line splits into three short
> branches with hollow ring stops. Everything else is empty black. No servers,
> no racks, no clouds, no padlocks, no text, no logos, no people, no gradients,
> no glow, no 3D. 1600 x 900.

Light file: as above on pure white, in deep green (#12773d) and near-black.

## Not wired up yet

- **Social card**, `og-card.png`, 1200 x 630. The site has no absolute address
  in its config yet, and a social card needs one. Same line-map style, with
  the logo placed on top afterwards rather than generated.
- **Video.** The page uses none. The waves are CSS. If a looping background is
  wanted later: 1920 x 1080, 6 seconds at 24 fps (144 frames), seamless loop,
  H.264 and WebM, muted, under 2 MB, with a still poster of the first frame.
  It would be shown only when the visitor has not asked for reduced motion or
  data saving.
