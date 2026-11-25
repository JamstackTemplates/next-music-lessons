'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';

/** Disclosure menu for small screens. Works without JavaScript; closes after client navigation. */
export function MobileMenu({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => { if (ref.current) ref.current.open = false; }, [pathname]);
  return <details ref={ref} className="menu relative md:hidden">
    <summary className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink bg-card px-3.5 font-bold">
      <svg viewBox="0 0 24 18" className="h-4 w-5" aria-hidden="true">{[2, 7, 12, 17].map(y => <line key={y} x1="1" x2="23" y1={y - 0.5} y2={y - 0.5} stroke="currentColor" strokeWidth="1.6" />)}<ellipse cx="15" cy="12" rx="4" ry="3" transform="rotate(-22 15 12)" fill="var(--primary)" /></svg>
      Menu
    </summary>
    <div className="absolute right-0 top-[calc(100%+.6rem)] z-50 w-64 rounded-md border-2 border-ink bg-card p-3 shadow-[5px_5px_0_var(--staff)]">{children}</div>
  </details>;
}
