'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { updateRsvp } from '@/app/actions';
import { activeEvent } from '@/lib/event';
import { eventCopy, type Locale } from '@/lib/i18n';

type Props = { token: string; locale: Locale; initial: { guestName: string; attendance: 'yes' | 'no'; adults: number; children: number; dietaryNeeds: string } };
const initialState = { ok: false, message: '' } as const;

export function EditRsvpForm({ token, locale, initial }: Props) {
  const [state, formAction, pending] = useActionState(updateRsvp.bind(null, token), initialState);
  const [attendance, setAttendance] = useState<'yes' | 'no'>(initial.attendance);
  const copy = eventCopy(locale);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeEvent.address ?? activeEvent.venue ?? '')}`;

  if (state.ok) return <div className="success" role="status"><p>{state.message}</p>{state.attendance === 'yes' && <p>{locale === 'es' ? `Respuesta guardada: ${state.adults} adulto${state.adults === 1 ? '' : 's'} y ${state.children} niño${state.children === 1 ? '' : 's'}.` : `Latest response: ${state.adults} adult${state.adults === 1 ? '' : 's'} and ${state.children} child${state.children === 1 ? '' : 'ren'}.`}</p>}<p><a href={state.editUrl}>{copy.change} &gt;</a></p><p><Link href={locale === 'es' ? '/?lang=es' : '/'}>{copy.back} &gt;</Link></p><p><a href={directionsUrl} target="_blank" rel="noreferrer">{copy.directions} &gt;</a></p></div>;

  return <form className="rsvp-form" action={formAction}>
    <input type="hidden" name="locale" value={locale} />
    <label htmlFor="guestName">{copy.name}</label><input id="guestName" name="guestName" required minLength={2} maxLength={100} defaultValue={initial.guestName} />
    <fieldset className="attendance-options"><legend>{copy.attend}</legend>
      <label className={`attendance-card${attendance === 'yes' ? ' selected' : ''}`}><input type="radio" name="attendance" value="yes" defaultChecked={attendance === 'yes'} required onChange={() => setAttendance('yes')} /><span><strong>{copy.yes}</strong><small>{copy.yesHelp}</small></span></label>
      <label className={`attendance-card${attendance === 'no' ? ' selected' : ''}`}><input type="radio" name="attendance" value="no" defaultChecked={attendance === 'no'} onChange={() => setAttendance('no')} /><span><strong>{copy.no}</strong><small>{copy.noHelp}</small></span></label>
    </fieldset>
    {attendance === 'yes' ? <><div className="guest-counts"><label htmlFor="adults">{copy.adults}<input id="adults" name="adults" type="number" min="1" max="20" defaultValue={initial.adults} required /></label><label htmlFor="children">{copy.children}<input id="children" name="children" type="number" min="0" max="20" defaultValue={initial.children} required /></label></div><label htmlFor="dietaryNeeds">{copy.dietary} <span>{copy.optional}</span></label><textarea id="dietaryNeeds" name="dietaryNeeds" maxLength={500} rows={3} defaultValue={initial.dietaryNeeds} /></> : <><input type="hidden" name="adults" value="0" /><input type="hidden" name="children" value="0" /></>}
    {state.message && <p className="form-error" role="alert">{state.message}</p>}
    <button className="button" type="submit" disabled={pending}>{pending ? copy.saving : copy.update}</button>
  </form>;
}
