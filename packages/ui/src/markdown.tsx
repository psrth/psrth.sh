import React, { ReactNode } from "react";

interface ElementProps {
  children: ReactNode;
  className?: string;
}

// ----------------------
// BASIC TEXT COMPONENTS
// ----------------------

export const H1 = ({ children, className = "" }: ElementProps) => (
  <h1
    className={`text-[28px]/8 md:text-[32px]/12 w-[90%] md:w-[620px] font-tiempos tracking-tight text-(--color-black) ${className}`}
  >
    {children}
  </h1>
);

export const H2 = ({ children, className = "" }: ElementProps) => (
  <h2
    className={`text-[22px]/7 md:text-[24px]/8 font-medium mt-16 mb-3 text-(--color-gray)   ${className}`}
  >
    {children}
    <div className="flex h-[2px] w-full bg-(--color-light-gray)  my-2 opacity-20" />
  </h2>
);

export const H3 = ({ children, className = "" }: ElementProps) => (
  <h3
    className={`text-[14px]/6 md:text-[16px]/7 font-regular mt-2 mb-10 text-(--color-light-gray) ${className}`}
  >
    {children}
  </h3>
);

export const Paragraph = ({ children, className = "" }: ElementProps) => {
  // fun fact - images are rendered inside paragraphs in markdown
  // but next throws a hydration error for p <descendant> p
  // so we need to override the default behavior
  const containsOnlyImage = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === MDXImage || child.type === "img")
  );

  if (containsOnlyImage) {
    return <>{children}</>;
  }

  //
  return (
    <p
      className={`text-[16px]/7 md:text-[18px]/8 mt-5 mb-5 w-[90%] md:w-[100%] text-(--color-gray) ${className}`}
    >
      {children}
    </p>
  );
};

// ----------------------
// IMAGE COMPONENT
// ----------------------
export const MDXImage = ({
  src,
  alt,
  width = 740,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) => (
  <div className="flex flex-col w-full items-center">
    <div className="my-6 w-[100%] md:w-[90%] ">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`rounded-md w-full ${className}`}
      />
      {alt && (
        <p className="text-[14px] text-(--color-light-gray) mt-2 text-center">
          {alt}
        </p>
      )}
    </div>
  </div>
);

// ----------------------
// SPECIAL TEXT COMPONENTS
// ----------------------
export const Link = ({
  children,
  className = "",
  ...props
}: ElementProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    className={`text-(--color-link-blue) font-medium hover:underline ${className}`}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
);

export const Table = ({ children, className = "" }: ElementProps) => (
  <div className="overflow-x-auto my-6 w-full">
    <table
      className={`min-w-full divide-y divide-(--color-light-gray)/30 ${className}`}
    >
      {children}
    </table>
  </div>
);

export const Blockquote = ({ children, className = "" }: ElementProps) => (
  <blockquote
    className={`border-l-4 border-(--color-link-blue) italic my-12 pl-4 py-1 bg-[#f9fafb] text-(--color-gray) rounded-r w-[95%] md:w-[650px] ${className}`}
  >
    {children}
  </blockquote>
);

export const UnorderedList = ({ children, className = "" }: ElementProps) => (
  <ul
    className={`list-disc pl-6 mb-4 text-[16px]/7 md:text-[18px]/8 text-(--color-gray) w-[90%] md:w-[720px] ${className}`}
  >
    {children}
  </ul>
);

export const OrderedList = ({ children, className = "" }: ElementProps) => (
  <ol
    className={`list-decimal pl-6 mb-4 text-[16px]/7 md:text-[18px]/8 text-(--color-gray) w-[90%] md:w-[720px] ${className}`}
  >
    {children}
  </ol>
);

export const ListItem = ({ children, className = "" }: ElementProps) => (
  <li className={`mb-2 ${className}`}>{children}</li>
);

// ----------------------
// CODE COMPONENTS
// ----------------------

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

interface PreChildProps {
  className?: string;
  [key: string]: unknown;
}

export const Pre = (props: React.ComponentPropsWithRef<"pre">) => {
  let className = "";

  if (
    props.children &&
    typeof props.children === "object" &&
    props.children !== null &&
    "props" in props.children
  ) {
    const childProps = props.children.props as PreChildProps;
    if (childProps && typeof childProps.className === "string") {
      className = childProps.className;
    }
  }

  const language = className?.includes("language-")
    ? className.split("language-")[1]?.split(" ")[0]
    : "";

  const languageMap: Record<string, string> = {
    js: "javascript",
    jsx: "react",
    ts: "typescript",
    tsx: "react",
    bash: "bash",
    sh: "bash",
    css: "css",
    html: "html",
    json: "json",
    markdown: "markdown",
    md: "markdown",
    javascript: "javascript",
  };

  const displayLanguage = language ? languageMap[language] || language : "";

  const languageDisplay = displayLanguage || "idk";

  return (
    <div className="relative group my-6">
      <pre className="p-5 pt-10 rounded-lg overflow-x-auto font-mono text-[14px] leading-relaxed bg-[#f9fafb]">
        <div className="absolute right-4 top-3 text-xs bg-[#f2f2f2] px-2 py-0.5 rounded text-(--color-gray) font-mono z-100">
          {languageDisplay}
        </div>
        {props.children}
      </pre>
    </div>
  );
};

export const CodeBlock = ({ children, className = "" }: CodeBlockProps) => {
  return (
    <div className="relative group my-6">
      <pre
        className={`p-5 pt-10 rounded-lg overflow-x-auto font-mono text-[14px] leading-relaxed`}
      >
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};

// ----------------------
// TABLE COMPONENTS
// ----------------------

export const TableHead = ({ children, className = "" }: ElementProps) => (
  <thead className={`${className}`}>{children}</thead>
);

export const TableRow = ({ children, className = "" }: ElementProps) => (
  <tr className={`${className}`}>{children}</tr>
);

export const TableHeader = ({ children, className = "" }: ElementProps) => (
  <th
    className={`px-4 py-3 text-left text-[14px] font-medium text-(--color-light-gray) uppercase tracking-wider ${className}`}
  >
    {children}
  </th>
);

export const TableCell = ({ children, className = "" }: ElementProps) => (
  <td
    className={`px-4 py-3 whitespace-nowrap text-[16px] text-(--color-gray) ${className}`}
  >
    {children}
  </td>
);

export const TableBody = ({ children, className = "" }: ElementProps) => (
  <tbody
    className={`divide-y divide-(--color-light-gray)/30 ${className}`}
  >
    {children}
  </tbody>
);

export const MDXComponents = {
  // text components
  h1: H1,
  h2: H2,
  h3: H3,
  p: Paragraph,
  // image component
  img: MDXImage,
  // special text components
  a: Link,
  blockquote: Blockquote,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  // code components
  code: InlineCode,
  pre: Pre,
  // table components
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
};
