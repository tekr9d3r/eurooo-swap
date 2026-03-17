import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Eurooo Swap — Swap EUR Stablecoins Cross-Chain',
  description: 'Swap EUR stablecoins like EURC, EURS and EURe across multiple blockchains. Powered by Li.Fi. Fast, secure, non-custodial.',
  metadataBase: new URL('https://swap.eurooo.xyz'),
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://swap.eurooo.xyz',
    siteName: 'Eurooo Swap',
    title: 'Eurooo Swap — Swap EUR Stablecoins Cross-Chain',
    description: 'Swap EUR stablecoins like EURC, EURS and EURe across multiple blockchains. Powered by Li.Fi. Fast, secure, non-custodial.',
    images: [
      {
        url: '/website-preview-eurooo-swap.png',
        width: 1200,
        height: 630,
        alt: 'Eurooo Swap — Swap EUR Stablecoins Cross-Chain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tekr0x',
    title: 'Eurooo Swap — Swap EUR Stablecoins Cross-Chain',
    description: 'Swap EUR stablecoins like EURC, EURS and EURe across multiple blockchains. Powered by Li.Fi.',
    images: ['/website-preview-eurooo-swap.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
