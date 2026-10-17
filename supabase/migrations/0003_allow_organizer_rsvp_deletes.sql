create policy "registered organizers can delete rsvps"
  on public.rsvps for delete to authenticated
  using (exists (
    select 1 from public.organizers
    where email = (select auth.jwt() ->> 'email')
  ));
