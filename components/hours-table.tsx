import { business } from '../content/business';
import { clockTime } from '../lib/format';
import type { OpeningHours } from '../lib/hours';

const SHORT: Record<string, string> = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };

/** Consecutive days with the same hours, e.g. Mon–Thu 2:30 pm–8 pm. */
export function groupHours(hours: readonly OpeningHours[]) {
  const groups: { days: string; hours: string }[] = [];
  let start = 0;
  for (let i = 1; i <= hours.length; i++) {
    const a = hours[start], b = hours[i];
    if (b && a.opens === b.opens && a.closes === b.closes) continue;
    const last = hours[i - 1];
    groups.push({
      days: start === i - 1 ? SHORT[a.day] : `${SHORT[a.day]}–${SHORT[last.day]}`,
      hours: a.opens && a.closes ? `${clockTime(a.opens)} – ${clockTime(a.closes)}` : 'Closed',
    });
    start = i;
  }
  return groups;
}

/** Front-desk and lesson hours as a printed programme table with dotted leaders. */
export function HoursTable({ className = '', tone = 'ink' }: { className?: string; tone?: 'ink' | 'stage' }) {
  return <dl className={`grid gap-1.5 ${className}`}>
    {groupHours(business.hours).map(group => <div key={group.days} className="flex items-baseline gap-2">
      <dt className="font-bold">{group.days}</dt>
      <span aria-hidden="true" className={`mb-1 flex-1 border-b-2 border-dotted ${tone === 'stage' ? 'border-stage-muted/50' : 'border-staff'}`} />
      <dd className="tabular-nums">{group.hours}</dd>
    </div>)}
  </dl>;
}
