import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
// import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ProjectDetails, sampleProjects } from '../data/project';

// Path to the projects directory
const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

// Get all project files
export function getProjectFiles() {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  
  return fs.readdirSync(projectsDirectory)
    .filter(fileName => fileName.endsWith('.mdx'));
}

// Get all project paths for getStaticPaths
export function getAllProjectPaths() {
  const projectFiles = getProjectFiles();
  
  // If there are no MDX files, use sample projects
  if (projectFiles.length === 0) {
    return Object.keys(sampleProjects).map(id => ({
      params: { id }
    }));
  }
  
  // Otherwise, use the MDX files
  return projectFiles.map(fileName => ({
    params: {
      id: fileName.replace(/\.mdx$/, ''),
    },
  }));
}

// Get project data from MDX file
export async function getProjectFromMDX(id: string): Promise<ProjectDetails | null> {
  const mdxPath = path.join(projectsDirectory, `${id}.mdx`);
  
  // Check if MDX file exists
  if (!fs.existsSync(mdxPath)) {
    return null;
  }
  
  // Read MDX file
  const fileContents = fs.readFileSync(mdxPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Get sample data for other fields
  const sampleData = sampleProjects[id] || {
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
  const project: ProjectDetails = {
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
  
  return project;
}
