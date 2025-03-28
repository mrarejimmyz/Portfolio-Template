import { useState, useEffect, useRef } from 'react';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { Geist, Geist_Mono } from "next/font/google";
import Preloader from '../components/Preloader';
import ChatNavigator from '../components/ChatNavigator';
import '../styles/globals.css';

// Optimize font loading with display strategy
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Improves perceived performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Helps text appear faster
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [loadingState, setLoadingState] = useState({
    isLoading: true,
    progress: 0
  });
  const resourcesChecked = useRef(false);
  const [highlightedSection] = useState<string | null>(null);
 // Add state for highlighted section

  useEffect(() => {
    // Only run once
    if (resourcesChecked.current) return;
    resourcesChecked.current = true;
    
    // Track loading progress
    let progress = 10; // Start with 10%
    setLoadingState({ isLoading: true, progress });
    
    // Function to increment progress
    const incrementProgress = (amount: number) => {
      progress += amount;
      setLoadingState({ isLoading: true, progress: Math.min(progress, 95) });
    };

    // Check fonts loaded (20%)
    document.fonts.ready.then(() => {
      incrementProgress(20);
      
      // Check if document is fully loaded (40%)
      if (document.readyState === 'complete') {
        incrementProgress(40);
      } else {
        window.addEventListener('load', () => incrementProgress(40), { once: true });
      }
    });

    // Check for critical images (20%)
    Promise.all(
      Array.from(document.querySelectorAll('img[data-priority="true"]'))
        .filter(img => !(img as HTMLImageElement).complete)
        .map(img => new Promise(resolve => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        }))
    ).then(() => incrementProgress(20));

    // Set a maximum loading time for fallback (1.2s)
    const maxLoadingTime = setTimeout(() => {
      setLoadingState({ isLoading: false, progress: 100 });
    }, 1200);

    // Detect idle time to complete loading
    if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => {
              incrementProgress(10);
              setTimeout(() => {
                  setLoadingState({ isLoading: false, progress: 100 });
              }, 100);
          });
      } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        incrementProgress(10);
        setTimeout(() => {
          setLoadingState({ isLoading: false, progress: 100 });
        }, 100);
      }, 800);
    }

    return () => clearTimeout(maxLoadingTime);
  }, []);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      {loadingState.isLoading ? (
        <Preloader progress={loadingState.progress} />
      ) : (
        <>
          <Navbar />
          <Component {...pageProps} />
          <ChatNavigator highlightedSection={highlightedSection} />
        </>
      )}
    </div>
  );
}
