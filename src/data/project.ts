import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
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

// Path to the projects directory
const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

// Sample project data for fallback
export const sampleProjects: Record<string, ProjectDetails> = {
  "ethglobal-winner": {
    id: "ethglobal-winner",
    title: "EthGlobal Winning Project",
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

// Get all project files from the content directory
export function getProjectFiles(): string[] {
  try {
    if (!fs.existsSync(projectsDirectory)) {
      console.warn(`Projects directory not found: ${projectsDirectory}`);
      return [];
    }
    
    return fs.readdirSync(projectsDirectory)
      .filter(fileName => fileName.endsWith('.mdx'));
  } catch (error) {
    console.error('Error reading project files:', error);
    return [];
  }
}

// Get all project IDs from both MDX files and sample data
export function getAllProjectIds() {
  const mdxProjects = getProjectFiles().map(fileName => 
    fileName.replace(/\.mdx$/, '')
  );
  
  const sampleIds = Object.keys(sampleProjects);
  
  // Combine and deduplicate IDs
  const allIds = [...new Set([...mdxProjects, ...sampleIds])];
  
  return allIds.map(id => ({ params: { id } }));
}

// Get project data from MDX file
export async function getProjectFromMDX(id: string): Promise<ProjectDetails | null> {
  try {
    const mdxPath = path.join(projectsDirectory, `${id}.mdx`);
    
    if (!fs.existsSync(mdxPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(mdxPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Serialize MDX content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
      scope: data,
    });
    
    return {
      id,
      title: data.title || "",
      description: data.description || "",
      longDescription: data.longDescription || data.description || "",
      techStack: data.techStack || [],
      images: data.images || [],
      githubUrl: data.githubUrl || "#",
      liveUrl: data.liveUrl,
      achievements: data.achievements || [],
      content: mdxSource
    };
  } catch (error) {
    console.error(`Error processing MDX file for project ${id}:`, error);
    return null;
  }
}

// Get project data by ID, first trying MDX then falling back to samples
export async function getProjectData(id: string): Promise<ProjectDetails | null> {
  // Try to get from MDX first
  const mdxProject = await getProjectFromMDX(id);
  if (mdxProject) {
    console.log(`Loaded project ${id} from MDX file`);
    return mdxProject;
  }
  
  // Fall back to sample data
  console.log(`Using sample data for project ${id}`);
  return sampleProjects[id] || null;
}

// Get all projects data, combining MDX and samples
export async function getAllProjects(): Promise<ProjectDetails[]> {
  // const mdxFiles = getProjectFiles();
  const projectIds = getAllProjectIds().map(({ params }) => params.id);
  
  // Process all project IDs
  const projects = await Promise.all(
    projectIds.map(async (id) => await getProjectData(id))
  );
  
  // Filter out any null values and return
  return projects.filter((project): project is ProjectDetails => project !== null);
}

// Get featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  const featuredIds = ["ethglobal-winner", "solana-monitor", "task-dao"];
  
  const projects = await Promise.all(
    featuredIds.map(id => getProjectData(id))
  );
  
  return projects
    .filter((project): project is ProjectDetails => project !== null)
    .map<Project>((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      tags: project.techStack ?? [],
      image: project.images?.[0] ?? "/images/default.png",
    }));
}

// Synchronous version of getFeaturedProjects for static site generation
export function getFeaturedProjectsSync(): Project[] {
  const featuredIds = ["ethglobal-winner", "solana-monitor", "task-dao"];
  return featuredIds
    .map(id => sampleProjects[id]) // Get projects by ID
    .filter((project): project is ProjectDetails => project !== undefined) // Ensure project exists
    .map<Project>((project) => ({  // Explicitly define return type
      id: project.id,
      title: project.title,
      description: project.description,
      tags: project.techStack ?? [], // Ensure it's always an array
      image: project.images?.[0] ?? "/images/default.png", // Ensure fallback image
    }));
}

// Synchronous version of getAllProjects for static site generation
export function getAllProjectsSync(): ProjectDetails[] {
  return Object.values(sampleProjects);
}
