/**
 * "Starting from" price anchors (ILS), based on the provider's published prices.
 * Indicative only — final quote depends on stone, size, design, inscription and
 * cemetery rules (see site.priceNote). Confirm/update before relying on these.
 */
export type PriceRow = { serviceSlug: string; label: string; from: number | null };

export const priceList: PriceRow[] = [
  { serviceSlug: "sanhedrin", label: "מצבת סנהדרין (קיר)", from: 2210 },
  { serviceSlug: "yachid", label: "מצבת יחיד", from: 4600 },
  { serviceSlug: "machpela", label: "מצבת מכפלה", from: 4620 },
  { serviceSlug: "machpela", label: "מצבת מכפלה לרוחב", from: 5980 },
  { serviceSlug: "zugit", label: "מצבה זוגית / כפולה", from: 8300 },
  { serviceSlug: "mishpachtit", label: "מצבה משפחתית", from: null },
  { serviceSlug: "granite", label: "מצבת גרניט", from: null },
  { serviceSlug: "even", label: "מצבת אבן טבעית", from: null },
  { serviceSlug: "meutzevet", label: "מצבה מעוצבת", from: null },
  { serviceSlug: "andarta", label: "אנדרטה / אתר הנצחה", from: null },
];

export const fromText = (n: number | null) =>
  n === null ? "לפי הצעת מחיר" : `החל מ-₪${n.toLocaleString("he-IL")}`;
