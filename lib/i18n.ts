export type Locale = 'en' | 'es';

export function getLocale(value: unknown): Locale {
  return String(value ?? '').toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function getBrowserLocale(acceptLanguage: string | null): Locale {
  return acceptLanguage?.toLowerCase().split(',').some((value) => value.trim().startsWith('es')) ? 'es' : 'en';
}

export function resolveLocale(explicit: unknown, acceptLanguage: string | null): Locale {
  return explicit ? getLocale(explicit) : getBrowserLocale(acceptLanguage);
}

export function eventCopy(locale: Locale) {
  return locale === 'es' ? {
    navLabel: 'Navegacion de la invitacion', rsvp: 'Confirmar asistencia', heroEyebrow: 'UN DIA. NUESTRA SUPERSTAR FAVORITA.', heroDescription: 'Acompananos a celebrar un cumpleanos inspirado en KPop Demon Hunters!', invitationAlt: 'Invitacion del quinto cumpleanos de Aylin Rodriguez de KPop Demon Hunters', confirm: 'Confirma tu asistencia', plan: 'EL PLAN', planTitle: 'Guarda un espacio para la magia del cumpleanos.', when: 'CUANDO', where: 'DONDE', directions: 'Como llegar', backstage: 'TU PASE VIP', rsvpTitle: 'Seras parte de nuestro equipo?', rsvpIntro: 'Estamos felices de celebrar contigo.', name: 'Tu nombre', attend: 'Asistiras?', yes: 'Si, ahi estare!', yesHelp: 'Cuenten conmigo para la celebracion.', no: 'Lo siento, no podre asistir', noHelp: 'Gracias por avisarnos.', adults: 'Adultos', children: 'Ninos', dietary: 'Necesidades alimentarias', optional: '(opcional)', saving: 'Guardando...', submit: 'Confirmar RSVP', update: 'Actualizar RSVP', change: 'Cambiar mi respuesta', back: 'Volver a la invitacion', footer: 'HECHO CON AMOR, PARA AYLIN', footerNote: 'Celebracion familiar no oficial - Sin afiliacion con la pelicula.', mobileCta: 'Confirma tu asistencia', updateTitle: 'Actualiza tu respuesta', updateIntro: 'Usa este enlace privado para mantener tu RSVP actualizado.'
  } : {
    navLabel: 'Invitation navigation', rsvp: 'RSVP', heroEyebrow: 'ONE DAY. OUR FAVORITE SUPERSTAR.', heroDescription: 'Join us for a KPop Demon Hunters birthday celebration!', invitationAlt: "Aylin Rodriguez's fifth birthday KPop Demon Hunters invitation", confirm: 'Confirm Your Attendance', plan: 'THE PLAN', planTitle: 'Save a little room for birthday magic.', when: 'WHEN', where: 'WHERE', directions: 'Get directions', backstage: 'YOUR BACKSTAGE PASS', rsvpTitle: 'Will you be in our crew?', rsvpIntro: "We can't wait to celebrate together.", name: 'Your name', attend: 'Will you attend?', yes: "Yes, I'll be there!", yesHelp: 'Count me in for the celebration.', no: "Sorry, I can't make it", noHelp: 'Thanks for letting us know.', adults: 'Adults', children: 'Children', dietary: 'Dietary needs', optional: '(optional)', saving: 'Saving...', submit: 'Confirm RSVP', update: 'Update RSVP', change: 'Change my response', back: 'Back to invitation', footer: 'MADE WITH LOVE, FOR AYLIN', footerNote: 'Unofficial family celebration - No affiliation with the film.', mobileCta: 'Confirm Your Attendance', updateTitle: 'Update your response', updateIntro: 'Use this private link to keep your RSVP current.'
  };
}

export function validationMessage(message: string, locale: Locale) {
  if (locale === 'en') return message;
  const messages: Record<string, string> = {
    'Enter a name between 2 and 100 characters.': 'Escribe un nombre de entre 2 y 100 caracteres.',
    'Choose whether you can attend.': 'Indica si puedes asistir.',
    'Choose a valid adult count.': 'Elige una cantidad valida de adultos.',
    'Choose a valid child count.': 'Elige una cantidad valida de ninos.',
    'At least one guest is required when attending.': 'Se requiere al menos un invitado si asistiras.',
    'Dietary notes must be 500 characters or fewer.': 'Las notas alimentarias deben tener 500 caracteres o menos.',
  };
  return messages[message] ?? message;
}
