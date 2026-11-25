// Engraved music notation used as layout and decoration. All inline SVG, coloured by palette tokens.
import type { SVGProps } from 'react';

/** Stylised treble clef drawn for a staff whose lines sit at y = 50, 62, 74, 86, 98 (G line = 86). */
export const CLEF_PATH =
  'M47 88 C38 90 34 80 41 75 C50 70 60 79 56 90 C52 101 36 103 29 95 C21 85 27 72 38 63 C50 53 58 44 58 31 C58 21 53 15 49 17 C42 21 41 37 44 52 L52 107 C54 118 48 124 41 121 C36 119 35 112 40 110';

export function TrebleClefGlyph({ x = 0, y = 0, scale = 1, color = 'var(--primary)', width = 4.2 }: {
  x?: number; y?: number; scale?: number; color?: string; width?: number;
}) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
    <path d={CLEF_PATH} strokeWidth={width} />
    <circle cx="41" cy="113" r="4.6" fill={color} stroke="none" />
  </g>;
}

/** Wordmark clef: a small treble clef on a cream disc with one staff line. */
export function ClefMark({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <circle cx="32" cy="32" r="30" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
    {[20, 27, 34, 41, 48].map(y => <line key={y} x1="6" x2="58" y1={y} y2={y} stroke="var(--staff)" strokeWidth="1.2" />)}
    <TrebleClefGlyph x={6} y={-12} scale={0.5} width={6.5} />
  </svg>;
}

/** Five staff lines filling a box. */
export function StaffLines({ x1 = 0, x2 = 100, top = 50, gap = 12, color = 'var(--ink)', width = 1.3, opacity = 0.75 }: {
  x1?: number; x2?: number; top?: number; gap?: number; color?: string; width?: number; opacity?: number;
}) {
  return <g stroke={color} strokeWidth={width} opacity={opacity}>
    {[0, 1, 2, 3, 4].map(i => <line key={i} x1={x1} x2={x2} y1={top + i * gap} y2={top + i * gap} />)}
  </g>;
}

/** Five-pointed gold-star sticker with a die-cut edge. */
export function GoldStar({ className = '', title }: { className?: string; title?: string }) {
  return <svg viewBox="0 0 60 60" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
    <StarShape cx={30} cy={31} r={26} />
  </svg>;
}

export function StarShape({ cx, cy, r, className, rotate = -8 }: { cx: number; cy: number; r: number; className?: string; rotate?: number }) {
  const points = Array.from({ length: 10 }, (_, i) => {
    const radius = i % 2 ? r * 0.47 : r;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    return `${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');
  return <g transform={`rotate(${rotate} ${cx} ${cy})`} className={className}>
    <polygon points={points} fill="#fff8e6" stroke="#fff8e6" strokeWidth={r * 0.28} strokeLinejoin="round" />
    <polygon points={points} fill="var(--gold)" stroke="var(--gold-edge)" strokeWidth={r * 0.06} strokeLinejoin="round" />
    <path d={`M${cx - r * 0.25} ${cy - r * 0.2} l${r * 0.12} ${-r * 0.22}`} stroke="#fff8e6" strokeWidth={r * 0.08} strokeLinecap="round" opacity=".8" />
  </g>;
}

/** Barline divider across the page: single, double or final (with repeat dots). */
export function Barline({ kind = 'final', className = '' }: { kind?: 'single' | 'double' | 'final' | 'repeat'; className?: string }) {
  return <div className={`relative h-10 w-full overflow-hidden ${className}`} aria-hidden="true">
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="block size-full">
      {[6, 18, 30, 42, 54].map(y => (
        <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="var(--staff)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
    <svg viewBox="920 0 280 60" width="280" height="60" preserveAspectRatio="xMaxYMid meet" className="pointer-events-none absolute right-0 top-0 block h-full w-auto">
      {kind === 'final' && <g opacity="0.65">
        <line x1="940" x2="940" y1="6" y2="54" stroke="var(--staff)" strokeWidth="1.4" />
        <g fill="var(--pencil)">
          <ellipse cx="975" cy="42" rx="6" ry="4.4" transform="rotate(-22 975 42)" />
          <rect x="979.8" y="14" width="1.8" height="28" />
          <ellipse cx="1015" cy="36" rx="6" ry="4.4" transform="rotate(-22 1015 36)" />
          <rect x="1019.8" y="10" width="1.8" height="26" />
          <path d="M979.8 14 L1021.6 10 L1021.6 14.5 L979.8 18.5Z" />
          <ellipse cx="1062" cy="30" rx="6" ry="4.4" transform="rotate(-22 1062 30)" />
          <rect x="1066.8" y="4" width="1.8" height="26" />
        </g>
        <g fill="none" stroke="var(--primary)" strokeWidth="2.2">
          <ellipse cx="1122" cy="30" rx="7.5" ry="5" transform="rotate(-14 1122 30)" />
        </g>
        <path d="M1108 16 C1110 4 1134 4 1136 16 C1133 9 1111 9 1108 16Z" fill="var(--primary)" />
        <circle cx="1122" cy="13.5" r="2" fill="var(--primary)" />
      </g>}
      {kind === 'single' && <line x1="1196" x2="1196" y1="6" y2="54" stroke="var(--ink)" strokeWidth="2" />}
      {kind !== 'single' && <>
        <line x1="1182" x2="1182" y1="6" y2="54" stroke="var(--ink)" strokeWidth="2" />
        <rect x={kind === 'double' ? 1190 : 1188} y="6" width={kind === 'double' ? 2 : 8} height="48" fill="var(--ink)" />
      </>}
      {kind === 'repeat' && <><circle cx="1170" cy="24" r="3.2" fill="var(--ink)" /><circle cx="1170" cy="36" r="3.2" fill="var(--ink)" /></>}
    </svg>
  </div>;
}

/**
 * Full-width engraved musical score border for the bottom of the site header:
 * five staff lines with a delicate running melody of clefs, beamed quavers, crotchets, slurs and barlines.
 */
export function HeaderScoreBorder() {
  const beamPairs: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [
    { x1: 112, y1: 24, x2: 142, y2: 19.5, color: 'var(--pencil)' },
    { x1: 318, y1: 19.5, x2: 348, y2: 15, color: 'var(--pencil)' },
    { x1: 582, y1: 24, x2: 612, y2: 19.5, color: 'var(--primary)' },
    { x1: 794, y1: 19.5, x2: 824, y2: 24, color: 'var(--pencil)' },
    { x1: 1038, y1: 24, x2: 1068, y2: 17.25, color: 'var(--teal)' },
    { x1: 1272, y1: 19.5, x2: 1302, y2: 15, color: 'var(--pencil)' },
  ];
  const singles: { x: number; y: number; color: string; open?: boolean; flag?: boolean }[] = [
    { x: 186, y: 17.25, color: 'var(--primary)', flag: true },
    { x: 254, y: 21.75, color: 'var(--pencil)', open: true },
    { x: 404, y: 17.25, color: 'var(--teal)' },
    { x: 454, y: 24, color: 'var(--pencil)', flag: true },
    { x: 660, y: 15, color: 'var(--pencil)' },
    { x: 706, y: 21.75, color: 'var(--teal)', open: true },
    { x: 874, y: 17.25, color: 'var(--primary)', flag: true },
    { x: 924, y: 19.5, color: 'var(--pencil)' },
    { x: 1118, y: 21.75, color: 'var(--pencil)', open: true },
    { x: 1192, y: 17.25, color: 'var(--primary)' },
    { x: 1354, y: 19.5, color: 'var(--pencil)', open: true },
  ];
  const barlines = [224, 488, 752, 998, 1236];

  return <div aria-hidden="true" className="header-score w-full overflow-hidden">
    <svg viewBox="0 0 1440 36" preserveAspectRatio="xMidYMid slice" className="block h-[30px] w-full sm:h-[34px]">
      {[9, 13.5, 18, 22.5, 27].map(y => (
        <line key={y} x1="0" x2="1440" y1={y} y2={y} stroke="var(--staff)" strokeWidth="1" />
      ))}
      {barlines.map(x => (
        <line key={x} x1={x} x2={x} y1="9" y2="27" stroke="var(--staff)" strokeWidth="1.2" />
      ))}
      {/* Left clef (desktop) and center-left accent clef (visible on narrow mobile slice) */}
      <TrebleClefGlyph x={34} y={-2} scale={0.28} color="var(--primary)" width={6} />
      <TrebleClefGlyph x={520} y={-2} scale={0.26} color="var(--primary)" width={6} />
      <g opacity="0.82">
        {/* Phrase slurs */}
        <path d="M112 29 Q149 34 186 24" fill="none" stroke="var(--staff)" strokeWidth="1.15" strokeLinecap="round" />
        <path d="M582 29 Q621 34 660 22" fill="none" stroke="var(--staff)" strokeWidth="1.15" strokeLinecap="round" />
        <path d="M1038 29 Q1078 34 1118 27" fill="none" stroke="var(--staff)" strokeWidth="1.15" strokeLinecap="round" />
        {/* Sharp accents */}
        <g stroke="var(--pencil)" strokeWidth="1" opacity="0.7">
          <path d="M388 12 v11 M392 11 v11 M386 15.5 l8 -1.8 M386 19.5 l8 -1.8" />
          <path d="M858 12 v11 M862 11 v11 M856 15.5 l8 -1.8 M856 19.5 l8 -1.8" />
        </g>
        {/* Beamed quaver pairs */}
        {beamPairs.map(p => (
          <g key={p.x1} fill={p.color}>
            <ellipse cx={p.x1} cy={p.y1} rx="3.4" ry="2.4" transform={`rotate(-22 ${p.x1} ${p.y1})`} />
            <ellipse cx={p.x2} cy={p.y2} rx="3.4" ry="2.4" transform={`rotate(-22 ${p.x2} ${p.y2})`} />
            <rect x={p.x1 + 2.7} y={p.y1 - 15} width="1.2" height="15" />
            <rect x={p.x2 + 2.7} y={p.y2 - 15} width="1.2" height="15" />
            <path d={`M${p.x1 + 2.7} ${p.y1 - 15} L${p.x2 + 3.9} ${p.y2 - 15} L${p.x2 + 3.9} ${p.y2 - 12.2} L${p.x1 + 2.7} ${p.y1 - 12.2}Z`} />
          </g>
        ))}
        {/* Single crotchets, minims and flagged quavers */}
        {singles.map(n => (
          <g key={n.x} fill={n.color} stroke={n.color}>
            <ellipse cx={n.x} cy={n.y} rx="3.4" ry="2.4" transform={`rotate(-22 ${n.x} ${n.y})`}
              fill={n.open ? 'var(--paper)' : n.color} strokeWidth={n.open ? 1.4 : 0} />
            <rect x={n.x + 2.7} y={n.y - 15} width="1.2" height="15" stroke="none" />
            {n.flag && <path d={`M${n.x + 3.8} ${n.y - 15} C${n.x + 7.5} ${n.y - 11.5} ${n.x + 9.2} ${n.y - 8.5} ${n.x + 6.8} ${n.y - 4.5} C${n.x + 7.8} ${n.y - 8.2} ${n.x + 6.2} ${n.y - 10.5} ${n.x + 3.8} ${n.y - 11.8}Z`} stroke="none" />}
          </g>
        ))}
      </g>
      {/* Closing double barline at far right */}
      <line x1="1426" x2="1426" y1="9" y2="27" stroke="var(--staff)" strokeWidth="1.2" />
      <rect x="1430" y="9" width="3.5" height="18" fill="var(--staff)" />
    </svg>
  </div>;
}

/** Faint engraved musical-notation watermark for hero or CTA backdrops. */
export function ScoreWatermark({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 360 300" className={className} aria-hidden="true">
    <TrebleClefGlyph x={10} y={24} scale={1.9} color="var(--staff)" width={3.2} />
    <g fill="var(--staff)" opacity="0.85">
      <ellipse cx="198" cy="112" rx="11" ry="8" transform="rotate(-22 198 112)" />
      <rect x="206.5" y="54" width="2.8" height="58" />
      <ellipse cx="252" cy="96" rx="11" ry="8" transform="rotate(-22 252 96)" />
      <rect x="260.5" y="38" width="2.8" height="58" />
      <path d="M206.5 54 L263.3 38 L263.3 46 L206.5 62Z" />
      <ellipse cx="308" cy="148" rx="9.5" ry="7" transform="rotate(-22 308 148)" />
      <rect x="315.5" y="98" width="2.4" height="50" />
      <path d="M317.8 98 C328 110 336 116 328 134 C332 118 324 112 317.8 109Z" />
    </g>
  </svg>;
}

/** Fermata ("hold this note") used over calls to action. */
export function Fermata({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
    <path d="M4 27 C6 6 54 6 56 27 C52 14 8 14 4 27Z" fill="currentColor" />
    <circle cx="30" cy="23" r="3.6" fill="currentColor" />
  </svg>;
}

/** Beamed quaver pair, used as a list bullet. */
export function QuaverPair({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <ellipse cx="8" cy="25" rx="5.2" ry="3.8" transform="rotate(-22 8 25)" fill="currentColor" />
    <ellipse cx="24" cy="21" rx="5.2" ry="3.8" transform="rotate(-22 24 21)" fill="currentColor" />
    <path d="M12.6 24 V7 M28.6 20 V3" stroke="currentColor" strokeWidth="2" />
    <path d="M12.6 7 L28.6 3 L28.6 7.5 L12.6 11.5Z" fill="currentColor" />
  </svg>;
}

/** Hand-drawn pencil ellipse, for circling numbers or labels. */
export function PencilCircle({ className = '', ...rest }: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 120 100" className={className} aria-hidden="true" {...rest}>
    <path d="M70 8 C30 2 6 26 8 52 C10 82 44 96 74 90 C104 84 116 60 110 38 C104 16 80 6 52 10 C40 12 30 18 26 22"
      fill="none" stroke="var(--pencil)" strokeWidth="3" strokeLinecap="round" strokeDasharray="200 4 40 3" />
  </svg>;
}

/** A floating run of beamed quavers. */
export function QuaverRun({ className = '', color = 'var(--ink)' }: { className?: string; color?: string }) {
  return <svg viewBox="0 -16 224 100" className={className} aria-hidden="true" fill={color}>
    {[[14, 72], [58, 60], [102, 50], [146, 42]].map(([x, y]) => <g key={x}>
      <ellipse cx={x} cy={y} rx="9" ry="6.6" transform={`rotate(-22 ${x} ${y})`} />
      <rect x={x + 7.4} y={y - 52} width="2.4" height="52" />
    </g>)}
    <path d="M21.4 20 L155.8 -10 L155.8 -2.5 L21.4 27.5Z" />
    <path d="M21.4 31 L155.8 1 L155.8 8.5 L21.4 38.5Z" />
    <ellipse cx="196" cy="62" rx="9" ry="6.6" transform="rotate(-22 196 62)" />
    <rect x="203.4" y="10" width="2.4" height="52" />
    <path d="M205.8 10 C214 22 222 28 214 46 C218 30 210 24 205.8 22Z" />
  </svg>;
}
