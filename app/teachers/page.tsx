import type { Metadata } from 'next';
import { CtaBand } from '../../components/cta-band';
import { PageHead } from '../../components/page-head';
import { TeacherSpread } from '../../components/teacher-programme';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Teachers',
  description: 'Meet the six teachers at Treble Clef Music School: piano, strings, voice, guitar and ukulele, woodwind and drums.',
  alternates: { canonical: absoluteUrl('/teachers/') },
};

function Cartouche() {
  return <svg viewBox="0 0 220 150" className="h-40 w-56" aria-hidden="true">
    <ellipse cx="110" cy="75" rx="104" ry="68" fill="var(--plum)" />
    <ellipse cx="110" cy="75" rx="94" ry="58" fill="none" stroke="var(--paper)" strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" />
    <text x="110" y="74" textAnchor="middle" fontFamily="var(--font-display)" fontSize="40" fill="var(--paper)">Six</text>
    <text x="110" y="102" textAnchor="middle" fontFamily="var(--font-display)" fontSize="21" fill="var(--paper)">teachers, since 2009</text>
  </svg>;
}

export default function TeachersPage() {
  return <>
    <PageHead marking="Dolce" title="The ensemble" ornament={<Cartouche />}>
      <p>Six working musicians who also love teaching. Each one plays, performs and still practises, and each has a jar of gold stars.</p>
    </PageHead>

    <div className="pt-6 pb-16"><TeacherSpread /></div>

    <section className="wrap" aria-labelledby="match-heading">
      <div className="relative mx-auto max-w-3xl rounded-sm border-2 border-dashed border-pencil px-7 py-8 sm:px-10">
        <p className="pencil absolute -top-4 left-6 rotate-[-3deg] bg-paper px-2 text-[1.3rem]">a note from Margot</p>
        <h2 id="match-heading" className="text-[1.9rem]">How we match students with teachers</h2>
        <p className="mt-3">
          We read every enquiry ourselves. We look at the student’s age, the instrument, the days that work for
          your family and how the student likes to learn, then suggest one teacher for a trial lesson. If it
          doesn’t click, we’ll suggest another, with no awkwardness.
        </p>
      </div>
    </section>

    <CtaBand>
      <CtaBand.Heading>Find your teacher with a trial lesson.</CtaBand.Heading>
      <CtaBand.Text>Priya’s timetable is full this term, so we can add you to her waitlist or suggest another teacher.</CtaBand.Text>
      <CtaBand.Action>Enquire about a trial lesson</CtaBand.Action>
    </CtaBand>
  </>;
}
