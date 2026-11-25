import type { ReactNode } from 'react';
import { formatFee, groupClasses, lessonLengths, policies, weeksPerTerm } from '../content/fees';
import { clockTime } from '../lib/format';
import { QuaverPair, StarShape } from './art/notation';
import { SectionHeading } from './section-heading';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

/** Crotchet glyph for tempo markings ("♩ = 30"). */
function Crotchet({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 16 34" className={className} aria-hidden="true">
    <ellipse cx="7" cy="28" rx="6.2" ry="4.6" transform="rotate(-22 7 28)" fill="currentColor" />
    <rect x="11.6" y="2" width="2" height="26" fill="currentColor" />
  </svg>;
}

/** Home: lesson lengths as tempo markings with the term fee in large numerals. */
function FeeTempoSection({ children }: ContentProps) {
  return <section className="staff-bg py-[clamp(3.5rem,7vw,6rem)]" aria-labelledby="fees-heading"><div className="wrap">{children}</div></section>;
}

function TempoHeading({ marking, children }: ContentProps & { marking?: string }) {
  return <SectionHeading marking={marking} id="fees-heading" center>{children}</SectionHeading>;
}

function Tempos({ per }: { per: string }) {
  return <ul className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
    {lessonLengths.map(length => <li key={length.id} className="bg-paper/90 px-4 py-6 text-center">
      <p className="inline-flex items-center gap-2 font-display text-[1.6rem] italic">
        <Crotchet className="h-8 w-4 not-italic" /><span>= {length.minutes} min</span>
      </p>
      <p className="mt-3 font-display text-[clamp(3.4rem,6vw,4.6rem)] leading-none text-primary-ink">{formatFee(length.termFee)}</p>
      <p className="mt-2 font-bold">{per}</p>
      <p className="mt-1 text-pencil">{length.suitedTo}</p>
    </li>)}
  </ul>;
}

function TempoNote({ children }: ContentProps) {
  return <p className="pencil mt-8 text-center text-[1.35rem] -rotate-1">{children}</p>;
}

function TempoLink({ children }: ContentProps) {
  return <p className="mt-8 text-center"><SiteLink href="/lessons/#fees" className="text-link text-[1.1rem]">{children}</SiteLink></p>;
}

export const FeeTempo = Object.assign(FeeTempoSection, { Heading: TempoHeading, Tempos, Note: TempoNote, Link: TempoLink });

/** Lessons: the engraved fee schedule, then group classes as a second movement. */
function FeeScheduleSection({ children }: ContentProps) {
  return <section id="fees" className="scroll-mt-4 bg-paper-deep py-[clamp(3.5rem,7vw,6rem)]" aria-labelledby="schedule-heading"><div className="wrap">{children}</div></section>;
}

function ScheduleHeading({ marking, children }: ContentProps & { marking?: string }) {
  return <SectionHeading marking={marking} id="schedule-heading">{children}</SectionHeading>;
}

function ScheduleIntroduction({ children }: ContentProps) {
  return <p className="mt-5 max-w-(--measure) text-[1.08rem]">{children}</p>;
}

function Table({ caption }: { caption: string }) {
  return <div className="programme-card mt-10 overflow-x-auto p-2 sm:p-6">
    <table className="w-full min-w-[30rem] border-collapse text-left">
      <caption className="pb-4 text-left font-display text-[1.5rem]">{caption}</caption>
      <thead><tr className="border-y-2 border-ink">
        <th scope="col" className="py-3 pr-4">Lesson length</th>
        <th scope="col" className="py-3 pr-4">Suits</th>
        <th scope="col" className="py-3 text-right">Per {weeksPerTerm}-week term</th>
      </tr></thead>
      <tbody>{lessonLengths.map(length => <tr key={length.id} className="border-b border-staff">
        <th scope="row" className="py-4 pr-4 font-display text-[1.5rem] font-normal">{length.minutes} minutes</th>
        <td className="py-4 pr-4 text-pencil">{length.suitedTo}</td>
        <td className="py-4 text-right font-display text-[1.9rem] text-primary-ink">{formatFee(length.termFee)}</td>
      </tr>)}</tbody>
    </table>
  </div>;
}

function Groups({ heading, marking }: { heading: string; marking?: string }) {
  return <div className="mt-16">
    {marking ? <p className="marking">{marking}</p> : null}
    <h3 className="mt-1 text-[clamp(1.8rem,3.4vw,2.5rem)]">{heading}</h3>
    <ul className="mt-6 grid gap-0 border-t-2 border-ink">
      {groupClasses.map(group => <li key={group.id} id={group.id} className="grid gap-x-8 gap-y-2 border-b-2 border-ink py-6 md:grid-cols-[1.2fr_2fr_auto] md:items-center">
        <div>
          <h4 className="font-display text-[1.6rem] leading-tight">{group.name}</h4>
          <p className="font-bold text-pencil">Ages {group.ages}, {group.day}s at {clockTime(group.time)}, {group.minutes} min</p>
        </div>
        <p>{group.description}</p>
        <div className="flex items-center gap-4 md:flex-col md:items-end">
          <span className="font-display text-[1.9rem] leading-none text-primary-ink">{formatFee(group.termFee)}</span>
          {group.places > 0
            ? <span className="font-bold">{group.places} place{group.places === 1 ? '' : 's'} left</span>
            : <span className="sticker"><svg viewBox="0 0 20 20" className="size-4" aria-hidden="true"><StarShape cx={10} cy={10} r={8} /></svg>Waitlist</span>}
        </div>
      </li>)}
    </ul>
  </div>;
}

export const FeeSchedule = Object.assign(FeeScheduleSection, { Heading: ScheduleHeading, Introduction: ScheduleIntroduction, Table, Groups });

/** Lessons: what's included, with beamed-quaver bullets. */
export function Policies({ heading, children }: { heading: string; children?: ReactNode }) {
  return <section className="wrap py-[clamp(3.5rem,7vw,6rem)]" aria-labelledby="policies-heading">
    <SectionHeading id="policies-heading">{heading}</SectionHeading>
    <ul className="mt-10 grid gap-x-14 gap-y-8 md:grid-cols-2">
      {policies.map(policy => <li key={policy.id} className="flex gap-4">
        <QuaverPair className="mt-1 size-8 shrink-0 text-primary-ink" />
        <div><h3 className="font-sans text-[1.2rem] font-bold">{policy.title}</h3><p className="mt-1">{policy.text}</p></div>
      </li>)}
    </ul>
    {children ? <div className="mt-10 max-w-(--measure) text-pencil">{children}</div> : null}
  </section>;
}
