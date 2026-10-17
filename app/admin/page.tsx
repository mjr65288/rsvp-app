import { redirect } from 'next/navigation';
import { activeEvent } from '@/lib/event';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { signOutAdmin } from './actions';

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect('/admin/login?error=Authentication is not configured yet.');
  const { data: { user } } = await supabase.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!user || !adminEmail || user.email?.toLowerCase() !== adminEmail) redirect('/admin/login?error=Please sign in with the organizer email.');

  const { data: rsvps, error } = await supabase.from('rsvps').select('id,guest_name,attendance,adults,children,dietary_needs,created_at').eq('event_id', activeEvent.id).order('created_at', { ascending: false });
  const guests = rsvps ?? [];
  const attending = guests.filter((r) => r.attendance === 'yes');
  const totalPeople = attending.reduce((total, r) => total + r.adults + r.children, 0);
  return <main className="admin-shell"><section className="admin-dashboard">
    <header className="admin-header"><div><p className="eyebrow">ORGANIZER DASHBOARD</p><h1>{activeEvent.celebrant}&apos;s guest list</h1><p>Private view · {user.email}</p></div><form action={signOutAdmin}><button className="text-button">Sign out</button></form></header>
    <div className="stats"><div><strong>{attending.length}</strong><span>households attending</span></div><div><strong>{totalPeople}</strong><span>people expected</span></div><div><strong>{guests.filter((r) => r.attendance === 'no').length}</strong><span>can&apos;t make it</span></div></div>
    {error && <p className="form-error" role="alert">Unable to load RSVPs right now.</p>}
    <div className="table-wrap"><table><caption className="sr-only">RSVP responses</caption><thead><tr><th scope="col">Guest</th><th scope="col">Attendance</th><th scope="col">Party</th><th scope="col">Dietary needs</th></tr></thead><tbody>{guests.map((r) => <tr key={r.id}><th scope="row">{r.guest_name}</th><td>{r.attendance === 'yes' ? 'Attending' : 'Not attending'}</td><td>{r.adults} adult{r.adults === 1 ? '' : 's'}, {r.children} child{r.children === 1 ? '' : 'ren'}</td><td>{r.dietary_needs || '—'}</td></tr>)}{guests.length === 0 && <tr><td colSpan={4}>No responses yet.</td></tr>}</tbody></table></div>
  </section></main>;
}
