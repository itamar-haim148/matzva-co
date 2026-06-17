/**
 * Gallery of real headstone work (self-hosted in /public/images/gallery, EXIF
 * stripped). Organized by category. Alt/descriptions are honest and generic —
 * no third-party branding, no claims beyond "example of our work".
 */
export type GalleryCat = "even" | "granite" | "couple-family" | "designed";

export type GalleryItem = { src: string; alt: string; cat: GalleryCat };

export const galleryCategories: { key: GalleryCat; title: string; desc: string }[] = [
  {
    key: "even",
    title: "מצבות אבן ואבן ירושלמית",
    desc: "מצבות אבן טבעית ואבן ירושלמית קלאסית — מראה מסורתי וחם המתחבר לנוף ולמסורת של ירושלים.",
  },
  {
    key: "granite",
    title: "מצבות גרניט",
    desc: "מצבות גרניט עמידות במגוון גוונים, ששומרות על מראהן לאורך שנים גם בתנאי מזג האוויר.",
  },
  {
    key: "couple-family",
    title: "מצבות זוגיות ומשפחתיות",
    desc: "מצבות לבני זוג ולחלקות משפחה, בעיצוב הרמוני המאחד בין הדורות בכבוד.",
  },
  {
    key: "designed",
    title: "מצבות מעוצבות ומיוחדות",
    desc: "מצבות בעיצוב אישי — צורות, סמלים וכיתוב ייחודיים — תוך שמירה על כבוד ועל ההלכה.",
  },
];

export const gallery: GalleryItem[] = [
  { src: "/images/gallery/matzeva-2.webp", alt: "מצבת אבן בעבודת אמן", cat: "even" },
  { src: "/images/gallery/matzeva-5.webp", alt: "מצבת אבן בעיצוב קלאסי", cat: "even" },
  { src: "/images/gallery/matzeva-6.webp", alt: "מצבת אבן ירושלמית", cat: "even" },
  { src: "/images/gallery/matzeva-9.webp", alt: "מצבת אבן עם גימור מוקפד", cat: "even" },
  { src: "/images/gallery/matzeva-10.webp", alt: "מצבת אבן בעבודת יד", cat: "even" },
  { src: "/images/gallery/matzeva-12.webp", alt: "מצבה בסגנון מסורתי", cat: "even" },
  { src: "/images/gallery/matzeva-4.webp", alt: "מצבת גרניט עם כיתוב מוקפד", cat: "granite" },
  { src: "/images/gallery/matzeva-13.webp", alt: "מצבת גרניט בגוון כהה", cat: "granite" },
  { src: "/images/gallery/matzeva-7.webp", alt: "מצבה זוגית בעיצוב הרמוני", cat: "couple-family" },
  { src: "/images/gallery/matzeva-8.webp", alt: "מצבה משפחתית", cat: "couple-family" },
  { src: "/images/gallery/matzeva-3.webp", alt: "מצבה מעוצבת בכבוד ובדייקנות", cat: "designed" },
  { src: "/images/gallery/matzeva-11.webp", alt: "מצבה מעוצבת לזכר יקיר", cat: "designed" },
  { src: "/images/gallery/matzeva-14.webp", alt: "מצבה עם כיתוב על פי ההלכה", cat: "designed" },
];

export const galleryByCat = (cat: GalleryCat) => gallery.filter((g) => g.cat === cat);
