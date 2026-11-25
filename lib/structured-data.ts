import { business, formattedAddress } from '../content/business.ts';
import { upcomingConcerts } from '../content/concerts.ts';
import { instruments } from '../content/instruments.ts';
import { zoneOffset } from './format.ts';
import { absoluteUrl } from './paths.ts';

const SCHEMA_DAYS = { Monday: 'Monday', Tuesday: 'Tuesday', Wednesday: 'Wednesday', Thursday: 'Thursday', Friday: 'Friday', Saturday: 'Saturday', Sunday: 'Sunday' };

/** MusicSchool derived from content, with upcoming concerts as MusicEvent entries. */
export function businessStructuredData(timeZone = 'Australia/Melbourne') {
  const url = absoluteUrl('/');
  const place = {
    '@type': 'MusicSchool' as const,
    name: business.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.line1,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
  };
  return {
    '@context': 'https://schema.org',
    ...place,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    knowsAbout: instruments.map(i => i.name),
    openingHoursSpecification: business.hours.filter(h => h.opens && h.closes).map(h => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${SCHEMA_DAYS[h.day]}`, opens: h.opens, closes: h.closes,
    })),
    event: upcomingConcerts().map(concert => ({
      '@type': 'MusicEvent',
      name: `${concert.title}, ${business.name}`,
      startDate: `${concert.date}T${concert.startTime}:00${zoneOffset(concert.date, concert.startTime, timeZone)}`,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      isAccessibleForFree: true,
      description: `${concert.performers}. ${concert.entry}.`,
      location: { ...place, name: `${concert.venue}, ${formattedAddress()}` },
      organizer: { '@type': 'MusicSchool', name: business.name },
    })),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
