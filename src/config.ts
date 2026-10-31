/**
 * Arestrix: the one file to edit when the site changes.
 *
 * Contact channels are intentionally limited to GitHub and X. The project is
 * open source, so releases, discussions and issues all live on GitHub.
 */

export interface Stat {
  value: number;
  /** Printed right after the number, e.g. "+" or "%". */
  suffix?: string;
  label: string;
}

export const SITE = {
  name: "Arestrix",
  tagline: "Visual orchestration and native C++20 compilation for AI agent pipelines",
  description:
    "Arestrix is an open-source desktop studio and native compiler for AI agent pipelines. Draw the graph, compile it to C++20 with Taskflow, and ship a standalone runner.",
  /** Your production URL. Used for canonical links, Open Graph, the sitemap and robots.txt. */
  url: "https://arestrix.com",
  lang: "en",
  locale: "en_US",

  /** The only contact channels used by the site. */
  repo: "https://github.com/frankalcantara/Arestrix",
  docs: "https://github.com/frankalcantara/Arestrix/tree/main/docs",
  gettingStarted: "https://github.com/frankalcantara/Arestrix/blob/main/docs/en/getting-started.md",
  architectureDocs: "https://github.com/frankalcantara/Arestrix/blob/main/docs/en/architecture.md",
  graphDocs: "https://github.com/frankalcantara/Arestrix/blob/main/docs/en/graph-and-nodes.md",
  agentDocs: "https://github.com/frankalcantara/Arestrix/blob/main/docs/en/agents-and-execution.md",
  cliDocs: "https://github.com/frankalcantara/Arestrix/blob/main/docs/en/arestrix-cli.md",
  workspacesDocs:
    "https://github.com/frankalcantara/Arestrix/blob/main/docs/en/workspaces-memory-skills-mcp.md",
  memoryDocs: "https://github.com/frankalcantara/Arestrix/blob/main/docs/en/how-memory-works.md",
  gatewayDocs: "https://github.com/frankalcantara/Arestrix/blob/main/CppCore/gateway/README.md",
  comparisonDocs: "https://github.com/frankalcantara/Arestrix/blob/main/docs/product/comparison.md",
  securityGovernance:
    "https://github.com/frankalcantara/Arestrix/blob/main/docs/security/governance.md",
  roadmap: "https://github.com/frankalcantara/Arestrix/blob/main/docs/en/roadmap.md",
  examples: "https://github.com/frankalcantara/Arestrix/tree/main/examples",
  changelog: "https://github.com/frankalcantara/Arestrix/blob/main/CHANGELOG.md",
  license: "https://github.com/frankalcantara/Arestrix/blob/main/LICENSE",
  releases: "https://github.com/frankalcantara/Arestrix/releases/tag/latest",
  discussions: "https://github.com/frankalcantara/Arestrix/discussions",
  issues: "https://github.com/frankalcantara/Arestrix/issues",
  contributing: "https://github.com/frankalcantara/Arestrix/blob/main/CONTRIBUTING.md",
  security: "https://github.com/frankalcantara/Arestrix/security/advisories/new",
  x: "https://x.com/frankalcantara",
  /** Independent acknowledgement, not an Arestrix project or contact channel. */
  opencode: "https://opencode.ai/br",

  beta: {
    label: "Beta 2.5",
    version: "2.5.0",
    platforms: "Windows and Linux",
  },

  /** Root profile URLs only: these are the two contact channels. */
  social: [
    { label: "GitHub", href: "https://github.com/frankalcantara/Arestrix", icon: "github" },
    { label: "X", href: "https://x.com/frankalcantara", icon: "x-social" },
  ],

  /** The counters in the hero. A "|" in a label is where its line breaks. */
  stats: [
    { value: 20, label: "C++|standard" },
    { value: 14, label: "runnable|examples" },
    { value: 2, label: "interface|languages" },
    { value: 100, suffix: "%", label: "MIT licensed|source" },
  ] as Stat[],
  /** Small caption under the counters. */
  statsNote: "Beta 2.5 · 2.5.0 · Windows and Linux",

  /**
   * One accent for highlighted words, buttons and rules. `accentText` is the text
   * colour on accent fills: Grafite on Brasa is above 4.5:1 for large/bold text.
   *
   * Large surfaces use one of the three manual surfaces: near-black (`capCard`),
   * Ardósia (`ardosia`) or Papel (`card`). Near-black and Ardósia carry Papel
   * type/line art; Papel carries Grafite type. Brasa stays an accent: on Papel it
   * is limited to graphics and large/bold text (3.2:1); on Ardósia it is
   * decorative only (2.28:1) and never carries body text. There is no blue in the
   * brand manual.
   */
  theme: {
    accent: "#e8590c",
    accentText: "#14151a",
    card: "#f4f2ee",
    cardText: "#14151a",
    ardosia: "#4b4f5c",
    capCard: "#0b0c0f",
    capCardText: "#f4f2ee",
    capCardBorder: "rgb(244 242 238 / 0.18)",
  },

  nav: [
    { label: "capabilities", href: "/services/" },
    { label: "how it works", href: "/#process" },
    { label: "for teams", href: "/#teams" },
    { label: "questions", href: "/#faq" },
  ],
  /** Secondary links, shown in the footer and the mobile menu. */
  navMore: [
    { label: "project", href: "/about/" },
    { label: "community", href: "/contact/" },
    { label: "download", href: "/#download" },
  ],
  /** The accent button in the header and footer. */
  cta: { label: "Get the beta", href: "https://github.com/frankalcantara/Arestrix/releases/tag/latest" },
} as const;

export type SiteConfig = typeof SITE;
