/**
 * Project data type definition
 */
export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    tags: string[];
    image: string;
    githubUrl?: string;
    demoUrl?: string;
    featured: boolean;
  }
  
  /**
   * Featured and sample projects data
   */
  export const projects: Project[] = [
    {
      id: "ethglobal-winner",
      title: "EthGlobal Winning Project",
      description: "A decentralized application that won the EthGlobal hackathon for innovative meta-transactions implementation.",
      longDescription: "This project implements a novel approach to meta-transactions, allowing users to interact with smart contracts without paying gas fees. The implementation includes a relayer network and sophisticated signature validation system.",
      tags: ["Ethereum", "Solidity", "React", "Web3.js"],
      image: "/project-eth.png",
      githubUrl: "https://github.com/yourusername/ethglobal-project",
      demoUrl: "https://ethglobal-demo.example.com",
      featured: true
    },
    {
      id: "solana-monitor",
      title: "Solana Transaction Monitor",
      description: "Real-time monitoring system for Solana blockchain transactions with performance analytics and alerts.",
      longDescription: "A dashboard that tracks and analyzes transactions on the Solana blockchain in real-time. Features include custom alerts, performance metrics, and historical data visualization.",
      tags: ["Solana", "Rust", "React", "WebSockets"],
      image: "/project-solana.png",
      githubUrl: "https://github.com/yourusername/solana-monitor",
      demoUrl: "https://solana-monitor.example.com",
      featured: true
    },
    {
      id: "task-dao",
      title: "Task DAO",
      description: "Decentralized autonomous organization for task management and community incentives.",
      longDescription: "Task DAO is a decentralized platform where communities can organize, assign, and reward tasks through a transparent governance system. It includes voting mechanisms, task verification, and token-based incentives.",
      tags: ["DAO", "Smart Contracts", "The Graph", "IPFS"],
      image: "/project-dao.png",
      githubUrl: "https://github.com/yourusername/task-dao",
      featured: true
    },
    {
      id: "defi-dashboard",
      title: "DeFi Analytics Dashboard",
      description: "Comprehensive dashboard for tracking DeFi portfolio performance across multiple protocols.",
      tags: ["React", "Web3.js", "GraphQL", "Chart.js"],
      image: "/project-defi.png",
      githubUrl: "https://github.com/yourusername/defi-dashboard",
      featured: false
    },
    {
      id: "nft-marketplace",
      title: "NFT Marketplace",
      description: "A platform for creating, listing, and trading NFTs with integrated royalty management.",
      tags: ["ERC-721", "Next.js", "Ethers.js", "IPFS"],
      image: "/project-nft.png",
      githubUrl: "https://github.com/yourusername/nft-marketplace",
      featured: false
    }
  ];
  
  /**
   * Get featured projects
   */
  export function getFeaturedProjects(): Project[] {
    return projects.filter(project => project.featured);
  }
  
  /**
   * Get all projects
   */
  export function getAllProjects(): Project[] {
    return projects;
  }
  
  /**
   * Get project by ID
   */
  export function getProjectById(id: string): Project | undefined {
    return projects.find(project => project.id === id);
  }
  