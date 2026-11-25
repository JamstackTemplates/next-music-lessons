import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { concerts, nextConcert, pastConcerts, upcomingConcerts } from '../content/concerts.ts';
import { groupClasses, lessonLengths, policies } from '../content/fees.ts';
import { instruments } from '../content/instruments.ts';
import { teachers } from '../content/teachers.ts';
import { contentProblems, type ContentSet } from '../lib/content-rules.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const base: ContentSet = { instruments, teachers, lessonLengths, groupClasses, policies, concerts };
const withChange = (change: Partial<ContentSet>) => contentProblems({ ...base, ...change });
const problemsMatch = (problems: string[], pattern: RegExp) => assert.ok(problems.some(p => pattern.test(p)), `expected ${pattern} in:\n${problems.join('\n')}`);

test('business content has actionable required fields', () => {
  for (const key of ['name', 'wordmark', 'introduction', 'email'] as const) assert.ok(business[key].trim(), `business.${key}: required`);
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
});

test('all collections pass the content rules', () => {
  assert.deepEqual(contentProblems(), []);
});

test('duplicate or unsafe IDs name the item', () => {
  problemsMatch(withChange({ instruments: [...instruments, { ...instruments[0] }] }), /instrument "piano": id is used more than once/);
  problemsMatch(withChange({ teachers: teachers.map(t => t.id === 'ana-sousa' ? { ...t, id: 'Ana Sousa' } : t) }), /teacher "Ana Sousa": id must be/);
});

test('references between instruments, teachers and lesson lengths must resolve', () => {
  problemsMatch(withChange({ instruments: instruments.map(i => i.id === 'cello' ? { ...i, teacherIds: ['nobody'] } : i) }), /instrument "cello": teacher "nobody" does not exist/);
  problemsMatch(withChange({ instruments: instruments.map(i => i.id === 'flute' ? { ...i, lessonLengths: ['90' as never] } : i) }), /instrument "flute": lesson length "90"/);
  problemsMatch(withChange({ teachers: teachers.map(t => t.id === 'jake-moreno' ? { ...t, instrumentIds: ['bagpipes'] } : t) }), /teacher "jake-moreno": instrument "bagpipes"/);
  problemsMatch(withChange({ instruments: instruments.map(i => i.id === 'voice' ? { ...i, teacherIds: [] } : i) }), /instrument "voice": needs at least one teacher/);
});

test('ages, staff positions and featured teachers stay in range', () => {
  problemsMatch(withChange({ instruments: instruments.map(i => i.id === 'piano' ? { ...i, minAge: 3 } : i) }), /instrument "piano": minAge/);
  problemsMatch(withChange({ instruments: instruments.map(i => i.id === 'violin' ? { ...i, staffPosition: 2 } : i) }), /staffPosition 2 is already used by "piano"/);
  problemsMatch(withChange({ instruments: instruments.map(i => i.id === 'violin' ? { ...i, staffPosition: 9 } : i) }), /instrument "violin": staffPosition must be/);
  problemsMatch(withChange({ teachers: teachers.map(t => ({ ...t, featured: true })) }), /exactly three must be featured on Home \(found 6\)/);
});

test('fees are positive whole dollars that rise with lesson length; places are whole numbers', () => {
  problemsMatch(withChange({ lessonLengths: lessonLengths.map(l => l.id === '60' ? { ...l, termFee: 500 } : l) }), /lessonLengths "60": termFee must be more than the 45-minute fee/);
  problemsMatch(withChange({ lessonLengths: lessonLengths.map(l => l.id === '30' ? { ...l, termFee: 420.5 } : l) }), /lessonLengths "30": termFee must be a positive whole/);
  problemsMatch(withChange({ groupClasses: groupClasses.map(g => g.id === 'ukulele-club' ? { ...g, places: -1 } : g) }), /groupClass "ukulele-club": places/);
  problemsMatch(withChange({ groupClasses: groupClasses.map(g => g.id === 'adult-choir' ? { ...g, time: '19:30' } : g) }), /groupClass "adult-choir": Thursday 19:30 for 60 minutes is outside the hours/);
});

test('concert dates are real and upcoming concerts sort soonest first', () => {
  problemsMatch(withChange({ concerts: concerts.map(c => c.id === 'autumn-recital-2027' ? { ...c, date: '2027-02-30' } : c) }), /concert "autumn-recital-2027": date must be a real/);
  assert.deepEqual(upcomingConcerts().map(c => c.id), ['summer-showcase-2026', 'carols-in-the-foyer-2026', 'autumn-recital-2027']);
  assert.deepEqual(pastConcerts().map(c => c.id), ['spring-strings-2026', 'winter-band-night-2026']);
  assert.equal(nextConcert()?.id, 'summer-showcase-2026');
  // Home picks the earliest upcoming concert regardless of list order.
  assert.equal(nextConcert([...concerts].reverse())?.id, 'summer-showcase-2026');
  assert.equal(nextConcert(concerts.map(c => ({ ...c, status: 'past' as const }))), undefined);
});

test('structured data is a MusicSchool with hours and upcoming concerts only, in local time', () => {
  const data = businessStructuredData('Australia/Melbourne');
  assert.equal(data['@type'], 'MusicSchool');
  assert.equal(data.email, business.email);
  assert.equal(data.openingHoursSpecification.length, 6);
  assert.deepEqual(data.event.map(e => e.startDate), ['2026-12-12T14:00:00+11:00', '2026-12-17T17:30:00+11:00', '2027-03-27T14:00:00+11:00']);
  assert.ok(data.event.every(e => e['@type'] === 'MusicEvent'));
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('copy never implies a lesson, place or payment is settled', () => {
  const root = new URL('../', import.meta.url).pathname;
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(tsx?|mjs)$/.test(name)) files.push(path);
    }
  };
  for (const dir of ['app', 'components', 'content']) walk(join(root, dir));
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    assert.doesNotMatch(text, /\b(booked|confirmed|reserved|pay now|book now)\b/i, `${file}: describe requests as enquiries`);
  }
  assert.match(business.enquiries.reply, /reply within two school days to suggest a teacher and a time/);
});
