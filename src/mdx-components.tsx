// mdx-components.tsx
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import CodeHighlighter from './components/CodeHighlighter';



// Define custom MDX components
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Headings
    h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
    h2: (props) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
    h3: (props) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
    h4: (props) => <h4 className="text-lg font-bold mt-4 mb-2" {...props} />,
    h5: (props) => <h5 className="text-base font-bold mt-4 mb-2" {...props} />,
    h6: (props) => <h6 className="text-sm font-bold mt-4 mb-2" {...props} />,
    
    // Text elements
    p: (props) => <p className="my-4 text-lg" {...props} />,
    a: (props) => <Link className="text-blue-600 hover:underline dark:text-blue-400" {...props} />,
    strong: (props) => <strong className="font-bold" {...props} />,
    em: (props) => <em className="italic" {...props} />,
    del: (props) => <del className="line-through" {...props} />,
    
    // Lists
    ul: (props) => <ul className="list-disc pl-6 my-4" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 my-4" {...props} />,
    li: (props) => <li className="my-2" {...props} />,
    
    // Block elements
    blockquote: (props) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props} />
    ),
    hr: () => <hr className="my-8 border-t border-gray-300 dark:border-gray-700" />,
    
    // Media elements
    img: (props) => (
      <div className="relative w-full h-64 sm:h-96 my-6">
        <Image 
          src={props.src || ''} 
          alt={props.alt || "Project image"} 
          fill 
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
    ),
    
    // Code blocks
    pre: (props) => <pre className="my-4 overflow-x-auto" {...props} />,
    code: ({ className, children, ...props }:  React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <CodeHighlighter 
        language={match[1]} 
        className="rounded-md my-4"
        >
        {String(children)}
        </CodeHighlighter>

      ) : (
        <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono" {...props}>
          {children}
        </code>
      );
    },
    
    // Tables
    table: (props) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700" {...props} />
      </div>
    ),
    thead: (props) => <thead className="bg-gray-100 dark:bg-gray-800" {...props} />,
    tbody: (props) => <tbody className="divide-y divide-gray-200 dark:divide-gray-800" {...props} />,
    tr: (props) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-900" {...props} />,
    th: (props) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props} />,
    td: (props) => <td className="px-6 py-4 whitespace-nowrap text-sm" {...props} />,
    
    // Custom components
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
}
