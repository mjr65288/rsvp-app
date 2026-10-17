import assert from 'node:assert/strict';
import test from 'node:test';
import { activeEvent, eventDetails } from './event';
import { validateRsvp } from './rsvp';

test('unknown event details are explicit rather than invented', () => {
  assert.deepEqual(eventDetails(activeEvent), {
    date: 'Date to be announced', time: 'Time to be announced', venue: 'Venue to be announced',
  });
});
test('event dates use the configured timezone, not the server timezone', () => {
  const details = eventDetails({ ...activeEvent, startsAt: '2027-01-02T01:00:00Z' });
  assert.equal(details.date, 'Friday, January 1, 2027');
  assert.equal(details.time, '5:00 PM');
});
test('future events reuse the same formatter without changing Aylin data', () => {
  assert.equal(eventDetails({ ...activeEvent, id: 'future', venue: 'Family garden' }).venue, 'Family garden');
  assert.equal(activeEvent.venue, null);
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
