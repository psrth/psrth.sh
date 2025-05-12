import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Wrapper from "@/app/components/wrapper";
import { Metadata } from "next";
import { MDXComponents } from "@/app/components/markdown";
import rehypeStarryNight from "rehype-starry-night";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";

interface NoteProps {
  params: {
    slug: string;
  };
}
function extractTitle(content: string): string {
  const titleMatch = content.match(/^# (.*$)/m);
  if (titleMatch) return titleMatch[1];
  return slugToTitle(content);
}

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: NoteProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
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
    console.error("Error reading file:", error);
    notFound();
  }
}

async function Note({ params }: NoteProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const source = await getNote(slug);

  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypeStarryNight]],
        format: "mdx",
      },
    },
    components: MDXComponents,
  });

  return (
    <Wrapper>
      <article className="prose max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0">
        {content}
      </article>
    </Wrapper>
  );
}

export default Note;
