// Instrument glyphs drawn in a 48×48 box: friendly silhouettes with a few real details.
// Used on The Staff, tutor-book pages, teacher portraits and the hero.

const LINE = 'var(--ink)';

/** Outline of a violin-family or guitar body: upper bout, waist, lower bout. */
export function bodyPath(cx: number, top: number, h: number, wu: number, ww: number, wl: number): string {
  const y = (f: number) => (top + h * f).toFixed(2);
  const r = (dx: number) => (cx + dx).toFixed(2);
  const l = (dx: number) => (cx - dx).toFixed(2);
  return [
    `M${cx} ${top}`,
    `C${r(wu * 0.7)} ${top} ${r(wu)} ${y(0.06)} ${r(wu)} ${y(0.22)}`,
    `C${r(wu)} ${y(0.36)} ${r(ww)} ${y(0.36)} ${r(ww)} ${y(0.48)}`,
    `C${r(ww)} ${y(0.58)} ${r(wl)} ${y(0.58)} ${r(wl)} ${y(0.75)}`,
    `C${r(wl)} ${y(0.94)} ${r(wl * 0.6)} ${y(1)} ${cx} ${y(1)}`,
    `C${l(wl * 0.6)} ${y(1)} ${l(wl)} ${y(0.94)} ${l(wl)} ${y(0.75)}`,
    `C${l(wl)} ${y(0.58)} ${l(ww)} ${y(0.58)} ${l(ww)} ${y(0.48)}`,
    `C${l(ww)} ${y(0.36)} ${l(wu)} ${y(0.36)} ${l(wu)} ${y(0.22)}`,
    `C${l(wu)} ${y(0.06)} ${l(wu * 0.7)} ${top} ${cx} ${top}Z`,
  ].join(' ');
}

function Piano({ line = LINE }: { line?: string }) {
  const whites = Array.from({ length: 7 }, (_, i) => 4 + i * (40 / 7));
  return <g stroke={line} strokeWidth="1.8" strokeLinejoin="round">
    <rect x="3" y="9" width="42" height="8" rx="2" fill="var(--piano)" />
    <rect x="4" y="16" width="40" height="22" rx="1.5" fill="var(--sheet)" />
    {whites.slice(1).map(x => <line key={x} x1={x} x2={x} y1="16" y2="38" strokeWidth="1.2" />)}
    {[1, 2, 4, 5, 6].map(i => <rect key={i} x={4 + i * (40 / 7) - 2.1} y="16" width="4.2" height="13" rx=".8" fill={line} strokeWidth="0" />)}
  </g>;
}

function Violin({ line = LINE }: { line?: string }) {
  return <g transform="rotate(32 24 24)" stroke={line} strokeWidth="1.7" strokeLinejoin="round">
    <rect x="22.6" y="4" width="2.8" height="17" rx="1" fill="var(--piano)" />
    <path d="M24 4.5 c-3.2 0 -3.2 -4 0 -4 c2.6 0 2.6 3 0.4 3" fill="var(--wood-dark)" />
    <path d={bodyPath(24, 18, 26, 7, 4.6, 8.6)} fill="var(--wood)" />
    <path d="M19.8 31 c1.6 1.4 -1.2 4 0.4 5.4 M28.2 31 c-1.6 1.4 1.2 4 -0.4 5.4" fill="none" strokeWidth="1.3" />
    <path d="M24 18 V40" strokeWidth=".8" />
    <rect x="21" y="35" width="6" height="1.6" fill={line} strokeWidth="0" />
    <path d="M24 40 l-3 4 h6z" fill="var(--piano)" strokeWidth="1.2" />
  </g>;
}

function Cello({ line = LINE }: { line?: string }) {
  return <g stroke={line} strokeWidth="1.7" strokeLinejoin="round">
    <rect x="22.4" y="3" width="3.2" height="14" rx="1" fill="var(--piano)" />
    <path d="M24 3.4 c-3.4 0 -3.4 -3.2 0 -3.2 c2.6 0 2.6 2.4 0.5 2.4" fill="var(--wood-dark)" />
    <path d={bodyPath(24, 13, 30, 8.2, 5.4, 10.4)} fill="var(--wood)" />
    <path d="M18.6 27 c2 1.6 -1.4 4.6 0.6 6.4 M29.4 27 c-2 1.6 1.4 4.6 -0.6 6.4" fill="none" strokeWidth="1.3" />
    <path d="M24 13 V39" strokeWidth=".8" />
    <rect x="20.5" y="33" width="7" height="1.8" fill={line} strokeWidth="0" />
    <path d="M24 43 V47.5" strokeWidth="1.6" />
  </g>;
}

function Guitar({ line = LINE }: { line?: string }) {
  return <g transform="rotate(-28 24 24)" stroke={line} strokeWidth="1.7" strokeLinejoin="round">
    <rect x="20.5" y="0.5" width="7" height="6" rx="1.5" fill="var(--piano)" />
    <rect x="22.2" y="5" width="3.6" height="17" fill="var(--wood-dark)" />
    {[9, 12, 15, 18].map(y => <line key={y} x1="22.2" x2="25.8" y1={y} y2={y} strokeWidth=".8" />)}
    <path d={bodyPath(24, 20, 27, 8.2, 6.4, 11.4)} fill="var(--gold)" />
    <circle cx="24" cy="31" r="3.4" fill={line} strokeWidth="0" />
    <rect x="20" y="39" width="8" height="2" rx="1" fill="var(--wood-dark)" strokeWidth="1" />
  </g>;
}

function Ukulele({ line = LINE }: { line?: string }) {
  return <g transform="rotate(24 24 24)" stroke={line} strokeWidth="1.7" strokeLinejoin="round">
    <rect x="21" y="3" width="6" height="5" rx="1.5" fill="var(--piano)" />
    <rect x="22.4" y="7" width="3.2" height="16" fill="var(--wood-dark)" />
    <path d={bodyPath(24, 21, 23, 6.8, 5.2, 9.4)} fill="var(--teal)" />
    <circle cx="24" cy="31" r="2.8" fill={line} strokeWidth="0" />
    <rect x="20.6" y="37" width="6.8" height="1.8" rx=".9" fill="var(--sheet)" strokeWidth="1" />
  </g>;
}

function Flute({ line = LINE }: { line?: string }) {
  return <g transform="rotate(-38 24 24)" stroke={line} strokeWidth="1.6">
    <rect x="1" y="21.6" width="46" height="4.8" rx="2.4" fill="var(--metal)" />
    <rect x="6" y="21.6" width="2.4" height="4.8" fill={line} strokeWidth="0" />
    <ellipse cx="10.5" cy="24" rx="1.3" ry="1" fill={line} strokeWidth="0" />
    {[19, 24, 29, 35, 40].map(x => <circle key={x} cx={x} cy="24" r="1.6" fill="var(--sheet)" strokeWidth="1" />)}
  </g>;
}

function Clarinet({ line = LINE }: { line?: string }) {
  return <g transform="rotate(14 24 24)" stroke={line} strokeWidth="1.6" strokeLinejoin="round">
    <path d="M22.4 1 h3.2 l.6 5 h-4.4z" fill="var(--piano)" />
    <rect x="21.4" y="6" width="5.2" height="32" rx="1" fill="var(--piano)" />
    <path d="M21.4 37 L17.4 46.5 H30.6 L26.6 37Z" fill="var(--piano)" />
    {[11, 17, 23, 29].map(y => <circle key={y} cx="24" cy={y} r="1.5" fill="var(--metal)" strokeWidth=".8" />)}
    {[14, 26].map(y => <path key={y} d={`M26.6 ${y} h3`} stroke="var(--metal)" strokeWidth="1.6" />)}
  </g>;
}

function Drums({ line = LINE }: { line?: string }) {
  return <g stroke={line} strokeWidth="1.7" strokeLinejoin="round">
    <path d="M8 24 V36 C8 42 40 42 40 36 V24" fill="var(--primary)" />
    {[12, 20, 28, 36].map(x => <rect key={x} x={x - 1} y="27" width="2" height="8" rx="1" fill="var(--metal)" strokeWidth=".8" />)}
    <path d="M8 36 C8 42 40 42 40 36" fill="none" />
    <ellipse cx="24" cy="24" rx="16" ry="5.2" fill="var(--sheet)" />
    <path d="M10 4 L28 21 M38 4 L20 21" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="10" cy="4" r="2" fill="var(--wood)" strokeWidth="1" />
    <circle cx="38" cy="4" r="2" fill="var(--wood)" strokeWidth="1" />
  </g>;
}

function Voice({ line = LINE }: { line?: string }) {
  return <g stroke={line} strokeWidth="1.7" strokeLinejoin="round">
    <rect x="17" y="4" width="12" height="15" rx="6" fill="var(--metal)" />
    {[9, 13].map(y => <line key={y} x1="17.6" x2="28.4" y1={y} y2={y} strokeWidth="1" />)}
    <path d="M18.5 19 L21.6 42 C22 45 26 45 26.4 42 L29.5 19Z" fill="var(--piano)" />
    <rect x="21.8" y="27" width="4.4" height="3" rx="1" fill="var(--primary)" strokeWidth=".8" />
    <g fill={line} stroke="none">
      <ellipse cx="37" cy="14" rx="3" ry="2.2" transform="rotate(-22 37 14)" />
      <rect x="39.1" y="2" width="1.3" height="12" />
      <path d="M40.4 2 c3 2 4 4 2 7 c0.6-2.2 -0.6-3.6 -2-4z" />
    </g>
  </g>;
}

const GLYPHS: Record<string, (props: { line?: string }) => React.JSX.Element> = {
  piano: Piano, violin: Violin, cello: Cello, guitar: Guitar, ukulele: Ukulele,
  flute: Flute, clarinet: Clarinet, drums: Drums, voice: Voice,
};

/** Glyph group for embedding inside another SVG (48×48 units). Unknown IDs fall back to a quaver. */
export function InstrumentGlyph({ id, x = 0, y = 0, size = 48, line }: { id: string; x?: number; y?: number; size?: number; line?: string }) {
  const Glyph = GLYPHS[id];
  return <g transform={`translate(${x} ${y}) scale(${size / 48})`}>
    {Glyph ? <Glyph line={line} /> : <g fill="var(--ink)"><ellipse cx="20" cy="36" rx="7" ry="5" transform="rotate(-22 20 36)" /><rect x="25.6" y="8" width="2.2" height="28" /></g>}
  </g>;
}

/** Standalone decorative icon. */
export function InstrumentIcon({ id, className = '' }: { id: string; className?: string }) {
  return <svg viewBox="0 0 48 48" className={className} aria-hidden="true" overflow="visible"><InstrumentGlyph id={id} /></svg>;
}
