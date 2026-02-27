"use client";

import { useParams, useRouter } from "next/navigation";
import { useNote } from "@/lib/hooks/use-note";
import { useNotes } from "@/lib/hooks/use-notes";
import MarkdownEditor from "../../components/markdown-editor";
import ExcalidrawCanvas from "../../components/excalidraw-canvas";
import FloatingToolbar from "../../components/floating-toolbar";
import CommandPalette from "../../components/command-palette";
import { useState, useEffect } from "react";

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
  const { notes, createNote } = useNotes();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const handleNewNote = (type: "markdown" | "excalidraw" = "markdown") => {
    const newNote = createNote("Untitled", type);
    router.push(`/note/${newNote.id}`);
  };

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
      <div className="w-[90vw] md:w-[740px] max-w-[740px] mx-auto mt-25">
        <input
          type="text"
          value={note.title}
          onChange={(e) => updateTitle(e.target.value)}
          className="text-[28px]/8 md:text-[32px]/12 font-tiempos tracking-tight text-(--color-black) bg-transparent border-none outline-none w-full"
          placeholder="Untitled"
        />
        <p className="text-[14px] md:text-[16px] text-(--color-light-gray) mt-2">
          {formatDate(note.updatedAt)}
        </p>
      </div>
      <div className="w-[90vw] md:w-[740px] max-w-[740px] mx-auto mt-10">
        <MarkdownEditor content={note.content} onChange={updateContent} />
      </div>
      <FloatingToolbar
        variant="note"
        content={note.content}
        noteTitle={note.title}
        noteUpdatedAt={note.updatedAt}
        onSearchClick={() => setCommandPaletteOpen(true)}
      />
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
        notes={notes}
        onCreateNote={handleNewNote}
        context="note"
        noteContent={note.content}
        noteTitle={note.title}
        noteUpdatedAt={note.updatedAt}
      />
    </div>
  );
}
