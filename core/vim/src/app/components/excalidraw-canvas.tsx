"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FiHome } from "react-icons/fi";
import "@excalidraw/excalidraw/index.css";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <div className="w-screen h-screen animate-pulse" />,
  },
);

// Isolated title input to prevent Excalidraw re-renders
const OverlayTitle = memo(function OverlayTitle({
  initialTitle,
  onTitleChange,
}: {
  initialTitle: string;
  onTitleChange: (title: string) => void;
}) {
  const [title, setTitle] = useState(initialTitle);
  const ref = useRef(onTitleChange);
  ref.current = onTitleChange;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    ref.current(e.target.value);
  };

  return (
    <div
      className="fixed flex items-center rounded-[8px]"
      style={{
        top: 16,
        left: 96,
        height: 36,
        backgroundColor: "#ffffff",
        zIndex: 100,
        padding: "0 12px",
      }}
    >
      <input
        type="text"
        value={title}
        onChange={handleChange}
        className="text-[16px] font-bold bg-transparent outline-none"
        style={{
          border: "none",
          boxShadow: "none",
          width: 220,
          color: "#1b1b1f",
        }}
        placeholder="Untitled"
      />
    </div>
  );
});

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
  const titleRef = useRef(title);
  titleRef.current = title;
  const onTitleChangeRef = useRef(onTitleChange);
  onTitleChangeRef.current = onTitleChange;
  const router = useRouter();

  useEffect(() => {
    if (content) {
      try {
        const parsed = JSON.parse(content);
        const hasViewState = parsed.appState?.scrollX != null;
        setInitialData({
          elements: parsed.elements || [],
          appState: parsed.appState || {},
          files: parsed.files || {},
          scrollToContent: !hasViewState,
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
    (elements: any[], appState: any, files: any) => {
      const filtered = elements.filter((el: any) => !el.isDeleted);
      const data = JSON.stringify({
        elements: filtered,
        files: files || {},
        appState: {
          zoom: appState.zoom,
          scrollX: appState.scrollX,
          scrollY: appState.scrollY,
        },
      });
      onChangeRef.current(data);
    },
    [],
  );

  const handleBack = useCallback(() => {
    router.push("/");
  }, [router]);

  const stableOnTitleChange = useCallback((t: string) => {
    onTitleChangeRef.current(t);
  }, []);

  // Hide native library/sidebar button + shift hamburger right for home button
  // + prevent macOS swipe-back gesture
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .default-sidebar-trigger { display: none !important; }
      .layer-ui__wrapper__top-right .ToolIcon__library { display: none !important; }
      [class*="sidebar-trigger"] { display: none !important; }
    `;
    document.head.appendChild(style);

    // Prevent swipe-back: Chrome
    document.body.style.overscrollBehaviorX = "none";

    // Prevent swipe-back: Safari — push dummy history entry and re-push on popstate
    history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.head.removeChild(style);
      document.body.style.overscrollBehaviorX = "";
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

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
      {/* Home button — to the left of hamburger */}
      <button
        onClick={handleBack}
        className="fixed flex items-center justify-center w-[36px] h-[36px] rounded-[10px] cursor-pointer transition-colors"
        style={{
          top: 16,
          left: 60,
          backgroundColor: "#8097B4",
          color: "#ffffff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          zIndex: 100,
        }}
      >
        <FiHome size={16} />
      </button>
      {/* Editable title — to the right of hamburger */}
      <OverlayTitle
        initialTitle={titleRef.current}
        onTitleChange={stableOnTitleChange}
      />
    </div>
  );
}

const ExcalidrawCanvas = memo(ExcalidrawCanvasInner);
export default ExcalidrawCanvas;
