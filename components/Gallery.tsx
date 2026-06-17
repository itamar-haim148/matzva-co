"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./Gallery.module.css";
import { gallery as allItems, type GalleryItem } from "@/data/gallery";

export default function Gallery({
  limit,
  items,
}: {
  limit?: number;
  items?: GalleryItem[];
}) {
  const source = items ?? allItems;
  const list = limit ? source.slice(0, limit) : source;
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + list.length) % list.length)),
    [list.length]
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % list.length)),
    [list.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") next(); // RTL: left = next
      else if (e.key === "ArrowRight") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  return (
    <>
      <ul className={styles.grid} aria-label="גלריית מצבות לדוגמה">
        {list.map((g, i) => (
          <li key={g.src} className={styles.tile}>
            <button
              type="button"
              className={styles.tileBtn}
              onClick={() => setOpen(i)}
              aria-label={`הגדלת תמונה: ${g.alt}`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
                className={styles.img}
              />
              <span className={styles.zoom} aria-hidden="true">
                ⤢
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={list[open].alt}
          onClick={close}
        >
          <button
            className={`${styles.lbBtn} ${styles.lbClose}`}
            onClick={close}
            aria-label="סגירה"
          >
            ✕
          </button>
          <button
            className={`${styles.lbBtn} ${styles.lbNext}`}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="הבא"
          >
            ‹
          </button>
          <button
            className={`${styles.lbBtn} ${styles.lbPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="הקודם"
          >
            ›
          </button>
          <figure className={styles.lbFig} onClick={(e) => e.stopPropagation()}>
            <Image
              src={list[open].src}
              alt={list[open].alt}
              width={1200}
              height={900}
              className={styles.lbImg}
            />
            <figcaption className={styles.lbCaption}>
              {list[open].alt} · {open + 1}/{list.length}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
