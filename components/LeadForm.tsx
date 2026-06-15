"use client";

import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { submitLead, type LeadState } from "@/app/actions";
import styles from "./LeadForm.module.css";

const initial: LeadState = { ok: false, message: "" };

export default function LeadForm({ heading }: { heading?: string }) {
  const [state, formAction, pending] = useActionState(submitLead, initial);
  const pathname = usePathname();

  if (state.ok) {
    return (
      <div className={styles.card} role="status" aria-live="polite">
        <h2 className={styles.title}>{heading ?? "השארת פרטים"}</h2>
        <p className={styles.success}>{state.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{heading ?? "השאירו פרטים ונחזור אליכם"}</h2>
      <p className={styles.sub}>ליווי אישי, ללא התחייבות.</p>

      <form className={styles.form} action={formAction} noValidate>
        <input type="hidden" name="source_path" value={pathname ?? ""} />
        {/* honeypot */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className={styles.hp}
          aria-hidden="true"
        />

        <div className={styles.field}>
          <label htmlFor="lf-name">שם מלא</label>
          <input
            id="lf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={!!state.errors?.name}
            aria-describedby={state.errors?.name ? "err-name" : undefined}
          />
          {state.errors?.name && (
            <span id="err-name" className={styles.err}>
              {state.errors.name}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="lf-phone">טלפון</label>
          <input
            id="lf-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={!!state.errors?.phone}
            aria-describedby={state.errors?.phone ? "err-phone" : undefined}
          />
          {state.errors?.phone && (
            <span id="err-phone" className={styles.err}>
              {state.errors.phone}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="lf-address">יישוב / כתובת</label>
          <input
            id="lf-address"
            name="address"
            type="text"
            autoComplete="address-level2"
            required
            aria-invalid={!!state.errors?.address}
            aria-describedby={state.errors?.address ? "err-address" : undefined}
          />
          {state.errors?.address && (
            <span id="err-address" className={styles.err}>
              {state.errors.address}
            </span>
          )}
        </div>

        {state.message && !state.ok && (
          <p className={styles.formErr} role="alert">
            {state.message}
          </p>
        )}

        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? "שולח..." : "שליחה"}
        </button>
      </form>
    </div>
  );
}
