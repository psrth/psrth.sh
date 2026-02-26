export interface Note {
  id: string;
  title: string;
  type: "markdown" | "excalidraw";
  content: string;
  createdAt: number;
  updatedAt: number;
  pinned: boolean;
}
