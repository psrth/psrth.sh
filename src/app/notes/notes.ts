import "server-only";

import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const NOTES_DIR = path.join(process.cwd(), "src", "app", "notes", "content");
const NOTE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

interface NoteFrontmatter {
  title?: unknown;
  date?: unknown;
  description?: unknown;
}

export interface NoteMetadata {
  slug: string;
  title: string;
  date: string;
  description?: string;
  link: `/notes/${string}`;
}

export interface NoteContent extends NoteMetadata {
  source: string;
}

function isMdxFile(file: string) {
  return file.endsWith(".mdx");
}

function slugFromFile(file: string) {
  return file.replace(/\.mdx$/, "");
}

function parseNote(source: string, slug: string): NoteContent {
  const { content, data } = matter(source);
  const frontmatter = data as NoteFrontmatter;

  if (typeof frontmatter.title !== "string") {
    throw new Error(`Missing title frontmatter in ${slug}.mdx`);
  }

  if (typeof frontmatter.date !== "string") {
    throw new Error(`Missing date frontmatter in ${slug}.mdx`);
  }

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    description:
      typeof frontmatter.description === "string"
        ? frontmatter.description
        : undefined,
    link: `/notes/${slug}`,
    source: content,
  };
}

export async function getNote(slug: string): Promise<NoteContent | null> {
  if (!NOTE_SLUG_PATTERN.test(slug)) {
    return null;
  }

  try {
    const source = await fs.readFile(path.join(NOTES_DIR, `${slug}.mdx`), "utf8");
    return parseNote(source, slug);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

export async function getAllNotes(): Promise<NoteMetadata[]> {
  const files = await fs.readdir(NOTES_DIR);
  const notes = await Promise.all(
    files.filter(isMdxFile).map(async (file) => {
      const note = await getNote(slugFromFile(file));

      if (!note) {
        throw new Error(`Could not read note metadata for ${file}`);
      }

      return {
        slug: note.slug,
        title: note.title,
        date: note.date,
        description: note.description,
        link: note.link,
      };
    })
  );

  return notes.sort((a, b) => b.date.localeCompare(a.date));
}
