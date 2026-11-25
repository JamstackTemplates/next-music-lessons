// Teachers, shown as programme portraits on Home (featured) and Teachers (everyone).

export type TeachingDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
export const teachingWeek: TeachingDay[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Palette token used for the silhouette and frame. */
export type SignatureColour = 'primary' | 'teal' | 'plum' | 'gold';

/** Hair shape for the drawn cameo silhouette. */
export type Hairstyle = 'bun' | 'short' | 'long' | 'curls' | 'crop' | 'wave';

export interface Teacher {
  /** Stable, URL-safe and unique. Used as the /teachers/#id anchor. */
  id: string;
  name: string;
  role: string;
  /** IDs from content/instruments.ts. */
  instrumentIds: string[];
  bio: string;
  qualifications: string;
  teachingDays: TeachingDay[];
  /** False shows a "Waitlist only" sticker. Change this when a teacher's timetable fills or opens up. */
  acceptingStudents: boolean;
  /** Exactly three teachers are featured on Home. */
  featured: boolean;
  signatureColour: SignatureColour;
  hairstyle: Hairstyle;
  favouritePiece: string;
}

export const teachers: Teacher[] = [
  {
    id: 'margot-ellis', name: 'Margot Ellis', role: 'Founder and head of piano', instrumentIds: ['piano'],
    bio: 'Margot opened Treble Clef in 2009 with one piano and a waiting list of nine. She still teaches four days a week and still keeps a jar of gold stars on the piano lid.',
    qualifications: 'BMus, Melbourne Conservatorium; AMEB examiner',
    teachingDays: ['Mon', 'Tue', 'Thu', 'Sat'], acceptingStudents: true, featured: true,
    signatureColour: 'primary', hairstyle: 'bun', favouritePiece: 'Satie, Gymnopédie No. 1',
  },
  {
    id: 'daniel-okafor', name: 'Daniel Okafor', role: 'Strings lead', instrumentIds: ['violin', 'cello'],
    bio: 'Daniel plays cello with a chamber orchestra on weekends and runs our string ensemble. He teaches posture with a lot of jokes and very few rules.',
    qualifications: 'BMus (Performance), ANAM fellow; Suzuki-trained',
    teachingDays: ['Mon', 'Wed', 'Sat'], acceptingStudents: true, featured: true,
    signatureColour: 'teal', hairstyle: 'crop', favouritePiece: 'Saint-Saëns, The Swan',
  },
  {
    id: 'priya-raman', name: 'Priya Raman', role: 'Voice and choir director', instrumentIds: ['voice'],
    bio: 'Priya has sung in musical theatre tours and with chamber choirs, and directs the Southbank Adult Choir. Her timetable is full this term.',
    qualifications: 'BFA (Music Theatre), WAAPA; CCM vocal pedagogy',
    teachingDays: ['Tue', 'Thu'], acceptingStudents: false, featured: true,
    signatureColour: 'plum', hairstyle: 'long', favouritePiece: 'Sondheim, Send in the Clowns',
  },
  {
    id: 'tom-whitlock', name: 'Tom Whitlock', role: 'Guitar and ukulele', instrumentIds: ['guitar', 'ukulele'],
    bio: 'Tom gigs around Melbourne as a session guitarist and runs Ukulele Club. Every student learns a song they chose in their first month.',
    qualifications: 'BMus (Contemporary), Box Hill Institute',
    teachingDays: ['Wed', 'Fri', 'Sat'], acceptingStudents: true, featured: false,
    signatureColour: 'gold', hairstyle: 'wave', favouritePiece: 'Tárrega, Lágrima',
  },
  {
    id: 'ana-sousa', name: 'Ana Sousa', role: 'Woodwind', instrumentIds: ['flute', 'clarinet'],
    bio: 'Ana grew up in Lisbon playing in a town band and came to Melbourne to study. She is patient with squeaks and strict about long notes.',
    qualifications: 'MMus, University of Melbourne; AMusA (flute)',
    teachingDays: ['Mon', 'Thu'], acceptingStudents: true, featured: false,
    signatureColour: 'teal', hairstyle: 'curls', favouritePiece: 'Fauré, Sicilienne',
  },
  {
    id: 'jake-moreno', name: 'Jake Moreno', role: 'Drums and Rock Band Lab', instrumentIds: ['drums'],
    bio: 'Jake drums in two cover bands and coaches Rock Band Lab. He believes in metronomes, earplugs and playing loud when it’s earned.',
    qualifications: 'Dip. Music Performance, JMC Academy',
    teachingDays: ['Wed', 'Fri', 'Sat'], acceptingStudents: true, featured: false,
    signatureColour: 'primary', hairstyle: 'short', favouritePiece: 'Dave Brubeck, Take Five',
  },
];
