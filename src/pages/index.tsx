import Head from 'next/head';
import { Geist, Geist_Mono } from 'next/font/google';

import Hero from '../components/Hero';
import ProjectShowcase from '../components/ProjectShowcase';
import PortfolioFeatures from '../components/PortfolioFeatures';
import Footer from '@/components/Footer';
import { getFeaturedProjectsSync, Project } from '../data/project';

// Configure Geist Sans font
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// Configure Geist Mono font for code and technical content
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Define the prop types for the Home component
interface HomeProps {
  featuredProjects: Project[];
}

/**
 * Home Page Component
 * Landing page for the blockchain developer portfolio
 */
export default function Home({ featuredProjects }: HomeProps) {
  // Hero section configuration
  const heroConfig = {
    title: 'Blockchain Developer, Smart Contract & AI Engineer',
    subtitle:
      'Building next-gen decentralized and AI-powered systems with cutting-edge efficiency, optimized gas usage, and breakthrough scalability.',
    quote: "I may not have all the answers yet, but I'll go out and find them.",
    achievements: [
      { id: 'ethglobal', label: '🏆 EthGlobal 2023 Winner - WorldCoin zkAuth' },
      { id: 'hackfs', label: '💎 HackFS Prize - ZK + FHE Storage Solution' },
      { id: 'starkhack', label: '🚀 StarkHack Grant Prize - 98% Gas Reduction via Meta Transactions' },
      { id: 'east', label: '🤖 Developed EAST Implementation for LLM Models' },
    ],
    ctaLink: '/projects',
    ctaText: 'View Projects',
    secondaryCtaLink: '/resume.pdf',
    secondaryCtaText: 'Download Resume',
    profileImage: '/profile.jpg',
  };

  // Tech stack items to be displayed as badges
  const techStack = [
    'Rust', // Trending for high-performance systems (e.g., Solana Transaction Monitor)
    'Python', // Popular for backend development and AI integration
    'JavaScript/TypeScript', // In-demand for modern web and full-stack development
    'Solidity', // Primary language for Ethereum smart contracts
    'ZK Proofs', // Cutting-edge technology for secure, privacy-preserving applications
    'Web3.js', // Essential for interacting with blockchain networks
    'Anchor', // Streamlines Solana smart contract development
    'Solana', // High-performance blockchain gaining momentum
    'Ethereum', // Established blockchain platform for DApps
    'ReactJS', // Dominant frontend framework for building dynamic user interfaces
    'NodeJS', // Robust backend runtime for JavaScript applications
    'Django', // Versatile Python web framework for scalable APIs
    'GraphQL', // Modern API query language for efficient data fetching
    'WebSocket', // Enables real-time communication in web applications
    'IPFS', // Decentralized file storage solution
    'Docker', // Standard tool for containerization and deployment
    'Google Cloud', // Scalable cloud infrastructure provider
    'CI/CD', // Best practices for continuous integration and deployment
    'Apex', // Specialized for Salesforce development (niche but valuable)
  ];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground`}>
      <Head>
        <title>Mrare Jimmy&apos;s Portfolio</title>
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
          description="A selection of my blockchain and AI development work showcasing smart contracts, dApps, Web3 integrations, and AI-powered solutions."
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
                className={`px-4 py-2 rounded-lg font-mono text-sm bg-gray-100 dark:bg-gray-800 ${
                  index % 3 === 0
                    ? 'border-l-4 border-blue-500'
                    : index % 3 === 1
                    ? 'border-l-4 border-purple-500'
                    : 'border-l-4 border-green-500'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Portfolio Features Section */}
        <PortfolioFeatures />
      </main>

      <Footer />
    </div>
  );
}

// Fetch featured projects at build time
export async function getStaticProps() {
  const featuredProjects = getFeaturedProjectsSync();
  return {
    props: {
      featuredProjects,
    },
  };
}
