"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiPlus, FiTrash2, FiFileText, FiEdit3 } from "react-icons/fi";
import { Note } from "@/lib/types";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notes: Note[];
  onCreateNote: (type: "markdown" | "excalidraw") => void;
  onDeleteNote: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export default function CommandPalette({
  open,
  onOpenChange,
  notes,
  onCreateNote,
  onDeleteNote,
  onTogglePin,
}: CommandPaletteProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[560px]">
        <Command
          className="bg-(--color-surface) border border-(--color-border) rounded-lg shadow-2xl overflow-hidden"
          label="Command palette"
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Escape") onOpenChange(false);
          }}
        >
          <Command.Input
            className="w-full px-4 py-3 text-[16px] bg-transparent border-b border-(--color-border) outline-none text-(--color-gray) placeholder:text-(--color-light-gray)"
            placeholder="Search notes or type a command..."
            autoFocus
          />
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="px-4 py-6 text-center text-[14px] text-(--color-light-gray)">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Actions"
              className="[&_[cmdk-group-heading]]:text-[12px] [&_[cmdk-group-heading]]:text-(--color-light-gray) [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide"
            >
              <Command.Item
                onSelect={() => {
                  onCreateNote("markdown");
                  onOpenChange(false);
                }}
                className="flex items-center gap-3 px-3 py-2 text-[14px] text-(--color-gray) rounded cursor-pointer data-[selected]:bg-(--color-hover)"
              >
                <FiPlus size={14} /> New markdown note
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  onCreateNote("excalidraw");
                  onOpenChange(false);
                }}
                className="flex items-center gap-3 px-3 py-2 text-[14px] text-(--color-gray) rounded cursor-pointer data-[selected]:bg-(--color-hover)"
              >
                <FiEdit3 size={14} /> New canvas note
              </Command.Item>
            </Command.Group>

            {notes.length > 0 && (
              <Command.Group
                heading="Notes"
                className="[&_[cmdk-group-heading]]:text-[12px] [&_[cmdk-group-heading]]:text-(--color-light-gray) [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide mt-2"
              >
                {notes.map((note) => (
                  <Command.Item
                    key={note.id}
                    value={note.title}
                    onSelect={() => {
                      router.push(`/note/${note.id}`);
                      onOpenChange(false);
                    }}
                    className="flex items-center justify-between px-3 py-2 text-[14px] text-(--color-gray) rounded cursor-pointer data-[selected]:bg-(--color-hover)"
                  >
                    <div className="flex items-center gap-3">
                      <FiFileText size={14} />
                      <span>{note.title || "Untitled"}</span>
                      {note.pinned && (
                        <span className="text-[11px] text-(--color-accent)">
                          pinned
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-(--color-light-gray)">
                        {new Date(note.updatedAt).toISOString().split("T")[0]}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTogglePin(note.id);
                        }}
                        className="text-[11px] text-(--color-light-gray) hover:text-(--color-gray) px-1"
                      >
                        {note.pinned ? "unpin" : "pin"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteNote(note.id);
                        }}
                        className="text-(--color-light-gray) hover:text-(--color-danger) px-1"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
