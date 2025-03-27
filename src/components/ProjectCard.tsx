import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/**
 * TypeScript interface for project data
 */
interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

/**
 * ProjectCard Component
 * 
 * A reusable card component for displaying project information,
 * including image, title, description, tags, and links to GitHub/demo.
 */
export default function ProjectCard({
  id,
  title,
  description,
  tags,
  image,
  githubUrl,
  demoUrl,
  featured = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project image with hover effect */}
      <Link href={`/projects/${id}`}>
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            style={{ 
              objectFit: "cover",
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease-in-out'
            }}
          />
          {featured && (
            <span className="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
              Featured
            </span>
          )}
        </div>
      </Link>
      
      {/* Project details */}
      <div className="p-5 space-y-3">
        <Link href={`/projects/${id}`}>
          <h3 className="text-xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>
        
        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3 pt-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              aria-label={`View ${title} code on GitHub`}
            >
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Code
            </a>
          )}
          
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              aria-label={`View ${title} live demo`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
