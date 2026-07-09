import { Bricolage_Grotesque, Inter } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import Script from 'next/script';
import './global.css';

/** Body face — crisp neutral sans for prose and UI chrome. */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/**
 * Display face — loaded into the legacy `--font-poppins` slot so global.css
 * token wiring stays unchanged. Bricolage Grotesque: geometric, editorial, not
 * the overused Poppins/Inter pairing.
 */
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${inter.variable} ${display.variable}`}
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
