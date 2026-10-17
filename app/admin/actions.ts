'use server';
import { redirect } from 'next/navigation';
import { activeEvent } from '@/lib/event';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function requestAdminMagicLink(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  if (!email || !email.includes('@')) redirect('/admin/login?error=Enter a valid email.');
  if (!adminEmail || email !== adminEmail) redirect('/admin/login?error=This email is not authorized.');
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect('/admin/login?error=Authentication is not configured yet.');
  const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${siteUrl}/auth/callback?next=/admin` } });
  if (error) redirect(`/admin/login?error=${encodeURIComponent('Unable to send sign-in link.')}`);
  redirect('/admin/login?sent=1');
}

export async function signInAdminWithPassword(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!email || !email.includes('@') || !password) redirect('/admin/login?error=Enter your organizer email and password.');
  if (!adminEmail || email !== adminEmail) redirect('/admin/login?error=This email is not authorized.');
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect('/admin/login?error=Authentication is not configured yet.');
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect('/admin/login?error=The organizer email or password is incorrect.');
  redirect('/admin');
}

export async function deleteRsvp(formData: FormData) {
  const id = String(formData.get('id') ?? '').trim();
  const supabase = await createSupabaseServerClient();
  if (!supabase || !id) redirect('/admin?error=Unable to delete RSVP.');
  const { data: { user } } = await supabase.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!user || !adminEmail || user.email?.toLowerCase() !== adminEmail) redirect('/admin/login?error=Please sign in with the organizer email.');
  const { error } = await supabase.from('rsvps').delete().eq('id', id).eq('event_id', activeEvent.id);
  if (error) redirect('/admin?error=Unable to delete RSVP.');
  redirect('/admin');
}

export async function signOutAdmin() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect('/admin/login');
}
