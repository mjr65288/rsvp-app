import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { activeEvent } from '@/lib/event';
import { eventCopy, resolveLocale } from '@/lib/i18n';
import { EditRsvpForm } from './edit-rsvp-form';

type Props = { params: Promise<{ token: string }>; searchParams: Promise<{ lang?: string }> };

export default async function EditRsvpPage({ params, searchParams }: Props) {
  const { token } = await params;
  const locale = resolveLocale((await searchParams).lang, (await headers()).get('accept-language'));
  const copy = eventCopy(locale);
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) notFound();
  const supabase = createClient(url, key, { auth: { persistSession: false }, global: { headers: { 'x-rsvp-edit-token': token } } });
  const { data } = await supabase.from('rsvps').select('guest_name,attendance,adults,children,dietary_needs').eq('event_id', activeEvent.id).eq('edit_token', token).maybeSingle();
  if (!data || (data.attendance !== 'yes' && data.attendance !== 'no')) notFound();
  return <main className="admin-shell update-shell"><section className="admin-card update-card"><p className="eyebrow">{activeEvent.celebrant}&apos;s RSVP</p><h1>{copy.updateTitle}</h1><p>{copy.updateIntro}</p><EditRsvpForm token={token} locale={locale} initial={{ guestName: data.guest_name, attendance: data.attendance, adults: data.adults, children: data.children, dietaryNeeds: data.dietary_needs ?? '' }} /></section></main>;
}
