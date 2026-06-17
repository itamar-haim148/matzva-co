import styles from "./GoogleReviews.module.css";
import { site } from "@/site.config";

type Review = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
};
type PlaceResult = {
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    reviews?: Review[];
  };
};

/**
 * Google reviews — REAL reviews only, via the Places API.
 * Renders nothing unless GOOGLE_PLACES_API_KEY + site.googlePlaceId are set.
 * (Never fabricates testimonials.)
 */
export default async function GoogleReviews() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = site.googlePlaceId;
  if (!key || !placeId) return null;

  let data: PlaceResult["result"] | undefined;
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&fields=name,rating,user_ratings_total,reviews&language=he&reviews_sort=newest&key=${key}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    data = ((await res.json()) as PlaceResult).result;
  } catch {
    return null;
  }
  const reviews = (data?.reviews ?? []).filter((r) => r.text?.trim()).slice(0, 6);
  if (!reviews.length) return null;

  const stars = (n: number) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

  return (
    <div className={styles.wrap}>
      {data?.rating && (
        <p className={styles.summary}>
          <span className={styles.stars}>{stars(data.rating)}</span>{" "}
          {data.rating.toFixed(1)} מתוך 5
          {data.user_ratings_total ? ` · ${data.user_ratings_total} ביקורות בגוגל` : ""}
        </p>
      )}
      <ul className={styles.grid}>
        {reviews.map((r, i) => (
          <li key={i} className={styles.card}>
            <div className={styles.stars} aria-label={`${r.rating} כוכבים`}>
              {stars(r.rating)}
            </div>
            <p className={styles.text}>{r.text}</p>
            <p className={styles.author}>
              — {r.author_name}
              {r.relative_time_description ? ` · ${r.relative_time_description}` : ""}
            </p>
          </li>
        ))}
      </ul>
      <p className={styles.src}>המלצות אמיתיות מתוך Google · {site.brand}</p>
    </div>
  );
}
