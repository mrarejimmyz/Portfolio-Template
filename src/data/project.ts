import { MDXRemoteSerializeResult } from 'next-mdx-remote';

// This is the type expected by the ProjectShowcase component.
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

export interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  images: string[];
  githubUrl: string;
  liveUrl?: string;
  achievements?: string[];
  codeSnippet?: string;
  content?: MDXRemoteSerializeResult;
}

// Sample project data for fallback
export const sampleProjects: Record<string, ProjectDetails> = {
  "ethglobal-winner": {
    id: "ethglobal-winner",
    title: "EthGlobal Winning Project 2",
    description: "A decentralized application that won the EthGlobal hackathon",
    longDescription: "This project implements a novel approach to meta-transactions, allowing users to interact with smart contracts without paying gas fees. The implementation includes a relayer network and a sophisticated signature validation system.",
    techStack: ["Solidity", "Ethereum", "React", "Hardhat", "Ethers.js"],
    images: ["/projects/ethglobal-cover.png", "/projects/ethglobal-detail.png"],
    githubUrl: "https://github.com/yourusername/ethglobal-project",
    liveUrl: "https://ethglobal-demo.example.com",
    achievements: ["EthGlobal Hackathon Winner", "Featured in Ethereum Foundation blog"],
    codeSnippet: `
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;
      
      contract MetaTransactionHandler {
          mapping(address => uint256) public nonces;
          
          function executeMetaTransaction(
              address userAddress,
              bytes memory functionData,
              bytes32 r,
              bytes32 s,
              uint8 v
          ) public returns (bytes memory) {
              bytes32 digest = keccak256(
                  abi.encodePacked(
                      "\\x19Ethereum Signed Message:\\n32",
                      keccak256(abi.encodePacked(userAddress, nonces[userAddress], functionData))
                  )
              );
              
              require(ecrecover(digest, v, r, s) == userAddress, "Signature verification failed");
              nonces[userAddress]++;
              
              (bool success, bytes memory returnData) = address(this).call(functionData);
              require(success, "Function call failed");
              
              return returnData;
          }
      }`
  },
  "solana-monitor": {
    id: "solana-monitor",
    title: "Solana Transaction Monitor",
    description: "Real-time monitoring system for Solana blockchain transactions",
    longDescription: "A dashboard that tracks and analyzes transactions on the Solana blockchain in real-time. Features include custom alerts, performance metrics, and historical data visualization.",
    techStack: ["Solana", "Rust", "React", "WebSockets", "TypeScript"],
    images: ["/projects/solana-monitor-cover.png", "/projects/solana-monitor-detail.png"],
    githubUrl: "https://github.com/yourusername/solana-monitor",
    liveUrl: "https://solana-monitor.example.com"
  },
  "task-dao": {
    id: "task-dao",
    title: "Task DAO",
    description: "Decentralized autonomous organization for task management",
    longDescription: "Task DAO is a decentralized platform where communities can organize, assign, and reward tasks through a transparent governance system. It includes voting mechanisms, task verification, and token-based incentives.",
    techStack: ["Ethereum", "Solidity", "The Graph", "React", "IPFS"],
    images: ["/projects/taskdao-cover.png", "/projects/taskdao-detail.png"],
    githubUrl: "https://github.com/yourusername/task-dao",
    liveUrl: "https://taskdao.example.com",
    achievements: ["HackFS Grand Prize"]
  }
};

// Get all project IDs
export function getAllProjectIds() {
  return Object.keys(sampleProjects).map(id => ({ params: { id } }));
}

// Get project data by ID
export function getProjectData(id: string): ProjectDetails | null {
  return sampleProjects[id] || null;
}

// Get all projects data
export function getAllProjects(): ProjectDetails[] {
  return Object.values(sampleProjects);
}

export function getFeaturedProjects(): Project[] {
  const featuredIds = ["ethglobal-winner", "solana-monitor", "task-dao"];
  return featuredIds
    .map(id => sampleProjects[id]) // Get projects by ID
    .filter((project): project is ProjectDetails => project !== undefined) // Ensure project exists
    .map<Project>((project) => ({  // ✅ Explicitly define return type
      id: project.id,
      title: project.title,
      description: project.description,
      tags: project.techStack ?? [], // ✅ Ensure it's always an array
      image: project.images?.[0] ?? "/images/default.png", // ✅ Ensure fallback image
    }));
}


