"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { FiPlus, FiFileText, FiEdit3, FiMoon, FiSun, FiCopy, FiHome } from "react-icons/fi";
import { useThemeContext } from "@/lib/providers/theme-provider";
import { Note } from "@/lib/types";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notes: Note[];
  onCreateNote: (type: "markdown" | "excalidraw") => void;
  /** Current page context for contextual actions */
  context?: "home" | "note";
  /** Content of current note (for copy action) */
  noteContent?: string;
  noteTitle?: string;
  noteUpdatedAt?: number;
}

function fuzzyMatch(query: string, target: string): number {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (!q) return 1;
  let qi = 0;
  let score = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      score += 1;
      if (ti === 0 || t[ti - 1] === " ") score += 0.5;
      qi++;
    }
  }
  return qi === q.length ? score / q.length : 0;
}

const itemClass =
  "flex items-center gap-3 px-3 py-2 text-[13px] text-(--color-gray) rounded-md cursor-pointer transition-colors data-[selected=true]:bg-(--color-hover) data-[selected=true]:text-(--color-black)";

const groupHeadingClass =
  "[&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:text-(--color-light-gray) [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:font-medium";

export default function CommandPalette({
  open,
  onOpenChange,
  notes,
  onCreateNote,
  context = "home",
  noteContent,
  noteTitle,
  noteUpdatedAt,
}: CommandPaletteProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useThemeContext();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    },
    [open, onOpenChange],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 animate-palette-overlay">
      <div
        className="absolute inset-0 bg-(--color-black)/20 backdrop-blur-[2px]"
        onClick={() => onOpenChange(false)}
      />
      <div className="absolute top-[20%] inset-x-0 mx-auto w-[90vw] max-w-[520px] animate-palette-in">
        <Command
          className="bg-(--color-surface) border border-(--color-border) rounded-lg shadow-2xl overflow-hidden"
          label="Command palette"
          filter={(value, search) => fuzzyMatch(search, value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Escape") onOpenChange(false);
          }}
        >
          <Command.Input
            className="w-full px-4 py-3 text-[15px] bg-transparent border-b border-(--color-border) outline-none text-(--color-gray) placeholder:text-(--color-light-gray)"
            placeholder="Search notes or type a command..."
            autoFocus
          />
          <Command.List className="max-h-[320px] overflow-y-auto p-1.5">
            <Command.Empty className="px-4 py-8 text-center text-[13px] text-(--color-light-gray)">
              No results found.
            </Command.Empty>

            <Command.Group heading="Actions" className={groupHeadingClass}>
              <Command.Item
                value="New markdown note"
                onSelect={() => {
                  onCreateNote("markdown");
                  onOpenChange(false);
                }}
                className={itemClass}
              >
                <FiPlus size={14} className="shrink-0" /> New markdown note
              </Command.Item>
              <Command.Item
                value="New canvas note"
                onSelect={() => {
                  onCreateNote("excalidraw");
                  onOpenChange(false);
                }}
                className={itemClass}
              >
                <FiEdit3 size={14} className="shrink-0" /> New canvas note
              </Command.Item>
              <Command.Item
                value="Toggle dark mode light mode theme"
                onSelect={() => {
                  toggleTheme();
                  onOpenChange(false);
                }}
                className={itemClass}
              >
                {theme === "light" ? (
                  <FiMoon size={14} className="shrink-0" />
                ) : (
                  <FiSun size={14} className="shrink-0" />
                )}
                {theme === "light" ? "Dark mode" : "Light mode"}
              </Command.Item>
              {context === "note" && (
                <>
                  <Command.Item
                    value="Copy page contents"
                    onSelect={() => {
                      if (noteContent != null) {
                        const d = noteUpdatedAt ? new Date(noteUpdatedAt) : new Date();
                        const day = d.getDate();
                        const sfx = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";
                        const dateStr = `${d.toLocaleDateString("en-US", { month: "long" })} ${day}${sfx}, ${d.getFullYear()}`;
                        const text = `# ${noteTitle || "Untitled"}\n## Last updated on ${dateStr}\n\n${noteContent}`;
                        navigator.clipboard.writeText(text);
                      }
                      onOpenChange(false);
                    }}
                    className={itemClass}
                  >
                    <FiCopy size={14} className="shrink-0" /> Copy page contents
                  </Command.Item>
                  <Command.Item
                    value="Back to home"
                    onSelect={() => {
                      router.push("/");
                      onOpenChange(false);
                    }}
                    className={itemClass}
                  >
                    <FiHome size={14} className="shrink-0" /> Back to home
                  </Command.Item>
                </>
              )}
            </Command.Group>

            {notes.length > 0 && (
              <Command.Group
                heading="Notes"
                className={`${groupHeadingClass} mt-1`}
              >
                {notes.map((note) => (
                  <Command.Item
                    key={note.id}
                    value={note.title}
                    onSelect={() => {
                      router.push(`/note/${note.id}`);
                      onOpenChange(false);
                    }}
                    className="flex items-center justify-between px-3 py-2 text-[13px] text-(--color-gray) rounded-md cursor-pointer transition-colors data-[selected=true]:bg-(--color-hover) data-[selected=true]:text-(--color-black)"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FiFileText size={14} className="shrink-0" />
                      <span className="truncate">
                        {note.title || "Untitled"}
                      </span>
                      <span className="text-[11px] text-(--color-light-gray) bg-(--color-hover) px-1.5 py-0.5 rounded shrink-0">
                        {note.type === "excalidraw" ? "canvas" : "md"}
                      </span>
                    </div>
                    <span className="text-[11px] text-(--color-light-gray) shrink-0 ml-3">
                      {new Date(note.updatedAt).toISOString().split("T")[0]}
                    </span>
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
