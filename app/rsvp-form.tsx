'use client';

import { useActionState, useState } from 'react';
import { submitRsvp } from './actions';
import { activeEvent } from '@/lib/event';

const initialState = { ok: false, message: '' } as const;

export function RsvpForm() {
  const [state, action, pending] = useActionState(submitRsvp, initialState);
  const [attendance, setAttendance] = useState<'yes' | 'no' | ''>('');
  const [guestName, setGuestName] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeEvent.address ?? activeEvent.venue ?? '')}`;
  const isValid = guestName.trim().length >= 2 && guestName.trim().length <= 100 && attendance !== '' && (attendance === 'no' || (adults >= 1 && adults <= 20 && children >= 0 && children <= 20));

  if (state.ok) return <div className="success" role="status"><p>{state.message}</p>{state.attendance === 'yes' && <p>Confirmed for {state.adults} adult{state.adults === 1 ? '' : 's'} and {state.children} child{state.children === 1 ? '' : 'ren'}.</p>}{state.editUrl && <p><a href={state.editUrl}>Change my response &gt;</a></p>}<p><a href={directionsUrl} target="_blank" rel="noreferrer">Get directions &gt;</a></p></div>;
  return <form className="rsvp-form" action={action}>
    <label htmlFor="guestName">Your name</label><input id="guestName" name="guestName" required minLength={2} maxLength={100} autoComplete="name" value={guestName} onChange={(event) => setGuestName(event.target.value)} />
    <fieldset className="attendance-options"><legend>Will you attend?</legend>
      <label className={`attendance-card${attendance === 'yes' ? ' selected' : ''}`}><input type="radio" name="attendance" value="yes" required checked={attendance === 'yes'} onChange={() => setAttendance('yes')} /><span><strong>Yes, I&apos;ll be there!</strong><small>Count me in for the celebration.</small></span></label>
      <label className={`attendance-card${attendance === 'no' ? ' selected' : ''}`}><input type="radio" name="attendance" value="no" checked={attendance === 'no'} onChange={() => setAttendance('no')} /><span><strong>Sorry, I can&apos;t make it</strong><small>Thanks for letting us know.</small></span></label>
    </fieldset>
    {attendance === 'yes' && <><div className="guest-counts"><label htmlFor="adults">Adults<input id="adults" name="adults" type="number" min="1" max="20" value={adults} onChange={(event) => setAdults(Number(event.target.value))} required /></label><label htmlFor="children">Children<input id="children" name="children" type="number" min="0" max="20" value={children} onChange={(event) => setChildren(Number(event.target.value))} required /></label></div><label htmlFor="dietaryNeeds">Dietary needs <span>(optional)</span></label><textarea id="dietaryNeeds" name="dietaryNeeds" maxLength={500} rows={3} /></>}
    {attendance === 'no' && <input type="hidden" name="adults" value="0" />}{attendance === 'no' && <input type="hidden" name="children" value="0" />}
    {state.message && <p className="form-error" role="alert">{state.message}</p>}
    <button className="button" type="submit" disabled={pending || !isValid}>{pending ? 'Saving...' : 'Confirm RSVP'}</button>
  </form>;
}
