import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import emailjs from '@emailjs/browser';

// Define TypeScript interfaces for blog data
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  coverImage: string;
}

interface CategoryFilter {
  id: string;
  name: string;
}

// Props interface
interface BlogPageProps {
  posts: BlogPost[];
}

/**
 * Blog Page Component
 * Displays a collection of technical blog posts with filtering options
 */
export default function Blog({ posts }: BlogPageProps) {
  // Category filters for blog posts
  const categories: CategoryFilter[] = [
    { id: 'all', name: 'All Posts' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'solana', name: 'Solana' },
    { id: 'zk-proofs', name: 'Zero-Knowledge Proofs' },
    { id: 'storage', name: 'Decentralized Storage' }
  ];

  // State for active category filter
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter posts based on selected category
  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.tags.includes(activeCategory));

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Head>
        <title>Technical Blog | Blockchain Developer Portfolio</title>
        <meta name="description" content="Technical articles and tutorials on blockchain development, smart contracts, and Web3 technologies." />
        <meta property="og:title" content="Technical Blog | Blockchain Developer Portfolio" />
        <meta property="og:description" content="Technical articles and tutorials on blockchain development, smart contracts, and Web3 technologies." />
      </Head>

  

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Technical Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            In-depth articles on blockchain development, smart contracts, and Web3 technologies.
          </p>
        </header>

        {/* Category filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Blog posts grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
            >
              {/* Post image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                {/* Category badge */}
                {post.tags[0] && (
                  <span className="absolute top-3 right-3 px-3 py-1 bg-gray-900/80 text-white text-xs rounded-full">
                    {post.tags[0]}
                  </span>
                )}
              </div>
              
              {/* Post content */}
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>
                
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  Read article
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state for when no posts match the filter */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No posts found in this category.
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              View all posts
            </button>
          </div>
        )}

        {/* Newsletter signup (optional) */}
        <div className="mt-20 bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 sm:p-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Subscribe to receive notifications when new articles are published.
            </p>
            <form className="sm:flex justify-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 mb-4 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// Get static props for the blog page
export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog');
  
  // Get all MDX files from the blog directory
  const fileNames = fs.readdirSync(postsDirectory);
  
  // Parse frontmatter from each file
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      // Get slug from filename
      const slug = fileName.replace(/\.mdx$/, '');
      
      // Read file content
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Extract frontmatter
      const { data } = matter(fileContents);
      
      // Ensure all required properties are present
      return {
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: data.date || new Date().toISOString(),
        readTime: data.readTime || '5 min read',
        author: data.author || 'Blockchain Developer',
        tags: data.tags || [],
        coverImage: data.coverImage || '/blog/default-cover.jpg',
      };
    })
    // Sort posts by date (newest first)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
}
