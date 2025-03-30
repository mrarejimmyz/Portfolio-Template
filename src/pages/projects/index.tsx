import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Import the synchronous version for static site generation
import { getAllProjectsSync } from '../../data/project';


interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  images: string[];
  githubUrl: string;
  liveUrl?: string;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<string>('all');
  
  // Extract all unique technologies from projects
  const allTechnologies: string[] = [
    ...new Set(projects.flatMap((project: Project) => project.techStack))
  ];
  
  // Filter projects based on selected technology
  const filteredProjects: Project[] = filter === 'all' 
    ? projects 
    : projects.filter((project: Project) => project.techStack.includes(filter));

  return (
    <>
      <Head>
        <title>Projects | Blockchain Developer Portfolio</title>
        <meta name="description" content="Explore my blockchain development projects, including smart contracts, dApps, and Web3 integrations." />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of my blockchain development work, showcasing smart contracts, decentralized applications, and Web3 integrations.
          </p>
        </header>

        {/* Filter by technology */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Filter by Technology</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All Projects
            </button>
            {allTechnologies.map((tech: string) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === tech
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project: Project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                {project.images && project.images.length > 0 ? (
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack && project.techStack.slice(0, 3).map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack && project.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              No projects match the selected filter.
            </p>
            <button
              onClick={() => setFilter('all')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export function getStaticProps() {
  // Use the synchronous version for static site generation
  const projects = getAllProjectsSync();
  
  return {
    props: {
      projects,
    },
  };
}
