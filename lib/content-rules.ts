// Content validation. Each problem names the item and field to fix. The build runs assertContent()
// (app/layout.tsx) and tests/content.test.ts checks the same rules, so a bad edit fails loudly.
import { business } from '../content/business.ts';
import { concerts as allConcerts, type Concert } from '../content/concerts.ts';
import { groupClasses as allGroups, lessonLengths as allLengths, policies as allPolicies,
  type GroupClass, type LessonLength, type Policy } from '../content/fees.ts';
import { families, instruments as allInstruments, type Instrument } from '../content/instruments.ts';
import { teachers as allTeachers, teachingWeek, type Teacher } from '../content/teachers.ts';
import { validateHours } from './hours.ts';

export interface ContentSet {
  instruments: readonly Instrument[];
  teachers: readonly Teacher[];
  lessonLengths: readonly LessonLength[];
  groupClasses: readonly GroupClass[];
  policies: readonly Policy[];
  concerts: readonly Concert[];
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CLOCK = /^([01]\d|2[0-3]):[0-5]\d$/;
const DAY_NAMES: Record<string, string> = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday' };
const toMinutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

function ids<T extends { id: string }>(label: string, list: readonly T[], problems: string[], slug = true) {
  const seen = new Set<string>();
  for (const item of list) {
    if (slug && !SLUG.test(item.id)) problems.push(`${label} "${item.id}": id must be lowercase letters, numbers and hyphens`);
    if (seen.has(item.id)) problems.push(`${label} "${item.id}": id is used more than once`);
    seen.add(item.id);
  }
  return seen;
}

function text(label: string, value: string, problems: string[]) {
  if (!value || !value.trim()) problems.push(`${label}: required`);
}

function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function contentProblems(set: ContentSet = {
  instruments: allInstruments, teachers: allTeachers, lessonLengths: allLengths,
  groupClasses: allGroups, policies: allPolicies, concerts: allConcerts,
}): string[] {
  const problems: string[] = [];
  const lengthIds = ids('lessonLengths', set.lessonLengths, problems, false);
  const instrumentIds = ids('instrument', set.instruments, problems);
  const teacherIds = ids('teacher', set.teachers, problems);
  ids('groupClass', set.groupClasses, problems);
  ids('policy', set.policies, problems);
  ids('concert', set.concerts, problems);

  // Lesson lengths and fees
  let previous: LessonLength | undefined;
  for (const length of [...set.lessonLengths].sort((a, b) => a.minutes - b.minutes)) {
    const label = `lessonLengths "${length.id}"`;
    if (!Number.isInteger(length.minutes) || length.minutes <= 0) problems.push(`${label}: minutes must be a positive whole number`);
    if (!Number.isInteger(length.termFee) || length.termFee <= 0) problems.push(`${label}: termFee must be a positive whole number of dollars`);
    if (previous && length.termFee <= previous.termFee) problems.push(`${label}: termFee must be more than the ${previous.minutes}-minute fee`);
    text(`${label}.suitedTo`, length.suitedTo, problems);
    previous = length;
  }

  // Instruments
  const positions = new Map<number, string>();
  const familyIds = new Set(families.map(f => f.id));
  for (const item of set.instruments) {
    const label = `instrument "${item.id}"`;
    text(`${label}.name`, item.name, problems);
    text(`${label}.blurb`, item.blurb, problems);
    if (!familyIds.has(item.family)) problems.push(`${label}: unknown family "${item.family}"`);
    if (!Number.isInteger(item.minAge) || item.minAge < 4 || item.minAge > 18) problems.push(`${label}: minAge must be a whole number from 4 to 18`);
    if (!item.lessonLengths.length) problems.push(`${label}: offer at least one lesson length`);
    for (const id of item.lessonLengths) if (!lengthIds.has(id)) problems.push(`${label}: lesson length "${id}" does not exist in content/fees.ts`);
    if (!item.teacherIds.length) problems.push(`${label}: needs at least one teacher`);
    for (const id of item.teacherIds) if (!teacherIds.has(id)) problems.push(`${label}: teacher "${id}" does not exist in content/teachers.ts`);
    if (!Number.isInteger(item.staffPosition) || item.staffPosition < 0 || item.staffPosition > 8) {
      problems.push(`${label}: staffPosition must be a whole number from 0 to 8`);
    } else if (positions.has(item.staffPosition)) {
      problems.push(`${label}: staffPosition ${item.staffPosition} is already used by "${positions.get(item.staffPosition)}"`);
    } else positions.set(item.staffPosition, item.id);
  }

  // Teachers
  for (const teacher of set.teachers) {
    const label = `teacher "${teacher.id}"`;
    for (const key of ['name', 'role', 'bio', 'qualifications', 'favouritePiece'] as const) text(`${label}.${key}`, teacher[key], problems);
    if (!teacher.instrumentIds.length) problems.push(`${label}: list at least one instrument`);
    for (const id of teacher.instrumentIds) if (!instrumentIds.has(id)) problems.push(`${label}: instrument "${id}" does not exist in content/instruments.ts`);
    if (!teacher.teachingDays.length) problems.push(`${label}: list at least one teaching day`);
    for (const day of teacher.teachingDays) if (!teachingWeek.includes(day)) problems.push(`${label}: unknown teaching day "${day}"`);
  }
  const featured = set.teachers.filter(t => t.featured).length;
  if (featured !== 3) problems.push(`teachers: exactly three must be featured on Home (found ${featured})`);
  for (const item of set.instruments) {
    for (const teacherId of item.teacherIds) {
      const teacher = set.teachers.find(t => t.id === teacherId);
      if (teacher && !teacher.instrumentIds.includes(item.id)) problems.push(`teacher "${teacherId}": add "${item.id}" to instrumentIds (instrument "${item.id}" lists this teacher)`);
    }
  }

  // Group classes
  for (const group of set.groupClasses) {
    const label = `groupClass "${group.id}"`;
    text(`${label}.name`, group.name, problems);
    text(`${label}.ages`, group.ages, problems);
    if (!Number.isInteger(group.places) || group.places < 0) problems.push(`${label}: places must be a whole number, 0 or more`);
    if (!Number.isInteger(group.termFee) || group.termFee <= 0) problems.push(`${label}: termFee must be a positive whole number of dollars`);
    if (!Number.isInteger(group.minutes) || group.minutes <= 0) problems.push(`${label}: minutes must be a positive whole number`);
    if (!CLOCK.test(group.time)) { problems.push(`${label}: time must be HH:MM`); continue; }
    const hours = business.hours.find(h => h.day === group.day);
    const start = toMinutes(group.time);
    if (!hours?.opens || !hours.closes || start < toMinutes(hours.opens) || start + group.minutes > toMinutes(hours.closes)) {
      problems.push(`${label}: ${group.day} ${group.time} for ${group.minutes} minutes is outside the hours in content/business.ts`);
    }
  }

  // Policies
  for (const policy of set.policies) {
    text(`policy "${policy.id}".title`, policy.title, problems);
    text(`policy "${policy.id}".text`, policy.text, problems);
  }

  // Concerts
  for (const concert of set.concerts) {
    const label = `concert "${concert.id}"`;
    text(`${label}.title`, concert.title, problems);
    text(`${label}.venue`, concert.venue, problems);
    if (!validDate(concert.date)) problems.push(`${label}: date must be a real YYYY-MM-DD date`);
    if (!CLOCK.test(concert.startTime)) problems.push(`${label}: startTime must be HH:MM`);
    if (!Number.isInteger(concert.durationMinutes) || concert.durationMinutes <= 0) problems.push(`${label}: durationMinutes must be a positive whole number`);
    if (concert.status !== 'upcoming' && concert.status !== 'past') problems.push(`${label}: status must be "upcoming" or "past"`);
    if (!concert.programme.length) problems.push(`${label}: add at least one programme line`);
  }

  // Hours
  try { validateHours(business.hours); } catch (error) { problems.push(`business.${(error as Error).message}`); }
  return problems;
}

export function assertContent(set?: ContentSet): void {
  const problems = contentProblems(set);
  if (problems.length) throw new Error(`Content needs fixing:\n- ${problems.join('\n- ')}`);
}

export { DAY_NAMES };
