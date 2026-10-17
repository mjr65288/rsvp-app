'use server';

import { createClient } from '@supabase/supabase-js';
import { activeEvent } from '@/lib/event';
import { validateRsvp, type RsvpResult } from '@/lib/rsvp';

export async function submitRsvp(_previous: RsvpResult, formData: FormData): Promise<RsvpResult> {
  const input = validateRsvp(formData);
  if (typeof input === 'string') return { ok: false, message: input };

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    return { ok: false, message: 'RSVPs are not connected yet. Please check back soon.' };
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from('rsvps').insert({
    event_id: activeEvent.id,
    guest_name: input.guestName,
    attendance: input.attendance,
    adults: input.adults,
    children: input.children,
    dietary_needs: input.dietaryNeeds || null,
  });

  if (error) {
    console.error('RSVP insert failed', error);
    return { ok: false, message: 'We could not save your RSVP. Please try again.' };
  }

  return { ok: true, message: `Thanks, ${input.guestName}! Your RSVP has been recorded.` };
}
