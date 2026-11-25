// Term fees. All prices are whole Australian dollars per 10-week term, GST-free (education).
// The website takes no payments: fees are invoiced once the school has agreed a place with the family.

export const currency = 'AUD';
export const weeksPerTerm = 10;

export type LessonLengthId = '30' | '45' | '60';

export interface LessonLength {
  /** Stable ID; instruments reference it. */
  id: LessonLengthId;
  minutes: number;
  /** Whole AUD per 10-week term. Longer lessons must cost more. */
  termFee: number;
  /** Who this length usually suits. */
  suitedTo: string;
}

export const lessonLengths: LessonLength[] = [
  { id: '30', minutes: 30, termFee: 420, suitedTo: 'Beginners and under-9s' },
  { id: '45', minutes: 45, termFee: 610, suitedTo: 'Developing players, Grades 1–4' },
  { id: '60', minutes: 60, termFee: 790, suitedTo: 'Grade 5 and up, exam and audition preparation' },
];

export interface GroupClass {
  /** Stable, URL-safe and unique. */
  id: string;
  name: string;
  /** Age range as displayed, e.g. "7–11" or "18+". */
  ages: string;
  minutes: number;
  /** Whole AUD per 10-week term. */
  termFee: number;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  /** Local start time, HH:MM, inside that day's hours in content/business.ts. */
  time: string;
  /** Places left this term (whole number). 0 shows a "Waitlist" sticker. */
  places: number;
  description: string;
}

export const groupClasses: GroupClass[] = [
  {
    id: 'little-crotchets', name: 'Little Crotchets', ages: '4–6', minutes: 40, termFee: 220,
    day: 'Saturday', time: '09:00', places: 3,
    description: 'Music and movement with shakers, chime bars and a lot of marching. A gentle first step before one-to-one lessons.',
  },
  {
    id: 'ukulele-club', name: 'Ukulele Club', ages: '7–11', minutes: 45, termFee: 240,
    day: 'Wednesday', time: '16:00', places: 0,
    description: 'Strum-along songs in a circle of ten. Ukuleles supplied for the term.',
  },
  {
    id: 'rock-band-lab', name: 'Rock Band Lab', ages: '11–16', minutes: 60, termFee: 310,
    day: 'Friday', time: '16:30', places: 2,
    description: 'Guitar, bass, keys, drums and vocals rehearse one song a fortnight and play it at the next concert.',
  },
  {
    id: 'adult-choir', name: 'Southbank Adult Choir', ages: '18+', minutes: 60, termFee: 180,
    day: 'Thursday', time: '18:45', places: 8,
    description: 'No audition and no reading required. Harmonies, warm-ups and tea after.',
  },
];

export interface Policy {
  id: string;
  title: string;
  text: string;
}

/** Shown on Lessons under "What’s included". */
export const policies: Policy[] = [
  { id: 'trial', title: 'Trial lesson, $35', text: 'A 30-minute trial with the teacher we suggest. If you join, the $35 comes off your first term.' },
  { id: 'siblings', title: 'Sibling discount, 10%', text: 'For the second and every further student in the same family, on one-to-one lessons.' },
  { id: 'hire', title: 'Instrument hire, $60 a term', text: 'Strings, guitar, ukulele and woodwind, sized to the student and swapped as they grow.' },
  { id: 'make-up', title: 'One make-up lesson a term', text: 'Give us 24 hours’ notice and we’ll find another slot that week or the next.' },
];

export const trialFee = 35;

export function formatFee(amount: number): string {
  return `$${amount.toLocaleString('en-AU')}`;
}
