"use client";

import { cn } from "@/lib/utils";
import { useCommitsDrawer } from "./commits-drawer";

export function CommitBadge({
  number,
  className,
}: {
  number: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex align-middle relative -top-[2px] w-4 h-4 items-center justify-center rounded-full bg-(--color-teal) text-[10px] font-medium leading-none text-white",
        className
      )}
    >
      {number}
    </span>
  );
}

export function EditBadge({ commit }: { commit: string }) {
  const { numberForCommit, openCommit } = useCommitsDrawer();
  const number = numberForCommit(commit);

  if (!number) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={`Open edit ${number}`}
      className="ml-1 inline-flex cursor-pointer align-middle"
      onClick={() => openCommit(commit)}
    >
      <CommitBadge number={number} className="bg-(--color-teal)/75" />
    </button>
  );
}
