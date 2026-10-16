import type { Metadata, Viewport } from 'next';
import { Outfit, Noto_Serif_Devanagari } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: '--font-devanagari',
  subsets: ['devanagari'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#06070c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Shri Hanuman Chalisa',
  description:
    'A modern, minimal liquid-glass experience for reciting Shri Hanuman Chalisa in Sanskrit.',
  keywords: [
    'Hanuman Chalisa',
    'Shri Hanuman Chalisa',
    'Liquid Glass UI',
    'Chaupai',
    'Doha',
    '108 Japa Counter',
    'Sanskrit',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${notoSerifDevanagari.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen font-sans bg-[#06070c] text-neutral-100 antialiased selection:bg-amber-500/30 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
