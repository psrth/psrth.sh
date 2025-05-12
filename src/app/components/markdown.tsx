import React, { ReactNode } from "react";

interface ElementProps {
  children: ReactNode;
  className?: string;
}

// Title component with styled headings
export const H1 = ({ children, className = "" }: ElementProps) => (
  <h1
    className={`text-[28px]/8 md:text-[32px]/12 font-bold mt-8 mb-4 ${className}`}
  >
    {children}
  </h1>
);

export const H2 = ({ children, className = "" }: ElementProps) => (
  <h2
    className={`text-[22px]/7 md:text-[24px]/8 font-semibold mt-8 mb-3 border-b pb-1 border-[var(--color-light-gray)] ${className}`}
  >
    {children}
  </h2>
);

export const H3 = ({ children, className = "" }: ElementProps) => (
  <h3
    className={`text-[18px]/6 md:text-[20px]/7 font-medium mt-5 mb-2 ${className}`}
  >
    {children}
  </h3>
);

export const Paragraph = ({ children, className = "" }: ElementProps) => (
  <p
    className={`text-[16px]/7 md:text-[18px]/8 mb-4 w-[90%] md:w-[600px] text-[var(--color-gray)] ${className}`}
  >
    {children}
  </p>
);

export const Blockquote = ({ children, className = "" }: ElementProps) => (
  <blockquote
    className={`border-l-4 border-[var(--color-light-gray)] pl-4 py-1 my-4 bg-[#f9fafb] text-[var(--color-gray)] rounded-r w-[90%] md:w-[600px] ${className}`}
  >
    {children}
  </blockquote>
);

export const UnorderedList = ({ children, className = "" }: ElementProps) => (
  <ul
    className={`list-disc pl-6 mb-4 text-[16px]/7 md:text-[18px]/8 text-[var(--color-gray)] w-[90%] md:w-[600px] ${className}`}
  >
    {children}
  </ul>
);

export const OrderedList = ({ children, className = "" }: ElementProps) => (
  <ol
    className={`list-decimal pl-6 mb-4 text-[16px]/7 md:text-[18px]/8 text-[var(--color-gray)] w-[90%] md:w-[600px] ${className}`}
  >
    {children}
  </ol>
);

export const ListItem = ({ children, className = "" }: ElementProps) => (
  <li className={`mb-2 ${className}`}>{children}</li>
);

export const InlineCode = ({ children, className = "" }: ElementProps) => (
  <code
    className={`bg-[#f2f2f2] rounded px-1 py-0.5 font-mono text-[14px] text-[#d44d6e] ${className}`}
  >
    {children}
  </code>
);

interface CodeBlockProps extends ElementProps {
  className?: string;
}

// Handle code blocks with language specification
export const CodeBlock = ({ children, className = "" }: CodeBlockProps) => {
  // Extract language from className (format: "language-js", "language-jsx", etc.)
  const language = className?.includes("language-")
    ? className.split("language-")[1]
    : "";

  // Map languages to nicer display names
  const languageMap: Record<string, string> = {
    js: "JavaScript",
    jsx: "React JSX",
    ts: "TypeScript",
    tsx: "React TSX",
    bash: "Terminal",
    sh: "Shell",
    css: "CSS",
    html: "HTML",
    json: "JSON",
    markdown: "Markdown",
    md: "Markdown",
  };

  const displayLanguage = language ? languageMap[language] || language : "";

  return (
    <div className="relative group my-6 w-[90%] md:w-[600px]">
      {displayLanguage && (
        <div className="absolute right-4 top-3 text-xs bg-[#f2f2f2] px-2 py-0.5 rounded text-[var(--color-gray)] font-mono">
          {displayLanguage}
        </div>
      )}
      <pre
        className={`bg-[#f9fafb] p-5 pt-10 rounded-lg overflow-x-auto font-mono text-[14px] leading-relaxed ${className}`}
      >
        {children}
      </pre>
    </div>
  );
};

export const Link = ({
  children,
  className = "",
  ...props
}: ElementProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    className={`text-blue-600 hover:underline ${className}`}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
);

// Component to handle date display
export const NoteDate = ({ children, className = "" }: ElementProps) => (
  <div
    className={`text-[14px] text-[var(--color-light-gray)] mb-6 ${className}`}
  >
    {children}
  </div>
);

// Table components
export const Table = ({ children, className = "" }: ElementProps) => (
  <div className="overflow-x-auto my-6 w-[90%] md:w-[600px]">
    <table
      className={`min-w-full divide-y divide-[var(--color-light-gray)] ${className}`}
    >
      {children}
    </table>
  </div>
);

export const TableHead = ({ children, className = "" }: ElementProps) => (
  <thead className={`bg-[#f9fafb] ${className}`}>{children}</thead>
);

export const TableRow = ({ children, className = "" }: ElementProps) => (
  <tr className={`${className}`}>{children}</tr>
);

export const TableHeader = ({ children, className = "" }: ElementProps) => (
  <th
    className={`px-4 py-3 text-left text-[14px] font-medium text-[var(--color-light-gray)] uppercase tracking-wider ${className}`}
  >
    {children}
  </th>
);

export const TableCell = ({ children, className = "" }: ElementProps) => (
  <td
    className={`px-4 py-3 whitespace-nowrap text-[16px] text-[var(--color-gray)] ${className}`}
  >
    {children}
  </td>
);

// Image component for markdown
export const MDXImage = ({
  src,
  alt,
  width = 600,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) => (
  <div className="my-6 w-[90%] md:w-[600px]">
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-md w-full ${className}`}
    />
    {alt && (
      <p className="text-[14px] text-[var(--color-light-gray)] mt-2 text-center">
        {alt}
      </p>
    )}
  </div>
);

export const MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: Paragraph,
  blockquote: Blockquote,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  code: InlineCode,
  pre: CodeBlock,
  a: Link,
  table: Table,
  thead: TableHead,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  img: MDXImage,
};
