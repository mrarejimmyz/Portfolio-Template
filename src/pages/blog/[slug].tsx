import { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';


// Interface for blog post metadata
interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

// Interface for the component props
interface BlogPostProps {
  source: MDXRemoteSerializeResult;
  frontMatter: PostMetadata;
  slug: string;
}

// Custom components for MDX rendering
const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
  p: (props: any) => <p className="my-4 text-lg" {...props} />,
  a: (props: any) => <a className="text-blue-600 hover:underline dark:text-blue-400" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 my-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 my-4" {...props} />,
  li: (props: any) => <li className="my-2" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props} />
  ),
  code: ({ className, children, ...props }: any) => {
    // Check if this is an inline code block or a code block with language
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
  img: ({ src, alt }: any) => (
    <div className="relative w-full h-64 sm:h-96 my-6">
      <Image 
        src={src} 
        alt={alt || "Blog image"} 
        fill 
        style={{ objectFit: "cover" }}
        className="rounded-lg"
      />
    </div>
  ),
};

/**
 * Blog Post Component
 * Renders a full blog post from MDX content
 */
export default function BlogPost({ source, frontMatter, slug }: BlogPostProps) {
  const [timeToRead, setTimeToRead] = useState<string>(frontMatter.readTime || "5 min read");
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Head>
      <title>{`${frontMatter.title} | Developer Blog`}</title>
        <meta name="description" content={frontMatter.excerpt} />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.excerpt} />
        <meta property="og:image" content={frontMatter.coverImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>


      
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        {/* Cover Image */}
        <div className="relative w-full h-64 sm:h-96 mb-8 overflow-hidden rounded-lg">
          <Image
            src={frontMatter.coverImage}
            alt={frontMatter.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        
        {/* Article Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-3 mb-4">
            {frontMatter.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {tag}
              </Link>
            ))}
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{frontMatter.title}</h1>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
            <span>{formatDate(frontMatter.date)}</span>
            <span className="mx-2">•</span>
            <span>{timeToRead}</span>
            <span className="mx-2">•</span>
            <span>By {frontMatter.author}</span>
          </div>
          
          <p className="text-xl text-gray-600 dark:text-gray-300">{frontMatter.excerpt}</p>
        </header>
        
        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote {...source} components={components} />
        </article>
        
        {/* Author Bio */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
              <Image
                src="/profile.jpg"
                alt={frontMatter.author}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">{frontMatter.author}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Blockchain Developer & Smart Contract Engineer
              </p>
            </div>
          </div>
        </div>
        
        {/* Related Posts Placeholder */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
          <p className="text-gray-600 dark:text-gray-400">More posts coming soon...</p>
        </div>
      </main>
    </>
  );
}

// Get static paths for all blog posts
export const getStaticPaths: GetStaticPaths = async () => {
  // Read the posts directory
  const postsDirectory = path.join(process.cwd(), 'src/content/blog');
  const fileNames = fs.readdirSync(postsDirectory);
  
  // Create paths from filenames
  const paths = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => ({
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    }));
    
  return {
    paths,
    fallback: false,
  };
};

// Get static props for a specific blog post
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Use gray-matter to extract frontmatter metadata
  const { data, content } = matter(fileContents);
  
  // Serialize the MDX content
  const mdxSource = await serialize(content, {
    // Add any mdx plugins if needed
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      slug,
    },
  };
};
