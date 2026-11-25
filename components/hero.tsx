import type { ReactNode } from 'react';
import { asset } from '../lib/paths';
import { ScoreWatermark } from './art/notation';
import { FrontDesk } from './front-desk';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

const HERO_ALT = 'An upright piano with an open music book and gold stars, a cello, violin, flute, ukulele and snare drum on a studio rug, with musical notes floating up from the piano';

function HeroArt({ className = '', decorative = false }: { className?: string; decorative?: boolean }) {
  const imgClass = `hero-art-blend h-auto w-full select-none ${className}`;
  return <>
    <img src={asset('/hero-light.webp')} alt={decorative ? '' : HERO_ALT} aria-hidden={decorative || undefined}
      width={1400} height={1045} fetchPriority="high" decoding="async"
      className={`hero-art-light ${imgClass}`} />
    <img src={asset('/hero-dark.webp')} alt={decorative ? '' : HERO_ALT} aria-hidden={decorative || undefined}
      width={1400} height={1045} fetchPriority="high" decoding="async"
      className={`hero-art-dark ${imgClass}`} />
  </>;
}

/** Home hero: lead message and actions beside the Recital room scene. */
function HeroSection({ children }: ContentProps) {
  return <section className="hero-spot notes-bg relative overflow-hidden" aria-labelledby="hero-heading">
    <div aria-hidden="true" className="staff-bg absolute inset-x-0 top-[44%] hidden h-[80px] md:block" />
    <ScoreWatermark className="pointer-events-none absolute -top-6 -left-10 w-[19rem] opacity-25 select-none md:w-[23rem]" />
    <div className="wrap relative grid items-center gap-6 pt-7 pb-14 md:grid-cols-[1fr_1.12fr] md:gap-4 md:pt-10 md:pb-14 lg:min-h-[min(46rem,calc(100svh-6rem))]">
      <div className="relative z-10">{children}</div>
      <div className="relative hidden md:block lg:-mr-12">
        <HeroArt />
      </div>
    </div>
  </section>;
}

function Marking({ children }: ContentProps) {
  return <p className="marking">{children}</p>;
}

function Heading({ children }: ContentProps) {
  return <>
    <h1 id="hero-heading" className="mt-2 text-[clamp(2.7rem,5.6vw,5.4rem)] leading-[1.02]">{children}</h1>
    {/* Compact view of the recital room art on small screens so the first screen shows the scene and primary CTA. */}
    <div className="mt-3 -mx-3 md:hidden">
      <HeroArt decorative className="mx-auto max-h-[13.5rem] w-auto object-contain" />
    </div>
  </>;
}

function Introduction({ children }: ContentProps) {
  return <p className="mt-5 max-w-[34rem] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-relaxed">{children}</p>;
}

function Actions({ children }: ContentProps) {
  return <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div>;
}

function Primary({ children }: ContentProps) {
  return <SiteLink href="/contact/" className="button text-[1.05rem]">{children}</SiteLink>;
}

function Secondary({ children }: ContentProps) {
  return <SiteLink href="/lessons/" className="button button-ghost">{children}</SiteLink>;
}

function Status() {
  return <FrontDesk className="mt-6" />;
}

export const Hero = Object.assign(HeroSection, { Marking, Heading, Introduction, Actions, Primary, Secondary, Status });
