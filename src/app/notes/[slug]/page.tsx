import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Wrapper from "@/app/components/wrapper";
import { Metadata } from "next";
import { MDXComponents } from "@/app/components/markdown";

interface NoteProps {
  params: {
    slug: string;
  };
}

// Helper to get the title from the markdown content
function extractTitle(content: string): string {
  // Look for the first h1 (# Title)
  const titleMatch = content.match(/^# (.*$)/m);
  if (titleMatch) return titleMatch[1];

  // Fallback: convert slug to title
  return slugToTitle(content);
}

// Convert slug to title format
function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: NoteProps): Promise<Metadata> {
  const { slug } = params;
  const source = await getNote(slug);

  const title = extractTitle(source);

  return {
    title,
    description: `Read more about ${title}`,
  };
}

export async function generateStaticParams() {
  try {
    const contentDir = path.join(
      process.cwd(),
      "src",
      "app",
      "notes",
      "content"
    );
    const files = fs.readdirSync(contentDir);

    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => ({
        slug: file.replace(/\.mdx$/, ""),
      }));
  } catch (error) {
    console.error("Error reading directory:", error);
  }
}

async function getNote(slug: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "app",
      "notes",
      "content",
      `${slug}.mdx`
    );
    const source = fs.readFileSync(filePath, "utf8");
    return source;
  } catch (error) {
    return `# Note not found\n\nThe note with slug "${slug}" does not exist yet.`;
  }
}

async function Note({ params }: NoteProps) {
  const { slug } = params;
  const source = await getNote(slug);

  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
    components: MDXComponents,
  });

  return (
    <Wrapper>
      <article className="prose prose-zinc max-w-none">{content}</article>
    </Wrapper>
  );
}

export default Note;
