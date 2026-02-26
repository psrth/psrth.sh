"use client";

import { useParams, useRouter } from "next/navigation";
import { useNote } from "@/lib/hooks/use-note";
import MarkdownEditor from "../../components/markdown-editor";
import ExcalidrawCanvas from "../../components/excalidraw-canvas";
import { useEffect } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${day}${suffix}, ${year}`;
}

export default function NotePage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { note, isLoading, updateContent, updateTitle } = useNote(id);

  useEffect(() => {
    if (!isLoading && note === null) router.push("/");
  }, [note, isLoading, router]);

  if (isLoading || !note) return null;

  if (note.type === "excalidraw") {
    return (
      <ExcalidrawCanvas
        content={note.content}
        onChange={updateContent}
        title={note.title}
        onTitleChange={updateTitle}
      />
    );
  }

  return (
    <div className="flex flex-col animate-fade-in">
      <div className="w-[90vw] md:w-[740px] max-w-[740px] mx-auto mt-16">
        <div className="flex items-center gap-3 mb-1">
          <Link
            href="/"
            className="text-(--color-light-gray) hover:text-(--color-gray) transition-colors"
          >
            <FiArrowLeft size={16} />
          </Link>
          <p className="text-[14px] text-(--color-light-gray)">
            {formatDate(note.createdAt)}
          </p>
        </div>
        <input
          type="text"
          value={note.title}
          onChange={(e) => updateTitle(e.target.value)}
          className="text-[28px] font-tiempos font-bold tracking-tight text-(--color-black) bg-transparent border-none outline-none w-full"
          placeholder="Untitled"
        />
      </div>
      <div className="w-[90vw] md:w-[740px] max-w-[740px] mx-auto mt-8">
        <MarkdownEditor content={note.content} onChange={updateContent} />
      </div>
    </div>
  );
}
