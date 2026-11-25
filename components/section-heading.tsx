import type { ReactNode } from 'react';

/** Section heading with an optional tempo/dynamic marking above and a crescendo hairpin below. */
export function SectionHeading({ marking, children, center = false, className = '', id }: {
  marking?: string; children: ReactNode; center?: boolean; className?: string; id?: string;
}) {
  return <div className={`${center ? 'text-center' : ''} ${className}`}>
    {marking ? <p className="marking">{marking}</p> : null}
    <h2 id={id} className={`hairpin mt-1.5 text-[clamp(2.1rem,4.4vw,3.4rem)] ${center ? 'hairpin-center mx-auto' : ''}`}>{children}</h2>
  </div>;
}
