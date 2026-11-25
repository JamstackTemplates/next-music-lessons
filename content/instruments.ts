// Instruments taught one-to-one. Shown on The Staff (Home and Lessons) and as tutor-book pages on Lessons.
import type { LessonLengthId } from './fees.ts';

export type Family = 'keys' | 'strings' | 'woodwind' | 'percussion' | 'voice';

/** Filter labels on Lessons, in display order. */
export const families: { id: Family; label: string }[] = [
  { id: 'keys', label: 'Keys' },
  { id: 'strings', label: 'Strings' },
  { id: 'woodwind', label: 'Woodwind' },
  { id: 'percussion', label: 'Percussion' },
  { id: 'voice', label: 'Voice' },
];

export interface Instrument {
  /** Stable, URL-safe and unique. Used as the /lessons/#id anchor and to pick the drawn glyph. */
  id: string;
  name: string;
  family: Family;
  /** Youngest starting age in whole years, 4–18. */
  minAge: number;
  /** One-to-one lesson lengths offered; IDs from content/fees.ts lessonLengths. */
  lessonLengths: LessonLengthId[];
  /** Teachers who teach it; IDs from content/teachers.ts. */
  teacherIds: string[];
  /** One or two sentences for the tutor-book page. */
  blurb: string;
  /** True when the school hires this instrument out per term. */
  hireAvailable: boolean;
  /**
   * Where its note sits on The Staff: 0 is the bottom line, 1 the space above it, up to 8 for the
   * top line. Each instrument needs its own position.
   */
  staffPosition: number;
}

export const instruments: Instrument[] = [
  {
    id: 'piano', name: 'Piano', family: 'keys', minAge: 5, lessonLengths: ['30', '45', '60'],
    teacherIds: ['margot-ellis'], hireAvailable: false, staffPosition: 2,
    blurb: 'From first finger numbers to AMEB grades and jazz chords. Every pianist plays our grand in the recital room at least once a term.',
  },
  {
    id: 'violin', name: 'Violin', family: 'strings', minAge: 5, lessonLengths: ['30', '45', '60'],
    teacherIds: ['daniel-okafor'], hireAvailable: true, staffPosition: 5,
    blurb: 'Start on a quarter- or half-size violin and size up as you grow. Bowing games first, scales second, string orchestra by year two.',
  },
  {
    id: 'cello', name: 'Cello', family: 'strings', minAge: 7, lessonLengths: ['30', '45', '60'],
    teacherIds: ['daniel-okafor'], hireAvailable: true, staffPosition: 1,
    blurb: 'A warm, big-hearted instrument for patient beginners. Students learn seated on a cello sized to fit them.',
  },
  {
    id: 'guitar', name: 'Guitar', family: 'strings', minAge: 7, lessonLengths: ['30', '45', '60'],
    teacherIds: ['tom-whitlock'], hireAvailable: true, staffPosition: 3,
    blurb: 'Classical and acoustic technique, chords for strumming along, and tab and notation read side by side.',
  },
  {
    id: 'ukulele', name: 'Ukulele', family: 'strings', minAge: 5, lessonLengths: ['30', '45'],
    teacherIds: ['tom-whitlock'], hireAvailable: true, staffPosition: 6,
    blurb: 'Four strings and three chords to your first song. The quickest way we know to make real music in lesson one.',
  },
  {
    id: 'flute', name: 'Flute', family: 'woodwind', minAge: 8, lessonLengths: ['30', '45', '60'],
    teacherIds: ['ana-sousa'], hireAvailable: true, staffPosition: 7,
    blurb: 'Breath, tone and fingerings, starting on a curved-head flute that suits smaller arms.',
  },
  {
    id: 'clarinet', name: 'Clarinet', family: 'woodwind', minAge: 9, lessonLengths: ['30', '45', '60'],
    teacherIds: ['ana-sousa'], hireAvailable: true, staffPosition: 4,
    blurb: 'Woodwind’s chameleon: orchestral, jazz and klezmer. Hire instruments keep the first terms affordable.',
  },
  {
    id: 'drums', name: 'Drum kit', family: 'percussion', minAge: 7, lessonLengths: ['30', '45', '60'],
    teacherIds: ['jake-moreno'], hireAvailable: false, staffPosition: 0,
    blurb: 'Rudiments on a practice pad, grooves on our acoustic kit, and drum notation from week one. Earplugs supplied.',
  },
  {
    id: 'voice', name: 'Voice', family: 'voice', minAge: 8, lessonLengths: ['30', '45', '60'],
    teacherIds: ['priya-raman'], hireAvailable: false, staffPosition: 8,
    blurb: 'Healthy technique for musical theatre, pop and classical singing, with breathing, pitch and stage confidence.',
  },
];
