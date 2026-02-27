"use client";

import { useState } from "react";
import Link from "next/link";
import { FiTrash, FiStar } from "react-icons/fi";
import { Note } from "@/lib/types";

interface NoteRowProps {
  note: Note;
  onDelete: () => void;
  onTogglePin: () => void;
}

export default function NoteRow({ note, onDelete, onTogglePin }: NoteRowProps) {
  const dateStr = new Date(note.updatedAt).toISOString().split("T")[0];
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (note.content.trim().length > 0) {
      setShowConfirm(true);
    } else {
      onDelete();
    }
  };

  return (
    <>
      <div className="group">
        <Link href={`/note/${note.id}`}>
          <div className="flex flex-row items-center py-[21px] justify-between">
            <div className="flex flex-row items-center">
              <span className="text-[16px] text-(--color-light-gray) w-[110px] shrink-0">
                {dateStr}
              </span>
              <span className="text-[16px] text-(--color-gray) truncate max-w-[400px] ml-5">
                {note.title || "Untitled"}
              </span>
              <span className="text-[10px] text-(--color-light-gray) bg-(--color-hover) px-1.5 py-0.5 rounded shrink-0 ml-[10px] mt-[2px]">
                {note.type === "excalidraw" ? "CANVAS" : "MD"}
              </span>
            </div>
            <div className="flex flex-row items-center gap-3">
              <button
                onClick={handleDelete}
                className="text-(--color-light-gray) hover:text-(--color-red-400) cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiTrash size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onTogglePin();
                }}
                className={`cursor-pointer transition-opacity ${
                  note.pinned
                    ? "text-[#8097B4] opacity-100"
                    : "text-(--color-light-gray) hover:text-[#8097B4] opacity-0 group-hover:opacity-100"
                }`}
              >
                {note.pinned ? (
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ) : (
                  <FiStar size={14} />
                )}
              </button>
            </div>
          </div>
        </Link>
        <div className="w-full h-[1px] bg-(--color-border)" />
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center animate-palette-overlay">
          <div
            className="absolute inset-0 bg-(--color-black)/20 backdrop-blur-[2px]"
            onClick={() => setShowConfirm(false)}
          />
          <div className="relative bg-(--color-surface) border border-(--color-border) rounded-lg shadow-2xl p-6 w-[90vw] max-w-[360px]">
            <p className="text-[15px] text-(--color-gray) font-medium mb-1">
              Are you sure you want to delete this note?
            </p>
            <p className="text-[13px] text-(--color-light-gray) mb-5">
              The contents of this note will be dropped from your local storage,
              and will be lost forever.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1.5 text-[13px] text-(--color-gray) border border-(--color-border) rounded-md cursor-pointer hover:bg-(--color-hover) transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  onDelete();
                }}
                className="px-3 py-1.5 text-[13px] text-white bg-(--color-danger) rounded-md cursor-pointer hover:opacity-90 transition-opacity"
              >
                I'm sure, delete it.
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
