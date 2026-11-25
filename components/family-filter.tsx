'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { Family } from '../content/instruments';

/**
 * Instrument family filter for Lessons. Without JavaScript the buttons never render and every
 * instrument stays visible. With it, CSS in tailwind.input.css hides non-matching [data-family]
 * entries and dims non-matching notes on The Staff, and a polite live region announces the count.
 */
export function FamilyFilter({ families, counts, total, children }: {
  families: { id: Family; label: string }[];
  counts: Record<string, number>;
  total: number;
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<Family | 'all'>('all');
  useEffect(() => setReady(true), []);
  const shown = filter === 'all' ? total : counts[filter] ?? 0;
  const options = [{ id: 'all' as const, label: 'All' }, ...families.filter(f => counts[f.id])];

  return <div data-filter-scope="" data-filter={filter}>
    {ready && <div className="no-print wrap mb-6 flex flex-wrap items-center gap-2" role="group" aria-label="Show instruments by family">
      <span className="pencil mr-1">Show me:</span>
      {options.map(option => <button key={option.id} type="button" className="filter-chip" aria-pressed={filter === option.id}
        onClick={() => setFilter(option.id)}>{option.label}</button>)}
    </div>}
    <p className="sr-only" role="status" aria-live="polite">{ready && filter !== 'all' ? `${shown} instrument${shown === 1 ? '' : 's'} shown` : ''}</p>
    {children}
  </div>;
}
