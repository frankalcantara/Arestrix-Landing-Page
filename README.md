# Arestrix landing page

The public landing page for **Arestrix**, a desktop studio and native C++20 compiler for AI agent
pipelines. Built as a static Astro 7 site with Tailwind CSS 4 and TypeScript.

The page is derived from the MIT-licensed [Orrery](https://github.com/formgong/orrery-astro-theme)
theme. The scroll choreography, canvas scenes and motion rules are described in `src/styles/effects.css`
and in the comments of each component.

## Quick start

```sh
npm install
npm run dev
```

Open <http://localhost:4321>.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static site in `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run check` | Type-check `.astro` and `.ts` files |
| `npm run test:local` | Build, serve, and smoke-test every route |
| `npm run test:cf` | Build, serve with `wrangler dev`, and smoke-test every route |
| `npm run preview:cf` | Serve the built site through the Cloudflare config |
| `npm run deploy` | Build and upload `dist/` to Cloudflare Workers |

`npm run build` and `npm run check` must both pass with 0 errors and 0 warnings.

## Content map

| Where | What |
| --- | --- |
| `src/config.ts` | Name, tagline, canonical URL, GitHub/X links, counters, accent and card colours, nav and CTA |
| `src/components/sections/` | The home page, in order: Hero, Statement, MediaPanel, Services, Delegation, FeatureGrid, Memory, Gateway, Teams, Split, Process, Comparison, Pricing, Faq, Download, FinalCta |
| `public/media/` | The hero graph loop: WebM, MP4 and a WebP poster |
| `src/content/services/*.md` | The six capability cards and their detail pages |
| `src/pages/about.astro` | Project positioning, audience, principles and deliberate scope |
| `src/pages/contact.astro` | Community page: GitHub and X only |
| `src/styles/global.css` | Brand tokens and shared components |
| `src/styles/effects.css` | Every animation and scroll-linked effect |

## Brand

The palette and fonts come from `C:\Projetos\Arestrix\Manual_de_Marca`:

| Token | Value | Use |
| --- | --- | --- |
| Grafite | `#14151A` | Page ground |
| Papel | `#F4F2EE` | Light surfaces, text and the logo; Grafite type on it |
| Brasa | `#E8590C` | Highlights, buttons and rules |
| Ardósia | `#4B4F5C` | Slate surfaces and decorative neutrals; Papel type on it |
| Near-black surfaces | `#0B0C0F` | Capability, process and about panels: Papel type/art, dark grey outline |
| Icon fills | `#F4F2EE` | Small contact-channel circles |

Type is **Space Grotesk** (500/700) and **IBM Plex Mono** (500), both self-hosted from Fontsource.
The negative logo, favicon, web manifest and Open Graph image are copied from the brand manual into
`public/` and `public/brand/`.

## Contact channels

The site only contacts through **GitHub** and **X**:

- GitHub: <https://github.com/frankalcantara/Arestrix>
- X: <https://x.com/frankalcantara>

There is no contact form, no email address and no phone number. The community page links to the
repository, discussions, issues, releases and documentation. Change the URLs in `src/config.ts`.

## Hero video

The hero uses a short screen recording of an Arestrix run: agents, edges and pulses on a pure black
background, with no Studio chrome. It is a 19-second seamless loop (a one-second crossfade joins the
end back to the start), 1260×654, no audio.

- `public/media/hero-graph.webm` (VP9) is served first; `hero-graph.mp4` (H.264) is the Safari
  fallback. Both are about 700 KB.
- `public/media/hero-graph-poster.webp` is the same frame used before playback and for
  `prefers-reduced-motion`.
- The video occupies the right half of the hero. A Grafite gradient (`.hero-shade`) covers its
  left side, so it never runs under the heading or the lead. `mix-blend-mode: screen` removes the
  black background, so there is no frame, border or mask around it.
- Below 751 px the hero is text-only; the video is not loaded on phones.
- It is loaded and played by the small script in `Hero.astro`; if playback is refused, the poster
  stays visible.
- The raw recording is kept in `assets/` locally and is not part of the deployed site.

## Motion rules

- Every animated element's default style is its final state. Motion sits inside
  `@supports (animation-timeline: …)` and
  `@media (prefers-reduced-motion: no-preference) and (min-width: 751px)`.
- Scroll-driven rules use longhands (`animation-name`, `animation-timeline`, …). A minifier can merge
  a shorthand plus `animation-timeline` into a declaration Chrome rejects.
- Use `overflow: clip`, not `hidden`, around animated content. `hidden` creates a scroll container
  and view timelines then track that box.
- Write `view(0px)`, not `view()`. The default inset is the page's `scroll-padding`.
- Entrances (`[data-enter]`) stay paused until `src/scripts/enter.ts` adds `.is-in` at 15% visible.
- `Process.astro` is a stack of sticky cards (the reference's `#teams` effect). Its inline script only
  writes `--covered` and the active progress item; the scale/dim CSS lives in `src/styles/effects.css`
  inside the same media query. Phones, reduced motion
  and no-JS get flat, fully lit cards.
- The header has four nav links. Keep the `clamp()` gap in `Header.astro` so it never collides with
  the CTA around 1024 px.
- No animation libraries. The canvas scenes in `src/scripts/scenes.ts` are dependency-free.

## Local testing before deploy

Fast path:

```sh
npm run test:local
```

This builds the site, starts `astro preview` on `http://127.0.0.1:4322`, fetches every route and
checks the rebrand: Arestrix copy is present and the old sample business, email, phone and Formgong
references are gone. It exits non-zero on failure.

Cloudflare path:

```sh
npm run test:cf
```

This does the same checks through `wrangler dev` on `http://127.0.0.1:8788`, using the same
`wrangler.jsonc` that production uses. To inspect it by hand, run `npm run preview:cf` and open that
URL.

## Deploy to Cloudflare

`wrangler.jsonc` deploys `dist/` as static assets only (no Worker script, no bindings). Set the real
domain before building so canonical URLs, Open Graph, the sitemap and robots.txt point at it:

```sh
SITE_URL=https://arestrix.com npm run build
npx wrangler login
npm run deploy
```

PowerShell uses `$env:SITE_URL="https://arestrix.com"; npm run build` for the first line.

The first deploy creates the `arestrix` Worker; connect the custom domain in the Cloudflare dashboard.
If the domain changes, update `url` in `src/config.ts` or pass `SITE_URL` at build time.

## Project structure

```text
src/
├── components/
│   ├── sections/       Home page sections
│   ├── FillLines.astro Line-by-line fill
│   ├── Graph3D.astro   Stylised graph with pointer-driven 3D turn
│   ├── Ridgelines.astro Build-time chart
│   ├── ServiceCard.astro, ServiceArt.astro
│   ├── Head.astro      Meta, Open Graph, JSON-LD
│   └── Header, Footer, Logo, Icon, PageHeader, SectionHeading, Highlight
├── content/services/   Six capability Markdown files
├── layouts/            BaseLayout.astro
├── lib/                schema.ts (SoftwareApplication JSON-LD), highlight.ts
├── pages/              index, services/, about, contact, 404, robots.txt.ts
├── scripts/            scenes.ts (flow/wave), enter.ts
├── styles/             global.css, effects.css
├── config.ts           Everything rebrandable
└── content.config.ts   Collection schema
public/                 Brand icons, logos, favicon, manifest, og.png
public/media/           Hero graph loop (WebM, MP4, poster)
scripts/test-local.mjs  Local and Cloudflare smoke tests
```

## License

MIT. The original theme copyright notice remains in `LICENSE`; the Arestrix rebrand is released
under the same license. The bundled fonts are under the SIL Open Font License 1.1.
