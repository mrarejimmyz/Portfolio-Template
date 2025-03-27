import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { Geist, Geist_Mono } from "next/font/google";
import '../styles/globals.css';

// Load fonts once at the app level
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
