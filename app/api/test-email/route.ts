import { NextResponse } from "next/server";

// TEMPORARY diagnostic route — verifies the server -> Brevo path from the
// authorized server IP. Protected by TEST_EMAIL_KEY. Remove after verifying.
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("key") !== process.env.TEST_EMAIL_KEY) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const key = process.env.BREVO_API_KEY;
  const to = process.env.LEADS_NOTIFY_EMAIL;
  const from = process.env.BREVO_SENDER_EMAIL;
  if (!key || !to || !from) {
    return NextResponse.json({
      ok: false,
      reason: "missing env",
      have: { key: !!key, to: !!to, from: !!from },
    });
  }
  const r = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": key,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: from, name: "מצבה יהודית — בדיקה" },
      to: [{ email: to }],
      subject: "בדיקת Brevo — מצבה יהודית",
      htmlContent:
        "<div dir='rtl'>בדיקת חיבור Brevo הצליחה. ניתן להתעלם מהודעה זו.</div>",
    }),
  });
  const body = await r.text();
  return NextResponse.json({ ok: r.ok, status: r.status, body: body.slice(0, 400) });
}
