import { activeEvent, eventDetails } from '@/lib/event';
import { RsvpForm } from './rsvp-form';

export default function InvitationPage() {
  const event = activeEvent;
  const details = eventDetails(event);
  return (
    <main id="main">
      <nav aria-label="Invitation navigation">
        <a className="wordmark" href="#main">AYLIN <span>WORLD TOUR / 05</span></a>
        <a className="nav-link" href="#rsvp">Your invitation <span aria-hidden="true">↗</span></a>
      </nav>
      <section className="hero" aria-labelledby="party-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> ONE DAY. OUR FAVORITE SUPERSTAR.</p>
          <p className="intro">You&apos;re on the guest list.</p>
          <h1 id="party-title">{event.celebrant} is<br />turning <span>{event.age}!</span></h1>
          <p className="description">Little superstar. Big birthday energy. Join us for a {event.theme} celebration full of music, magic, and your favorite people.</p>
          <a className="button" href="#rsvp">Let&apos;s celebrate <span aria-hidden="true">↗</span></a>
          <p className="small-note">Family, friends, and a little main-character energy.</p>
        </div>
        <div className="tour-art" role="img" aria-label="A pink and purple concert-inspired birthday pass featuring a large number five">
          <div className="art-top"><span>THE BIRTHDAY ERA</span><span>VIP ACCESS</span></div>
          <span className="spark spark-one" aria-hidden="true">✦</span>
          <span className="spark spark-two" aria-hidden="true">✧</span>
          <span className="giant-five" aria-hidden="true">5</span>
          <div className="art-bottom"><strong>AYLIN</strong><span>SMALL STAR.<br />LEGENDARY PARTY.</span></div>
          <div className="ticket-footer">ADMIT ONE AMAZING CREW <span aria-hidden="true">|||| ||| || |||||</span></div>
        </div>
      </section>
      <div className="marquee" aria-hidden="true">MUSIC · MAGIC · BIRTHDAY CAKE · MAIN CHARACTER ENERGY · MUSIC · MAGIC · BIRTHDAY CAKE</div>
      <section className="details" aria-labelledby="details-title">
        <div><p className="eyebrow">THE PLAN</p><h2 id="details-title">Save a little room<br />for birthday magic.</h2></div>
        <dl><div><dt>WHEN</dt><dd>{details.date}<small>{details.time}</small></dd></div>
          <div><dt>WHERE</dt><dd>{details.venue}<small>{event.address ?? 'We will share the details here.'}</small></dd></div>
          <div><dt>THE VIBE</dt><dd>Come as your superstar self<small>Dancing shoes encouraged. Smiles required.</small></dd></div></dl>
      </section>
      <section className="rsvp-card" id="rsvp" aria-labelledby="rsvp-title">
        <span className="eyebrow">YOUR BACKSTAGE PASS</span>
        <h2 id="rsvp-title">Will you be in our crew?</h2>
        <p>We can&apos;t wait to celebrate together.</p>
        <RsvpForm />
        <p className="small-note">No account needed. Just you and your birthday wishes.</p>
      </section>
      <footer>MADE WITH LOVE, FOR AYLIN <span>Unofficial family celebration · No affiliation with the film.</span></footer>
    </main>
  );
}
