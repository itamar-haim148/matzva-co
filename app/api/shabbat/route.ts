/**
 * GET /api/shabbat: authoritative gate state for the client gate, so the
 * runtime kill switch / test override (SHABBAT_GATE, SHABBAT_FORCE) reach
 * static and edge-cached pages without a rebuild.
 */
import { gateState } from "@/lib/shabbat";

export const dynamic = "force-dynamic";

export function GET() {
  const s = gateState();
  return Response.json(
    { enabled: s.enabled, force: s.force, closed: Boolean(s.w), w: s.w },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
