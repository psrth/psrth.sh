"use client";

import Link from "next/link";

import { formatNoteDate } from "@/lib/utils";
import { CommitBadge } from "./edit-annotation";
import { useCommitsDrawer } from "./commits-drawer";
import { ScrollLink } from "./scroll-link";

export function CommitHistory({ publishedAt }: { publishedAt: string }) {
  const { commits, numberForCommit, openCommit } = useCommitsDrawer();
  const oldestFirst = [...commits].reverse();

  return (
    <section
      id="edits"
      className="mt-10 mb-[100px] scroll-mt-20 font-soehne text-[14px]/6 md:text-[16px]/7"
    >
      <div className="mb-10 h-[2px] w-full bg-(--color-light-gray) opacity-20" />
      <p className="text-(--color-light-gray)">
        Originally authored on {publishedAt}
      </p>
      <div className="mt-4 flex flex-col gap-2">
        {oldestFirst.map((commit) => (
          <button
            key={commit.slug}
            type="button"
            className="flex cursor-pointer items-baseline gap-2 text-left text-(--color-gray) hover:text-(--color-black)"
            onClick={() => openCommit(commit.slug)}
          >
            <CommitBadge number={numberForCommit(commit.slug)} />
            <span>
              <span className="italic">{commit.message}</span>
              <span className="ml-[10px] text-(--color-light-gray)">
                {formatNoteDate(commit.date)}
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-1">
        <ScrollLink
          target="top"
          ariaLabel="Back to top"
          className="inline-flex cursor-pointer rounded-sm bg-gray-50 px-3 py-1 font-soehne text-md font-medium text-(--color-black) transition-colors hover:bg-gray-100"
        >
          back to top
        </ScrollLink>
        <Link
          href="/notes/im-starting-a-blog"
          className="px-3 py-1 font-soehne text-md font-regular text-(--color-light-gray) hover:text-(--color-gray)"
        >
          what is this?
        </Link>
      </div>
    </section>
  );
}
