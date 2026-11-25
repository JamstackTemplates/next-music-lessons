import type { Metadata } from 'next';
import { TrebleClefGlyph } from '../../components/art/notation';
import { CtaBand } from '../../components/cta-band';
import { FamilyFilter } from '../../components/family-filter';
import { FeeSchedule, Policies } from '../../components/fees';
import { PageHead } from '../../components/page-head';
import { TheStaff } from '../../components/the-staff';
import { TutorPages } from '../../components/tutor-pages';
import { families, instruments } from '../../content/instruments';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Instruments and term fees',
  description: 'Piano, violin, cello, guitar, ukulele, flute, clarinet, drums and voice lessons in Southbank, with term fees for 30, 45 and 60-minute lessons and group classes.',
  alternates: { canonical: absoluteUrl('/lessons/') },
};

const counts = Object.fromEntries(families.map(f => [f.id, instruments.filter(i => i.family === f.id).length]));

export default function LessonsPage() {
  return <>
    <PageHead marking="Moderato" title="Instruments & term fees"
      ornament={<svg viewBox="0 0 90 150" className="h-52 w-32" aria-hidden="true"><TrebleClefGlyph x={2} y={10} scale={1.1} width={4} /></svg>}>
      <p>One-to-one lessons in nine instruments, for ages 5 to adult. Every term is ten weeks long and ends with a concert.</p>
    </PageHead>

    <FamilyFilter families={families} counts={counts} total={instruments.length}>
      <div className="wrap pb-12"><TheStaff instruments={instruments} linkTo="/lessons/" idPrefix="note" /></div>
      <TutorPages />
    </FamilyFilter>

    <div className="h-[clamp(3rem,6vw,5rem)]" />

    <FeeSchedule>
      <FeeSchedule.Heading marking="Tempo giusto">Lesson lengths &amp; term fees</FeeSchedule.Heading>
      <FeeSchedule.Introduction>
        Every instrument costs the same; you choose the lesson length. Fees are for one ten-week term,
        GST-free, and invoiced once we have agreed a teacher and time with you. Nothing is paid on this website.
      </FeeSchedule.Introduction>
      <FeeSchedule.Table caption="One-to-one lessons" />
      <FeeSchedule.Groups marking="Second movement" heading="Group classes" />
    </FeeSchedule>

    <Policies heading="What’s included">
      <p>Questions about fees or discounts? Ask in your enquiry and we’ll explain before anything is arranged.</p>
    </Policies>

    <CtaBand>
      <CtaBand.Heading>Not sure which instrument? Try one.</CtaBand.Heading>
      <CtaBand.Text>Tell us about the student and we’ll suggest a teacher and a trial time.</CtaBand.Text>
      <CtaBand.Action>Enquire about a trial lesson</CtaBand.Action>
    </CtaBand>
  </>;
}
