"use client";

import { useCallback, useSyncExternalStore } from "react";
import * as store from "../store";
import { Note } from "../types";

function subscribe(callback: () => void) {
  window.addEventListener("vim:storage-change", callback);
  return () => window.removeEventListener("vim:storage-change", callback);
}

function getSnapshot(): string {
  return JSON.stringify(store.getAllNotes());
}

function sortNotes(notes: Note[]): Note[] {
  return [...notes].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.updatedAt - a.updatedAt;
  });
}

export function useNotes() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const notes = sortNotes(JSON.parse(raw) as Note[]);

  const createNote = useCallback(
    (title: string, type: "markdown" | "excalidraw") => {
      return store.createNote(title, type);
    },
    [],
  );

  const deleteNote = useCallback((id: string) => {
    store.deleteNote(id);
  }, []);

  const togglePin = useCallback((id: string) => {
    store.togglePin(id);
  }, []);

  return { notes, createNote, deleteNote, togglePin };
}
