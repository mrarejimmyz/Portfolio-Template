import Head from 'next/head';
import { Geist, Geist_Mono } from "next/font/google";

import Hero from '../components/Hero';
import ProjectShowcase from '../components/ProjectShowcase';
import { getFeaturedProjects } from '../data/project';

// Configure Geist Sans font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Configure Geist Mono font for code and technical content
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Home Page Component
 * Landing page for the blockchain developer portfolio
 */
export default function Home() {
  // Hero section configuration
  const heroConfig = {
    title: "Blockchain Developer & Smart Contract Engineer",
    subtitle: "Specialized in building secure and efficient decentralized applications with a focus on gas optimization and user experience.",
    achievements: [
      { id: "ethglobal", label: "🏆 EthGlobal Winner" },
      { id: "starkhack", label: "🚀 StarkHack Prize" },
      { id: "hackfs", label: "💎 HackFS Grand Prize" },
    ],
    ctaLink: "/projects",
    ctaText: "View Projects",
    secondaryCtaLink: "/resume.pdf",
    secondaryCtaText: "Download Resume",
    profileImage: "/profile.jpg",
  };
  
  // Get featured projects
  const featuredProjects = getFeaturedProjects();
  
  // Tech stack items to be displayed as badges
  const techStack = [
    "Solidity", "Ethereum", "Web3.js", "React", "Next.js", 
    "TypeScript", "Solana", "zkAuth", "IPFS"
  ];
  
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground`}>
      <Head>
        <title>Mrare Jimmy's Portfolio</title>
        <meta name="description" content="Expert blockchain developer specializing in Ethereum, Solana, and Web3 technologies" />
        <meta property="og:title" content="Blockchain Developer Portfolio" />
        <meta property="og:description" content="Expert blockchain developer specializing in Ethereum, Solana, and Web3 technologies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

  
      
      <main className="p-8 sm:p-16 space-y-16">
        {/* Hero Section */}
        <Hero {...heroConfig} />
        
        {/* Featured Projects Section */}
        <ProjectShowcase
          title="Featured Projects"
          description="A selection of my blockchain development work showcasing smart contracts, dApps, and Web3 integrations."
          projects={featuredProjects}
          viewAllLink="/projects"
        />
        
        {/* Tech Skills Section */}
        <section className="space-y-6 max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold">Technical Skills</h2>
          
          {/* Skills grid */}
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, index) => (
              <span 
                key={index} 
                className={`px-4 py-2 rounded-lg font-mono text-sm bg-gray-100 dark:bg-gray-800 
                  ${index % 3 === 0 ? 'border-l-4 border-blue-500' : 
                    index % 3 === 1 ? 'border-l-4 border-purple-500' : 
                      'border-l-4 border-green-500'}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="py-6 border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} • Built with Next.js and Tailwind CSS
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="https://github.com/mrarejimmyz" 
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/ashish-regmi/" 
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
            <a 
              href="https://x.com/HarveReg" 
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Twitter Profile"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
