import { compileMDX } from "next-mdx-remote/rsc";
import Wrapper from "@/app/components/wrapper";
import { Metadata } from "next";
import { H1, H3, MDXComponents } from "@/app/components/markdown";
import rehypeStarryNight from "rehype-starry-night";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { getAllNotes, getNote } from "../notes";
import {
  preloadMultiFileDiff,
  type PreloadMultiFileDiffOptions,
} from "@pierre/diffs/ssr";
import {
  CommitsDrawerProvider,
  type PreparedCommit,
} from "@/app/components/commits-drawer";
import { CommitHistory } from "@/app/components/commit-history";
import { getNoteGitCommits } from "../git-history";

interface NoteProps {
  params: Promise<{
    slug: string;
  }>;
}

const DIFF_OPTIONS = {
  theme: "pierre-light",
  diffStyle: "unified",
  diffIndicators: "classic",
  overflow: "wrap",
  lineDiffType: "word-alt",
} satisfies NonNullable<PreloadMultiFileDiffOptions<undefined>["options"]>;

const NOTE_EDIT_PREFIX = "edit(note):";

function formatNoteDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function getAddedLines(oldSource: string, newSource: string) {
  const oldLines = oldSource.split("\n");
  const newLines = newSource.split("\n");
  const dp = Array.from({ length: oldLines.length + 1 }, () =>
    Array<number>(newLines.length + 1).fill(0)
  );

  for (let oldIndex = oldLines.length - 1; oldIndex >= 0; oldIndex -= 1) {
    for (let newIndex = newLines.length - 1; newIndex >= 0; newIndex -= 1) {
      dp[oldIndex][newIndex] =
        oldLines[oldIndex] === newLines[newIndex]
          ? dp[oldIndex + 1][newIndex + 1] + 1
          : Math.max(dp[oldIndex + 1][newIndex], dp[oldIndex][newIndex + 1]);
    }
  }

  const added: string[] = [];
  let oldIndex = 0;
  let newIndex = 0;

  while (oldIndex < oldLines.length && newIndex < newLines.length) {
    if (oldLines[oldIndex] === newLines[newIndex]) {
      oldIndex += 1;
      newIndex += 1;
    } else if (dp[oldIndex + 1][newIndex] >= dp[oldIndex][newIndex + 1]) {
      oldIndex += 1;
    } else {
      added.push(newLines[newIndex]);
      newIndex += 1;
    }
  }

  return added.concat(newLines.slice(newIndex));
}

function shouldAnnotateLine(line: string, inFence: boolean) {
  const trimmed = line.trim();

  return (
    !inFence &&
    trimmed.length > 0 &&
    !trimmed.startsWith("#") &&
    !trimmed.startsWith("```")
  );
}

function annotateSource(source: string, commitByAddedLine: Map<string, string>) {
  let inFence = false;

  return source
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("```")) {
        inFence = !inFence;
        return line;
      }

      const commitSlug = commitByAddedLine.get(line);

      if (!commitSlug || !shouldAnnotateLine(line, inFence)) {
        return line;
      }

      return `${line} <EditBadge commit="${commitSlug}" />`;
    })
    .join("\n");
}

async function prepareCommits(slug: string): Promise<{
  commits: PreparedCommit[];
  commitByAddedLine: Map<string, string>;
}> {
  const gitCommits = (await getNoteGitCommits(slug)).filter((commit) =>
    commit.message.startsWith(NOTE_EDIT_PREFIX)
  );
  const commitByAddedLine = new Map<string, string>();
  const commits: PreparedCommit[] = [];

  for (const commit of gitCommits) {
    for (const line of getAddedLines(commit.oldContents, commit.newContents)) {
      if (!commitByAddedLine.has(line)) {
        commitByAddedLine.set(line, commit.slug);
      }
    }

    commits.push({
      slug: commit.slug,
      message: commit.message,
      date: commit.date,
      diff: await preloadMultiFileDiff({
        oldFile: {
          name: `${slug}.mdx`,
          contents: commit.oldContents,
          cacheKey: `${commit.slug}:old`,
        },
        newFile: {
          name: `${slug}.mdx`,
          contents: commit.newContents,
          cacheKey: `${commit.slug}:new`,
        },
        options: DIFF_OPTIONS,
      }),
    });
  }

  return { commits, commitByAddedLine };
}

export async function generateMetadata({
  params,
}: NoteProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const note = await getNote(slug);

  if (!note) {
    notFound();
  }

  return {
    title: note.title,
    description: note.description ?? `Read more about ${note.title}`,
  };
}

export async function generateStaticParams() {
  const notes = await getAllNotes();

  return notes.map((note) => ({
    slug: note.slug,
  }));
}

async function Note({ params }: NoteProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const note = await getNote(slug);

  if (!note) {
    notFound();
  }

  const { commits, commitByAddedLine } = await prepareCommits(slug);
  const annotatedSource = annotateSource(note.source, commitByAddedLine);

  const { content } = await compileMDX({
    source: annotatedSource,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypeStarryNight]],
        format: "mdx",
      },
    },
    components: MDXComponents,
  });

  const formattedDate = formatNoteDate(note.date);

  return (
    <CommitsDrawerProvider commits={commits}>
      <Wrapper>
        <article className="prose max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0">
          <H1>{note.title}</H1>
          <H3>{formattedDate}</H3>
          {content}
        </article>
        <CommitHistory publishedAt={formattedDate} />
      </Wrapper>
    </CommitsDrawerProvider>
  );
}

export default Note;
