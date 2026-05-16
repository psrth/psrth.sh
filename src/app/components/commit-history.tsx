"use client";

import { CommitBadge } from "./edit-annotation";
import { useCommitsDrawer } from "./commits-drawer";

export function CommitHistory({ publishedAt }: { publishedAt: string }) {
  const { commits, numberForCommit, openCommit } = useCommitsDrawer();
  const oldestFirst = [...commits].reverse();

  return (
    <section className="mt-20 mb-[100px] font-soehne text-[14px]/6 md:text-[16px]/7">
      <p className="italic text-(--color-light-gray)">
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
              <span className="text-(--color-light-gray)">: {commit.date}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
