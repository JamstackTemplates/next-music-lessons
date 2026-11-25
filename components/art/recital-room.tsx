// Hero scene: the recital room. An upright piano with an open tutor book, a cello leaning on it,
// a violin on the lid beside the gold-star jar and metronome, a music stand with flute and ukulele,
// a snare drum in front, and a ribbon of staff and quavers curling out of the piano.
import { bodyPath } from './instruments';
import { StarShape, TrebleClefGlyph } from './notation';

const L = 'var(--art-line)';
const RIBBON = 'M262 252 C316 196 276 150 222 132 C160 110 156 54 70 40';

function Note({ x, y, flag = false, up = true }: { x: number; y: number; flag?: boolean; up?: boolean }) {
  return <g fill="var(--ink)">
    <ellipse cx={x} cy={y} rx="8" ry="5.8" transform={`rotate(-22 ${x} ${y})`} />
    {up ? <rect x={x + 6.4} y={y - 40} width="2.2" height="40" /> : <rect x={x - 8.6} y={y} width="2.2" height="40" />}
    {flag && up && <path d={`M${x + 8.6} ${y - 40} c6 8 14 12 8 26 c2 -10 -4 -14 -8 -16z`} />}
  </g>;
}

export function RecitalRoom({ className = '', viewBox = '0 0 720 620', title }: { className?: string; viewBox?: string; title?: string }) {
  const keys = Array.from({ length: 26 }, (_, i) => 74 + i * 11.6);
  const black = keys.slice(0, -1).filter((_, i) => [0, 1, 3, 4, 5].includes(i % 7));
  return <svg viewBox={viewBox} className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title} preserveAspectRatio="xMidYMid slice">
    {/* Wall, window and floor */}
    <g>
      <path d="M492 214 V92 C492 26 676 26 676 92 V214Z" fill="var(--paper-deep)" stroke="var(--staff)" strokeWidth="6" />
      <path d="M584 34 V214 M492 120 H676" stroke="var(--staff)" strokeWidth="4" />
      <circle cx="636" cy="84" r="16" fill="var(--gold)" opacity=".55" />
      <defs><linearGradient id="room-floor" x1="0" x2="1"><stop offset="0" stopColor="var(--paper-deep)" stopOpacity="0" /><stop offset=".14" stopColor="var(--paper-deep)" /><stop offset=".86" stopColor="var(--paper-deep)" /><stop offset="1" stopColor="var(--paper-deep)" stopOpacity="0" /></linearGradient></defs>
      <rect x="0" y="560" width="720" height="60" fill="url(#room-floor)" />
      {[90, 200, 330, 450, 560].map(x => <line key={x} x1={x} x2={x + 60} y1="590" y2="590" stroke="var(--staff)" strokeWidth="2" />)}
      <line x1="60" x2="660" y1="560" y2="560" stroke="var(--staff)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="370" cy="580" rx="320" ry="26" fill="var(--plum)" opacity=".22" />
    </g>

    {/* Ribbon of staff and quavers rising from the piano */}
    <g className="hero-quavers">
      <g fill="none" stroke="var(--staff)" strokeWidth="2">
        {[0, 7, 14, 21, 28].map(dy => <path key={dy} d={RIBBON} transform={`translate(0 ${dy - 14})`} />)}
      </g>
      <g><Note x={268} y={196} flag /><Note x={240} y={150} /></g>
      <g>
        <Note x={176} y={108} /><Note x={206} y={100} />
        <path d="M184.6 68 L214.6 60 L214.6 66 L184.6 74Z" fill="var(--ink)" />
      </g>
      <g><Note x={104} y={58} flag /><TrebleClefGlyph x={10} y={-34} scale={0.62} width={6} /></g>
    </g>

    {/* Upright piano */}
    <g stroke={L} strokeWidth="3" strokeLinejoin="round">
      <rect x="60" y="250" width="330" height="20" rx="5" fill="var(--piano)" />
      <rect x="78" y="270" width="294" height="130" fill="var(--piano)" />
      <rect x="98" y="286" width="254" height="104" rx="6" fill="none" stroke="var(--piano-hi)" />
      {/* Open tutor book on the music desk */}
      <path d="M124 304 C164 294 196 296 225 310 V384 C196 372 164 370 124 378Z" fill="var(--sheet)" />
      <path d="M326 304 C286 294 254 296 225 310 V384 C254 372 286 370 326 378Z" fill="var(--sheet)" />
      <g stroke="var(--staff)" strokeWidth="1.4">
        {[318, 324, 330, 336, 342].map(y => <path key={y} d={`M134 ${y} C164 ${y - 8} 196 ${y - 6} 218 ${y + 2}`} fill="none" />)}
        {[318, 324, 330, 336, 342].map(y => <path key={`r${y}`} d={`M232 ${y + 2} C254 ${y - 6} 286 ${y - 8} 316 ${y}`} fill="none" />)}
      </g>
      <g fill="var(--ink)" stroke="none">
        {[[150, 330], [172, 322], [196, 326], [248, 326], [270, 318], [296, 324]].map(([x, y]) => <ellipse key={x} cx={x} cy={y} rx="3.6" ry="2.6" />)}
      </g>
      <g stroke="var(--pencil)" strokeWidth="1.6" fill="none">
        <path d="M140 356 c10 -4 30 -6 46 -2" /><path d="M244 354 q8 -6 16 0 t16 0" />
      </g>
      {/* Keyboard */}
      <rect x="60" y="398" width="330" height="10" fill="var(--piano)" />
      <rect x="70" y="408" width="310" height="28" fill="var(--sheet)" />
      {keys.slice(1).map(x => <line key={x} x1={x} x2={x} y1="408" y2="436" strokeWidth="1.4" />)}
      {black.map(x => <rect key={`b${x}`} x={x + 7.4} y="408" width="8" height="17" fill={L} strokeWidth="0" />)}
      {/* Lower case, toe blocks and pedals */}
      <rect x="78" y="436" width="294" height="112" fill="var(--piano)" />
      <rect x="100" y="452" width="250" height="80" rx="6" fill="none" stroke="var(--piano-hi)" />
      <rect x="76" y="546" width="26" height="16" fill="var(--piano)" />
      <rect x="348" y="546" width="26" height="16" fill="var(--piano)" />
      {[200, 225, 250].map(x => <rect key={x} x={x - 6} y="538" width="12" height="7" rx="3" fill="var(--gold)" strokeWidth="2" />)}
    </g>

    {/* Gold-star jar, violin and metronome on the lid */}
    <g stroke={L} strokeWidth="2.6" strokeLinejoin="round">
      <rect x="88" y="200" width="40" height="50" rx="8" fill="var(--sheet)" opacity=".9" />
      <rect x="92" y="194" width="32" height="10" rx="3" fill="var(--primary)" />
      <g transform="translate(151 238) rotate(-96)">
        <rect x="-4" y="0" width="8" height="56" rx="2" fill="var(--piano)" />
        <path d="M0 2 c-9 0 -9 -11 0 -11 c7 0 7 8 1 8" fill="var(--wood-dark)" />
        <path d={bodyPath(0, 50, 84, 21, 14, 26)} fill="var(--wood)" />
        <path d="M-11 92 c4 4 -3 10 1 14 M11 92 c-4 4 3 10 -1 14" fill="none" strokeWidth="2" />
        <rect x="-8" y="104" width="16" height="3" fill={L} strokeWidth="0" />
      </g>
      <path d="M298 250 L314 182 H338 L354 250Z" fill="var(--wood)" />
      <path d="M326 240 L340 194" strokeWidth="3" />
      <rect x="333" y="206" width="10" height="8" rx="2" fill="var(--gold)" strokeWidth="2" transform="rotate(18 338 210)" />
      <rect x="306" y="232" width="40" height="8" fill="var(--wood-dark)" strokeWidth="2" />
    </g>
    <g>
      <StarShape cx={101} cy={226} r={8} rotate={12} />
      <StarShape cx={116} cy={236} r={7} rotate={-20} />
      <StarShape cx={106} cy={242} r={5.5} rotate={4} />
      <g className="star-pop"><StarShape cx={308} cy={312} r={13} /></g>
      <g className="star-pop" style={{ animationDelay: '1.1s' }}><StarShape cx={142} cy={366} r={10} rotate={14} /></g>
    </g>

    {/* Cello leaning on the piano */}
    <g transform="translate(436 176) rotate(-12)" stroke={L} strokeWidth="3" strokeLinejoin="round">
      <path d="M0 -6 c-16 0 -16 -20 0 -20 c12 0 12 14 2 14" fill="var(--wood-dark)" />
      <rect x="-9" y="-8" width="18" height="150" rx="4" fill="var(--wood-dark)" />
      <path d={bodyPath(0, 130, 236, 58, 38, 74)} fill="var(--wood)" />
      <path d="M-6 0 L-8 300 L8 300 L6 0Z" fill="var(--piano)" strokeWidth="2" />
      <path d="M-30 228 c10 8 -8 24 2 34 M30 228 c-10 8 8 24 -2 34" fill="none" strokeWidth="2.4" />
      <rect x="-24" y="262" width="48" height="6" rx="2" fill="var(--sheet)" strokeWidth="2" />
      <path d="M-12 316 H12 L6 352 H-6Z" fill="var(--piano)" strokeWidth="2" />
      <g stroke="var(--sheet)" strokeWidth="1.1">{[-4.5, -1.5, 1.5, 4.5].map(x => <line key={x} x1={x} x2={x * 1.6} y1="0" y2="330" />)}</g>
      <path d="M0 366 V404" strokeWidth="3.4" />
    </g>

    {/* Music stand with flute and ukulele */}
    <g stroke={L} strokeWidth="2.6" strokeLinejoin="round">
      <path d="M640 520 L602 582 M640 520 L678 582 M640 520 V586" fill="none" strokeWidth="3" />
      <rect x="637" y="300" width="6" height="222" fill="var(--piano)" />
      <path d="M584 232 H696 L702 302 H578Z" fill="var(--piano)" />
      <rect x="594" y="238" width="92" height="56" fill="var(--sheet)" strokeWidth="1.6" />
      {[250, 258, 266, 274, 282].map(y => <line key={y} x1="600" x2="680" y1={y} y2={y} stroke="var(--staff)" strokeWidth="1.2" />)}
      <ellipse cx="620" cy="270" rx="3.6" ry="2.6" fill={L} strokeWidth="0" />
      <ellipse cx="650" cy="262" rx="3.6" ry="2.6" fill={L} strokeWidth="0" />
      <rect x="556" y="300" width="162" height="8" rx="4" fill="var(--metal)" strokeWidth="2" />
      {[600, 618, 636, 660, 680].map(x => <circle key={x} cx={x} cy="304" r="2.6" fill="var(--sheet)" strokeWidth="1.2" />)}
      <g transform="translate(590 452) rotate(16)">
        <rect x="-8" y="-62" width="16" height="12" rx="3" fill="var(--piano)" />
        <rect x="-5" y="-52" width="10" height="44" fill="var(--wood-dark)" />
        <path d={bodyPath(0, -12, 106, 30, 23, 41)} fill="var(--teal)" />
        <circle cx="0" cy="34" r="11" fill={L} strokeWidth="0" />
        <rect x="-14" y="62" width="28" height="6" rx="3" fill="var(--sheet)" strokeWidth="1.6" />
      </g>
    </g>

    {/* Snare drum in front */}
    <g stroke={L} strokeWidth="3" strokeLinejoin="round">
      <path d="M232 588 L210 612 M258 588 L280 612 M245 588 V614" strokeWidth="3" />
      <path d="M176 532 V572 C176 594 314 594 314 572 V532" fill="var(--primary)" />
      {[196, 222, 268, 294].map(x => <rect key={x} x={x - 3} y="540" width="6" height="26" rx="3" fill="var(--metal)" strokeWidth="1.6" />)}
      <path d="M176 572 C176 594 314 594 314 572" fill="none" stroke="var(--sheet)" strokeWidth="4" />
      <ellipse cx="245" cy="532" rx="69" ry="16" fill="var(--sheet)" />
      <path d="M188 488 L262 528 M306 486 L228 528" strokeWidth="6" strokeLinecap="round" stroke="var(--wood-dark)" />
      <path d="M188 488 L262 528 M306 486 L228 528" strokeWidth="2.4" strokeLinecap="round" stroke="var(--wood)" />
    </g>
  </svg>;
}
