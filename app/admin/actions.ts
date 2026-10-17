'use server';
import { redirect } from 'next/navigation';
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
export async function signOutAdmin() { const supabase = await createSupabaseServerClient(); await supabase?.auth.signOut(); redirect('/admin/login'); }
