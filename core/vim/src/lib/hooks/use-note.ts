"use client";

import { useState, useEffect, useCallback } from "react";
import * as store from "../store";
import { Note } from "../types";
import { useDebouncedCallback } from "./use-debounce";

export function useNote(id: string) {
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const found = store.getNoteById(id);
    setNote(found ?? null);
    setIsLoading(false);
  }, [id]);

  // Separate debounces so content saves (frequent from Excalidraw onChange) don't cancel title saves
  const debouncedSaveContent = useDebouncedCallback((content: string) => {
    store.updateNote(id, { content });
  }, 400);

  const debouncedSaveTitle = useDebouncedCallback((title: string) => {
    store.updateNote(id, { title });
  }, 400);

  const updateContent = useCallback(
    (content: string) => {
      setNote((prev) =>
        prev ? { ...prev, content, updatedAt: Date.now() } : prev,
      );
      debouncedSaveContent(content);
    },
    [debouncedSaveContent],
  );

  const updateTitle = useCallback(
    (title: string) => {
      setNote((prev) =>
        prev ? { ...prev, title, updatedAt: Date.now() } : prev,
      );
      debouncedSaveTitle(title);
    },
    [debouncedSaveTitle],
  );

  const updateType = useCallback(
    (type: "markdown" | "excalidraw") => {
      setNote((prev) =>
        prev ? { ...prev, type, content: "", updatedAt: Date.now() } : prev,
      );
      store.updateNote(id, { type, content: "" });
    },
    [id],
  );

  return { note, isLoading, updateContent, updateTitle, updateType };
}
