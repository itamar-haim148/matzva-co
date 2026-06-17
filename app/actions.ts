"use server";

import { headers } from "next/headers";
import { insertLead } from "@/lib/db";

export type LeadState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"name" | "phone" | "address", string>>;
};

const phoneRe = /^0\d{1,2}[-\s]?\d{7}$/;

/** Verify Cloudflare Turnstile token. Skips (returns true) if not configured. */
async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.append("remoteip", ip);
    const r = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body }
    );
    const j = (await r.json()) as { success?: boolean };
    return Boolean(j.success);
  } catch {
    return false;
  }
}

const esc = (s: string) =>
  s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] || c));

/** Email the lead via Brevo. No-op if not configured. */
async function notifyBrevo(rec: {
  name: string;
  phone: string;
  address: string;
  notes?: string | null;
  source_path?: string | null;
}) {
  const key = process.env.BREVO_API_KEY;
  const to = process.env.LEADS_NOTIFY_EMAIL;
  const from = process.env.BREVO_SENDER_EMAIL;
  if (!key || !to || !from) return;
  try {
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": key,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: from, name: "מצבה יהודית — לידים" },
        to: [{ email: to }],
        subject: `ליד חדש מהאתר: ${rec.name}`,
        htmlContent: `<div dir="rtl" style="font-family:Arial,sans-serif">
          <h2>ליד חדש מהאתר</h2>
          <p><b>שם:</b> ${esc(rec.name)}</p>
          <p><b>טלפון:</b> ${esc(rec.phone)}</p>
          <p><b>יישוב/כתובת:</b> ${esc(rec.address)}</p>
          <p><b>הערות:</b> ${esc(rec.notes || "—")}</p>
          <p><b>עמוד מקור:</b> ${esc(rec.source_path || "—")}</p>
        </div>`,
      }),
    });
  } catch (err) {
    console.error("[LEAD] brevo email failed:", (err as Error).message);
  }
}

export async function submitLead(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  // Honeypot — bots fill hidden fields.
  if ((formData.get("company") as string)?.trim()) {
    return { ok: true, message: "תודה, נחזור אליכם בהקדם." };
  }

  // Bot protection (Cloudflare Turnstile) — only enforced when configured.
  const token = (formData.get("cf-turnstile-response") as string) || "";
  let ip: string | undefined;
  try {
    const h = await headers();
    ip = h.get("cf-connecting-ip") || h.get("x-forwarded-for") || undefined;
  } catch {
    /* ignore */
  }
  if (!(await verifyTurnstile(token, ip))) {
    return { ok: false, message: "אימות אנושי נכשל. נסו שוב או חייגו אלינו." };
  }

  const name = (formData.get("name") as string)?.trim() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const address = (formData.get("address") as string)?.trim() ?? "";
  const notes = ((formData.get("notes") as string) ?? "").trim().slice(0, 1000);

  const errors: LeadState["errors"] = {};
  if (name.length < 2) errors.name = "נא להזין שם מלא.";
  if (!phoneRe.test(phone.replace(/\s/g, "")))
    errors.phone = "נא להזין מספר טלפון תקין.";
  if (address.length < 2) errors.address = "נא להזין יישוב או כתובת.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "נא לתקן את השדות המסומנים.", errors };
  }

  const sourcePath = (formData.get("source_path") as string) || null;
  const record = { name, phone, address, notes: notes || null, source_path: sourcePath };

  try {
    const persisted = await insertLead(record);
    if (!persisted) {
      console.info("[LEAD]", { ...record, at: new Date().toISOString() });
    }
  } catch (err) {
    console.error("[LEAD] db insert failed:", (err as Error).message);
    console.info("[LEAD:fallback]", record);
  }

  await notifyBrevo(record);

  return {
    ok: true,
    message: "תודה! קיבלנו את הפנייה ונחזור אליכם בהקדם.",
  };
}
