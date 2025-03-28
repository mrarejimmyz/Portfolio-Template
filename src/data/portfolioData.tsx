// data/portfolioData.tsx
export interface ProjectItem {
  title: string;
  description: string;
  link: string;
}

export interface HackathonWin {
  title: string;
  description: string;
  year: string;
  link: string;
}

export interface CaseStudy {
  title: string;
  description: string;
  link: string;
}

export interface PortfolioData {
  experience?: string;
  keywords?: string[];
  projects?: ProjectItem[];
  wins?: HackathonWin[];
  casestudy?: CaseStudy;
}

export type PortfolioSection = 'solana' | 'hackathons' | 'ipfs';

export const portfolioData: Record<PortfolioSection, PortfolioData> = {
  solana: {
    experience: "Led development of Solana-based prediction platform with AI and NFT integration. Engineered a high-throughput, distributed system handling 5,000+ TPS.",
    projects: [
      {
        title: "Solana Transaction Monitor",
        description: "Real-time monitoring system using Rust/WebSocket (5,000+ TPS)",
        link: "/projects/solana-monitor"
      }
    ],
    keywords: ["solana", "transaction", "rust", "websocket", "tps"]
  },
  
  hackathons: {
    wins: [
      {
        title: "EthGlobal 2023 Winner",
        description: "World Coin integration with 92% Sybil attack reduction",
        year: "2023",
        link: "/awards#ethglobal"
      },
      {
        title: "HackFS Grand Prize",
        description: "ZK+FHE Storage Solution for Filecoin + Protocol Labs",
        year: "2024",
        link: "/awards#hackfs"
      },
      {
        title: "StarkHack",
        description: "Meta transactions with 98% gas reduction",
        year: "2024",
        link: "/awards#starkhack"
      }
    ],
    keywords: ["hackathon", "award", "win", "prize", "ethglobal", "hackfs", "starkhack"]
  },
  
  ipfs: {
    experience: "Successfully deployed portfolio website on IPFS for decentralized hosting, overcoming challenges with Next.js configuration and gateway access.",
    casestudy: {
      title: "Decentralizing My Portfolio with IPFS",
      description: "A detailed walkthrough of deploying a Next.js application on IPFS, including configuration challenges and solutions.",
      link: "/blog/ipfs-deployment"
    },
    keywords: ["ipfs", "deployment", "decentralized", "hosting", "gateway"]
  }
};
