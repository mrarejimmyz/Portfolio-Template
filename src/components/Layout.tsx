import Head from 'next/head';

import ChatNavigator from './ChatNavigator';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  
  // Listen for route changes from chatbot navigation
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const hashIndex = url.indexOf('#');
      if (hashIndex !== -1) {
        setHighlightedSection(url.substring(hashIndex + 1));
        
        // Reset highlight after animation completes
        setTimeout(() => {
          setHighlightedSection(null);
        }, 3000);
      }
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
  
  return (
    <>
      <Head>
        <title>Ashish Regmi | Web3 Developer</title>
        <meta name="description" content="Portfolio of Ashish Regmi, Web3 Developer specializing in Solana, Ethereum, and decentralized applications." />
      </Head>
      

      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      

      
      {/* Add the chatbot navigator */}
      <ChatNavigator highlightedSection={highlightedSection} />
    </>
  );
}
