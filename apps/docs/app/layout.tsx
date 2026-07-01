import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Bricolage_Grotesque } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import Script from 'next/script';
import './global.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-bg-base font-body text-text-primary antialiased">
        <RootProvider
          theme={{
            defaultTheme: 'dark',
            enableSystem: false,
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
