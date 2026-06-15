"use server";

import { insertLead } from "@/lib/db";

export type LeadState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"name" | "phone" | "address", string>>;
};

const phoneRe = /^0\d{1,2}[-\s]?\d{7}$/;

export async function submitLead(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  // Honeypot — bots fill hidden fields.
  if ((formData.get("company") as string)?.trim()) {
    return { ok: true, message: "תודה, נחזור אליכם בהקדם." };
  }

  const name = (formData.get("name") as string)?.trim() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const address = (formData.get("address") as string)?.trim() ?? "";

  const errors: LeadState["errors"] = {};
  if (name.length < 2) errors.name = "נא להזין שם מלא.";
  if (!phoneRe.test(phone.replace(/\s/g, "")))
    errors.phone = "נא להזין מספר טלפון תקין.";
  if (address.length < 2) errors.address = "נא להזין יישוב או כתובת.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "נא לתקן את השדות המסומנים.", errors };
  }

  const sourcePath = (formData.get("source_path") as string) || null;
  const record = { name, phone, address, source_path: sourcePath };

  try {
    const persisted = await insertLead(record);
    if (!persisted) {
      // No DB configured — record server-side so submissions aren't lost.
      console.info("[LEAD]", { ...record, at: new Date().toISOString() });
    }
  } catch (err) {
    // Never lose a lead: log it even if the DB write fails.
    console.error("[LEAD] db insert failed:", (err as Error).message);
    console.info("[LEAD:fallback]", record);
  }

  return {
    ok: true,
    message: "תודה! קיבלנו את הפנייה ונחזור אליכם בהקדם.",
  };
}
