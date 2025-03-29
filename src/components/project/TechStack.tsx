interface TechStackProps {
    technologies: string[];
  }
  
  export default function TechStack({ technologies }: TechStackProps) {
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    );
  }
  