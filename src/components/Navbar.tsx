"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  
  // Function to determine if a link is active
  const isActive = (path: string): string => {
    return router.pathname === path 
      ? "text-blue-600 font-medium" 
      : "text-gray-800 hover:text-blue-600 font-medium";
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm py-3" : "bg-white/90 backdrop-blur-sm py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold">
              <span className="text-black">Block</span>
              <span className="text-blue-600">Fusion</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className={`transition-colors ${isActive('/')}`}>
              Home
            </Link>
            <Link href="/projects" className={`transition-colors ${isActive('/projects')}`}>
              Projects
            </Link>
            <Link href="/blog" className={`transition-colors ${isActive('/blog')}`}>
              Blog
            </Link>
            <Link href="/contact" className={`transition-colors ${isActive('/contact')}`}>
              Contact
            </Link>
          </div>

          {/* Social Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://github.com/mrarejimmyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://x.com/HarveReg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/ashish-regmi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
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
              className="w-6 h-6 text-gray-800"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              href="/" 
              className={`py-2 transition-colors ${isActive('/')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              className={`py-2 transition-colors ${isActive('/projects')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              href="/blog" 
              className={`py-2 transition-colors ${isActive('/blog')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className={`py-2 transition-colors ${isActive('/contact')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Social Icons - Mobile */}
            <div className="flex items-center space-x-4 py-2">
              <Link
                href="https://github.com/mrarejimmyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://x.com/HarveReg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/ashish-regmi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
