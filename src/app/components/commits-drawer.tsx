"use client";

import {
  MultiFileDiff,
  WorkerPoolContextProvider,
} from "@pierre/diffs/react";
import type { PreloadMultiFileDiffResult } from "@pierre/diffs/ssr";
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/app/components/ui/drawer";
import { formatNoteDate } from "@/lib/utils";

export interface PreparedCommit {
  slug: string;
  message: string;
  date: string;
  diff: PreloadMultiFileDiffResult<undefined>;
}

interface CommitsDrawerContextValue {
  commits: PreparedCommit[];
  openCommit: (slug: string) => void;
  numberForCommit: (slug: string) => number;
}

const CommitsDrawerContext =
  createContext<CommitsDrawerContextValue | null>(null);

export function useCommitsDrawer() {
  const context = useContext(CommitsDrawerContext);

  if (!context) {
    throw new Error("useCommitsDrawer must be used within CommitsDrawerProvider");
  }

  return context;
}

export function CommitsDrawerProvider({
  commits,
  children,
}: {
  commits: PreparedCommit[];
  children: ReactNode;
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const activeCommit = commits.find((commit) => commit.slug === openSlug);

  const poolOptions = useMemo(
    () => ({
      workerFactory: () =>
        new Worker(new URL("@pierre/diffs/worker/worker.js", import.meta.url)),
      poolSize: 2,
    }),
    []
  );

  const highlighterOptions = useMemo(
    () => ({
      theme: "pierre-light" as const,
      lineDiffType: "word-alt" as const,
      langs: ["mdx" as const],
    }),
    []
  );

  const contextValue = useMemo(
    () => ({
      commits,
      openCommit: setOpenSlug,
      numberForCommit: (slug: string) => {
        const newestFirstIndex = commits.findIndex(
          (commit) => commit.slug === slug
        );

        return newestFirstIndex === -1 ? 0 : commits.length - newestFirstIndex;
      },
    }),
    [commits]
  );

  return (
    <WorkerPoolContextProvider
      poolOptions={poolOptions}
      highlighterOptions={highlighterOptions}
    >
      <CommitsDrawerContext.Provider value={contextValue}>
        {children}
        <Drawer
          direction="right"
          open={Boolean(activeCommit)}
          onOpenChange={(open) => {
            if (!open) {
              setOpenSlug(null);
            }
          }}
        >
          <DrawerContent>
            {activeCommit ? (
              <>
                <DrawerHeader className="border-b border-light-gray/20">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <DrawerTitle>{activeCommit.message}</DrawerTitle>
                      <DrawerDescription>
                        {formatNoteDate(activeCommit.date)}
                      </DrawerDescription>
                    </div>
                    <DrawerClose className="font-soehne text-[14px]/6 text-(--color-light-gray) hover:text-(--color-gray)">
                      close
                    </DrawerClose>
                  </div>
                </DrawerHeader>
                <div className="min-h-0 flex-1 overflow-auto px-3 pb-3">
                  <MultiFileDiff {...activeCommit.diff} />
                </div>
              </>
            ) : null}
          </DrawerContent>
        </Drawer>
      </CommitsDrawerContext.Provider>
    </WorkerPoolContextProvider>
  );
}
