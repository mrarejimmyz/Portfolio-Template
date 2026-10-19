import Head from 'next/head';
import { Geist, Geist_Mono } from 'next/font/google';

import Hero from '../components/Hero';
import ProjectShowcase from '../components/ProjectShowcase';
import PortfolioFeatures from '../components/PortfolioFeatures';
import ExperienceSection from '../components/ExperienceSection';
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
    title: 'Senior Software Engineer: AI, Backend & Full-Stack',
    subtitle:
      'I build production AI systems and backend infrastructure. Lead Developer @ ZKward, Waterloo, Ontario. 5x hackathon winner.',
    achievements: [
      { id: 'ethglobal', label: '🏆 Best Sign in with Worldcoin App, ETHGlobal Waterloo 2023 (P2PLend)' },
      { id: 'hackfs', label: '💎 Filecoin Privacy Tools Winner, HackFS 2024 (HimalayaZkBarrier)' },
      { id: 'starkhack', label: '🚀 Triple Winner, StarkHack 2024: Herodotus, Voyager, Dynamic (Sunya)' },
      { id: 'seed-grant', label: '🌱 Starknet Foundation Seed Grant Recipient (Sunya)' },
    ],
    ctaLink: '/projects',
    ctaText: 'View Projects',
    secondaryCtaLink: '/resume.pdf',
    secondaryCtaText: 'Download Resume',
    tertiaryCtaLink: '/contact',
    tertiaryCtaText: 'Get in Touch',
    contactLinks: [
      { href: 'mailto:wanemregmi@gmail.com', label: 'wanemregmi@gmail.com' },
      { href: 'tel:+15199039794', label: '+1 519 903 9794' },
      { href: 'https://github.com/mrarejimmyz', label: 'github.com/mrarejimmyz' },
    ],
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
    'GraphQL', // Modern API query language for efficient data fetching
    'WebSocket', // Enables real-time communication in web applications
    'IPFS', // Decentralized file storage solution
    'Docker', // Standard tool for containerization and deployment
    'CI/CD', // Best practices for continuous integration and deployment
    'Apex', // Specialized for Salesforce development (niche but valuable)
  ];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground`}>
      <Head>
        <title>Ashish Regmi | Senior Software Engineer</title>
        <meta name="description" content="Ashish Regmi, Senior Software Engineer in Waterloo, Ontario. AI agents, backend systems, and full-stack development. 5x hackathon winner." />
        <meta property="og:title" content="Ashish Regmi | Senior Software Engineer" />
        <meta property="og:description" content="Ashish Regmi, Senior Software Engineer in Waterloo, Ontario. AI agents, backend systems, and full-stack development. 5x hackathon winner." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="space-y-14 px-4 py-5 sm:px-8 sm:py-8">
        {/* Hero Section */}
        <Hero {...heroConfig} />

        {/* Featured Projects Section */}
        <ProjectShowcase
          title="Featured Projects"
          description="Selected work in AI agents, backend systems, privacy, and full-stack development."
          projects={featuredProjects}
          viewAllLink="/projects"
        />

        <ExperienceSection />

        {/* Tech Skills Section */}
        <section className="mx-auto max-w-6xl space-y-5">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">Technical Skills</h2>

          {/* Skills grid */}
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
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
