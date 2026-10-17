export type PartyEvent = Readonly<{
  id: string;
  slug: string;
  celebrant: string;
  age: number;
  theme: string;
  startsAt: string | null;
  timeZone: string;
  venue: string | null;
  address: string | null;
}>;

export const activeEvent: PartyEvent = {
  id: 'aylin-birthday-5',
  slug: 'aylin-turns-five',
  celebrant: 'Aylin',
  age: 5,
  theme: 'KPop Demon Hunters',
  startsAt: null,
  timeZone: 'America/Los_Angeles',
  venue: null,
  address: null,
};

export function eventDetails(event: PartyEvent) {
  const date = event.startsAt ? new Date(event.startsAt) : null;
  return {
    date: date ? new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full', timeZone: event.timeZone,
    }).format(date) : 'Date to be announced',
    time: date ? new Intl.DateTimeFormat('en-US', {
      timeStyle: 'short', timeZone: event.timeZone,
    }).format(date) : 'Time to be announced',
    venue: event.venue ?? 'Venue to be announced',
  };
}
