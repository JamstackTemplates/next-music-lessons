import type { Metadata } from 'next';
import { WrongNote } from '../components/art/stage';
import { SiteLink } from '../components/site-link';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return <section className="wrap flex flex-col items-center py-[clamp(3rem,7vw,6rem)] text-center">
    <WrongNote className="w-full max-w-2xl" />
    <p className="pencil mt-2 rotate-[-2deg] text-[1.4rem]">try again from bar 1</p>
    <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.2rem)]">That note isn’t in the score.</h1>
    <p className="mt-4 max-w-(--measure) text-[1.1rem] text-pencil">The page you were looking for has moved or never existed. Start again from the top, or look through the instruments.</p>
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <SiteLink href="/" className="button">Back to the home page</SiteLink>
      <SiteLink href="/lessons/" className="button button-ghost">See instruments &amp; fees</SiteLink>
    </div>
  </section>;
}
