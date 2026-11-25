import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { ClefMark, HeaderScoreBorder } from './art/notation';
import { MobileMenu } from './mobile-menu';
import { SiteLink } from './site-link';

const NAV = [
  { href: '/lessons/', label: 'Lessons' },
  { href: '/teachers/', label: 'Teachers' },
  { href: '/concerts/', label: 'Concerts' },
  { href: '/contact/', label: 'Contact' },
];

export function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`flex items-center gap-3 ${className}`}>
    <ClefMark className="size-10 shrink-0 sm:size-12" />
    <span className="leading-none">
      <span className="block whitespace-nowrap font-display text-[1.45rem] tracking-[.01em] sm:text-[1.7rem]">{business.wordmark}</span>
      <span className="mt-1 block whitespace-nowrap text-[.74rem] font-bold text-pencil sm:text-[.8rem]">{business.wordmarkLine}</span>
    </span>
  </span>;
}

export function SiteHeader() {
  return <header className="relative z-40 bg-paper">
    <div className="wrap flex min-h-[5rem] items-center justify-between gap-4">
      <SiteLink href="/" className="no-underline" aria-label={`${business.name}, home`}><Wordmark /></SiteLink>
      <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
        {NAV.map(item => <SiteLink key={item.href} href={item.href} markCurrent="page" className="nav-note">{item.label}</SiteLink>)}
        <SiteLink href="/contact/" className="button min-h-10 px-4 py-1.5 text-[.95rem]">Book a trial</SiteLink>
        <DarkModeToggle />
      </nav>
      <div className="flex items-center gap-2 md:hidden">
        <DarkModeToggle />
        <MobileMenu>
          <nav aria-label="Main">
            <ul className="grid gap-1">
              <li><SiteLink href="/" markCurrent="page" className="nav-note w-full">Home</SiteLink></li>
              {NAV.map(item => <li key={item.href}><SiteLink href={item.href} markCurrent="page" className="nav-note w-full">{item.label}</SiteLink></li>)}
            </ul>
            <SiteLink href="/contact/" className="button mt-3 w-full">Book a trial</SiteLink>
          </nav>
        </MobileMenu>
      </div>
    </div>
    <HeaderScoreBorder />
  </header>;
}
