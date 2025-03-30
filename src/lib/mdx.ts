import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ProjectDetails, sampleProjects } from '../data/project';

const projectsDirectory = path.join(process.cwd(), 'src', 'content', 'projects');

console.log('Current working directory:', process.cwd());
console.log('Projects directory path:', projectsDirectory);
console.log('Directory exists:', fs.existsSync(projectsDirectory));
console.log('Files in directory:', fs.existsSync(projectsDirectory) ? 
  fs.readdirSync(projectsDirectory) : 'Directory not found');

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

export function getAllProjectPaths() {
  const projectFiles = getProjectFiles();
  console.log('Project files found:', projectFiles);
  
  if (projectFiles.length === 0) {
    console.log('No MDX files found, using sample projects');
    return Object.keys(sampleProjects).map(id => ({ params: { id } }));
  }
  
  return projectFiles.map(fileName => ({
    params: { id: fileName.replace(/\.mdx$/, '') },
  }));
}

export function getProjectFromMDXSync(id: string): ProjectDetails | null {
  try {
    const mdxPath = path.join(projectsDirectory, `${id}.mdx`);
    console.log(`Checking MDX file: ${mdxPath}`);
    
    if (!fs.existsSync(mdxPath)) {
      console.log(`MDX file not found: ${mdxPath}`);
      return null;
    }
    
    console.log(`Processing MDX file: ${mdxPath}`);
    const fileContents = fs.readFileSync(mdxPath, 'utf8');
    const { data, content } = matter(fileContents);
    console.log(`MDX frontmatter for ${id}:`, data);
    
    const sampleData = sampleProjects[id] || {
      id,
      title: data.title || "Project Title",
      description: data.description || "Project Description",
      longDescription: "",
      techStack: data.techStack || [],
      images: data.images || [],
      githubUrl: data.githubUrl || "#",
      liveUrl: data.liveUrl || null,
      achievements: data.achievements || []
    };
    
    const project: ProjectDetails = {
      ...sampleData,
      ...data,
      id,
      techStack: Array.isArray(data.techStack) ? data.techStack : [],
      images: Array.isArray(data.images) ? data.images : [],
      rawContent: content
    };
    
    console.log(`MDX content processed for ${id}`);
    return project;
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
  const projectIds = getAllProjectPaths().map(({ params }) => params.id);
  const projects = projectIds.map(id => getProjectDataSync(id));
  return projects.filter((project): project is ProjectDetails => project !== null);
}

export function getFeaturedProjectsSync(): ProjectDetails[] {
  const featuredIds = ["ethglobal-winner", "solana-monitor", "task-dao"];
  return featuredIds
    .map(id => getProjectDataSync(id))
    .filter((project): project is ProjectDetails => project !== null);
}
