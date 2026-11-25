import type { ReactNode } from 'react';
import { PencilCircle } from './art/notation';
import { SectionHeading } from './section-heading';

type ContentProps = { children: ReactNode };

/** "How a term works": numbered bars of one long measure, closed by a repeat barline. */
function TermStepsSection({ children }: ContentProps) {
  return <section className="py-[clamp(3.5rem,7vw,6rem)]" aria-labelledby="term-heading"><div className="wrap">{children}</div></section>;
}

function Heading({ marking, children }: ContentProps & { marking?: string }) {
  return <SectionHeading marking={marking} id="term-heading">{children}</SectionHeading>;
}

function Bars({ children }: ContentProps) {
  return <div className="mt-12 flex flex-col md:flex-row md:items-stretch">
    <div aria-hidden="true" className="hidden w-1 shrink-0 bg-ink md:block" />
    <ol className="grid flex-1 md:grid-cols-3">{children}</ol>
    {/* Final repeat barline */}
    <div aria-hidden="true" className="hidden shrink-0 items-center gap-1.5 md:flex">
      <span className="grid gap-3"><span className="size-2.5 rounded-full bg-ink" /><span className="size-2.5 rounded-full bg-ink" /></span>
      <span className="h-full w-[2px] bg-ink" /><span className="h-full w-2.5 bg-ink" />
    </div>
  </div>;
}

function Bar({ number, title, children }: ContentProps & { number: number; title: string }) {
  return <li className="relative border-b-2 border-ink px-1 py-8 last:border-b-0 md:border-r-2 md:border-b-0 md:px-8 md:py-4 md:last:border-r-0">
    <div className="flex items-center gap-4 md:block">
      <span className="relative grid size-24 shrink-0 place-items-center font-hand text-[4.2rem] leading-none text-primary-ink md:size-28 md:text-[5rem]">
        <PencilCircle className="absolute inset-0 size-full" />
        <span className="relative">{number}</span>
      </span>
      <h3 className="text-[1.75rem] md:mt-4">{title}</h3>
    </div>
    <p className="mt-3 max-w-[30ch] text-[1.05rem]">{children}</p>
  </li>;
}

function Repeat({ children }: ContentProps) {
  return <p className="pencil mt-6 text-right text-[1.3rem]">{children}</p>;
}

export const TermSteps = Object.assign(TermStepsSection, { Heading, Bars, Bar, Repeat });
