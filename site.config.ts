/**
 * Single source of truth for brand, contact (NAP) and SEO defaults.
 * All values verified from matzva.co. Do NOT invent data here.
 */

export const site = {
  brand: "מצבה יהודית",
  domain: (process.env.NEXT_PUBLIC_SITE_URL || "https://matzva.co").replace(
    /\/$/,
    ""
  ),
  locale: "he_IL",
  lang: "he",
  dir: "rtl" as const,

  // SEO positioning
  tagline: "הקמת מצבות בירושלים והסביבה — על פי ההלכה היהודית",
  shortDescription:
    "הקמת מצבות בירושלים ובכל יישובי האזור, בעבודת אמן ובכבוד הראוי, על פי המסורת וההלכה היהודית. ליווי אישי מרגע הפנייה ועד הקמת המצבה.",

  // Contact
  phone: { display: "072-3311061", tel: "+97223311061" },
  whatsapp: { display: "054-6272421", intl: "972546272421" },
  email: "office@matzva.co", // verify before launch

  // Service-area business (no public street address)
  serviceArea: "ירושלים והסביבה",
  country: "IL",

  // Cloudflare Turnstile public site key (NOT secret — safe to expose).
  // Fill in after creating the widget; secret goes in TURNSTILE_SECRET_KEY env.
  turnstileSiteKey: "0x4AAAAAADmRpBb3PqhLs-ln",

  // Google Place ID for the reviews widget (real reviews via Places API).
  // Needs GOOGLE_PLACES_API_KEY env too. Empty = reviews section hidden.
  googlePlaceId: "",

  // Primary SEO geography
  primaryCity: "ירושלים",
  serviceRadiusKm: 30,

  // Honest "starting from" price anchor (from the brand's own published prices).
  // Indicative only — confirm/update before launch.
  priceFrom: 2210,
  priceNote:
    'מחיר "החל מ-" הוא להמחשה בלבד ותלוי בסוג האבן, במידות, בעיצוב ובכיתוב וכן בדרישות בית העלמין. הצעת מחיר מדויקת ושקופה נמסרת בפנייה, ללא התחייבות.',
} as const;

export const priceFromText = () => `מצבות החל מ-₪${site.priceFrom.toLocaleString("he-IL")}`;

export const whatsappLink = (msg?: string) =>
  `https://wa.me/${site.whatsapp.intl}${
    msg ? `?text=${encodeURIComponent(msg)}` : ""
  }`;

export const telLink = () => `tel:${site.phone.tel}`;
