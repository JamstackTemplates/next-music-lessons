import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));
test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});
test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});
test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});
test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

// Treble Clef front desk, Australia/Melbourne (AEDT = UTC+11 in summer, AEST = UTC+10 in winter).
const school = (iso: string) => openingLabel(business.hours, 'Australia/Melbourne', new Date(iso));
test('Treble Clef hours are valid same-day intervals', () => {
  assert.doesNotThrow(() => validateHours(business.hours));
});
test('Monday boundaries in AEDT: 14:29 closed, 14:30 open, 19:59 open, 20:00 closed', () => {
  // Monday 30 Nov 2026 local = Monday 03:29Z etc.
  assert.equal(school('2026-11-30T03:29:00Z'), 'Closed · opens today at 14:30');
  assert.equal(school('2026-11-30T03:30:00Z'), 'Open now · until 20:00');
  assert.equal(school('2026-11-30T08:59:00Z'), 'Open now · until 20:00');
  assert.equal(school('2026-11-30T09:00:00Z'), 'Closed · opens Tuesday at 14:30');
});
test('Sunday is closed and Saturday evening points to Monday', () => {
  assert.equal(school('2026-11-29T01:00:00Z'), 'Closed · opens Monday at 14:30'); // Sunday 12:00 local
  assert.equal(school('2026-11-28T05:00:00Z'), 'Closed · opens Monday at 14:30'); // Saturday 16:00 local
  assert.equal(school('2026-11-28T04:59:00Z'), 'Open now · until 16:00'); // Saturday 15:59 local
});
test('local times hold across the AEDT start (4 Oct 2026) and end (5 Apr 2027)', () => {
  // Monday 5 Oct 2026 is the first weekday after clocks go forward: 14:30 local = 03:30Z (UTC+11).
  assert.equal(school('2026-10-05T03:29:00Z'), 'Closed · opens today at 14:30');
  assert.equal(school('2026-10-05T03:30:00Z'), 'Open now · until 20:00');
  // Friday 2 Oct 2026, still AEST: 14:30 local = 04:30Z (UTC+10).
  assert.equal(school('2026-10-02T04:29:00Z'), 'Closed · opens today at 14:30');
  assert.equal(school('2026-10-02T04:30:00Z'), 'Open now · until 18:00');
  // Monday 5 Apr 2027, the day after clocks go back: UTC+10 again.
  assert.equal(school('2027-04-05T04:29:00Z'), 'Closed · opens today at 14:30');
  assert.equal(school('2027-04-05T04:30:00Z'), 'Open now · until 20:00');
});
