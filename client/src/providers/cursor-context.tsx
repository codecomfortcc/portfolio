"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type CursorState = {
  variant: "default" | "spotlight";
  content: ReactNode | null;
  rect: DOMRect | null; // Stores the exact position of the target text
};

type CursorContextType = {
  cursorState: CursorState;
  setSpotlight: (content: ReactNode, rect: DOMRect) => void;
  resetCursor: () => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>({
    variant: "default",
    content: null,
    rect: null,
  });

  const setSpotlight = (content: ReactNode, rect: DOMRect) => {
    setCursorState({ variant: "spotlight", content, rect });
  };

  const resetCursor = () => {
    setCursorState((prev) => ({ ...prev, variant: "default", rect: null }));
  };

  return (
    <CursorContext.Provider value={{ cursorState, setSpotlight, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) throw new Error("useCursor must be used within a CursorProvider");
  return context;
};
