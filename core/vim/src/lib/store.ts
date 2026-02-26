import { Note } from "./types";

const NOTES_KEY = "vim:notes";
const THEME_KEY = "vim:theme";

function notifyChange() {
  window.dispatchEvent(new CustomEvent("vim:storage-change"));
}

export function getAllNotes(): Note[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Note[];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  notifyChange();
}

export function getNoteById(id: string): Note | undefined {
  return getAllNotes().find((n) => n.id === id);
}

export function createNote(
  title: string,
  type: "markdown" | "excalidraw",
): Note {
  const now = Date.now();
  const note: Note = {
    id: crypto.randomUUID(),
    title,
    type,
    content: "",
    createdAt: now,
    updatedAt: now,
    pinned: false,
  };
  const notes = getAllNotes();
  notes.unshift(note);
  saveNotes(notes);
  return note;
}

export function updateNote(
  id: string,
  updates: Partial<Pick<Note, "title" | "content" | "type" | "pinned">>,
): Note | undefined {
  const notes = getAllNotes();
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) return undefined;
  notes[index] = { ...notes[index], ...updates, updatedAt: Date.now() };
  saveNotes(notes);
  return notes[index];
}

export function deleteNote(id: string): void {
  const notes = getAllNotes().filter((n) => n.id !== id);
  saveNotes(notes);
}

export function togglePin(id: string): void {
  const notes = getAllNotes();
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) return;
  notes[index] = {
    ...notes[index],
    pinned: !notes[index].pinned,
    updatedAt: Date.now(),
  };
  saveNotes(notes);
}

export function getTheme(): "light" | "dark" | "system" {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
    return "system";
  } catch {
    return "system";
  }
}

export function setTheme(theme: "light" | "dark" | "system"): void {
  localStorage.setItem(THEME_KEY, theme);
}
