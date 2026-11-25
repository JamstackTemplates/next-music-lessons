import { lessonLengths } from '../content/fees';
import { instruments } from '../content/instruments';
import { teachers } from '../content/teachers';
import { InstrumentIcon } from './art/instruments';
import { StarShape } from './art/notation';
import { SiteLink } from './site-link';

const minutes = (id: string) => lessonLengths.find(l => l.id === id)?.minutes ?? id;

/** Lessons: each instrument as a page from a tutor book. On wide screens pages pair into open spreads. */
export function TutorPages() {
  return <ol className="tutor-spread wrap grid gap-6 lg:grid-cols-2 lg:gap-x-0 lg:gap-y-10">
    {instruments.map((instrument, i) => {
      const right = i % 2 === 1;
      return <li key={instrument.id} id={instrument.id} data-family={instrument.family} className="scroll-mt-6">
        <article className={`tutor-page relative flex h-full flex-col border-2 border-ink bg-card p-6 shadow-[6px_6px_0_var(--staff)] sm:p-8 ${right
          ? 'rounded-md lg:rounded-l-none lg:border-l-0 lg:bg-[linear-gradient(90deg,rgba(0,0,0,.09),transparent_2.5rem)]'
          : 'rounded-md lg:rounded-r-none lg:bg-[linear-gradient(270deg,rgba(0,0,0,.09),transparent_2.5rem)] lg:shadow-[0_6px_0_var(--staff)]'}`}>
          <div className={`tutor-page-head flex items-center gap-5 ${right ? 'lg:flex-row-reverse lg:text-right' : ''}`}>
            <div className="relative grid size-28 shrink-0 place-items-center rounded-full border-2 border-dashed border-staff bg-paper sm:size-32">
              <InstrumentIcon id={instrument.id} className="size-20 sm:size-24" />
            </div>
            <div>
              <p className="marking">from age {instrument.minAge}</p>
              <h2 className="mt-1 text-[clamp(2.2rem,4vw,2.9rem)]">{instrument.name}</h2>
              {instrument.hireAvailable && <span className="sticker mt-2">
                <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true"><StarShape cx={10} cy={10} r={8} /></svg>Hire available</span>}
            </div>
          </div>
          <p className="mt-5 text-[1.06rem]">{instrument.blurb}</p>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-[.9rem] font-bold text-pencil">Lesson lengths</dt>
              <dd className="mt-1 flex flex-wrap gap-2">{instrument.lessonLengths.map(id =>
                <span key={id} className="rounded-full border-2 border-ink px-3 py-0.5 font-bold">{minutes(id)} min</span>)}</dd>
            </div>
            <div>
              <dt className="text-[.9rem] font-bold text-pencil">Taught by</dt>
              <dd className="mt-1 flex flex-wrap gap-x-3">{instrument.teacherIds.map(id => {
                const teacher = teachers.find(t => t.id === id);
                return teacher ? <SiteLink key={id} href={`/teachers/#${id}`} className="text-link">{teacher.name}</SiteLink> : null;
              })}</dd>
            </div>
          </dl>
          <p className={`tutor-page-num mt-auto pt-6 font-display text-[1.05rem] italic text-pencil ${right ? 'text-right' : ''}`} aria-hidden="true">p. {i + 1}</p>
        </article>
      </li>;
    })}
  </ol>;
}
