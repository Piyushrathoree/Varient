import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-bg-base font-body text-text-primary antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
