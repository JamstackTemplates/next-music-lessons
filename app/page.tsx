import type { Metadata } from 'next';
import { NextOnStage } from '../components/concert-tickets';
import { FeeTempo } from '../components/fees';
import { Hero } from '../components/hero';
import { InstrumentPicker } from '../components/instrument-picker';
import { TeacherLineup } from '../components/teacher-programme';
import { TermSteps } from '../components/term-steps';
import { Visit } from '../components/visit';
import { absoluteUrl } from '../lib/paths';
import { site } from '../lib/site';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

export default function HomePage() {
  return <>
    <Hero>
      <Hero.Marking>Allegro con gioia</Hero.Marking>
      <Hero.Heading>Every great musician started with one note.</Hero.Heading>
      <Hero.Introduction>
        Weekly one-to-one lessons in piano, strings, guitar, drums, woodwind and voice for ages 5 to adult,
        a five-minute walk from the Arts Centre.
      </Hero.Introduction>
      <Hero.Actions>
        <Hero.Primary>Enquire about a trial lesson</Hero.Primary>
        <Hero.Secondary>See instruments &amp; term fees</Hero.Secondary>
      </Hero.Actions>
      <Hero.Status />
    </Hero>

    <InstrumentPicker>
      <InstrumentPicker.Heading marking="mf">Pick your instrument</InstrumentPicker.Heading>
      <InstrumentPicker.Introduction>
        Nine instruments and six patient teachers. Choose a note to see who teaches it, how long
        the lessons are and the youngest age we start.
      </InstrumentPicker.Introduction>
      <InstrumentPicker.Staff hint="swipe along the staff" />
    </InstrumentPicker>

    <TermSteps>
      <TermSteps.Heading marking="Andante">How a term works</TermSteps.Heading>
      <TermSteps.Bars>
        <TermSteps.Bar number={1} title="A trial lesson">
          Thirty minutes with the teacher we think will suit. $35, and it comes off the first term if you stay.
        </TermSteps.Bar>
        <TermSteps.Bar number={2} title="Lessons every week">
          The same day, time and teacher for ten weeks, with a practice book that comes home with notes and stars.
        </TermSteps.Bar>
        <TermSteps.Bar number={3} title="A concert on stage">
          Every term ends with a relaxed student concert. Playing is encouraged, never required.
        </TermSteps.Bar>
      </TermSteps.Bars>
      <TermSteps.Repeat>…and repeat each term</TermSteps.Repeat>
    </TermSteps>

    <TeacherLineup>
      <TeacherLineup.Heading marking="Dolce">Meet a few of the teachers</TeacherLineup.Heading>
      <TeacherLineup.Portraits />
      <TeacherLineup.Link>Meet all six teachers</TeacherLineup.Link>
    </TeacherLineup>

    <NextOnStage>
      <div>
        <NextOnStage.Heading marking="ff">Next on stage</NextOnStage.Heading>
        <NextOnStage.Introduction>
          Free for families and friends. Students play whatever they are proud of this term, from a
          five-note tune to a Grade 7 sonata.
        </NextOnStage.Introduction>
        <NextOnStage.Link>All concerts</NextOnStage.Link>
      </div>
      <NextOnStage.Ticket empty="The next concert date will be announced soon." />
    </NextOnStage>

    <FeeTempo>
      <FeeTempo.Heading marking="a tempo">Term fees at a glance</FeeTempo.Heading>
      <FeeTempo.Tempos per="per 10-week term" />
      <FeeTempo.Note>trial lesson $35, taken off your first term ★</FeeTempo.Note>
      <FeeTempo.Link>Full fee schedule, group classes and discounts</FeeTempo.Link>
    </FeeTempo>

    <Visit>
      <Visit.Heading marking="Fine">Come and visit</Visit.Heading>
      <Visit.Details hoursHeading="Front desk and lessons" />
    </Visit>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData(site.timeZone || undefined)) }} />
  </>;
}
