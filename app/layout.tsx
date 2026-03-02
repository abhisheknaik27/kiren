import type {Metadata} from 'next';
import {Inter, Playfair_Display} from 'next/font/google';
import './globals.css';
import {SmoothScroll} from '@/components/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cinematic Lens | DOP Portfolio',
  description: 'A cinematic scroll-based film experience portfolio.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-black text-white antialiased selection:bg-white/20 selection:text-white overflow-x-hidden">
        <SmoothScroll>
          <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
