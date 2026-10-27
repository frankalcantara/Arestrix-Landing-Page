# Notes for coding agents

The Arestrix landing page is a static Astro 7 site (Tailwind CSS 4, TypeScript). Read `README.md` first.

## Commands

- `npm run dev`
- `npm run build` and `npm run check` must both pass with 0 errors and 0 warnings.
- `npm run test:local` builds, serves with `astro preview`, and checks every route.
- `npm run test:cf` does the same through `wrangler dev`, using the production Cloudflare config.
- `npm run deploy` builds and uploads `dist/` to Cloudflare Workers.

## Where things live

- Rebranding: `src/config.ts` only. Don't hard-code the project name, URLs or social links in components.
- Contact channels: GitHub and X only. There is no contact form, email address or phone number. Do not add one unless the owner asks.
- Content: `src/content/services/*.md` (schema in `src/content.config.ts`); home page sections in `src/components/sections/`.
- The supporting sections (Delegation, FeatureGrid, Teams, Comparison, Pricing, Faq, Download) must stay factual. Their copy comes from the Arestrix docs in `C:\Projetos\Arestrix\docs` and `README.md`: no hosted service, managed servers, paid support tier, email or phone number. Do not invent capabilities or date commitments.
- Brand assets: `public/brand/`, `public/favicon.*`, `public/apple-touch-icon.png`, `public/og.png` and `public/site.webmanifest` come from `C:\Projetos\Arestrix\Manual_de_Marca`. Do not recolour or redraw the logo.
- All motion: `src/styles/effects.css`. Canvas scenes: `src/scripts/scenes.ts` (flow/wave; keep it dependency-free and under 6 KB minified).
- The two remaining diagram spots (Statement and About) use `Graph3D.astro`: rectangular vertices, dependency edges and a pointer-driven 3D rotation. Keep the rotation logic in `Graph3D.astro`; node/flow motion stays in `effects.css`.
- `Process.astro` is the reference `#teams` effect: four sticky cards that scale down and dim as the next one covers them. The inline script only writes `--covered` and the active progress item. The scale/dim rules live in `src/styles/effects.css` inside `prefers-reduced-motion: no-preference` and `min-width: 1001px`; phones, reduced motion and no-JS get flat cards.
- Hero video: `public/media/hero-graph.{webm,mp4}` plus the `.webp` poster, loaded by the script in `Hero.astro`. The raw recording lives in `assets/` and is git-ignored. The video sits in the right half; `.hero-shade` fades its left side to Grafite so it never reaches the heading or lead. Do not add a frame, border or mask around it: `mix-blend-mode: screen` removes the black background. Phones hide the video.

## Brand rules that are easy to break

- Palette: Grafite `#14151A`, Papel `#F4F2EE`, Brasa `#E8590C`, Ardósia `#4B4F5C`.
- Type: Space Grotesk 500/700; IBM Plex Mono 500 for technical labels.
- Brasa is the only accent. Use it for highlights, buttons and rules; every text pair must still pass AA.
- Large surfaces use the manual's three surfaces: near-black (`--cap-card`, `#0B0C0F`), Ardósia (`--c-ardosia`, `#4B4F5C`) and Papel (`--c-paper`, `#F4F2EE`). Near-black and Ardósia use **Papel** type and line art; Papel uses **Grafite** type. Brasa is still an accent: on Papel it is only for graphics and large/bold text (3.2:1); on Ardósia it is decorative only (2.28:1) and never for body text. There is no blue in the brand manual; do not reintroduce yellow or an off-brand blue.

## Motion rules that are easy to break

- The default style of every animated element is its final state. Motion goes inside `@supports (animation-timeline: …)` (scroll-linked) and `@media (prefers-reduced-motion: no-preference) and (min-width: 751px)`: phones are still.
- Timings, easings, ranges and start poses were measured on the reference with a Playwright twin oracle. Change a value only after measuring again.
- Scroll-driven animations: use longhands (`animation-name`, `animation-timeline`, `animation-range`, …). The minifier can merge a shorthand plus `animation-timeline` into a declaration Chrome rejects.
- Use `overflow: clip` (not `hidden`) on wrappers around animated content; `hidden` creates a scroll container that view timelines then track.
- Write `view(0px)`, not `view()`: the default inset is the page's `scroll-padding` (the header height), which shortens every range.
- Entrances (`[data-enter]`) are paused until `src/scripts/enter.ts` adds `.is-in` (15% visible). Keep `transform: none` in their first keyframe so the observer sees the real box. Without JavaScript they never start, so the element simply shows.
- Text reveals use `clip-path` and transforms. The one exception: the cards and the media quote fade in over 1.2 s while they flip. Every text colour passes AA once settled.
- The fill lines (`FillLines.astro`) draw each line twice, grey and accent; keep the plain sentence in a `sr-only` span and the drawn lines `aria-hidden`.
- `FillLines` stacks the two copies in one grid cell (not an absolute overlay), so a wrapped highlight line can never overlap the next line or the button.
- The header has four nav links. Keep the `clamp()` gap in `Header.astro`; at 1024 px a fixed 36 px gap collides with the CTA.
- No animation libraries (GSAP, Lenis, Three.js and the like).
- Astro component `<style>` blocks are unlayered and beat Tailwind utilities. Don't set `display` in a component style on an element that also uses responsive display utilities.
- Playwright WebKit screenshots flatten 3D transforms; check the 3D card entrance in WebKit with a recorded video instead.

## Docs

https://docs.astro.build
