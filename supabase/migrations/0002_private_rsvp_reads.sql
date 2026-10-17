create table if not exists public.organizers (
  email text primary key check (position('@' in email) > 1)
);

alter table public.organizers enable row level security;
alter table public.organizers add constraint organizers_email_lowercase check (email = lower(email));

create policy "organizers can read their own row"
  on public.organizers for select to authenticated
  using (email = (select auth.jwt() ->> 'email'));

create policy "registered organizers can read rsvps"
  on public.rsvps for select to authenticated
  using (exists (
    select 1 from public.organizers
    where email = (select auth.jwt() ->> 'email')
  ));

grant select on public.organizers to authenticated;
grant select on public.rsvps to authenticated;
