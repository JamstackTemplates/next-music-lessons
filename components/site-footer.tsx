import { business, formattedAddress } from '../content/business';
import { Barline, StarShape } from './art/notation';
import { HoursTable } from './hours-table';
import { SiteLink } from './site-link';
import { Wordmark } from './site-header';

/** The programme's back page: a final double barline, then visit, hours and contact, ending on Fine. */
export function SiteFooter() {
  return <footer>
    <Barline kind="final" className="!h-12" />
    <div className="bg-paper-deep">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <SiteLink href="/" className="inline-block no-underline"><Wordmark /></SiteLink>
          <p className="mt-6 font-display text-[3.2rem] italic leading-none" aria-label="Fine (the end)">Fine</p>
          <p className="pencil mt-3 flex items-center gap-2">Practise a little every day
            <svg viewBox="0 0 30 30" className="size-6" aria-hidden="true"><StarShape cx={15} cy={15} r={11} /></svg></p>
        </div>
        <div>
          <h2 className="text-[1.35rem]">Visit</h2>
          <address className="mt-3 not-italic">{formattedAddress()}</address>
          <ul className="mt-3 grid gap-2 text-[.95rem] text-pencil">{business.directions.map(d => <li key={d}>{d}</li>)}</ul>
        </div>
        <div>
          <h2 className="text-[1.35rem]">Front desk</h2>
          <HoursTable className="mt-3 text-[.95rem]" />
        </div>
        <div>
          <h2 className="text-[1.35rem]">Say hello</h2>
          <p className="mt-3"><a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a></p>
          {business.phone ? <p className="mt-2"><a className="font-bold" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>{business.phone}</a></p> : null}
          <ul className="mt-4 grid gap-1 font-bold">
            {[['/lessons/', 'Lessons and fees'], ['/teachers/', 'Teachers'], ['/concerts/', 'Concerts'], ['/contact/', 'Enquire about a trial']].map(([href, label]) =>
              <li key={href}><SiteLink href={href}>{label}</SiteLink></li>)}
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-4 border-t border-staff py-6 text-sm text-pencil">
        <p>{business.name} is a fictitious school, made as a sample website.</p>
        <span title="Made with love by jamstacks.net">with <span role="img" aria-label="love">❤️</span> <a className="hover:text-primary-ink hover:underline" href="https://jamstacks.net">jamstacks.net</a></span>
      </div>
    </div>
  </footer>;
}
