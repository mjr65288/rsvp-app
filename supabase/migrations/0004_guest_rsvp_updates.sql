create extension if not exists "pgcrypto";

alter table public.rsvps add column if not exists edit_token uuid default gen_random_uuid();
update public.rsvps set edit_token = gen_random_uuid() where edit_token is null;
alter table public.rsvps alter column edit_token set not null;
create unique index if not exists rsvps_edit_token_idx on public.rsvps (edit_token);

grant select on public.rsvps to anon;
grant update on public.rsvps to anon;

create policy "guests can read their rsvp by edit token"
  on public.rsvps for select to anon
  using (edit_token = (select nullif(current_setting('request.headers', true)::json ->> 'x-rsvp-edit-token', ''))::uuid);

create policy "guests can update their rsvp by edit token"
  on public.rsvps for update to anon
  using (edit_token = (select nullif(current_setting('request.headers', true)::json ->> 'x-rsvp-edit-token', ''))::uuid)
  with check (edit_token = (select nullif(current_setting('request.headers', true)::json ->> 'x-rsvp-edit-token', ''))::uuid);
