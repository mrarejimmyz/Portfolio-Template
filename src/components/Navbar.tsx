import { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  // Function to determine if a link is active
  const isActive = (path: string): string => {
    return router.pathname === path 
      ? "text-blue-400" 
      : "hover:text-gray-300";
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Portfolio
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className={`transition-colors ${isActive('/')}`}>
            Home
          </Link>
          <Link href="/projects" className={`transition-colors ${isActive('/projects')}`}>
            Projects
          </Link>
          <Link href="/blog" className={`transition-colors ${isActive('/blog')}`}>
            Blog
          </Link>
          <Link href="/contact" className="hover:text-gray-300 transition-colors">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 flex flex-col items-center">
          <Link 
            href="/" 
            className={`block py-2 ${isActive('/')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/projects" 
            className={`block py-2 ${isActive('/projects')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </Link>
          <Link 
            href="/blog" 
            className={`block py-2 ${isActive('/blog')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link 
            href="/#contact" 
            className="block py-2 hover:text-gray-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
