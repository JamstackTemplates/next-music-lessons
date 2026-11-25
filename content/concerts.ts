// Student concerts. Add new ones as `upcoming`; when a concert has happened, change it to `past`.
// The site never works out "upcoming" from today's date, so the status you set is what visitors see.

export interface Concert {
  /** Stable, URL-safe and unique. */
  id: string;
  title: string;
  /** Local date, YYYY-MM-DD, in the site.config.json time zone. */
  date: string;
  /** Local start time, HH:MM. */
  startTime: string;
  durationMinutes: number;
  venue: string;
  /** Who is playing. */
  performers: string;
  /** Entry wording, e.g. free for families. */
  entry: string;
  status: 'upcoming' | 'past';
  /** Short running-order lines. */
  programme: string[];
}

export const concerts: Concert[] = [
  {
    id: 'summer-showcase-2026', title: 'Summer Showcase', date: '2026-12-12', startTime: '14:00', durationMinutes: 90,
    venue: 'Recital room, Treble Clef', performers: 'Thirty-two students, from first-term pianists to Grade 7 cellists',
    entry: 'Free for families and friends', status: 'upcoming',
    programme: ['Little Crotchets: The Grand Old Duke of York', 'Piano trio: Ode to Joy', 'Rock Band Lab: Dancing Queen'],
  },
  {
    id: 'carols-in-the-foyer-2026', title: 'Carols in the Foyer', date: '2026-12-17', startTime: '17:30', durationMinutes: 45,
    venue: 'Studio foyer', performers: 'Southbank Adult Choir with ukulele and string players',
    entry: 'Free, all welcome', status: 'upcoming',
    programme: ['Choir: Silent Night', 'Ukulele Club: Jingle Bells', 'Everyone: Deck the Halls'],
  },
  {
    id: 'autumn-recital-2027', title: 'Autumn Recital', date: '2027-03-27', startTime: '14:00', durationMinutes: 90,
    venue: 'Recital room, Treble Clef', performers: 'Term 1 soloists and the string ensemble',
    entry: 'Free for families and friends', status: 'upcoming',
    programme: ['String ensemble: Pachelbel’s Canon', 'Flute solo: Fauré, Sicilienne', 'Voice: On My Own'],
  },
  {
    id: 'spring-strings-2026', title: 'Spring Strings Afternoon', date: '2026-09-12', startTime: '15:00', durationMinutes: 60,
    venue: 'Recital room, Treble Clef', performers: 'Violin and cello students',
    entry: 'Free for families and friends', status: 'past',
    programme: ['Twinkle variations for eleven violins', 'Cello duet: The Swan'],
  },
  {
    id: 'winter-band-night-2026', title: 'Winter Band Night', date: '2026-06-20', startTime: '18:00', durationMinutes: 75,
    venue: 'Studio foyer', performers: 'Rock Band Lab, drums and guitar students',
    entry: 'Free for families and friends', status: 'past',
    programme: ['Rock Band Lab: Seven Nation Army', 'Drum circle finale'],
  },
];

/** Upcoming concerts, soonest first. */
export function upcomingConcerts(list: readonly Concert[] = concerts): Concert[] {
  return list.filter(c => c.status === 'upcoming').sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime));
}

/** Past concerts, most recent first. */
export function pastConcerts(list: readonly Concert[] = concerts): Concert[] {
  return list.filter(c => c.status === 'past').sort((a, b) => (b.date + b.startTime).localeCompare(a.date + a.startTime));
}

/** The concert shown on Home as "Next on stage", or undefined when none is upcoming. */
export function nextConcert(list: readonly Concert[] = concerts): Concert | undefined {
  return upcomingConcerts(list)[0];
}
