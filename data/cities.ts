/**
 * Cities / yishuvim within ~30km of Jerusalem — drives the Service×City grid.
 * `slug` is ASCII (Hebrew route segments break Next static export); Hebrew names
 * stay in `name`/`inForm` and appear in every title, H1 and breadcrumb.
 */

export type City = {
  slug: string;
  name: string; // "ירושלים"
  inForm: string; // "בירושלים" (for headlines "מצבות בירושלים")
  approxKmFromJerusalem: number;
};

export const cities: City[] = [
  { slug: "jerusalem", name: "ירושלים", inForm: "בירושלים", approxKmFromJerusalem: 0 },
  { slug: "mevaseret-tzion", name: "מבשרת ציון", inForm: "במבשרת ציון", approxKmFromJerusalem: 8 },
  { slug: "motza", name: "מוצא", inForm: "במוצא", approxKmFromJerusalem: 7 },
  { slug: "givat-zeev", name: "גבעת זאב", inForm: "בגבעת זאב", approxKmFromJerusalem: 9 },
  { slug: "maale-adumim", name: "מעלה אדומים", inForm: "במעלה אדומים", approxKmFromJerusalem: 11 },
  { slug: "har-adar", name: "הר אדר", inForm: "בהר אדר", approxKmFromJerusalem: 12 },
  { slug: "abu-gosh", name: "אבו גוש", inForm: "באבו גוש", approxKmFromJerusalem: 13 },
  { slug: "tzur-hadassah", name: "צור הדסה", inForm: "בצור הדסה", approxKmFromJerusalem: 14 },
  { slug: "beitar-illit", name: "ביתר עילית", inForm: "בביתר עילית", approxKmFromJerusalem: 16 },
  { slug: "beit-shemesh", name: "בית שמש", inForm: "בבית שמש", approxKmFromJerusalem: 22 },
  { slug: "gush-etzion", name: "גוש עציון", inForm: "בגוש עציון", approxKmFromJerusalem: 18 },
  { slug: "efrat", name: "אפרת", inForm: "באפרת", approxKmFromJerusalem: 20 },
  { slug: "alon-shvut", name: "אלון שבות", inForm: "באלון שבות", approxKmFromJerusalem: 20 },
  { slug: "neve-daniel", name: "נווה דניאל", inForm: "בנווה דניאל", approxKmFromJerusalem: 17 },
  { slug: "kiryat-yearim", name: "קרית יערים (טלזסטון)", inForm: "בקרית יערים", approxKmFromJerusalem: 13 },
  { slug: "beit-zait", name: "בית זית", inForm: "בבית זית", approxKmFromJerusalem: 8 },
  { slug: "ora", name: "אורה", inForm: "באורה", approxKmFromJerusalem: 7 },
  { slug: "aminadav", name: "עמינדב", inForm: "בעמינדב", approxKmFromJerusalem: 8 },
  { slug: "tzova", name: "צובה", inForm: "בצובה", approxKmFromJerusalem: 12 },
  { slug: "shoresh", name: "שורש", inForm: "בשורש", approxKmFromJerusalem: 15 },
  { slug: "kfar-adumim", name: "כפר אדומים", inForm: "בכפר אדומים", approxKmFromJerusalem: 12 },
  { slug: "adam-geva-binyamin", name: "אדם (גבע בנימין)", inForm: "באדם", approxKmFromJerusalem: 12 },
  { slug: "tekoa", name: "תקוע", inForm: "בתקוע", approxKmFromJerusalem: 20 },
  { slug: "migdal-oz", name: "מגדל עוז", inForm: "במגדל עוז", approxKmFromJerusalem: 22 },
  { slug: "bat-ayin", name: "בת עין", inForm: "בבת עין", approxKmFromJerusalem: 22 },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
