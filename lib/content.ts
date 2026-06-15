/**
 * Programmatic copy generator for the Service×City grid.
 * Goal: genuinely varied, useful, honest Hebrew — NOT spun duplicates.
 * Variation is deterministic (keyed by service+city index) so each page differs
 * but builds are reproducible.
 */

import type { Service } from "@/data/services";
import type { City } from "@/data/cities";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import type { QA } from "@/lib/schema";

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

const seedOf = (s: Service, c: City) =>
  s.slug.length * 7 + c.slug.length * 3 + c.approxKmFromJerusalem;

/** Lead paragraph — 5 templates, rotated. */
export function gridLead(s: Service, c: City): string {
  const t = [
    `${s.name} ${c.inForm} דורשת ידיים מנוסות, חומר איכותי וכבוד אמיתי לנפטר. ב"מצבה יהודית" אנו מקימים ${s.name.replace(
      "מצבת",
      "מצבות"
    )} ${c.inForm} ובכל אזור ירושלים, על פי המסורת וההלכה, ובליווי אישי מהשיחה הראשונה ועד ההצבה.`,
    `מחפשים ${s.name} ${c.inForm}? אנו מתמחים בהקמת מצבות בירושלים ובסביבתה, כולל ${c.name}, ומקפידים על גימור מוקפד, כיתוב מדויק ועמידה בכללי בית העלמין המקומי.`,
    `הקמת ${s.name} ${c.inForm} היא תהליך רגיש. אנחנו כאן כדי לעשות אותו פשוט וברור: בחירת אבן, ניסוח הכיתוב, תיאום מול בית העלמין והצבה — הכל בכבוד הראוי ובלוח זמנים ריאלי.`,
    `${s.name} ${c.inForm} בעבודת אמן. אנו משרתים את ${c.name} ואת יישובי האזור (כ-${c.approxKmFromJerusalem} ק"מ מירושלים), ומלווים כל משפחה באופן אישי לאורך כל הדרך.`,
    `ב"מצבה יהודית" מקימים ${s.name} ${c.inForm} לפי ההלכה היהודית. אנו דואגים לכל הפרטים — מהאבן ועד הכיתוב — כדי שהמצבה תעמוד בכבוד לאורך שנים.`,
  ];
  return pick(t, seedOf(s, c));
}

/** "About" body paragraph — combines service intro with local context. */
export function gridBody(s: Service, c: City): string {
  const local =
    c.approxKmFromJerusalem === 0
      ? `ירושלים מרכזת חלק גדול מבתי העלמין המרכזיים בארץ, ולכל בית עלמין כללים משלו לגבי סוגי המצבות, המידות והחומרים המותרים. אנו מכירים את הדרישות ופועלים לפיהן.`
      : `${c.name} נמצאת במרחק של כ-${c.approxKmFromJerusalem} ק"מ מירושלים, ואנו מגיעים אליה ואל בתי העלמין באזור באופן שוטף. אנו מתאמים מראש את כל הדרישות מול בית העלמין הרלוונטי.`;
  return `${s.intro} ${local}`;
}

export const processSteps: { title: string; text: string }[] = [
  {
    title: "פנייה וייעוץ",
    text: "שיחה אישית להבנת הצרכים, סוג החלקה ובית העלמין, וקבלת הצעת מחיר שקופה.",
  },
  {
    title: "בחירת אבן ועיצוב",
    text: "בחירת סוג האבן, הצורה והגימור, וניסוח הכיתוב יחד עם המשפחה.",
  },
  {
    title: "אישורים ותיאום",
    text: "טיפול באישורים הנדרשים ותיאום מועד ההקמה מול בית העלמין.",
  },
  {
    title: "הקמה והצבה",
    text: "ביצוע העבודה בשטח בדייקנות ובכבוד, ובדיקת איכות סופית.",
  },
];

export const priceFactors: string[] = [
  "סוג האבן (גרניט, אבן טבעית/ירושלמית ועוד) והגוון הנבחר",
  "מידות המצבה והאם מדובר ביחיד, זוגית או חלקה משפחתית",
  "מורכבות העיצוב, התבליטים והכיתוב",
  "דרישות וכללים של בית העלמין הספציפי",
];

/** Per-page FAQ — mixes generic with service/city-specific. */
export function gridFaq(s: Service, c: City): QA[] {
  return [
    {
      q: `כמה עולה ${s.name} ${c.inForm}?`,
      a: `המחיר של ${s.name} ${c.inForm} נקבע לפי סוג האבן, המידות, מורכבות הכיתוב והעיצוב, וכללי בית העלמין. אנו מוסרים הצעת מחיר מפורטת ושקופה מראש, ללא הפתעות.`,
    },
    {
      q: `האם אתם מקימים ${s.name} בכל בתי העלמין ${c.inForm}?`,
      a: `אנו פועלים בבתי העלמין ${c.inForm} ובאזור ירושלים בכפוף לכללים של כל בית עלמין. בשיחה נוודא יחד את הדרישות הספציפיות של החלקה שלכם.`,
    },
    {
      q: `תוך כמה זמן ניתן להקים את המצבה?`,
      a: `לוח הזמנים תלוי בסוג המצבה, בזמינות החומר ובאישורי בית העלמין. לאחר בדיקת הפרטים נמסור לכם הערכת זמן ריאלית ומחייבת ככל הניתן.`,
    },
    {
      q: `האם המצבה מוקמת על פי ההלכה?`,
      a: `כן. כל מצבה מוקמת בהתאם למסורת ולהלכה היהודית ובכפוף לכללי בית העלמין.`,
    },
  ];
}

/** Nearby cities (by distance) for internal linking. */
export function nearbyCities(c: City, n = 5): City[] {
  return cities
    .filter((x) => x.slug !== c.slug)
    .sort(
      (a, b) =>
        Math.abs(a.approxKmFromJerusalem - c.approxKmFromJerusalem) -
        Math.abs(b.approxKmFromJerusalem - c.approxKmFromJerusalem)
    )
    .slice(0, n);
}

/** Other services for internal linking. */
export function otherServices(s: Service, n = 5): Service[] {
  return services.filter((x) => x.slug !== s.slug).slice(0, n);
}
