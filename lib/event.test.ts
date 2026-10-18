import assert from 'node:assert/strict';
import test from 'node:test';
import { activeEvent, eventDetails } from './event';
import { validateRsvp } from './rsvp';
import { getLocale } from './i18n';

test('active event details match the invitation', () => {
  assert.deepEqual(eventDetails(activeEvent), {
    date: 'Saturday, October 24, 2026', time: '4:00 PM', venue: 'Bakersfield, CA',
  });
});
test('event dates use the configured timezone, not the server timezone', () => {
  const details = eventDetails({ ...activeEvent, startsAt: '2027-01-02T01:00:00Z' });
  assert.equal(details.date, 'Friday, January 1, 2027');
  assert.equal(details.time, '5:00 PM');
});
test('future events reuse the same formatter without changing Aylin data', () => {
  assert.equal(eventDetails({ ...activeEvent, id: 'future', venue: 'Family garden' }).venue, 'Family garden');
  assert.equal(activeEvent.venue, 'Bakersfield, CA');
});
test('event dates support Spanish formatting', () => {
  assert.equal(eventDetails(activeEvent, 'es').date, 'sábado, 24 de octubre de 2026');
  assert.equal(getLocale('es'), 'es');
  assert.equal(getLocale('en'), 'en');
});

test('rsvp validation rejects invalid guest input', () => {
  const form = new FormData();
  form.set('guestName', 'A');
  form.set('attendance', 'yes');
  form.set('adults', '0');
  form.set('children', '0');
  assert.equal(typeof validateRsvp(form), 'string');
});

test('rsvp validation normalizes a valid household response', () => {
  const form = new FormData();
  form.set('guestName', 'Jordan Lee');
  form.set('attendance', 'yes');
  form.set('adults', '2');
  form.set('children', '1');
  form.set('dietaryNeeds', 'Vegetarian');
  assert.deepEqual(validateRsvp(form), {
    guestName: 'Jordan Lee', attendance: 'yes', adults: 2, children: 1, dietaryNeeds: 'Vegetarian',
  });
});
