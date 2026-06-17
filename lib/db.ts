import { Pool } from "pg";

/**
 * Postgres (Coolify) connection for lead persistence.
 * Returns null when DATABASE_URL is not set, so callers degrade gracefully.
 */
let pool: Pool | null | undefined;

function getPool(): Pool | null {
  if (pool !== undefined) return pool;
  const url = process.env.DATABASE_URL;
  pool = url ? new Pool({ connectionString: url, max: 3 }) : null;
  return pool;
}

let ensured = false;
async function ensureSchema(p: Pool) {
  if (ensured) return;
  await p.query(`
    create table if not exists leads (
      id          uuid primary key default gen_random_uuid(),
      name        text not null,
      phone       text not null,
      address     text not null,
      notes       text,
      source_path text,
      status      text not null default 'new',
      created_at  timestamptz not null default now()
    )
  `);
  // Idempotent column add for pre-existing tables.
  await p.query("alter table leads add column if not exists notes text");
  ensured = true;
}

export type LeadRecord = {
  name: string;
  phone: string;
  address: string;
  notes?: string | null;
  source_path?: string | null;
};

export const isDbConfigured = () => Boolean(process.env.DATABASE_URL);

/** Insert a lead. Returns true if persisted, false if no DB configured. Throws on DB error. */
export async function insertLead(rec: LeadRecord): Promise<boolean> {
  const p = getPool();
  if (!p) return false;
  await ensureSchema(p);
  await p.query(
    "insert into leads (name, phone, address, notes, source_path) values ($1, $2, $3, $4, $5)",
    [rec.name, rec.phone, rec.address, rec.notes ?? null, rec.source_path ?? null]
  );
  return true;
}
