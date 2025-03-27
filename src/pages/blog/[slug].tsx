import { GetStaticProps, GetStaticPaths } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Highlight, themes } from 'prism-react-renderer';



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
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="my-4 text-lg" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-blue-600 hover:underline dark:text-blue-400" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-6 my-4" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal pl-6 my-4" {...props} />,
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="my-2" {...props} />,
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props} />
  ),
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const match = /language-(\w+)/.exec(className || '');
    // Extract language from the match
    const language = match ? match[1] : '';
    
    // Get code string from children
    const codeString = String(children).replace(/\n$/, '');
    return match ? (
      <Highlight 
      theme={themes.nightOwl}
      code={codeString}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
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
export default function BlogPost({ source, frontMatter }: BlogPostProps) {
  const timeToRead = frontMatter.readTime || "5 min read";

  
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
