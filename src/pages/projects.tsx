import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Define TypeScript interfaces for project data
interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  featured: boolean;
  category: string;
}

interface CategoryFilter {
  id: string;
  name: string;
}

/**
 * Projects Page Component
 * Displays a collection of blockchain and development projects
 */
export default function Projects() {
  // Sample projects data - In a real application, this would come from an API or CMS
  const projects: Project[] = [
    {
      id: "ethglobal-winner",
      title: "EthGlobal Winning Project",
      description: "A decentralized application that won the EthGlobal hackathon for its innovative approach to meta-transactions.",
      techStack: ["Solidity", "Ethereum", "React", "Hardhat"],
      image: "/projects/ethglobal-cover.png",
      featured: true,
      category: "ethereum"
    },
    {
      id: "solana-monitor",
      title: "Solana Transaction Monitor",
      description: "Real-time monitoring system for Solana blockchain transactions with performance analytics.",
      techStack: ["Solana", "Rust", "React", "WebSockets"],
      image: "/projects/solana-monitor-cover.png",
      featured: true,
      category: "solana"
    },
    {
      id: "task-dao",
      title: "Task DAO",
      description: "Decentralized autonomous organization for task management and community incentives.",
      techStack: ["Ethereum", "Solidity", "The Graph", "IPFS"],
      image: "/projects/taskdao-cover.png",
      featured: true,
      category: "ethereum"
    },
    {
      id: "defi-dashboard",
      title: "DeFi Analytics Dashboard",
      description: "Comprehensive dashboard for tracking DeFi portfolio performance across multiple protocols.",
      techStack: ["React", "Web3.js", "GraphQL", "Chart.js"],
      image: "/projects/defi-dashboard-cover.png",
      featured: false,
      category: "defi"
    },
    {
      id: "nft-marketplace",
      title: "NFT Marketplace",
      description: "A platform for creating, listing, and trading NFTs with integrated royalty management.",
      techStack: ["ERC-721", "Next.js", "Ethers.js", "Pinata"],
      image: "/projects/nft-marketplace-cover.png",
      featured: false,
      category: "nft"
    },
    {
      id: "zkp-voting",
      title: "Zero-Knowledge Voting System",
      description: "Anonymous voting system using zero-knowledge proofs to ensure voter privacy.",
      techStack: ["ZK-SNARKs", "Circom", "Solidity", "React"],
      image: "/projects/zkp-voting-cover.png",
      featured: false,
      category: "privacy"
    }
  ];

  // Category filters for projects
  const categories: CategoryFilter[] = [
    { id: 'all', name: 'All Projects' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'solana', name: 'Solana' },
    { id: 'defi', name: 'DeFi' },
    { id: 'nft', name: 'NFT' },
    { id: 'privacy', name: 'Privacy' }
  ];

  // State for active category filter
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter projects based on selected category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <>
      <Head>
        <title>Projects | Blockchain Developer Portfolio</title>
        <meta name="description" content="Showcase of blockchain and Web3 development projects including Ethereum smart contracts, Solana programs, and DeFi applications." />
        <meta property="og:title" content="Projects | Blockchain Developer Portfolio" />
        <meta property="og:description" content="Showcase of blockchain and Web3 development projects including Ethereum smart contracts, Solana programs, and DeFi applications." />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of blockchain projects showcasing expertise in smart contracts, Web3 integration, and decentralized applications.
          </p>
        </header>

        {/* Category filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured projects section - only shown when filter is "all" */}
        {activeCategory === 'all' && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {projects
                .filter(project => project.featured)
                .map(project => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="group block overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
                  >
                    {/* Project image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Featured badge */}
                      <span className="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                        Featured
                      </span>
                    </div>
                    
                    {/* Project content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {project.description}
                      </p>
                      
                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, index) => (
                          <span 
                            key={index} 
                            className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                        View details
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* All projects grid */}
        <div>
          <h2 className="text-2xl font-bold mb-8">
            {activeCategory === 'all' ? 'All Projects' : `${categories.find(cat => cat.id === activeCategory)?.name || 'Projects'}`}
          </h2>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects
              .filter(project => activeCategory !== 'all' || !project.featured)
              .map(project => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group block overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
                >
                  {/* Project image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Category badge */}
                    <span className="absolute top-3 right-3 px-3 py-1 bg-gray-900/80 text-white text-xs rounded-full">
                      {categories.find(cat => cat.id === project.category)?.name || project.category}
                    </span>
                  </div>
                  
                  {/* Project content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    
                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                      View details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          
          {/* Empty state for when no projects match the filter */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-300">
                No projects found in this category.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                View all projects
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
