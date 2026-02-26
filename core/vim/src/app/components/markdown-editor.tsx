"use client";

import { useRef, useEffect } from "react";

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function MarkdownEditor({
  content,
  onChange,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [content]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className="w-full min-h-[calc(100vh-220px)] bg-transparent text-[16px] leading-7 text-(--color-gray) font-soehne resize-none outline-none border-none placeholder:text-(--color-light-gray)"
      placeholder="Start writing..."
      spellCheck={false}
    />
  );
}
