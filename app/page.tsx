import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import { activeEvent, eventDetails } from '@/lib/event';
import { eventCopy, resolveLocale } from '@/lib/i18n';
import { MobileRsvpBar } from './mobile-rsvp-bar';
import { RsvpForm } from './rsvp-form';
import { ShareLinks } from './share-links';

type InvitationPageProps = { searchParams: Promise<{ lang?: string }> };

export default async function InvitationPage({ searchParams }: InvitationPageProps) {
  const params = await searchParams;
  const locale = resolveLocale(params.lang, (await headers()).get('accept-language'));
  const copy = eventCopy(locale);
  const event = activeEvent;
  const details = eventDetails(event, locale);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address ?? event.venue ?? '')}`;
  const imageSrc = locale === 'es' ? '/Neon-K-Pop-Demon-Hunters-Birthday-Invitation-esp.png' : '/Neon-K-Pop-Demon-Hunters-Birthday-Invitation.png';
  return (
    <main id="main">
      <nav aria-label={copy.navLabel}>
        <a className="wordmark" href="#main">AYLIN <span>{locale === 'es' ? 'GIRA MUNDIAL / 05' : 'WORLD TOUR / 05'}</span></a>
        <div className="nav-actions"><a className="nav-link" href="#rsvp">{copy.rsvp} <span aria-hidden="true">&gt;</span></a><span className="language-switcher" aria-label="Language"><Link href="/?lang=en">EN</Link><span aria-hidden="true">/</span><Link href="/?lang=es">ES</Link></span></div>
      </nav>
      <section className="hero hero-compact" aria-labelledby="party-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> {copy.heroEyebrow}</p>
          <h1 id="party-title">{event.celebrant} is<br />turning <span>{event.age}!</span></h1>
          <p className="description">{copy.heroDescription}</p>
        </div>
      </section>
      <section className="invitation-section" id="invitation-section" aria-label={locale === 'es' ? 'Invitación de cumpleaños' : 'Birthday invitation'}>
        <figure className="invitation-card"><Image src={imageSrc} alt={copy.invitationAlt} width={1024} height={1536} sizes="(max-width: 760px) calc(100vw - 40px), min(620px, 80vw)" priority /></figure>
        <a className="button invitation-cta" href="#rsvp">{copy.confirm} <span aria-hidden="true">&gt;</span></a>
      </section>
      <section className="event-info" aria-labelledby="details-title">
        <div className="section-heading"><p className="eyebrow">{copy.plan}</p><h2 id="details-title">{copy.planTitle}</h2></div>
        <dl><div><dt>{copy.when}</dt><dd>{details.date}<small>{details.time}</small></dd></div><div><dt>{copy.where}</dt><dd>{details.venue}<small>{event.address}</small><a className="directions-link" href={directionsUrl} target="_blank" rel="noreferrer">{copy.directions} <span aria-hidden="true">&gt;</span></a></dd></div></dl>
      </section>
      <section className="rsvp-card" id="rsvp" aria-labelledby="rsvp-title">
        <span className="eyebrow">{copy.backstage}</span><h2 id="rsvp-title">{copy.rsvpTitle}</h2><p>{copy.rsvpIntro}</p><RsvpForm locale={locale} />
      </section>
      <ShareLinks locale={locale} />
      <MobileRsvpBar locale={locale} />
      <footer>{copy.footer} <span>{copy.footerNote}</span></footer>
    </main>
  );
}
