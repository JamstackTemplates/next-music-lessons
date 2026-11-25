// Deterministic display formatting. Dates are calendar dates, so they never depend on the visitor's clock.

const LONG = new Intl.DateTimeFormat('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const PARTS = new Intl.DateTimeFormat('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

const utc = (isoDate: string) => new Date(`${isoDate}T00:00:00Z`);

/** "Saturday 12 December 2026" */
export function longDate(isoDate: string): string {
  return LONG.format(utc(isoDate)).replace(',', '');
}

/** { weekday: 'Sat', day: '12', month: 'Dec', year: '2026' } */
export function dateParts(isoDate: string) {
  const parts = PARTS.formatToParts(utc(isoDate));
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '';
  return { weekday: get('weekday'), day: get('day'), month: get('month'), year: get('year') };
}

/** "14:30" → "2:30 pm"; "09:00" → "9 am" */
export function clockTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, '0')} ${suffix}` : `${hour} ${suffix}`;
}

/** UTC offset such as "+11:00" for a local date/time in an IANA zone (DST-aware). */
export function zoneOffset(isoDate: string, hhmm: string, timeZone: string): string {
  // Guess with the UTC instant, then correct once: enough for zones whose offset is constant over a day boundary.
  const guess = new Date(`${isoDate}T${hhmm}:00Z`);
  const read = (instant: Date) => {
    const name = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
      .formatToParts(instant).find(p => p.type === 'timeZoneName')?.value ?? 'GMT';
    const match = /GMT([+-])(\d{2}):(\d{2})/.exec(name);
    return match ? (match[1] === '-' ? -1 : 1) * (Number(match[2]) * 60 + Number(match[3])) : 0;
  };
  let offset = read(guess);
  offset = read(new Date(guess.getTime() - offset * 60_000));
  const sign = offset < 0 ? '-' : '+';
  const abs = Math.abs(offset);
  return `${sign}${String(Math.floor(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`;
}
