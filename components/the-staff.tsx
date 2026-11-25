// Signature element: a five-line staff with a vermilion treble clef, where each instrument is a note
// at its staffPosition. Notes are real links; hover/focus makes them hop a step and circles the label.
import type { Instrument } from '../content/instruments';
import { InstrumentGlyph } from './art/instruments';
import { TrebleClefGlyph } from './art/notation';
import { SiteLink } from './site-link';

const H = 136;
const BOTTOM = 106; // y of the bottom staff line inside each 100×136 note box
const GAP = 12;
const LINES = [0, 1, 2, 3, 4].map(i => BOTTOM - i * GAP);

function NoteSvg({ instrument }: { instrument: Instrument }) {
  const y = BOTTOM - instrument.staffPosition * (GAP / 2);
  const up = instrument.staffPosition < 4;
  return <svg viewBox={`0 0 100 ${H}`} width="100" height={H} aria-hidden="true">
    <g>
      <circle cx="50" cy="22" r="20" fill="var(--card)" stroke="var(--staff)" strokeWidth="1.5" />
      <InstrumentGlyph id={instrument.id} x={32} y={4} size={36} />
    </g>
    <g className="note-body">
      <rect className={`note-stem${up ? '' : ' down'}`} x={up ? 56.6 : 41.2} y={up ? y - 34 : y} width="2.2" height="34" fill="var(--ink)" />
      <ellipse className="note-head" cx="50" cy={y} rx="8" ry="5.8" transform={`rotate(-22 50 ${y})`} fill="var(--ink)" />
    </g>
  </svg>;
}

export function TheStaff({ instruments, linkTo = '/lessons/', idPrefix = '' }: {
  instruments: readonly Instrument[];
  /** Route the notes link to; each note adds #<instrument id>. */
  linkTo?: string;
  idPrefix?: string;
}) {
  const ordered = [...instruments];
  return <div className="the-staff staff-scroll -mx-5 overflow-x-auto px-5 pb-2 [scroll-snap-type:x_proximity]">
    <div className="relative flex min-w-[62rem] items-start">
      <svg className="pointer-events-none absolute inset-x-0 top-0 h-[136px] w-full" viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" aria-hidden="true">
        {LINES.map(y => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="var(--ink)" strokeWidth="1.3" vectorEffect="non-scaling-stroke" opacity=".7" />)}
        <line x1="99.4" x2="99.4" y1={LINES[4]} y2={BOTTOM} stroke="var(--ink)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg className="relative shrink-0" viewBox={`0 0 104 ${H}`} width="104" height={H} aria-hidden="true">
        <TrebleClefGlyph x={2} y={8} />
        <text x="86" y={LINES[2] - 1} fontFamily="var(--font-display)" fontSize="27" fill="var(--ink)" textAnchor="middle">4</text>
        <text x="86" y={BOTTOM - 1} fontFamily="var(--font-display)" fontSize="27" fill="var(--ink)" textAnchor="middle">4</text>
      </svg>
      <ul className="relative flex flex-1" aria-label="Instruments">
        {ordered.map(instrument =>
          <li key={instrument.id} className="flex flex-1 justify-center" data-note-family={instrument.family}>
            <SiteLink id={idPrefix ? `${idPrefix}-${instrument.id}` : undefined} href={`${linkTo}#${instrument.id}`} className="staff-note">
              <NoteSvg instrument={instrument} />
              <span className="note-label">
                <svg viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="60" cy="20" rx="57" ry="17" fill="none" stroke="var(--primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" /></svg>
                {instrument.name}
              </span>
              <span className="font-hand text-[1.02rem] text-pencil">age {instrument.minAge}+</span>
            </SiteLink>
          </li>)}
      </ul>
      <div className="w-6 shrink-0" aria-hidden="true" />
    </div>
  </div>;
}
