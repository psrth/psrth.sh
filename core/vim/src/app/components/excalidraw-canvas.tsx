"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <div className="w-screen h-screen animate-pulse" />,
  },
);

interface ExcalidrawCanvasProps {
  content: string;
  onChange: (content: string) => void;
  title: string;
  onTitleChange: (title: string) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function ExcalidrawCanvasInner({
  content,
  onChange,
  title,
  onTitleChange,
}: ExcalidrawCanvasProps) {
  const [initialData, setInitialData] = useState<any>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (content) {
      try {
        const parsed = JSON.parse(content);
        setInitialData({
          elements: parsed.elements || [],
          appState: parsed.appState || {},
          files: parsed.files || {},
          scrollToContent: true,
        });
      } catch {
        setInitialData({ elements: [], appState: {}, files: {} });
      }
    } else {
      setInitialData({ elements: [], appState: {}, files: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback(
    (elements: any[], _appState: any, files: any) => {
      const filtered = elements.filter((el: any) => !el.isDeleted);
      const data = JSON.stringify({ elements: filtered, files: files || {} });
      onChangeRef.current(data);
    },
    [],
  );

  if (!initialData) return null;

  const theme =
    typeof document !== "undefined" &&
    document.documentElement.dataset.theme === "dark"
      ? "dark"
      : "light";

  return (
    <div className="w-screen h-screen fixed inset-0 z-10">
      <Excalidraw
        initialData={initialData}
        onChange={handleChange}
        theme={theme}
        autoFocus
        UIOptions={{
          canvasActions: {
            loadScene: false,
            saveToActiveFile: false,
            toggleTheme: false,
          },
          welcomeScreen: false,
        }}
      />
    </div>
  );
}

const ExcalidrawCanvas = memo(ExcalidrawCanvasInner);
export default ExcalidrawCanvas;
