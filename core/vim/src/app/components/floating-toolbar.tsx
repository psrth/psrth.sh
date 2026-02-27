"use client";

import {
  FiSearch,
  FiPlus,
  FiEdit3,
  FiMoon,
  FiSun,
  FiHome,
  FiCopy,
} from "react-icons/fi";
import { useThemeContext } from "@/lib/providers/theme-provider";
import { useCallback, useState } from "react";

interface HomeToolbarProps {
  variant: "home";
  onSearchClick: () => void;
  onNewMarkdown: () => void;
  onNewCanvas: () => void;
}

interface NoteToolbarProps {
  variant: "note";
  content: string;
  noteTitle: string;
  noteUpdatedAt: number;
  onSearchClick: () => void;
}

type FloatingToolbarProps = HomeToolbarProps | NoteToolbarProps;

function formatCopyDate(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${day}${suffix}, ${year}`;
}

function formatCopyText(title: string, updatedAt: number, content: string): string {
  return `# ${title || "Untitled"}\n## Last updated on ${formatCopyDate(updatedAt)}\n\n${content}`;
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function Divider() {
  return (
    <div className="bg-(--color-border)" style={{ width: 1, height: 20 }} />
  );
}

function ToolbarButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="text-(--color-light-gray) hover:text-(--color-gray) cursor-pointer transition-colors relative group/tip"
      title={title}
    >
      {children}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[11px] text-(--color-gray) bg-(--color-surface) border border-(--color-border) rounded shadow-sm whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none">
        {title}
      </span>
    </button>
  );
}

export default function FloatingToolbar(props: FloatingToolbarProps) {
  const { theme, toggleTheme } = useThemeContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (props.variant !== "note") return;
    const text = formatCopyText(props.noteTitle, props.noteUpdatedAt, props.content);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [props]);

  return (
    <div
      className="fixed z-50 flex items-center gap-3 rounded-full border border-(--color-border) px-4 shadow-md"
      style={{
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        height: 44,
        background: "var(--color-surface)",
      }}
    >
      {props.variant === "home" ? (
        <>
          <ToolbarButton onClick={props.onSearchClick} title="Search (⌘K)">
            <FiSearch size={18} />
          </ToolbarButton>
          <Divider />
          <ToolbarButton onClick={props.onNewMarkdown} title="New note">
            <FiPlus size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={props.onNewCanvas} title="New canvas">
            <FiEdit3 size={18} />
          </ToolbarButton>
          <Divider />
          <ToolbarButton
            onClick={toggleTheme}
            title={theme === "light" ? "Dark mode" : "Light mode"}
          >
            {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
          </ToolbarButton>
        </>
      ) : (
        <>
          <ToolbarButton
            onClick={() => {
              window.location.href = "/";
            }}
            title="Home"
          >
            <FiHome size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={props.onSearchClick} title="Search (⌘K)">
            <FiSearch size={18} />
          </ToolbarButton>
          <Divider />
          <span className="text-[15px] text-(--color-light-gray) select-none">
            {wordCount(props.content)} words
          </span>
          <Divider />
          <ToolbarButton
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy contents"}
          >
            <FiCopy size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={toggleTheme}
            title={theme === "light" ? "Dark mode" : "Light mode"}
          >
            {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
          </ToolbarButton>
        </>
      )}
    </div>
  );
}
