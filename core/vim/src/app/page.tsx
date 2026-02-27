"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotes } from "@/lib/hooks/use-notes";
import Header from "./components/header";
import NoteRow from "./components/note-row";
import CommandPalette from "./components/command-palette";
import FloatingToolbar from "./components/floating-toolbar";

export default function HomePage() {
  const { notes, createNote, deleteNote, togglePin } = useNotes();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const router = useRouter();

  const handleNewNote = (type: "markdown" | "excalidraw" = "markdown") => {
    const note = createNote("Untitled", type);
    router.push(`/note/${note.id}`);
  };

  return (
    <div className="flex flex-col w-[90vw] md:w-[740px] max-w-[740px] mx-auto mt-25 animate-fade-in">
      <Header />
      <div className="mt-12">
        {notes.map((note) => (
          <NoteRow
            key={note.id}
            note={note}
            onDelete={() => deleteNote(note.id)}
            onTogglePin={() => togglePin(note.id)}
          />
        ))}
        {notes.length === 0 && (
          <p className="text-(--color-light-gray) text-[16px] mt-8">
            No notes yet. Press ⌘K or click &quot;new&quot; to get started.
          </p>
        )}
      </div>
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
        notes={notes}
        onCreateNote={handleNewNote}
      />
      <FloatingToolbar
        variant="home"
        onSearchClick={() => setCommandPaletteOpen(true)}
        onNewMarkdown={() => handleNewNote("markdown")}
        onNewCanvas={() => handleNewNote("excalidraw")}
      />
    </div>
  );
}
