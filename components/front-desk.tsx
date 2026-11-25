import { business } from '../content/business';
import { OpenBadge } from './open-badge';

/** "Front desk: Open now · until 20:00" pill. The status is computed in the browser only. */
export function FrontDesk({ className = '' }: { className?: string }) {
  return <p className={`inline-flex items-center gap-2 rounded-full border-2 border-ink bg-card px-3.5 py-1.5 text-[.95rem] font-bold ${className}`}>
    <svg viewBox="0 0 20 16" className="h-3.5 w-4 shrink-0" aria-hidden="true"><ellipse cx="10" cy="8" rx="7" ry="5" transform="rotate(-22 10 8)" fill="var(--teal)" /></svg>
    <span>Front desk: <OpenBadge hours={business.hours} fallback="see the hours below" /></span>
  </p>;
}
