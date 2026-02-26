"use client";

import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import { Note } from "@/lib/types";

interface NoteRowProps {
  note: Note;
  onDelete: () => void;
  onTogglePin: () => void;
}

export default function NoteRow({ note, onDelete, onTogglePin }: NoteRowProps) {
  const dateStr = new Date(note.createdAt).toISOString().split("T")[0];

  return (
    <div className="group">
      <Link href={`/note/${note.id}`}>
        <div className="flex flex-row items-center py-4 justify-between">
          <div className="flex flex-row items-center gap-8">
            <span className="text-[16px] text-(--color-light-gray) w-[110px] shrink-0">
              {dateStr}
            </span>
            <span className="text-[16px] text-(--color-gray) truncate max-w-[400px]">
              {note.title || "Untitled"}
            </span>
            {note.pinned && (
              <span className="text-[12px] text-(--color-accent) font-medium">
                pinned
              </span>
            )}
          </div>
          <div className="flex flex-row items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onTogglePin();
              }}
              className="text-[13px] text-(--color-light-gray) hover:text-(--color-gray) cursor-pointer"
            >
              {note.pinned ? "unpin" : "pin"}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete();
              }}
              className="text-(--color-light-gray) hover:text-(--color-danger) cursor-pointer"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        </div>
      </Link>
      <div className="w-full h-[1px] bg-(--color-border)" />
    </div>
  );
}
