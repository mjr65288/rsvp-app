'use client';

import { useEffect, useState } from 'react';
import { eventCopy, type Locale } from '@/lib/i18n';

export function MobileRsvpBar({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const invitation = document.getElementById('invitation-section');
    const rsvp = document.getElementById('rsvp');
    if (!invitation || !rsvp) return;
    let invitationVisible = true;
    let rsvpVisible = false;
    const update = () => setVisible(!invitationVisible && !rsvpVisible);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === invitation) invitationVisible = entry.isIntersecting;
        if (entry.target === rsvp) rsvpVisible = entry.isIntersecting;
      }
      update();
    }, { threshold: 0.05 });
    observer.observe(invitation);
    observer.observe(rsvp);
    return () => observer.disconnect();
  }, []);
  if (!visible) return null;
  return <a className="mobile-rsvp-bar" href="#rsvp">{eventCopy(locale).mobileCta} <span aria-hidden="true">&gt;</span></a>;
}
