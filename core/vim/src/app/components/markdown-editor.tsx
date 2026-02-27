"use client";

import { useRef, useEffect, useCallback } from "react";

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function MarkdownEditor({
  content,
  onChange,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [content]);

  // Focus on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Keyboard shortcuts: Cmd+B, Cmd+I, Cmd+U
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod) return;

      let wrapper = "";
      if (e.key === "b") wrapper = "**";
      else if (e.key === "i") wrapper = "*";
      else if (e.key === "u") wrapper = "__";
      else return;

      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = content.slice(start, end);

      const before = content.slice(0, start);
      const after = content.slice(end);
      const wLen = wrapper.length;

      if (before.endsWith(wrapper) && after.startsWith(wrapper)) {
        // Unwrap
        const newContent =
          before.slice(0, -wLen) + selected + after.slice(wLen);
        onChange(newContent);
        requestAnimationFrame(() => {
          textarea.selectionStart = start - wLen;
          textarea.selectionEnd = end - wLen;
        });
      } else {
        // Wrap
        const newContent = before + wrapper + selected + wrapper + after;
        onChange(newContent);
        requestAnimationFrame(() => {
          textarea.selectionStart = start + wLen;
          textarea.selectionEnd = end + wLen;
        });
      }
    },
    [content, onChange],
  );

  return (
    <textarea
      ref={textareaRef}
      value={content}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-full min-h-[calc(100vh-220px)] bg-transparent text-[16px] leading-7 text-(--color-gray) font-soehne resize-none outline-none border-none placeholder:text-(--color-light-gray)"
      placeholder="Start writing..."
      spellCheck={false}
    />
  );
}
