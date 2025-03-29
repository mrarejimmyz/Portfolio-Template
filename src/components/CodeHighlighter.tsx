import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeHighlighterProps {
  language: string;
  children: string;
  className?: string;
}

export default function CodeHighlighter({ language, children, className }: CodeHighlighterProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={atomDark}
      className={`rounded-md my-4 ${className || ''}`}
      showLineNumbers
    >
      {children.replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
}
