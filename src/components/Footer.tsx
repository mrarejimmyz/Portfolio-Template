// components/Footer.tsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800 mt-16 relative overflow-hidden">
      {/* Background gradient with animated pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-gray-900 dark:to-blue-900/30 z-0">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <svg width="100%" height="100%">
            <pattern id="blockchainPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20h40M20 0v40" stroke="currentColor" strokeWidth="0.5" />
              <rect width="10" height="10" x="5" y="5" rx="2" fill="currentColor" />
              <rect width="10" height="10" x="25" y="25" rx="2" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#blockchainPattern)" />
          </svg>
        </div>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center mb-8">
          {/* Logo/Brand */}
            <motion.div 
            className="flex items-center space-x-2 mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
            <span className="text-2xl font-bold">
                <span className="text-black dark:text-white">mrare jimmys </span>
                <span className="text-blue-600">Block Fusion</span>
            </span>
            </motion.div>

          {/* Description */}
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-lg mb-8">
            Pushing the boundaries of Web3 development with decentralized solutions that are fast, secure, and user-friendly.
          </p>

          {/* Stats Box */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12 w-full max-w-3xl">
            <div className="p-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-600">1.8 MB</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Total Size</span>
              </div>
            </div>
            <div className="p-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-purple-600">100%</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Decentralized</span>
              </div>
            </div>
            <div className="p-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-green-600">IPFS</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Hosting</span>
              </div>
            </div>
            <div className="p-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-amber-600">AI</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Powered</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6 mb-8">
            <motion.a 
              href="https://github.com/mrarejimmyz" 
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub Profile"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/ashish-regmi/" 
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn Profile"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </motion.a>
            <motion.a 
              href="https://x.com/HarveReg" 
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Twitter Profile"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </motion.a>
          </div>
        </div>
        
        {/* Signature Line */}
        <div className="flex flex-col md:flex-row justify-center items-center text-center pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap justify-center items-center gap-1">
            <span>© {new Date().getFullYear()}</span>
            <span className="hidden sm:inline">•</span>
            <span>Crafted with</span>
            <span className="text-red-500 animate-pulse">❤</span>
            <span>using</span>
            <span className="inline-flex items-center px-2 py-1 bg-black text-white text-xs rounded mx-1">Next.js</span>
            <span className="inline-flex items-center px-2 py-1 bg-blue-500 text-white text-xs rounded mx-1">Tailwind</span>
            <span className="inline-flex items-center px-2 py-1 bg-teal-500 text-white text-xs rounded mx-1">IPFS</span>
            <span className="inline-flex items-center px-2 py-1 bg-purple-500 text-white text-xs rounded mx-1">Framer</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
