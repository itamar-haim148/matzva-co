import { site } from "@/site.config";

export type QA = { q: string; a: string };

export function localBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.brand,
    description: site.shortDescription,
    url: site.domain,
    telephone: site.phone.tel,
    image: `${site.domain}/og.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.primaryCity,
      addressCountry: site.country,
    },
    areaServed: { "@type": "City", name: site.primaryCity },
    priceRange: "₪₪",
  };
}

export function faqPage(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.domain}${t.path}`,
    })),
  };
}

export function serviceSchema(name: string, description: string, area: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    description,
    provider: { "@type": "LocalBusiness", name: site.brand, url: site.domain },
    areaServed: { "@type": "City", name: area },
  };
}
