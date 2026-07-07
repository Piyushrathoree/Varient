import { Inter, Poppins } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import Script from 'next/script';
import './global.css';

/**
 * Body face — SmoothUI ports Inter (body) + Poppins (title) straight from
 * next/font/google (see .agent-docs/PORT-SPEC.md — copy, don't invent a Fontshare stack).
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/** Title/display face — headings, hero copy. */
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${inter.variable} ${poppins.variable}`}
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
