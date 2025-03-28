import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Navbar from '../../components/Navbar';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult, MDXRemote } from 'next-mdx-remote';


// Define TypeScript interface for project data
interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  images: string[];
  githubUrl: string;
  liveUrl?: string; // Optional
  achievements?: string[];
  codeSnippet?: string;
  content?: MDXRemoteSerializeResult; // Updated type
}

/**
 * MDX components for rendering project case studies
 */
/**
 * MDX components for rendering project case studies
 */
const components = {
  h1: (props: React.ComponentProps<'h1'>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="text-xl font-bold mt-5 mb-2" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="my-4 text-lg" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a className="text-blue-600 hover:underline dark:text-blue-400" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="list-disc pl-6 my-4" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="list-decimal pl-6 my-4" {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <li className="my-2" {...props} />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props} />
  ),
  code: ({ className, children, ...props }: { 
    className?: string; 
    children: React.ReactNode; 
  } & Partial<SyntaxHighlighterProps & React.HTMLAttributes<HTMLElement>>) => {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <SyntaxHighlighter
        language={match[1]}
        style={atomDark}
        className="rounded-md my-4"
        showLineNumbers
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono" {...props}>
        {children}
      </code>
    );
  },
  img: ({ src, alt }: { src: string; alt?: string }) => (
    <div className="relative w-full h-64 sm:h-96 my-6">
      <Image 
        src={src} 
        alt={alt || "Project image"} 
        fill 
        style={{ objectFit: "cover" }}
        className="rounded-lg"
      />
    </div>
  ),
  Diagram: ({ src, alt, caption }: { src: string; alt?: string; caption?: string }) => (
    <figure className="my-8">
      <div className="relative w-full h-64 sm:h-96">
        <Image 
          src={src} 
          alt={alt || "Architecture diagram"} 
          fill 
          style={{ objectFit: "contain" }}
          className="rounded-lg bg-white dark:bg-gray-900 p-4"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  ),
};

/**
 * Project Detail Page Component
 * Displays detailed information about a specific project
 */
export default function ProjectDetail({ project }: { project: ProjectDetails }) {
  const router = useRouter();
  
  // If page is not yet generated, show loading state
  if (router.isFallback) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title} | Blockchain Developer Portfolio</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} | Portfolio`} />
        <meta property="og:description" content={project.description} />
        {project.images.length > 0 && (
          <meta property="og:image" content={project.images[0]} />
        )}
      </Head>

      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link 
          href="/projects" 
          className="inline-flex items-center mb-8 text-sm font-medium hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>

        {/* Project header */}
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>
          
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View Code
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </header>

        {/* Project images */}
        {project.images.length > 0 && (
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.map((image, index) => (
              <div key={index} className="relative h-64 sm:h-80 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

        {/* Project description - rendered from MDX if available */}
        <div className="mb-12">
          {project.content ? (
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <MDXRemote {...project.content} components={components} />
            </article>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <p className="text-lg leading-relaxed mb-6">{project.longDescription}</p>

              {/* Achievements */}
              {project.achievements && project.achievements.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Achievements</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {project.achievements.map((achievement, index) => (
                      <li key={index} className="text-lg">{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* Code snippet */}
        {project.codeSnippet && !project.content && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Code Highlight</h2>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto">
              <SyntaxHighlighter
                language="javascript"
                style={atomDark}
                showLineNumbers
              >
                {project.codeSnippet}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Get static paths for all projects
 */
export async function getStaticPaths() {
  // Get all MDX files from the projects directory
  const projectsDirectory = path.join(process.cwd(), 'src/content/projects');
  
  let paths = [];
  
  // Check if directory exists - if not, use dummy paths
  if (fs.existsSync(projectsDirectory)) {
    const fileNames = fs.readdirSync(projectsDirectory);
    paths = fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => ({
        params: {
          id: fileName.replace(/\.mdx$/, ''),
        },
      }));
  } else {
    // Fallback paths for common projects
    paths = [
      { params: { id: 'ethglobal-winner' } },
      { params: { id: 'solana-monitor' } },
      { params: { id: 'task-dao' } }
    ];
  }
  
  return {
    paths,
    fallback: 'blocking',
  };
}

/**
 * Get static props for a specific project
 */
export async function getStaticProps({ params }: { params: { id: string } }) {
  const { id } = params;
  const projectsDirectory = path.join(process.cwd(), 'src/content/projects');
  const mdxPath = path.join(projectsDirectory, `${id}.mdx`);
  
  let project: ProjectDetails;
  
  // Sample project data - normally this would come from an API or database
  const sampleProjects = {
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
                "\x19Ethereum Signed Message:\n32",
                keccak256(abi.encodePacked(userAddress, nonces[userAddress], functionData))
            )
        );
        
        require(ecrecover(digest, v, r, s) == userAddress, "Signature verification failed");
        nonces[userAddress]++;
        
        (bool success, bytes memory returnData) = address(this).call(functionData);
        require(success, "Function call failed");
        
        return returnData;
    }
}
`
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
  
  // Check if MDX file exists
  if (fs.existsSync(mdxPath)) {
    // Read MDX file
    const fileContents = fs.readFileSync(mdxPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Get sample data for other fields
    const sampleData = sampleProjects[id as keyof typeof sampleProjects] || {
      id,
      title: data.title || "Project Title",
      description: data.description || "Project Description",
      longDescription: "",
      techStack: data.techStack || [],
      images: data.images || [],
      githubUrl: data.githubUrl || "#",
      liveUrl: data.liveUrl,
      achievements: data.achievements
    };
    
    // Merge MDX frontmatter with sample data
    project = {
      ...sampleData,
      ...data,
      id
    };
    
    // Serialize MDX content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
      scope: data,
    });
    
    project.content = mdxSource;
  } else {
    // If no MDX file, use sample data
    project = sampleProjects[id as keyof typeof sampleProjects] || {
      id,
      title: "Project Not Found",
      description: "This project could not be found",
      longDescription: "Details about this project are not available.",
      techStack: [],
      images: [],
      githubUrl: "#"
    };
  }

  return {
    props: {
      project,
    },
    // Revalidate once per day
    // revalidate: 86400,
  };
}
