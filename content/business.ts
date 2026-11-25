// Treble Clef Music School: a fictitious sample business for the Jamstacks gallery.
// Shared contact details, hours and enquiry guidance. Page copy lives in app/**/page.tsx.
import type { OpeningHours } from '../lib/hours.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Large first line of the wordmark. */
  wordmark: string;
  /** Second line of the wordmark. */
  wordmarkLine: string;
  /** Plain-text introduction used for fallback metadata and structured data. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public phone number as displayed; blank hides it. */
  phone: string;
  /** Postal address used for display, maps and schema.org. */
  address: {
    /** First display line, e.g. the studio and landmark. */
    line1: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  /** Google Maps search text. A public landmark keeps the sample fictitious. */
  mapQuery: string;
  /** Short how-to-get-here notes, shown in order. */
  directions: string[];
  /**
   * Front-desk and lesson hours, one record per weekday, in the site.config.json time zone.
   * Same-day intervals only: opens is inclusive, closes exclusive. Omit both times for a closed day.
   */
  hours: OpeningHours[];
  /** One sentence about terms and holidays, shown beside the hours. */
  termNote: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** No booking, payment or delivery promises. */
    introduction: string;
    /** Suggestions for the message text, not additional form inputs. */
    usefulToInclude: string[];
    /** What happens after a message arrives. */
    reply: string;
  };
}

export const business: Business = {
  name: 'Treble Clef Music School',
  wordmark: 'Treble Clef',
  wordmarkLine: 'Music School, Southbank',
  introduction:
    'Playful one-to-one music lessons in Southbank, Melbourne: piano, strings, guitar, drums, woodwind and voice for ages 5 to adult, with termly student concerts.',
  email: 'hello@next-music-lessons.jamstacks.net',
  phone: '(03) 7010 4632',
  address: {
    line1: 'Studio 2, opposite the Melbourne Recital Centre',
    addressLocality: 'Southbank',
    addressRegion: 'VIC',
    postalCode: '3006',
    addressCountry: 'AU',
  },
  mapQuery: 'Melbourne Recital Centre, Southbank VIC',
  directions: [
    'Five minutes’ walk from the Arts Centre tram stop (routes 1, 3, 5, 6, 16, 64, 67 and 72).',
    'Bike racks on Sturt Street, right outside the door.',
  ],
  hours: [
    { day: 'Monday', opens: '14:30', closes: '20:00' },
    { day: 'Tuesday', opens: '14:30', closes: '20:00' },
    { day: 'Wednesday', opens: '14:30', closes: '20:00' },
    { day: 'Thursday', opens: '14:30', closes: '20:00' },
    { day: 'Friday', opens: '14:30', closes: '18:00' },
    { day: 'Saturday', opens: '08:30', closes: '16:00' },
    { day: 'Sunday' },
  ],
  termNote:
    'Lessons run in four 10-week terms that follow the Victorian school calendar. We close on public holidays and during school holidays, except for holiday workshops.',
  enquiries: {
    introduction:
      'Ask about a trial lesson, a waitlist or group-class place, changing teacher or lesson length, or anything about our concerts.',
    usefulToInclude: [
      'The student’s name and age',
      'Which instrument (or two you can’t choose between)',
      'Any previous experience or grade',
      'Preferred days and times',
      'Preferred lesson length: 30, 45 or 60 minutes',
      'Whether you’d like to hire an instrument',
    ],
    reply: 'We’ll reply within two school days to suggest a teacher and a time. Nothing is set until we’ve agreed it with you.',
  },
};

/** Single-line address for display and structured data. */
export function formattedAddress(): string {
  const a = business.address;
  return `${a.line1}, ${a.addressLocality} ${a.addressRegion} ${a.postalCode}`;
}
