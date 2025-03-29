import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';


import Header from '../../components/project/Header';
// import TechStack from '../../components/project/TechStack';
import Gallery from '../../components/project/Gallery';
import CodeSnippet from '../../components/project/CodeSnippet';

import { ProjectDetails, getProjectData } from '../../data/project';
import { getAllProjectPaths, getProjectFromMDX } from '../../lib/mdx';

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
        <Header project={project} />

        {/* Project images */}
        <Gallery images={project.images} title={project.title} />

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
          <CodeSnippet 
            code={project.codeSnippet} 
            language="javascript" 
            title="Code Highlight" 
          />
        )}
      </div>
    </>
  );
}

/**
 * Get static paths for all projects
 */
export async function getStaticPaths() {
  const paths = getAllProjectPaths();
  
  return {
    paths,
    fallback: false,
  };
}

/**
 * Get static props for a specific project
 */
export async function getStaticProps({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // Try to get project from MDX file first
  let project = await getProjectFromMDX(id);
  
  // If no MDX file, use sample data
  if (!project) {
    project = getProjectData(id);
  }
  
  // If project still not found, return 404
  if (!project) {
    return {
      notFound: true,
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
