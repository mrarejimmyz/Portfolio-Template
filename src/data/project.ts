import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

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
  rawContent?: string;
}

const projectsDirectory = path.join(process.cwd(), 'src', 'content', 'projects');

console.log('Current working directory:', process.cwd());
console.log('Projects directory path:', projectsDirectory);
console.log('Directory exists:', fs.existsSync(projectsDirectory));
console.log('Files in directory:', fs.existsSync(projectsDirectory) ? 
  fs.readdirSync(projectsDirectory) : 'Directory not found');

export const sampleProjects: Record<string, ProjectDetails> = {
  // ... (keep the existing sample projects)
};

export function getProjectFiles(): string[] {
  try {
    if (!fs.existsSync(projectsDirectory)) {
      console.warn(`Projects directory not found: ${projectsDirectory}`);
      return [];
    }
    return fs.readdirSync(projectsDirectory).filter(fileName => fileName.endsWith('.mdx'));
  } catch (error) {
    console.error('Error reading project files:', error);
    return [];
  }
}

export function getAllProjectIds() {
  const mdxProjects = getProjectFiles().map(fileName => fileName.replace(/\.mdx$/, ''));
  const sampleIds = Object.keys(sampleProjects);
  const allIds = [...new Set([...mdxProjects, ...sampleIds])];
  return allIds.map(id => ({ params: { id } }));
}

export function getProjectFromMDXSync(id: string): ProjectDetails | null {
  try {
    const mdxPath = path.join(projectsDirectory, `${id}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(mdxPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      id,
      title: data.title || "",
      description: data.description || "",
      longDescription: data.longDescription || data.description || "",
      techStack: data.techStack || [],
      images: data.images || [],
      githubUrl: data.githubUrl || "#",
      liveUrl: data.liveUrl || null,
      achievements: data.achievements || [],
      rawContent: content
    };
  } catch (error) {
    console.error(`Error processing MDX file for project ${id}:`, error);
    return null;
  }
}

export function getProjectDataSync(id: string): ProjectDetails | null {
  const mdxProject = getProjectFromMDXSync(id);
  if (mdxProject) {
    console.log(`Loaded project ${id} from MDX file`);
    return mdxProject;
  }
  console.log(`Using sample data for project ${id}`);
  return sampleProjects[id] || null;
}

export function getAllProjectsSync(): ProjectDetails[] {
  const projectIds = getAllProjectIds().map(({ params }) => params.id);
  const projects = projectIds.map(id => getProjectDataSync(id));
  return projects.filter((project): project is ProjectDetails => project !== null);
}

export function getFeaturedProjectsSync(): Project[] {
  const featuredIds = ["ai-secure-fund-dao", "prophecy-jimpsons", "east-llm"];
  return featuredIds
    .map(id => getProjectDataSync(id))
    .filter((project): project is ProjectDetails => project !== null)
    .map<Project>((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      tags: project.techStack,
      image: project.images?.[0] ?? "/images/default.png",
    }));
}
