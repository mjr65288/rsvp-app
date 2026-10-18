'use client';

import { useState } from 'react';

export function ShareAction({ url, locale }: { url: string; locale: 'en' | 'es' }) {
  const [status, setStatus] = useState('');
  const isSpanish = locale === 'es';
  const share = async () => {
    const nativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';
    if (nativeShare) {
      try {
        await navigator.share({ title: isSpanish ? 'Invitacion de cumpleanos de Aylin' : "Aylin's birthday invitation", url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus(isSpanish ? 'Enlace copiado' : 'Link copied');
    } catch {
      setStatus(isSpanish ? 'Copia este enlace para compartirlo' : 'Copy this link to share it');
    }
  };
  return <div className="share-action"><button type="button" className="text-button" onClick={share}>{isSpanish ? 'Compartir invitacion' : 'Share invitation'}</button>{status && <span role="status">{status}</span>}</div>;
}
