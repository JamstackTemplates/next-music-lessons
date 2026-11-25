import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { assertContent } from '../lib/content-rules';
import { asset } from '../lib/paths';
import { site } from '../lib/site';
import '@fontsource/abril-fatface/latin-400.css';
import '@fontsource-variable/quicksand/index.css';
import '@fontsource/schoolbell/latin-400.css';
import './tailwind.input.css';

// Fail the build with item-specific messages if an owner edit breaks the content rules.
assertContent();

const description = site.description || business.introduction;
// metadataBase already includes any base path, so give the image as a full URL when it is known.
const ogImage = site.url ? `${site.url}/og.png` : asset('/og.png');

export const metadata: Metadata = {
  title: { default: `${business.name}: music lessons in Southbank, Melbourne`, template: `%s, ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: { type: 'website', siteName: business.name, title: business.name, description, locale: 'en_AU',
    images: [{ url: ogImage, width: 1200, height: 630, alt: `${business.name}: lessons, teachers and concerts` }] },
  twitter: { card: 'summary_large_image', images: [ogImage] },
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#fbf6ea' }, { media: '(prefers-color-scheme: dark)', color: '#15131f' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-AU" suppressHydrationWarning>
    <head><ThemeScript /></head>
    <body><ThemeProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter />
    </ThemeProvider></body>
  </html>;
}
