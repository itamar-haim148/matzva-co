/**
 * Shabbat / Yom Tov gate (shared spec v1 `wp/shabbat-heter-shared/SPEC.md`, profile il_ua: lead site).
 *
 * Windows are pre-computed (Jerusalem IL calendar, candle -40, close at candle
 * lighting -15 min; Uman diaspora 2-day Yom Tov; open at sunset +72 min;
 * Tisha B'Av; Erev Yom Kippur) and regenerated with shabbat-heter-shared/gen.mjs
 * before valid_until (2029-12-31).
 *
 * Server (runtime env, restart only, no rebuild):
 *   SHABBAT_GATE=0             kill switch
 *   SHABBAT_FORCE=closed|open  test override (unset = auto)
 * Client build-time kill switch: NEXT_PUBLIC_SHABBAT_GATE=0.
 */
import data from "./shabbat-windows.json";

export type Win = [number, number];
export const WINDOWS: Win[] = (data as unknown as { w: Win[] }).w;

export const GATE_BUILD_ENABLED = process.env.NEXT_PUBLIC_SHABBAT_GATE !== "0";

/** Window from the pre-computed data only (no env overrides). */
export function localWindow(nowMs: number = Date.now()): Win | null {
  const now = Math.floor(nowMs / 1000);
  for (const w of WINDOWS) {
    if (now >= w[0] && now < w[1]) return w;
    if (w[0] > now) break;
  }
  return null;
}

export type GateForce = "closed" | "open" | null;

/** Server-side state, honouring the runtime kill switch and test override. */
export function gateState(nowMs: number = Date.now()): { enabled: boolean; force: GateForce; w: Win | null } {
  const enabled = GATE_BUILD_ENABLED && process.env.SHABBAT_GATE !== "0";
  const f = process.env.SHABBAT_FORCE;
  const force: GateForce = f === "closed" || f === "open" ? f : null;
  if (!enabled || force === "open") return { enabled, force, w: null };
  const now = Math.floor(nowMs / 1000);
  if (force === "closed") return { enabled, force, w: localWindow(nowMs) ?? [now - 60, now + 3600] };
  return { enabled, force, w: localWindow(nowMs) };
}

/** Server: the active closed window, or null when open. */
export function shabbatWindow(nowMs: number = Date.now()): Win | null {
  return gateState(nowMs).w;
}

export function reopenLabel(w: Win): string {
  return new Intl.DateTimeFormat("he-IL", {
    timeZone: "Asia/Jerusalem",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(w[1] * 1000));
}

export const SHABBAT_CLOSED_MSG_HE =
  "האתר סגור לפניות בשבת ובחגי ישראל. נשמח לחזור אליכם במוצאי השבת או החג.";

/** True when the client gate has closed the site (html.shg-closed). */
export function clientClosed(): boolean {
  return typeof document !== "undefined" && document.documentElement.classList.contains("shg-closed");
}

/** Pre-paint script: sets html.shg-closed before the body renders (cache-safe). */
export function prepaintScript(nowMs: number = Date.now()): string {
  const now = Math.floor(nowMs / 1000);
  const future = WINDOWS.filter((w) => w[1] > now);
  return `(function(){try{var w=${JSON.stringify(future)},n=Date.now()/1e3;for(var i=0;i<w.length;i++){if(n>=w[i][0]&&n<w[i][1]){document.documentElement.classList.add("shg-closed");break}if(w[i][0]>n)break}}catch(e){}})();`;
}
