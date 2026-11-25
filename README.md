# Treble Clef Music School

A playful, sheet-music-styled website for a fictitious community music school in Southbank, Melbourne,
made as the `next-music-lessons` sample for the Jamstacks gallery. The design concept is
"Practice book & concert programme": cream manuscript paper, engraved notation used as layout,
a teacher's pencil notes, gold-star stickers and a printed concert programme. Dark mode is
"stage lights". The business, people and contact details are invented.

It is a self-contained Next.js static export. Local development requires Node 24 or later and npm:

```sh
npm ci
npm run dev        # local preview
npm run check      # tests, typecheck and static build
npm start          # serve the built out/ folder
```

After reviewing the finished site, run `/cleanup-plan` or delete `plan/` and `.claude/skills/` by hand
to remove the initial build instructions.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, The Staff instrument picker, how a term works, featured teachers, next concert, term fees, visit. MusicSchool JSON-LD |
| `/lessons/` | Instrument family filter, The Staff, tutor-book pages per instrument, fee schedule (`#fees`), group classes, policies |
| `/teachers/` | All teachers as programme portraits with teaching days, plus how students are matched |
| `/concerts/` | Upcoming concerts as ticket stubs, what happens at a concert, past concerts |
| `/contact/` | Hosted enquiry form when configured, otherwise email; message checklist, address and hours |
| `/404.html` | "That note isn't in the score." |

## Make it yours: where to edit

| What you want to change | File and field |
| --- | --- |
| Term fees | `content/fees.ts` → `lessonLengths[].termFee` (whole AUD per 10-week term; longer lessons must cost more) |
| Group-class places / waitlist | `content/fees.ts` → `groupClasses[].places` (0 shows a "Waitlist" sticker) |
| Trial, sibling, hire and make-up policies | `content/fees.ts` → `policies` (and `trialFee`) |
| A teacher's timetable fills or opens | `content/teachers.ts` → `acceptingStudents` (false shows "Waitlist only") |
| Teachers on Home | `content/teachers.ts` → `featured` (exactly three) |
| Add or edit a teacher | `content/teachers.ts`; the portrait uses `signatureColour` and `hairstyle` |
| Concerts | `content/concerts.ts`; add new ones as `upcoming`, change to `past` afterwards. The site never infers this from today's date |
| Instruments | `content/instruments.ts`; `staffPosition` (0–8, unique) places the note on The Staff; `teacherIds` must exist |
| Email, phone, address, directions, hours | `content/business.ts` |
| Message checklist and reply wording on Contact | `content/business.ts` → `enquiries` |
| Page headings, intros, buttons and captions | the route's `app/**/page.tsx`, e.g. `<Hero.Heading>` in `app/page.tsx` |
| Name, description, domain, time zone | `site.config.json` (and `business.name`) |
| Colours, fonts, textures | `app/tailwind.input.css` |
| Drawn art | `components/art/` (notation, instruments, recital room, portraits, stage pieces) |
| Sitemap routes | `app/sitemap.ts` |

Every collection is checked by `lib/content-rules.ts` during the build and in `npm test`. A bad edit fails
with a message naming the item, for example `instrument "cello": teacher "nobody" does not exist in
content/teachers.ts`. Hours must be same-day intervals; overnight hours are not supported.

Example edit: change the 45-minute fee to 630 in `content/fees.ts` and set `ukulele-club` `places` to 4,
then rebuild. The Home fee row, the Lessons fee schedule and the Ukulele Club entry all update, and its
"Waitlist" sticker disappears.

## Appearance

- Fonts are self-hosted from npm (SIL Open Font License): Abril Fatface (`@fontsource/abril-fatface`)
  for headings, Quicksand (`@fontsource-variable/quicksand`) for body text and Schoolbell
  (`@fontsource/schoolbell`) for pencil annotations.
- Colours are tokens in `app/tailwind.input.css` with light, automatic-dark and explicit-dark values. The
  vermilion primary carries white button text in both modes. The ThemeProvider, ThemeScript and
  DarkModeToggle come from the published `jamstacks` package.
- All illustrations are inline SVG components in `components/art/`, coloured by the same tokens.
  `public/og.png` is a 1200×630 social image made from the finished hero art.
- The front-desk status ("Open now · until 20:00") is computed in the browser in `Australia/Melbourne` and
  refreshes every minute. Without JavaScript it reads "see the hours below".
- The instrument filter on Lessons appears only with JavaScript; without it every instrument is shown.
- Keyboard focus, a skip link, reduced motion and print styles are included. The footer credit is yours
  to keep, reword or remove.

## Public configuration

```json
{
  "name": "Business name",
  "description": "Public description",
  "domain": "next-business-minimal.jamstacks.net",
  "timeZone": "America/New_York",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

The starter itself leaves domain/timeZone unset. Gallery templates use their folder name plus
`.jamstacks.net`; customers replace the demo domain with their own. Do not invent canonical URLs when
the deployed address is unknown.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config timeZone |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Copy .env.example to .env.local for Next.js local work. All listed values are public. Never add tokens,
SMTP credentials or publishing keys. Newer dependencies should stay within reviewed majors; update
package.json and package-lock.json together, then run the full checks.

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear only
on Contact when configured. Without a site ID there is no embed host/request. Email remains visible
in either case. The hosted runtime owns name/email/message fields, validation, submission and results.
Never register the element locally, substitute a form or intercept submission. Contact navigation uses
full document loads via SiteLink because the runtime has no remount API. Copy must describe an enquiry,
not a confirmed booking/order/payment; no attachments or extra input fields.

For local Jamstacks development, configure an explicit local CDN URL and
`JAMSTACKS_ALLOW_LOCAL_CDN=1`; remote builds reject localhost. A locally loaded component does not prove
real message delivery. Test delivery separately against a configured site/backend.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Tests cover config/provisioner compatibility, embed state, content rules, optional opening hours,
and structured-data escaping. Typecheck uses Next's generated route types.
When changing the Contact integration, base paths or canonical URLs, check the exported HTML and
sitemap. Verify both configured and unconfigured Contact with the corresponding build settings.
Test light/dark at desktop and mobile widths, keyboard navigation, unknown routes, repeated Contact
navigation and any added browser interactions. Return to a normal build before capturing final assets.

## GitHub Pages deployment

`.github/workflows/pages.yml` uses npm ci, tests, typecheck and static export. It preserves Jamstacks'
`provisioning_id` dispatch input
and correlated run name. It builds pull requests without deploying, and publishes main/manual runs.
Configure Pages to use GitHub Actions. GitHub ignores a CNAME file for Actions deployments, so do not
add public/CNAME; the custom domain is a repository setting. The workflow sets it before building
when a `PAGES_ADMIN_TOKEN` secret is available (a fine-grained token with Administration and Pages
write access to the repository, e.g. as an organisation secret). The domain is the `SITE_DOMAIN`
variable, else site.config.json's `domain`, else `<repo-name>.jamstacks.net` for JamstackTemplates
repositories. Once the domain is set and its certificate is issued, a later deploy also enforces HTTPS.
Without the secret the step only prints a notice; set the custom domain and HTTPS in Settings → Pages.
DNS is managed separately; for template demos the CNAME targets `jamstacktemplates.github.io`.

## Content Security Policy

A host-level CSP must permit same-origin Next.js scripts/assets, the inline theme bootstrap (using an
appropriate hash/nonce policy), the configured Jamstacks CDN scripts/assets and the published form's
API connection origin. Derive actual directives from the deployed component. Optional maps require
`frame-src https://www.google.com`. Apply CSP at the host; static export cannot set response headers
through a running Next.js server. Do not put private credentials into CSP or relax policies blindly.

## Publishing assets and structure

`app/`, `components/`, `content/`, `lib/` and `types/` are the website. `scripts/` includes static
preview and verification, `tests/` covers customer behavior, and `.github/` supplies deployment.
`jamstacks/` is removable gallery-only source metadata. Ordinary builds, tests and Pages work after
it is deleted. To publish a gallery template, create [its manifest](jamstacks/README.md) and capture
genuine screenshots before running its separate publishing test:

```sh
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template /path/to/next-type-style --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

Before publication: replace neutral content and shell; validate industry data/schema and all links;
choose licensed fonts; verify both themes/base-path/embed states; create a neutral 1200×630 public/og.png
from the finished design and wire metadata; replace the icon; generate gallery captures and validate;
confirm domain/Pages settings and HTTPS; remove `plan/` and `.claude/skills/` after review. The website must not import or
link the planning folder. No stock screenshot or OG image is supplied as if it were final.
