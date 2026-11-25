import type { ReactNode } from 'react';
import { Fermata } from './art/notation';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

/** Closing call to action: a fermata held over the button. */
function CtaBandSection({ children }: ContentProps) {
  return <section className="notes-bg py-[clamp(3.5rem,7vw,5.5rem)]" aria-label="Enquire">
    <div className="wrap flex flex-col items-center text-center">{children}</div>
  </section>;
}

function Heading({ children }: ContentProps) {
  return <h2 className="max-w-[20ch] text-[clamp(2rem,4.4vw,3.2rem)]">{children}</h2>;
}

function Text({ children }: ContentProps) {
  return <p className="mt-4 max-w-(--measure) text-[1.1rem] text-pencil">{children}</p>;
}

function Action({ children }: ContentProps) {
  return <div className="mt-8 flex flex-col items-center">
    <Fermata className="mb-1 h-6 w-12 text-primary-ink" />
    <SiteLink href="/contact/" className="button text-[1.05rem]">{children}</SiteLink>
  </div>;
}

export const CtaBand = Object.assign(CtaBandSection, { Heading, Text, Action });
