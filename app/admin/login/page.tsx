import { requestAdminMagicLink } from '../actions';
type LoginPageProps = { searchParams: Promise<{ error?: string; sent?: string }> };
export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  return <main className="admin-shell"><section className="admin-card" aria-labelledby="login-title"><p className="eyebrow">ORGANIZER ACCESS</p><h1 id="login-title">Your guest list,<br /><span>kept private.</span></h1><p>Enter the organizer email to receive a secure sign-in link.</p>{params.sent && <p className="success" role="status">Check your email for the sign-in link.</p>}{params.error && <p className="form-error" role="alert">{params.error}</p>}<form action={requestAdminMagicLink} className="rsvp-form"><label htmlFor="email">Organizer email<input id="email" name="email" type="email" required autoComplete="email" /></label><button className="button" type="submit">Send sign-in link ↗</button></form></section></main>;
}
