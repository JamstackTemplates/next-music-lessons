"use client";
import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/** Optional. Neutral static output; browser refreshes in the business zone every minute. */
export function OpenBadge({ hours, fallback = 'See opening hours' }: { hours: readonly OpeningHours[]; fallback?: string }) {
  const [label, setLabel] = useState(fallback);
  useEffect(() => {
    const update = () => setLabel(openingLabel(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);
  return <span data-open={label.startsWith('Open now') ? 'true' : undefined}>{label}</span>;
}
