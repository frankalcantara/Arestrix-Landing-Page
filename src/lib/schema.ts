import { SITE } from "../config";

/**
 * schema.org SoftwareApplication for the Arestrix project.
 * No aggregateRating on purpose: search engines ignore ratings a project publishes about itself.
 */
export function softwareJsonLd(site: URL) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": new URL("/#software", site).href,
    name: SITE.name,
    description: SITE.description,
    url: new URL("/", site).href,
    image: new URL("/og.png", site).href,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "AI agent orchestration",
    operatingSystem: SITE.beta.platforms,
    softwareVersion: SITE.beta.version,
    license: "https://opensource.org/licenses/MIT",
    codeRepository: SITE.repo,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Frank de Alcantara",
      url: "https://github.com/frankalcantara",
    },
    sameAs: [SITE.repo, SITE.x],
  };
}

/** JSON for a <script type="application/ld+json">, safe against "</script>" in config strings. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
