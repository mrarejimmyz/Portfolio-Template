import Link from 'next/link';
import ProjectCard from './ProjectCard';

/**
 * TypeScript interface for project data
 */
interface Project {
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
 * TypeScript interface for ProjectShowcase props
 */
interface ProjectShowcaseProps {
  title: string;
  description?: string;
  projects: Project[];
  viewAllLink?: string;
  limit?: number;
}

/**
 * ProjectShowcase Component
 * 
 * Displays a collection of projects using the ProjectCard component.
 * Includes a header with title, optional description, and view all link.
 */
export default function ProjectShowcase({
  title,
  description,
  projects,
  viewAllLink,
  limit
}: ProjectShowcaseProps) {
  // Limit the number of projects if specified
  const displayedProjects = limit ? projects.slice(0, limit) : projects;
  
  return (
    <section className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h2>
          {description && (
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              {description}
            </p>
          )}
        </div>
        
        {viewAllLink && (
          <Link 
            href={viewAllLink} 
            className="text-sm font-medium hover:underline text-blue-600 dark:text-blue-400 flex items-center"
          >
            View all
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        )}
      </div>
      
      {/* Projects grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
          />
        ))}
      </div>
      
      {/* Show empty state if no projects */}
      {displayedProjects.length === 0 && (
        <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No projects to display</p>
        </div>
      )}
    </section>
  );
}
