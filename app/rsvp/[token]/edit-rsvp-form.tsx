'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { updateRsvp } from '@/app/actions';
import { activeEvent } from '@/lib/event';

type Props = { token: string; initial: { guestName: string; attendance: 'yes' | 'no'; adults: number; children: number; dietaryNeeds: string } };
const initialState = { ok: false, message: '' } as const;

export function EditRsvpForm({ token, initial }: Props) {
  const [state, formAction, pending] = useActionState(updateRsvp.bind(null, token), initialState);
  const [attendance, setAttendance] = useState<'yes' | 'no'>(initial.attendance);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeEvent.address ?? activeEvent.venue ?? '')}`;

  if (state.ok) return <div className="success" role="status"><p>{state.message}</p>{state.attendance === 'yes' && <p>Latest response: {state.adults} adult{state.adults === 1 ? '' : 's'} and {state.children} child{state.children === 1 ? '' : 'ren'}.</p>}<p><a href={state.editUrl}>Change my response &gt;</a></p><p><Link href="/">Back to invitation &gt;</Link></p><p><a href={directionsUrl} target="_blank" rel="noreferrer">Get directions &gt;</a></p></div>;

  return <form className="rsvp-form" action={formAction}>
    <label htmlFor="guestName">Your name</label>
    <input id="guestName" name="guestName" required minLength={2} maxLength={100} defaultValue={initial.guestName} />
    <fieldset className="attendance-options"><legend>Will you attend?</legend>
      <label className={`attendance-card${attendance === 'yes' ? ' selected' : ''}`}><input type="radio" name="attendance" value="yes" defaultChecked={attendance === 'yes'} required onChange={() => setAttendance('yes')} /><span><strong>Yes, I&apos;ll be there!</strong><small>Count me in for the celebration.</small></span></label>
      <label className={`attendance-card${attendance === 'no' ? ' selected' : ''}`}><input type="radio" name="attendance" value="no" defaultChecked={attendance === 'no'} onChange={() => setAttendance('no')} /><span><strong>Sorry, I can&apos;t make it</strong><small>Thanks for letting us know.</small></span></label>
    </fieldset>
    {attendance === 'yes' ? <><div className="guest-counts"><label htmlFor="adults">Adults<input id="adults" name="adults" type="number" min="1" max="20" defaultValue={initial.adults} required /></label><label htmlFor="children">Children<input id="children" name="children" type="number" min="0" max="20" defaultValue={initial.children} required /></label></div><label htmlFor="dietaryNeeds">Dietary needs <span>(optional)</span></label><textarea id="dietaryNeeds" name="dietaryNeeds" maxLength={500} rows={3} defaultValue={initial.dietaryNeeds} /></> : <><input type="hidden" name="adults" value="0" /><input type="hidden" name="children" value="0" /></>}
    {state.message && <p className="form-error" role="alert">{state.message}</p>}
    <button className="button" type="submit" disabled={pending}>{pending ? 'Saving...' : 'Update RSVP'}</button>
  </form>;
}