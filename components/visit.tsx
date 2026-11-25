import type { ReactNode } from 'react';
import { business, formattedAddress } from '../content/business';
import { mapDirectionsUrl } from '../lib/maps';
import { FrontDesk } from './front-desk';
import { GoogleMap } from './google-map';
import { HoursTable } from './hours-table';
import { SectionHeading } from './section-heading';
import { TimeZoneNote } from './time-zone-note';

type ContentProps = { children: ReactNode };

/** Address, directions, map and the hours as a printed programme table. */
function VisitSection({ children, map = true }: ContentProps & { map?: boolean }) {
  return <section className="bg-paper-deep py-[clamp(3.5rem,7vw,6rem)]" aria-labelledby="visit-heading">
    <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <div>{children}</div>
      {map ? <div className="programme-card overflow-hidden p-2">
        <GoogleMap address={business.mapQuery} title={`Map showing ${business.name} near the Melbourne Recital Centre`} />
      </div> : null}
    </div>
  </section>;
}

function Heading({ marking, children }: ContentProps & { marking?: string }) {
  return <SectionHeading marking={marking} id="visit-heading">{children}</SectionHeading>;
}

function Details({ hoursHeading }: { hoursHeading: string }) {
  return <div className="mt-8 grid gap-8 sm:grid-cols-2">
    <div>
      <address className="not-italic text-[1.08rem] font-bold">{formattedAddress()}</address>
      <ul className="mt-3 grid gap-2 text-pencil">{business.directions.map(d => <li key={d}>{d}</li>)}</ul>
      <p className="mt-4"><a className="text-link" href={mapDirectionsUrl(business.mapQuery)}>Get directions</a></p>
      <p className="mt-5"><a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a></p>
      {business.phone ? <p className="mt-1"><a className="font-bold" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>{business.phone}</a></p> : null}
    </div>
    <div>
      <h3 className="text-[1.5rem]">{hoursHeading}</h3>
      <HoursTable className="mt-3" />
      <TimeZoneNote className="text-pencil" />
      <FrontDesk className="mt-4" />
      <p className="mt-4 text-[.95rem] text-pencil">{business.termNote}</p>
    </div>
  </div>;
}

export const Visit = Object.assign(VisitSection, { Heading, Details });
