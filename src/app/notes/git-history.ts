import "server-only";

import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const REPO_ROOT = process.cwd();
const MAX_GIT_OUTPUT = 10 * 1024 * 1024;

export interface NoteGitCommit {
  slug: string;
  hash: string;
  message: string;
  date: string;
  oldContents: string;
  newContents: string;
}

interface GitLogEntry {
  hash: string;
  timestamp: number;
  message: string;
}

interface GitHubCommitListItem {
  sha: string;
  commit: {
    message: string;
    author?: {
      date?: string;
    };
  };
}

interface GitHubCommitFile {
  filename: string;
  previous_filename?: string;
  status: "added" | "removed" | "modified" | "renamed" | string;
}

interface GitHubCommitDetail extends GitHubCommitListItem {
  parents: { sha: string }[];
  files?: GitHubCommitFile[];
}

interface GitHubFileContents {
  type: string;
  encoding?: string;
  content?: string;
}

async function git(args: string[]) {
  try {
    const { stdout } = await execFileAsync("git", args, {
      cwd: REPO_ROOT,
      encoding: "utf8",
      maxBuffer: MAX_GIT_OUTPUT,
    });

    return stdout.trimEnd();
  } catch {
    return null;
  }
}

function parseGitLog(stdout: string): GitLogEntry[] {
  if (!stdout) {
    return [];
  }

  return stdout
    .split("\n")
    .map((line) => {
      const [hash, timestamp, message] = line.split("\0");

      if (!hash || !timestamp || !message) {
        return null;
      }

      return {
        hash,
        timestamp: Number(timestamp),
        message,
      };
    })
    .filter((entry): entry is GitLogEntry => Boolean(entry));
}

function formatCommitDate(timestamp: number) {
  return new Date(timestamp * 1000).toISOString().slice(0, 10);
}

function formatGitHubDate(date: string | undefined) {
  if (!date) {
    throw new Error("GitHub note history response is missing a commit date.");
  }

  return new Date(date).toISOString().slice(0, 10);
}

async function getFileAtRevision(revision: string, filePath: string) {
  return git(["show", `${revision}:${filePath}`]);
}

async function isAddOnlyCommit(hash: string, filePath: string) {
  const status = await git([
    "diff-tree",
    "--no-commit-id",
    "--name-status",
    "-r",
    hash,
    "--",
    filePath,
  ]);

  return status?.split("\n").some((line) => line.startsWith("A\t")) ?? false;
}

async function getLocalNoteGitCommits(
  slug: string
): Promise<NoteGitCommit[]> {
  const filePath = `src/app/notes/content/${slug}.mdx`;
  const log = await git([
    "log",
    "--follow",
    "--format=%H%x00%ct%x00%s",
    "--",
    filePath,
  ]);

  if (!log) {
    return [];
  }

  const commits: NoteGitCommit[] = [];

  for (const entry of parseGitLog(log)) {
    if (await isAddOnlyCommit(entry.hash, filePath)) {
      continue;
    }

    const [oldContents, newContents] = await Promise.all([
      getFileAtRevision(`${entry.hash}^`, filePath),
      getFileAtRevision(entry.hash, filePath),
    ]);

    // The initial publish is represented by the note frontmatter date.
    if (!oldContents || !newContents || oldContents === newContents) {
      continue;
    }

    commits.push({
      slug: entry.hash.slice(0, 12),
      hash: entry.hash,
      message: entry.message,
      date: formatCommitDate(entry.timestamp),
      oldContents,
      newContents,
    });
  }

  return commits;
}

function getVercelGitHubRepo() {
  const owner = process.env.VERCEL_GIT_REPO_OWNER;
  const repo = process.env.VERCEL_GIT_REPO_SLUG;

  if (!owner || !repo) {
    throw new Error(
      "Vercel note history requires VERCEL_GIT_REPO_OWNER and VERCEL_GIT_REPO_SLUG."
    );
  }

  return { owner, repo };
}

async function fetchGitHubJson<T>(url: URL): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "psrth.sh-note-history",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    const rateLimitHint =
      response.status === 403
        ? " This may be GitHub's unauthenticated API rate limit."
        : "";

    throw new Error(
      `GitHub note history request failed (${response.status} ${response.statusText}) for ${url}.${rateLimitHint} ${detail}`
    );
  }

  return response.json() as Promise<T>;
}

async function getGitHubCommitsForPath({
  owner,
  repo,
  filePath,
}: {
  owner: string;
  repo: string;
  filePath: string;
}) {
  const commits: GitHubCommitListItem[] = [];
  let page = 1;

  while (true) {
    const url = new URL(
      `https://api.github.com/repos/${owner}/${repo}/commits`
    );
    url.searchParams.set("path", filePath);
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));

    const pageCommits = await fetchGitHubJson<GitHubCommitListItem[]>(url);
    commits.push(...pageCommits);

    if (pageCommits.length < 100) {
      return commits;
    }

    page += 1;
  }
}

async function getGitHubCommitDetail({
  owner,
  repo,
  hash,
}: {
  owner: string;
  repo: string;
  hash: string;
}) {
  return fetchGitHubJson<GitHubCommitDetail>(
    new URL(`https://api.github.com/repos/${owner}/${repo}/commits/${hash}`)
  );
}

async function getGitHubFileContents({
  owner,
  repo,
  filePath,
  ref,
}: {
  owner: string;
  repo: string;
  filePath: string;
  ref: string;
}) {
  const encodedPath = filePath
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  const url = new URL(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}`
  );
  url.searchParams.set("ref", ref);

  const file = await fetchGitHubJson<GitHubFileContents>(url);

  if (
    file.type !== "file" ||
    file.encoding !== "base64" ||
    typeof file.content !== "string"
  ) {
    throw new Error(
      `GitHub note history expected file contents for ${filePath} at ${ref}.`
    );
  }

  return Buffer.from(file.content, "base64").toString("utf8");
}

async function getGitHubNoteCommits(
  slug: string
): Promise<NoteGitCommit[]> {
  const { owner, repo } = getVercelGitHubRepo();
  const filePath = `src/app/notes/content/${slug}.mdx`;
  const listItems = await getGitHubCommitsForPath({ owner, repo, filePath });
  const commits: NoteGitCommit[] = [];

  for (const item of listItems) {
    const detail = await getGitHubCommitDetail({
      owner,
      repo,
      hash: item.sha,
    });
    const changedFile = detail.files?.find(
      (file) => file.filename === filePath || file.previous_filename === filePath
    );

    // The initial publish is represented by the note frontmatter date.
    if (!changedFile || changedFile.status === "added") {
      continue;
    }

    const parentHash = detail.parents[0]?.sha;

    if (!parentHash) {
      continue;
    }

    const oldPath = changedFile.previous_filename ?? filePath;
    const newPath = changedFile.filename;
    const [oldContents, newContents] = await Promise.all([
      getGitHubFileContents({ owner, repo, filePath: oldPath, ref: parentHash }),
      getGitHubFileContents({ owner, repo, filePath: newPath, ref: item.sha }),
    ]);

    if (oldContents === newContents) {
      continue;
    }

    commits.push({
      slug: item.sha.slice(0, 12),
      hash: item.sha,
      message: item.commit.message.split("\n")[0] ?? item.sha.slice(0, 12),
      date: formatGitHubDate(item.commit.author?.date),
      oldContents,
      newContents,
    });
  }

  return commits;
}

export async function getNoteGitCommits(slug: string) {
  if (process.env.VERCEL) {
    return getGitHubNoteCommits(slug);
  }

  return getLocalNoteGitCommits(slug);
}
