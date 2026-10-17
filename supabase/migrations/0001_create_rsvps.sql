create extension if not exists "pgcrypto";

create table if not exists public.events (
  id text primary key,
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id text not null references public.events(id) on delete cascade,
  guest_name text not null check (char_length(guest_name) between 2 and 100),
  attendance text not null check (attendance in ('yes', 'no')),
  adults integer not null default 0 check (adults between 0 and 20),
  children integer not null default 0 check (children between 0 and 20),
  dietary_needs text check (dietary_needs is null or char_length(dietary_needs) <= 500),
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;
alter table public.rsvps enable row level security;

create policy "public can read event identity"
  on public.events for select to anon, authenticated using (true);
create policy "public can submit rsvps"
  on public.rsvps for insert to anon, authenticated with check (true);

insert into public.events (id, slug, name)
values ('aylin-birthday-5', 'aylin-turns-five', 'Aylin turns 5')
on conflict (id) do update set slug = excluded.slug, name = excluded.name;
