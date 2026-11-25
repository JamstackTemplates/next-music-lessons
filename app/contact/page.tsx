import type { Metadata } from 'next';
import { StarShape } from '../../components/art/notation';
import { CopyEmail } from '../../components/copy-email';
import { FrontDesk } from '../../components/front-desk';
import { HoursTable } from '../../components/hours-table';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { business, formattedAddress } from '../../content/business';
import { mapDirectionsUrl } from '../../lib/maps';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Enquire about a trial lesson',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <>
    <PageHead marking="Con brio" title="Enquire about a trial lesson">
      <p>{business.enquiries.introduction} {business.enquiries.reply}</p>
    </PageHead>

    <div className="wrap grid gap-10 pb-16 lg:grid-cols-[1fr_1.25fr] lg:items-start">
      {/* Notebook page with the message checklist */}
      <section aria-labelledby="include-heading" className="ruled-bg relative rounded-sm border-2 border-ink bg-card px-7 pt-8 pb-9 shadow-[6px_6px_0_var(--staff)] before:!opacity-70">
        <span aria-hidden="true" className="absolute inset-y-0 left-12 w-[2px] bg-primary/50" />
        <div className="pl-10">
          <h2 id="include-heading" className="text-[1.8rem]">Useful to put in your message</h2>
          <p className="pencil mt-1">the form only asks for your name, email and a message</p>
          <ul className="mt-5 grid gap-[.55rem] text-[1.05rem]">
            {business.enquiries.usefulToInclude.map(tip => <li key={tip} className="flex items-start gap-3">
              <svg viewBox="0 0 20 20" className="mt-1 size-5 shrink-0" aria-hidden="true"><StarShape cx={10} cy={10} r={8} /></svg>{tip}
            </li>)}
          </ul>
        </div>
      </section>

      {/* Programme card holding the hosted form, or the email fallback */}
      <section aria-labelledby="form-heading" className="programme-card p-6 sm:p-8">
        <h2 id="form-heading" className="text-[1.8rem]">{hosted ? 'Send us a message' : 'Write to us directly'}</h2>
        {hosted
          ? <div className="mt-5"><JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} /></div>
          : <p className="mt-3">Email us with the details on the left and we’ll reply within two school days.</p>}
        <div className="mt-6 border-t-2 border-dotted border-staff pt-5">
          <p className="font-bold">Prefer email?</p>
          <p className="mt-1"><a className="text-link wrap-anywhere text-[1.15rem]" href={`mailto:${business.email}`}>{business.email}</a></p>
          <div className="mt-3 flex flex-wrap items-center gap-3"><CopyEmail email={business.email} /></div>
          {business.phone ? <p className="mt-4">Or call the front desk on <a className="font-bold" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>{business.phone}</a> during opening hours.</p> : null}
        </div>
      </section>
    </div>

    {/* Barline-divided strip: address and hours */}
    <section aria-label="Address and hours" className="bg-paper-deep">
      <div className="wrap grid gap-8 py-10 md:grid-cols-2 md:divide-x-2 md:divide-ink">
        <div className="md:pr-10">
          <h2 className="text-[1.6rem]">Find us</h2>
          <address className="mt-2 not-italic font-bold">{formattedAddress()}</address>
          <ul className="mt-2 grid gap-1 text-pencil">{business.directions.map(d => <li key={d}>{d}</li>)}</ul>
          <p className="mt-3"><a className="text-link" href={mapDirectionsUrl(business.mapQuery)}>Get directions</a></p>
        </div>
        <div className="md:pl-10">
          <h2 className="text-[1.6rem]">Front desk hours</h2>
          <HoursTable className="mt-3 max-w-sm" />
          <TimeZoneNote className="text-pencil" />
          <FrontDesk className="mt-4" />
        </div>
      </div>
    </section>
  </>;
}
