"use client";

/**
 * Client Shabbat gate. Mounted once in the root layout.
 * - html.shg-closed hides forms, WhatsApp/tel links and every [data-lead-cta]
 *   (rules in globals.css); #shg-bar shows the reopening time.
 * - Local windows decide on load and every 30s, so static / CF-cached HTML flips
 *   on time. /api/shabbat (runtime env) overrides when reachable: kill switch
 *   SHABBAT_GATE=0 and test override SHABBAT_FORCE=closed|open.
 */
import { useEffect, useState } from "react";
import { localWindow, reopenLabel, type GateForce, type Win } from "@/lib/shabbat";

type Api = { enabled: boolean; force: GateForce; w: Win | null };

const TICK_MS = 30_000;
const REFETCH_MS = 5 * 60_000;

export function ShabbatGate() {
  const [w, setW] = useState<Win | null>(null);

  useEffect(() => {
    let api: Api | null = null;
    let lastFetch = 0;

    const apply = () => {
      let cur: Win | null;
      if (api && !api.enabled) cur = null;
      else if (api?.force === "open") cur = null;
      else if (api?.force === "closed") cur = api.w;
      else cur = localWindow();
      document.documentElement.classList.toggle("shg-closed", Boolean(cur));
      setW(cur);
    };

    const refresh = async () => {
      lastFetch = Date.now();
      try {
        const r = await fetch("/api/shabbat", { cache: "no-store" });
        if (r.ok) api = (await r.json()) as Api;
      } catch {
        // offline / blocked: keep the local windows
      }
      apply();
    };

    apply();
    void refresh();
    const id = window.setInterval(() => {
      if (Date.now() - lastFetch >= REFETCH_MS) void refresh();
      else apply();
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div id="shg-bar" className="shg-banner" role="status" aria-live="polite">
      שבת שלום! האתר סגור לפניות בשבת ובחגי ישראל.
      {w ? <> נחזור לפעילות {reopenLabel(w)} (שעון ישראל).</> : null}
    </div>
  );
}
