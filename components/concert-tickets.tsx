import type { ReactNode } from 'react';
import { pastConcerts, upcomingConcerts, type Concert } from '../content/concerts';
import { clockTime, dateParts, longDate } from '../lib/format';
import { Fermata } from './art/notation';
import { Lyre } from './art/stage';
import { SectionHeading } from './section-heading';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

/** A concert as an admit-one ticket: details on the left, the date on the perforated stub. */
export function TicketStub({ concert, large = false, className = '' }: { concert: Concert; large?: boolean; className?: string }) {
  const date = dateParts(concert.date);
  return <article className={`ticket flex flex-col sm:flex-row shadow-[0_10px_0_rgba(0,0,0,.18)] ${className}`} aria-label={`${concert.title}, ${longDate(concert.date)}`}>
    <div className={`flex-1 ${large ? 'p-7 sm:p-9' : 'p-6'}`}>
      <p className="flex items-center gap-2 text-[.85rem] font-bold text-[#b3261e]"><Lyre className="h-5 w-4" />Admit one, and the whole family</p>
      <h3 className={`mt-2 ${large ? 'text-[clamp(2rem,4vw,3rem)]' : 'text-[1.8rem]'}`}>{concert.title}</h3>
      <p className="mt-2 font-bold">{longDate(concert.date)}, {clockTime(concert.startTime)}</p>
      <p className="ticket-muted">{concert.venue}. {concert.entry}.</p>
      {large ? <p className="ticket-muted mt-3">{concert.performers}.</p> : null}
    </div>
    <div className={`ticket-stub-edge flex shrink-0 items-baseline justify-center gap-3 py-4 text-center sm:flex-col sm:items-center sm:gap-0 sm:py-0 ${large ? 'sm:w-44 sm:px-4' : 'sm:w-28 sm:px-3'}`} aria-hidden="true">
      <span className="text-[.9rem] font-bold">{date.weekday}</span>
      <span className={`font-display leading-none text-[#b3261e] ${large ? 'text-[3.4rem] sm:text-[6rem]' : 'text-[3rem] sm:text-[3.6rem]'}`}>{date.day}</span>
      <span className="text-[.95rem] font-bold">{date.month} {date.year}</span>
    </div>
  </article>;
}

/** Home: the next upcoming concert on the dark "stage" band. */
function NextOnStageSection({ children }: ContentProps) {
  return <section className="relative overflow-hidden bg-stage py-[clamp(3.5rem,7vw,6rem)] text-stage-ink" aria-labelledby="stage-heading">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_70%_40%,rgba(242,193,78,.16),transparent_70%)]" />
    <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">{children}</div>
  </section>;
}

function StageHeading({ marking, children }: ContentProps & { marking?: string }) {
  return <div>
    {marking ? <p className="marking !text-stage-muted">{marking}</p> : null}
    <h2 id="stage-heading" className="hairpin mt-1.5 text-[clamp(2.1rem,4.4vw,3.4rem)]">{children}</h2>
  </div>;
}

function StageIntroduction({ children }: ContentProps) {
  return <p className="mt-5 max-w-[30rem] text-[1.1rem] text-stage-muted">{children}</p>;
}

function StageTicket({ empty }: { empty: ReactNode }) {
  const concert = upcomingConcerts()[0];
  return concert
    ? <TicketStub concert={concert} large className="lg:-rotate-2" />
    : <p className="text-[1.2rem] text-stage-muted">{empty}</p>;
}

function StageLink({ children }: ContentProps) {
  return <p className="mt-8 inline-flex flex-col items-center">
    <Fermata className="mb-1 h-5 w-10 text-gold" />
    <SiteLink href="/concerts/" className="button">{children}</SiteLink>
  </p>;
}

export const NextOnStage = Object.assign(NextOnStageSection, { Heading: StageHeading, Introduction: StageIntroduction, Ticket: StageTicket, Link: StageLink });

/** Concerts page: every upcoming concert as a row of ticket stubs. */
export function TicketRow({ empty }: { empty: ReactNode }) {
  const list = upcomingConcerts();
  if (!list.length) return <p className="wrap text-[1.2rem]">{empty}</p>;
  return <div className="staff-scroll overflow-x-auto pb-6 [scroll-snap-type:x_mandatory]">
    <ul className="wrap flex gap-6 lg:grid lg:grid-cols-2">
      {list.map((concert, i) => <li key={concert.id} id={concert.id} className={`w-[min(34rem,88vw)] shrink-0 snap-center lg:w-auto ${i % 2 ? 'lg:rotate-1' : 'lg:-rotate-1'}`}>
        <TicketStub concert={concert} />
        <ul className="mt-4 grid gap-1 px-2 text-[.98rem]" aria-label={`${concert.title} programme`}>
          {concert.programme.map(line => <li key={line} className="flex gap-2"><span className="font-display text-primary-ink" aria-hidden="true">♪</span>{line}</li>)}
        </ul>
      </li>)}
    </ul>
  </div>;
}

/** A printed programme page: copy on the left, the evening's running order on the right. */
function ProgrammePageSection({ children }: ContentProps) {
  return <section className="wrap py-[clamp(3rem,6vw,5rem)]" aria-labelledby="programme-heading">
    <div className="programme-card grid gap-10 p-7 sm:p-10 md:grid-cols-[1.2fr_1fr]">{children}</div>
  </section>;
}

function ProgrammeHeading({ marking, children }: ContentProps & { marking?: string }) {
  return <SectionHeading marking={marking} id="programme-heading">{children}</SectionHeading>;
}

function ProgrammeBody({ children }: ContentProps) {
  return <div className="mt-6 grid max-w-(--measure) gap-4 text-[1.05rem]">{children}</div>;
}

function RunningOrder({ title }: { title: string }) {
  const steps = [
    ['Doors open', '20 minutes before'],
    ['Welcome from Margot', '2 minutes'],
    ['First half: beginners and groups', 'about 35 minutes'],
    ['Interval: cordial and biscuits', '15 minutes'],
    ['Second half: soloists and ensembles', 'about 35 minutes'],
    ['Bows, gold stars and photos', 'as long as it takes'],
  ];
  return <div className="border-t-2 border-ink pt-6 md:border-t-0 md:border-l-2 md:pt-0 md:pl-10">
    <h3 className="text-center text-[1.6rem]">{title}</h3>
    <p className="marking mt-1 text-center">in two movements</p>
    <ol className="mt-6 grid gap-3">
      {steps.map(([what, when]) => <li key={what} className="flex items-baseline gap-2">
        <span className="font-bold">{what}</span>
        <span aria-hidden="true" className="mb-1 flex-1 border-b-2 border-dotted border-staff" />
        <span className="text-[.95rem] text-pencil">{when}</span>
      </li>)}
    </ol>
  </div>;
}

export const ProgrammePage = Object.assign(ProgrammePageSection, { Heading: ProgrammeHeading, Body: ProgrammeBody, RunningOrder });

/** Past concerts as a programme index with dotted leaders. */
export function ArchiveIndex() {
  const list = pastConcerts();
  return <ol className="mt-8 grid gap-4">
    {list.map(concert => <li key={concert.id} className="grid gap-x-3 sm:flex sm:items-baseline">
      <span className="font-display text-[1.5rem]">{concert.title}</span>
      <span aria-hidden="true" className="mb-1.5 hidden flex-1 border-b-2 border-dotted border-staff sm:block" />
      <span className="font-bold text-pencil">{longDate(concert.date)}</span>
      <span className="text-[.95rem] text-pencil sm:hidden">{concert.performers}</span>
    </li>)}
  </ol>;
}
