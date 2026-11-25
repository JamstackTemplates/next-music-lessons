import type { ReactNode } from 'react';
import { instruments } from '../content/instruments';
import { teachers, teachingWeek, type Teacher } from '../content/teachers';
import { InstrumentIcon } from './art/instruments';
import { StarShape } from './art/notation';
import { Portrait } from './art/portrait';
import { SectionHeading } from './section-heading';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

const instrumentName = (id: string) => instruments.find(i => i.id === id)?.name ?? id;
const firstName = (name: string) => name.split(' ')[0];

/** Gold-star "Waitlist only" sticker for teachers whose timetable is full. */
export function WaitlistSticker({ className = '' }: { className?: string }) {
  return <span className={`sticker ${className}`}>
    <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true"><StarShape cx={10} cy={10} r={8} /></svg>Waitlist only
  </span>;
}

/** Teaching days as a tiny staff: a note on each teaching day, a rest on the others. */
export function WeekStaff({ days }: { days: Teacher['teachingDays'] }) {
  return <div className="inline-block">
    <svg viewBox="0 0 186 46" className="h-[46px] w-[186px]" aria-hidden="true">
      {[8, 14, 20, 26, 32].map(y => <line key={y} x1="0" x2="186" y1={y} y2={y} stroke="var(--staff)" strokeWidth="1.2" />)}
      <line x1="185" x2="185" y1="8" y2="32" stroke="var(--ink)" strokeWidth="2" />
      {teachingWeek.map((day, i) => {
        const x = 16 + i * 30;
        return days.includes(day)
          ? <g key={day} fill="var(--primary)"><ellipse cx={x} cy="23" rx="5" ry="3.7" transform={`rotate(-22 ${x} 23)`} /><rect x={x + 3.8} y="2" width="1.6" height="21" /></g>
          : <path key={day} d={`M${x - 2} 11 l4 5 l-4 4 l4 5 c-3 -1 -5 1 -2 4`} fill="none" stroke="var(--pencil)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />;
      })}
    </svg>
    <div className="flex w-[186px] text-[.72rem] font-bold text-pencil" aria-hidden="true">{teachingWeek.map(day => <span key={day} className="w-[30px] first:ml-[3px] text-center">{day}</span>)}</div>
    <p className="sr-only">Teaches on {days.join(', ')}</p>
  </div>;
}

/** Home: three featured teachers as staggered programme portraits. */
function TeacherLineupSection({ children }: ContentProps) {
  return <section className="ruled-bg bg-paper-deep py-[clamp(3.5rem,7vw,6rem)]" aria-labelledby="teachers-heading"><div className="wrap">{children}</div></section>;
}

function LineupHeading({ marking, children }: ContentProps & { marking?: string }) {
  return <SectionHeading marking={marking} id="teachers-heading">{children}</SectionHeading>;
}

function Portraits() {
  const featured = teachers.filter(t => t.featured);
  return <ul className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-8">
    {featured.map((teacher, i) => <li key={teacher.id} className={`relative text-center ${i === 1 ? 'sm:mt-16' : i === 2 ? 'sm:mt-6' : ''}`}>
      <SiteLink href={`/teachers/#${teacher.id}`} className="group block no-underline">
        <Portrait id={`home-${teacher.id}`} colour={teacher.signatureColour} hairstyle={teacher.hairstyle} instrumentId={teacher.instrumentIds[0]} className="mx-auto w-[min(15rem,70vw)] transition-transform duration-300 group-hover:-rotate-2" />
        <h3 className="mt-4 text-[1.9rem] group-hover:underline">{teacher.name}</h3>
      </SiteLink>
      <p className="mt-1 font-bold text-pencil">{teacher.role}</p>
      <p className="font-hand mt-1 text-[1.4rem] text-primary-ink -rotate-3" aria-hidden="true">{firstName(teacher.name)}</p>
      {!teacher.acceptingStudents && <WaitlistSticker className="absolute top-2 right-[12%] sm:right-0" />}
    </li>)}
  </ul>;
}

function LineupLink({ children }: ContentProps) {
  return <p className="mt-12 text-center"><SiteLink href="/teachers/" className="button button-ghost">{children}</SiteLink></p>;
}

export const TeacherLineup = Object.assign(TeacherLineupSection, { Heading: LineupHeading, Portraits, Link: LineupLink });

/** Teachers page: the "Meet the performers" spread. */
export function TeacherSpread() {
  return <ul className="wrap grid gap-x-12 gap-y-16 lg:grid-cols-2">
    {teachers.map((teacher, i) => <li key={teacher.id} id={teacher.id} className="scroll-mt-6">
      <article className={`flex flex-col gap-6 sm:flex-row sm:items-start ${i % 2 ? 'sm:flex-row-reverse sm:text-right' : ''}`}>
        <div className="relative shrink-0 self-center sm:self-start">
          <Portrait id={teacher.id} colour={teacher.signatureColour} hairstyle={teacher.hairstyle} instrumentId={teacher.instrumentIds[0]} className="w-[11.5rem]" />
          {!teacher.acceptingStudents && <WaitlistSticker className="absolute -bottom-2 left-1/2 -translate-x-1/2" />}
        </div>
        <div className="min-w-0">
          <h2 className="text-[2.1rem]">{teacher.name}</h2>
          <p className="font-bold text-pencil">{teacher.role}</p>
          <ul className={`mt-3 flex flex-wrap gap-2 ${i % 2 ? 'sm:justify-end' : ''}`} aria-label="Teaches">
            {teacher.instrumentIds.map(id => <li key={id}>
              <SiteLink href={`/lessons/#${id}`} className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-card py-0.5 pr-3 pl-1 font-bold no-underline hover:border-primary">
                <InstrumentIcon id={id} className="size-7" />{instrumentName(id)}
              </SiteLink>
            </li>)}
          </ul>
          <p className="mt-4">{teacher.bio}</p>
          <p className="mt-3 text-[.95rem] text-pencil">{teacher.qualifications}</p>
          <div className="mt-4"><WeekStaff days={teacher.teachingDays} /></div>
          <p className="pencil mt-3">Favourite piece: {teacher.favouritePiece}</p>
        </div>
      </article>
    </li>)}
  </ul>;
}
