-- מצבה יהודית — initial schema
-- Run against the self-hosted Supabase Postgres (Coolify).

create extension if not exists "pgcrypto";

-- Leads from the contact form
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  address     text not null,
  source_path text,
  service_slug text,
  city_slug    text,
  status      text not null default 'new', -- new | contacted | quoted | won | lost
  created_at  timestamptz not null default now()
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- Appointments / scheduled visits
create table if not exists public.appointments (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid references public.leads (id) on delete set null,
  scheduled_for timestamptz,
  location   text,
  notes      text,
  created_at timestamptz not null default now()
);

-- Service catalogue (mirrors data/services.ts; optional CMS source of truth)
create table if not exists public.services (
  slug        text primary key,
  name        text not null,
  short       text,
  intro       text,
  sort_order  int default 0
);

-- Cities / areas served (mirrors data/cities.ts)
create table if not exists public.cities (
  slug        text primary key,
  name        text not null,
  in_form     text not null,
  approx_km   int default 0
);

-- Q&A used for FAQ sections / FAQPage schema
create table if not exists public.qa (
  id           uuid primary key default gen_random_uuid(),
  service_slug text references public.services (slug) on delete cascade,
  city_slug    text references public.cities (slug) on delete cascade,
  question     text not null,
  answer       text not null,
  sort_order   int default 0
);

-- Row Level Security: leads/appointments are written by the server (service role,
-- which bypasses RLS). Deny public access by default.
alter table public.leads enable row level security;
alter table public.appointments enable row level security;
