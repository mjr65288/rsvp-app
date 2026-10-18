import Image from 'next/image';
import { activeEvent, eventDetails } from '@/lib/event';
import { MobileRsvpBar } from './mobile-rsvp-bar';
import { RsvpForm } from './rsvp-form';

export default function InvitationPage() {
  const event = activeEvent;
  const details = eventDetails(event);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address ?? event.venue ?? '')}`;
  return (
    <main id="main">
      <nav aria-label="Invitation navigation">
        <a className="wordmark" href="#main">AYLIN <span>WORLD TOUR / 05</span></a>
        <a className="nav-link" href="#rsvp">RSVP <span aria-hidden="true">&gt;</span></a>
      </nav>
      <section className="hero hero-compact" aria-labelledby="party-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> ONE DAY. OUR FAVORITE SUPERSTAR.</p>
          <h1 id="party-title">{event.celebrant} is<br />turning <span>{event.age}!</span></h1>
          <p className="description">Join us for a {event.theme} birthday celebration!</p>
        </div>
      </section>
      <section className="invitation-section" id="invitation-section" aria-label="Birthday invitation">
        <figure className="invitation-card">
          <Image src="/Neon-K-Pop-Demon-Hunters-Birthday-Invitation.png" alt="Aylin Rodriguez's fifth birthday KPop Demon Hunters invitation" width={1024} height={1536} sizes="(max-width: 760px) calc(100vw - 40px), min(620px, 80vw)" priority />
        </figure>
        <a className="button invitation-cta" href="#rsvp">Confirm Your Attendance <span aria-hidden="true">&gt;</span></a>
      </section>
      <section className="event-info" aria-labelledby="details-title">
        <div className="section-heading"><p className="eyebrow">THE PLAN</p><h2 id="details-title">Save a little room for birthday magic.</h2></div>
        <dl><div><dt>WHEN</dt><dd>{details.date}<small>{details.time}</small></dd></div><div><dt>WHERE</dt><dd>{details.venue}<small>{event.address}</small><a className="directions-link" href={directionsUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">&gt;</span></a></dd></div></dl>
      </section>
      <section className="rsvp-card" id="rsvp" aria-labelledby="rsvp-title">
        <span className="eyebrow">YOUR BACKSTAGE PASS</span>
        <h2 id="rsvp-title">Will you be in our crew?</h2>
        <p>We can&apos;t wait to celebrate together.</p>
        <RsvpForm />
      </section>
      <MobileRsvpBar />
      <footer>MADE WITH LOVE, FOR AYLIN <span>Unofficial family celebration - No affiliation with the film.</span></footer>
    </main>
  );
}
