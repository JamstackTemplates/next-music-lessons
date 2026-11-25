// Teacher portrait: a cameo silhouette in the teacher's signature colour, holding their instrument,
// framed in an oval programme cartouche. No photographs.
import type { Hairstyle, SignatureColour } from '../../content/teachers';
import { InstrumentGlyph } from './instruments';

const HEAD =
  'M70 222 C72 192 66 172 60 152 C40 122 44 60 96 48 C130 40 150 62 152 88 C153 98 156 104 160 112 L170 128 C168 132 162 133 158 134 C160 140 159 144 156 146 C159 150 157 154 153 156 C155 164 152 172 140 174 C130 176 124 178 122 190 L124 222Z';
const SHOULDERS = 'M10 250 C18 214 52 202 82 204 L122 204 C156 204 182 218 192 250Z';

const HAIR: Record<Hairstyle, React.JSX.Element> = {
  bun: <><circle cx="56" cy="54" r="21" /><path d="M54 124 C36 92 44 44 96 40 C130 36 150 56 150 80 C136 66 110 58 90 66 C70 74 64 100 66 124Z" /></>,
  short: <path d="M56 128 C38 96 42 44 98 38 C136 34 156 60 150 86 C140 70 120 62 100 66 C80 70 70 96 72 126Z" />,
  long: <path d="M60 214 C30 172 30 120 40 90 C48 52 80 36 104 38 C138 40 156 62 150 88 C138 70 118 62 100 68 C84 74 80 100 84 130 C88 160 86 190 84 214Z" />,
  curls: <>{[[60, 62, 18], [80, 44, 18], [104, 38, 17], [128, 42, 16], [146, 60, 13], [50, 86, 18], [48, 110, 17], [56, 132, 15], [70, 146, 12]].map(([x, y, r]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />)}</>,
  crop: <path d="M60 118 C44 90 50 50 98 44 C128 42 148 60 150 78 C130 66 110 62 94 68 C78 74 72 96 72 118Z" />,
  wave: <path d="M60 164 C38 132 36 70 80 46 C110 32 148 44 154 80 C138 66 116 60 98 68 C80 76 76 100 82 124 C86 140 80 154 72 170Z" />,
};

export function Portrait({ id, colour, hairstyle, instrumentId, className = '' }: {
  id: string; colour: SignatureColour; hairstyle: Hairstyle; instrumentId: string; className?: string;
}) {
  const fill = `var(--${colour})`;
  const clip = `portrait-${id}`;
  return <svg viewBox="0 0 200 250" className={className} aria-hidden="true">
    <defs><clipPath id={clip}><ellipse cx="100" cy="125" rx="82" ry="104" /></clipPath></defs>
    <ellipse cx="100" cy="125" rx="94" ry="118" fill="var(--card)" stroke="var(--ink)" strokeWidth="2.5" />
    <ellipse cx="100" cy="125" rx="88" ry="111" fill="none" stroke={fill} strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" />
    <ellipse cx="100" cy="125" rx="82" ry="104" fill="var(--paper-deep)" />
    <g clipPath={`url(#${clip})`}>
      <g transform="translate(6 8) scale(.94)" fill={fill}>
        <path d={SHOULDERS} />
        <path d={HEAD} />
        {HAIR[hairstyle]}
      </g>
      <g transform="translate(112 150) rotate(-8)">
        <circle cx="24" cy="24" r="27" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
        <InstrumentGlyph id={instrumentId} x={4} y={4} size={40} />
      </g>
    </g>
    {/* Cartouche scrolls */}
    <g fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round">
      <path d="M78 6 C88 0 94 10 100 4 C106 10 112 0 122 6" />
      <path d="M78 244 C88 250 94 240 100 246 C106 240 112 250 122 244" />
    </g>
  </svg>;
}
