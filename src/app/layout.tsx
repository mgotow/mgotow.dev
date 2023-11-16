import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import clsx from 'clsx';
import MainMenu from '../components/main-menu';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mgotow.dev'),
  title: {
    default: 'mgotow',
    template: '%s | mgotow',
  },
  description: 'mgotow\'s base site',
  openGraph: {
    title: 'mgotow',
    description: 'mgotow\'s base site',
    url: 'https://mgotow.dev',
    locale: 'ja_JP',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'mgotow',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body
        className={clsx(
          "bg-white text-black antialiased flex flex-col",
          notoSansJP.className,
        )}
      >
        <MainMenu />
        <div className="pl-8 pr-8">
          {children}
        </div>
      </body>
    </html>
  )
}
