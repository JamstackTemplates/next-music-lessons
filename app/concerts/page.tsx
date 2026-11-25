import type { Metadata } from 'next';
import { ArchiveIndex, ProgrammePage, TicketRow } from '../../components/concert-tickets';
import { CtaBand } from '../../components/cta-band';
import { PageHead } from '../../components/page-head';
import { SectionHeading } from '../../components/section-heading';
import { CurtainSwag } from '../../components/art/stage';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Student concerts',
  description: 'Upcoming student concerts at Treble Clef Music School in Southbank, free for families and friends.',
  alternates: { canonical: absoluteUrl('/concerts/') },
};

export default function ConcertsPage() {
  return <>
    <PageHead marking="ff" title="On stage" above={<CurtainSwag className="block h-16 w-full sm:h-24" />}>
      <p>Every term ends with a concert in our recital room or foyer. Entry is free, the biscuits are free, and so is the applause.</p>
    </PageHead>

    <section aria-labelledby="upcoming-heading" className="pb-8">
      <h2 id="upcoming-heading" className="sr-only">Upcoming concerts</h2>
      <TicketRow empty="New concert dates are added at the start of each term." />
    </section>

    <ProgrammePage>
      <div>
        <ProgrammePage.Heading marking="Programme notes">What happens at a student concert</ProgrammePage.Heading>
        <ProgrammePage.Body>
          <p>Most concerts last about an hour and a half with an interval. Beginners play first, so the youngest can head home early if they need to.</p>
          <p>Every student is invited and nobody is made to play solo. Duets with a teacher, group pieces and ensembles all count.</p>
          <p>Families and friends come free, with no tickets needed. Seats are first come, first served, and there is room at the back for prams.</p>
        </ProgrammePage.Body>
      </div>
      <ProgrammePage.RunningOrder title="A typical running order" />
    </ProgrammePage>

    <section className="wrap py-[clamp(3rem,6vw,5rem)]" aria-labelledby="archive-heading">
      <SectionHeading marking="Da capo" id="archive-heading">Past concerts</SectionHeading>
      <ArchiveIndex />
    </section>

    <CtaBand>
      <CtaBand.Heading>Want your child on the next programme?</CtaBand.Heading>
      <CtaBand.Text>Students who start lessons this term are welcome to play at the next concert.</CtaBand.Text>
      <CtaBand.Action>Enquire about lessons</CtaBand.Action>
    </CtaBand>
  </>;
}
