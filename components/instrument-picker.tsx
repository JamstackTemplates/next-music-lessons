import type { ReactNode } from 'react';
import { instruments } from '../content/instruments';
import { SectionHeading } from './section-heading';
import { TheStaff } from './the-staff';

type ContentProps = { children: ReactNode };

/** Home: every instrument as a note on The Staff. */
function InstrumentPickerSection({ children }: ContentProps) {
  return <section className="bg-paper-deep py-[clamp(3.5rem,7vw,6rem)]" aria-labelledby="pick-heading">
    <div className="wrap">{children}</div>
  </section>;
}

function Heading({ marking, children }: ContentProps & { marking?: string }) {
  return <SectionHeading marking={marking} id="pick-heading">{children}</SectionHeading>;
}

function Introduction({ children }: ContentProps) {
  return <p className="mt-5 max-w-(--measure) text-[1.1rem]">{children}</p>;
}

function Staff({ hint }: { hint: string }) {
  return <div className="mt-10">
    <TheStaff instruments={instruments} />
    <p className="pencil mt-2 text-right md:hidden" aria-hidden="true">{hint}</p>
  </div>;
}

export const InstrumentPicker = Object.assign(InstrumentPickerSection, { Heading, Introduction, Staff });
