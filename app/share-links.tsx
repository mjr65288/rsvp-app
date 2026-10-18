/* eslint-disable @next/next/no-img-element */
import { type Locale } from '@/lib/i18n';
import { ShareAction } from './share-action';

export function ShareLinks({ locale }: { locale: Locale }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const englishUrl = `${siteUrl}/?lang=en`;
  const spanishUrl = `${siteUrl}/?lang=es`;
  const shareEyebrow = locale === 'es' ? 'COMPARTE LA INVITACION' : 'SHARE THE INVITATION';
  const shareTitle = locale === 'es' ? 'Invita a tu familia.' : 'Invite your family.';
  const shareIntro = locale === 'es' ? 'Comparte el enlace o escanea un codigo QR.' : 'Share a link or scan a QR code.';
  const qrUrl = (target: string) => `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(target)}`;
  return <section className="share-section" aria-labelledby="share-title">
    <p className="eyebrow">{shareEyebrow}</p>
    <h2 id="share-title">{shareTitle}</h2>
    <p className="share-intro">{shareIntro}</p>
    <div className="share-grid">
      <article className="share-card"><div><strong>English</strong><a href={englishUrl}>{englishUrl}</a><ShareAction url={englishUrl} locale="en" /></div><img src={qrUrl(englishUrl)} alt="QR code for the English invitation" width="120" height="120" loading="lazy" /></article>
      <article className="share-card"><div><strong>Español</strong><a href={spanishUrl}>{spanishUrl}</a><ShareAction url={spanishUrl} locale="es" /></div><img src={qrUrl(spanishUrl)} alt="Código QR para la invitación en español" width="120" height="120" loading="lazy" /></article>
    </div>
  </section>;
}
