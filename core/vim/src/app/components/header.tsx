"use client";

import { FiSearch, FiSun, FiMoon } from "react-icons/fi";
import { useThemeContext } from "@/lib/providers/theme-provider";

interface HeaderProps {
  onSearchClick: () => void;
  onNewClick: () => void;
}

export default function Header({ onSearchClick, onNewClick }: HeaderProps) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="flex flex-row justify-between items-start">
      <div>
        <h1 className="text-[32px] font-tiempos font-bold tracking-tight text-(--color-black)">
          vim
        </h1>
        <p className="text-[16px] text-(--color-light-gray) mt-1">
          a minimalist, local storage backed scribbling app
        </p>
      </div>
      <div className="flex flex-row items-center gap-4 mt-2">
        <button
          onClick={onSearchClick}
          className="text-(--color-light-gray) hover:text-(--color-gray) cursor-pointer transition-colors"
          title="Search (⌘K)"
        >
          <FiSearch size={18} />
        </button>
        <button
          onClick={toggleTheme}
          className="text-(--color-light-gray) hover:text-(--color-gray) cursor-pointer transition-colors"
          title="Toggle theme"
        >
          {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
        </button>
        <button
          onClick={onNewClick}
          className="text-[14px] font-medium text-(--color-gray) hover:text-(--color-black) px-3 py-1 border border-(--color-border) rounded cursor-pointer transition-colors"
        >
          new
        </button>
      </div>
    </div>
  );
}
