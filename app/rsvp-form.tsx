'use client';

import { useActionState } from 'react';
import { submitRsvp } from './actions';

const initialState = { ok: false, message: '' } as const;

export function RsvpForm() {
  const [state, action, pending] = useActionState(submitRsvp, initialState);
  if (state.ok) return <div className="success" role="status"><p>{state.message}</p>{state.editUrl && <p><a href={state.editUrl}>Update your RSVP later ?</a></p>}</div>;
  return <form className="rsvp-form" action={action}><label htmlFor="guestName">Your name</label><input id="guestName" name="guestName" required minLength={2} maxLength={100} autoComplete="name" /><fieldset><legend>Will you attend?</legend><label><input type="radio" name="attendance" value="yes" required /> Yes, I&apos;ll be there!</label><label><input type="radio" name="attendance" value="no" /> Sorry, I can&apos;t make it</label></fieldset><div className="guest-counts"><label htmlFor="adults">Adults<input id="adults" name="adults" type="number" min="0" max="20" defaultValue="1" required /></label><label htmlFor="children">Children<input id="children" name="children" type="number" min="0" max="20" defaultValue="0" required /></label></div><label htmlFor="dietaryNeeds">Dietary needs <span>(optional)</span></label><textarea id="dietaryNeeds" name="dietaryNeeds" maxLength={500} rows={3} />{state.message && <p className="form-error" role="alert">{state.message}</p>}<button className="button" type="submit" disabled={pending}>{pending ? 'Saving…' : 'Confirm RSVP ?'}</button></form>;
}
