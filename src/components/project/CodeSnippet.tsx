import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeSnippet({ code, language = 'javascript', title = 'Code Highlight' }: CodeSnippetProps) {
  if (!code) return null;
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto">
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
