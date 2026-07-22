import { Instrument_Serif, Sora } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { RootProvider } from 'fumadocs-ui/provider/next';
import Script from 'next/script';
import './global.css';

/**
 * Display face — Sora, loaded into `--font-sora` and wired to the `--font-title`
 * slot in global.css. Geometric and confident: the SIGNAL instrument-panel voice.
 */
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

/**
 * Serif accent — Instrument Serif italic, used for a single accent word in the
 * hero H1 (and optionally the CTA headline). Wired to `--font-serif-accent`.
 */
const serifAccent = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${sora.variable} ${serifAccent.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background font-body text-foreground antialiased">
        <RootProvider
          theme={{
            attribute: 'class',
            defaultTheme: 'system',
            enableSystem: true,
            themes: ['light', 'dark'],
          }}
        >
          {children}
        </RootProvider>
        <Script
          src="https://t.raah.dev/script.js"
          data-pid="proj_qkhh3oofpjg0eb7y"
          data-domain="varient-ui.vercel.app"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
