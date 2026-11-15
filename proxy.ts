import { NextResponse, type NextRequest } from "next/server";
import { SHABBAT_CLOSED_MSG_HE, shabbatWindow } from "@/lib/shabbat";

/**
 * Shabbat / Yom Tov gate (hard server layer): reject Server Action POSTs (the
 * lead form) with 423 while closed. Page GETs are never blocked (pages stay 200).
 * Kill: SHABBAT_GATE=0. Test: SHABBAT_FORCE=closed|open.
 */
export function proxy(req: NextRequest) {
  if (req.method === "POST" && req.headers.has("next-action")) {
    const w = shabbatWindow();
    if (w) {
      return NextResponse.json(
        { ok: false, closed: true, message: SHABBAT_CLOSED_MSG_HE, reopen: w[1] },
        { status: 423, headers: { "Cache-Control": "no-store" } },
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|gif|svg|webp|avif|ico|css|js|map|woff2?|txt|xml)$).*)"],
};
