// Smaller stage pieces: the curtain swag, the ticket lyre, the 404 "wrong note" and the term-step measure numbers.
import { StaffLines, TrebleClefGlyph } from './notation';

/** Theatre curtain valance with gold fringe, for the Concerts page head. */
export function CurtainSwag({ className = '' }: { className?: string }) {
  const swags = Array.from({ length: 8 }, (_, i) => i * 150);
  return <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={className} aria-hidden="true">
    <rect x="0" y="0" width="1200" height="26" fill="var(--primary)" />
    {swags.map(x => <g key={x}>
      <path d={`M${x} 20 C${x + 30} 96 ${x + 120} 96 ${x + 150} 20Z`} fill="var(--primary)" />
      <path d={`M${x + 20} 36 C${x + 50} 76 ${x + 100} 76 ${x + 130} 36`} fill="none" stroke="rgba(0,0,0,.22)" strokeWidth="4" />
      <path d={`M${x} 20 C${x + 30} 96 ${x + 120} 96 ${x + 150} 20`} fill="none" stroke="var(--gold)" strokeWidth="5" />
      <path d={`M${x + 75} 78 v18`} stroke="var(--gold)" strokeWidth="4" />
      <circle cx={x + 75} cy="100" r="6" fill="var(--gold)" />
    </g>)}
    <rect x="0" y="0" width="1200" height="6" fill="rgba(0,0,0,.25)" />
  </svg>;
}

/** Lyre ornament for ticket stubs and programme covers. */
export function Lyre({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 40 48" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M8 6 C2 16 6 30 14 36 H26 C34 30 38 16 32 6" />
    <path d="M8 6 c-3 -3 1 -6 4 -3 M32 6 c3 -3 -1 -6 -4 -3" />
    <path d="M12 10 H28" />
    {[16, 20, 24].map(x => <path key={x} d={`M${x} 10 V36`} strokeWidth="1.2" />)}
    <path d="M12 42 H28 M20 36 V42" />
  </svg>;
}

/** 404: a quaver that has fallen off the staff, with an eraser and crumbs. */
export function WrongNote({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 640 300" className={className} aria-hidden="true">
    <StaffLines x1={20} x2={620} top={70} gap={20} color="var(--ink)" width={2} opacity={0.7} />
    <line x1="618" x2="618" y1="70" y2="150" stroke="var(--ink)" strokeWidth="3" />
    <TrebleClefGlyph x={18} y={-14} scale={1.65} width={4} />
    {[[190, 130], [250, 110], [310, 120]].map(([x, y]) => <g key={x} fill="var(--ink)">
      <ellipse cx={x} cy={y} rx="12" ry="8.6" transform={`rotate(-22 ${x} ${y})`} />
      <rect x={x + 9.6} y={y - 62} width="3" height="62" />
    </g>)}
    {/* The gap where the note used to be */}
    <ellipse cx="380" cy="100" rx="13" ry="9.6" transform="rotate(-22 380 100)" fill="none" stroke="var(--pencil)" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M392 108 C420 150 430 190 446 226" fill="none" stroke="var(--pencil)" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
    {/* Fallen quaver */}
    <g transform="translate(470 246) rotate(78)" fill="var(--primary)">
      <ellipse cx="0" cy="0" rx="13" ry="9.6" transform="rotate(-22)" />
      <rect x="10.4" y="-64" width="3.2" height="64" />
      <path d="M13.6 -64 c8 10 20 16 11 36 c3 -14 -5 -20 -11 -22z" />
    </g>
    <g stroke="var(--pencil)" strokeWidth="2.4" strokeLinecap="round"><path d="M430 262 l-12 -4 M436 274 l-14 2 M446 284 l-8 8" /></g>
    {/* Eraser and crumbs */}
    <g transform="translate(548 176) rotate(-18)">
      <rect x="0" y="0" width="74" height="30" rx="5" fill="var(--plum)" stroke="var(--ink)" strokeWidth="2.4" />
      <rect x="40" y="-2" width="36" height="34" rx="3" fill="var(--teal)" stroke="var(--ink)" strokeWidth="2.4" />
    </g>
    {[[500, 276], [512, 286], [492, 290], [522, 292], [480, 282]].map(([x, y], i) =>
      <rect key={x} x={x} y={y} width="6" height="4" rx="1.5" fill="var(--plum)" opacity=".7" transform={`rotate(${i * 30} ${x} ${y})`} />)}
  </svg>;
}
