'use server';

import { createClient } from '@supabase/supabase-js';
import { activeEvent } from '@/lib/event';
import { validateRsvp, type RsvpResult } from '@/lib/rsvp';
import { getLocale, validationMessage } from '@/lib/i18n';

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}

export async function submitRsvp(_previous: RsvpResult, formData: FormData): Promise<RsvpResult> {
  const locale = getLocale(formData.get('locale'));
  const input = validateRsvp(formData);
  if (typeof input === 'string') return { ok: false, message: validationMessage(input, locale) };
  const supabase = getSupabase();
  if (!supabase) return { ok: false, message: locale === 'es' ? 'Los RSVP aun no estan conectados. Vuelve a intentarlo pronto.' : 'RSVPs are not connected yet. Please check back soon.' };
  const editToken = crypto.randomUUID();
  const { error } = await supabase.from('rsvps').insert({ event_id: activeEvent.id, edit_token: editToken, guest_name: input.guestName, attendance: input.attendance, adults: input.adults, children: input.children, dietary_needs: input.dietaryNeeds || null });
  if (error) {
    console.error('RSVP insert failed', error);
    return { ok: false, message: locale === 'es' ? 'No pudimos guardar tu RSVP. Intentalo de nuevo.' : 'We could not save your RSVP. Please try again.' };
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const message = input.attendance === 'yes'
    ? (locale === 'es' ? `Gracias, ${input.guestName}! Estas en la lista de invitados.` : `Thanks, ${input.guestName}! You're on the guest list.`)
    : (locale === 'es' ? `Gracias, ${input.guestName}. Registramos que no podras asistir.` : `Thanks, ${input.guestName}. We've recorded that you can't make it.`);
  return { ok: true, message, editUrl: `${siteUrl}/rsvp/${editToken}${locale === 'es' ? '?lang=es' : ''}`, guestName: input.guestName, attendance: input.attendance, adults: input.adults, children: input.children };
}

export async function updateRsvp(editToken: string, _previous: RsvpResult, formData: FormData): Promise<RsvpResult> {
  const locale = getLocale(formData.get('locale'));
  const input = validateRsvp(formData);
  if (typeof input === 'string') return { ok: false, message: validationMessage(input, locale) };
  if (!/^[0-9a-f-]{36}$/i.test(editToken)) return { ok: false, message: locale === 'es' ? 'Este enlace para actualizar el RSVP no es valido.' : 'This RSVP update link is invalid.' };
  const supabase = getSupabase();
  if (!supabase) return { ok: false, message: locale === 'es' ? 'Los RSVP aun no estan conectados. Vuelve a intentarlo pronto.' : 'RSVPs are not connected yet. Please check back soon.' };
  const authorized = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, { auth: { persistSession: false }, global: { headers: { 'x-rsvp-edit-token': editToken } } });
  const { error } = await authorized.from('rsvps').update({ guest_name: input.guestName, attendance: input.attendance, adults: input.adults, children: input.children, dietary_needs: input.dietaryNeeds || null }).eq('event_id', activeEvent.id).eq('edit_token', editToken);
  if (error) {
    console.error('RSVP update failed', error);
    return { ok: false, message: locale === 'es' ? 'No pudimos actualizar tu RSVP. Intentalo de nuevo.' : 'We could not update your RSVP. Please try again.' };
  }
  const message = input.attendance === 'yes'
    ? (locale === 'es' ? `Gracias, ${input.guestName}! Tu RSVP fue actualizado y estas en la lista de invitados.` : `Thanks, ${input.guestName}! Your RSVP is updated and you're on the guest list.`)
    : (locale === 'es' ? `Gracias, ${input.guestName}. Actualizamos tu respuesta y registramos que no podras asistir.` : `Thanks, ${input.guestName}. Your response is updated—we've recorded that you can't make it.`);
  return { ok: true, message, editUrl: `/rsvp/${editToken}${locale === 'es' ? '?lang=es' : ''}`, guestName: input.guestName, attendance: input.attendance, adults: input.adults, children: input.children };
}
